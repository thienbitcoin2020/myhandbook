# Incident Response Plan

> Verbatim conversion of the handbook DOCX template `assets/templates/**/incident-response-plan.docx` (Vietnamese-first; keep `[ĐIỀN: ...]` placeholders that the user has not answered).

**BP · SECURITY & COMPLIANCEINCIDENT RESPONSE PLANMASTER TEMPLATE · v1.0 · DRAFT**

| Trường | Giá trị kiểm soát |
|---|---|
| Mã tài liệu | [ĐIỀN: <TÊN DỰ ÁN>-74-v1.0-YYYYMMDD] |
| PIC duy nhất | Security Engineer |
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
| Hệ thống trong phạm vi & mức độ quan trọng: [MÔ TẢ] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| Công cụ monitoring/SIEM hiện có: [LIỆT KÊ] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| Nghĩa vụ báo cáo pháp lý: [GDPR / QUY ĐỊNH NGÀNH / KHÔNG RÕ — XÁC NHẬN THỜI HẠN ÁP DỤNG] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |

### 2. Nội dung tài liệu

#### 1. Phân loại sự cố

Phân loại sự cố: định nghĩa mức P1-P4 với ví dụ cụ thể từng mức

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 2. Quy trình 6 giai đoạn NIST

Quy trình 6 giai đoạn NIST: Preparation → Detection & Analysis → Containment → Eradication → Recovery → Post-Incident Activity, mỗi giai đoạn ghi rõ hành động + người thực hiện

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 3. Cây liên lạc (escalation matrix)

Cây liên lạc (escalation matrix): ai báo ai, trong bao lâu, kênh nào — kể cả ngoài giờ

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 4. Mẫu incident log

Mẫu incident log: timeline, hành động, quyết định, bằng chứng

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 5. Quy tắc bảo toàn chứng cứ (evidence preservation) trước khi khắc phục

Quy tắc bảo toàn chứng cứ (evidence preservation) trước khi khắc phục

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 6. Communication plan

Communication plan: nội bộ, khách hàng, cơ quan quản lý (kèm deadline pháp lý), báo chí (nếu có)

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 7. Tiêu chí đóng sự cố + yêu cầu post-incident review trong [X] ngày

Tiêu chí đóng sự cố + yêu cầu post-incident review trong [X] ngày

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 8. Lịch diễn tập (tabletop exercise) định kỳ

Lịch diễn tập (tabletop exercise) định kỳ

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

### 3. Biểu mẫu làm việc

**Incident roles**

| Role | Responsibility | Primary | Backup |
|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 3] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

**Response playbook**

| Phase | Trigger | Actions | Evidence | Owner |
|---|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 3] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

### 4. Hướng dẫn chất lượng

- Kế hoạch phải dùng được lúc 3h sáng: ngắn gọn, số điện thoại thật, không lý thuyết

- Containment ưu tiên trước khi tìm nguyên nhân gốc

- Post-incident review theo tinh thần blameless

- Chưa rõ nghĩa vụ pháp lý → đánh dấu [CẦN XÁC NHẬN] với Legal

- PIC phải review, chịu trách nhiệm nội dung và chuyển trạng thái theo vòng đời tài liệu.

- Không để lại secret thật; chỉ ghi tên biến và tham chiếu secret manager khi cần.

### 5. Phê duyệt quyết định

**Sign-off**

| Vai trò | Họ tên | Kết luận | Ngày | Điều kiện / Ghi chú |
|---|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
