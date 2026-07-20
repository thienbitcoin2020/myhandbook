# Solution Architect — full handbook chapter

> Extracted from the Power Home Handbook page `pages/sa.html` (EN edition; a Vietnamese edition exists in the handbook app).

🏛️ Internal Handbook · TOGAF · C4 · arc42 · Well-Architected

## Solution Architect (SA)

## Solution Design & Governance

Reference for the end-to-end Solution Architect role — translating business requirements and enterprise constraints into a buildable, operable technical solution. Grounded in the C4 model, arc42, ADRs, and the AWS/Azure Well-Architected Framework, interfacing with Enterprise Architecture (TOGAF Phase G).

C4 · arc42

Well-Architected

NFR-driven

INTERNAL USE ONLY

📖 Key terms & abbreviations on this page

New to solution architecture? Skim these first — they appear throughout this handbook.

| Term | Meaning |
|---|---|
| HLD / LLD | High-Level Design (for stakeholders/ARB) / Low-Level Design (build-ready detail for Developers). |
| ADR | Architecture Decision Record — an immutable note of a decision, its context and trade-offs. |
| NFR | Non-Functional Requirement — measurable quality attribute; the main driver of architecture. |
| C4 | Context → Container → Component → Code — 4 zoom levels for architecture diagrams. |
| arc42 | A 12-section template for solution architecture documents. |
| EA / ARB | Enterprise Architecture (org-wide standards) / Architecture Review Board (design sign-off body). |
| PoC / Spike | Small time-boxed experiment to prove a risky assumption before committing to build. |
| TCO | Total Cost of Ownership — licence + infrastructure + operations + training over years. |
| RTO / RPO | Recovery Time Objective (how fast to restore) / Recovery Point Objective (max data loss). |
| TPS · P95/P99 | Transactions Per Second; 95th/99th-percentile latency — performance measures. |
| CQRS · BFF · Saga · DLQ | Integration patterns — read/write split, per-client backend, cross-service transaction, dead-letter queue (Section 09). |
| STRIDE | Threat-modeling checklist: Spoofing, Tampering, Repudiation, Information disclosure, DoS, Elevation of privilege. |
| RBAC / ABAC | Role- / Attribute-Based Access Control — authorization models. |

🧭

Section 01

### Overview

Who the Solution Architect is

The SA **translates business requirements & enterprise constraints into a concrete, buildable, operable technical solution** for one project/product. Accountable for: solution & NFR analysis → design (HLD/LLD); technology selection & trade-offs (ADR); integration, API, data & security design; compliance with enterprise standards (interface with EA); supporting Dev through delivery; technical risk, PoC, sizing & scalability.

SA vs EA vs Tech Lead vs Developer

| Aspect | Solution Architect | Enterprise Architect | Tech Lead | Developer |
|---|---|---|---|---|
| Scope | One solution / project | Whole organization | One team's codebase | Assigned components |
| Output | HLD/LLD, ADR, integration design | Roadmap, principles, capability map | Coding standards, technical direction | Working software |
| Cares about | Feasibility, delivery, NFRs | Standardization, strategy, reuse | Code quality, team velocity | Correctness, tests |
| Interacts with | Dev, BA, PO, EA | C-level, ARB, business | SA, Developers | Tech Lead, SA |

SA Working Principles

- **NFR drives design** — non-functional requirements shape architecture more than features.

- **Trade-offs, not perfection** — always state what is being exchanged.

- **Document the why** — ADRs capture rationale, not just the outcome.

- **Align with EA** — comply with enterprise principles & standards (TOGAF Phase G interface).

- **Simplest thing that works** — complexity must be justified; avoid over-engineering.

- **Design for failure** — assume everything fails; build resilience.

- **Buildable & operable** — Dev can build it, Ops can run it.

📥

Section 02

### Requirements Intake & Scope

Take the BRD/SRS & user stories from the BA/PO, clarify technical scope, and set explicit **in/out of scope**. Anchor with a **System Context diagram (C4 Level 1)**.

C4 L1 — SYSTEM CONTEXT

Customer

New Solution

Core Banking

Identity / SSO

Notification Svc

(Who/what the system talks to — no internals yet)

📄

**Output:** Solution Scope Statement + Context diagram. Ambiguous scope is the #1 source of architecture rework.

⚡

Section 03

### NFR Analysis core of SA

Quantify the non-functional requirements — they decide architecture more than functional requirements. Every NFR must be **measurable**.

| NFR | Measured by | Example target |
|---|---|---|
| Performance | Latency (P95/P99), response time | P95 API < 300 ms |
| Scalability | Throughput at peak; scaling model | 5,000 TPS at peak, horizontal |
| Availability | SLA %, RTO, RPO | 99.95% · RTO 15 min · RPO 5 min |
| Security | AuthN/Z, encryption, compliance | OAuth2/OIDC · TLS1.2+ · AES-256 |
| Maintainability | Modularity, coupling, test coverage | Clear module boundaries |
| Observability | Logs, metrics, traces | 3 pillars wired from day one |
| Compliance | Regulatory controls | SBV 09/2020 · ISO 27001 · PCI-DSS |
| Cost | TCO, unit economics | Within cloud budget envelope |

Quality Attribute Scenario SEI

SOURCE : 10,000 concurrent users STIMULUS : submit fund-transfer requests ARTIFACT : payment API ENVIRON. : normal peak-hour operation RESPONSE : requests processed & confirmed MEASURE : P95 latency < 300 ms, 0 lost transactions

A testable NFR statement the QC team can later verify — see the QC Testing Handbook (non-functional testing).

🧱

Section 04

### Constraints & Assumptions

| Type | Examples |
|---|---|
| Technical | Must integrate with existing core banking; approved tech stack only; on-prem + cloud hybrid. |
| Regulatory | Data residency in-country (SBV); audit logging; segregation of duties. |
| Budget / Time | Cloud cost envelope; go-live deadline; team size. |
| Organizational | Enterprise standards, reuse mandates, vendor agreements. |

📝

Maintain a **Constraints & Assumptions Register** — every assumption is a risk until validated. Feed assumptions into the technical risk register (Section 12).

⚖️

Section 05

### Solution Options & Trade-off

Present **2–3 viable options** (e.g. buy vs build, monolith vs microservices, on-prem vs cloud) and choose with an explicit **Weighted Scoring Matrix**. Never present a single option as a fait accompli.

| Criterion (weight) | Opt A · Buy SaaS | Opt B · Build microservices | Opt C · Extend monolith |
|---|---|---|---|
| Fit to NFR (30%) | 3 | 5 | 3 |
| Time-to-market (25%) | 5 | 2 | 4 |
| TCO (20%) | 3 | 3 | 4 |
| Compliance/control (15%) | 2 | 5 | 4 |
| Team skill fit (10%) | 4 | 3 | 5 |
| Weighted score | 3.40 | 3.75 | 3.75 |

Score = Σ(criterion score × weight) on a 1–5 scale. Use a **PoC/spike** to de-risk close calls (Section 12).

🧰

Section 06

### Technology Selection

| Evaluation lens | Questions |
|---|---|
| Fit to requirement | Does it meet the FR/NFR? Proven at our scale? |
| TCO | Licence + infra + ops + training over 3 years. |
| Maturity / support | Community, vendor SLA, security patch cadence, roadmap. |
| Skills & hiring | Does the team know it? Can we hire for it? |
| Enterprise fit | On the approved stack / tech radar? EA-aligned? |
| Exit / lock-in | Migration path off; open standards? |

🧭

Record the outcome as **Technology Selection Rationale** and back each significant choice with an **ADR** (Section 07). Prefer the approved tech radar; deviations need justification & EA sign-off.

📜

Section 07

### Architecture Decision Records (ADR) Michael Nygard

Capture each significant architecture decision as an immutable, contextual record — stored **in the repo** next to the code.

# ADR-012: Use event-driven integration for payment events Status: Accepted (Proposed | Accepted | Superseded by ADR-XXX | Deprecated) Context: Payment events must reach 4 downstream systems; peak 5k TPS; tight coupling with sync calls caused cascading failures. Decision: Publish payment events to Kafka; consumers subscribe independently. Consequences: + Decoupling, independent scaling, replay capability - Eventual consistency; requires idempotent consumers & a DLQ Alternatives considered: synchronous REST fan-out (rejected: coupling), shared database (rejected: violates service ownership)

ADRs map to **arc42 §9 (Architecture Decisions)**. Never edit an accepted ADR — supersede it with a new one so the history of why is preserved.

🏗️

Section 08

### High-Level Design & the C4 Model Simon Brown

C4 Model — 4 levels

| Level | Name | Answers |
|---|---|---|
| L1 | System Context | Who/what does the system interact with? |
| L2 | Container | Which apps / data stores make it up? |
| L3 | Component | What components sit inside each container? |
| L4 | Code | Class/code detail (rarely drawn). |

C4 L2 — CONTAINERS

Web App

API Gateway

Payment Service

Postgres

Auth Service

Kafka topic

Ledger Consumer

arc42 — the 12-section solution architecture document

1 Introduction & Goals2 Constraints3 Context & Scope4 Solution Strategy5 Building Block View6 Runtime View7 Deployment View8 Cross-cutting Concepts9 Architecture Decisions10 Quality Requirements11 Risks & Tech Debt12 Glossary

Use arc42 as the HLD/LLD document skeleton; not every section needs equal depth — right-size to the solution.

| Level | Contains | Audience |
|---|---|---|
| HLD (High-Level Design) | C4 L1–L2, solution strategy, integration & data flow, NFR approach, key ADRs | Stakeholders, PM, EA/ARB |
| LLD (Low-Level Design) | C4 L3, class/sequence diagrams, full API spec (OpenAPI/AsyncAPI), physical DB schema, error handling | Developers (build-ready) |

🔌

Section 09

### Integration & API Design

Pattern selection

| Situation | Pattern |
|---|---|
| Real-time request/response | REST / gRPC (synchronous) |
| Decoupling, async, independent scale | Event-driven (Kafka / queue) |
| Coordinate a transaction across services | Saga (choreography / orchestration) |
| Separate read & write, scale reads | CQRS |
| Different clients (web/mobile) need different data | BFF (Backend-for-Frontend) |
| Aggregate / secure many backends | API Gateway |

API & contract discipline

- **Contract-first:** define OpenAPI (REST) / AsyncAPI (events) before coding; version from day one (/v1).

- **Idempotency** for retriable operations (idempotency keys) — essential for payments & at-least-once messaging.

- **Backward compatibility:** additive changes; deprecate, don't break; document interface in an **Interface Catalog**.

- Model interactions with a **sequence diagram** for critical flows (C4 runtime / arc42 §6).

🏦

Banking context: integration with **core banking** and **identity/SSO** needs an explicit interface contract, clear **data ownership**, and a defined **authentication boundary** between centralized SSO and module-level services.

🔐

Section 10

### Data & Security Design

Data Architecture (solution-level)

- Logical data model + data-flow diagram; classify data (public / internal / confidential / restricted).

- **Polyglot persistence** — pick the store per need (RDBMS for transactions, cache for reads, object store for blobs).

- **Caching strategy** (cache-aside / write-through) with explicit invalidation.

- Service owns its data — no shared-database coupling across service boundaries.

Security Design STRIDE · Microsoft

| STRIDE threat | Mitigation |
|---|---|
| Spoofing | Strong AuthN — OAuth2 / OIDC / SSO, MFA. |
| Tampering | Integrity checks, signed messages, TLS 1.2+. |
| Repudiation | Audit logging, non-repudiable trails. |
| Information disclosure | Encryption at-rest (AES-256) & in-transit; least privilege. |
| Denial of service | Rate limiting, autoscaling, WAF. |
| Elevation of privilege | AuthZ (RBAC/ABAC), secrets management, Zero-Trust. |

🔒

Security-by-design; align controls to **SBV Circular 09/2020, ISO 27001, PCI-DSS**. Security testing evidence lives in the QC Testing Handbook; deployment-time controls in the Deployment Runbook.

📈

Section 11

### Sizing, Scalability & Resilience LLD

Sizing & Scaling

- **Capacity planning** from load estimates: peak TPS, data growth, concurrency — size to peak, not average.

- **Horizontal** (scale out, stateless) preferred over **vertical** (scale up) for elasticity; define autoscaling policy (target CPU / queue depth).

- Physical data design: schema, indexing, partitioning/sharding, and a **migration plan**.

Resilience patterns — design for failure

| Pattern | Protects against |
|---|---|
| Retry + backoff | Transient failures (with jitter, capped). |
| Circuit breaker | Cascading failure from a failing dependency. |
| Bulkhead | Resource exhaustion isolating one consumer. |
| Idempotency + DLQ | Duplicate / poison messages in async flows. |
| Graceful degradation | Partial outage — serve reduced function, not total failure. |

Ties directly to the **Availability** NFR (SLA/RTO/RPO) and the DR posture — coordinate with the Deployment Runbook.

✅

Section 12

### Validation, PoC & Architecture Review

Proof of Concept / Spike

Time-boxed experiment to validate the riskiest assumptions before committing to full build: is the integration feasible? does performance meet the NFR? is the new tech viable? Output = **PoC Report + Go/No-Go**.

Well-Architected Review — 6 pillars AWS / Azure

Operational ExcellenceSecurityReliabilityPerformance EfficiencyCost OptimizationSustainability

Run a Well-Architected Review + peer design review; large/critical systems warrant **ATAM** (Architecture Tradeoff Analysis Method SEI). Secure **ARB sign-off** before build where governance requires it.

Technical Risk Register

| Risk | Likelihood × Impact | Mitigation |
|---|---|---|
| New event-broker unproven at 5k TPS | Med × High | PoC load test; fallback to managed service. |
| Core-banking API latency spikes | Med × High | Async buffer + circuit breaker + cache. |

📥

Reference

### Architecture Document Templates

Curated working files for decisions and solution baselines

DOCXOwner · SA

#### Architecture Decision Record

Use to capture a consequential architecture decision, its context, considered options, and consequences.

Use whenA decision affects architecture quality, constraints, or future change.

SupportsDev · Security · Ops

Read document→

DOCXOwner · SA

#### Solution Architecture Document

Use to baseline the end-to-end solution, integrations, data, security, deployment, and key quality attributes.

Use whenDelivery teams need one reviewed architecture reference.

SupportsBA · Dev · Security · Ops · QC

Read document→

🛡️

Section 13

### Governance, Build Support & Handover

Build support & architecture governance

- Design clarifications during sprints; **code review for architecture compliance** (not style).

- Track **tech debt** in the backlog; update ADRs when decisions change.

- SA is the **guardian of architectural integrity** across delivery — see Implementation Handbook §3 and the PM governance spine.

Deployment & Handover deliverables

| Deliverable | Contents |
|---|---|
| Solution blueprint / HLD | C4 L1–L3, arc42 doc, solution strategy. |
| LLD + API specs | Detailed component/data design, OpenAPI/AsyncAPI. |
| ADR log | Decision history (the why). |
| NFR spec & risk register | Quality requirements + technical risks. |
| Deployment & observability design | CI/CD, blue-green/canary, logging/metrics/tracing (3 pillars). |
| Architecture Handover Document | Operational runbook, DR plan, ownership. |

📐

**Architecture metrics & fitness functions** Ford/Parsons: make key NFRs continuously testable — e.g. automated checks on P95 latency, cyclomatic complexity, dependency/coupling rules, ADR coverage, and tech-debt ratio — so architecture doesn't erode over time.

📚

**Sources.C4 Model** (Simon Brown); **arc42** (Dr. Gernot Starke & Dr. Peter Hruschka); **ADR** (Michael Nygard); **AWS / Azure Well-Architected Framework** (6 pillars); **TOGAF 10** (The Open Group — EA interface, Phase G); **STRIDE** (Microsoft threat modeling); **ATAM & Quality Attribute Scenarios** (SEI / Carnegie Mellon); integration patterns per Hohpe & Woolf (Enterprise Integration Patterns). Aligned to SBV Circular 09/2020/TT-NHNN & ISO 27001.

📥

Library

### Additional Architecture Templates

Structured master files for APIs and measurable quality attributes

DOCXOwner · Solution Architect

#### API Specification

Define contracts, authentication, errors, versioning and service expectations.

SupportsDev · QC · Security · Ops

Read document→

DOCXOwner · Solution Architect

#### Non-Functional Requirements Specification

Capture measurable quality attributes and their verification method.

SupportsDev · QC · Security · Ops

Read document→

🏦 Handbook · Solution Architect Handbook v2.0 · Internal Use Only · Classification: CONFIDENTIAL

Aligned with C4 · arc42 · Well-Architected · TOGAF 10 · SBV Circular 09/2020/TT-NHNN · © 2025
