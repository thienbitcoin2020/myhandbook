# CI/CD Pipeline Documentation

> Verbatim conversion of the handbook DOCX template `assets/templates/**/ci-cd-pipeline-documentation.docx` (Vietnamese-first; keep `[ĐIỀN: ...]` placeholders that the user has not answered).

**POWER HOME · DEPLOYMENT / DEVOPSCI/CD PIPELINE DOCUMENTATIONMASTER TEMPLATE · v1.0 · DRAFT**

| Trường | Giá trị kiểm soát |
|---|---|
| Mã tài liệu | [ĐIỀN: <TÊN DỰ ÁN>-103-v1.0-YYYYMMDD] |
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

**Output yêu cầu: **File Word (.docx); sơ đồ pipeline chèn dạng hình ảnh, mã Mermaid đặt ở phụ lục tài liệu.

### 1. Thông tin đầu vào

| Đầu vào bắt buộc | Giá trị / Tham chiếu | Trạng thái |
|---|---|---|
| Công cụ CI/CD: [GITHUB ACTIONS / GITLAB CI / JENKINS...] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| Branching strategy: [TRUNK-BASED / GITFLOW / KHÁC] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| Các môi trường: [DEV → STAGING → PROD, HOẶC KHÁC] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| Mô tả pipeline hiện tại (nếu có): [DÁN FILE CONFIG HOẶC MÔ TẢ] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |

### 2. Nội dung tài liệu

#### 1. Sơ đồ pipeline tổng thể bằng Mermaid

**Yêu cầu từ prompt: **Sơ đồ pipeline tổng thể bằng Mermaid: từ commit → build → test → scan → deploy từng môi trường

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

Quyết định / open point: [ĐIỀN hoặc ghi Không áp dụng kèm lý do]

#### 2. Từng stage

**Yêu cầu từ prompt: **Từng stage: mục đích, tool sử dụng, thời gian chạy điển hình, điều kiện pass/fail

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

Quyết định / open point: [ĐIỀN hoặc ghi Không áp dụng kèm lý do]

#### 3. Quality gates

**Yêu cầu từ prompt: **Quality gates: coverage tối thiểu [X%], security scan không có High+, lint pass — gate nào chặn cứng, gate nào chỉ cảnh báo

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

Quyết định / open point: [ĐIỀN hoặc ghi Không áp dụng kèm lý do]

#### 4. Quy tắc trigger

**Yêu cầu từ prompt: **Quy tắc trigger: branch nào chạy gì, khi nào auto-deploy, khi nào cần approve thủ công (và ai approve)

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

Quyết định / open point: [ĐIỀN hoặc ghi Không áp dụng kèm lý do]

#### 5. Quản lý secret trong pipeline

**Yêu cầu từ prompt: **Quản lý secret trong pipeline: lưu ở đâu, rotate thế nào, quy tắc cấm hardcode

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

Quyết định / open point: [ĐIỀN hoặc ghi Không áp dụng kèm lý do]

#### 6. Xử lý khi pipeline fail

**Yêu cầu từ prompt: **Xử lý khi pipeline fail: các lỗi thường gặp + cách xử lý, khi nào được phép re-run, khi nào cấm bypass

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

Quyết định / open point: [ĐIỀN hoặc ghi Không áp dụng kèm lý do]

#### 7. DORA metrics theo dõi

**Yêu cầu từ prompt: **DORA metrics theo dõi: deployment frequency, lead time for changes, change failure rate, MTTR — đo ở đâu, mục tiêu bao nhiêu

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

Quyết định / open point: [ĐIỀN hoặc ghi Không áp dụng kèm lý do]

#### 8. Quy trình thay đổi pipeline

**Yêu cầu từ prompt: **Quy trình thay đổi pipeline: ai được sửa, review thế nào

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

Quyết định / open point: [ĐIỀN hoặc ghi Không áp dụng kèm lý do]

### 3. Biểu mẫu làm việc

**Pipeline stages**

| Stage | Trigger | Quality gate | Artifact | Owner |
|---|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 3] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

**Pipeline controls**

| Control | Rule | Failure action | Evidence |
|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 3] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

#### CI/CD Pipeline

Hình minh hoạ là khung placeholder. PIC phải thay nhãn bằng nội dung dự án đã xác nhận.

#### Phụ lục · Mã Mermaid cho CI/CD Pipeline

flowchart LR COMMIT --> BUILD --> TEST_SCAN[Test and Scan] TEST_SCAN --> DEPLOY --> VERIFY

### 4. Nguyên tắc chất lượng

- Pipeline là code: mọi thay đổi qua PR + review, không sửa tay trên UI

- Quality gate chặn cứng không được bypass thầm lặng — bypass phải có log và approval

- Pipeline chậm là pipeline bị bỏ qua — nêu mục tiêu thời gian chạy tối đa

- PIC phải review, chịu trách nhiệm nội dung và chuyển trạng thái theo vòng đời tài liệu.

- Không để lại secret thật; chỉ ghi tên biến và tham chiếu secret manager khi cần.

### 5. Review & phê duyệt

**Sign-off**

| Vai trò | Họ tên | Kết luận | Ngày | Điều kiện / Ghi chú |
|---|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 3] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
