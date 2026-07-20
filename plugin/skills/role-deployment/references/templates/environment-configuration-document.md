# Environment Configuration Document

> Verbatim conversion of the handbook DOCX template `assets/templates/**/environment-configuration-document.docx` (Vietnamese-first; keep `[ĐIỀN: ...]` placeholders that the user has not answered).

**POWER HOME · DEPLOYMENT / DEVOPSENVIRONMENT CONFIGURATION DOCUMENTMASTER TEMPLATE · v1.0 · DRAFT**

| Trường | Giá trị kiểm soát |
|---|---|
| Mã tài liệu | [ĐIỀN: <TÊN DỰ ÁN>-104-v1.0-YYYYMMDD] |
| PIC duy nhất | DevOps Engineer |
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
| Danh sách môi trường: [DEV / STAGING / UAT / PROD...] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| Hạ tầng: [CLOUD PROVIDER, REGION, IAC TOOL NẾU CÓ] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| Điểm khác biệt đã biết giữa các môi trường: [MÔ TẢ] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |

### 2. Nội dung tài liệu

#### 1. Bảng so sánh môi trường

Bảng so sánh môi trường: mục đích, URL, hạ tầng (size/replica), DB (loại, size, data gì), third-party (sandbox hay live), ai được truy cập

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 2. Nguyên tắc parity

Nguyên tắc parity: staging giống prod ở điểm nào, khác ở điểm nào + lý do (chi phí, license) + rủi ro của khác biệt đó

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 3. Quản lý config

Quản lý config: config nào nằm ở env variable / config file / secret manager — quy ước đặt tên

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 4. Quản lý secret

Quản lý secret: công cụ lưu (Vault/AWS Secrets Manager...), quy trình cấp phát, chu kỳ rotate — TUYỆT ĐỐI không ghi giá trị secret thật vào tài liệu, chỉ ghi tên biến + nơi lấy

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 5. Data policy từng môi trường

Data policy từng môi trường: môi trường nào được dùng data thật (đã mask/ẩn danh chưa), quy tắc refresh data

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 6. IaC

IaC: repo nào quản lý môi trường nào, cách apply thay đổi, cấm sửa tay (configuration drift)

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 7. Quy trình xin cấp / thay đổi môi trường

Quy trình xin cấp / thay đổi môi trường: ai duyệt, SLA

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

### 3. Biểu mẫu làm việc

**Environment comparison**

| Dimension | DEV | SIT | UAT | PROD |
|---|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 3] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

**Configuration inventory**

| Variable / Resource | Reference | Owner | Drift check | Status |
|---|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 3] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

### 4. Hướng dẫn chất lượng

- Tài liệu này KHÔNG chứa secret thật — chỉ chứa tên biến và con trỏ đến secret manager

- Khác biệt staging vs prod phải được liệt kê tường minh — khác biệt ngầm là nguồn gốc "works on staging"

- Môi trường quản lý bằng IaC, sửa tay là vi phạm — mọi drift phải được phát hiện và xử lý

- PIC phải review, chịu trách nhiệm nội dung và chuyển trạng thái theo vòng đời tài liệu.

- Không để lại secret thật; chỉ ghi tên biến và tham chiếu secret manager khi cần.
