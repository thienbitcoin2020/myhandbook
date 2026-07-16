#!/usr/bin/env python3
"""Build the reviewed, publishable DOCX template library.

The source files under ``Template/`` are working material and are intentionally
not published. This script creates role-owned, stable-name copies under
``assets/templates/`` after removing duplicated document-control boilerplate,
sample data, and role rules that do not belong in the artifact itself.

Requires: python-docx and lxml.
"""

from __future__ import annotations

import argparse
import re
import shutil
import tempfile
import zipfile
from pathlib import Path
from typing import Callable, Iterable

from docx import Document
from docx.document import Document as DocumentObject
from docx.oxml.ns import qn
from docx.table import Table
from docx.text.paragraph import Paragraph
from lxml import etree


ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = ROOT / "Template"
DEFAULT_OUTPUT_ROOT = ROOT / "assets" / "templates"

W_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
REL_NS = "http://schemas.openxmlformats.org/package/2006/relationships"
CT_NS = "http://schemas.openxmlformats.org/package/2006/content-types"
CP_NS = "http://schemas.openxmlformats.org/package/2006/metadata/core-properties"
DC_NS = "http://purl.org/dc/elements/1.1/"

REMOVED_PACKAGE_PARTS = {
    "docProps/custom.xml",
    "word/comments.xml",
    "word/commentsExtended.xml",
    "word/commentsExtensible.xml",
    "word/commentsIds.xml",
    "word/people.xml",
}

FORBIDDEN_PART_PATTERNS = (
    "vbaproject.bin",
    "/activex/",
    "/embeddings/",
    "oleobject",
    "altchunk",
    "afchunk",
)


def body_children(document: DocumentObject) -> list:
    return list(document.element.body.iterchildren())


def body_text(element) -> str:
    return " ".join("".join(element.itertext()).split())


def require_body_text(document: DocumentObject, index: int, expected: str) -> None:
    children = body_children(document)
    if index >= len(children) or expected not in body_text(children[index]):
        actual = body_text(children[index])[:120] if index < len(children) else "<missing>"
        raise ValueError(
            f"Source structure changed at body index {index}: expected {expected!r}, got {actual!r}"
        )


def remove_body_indices(document: DocumentObject, indices: Iterable[int]) -> None:
    children = body_children(document)
    for index in sorted(set(indices), reverse=True):
        if index < 0 or index >= len(children):
            raise IndexError(f"Body index {index} is outside 0..{len(children) - 1}")
        document.element.body.remove(children[index])


def replace_body_paragraph(document: DocumentObject, index: int, text: str) -> None:
    element = body_children(document)[index]
    if element.tag != qn("w:p"):
        raise ValueError(f"Body index {index} is not a paragraph")
    paragraph = Paragraph(element, document)
    paragraph_property = element.pPr
    for child in list(element):
        if child is not paragraph_property:
            element.remove(child)
    paragraph.add_run(text)


def table_header(table: Table) -> str:
    if not table.rows:
        return ""
    return " | ".join(cell.text.strip() for cell in table.rows[0].cells)


def find_table(document: DocumentObject, first_cell: str) -> Table:
    for table in document.tables:
        if table.rows and table.rows[0].cells[0].text.strip() == first_cell:
            return table
    raise ValueError(f"Could not find table whose first cell is {first_cell!r}")


def keep_labeled_rows(table: Table, labels: Iterable[str], keep_header: bool = False) -> None:
    allowed = set(labels)
    for index in range(len(table.rows) - 1, -1, -1):
        label = table.rows[index].cells[0].text.strip()
        if (keep_header and index == 0) or label in allowed:
            continue
        table._tbl.remove(table.rows[index]._tr)


def replace_labeled_value(table: Table, label: str, value: str) -> None:
    for row in table.rows:
        if row.cells[0].text.strip() == label:
            row.cells[1].text = value
            return
    raise ValueError(f"Could not find row {label!r} in table {table_header(table)!r}")


def reset_data_rows(table: Table, rows: list[list[str]]) -> None:
    expected_columns = len(table.columns)
    for values in rows:
        if len(values) != expected_columns:
            raise ValueError(
                f"Row for table {table_header(table)!r} has {len(values)} cells; expected {expected_columns}"
            )
    while len(table.rows) > 1:
        table._tbl.remove(table.rows[-1]._tr)
    for values in rows:
        row = table.add_row()
        for cell, value in zip(row.cells, values):
            cell.text = value


def trim_epic(document: DocumentObject) -> None:
    require_body_text(document, 5, "Chủ trì (PIC)")
    require_body_text(document, 7, "Cách dùng & phân vai")
    require_body_text(document, 44, "US-02")
    require_body_text(document, 54, "Lịch sử thay đổi")

    replacements = {
        13: "1 · Input epic cần phân rã",
        15: "2 · Nguyên tắc phân rã & viết AC",
        16: "2.1 · Chuẩn INVEST — mỗi story phải qua đủ 6 cửa",
        19: "2.2 · Story quá lớn → tách theo các mẫu sau",
        26: "2.3 · Thin vertical slice — cắt dọc, giao sớm",
        30: "2.4 · Từ cần tránh trong Acceptance Criteria",
        33: "3 · Backlog tổng quan — thứ tự giao giá trị",
        34: (
            "Sắp story theo thứ tự giao giá trị sớm nhất, không theo thứ tự kỹ thuật. "
            "Chỉ tạo các story cần thiết để epic có thể được lập kế hoạch và kiểm chứng."
        ),
        39: "Size S/M/L là tương đối giữa các story trong epic; story L → quay lại mục 2.2 để tách tiếp.",
        40: "4 · Chi tiết User Story — mỗi story một block",
        41: (
            "Mẫu cung cấp một block US-01. Nhân bản block khi cần và chỉ giữ các story thực sự thuộc epic; "
            "mỗi story phải có giá trị, tiêu chí chấp nhận và quan hệ phụ thuộc rõ ràng."
        ),
    }
    for index, text in replacements.items():
        replace_body_paragraph(document, index, text)

    remove_body_indices(
        document,
        list(range(5, 13)) + list(range(44, 54)) + [54, 55],
    )


def trim_product_vision(document: DocumentObject) -> None:
    require_body_text(document, 5, "Chủ trì (PIC)")
    require_body_text(document, 7, "Cách dùng template")
    require_body_text(document, 67, "Lịch sử thay đổi")

    metadata = document.tables[0]
    keep_labeled_rows(metadata, {"Tên sản phẩm", "Chu kỳ review roadmap"})
    replace_body_paragraph(document, 7, "1 · Input đầu vào")
    remove_body_indices(document, [5, *range(8, 13), 67, 68])


def trim_rtm(document: DocumentObject) -> None:
    require_body_text(document, 8, "Kiểm soát tài liệu")
    require_body_text(document, 49, "Quy trình cập nhật RTM")

    metadata = document.tables[0]
    keep_labeled_rows(
        metadata,
        {"Mã tài liệu", "Phạm vi", "Trạng thái", "Ngày cập nhật gần nhất", "Mức bảo mật"},
    )
    replace_labeled_value(metadata, "Mã tài liệu", "[ĐIỀN: RTM-<DỰ ÁN>-<PHẠM VI>]")

    matrix = find_table(document, "BR ID")
    for index in range(len(matrix.rows) - 1, 0, -1):
        if "[TRỐNG — gap]" in " ".join(cell.text for cell in matrix.rows[index].cells):
            matrix._tbl.remove(matrix.rows[index]._tr)

    remove_body_indices(document, [*range(8, 16), 33, 34, *range(49, 57)])


def trim_srs(document: DocumentObject) -> None:
    require_body_text(document, 8, "Kiểm soát tài liệu")
    require_body_text(document, 65, "Feature 2")
    require_body_text(document, 111, "Tóm tắt BR chính")

    metadata = document.tables[0]
    keep_labeled_rows(metadata, {"Mã tài liệu", "Module / Phân hệ", "Trạng thái", "Mức bảo mật"})
    replace_labeled_value(metadata, "Mã tài liệu", "[ĐIỀN: SRS-<DỰ ÁN>-<MODULE>]")
    replace_body_paragraph(
        document,
        88,
        (
            "BA và PO làm rõ nhu cầu chất lượng; Solution Architect thiết kế giải pháp đáp ứng; "
            "Security, Ops và QC cùng xác định cách kiểm chứng. Ghi yêu cầu đo được tại đây hoặc "
            "tham chiếu nguồn yêu cầu phi chức năng chuẩn của dự án."
        ),
    )
    replace_body_paragraph(
        document,
        73,
        (
            "Nhân bản cấu trúc 3.1 cho từng feature và đánh mã FR liên tục trong toàn tài liệu "
            "để giữ traceability duy nhất."
        ),
    )
    remove_body_indices(document, [*range(8, 18), *range(65, 73), *range(111, 115)])


def trim_use_case(document: DocumentObject) -> None:
    require_body_text(document, 8, "Kiểm soát tài liệu")
    require_body_text(document, 53, "UC-002")
    require_body_text(document, 78, "Nhân bản toàn bộ section UC")

    metadata = document.tables[0]
    keep_labeled_rows(metadata, {"Mã tài liệu", "Chức năng / Module", "Trạng thái", "Mức bảo mật"})
    replace_labeled_value(metadata, "Mã tài liệu", "[ĐIỀN: UCS-<DỰ ÁN>-<MODULE>]")
    replace_body_paragraph(
        document,
        78,
        (
            "Nhân bản mục UC-001 cho mỗi use case mới; giữ mã UC duy nhất và cập nhật bảng "
            "Use Case Overview ở mục 1.4."
        ),
    )
    remove_body_indices(document, [*range(8, 16), *range(53, 78)])


def trim_project_management_plan(document: DocumentObject) -> None:
    require_body_text(document, 1, "Template dùng chung")
    require_body_text(document, 4, "Thông tin tài liệu")
    require_body_text(document, 7, "Revision History")

    metadata = document.tables[1]
    keep_labeled_rows(
        metadata,
        {
            "Trường",
            "Tên dự án",
            "Mã dự án",
            "Project Charter tham chiếu",
            "Phương pháp thực thi",
            "Trạng thái tài liệu",
            "Chuẩn tham chiếu",
        },
        keep_header=True,
    )
    replace_labeled_value(
        metadata,
        "Chuẩn tham chiếu",
        "PMBOK® Guide — Seventh Edition (tài liệu tham chiếu của mẫu)",
    )
    replace_body_paragraph(document, 4, "Thông tin kế hoạch")
    remove_body_indices(document, [1, 2, 3, 7, 8, 9])


def trim_raid(document: DocumentObject) -> None:
    require_body_text(document, 1, "Template dùng chung")
    require_body_text(document, 7, "Update Log")
    require_body_text(document, 10, "Quy trình đóng góp")

    metadata = document.tables[1]
    keep_labeled_rows(
        metadata,
        {
            "Trường",
            "Tên dự án",
            "Mã dự án",
            "Khẩu vị rủi ro của Sponsor",
            "Tần suất review định kỳ",
            "Vị trí lưu bản chính (single source of truth)",
            "Tài liệu tham chiếu",
            "Chuẩn tham chiếu",
        },
        keep_header=True,
    )
    replace_labeled_value(
        metadata,
        "Chuẩn tham chiếu",
        "PMBOK® Guide — Seventh Edition (tài liệu tham chiếu của mẫu)",
    )

    risk_table = find_table(document, "ID")
    if "Mô tả (nguyên nhân" not in table_header(risk_table):
        raise ValueError("Unexpected first ID table; RAID risk table could not be identified")
    reset_data_rows(
        risk_table,
        [
            [
                f"R-{index:03d}",
                "[ĐIỀN: nguyên nhân → sự kiện → tác động]",
                "[ĐIỀN]",
                "[1–5]",
                "[1–5]",
                "[P×I]",
                "[Avoid / Mitigate / Transfer / Accept]",
                "[ĐIỀN: mitigation / contingency]",
                "[ĐIỀN tên]",
                "[ĐIỀN điều kiện kích hoạt]",
                "Open",
            ]
            for index in range(1, 5)
        ],
    )

    assumption_table = find_table(document, "ID")
    id_tables = [table for table in document.tables if table.rows and table.rows[0].cells[0].text.strip() == "ID"]
    assumption_table = next(table for table in id_tables if "Mô tả giả định" in table_header(table))
    issue_table = next(table for table in id_tables if "Mô tả vấn đề" in table_header(table))
    dependency_table = next(table for table in id_tables if "Mô tả phụ thuộc" in table_header(table))

    reset_data_rows(
        assumption_table,
        [
            [f"A-{index:03d}", "[ĐIỀN giả định]", "[ĐIỀN tác động]", "[ĐIỀN hạn validate]", "[ĐIỀN tên]"]
            for index in range(1, 4)
        ],
    )
    reset_data_rows(
        issue_table,
        [
            [
                f"I-{index:03d}",
                "[ĐIỀN vấn đề hiện hữu]",
                "[Critical / High / Medium / Low]",
                "[ĐIỀN hành động xử lý]",
                "[ĐIỀN tên]",
                "[ĐIỀN]",
                "Open",
            ]
            for index in range(1, 4)
        ],
    )
    reset_data_rows(
        dependency_table,
        [
            [
                f"D-{index:03d}",
                "[ĐIỀN phụ thuộc]",
                "[Internal / External]",
                "[ĐIỀN bên liên quan]",
                "[ĐIỀN due date]",
                "Open",
            ]
            for index in range(1, 4)
        ],
    )

    replace_body_paragraph(document, 4, "Ngữ cảnh RAID Log")
    replace_body_paragraph(
        document,
        24,
        (
            "Mô tả theo cấu trúc « Do <nguyên nhân>, có thể xảy ra <sự kiện>, dẫn đến <tác động> ». "
            "Chấm P/I trong risk workshop và cập nhật khi có dữ liệu mới."
        ),
    )
    replace_body_paragraph(
        document,
        28,
        (
            "Chỉ ghi các giả định có ảnh hưởng đến kế hoạch hoặc quyết định; mỗi giả định phải có "
            "owner và hạn xác nhận."
        ),
    )
    remove_body_indices(document, [1, 2, 3, *range(7, 13)])


def trim_status_report(document: DocumentObject) -> None:
    require_body_text(document, 1, "Template 1 trang")
    metadata = document.tables[0]
    while len(metadata.rows) > 1:
        metadata._tbl.remove(metadata.rows[-1]._tr)
    metadata.rows[0].cells[2].text = "Ngày chốt số liệu: [ĐIỀN]"
    remove_body_indices(document, [1])


def trim_project_charter(document: DocumentObject) -> None:
    require_body_text(document, 4, "Ghi chú sử dụng template")
    require_body_text(document, 81, "Nhật ký thay đổi")

    metadata = document.tables[1]
    keep_labeled_rows(metadata, {"Tên Dự Án", "Tổ Chức", "Giai đoạn", "Thời gian triển khai"})
    remove_body_indices(document, [4, 5, 81, 82])


def trim_adr(document: DocumentObject) -> None:
    require_body_text(document, 2, "Hướng dẫn sử dụng")
    require_body_text(document, 10, "Vòng đời trạng thái")
    require_body_text(document, 50, "Bản Markdown")
    remove_body_indices(document, [*range(1, 13), *range(50, 94)])


def trim_solution_architecture(document: DocumentObject) -> None:
    require_body_text(document, 6, "Kiểm soát tài liệu")
    require_body_text(document, 88, "Phụ lục A. Mã nguồn Mermaid")

    metadata = document.tables[0]
    keep_labeled_rows(
        metadata,
        {"Mã dự án", "Trạng thái", "Người review", "Người phê duyệt", "Phạm vi bảo mật"},
        keep_header=True,
    )
    remove_body_indices(document, [6, 7, 8, *range(88, 219)])


CURATIONS: tuple[tuple[str, str, Callable[[DocumentObject], None]], ...] = (
    ("BA/RTM_Template_BABOK.docx", "ba/requirements-traceability-matrix.docx", trim_rtm),
    ("BA/SRS_Template_ISO29148.docx", "ba/software-requirements-specification.docx", trim_srs),
    ("BA/UseCase_Specification_Template.docx", "ba/use-case-specification.docx", trim_use_case),
    (
        "PM/Project_Management_Plan_Template_PMBOK7.docx",
        "pm/project-management-plan.docx",
        trim_project_management_plan,
    ),
    ("PM/RAID_Log_Template_PMBOK7.docx", "pm/raid-log.docx", trim_raid),
    ("PM/Status_Report_Template_1page.docx", "pm/status-report-one-page.docx", trim_status_report),
    ("PM/Template_De_cuong_Du_an_Project_Charter.docx", "pm/project-charter.docx", trim_project_charter),
    ("PO/Epic_to_UserStories_Template.docx", "po/epic-to-user-stories.docx", trim_epic),
    ("PO/Product_Vision_Roadmap_Template.docx", "po/product-vision-roadmap.docx", trim_product_vision),
    ("SA/ADR-Template.docx", "sa/architecture-decision-record.docx", trim_adr),
    (
        "SA/Solution-Architecture-Document-Template.docx",
        "sa/solution-architecture-document.docx",
        trim_solution_architecture,
    ),
)


def scrub_story_xml(root: etree._Element) -> None:
    for element in list(root.iter()):
        for attribute in list(element.attrib):
            if attribute.startswith(f"{{{W_NS}}}rsid"):
                del element.attrib[attribute]
    for local_name in ("commentRangeStart", "commentRangeEnd", "commentReference"):
        for element in root.findall(f".//{{{W_NS}}}{local_name}"):
            parent = element.getparent()
            if parent is not None:
                parent.remove(element)


def sanitized_package(source: Path, destination: Path) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(source, "r") as archive:
        names = archive.namelist()
        for name in names:
            normalized = "/" + name.replace("\\", "/").lower().lstrip("/")
            if any(pattern in normalized for pattern in FORBIDDEN_PART_PATTERNS):
                raise ValueError(f"Forbidden OOXML part in {source.name}: {name}")

        overrides: dict[str, bytes] = {}
        for name in names:
            if not name.endswith((".xml", ".rels")):
                continue
            root = etree.fromstring(archive.read(name))
            if name.endswith(".rels"):
                for relationship in list(root.findall(f"{{{REL_NS}}}Relationship")):
                    if (relationship.get("TargetMode") or "").lower() == "external":
                        raise ValueError(f"External relationship in {source.name}: {name}")
                    target = (relationship.get("Target") or "").replace("\\", "/")
                    if target.endswith("docProps/custom.xml") or "comments" in target or target.endswith("people.xml"):
                        root.remove(relationship)
                overrides[name] = etree.tostring(
                    root, xml_declaration=True, encoding="UTF-8", standalone="yes"
                )
                continue

            if name == "docProps/core.xml":
                for element in root.findall(f".//{{{DC_NS}}}creator"):
                    element.text = ""
                for element in root.findall(f".//{{{CP_NS}}}lastModifiedBy"):
                    element.text = ""
            if name == "[Content_Types].xml":
                for override in list(root.findall(f"{{{CT_NS}}}Override")):
                    part_name = (override.get("PartName") or "").lstrip("/")
                    if part_name in REMOVED_PACKAGE_PARTS or "comments" in part_name or part_name == "word/people.xml":
                        root.remove(override)
            if name.startswith("word/"):
                tracked = root.findall(f".//{{{W_NS}}}ins") + root.findall(f".//{{{W_NS}}}del")
                tracked += root.findall(f".//{{{W_NS}}}moveFrom") + root.findall(f".//{{{W_NS}}}moveTo")
                if tracked:
                    raise ValueError(f"Tracked changes must be resolved before publishing: {source.name} ({name})")
                scrub_story_xml(root)
            overrides[name] = etree.tostring(
                root, xml_declaration=True, encoding="UTF-8", standalone="yes"
            )

        with zipfile.ZipFile(destination, "w", zipfile.ZIP_DEFLATED) as output:
            for info in archive.infolist():
                name = info.filename
                if name in REMOVED_PACKAGE_PARTS or "word/comments" in name or name == "word/people.xml":
                    continue
                output.writestr(info, overrides.get(name, archive.read(name)))


def curate(source: Path, destination: Path, transform: Callable[[DocumentObject], None]) -> None:
    if not source.is_file():
        raise FileNotFoundError(source)
    document = Document(source)
    transform(document)
    document.core_properties.author = ""
    document.core_properties.last_modified_by = ""
    with tempfile.TemporaryDirectory(prefix="handbook-docx-") as temp_dir:
        intermediate = Path(temp_dir) / destination.name
        document.save(intermediate)
        sanitized_package(intermediate, destination)
    # Re-open the final package so generation fails immediately on structural corruption.
    Document(destination)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--output-root",
        type=Path,
        default=DEFAULT_OUTPUT_ROOT,
        help="Destination root (default: assets/templates)",
    )
    parser.add_argument(
        "--clean",
        action="store_true",
        help="Delete the output root before rebuilding the explicit curated set",
    )
    args = parser.parse_args()
    output_root = args.output_root.resolve()
    if args.clean and output_root.exists():
        shutil.rmtree(output_root)

    written: list[Path] = []
    for source_name, destination_name, transform in CURATIONS:
        source = SOURCE_ROOT / source_name
        destination = output_root / destination_name
        curate(source, destination, transform)
        written.append(destination)
        print(f"[OK] {source.relative_to(ROOT)} -> {destination.relative_to(ROOT)}")
    print(f"[OK] curated {len(written)} publishable DOCX files")


if __name__ == "__main__":
    main()
