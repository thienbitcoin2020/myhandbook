# Software Requirements Specification (SRS)

> Verbatim conversion of the handbook DOCX template `assets/templates/**/software-requirements-specification.docx` (Vietnamese-first; keep `[ĐIỀN: ...]` placeholders that the user has not answered).

[ĐIỀN: TÊN CÔNG TY / TỔ CHỨC]

**[ĐIỀN: TÊN DỰ ÁN]SOFTWARE REQUIREMENTS SPECIFICATION**

(SRS – Đặc tả yêu cầu phần mềm theo ISO/IEC/IEEE 29148:2018)

| Mã tài liệu | [ĐIỀN: SRS-<DỰ ÁN>-<MODULE>] |
|---|---|
| Module / Phân hệ | [ĐIỀN: tên module cần đặc tả] |
| Trạng thái | [ĐIỀN: Draft / In Review / Approved / Baselined] |
| Mức bảo mật | [ĐIỀN: Internal / Confidential] |

**MỤC LỤC**

### **1. Introduction (Giới thiệu)**

#### **1.1 Purpose (Mục đích)**

Tài liệu này đặc tả các yêu cầu phần mềm (Software Requirements) cho module [ĐIỀN: tên module / phân hệ] thuộc hệ thống [ĐIỀN: tên hệ thống], làm căn cứ thống nhất giữa các bên: đội phát triển (thiết kế & lập trình), QC (thiết kế test case), và stakeholder nghiệp vụ (xác nhận phạm vi).

Đối tượng đọc: [ĐIỀN: Dev Team, QC, SA, PO, stakeholder nghiệp vụ, vendor...]

#### **1.2 Scope (Phạm vi)**

##### **1.2.1 In-scope**

- [ĐIỀN: chức năng / luồng nghiệp vụ nằm trong phạm vi module này]

- [ĐIỀN: ...]

##### **1.2.2 Out-of-scope**

- [ĐIỀN: nội dung cố ý loại khỏi phạm vi — nêu rõ để tránh hiểu nhầm]

- [ĐIỀN: ...]

| Best practice: phạm vi phải khớp 1-1 với BRD đã duyệt. Nếu có chênh lệch so với BRD, ghi rõ tại Mục 7.2 – Open Items và đưa qua quy trình change control. |
|---|

#### **1.3 Definitions & Acronyms (Định nghĩa & viết tắt)**

| Thuật ngữ / Viết tắt | Định nghĩa |
|---|---|
| SRS | Software Requirements Specification – Đặc tả yêu cầu phần mềm |
| BRD | Business Requirements Document – Tài liệu yêu cầu nghiệp vụ |
| FR / NFR | Functional Requirement / Non-Functional Requirement |
| RTM | Requirements Traceability Matrix – Ma trận truy vết yêu cầu |
| [ĐIỀN] | [ĐIỀN: thuật ngữ nghiệp vụ / kỹ thuật đặc thù của dự án] |

#### **1.4 References (Tài liệu tham chiếu)**

| Mã | Tên tài liệu | Phiên bản | Nguồn / Link |
|---|---|---|---|
| REF-01 | [ĐIỀN: BRD đã duyệt — tóm tắt các BR chính đưa vào Phụ lục 7.1 nếu cần] | [ĐIỀN] | [ĐIỀN] |
| REF-02 | NFR Specification (do Solution Architect sở hữu — tham chiếu tại Mục 5) | [ĐIỀN] | [ĐIỀN] |
| REF-03 | Data Dictionary (tham chiếu tại Mục 6) | [ĐIỀN] | [ĐIỀN] |
| REF-04 | [ĐIỀN: API Specification / Interface Agreement với hệ thống tích hợp] | [ĐIỀN] | [ĐIỀN] |
| REF-05 | ISO/IEC/IEEE 29148:2018 – Requirements engineering | 2018 | ISO |

### **2. Overall Description (Mô tả tổng quan)**

#### **2.1 Product Perspective (Bối cảnh sản phẩm)**

[ĐIỀN: vị trí của module trong tổng thể hệ thống — module mới hay mở rộng hệ thống hiện hữu; sơ đồ context (system context diagram) đặt tại Phụ lục 7.1]

**Các hệ thống cần tích hợp: **[ĐIỀN: liệt kê hệ thống — chi tiết interface đặc tả tại Mục 4]

#### **2.2 User Classes & Characteristics (Nhóm người dùng)**

| Nhóm người dùng | Đặc điểm / nhu cầu chính | Tần suất sử dụng | Quyền hạn |
|---|---|---|---|
| [ĐIỀN: ví dụ End User] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN: ví dụ Admin] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

#### **2.3 Operating Environment (Môi trường vận hành)**

- [ĐIỀN: nền tảng — web / mobile / desktop; trình duyệt & phiên bản hỗ trợ]

- [ĐIỀN: hạ tầng — on-premise / cloud; môi trường DEV / SIT / UAT / PROD]

- [ĐIỀN: phụ thuộc hệ thống — SSO, message queue, API gateway...]

#### **2.4 Design & Implementation Constraints (Ràng buộc)**

- [ĐIỀN: ràng buộc pháp lý / tuân thủ — ví dụ quy định bảo vệ dữ liệu cá nhân, quy định ngành]

- [ĐIỀN: ràng buộc công nghệ do tổ chức quy định — chỉ ghi khi là constraint thật, không phải lựa chọn thiết kế]

- [ĐIỀN: ràng buộc vận hành — cửa sổ downtime, chuẩn bảo mật nội bộ...]

#### **2.5 Assumptions & Dependencies (Giả định & phụ thuộc)**

| Mã | Giả định / Phụ thuộc | Ảnh hưởng nếu không đúng |
|---|---|---|
| AS-001 | [ĐIỀN: ví dụ — API của hệ thống X sẵn sàng trước sprint N] | [ĐIỀN] |
| DP-001 | [ĐIỀN] | [ĐIỀN] |

### **3. System Features / Functional Requirements (Yêu cầu chức năng)**

| Quy tắc viết FR (áp dụng cho toàn bộ mục 3):• Unambiguous — chỉ có một cách hiểu duy nhất; tránh từ mơ hồ ("nhanh", "thân thiện", "phù hợp", "v.v.").• Verifiable — QC phải viết được test case pass/fail cho từng FR; nếu không đo được, viết lại.• Atomic — 1 FR = 1 yêu cầu; không dùng "và" để gộp nhiều hành vi vào một FR.• Dùng "shall" cho yêu cầu bắt buộc; "should" cho khuyến nghị; không dùng "will" / "may" cho yêu cầu.• 100% FR phải trace được về một BR-xxx trong BRD đã duyệt. FR không có nguồn gốc = scope creep → loại hoặc đưa qua change control.• Không nêu giải pháp kỹ thuật cụ thể (tên công nghệ, thiết kế DB, thuật toán) trừ khi đó là constraint thật đã ghi tại Mục 2.4. |
|---|

#### **3.1 Feature 1: [ĐIỀN: Tên tính năng]**

##### **3.1.1 Mô tả & độ ưu tiên**

[ĐIỀN: mô tả ngắn tính năng — mục đích nghiệp vụ, luồng chính. Priority tổng thể của feature: [Must/Should/Could] — do PO xác nhận.]

##### **3.1.2 Kích hoạt / luồng nghiệp vụ (Stimulus & Response)**

[ĐIỀN: trigger — người dùng / hệ thống / lịch batch; tham chiếu sơ đồ luồng tại Phụ lục 7.1 nếu có]

##### **3.1.3 Bảng yêu cầu chức năng**

| Mã FR | Mô tả yêu cầu (shall) | Input / Processing / Output | Priority | Trace về BR | Ghi chú / AC ref |
|---|---|---|---|---|---|
| FR-001 | Hệ thống shall [ĐIỀN: một hành vi duy nhất, đo lường được] | Input: [ĐIỀN]Processing: [ĐIỀN: quy tắc xử lý / business rule]Output: [ĐIỀN] | [Must / Should / Could] | BR-[ĐIỀN] | [ĐIỀN: link user story / AC nếu có] |
| FR-002 | Hệ thống shall [ĐIỀN] | Input: [ĐIỀN]Processing: [ĐIỀN]Output: [ĐIỀN] | [ĐIỀN] | BR-[ĐIỀN] | [ĐIỀN] |

Nhân bản cấu trúc 3.1 cho từng feature và đánh mã FR liên tục trong toàn tài liệu để giữ traceability duy nhất.

### **4. External Interface Requirements (Yêu cầu giao diện ngoài)**

| Mục này do Solution Architect review về tính khả thi kiến trúc & tích hợp. BA đặc tả ở mức yêu cầu (what); thiết kế chi tiết (how) thuộc HLD/LLD của SA. |
|---|

#### **4.1 User Interfaces (Giao diện người dùng)**

| Mã UI | Màn hình | Yêu cầu chính (field bắt buộc, validation, thông báo lỗi) | Wireframe / Design ref |
|---|---|---|---|
| UI-001 | [ĐIỀN] | [ĐIỀN] | [ĐIỀN: link Figma / mockup] |

[ĐIỀN: chuẩn UI chung nếu có — design system, ngôn ngữ hiển thị, responsive, accessibility]

#### **4.2 API / Software Interfaces (Giao diện phần mềm)**

| Mã IF | Hệ thống đối tác | Chiều & giao thức | Dữ liệu trao đổi (mức thực thể) | Spec chi tiết |
|---|---|---|---|---|
| IF-001 | [ĐIỀN: hệ thống tích hợp] | [ĐIỀN: Inbound/Outbound; REST/SOAP/File/MQ; sync/async] | [ĐIỀN: thực thể / trường dữ liệu chính] | [ĐIỀN: REF-04] |

[ĐIỀN: yêu cầu chung cho interface — xác thực, tần suất, xử lý lỗi/retry ở mức yêu cầu nghiệp vụ]

#### **4.3 Hardware Interfaces (Giao diện phần cứng)**

[ĐIỀN: chỉ áp dụng nếu có thiết bị chuyên dụng — máy in, kiosk, thiết bị sinh trắc... Nếu không áp dụng, ghi "N/A".]

#### **4.4 Communication Interfaces (Giao tiếp / thông báo)**

[ĐIỀN: email, SMS, push notification, webhook... — sự kiện kích hoạt, nội dung mức yêu cầu, người nhận. Nếu không áp dụng, ghi "N/A".]

### **5. Non-Functional Requirements (Yêu cầu phi chức năng)**

BA và PO làm rõ nhu cầu chất lượng; Solution Architect thiết kế giải pháp đáp ứng; Security, Ops và QC cùng xác định cách kiểm chứng. Ghi yêu cầu đo được tại đây hoặc tham chiếu nguồn yêu cầu phi chức năng chuẩn của dự án.

| Nhóm NFR | Tham chiếu (mã mục trong NFR Spec) | Ghi chú áp dụng riêng cho module này (nếu có) |
|---|---|---|
| Performance | [ĐIỀN: NFR Spec §...] | [ĐIỀN hoặc N/A] |
| Availability / Reliability | [ĐIỀN: NFR Spec §...] | [ĐIỀN hoặc N/A] |
| Security | [ĐIỀN: NFR Spec §...] | [ĐIỀN hoặc N/A] |
| Usability / Accessibility | [ĐIỀN: NFR Spec §...] | [ĐIỀN hoặc N/A] |
| Compliance / Regulatory | [ĐIỀN: NFR Spec §...] | [ĐIỀN hoặc N/A] |
| [ĐIỀN: nhóm khác] | [ĐIỀN: NFR Spec §...] | [ĐIỀN hoặc N/A] |

| Nếu một FR có ngưỡng đo lường gắn chặt với hành vi chức năng (ví dụ: "kết quả tìm kiếm trả về tối đa N bản ghi"), ngưỡng đó là một phần của FR tại Mục 3 — không phải NFR. Chỉ các thuộc tính chất lượng hệ thống mới thuộc NFR Spec. |
|---|

### **6. Data Requirements (Yêu cầu dữ liệu)**

Chi tiết thuộc tính, kiểu dữ liệu, ràng buộc của từng trường được quản lý tại **Data Dictionary [REF-03]**. Mục này chỉ liệt kê các thực thể chính và quan hệ ở mức khái niệm (conceptual).

#### **6.1 Thực thể chính (Key Entities)**

| Thực thể | Mô tả nghiệp vụ | Quan hệ chính | Data Dictionary ref |
|---|---|---|---|
| [ĐIỀN] | [ĐIỀN] | [ĐIỀN: 1-n với thực thể X...] | [ĐIỀN: DD §...] |
| [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

#### **6.2 Yêu cầu về dữ liệu**

- [ĐIỀN: nguồn dữ liệu — nhập tay / migrate / đồng bộ từ hệ thống nào]

- [ĐIỀN: yêu cầu lưu trữ / retention / archive ở mức nghiệp vụ]

- [ĐIỀN: phân loại dữ liệu nhạy cảm (PII...) — yêu cầu masking / consent nếu có, tham chiếu NFR Spec phần Security]

[ĐIỀN: sơ đồ ERD mức khái niệm — đặt tại Phụ lục 7.1]

### **7. Appendix (Phụ lục)**

#### **7.1 Mô hình liên quan (Related Models)**

- [ĐIỀN: System Context Diagram]

- [ĐIỀN: BPMN / swimlane luồng nghiệp vụ chính]

- [ĐIỀN: State diagram (nếu đối tượng có vòng đời trạng thái)]

- [ĐIỀN: ERD mức khái niệm]

#### **7.2 Open Items (Vấn đề còn mở)**

| Mã | Vấn đề / câu hỏi còn mở | Người chịu trách nhiệm | Hạn xử lý | Trạng thái |
|---|---|---|---|---|
| OI-001 | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [Open] |

| SRS chỉ được baseline khi tất cả Open Items ở trạng thái Closed hoặc được chấp nhận rủi ro có ghi nhận (risk-accepted) bởi PO/Sponsor. |
|---|
