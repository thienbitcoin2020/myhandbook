# Operational Runbook

> Verbatim conversion of the handbook DOCX template `assets/templates/**/operational-runbook.docx` (Vietnamese-first; keep `[ĐIỀN: ...]` placeholders that the user has not answered).

**POWER HOME · OPERATIONS & SREOPERATIONAL RUNBOOKMASTER TEMPLATE · v1.0 · DRAFT**

| Trường | Giá trị kiểm soát |
|---|---|
| Mã tài liệu | [ĐIỀN: <TÊN DỰ ÁN>-82-v1.0-YYYYMMDD] |
| PIC duy nhất | SRE / On-call Engineer |
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
| Tình huống/alert cần runbook: [VD: API LATENCY P99 > 2S, DB CONNECTION POOL CẠN] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| Kiến trúc & công cụ liên quan: [MÔ TẢ NGẮN, TOOL TRUY CẬP] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| Quyền hạn on-call: [ĐƯỢC LÀM GÌ, KHÔNG ĐƯỢC LÀM GÌ] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |

### 2. Nội dung tài liệu

#### 1. Tên alert + mức nghiêm trọng + ý nghĩa (1-2 câu

Tên alert + mức nghiêm trọng + ý nghĩa (1-2 câu: alert này nói lên điều gì)

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 2. Tác động người dùng khi alert này xảy ra

Tác động người dùng khi alert này xảy ra

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 3. Bước chẩn đoán nhanh (5-10 phút đầu)

Bước chẩn đoán nhanh (5-10 phút đầu): lệnh/dashboard cụ thể, copy-paste chạy được ngay

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 4. Cây quyết định

Cây quyết định: nếu thấy X → làm A; nếu thấy Y → làm B (dùng Mermaid flowchart nếu phức tạp)

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 5. Bước khắc phục từng nhánh

Bước khắc phục từng nhánh: lệnh cụ thể, đánh dấu ⚠️ trước mọi lệnh nguy hiểm (restart, xóa, failover) kèm điều kiện được phép chạy

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 6. Tiêu chí xác nhận đã khôi phục

Tiêu chí xác nhận đã khôi phục

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 7. Khi nào escalate

Khi nào escalate: quá [X] phút không xử lý được → gọi ai (kèm thông tin liên lạc)

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 8. Việc sau sự cố

Việc sau sự cố: cập nhật ticket, ghi chú cho postmortem

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

### 3. Biểu mẫu làm việc

**Runbook procedures**

| Trigger | Diagnostic | Action / Command | Verify | Escalate |
|---|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 3] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

**Operational contacts**

| Service | Primary | Backup | Escalation | Hours |
|---|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 3] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

### 4. Hướng dẫn chất lượng

- Viết cho người bị gọi dậy lúc 3h sáng: câu ngắn, lệnh copy-paste được, không văn vẻ

- Mọi lệnh thay đổi trạng thái hệ thống phải có ⚠️ và điều kiện tiên quyết

- Runbook phải test định kỳ — lệnh lỗi thời nguy hiểm hơn không có runbook

- Thông tin hệ thống chưa rõ → đánh dấu [CẦN XÁC NHẬN], không đoán lệnh

- PIC phải review, chịu trách nhiệm nội dung và chuyển trạng thái theo vòng đời tài liệu.

- Không để lại secret thật; chỉ ghi tên biến và tham chiếu secret manager khi cần.
