# Epic to User Stories

> Verbatim conversion of the handbook DOCX template `assets/templates/**/epic-to-user-stories.docx` (Vietnamese-first; keep `[ĐIỀN: ...]` placeholders that the user has not answered).

**TEMPLATE · PRODUCT BACKLOGEPIC → USER STORIESPHÂN RÃ CHUẨN INVEST · ACCEPTANCE CRITERIA GHERKIN**

User Story theo thin vertical slice · Ưu tiên MoSCoW · Size S/M/L · Definition of Ready cho từng story

### 1 · Input epic cần phân rã

| Trường | Nội dung |
|---|---|
| Tên & mô tả epic | [ĐIỀN: tên epic + mô tả 2–3 câu] |
| Mục tiêu business của epic | [ĐIỀN: outcome kinh doanh kỳ vọng, gắn metric nếu có] |
| Ràng buộc đã biết | [ĐIỀN: kỹ thuật, pháp lý, thời hạn, nguồn lực…] |
| Phạm vi loại trừ (nếu đã biết) | [ĐIỀN: những gì epic này KHÔNG bao gồm] |

### 2 · Nguyên tắc phân rã & viết AC

#### 2.1 · Chuẩn INVEST — mỗi story phải qua đủ 6 cửa

| Chữ | Ý nghĩa | Câu hỏi kiểm tra |
|---|---|---|
| I | Independent — story tự đứng, không kẹt thứ tự với story khác | Có thể làm & giao mà không phải chờ story nào? |
| N | Negotiable — chi tiết giải pháp còn thương lượng, không phải hợp đồng cứng | Còn chỗ để trao đổi cách làm với Dev? |
| V | Valuable — giao ra giá trị cho người dùng / khách hàng | Người dùng nhận được gì khi story xong? |
| E | Estimable — đủ rõ để đội ước lượng | Team ước lượng được S/M/L không? |
| S | Small — làm xong gọn trong 1 sprint | Nếu không xong trong 1 sprint → tách tiếp (xem 3.2) |
| T | Testable — có AC kiểm chứng được | QC viết được test case trực tiếp từ AC không? |

#### 2.2 · Story quá lớn → tách theo các mẫu sau

- Theo bước trong workflow — mỗi bước người dùng đi qua là một story.

- Theo thao tác CRUD — tạo / xem / sửa / xoá tách riêng.

- Theo business rule — mỗi rule phức tạp là một story.

- Theo biến thể dữ liệu hoặc loại người dùng.

- Happy path trước, ngoại lệ và trường hợp lỗi thành story sau.

- Tách spike (nghiên cứu kỹ thuật, timebox) khỏi story giao giá trị. Mẹo nhớ: SPIDR — Spike · Path · Interface · Data · Rules.

#### 2.3 · Thin vertical slice — cắt dọc, giao sớm

- Mỗi story cắt dọc qua đủ các tầng UI → logic → data và giao ra thứ người dùng **dùng được**, dù nhỏ.

- Không tách theo tầng kỹ thuật (“làm DB”, “làm API”, “làm màn hình”) — các mảnh đó không tự giao giá trị.

- Story #1 của epic là slice mỏng nhất chạy được end-to-end (walking skeleton); các story sau bồi dần độ dày.

#### 2.4 · Từ cần tránh trong Acceptance Criteria

AC phải kiểm chứng được bằng con số, trạng thái hoặc thông điệp cụ thể. Gặp từ mơ hồ thì thay bằng tiêu chí đo được:

| Từ cấm | Thay bằng tiêu chí đo được (ví dụ) |
|---|---|
| “nhanh” | Phản hồi ≤ [ĐIỀN: X] giây ở p95, đo trên [ĐIỀN: môi trường] |
| “dễ dùng” | Hoàn thành tác vụ trong ≤ [ĐIỀN: N] bước, không cần hướng dẫn |
| “thân thiện” | Đạt [ĐIỀN: tiêu chí cụ thể, vd. WCAG 2.1 AA] |
| “ổn định” | Tỷ lệ lỗi < [ĐIỀN: X]% trên [ĐIỀN: N] request |
| “đẹp / hiện đại” | Khớp design đã duyệt tại [ĐIỀN: link Figma / spec] |

### 3 · Backlog tổng quan — thứ tự giao giá trị

Sắp story theo thứ tự giao giá trị sớm nhất, không theo thứ tự kỹ thuật. Chỉ tạo các story cần thiết để epic có thể được lập kế hoạch và kiểm chứng.

| # | ID | Title | Slice giá trị giao được | MoSCoW | Size |
|---|---|---|---|---|---|
| 1 | US-01 | [ĐIỀN: title story] | [ĐIỀN: giá trị người dùng nhận được khi story xong] | [ĐIỀN: M/S/C/W] | [ĐIỀN] |
| 2 | US-02 | [ĐIỀN: title story] | [ĐIỀN: giá trị người dùng nhận được khi story xong] | [ĐIỀN: M/S/C/W] | [ĐIỀN] |
| 3 | US-03 | [ĐIỀN: title story] | [ĐIỀN: giá trị người dùng nhận được khi story xong] | [ĐIỀN: M/S/C/W] | [ĐIỀN] |
| 4 | US-04 | [ĐIỀN: title story] | [ĐIỀN: giá trị người dùng nhận được khi story xong] | [ĐIỀN: M/S/C/W] | [ĐIỀN] |
| 5 | US-05 | [ĐIỀN: title story] | [ĐIỀN: giá trị người dùng nhận được khi story xong] | [ĐIỀN: M/S/C/W] | [ĐIỀN] |
| 6 | US-06 | [ĐIỀN: title story] | [ĐIỀN: giá trị người dùng nhận được khi story xong] | [ĐIỀN: M/S/C/W] | [ĐIỀN] |

- Story #1 phải là walking skeleton — luồng mỏng nhất chạy end-to-end.

- MoSCoW: Must = thiếu là epic vô nghĩa · Should = quan trọng nhưng có đường vòng · Could = tăng trải nghiệm · Won’t = chốt không làm kỳ này (ghi rõ để chặn scope creep).

- Size S/M/L là tương đối giữa các story trong epic; story L → quay lại mục 2.2 để tách tiếp.

### 4 · Chi tiết User Story — mỗi story một block

Mẫu cung cấp một block US-01. Nhân bản block khi cần và chỉ giữ các story thực sự thuộc epic; mỗi story phải có giá trị, tiêu chí chấp nhận và quan hệ phụ thuộc rõ ràng.

| US-01 · [ĐIỀN: title — <động từ> + <đối tượng>] |  |
|---|---|
| User Story | As a [ĐIỀN: persona], I want [ĐIỀN: goal — hành động / khả năng], so that [ĐIỀN: benefit — giá trị nhận được]. |
| Acceptance Criteria (Gherkin) | Scenario 1 — Happy path: [ĐIỀN: tên scenario] Given [ĐIỀN: bối cảnh / trạng thái ban đầu] When [ĐIỀN: hành động của người dùng] Then [ĐIỀN: kết quả mong đợi — trạng thái / giá trị cụ thể]Scenario 2 — Edge case: [ĐIỀN: tên scenario] Given [ĐIỀN: bối cảnh ở điều kiện biên / giới hạn] When [ĐIỀN: hành động tại giá trị biên] Then [ĐIỀN: hành vi đúng tại giá trị biên]Scenario 3 — Negative case: [ĐIỀN: tên scenario] Given [ĐIỀN: bối cảnh dẫn tới thao tác không hợp lệ] When [ĐIỀN: hành động sai / bị cấm] Then [ĐIỀN: thông báo lỗi / hành vi chặn cụ thể]Thêm And/But khi cần. Mỗi Then phải kiểm chứng được bằng số liệu, trạng thái hoặc thông điệp cụ thể — không dùng từ mơ hồ (mục 3.4). |
| Priority & Size | MoSCoW: [ĐIỀN: Must / Should / Could / Won’t] — lý do: [ĐIỀN: vì sao ở mức này]Size: [ĐIỀN: S / M / L] (tương đối so với các story còn lại; L → tách tiếp theo mục 3.2) |
| Dependencies & Notes | Phụ thuộc: [ĐIỀN: story / API / hệ thống — ghi “Không” nếu độc lập]Note cho Dev: [ĐIỀN: ràng buộc kỹ thuật, API, dữ liệu]Note cho QC: [ĐIỀN: dữ liệu test, môi trường, case cần chú ý] |
| Definition of Ready | ☐ Story đúng format & đã kiểm đủ 6 chữ INVEST (vi phạm S → đã tách)☐ AC đủ 3 scenario happy · edge · negative; không chứa từ mơ hồ☐ Dependencies đã rõ, không còn blocker mở☐ Team đã thống nhất size (S/M/L)☐ Mock-up / dữ liệu mẫu đính kèm (nếu có UI/data): [ĐIỀN: link]☐ PO đã duyệt nội dung & vị trí ưu tiên trong backlog |
