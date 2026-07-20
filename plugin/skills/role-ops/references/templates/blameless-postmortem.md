# Blameless Postmortem

> Verbatim conversion of the handbook DOCX template `assets/templates/**/blameless-postmortem.docx` (Vietnamese-first; keep `[ĐIỀN: ...]` placeholders that the user has not answered).

**POWER HOME · OPERATIONS & SREBLAMELESS POSTMORTEMMASTER TEMPLATE · v1.0 · DRAFT**

| Trường | Giá trị kiểm soát |
|---|---|
| Mã tài liệu | [ĐIỀN: <TÊN DỰ ÁN>-83-v1.0-YYYYMMDD] |
| PIC duy nhất | Incident Commander của sự cố (SRE) |
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
| Mô tả sự cố & thời gian: [BẮT ĐẦU - PHÁT HIỆN - KHẮC PHỤC XONG] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| Tác động: [SỐ USER, DOANH THU, SLA VI PHẠM] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| Diễn biến thô: [DÁN GHI CHÚ/LOG/TIMELINE THÔ NẾU CÓ] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |

### 2. Nội dung tài liệu

#### 1. Tóm tắt

Tóm tắt: 3-5 câu — chuyện gì, tác động, đã xử lý thế nào

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 2. Impact định lượng

Impact định lượng: thời gian downtime, số user ảnh hưởng, error budget tiêu hao

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 3. Timeline chi tiết

Timeline chi tiết: mốc thời gian — sự kiện — hành động (khách quan, không phán xét)

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 4. Phân tích nguyên nhân gốc

Phân tích nguyên nhân gốc: dùng 5 Whys hoặc fishbone, phân biệt trigger (mồi lửa) và root cause (điều kiện nền)

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 5. Điều gì đã hoạt động tốt (what went well)

Điều gì đã hoạt động tốt (what went well) — để giữ lại

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 6. Điều gì chưa tốt & ở đâu gặp may (where we got lucky)

Điều gì chưa tốt & ở đâu gặp may (where we got lucky)

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 7. Action items

Action items: mỗi action có owner cụ thể + deadline + ticket ID, phân loại (prevent / detect faster / mitigate faster)

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 8. Bài học có thể áp dụng cho hệ thống khác

Bài học có thể áp dụng cho hệ thống khác

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

### 3. Biểu mẫu làm việc

**Incident timeline**

| Time | Event / Observation | Actor | Evidence |
|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 3] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

**Corrective actions**

| Action | Type | Owner | Due | Verification |
|---|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 3] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

### 4. Hướng dẫn chất lượng

- Blameless tuyệt đối: viết "hệ thống cho phép deploy không qua canary" thay vì "anh A deploy ẩu"

- Giả định mọi người đã hành động hợp lý với thông tin họ có tại thời điểm đó

- Action item không có owner + deadline = không tồn tại

- Postmortem hoàn thành trong [5] ngày làm việc sau sự cố khi trí nhớ còn tươi

- PIC phải review, chịu trách nhiệm nội dung và chuyển trạng thái theo vòng đời tài liệu.

- Không để lại secret thật; chỉ ghi tên biến và tham chiếu secret manager khi cần.
