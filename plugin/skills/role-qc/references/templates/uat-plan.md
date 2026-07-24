# UAT Plan

> Verbatim conversion of the handbook DOCX template `assets/templates/**/uat-plan.docx` (Vietnamese-first; keep `[ĐIỀN: ...]` placeholders that the user has not answered).

**BP · QC TESTINGUAT PLANMASTER TEMPLATE · v1.0 · DRAFT**

| Trường | Giá trị kiểm soát |
|---|---|
| Mã tài liệu | [ĐIỀN: <TÊN DỰ ÁN>-65-v1.0-YYYYMMDD] |
| PIC duy nhất | QC Lead |
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
| Phạm vi nghiệp vụ cần UAT: [MÔ TẢ / DÁN DANH SÁCH USE CASE] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| Người tham gia UAT: [PHÒNG BAN, SỐ LƯỢNG, MỨC ĐỘ THÀNH THẠO HỆ THỐNG] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| Khung thời gian UAT: [TỪ NGÀY - ĐẾN NGÀY] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |

### 2. Nội dung tài liệu

#### 1. Mục tiêu UAT & phân biệt với System Test (UAT

Mục tiêu UAT & phân biệt với System Test (UAT xác nhận "đúng nghiệp vụ", không phải tìm bug kỹ thuật)

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 2. UAT Scenario

UAT Scenario: viết theo ngôn ngữ nghiệp vụ, theo flow công việc thật hằng ngày của user (không copy test case kỹ thuật)

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 3. Lịch trình

Lịch trình: buổi kickoff/training, các phiên test, buổi tổng kết

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 4. Phân công

Phân công: scenario nào — user nào test — ai hỗ trợ

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 5. Môi trường & test data

Môi trường & test data: yêu cầu data giống thật (đã ẩn danh nếu là data thật)

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 6. Quy trình ghi nhận feedback/defect từ business user (form đơn

Quy trình ghi nhận feedback/defect từ business user (form đơn giản, không bắt user học tool QC)

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 7. Acceptance Criteria của UAT

Acceptance Criteria của UAT: điều kiện để business ký chấp nhận

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 8. Mẫu biên bản nghiệm thu UAT (sign-off form)

Mẫu biên bản nghiệm thu UAT (sign-off form)

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

### 3. Biểu mẫu làm việc

**UAT scenarios**

| UAT ID | Business scenario | Expected outcome | Business owner | Result |
|---|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 3] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

**UAT sign-off**

| Decision | Condition / Exception | Owner | Due date |
|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 3] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

### 4. Hướng dẫn chất lượng

- Scenario viết bằng ngôn ngữ nghiệp vụ thuần, tránh thuật ngữ kỹ thuật

- Mỗi scenario gắn với 1 quy trình nghiệp vụ thực tế end-to-end

- Kết quả UAT phải có chữ ký xác nhận của đại diện business — không nghiệm thu miệng

- PIC phải review, chịu trách nhiệm nội dung và chuyển trạng thái theo vòng đời tài liệu.

- Không để lại secret thật; chỉ ghi tên biến và tham chiếu secret manager khi cần.

### 5. Phê duyệt quyết định

**Sign-off**

| Vai trò | Họ tên | Kết luận | Ngày | Điều kiện / Ghi chú |
|---|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
