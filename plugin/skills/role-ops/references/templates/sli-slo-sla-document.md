# SLI / SLO / SLA Document

> Verbatim conversion of the handbook DOCX template `assets/templates/**/sli-slo-sla-document.docx` (Vietnamese-first; keep `[ĐIỀN: ...]` placeholders that the user has not answered).

**POWER HOME · OPERATIONS & SRESLI/SLO/SLA DOCUMENTMASTER TEMPLATE · v1.0 · DRAFT**

| Trường | Giá trị kiểm soát |
|---|---|
| Mã tài liệu | [ĐIỀN: <TÊN DỰ ÁN>-81-v1.0-YYYYMMDD] |
| PIC duy nhất | SRE Lead |
| Trạng thái | Draft → In Review → Approved → Superseded |
| Ngày hiệu lực | [ĐIỀN: dd/mm/yyyy] |
| Phân loại | MẬT (CONFIDENTIAL) · Lưu hành nội bộ |

**Nguyên tắc sử dụng: **Đây là template dùng chung, không gắn với dự án cụ thể. Giữ nguyên mọi ô [ĐIỀN...] cho đến khi PIC có dữ liệu được xác nhận; không tự suy diễn bối cảnh hay số liệu.

- Chỉ bản Approved được dùng làm căn cứ thực thi hoặc ra quyết định.

- Các role khác đóng góp qua review/input; chỉ PIC cập nhật bản chính.

- Mọi số liệu chưa xác nhận phải ghi [CẦN XÁC NHẬN].

### 1. Thông tin đầu vào

| Đầu vào bắt buộc | Giá trị / Tham chiếu | Trạng thái |
|---|---|---|
| Dịch vụ/tính năng trong phạm vi: [LIỆT KÊ] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| Kỳ vọng nghiệp vụ: [VD: THANH TOÁN KHÔNG ĐƯỢC GIÁN ĐOẠN QUÁ X PHÚT] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| Công cụ monitoring hiện có: [PROMETHEUS / DATADOG / CLOUDWATCH...] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| Cam kết hợp đồng với khách hàng (nếu có): [DÁN ĐIỀU KHOẢN] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |

### 2. Nội dung tài liệu

#### 1. Phân biệt SLI / SLO / SLA (giải thích 3 câu cho stakeholder không kỹ thuật)

Phân biệt SLI / SLO / SLA (giải thích 3 câu cho stakeholder không kỹ thuật)

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 2. SLI cho từng dịch vụ

SLI cho từng dịch vụ: chọn từ availability, latency (p50/p95/p99), error rate, throughput, freshness — kèm công thức đo chính xác và nguồn dữ liệu (metric nào, tool nào)

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 3. SLO đề xuất

SLO đề xuất: mục tiêu + cửa sổ đo (rolling 28/30 ngày) + căn cứ chọn mức đó

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 4. Error budget

Error budget: cách tính, ví dụ cụ thể (VD: SLO 99.9%/30 ngày → budget 43.2 phút)

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 5. Error budget policy

Error budget policy: burn rate bao nhiêu thì cảnh báo, hết budget thì hành động gì (đóng băng release tính năng, ưu tiên reliability)

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 6. SLA đối ngoại (nếu có)

SLA đối ngoại (nếu có): mức cam kết thấp hơn SLO nội bộ, điều khoản bồi hoàn

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 7. Bảng alert threshold gắn với burn rate (fast burn / slow burn)

Bảng alert threshold gắn với burn rate (fast burn / slow burn)

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

### 3. Biểu mẫu làm việc

**Service objectives**

| Service / Journey | SLI | SLO | Window | Owner |
|---|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 3] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

**Error budget policy**

| Condition | Budget state | Required action | Decision owner |
|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 3] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

### 4. Hướng dẫn chất lượng

- SLI đo từ góc nhìn người dùng, không đo cho có (CPU cao không phải SLI)

- SLO 100% là sai — mọi mục tiêu phải chừa error budget

- SLA cam kết ra ngoài luôn thấp hơn SLO nội bộ để có biên an toàn

- Chưa có dữ liệu lịch sử → đề xuất SLO tạm + kế hoạch đo 4-6 tuần rồi hiệu chỉnh, đánh dấu [CẦN XÁC NHẬN]

- PIC phải review, chịu trách nhiệm nội dung và chuyển trạng thái theo vòng đời tài liệu.

- Không để lại secret thật; chỉ ghi tên biến và tham chiếu secret manager khi cần.
