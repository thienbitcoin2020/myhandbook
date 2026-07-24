# Release Manager / Deployment — full handbook chapter

> Extracted from the Power Home Handbook page `pages/deployment.html` (EN edition; a Vietnamese edition exists in the handbook app).

🏦 Commercial Bank · Vietnam · Production Runbook

## Interactive

## Deployment Runbook

Governed, step-by-step operational guide for software releases under the **Hybrid Water-Scrum-Fall** model — compliant with **SBV Circular 09/2020/TT-NHNN** and internal risk management policies.

Agile/Scrum · Development

Waterfall · Governance

CAB · Change Advisory

SBV · Regulatory

📖 Key terms & abbreviations on this page

New to release management? Skim these first — they appear throughout this runbook.

| Term | Meaning |
|---|---|
| CAB / ECAB | Change Advisory Board — the governance body that approves production changes; Emergency CAB for urgent fixes. |
| CR | Change Request — the approval package (reports, sign-offs, rollback plan) submitted to CAB. |
| RM | Release Manager — single point of accountability for the release lifecycle. |
| SoD | Segregation of Duties — dev, test and production release must be different people (SBV mandate). |
| DEV → SIT → UAT → PERF → SEC → PROD | The environment ladder a release climbs: Development, System Integration Test, User Acceptance, Performance, Security, Production. |
| PT / ST | Performance Testing (load/stress/soak) / Security Testing (DAST + pentest) — the two pre-CAB gates. |
| SAST / DAST | Static (on code) / Dynamic (on the running app) security scanning. |
| CVSS | Vulnerability severity score 0–10 — ≥ 7.0 is a hard release blocker here. |
| TPS · P95/P99 | Transactions Per Second; 95th/99th-percentile latency — performance KPIs. |
| Blue-green / Canary | Deploy strategies: switch between two identical environments / release to a small % first. |
| Rollback | Reverting to the previous working version when triggers fire (see the executable runbook below). |
| DoD | Definition of Done — the 8-item release checklist that must be complete before CAB. |
| GRC | Governance, Risk & Compliance system — where approvals and the deployment audit trail live. |
| Hypercare / 72h watch | Heightened monitoring right after go-live; dev on standby, reviews every 4 hours. |

📋

Section 1

### Governance & Hybrid SDLC Overview

Water-Scrum-Fall model · SBV Compliance Pillars

This bank operates a **Hybrid SDLC model** — colloquially referred to as Water-Scrum-Fall — which strategically combines the iterative velocity of Agile/Scrum for software execution with the structured oversight of Waterfall for governance and production releases.

🔭 Waterfall — Initiation

Formal business case, governance approval gates, budget allocation (Tờ trình), and regulatory sign-off before any development begins.

⚡ Agile — Execution

Iterative Sprints, continuous integration, feature team backlogs, and Scrum ceremonies to deliver working software incrementally.

🔐 Waterfall — Release

Sequential Security & Performance testing gates, CAB review, mandatory SBV audit checkpoints, and controlled production deployment.

🛡️ Vietnamese Banking Compliance Pillars

As mandated by SBV Circular 09/2020/TT-NHNN & internal policy

No single individual may hold conflicting roles across development, testing, and production deployment. Enforced via RBAC in GitHub, JIRA, and the production pipeline.

ℹ️

Developers **cannot** merge their own code to main. Testers must be independent. Release Managers hold sole authority to initiate production deployments.

| Role | Dev | Test | Release | PROD Access |
|---|---|---|---|---|
| Developer | ✅ | ❌ | ❌ | ❌ |
| QA / Tester | ❌ | ✅ | ❌ | ❌ |
| Release Manager | ❌ | ❌ | ✅ | Read-only |
| DevOps Engineer | ❌ | ❌ | Support | ✅ |

All systems handling financial transactions or customer PII must pass a full security assessment cycle before every production release:

- 1 SAST — automated scan on every commit via SonarQube + GitHub Advanced Security (CodeQL).

- 2 DAST — executed in SIT/UAT environment via OWASP ZAP.

- 3 Penetration Testing — performed by the independent Internal Security team.

- 4 Vulnerability Assessment Report — signed off before CAB submission.

⚠️

Any CVSS score ≥ 7.0 (High) is a **hard blocker**. The release cannot proceed until remediated and re-tested.

The CAB is the final governance authority before any change reaches production. Membership includes Technology Leadership, Risk Management, Compliance, and Business Owners.

📅

CAB Frequency

Weekly, every Tuesday at 14:00 ICT. Emergency CABs within 4 hours for P1.

📄

Change Request (CR)

Must include PT Report, Security Report, UAT sign-off, rollback plan, deployment timeline.

🗳️

Voting Quorum

Minimum 5 of 7 CAB members present. Unanimous approval required for Tier 1 systems.

⏳

Freeze Windows

No releases during year-end freeze (Dec 20–Jan 5) or SBV reporting periods.

🔭

Section 2

### Phase 1 — Discovery & Project Initiation

Waterfall governance · Planning & approval gates

📌

This phase follows strict **Waterfall sequencing**. No development begins until all governance artifacts are produced, reviewed, and formally approved by the Project Sponsor and Initiative Director.

📦 Key Governance Outputs

- 📊

- Business Case

- ROI analysis, strategic alignment, risk & benefit assessment

- 📃

- Project Charter

- Scope, objectives, timelines, and authority to proceed

- 🗓️

- Project Plan

- WBS, milestones, dependencies, resource allocation

- 💰

- Budget Proposal — Tờ trình

- Formal budget submission with capex/opex breakdown for BOD approval

👥 Key Roles & Responsibilities

🎯

Project Sponsor

Executive authority; secures funding; escalation point; BOD liaison.

💼

Business Owner

Defines business requirements; owns benefits realization; UAT sign-off.

🏛️

Initiative Director

Oversees program portfolio; strategic alignment; Phase Gate approvals.

📋

Project Manager

Day-to-day delivery; RAID log; stakeholder comms; status reporting.

🏗️

Enterprise Architect

Solution design; technology standards compliance; ARB review.

🔄 Initiation Phase Gate Sequence

- Gate 0 · Concept & Ideation

- Business pain point identified; initial scope defined; Executive Sponsor nominates Initiative Director.

- Gate 1 · Business Case Approved

- BOD or Delegated Authority reviews and approves the Business Case and Tờ trình. Budget is formally allocated.

- Gate 2 · Project Charter Signed

- PM appointed; Team assembled; Project Charter countersigned by Sponsor, Initiative Director, and Business Owner.

- Gate 3 · Architecture Review Board (ARB)

- Enterprise Architect presents solution design. ARB validates compliance with bank technology standards and SBV IT regulations.

- Gate 4 · Development Kick-off

- Project Plan approved. Scrum teams onboarded. JIRA Epic structure created. Sprint 0 begins.

⚡

Section 3

### Phase 2 — Implementation (Agile/Scrum)

Iterative sprints · Continuous integration · Living backlog

📅 Scrum Ceremonies

🗓️

Sprint Planning

Every 2 weeks · 4h max

Team selects backlog items and commits to a Sprint Goal based on capacity and velocity.

☀️

Daily Scrum

Daily · 15 min

What did I do? What will I do? Any blockers? SM owns impediment removal.

🔄

Backlog Refinement

Weekly · 2h

PO grooms stories; team estimates effort via Story Points; acceptance criteria clarified.

🎬

Sprint Review

End of Sprint · 2h

Working software demo to stakeholders. Business Owner accepts or returns the increment.

🔍

Retrospective

End of Sprint · 1.5h

Team identifies top 3 improvements. Action items tracked into next Sprint.

✅ Definition of Done (DoD) — Sprint Level

All criteria must be satisfied before a Story or Epic is considered complete.

- 1Code peer-reviewed and approved by minimum **2 reviewers** via GitHub Pull Request (no self-merge).

- 2Unit test coverage ≥ **85%** validated by SonarQube gate. No critical or blocking code smells.

- 3SAST scan passed — zero **High / Critical** severity findings in the feature branch.

- 4Functional tests passing in **SIT environment**; smoke tests passing in UAT environment.

- 5API contract tests passing (if applicable). No regression in existing test suites.

- 6Acceptance criteria validated and sign-off obtained from **Product Owner**.

- 7JIRA story updated to "Done", linked to the relevant commit SHA and test results artifact.

🌐 Environment Promotion Strategy

💻

DEV

🔬

SIT

👥

UAT

⚡

PERF

🔒

SEC

🚀

PROD

✅

DEV → SIT → UAT promotions handled by **CI/CD pipeline** (GitHub Actions). PERF and SEC require **Release Manager** authorization. PROD requires **CAB approval**.

🔐

Section 4

### Phase 3 — "Last Mile" Pre-Deployment

Strict Waterfall · Sequential gate-passing · CAB governance

🔴

**CRITICAL PATH:** Each step must complete sequentially. No step can be skipped or parallelized. Any blocker at any gate returns the release to backlog for remediation.

🔄 Release Pipeline — Status Tracker

Hover over each stage for details.

Step 1

📝

Backlog

Done

Release Mgr

Release Request created in JIRA. Scope locked. Branching strategy confirmed. Changelog drafted.

Step 2

⚡

Ready for PT

Done

Release Mgr

PERF environment provisioned. Test data loaded. Release artifact deployed and verified.

Step 3

📊

In Perf Testing

Done

Perf Tester

Load, stress & soak tests executed via Apache JMeter. TPS & P95 latency benchmarked.

Step 4

📋

PT Done

Done

Perf Tester

Performance Report signed. All KPIs met. Report attached to Change Request.

Step 5

🛡️

Ready for ST

Done

Release Mgr

SEC environment (isolated network) provisioned. Pentest scope confirmed with Security team.

Step 6

🔐

In Sec Testing

Active

Sec Tester

DAST + manual pentest in progress. OWASP Top 10 being executed. ETA: 3 days.

Step 7

📄

ST Done

Pending

Sec Tester

Security Report with CVSS scores generated. Any High/Critical blocks release. CISO sign-off required.

Step 8

📨

Ready for CAB

Pending

Release Mgr

Change Request submitted to CAB with all attachments: PT, ST Reports, UAT sign-off, rollback plan.

Step 9

🏛️

In CAB

Pending

CAB Members

CR presented to CAB. Risk score assessed. Business Impact Analysis reviewed. Approval vote taken.

Step 10

✅

CAB Done

Pending

CAB Chair

CAB approval recorded in GRC system. Deployment window confirmed. Stakeholders notified.

Step 11

🖥️

Ready for PROD

Pending

DevOps + Rel Mgr

Production deployed during approved maintenance window. Go/No-Go call before execution.

Step 12

🎉

Released

Pending

Release Mgr

Smoke test in PROD passed. Release note published. CS briefed. 72h post-release watch active.

👤 View by Role — Duties & Responsibilities

📋

Release Manager

Owns the end-to-end release lifecycle. Single point of accountability for production deployment.

Pre-Deployment Duties

- Create and manage the Release Request in JIRA with full scope definition and changelog.

- Coordinate environment provisioning with DevOps for PERF and SEC environments.

- Confirm artifact build integrity (SHA checksum) and deployment package completeness.

- Track gate-passing across all 12 pipeline steps; escalate blockers immediately.

- Compile the Change Request package: PT Report, Security Report, UAT sign-off, Impact Analysis, Rollback Plan.

- Present the Change Request at the CAB meeting; answer all board queries.

- Conduct the Go/No-Go call with DevOps, Business Owner, and on-call support before PROD.

- Publish release notes and notify all stakeholders upon successful deployment.

- Manage the 72-hour post-release watch period and coordinate the Lessons Learned session.

📌

The Release Manager is the **only role** authorized to transition the pipeline at Steps 1→2, 5→6, and 10→11. These require explicit sign-off entries in the GRC system.

📊

Performance Tester

Responsible for validating system throughput, latency, and stability under peak banking load.

Performance Testing Duties

- Confirm PERF environment topology matches PROD specifications (CPU, RAM, DB replication).

- Design and execute **Load Test**: simulate peak concurrent users from production metrics.

- Execute **Stress Test**: push system to 150% of expected peak load to identify breaking point.

- Execute **Soak Test**: sustain load for minimum 4 hours to detect memory leaks or connection pool exhaustion.

- Capture KPIs: TPS, P95/P99 latency, error rate, CPU/memory utilization.

- Validate all KPIs against SLA thresholds defined in the Performance Test Plan.

- Generate the **Performance Test Report** using the approved bank template, including Grafana/JMeter screenshots.

- Obtain sign-off from Performance Test Lead and submit report to Release Manager.

⚠️

If any KPI fails SLA thresholds (e.g., P95 latency > 2000ms for core banking APIs), the release is immediately blocked. Dev team notified for remediation before re-testing.

🔐

Security Tester

Independent security team responsible for identifying vulnerabilities before production exposure.

Security Testing Duties

- Review SAST findings from CI pipeline; confirm all High/Critical are remediated by Dev.

- Execute **DAST scan** using OWASP ZAP against the SEC environment.

- Conduct **manual penetration testing** covering OWASP Top 10 and banking-specific vectors.

- Assess **authentication & authorization** controls: MFA, RBAC enforcement, token expiry.

- Review **data encryption** at rest and in transit (TLS 1.2+, AES-256 for PII fields).

- Validate **API security**: rate limiting, input validation, SQL injection, XSS prevention.

- Score all findings using **CVSS v3.1**; classify by Severity and Business Impact.

- Generate the **Security Assessment Report**; obtain CISO sign-off before releasing to RM.

🚨

**Hard Blocker:** Any finding with CVSS ≥ 7.0 (High) or OWASP Top 10 Category A01–A05 is an automatic deploy blocker. The CISO has veto power over the CAB regarding security findings.

☑️ Release Definition of Done — Interactive Checklist

Click each item to check off. All 8 must be ✅ before requesting CAB approval.

⚡ Performance Tested

All SLA thresholds met. PT Report signed.

🔐 Security Tested

No High/Critical findings. CISO signed off.

👥 UAT Accepted

Business Owner sign-off obtained.

🗳️ CAB Approved

Change Request approved. Deployment window set.

📋 Rollback Plan Ready

Rollback procedure documented and tested.

📦 Artifact Verified

Build SHA verified. Deployment package validated.

📣 Ops Team Notified

Ops Handover Document issued. L1 Support briefed.

📊 Monitoring Configured

Dashboards live. Alerts tuned. On-call rotation set.

Release Readiness0 / 8 complete

🎉 All Release DoD criteria met — cleared for production deployment.

🚀

Section 5

### Phase 4 — Deployment & Commercialization

Production handover · Ops transition · Monitoring & support

🚀

**Milestone:** CAB has approved the Change Request. Deployment window confirmed. This phase covers the controlled production release and formal handover from Project Team to Operations & Customer Support.

📦 Key Deployment Outputs

- 📘

- Operations Handover Document

- System architecture, runbook, escalation matrix, and SLA definitions

- 📗

- User & Admin Guides

- End-user training materials, admin console guide, onboarding flow

- 📊

- Monitoring Dashboard

- Grafana/Datadog real-time metrics, alerting rules, SLO tracking

- 🚨

- Incident Management Process

- Severity classification, on-call rotation, escalation path, war-room protocol

- 📋

- Technical & End-User FAQs

- Known issues, workarounds, L1/L2/L3 triage guide

- 📈

- Deployment Execution Tracker

- Step-by-step deployment log, timestamps, post-release verification results

🤝 Project → Operations Handover

- Go/No-Go Call (T-2h)

- All parties (RM, DevOps, Business Owner, L1 Support Lead) confirm readiness on a bridge call.

- PROD Deployment Executed

- DevOps runs deployment pipeline in the approved maintenance window (typically 22:00–02:00 ICT).

- Smoke Test & Verification

- Release Manager executes smoke test checklist. Business Owner validates core transaction flows in PROD.

- Handover Meeting

- Formal handover with Ops Lead. All artifacts transferred. On-call duties activated.

- 72-Hour Watch Period

- Dev team on standby. Monitoring reviewed every 4 hours. P1/P2 triggers immediate war-room.

- Project Closure

- Lessons Learned session. PIR report published. Project formally closed in PPM tool.

🖥️ Executable Runbook — Production Deploy & Rollback

Step-by-step, reproducible procedure the on-call engineer follows during the maintenance window. Every step has an owner and a verification.

▶ Deploy sequence

- 1**Pre-flight (T-15m):** confirm CAB approval ID & window; freeze other changes; announce in #release channel. Verify: Go decision logged in GRC.

- 2**Backup:** snapshot DB + capture current image tag/commit SHA as ROLLBACK_REF. Verify: backup restorable, SHA recorded.

- 3**Progressive deploy:** deploy via **canary** (5% → 25% → 50% → 100%) or **blue-green** (deploy green, keep blue warm). Verify: health checks green at each step.

- 4**DB migration:** run backward-compatible migration first (expand); defer destructive changes (contract) to a later release. Verify: migration exit code 0.

- 5**Smoke test:** run the PROD smoke checklist (login, one core transaction, one integration). Verify: all pass; error rate & P95 within SLO.

- 6**Cutover & confirm:** route 100% traffic; Business Owner validates core flow. Verify: Go/No-Go call → "released"; publish release note.

↩️

**Rollback triggers (any → roll back immediately):** P1 incident; error rate > 2× baseline for 5 min; P95 latency > SLA on core APIs; failed smoke test; data-integrity anomaly. **Rollback owner:** Release Manager decides, DevOps executes.

◀ Rollback sequence

- 1**Declare:** RM declares rollback; open incident; notify CAB chair (retro-approval).

- 2**Revert app:** blue-green → switch traffic back to blue; canary → scale new version to 0, restore ROLLBACK_REF. Verify: old version serving.

- 3**Revert data (if needed):** apply down-migration or restore snapshot. Verify: reconciliation check passes. (Expand/contract avoids this in most cases.)

- 4**Confirm & postmortem:** re-run smoke test on restored version; log timeline; schedule blameless postmortem with Ops/SRE.

🔗

Runtime auto-rollback on SLO breach & incident lifecycle are owned by the Operations & SRE Runbook; this section covers the **planned** release/rollback decision.

📊 Monitoring & Incident Response Framework

🟢

P4 — Low

Cosmetic issue. No business impact. Response: Next business day.

🔵

P3 — Medium

Minor disruption. Workaround available. Response: 4 hours. L2 assigned.

🟡

P2 — High

Significant impact. No workaround. Response: 1 hour. L3 + Dev engaged.

🔴

P1 — Critical

Core banking down. Response: 15 min. War-room. CPTO & CRO notified. Rollback considered.

📁 Commercialization Artifacts Reference

The OHD is the primary artifact enabling the Ops team to independently manage the system post-deployment.

- A System architecture diagram and component inventory.

- B Infrastructure and deployment configuration (Kubernetes, Terraform manifests).

- C Database connection strings, secrets management (Vault paths — no plaintext credentials).

- D Monitoring thresholds and alert runbook.

- E Escalation matrix: L1 → L2 → L3 → Vendor support contacts.

- F Backup and recovery procedures with tested RTO/RPO targets.

Observability stack: **Grafana** for metrics, **Loki** for log aggregation, **Jaeger** for distributed tracing, and **PagerDuty** for on-call alerting.

📈

Business KPIs

Transaction success rate, daily active users, revenue impact metrics.

⚙️

System Health

CPU/memory/disk, pod restart count, DB connection pool utilization.

🌐

API Metrics

P95/P99 latency, error rate, throughput, API gateway quotas.

Time-stamped, immutable log of every action during deployment. Retained in GRC system for minimum 5 years per SBV compliance.

| Timestamp (ICT) | Action | Executed By | Status |
|---|---|---|---|
| 22:05 | Pre-deployment backup verified | DevOps L2 | Done |
| 22:10 | DB schema migration executed | DevOps L2 | Done |
| 22:22 | Application containers deployed | CI/CD Pipeline | Done |
| 22:35 | Smoke test executed | Release Manager | Done |
| 22:40 | Business Owner PROD verification | Business Owner | Pending |

📥

Library

### Deployment & DevOps Templates

Controlled release, rollback, pipeline and environment baselines

DOCXOwner · DevOps / Release Engineer

#### Deployment Runbook & Rollback Plan

Execute releases through verified steps and explicit rollback triggers.

SupportsQC · Security · SRE · SA

Read document→

DOCXOwner · DevOps / Release Engineer

#### Release Go / No-Go Checklist

Collect role evidence and record one accountable release decision.

SupportsQC · Security · SRE · SA

Read document→

DOCXOwner · DevOps / Release Engineer

#### CI/CD Pipeline Documentation

Document stages, gates, artifacts, permissions and failure behavior.

SupportsQC · Security · SRE · SA

Read document→

DOCXOwner · DevOps / Release Engineer

#### Environment Configuration Document

Compare environments without exposing secrets and control configuration drift.

SupportsQC · Security · SRE · SA

Read document→

🏦 Handbook · Deployment Runbook v2.0 · Public Edition · Classification: PUBLIC

Compliant with SBV Circular 09/2020/TT-NHNN & ISO 27001 · Approved by Technology Risk Committee · © 2025
