# Business Requirements Document (BRD)

> Verbatim conversion of the handbook DOCX template `assets/templates/**/business-requirements-document.docx` (Vietnamese-first; keep `[ĐIỀN: ...]` placeholders that the user has not answered).

### TÀI LIỆU YÊU CẦU KINH DOANH (BUSINESS REQUIREMENT DOCUMENT)

| Hạng mục | Nội dung chi tiết |
|---|---|
| Tên Dự án |  |
| Mã Dự án | [Mã số quản lý nội bộ] |
| Phiên bản |  |
| Trạng thái |  |
| Ngày cập nhật |  |

#### **PHẦN I: TỔNG QUAN VÀ CHIẾN LƯỢC (STRATEGIC CONTEXT)**

Phần này định hướng cho toàn bộ dự án, đảm bảo mọi tính năng được phát triển sau này đều phục vụ mục tiêu kinh doanh cốt lõi.

##### **1. Tóm tắt Điều hành và Động lực Kinh doanh (Executive Summary & Business Drivers)**

Phần này tích hợp từ 1 và 1 để bù đắp cho sự thiếu hụt của.1

**1.1. Bối cảnh Kinh doanh (Business Background):**

- **Hiện trạng (Current State):** Mô tả ngắn gọn vấn đề, nỗi đau (pain points) hiện tại. Ví dụ: Quy trình hiện tại thủ công, tốn 5 ngày để tổng hợp dữ liệu.

- **Cơ hội/Vấn đề (Business Opportunity/Problem):** Cơ hội thị trường hoặc vấn đề nội bộ cần giải quyết.

**1.2. Động lực Kinh doanh (Business Drivers):**

- Tại sao làm dự án này ngay bây giờ? (Ví dụ: Thay đổi quy định pháp luật, Áp lực cạnh tranh, Chiến lược chuyển đổi số).

**1.3. Mục tiêu Sản phẩm & KPIs (Product Goals & Success Metrics):** Sử dụng bảng để định lượng thành công, theo chuẩn.1

| Mục tiêu Kinh doanh (Objective) | Mô tả chi tiết | Kết quả then chốt (Key Result / KPI) | Sự liên kết chiến lược |
|---|---|---|---|
| Tự động hóa quy trình | Loại bỏ thao tác nhập liệu thủ công | Giảm 80% thời gian xử lý hồ sơ | Tối ưu hóa vận hành |
| Nâng cao trải nghiệm | Cải thiện giao diện người dùng | NPS đạt 50+ | Lấy khách hàng làm trung tâm |

##### **2. Phạm vi Dự án (Project Scope)**

Xác định rõ ranh giới dự án để tránh Scope Creep.1

- **Trong phạm vi (In-Scope):** Liệt kê các Module chính (Ví dụ: Module Vận hành, Module Báo cáo, App Mobile cho nhân viên).

- **Ngoài phạm vi (Out-of-Scope):** Các tính năng sẽ không làm trong giai đoạn này (Ví dụ: Tích hợp AI dự báo, Hỗ trợ đa ngôn ngữ).

##### **PHẦN II: HÀNH TRÌNH NGƯỜI DÙNG VÀ QUY TRÌNH (USER JOURNEY & PROCESS)**

Phần này kết nối quy trình nghiệp vụ với trải nghiệm người dùng, đảm bảo tính nhân văn trong thiết kế hệ thống.

##### **1. Chân dung Người dùng (User Personas)**

Mô tả ai sẽ dùng hệ thống.1

| Persona | Vai trò | Mục tiêu chính (Goals) | Nỗi đau hiện tại (Pain Points) |
|---|---|---|---|
| Admin Vận hành | Quản trị hệ thống | Cấu hình tham số nhanh chóng, chính xác | Mất quá nhiều thời gian để setup kỳ đánh giá mới |
| Manager | Phê duyệt đánh giá | Theo dõi tiến độ team dễ dàng | Không có cái nhìn tổng quan, phải check từng email |

##### **2. Hành trình Khách hàng và Quy trình Nghiệp vụ (Customer Journey & Business Process)**

Tích hợp checklist chi tiết từ 1 vào luồng nghiệp vụ của.1

**2.1. Các giai đoạn Hành trình (Journey Stages):**

| Giai đoạn | Hoạt động của Người dùng (User Activities) | Quy trình Kinh doanh Hỗ trợ (Internal Processes) | Điểm chạm Hệ thống (System Touchpoints) |
|---|---|---|---|
| Nhận biết (Awareness) | Người dùng nhận email thông báo kỳ đánh giá | Hệ thống scheduler kích hoạt job gửi email | Email Notification Service |
| Cân nhắc (Consideration) | Người dùng xem lại KPI kỳ trước để tham khảo | Hệ thống truy xuất dữ liệu lịch sử | Module Báo cáo Lịch sử |
| Quyết định (Decision) | Người dùng nhập điểm và nhấn "Gửi duyệt" | Validate dữ liệu, kích hoạt luồng phê duyệt | Workflow Engine |
| Sau mua/Sử dụng (Post-Purchase) | Người dùng theo dõi trạng thái phê duyệt | Cập nhật dashboard thời gian thực | Dashboard & Notification |

**2.2. Sơ đồ Luồng Nghiệp vụ (Business Process Diagram):**

- Chèn biểu đồ BPMN hoặc Flowchart minh họa luồng đi của dữ liệu và quy trình phê duyệt (tương tự 1).

##### **PHẦN III: YÊU CẦU CHỨC NĂNG CHI TIẾT (FUNCTIONAL REQUIREMENTS) - MÔ HÌNH LAI (HYBRID)**

Đây là phần trọng tâm, áp dụng cấu trúc chi tiết xuất sắc của 1 để biến BRD thành tài liệu có thể code được (Development-ready).

Nguyên tắc tổ chức:**Phân hệ (Module) -> Nhóm chức năng (Epic) -> Câu chuyện người dùng (User Story).**

##### **1. Phân hệ:1.1. Epic:1.1.1. Giá trị Kinh doanh (Business Value):**

- Giải thích ngắn gọn tại sao Epic này quan trọng (Ví dụ: Đảm bảo bảo mật dữ liệu theo chuẩn ISO 27001).

**1.1.2. Ma trận User Story và Tiêu chí Chấp nhận (User Story & AC Matrix):** Sử dụng bảng chi tiết từ 1 - Đây là Best Practice cho 2025.

| Mã US | Tên US | User Story | Acceptance Criteria (AC) Chi tiết |
|---|---|---|---|
| UM01 | Xem danh sách | Là một Admin, Tôi muốn xem danh sách user, Để quản lý quyền truy cập. | Quy tắc hiển thị dữ liệu: Hiển thị bảng gồm: Mã NV, Tên, Email, Đơn vị (Cấp 1-6), Vai trò, Trạng thái. User bị xóa vai trò sẽ tự động ẩn (Soft delete logic). Quy tắc sắp xếp: Mặc định: Ngày tạo giảm dần. Quy tắc phân trang: Hiển thị 20/50/100 bản ghi/trang. Lazy loading khi cuộn trang (nếu áp dụng). |
| UM02 | Tìm kiếm nâng cao | Là một Admin, Tôi muốn lọc user theo tiêu chí, Để tìm nhanh người cần sửa. | Tiêu chí lọc: Đơn vị (Dropdown tree), Vai trò (Multi-select), Trạng thái. Logic tìm kiếm: Kết hợp điều kiện AND giữa các bộ lọc. Tìm kiếm text: LIKE %keyword%, không phân biệt hoa/thường/dấu tiếng Việt.1 |

**1.1.3. Đặc tả Giao diện và Luồng Màn hình (UI Specifications & Screen Flow):** Tích hợp bảng mô tả UI từ 1 để làm rõ yêu cầu cho Frontend Dev.

**Tên Màn hình:Tham chiếu Mockup:**

| # | Thành phần UI (Element) | Mapping US | Mô tả Hành vi & Logic (Behavior & Logic) |
|---|---|---|---|
| 1 | Search Bar | UM02 | Placeholder: "Nhập tên, mã nhân viên..." Trigger: Sự kiện OnEnter hoặc click icon Search. Logic: Tự động trim khoảng trắng đầu/cuối. |
| 2 | Button "Export" | UM05 | Trạng thái: Luôn Enable. Hành động: Gọi API export, hiển thị Toast message "Đang xử lý". Output: File Excel định dạng UserList_{TimeStamp}.xlsx. |
| 3 | Cột "Trạng thái" | UM01 | Render badge màu: Xanh (Active), Xám (Inactive), Đỏ (Locked). |

##### **PHẦN IV: LOGIC HỆ THỐNG VÀ DỮ LIỆU (SYSTEM LOGIC & DATA)**

Phần này bổ sung sự thiếu hụt của các BRD truyền thống bằng cách định nghĩa rõ "Bộ não" của hệ thống, học hỏi từ.1

##### **1. Quy tắc Nghiệp vụ và Logic Xử lý (Business Rules & Processing Logic)1.1. Các quy tắc chung (Common Rules):**

- **Định dạng dữ liệu:** Ngày tháng (dd/mm/yyyy), Tiền tệ (VND, phân cách hàng nghìn).

- **Quy tắc nhập liệu:** Chặn ký tự đặc biệt trong tên, Email phải đúng định dạng regex.

**1.2. Logic Tự động hóa và Đồng bộ (Automation & Sync Logic):** Mô tả các tiến trình chạy nền (Background Jobs).1

| Tên Job | Thời điểm chạy (Trigger) | Nguồn dữ liệu (Source) | Logic xử lý chi tiết (Algorithm) |
|---|---|---|---|
| Sync Data HRM | 00:00 Hàng ngày | Core HR System (API GetEmployee) | Quét toàn bộ NV có Status = Active. So sánh Hash dữ liệu để phát hiện thay đổi. Update Đơn vị/Chức danh vào DB KPI. Log lịch sử đồng bộ. |
| Auto-Submit KPI | Ngày A+1 của kỳ đánh giá | Bảng KPI_Result | Tìm các bản ghi chưa submit. Chuyển trạng thái sang "Đã nộp tự động". Gửi noti cho Quản lý. |

**1.3. Quy tắc Xác thực (Validation Rules):** Xử lý các trường hợp ngoại lệ (Unhappy Paths).1

- **Import Validation:**

- File > 10MB -> Báo lỗi cụ thể.

- Sai template -> Báo lỗi "Sai định dạng, vui lòng tải template chuẩn".

- Dữ liệu trùng khóa chính -> Ghi đè hoặc Báo lỗi (tùy cấu hình).

##### **PHẦN V: YÊU CẦU PHI CHỨC NĂNG VÀ TIÊU CHUẨN NGHIỆM THU (NFR & ACCEPTANCE)**

Phần này đảm bảo chất lượng và độ ổn định của hệ thống, tích hợp từ 1 và.1

##### **1. Yêu cầu Phi chức năng (Non-Functional Requirements - NFR)**

| ID | Danh mục | Yêu cầu Chi tiết |
|---|---|---|
| NFR-01 | Hiệu năng (Performance) | Thời gian phản hồi API < 200ms cho 95% request. Chịu tải 10,000 CCU (Concurrent Users) không bị crash. |
| NFR-02 | Bảo mật (Security) | Tuân thủ OWASP Top 10. Mật khẩu mã hóa Bcrypt/Argon2. Phân quyền RBAC chặt chẽ (theo Epic Users & Permissions). |
| NFR-03 | SLA (Service Level Agreement) | Uptime: 99.9% (cho phép downtime bảo trì có thông báo trước). RPO (Recovery Point Objective): < 1 giờ. RTO (Recovery Time Objective): < 4 giờ. |
| NFR-04 | UX/UI Standard | Tuân thủ Design System của HDBank. Tương thích Mobile Web (Responsive). |

##### **2. Định nghĩa Hoàn thành (Definition of Done - DoD)**

Tiêu chuẩn để đóng dự án hoặc nghiệm thu một Sprint.1

- **Tiêu chí Chức năng:**

- [ ] Tất cả AC của User Story đều Pass.

- [ ] Không còn lỗi mức Critical/High.

- **Tiêu chí Chất lượng:**

- [ ] Code coverage > 80%.

- [ ] Đã chạy Performance Test đạt chuẩn NFR.

- **Tiêu chí Kinh doanh:**

- [ ] UAT được ký duyệt bởi Stakeholders.

- [ ] Tài liệu HDSD (User Guide) đã hoàn thành.

- [ ] Đào tạo Key Users hoàn tất.

##### **PHẦN VI: PHỤ LỤC (APPENDICES)**

- **Danh sách Template Import:** Link tới các file Excel mẫu.

- **Danh sách Mã lỗi (Error Codes):** Bảng mã lỗi hệ thống và ý nghĩa.

- **Thuật ngữ & Viết tắt:** Giải thích các từ như QLTT (Quản lý trực tiếp), TĐV (Trưởng đơn vị).
