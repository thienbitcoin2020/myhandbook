# Business Analyst — full handbook chapter

> Extracted from the BP Handbook page `pages/ba.html` (EN edition; a Vietnamese edition exists in the handbook app).

📋 Public Handbook · BABOK® v3 Aligned

## Business Analyst

## Project Implementation Handbook

A comprehensive guide to the Business Analyst workflow within the organization's **Hybrid Water-Scrum-Fall** SDLC model.

BABOK® Guide v3

Hybrid Water-Scrum-Fall

9 BA Phases

Regulation aligned

PUBLIC EDITION

📖 Key terms & abbreviations on this page

New to business analysis? Skim these first — they appear throughout this handbook.

| Term | Meaning |
|---|---|
| BABOK | Business Analysis Body of Knowledge (IIBA) — the BA standard this handbook follows. |
| BRD / SRS / FRD | Business / Software / Functional Requirements documents — formal requirement specs at different depths. |
| Elicitation | Drawing requirements out of stakeholders (interviews, workshops, observation…). |
| RTM | Requirements Traceability Matrix — links requirement ↔ design ↔ test case ↔ defect. |
| NFR | Non-Functional Requirement — measurable quality attribute (performance, security, availability…). |
| BPMN | Business Process Model & Notation — the standard notation for process diagrams. |
| ERD / DFD | Entity-Relationship Diagram / Data Flow Diagram — data modeling notations. |
| GWT | Given-When-Then — scenario format for acceptance criteria. |
| UAT | User Acceptance Testing — business users verify the system before go-live; BA facilitates. |
| CR / CCB | Change Request / Change Control Board — how scope changes after baseline get assessed & approved. |
| SME | Subject Matter Expert — the business person who knows the process best. |
| PIR | Post-Implementation Review — measuring outcomes vs the original KPIs after stabilization. |
| SMART / INVEST | Quality checklists — SMART for business requirements, INVEST for user stories (see Quality Gates). |

🏠

Introduction

### Purpose & Scope

Who should read this · What it covers · How to use it

What This Handbook Is

This handbook defines the **Business Analyst (BA) workflow** for all software implementation projects at the organization. It documents BA responsibilities, deliverables, interaction points, and quality gates across every phase of project execution.

It is designed to be **read by the entire project team** so that every stakeholder understands what to expect from the BA function.

👩‍💼

Primary Audience

Business Analysts · Project Managers · Solution Architects · QA Leads · Product Owners

📖

Secondary Audience

Development Teams · Business Stakeholders · Compliance Officers · UX/UI Designers

⚙️

Governing Framework

BABOK® Guide v3 · IEEE 830 · ISO/IEC 25010 · applicable regulations

ℹ️

**How to use this handbook:** Navigate by phase using the sidebar. Cross-reference with the Deployment Runbook for pre-production and go-live procedures.

🔄

BA Workflow

### End-to-End BA Lifecycle

9 phases from initiation to post-implementation review

Requirements Type Hierarchy (BABOK)

Business Requirements

WHY — Goals, KPIs, Outcomes

Stakeholder Requirements

WHO — Needs per user group

Solution Requirements

WHAT — System capabilities

0

Phase 0

Project Initiation & Planning

WATERFALL

**Trigger:** Project kickoff. BA reviews Charter/SOW, builds Stakeholder Register, defines Business Need Statement.

Stakeholder RegisterBA PlanBusiness Need StatementCompliance Scope Checklist

1

Phase 1

Elicitation & Collaboration

HYBRID

**Trigger:** Stakeholders identified; BA plan approved. Execute elicitation (interviews, workshops, observation).

Elicitation NotesAssumptions LogInterview SummariesRisk Register input

2

Phase 2

Requirements Analysis & Design Definition

HYBRID

**Trigger:** Sufficient elicitation data collected. Model As-Is/To-Be (BPMN 2.0), write requirements (SMART), build RTM, prioritize (MoSCoW/WSJF).

BRD / SRSUser Stories + ACProcess Flow DiagramsRTMNFR Specification

3

Phase 3

Requirements Validation & Approval

WATERFALL GATE

**Trigger:** Requirements in draft-complete state. Formal review → written sign-off → baseline.

Sign-off RecordBaselined BRD/SRSApproved Backlog

4

Phase 4

Solution Evaluation & Design Support

AGILE

**Trigger:** SA/DEV begins solution design or sprint planning. BA participates in design reviews, validates wireframes, writes interface specs.

UI Review FeedbackInterface SpecData Mapping

5

Phase 5

Implementation Support

AGILE SPRINT

**Trigger:** Development sprint begins. BA serves as requirements clarifier, manages Change Requests, supports defect triage.

Change Request LogImpact Assessments

6

Phase 6

User Acceptance Testing (UAT)

WATERFALL GATE

**Trigger:** DEV declares feature/release ready for UAT. BA prepares UAT Plan, creates test scripts from acceptance criteria.

UAT PlanUAT ScriptsUAT Defect LogUAT Sign-off

7

Phase 7

Release & Transition

WATERFALL

**Trigger:** UAT passed; release approved by CAB. BA contributes Release Notes, validates training materials, defines rollback criteria.

Release Notes (business)User GuideTraining Deck

8

Phase 8

Post-Implementation Review

REVIEW

**Trigger:** Stabilization ends (2–4 weeks post go-live). BA measures original KPIs/OKRs, documents lessons learned, seeds next backlog.

PIR ReportLessons Learned LogUpdated Process Docs

👥

Collaboration Model

### BA Role Interaction Map

Who the BA works with and what flows between roles

BA as Central Collaboration Hub

🏢

Business Stakeholders

→ BA: Needs, feedback, approvals

← BA: User Stories, Sign-off requests

📋

Business Analyst

Central coordination point. Translates business needs into structured requirements.

📅

Project Manager

→ BA: Priorities, timeline, constraints

← BA: Scope, CR impact, Sign-offs

🏗️

Solution Architect

→ BA: Design feedback, feasibility

← BA: BRD, Use Cases, Interface Spec

💻

Developers

→ BA: Questions, Change Requests

← BA: User Stories, Acceptance Criteria

🧪

QA Team

→ BA: Defects, requirement gaps

← BA: RTM, AC, UAT Scripts

🎯

BABOK KA4

### Strategy Analysis

Current state · Future state · Risk · Change strategy — before requirements

Why this comes first

Before eliciting requirements, the BA (with sponsor & PM) frames **what change is worth making and why**. BABOK v3 Strategy Analysis has four components:

| Component | What the BA produces |
|---|---|
| Analyze Current State | As-Is capabilities, pain points, KPIs, constraints — the baseline the change starts from. |
| Define Future State | To-Be desired outcomes, target KPIs/OKRs, scope of the solution space, success measures. |
| Assess Risks | Risks to reaching the future state (feasibility, adoption, regulatory) — feeds the Risk Register. |
| Define Change Strategy | Gap analysis (As-Is → To-Be), transition states, and the recommended approach — input to the Business Case. |

🔗

The BA **contributes** the current/future-state analysis into the **Business Case** (owned by PM/Sponsor — see PM Handbook) and hands the value targets to the Product Owner for the roadmap.

🚀

Phase 0 · Waterfall Gate · Trigger: Project Kickoff

### Project Initiation & Planning

Stakeholder Register · BA Plan · Business Need Statement · Compliance Scope

- 1

- **Review Project Charter, SOW, or Business Case** — understand scope boundaries, budget envelope, strategic alignment.

- 2

- **Build Stakeholder Register** — for each stakeholder: role, influence level, interest level, communication preference, RACI position.

- 3

- **Conduct initial interviews** — capture objectives, KPIs/OKRs, pain points. Do not propose solutions yet.

- 4

- **Define Business Need Statement**: "The [stakeholder] needs [capability] in order to achieve [outcome] because [rationale]."

- 5

- **Establish BA Plan** — elicitation methods, tools, review cadence, deliverables per phase, RACI for BA outputs.

- 6

- **Identify compliance/regulatory scope** early — applicable regulations, Decree 13/2023, applicable industry standards when regulated data is in scope.

- 📋

- **Stakeholder Register** — role mapping with RACI and communication preferences

- 📌

- **Business Need Statement** — one-sentence framing of the core problem/opportunity

- 📅

- **BA Plan** — elicitation schedule, tool selection, deliverable owners, review cadence

- ⚖️

- **Compliance Scope Checklist** — regulations in scope, regulatory contact, key obligations

🎙️

Phase 1 · Hybrid · Trigger: BA Plan Approved

### Elicitation & Collaboration

Interviews · Workshops · Observation · Assumptions Log

- 1

- **Select elicitation technique** based on stakeholder type, information complexity, and SDLC phase.

- 2

- **Capture raw notes without interpretation** during sessions. Separate observation from inference.

- 3

- **Classify inputs post-session** into: Requirements / Constraints / Assumptions / Risks / Questions-to-follow-up.

- 4

- **Confirm captured information** with stakeholders — replay what you heard before moving to analysis.

🚫

**Anti-patterns to avoid:** Leading questions · Solution-first framing · Relying on loudest stakeholder only · Skipping confirmation of captured information

📐

Phase 2 · Hybrid · Trigger: Sufficient Elicitation Data

### Requirements Analysis & Design Definition

BRD · SRS · User Stories · RTM · Business Rules · NFR Spec

- 1

- **Classify by BABOK type** — Business / Stakeholder / Solution (Functional + Non-Functional) / Transition.

- 2

- **Model As-Is and To-Be** using BPMN 2.0, Use Case Diagrams, DFD/ERD, State Transition Diagrams.

- 3

- **Define Business Rules separately** from functional requirements.

- 4

- **Specify NFRs** using ISO/IEC 25010 — every NFR must be measurable.

- 5

- **Write in SDLC-appropriate format**: [WATERFALL] Shall-statements in BRD/SRS · [AGILE] User Stories with GWT acceptance criteria.

- 6

- **Prioritize** using MoSCoW (Waterfall scope lock) or WSJF (Agile backlog).

- 7

- **Build and maintain RTM** — links: Business Requirement → Solution Requirement → Test Case → Defect.

✅

Phase 3 · Waterfall Gate · Trigger: Draft-Complete Requirements

### Requirements Validation & Approval

Formal sign-off · Baseline · Change Request process activation

- 1

- **Conduct Requirements Review meeting** — mandatory attendees: Business Stakeholders, PM, SA, QA Lead, Compliance Officer.

- 2

- **Log all feedback**, update documents accordingly within agreed SLA.

- 3

- **Obtain formal written sign-off** — verbal approval is NOT acceptable for formal baseline.

- 4

- **Baseline requirements** — all subsequent changes route through the **Change Request process**.

- 5

- **Publish to shared repository** — notify all consuming teams of the baselined version.

🚫

**Critical rule:** Any scope change after baseline **must** go through the BA for Impact Assessment before PM updates the schedule or SA changes the design.

🏗️

Phase 4 · Agile Sprint · Trigger: SA/DEV Begins Design

### Solution Evaluation & Design Support

Design reviews · Wireframe validation · Interface specs · Data mapping

- 1

- **Participate in Solution Design Reviews** — verify design satisfies requirements, not just technical elegance.

- 2

- **Review UI/UX wireframes and prototypes** against stakeholder expectations.

- 3

- **Validate Data Mapping** for integration/migration features — ensure field mappings match Data Dictionary.

- 4

- **Write Interface Specifications / API Requirements** — input/output contracts, error handling, business rules.

- 5

- **Support DEV estimation** — provide business context for Planning Poker.

⚙️

Phase 5 · Agile Sprint · Trigger: Development Sprint Begins

### Implementation Support

Clarifications · Change Requests · Defect triage · DoR/DoD gates

- 1

- **Primary requirements clarifier** for DEV — respond to clarification requests within agreed SLA (recommended: same business day).

- 2

- **Manage Change Requests** — conduct impact analysis, submit to PM + CCB for approval, update RTM post-approval.

- 3

- **Review test cases** against acceptance criteria — ensure QA is testing the right behaviors.

- 4

- **Support defect triage** — classify as: Requirement Defect (BA owns) vs. Implementation Defect (DEV owns).

- 5

- **Maintain Definition of Ready gate** — no story enters sprint without DoR checklist complete.

🧪

Phase 6 · Waterfall Gate · Trigger: DEV Declares UAT-Ready

### User Acceptance Testing (UAT)

UAT Plan · Test Scripts · Defect Log · Written Sign-off

- 1

- **Prepare UAT Plan** — scope, objectives, entry/exit criteria, schedule, roles.

- 2

- **Create UAT Test Scripts** directly from acceptance criteria (GWT format maps 1:1 to test steps).

- 3

- **Coordinate and facilitate UAT execution** with business users — BA does not execute tests, business users do.

- 4

- **Track and classify UAT defects** — Critical / Major / Minor.

- 5

- **Obtain UAT Sign-off** from authorized business stakeholders — must be written, not verbal.

🚢

Phase 7 · Waterfall · Trigger: UAT Passed, CAB Approved

### Release & Transition

Release Notes · User Guide · Training · Rollback criteria

- 1

- **Contribute to Release Notes** — write the business impact section.

- 2

- **Validate Training Materials and User Guides** — confirm accuracy against final requirements.

- 3

- **Define rollback/fallback criteria** from a business perspective.

- 4

- **Support hypercare period** — available for business user questions in the first 1–2 weeks post go-live.

📊

Phase 8 · Review · Trigger: Stabilization Ends

### Post-Implementation Review

Benefits realization · Lessons learned · Next iteration seeding

- 1

- **Benefits Realization Review** — measure original KPIs/OKRs stated in Phase 0.

- 2

- **Document Lessons Learned** — BA perspective: what elicitation techniques worked, what requirement issues emerged late.

- 3

- **Update Business Process Documentation** — the To-Be from Phase 2 becomes the new As-Is baseline for future projects.

- 4

- **Identify backlog items** for the next iteration — feed into Product Roadmap.

📥

Reference

### BA Document Templates

Curated working files for requirements analysis and traceability

DOCXOwner · BA

#### Business Requirements Document

Frame the business problem, strategic context, scope, personas, journeys, and hybrid functional requirements before solutioning.

Use whenA new initiative needs an agreed business baseline before solution design.

SupportsPO · PM · SA · UX

Read document→

DOCXOwner · BA

#### Requirements Traceability Matrix

Use when requirements must be traced from source and design through test evidence and release.

Use whenTraceability and coverage need an auditable view.

SupportsPO · QC · PM

Read document→

DOCXOwner · BA

#### Software Requirements Specification

Use for complex or regulated scope that needs a structured functional and non-functional baseline.

Use whenA shared requirements baseline is needed before build.

SupportsSA · Dev · QC · Security

Read document→

DOCXOwner · BA

#### Use Case Specification

Use when a complex interaction needs actors, preconditions, main flow, alternatives, and exceptions.

Use whenScenario detail cannot fit cleanly in a user story.

SupportsPO · SA · Dev · QC

Read document→

📄

Reference

### Document Ownership Matrix

What the BA owns, contributes to, and reviews

■ Author — BA is primary owner ■ Contributor — BA provides input ■ Reviewer — BA reviews, does not own

| Document | BA Role | Primary Collaborators |
|---|---|---|
| Stakeholder Register | Author | PM |
| BA Plan | Author | PM |
| BRD / SRS | Author | Stakeholders, SA, PM |
| User Stories & Acceptance Criteria | Author | PO, DEV, QA |
| Process Flow (As-Is / To-Be, BPMN) | Author | SMEs, SA |
| Use Case Specification | Author | SA, DEV |
| Data Dictionary & Glossary | Author | SA, DBA |
| Business Rules Catalog | Author | Stakeholders, SA |
| NFR Specification | Author | SA, Security, Ops |
| Requirements Traceability Matrix (RTM) | Author | QA, PM |
| UAT Plan & Scripts | Author | QA, Business Users |
| Change Request Log | Author | PM |
| Post-Implementation Review (PIR) | Author | PM, Stakeholders |
| Project Charter | Contributor | PM, Sponsor |
| Risk Register | Contributor | PM |
| Release Notes | Contributor | PM, DEV |
| System Design (HLD/LLD) | Reviewer | SA |
| Test Plan & Test Cases | Reviewer | QA |

🔧

Reference

### BA Technique Catalog

When to use which BA technique — mapped to purpose

| Purpose | Recommended Techniques |
|---|---|
| Problem Identification | 5 Whys · Fishbone (Ishikawa) · Root Cause Analysis |
| Stakeholder Analysis | Stakeholder Matrix (Power/Interest) · Onion Diagram · RACI |
| Elicitation | Interviews · Workshops · Observation · Document Analysis · Survey · Focus Groups · Prototyping |
| Process Modeling | BPMN 2.0 · Swimlane Diagrams · Value Stream Mapping |
| Scope Definition | Context Diagram · Use Case Diagram · Feature Decomposition |
| Requirements Writing | User Stories + GWT Acceptance Criteria · Shall-statements (IEEE 830) · Specification by Example |
| Data Modeling | ERD · Data Flow Diagram (DFD) · Data Dictionary |
| Decision Rules | Decision Table · Decision Tree · Business Rules Catalog |
| Prioritization | MoSCoW · Kano · WSJF · 100-Dollar Test · RICE · Value vs. Effort Matrix |
| Validation | Walkthrough · Inspection · Prototyping · Acceptance Criteria Review |
| Gap Analysis | As-Is vs. To-Be comparison · Fit-Gap Matrix |

⚡

Reference · ISO/IEC 25010

### Non-Functional Requirements Framework

Every NFR must be measurable — no ambiguous language

📐

**Rule:** Every NFR must be **measurable**. ❌ "The system shall be fast" — ✅ "P95 response time shall be < 500ms at 1,000 concurrent users"

⚡ Performance Efficiency

Response time · Throughput · Resource utilization

e.g., P95 API response < 500ms, 99.5% uptime SLA

🔒 Security

Authentication · Authorization · Encryption at rest/transit · Audit logging

Must comply with applicable regulations, Decree 13/2023

🛡️ Reliability

Availability (SLA%) · Fault tolerance · RTO / RPO

e.g., RTO and RPO approved for the service tier

♿ Usability

Learnability · Accessibility (WCAG 2.1 AA minimum) · UX

e.g., new user completes core task within 3 minutes unassisted

🎯

Quality Gates

### SMART · INVEST · DoR · DoD

Criteria that BA validates before requirements progress to next phase

SMART — Business Requirements Quality

S

Specific

Clearly defined, no ambiguity

M

Measurable

Has quantifiable success criteria

A

Achievable

Technically and operationally feasible

R

Relevant

Aligned to business objectives

T

Time-bound

Has a defined delivery timeframe

INVEST — User Story Quality

I

Independent

No hidden dependency on another story

N

Negotiable

Details can evolve through conversation

V

Valuable

Delivers value to user or business

E

Estimable

DEV can size it with confidence

S

Small

Completable within one sprint

T

Testable

Has clear acceptance criteria

✅ Definition of Ready (DoR)

- User story follows "As a… I want… so that…" format

- Acceptance criteria in Given-When-Then format

- Dependencies identified and resolved or sequenced

- UX mockups attached (if UI story)

- NFRs specified or referenced

- Business rules referenced

- Estimated by DEV team

- Small enough to complete within one sprint

🏁 Definition of Done (DoD)

- All acceptance criteria met and verified

- Code peer-reviewed and merged

- Unit and integration tests pass

- QA testing complete, no Critical/Major defects open

- NFR validation passed

- Documentation updated

- Demonstrated and accepted by PO/Business

- Deployed to staging environment

🚫

Reference

### Anti-Patterns — What Not to Do

Common BA mistakes and the correct approach

❌

Ask **leading questions** — "You want the button on the top right, correct?" Instead: ask open-ended, neutral questions.

❌

Accept **solutions as requirements** — "I need a dropdown with 5 items." ✅ Redirect: "Before the solution, can you describe the business problem it solves?"

❌

Rely only on **the loudest stakeholder** — actively seek silent voices who may represent critical user groups.

❌

Skip **confirmation** of captured information — always replay what you heard before moving to analysis.

❌

Write requirements that **dictate implementation** — Requirements say WHAT, not HOW.

❌

Mix **multiple requirements in one statement** — use "and" as a smell indicator. Split compound requirements.

❌

Use **ambiguous words**: "user-friendly", "fast", "robust", "intuitive". Every adjective must be measurable.

❌

Skip NFRs — undocumented NFRs become the most expensive defects to fix late.

❌

Accept **verbal approval** for formal baseline — written sign-off is mandatory for Waterfall and Hybrid core scope.

❌

Allow **scope changes without Change Request process** post-baseline — every change needs impact assessment before implementation.

❌

Update requirements **silently** without notifying QA and updating the RTM — test coverage gaps will follow.

📊

Reference · BABOK KA1

### BA Performance Metrics

How to measure BA effectiveness — Business Analysis Planning & Monitoring

BABOK v3 KA1 requires measuring BA performance. Track these to catch requirement problems early — the most expensive defects originate in requirements.

| Metric | Formula / definition | Signal |
|---|---|---|
| Requirements Volatility | changed reqs ÷ total baselined × 100% | High churn → weak elicitation / unclear scope |
| Requirements Defect Leakage | defects traced to requirements ÷ total defects × 100% | Quality of requirements (lower better) |
| RTM Coverage | requirements with test coverage ÷ total × 100% | Traceability completeness (target 100%) |
| Rework Rate | reqs reworked after sign-off ÷ total × 100% | Baseline stability |
| UAT Pass Rate | UAT cases passed ÷ executed × 100% | Requirements & AC accuracy |
| Elicitation Cycle Time | time from kickoff → baselined requirements | BA throughput per phase |

🔗

Defect-leakage & RTM coverage are shared with the QC Testing Handbook (defect metrics) — BA owns the requirements-quality view.

📘 Handbook · BA Project Implementation Handbook v2.0 · Public Edition · Classification: PUBLIC

Aligned with BABOK® Guide v3 · Hybrid Water-Scrum-Fall SDLC · applicable regulations · © 2025
