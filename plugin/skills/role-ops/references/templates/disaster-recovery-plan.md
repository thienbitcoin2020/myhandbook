# Disaster Recovery Plan

> Verbatim conversion of the handbook DOCX template `assets/templates/**/disaster-recovery-plan.docx` (Vietnamese-first; keep `[ĐIỀN: ...]` placeholders that the user has not answered).

**POWER HOME · OPERATIONS & SREDISASTER RECOVERY PLANMASTER TEMPLATE · v1.0 · DRAFT**

| Trường | Giá trị kiểm soát |
|---|---|
| Mã tài liệu | [ĐIỀN: <TÊN DỰ ÁN>-84-v1.0-YYYYMMDD] |
| PIC duy nhất | SRE Lead |
| Trạng thái | Draft → In Review → Approved → Superseded |
| Ngày hiệu lực | [ĐIỀN: dd/mm/yyyy] |
| Phân loại | MẬT (CONFIDENTIAL) · Lưu hành nội bộ |

**Nguyên tắc sử dụng: **Đây là template dùng chung, không gắn với dự án cụ thể. Giữ nguyên mọi ô [ĐIỀN...] cho đến khi PIC có dữ liệu được xác nhận; không tự suy diễn bối cảnh hay số liệu.

- Chỉ bản Approved được dùng làm căn cứ thực thi hoặc ra quyết định.

- Các role khác đóng góp qua review/input; chỉ PIC cập nhật bản chính.

- Mọi số liệu chưa xác nhận phải ghi [CẦN XÁC NHẬN].

### Kiểm soát tài liệu

**Revision History**

| Version | Ngày | Người sửa (PIC) | Nội dung thay đổi | Người duyệt |
|---|---|---|---|---|
| 1.0 | [ĐIỀN] | SRE Lead | Bản template đầu tiên | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

### Mục lục

Mở tài liệu trong Word và chọn Update Field để cập nhật mục lục.

**Output yêu cầu: **File Word (.docx), kèm bảng RTO/RPO và quy trình failover.

### 1. Thông tin đầu vào

| Đầu vào bắt buộc | Giá trị / Tham chiếu | Trạng thái |
|---|---|---|
| Hệ thống & mức quan trọng nghiệp vụ: [TIER 1/2/3 HOẶC MÔ TẢ] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| Hạ tầng hiện tại: [CLOUD REGION, BACKUP HIỆN CÓ, REPLICATION] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| Ngân sách/ràng buộc DR: [NẾU CÓ] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |

### 2. Nội dung tài liệu

#### 1. Phân tầng hệ thống theo mức quan trọng, mỗi tầng

**Yêu cầu từ prompt: **Phân tầng hệ thống theo mức quan trọng, mỗi tầng có RTO (thời gian khôi phục tối đa) và RPO (mất dữ liệu tối đa) — bảng rõ ràng

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

Quyết định / open point: [ĐIỀN hoặc ghi Không áp dụng kèm lý do]

#### 2. Kịch bản thảm họa trong phạm vi

**Yêu cầu từ prompt: **Kịch bản thảm họa trong phạm vi: mất 1 AZ, mất cả region, ransomware, xóa nhầm dữ liệu, mất nhà cung cấp thứ 3

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

Quyết định / open point: [ĐIỀN hoặc ghi Không áp dụng kèm lý do]

#### 3. Chiến lược DR từng tầng

**Yêu cầu từ prompt: **Chiến lược DR từng tầng: backup-restore / pilot light / warm standby / multi-site active-active + trade-off chi phí

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

Quyết định / open point: [ĐIỀN hoặc ghi Không áp dụng kèm lý do]

#### 4. Quy trình failover từng bước

**Yêu cầu từ prompt: **Quy trình failover từng bước: điều kiện kích hoạt, ai có quyền quyết định, lệnh/hành động cụ thể, tiêu chí xác nhận thành công

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

Quyết định / open point: [ĐIỀN hoặc ghi Không áp dụng kèm lý do]

#### 5. Quy trình failback về trạng thái bình thường

**Yêu cầu từ prompt: **Quy trình failback về trạng thái bình thường

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

Quyết định / open point: [ĐIỀN hoặc ghi Không áp dụng kèm lý do]

#### 6. Chiến lược backup

**Yêu cầu từ prompt: **Chiến lược backup: tần suất, retention, immutable backup (chống ransomware), nơi lưu tách biệt

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

Quyết định / open point: [ĐIỀN hoặc ghi Không áp dụng kèm lý do]

#### 7. Kế hoạch DR test

**Yêu cầu từ prompt: **Kế hoạch DR test: lịch diễn tập [QUÝ/NĂM], loại test (tabletop / restore test / full failover), tiêu chí pass

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

Quyết định / open point: [ĐIỀN hoặc ghi Không áp dụng kèm lý do]

#### 8. Cây liên lạc khẩn cấp & vai trò trong thảm họa

**Yêu cầu từ prompt: **Cây liên lạc khẩn cấp & vai trò trong thảm họa

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

Quyết định / open point: [ĐIỀN hoặc ghi Không áp dụng kèm lý do]

### 3. Biểu mẫu làm việc

**Recovery objectives**

| Service | Tier | RTO | RPO | Recovery owner |
|---|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 3] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

**DR test plan**

| Scenario | Scope | Success criteria | Date | Owner |
|---|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 3] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

### 4. Nguyên tắc chất lượng

- RTO/RPO do nghiệp vụ quyết định dựa trên thiệt hại, không phải kỹ thuật tự đặt

- DR chưa từng test = chưa có DR — lịch test là phần bắt buộc của kế hoạch

- Backup phải có bản immutable/offline để chống ransomware

- Chi phí DR phải tương xứng thiệt hại — nêu rõ trade-off cho từng lựa chọn

- PIC phải review, chịu trách nhiệm nội dung và chuyển trạng thái theo vòng đời tài liệu.

- Không để lại secret thật; chỉ ghi tên biến và tham chiếu secret manager khi cần.

### 5. Review & phê duyệt

**Sign-off**

| Vai trò | Họ tên | Kết luận | Ngày | Điều kiện / Ghi chú |
|---|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 3] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
