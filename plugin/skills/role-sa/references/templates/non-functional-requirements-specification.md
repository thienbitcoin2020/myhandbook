# Non-Functional Requirements Specification

> Verbatim conversion of the handbook DOCX template `assets/templates/**/non-functional-requirements-specification.docx` (Vietnamese-first; keep `[ĐIỀN: ...]` placeholders that the user has not answered).

**POWER HOME · SOLUTION ARCHITECTNFR SPECIFICATIONMASTER TEMPLATE · v1.0 · DRAFT**

| Trường | Giá trị kiểm soát |
|---|---|
| Mã tài liệu | [ĐIỀN: <TÊN DỰ ÁN>-44-v1.0-YYYYMMDD] |
| PIC duy nhất | SA (input từ BA, SRE, Security) |
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
| Lượng user / traffic dự kiến (hiện tại & 2 năm tới): [...] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| Mức độ quan trọng của hệ thống: [mission-critical / business-critical / internal] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| Yêu cầu tuân thủ: [GDPR / PCI DSS / nghị định địa phương...] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |

### 2. Nội dung tài liệu

#### 1. Performance (response time p95/p99, throughput)

Performance (response time p95/p99, throughput)

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 2. Availability & Reliability (uptime %, RTO/RPO, MTTR)

Availability & Reliability (uptime %, RTO/RPO, MTTR)

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 3. Scalability (horizontal/vertical, giới hạn thiết kế)

Scalability (horizontal/vertical, giới hạn thiết kế)

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 4. Security (map sang OWASP ASVS level, chuẩn mã hoá)

Security (map sang OWASP ASVS level, chuẩn mã hoá)

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 5. Usability & Accessibility (WCAG 2.2 AA)

Usability & Accessibility (WCAG 2.2 AA)

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 6. Maintainability (test coverage tối thiểu, quality gate)

Maintainability (test coverage tối thiểu, quality gate)

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 7. Compatibility (ma trận browser/OS/device)

Compatibility (ma trận browser/OS/device)

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 8. Compliance & Auditability (log retention, audit trail) Format mỗi NFR

Compliance & Auditability (log retention, audit trail) Format mỗi NFR: NFR-xxx | Category | Mô tả đo được | Target | Cách đo/verify | Priority | Nguồn (BA/SRE/Security)

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

### 3. Biểu mẫu làm việc

**NFR Register**

| NFR ID | Quality attribute | Metric / Target | Verification | Owner |
|---|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 3] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

**Quality Attribute Scenario**

| Source | Stimulus | Environment | Response | Measure |
|---|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 3] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

### 4. Hướng dẫn chất lượng

- Cấm từ mơ hồ ("nhanh", "an toàn", "ổn định") — mọi NFR phải testable

- NFR xung đột nhau (VD security vs performance) phải nêu trade-off và quyết định chọn

- PIC phải review, chịu trách nhiệm nội dung và chuyển trạng thái theo vòng đời tài liệu.

- Không để lại secret thật; chỉ ghi tên biến và tham chiếu secret manager khi cần.
