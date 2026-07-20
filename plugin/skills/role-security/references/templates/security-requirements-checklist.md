# Security Requirements Checklist

> Verbatim conversion of the handbook DOCX template `assets/templates/**/security-requirements-checklist.docx` (Vietnamese-first; keep `[ĐIỀN: ...]` placeholders that the user has not answered).

**POWER HOME · SECURITY & COMPLIANCESECURITY REQUIREMENTS CHECKLISTMASTER TEMPLATE · v1.0 · DRAFT**

| Trường | Giá trị kiểm soát |
|---|---|
| Mã tài liệu | [ĐIỀN: <TÊN DỰ ÁN>-72-v1.0-YYYYMMDD] |
| PIC duy nhất | Security Engineer |
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
| Loại ứng dụng & mức nhạy cảm dữ liệu: [MÔ TẢ] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| ASVS Level mục tiêu: [L1 / L2 / L3 — nếu chưa rõ, đề xuất dựa trên rủi ro] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| Ràng buộc compliance: [GDPR / PCI DSS / ISO 27001 / KHÔNG] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |

### 2. Nội dung tài liệu

#### 1. Đề xuất ASVS Level + căn cứ

Đề xuất ASVS Level + căn cứ

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 2. Checklist yêu cầu theo nhóm

Checklist yêu cầu theo nhóm: Authentication, Session Management, Access Control, Input Validation, Cryptography, Error Handling & Logging, Data Protection, Communication Security, API Security

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 3. Mỗi yêu cầu

Mỗi yêu cầu: ID (SEC-XX), mô tả bằng ngôn ngữ dễ hiểu, ASVS reference, mức bắt buộc (MUST/SHOULD), cách kiểm chứng (test/review/scan)

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 4. Yêu cầu riêng theo compliance đã khai báo (VD

Yêu cầu riêng theo compliance đã khai báo (VD: GDPR — right to erasure, consent log)

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 5. Bảng bàn giao cho BA

Bảng bàn giao cho BA: yêu cầu nào đưa vào SRS mục nào

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

### 3. Biểu mẫu làm việc

**Security requirements**

| SEC ID | Requirement | Verification | Evidence | Status |
|---|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 3] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

**Control checklist**

| Domain | Control | Mandatory | Owner | Result |
|---|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 3] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

### 4. Hướng dẫn chất lượng

- Chọn control theo rủi ro thực tế, không bê nguyên cả bộ ASVS gây quá tải

- Mỗi yêu cầu phải kiểm chứng được — ghi rõ phương pháp verify

- Dùng từ khóa MUST/SHOULD theo RFC 2119

- PIC phải review, chịu trách nhiệm nội dung và chuyển trạng thái theo vòng đời tài liệu.

- Không để lại secret thật; chỉ ghi tên biến và tham chiếu secret manager khi cần.
