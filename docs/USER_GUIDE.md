# 📘 Hướng dẫn sử dụng — Power Home Project Handbook

> **Phân loại: MẬT (CONFIDENTIAL) — chỉ lưu hành nội bộ.**
> Tài liệu này hướng dẫn sử dụng toàn bộ trang web Handbook tại
> `project-handbook.vercel.app`. Thuật ngữ chuẩn (route, template, DoD, RACI…)
> giữ nguyên tiếng Anh theo chính sách thuật ngữ của cẩm nang.
>
> Chủ quản: Thiện Phạm (Power Home PO) · Phiên bản HDSD: 1.0 · Cập nhật: 2026-07-21

---

## 1. Handbook là gì?

Một trang web nội bộ gom **toàn bộ tri thức triển khai dự án** của ngân hàng
theo mô hình Hybrid Water-Scrum-Fall, gồm:

- **1 cẩm nang tổng** (Trang chủ) — vòng đời dự án từ ý tưởng đến vận hành;
- **11 cẩm nang theo role** — BA, PM, PO, SA, QC, UX, Scrum Master, Security,
  Ops/SRE, Deployment, PMO;
- **Thư viện 42 template DOCX** đã kiểm duyệt, đọc trực tuyến rồi mới tải;
- **Claude Plugin** — cài toàn bộ cẩm nang vào Claude AI dưới dạng skill;
- Song ngữ **Anh – Việt**, giao diện **Sáng – Tối**, tìm kiếm toàn văn.

Mọi trang đều dùng được trên desktop lẫn điện thoại.

---

## 2. Bắt đầu trong 60 giây

| Việc | Cách làm |
|---|---|
| Mở site | Truy cập `project-handbook.vercel.app` (không cần đăng nhập) |
| Đổi tiếng Việt | Sidebar bên trái → nút **EN / VI** (đổi ngay, giữ nguyên trang đang đọc) |
| Đổi giao diện tối | Sidebar → nút **☽ Tối / ☀ Sáng** (được ghi nhớ cho lần sau) |
| Tìm bất kỳ thứ gì | Ô **⌕ tìm kiếm** trên thanh đầu trang — gõ từ 2 ký tự, **không cần gõ dấu** |
| Mở cẩm nang role | Sidebar Trang chủ → mục **Handbooks** → chọn role |
| Mở trên điện thoại | Nút **☰** góc trái để mở/đóng menu; menu tự đóng sau khi chọn |

Lựa chọn ngôn ngữ, giao diện và trang đang đọc **được ghi nhớ** — tải lại
trang (F5) vẫn giữ nguyên chỗ cũ.

---

## 3. Cấu trúc điều hướng chung

Mọi trang có 3 vùng cố định:

1. **Thanh đầu trang (topbar):** logo Power Home (bấm để về Trang chủ), nhãn
   phân loại, và ô **tìm kiếm toàn cẩm nang**.
2. **Sidebar trái:** mục lục của trang đang mở + nút chuyển theme/ngôn ngữ +
   khối **Document Control** (phiên bản, ngày cập nhật, phân loại) + liên kết
   nhanh sang các trang liên quan.
3. **Nội dung chính:** các mục đánh số, bảng, sơ đồ, checklist tương tác.

**Địa chỉ trang (đường dẫn `#`):** mỗi trang có địa chỉ riêng, bookmark được:

`#home` Trang chủ · `#ba` `#pm` `#po` `#sa` `#qc` `#ux` `#sm` `#sec` `#ops`
`#pmo` `#deployment` các role · `#plugin` Claude Plugin

Link sâu vào từng mục Trang chủ cũng bookmark được, ví dụ `#sec-sec8`
(Thuật ngữ), `#sec-sec9` (Thư viện Template), `#sec-changelog` (Changelog).
Các đường dẫn kiểu cũ (`/pm-handbook.html`…) vẫn tự chuyển về trang mới.

---

## 4. Trang chủ — Cẩm nang Triển khai (`#home`)

Trang trung tâm, sidebar chia 4 nhóm:

### Tổng quan
- **Overview & Roles** — pipeline triển khai tương tác (bấm từng phase để
  nhảy tới mục tương ứng) + bản đồ 12 cẩm nang + chip persona theo vai trò.
- **Delivery Lifecycle** — bảng **cross-walk**: từng role làm gì ở từng giai
  đoạn vòng đời; ô nào có link thì bấm sang thẳng cẩm nang role đó.
- **0. How to Use** — cách đọc cẩm nang theo vai trò của bạn.
- **Governance & Controls** — tầng quản trị, thẩm quyền quyết định.

### Các giai đoạn (mục 1 → 6)
Chiến lược → Discovery & Khởi tạo → **Thực thi SDLC** (các mục con: build
3.1–3.5, Agile ceremonies 3.6, backlog 3.7, **Quality Gates DoR/DoD 3.8**,
release 3.9) → Thương mại hoá & GTM → Đóng dự án → Vận hành & Bảo trì.

### Tra cứu
- **7. Stakeholders & RACI** — ma trận RACI **lọc được**: chọn phase/role ở
  ô lọc phía trên bảng, các dòng không liên quan sẽ ẩn đi.
- **8. Glossary** — thuật ngữ + viết tắt toàn hệ thống.
- **9. Templates Library** — xem mục 5 dưới đây.
- **10. Tooling** — công cụ chuẩn cho từng nhóm việc.
- **Changelog** — lịch sử phiên bản cẩm nang (hiện tại **v2.0**).

### Handbooks & Tools
Danh sách 11 cẩm nang role và trang **🧩 Claude Plugin**.

> 💡 Ô "Search handbook..." ngay trong sidebar Trang chủ lọc nhanh các mục
> của riêng trang này; ô ⌕ trên topbar mới tìm **toàn bộ** các trang.

---

## 5. Thư viện Template (Trang chủ → Mục 9)

**42 template DOCX** đã rà soát, gom theo role chủ quản. Mỗi card ghi rõ:
định dạng, **Owner** (role chủ quản), tên, mô tả, **Use when** (dùng khi
nào), **Supports** (các role liên quan).

### Lọc & tìm nhanh (thanh công cụ đầu thư viện)
- **Ô tìm nhanh ⌕:** gõ tên, mục đích hoặc role — **không cần dấu tiếng
  Việt** (`quan ly rui ro` vẫn ra "Quản lý rủi ro").
- **Chip role (BA · PM · PO · SA · QC · UX · Security · Ops · Deploy ·
  PMO):** bấm để bật/tắt, **chọn được nhiều role cùng lúc**; kết quả là hợp
  của các role đã chọn, kết hợp thêm từ khoá nếu có.
- **Bộ đếm** "Hiển thị x/42" cập nhật trực tiếp; nút **✕ Xoá lọc** đưa về
  đầy đủ.

### Đọc và tải template (quy trình bắt buộc với tài liệu MẬT)
1. Bấm **"Đọc tài liệu →"** trên card — tài liệu mở **ngay trong trang**
   (không tải file về máy ở bước này).
2. Đọc và xác nhận đúng template mình cần. Đóng bằng nút **×**, phím **Esc**
   hoặc bấm ra nền ngoài.
3. Nếu thực sự cần file, bấm **"Tải bản DOCX"** *bên trong* trình đọc.

> 🔒 Template là tài liệu MẬT: chỉ tải khi cần, không chuyển tiếp ra ngoài
> ngân hàng, không upload lên công cụ bên ngoài chưa được phê duyệt.

---

## 6. 11 cẩm nang theo role

Cách dùng chung: sidebar trái là mục lục — bấm để cuộn tới mục; đang cuộn
tới đâu, mục lục tự đánh dấu tới đó. Cuối sidebar có **Quick Links** sang
các cẩm nang liên quan.

| Trang | Nội dung chính | Điểm riêng đáng chú ý |
|---|---|---|
| `#ba` Business Analyst | BABOK v3, 9 giai đoạn BA, elicitation → UAT | Khung SMART/INVEST, RTM, change request sau baseline |
| `#pm` Project Manager | PMBOK 7: 5 process groups, 8 performance domains | EVM (CPI/SPI/EAC), RAG, CCB, escalation |
| `#po` Product Owner | Scrum 2020: vision, discovery, backlog | MoSCoW · RICE · WSJF · Kano; tách epic → story |
| `#sa` Solution Architect | C4 · arc42: NFR, options, ADR, tích hợp | Mẫu chấm điểm trade-off, STRIDE, sizing |
| `#qc` QC / Tester | ISTQB v4: quy trình 7 bước, levels & types | Kỹ thuật thiết kế test, vòng đời defect, test theo rủi ro |
| `#ux` UX/UI Designer | Double Diamond: research → handoff | WCAG 2.2 AA, design system, SUS |
| `#sm` Scrum Master | Facilitation, impediment, coaching | GROW model, anti-patterns, scaling |
| `#sec` Security & Compliance | ISO 27001 · NIST · OWASP · TT 09/2020 | DevSecOps gates, IAM, SLA vá lỗi theo CVSS |
| `#ops` Operations & SRE | Google SRE · ITIL 4: SLO, incident, DR | Error budget, blameless postmortem, DORA |
| `#deployment` Deployment Runbook | Pipeline release 12 bước, CAB, hypercare | **3 tab vai trò**: 📋 Release Manager · 📊 Performance Tester · 🔐 Security Tester; **checklist Release DoD bấm tick được** (thanh % tự cập nhật) |
| `#pmo` PMO Governance | Portfolio, stage gates, RAID hợp nhất | EVM công thức, benefits realization, assurance |

Nhiều trang có **accordion** (bấm tiêu đề để mở/đóng chi tiết) và các khối
mở rộng — cứ thấy mũi tên ▸ là bấm được.

---

## 7. Trang Claude Plugin (`#plugin`)

Cài toàn bộ cẩm nang vào **Claude AI** để hỏi đáp theo role và soạn tài liệu
đúng template mà không cần mở web.

- **Tải gói đầy đủ** — nút "⬇️ Download project-handbook.plugin" (12 skill,
  16 template).
- **Cài nhanh nhất (Cowork / Claude desktop):** tải file → **kéo-thả** vào
  khung chat với Claude → xong; Claude tự nhận diện role khi bạn hỏi.
- **Claude Code (dòng lệnh):** dùng thẻ lệnh trong mục Install — bấm
  **Copy** để sao chép nguyên lệnh (cài qua marketplace
  `thienbitcoin2020/myhandbook`).
- **Gói theo role:** mỗi skill card có nút tải/lệnh cài **riêng cho role
  đó** — nhẹ hơn nếu bạn chỉ cần một vai trò.
- **Danh mục skill:** bấm "Included templates" trên card để xem template
  kèm theo; mục **Example Prompts** có sẵn câu lệnh mẫu — bấm Copy và dán
  thẳng vào Claude.
- **Changelog & Sync:** phiên bản plugin và quy tắc đồng bộ với cẩm nang.

> 🔒 File plugin chứa nguyên nội dung MẬT của cẩm nang — chỉ chia sẻ cho
> người được phép đọc cẩm nang.

---

## 8. Tìm kiếm toàn văn (ô ⌕ trên topbar)

- Gõ **từ 2 ký tự**; kết quả hiện ngay bên dưới, nhóm theo *Trang › Mục*.
- **Không cần gõ dấu**: `quan tri` tìm được "quản trị"; tiếng Anh lẫn tiếng
  Việt đều được (tìm trong ngôn ngữ đang bật).
- Di chuyển bằng **↑ ↓**, mở bằng **Enter**, đóng bằng **Esc** — trang đích
  sẽ tự cuộn tới và **tô sáng đúng đoạn** chứa kết quả trong vài giây.
- Trên điện thoại: bấm biểu tượng ⌕ để mở khung tìm kiếm toàn màn hình.

---

## 9. Ngôn ngữ, giao diện, thiết bị

- **EN / VI:** đổi ngay tại chỗ, giữ nguyên trang và vị trí; toàn bộ 13
  trang đều có bản Việt tương ứng 1-1. Thuật ngữ chuẩn (Sprint, DoD, RACI…)
  giữ tiếng Anh ở cả hai bản — đây là chủ đích, xem Glossary.
- **Sáng / Tối:** chuyển mượt toàn trang; hệ thống nhớ lựa chọn của bạn.
- **Điện thoại / tablet:** menu ☰ trượt từ cạnh trái; bảng rộng (cross-walk,
  RACI) cuộn ngang được trong khung riêng — nội dung không bị cắt.
- **In / xuất PDF:** dùng Ctrl+P của trình duyệt ngay trên mục cần in.

---

## 10. Quy tắc bảo mật khi sử dụng

1. Toàn bộ nội dung là **MẬT (CONFIDENTIAL)** — không chia sẻ URL, ảnh chụp
   màn hình, file tải về cho người ngoài phạm vi được phép.
2. Template: **đọc trực tuyến trước, chỉ tải khi cần**; file đã tải phải
   được quản lý theo quy định tài liệu nội bộ.
3. Không sao chép nội dung vào công cụ/AI bên ngoài chưa được phê duyệt
   (Claude Plugin nội bộ ở mục 7 là kênh được duyệt).
4. Phát hiện sai sót nội dung hoặc nghi ngờ lộ lọt: liên hệ chủ quản
   (Thiện Phạm — Power Home PO), không tự đăng lên kênh công khai.
5. Trang có lớp **nhắc nhở khi phát hiện Developer Tools**: nếu bạn mở
   devtools (F12), một lớp phủ sẽ che nội dung và mời bạn đóng lại. Đây là
   biện pháp nhắc nhở người dùng thông thường — **không phải cơ chế bảo mật
   tuyệt đối**; trách nhiệm giữ bí mật vẫn thuộc về người đọc.

> 🛠️ **Dành cho người bảo trì:** lớp nhắc nhở này **tự tắt khi chạy trên
> localhost**. Nếu cần debug trên bản production, đặt một lần trong Console:
> `localStorage.setItem('nt_devtools_guard','off')` rồi tải lại trang.

---

## 11. Câu hỏi thường gặp

| Tình huống | Cách xử lý |
|---|---|
| Trang hiện giao diện cũ sau khi có bản cập nhật | Nhấn **Ctrl+F5** (hard refresh) một lần |
| Tìm kiếm không ra kết quả | Kiểm tra đã gõ ≥ 2 ký tự; thử từ khoá ngắn hơn; kết quả tìm theo ngôn ngữ đang bật (đổi EN/VI nếu cần) |
| Bộ lọc thư viện "không có template nào khớp" | Bấm **✕ Xoá lọc** rồi lọc lại — có thể đang bật nhiều chip role + từ khoá quá hẹp |
| Không mở được tài liệu trong trình đọc | Kiểm tra mạng rồi bấm lại; nếu vẫn lỗi, báo chủ quản kèm tên template |
| Word cảnh báo khi mở file DOCX tải về | File đã được kiểm duyệt và làm sạch (không macro); chọn Enable nếu Word hỏi chế độ Protected View |
| Bookmark cũ dạng `…-handbook.html` | Vẫn dùng được — tự chuyển về trang mới tương ứng |
| Muốn gửi đúng một mục cho đồng nghiệp | Mở mục đó rồi copy URL trên thanh địa chỉ (đã kèm `#…`) — người nhận mở là vào thẳng mục |
| Hiện lớp phủ "Đã phát hiện Developer Tools" | Đóng cửa sổ developer tools (F12) — lớp phủ sẽ tự biến mất; nội dung MẬT nên đọc trực tiếp, không dò xét mã nguồn |

---

## 12. Thông tin phiên bản

Cuối mỗi trang và trong khối **Document Control** ở sidebar có: phiên bản
nội dung, quý hiệu lực, **ngày cập nhật của chính trang đó**, và mã bản
deploy (dạng `v2026.07.21-vercel.…`) — khi báo lỗi, chụp kèm footer này để
chủ quản truy đúng bản đang chạy.

*Cần bản tiếng Anh của HDSD này hoặc muốn đưa HDSD thành một trang ngay
trong web? Liên hệ chủ quản.*
