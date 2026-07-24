# Disaster Recovery Plan

> Verbatim conversion of the handbook DOCX template `assets/templates/**/disaster-recovery-plan.docx` (Vietnamese-first; keep `[ĐIỀN: ...]` placeholders that the user has not answered).

**BP · OPERATIONS & SREDISASTER RECOVERY PLANMASTER TEMPLATE · v1.0 · DRAFT**

| Trường | Giá trị kiểm soát |
|---|---|
| Mã tài liệu | [ĐIỀN: <TÊN DỰ ÁN>-84-v1.0-YYYYMMDD] |
| PIC duy nhất | SRE Lead |
| Trạng thái | Draft → In Review → Approved → Superseded |
| Ngày hiệu lực | [ĐIỀN: dd/mm/yyyy] |
| Phân loại | CÔNG KHAI (PUBLIC) · Bản công khai |

**Nguyên tắc sử dụng: **Đây là template dùng chung, không gắn với dự án cụ thể. Giữ nguyên mọi ô [ĐIỀN...] cho đến khi PIC có dữ liệu được xác nhận; không tự suy diễn bối cảnh hay số liệu.

- Chỉ bản Approved được dùng làm căn cứ thực thi hoặc ra quyết định.

- Các role khác đóng góp qua review/input; chỉ PIC cập nhật bản chính.

- Mọi số liệu chưa xác nhận phải ghi [CẦN XÁC NHẬN].

### 1. Thông tin đầu vào

| Đầu vào bắt buộc | Giá trị / Tham chiếu | Trạng thái |
|---|---|---|
| Hệ thống & mức quan trọng nghiệp vụ: [TIER 1/2/3 HOẶC MÔ TẢ] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| Hạ tầng hiện tại: [CLOUD REGION, BACKUP HIỆN CÓ, REPLICATION] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| Ngân sách/ràng buộc DR: [NẾU CÓ] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |

### 2. Nội dung tài liệu

#### 1. Phân tầng hệ thống theo mức quan trọng, mỗi tầng

Phân tầng hệ thống theo mức quan trọng, mỗi tầng có RTO (thời gian khôi phục tối đa) và RPO (mất dữ liệu tối đa) — bảng rõ ràng

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 2. Kịch bản thảm họa trong phạm vi

Kịch bản thảm họa trong phạm vi: mất 1 AZ, mất cả region, ransomware, xóa nhầm dữ liệu, mất nhà cung cấp thứ 3

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 3. Chiến lược DR từng tầng

Chiến lược DR từng tầng: backup-restore / pilot light / warm standby / multi-site active-active + trade-off chi phí

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 4. Quy trình failover từng bước

Quy trình failover từng bước: điều kiện kích hoạt, ai có quyền quyết định, lệnh/hành động cụ thể, tiêu chí xác nhận thành công

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 5. Quy trình failback về trạng thái bình thường

Quy trình failback về trạng thái bình thường

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 6. Chiến lược backup

Chiến lược backup: tần suất, retention, immutable backup (chống ransomware), nơi lưu tách biệt

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 7. Kế hoạch DR test

Kế hoạch DR test: lịch diễn tập [QUÝ/NĂM], loại test (tabletop / restore test / full failover), tiêu chí pass

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 8. Cây liên lạc khẩn cấp & vai trò trong thảm họa

Cây liên lạc khẩn cấp & vai trò trong thảm họa

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

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

### 4. Hướng dẫn chất lượng

- RTO/RPO do nghiệp vụ quyết định dựa trên thiệt hại, không phải kỹ thuật tự đặt

- DR chưa từng test = chưa có DR — lịch test là phần bắt buộc của kế hoạch

- Backup phải có bản immutable/offline để chống ransomware

- Chi phí DR phải tương xứng thiệt hại — nêu rõ trade-off cho từng lựa chọn

- PIC phải review, chịu trách nhiệm nội dung và chuyển trạng thái theo vòng đời tài liệu.

- Không để lại secret thật; chỉ ghi tên biến và tham chiếu secret manager khi cần.

### 5. Phê duyệt quyết định

**Sign-off**

| Vai trò | Họ tên | Kết luận | Ngày | Điều kiện / Ghi chú |
|---|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
