# RAID Log

> Verbatim conversion of the handbook DOCX template `assets/templates/**/raid-log.docx` (Vietnamese-first; keep `[ĐIỀN: ...]` placeholders that the user has not answered).

**RAID LOG — RISKS · ASSUMPTIONS · ISSUES · DEPENDENCIES**

#### Ngữ cảnh RAID Log

| Trường | Nội dung |
|---|---|
| Tên dự án | [ĐIỀN tên dự án] |
| Mã dự án | [ĐIỀN mã/ID dự án] |
| Khẩu vị rủi ro của Sponsor | [ĐIỀN: Thấp / Trung bình / Cao — chưa được cung cấp trong input] |
| Tần suất review định kỳ | [ĐIỀN — vd: risk review trong họp tiến độ hàng tuần; rà soát toàn bộ hàng tháng] |
| Vị trí lưu bản chính (single source of truth) | [ĐIỀN link / đường dẫn] |
| Tài liệu tham chiếu | Project Charter Mục 8; Project Management Plan Mục 8 (khung quản lý rủi ro) & Mục 4.3 (contingency reserve) |
| Chuẩn tham chiếu | PMBOK® Guide — Seventh Edition (tài liệu tham chiếu của mẫu) |

### Thang đánh giá & ngưỡng escalate

#### Thang Probability & Impact (1–5)

| Mức | Probability (khả năng xảy ra) | Impact (tác động) |
|---|---|---|
| 1 | Hiếm (<10%) | Không đáng kể — hấp thụ trong kế hoạch hiện tại |
| 2 | Khó xảy ra (10–30%) | Nhỏ — ảnh hưởng cục bộ, nằm trong buffer |
| 3 | Có thể xảy ra (30–50%) | Trung bình — ảnh hưởng milestone/chi phí trong ngưỡng cho phép |
| 4 | Nhiều khả năng (50–80%) | Lớn — trượt baseline, cần Change Request |
| 5 | Gần như chắc chắn (>80%) | Nghiêm trọng — đe doạ objective, tuân thủ hoặc uy tín tổ chức |

**Lưu ý: **Ngưỡng % và định nghĩa impact có thể hiệu chỉnh theo dự án tại risk workshop [ĐIỀN nếu khác]. Impact đánh giá trên cả 4 chiều: cost / schedule / scope / quality — lấy mức cao nhất.

#### Phân dải Score & ngưỡng escalate theo khẩu vị rủi ro

| Dải Score (P×I) | Quy tắc xử lý |
|---|---|
| 1 – 5 (Thấp) | Theo dõi; review định kỳ; có thể Accept có kiểm soát |
| 6 – 11 (Trung bình) | Bắt buộc có mitigation plan và Owner; review mỗi kỳ |
| 12 – 25 (Cao) | Bắt buộc có CẢ mitigation LẪN contingency plan; báo cáo trong status report; escalate Sponsor theo ngưỡng dưới |

| Khẩu vị rủi ro của Sponsor | Ngưỡng escalate Sponsor (gợi ý — chốt cùng Sponsor) |
|---|---|
| Thấp | Score ≥ 9 |
| Trung bình | Score ≥ 12 |
| Cao | Score ≥ 15 |
| Áp dụng cho dự án này | [ĐIỀN — theo khẩu vị đã chọn ở Document Control; chưa được cung cấp trong input] |

**Lưu ý: **Trạng thái sử dụng — Risks: Open / Monitoring / Escalated / Closed. Issues: Open / In progress / Resolved / Closed. Dependencies & Assumptions: Open / Validated / At risk / Closed.

### 1. RISKS (Bảng rủi ro) — sắp theo Score giảm dần

Mô tả theo cấu trúc « Do <nguyên nhân>, có thể xảy ra <sự kiện>, dẫn đến <tác động> ». Chấm P/I trong risk workshop và cập nhật khi có dữ liệu mới.

| ID | Mô tả (nguyên nhân → sự kiện → tác động) | Category | P | I | Score | Response | Mitigation / Contingency plan | Owner | Trigger | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| R-001 | [ĐIỀN: nguyên nhân → sự kiện → tác động] | [ĐIỀN] | [1–5] | [1–5] | [P×I] | [Avoid / Mitigate / Transfer / Accept] | [ĐIỀN: mitigation / contingency] | [ĐIỀN tên] | [ĐIỀN điều kiện kích hoạt] | Open |
| R-002 | [ĐIỀN: nguyên nhân → sự kiện → tác động] | [ĐIỀN] | [1–5] | [1–5] | [P×I] | [Avoid / Mitigate / Transfer / Accept] | [ĐIỀN: mitigation / contingency] | [ĐIỀN tên] | [ĐIỀN điều kiện kích hoạt] | Open |
| R-003 | [ĐIỀN: nguyên nhân → sự kiện → tác động] | [ĐIỀN] | [1–5] | [1–5] | [P×I] | [Avoid / Mitigate / Transfer / Accept] | [ĐIỀN: mitigation / contingency] | [ĐIỀN tên] | [ĐIỀN điều kiện kích hoạt] | Open |
| R-004 | [ĐIỀN: nguyên nhân → sự kiện → tác động] | [ĐIỀN] | [1–5] | [1–5] | [P×I] | [Avoid / Mitigate / Transfer / Accept] | [ĐIỀN: mitigation / contingency] | [ĐIỀN tên] | [ĐIỀN điều kiện kích hoạt] | Open |

**Lưu ý: **Khi trigger của một rủi ro kích hoạt (rủi ro đã xảy ra), chuyển thành dòng mới trong bảng ISSUES kèm tham chiếu ID gốc, cập nhật status rủi ro thành Closed (materialized).

### 2. ASSUMPTIONS (Bảng giả định)

Chỉ ghi các giả định có ảnh hưởng đến kế hoạch hoặc quyết định; mỗi giả định phải có owner và hạn xác nhận.

| ID | Mô tả giả định | Ảnh hưởng nếu giả định sai | Hạn validate | Owner |
|---|---|---|---|---|
| A-001 | [ĐIỀN giả định] | [ĐIỀN tác động] | [ĐIỀN hạn validate] | [ĐIỀN tên] |
| A-002 | [ĐIỀN giả định] | [ĐIỀN tác động] | [ĐIỀN hạn validate] | [ĐIỀN tên] |
| A-003 | [ĐIỀN giả định] | [ĐIỀN tác động] | [ĐIỀN hạn validate] | [ĐIỀN tên] |

**Lưu ý: **Giả định quá hạn validate mà chưa xác nhận được → chuyển trạng thái « At risk » và cân nhắc mở rủi ro tương ứng trong bảng RISKS.

### 3. ISSUES (Bảng vấn đề hiện hữu)

Issue là rủi ro ĐÃ xảy ra hoặc vấn đề đang tồn tại — không dự đoán trước. Register khởi tạo để trống; ghi nhận khi phát sinh thực tế. Severity: Critical / High / Medium / Low.

| ID | Mô tả vấn đề | Severity | Action (hành động xử lý) | Owner | Deadline | Status |
|---|---|---|---|---|---|---|
| I-001 | [ĐIỀN vấn đề hiện hữu] | [Critical / High / Medium / Low] | [ĐIỀN hành động xử lý] | [ĐIỀN tên] | [ĐIỀN] | Open |
| I-002 | [ĐIỀN vấn đề hiện hữu] | [Critical / High / Medium / Low] | [ĐIỀN hành động xử lý] | [ĐIỀN tên] | [ĐIỀN] | Open |
| I-003 | [ĐIỀN vấn đề hiện hữu] | [Critical / High / Medium / Low] | [ĐIỀN hành động xử lý] | [ĐIỀN tên] | [ĐIỀN] | Open |

**Lưu ý: **Issue Severity Critical/High phải xuất hiện trong status report gần nhất và escalate theo Communication Matrix (PMP Mục 7.2).

### 4. DEPENDENCIES (Bảng phụ thuộc)

Loại: Internal (giữa các nhóm/hạng mục trong dự án hoặc tổ chức) / External (bên ngoài: vendor, đối tác, hệ thống thứ ba, quy định).

| ID | Mô tả phụ thuộc | Loại | Bên liên quan | Due date | Status |
|---|---|---|---|---|---|
| D-001 | [ĐIỀN phụ thuộc] | [Internal / External] | [ĐIỀN bên liên quan] | [ĐIỀN due date] | Open |
| D-002 | [ĐIỀN phụ thuộc] | [Internal / External] | [ĐIỀN bên liên quan] | [ĐIỀN due date] | Open |
| D-003 | [ĐIỀN phụ thuộc] | [Internal / External] | [ĐIỀN bên liên quan] | [ĐIỀN due date] | Open |

**Lưu ý: **Dependency trễ hoặc « At risk » nằm trên đường găng → mở rủi ro tương ứng trong bảng RISKS và đưa vào họp tiến độ gần nhất.
