# Power Home Handbook — Overview, SDLC & Governance — full handbook chapter

> Extracted from the Power Home Handbook page `pages/handbook.html` (EN edition; a Vietnamese edition exists in the handbook app).

📘 Internal Handbook · Hybrid Water-Scrum-Fall

## Project Implementation

## Handbook

The single entry point for the bank's project delivery knowledge base, governing the journey from **idea to closure**. Use the pipeline below, browse the handbook map, see how every role aligns to one lifecycle, or jump straight in by role.

01Implementation Pipeline 02Handbook Map & Roles 03Delivery Lifecycle

Implementation Pipeline — Click a Phase

→

→

→

→

→

→

→

→

→

🗺️

Overview

### Handbook Map

The twelve handbooks and who owns them

One governance umbrella · eleven specialist sources of truth

The **Implementation Handbook** is the parent umbrella that governs the end-to-end lifecycle and links to eleven specialist role handbooks. Each specialist handbook is the single source of truth for its own domain.

📘

Implementation Handbook

Owner · PMO

Parent umbrella: end-to-end lifecycle governance, PM core controls, quality gates, RACI, glossary, templates.

Open overview →

👔

PM Project Handbook

Owner · Project Manager

PMBOK® v7 process groups, governance, risk, change control, communication, closure — full PM practice.

Open →

🎯

Product Owner Handbook

Owner · Product Owner

Scrum Guide 2020: product vision & goal, discovery, backlog, prioritization, outcome-driven metrics.

Open →

📖

BA Project Handbook

Owner · Business Analyst

BABOK® v3 across 9 BA phases: elicitation, BRD/FRD/SRS, RTM, NFR, quality gates, anti-patterns, and ceremonies.

Open →

🏛️

Solution Architect Handbook

Owner · Solution Architect

C4 · arc42 · Well-Architected: HLD/LLD, ADR, integration & API, NFR, security, sizing & resilience.

Open →

🧪

QC Testing Handbook

Owner · QA / Test Manager

ISTQB CTFL v4.0 test process, levels, techniques, risk-based testing, defect lifecycle, and metrics.

Open →

🚢

Deployment Runbook

Owner · Release Manager

Release pipeline, CAB procedure, pre-deploy gates, deployment steps, rollback, operational guide, and DoD checklist.

Open →

🛡️

Security & Compliance

Owner · CISO / Security

ISO 27001 · NIST CSF · OWASP · SBV 09/2020: risk, DevSecOps, IAM, data protection, audit.

Open →

🛰️

Operations & SRE

Owner · DevOps / SRE

Google SRE · ITIL 4 · DORA: SLO/error budget, observability, incident, DR/BCP.

Open →

🌀

Scrum Master Handbook

Owner · Scrum Master

Scrum Guide 2020: servant leadership, facilitation, impediments, coaching, team health.

Open →

🎨

UX/UI Designer Handbook

Owner · UX/UI Designer

Double Diamond · NN/g · WCAG 2.2: research, IA, wireframes, design system, usability.

Open →

🏢

PMO Governance & Portfolio

Owner · PMO Lead

PMI · P3O: portfolio & intake, RAID, EVM/benefits, assurance, portfolio reporting.

Open →

🙋

Quick Start

### Start by Role

Jump straight to the guidance for your accountability

I am a…

👔 Project Manager → PM Handbook 🎯 Product Owner → PO Handbook 📖 Business Analyst → BA Handbook 🏛️ Solution Architect → SA Handbook 🧪 QA / Tester → QC Handbook 🚢 Release Manager → Deployment Runbook 👩‍💼 Executive / Sponsor → Overview 💻 Developer → Implementation · SDLC 🌀 Scrum Master → SM Handbook 🎨 UX/UI Designer → UX Handbook 🛡️ Security / CISO → Security & Compliance 🛰️ DevOps / SRE → Operations & SRE 🏢 PMO Lead → PMO Governance 📢 Marketing / Sales → GTM

💡

New to the team? Start with Section 0 (How to Use) for the full picture, then drill into your role handbook.

Handbook › Delivery Lifecycle

🔀

Context

### Delivery Model

Structured governance around iterative delivery

Hybrid Water-Scrum-Fall

The bank runs a **hybrid model**: structured Waterfall governance & phase gates (planning, approvals, UAT, CAB, release) wrapped around Agile/Scrum sprint delivery. Governance discipline gives auditability for a regulated environment; Agile execution keeps delivery iterative.

- **Waterfall gates:** Strategy & Planning, Requirements sign-off, UAT, CAB & release approval.

- **Agile execution:** Sprint-based build & test between the gates.

- **PM as the spine:** owns integration, baselines, risk, change, reporting, and closure across every phase.

🧭

Alignment

### Master Lifecycle Cross-Walk

How each role's phases line up on one delivery lifecycle

Each handbook numbers its phases against its own standard (PMBOK, BABOK, ISTQB). This map aligns them all to a single project lifecycle so you can see, at a glance, who is doing what and when. Open any populated cell to go to that handbook.

| Role \ Phase | Idea | Plan | Discovery /Initiation | Require­ments | Design | Build | Test | Pre-Deploy | Deploy /GTM | Operate /Close |
|---|---|---|---|---|---|---|---|---|---|---|
| 📘 Implementation | Ph1 · Strategy & Planning | Ph2 · Discovery & Init | Ph3 · SDLC Execution (Hybrid Water-Scrum-Fall) | Ph4 · GTM | Ph5 Close · Ph6 Operate |  |  |  |  |  |
| 🏢 PMO (PMI/P3O) | Portfolio & Intake | Initiation gate | Assurance · RAID · Financial · Reporting | Benefits gate | Benefits & Closure |  |  |  |  |  |
| 🎯 PO (Scrum) | Vision & Strategy | Discovery & Backlog | Refinement · Sprint Review · Value | Release & Value | Outcomes & Metrics |  |  |  |  |  |
| 👔 PM (PMBOK) |  | Initiating | Planning | Executing · Monitoring & Controlling | Closing |  |  |  |  |  |
| 🌀 SM (Scrum) |  | Team setup | Facilitation · impediments · flow · coaching | Release retro | Continuous improvement |  |  |  |  |  |
| 📖 BA (BABOK) |  | P0 Initiation | P1–P3 Elicit → Analyse → Validate | P4 Design Support | P5 Impl Support | P6 UAT | P7 Release & Transition | P8 PIR |  |  |
| 🎨 UX/UI (NN/g) |  | Research | IA & Flows | Wireframe → UI | Design system | Usability testing |  |  |  |  |
| 🏛️ SA (C4/arc42) |  | Context & Options | NFR & Trade-offs | HLD / LLD · ADR | Build governance · NFR validation | Pre-deploy sign-off |  |  |  |  |
| 🛡️ Security (ISO) | Policy & Risk | Compliance · Threat model | Security design · DevSecOps | Sec testing · Gate | SecOps · Audit |  |  |  |  |  |
| 🧪 QC (ISTQB) |  | Test Planning + Static Reviews | Test Design & Impl | Test Execution | Test Completion |  |  |  |  |  |
| 🛰️ Ops / SRE |  | SLO & Observability by design | Release readiness · DR prep | Deploy & cutover | Operate · Incident · DR/BCP |  |  |  |  |  |
| 🚢 Deployment |  | Ph1 Discovery & Init |  | Ph2 Implementation |  | Ph3 Pre-Deploy | Ph4 Deploy |  |  |  |
| 👤 Sponsor / Steering | Business case & funding | Charter sign-off | Steering · escalation · change approval | Go/No-Go | Benefits sign-off |  |  |  |  |  |
| 💻 Developer |  | Estimation & refinement | Tech design input | Build · code review · unit test | Defect fixing | Release support | Deploy standby | Hypercare hotfix |  |  |
| 📢 Marketing / Sales |  | Positioning · content · campaign | Launch readiness · sales enablement | Launch: internal → beta → soft → GA | Adoption & KPI review |  |  |  |  |  |

Implementation (umbrella) PO PM BA SA / UX QC Deployment PMO / Ops SM Security Sponsor · Developer · Marketing (no dedicated handbook — covered inside the handbooks they link to)

ℹ️

Columns are the canonical delivery lifecycle. Bars show where each role's own numbered phases sit — e.g. BA **P6 UAT**, QC **Test Execution**, and Deployment **Pre-Deploy** all cluster around the **Test → Pre-Deploy** window, which is where hand-offs need the tightest coordination.

Handbook › Overview

📖

Section 0

### Overview & How to Use This Handbook

Your starting point for navigating the project implementation lifecycle

Purpose Statement

This handbook is the **single canonical entry point** for the bank's project pipeline from **idea to closure**. It acts as the parent umbrella over eleven specialist role handbooks — the PMO Governance & Portfolio, PM Project Handbook, Product Owner Handbook, Scrum Master Handbook, BA Project Handbook, UX/UI Designer Handbook, Solution Architect Handbook, Security & Compliance, QC Testing Handbook, Operations & SRE, and Deployment Runbook — consolidating the lifecycle map and linking to each source of truth without duplicating specialist content.

Who Should Read This

PM

Project Managers

Governance & Controls, Sections 1–6, 7, 9 — charters, baselines, risk, status, closure

👩‍💼

Executives & Sponsors

Sections 1, 4, 5, 7 — governance, GTM, closure, RACI

📋

BAs & POs

Sections 2, 3.2 (→ BA Project Handbook), 3.6, 3.8, 7

💻

Developers

Sections 3.4, 3.5, 3.6, 3.7, 3.8, 10

🧪

Testers & QA

Sections 3.5, 3.8 · full test process in the QC Testing Handbook ↗

🚀

Release Managers

Section 3.9 (→ Deployment Runbook), 6, 7

📢

Marketing & Sales

Section 4 — full Commercialization & GTM guide

💡

**Tip:** Use the sidebar search to find any topic quickly. Links marked with ↗ navigate to related pages in this handbook.

Content Ownership Rules

| Topic | Source of Truth | Handbook Role |
|---|---|---|
| Lifecycle governance spine — baselines, quality gates, RACI, phase flow, closure discipline | This Handbook | Core governance layer across all phases |
| Detailed PM role workflow — PMBOK process groups, risk, change, communication, reporting | PM Project Handbook | Summary + deep link (no duplication) |
| Product ownership — vision, discovery, backlog, prioritization, product value | Product Owner Handbook | Summary + deep link (no duplication) |
| BA process, BRD/FRD/SRS, elicitation, RTM, BA ceremonies | BA Project Handbook | Summary + deep link (no duplication) |
| Solution design — HLD/LLD, ADR, integration & API, NFR, security, sizing | Solution Architect Handbook | Summary + deep link (no duplication) |
| Portfolio & PMO governance — intake, RAID, EVM/benefits, assurance, reporting | PMO Governance & Portfolio | Summary + deep link (no duplication) |
| Scrum facilitation — servant leadership, events, impediments, team health | Scrum Master Handbook | Summary + deep link (no duplication) |
| Product design — research, IA, UI, design system, accessibility | UX/UI Designer Handbook | Summary + deep link (no duplication) |
| Information security & compliance — ISMS, DevSecOps, IAM, audit, SBV/ISO | Security & Compliance | Summary + deep link (no duplication) |
| Run & reliability — SLO, observability, incident, DR/BCP | Operations & SRE | Summary + deep link (no duplication) |
| Test strategy & process, test levels/types, defect lifecycle, QC metrics | QC Testing Handbook | Summary + deep link (no duplication) |
| Deployment steps, release checklist, CAB, rollback | Deployment Runbook | Summary + deep link (no duplication) |
| Everything else | This Handbook | Full content |

Artifact & Activity Ownership — Cross-Role Boundaries

Where two roles could both claim an artifact, this table is the single source of truth. It resolves the known overlaps so no artifact has two owners.

| Artifact / Activity | Accountable (owns) | Responsible / contributes | Boundary rule |
|---|---|---|---|
| User Stories & Acceptance Criteria | Product Owner | BA authors/refines | PO owns & orders the backlog; BA writes the detail. |
| Non-Functional Requirements (NFR) | Solution Architect (technical spec) | BA elicits business NFR | BA captures the need & targets; SA owns the technical spec & verification. |
| RAID · EVM · governance · reporting | PMO at portfolio level | PM at project level | PM runs project RAID/EVM; PMO aggregates the portfolio view. |
| Threat modeling & security design | Security owns policy & assurance | SA models (STRIDE) in design | SA embeds controls in the design; Security sets policy & verifies. |
| Deployment strategy · rollback · incident | Pre-prod & CAB: Release Mgr; Runtime: Ops/SRE | DevOps executes | RM owns the planned release/rollback decision & CAB; Ops owns runtime auto-rollback & incident. |
| Scrum ceremonies (facilitation) | Scrum Master | PO/Dev participate | SM is the source of truth for events; other handbooks link, not duplicate. |
| RTM · UAT scripts | BA authors | QC executes/verifies | BA owns traceability & AC; QC runs & evidences the tests. |

Handbook › Delivery Governance & Controls

🏛️

Control Layer

### Delivery Governance & Controls

Decision rights, minimum evidence, and assurance across the full lifecycle

**Purpose:** Define the minimum project-wide control layer without duplicating specialist practice. The PM integrates baselines, RAID, change, reporting, escalation, and closure evidence; PMO sets standards and performs risk-based assurance; Sponsor, Steering, and CCB retain approval authority; each workstream owner remains accountable for the quality of its evidence.

i

**Non-replacement rule:** The Product Owner Handbook remains the source of truth for product ownership & backlog, the BA Project Handbook for requirements, the Solution Architect Handbook for solution design & architecture decisions, the QC Testing Handbook for test process & quality control, the PM Project Handbook for detailed PM practice, the PMO Governance & Portfolio for portfolio/intake & assurance, the Scrum Master Handbook for Scrum facilitation, the UX/UI Designer Handbook for product design, the Security & Compliance runbook for information security & regulatory controls, the Operations & SRE runbook for run/reliability & DR-BCP, and the Deployment Runbook for CAB operations & production deployment mechanics. This handbook governs how they fit together.

1

Initiating

Project Charter, Stakeholder Register, kickoff, tailoring decision, assumptions, and initial risks.

2

Planning

PM Plan, scope, schedule, cost, quality, resource, communications, procurement, and stakeholder plans.

3

Executing

Direct work, align teams, manage vendors, run governance cadence, and remove blockers.

4

Monitoring & Control

Status, variance, change log, issue log, risk review, decision tracking, and escalation.

5

Closing

Acceptance, closure report, lessons learned, benefits review, archive, and resource release.

Knowledge Areas Applied in This Handbook

IntegrationScopeScheduleCostQualityResourcesCommunicationsRiskProcurementStakeholders

Minimum Governance Pack & Assurance Checkpoints

Every project must maintain one integrated, reviewable control pack. The depth is tailored to risk and complexity; the evidence chain is not optional.

| Control | Minimum Evidence | Accountable / Contributors | Review Point |
|---|---|---|---|
| Mandate & authority | Signed Charter, objectives, success measures, named Sponsor and PM, governance model, RACI, tailoring decision | Sponsor / PM / PMO | Before initiation exit |
| Integrated baseline | Approved scope, milestones, cost/funding, resource plan, quality approach, benefits owner and target measures | PM / PO / BA / workstream leads | Planning baseline and every approved rebaseline |
| RAID, change & decisions | Current RAID, dependency, change and decision logs with owners, dates, impacts and approvals | PM / item owners / CCB | Weekly; before every gate and Steering |
| Readiness & gate evidence | Signed requirements/design/test/security/release/operational evidence, exceptions and remediation owners | BA / SA / UX / QC / Security / Ops; PM integrates | Each phase gate and go-live decision |
| Closure & benefits | Formal acceptance, handover, financial/vendor closure, lessons learned, PIR, benefits review owner and date | PM / Sponsor / BAU owner / PMO | Closure gate and agreed post-launch reviews |

i

**Risk-based tailoring:** PMO classifies the governance path (for example Lite, Standard, or Enhanced) at intake. The signed tailoring decision states which artifacts are combined or simplified, why, and who approved the exception. Regulatory, security, audit, and segregation-of-duties controls cannot be silently waived.

| Process Group | Primary PM Outputs | Consumed By | Control Rule |
|---|---|---|---|
| Initiating | Project Charter, Stakeholder Register, Kickoff Minutes, Tailoring Decision, Assumption Log | BA discovery, sponsor, initiative team | No project work starts without a signed Charter and named PM authority. |
| Planning | PM Plan, baselines, risk register, RACI, communications plan, escalation matrix | BA, SA, DEV, QA, Finance, sponsors | Baselines become the reference point for all changes. |
| Executing | Work authorization, issue log, stakeholder updates, meeting minutes, vendor coordination | Delivery teams, vendors, steering | PM removes blockers and aligns teams; PM does not replace BA or team-level execution roles. |
| Monitoring & Control | Status reports, executive dashboard, change log, variance pack, decision log | Sponsor, Steering, CCB, team leads | Scope, schedule, cost, quality, risk, and resource impact are assessed together, never in isolation. |
| Closing | Closure document, final report, lessons learned register, resource release memo | Sponsor, BA, PMO, BAU owner | No project is complete until formal acceptance, archive, and knowledge transfer are done. |

| Layer | Typical Members | Decision Scope | Cadence |
|---|---|---|---|
| Executive / Sponsor | Sponsor, executive stakeholders | Strategic direction, funding, major scope change, executive escalation | Monthly or milestone-based |
| Steering Committee | Sponsor, business owner, IT lead, finance, PM | Phase gate approval, major changes, contingency use, cross-stream conflict resolution | Monthly; bi-weekly during critical phases |
| PMO / Independent Assurance | PMO plus Risk, Security, Architecture, Finance, or Quality reviewers as required | Method compliance, gate challenge, exception tracking, portfolio impact and escalation | Risk-based at key gates; portfolio review monthly |
| CCB | PM, BA, SA, QA, finance or business reps as needed | Impact-based decision on change requests and baseline updates | Weekly or ad hoc |
| Project Operations | PM, BA, PO, SA, DEV, QA, DevOps, vendors | Day-to-day delivery coordination, issue resolution, planning, and reporting | Daily to weekly |

!

**Authority thresholds:** PM-only decisions stay within minor variance tolerance. Any baseline scope change, material schedule or cost movement, Red status item, or High / Very High risk goes to CCB or Steering.

- Every status update includes RAG status, accomplishments, forward look, top risks, top issues, change requests, and decisions needed.

- Every risk includes probability, impact, exposure, owner, trigger, and response strategy.

- Every change request assesses scope, schedule, cost, quality, risk, and resource impact.

- Every decision has an owner, deadline, rationale, and status in a decision log.

- Every escalation states what has been tried, what is blocked, and what decision is needed from the next governance layer.

- Bad news early: Amber and Red conditions are surfaced as soon as confidence of impact is reasonable.

| SDLC | PM Emphasis | What Stays True |
|---|---|---|
| Waterfall | Heavy upfront planning, formal phase gates, tighter baseline control | PM still owns risk, status, change, stakeholder alignment, and closure. |
| Agile / Scrum | Release planning, team enablement, stakeholder governance, lighter internal change handling for in-scope backlog shifts | PM still owns overall schedule, steering reporting, risks, and external dependencies. |
| Hybrid | Waterfall governance gates wrapped around Agile build and testing cycles | This handbook defaults here: PM governs the wrapper while BA and delivery specialists own their workstreams. |

Core Handshakes With Existing Pages

| Workstream | Owned by | Governance Handshake |
|---|---|---|
| Product outcomes, roadmap, value and backlog priority | Product Owner Handbook | PO supplies outcome measures, priority and release intent; PM integrates them into scope, milestones, dependency and benefits governance without reprioritizing the backlog. |
| Requirements content, BRD/SRS, business rules, acceptance criteria | BA Project Handbook | PM consumes scope, priority, assumptions, and change impact from BA for baselines, risk, and governance decisions. |
| Solution architecture, integration, data and architecture decisions | Solution Architect Handbook | SA supplies options, ADRs, NFR and technical risk; PM integrates decision dates, cost/schedule impact, dependencies and exceptions. |
| User research, experience design, accessibility and design approval | UX/UI Designer Handbook | UX owns evidence and design quality; PM protects research/design time and tracks approval, dependency and rework impact. |
| Test strategy, coverage, defects and quality recommendation | QC Testing Handbook | QC supplies quality evidence and residual risk; PM integrates readiness, unresolved defects and acceptance decisions into gates. |
| Security, privacy, regulatory controls and risk acceptance | Security & Compliance | Security owns control interpretation and sign-off; PM tracks remediation, exceptions, approvers and gate impact. PM cannot self-accept security risk. |
| Scrum events, impediment facilitation and team improvement | Scrum Master Handbook | SM owns team-level facilitation; PM manages external dependencies, governance commitments and escalations without taking over Scrum accountability. |
| Release execution, CAB procedure, rollback, promotion to production | Deployment Runbook | PM consumes release readiness, schedule impact, approvals, and deployment risk to govern go-live decisions and reporting. |
| Reliability, observability, incidents, DR/BCP and BAU handover | Operations & SRE | Ops owns operational acceptance and run controls; PM integrates readiness gaps, service ownership, support model and handover closure. |
| Portfolio intake, standards, assurance, capacity and cross-project dependency | PMO Governance & Portfolio | PM provides health, forecast and exception data; PMO independently challenges, assures and escalates portfolio impacts. |
| Integrated project control, reporting, baselines, escalation and closure | PM; detailed practice in PM Project Handbook | PM integrates workstream evidence into decisions and reports. This section defines minimum project-wide controls; it does not replace detailed PM practice. |

Handbook › 1. Strategy & Planning

🎯

Phase 1

### Strategy & Planning

Long-Term Planning · Annual Planning · QBR

**Purpose:** Translate business strategy into a prioritized portfolio of initiatives before any project enters discovery.

Entry Criteria

- Business strategy document approved by Board

- Budget envelope defined for fiscal year

- Initiative Council formed (Head of BU, CTO, CFO, COO)

- **Vision alignment workshop** — CxO and Head of BU define strategic themes and target outcomes for 3–5 year horizon.

- **Capability maturity assessment** — evaluate current technology, processes, and people against strategic targets.

- **Roadmap creation** — sequence major initiatives by dependency, risk, and expected ROI.

- **Investment case preparation** — for each strategic initiative, produce a Lean Business Case: problem, hypothesis, expected benefit, estimated cost range.

✅

**Best Practice:** Tie every initiative to a measurable KPI/OKR. If you cannot measure success, the initiative is not ready for planning.

- **Portfolio intake** — collect initiative proposals from all business units using the Initiative Request Template.

- **Prioritization** — Initiative Council scores proposals using WSJF (Weighted Shortest Job First): Cost of Delay ÷ Job Size.

- **Budget allocation** — approved initiatives receive budget approval (Tờ trình) and are assigned an Initiative Director.

- **Capacity planning** — map approved initiatives against available team capacity. Identify hiring or vendor needs early.

- **Publish annual roadmap** — share with all stakeholders. This roadmap is the single source of truth for what gets built this year.

- **Portfolio health check** — review each initiative's RAG status, milestones hit/missed, burn rate.

- **Reprioritize** — adjust initiative order based on new market data, regulatory changes, or resource shifts.

- **Kill / Pivot decisions** — explicitly stop underperforming initiatives. Reallocate budget.

- **Update roadmap** — publish revised timeline and communicate changes to all teams.

🚨

**Critical Gate:** No initiative may continue past QBR without a confirmed RAG status and documented decision to proceed, pivot, or kill.

Key Outputs & Artifacts

📄 Lean Business Case🗺️ Annual Roadmap💰 Budget Allocation📊 QBR Report📋 Initiative RequestPM Governance Decision Log

Exit Criteria & Handoff

- Annual roadmap published and communicated

- Each approved initiative has a named Initiative Director

- Budget allocated and Tờ trình signed

- Handoff to Phase 2 (Discovery & Project Initiation) for each initiative

⚠️

**Common Pitfall:** Starting development before formal budget approval. In this hybrid model, Waterfall governance gates must be cleared before Agile execution begins.

Handbook › 2. Discovery & Initiation

🔭

Phase 2

### Discovery & Project Initiation

From approved initiative to staffed, scoped project

**Purpose:** Convert an approved initiative into a formally chartered project with defined scope, staffed team, and governance structure.

Entry Criteria

- Initiative approved in Annual Planning / QBR

- Budget allocated (Tờ trình signed)

- Initiative Director assigned

Key Activities

- **Stakeholder identification** — map all impacted parties. Build Stakeholder Register with power/interest matrix.

- **Problem framing** — conduct discovery workshops with business SMEs. Document current-state pain points and desired outcomes using 5 Whys and Fishbone analysis.

- **Scope definition** — produce high-level scope statement. Define what is IN and OUT of scope explicitly.

- **Project Charter** — document objectives, success criteria, constraints, assumptions, high-level timeline, budget, governance structure, and PM authority thresholds.

- **Team formation** — assemble Initiative Team: PO, BA(s), Tech Lead, Dev team, QA Lead, Scrum Master.

- **Kickoff** — all-hands kickoff meeting. Present Charter, introduce team, review timeline, set communication cadence.

- **Regulatory screening** — identify applicable regulations (SBV, Decree 13/2023, PCI-DSS). Engage Compliance and Op Risk early.

- **Tailoring decision** — confirm whether the project runs Waterfall, Agile, Kanban, SAFe, or Hybrid, and document what governance practices are mandatory.

Key Outputs & Artifacts

📄 Project Charter👥 Stakeholder Register📊 Scope Statement🔍 Regulatory Screening📅 High-Level TimelineTailoring DecisionAssumption Log

Exit Criteria & Handoff

- Project Charter signed by Project Sponsor

- Team formed and onboarded

- Regulatory screening complete

- Ready to enter Phase 3 (SDLC Execution)

Handbook › 3. SDLC Execution

⚙️

Phase 3

### SDLC Execution

Hybrid Water-Scrum-Fall — from requirements to release-ready

**Purpose:** Execute the approved project using the bank's Hybrid SDLC — Waterfall governance gates wrapping Agile sprint execution.

ℹ️

This section is the **parent** for 9 sub-sections. Two sub-sections (3.2 Requirements and 3.9 Release Workflow) link to existing handbook pages and are **not duplicated** here.

PM Monitoring & Control Overlay

RAG

Status & Variance

Weekly RAG reporting, milestone tracking, burn-down or critical-path review, and executive visibility.

RISK

Risk & Issue Control

Active risk review, issue ownership, trigger monitoring, and fast escalation for High or Very High exposure.

CR

Change Control

BA clarifications, stakeholder asks, and technical impacts are assessed together before baselines are changed.

SYNC

Cross-Team Coordination

PM aligns BA, SA, DEV, QA, DevOps, vendors, and release stakeholders while preserving each specialist flow.

Handbook › 3. SDLC › Build Phases

🏗️

Section 3.1–3.5

### Build Phases: Discovery → Solution → Design → Build → Test

SDLC best practices for development teams

- **Technical discovery** — SA evaluates current architecture, identifies integration points, data dependencies, and technology constraints.

- **Solution options analysis** — document at least 2 viable approaches with trade-offs (build vs. buy, monolith vs. microservice).

- **Architecture decision records (ADR)** — record every significant design decision with context, options, and rationale.

- **NFR specification** — define measurable non-functional requirements: performance (P95 latency), availability (SLA%), security, accessibility (WCAG 2.1 AA).

- **Prototype/PoC** — for high-risk or novel technologies, build a time-boxed proof-of-concept before committing to full build.

- **High-Level Design (HLD)** — system architecture diagram, component interactions, API contracts, data flow.

- **Low-Level Design (LLD)** — class diagrams, database schema, sequence diagrams for critical flows.

- **UX/UI design** — wireframes → mockups → interactive prototype. Review with PO and business users.

- **API specification** — OpenAPI/Swagger docs for all service interfaces. Version from day one.

- **Design review** — SA and peers review HLD/LLD before development begins. BA validates against requirements.

| Practice | Standard |
|---|---|
| Branching strategy | GitFlow or Trunk-Based Development. Feature branches → PR → Code Review → Merge to develop → Release branch → Main. |
| Code review | All changes reviewed by ≥1 peer before merge. Review checklist: correctness, security, tests, docs. |
| CI/CD pipeline | On every PR: lint → unit tests → build → SAST scan. On merge to develop: integration tests → deploy to SIT. |
| DevSecOps | SAST (SonarQube), DAST (OWASP ZAP), dependency scanning (Snyk), secrets scanning. Fail pipeline on Critical/High findings. |
| Tech debt management | Dedicate 15–20% of sprint capacity to tech debt. Track in backlog with "Tech Debt" label. |

| Level | Scope | Ownership | Target |
|---|---|---|---|
| Unit Tests | Individual functions/methods | Developer | ≥80% line coverage |
| Integration Tests | Component interactions, DB, API | Developer + QA | All critical paths |
| E2E / System Tests | Full user journeys | QA | Top 20 user scenarios |
| Performance Tests | Load, stress, soak | Perf Tester | Meet NFR targets |
| Security Tests | Pen testing, vulnerability scan | Sec Tester | No Critical/High open |
| UAT | Business acceptance | Business Users + BA | All AC verified |

✅

**Best Practice:** Shift left — write tests before or during development, not after. Automate everything below the E2E level.

🧪 Open the QC Testing Handbook →

ℹ️

**↗ External:** The full test process — ISTQB test levels & types, design techniques, risk-based testing, entry/exit criteria, defect lifecycle, and QC metrics — is documented in the QC Testing Handbook.

Handbook › 3. SDLC › 3.2 Requirements Analysis

📋

Section 3.2 · ↗ External Page

### Requirements Analysis

Full process documented in the BA Project Handbook page

At this bank, requirements analysis follows the **BABOK® v3** framework across 9 phases. The BA team engages at project kickoff and maintains requirements traceability throughout the SDLC.

**Key artifacts produced:**

- Business Requirements Document (BRD) / Software Requirements Specification (SRS)

- User Stories with Given-When-Then Acceptance Criteria

- Process Flow Diagrams (As-Is / To-Be, BPMN 2.0)

- Requirements Traceability Matrix (RTM)

- Business Rules Catalog & Data Dictionary

📖 Open the BA Project Handbook →

ℹ️

**↗ External:** The full requirements analysis process, including all 9 BA phases, quality gates, and anti-patterns, is documented in the BA Project Handbook.

Handbook › 3. SDLC › 3.6 Agile Ceremonies

🔄

Section 3.6

### Agile Ceremonies

Sprint cadence, participants, time-boxes, and outputs

| Ceremony | Cadence | Time-box | Participants | Output |
|---|---|---|---|---|
| Sprint Planning | Sprint start | 2–4 hrs (2-week sprint) | PO, SM, Dev Team, BA | Sprint Backlog, Sprint Goal |
| Daily Scrum | Daily | 15 min | Dev Team, SM | Impediment log, sync |
| Product Backlog Refinement (PBR) | Mid-sprint | 1–2 hrs | PO, BA, Dev Team, QA | Refined stories (DoR met) |
| Sprint Review / Demo | Sprint end | 1–2 hrs | PO, Stakeholders, Team | Accepted increments, feedback |
| Sprint Retrospective | After Review | 1–1.5 hrs | SM, Dev Team | Action items for next sprint |
| Scrum of Scrums (SoS) | 2–3x / week | 30 min | SM representatives | Cross-team dependency resolution |
| Big Room Planning (BRP) | Quarterly / PI | 1–2 days | All teams, POs, SA, Management | PI objectives, dependency board |

⚠️

**Common Pitfall:** Skipping PBR leads to poorly defined stories entering the sprint, causing mid-sprint churn. PBR is not optional — it is the primary mechanism ensuring stories meet Definition of Ready.

Handbook › 3. SDLC › 3.7 Backlog Hierarchy

📊

Section 3.7

### Backlog Hierarchy

Capability → Epic → Story → Task → Defect → Sub-task

| Level | Definition | Owner | Estimation | Lifespan |
|---|---|---|---|---|
| Capability | Strategic business outcome (e.g., "Digital Onboarding") | Initiative Director | T-shirt (S/M/L/XL) | Quarters |
| Epic | Large deliverable that delivers a portion of a Capability | PO | Story Points (aggregate) | Weeks–months |
| User Story | "As a [role] I want [goal] so that [benefit]" — deliverable in one sprint | PO / BA | Story Points (1–13) | 1 sprint |
| Task | Technical work item under a Story (dev, config, docs) | Developer | Hours | Days |
| Defect | Deviation from expected behavior — linked to a Story or Epic | QA / Developer | Hours | Priority-driven |
| Sub-task | Granular breakdown of Task or Defect for tracking | Assignee | Hours | Hours–days |

✅

**Best Practice:** Stories > 8 points should be split. If a story cannot be demonstrated to a stakeholder, it is a task, not a story.

Handbook › 3. SDLC › 3.8 Quality Gates

🎯

Section 3.8

### Quality Gates: DoR · Sprint DoD · Release DoD

Checklists that govern what enters and exits a sprint and a release

✅ Definition of Ready (DoR)

Gate before story enters sprint

- User story in "As a… I want… so that…" format

- Acceptance criteria in Given-When-Then

- Dependencies identified and resolved

- UX mockups attached (if UI story)

- NFRs specified or referenced

- Business rules referenced

- Estimated by DEV team (≤ 13 SP)

- Small enough to complete in one sprint

🏁 Sprint DoD

Gate before story is accepted

- All acceptance criteria met and verified

- Code peer-reviewed and merged

- Unit + integration tests pass

- QA testing complete — no Critical/Major open

- SAST scan passed — no Critical findings

- Documentation updated

- Demonstrated and accepted by PO

- Deployed to SIT environment

🚀 Release DoD

Gate before production deployment

- All Sprint DoD items met for every story in release

- UAT passed — sign-off received

- Performance testing passed — NFR targets met

- Security testing passed — pen test report clean

- Regulatory review complete (if applicable)

- Release notes written

- Rollback plan documented and tested

- CAB approval obtained

Handbook › 3. SDLC › 3.9 Release Request Workflow

🚢

Section 3.9 · ↗ External Page

### Release Request Workflow

Full operational guide in the Deployment Runbook

The release process follows a **12-step swimlane workflow** governed by the Change Advisory Board (CAB). Every release passes through Security Testing, UAT, CAB approval, and documented rollback procedures before reaching production.

**Release swimlane stages:**

BacklogReady for PTIn PTPT DoneReady for STIn STST DoneReady for CABIn CABCAB DoneReady for ProdReleased ✓

🚢 Open the Deployment Runbook →

Handbook › 4. Commercialization & GTM

🚀

Phase 4

### Commercialization & Go-to-Market

From release-ready to market impact

**Purpose:** Plan and execute the commercial launch of a product or feature — ensuring internal readiness, market positioning, and measurable business outcomes.

Entry Criteria (GTM Readiness Gate)

- Release DoD passed — product is functionally and technically ready

- UAT signed off by business stakeholders

- Regulatory / Compliance approval obtained

- No Critical or Major defects open

- Product marketing brief approved

| Phase | Audience | Duration | Success Criteria | Kill Criteria |
|---|---|---|---|---|
| Internal Launch | Internal staff only | 1–2 weeks | Staff feedback collected, critical UX issues fixed | P1 defects found, security gaps |
| Beta (Closed) | Selected customers (opt-in, NDA) | 2–4 weeks | NPS ≥ 30, retention ≥ 70%, no P1 issues | NPS < 10, > 3 P1 defects |
| Soft Launch | Limited market segment (geo/cohort) | 2–4 weeks | Conversion target hit, support volume manageable | Conversion < 50% of target |
| General Availability (GA) | All target customers | Ongoing | Revenue/adoption targets per business case | — |

- **Positioning & messaging** — define value proposition, target persona, competitive differentiation.

- **Content creation** — landing pages, product video, FAQ, blog posts, social media kit, press release.

- **Channel strategy** — email, in-app, push notification, SMS, branch network, digital ads.

- **Campaign calendar** — teasers (2 weeks pre-launch) → launch day → follow-up nurture sequences.

- **A/B testing plan** — test messaging variants, CTAs, landing page designs.

| Metric Category | Example KPIs | Target Setting |
|---|---|---|
| Adoption | DAU/MAU, activation rate, feature adoption % | Defined in business case |
| Revenue | ARR contribution, ARPU, conversion rate | Finance BP model |
| Satisfaction | NPS, CSAT, app store rating | NPS ≥ 30, CSAT ≥ 4.0 |
| Operational | Support ticket volume, P1 incidents, uptime | Per SLA targets |

Exit Criteria & Handoff

- GA launch completed

- 30-day KPIs reviewed and documented

- Support runbook handed off to BAU team

- Handoff to Phase 6 (Operate & Maintain) for ongoing support

Handbook › 5. Project Closure

📦

Phase 5

### Project Closure

Formal wrap-up, PIR, lessons learned, and handoff to operations

Key Activities

- **Post-Implementation Review (PIR)** — conducted 2–4 weeks after GA. Measure actual KPIs against business case targets.

- **Benefits realization assessment** — compare planned ROI/benefits with actuals.

- **Lessons learned workshop** — structured session with full team. Categorize by: Process, People, Technology, Communication.

- **Remaining backlog handoff** — transfer un-delivered backlog items to the product team's BAU backlog.

- **Documentation archive** — ensure all project artifacts are archived in the document management system.

- **Financial closure** — reconcile budget actuals vs. forecast. Close project cost center.

- **Team release** — formally release team members. Conduct 1:1 feedback sessions.

- **Formal sign-off** — Project Sponsor signs closure document confirming project is complete.

- **Vendor and contract closure** — confirm all contractual obligations are closed.

⚠️

**Common Pitfall:** Projects that never formally close. Without a closure gate, resources stay allocated, costs accumulate, and lessons are never captured.

Handbook › 6. Operate & Maintain

🔧

Phase 6

### Operate & Maintain

Post-launch BAU operations, monitoring, and continuous improvement

🩺 Hypercare / Warranty Period — the go-live → BAU bridge

**Hypercare** is the heightened-support window immediately after go-live, before the product transitions to steady-state BAU. It is a single coordinated period even though several roles act in it — this is the consolidated view.

i

**Typical timeline:** intensive first **72 hours** (release watch) → elevated support for **2–4 weeks** (stabilization) → formal exit to BAU + PIR.

| Who | Does in hypercare | Source of truth |
|---|---|---|
| Release Manager | 72-hour release watch; rollback decision; Go/No-Go to close watch | Deployment Runbook (Phase 4) |
| Ops / SRE | On-call, monitoring, incident & problem mgmt, SLO watch | Operations & SRE Runbook |
| Business Analyst | Business-user Q&A, fast-path clarifications, defect triage (req vs impl) | BA Handbook (Phase 7) |
| Dev team | On standby for hotfixes; root-cause of escaped defects | Sprint / this handbook §3 |
| Product Owner | Watch adoption/value metrics; prioritise hotfixes vs backlog | PO Handbook |

!

**Exit criteria (hypercare → BAU):** no open P1/P2; incident rate back to baseline; SLOs met for a sustained window; support runbook & on-call fully handed to BAU; PIR scheduled. Only then is the elevated support formally stood down.

Key Activities

- **Monitoring & alerting** — 24/7 monitoring of production systems. Alert thresholds configured per SLA.

- **Incident management** — P1 response within 15 min. Post-incident review (PIR) within 48 hours.

- **Patch management** — security patches within SLA (Critical: 24h, High: 7d, Medium: 30d).

- **Change management** — all production changes go through CAB. Standard, Normal, Emergency change types per ITIL.

- **Continuous improvement** — monthly review of system health metrics. Quarterly capacity planning.

- **Compliance maintenance** — periodic regulatory audits. Evidence collection for SBV, ISO 27001 recertification.

SLA Targets (Standard)

| Tier | Availability | RTO | RPO | Support Hours |
|---|---|---|---|---|
| Tier 1 (Core Banking) | 99.95% | 1 hour | 15 min | 24/7 |
| Tier 2 (Digital Channels) | 99.9% | 4 hours | 1 hour | 24/7 |
| Tier 3 (Internal Tools) | 99.5% | 8 hours | 4 hours | Business hours |

Handbook › 7. Stakeholders & RACI

👥

Section 7

### Stakeholders & RACI Matrix

Filterable responsibility matrix across all phases and roles

All Phases 1. Strategy & Planning2. Discovery & Initiation 3. SDLC Execution4. GTM5. Closure6. Operate All Roles Project SponsorPMPOBA SATech LeadDeveloperQA Lead Scrum MasterRelease ManagerComplianceMarketing

| Activity | Phase | Sponsor | PM | PO | BA | SA | Tech Lead | Dev | QA | SM | RM | Compl. | Mktg |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Business case approval | 1. Strategy & Planning | A | C | I | C | I | - | - | - | - | - | C | I |
| Annual roadmap creation | 1. Strategy & Planning | A | R | C | C | C | - | - | - | - | - | I | C |
| Project Charter | 2. Discovery & Initiation | A | R | C | C | C | I | I | I | I | - | C | - |
| Requirements elicitation | 3. SDLC Execution | I | I | A | R | C | C | I | C | - | - | C | - |
| Sprint execution | 3. SDLC Execution | - | I | A | C | C | R | R | R | R | - | - | - |
| CAB submission | 3. SDLC Execution | I | A | I | I | C | R | C | C | - | R | A | - |
| Production deployment | 3. SDLC Execution | I | A | I | - | C | R | R | C | - | R | I | - |
| GTM launch plan | 4. GTM | A | C | R | C | - | - | - | - | - | - | C | R |
| PIR / Lessons learned | 5. Closure | A | R | C | R | C | C | C | C | C | I | I | I |
| Incident response | 6. Operate | I | I | I | - | C | A | R | C | - | R | I | - |

R = Responsible A = Accountable C = Consulted I = Informed

Handbook › 8. Glossary

📚

Section 8

### Glossary

Terms and acronyms used throughout this handbook

Key terminology every role should share

These **standard terms are used in English** across every handbook — including on the Vietnamese pages, where they are deliberately left untranslated because that is how practitioners use them. The role column shows the primary practitioner group while keeping terminology consistent across domains.

| Term | Meaning | Role |
|---|---|---|
| Product Goal | Long-term product objective, held in the backlog. | PO · SM |
| Sprint | Fixed 1–4 week delivery iteration. | SM |
| Backlog | Ordered list of work to do. | PO |
| Definition of Done (DoD) | Quality bar an Increment must meet to be releasable. | Team |
| Definition of Ready (DoR) | Checklist for a story to enter a Sprint. | PO · BA |
| User Story | A need from the user's perspective. | PO · BA |
| Acceptance Criteria (AC) | Conditions that make a story correct. | BA · QC |
| Increment | Cumulative, usable step of the product. | Team |
| Product Roadmap | Outcome-based Now / Next / Later plan. | PO |
| Outcome vs Output | Behaviour/value change vs features shipped. | PO |
| RTM | Requirements Traceability Matrix (requirements ↔ tests). | BA |
| NFR | Measurable non-functional requirement. | BA · SA |
| Strategy Analysis | Current-state → future-state analysis. | BA |
| HLD / LLD | High-Level / Low-Level Design. | SA |
| ADR | Architecture Decision Record (the "why"). | SA |
| Well-Architected | 6-pillar architecture quality review. | SA |
| STRIDE | Threat-modeling classification. | SA · Sec |
| Severity vs Priority | Technical impact vs business urgency of a defect. | QC |
| Regression | Re-testing that changes broke nothing. | QC |
| Coverage | % of items exercised by tests. | QC |
| SAST / DAST | Static / dynamic security scanning. | Sec |
| IAM | Identity & Access Management. | Sec |
| Least Privilege | Grant the minimum access needed. | Sec |
| CVSS | Vulnerability severity score (0–10). | Sec |
| SLO / SLI / SLA | Service objective / indicator / agreement. | Ops |
| Error Budget | Allowed unreliability (100% − SLO). | Ops |
| RTO / RPO | Max recovery time / max data loss. | Ops |
| Blameless Postmortem | Incident review focused on systems, not people. | Ops |
| DORA | 4 delivery metrics: deployment frequency, lead time, CFR, MTTR. | Ops |
| EVM (CPI / SPI) | Earned Value Management — cost/schedule efficiency against baseline. | PM · PMO |
| RAID | Risks, Assumptions, Issues, Dependencies log. | PM · PMO |
| Stage-Gate | Go / Kill / Hold / Recycle approval gate. | PMO |
| Benefits Realization | Harvesting outcomes after delivery. | PMO |
| CAB | Change Advisory Board (release governance and production-change approval). | Deploy |
| Hypercare | Heightened support right after go-live. | All |
| Rollback | Revert to the previous working version. | Deploy |

Additional governance acronyms

| Term | Definition |
|---|---|
| BABOK | Business Analysis Body of Knowledge — IIBA's guide for BA practices (v3). |
| BRD | Business Requirements Document — formal requirements specification. |
| GTM | Go-to-Market — strategy and execution plan for commercial launch. |
| GWT | Given-When-Then — format for writing acceptance criteria. |
| OKR | Objectives and Key Results — goal-setting framework. |
| PBR | Product Backlog Refinement — ceremony to groom upcoming stories. |
| PIR | Post-Implementation Review — evaluation after project/incident closure. |
| RAG | Red / Amber / Green status indicator used in project reporting. |
| SBV | State Bank of Vietnam — central banking regulator. |
| UAT | User Acceptance Testing — business validation of the solution. |
| WBS | Work Breakdown Structure — decomposition of deliverables into manageable work packages. |
| WSJF | Weighted Shortest Job First — prioritization formula (Cost of Delay ÷ Job Size). |

Handbook › 9. Templates Library

📋

Section 9

### Templates Library

Curated, ready-to-use files grouped by primary owner

Only reviewed downloads that are currently available are listed. Additional role templates will appear here after curation.

DOCXOwner · BA

#### Business Requirements Document

Frame the business problem, strategic context, scope, personas, journeys, and hybrid functional requirements before solutioning.

Use whenA new initiative needs an agreed business baseline before solution design.

SupportsPO · PM · SA · UX

Read document→

DOCXOwner · BA

#### Requirements Traceability Matrix

Trace requirements from source and design through test evidence and release.

Use whenTraceability and coverage need an auditable view.

SupportsPO · QC · PM

Read document→

DOCXOwner · BA

#### Software Requirements Specification

Baseline structured functional and non-functional requirements for complex or regulated scope.

Use whenA shared requirements baseline is needed before build.

SupportsSA · Dev · QC · Security

Read document→

DOCXOwner · BA

#### Use Case Specification

Describe actors, preconditions, main flow, alternatives, and exceptions for complex interactions.

Use whenScenario detail cannot fit cleanly in a user story.

SupportsPO · SA · Dev · QC

Read document→

DOCXOwner · PM

#### Project Management Plan

Establish the integrated delivery approach, governance, baselines, controls, and tailoring.

Use whenThe project needs an agreed management baseline.

SupportsPMO · PO · BA · SA · Workstream leads

Read document→

DOCXOwner · PM

#### RAID Log

Manage risks, assumptions, issues, and dependencies in one working log.

Use whenUncertainty and blockers need owners, triggers, and actions.

SupportsAll workstream leads

Read document→

DOCXOwner · PM

#### One-page Status Report

Summarize health, progress, decisions, risks, and next steps for the reporting period.

Use whenGovernance forums need a decision-ready update.

SupportsSponsor · PMO · Workstream leads

Read document→

DOCXOwner · PM

#### Project Charter

Authorize the initiative and align purpose, outcomes, boundaries, governance, and PM authority.

Use whenA sponsor must formally initiate and empower the project.

SupportsSponsor · PO · BA · SA

Read document→

DOCXOwner · PO

#### Epic to User Stories

Split an approved epic into thin, valuable, testable stories with clear acceptance criteria.

Use whenAn epic is entering refinement and delivery preparation.

SupportsBA · Dev · QC · UX

Read document→

DOCXOwner · PO

#### Product Vision & Roadmap

Align the product problem, target outcomes, success measures, priorities, and roadmap horizons.

Use whenA product or major initiative needs shared direction.

SupportsSponsor · BA · UX · PM

Read document→

DOCXOwner · PO

#### Product Requirements Document

Define the problem, goals, success metrics, personas, user stories, UX flows, and launch plan for a product initiative.

Use whenA product initiative needs one source of intent before delivery.

SupportsBA · UX · Dev · PM

Read document→

DOCXOwner · PO

#### Functional Specification Document

Specify system behaviour end-to-end: actors, flows, field-level detail, configuration, integration, reporting, and data migration.

Use whenBuild teams need an implementation-ready functional baseline.

SupportsBA · SA · Dev · QC

Read document→

DOCXOwner · SA

#### Architecture Decision Record

Capture a consequential architecture decision, context, considered options, and consequences.

Use whenA decision affects quality, constraints, or future change.

SupportsDev · Security · Ops

Read document→

DOCXOwner · SA

#### Solution Architecture Document

Baseline the end-to-end solution, integrations, data, security, deployment, and quality attributes.

Use whenDelivery teams need one reviewed architecture reference.

SupportsBA · Dev · Security · Ops · QC

Read document→

Handbook › 10. Tooling

🛠️

Section 10

### Tooling

Standard tool stack across the project lifecycle

i

**Representative, not mandated.** The tools named here and throughout the handbooks (e.g. Jira, GitHub, SonarQube, OWASP ZAP, JMeter, Grafana, and the ARB / CAB / GRC governance bodies) are **illustrative examples** of a typical stack. Substitute your organization's actual, approved tools & governance forums — the practice is what matters, not the specific product.

| Category | Tool | Purpose | Owner |
|---|---|---|---|
| Project Management | Jira | Backlog, sprints, defects, workflows | PM / SM |
| Documentation | Confluence | Requirements, design docs, meeting notes | All teams |
| Source Control | GitHub | Code repository, pull requests, CI/CD pipelines | Dev Team |
| CI/CD | GitHub Actions | Build, test, deploy automation | DevOps |
| Code Quality | SonarQube | SAST, code quality metrics, tech debt tracking | Dev Team |
| Security Scanning | Snyk + OWASP ZAP | Dependency scanning (SCA) + DAST | DevSecOps |
| UX/UI Design | Figma | Wireframes, prototypes, design system | UX/UI Designer |
| Monitoring | Grafana + Prometheus | Dashboards, metrics, alerting | DevOps / SRE |
| Log Management | ELK Stack | Centralized logging, search, analysis | DevOps / SRE |
| Incident Management | PagerDuty / OpsGenie | On-call scheduling, escalation, alerting | DevOps / SRE |

Handbook › Changelog

📝

Changelog

### Version History

v1.0 — 2025-Q2 (Initial Release)

| Type | Description |
|---|---|
| Added | Sections 0–10: full handbook from Strategy to Tooling. |
| Added | Interactive pipeline on landing page with clickable phase navigation. |
| Added | Filterable RACI matrix across activities and roles. |
| Added | Quality gates section with DoR, Sprint DoD, and Release DoD checklists. |
| Note | Sections 3.2 and 3.9 intentionally link to other handbook pages. Content is NOT duplicated. |

🏦 Handbook · Project Implementation Handbook v1.0 · Last updated 2025-Q2 · Owner: Thiện Phạm (Power Home PO)

Classification: CONFIDENTIAL · SBV Circular 09/2020/TT-NHNN · ISO 27001 Aligned · © 2025
