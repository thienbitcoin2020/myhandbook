# Deployment Runbook & Rollback Plan

> Verbatim conversion of the handbook DOCX template `assets/templates/**/deployment-runbook-rollback-plan.docx` (Vietnamese-first; keep `[ĐIỀN: ...]` placeholders that the user has not answered).

**POWER HOME · DEPLOYMENT / DEVOPSDEPLOYMENT RUNBOOK + ROLLBACK PLANMASTER TEMPLATE · v1.0 · DRAFT**

| Trường | Giá trị kiểm soát |
|---|---|
| Mã tài liệu | [ĐIỀN: <TÊN DỰ ÁN>-101-v1.0-YYYYMMDD] |
| PIC duy nhất | DevOps Engineer |
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
| 1.0 | [ĐIỀN] | DevOps Engineer | Bản template đầu tiên | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

### Mục lục

Mở tài liệu trong Word và chọn Update Field để cập nhật mục lục.

**Output yêu cầu: **File Word (.docx), lệnh trong code block, bảng tiêu chí rollback.

### 1. Thông tin đầu vào

| Đầu vào bắt buộc | Giá trị / Tham chiếu | Trạng thái |
|---|---|---|
| Thành phần deploy đợt này: [SERVICE/APP + VERSION] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| Hạ tầng & công cụ: [K8S / VM / SERVERLESS, CI/CD TOOL] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| Chiến lược release: [BLUE-GREEN / CANARY / ROLLING / BIG BANG + LÝ DO] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| Có migration DB không: [CÓ/KHÔNG — NẾU CÓ, MÔ TẢ] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |

### 2. Nội dung tài liệu

#### 1. Thông tin release

**Yêu cầu từ prompt: **Thông tin release: version, scope thay đổi, ticket liên quan, cửa sổ deploy (ngày giờ, múi giờ), thời lượng dự kiến

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

Quyết định / open point: [ĐIỀN hoặc ghi Không áp dụng kèm lý do]

#### 2. Pre-deployment checklist

**Yêu cầu từ prompt: **Pre-deployment checklist: approval đã có, backup đã chạy, thông báo stakeholder, feature flag chuẩn bị, điều kiện dừng ngay từ đầu

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

Quyết định / open point: [ĐIỀN hoặc ghi Không áp dụng kèm lý do]

#### 3. Các bước deploy

**Yêu cầu từ prompt: **Các bước deploy: đánh số, mỗi bước có lệnh cụ thể (copy-paste được) + expected output + bước verify trước khi sang bước tiếp

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

Quyết định / open point: [ĐIỀN hoặc ghi Không áp dụng kèm lý do]

#### 4. Nếu canary

**Yêu cầu từ prompt: **Nếu canary: tỷ lệ tăng dần ([5% → 25% → 50% → 100%]), metric theo dõi ở mỗi nấc, thời gian quan sát tối thiểu, tiêu chí lên nấc tiếp

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

Quyết định / open point: [ĐIỀN hoặc ghi Không áp dụng kèm lý do]

#### 5. Xử lý DB migration

**Yêu cầu từ prompt: **Xử lý DB migration: thứ tự (migrate trước hay sau deploy code), tính tương thích ngược, cách rollback migration

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

Quyết định / open point: [ĐIỀN hoặc ghi Không áp dụng kèm lý do]

#### 6. Smoke test sau deploy

**Yêu cầu từ prompt: **Smoke test sau deploy: danh sách kiểm tra + ai xác nhận

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

Quyết định / open point: [ĐIỀN hoặc ghi Không áp dụng kèm lý do]

#### 7. Rollback plan

**Yêu cầu từ prompt: **Rollback plan: TIÊU CHÍ KÍCH HOẠT CỤ THỂ (VD: error rate > X% trong Y phút, latency p99 > Z ms), các bước rollback từng bước như deploy, ai có quyền quyết định rollback, thời gian rollback dự kiến

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

Quyết định / open point: [ĐIỀN hoặc ghi Không áp dụng kèm lý do]

#### 8. Liên lạc

**Yêu cầu từ prompt: **Liên lạc: kênh war-room, ai cần online trong cửa sổ deploy, template thông báo deploy thành công/thất bại

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

Quyết định / open point: [ĐIỀN hoặc ghi Không áp dụng kèm lý do]

### 3. Biểu mẫu làm việc

**Deployment sequence**

| Step | Component | Command / Action | Verify | Owner |
|---|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 3] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

**Rollback plan**

| Trigger | Rollback action | Data impact | Verification | Decision owner |
|---|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 3] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

### 4. Nguyên tắc chất lượng

- Rollback phải được nghĩ TRƯỚC khi deploy, không phải lúc cháy nhà

- Tiêu chí rollback định lượng, quyết định nhanh — do dự làm sự cố tệ hơn

- DB migration luôn tương thích ngược ít nhất 1 version (expand-contract pattern)

- Mọi lệnh nguy hiểm đánh dấu ⚠️ + điều kiện tiên quyết

- Deploy thứ 6 chiều? Cảnh báo và yêu cầu lý do chính đáng

- PIC phải review, chịu trách nhiệm nội dung và chuyển trạng thái theo vòng đời tài liệu.

- Không để lại secret thật; chỉ ghi tên biến và tham chiếu secret manager khi cần.

### 5. Review & phê duyệt

**Sign-off**

| Vai trò | Họ tên | Kết luận | Ngày | Điều kiện / Ghi chú |
|---|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 3] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
