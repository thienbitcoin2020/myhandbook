# Threat Model (STRIDE)

> Verbatim conversion of the handbook DOCX template `assets/templates/**/threat-model-stride.docx` (Vietnamese-first; keep `[ĐIỀN: ...]` placeholders that the user has not answered).

**POWER HOME · SECURITY & COMPLIANCETHREAT MODEL (STRIDE)MASTER TEMPLATE · v1.0 · DRAFT**

| Trường | Giá trị kiểm soát |
|---|---|
| Mã tài liệu | [ĐIỀN: <TÊN DỰ ÁN>-71-v1.0-YYYYMMDD] |
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
| Kiến trúc hệ thống: [DÁN MÔ TẢ TỪ SAD / COMPONENT DIAGRAM] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| Luồng dữ liệu chính & loại dữ liệu nhạy cảm: [PII / TÀI CHÍNH / SỨC KHỎE...] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| Trust boundary: [INTERNET-FACING, INTERNAL, THIRD-PARTY INTEGRATION] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |

### 2. Nội dung tài liệu

#### 1. Data Flow Diagram

Data Flow Diagram: vẽ bằng Mermaid, đánh dấu trust boundary rõ ràng

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 2. Phân rã hệ thống

Phân rã hệ thống: external entity, process, data store, data flow

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 3. Bảng phân tích STRIDE cho từng thành phần

Bảng phân tích STRIDE cho từng thành phần: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 4. Đánh giá rủi ro từng threat

Đánh giá rủi ro từng threat: Likelihood × Impact (thang 1-5), xếp hạng

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 5. Mitigation cho từng threat mức Medium trở lên

Mitigation cho từng threat mức Medium trở lên: biện pháp cụ thể, tham chiếu OWASP ASVS control tương ứng

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 6. Threat chấp nhận rủi ro (risk acceptance)

Threat chấp nhận rủi ro (risk acceptance): lý do + người phê duyệt

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 7. Danh sách hành động đưa vào backlog

Danh sách hành động đưa vào backlog: ưu tiên, gợi ý assignee

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

### 3. Biểu mẫu làm việc

**STRIDE register**

| Asset / Flow | Threat | STRIDE | Risk | Mitigation |
|---|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 3] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

**Trust boundaries**

| Boundary | Data crossing | Control | Owner |
|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 3] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

#### Data Flow Diagram

Hình minh hoạ là khung placeholder. PIC phải thay nhãn bằng nội dung dự án đã xác nhận.

#### Phụ lục · Mã Mermaid cho Data Flow Diagram

flowchart LR EXT[External entity] --> BOUNDARY[Trust boundary] BOUNDARY --> SYSTEM[System] SYSTEM --> STORE[(Data store)]

### 4. Hướng dẫn chất lượng

- Threat model làm ở giai đoạn thiết kế, cập nhật khi kiến trúc thay đổi đáng kể

- Mỗi mitigation phải map về ASVS control ID để kiểm chứng được

- Không đánh giá thấp insider threat và third-party risk

- Thông tin kiến trúc thiếu → đánh dấu [CẦN XÁC NHẬN] với SA

- PIC phải review, chịu trách nhiệm nội dung và chuyển trạng thái theo vòng đời tài liệu.

- Không để lại secret thật; chỉ ghi tên biến và tham chiếu secret manager khi cần.
