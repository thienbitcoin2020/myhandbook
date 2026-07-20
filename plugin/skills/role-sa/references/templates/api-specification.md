# API Specification

> Verbatim conversion of the handbook DOCX template `assets/templates/**/api-specification.docx` (Vietnamese-first; keep `[ĐIỀN: ...]` placeholders that the user has not answered).

**POWER HOME · SOLUTION ARCHITECTAPI SPECIFICATIONMASTER TEMPLATE · v1.0 · DRAFT**

| Trường | Giá trị kiểm soát |
|---|---|
| Mã tài liệu | [ĐIỀN: <TÊN DỰ ÁN>-43-v1.0-YYYYMMDD] |
| PIC duy nhất | SA (phối hợp Dev Lead, QC) |
| Trạng thái | Draft → In Review → Approved → Superseded |
| Ngày hiệu lực | [ĐIỀN: dd/mm/yyyy] |
| Phân loại | MẬT (CONFIDENTIAL) · Lưu hành nội bộ |

**Nguyên tắc sử dụng: **Đây là template dùng chung, không gắn với dự án cụ thể. Giữ nguyên mọi ô [ĐIỀN...] cho đến khi PIC có dữ liệu được xác nhận; không tự suy diễn bối cảnh hay số liệu.

- Chỉ bản Approved được dùng làm căn cứ thực thi hoặc ra quyết định.

- Các role khác đóng góp qua review/input; chỉ PIC cập nhật bản chính.

- Mọi số liệu chưa xác nhận phải ghi [CẦN XÁC NHẬN].

### Kiểm soát tài liệu

**Revision History**

| Version | Ngày | Người sửa (PIC) | Nội dung thay đổi | Người duyệt |
|---|---|---|---|---|
| 1.0 | [ĐIỀN] | SA (phối hợp Dev Lead, QC) | Bản template đầu tiên | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

### Mục lục

Mở tài liệu trong Word và chọn Update Field để cập nhật mục lục.

**Output yêu cầu: **File Word (.docx), phần giải thích, kèm code block YAML OpenAPI đầy đủ.

### 1. Thông tin đầu vào

| Đầu vào bắt buộc | Giá trị / Tham chiếu | Trạng thái |
|---|---|---|
| Module / nghiệp vụ: [...] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| Resource chính: [...] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| Yêu cầu authentication: [OAuth2 / JWT / API key] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| Consumer của API: [web / mobile / 3rd party] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |

### 2. Nội dung tài liệu

#### 1. Nguyên tắc thiết kế

**Yêu cầu từ prompt: **Nguyên tắc thiết kế: RESTful resource naming, versioning (/v1), chuẩn phân trang – filter – sort

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

Quyết định / open point: [ĐIỀN hoặc ghi Không áp dụng kèm lý do]

#### 2. Với mỗi endpoint

**Yêu cầu từ prompt: **Với mỗi endpoint: method, path, mô tả, request/response schema, status codes, ví dụ JSON

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

Quyết định / open point: [ĐIỀN hoặc ghi Không áp dụng kèm lý do]

#### 3. Error response chuẩn hoá theo RFC 7807 (Problem Details)

**Yêu cầu từ prompt: **Error response chuẩn hoá theo RFC 7807 (Problem Details)

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

Quyết định / open point: [ĐIỀN hoặc ghi Không áp dụng kèm lý do]

#### 4. Rate limiting & idempotency key (cho các POST quan trọng)

**Yêu cầu từ prompt: **Rate limiting & idempotency key (cho các POST quan trọng)

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

Quyết định / open point: [ĐIỀN hoặc ghi Không áp dụng kèm lý do]

#### 5. Security scheme mô tả ngay trong spec

**Yêu cầu từ prompt: **Security scheme mô tả ngay trong spec

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

Quyết định / open point: [ĐIỀN hoặc ghi Không áp dụng kèm lý do]

#### 6. Xuất file YAML OpenAPI 3.1 hợp lệ, hoàn chỉnh

**Yêu cầu từ prompt: **Xuất file YAML OpenAPI 3.1 hợp lệ, hoàn chỉnh

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

Quyết định / open point: [ĐIỀN hoặc ghi Không áp dụng kèm lý do]

### 3. Biểu mẫu làm việc

**Danh mục API**

| API ID | Capability | Consumer | Owner | Status |
|---|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 3] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

**Đặc tả endpoint**

| Method / Path | Request | Response | Auth | Error / SLA |
|---|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 3] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

### 4. Nguyên tắc chất lượng

- Design-first: spec là contract, code phải theo spec — không ngược lại

- Quy tắc backward compatibility: liệt kê thay đổi nào được phép không tăng version

- Naming nhất quán (chọn snake_case hoặc camelCase và ghi rõ)

- PIC phải review, chịu trách nhiệm nội dung và chuyển trạng thái theo vòng đời tài liệu.

- Không để lại secret thật; chỉ ghi tên biến và tham chiếu secret manager khi cần.

### 5. Review & phê duyệt

**Sign-off**

| Vai trò | Họ tên | Kết luận | Ngày | Điều kiện / Ghi chú |
|---|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 3] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
