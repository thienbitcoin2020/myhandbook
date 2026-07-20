# Requirements Traceability Matrix (RTM)

> Verbatim conversion of the handbook DOCX template `assets/templates/**/requirements-traceability-matrix.docx` (Vietnamese-first; keep `[ĐIỀN: ...]` placeholders that the user has not answered).

[ĐIỀN: TÊN CÔNG TY / TỔ CHỨC]

**[ĐIỀN: TÊN DỰ ÁN]REQUIREMENTS TRACEABILITY MATRIX**

(RTM hai chiều — forward & backward traceability theo BABOK v3)

| Mã tài liệu | [ĐIỀN: RTM-<DỰ ÁN>-<PHẠM VI>] |
|---|---|
| Phạm vi | [ĐIỀN: module / phân hệ / release áp dụng] |
| Trạng thái | [ĐIỀN: Draft / Active / Baselined] |
| Ngày cập nhật gần nhất | [ĐIỀN: dd/mm/yyyy] |
| Mức bảo mật | [ĐIỀN: Internal / Confidential] |

**MỤC LỤC**

### **1. Giới thiệu & quy ước (Introduction & Conventions)**

#### **1.1 Mục đích**

RTM liên kết hai chiều toàn bộ chuỗi phân phối: yêu cầu nghiệp vụ (BR) → yêu cầu chức năng (FR) → thiết kế → dev task → test case → kết quả UAT. Forward traceability đảm bảo mọi yêu cầu đều được hiện thực hóa và kiểm thử; backward traceability đảm bảo mọi thứ được xây dựng đều có nguồn gốc yêu cầu — chống scope creep.

#### **1.2 Nguồn dữ liệu (Source Documents)**

| Mã | Tài liệu nguồn | Phiên bản | Nguồn / Link |
|---|---|---|---|
| REF-01 | [ĐIỀN: BRD đã duyệt — nguồn danh sách BR] | [ĐIỀN] | [ĐIỀN] |
| REF-02 | [ĐIỀN: SRS đã duyệt — nguồn danh sách FR] | [ĐIỀN] | [ĐIỀN] |
| REF-03 | [ĐIỀN: SAD / HLD / wireframe — nguồn Design ref] | [ĐIỀN] | [ĐIỀN] |
| REF-04 | [ĐIỀN: Jira project — nguồn Dev task ID] | [ĐIỀN] | [ĐIỀN] |
| REF-05 | [ĐIỀN: Test case repository của QC (nếu có)] | [ĐIỀN] | [ĐIỀN] |

#### **1.3 Quy ước cột & trạng thái**

| Cột / giá trị | Quy ước |
|---|---|
| BR ID / FR ID | Lấy đúng mã từ BRD / SRS baseline — không tự đặt mã mới trong RTM. Một BR có nhiều FR → mỗi FR một dòng, lặp lại BR ID. |
| Design ref | [ĐIỀN quy ước: mã mục SAD §x.y / mã màn hình wireframe / link Figma] |
| Dev task | [ĐIỀN quy ước: Jira ID, ví dụ <PROJECT>-1234; nhiều task → phân tách bằng dấu phẩy] |
| Test Case ID | Do QC điền theo quy ước [ĐIỀN: TC-xxx]; nhiều TC → phân tách bằng dấu phẩy |
| UAT Status | Not Started / In Progress / Passed / Failed / Blocked / Deferred — QC cập nhật |
| Ô trống có chủ đích | Ghi "N/A + lý do" (ví dụ FR bị defer sang phase sau). Ô trống KHÔNG lý do = gap → xuất hiện ở Mục 3. |

| Team có thể bổ sung cột "Mô tả ngắn" cạnh BR ID / FR ID để dễ đọc, nhưng mô tả chính thức luôn nằm ở BRD / SRS — RTM chỉ giữ mã để tránh hai nguồn sự thật. |
|---|

### **2. Bảng RTM hai chiều (Bidirectional Traceability Matrix)**

Đọc từ trái sang phải = forward trace (BR → UAT); đọc từ phải sang trái = backward trace (test case → BR gốc). Sắp xếp theo BR ID để nhóm các FR cùng nguồn gốc.

| BR ID | FR ID | Design ref (SAD / wireframe) | Dev task (Jira ID) | Test Case ID | UAT Status | Ghi chú |
|---|---|---|---|---|---|---|
| BR-[ĐIỀN] | FR-[ĐIỀN] | [ĐIỀN: SAD §... / WF-...] | [ĐIỀN: <JIRA>-...] | [ĐIỀN: TC-... — QC điền] | [Not Started] | [ĐIỀN] |
| BR-[ĐIỀN] | FR-[ĐIỀN] | [ĐIỀN: SAD §... / WF-...] | [ĐIỀN: <JIRA>-...] | [ĐIỀN: TC-... — QC điền] | [Not Started] | [ĐIỀN: cùng BR trên — 1 BR nhiều FR thì mỗi FR một dòng] |
| BR-[ĐIỀN] | FR-[ĐIỀN] | [ĐIỀN: SAD §... / WF-...] | [ĐIỀN: <JIRA>-...] | [ĐIỀN: TC-... — QC điền] | [Not Started] | [ĐIỀN] |

### **3. Phân tích gap (Gap Analysis)**

Ba loại gap dưới đây được rà soát tại mỗi kỳ cập nhật RTM và bắt buộc = 0 (hoặc được risk-accept có ghi nhận) trước mỗi milestone: baseline SRS, bàn giao QC, vào UAT, go-live.

#### **3.1 FR mồ côi (không trace về BR nào) — backward gap**

| FR ID | Nguồn phát sinh (ai đưa vào, khi nào) | Hướng xử lý | Trạng thái |
|---|---|---|---|
| FR-[ĐIỀN] | [ĐIỀN] | [Loại bỏ / Bổ sung BR qua CR / Risk-accept] | [Open] |

**Ý nghĩa: **FR mồ côi = scope creep tiềm ẩn — hệ thống đang xây thứ không ai yêu cầu. Mặc định loại bỏ trừ khi PO xác nhận bổ sung BR qua change control.

#### **3.2 BR chưa có FR nào cover — forward gap**

| BR ID | Lý do chưa cover | Hướng xử lý | Trạng thái |
|---|---|---|---|
| BR-[ĐIỀN] | [ĐIỀN: bỏ sót khi viết SRS / defer sang phase sau / phụ thuộc hệ thống ngoài] | [Bổ sung FR / Defer có xác nhận PO / ...] | [Open] |

**Ý nghĩa: **BR không được cover = cam kết nghiệp vụ bị bỏ rơi — stakeholder sẽ phát hiện ở UAT hoặc sau go-live, chi phí sửa cao nhất. Ưu tiên xử lý trước gap loại khác.

#### **3.3 FR chưa có test case — verification gap**

| FR ID | Ghi chú (độ phức tạp, phụ thuộc) | QC cam kết bổ sung trước | Trạng thái |
|---|---|---|---|
| FR-[ĐIỀN] | [ĐIỀN] | [ĐIỀN: milestone / sprint] | [Open] |

**Ý nghĩa: **FR không có test case = không thể xác nhận đã làm đúng. Điều kiện vào UAT: gap này = 0.

### **4. Thống kê coverage (Coverage Metrics)**

| Chỉ số | Công thức | Giá trị hiện tại | Ngưỡng yêu cầu |
|---|---|---|---|
| % BR được cover bởi ít nhất 1 FR | (Số BR có ≥1 FR) / (Tổng BR) × 100% | [ĐIỀN: ...%] | 100% trước baseline SRS |
| % FR có ít nhất 1 test case | (Số FR có ≥1 TC) / (Tổng FR) × 100% | [ĐIỀN: ...%] | 100% trước UAT |
| % FR không mồ côi (trace được về BR) | (Số FR có BR) / (Tổng FR) × 100% | [ĐIỀN: ...%] | 100% mọi thời điểm |
| % test case Passed tại UAT | (Số TC Passed) / (Tổng TC đã chạy) × 100% | [ĐIỀN: ...%] | [ĐIỀN: theo exit criteria UAT] |

**Tổng số hiện tại: **Tổng BR = [ĐIỀN] | Tổng FR = [ĐIỀN] | Tổng Test Case = [ĐIỀN] | Ngày chốt số liệu = [ĐIỀN]
