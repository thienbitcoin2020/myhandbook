# Use Case Specification

> Verbatim conversion of the handbook DOCX template `assets/templates/**/use-case-specification.docx` (Vietnamese-first; keep `[ĐIỀN: ...]` placeholders that the user has not answered).

[ĐIỀN: TÊN CÔNG TY / TỔ CHỨC]

**[ĐIỀN: TÊN DỰ ÁN]USE CASE SPECIFICATION**

(Đặc tả Use Case theo chuẩn UML Use Case Description)

| Mã tài liệu | [ĐIỀN: UCS-<DỰ ÁN>-<MODULE>] |
|---|---|
| Chức năng / Module | [ĐIỀN: tên chức năng cần đặc tả] |
| Trạng thái | [ĐIỀN: Draft / In Review / Approved / Baselined] |
| Mức bảo mật | [ĐIỀN: Internal / Confidential] |

**MỤC LỤC**

### **1. Giới thiệu (Introduction)**

#### **1.1 Mục đích & phạm vi**

Tài liệu đặc tả chi tiết các use case của chức năng [ĐIỀN: tên chức năng], phục vụ đội phát triển hiện thực hóa, QC thiết kế test case, và stakeholder xác nhận hành vi hệ thống.

**Nghiệp vụ hiện tại (as-is, nếu có): **[ĐIỀN: mô tả ngắn quy trình hiện tại hoặc ghi "Chức năng mới — không có as-is"]

#### **1.2 Tài liệu tham chiếu**

| Mã | Tên tài liệu | Phiên bản | Nguồn / Link |
|---|---|---|---|
| REF-01 | [ĐIỀN: BRD / SRS liên quan] | [ĐIỀN] | [ĐIỀN] |
| REF-02 | [ĐIỀN: Business Rules Catalog (danh mục BRU-xxx)] | [ĐIỀN] | [ĐIỀN] |
| REF-03 | [ĐIỀN: NFR Specification] | [ĐIỀN] | [ĐIỀN] |
| REF-04 | [ĐIỀN: Wireframe / UI Design] | [ĐIỀN] | [ĐIỀN] |

#### **1.3 Danh mục Actor (Actor Catalog)**

| Actor | Mô tả / quyền hạn | Loại |
|---|---|---|
| [ĐIỀN: ví dụ End User] | [ĐIỀN] | Primary (con người) |
| [ĐIỀN: ví dụ Admin] | [ĐIỀN] | Primary (con người) |
| [ĐIỀN: Hệ thống X] | [ĐIỀN: hệ thống ngoài tham gia use case] | Secondary (hệ thống) |

#### **1.4 Danh sách Use Case (Use Case Overview)**

| UC ID | Tên Use Case | Actor chính | Priority | Trạng thái |
|---|---|---|---|---|
| UC-001 | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [Draft] |
| UC-002 | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [Draft] |

[ĐIỀN: chèn Use Case Diagram (UML) tổng quan tại đây — thể hiện actor, use case, quan hệ include / extend / generalization]

| Quy tắc viết use case (áp dụng cho toàn tài liệu):• Mỗi bước = 1 hành động duy nhất; actor và system xen kẽ rõ ràng (bước lẻ thường là actor, bước chẵn là system — hoặc ghi rõ chủ thể ở đầu mỗi bước).• Viết ở thì hiện tại, chủ động: "Actor chọn...", "Hệ thống hiển thị...". Không mô tả UI chi tiết (màu nút, vị trí) — tham chiếu wireframe [REF-04].• Alternative Flow (AF-x) = rẽ nhánh nghiệp vụ hợp lệ; Exception Flow (EF-x) = tình huống lỗi. Cả hai phải ghi rõ rẽ nhánh từ bước nào của Main Flow và kết thúc thế nào (quay lại bước N / kết thúc use case).• Mỗi Exception Flow bắt buộc nêu rõ hệ thống phản hồi gì cho người dùng (thông báo lỗi, trạng thái dữ liệu, hành động khắc phục).• Business rule không viết lẫn vào flow — tách thành BRU-xxx và tham chiếu tại bước áp dụng. |
|---|

### **2. UC-001: [ĐIỀN: Tên Use Case — bắt đầu bằng động từ]**

#### **2.1 Thông tin chung**

| UC ID | UC-001 |
|---|---|
| Use Case Name | [ĐIỀN: động từ + đối tượng, ví dụ dạng "Tạo...", "Phê duyệt...", "Tra cứu..."] |
| Primary Actor | [ĐIỀN] |
| Secondary Actor(s) | [ĐIỀN: hệ thống ngoài / actor phụ, hoặc N/A] |
| Brief Description | [ĐIỀN: 2–3 câu — actor đạt được mục tiêu gì, giá trị nghiệp vụ] |
| Priority | [ĐIỀN: Must / Should / Could — PO xác nhận] |
| Trace về yêu cầu | [ĐIỀN: BR-xxx / FR-xxx / User Story ID] |
| Quan hệ UC khác | [ĐIỀN: include UC-xxx / extend UC-xxx / N/A] |

#### **2.2 Preconditions / Postconditions**

| Preconditions | [ĐIỀN: trạng thái phải đúng TRƯỚC khi use case bắt đầu — ví dụ: actor đã đăng nhập với quyền X; bản ghi Y tồn tại ở trạng thái Z] |
|---|---|
| Postconditions (Success) | [ĐIỀN: trạng thái hệ thống SAU khi main flow hoàn tất thành công — dữ liệu nào được tạo/cập nhật, thông báo nào được gửi] |
| Postconditions (Failure) | [ĐIỀN: trạng thái hệ thống khi use case kết thúc không thành công — đảm bảo không có dữ liệu dở dang] |

#### **2.3 Trigger**

[ĐIỀN: sự kiện khởi phát use case — actor chọn chức năng trên menu / hệ thống nhận request từ hệ thống X / đến lịch batch...]

#### **2.4 Main Flow (Luồng chính)**

| Bước | Chủ thể | Hành động (1 bước = 1 hành động) |
|---|---|---|
| 1 | Actor | [ĐIỀN: actor thực hiện hành động khởi đầu] |
| 2 | System | [ĐIỀN: hệ thống phản hồi — hiển thị màn hình / dữ liệu gì] |
| 3 | Actor | [ĐIỀN: actor nhập liệu / lựa chọn] |
| 4 | System | [ĐIỀN: hệ thống validate theo BRU-[ĐIỀN] → xử lý → phản hồi kết quả] |
| ... | [ĐIỀN] | [ĐIỀN: thêm bước đến khi đạt Postcondition (Success). Use case kết thúc.] |

#### **2.5 Alternative Flows (Luồng thay thế)**

| Mã AF | Rẽ nhánh từ | Điều kiện rẽ nhánh | Các bước & điểm quay lại / kết thúc |
|---|---|---|---|
| AF-1 | Bước [ĐIỀN] của Main Flow | [ĐIỀN: điều kiện nghiệp vụ hợp lệ — ví dụ: actor chọn phương án khác] | AF-1.1: [ĐIỀN: Actor...]AF-1.2: [ĐIỀN: Hệ thống...]Kết thúc: [ĐIỀN: quay lại bước N của Main Flow / use case kết thúc] |
| AF-2 | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

#### **2.6 Exception Flows (Luồng ngoại lệ)**

| Mã EF | Rẽ nhánh từ | Tình huống lỗi | Xử lý & phản hồi cho người dùng (bắt buộc) |
|---|---|---|---|
| EF-1 | Bước [ĐIỀN] | Lỗi validation: [ĐIỀN: dữ liệu không hợp lệ theo BRU-[ĐIỀN]] | [ĐIỀN: Hệ thống hiển thị thông báo "..." tại field lỗi; giữ nguyên dữ liệu đã nhập; actor sửa và quay lại bước N] |
| EF-2 | Bước [ĐIỀN] | Timeout / mất kết nối với [ĐIỀN: hệ thống tích hợp] | [ĐIỀN: Hệ thống hiển thị thông báo "..."; ghi log; trạng thái dữ liệu = [ĐIỀN]; cơ chế retry (nếu có); use case kết thúc] |
| EF-3 | Bước [ĐIỀN] | Actor hết quyền / phiên hết hạn | [ĐIỀN: Hệ thống hiển thị thông báo "..." và điều hướng về [ĐIỀN: màn hình đăng nhập]; dữ liệu chưa lưu xử lý thế nào] |
| EF-4 | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

#### **2.7 Business Rules áp dụng**

| Mã BRU | Nội dung rule (tóm tắt — bản chính tại REF-02) | Áp dụng tại bước |
|---|---|---|
| BRU-[ĐIỀN] | [ĐIỀN] | Main Flow bước [ĐIỀN] / EF-[ĐIỀN] |
| BRU-[ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

#### **2.8 Special Requirements / NFR liên quan**

| Nhóm | Yêu cầu / tham chiếu | Nguồn |
|---|---|---|
| Performance | [ĐIỀN: ví dụ — thời gian phản hồi bước N; hoặc tham chiếu NFR Spec §...] | [ĐIỀN: REF-03 §...] |
| Security | [ĐIỀN: phân quyền, audit log, masking dữ liệu nhạy cảm...] | [ĐIỀN] |
| Usability | [ĐIỀN hoặc N/A] | [ĐIỀN] |
| [ĐIỀN: khác] | [ĐIỀN hoặc N/A] | [ĐIỀN] |

#### **2.9 Open Issues**

| Mã | Vấn đề còn mở | Người chịu trách nhiệm | Hạn xử lý | Trạng thái |
|---|---|---|---|---|
| OI-[ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [Open] |

Nhân bản mục UC-001 cho mỗi use case mới; giữ mã UC duy nhất và cập nhật bảng Use Case Overview ở mục 1.4.
