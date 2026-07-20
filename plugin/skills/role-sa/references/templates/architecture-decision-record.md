# Architecture Decision Record (ADR)

> Verbatim conversion of the handbook DOCX template `assets/templates/**/architecture-decision-record.docx` (Vietnamese-first; keep `[ĐIỀN: ...]` placeholders that the user has not answered).

**ARCHITECTURE DECISION RECORD (ADR)**

### **ADR-**[xxx]**: **[Động từ + quyết định — VD: Chọn <phương án X> làm <vấn đề — message broker / database / pattern giao tiếp giữa services>]

| Thuộc tính | Giá trị |
|---|---|
| Ngày quyết định | [dd/mm/yyyy] |
| Người quyết định (deciders) | [ĐIỀN — SA + Tech Lead + ĐIỀN, người có quyền chốt] |
| Người tư vấn / được tham vấn | [ĐIỀN — VD: EA, Security, DBA, vendor] |
| Tham chiếu | [Link SRS/BRD mã FR/NFR liên quan; link ADR liên quan] |

### **1. Status (Trạng thái)**

[Proposed / Accepted / Deprecated / Superseded by ADR-yyy / Rejected]

### **2. Context (Bối cảnh & các lực tác động)**

Mô tả vấn đề cần quyết định và các "lực" (forces) đang tác động — cả business lẫn technical. Không nêu giải pháp ở đây.

- Vấn đề: [ĐIỀN — VD: chọn message broker / database / pattern giao tiếp giữa services]

- Lực business: [ĐIỀN — VD: deadline, ngân sách, cam kết SLA với khách hàng]

- Lực technical: [ĐIỀN — VD: hệ thống hiện hữu phải tích hợp, tải dự kiến, tech stack hiện tại]

- Ràng buộc (constraints): [ĐIỀN — budget, kỹ năng team, deadline, hệ thống hiện hữu, quy định pháp lý]

- Giả định (assumptions): [ĐIỀN — điều đang tin là đúng nhưng chưa xác nhận]

### **3. Decision Drivers (Tiêu chí đánh giá + trọng số)**

Best practice: chốt driver và trọng số TRƯỚC khi chấm điểm option — tránh "chấm ngược" để hợp thức hóa phương án đã thích sẵn. Tổng trọng số = 100%.

| ID | Tiêu chí (driver) | Trọng số | Cách đo / diễn giải |
|---|---|---|---|
| D1 | [VD: Phù hợp NFR — throughput/latency yêu cầu] | [30%] | [ĐIỀN — VD: đạt ≥ ĐIỀN msg/s trong PoC] |
| D2 | [VD: Kỹ năng team & learning curve] | [20%] | [ĐIỀN — VD: số người đã có kinh nghiệm] |
| D3 | [VD: Chi phí (license + hạ tầng + vận hành, TCO 3 năm)] | [20%] | [ĐIỀN] |
| D4 | [VD: Độ trưởng thành & hệ sinh thái, hỗ trợ vendor] | [15%] | [ĐIỀN] |
| D5 | [VD: Khả năng tích hợp với hệ thống hiện hữu ĐIỀN] | [15%] | [ĐIỀN] |

### **4. Considered Options (Các phương án đã cân nhắc)**

#### **4.1 Bảng so sánh theo driver**

Thang điểm gợi ý: 1 (kém) – 5 (tốt). Điểm có trọng số = Σ(điểm × trọng số driver).

| Driver (trọng số) | Option A: [ĐIỀN] | Option B: [ĐIỀN] | Option C: [ĐIỀN] |
|---|---|---|---|
| D1 [30%] | [điểm 1–5] | [điểm 1–5] | [điểm 1–5] |
| D2 [20%] | [...] | [...] | [...] |
| D3 [20%] | [...] | [...] | [...] |
| D4 [15%] | [...] | [...] | [...] |
| D5 [15%] | [...] | [...] | [...] |
| Tổng có trọng số | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

#### **4.2 Phân tích chi tiết từng option**

| Khía cạnh | Option A: [ĐIỀN] | Option B: [ĐIỀN] | Option C: [ĐIỀN] |
|---|---|---|---|
| Ưu điểm | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| Nhược điểm | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| Chi phí (TCO) | [ĐIỀN — license/hạ tầng/người] | [ĐIỀN] | [ĐIỀN] |
| Rủi ro chính | [ĐIỀN + mức C/T/T] | [ĐIỀN] | [ĐIỀN] |
| Độ trưởng thành | [ĐIỀN — version, cộng đồng, LTS, case study cùng ngành] | [ĐIỀN] | [ĐIỀN] |
| Fit với constraints | [ĐIỀN — đối chiếu ràng buộc ở Mục 2] | [ĐIỀN] | [ĐIỀN] |

### **5. Decision (Quyết định)**

Chọn: [Option ĐIỀN — tên phương án].

Lý do: [ĐIỀN — tóm tắt 3–5 dòng vì sao option này thắng theo driver; nêu rõ trade-off đã chấp nhận. VD: "Option A đạt điểm cao nhất ở D1, D5 vốn chiếm 45% trọng số; chấp nhận nhược điểm về D2 vì có kế hoạch đào tạo ở Mục 8."]

Các phương án bị loại và lý do loại: [ĐIỀN — bắt buộc, mỗi option 1–2 dòng. VD: "Option B bị loại vì vượt budget ĐIỀN%; Option C bị loại vì chưa có hỗ trợ chính thức cho ĐIỀN."]

### **6. Consequences (Hệ quả)**

#### **6.1 Tích cực**

- [ĐIỀN — VD: đáp ứng NFR throughput; giảm chi phí vận hành ĐIỀN%]

- [ĐIỀN]

#### **6.2 Tiêu cực / đánh đổi**

- [ĐIỀN — VD: team cần ĐIỀN tuần ramp-up; thêm 1 thành phần hạ tầng phải vận hành]

- [ĐIỀN]

#### **6.3 Technical debt chấp nhận có chủ đích**

| Debt | Lý do chấp nhận | Kế hoạch trả / thời điểm xem lại |
|---|---|---|
| [ĐIỀN — VD: chưa bật multi-DC replication ở phase 1] | [ĐIỀN — VD: ưu tiên go-live] | [ĐIỀN — VD: review lại tại phase 2 / Q ĐIỀN] |
| [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

### **7. Follow-up Actions (Hành động tiếp theo)**

| # | Hành động | Người phụ trách | Hạn | Trạng thái |
|---|---|---|---|---|
| 1 | [VD: PoC xác nhận driver D1 với tải ĐIỀN] | [ĐIỀN] | [dd/mm] | [Open] |
| 2 | [VD: Cập nhật SAD Mục 4/5 theo quyết định này] | [ĐIỀN] | [dd/mm] | [Open] |
| 3 | [VD: Kế hoạch đào tạo team về ĐIỀN] | [ĐIỀN] | [dd/mm] | [Open] |
| 4 | [VD: Thông báo quyết định tới EA/ARB, dev team, vendor] | [ĐIỀN] | [dd/mm] | [Open] |
