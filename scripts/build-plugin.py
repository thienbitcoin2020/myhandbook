#!/usr/bin/env python3
"""Build the installable Claude plugin from the handbook source.

Generates plugin/ (source tree, committed for review) and packages it as
assets/downloads/project-handbook.plugin so the site can serve it.

Content is derived, never retyped:
  - role chapters   <- pages/<role>.html            (EN fragments)
  - templates       <- assets/templates/previews/*  (same renders the site's
                       reader and the DOCX downloads are built from)
Two templates the handbook names but ships no body for are generated from the
in-page outlines and are marked AUTO-GENERATED (see DECISIONS.md).
"""

from __future__ import annotations

import json
import re
import shutil
import zipfile
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PLUGIN_ROOT = ROOT / "plugin"
PACKAGE_PATH = ROOT / "assets" / "downloads" / "project-handbook.plugin"
PLUGIN_VERSION = "0.3.0"


# ── HTML -> Markdown ────────────────────────────────────────────────────
class _MarkdownExtractor(HTMLParser):
    _H = {"h1": 1, "h2": 2, "h3": 3, "h4": 4, "h5": 5, "h6": 6}
    _SKIP = {"style", "script", "head", "title", "svg", "button"}

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.out: list[str] = []
        self._skip = 0
        self._h: int | None = None
        self._buf: list[str] = []
        self._li = False
        self._table: list[list[str]] | None = None
        self._row: list[str] | None = None
        self._cell: list[str] | None = None
        self._bold = 0

    def _flush(self) -> None:
        text = " ".join("".join(self._buf).split())
        self._buf = []
        if not text:
            return
        if self._h:
            self.out.append("#" * min(self._h + 1, 5) + " " + text)
        elif self._li:
            self.out.append("- " + text)
        else:
            self.out.append(text)

    def handle_starttag(self, tag, attrs):
        if tag in self._SKIP:
            self._skip += 1
            return
        if self._skip:
            return
        if tag in self._H:
            self._flush()
            self._h = self._H[tag]
        elif tag == "table" and self._table is None:
            self._flush()
            self._table = []
        elif tag == "tr" and self._table is not None:
            self._row = []
        elif tag in ("td", "th") and self._row is not None:
            self._cell = []
        elif tag == "li":
            self._flush()
            self._li = True
        elif tag in ("p", "div", "br", "section", "article") and self._table is None:
            self._flush()
        elif tag in ("strong", "b"):
            self._bold += 1
            if self._cell is None:
                self._buf.append("**")

    def handle_endtag(self, tag):
        if tag in self._SKIP:
            self._skip = max(0, self._skip - 1)
            return
        if self._skip:
            return
        if tag in self._H:
            self._flush()
            self._h = None
        elif tag == "table" and self._table is not None:
            rows = [r for r in self._table if any(c.strip() for c in r)]
            if rows:
                width = max(len(r) for r in rows)
                rows = [r + [""] * (width - len(r)) for r in rows]
                md = ["| " + " | ".join(rows[0]) + " |",
                      "|" + "---|" * width]
                md += ["| " + " | ".join(r) + " |" for r in rows[1:]]
                self.out.append("\n".join(md))
            self._table = None
        elif tag == "tr" and self._row is not None:
            self._table.append(self._row)
            self._row = None
        elif tag in ("td", "th") and self._cell is not None:
            self._row.append(" ".join("".join(self._cell).split()).replace("|", "\\|"))
            self._cell = None
        elif tag == "li":
            self._flush()
            self._li = False
        elif tag in ("p", "div", "section", "article"):
            self._flush()
        elif tag in ("strong", "b"):
            self._bold = max(0, self._bold - 1)
            if self._cell is None:
                self._buf.append("**")

    def handle_data(self, data):
        if self._skip:
            return
        target = self._cell if self._cell is not None else self._buf
        target.append(data.replace("\xa0", " "))


def html_to_markdown(html: str) -> str:
    parser = _MarkdownExtractor()
    parser.feed(html)
    parser._flush()
    blocks = [b for b in parser.out if b.strip() and b.strip() != "****"]
    text = "\n\n".join(blocks)
    return re.sub(r"\*\*\s*\*\*", "", text)


def page_markdown(page: str) -> str:
    html = (ROOT / "pages" / page).read_text(encoding="utf-8")
    start = html.find(">", html.find('id="page-content"')) + 1
    return html_to_markdown(html[start:])


def preview_markdown(stem: str) -> str:
    html = (ROOT / "assets" / "templates" / "previews" / f"{stem}.html").read_text(encoding="utf-8")
    # drop the preview chrome (classification banner + standalone download)
    html = re.sub(r"<header class=\"doc-preview-head\">.*?</header>", "", html, flags=re.S)
    return html_to_markdown(html)


# ── Skill metadata (roles come from the handbook routes only) ───────────
SKILLS = [
    {
        "name": "handbook-overview",
        "title": "Power Home Handbook — Overview, SDLC & Governance",
        "page": "handbook.html",
        "reference": "handbook-overview.md",
        "templates": [],
        "description": (
            "Cross-cutting knowledge from the Power Home Project Handbook (Hybrid Water-Scrum-Fall, "
            "Vietnamese commercial bank). Use when the user asks about the overall SDLC phases, "
            "lifecycle cross-walk between roles, governance layers and change authority, quality gates "
            "(DoR / Sprint DoD / Release DoD), stakeholder RACI, the glossary of standard terms, "
            "go-to-market phases, hypercare, or which role owns which artifact."
        ),
        "focus": "SDLC phases 1-6, PM core governance, quality gates, RACI, glossary, GTM, hypercare",
    },
    {
        "name": "role-po",
        "title": "Product Owner",
        "page": "po.html",
        "reference": "handbook-po.md",
        "templates": [
            "epic-to-user-stories",
            "product-vision-roadmap",
            "product-requirements-document",
        ],
        "description": (
            "Product Owner skill from the Power Home Handbook (Scrum Guide 2020, outcome-driven). "
            "Use when the user asks about PO responsibilities, product vision or roadmap, product "
            "discovery, backlog management or refinement, prioritization (MoSCoW, RICE, WSJF, Kano), "
            "writing epics and user stories with acceptance criteria, DoR/DoD, release and value "
            "metrics, or asks to draft a PRD, product vision board, or split an epic into stories."
        ),
        "focus": "vision & strategy, discovery, backlog, prioritization, Scrum events, release & value",
    },
    {
        "name": "role-ba",
        "title": "Business Analyst",
        "page": "ba.html",
        "reference": "handbook-ba.md",
        "templates": [
            "business-requirements-document",
            "requirements-traceability-matrix",
            "software-requirements-specification",
            "use-case-specification",
        ],
        "description": (
            "IT Business Analyst skill from the Power Home Handbook (BABOK v3, 9 BA phases). Use when "
            "the user asks about BA responsibilities, requirements elicitation, strategy analysis, "
            "BRD/SRS documentation, use case specifications, requirements traceability (RTM), NFR "
            "frameworks, UAT planning and sign-off, change requests after baseline, BA quality gates "
            "(SMART/INVEST), or asks to draft any BA document from the handbook templates."
        ),
        "focus": "elicitation, analysis & documentation, validation, design support, UAT, PIR",
    },
    {
        "name": "role-pm",
        "title": "Project Manager",
        "page": "pm.html",
        "reference": "handbook-pm.md",
        "templates": [
            "project-charter",
            "project-management-plan",
            "raid-log",
            "status-report-one-page",
        ],
        "description": (
            "Project Manager skill from the Power Home Handbook (PMBOK 7, hybrid SDLC). Use when the "
            "user asks about PM responsibilities, the five process groups, the eight performance "
            "domains, project charters, management plans and baselines, RAID or risk management, "
            "stakeholder and communication cadence, RAG status reporting, EVM (CPI/SPI/EAC), change "
            "control and CCB, escalation, closing a project, or asks to draft a charter, PM plan, "
            "RAID log, or one-page status report."
        ),
        "focus": "initiating, planning, executing, monitoring & controlling, closing, governance",
    },
    {
        "name": "role-sm",
        "title": "Scrum Master",
        "page": "sm.html",
        "reference": "handbook-sm.md",
        "templates": [],
        "description": (
            "Scrum Master skill from the Power Home Handbook (Scrum Guide 2020, servant leadership). "
            "Use when the user asks about SM accountabilities, facilitating Scrum events, impediment "
            "management, coaching stances and the GROW model, team health and psychological safety, "
            "agile metrics and their abuse (velocity, CFD, EBM), retrospective techniques, scaling "
            "(Nexus, LeSS, SAFe), or SM anti-patterns and boundaries with the PM."
        ),
        "focus": "Scrum framework, facilitation, impediments, coaching, team health, metrics, scaling",
    },
    {
        "name": "role-qc",
        "title": "QC / Tester",
        "page": "qc.html",
        "reference": "handbook-qc.md",
        "templates": [
            "test-strategy-test-plan",
            "test-case-specification",
            "defect-report",
            "test-summary-report",
            "uat-plan",
        ],
        "description": (
            "QC / Testing skill from the Power Home Handbook (ISTQB CTFL v4.0). Use when the user asks "
            "about the seven-step test process, test levels (unit/integration/system/UAT) and the "
            "V-model, test types, test design techniques (equivalence partitioning, boundary values, "
            "decision tables, state transitions), risk-based testing, entry/exit criteria, the defect "
            "lifecycle and severity vs priority, QC deliverables and metrics, or asks to draft a test "
            "plan for a feature or release."
        ),
        "focus": "test process, levels & types, design techniques, risk-based testing, defect lifecycle",
    },
    {
        "name": "role-sa",
        "title": "Solution Architect",
        "page": "sa.html",
        "reference": "handbook-sa.md",
        "templates": [
            "architecture-decision-record",
            "solution-architecture-document",
            "api-specification",
            "non-functional-requirements-specification",
        ],
        "description": (
            "Solution Architect skill from the Power Home Handbook (C4, arc42, Well-Architected, TOGAF "
            "interface). Use when the user asks about SA responsibilities, NFR analysis and quality "
            "attribute scenarios, solution options and trade-off scoring, technology selection, "
            "architecture decision records, HLD/LLD and the C4 model, integration and API patterns "
            "(event-driven, Saga, CQRS, BFF), data and security design (STRIDE), sizing and resilience, "
            "or asks to draft an ADR or a solution architecture document."
        ),
        "focus": "NFR-driven design, options & ADRs, C4/arc42, integration, security, sizing, governance",
    },
    {
        "name": "role-ux",
        "title": "UX/UI Designer",
        "page": "ux.html",
        "reference": "handbook-ux.md",
        "templates": [
            "user-persona-customer-journey-map",
            "information-architecture-wireframe-brief",
            "design-system-ui-style-guide",
            "usability-test-plan-report",
            "design-handoff-specification",
        ],
        "description": (
            "UX/UI Designer skill from the Power Home Handbook (Double Diamond, NN/g, WCAG 2.2, Atomic "
            "Design). Use when the user asks about the design process, user research methods, personas "
            "and journey maps, information architecture and user flows, wireframing fidelity, UI "
            "principles, design systems and tokens, interaction states, usability testing and SUS, "
            "heuristic evaluation, accessibility (POUR, WCAG 2.2 AA), or design-to-dev handoff."
        ),
        "focus": "discover, define, IA & flows, UI & design system, usability, accessibility, handoff",
    },
    {
        "name": "role-security",
        "title": "Security & Compliance",
        "page": "sec.html",
        "reference": "handbook-security.md",
        "templates": [
            "threat-model-stride",
            "security-requirements-checklist",
            "security-risk-assessment",
            "incident-response-plan",
            "compliance-gap-checklist",
        ],
        "description": (
            "Security & Compliance skill from the Power Home Handbook (ISO 27001, NIST CSF, OWASP, "
            "SBV Circular 09/2020). Use when the user asks about the governance framework, risk "
            "treatment, secure SDLC / DevSecOps gates (SAST, DAST, SCA, secrets), threat modeling with "
            "STRIDE, IAM (SSO, MFA, RBAC, SoD, PAM, JML), data protection and PDPD, OWASP Top 10, "
            "vulnerability SLAs by CVSS, incident response, compliance evidence, or security metrics."
        ),
        "focus": "ISMS & governance, DevSecOps, threat modeling, IAM, data protection, IR, audit",
    },
    {
        "name": "role-ops",
        "title": "Operations & SRE",
        "page": "ops.html",
        "reference": "handbook-ops.md",
        "templates": [
            "sli-slo-sla-document",
            "operational-runbook",
            "blameless-postmortem",
            "disaster-recovery-plan",
        ],
        "description": (
            "Operations & SRE skill from the Power Home Handbook (Google SRE, ITIL 4, DORA). Use when "
            "the user asks about SLI/SLO/SLA and error budgets, observability and golden signals, "
            "incident management and severity levels, blameless postmortems and RCA, change and "
            "release operations, capacity and toil, disaster recovery (RTO/RPO) and business "
            "continuity, runbooks and automation, DORA metrics, on-call and escalation, or asks to "
            "draft a postmortem."
        ),
        "focus": "SLO & error budget, observability, incident & problem, DR/BCP, DORA, on-call",
    },
    {
        "name": "role-deployment",
        "title": "Release Manager / Deployment",
        "page": "deployment.html",
        "reference": "handbook-deployment.md",
        "templates": [
            "deployment-runbook-rollback-plan",
            "release-go-no-go-checklist",
            "ci-cd-pipeline-documentation",
            "environment-configuration-document",
        ],
        "description": (
            "Release Manager / Deployment skill from the Power Home Handbook (Hybrid Water-Scrum-Fall "
            "release governance, SBV compliant). Use when the user asks about the 12-step release "
            "pipeline, CAB and ECAB procedure, segregation of duties, performance and security test "
            "gates, the release Definition of Done checklist, the executable deploy and rollback "
            "runbook (blue-green, canary), the 72-hour hypercare watch, or operations handover."
        ),
        "focus": "governance & SoD, release pipeline, CAB, release DoD, deploy & rollback, hypercare",
    },
    {
        "name": "role-pmo",
        "title": "PMO Governance & Portfolio",
        "page": "pmo.html",
        "reference": "handbook-pmo.md",
        "templates": [
            "pmo-charter-governance-framework",
            "stage-gate-review-template",
            "portfolio-status-report",
            "benefits-realization-plan",
        ],
        "description": (
            "PMO Governance & Portfolio skill from the Power Home Handbook (PMI, P3O, EVM). Use when "
            "the user asks about portfolio intake and stage gates, governance bodies and decision "
            "rights, consolidated RAID, cross-project dependencies, financial governance and EVM "
            "formulas, benefits realization, delivery standards and tailoring, OCM/ADKAR, resource "
            "and capacity management, assurance and audit, or portfolio KPIs and RAG reporting."
        ),
        "focus": "portfolio & intake, governance, RAID, EVM & benefits, standards, assurance, reporting",
    },
]

TEMPLATE_TITLES = {
    "business-requirements-document": "Business Requirements Document (BRD)",
    "requirements-traceability-matrix": "Requirements Traceability Matrix (RTM)",
    "software-requirements-specification": "Software Requirements Specification (SRS)",
    "use-case-specification": "Use Case Specification",
    "project-charter": "Project Charter",
    "project-management-plan": "Project Management Plan",
    "raid-log": "RAID Log",
    "status-report-one-page": "One-page Status Report",
    "epic-to-user-stories": "Epic to User Stories",
    "product-vision-roadmap": "Product Vision & Roadmap",
    "product-requirements-document": "Product Requirements Document (PRD)",
    "architecture-decision-record": "Architecture Decision Record (ADR)",
    "solution-architecture-document": "Solution Architecture Document",
    "api-specification": "API Specification",
    "non-functional-requirements-specification": "Non-Functional Requirements Specification",
    "user-persona-customer-journey-map": "User Persona & Customer Journey Map",
    "information-architecture-wireframe-brief": "Information Architecture & Wireframe Brief",
    "design-system-ui-style-guide": "Design System / UI Style Guide",
    "usability-test-plan-report": "Usability Test Plan & Report",
    "design-handoff-specification": "Design Handoff Specification",
    "test-strategy-test-plan": "Test Strategy & Test Plan",
    "test-case-specification": "Test Case Specification",
    "defect-report": "Defect Report",
    "test-summary-report": "Test Summary Report",
    "uat-plan": "UAT Plan",
    "threat-model-stride": "Threat Model (STRIDE)",
    "security-requirements-checklist": "Security Requirements Checklist",
    "security-risk-assessment": "Security Risk Assessment",
    "incident-response-plan": "Incident Response Plan",
    "compliance-gap-checklist": "Compliance Gap Checklist",
    "sli-slo-sla-document": "SLI / SLO / SLA Document",
    "operational-runbook": "Operational Runbook",
    "disaster-recovery-plan": "Disaster Recovery Plan",
    "deployment-runbook-rollback-plan": "Deployment Runbook & Rollback Plan",
    "release-go-no-go-checklist": "Release Go / No-Go Checklist",
    "ci-cd-pipeline-documentation": "CI/CD Pipeline Documentation",
    "environment-configuration-document": "Environment Configuration Document",
    "pmo-charter-governance-framework": "PMO Charter & Governance Framework",
    "stage-gate-review-template": "Stage Gate Review Template",
    "portfolio-status-report": "Portfolio Status Report",
    "benefits-realization-plan": "Benefits Realization Plan",
    "test-plan": "Test Plan (AUTO-GENERATED)",
    "blameless-postmortem": "Blameless Postmortem (AUTO-GENERATED)",
}

AUTO_GENERATED = {
    "test-plan": """<!-- AUTO-GENERATED: not in original handbook -->
# TEST PLAN — [ĐIỀN: tên dự án / release]

> Sinh tự động từ outline "Sản phẩm bàn giao QC" trong QC Testing Handbook
> (ISTQB CTFL v4.0). Điền các ô [ĐIỀN]; giữ thuật ngữ chuẩn bằng English.

## 1. Phạm vi & mục tiêu
- Phạm vi test (in-scope): [ĐIỀN: feature / module / release]
- Ngoài phạm vi (out-of-scope): [ĐIỀN]
- Mục tiêu chất lượng: [ĐIỀN: ví dụ 0 defect Critical/High mở khi exit]

## 2. Tiếp cận test (theo rủi ro)
| Hạng mục | Mức rủi ro (P×I) | Test level | Test type | Kỹ thuật thiết kế |
|---|---|---|---|---|
| [ĐIỀN] | [High/Med/Low] | [Unit/Integration/System/UAT] | [Functional/Regression/Performance/Security] | [EP/BVA/Decision Table/State Transition] |

## 3. Entry / Exit criteria
- Entry: [ĐIỀN: build deploy SIT thành công, smoke pass, dữ liệu test sẵn sàng]
- Exit: [ĐIỀN: coverage đạt, không Critical/Major mở, RTM phủ 100% yêu cầu]

## 4. Môi trường & dữ liệu
- Môi trường: [ĐIỀN: SIT/UAT topology]
- Dữ liệu test: [ĐIỀN: nguồn, masking theo chính sách bảo mật]

## 5. Lịch & phân công
| Hoạt động | Người phụ trách | Bắt đầu | Kết thúc |
|---|---|---|---|
| [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

## 6. Sản phẩm bàn giao
- Test Plan (tài liệu này) · Test Case/Script · Defect Log · RTM cập nhật · Test Summary Report

## 7. Rủi ro của việc test & giảm thiểu
| Rủi ro | Ảnh hưởng | Giảm thiểu |
|---|---|---|
| [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
""",
    "blameless-postmortem": """<!-- AUTO-GENERATED: not in original handbook -->
# BLAMELESS POSTMORTEM — [ĐIỀN: mã sự cố / tên]

> Sinh tự động từ template fields nêu trong Operations & SRE Runbook
> (Google SRE, NIST 800-61): summary · impact · timeline · root cause ·
> what went well/badly · action items. Tập trung vào hệ thống, không đổ lỗi cá nhân.

## 1. Tóm tắt (Summary)
[ĐIỀN: 3–5 câu — chuyện gì xảy ra, kéo dài bao lâu, đã khôi phục thế nào]

## 2. Ảnh hưởng (Impact)
- Người dùng ảnh hưởng: [ĐIỀN] · Thiệt hại ($ / giao dịch): [ĐIỀN]
- SLO bị vi phạm: [ĐIỀN] · Error budget tiêu hao: [ĐIỀN]

## 3. Dòng thời gian (Timeline — giờ ICT)
| Thời điểm | Sự kiện |
|---|---|
| [ĐIỀN] | Phát hiện (alert / báo cáo) |
| [ĐIỀN] | Declare SEV[1/2], chỉ định IC |
| [ĐIỀN] | Giảm thiểu / khôi phục dịch vụ |
| [ĐIỀN] | Xác nhận SLO trở lại bình thường |

## 4. Nguyên nhân gốc (Root cause — 5 Whys / Fishbone)
[ĐIỀN: chuỗi nguyên nhân; tách nguyên nhân kích hoạt vs nguyên nhân hệ thống]

## 5. Điều tốt / chưa tốt
- Tốt: [ĐIỀN]
- Chưa tốt: [ĐIỀN]

## 6. Action items (bắt buộc có owner + hạn)
| # | Hành động | Owner | Hạn | Trạng thái |
|---|---|---|---|---|
| 1 | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | Open |
""",
}


def skill_md(meta: dict) -> str:
    lines = [
        "---",
        f"name: {meta['name']}",
        "description: >-",
    ]
    desc = meta["description"]
    while desc:
        lines.append("  " + desc[:96].rsplit(" ", 1)[0] if len(desc) > 96 else "  " + desc)
        cut = len(lines[-1]) - 2
        desc = desc[cut:].lstrip()
    lines += ["---", ""]
    lines += [
        f"# {meta['title']} — Power Home Handbook",
        "",
        "Instructions for Claude:",
        "",
        f"1. This skill carries the **{meta['title']}** chapter of the Power Home Project",
        "   Handbook (Hybrid Water-Scrum-Fall, Vietnamese commercial bank, SBV-regulated).",
        f"   Scope: {meta['focus']}.",
        f"2. For anything beyond the summary here, load `references/{meta['reference']}`",
        "   — it is the full chapter, extracted verbatim from the handbook page.",
        "3. Follow the handbook's glossary policy: keep standard terms in English",
        "   (Sprint, Backlog, DoD, RTM, SLO, CAB, RACI...); answer prose in the",
        "   user's language (Vietnamese or English).",
        "4. Never invent policy that contradicts the chapter. If the handbook is",
        "   silent, say so and answer from the referenced framework instead"
        " (clearly labelled).",
    ]
    if meta["templates"]:
        lines += [
            "5. When the user asks to draft a document this role owns, load the matching",
            "   template below, keep its structure and numbering, fill what the user",
            "   provided, and leave every `[ĐIỀN: ...]` placeholder you cannot fill.",
            "   Templates are Vietnamese-first by design — keep them so unless asked.",
            "",
            "## Templates",
            "",
            "| Template | File |",
            "|---|---|",
        ]
        for stem in meta["templates"]:
            lines.append(f"| {TEMPLATE_TITLES[stem]} | `references/templates/{stem}.md` |")
    lines.append("")
    return "\n".join(lines)


PLUGIN_JSON = {
    "name": "project-handbook",
    "version": PLUGIN_VERSION,
    "description": (
        "Power Home SDLC Project Handbook: role-based skills (PO, BA, PM, SM, QC, SA, UX, "
        f"Security, Ops, Deployment, PMO) with {sum(len(skill['templates']) for skill in SKILLS)} document templates"
    ),
    "author": {"name": "Thiện Phạm (Power Home PO)"},
    "keywords": ["sdlc", "handbook", "templates", "banking", "water-scrum-fall"],
}


def build() -> None:
    if PLUGIN_ROOT.exists():
        shutil.rmtree(PLUGIN_ROOT)

    (PLUGIN_ROOT / ".claude-plugin").mkdir(parents=True)
    (PLUGIN_ROOT / ".claude-plugin" / "plugin.json").write_text(
        json.dumps(PLUGIN_JSON, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )

    total_templates = 0
    catalog_rows = []
    for meta in SKILLS:
        skill_dir = PLUGIN_ROOT / "skills" / meta["name"]
        refs = skill_dir / "references"
        refs.mkdir(parents=True)
        (skill_dir / "SKILL.md").write_text(skill_md(meta), encoding="utf-8")
        chapter = page_markdown(meta["page"])
        header = (
            f"# {meta['title']} — full handbook chapter\n\n"
            f"> Extracted from the Power Home Handbook page `pages/{meta['page']}` "
            f"(EN edition; a Vietnamese edition exists in the handbook app).\n\n"
        )
        (refs / meta["reference"]).write_text(header + chapter + "\n", encoding="utf-8")

        if meta["templates"]:
            tdir = refs / "templates"
            tdir.mkdir()
            for stem in meta["templates"]:
                preview_exists = (ROOT / "assets" / "templates" / "previews" / f"{stem}.html").is_file()
                if stem in AUTO_GENERATED and not preview_exists:
                    content = AUTO_GENERATED[stem]
                else:
                    content = (
                        f"# {TEMPLATE_TITLES[stem]}\n\n"
                        f"> Verbatim conversion of the handbook DOCX template "
                        f"`assets/templates/**/{stem}.docx` (Vietnamese-first; keep "
                        f"`[ĐIỀN: ...]` placeholders that the user has not answered).\n\n"
                        + preview_markdown(stem) + "\n"
                    )
                (tdir / f"{stem}.md").write_text(content, encoding="utf-8")
                total_templates += 1
        catalog_rows.append(
            f"| `{meta['name']}` | {meta['title']} | {len(meta['templates'])} |"
        )

    readme = f"""# Power Home Project Handbook — Claude Plugin

v{PLUGIN_VERSION} · generated from the handbook source by `scripts/build-plugin.py`

Installs the entire Power Home SDLC handbook as role-based Claude skills, so
anyone with the plugin can ask role questions and draft handbook-standard
documents without the original handbook.

## Skills ({len(SKILLS)})

| Skill | Role | Templates |
|---|---|---|
{chr(10).join(catalog_rows)}

**{total_templates} reviewed templates** total, converted from the same handbook
previews used by the in-page reader and DOCX downloads.

## Install

- **Cowork / Claude desktop:** drag & drop `project-handbook.plugin` into the chat.
- **Claude Code:** `claude plugin install ./project-handbook.plugin`

## Example prompts

- "Draft a BRD for feature X using the handbook template"
- "Phân rã epic thanh toán QR thành user stories theo chuẩn INVEST của handbook"
- "Viết Project Charter cho dự án onboarding số theo template Power Home"
- "What does the handbook say about the release DoD before CAB?"
- "Draft a blameless postmortem for yesterday's SEV2"

## Sync rule

The handbook is the single source of truth. Whenever handbook content changes:
run `python scripts/build-plugin.py` again, bump `version` (semver) in
`scripts/build-plugin.py`, and let it repackage
`assets/downloads/project-handbook.plugin`. The site's `#plugin` page serves
that file.

Classification: CONFIDENTIAL — internal use only, same boundary as the handbook.
"""
    (PLUGIN_ROOT / "README.md").write_text(readme, encoding="utf-8")

    decisions = f"""# DECISIONS.md — auto-decision log (one-shot build)

Plugin v{PLUGIN_VERSION}, generated {__import__('datetime').date.today().isoformat()} by `scripts/build-plugin.py`.

1. **Roles**: exactly the 11 role pages + the parent Implementation Handbook
   (overview skill). No roles invented. `home`/`handbook` routes are one page →
   one `handbook-overview` skill.
2. **Language policy**: reference chapters are extracted from the EN pages;
   templates stay Vietnamese-first (verbatim from the handbook DOCX renders).
   Rationale: the handbook's own glossary policy keeps standard terms in
   English while templates are Vietnamese; duplicating every chapter in both
   languages would double the plugin for no retrieval gain. The VI editions
   remain available in the handbook app.
3. **Template fidelity**: templates are converted 1:1 from
   `assets/templates/previews/*.html` — the same derived renders the site's
   reader and DOCX downloads are built from — so plugin, reader and download
   cannot drift. `[ĐIỀN: ...]` placeholders preserved.
4. **Template coverage**: all 42 plugin templates come from reviewed handbook
   preview/DOCX pairs. The former outline-only QC Test Plan and Ops Postmortem
   gaps are superseded by the role prompt-pack templates in library v0.2.0.
5. **Ownership boundary**: the duplicate PO-owned FSD was retired in v0.3.0;
   implementation-ready functional requirements now use BA-owned SRS as the
   single source of truth. QC coordinates UAT evidence; business owners sign off.
6. **Not included**: `Template/BA/Guideline Template.docx` (meta-guide about
   writing templates, not a project template — also unpublished on the site).
7. **Distribution**: packaged file is served from the handbook app at
   `assets/downloads/project-handbook.plugin` behind the same access boundary
   as the rest of the CONFIDENTIAL site; added to the publish allowlist
   explicitly.
8. **Sync rule**: regenerate + semver bump on any handbook change (see README).
"""
    (PLUGIN_ROOT / "DECISIONS.md").write_text(decisions, encoding="utf-8")

    # ── package ─────────────────────────────────────────────────────────
    PACKAGE_PATH.parent.mkdir(parents=True, exist_ok=True)
    if PACKAGE_PATH.exists():
        PACKAGE_PATH.unlink()
    with zipfile.ZipFile(PACKAGE_PATH, "w", zipfile.ZIP_DEFLATED) as z:
        for path in sorted(PLUGIN_ROOT.rglob("*")):
            if path.is_file():
                z.write(path, path.relative_to(PLUGIN_ROOT).as_posix())

    files = sum(1 for p in PLUGIN_ROOT.rglob("*") if p.is_file())
    print(f"[OK] plugin tree: {files} files, {len(SKILLS)} skills, {total_templates} templates")
    print(f"[OK] packaged {PACKAGE_PATH.relative_to(ROOT)} ({PACKAGE_PATH.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    build()
