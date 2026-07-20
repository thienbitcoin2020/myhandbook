# Information Architecture & Wireframe Brief

> Verbatim conversion of the handbook DOCX template `assets/templates/**/information-architecture-wireframe-brief.docx` (Vietnamese-first; keep `[ĐIỀN: ...]` placeholders that the user has not answered).

**POWER HOME · UX/UI DESIGNERINFORMATION ARCHITECTURE & WIREFRAME BRIEFMASTER TEMPLATE · v1.0 · DRAFT**

| Trường | Giá trị kiểm soát |
|---|---|
| Mã tài liệu | [ĐIỀN: <TÊN DỰ ÁN>-52-v1.0-YYYYMMDD] |
| PIC duy nhất | UX |
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
| Danh sách chức năng (từ PRD/SRS): [...] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| Persona chính: [...] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |
| Platform: [web / mobile / responsive] | [ĐIỀN: nội dung hoặc đường dẫn nguồn] | [CẦN XÁC NHẬN] |

### 2. Nội dung tài liệu

#### 1. Sitemap dạng cây (Mermaid) + giải thích logic nhóm thông tin

Sitemap dạng cây (Mermaid) + giải thích logic nhóm thông tin

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 2. Navigation model (primary/secondary nav, quy tắc breadcrumb)

Navigation model (primary/secondary nav, quy tắc breadcrumb)

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 3. Với 3-5 màn hình quan trọng nhất, mô tả wireframe

Với 3-5 màn hình quan trọng nhất, mô tả wireframe: layout từng vùng, thành phần, các trạng thái (empty / loading / error / success), hành vi responsive

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 4. User flow chính (Mermaid flowchart) kèm các điểm quyết định

User flow chính (Mermaid flowchart) kèm các điểm quyết định

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

#### 5. Content hierarchy

Content hierarchy: thứ tự ưu tiên thông tin trên mỗi màn

[ĐIỀN: nội dung đã được PIC xác nhận, kèm nguồn hoặc minh chứng khi áp dụng]

### 3. Biểu mẫu làm việc

**Content inventory**

| Content / Screen | User need | Parent | Priority | Owner |
|---|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 3] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

**Wireframe register**

| ID | Screen | Purpose | State / Variant | Review status |
|---|---|---|---|---|
| [ĐIỀN 1] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 2] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |
| [ĐIỀN 3] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

#### Sitemap / User Flow

Hình minh hoạ là khung placeholder. PIC phải thay nhãn bằng nội dung dự án đã xác nhận.

#### Phụ lục · Mã Mermaid cho Sitemap / User Flow

flowchart LR HOME[HOME] --> SECTION[SECTION] SECTION --> SCREEN[SCREEN] SCREEN --> ACTION[ACTION]

### 4. Hướng dẫn chất lượng

- Mỗi màn hình phải trả lời được: user đến từ đâu, làm gì chính ở đây, đi đâu tiếp

- Tuân Nielsen heuristics: visibility of system status, error prevention, recognition over recall

- Mobile-first nếu là responsive

- PIC phải review, chịu trách nhiệm nội dung và chuyển trạng thái theo vòng đời tài liệu.

- Không để lại secret thật; chỉ ghi tên biến và tham chiếu secret manager khi cần.
