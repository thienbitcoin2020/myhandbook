# Solution Architecture Document

> Verbatim conversion of the handbook DOCX template `assets/templates/**/solution-architecture-document.docx` (Vietnamese-first; keep `[ĐIỀN: ...]` placeholders that the user has not answered).

**SOLUTION ARCHITECTURE DOCUMENT**

(Tài liệu Kiến trúc Giải pháp — khung arc42 + C4 Model)

[TÊN DỰ ÁN / HỆ THỐNG]

| Thuộc tính | Giá trị |
|---|---|
| Mã dự án | [ĐIỀN mã dự án] |
| Trạng thái | [Draft / In Review / Approved] |
| Người review | [ĐIỀN — VD: EA, Tech Lead, Security] |
| Người phê duyệt | [ĐIỀN — VD: ARB / CTO] |
| Phạm vi bảo mật | [Internal / Confidential] |

#### **Tài liệu tham chiếu**

| Mã | Tên tài liệu | Phiên bản | Ghi chú |
|---|---|---|---|
| [SRS-XXX] | [Software Requirements Specification] | [ĐIỀN] | [Nguồn FR/NFR — chỉ tham chiếu mã FR, không copy chi tiết] |
| [BRD-XXX] | [Business Requirements Document] | [ĐIỀN] | [ĐIỀN] |
| [ADR-log] | [Architecture Decision Records] | [link repo] | [Xem Mục 9] |

### **Mục lục**

### **1. Introduction & Goals (Giới thiệu & Mục tiêu)**

#### **1.1 Tổng quan yêu cầu**

Tóm tắt ngắn gọn (5–10 dòng) bài toán nghiệp vụ và phạm vi giải pháp. Chi tiết yêu cầu chức năng KHÔNG lặp lại ở đây — chỉ tham chiếu mã FR trong SRS: [ĐIỀN — VD: FR-001 ÷ FR-045, xem SRS-XXX mục 3].

[ĐIỀN mô tả tổng quan bài toán và giá trị nghiệp vụ kỳ vọng]

#### **1.2 Quality Goals (Top 3–5, xếp hạng ưu tiên)**

Best practice: quality goals quyết định kiến trúc nhiều hơn FR. Mỗi goal phải đo được và gắn với NFR ở Mục 10.

| Hạng | Quality Goal | Động lực / Kịch bản đo lường (Quality Scenario) |
|---|---|---|
| 1 | [VD: Performance] | [VD: 95% request API < 500ms tại peak [ĐIỀN] concurrent users] |
| 2 | [VD: Availability] | [VD: SLA ≥ 99.9%/tháng; RTO ≤ [ĐIỀN], RPO ≤ [ĐIỀN]] |
| 3 | [VD: Security] | [VD: Tuân thủ [ĐIỀN chuẩn — ISO 27001 / tiêu chuẩn ngành phù hợp / NĐ 13]] |
| 4 | [ĐIỀN] | [ĐIỀN] |
| 5 | [ĐIỀN] | [ĐIỀN] |

#### **1.3 Stakeholders**

| Vai trò | Tên / Đơn vị | Kỳ vọng đối với kiến trúc |
|---|---|---|
| [Product Owner] | [ĐIỀN] | [ĐIỀN] |
| [Enterprise Architect] | [ĐIỀN] | [Tuân thủ EA principles & standards] |
| [Dev Team / Vendor] | [ĐIỀN] | [Design buildable, rõ interface] |
| [Security / Compliance] | [ĐIỀN] | [ĐIỀN] |
| [Operations] | [ĐIỀN] | [Vận hành được: observability, runbook] |

### **2. Constraints (Ràng buộc)**

#### **2.1 Ràng buộc kỹ thuật**

| ID | Ràng buộc | Nguồn / Lý do |
|---|---|---|
| TC-01 | [VD: Bắt buộc dùng tech stack [ĐIỀN theo input 'Tech stack ưu tiên/bắt buộc']] | [VD: Chuẩn công nghệ của tổ chức] |
| TC-02 | [VD: Phải tích hợp với hệ thống hiện hữu [ĐIỀN theo input 'Hệ thống hiện hữu']] | [ĐIỀN] |
| TC-03 | [VD: Triển khai on-premise / cloud [ĐIỀN]] | [ĐIỀN] |

#### **2.2 Ràng buộc tổ chức**

| ID | Ràng buộc | Nguồn / Lý do |
|---|---|---|
| OC-01 | [VD: Deadline go-live [ĐIỀN]; ngân sách [ĐIỀN]] | [ĐIỀN] |
| OC-02 | [VD: Đội phát triển vendor [ĐIỀN], quy trình release theo [ĐIỀN]] | [ĐIỀN] |

#### **2.3 Ràng buộc quy định / pháp lý**

| ID | Ràng buộc | Nguồn / Lý do |
|---|---|---|
| RC-01 | [VD: Bảo vệ dữ liệu cá nhân theo [ĐIỀN — VD: Nghị định 13/2023/NĐ-CP]] | [Pháp lý] |
| RC-02 | [VD: Quy định ngành [ĐIỀN — VD: cơ quan quản lý, tiêu chuẩn ngành phù hợp, ISO 27001]] | [ĐIỀN] |
| RC-03 | [VD: Dữ liệu phải lưu trữ tại [ĐIỀN — data residency]] | [ĐIỀN] |

### **3. Context & Scope (Bối cảnh & Phạm vi)**

#### **3.1 Business Context — C4 Level 1: System Context**

Sơ đồ dưới đây thể hiện hệ thống mục tiêu, các nhóm người dùng và hệ thống ngoài tương tác. Thay các nhãn [ĐIỀN] bằng thông tin thực tế của dự án (mã Mermaid ở Phụ lục A.1).

Hình 3-1. C4 Level 1 — System Context (template)

#### **3.2 Danh mục interface ngoài (External Interfaces)**

| Hệ thống ngoài | Chiều | Giao thức | Dữ liệu trao đổi | SLA / Ghi chú |
|---|---|---|---|---|
| [SSO/IdP] | [Out] | [OIDC/SAML] | [Token, user claims] | [ĐIỀN] |
| [Hệ thống lõi — ĐIỀN] | [In/Out] | [REST/MQ/File] | [ĐIỀN] | [ĐIỀN] |
| [Notification — ĐIỀN] | [Out] | [REST/SMTP] | [ĐIỀN] | [ĐIỀN] |

#### **3.3 In scope / Out of scope**

- In scope: [ĐIỀN — liệt kê theo mã FR, VD: FR-001÷FR-030]

- Out of scope: [ĐIỀN — nêu rõ để tránh scope creep, VD: mobile offline mode]

### **4. Solution Strategy (Chiến lược giải pháp)**

Best practice: mỗi quyết định lớn phải nêu ít nhất 1 phương án bị loại và lý do loại. Chi tiết đầy đủ ghi trong ADR (Mục 9).

| # | Quyết định chính | Phương án chọn + lý do | Phương án bị loại + lý do loại | ADR |
|---|---|---|---|---|
| 1 | [Kiến trúc tổng thể] | [VD: Modular monolith — phù hợp quy mô team, đơn giản vận hành] | [VD: Microservices — chi phí vận hành cao, team chưa sẵn sàng] | [ADR-001] |
| 2 | [Tech stack backend] | [ĐIỀN theo tech stack bắt buộc/ưu tiên + lý do] | [ĐIỀN phương án bị loại + lý do] | [ADR-002] |
| 3 | [Chiến lược tích hợp] | [VD: API-led qua API Gateway + event async cho batch] | [VD: Tích hợp point-to-point — khó bảo trì, không tái sử dụng] | [ADR-003] |
| 4 | [Data store] | [ĐIỀN] | [ĐIỀN] | [ADR-004] |
| 5 | [Deployment model] | [VD: On-prem K8s / Cloud [ĐIỀN]] | [ĐIỀN] | [ADR-005] |

### **5. Building Block View — C4 Level 2: Container**

Sơ đồ container thể hiện các khối triển khai được (ứng dụng, service, data store) bên trong hệ thống. Điều chỉnh theo giải pháp thực tế — xóa/bổ sung container không dùng (mã Mermaid ở Phụ lục A.2).

Hình 5-1. C4 Level 2 — Container Diagram (template)

#### **5.1 Trách nhiệm từng container**

| Container | Công nghệ | Trách nhiệm chính | Ghi chú |
|---|---|---|---|
| [Web App] | [ĐIỀN] | [UI web, gọi API qua Gateway, không chứa business logic] | [ĐIỀN] |
| [Mobile App] | [ĐIỀN] | [ĐIỀN] | [Xóa nếu không có mobile] |
| [API Gateway] | [ĐIỀN] | [Routing, authN token, rate limiting, logging edge] | [ĐIỀN] |
| [Backend Service] | [ĐIỀN] | [Business logic chính, expose REST API, tham chiếu FR: ĐIỀN] | [ĐIỀN] |
| [Background Worker] | [ĐIỀN] | [Xử lý async: batch, tích hợp hệ thống ngoài, retry] | [ĐIỀN] |
| [Database] | [ĐIỀN] | [Dữ liệu nghiệp vụ; ownership: ĐIỀN] | [ĐIỀN] |
| [Cache] | [ĐIỀN] | [Session, hot data; TTL: ĐIỀN] | [Xóa nếu không dùng] |
| [Message Broker] | [ĐIỀN] | [Event bus, decoupling, DLQ] | [Xóa nếu không dùng] |

### **6. Runtime View (Luồng xử lý chính)**

Chọn 2–3 luồng quan trọng nhất về mặt kiến trúc (rủi ro cao, nhiều tương tác, thể hiện quality goals). Mã Mermaid ở Phụ lục A.3–A.4.

#### **6.1 Luồng 1: [ĐIỀN — VD: Xác thực & truy cập qua SSO]**

Hình 6-1. Sequence — Luồng 1 (template)

Điểm cần lưu ý: [ĐIỀN — timeout, transaction boundary, xử lý lỗi từng bước]

#### **6.2 Luồng 2: [ĐIỀN — VD: Xử lý bất đồng bộ / tích hợp hệ thống ngoài]**

Hình 6-2. Sequence — Luồng 2 (template)

Điểm cần lưu ý: [ĐIỀN — idempotency, retry/backoff, DLQ, circuit breaker]

#### **6.3 Luồng 3: [ĐIỀN — tùy chọn]**

[ĐIỀN sequence diagram nếu cần — sao chép cấu trúc Mermaid ở Phụ lục]

### **7. Deployment View (Triển khai)**

#### **7.1 Topology & Network Zone**

Hình 7-1. Deployment topology theo network zone (template — mã Mermaid ở Phụ lục A.5)

#### **7.2 Môi trường**

| Môi trường | Mục đích | Hạ tầng / Sizing | Dữ liệu |
|---|---|---|---|
| DEV | [Phát triển] | [ĐIỀN spec] | [Dữ liệu giả lập] |
| SIT/UAT | [Kiểm thử tích hợp / nghiệm thu] | [ĐIỀN spec] | [Dữ liệu masked] |
| STAGING | [Pre-prod, giống PROD] | [ĐIỀN spec] | [ĐIỀN] |
| PROD | [Vận hành] | [ĐIỀN spec — HA: ĐIỀN node; DR: ĐIỀN] | [Dữ liệu thật — kiểm soát truy cập] |

#### **7.3 CI/CD & chiến lược release**

- Pipeline: [ĐIỀN — VD: GitLab CI → build → scan (SAST/DAST) → deploy]

- Chiến lược release: [Blue-green / Canary / Rolling — ĐIỀN + lý do]

- Rollback: [ĐIỀN cơ chế và thời gian rollback tối đa]

### **8. Crosscutting Concepts (Khái niệm xuyên suốt)**

| Chủ đề | Giải pháp thiết kế | Chuẩn / Công cụ |
|---|---|---|
| Authentication | [VD: SSO qua OIDC, token JWT, MFA cho admin] | [ĐIỀN — VD: Keycloak/Azure AD] |
| Authorization | [VD: RBAC theo vai trò [ĐIỀN]; kiểm tra tại Gateway + service] | [ĐIỀN] |
| Logging & Audit | [VD: Structured log JSON, correlation-id xuyên suốt; audit trail thao tác nhạy cảm] | [ĐIỀN — VD: ELK] |
| Monitoring & Tracing | [VD: Metrics + distributed tracing; alert theo SLO] | [ĐIỀN — VD: Prometheus/Grafana] |
| Error Handling | [VD: Error code chuẩn hóa, retry/backoff, circuit breaker, DLQ] | [ĐIỀN] |
| Caching | [VD: Cache-aside, TTL [ĐIỀN], invalidation khi [ĐIỀN]] | [ĐIỀN — VD: Redis] |
| Data Protection | [VD: Mã hóa at-rest [ĐIỀN] + in-transit TLS 1.2+; masking PII trong log] | [ĐIỀN chuẩn] |
| Secrets Management | [VD: Vault / KMS, không hardcode credential] | [ĐIỀN] |
| i18n / l10n | [VD: Đa ngôn ngữ [ĐIỀN]; múi giờ, định dạng ngày] | [ĐIỀN] |
| Configuration | [VD: Config tách khỏi code, theo môi trường] | [ĐIỀN] |

### **9. Architecture Decisions (ADR)**

Mỗi ADR lưu riêng trong repo (immutable), format: Title · Status · Context · Decision · Consequences · Alternatives considered. Bảng dưới là danh mục tham chiếu.

| ADR ID | Tiêu đề quyết định | Trạng thái | Link |
|---|---|---|---|
| ADR-001 | [Kiến trúc tổng thể: ĐIỀN] | [Proposed/Accepted] | [link repo] |
| ADR-002 | [Tech stack: ĐIỀN] | [ĐIỀN] | [link repo] |
| ADR-003 | [Chiến lược tích hợp: ĐIỀN] | [ĐIỀN] | [link repo] |
| ADR-004 | [Data store: ĐIỀN] | [ĐIỀN] | [link repo] |
| ADR-005 | [Deployment model: ĐIỀN] | [ĐIỀN] | [link repo] |
| [ADR-00n] | [ĐIỀN] | [ĐIỀN] | [link repo] |

### **10. Quality Requirements & cách đạt được**

Map từng NFR trọng yếu (theo input) → giải pháp kiến trúc cụ thể → cách kiểm chứng. NFR không kiểm chứng được là NFR chưa hoàn chỉnh.

| NFR ID | Yêu cầu (định lượng) | Giải pháp kiến trúc đáp ứng | Cách kiểm chứng |
|---|---|---|---|
| NFR-PER-01 | [VD: p95 latency < 500ms @ [ĐIỀN] CCU] | [VD: Cache-aside Redis, connection pool, index tối ưu, autoscaling] | [Load test — kịch bản ĐIỀN] |
| NFR-AVA-01 | [VD: SLA 99.9%; RTO ≤ ĐIỀN; RPO ≤ ĐIỀN] | [VD: HA ≥ 2 node, DB replication, health check + auto failover] | [DR drill định kỳ ĐIỀN] |
| NFR-SEC-01 | [VD: Tuân thủ ĐIỀN chuẩn bảo mật] | [VD: OIDC + RBAC, mã hóa at-rest/in-transit, WAF, secrets vault] | [Pentest / security review] |
| NFR-SCA-01 | [VD: Chịu tải tăng ĐIỀN% trong ĐIỀN năm] | [VD: Stateless service, horizontal scaling, partition dữ liệu] | [Capacity test] |
| NFR-MAI-01 | [VD: Thay đổi nhỏ release trong ĐIỀN ngày] | [VD: Modular design, CI/CD, test tự động ≥ ĐIỀN% coverage] | [Lead time đo qua pipeline] |
| [NFR-...] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

### **11. Risks & Technical Debt**

#### **11.1 Rủi ro kỹ thuật**

| ID | Rủi ro | Khả năng | Tác động | Giảm thiểu |
|---|---|---|---|---|
| R-01 | [VD: Hệ thống hiện hữu [ĐIỀN] chưa có API — phụ thuộc timeline vendor] | [C/T/T] | [Cao] | [VD: PoC integration sớm; fallback file-based] |
| R-02 | [VD: NFR performance chưa được xác nhận với tải thực] | [ĐIỀN] | [ĐIỀN] | [VD: Load test từ Sprint ĐIỀN] |
| R-03 | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

#### **11.2 Technical Debt chấp nhận có chủ đích**

| ID | Debt | Lý do chấp nhận | Kế hoạch trả |
|---|---|---|---|
| TD-01 | [ĐIỀN — VD: chưa có distributed tracing ở phase 1] | [VD: Ưu tiên go-live] | [VD: Phase 2 — Q ĐIỀN] |
| TD-02 | [ĐIỀN] | [ĐIỀN] | [ĐIỀN] |

### **12. Glossary (Thuật ngữ)**

| Thuật ngữ | Định nghĩa |
|---|---|
| ADR | Architecture Decision Record — bản ghi quyết định kiến trúc kèm bối cảnh và hệ quả |
| C4 Model | Mô hình sơ đồ hóa kiến trúc 4 cấp: Context → Container → Component → Code |
| NFR | Non-Functional Requirement — yêu cầu phi chức năng |
| RTO / RPO | Recovery Time / Point Objective — thời gian phục hồi tối đa / mức mất dữ liệu tối đa |
| DLQ | Dead Letter Queue — hàng đợi chứa message xử lý thất bại |
| [ĐIỀN] | [Bổ sung thuật ngữ đặc thù dự án] |
