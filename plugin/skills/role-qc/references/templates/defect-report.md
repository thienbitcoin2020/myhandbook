# Defect Report

> Verbatim conversion of the handbook DOCX template `assets/templates/**/defect-report.docx` (Vietnamese-first; keep `[ĐIỀN: ...]` placeholders that the user has not answered).

**BP · QC TESTINGDEFECT REPORT CHUẨNMASTER TEMPLATE · v1.0 · DRAFT**

| Trường | Giá trị kiểm soát |
|---|---|
| Mã tài liệu | [ĐIỀN: <TÊN DỰ ÁN>-63-v1.0-YYYYMMDD] |
| PIC duy nhất | QC Engineer (người phát hiện) |
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
| [MÔ TẢ THÔ: LÀM GÌ, THẤY GÌ, MONG ĐỢI GÌ, MÔI TRƯỜNG NÀO] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |

### 2. Nội dung tài liệu

#### 1. Tiêu đề

Tiêu đề: 1 dòng theo mẫu "[Module] Hành vi sai khi <điều kiện>"

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 2. Môi trường

Môi trường: build/version, OS, browser/device, test account

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 3. Precondition & test data sử dụng

Precondition & test data sử dụng

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 4. Steps to Reproduce

Steps to Reproduce: đánh số từng bước, ai làm theo cũng tái hiện được

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 5. Actual Result vs Expected Result (tách 2 mục rõ ràng,

Actual Result vs Expected Result (tách 2 mục rõ ràng, expected phải dẫn nguồn từ SRS/AC nào)

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 6. Severity + Priority kèm 1 câu lý do cho mỗi mức

Severity + Priority kèm 1 câu lý do cho mỗi mức

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 7. Tần suất tái hiện

Tần suất tái hiện: luôn luôn / thỉnh thoảng (kèm tỷ lệ ước lượng)

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 8. Bằng chứng đính kèm

Bằng chứng đính kèm: gợi ý screenshot/video/log cần chụp

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 9. Workaround (nếu có)

Workaround (nếu có)

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

### 3. Biểu mẫu làm việc

**Defect record**

| Field | Value / Evidence |
|---|---|
| [ĐIỀN 1] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] |
| [ĐIỀN 3] | [ĐIỀN] |

**Defect lifecycle**

| Status | Owner | Entry condition | Exit condition |
|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 3] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

### 4. Hướng dẫn chất lượng

- 1 defect = 1 lỗi duy nhất, không gộp nhiều lỗi vào 1 report

- Mô tả khách quan hành vi hệ thống, không suy đoán nguyên nhân trong phần mô tả (có thể ghi giả thuyết ở mục Note riêng)

- Kiểm tra trùng lặp trước khi log — nếu nghi trùng, ghi ID defect liên quan

- PIC phải review, chịu trách nhiệm nội dung và chuyển trạng thái theo vòng đời tài liệu.

- Không để lại secret thật; chỉ ghi tên biến và tham chiếu secret manager khi cần.
