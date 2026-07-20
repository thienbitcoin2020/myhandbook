# Test Strategy & Test Plan

> Verbatim conversion of the handbook DOCX template `assets/templates/**/test-strategy-test-plan.docx` (Vietnamese-first; keep `[ĐIỀN: ...]` placeholders that the user has not answered).

**POWER HOME · QC TESTINGTEST STRATEGY & TEST PLANMASTER TEMPLATE · v1.0 · DRAFT**

| Trường | Giá trị kiểm soát |
|---|---|
| Mã tài liệu | [ĐIỀN: <TÊN DỰ ÁN>-61-v1.0-YYYYMMDD] |
| PIC duy nhất | QC Lead |
| Trạng thái | Draft → In Review → Approved → Superseded |
| Ngày hiệu lực | [ĐIỀN: dd/mm/yyyy] |
| Phân loại | MẬT (CONFIDENTIAL) · Lưu hành nội bộ |

**Nguyên tắc sử dụng: **Đây là template dùng chung, không gắn với dự án cụ thể. Giữ nguyên mọi ô [ĐIỀN...] cho đến khi PIC có dữ liệu được xác nhận; không tự suy diễn bối cảnh hay số liệu.

- Chỉ bản Approved được dùng làm căn cứ thực thi hoặc ra quyết định.

- Các role khác đóng góp qua review/input; chỉ PIC cập nhật bản chính.

- Mọi số liệu chưa xác nhận phải ghi [CẦN XÁC NHẬN].

### 1. Thông tin đầu vào

| Đầu vào bắt buộc | Giá trị / Tham chiếu | Trạng thái |
|---|---|---|
| Phạm vi release / sprint cần test: [MÔ TẢ] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| Loại ứng dụng & nền tảng: [WEB / MOBILE / API / DESKTOP] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| Mức độ rủi ro nghiệp vụ: [CAO / TRUNG BÌNH / THẤP + LÝ DO] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| Nguồn lực QC: [SỐ NGƯỜI, KỸ NĂNG, CÔNG CỤ] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |

### 2. Nội dung tài liệu

#### 1. Test Strategy (mức tổng)

Test Strategy (mức tổng): mục tiêu chất lượng, test level (unit/integration/system/UAT), test type (functional, regression, performance, security, usability), cách tiếp cận risk-based testing

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 2. Phạm vi

Phạm vi: In-scope / Out-of-scope (liệt kê rõ, không để ngầm hiểu)

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 3. Test Plan chi tiết

Test Plan chi tiết: lịch trình theo sprint/release, phân công, môi trường test, test data strategy

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 4. Entry Criteria & Exit Criteria cho từng test level

Entry Criteria & Exit Criteria cho từng test level

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 5. Suspension & Resumption Criteria (khi nào dừng test)

Suspension & Resumption Criteria (khi nào dừng test)

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 6. Defect management workflow

Defect management workflow: severity/priority matrix, SLA xử lý theo mức

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 7. Rủi ro của chính hoạt động test + phương án giảm thiểu

Rủi ro của chính hoạt động test + phương án giảm thiểu

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 8. Deliverables

Deliverables: danh sách báo cáo và tần suất

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

### 3. Biểu mẫu làm việc

**Test scope**

| Feature / Risk | Test level | Test type | Priority | Owner |
|---|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 3] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

**Entry / Exit criteria**

| Gate | Criterion | Evidence | Decision owner |
|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 3] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

### 4. Hướng dẫn chất lượng

- Áp dụng risk-based testing: tính năng rủi ro cao test sâu hơn, không dàn trải đều

- Exit criteria phải đo được (VD: "0 defect Critical/High mở, pass rate ≥ 95%"), không dùng từ mơ hồ

- Phân biệt rõ Severity (mức ảnh hưởng kỹ thuật) và Priority (thứ tự xử lý theo nghiệp vụ)

- Thông tin thiếu → đánh dấu [CẦN XÁC NHẬN]

- PIC phải review, chịu trách nhiệm nội dung và chuyển trạng thái theo vòng đời tài liệu.

- Không để lại secret thật; chỉ ghi tên biến và tham chiếu secret manager khi cần.
