# Security Risk Assessment

> Verbatim conversion of the handbook DOCX template `assets/templates/**/security-risk-assessment.docx` (Vietnamese-first; keep `[ĐIỀN: ...]` placeholders that the user has not answered).

**POWER HOME · SECURITY & COMPLIANCESECURITY RISK ASSESSMENTMASTER TEMPLATE · v1.0 · DRAFT**

| Trường | Giá trị kiểm soát |
|---|---|
| Mã tài liệu | [ĐIỀN: <TÊN DỰ ÁN>-73-v1.0-YYYYMMDD] |
| PIC duy nhất | Security Engineer / CISO đại diện |
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
| Tài sản thông tin chính: [DATA, HỆ THỐNG, DỊCH VỤ] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| Bối cảnh triển khai: [CLOUD / ON-PREM / HYBRID, VENDOR LIÊN QUAN] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| Sự cố/lo ngại đã biết: [NẾU CÓ] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |

### 2. Nội dung tài liệu

#### 1. Danh mục tài sản (asset inventory) + phân loại CIA

Danh mục tài sản (asset inventory) + phân loại CIA (Confidentiality/Integrity/Availability) từng tài sản

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 2. Nhận diện threat & vulnerability cho từng tài sản quan trọng

Nhận diện threat & vulnerability cho từng tài sản quan trọng

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 3. Ma trận rủi ro

Ma trận rủi ro: Likelihood × Impact, thang 5×5, kèm định nghĩa từng mức

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 4. Xếp hạng rủi ro + risk owner đề xuất cho từng rủi ro

Xếp hạng rủi ro + risk owner đề xuất cho từng rủi ro

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 5. Phương án xử lý theo 4 chiến lược

Phương án xử lý theo 4 chiến lược: Mitigate / Transfer / Avoid / Accept

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 6. Kế hoạch xử lý rủi ro ưu tiên cao

Kế hoạch xử lý rủi ro ưu tiên cao: hành động, deadline, chi phí ước lượng

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 7. Rủi ro tồn dư (residual risk) sau xử lý + ai phê duyệt chấp nhận

Rủi ro tồn dư (residual risk) sau xử lý + ai phê duyệt chấp nhận

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

### 3. Biểu mẫu làm việc

**Security risk register**

| Risk ID | Scenario | Likelihood | Impact | Treatment |
|---|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 3] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

**Treatment plan**

| Action | Control owner | Due | Residual risk | Status |
|---|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 3] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

### 4. Hướng dẫn chất lượng

- Mỗi rủi ro có 1 risk owner cụ thể — không để "cả team chịu trách nhiệm"

- Risk acceptance phải có phê duyệt bằng văn bản của người có thẩm quyền

- Đánh giá lại định kỳ [QUÝ/NĂM] và khi có thay đổi lớn về hệ thống

- PIC phải review, chịu trách nhiệm nội dung và chuyển trạng thái theo vòng đời tài liệu.

- Không để lại secret thật; chỉ ghi tên biến và tham chiếu secret manager khi cần.

### 5. Phê duyệt quyết định

**Sign-off**

| Vai trò | Họ tên | Kết luận | Ngày | Điều kiện / Ghi chú |
|---|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
