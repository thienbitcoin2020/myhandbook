# Deployment Runbook & Rollback Plan

> Verbatim conversion of the handbook DOCX template `assets/templates/**/deployment-runbook-rollback-plan.docx` (Vietnamese-first; keep `[ĐIỀN: ...]` placeholders that the user has not answered).

**BP · DEPLOYMENT / DEVOPSDEPLOYMENT RUNBOOK + ROLLBACK PLANMASTER TEMPLATE · v1.0 · DRAFT**

| Trường | Giá trị kiểm soát |
|---|---|
| Mã tài liệu | [ĐIỀN: <TÊN DỰ ÁN>-101-v1.0-YYYYMMDD] |
| PIC duy nhất | DevOps Engineer |
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
| Thành phần deploy đợt này: [SERVICE/APP + VERSION] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| Hạ tầng & công cụ: [K8S / VM / SERVERLESS, CI/CD TOOL] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| Chiến lược release: [BLUE-GREEN / CANARY / ROLLING / BIG BANG + LÝ DO] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| Có migration DB không: [CÓ/KHÔNG — NẾU CÓ, MÔ TẢ] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |

### 2. Nội dung tài liệu

#### 1. Thông tin release

Thông tin release: version, scope thay đổi, ticket liên quan, cửa sổ deploy (ngày giờ, múi giờ), thời lượng dự kiến

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 2. Pre-deployment checklist

Pre-deployment checklist: approval đã có, backup đã chạy, thông báo stakeholder, feature flag chuẩn bị, điều kiện dừng ngay từ đầu

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 3. Các bước deploy

Các bước deploy: đánh số, mỗi bước có lệnh cụ thể (copy-paste được) + expected output + bước verify trước khi sang bước tiếp

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 4. Nếu canary

Nếu canary: tỷ lệ tăng dần ([5% → 25% → 50% → 100%]), metric theo dõi ở mỗi nấc, thời gian quan sát tối thiểu, tiêu chí lên nấc tiếp

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 5. Xử lý DB migration

Xử lý DB migration: thứ tự (migrate trước hay sau deploy code), tính tương thích ngược, cách rollback migration

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 6. Smoke test sau deploy

Smoke test sau deploy: danh sách kiểm tra + ai xác nhận

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 7. Rollback plan

Rollback plan: TIÊU CHÍ KÍCH HOẠT CỤ THỂ (VD: error rate > X% trong Y phút, latency p99 > Z ms), các bước rollback từng bước như deploy, ai có quyền quyết định rollback, thời gian rollback dự kiến

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 8. Liên lạc

Liên lạc: kênh war-room, ai cần online trong cửa sổ deploy, template thông báo deploy thành công/thất bại

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

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

### 4. Hướng dẫn chất lượng

- Rollback phải được nghĩ TRƯỚC khi deploy, không phải lúc cháy nhà

- Tiêu chí rollback định lượng, quyết định nhanh — do dự làm sự cố tệ hơn

- DB migration luôn tương thích ngược ít nhất 1 version (expand-contract pattern)

- Mọi lệnh nguy hiểm đánh dấu ⚠️ + điều kiện tiên quyết

- Deploy thứ 6 chiều? Cảnh báo và yêu cầu lý do chính đáng

- PIC phải review, chịu trách nhiệm nội dung và chuyển trạng thái theo vòng đời tài liệu.

- Không để lại secret thật; chỉ ghi tên biến và tham chiếu secret manager khi cần.
