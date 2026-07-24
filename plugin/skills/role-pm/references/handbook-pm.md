# Project Manager — full handbook chapter

> Extracted from the Power Home Handbook page `pages/pm.html` (EN edition; a Vietnamese edition exists in the handbook app).

👔 Internal Handbook · PMBOK® v7 Aligned

## Project Manager (PM)

## Role & Workflow

A comprehensive guide to the Senior Project Manager workflow within a hybrid SDLC model. You are accountable for scope, schedule, cost, quality, resources, communication, risk, procurement, stakeholders, and integration.

PMBOK® 7th Ed.

Hybrid SDLC

5 Process Groups

PUBLIC EDITION

📖 Key terms & abbreviations on this page

New to project management? Skim these first — they appear throughout this handbook.

| Term | Meaning |
|---|---|
| PMBOK / PMI | Project Management Body of Knowledge — the PM standard, published by the Project Management Institute. |
| Baseline | The approved reference version of scope/schedule/cost — all changes are measured against it. |
| WBS | Work Breakdown Structure — the full scope broken into deliverable chunks. |
| RACI | Responsible / Accountable / Consulted / Informed — who does what per activity (one "A" per row). |
| CR / CCB | Change Request — a formal scope/schedule/cost change; approved by the Change Control Board. |
| EVM · CPI · SPI · EAC | Earned Value Management: CPI = cost efficiency, SPI = schedule efficiency (1.0 = on plan), EAC = forecast cost at completion. |
| RAG | Red / Amber / Green — traffic-light health status used in status reports. |
| RAID | Risks, Assumptions, Issues, Dependencies — the four logs a PM keeps current. |
| SOW | Statement of Work — the contracted scope with a vendor. |
| Steering Committee | Senior governance body that approves gates, major changes and escalations. |
| Hypercare | Heightened support window right after go-live, before normal operations. |

🏠

Overview

### Identity & Principles

Identity & Context

You operate as a Senior Project Manager managing software implementations. You apply the PMI project management principles, navigating Waterfall, Agile/Scrum, Kanban, SAFe, or Hybrid models. You collaborate with: Project Sponsor, Steering Committee, BA, SA, DEV, QA, PO, UX/UI, DevOps/SRE, Security/Compliance, Finance/Procurement, Vendors, and Business Stakeholders.

Guiding Principles (PMBOK 7th Edition)

| Principle | What it asks of you |
|---|---|
| Stewardship | Act ethically, honestly, and in the project's best interest. |
| Team | Foster a collaborative, accountable team environment. |
| Stakeholders | Engage them meaningfully throughout the project. |
| Value | Focus on outcomes and business value, not just deliverables. |
| Systems thinking | Understand interdependencies and the broader context. |
| Leadership | Demonstrate leadership behaviours at every level. |
| Tailoring | Adapt the approach to the context, not the other way around. |
| Quality | Build quality into processes and deliverables. |
| Complexity | Navigate complexity with adaptability. |
| Risk | Proactively identify and respond to threats & opportunities. |
| Adaptability & resilience | Embrace change, learn from setbacks. |
| Change | Enable change to achieve the envisioned future state. |

The 8 Performance Domains (PMBOK 7)

PMBOK 7 is **principle- and domain-based**, not process-based. The 8 Performance Domains are interacting areas of focus that run throughout delivery. The Phase 1–5 process groups below are the execution lens; the domains are how v7 frames outcomes.

| Performance Domain | Focus / outcome |
|---|---|
| Stakeholders | Productive working relationships & engagement. |
| Team | High-performing team, shared leadership, culture. (Team process is owned by the Scrum Master, not the PM.) |
| Development Approach & Life Cycle | Fit the approach (predictive/agile/hybrid) to the work. |
| Planning | Progressive, coordinated planning across scope/schedule/cost. |
| Project Work | Execute processes, manage resources, procurement & vendors, learning. |
| Delivery | Deliver scope & quality that realizes the intended value. |
| Measurement | Assess performance with leading & lagging indicators; avoid measurement traps. |
| Uncertainty | Navigate risk, ambiguity, complexity & volatility. |

🧵

**Tailoring** is a first-class discipline in v7: deliberately adapt approach, governance, and artifacts to context (size, risk, regulatory scope) — documented in the Tailoring Decision (Phase 1).

👁️

Overview

### Visual Overview

Five Process Groups

**INITIATING**Charter, stakeholder identification

**PLANNING**PM plan, all baselines

**EXECUTING**Deliver the work

**CLOSING**Handover, lessons

**MONITORING & CONTROLLING**Track, correct↔ EXECUTING · Change requests → PLANNING

Ten Knowledge Areas (PMBOK)

**Integration Management** connects: Scope, Schedule, Cost, Quality, Resource, Communications, Risk, Procurement, and Stakeholder Management.

PM Role Interaction Map

| Role | Interactions |
|---|---|
| Sponsor / Steering | Provides vision, funding, decisions. PM provides status, risks, escalations. |
| Business Analyst | BA provides requirements, CR impact. PM provides scope, schedule, priorities. |
| Solution Architect | SA provides architecture, estimates. PM provides timeline, constraints. |
| Dev Team | DEV reports progress, blockers. PM assigns work priorities. |
| QA Team | QA reports defect trends, quality context. PM defines schedule, gates. |
| Vendors | Vendors deliver SOW items. PM handles contracts, deliverables, invoices. |

1️⃣

End-to-End Workflow

### Phase 1 — Initiating

**Trigger:** Business case approved; project authorized to start.

- 1**Develop Project Charter** capturing purpose, scope, budget, risks, and authority.

- 2**Identify stakeholders** — collaborate with BA on Stakeholder Register.

- 3**Conduct project kickoff** with core team and stakeholders.

- 4**Assess organizational readiness**: governance model and dependencies.

- 5**Define tailoring approach** — select SDLC model and PM framework.

📄

**Primary outputs:** Project Charter, Stakeholder Register, Kickoff Minutes, Tailoring Decision, initial Assumption Log.

2️⃣

End-to-End Workflow

### Phase 2 — Planning

**Trigger:** Charter approved; planning authorized.

| Knowledge Area | Activities |
|---|---|
| Integration | Develop Project Management Plan, establish CCB / change process. |
| Scope | Scope Statement, WBS, WBS Dictionary, Scope Baseline. |
| Schedule | Network Diagram, duration estimates, Schedule Baseline, Release Plan, Sprint cadence. |
| Cost | Bottom-Up estimates, Cost Baseline, Management Reserve, EVM metrics. |
| Quality | Quality Mgmt Plan, Definition of Done, checkpoints, audits. |
| Resource | RACI Matrix, Resource Calendar, Team Development Plan. |
| Communications | Comms Mgmt Plan, reporting cadence, Escalation Matrix. |
| Risk | Risk Identification workshops, Qualitative/Quantitative analysis, Response Plans, Risk Register. |
| Procurement | Procurement Mgmt Plan, SOW templates, vendor selection criteria. |
| Stakeholder | Stakeholder Engagement Plan strategies. |

📄

**Primary outputs:** PM Plan, Baselines (Scope/Schedule/Cost), 6 Subsidiary Plans, RACI, Risk Register.

3️⃣

End-to-End Workflow

### Phase 3 — Executing

**Trigger:** Planning approved; execution authorized.

- 1Direct & manage project work (remove blockers).

- 2Manage project knowledge (Lessons Learned Register).

- 3Manage quality (audits, standard verification).

- 4Acquire, develop, and manage team (1:1s, performance, onboarding).

- 5Manage communications (distribute reports, meetings).

- 6Implement risk responses.

- 7Conduct procurements (vendor management).

- 8Manage stakeholder engagement.

- 9Facilitate ceremonies (Agile) or phase gates (Waterfall).

- 10Manage cross-team dependencies.

4️⃣

End-to-End Workflow

### Phase 4 — Monitoring & Controlling

**Trigger:** Execution begins; runs in parallel until closing.

| Control area | What you do |
|---|---|
| Integrated Change Control | Evaluate CRs, CCB approvals, update baselines. |
| Scope Control | Validate deliverables, prevent scope creep. |
| Schedule Control | Trend analysis, Burn-down charts, Critical Path, fast-tracking. |
| Cost Control | EVM metrics (CPI, SPI, EAC), budget tracking. |
| Quality Control | Defect metrics review, root cause analysis. |
| Risk & Issue Control | Monitor triggers, execute contingency plans, periodic Risk Reviews. |
| Procurement & Stakeholders | Vendor SLAs, engagement correction. |

📄

**Primary outputs:** Weekly Status Reports, Change Log, Updated Risk/Issue Logs, Variance & EVM Reports.

5️⃣

End-to-End Workflow

### Phase 5 — Closing

**Trigger:** Deliverables accepted; ready for closure.

- 1Final product/service acceptance (sign-off).

- 2Administrative closure: archive docs, close contracts, release resources.

- 3Financial closure: final reconciliation, close budget codes.

- 4Project Closing Meeting / Retrospective.

- 5Document and share Lessons Learned definitively.

- 6Schedule Benefits Realization Review (3–6 mo post go-live).

⚠️

Frameworks

### Risk & Stakeholder Management

Risk Management Framework

**Categories:** Technical, Schedule, Cost, Resource, Scope, Quality, Vendor, Organizational, External, Security.

**Risk Scoring (5×5 Matrix):** Probability × Impact = Exposure. 1–4 (Low), 5–9 (Medium), 10–16 (High — active response), 17–25 (Very High — exec escalation).

**Response Strategies:** Threats (Avoid/Transfer/Mitigate/Accept/Escalate). Opportunities (Exploit/Share/Enhance/Accept/Escalate).

Stakeholder Management

**Power/Interest Grid:** High Power/High Interest = Manage Closely. High Power/Low Interest = Keep Satisfied. Low/High = Keep Informed. Low/Low = Monitor.

**Engagement Levels:** Unaware → Resistant → Neutral → Supportive → Leading.

📡

Frameworks

### Communication Cadence

| Audience | Frequency | Format |
|---|---|---|
| Dev Team | Daily | Standup (15 min) |
| Project Core Team | Weekly | Working Session (60 min) |
| Team + BA/QA | Weekly/Bi-weekly | Status Meeting (45 min) |
| Stakeholders | Bi-weekly | Status Report (email) |
| Steering Committee | Monthly | Steering Pack + Meeting (60 min) |
| Sponsor | Bi-weekly | 1:1 Sync (30 min) |
| Executive Leadership | Monthly/Quarterly | Executive Dashboard |

🚦

**RAG status — how it relates to this table:** every Status Report, Steering Pack and Executive Dashboard listed above carries a RAG colour summarising project health: 🟢 **Green** = on track, no action needed · 🟡 **Amber** = at risk, mitigation in progress · 🔴 **Red** = off track, escalation required. Use the same definitions in every report so stakeholders read one consistent signal.

🔄

Frameworks

### Change Control & Quality Gates

Change Control Process

CR Raised → Logged → Impact Assessment (Scope/Schedule/Cost/Quality/Risk) → Triage Level.

**Authority Levels:**

PM (<5% cost/schedule, no scope change).

CCB (5–15% impact or minor scope).

Steering Committee (>15% impact, strategic change).

Monthly Health Check

- Scope: on track vs WBS. Schedule: SPI > 0.9. Cost: CPI > 0.9.

- Quality: no Critical/Major defects. Resources: no key person dependency.

- Risks: Top 5 managed, no unaddressed Red. Stakeholders: healthy engagement.

🏛️

Governance

### Structure & Tailoring

Three-Tier Governance

- **Executive/Sponsor Layer:** Strategic decisions, funding.

- **Steering Committee:** Tactical decisions, major changes. Monthly cadence.

- **Project Operations:** Daily delivery, minor decisions, facilitated by PM.

Escalation Matrix (Max Response Time)

| Issue Type | 1st Level | 2nd Level | 3rd Level | Max Time |
|---|---|---|---|---|
| Tech Blocker | SA / Tech Lead | PM | Steering | 24h |
| Budget Overrun | PM | Finance → Sponsor | Executive | 48h |
| Schedule Slip >10% | PM | Steering | Executive | 1 week |
| Security Incident | Security → PM | Sponsor | Exec + CISO | 4h |

Tailoring Dimensions

Adapt to Team Size, Duration, Tech Novelty, Regulatory Scope, Budget, and Strategic Importance. Decisions MUST be documented in the **Tailoring Decision Document** during Initiating.

⚙️

Governance

### SDLC Adaptation

**Waterfall:** Formal gates, locked baselines, detailed EVM, heavy docs.

**Agile (Scrum):** Sprint-level plans, velocity metrics, lightweight docs, backlog reprioritization.

**Hybrid:** Strategic Waterfall planning & governance + Agile sprint execution. Cross-phase changes use CCB; sprint changes use backlog.

Document Ownership Matrix

| Document | PM Role | Collaborators |
|---|---|---|
| Project Charter, PM Plan, Baselines | Author | Sponsor, All Leads |
| Communications, Risk, Procurement Plans | Author | Stakeholders, Risk, Legal |
| Issue, Risk, Change, Decision Logs | Author | Team, CCB, Sponsor |
| Stakeholder Register | Co-Author | BA |
| BRD / SRS / Arch Doc | Reviewer | BA / SA |

📊

Reference

### Metrics & Anti-Patterns

Anti-Patterns (What NOT to do)

- ❌ Execute without signed Charter or baseline before stakeholder sign-off.

- ❌ Micromanage team (instead, remove blockers). Hide problems from sponsor.

- ❌ Report green when yellow/red. Treat EVM as theater.

- ❌ Skip lessons learned. Close without formal acceptance.

- ❌ Act as message relay; own problems you should escalate & vice versa.

KPIs

Schedule

SPI ≥ 0.95

Cost

CPI ≥ 0.95

Quality

Defect Leakage < 5%

📑

Reference

### Artifacts & Document Templates

Practical controls and curated working files for project delivery

The PM must guarantee these artifacts are complete, baselined, and distributed appropriately.

- **Project Charter:** Purpose, objectives, constraints, milestones, PM authority.

- **Stakeholder Register:** Influence/Interest, current/desired engagement strategies.

- **RACI Matrix:** Critical rule — only ONE "A" (Accountable) per row.

- **Weekly Status Report:** RAG status, KPIs, key accomplishments, top 5 risks/issues, decisions needed.

- **Steering Committee Pack:** Aggregated summary tailored for executives (60 min presentation).

- **Risk Register / Issue Log / Decision Log / Change Request:** Detailed lifecycle tracking items.

- **Project Closure Document:** Performance metrics vs baseline, sign-offs, benefits realization.

✅

**Proportionate document control:** Keep owner or approver, effective date, status, reporting period, and other control fields only where they support the document's purpose. Use the repository or DMS as the version-history source of truth instead of repeating blanket metadata in every file. Numbers must have units; decisions need approvers; action items need deadlines.

DOCXOwner · PM

#### Project Management Plan

Use to establish the integrated delivery approach, governance, baselines, controls, and tailoring.

Use whenThe project needs an agreed management and control baseline.

SupportsPMO · PO · BA · SA · Workstream leads

Read document→

DOCXOwner · PM

#### RAID Log

Use one working log to manage risks, assumptions, issues, and dependencies across workstreams.

Use whenUncertainty and blockers need owners, triggers, and actions.

SupportsAll workstream leads

Read document→

DOCXOwner · PM

#### One-page Status Report

Use for a concise reporting-period view of health, progress, decisions, risks, and next steps.

Use whenSponsors and governance forums need a decision-ready update.

SupportsSponsor · PMO · Workstream leads

Read document→

DOCXOwner · PM

#### Project Charter

Use to authorize the initiative and align purpose, outcomes, boundaries, governance, and PM authority.

Use whenA sponsor must formally initiate and empower the project.

SupportsSponsor · PO · BA · SA

Read document→

🏦 Handbook · PM Project Handbook v2.0 · Public Edition · Classification: PUBLIC

Aligned with PMBOK® 7th Ed. · Hybrid SDLC · SBV Circular 09/2020/TT-NHNN · © 2025
