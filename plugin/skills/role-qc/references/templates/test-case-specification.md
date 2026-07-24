# Test Case Specification

> Verbatim conversion of the handbook DOCX template `assets/templates/**/test-case-specification.docx` (Vietnamese-first; keep `[ĐIỀN: ...]` placeholders that the user has not answered).

**BP · QC TESTINGTEST CASE TỪ USER STORYMASTER TEMPLATE · v1.0 · DRAFT**

| Trường | Giá trị kiểm soát |
|---|---|
| Mã tài liệu | [ĐIỀN: <TÊN DỰ ÁN>-62-v1.0-YYYYMMDD] |
| PIC duy nhất | QC Engineer |
| Trạng thái | Draft → In Review → Approved → Superseded |
| Ngày hiệu lực | [ĐIỀN: dd/mm/yyyy] |
| Phân loại | CÔNG KHAI (PUBLIC) · Bản công khai |

**Nguyên tắc sử dụng: **Đây là template dùng chung, không gắn với dự án cụ thể. Giữ nguyên mọi ô [ĐIỀN...] cho đến khi PIC có dữ liệu được xác nhận; không tự suy diễn bối cảnh hay số liệu.

- Chỉ bản Approved được dùng làm căn cứ thực thi hoặc ra quyết định.

- Các role khác đóng góp qua review/input; chỉ PIC cập nhật bản chính.

- Mọi số liệu chưa xác nhận phải ghi [CẦN XÁC NHẬN].

### 1. Thông tin đầu vào

| Đầu vào bắt buộc | Giá trị / Tham chiếu | Trạng thái |
|---|---|---|
| [DÁN USER STORY + AC — ưu tiên định dạng Gherkin nếu có] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |

### 2. Nội dung tài liệu

#### 1. Áp dụng tối thiểu 3 kỹ thuật

Áp dụng tối thiểu 3 kỹ thuật: Equivalence Partitioning, Boundary Value Analysis, Decision Table (nếu có logic điều kiện phức hợp)

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 2. Mỗi test case gồm

Mỗi test case gồm: ID (quy ước TC-[MODULE]-[SỐ]), tiêu đề, precondition, test data, các bước thực hiện đánh số, expected result cụ thể, loại (positive/negative), độ ưu tiên

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 3. Phủ đủ

Phủ đủ: happy path, negative case, boundary case, edge case (giá trị rỗng, ký tự đặc biệt, giá trị cực đại/cực tiểu)

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 4. Đánh dấu test case nào nên đưa vào regression suite

Đánh dấu test case nào nên đưa vào regression suite và test case nào phù hợp automation

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 5. Bảng traceability

Bảng traceability: Test Case ID ↔ AC ID ↔ User Story ID

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

### 3. Biểu mẫu làm việc

**Test cases**

| TC ID | Precondition | Steps | Expected result | Priority |
|---|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 3] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

**Traceability**

| TC ID | Requirement / AC | Test data | Result | Defect ID |
|---|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 3] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

### 4. Hướng dẫn chất lượng

- Expected result phải cụ thể, kiểm chứng được ("hiển thị thông báo X", không viết "hoạt động đúng")

- Test case độc lập nhau, không phụ thuộc thứ tự chạy trừ khi ghi rõ precondition

- Mỗi test case chỉ kiểm chứng 1 điều — không gộp nhiều kiểm chứng vào 1 case

- AC nào chưa đủ rõ để viết test → liệt kê câu hỏi gửi BA/PO, đánh dấu [CẦN XÁC NHẬN]

- PIC phải review, chịu trách nhiệm nội dung và chuyển trạng thái theo vòng đời tài liệu.

- Không để lại secret thật; chỉ ghi tên biến và tham chiếu secret manager khi cần.
