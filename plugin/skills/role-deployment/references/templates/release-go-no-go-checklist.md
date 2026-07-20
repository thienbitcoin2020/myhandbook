# Release Go / No-Go Checklist

> Verbatim conversion of the handbook DOCX template `assets/templates/**/release-go-no-go-checklist.docx` (Vietnamese-first; keep `[ĐIỀN: ...]` placeholders that the user has not answered).

**POWER HOME · DEPLOYMENT / DEVOPSRELEASE CHECKLIST GO/NO-GOMASTER TEMPLATE · v1.0 · DRAFT**

| Trường | Giá trị kiểm soát |
|---|---|
| Mã tài liệu | [ĐIỀN: <TÊN DỰ ÁN>-102-v1.0-YYYYMMDD] |
| PIC duy nhất | Release Engineer / DevOps |
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
| Release & phạm vi: [VERSION, TÍNH NĂNG CHÍNH] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| Ngày Go/No-Go meeting & ngày release dự kiến: [NGÀY] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| Các bên tham gia xác nhận: [DANH SÁCH ROLE CÓ TRONG DỰ ÁN] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |

### 2. Nội dung tài liệu

#### 1. Code & Build

Code & Build: code freeze đúng hạn, build thành công, artifact đã tag version, không còn PR treo trong scope

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 2. Testing

Testing: test summary report phát hành, exit criteria đạt, defect Critical/High = 0 hoặc có waiver được duyệt, regression pass, UAT sign-off

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 3. Security

Security: security scan không còn finding High trở lên chưa xử lý, secret không nằm trong code, pentest (nếu yêu cầu) đã xong

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 4. Tài liệu

Tài liệu: release notes sẵn sàng, tài liệu user cập nhật, API doc cập nhật, runbook deploy đã review

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 5. Vận hành

Vận hành: monitoring/alert cấu hình cho tính năng mới, capacity đủ, backup trước deploy đã lên lịch, rollback plan đã review, on-call sắp xếp

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 6. Nghiệp vụ

Nghiệp vụ: PO chấp nhận, thông báo khách hàng/CS chuẩn bị, kế hoạch truyền thông (nếu có), pháp lý/compliance clear (nếu liên quan)

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 7. Rollback readiness

Rollback readiness: tiêu chí rollback thống nhất, người có quyền quyết định rollback được chỉ định, rollback đã test trên staging Kèm theo:

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 8. Mẫu biên bản Go/No-Go

Mẫu biên bản Go/No-Go: quyết định (GO / GO CÓ ĐIỀU KIỆN / NO-GO), điều kiện kèm theo, người quyết định ký, ngày giờ

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 9. Quy tắc

Quy tắc: mục nào ❌ mà không có waiver được duyệt → mặc định NO-GO

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

### 3. Biểu mẫu làm việc

**Go / No-Go checklist**

| Gate item | Evidence | Confirming role | Result | Comment |
|---|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 3] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

**Release decision**

| Decision | Condition | Decision owner | Time |
|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 3] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

### 4. Hướng dẫn chất lượng

- Mỗi mục checklist phải có ĐÚNG 1 bên xác nhận — không có mục "của chung"

- Waiver (bỏ qua tiêu chí) phải có người duyệt tên tuổi rõ ràng + lý do văn bản

- Checklist rút gọn theo mức rủi ro release (hotfix ≠ major release) — đề xuất 2 phiên bản

- PIC phải review, chịu trách nhiệm nội dung và chuyển trạng thái theo vòng đời tài liệu.

- Không để lại secret thật; chỉ ghi tên biến và tham chiếu secret manager khi cần.

### 5. Phê duyệt quyết định

**Sign-off**

| Vai trò | Họ tên | Kết luận | Ngày | Điều kiện / Ghi chú |
|---|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
