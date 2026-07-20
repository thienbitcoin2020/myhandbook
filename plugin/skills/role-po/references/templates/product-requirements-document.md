# Product Requirements Document (PRD)

> Verbatim conversion of the handbook DOCX template `assets/templates/**/product-requirements-document.docx` (Vietnamese-first; keep `[ĐIỀN: ...]` placeholders that the user has not answered).

### TÀI LIỆU YÊU CẦU SẢN PHẨM (PRODUCT REQUIREMENTS DOCUMENT)

| Trường thông tin | Nội dung |
|---|---|
| Trạng thái | DRAFT / IN REVIEW / APPROVED / IN DEV / DONE |
| Owner (PM) | @TenPM |
| Tech Lead | @TenTechLead |
| Designer | @TenDesigner |
| Stakeholders | Marketing, Sales, Legal, CS |
| Ngày mục tiêu | DD/MM/YYYY |
| Tài liệu liên quan | [Jira Epic], [Figma], |

#### 1. Bối cảnh & Chiến lược (Strategic Context)

##### 1.1. Vấn đề (Problem Statement)

Mô tả nỗi đau của người dùng. "Tại sao" chúng ta cần làm điều này ngay bây giờ?

Ví dụ: Người dùng mất quá nhiều thời gian để... Dữ liệu cho thấy 40% người dùng rớt ở bước này...

##### 1.2. Mục tiêu (Goals & Non-Goals)

- **Mục tiêu Kinh doanh (Business Goals):** (VD: Tăng doanh thu X%, Giảm chi phí Y%)

- **Mục tiêu Sản phẩm (Product Goals):** (VD: Giảm thời gian hoàn thành task xuống 50%)

- **Non-Goals (Những gì sẽ KHÔNG làm):** (Rất quan trọng để tránh scope creep)

- Không hỗ trợ mobile trong v1.

- Không làm tính năng X...

##### 1.3. Chỉ số Thành công (Success Metrics)

| Metric (Chỉ số) | Định nghĩa | Hiện tại | Mục tiêu |
|---|---|---|---|
| North Star | Chỉ số quan trọng nhất | ... | ... |
| Guardrail | Chỉ số đối trọng (VD: Tăng conversion nhưng không được tăng tỷ lệ lỗi) | ... | ... |

#### 2. Đối tượng sử dụng (User Personas)

- **Persona Chính:**

- **Anti-Persona:** [Đối tượng chúng ta KHÔNG phục vụ]

#### 3. Yêu cầu Chức năng (Functional Requirements)

##### 3.1. Bảng chi tiết tính năng (User Stories)

| ID | Ưu tiên (MoSCoW) | User Story (Là ai, Muốn gì, Để làm gì) | Tiêu chí Chấp nhận (Acceptance Criteria - Gherkin) |
|---|---|---|---|
| F-01 | MUST | Là..., tôi muốn... để... | Given... When... Then... Ngoại lệ:... |
| F-02 | SHOULD | ... | ... |
| F-03 | COULD | ... | ... |

#### 4. Trải nghiệm Người dùng (UX/UI Flows)

- **Link Design:** [Embed Figma/Miro Link]

- **Mô tả luồng chính (Key Flows):**

- **Các trạng thái giao diện (UI States):**

- Empty State: (Khi chưa có dữ liệu)

- Loading State:

- Error State:

#### 5. Yêu cầu Phi chức năng (Non-Functional Requirements)

Quan trọng cho Dev & QA

- **Hiệu năng (Performance):** (VD: API response < 200ms, chịu tải 10k CCU)

- **Bảo mật (Security):** (VD: Mã hóa dữ liệu, Quyền truy cập)

- **Data & Tracking:** (VD: Cần bắn event gì về Analytics?)

- **Môi trường:** (VD: Chỉ chạy trên Chrome & Safari, Mobile Support?)

#### 6. Kế hoạch ra mắt (Go-to-Market & Launch)

- **Release Strategy:** (Alpha -> Beta -> 100% Rollout?)

- **User Guide/FAQ:** Cần viết hướng dẫn gì?

- **Training:** Cần đào tạo team CS/Sales không?

#### 7. Câu hỏi mở & Rủi ro (Open Questions & Risks)

Những điều chưa rõ ràng cần thảo luận thêm

- [ ] Vấn đề A cần confirm với team Legal?

- [ ] Rủi ro kỹ thuật B có thể làm chậm tiến độ?
