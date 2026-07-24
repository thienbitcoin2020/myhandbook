# Operations & SRE — full handbook chapter

> Extracted from the BP Handbook page `pages/ops.html` (EN edition; a Vietnamese edition exists in the handbook app).

🛰️ Operations Runbook · Google SRE · ITIL 4 · DORA

## Operations & SRE

## Run, Reliability & Continuity

Reference for running the product in production — service reliability (SRE), observability, incident & problem management, disaster recovery and business continuity. Grounded in Google SRE, ITIL 4, and the DORA metrics, for a regulated enterprise environment.

SLO-driven

Observability

Blameless

DR / BCP

📖 Key terms & abbreviations on this page

New to operations & SRE? Skim these first — they appear throughout this runbook.

| Term | Meaning |
|---|---|
| SRE | Site Reliability Engineering — treating reliability as an engineering problem (Google). |
| SLI / SLO / SLA | Indicator (what we measure) / Objective (internal target) / Agreement (contractual promise). |
| Error budget | 100% − SLO = the unreliability you're allowed to "spend" on releases & change. |
| MTTD / MTTR | Mean Time To Detect / To Restore — how fast incidents are noticed and fixed. |
| IC | Incident Commander — single coordinator/decision-maker during an incident. |
| RCA · Postmortem | Root Cause Analysis; the blameless write-up after SEV1/SEV2 incidents. |
| RTO / RPO | Recovery Time Objective / Recovery Point Objective — restore speed & max data loss for DR. |
| DR · BCP · BIA | Disaster Recovery (IT systems) / Business Continuity Plan (the whole business) / Business Impact Analysis. |
| ITIL · ECAB | The service-management framework; Emergency Change Advisory Board for fast-track fixes. |
| CMDB | Configuration Management Database — the authoritative inventory of services & dependencies. |
| DORA · CFR | The four delivery metrics (deploy frequency, lead time, Change Failure Rate, MTTR). |
| Toil | Repetitive manual ops work that scales with the system — automate it away. |
| IaC / GitOps | Infrastructure as Code; managing infra changes through git for traceability. |

🧭

Section 01

### Overview

DevOps vs SRE vs Ops (ITIL)

| Discipline | Focus | Signature |
|---|---|---|
| DevOps | Culture & flow — dev + ops collaboration, automation | CI/CD, "you build it, you run it" |
| SRE | Reliability as engineering — SLOs, error budgets, reduce toil | SLI/SLO, error budget, automation |
| Ops (ITIL 4) | Service management — incident/problem/change, service value | Runbooks, CMDB, service desk |

ℹ️

This runbook blends all three: SRE reliability engineering + ITIL service management discipline needed for enterprise governance/audit.

🎯

Section 02

### SLI / SLO / SLA & Error Budget Google SRE

| Term | Definition | Example |
|---|---|---|
| SLI | A measured indicator of service health | % requests < 300ms & 2xx/3xx |
| SLO | Target for an SLI (internal goal) | 99.9% over 28 days |
| SLA | Contractual commitment (+ penalty) | 99.5% or credits owed |
| Error budget | 100% − SLO = allowed unreliability | 0.1% = ~43 min/month |

⚖️

**Error budget policy:** budget remaining → ship features; budget exhausted → freeze risky releases and focus on reliability. Balances velocity vs stability objectively.

🔭

Section 03

### Observability — 3 Pillars

- **LOGS**what happenedLoki/ELK

- **METRICS**how much / trendPrometheus/Grafana

- **TRACES**where time went, cross-serviceJaeger/OTel

- **Golden Signals** (SRE): Latency, Traffic, Errors, Saturation.

- Alert on **symptoms & SLO burn rate**, not every cause — reduce alert fatigue.

- Dashboards per service; correlation via OpenTelemetry; PagerDuty/OpsGenie for routing.

🚨

Section 04

### Incident Management

Severity matrix

| Sev | Impact | Response | Target |
|---|---|---|---|
| SEV1 | Critical outage / data loss / critical service unavailable | All-hands, war room, exec comms | Per incident policy |
| SEV2 | Major degradation, partial outage | On-call + SME, incident channel | Per incident policy |
| SEV3 | Minor / workaround exists | Normal on-call | next business day |

Incident lifecycle & roles

- **DETECT**alert

- **TRIAGE/DECLARE**assign IC + comms lead

- **MITIGATE**restore service

- **RESOLVE**confirm SLO met

- **POSTMORTEM**blameless RCA

Key roles: **Incident Commander (IC)** (coordinates, decides), **Comms Lead** (stakeholder updates), **Ops/SME** (fix). Security incidents → coordinate with Security & Compliance (regulatory breach-notification requirements).

🔬

Section 05

### Problem Management & RCA

**Incident** = restore service now. **Problem** = eliminate the root cause so it can't recur (ITIL).

- **Blameless postmortem** for every SEV1/SEV2 — focus on systems & process, not people.

- Techniques: **5 Whys**, Fishbone (Ishikawa), timeline reconstruction.

- Output: contributing factors + **action items** (owner, deadline) tracked to closure; feed the risk register.

📄

Postmortem template: summary · impact (users, $, SLO) · timeline · root cause · what went well/badly · action items. Share widely — learning > blame.

🔄

Section 06

### Change & Release Operations

| Change type (ITIL) | Path |
|---|---|
| Standard | Pre-approved, low-risk, automated. |
| Normal | CAB assessed & scheduled (see Deployment Runbook). |
| Emergency | ECAB fast-track for incident fixes; retro-approved. |

Deployment strategies to limit blast radius: **blue-green**, **canary**, **rolling**, **feature flags**; automated rollback on SLO breach.

↩️

**Rollback ownership (boundary with Deployment):** Ops/SRE owns **runtime auto-rollback** (triggered by SLO/error-budget breach); the Release Manager owns the **planned** rollback decision during a governed release window.

| Enabling practice | Detail |
|---|---|
| Configuration Mgmt / CMDB | Authoritative record of services, assets & dependencies (ITIL Service Configuration Mgmt) — drives impact analysis & change. |
| FinOps | Cloud cost visibility, unit economics, right-sizing & budget alerts alongside reliability. |
| SLA reporting | Periodic SLA/SLO attainment report to business & audit. |

📈

Section 07

### Capacity, Performance & Toil

- **Capacity planning:** forecast growth & peak; autoscaling policies; load/soak testing before peak events.

- **Toil reduction:** automate repetitive manual ops (SRE caps toil at ~50%); invest saved time in engineering reliability.

- **Performance:** track saturation & latency vs SLO; right-size resources for cost.

♻️

Section 08

### Disaster Recovery (DR)

**RTO** (Recovery Time Objective) = how fast to restore. **RPO** (Recovery Point Objective) = max acceptable data loss. Design DR strategy to meet the availability NFR (see SA Handbook).

| DR strategy | RTO / RPO | Cost |
|---|---|---|
| Backup & restore | hours–days / hours | $ |
| Pilot light | ~1h / minutes | $$ |
| Warm standby | minutes / seconds | $$$ |
| Multi-site active-active | ~0 / ~0 | $$$$ |

📘

Enterprise-critical systems need tested failover with defined RTO/RPO. **Test DR regularly** (governance requires evidence) — an untested DR plan is a liability, not an asset.

🏛️

Section 09

### Business Continuity (BCP)

DR restores IT systems; **BCP** keeps the business running (people, process, facilities). ISO 22301

- **BIA** (Business Impact Analysis): rank processes by criticality → set recovery priorities & RTO/RPO.

- Continuity strategies: alternate sites, manual workarounds, comms tree, crisis management team.

- Regular BCP exercises & tabletop drills; keep plans current with owners.

📓

Section 10

### Runbooks & Automation

Every recurring operational task & failure mode has a **runbook**: symptom → diagnosis steps → remediation → escalation. Prefer **automation** (self-healing, auto-remediation) over manual steps.

- Runbook catalog kept next to code / in the ops wiki; linked from alerts.

- IaC for reproducible environments; GitOps for change traceability.

- Chaos engineering (game-days) to validate resilience assumptions.

📊

Section 11

### DORA & Ops Metrics

DORA Four Keys DORA / Accelerate

Deployment Frequency

how often you deploy to prod

Lead Time for Changes

commit → running in prod

Change Failure Rate

failed changes ÷ total × 100%

MTTR

mean time to restore service

Availability

uptime ÷ total × 100% (vs SLO)

Error budget burn

consumed ÷ total budget × 100%

📟

Section 12

### On-call & Escalation

- Sustainable rotation (follow-the-sun or weekly); sane paging limits to avoid burnout.

- Clear **escalation matrix**: L1 on-call → L2 SME → L3 vendor/architect → management.

- Every page is **actionable** & linked to a runbook; non-actionable alerts get tuned out.

- Handover notes each shift; incident review weekly.

👥

Section 13

### Roles & RACI

| Activity | SRE/Ops | Dev | Release Mgr | SA | Security |
|---|---|---|---|---|---|
| Define SLO / error budget | A/R | C | I | C | I |
| Incident response (SEV1) | R (IC) | R | C | C | C |
| Postmortem & RCA | A | R | C | C | C |
| DR test & BCP | R | C | C | C | C |
| Production change approval | R | C | A | C | C |

📚

**Sources.** Google SRE (Site Reliability Engineering, The SRE Workbook — SLI/SLO, error budgets, toil, golden signals); ITIL 4 (incident/problem/change/service management); DORA / Accelerate (Forsgren, Humble, Kim — four key metrics); ISO 22301 (Business Continuity); NIST SP 800-34 (Contingency Planning). Aligned to applicable regulations.

📥

Library

### Operations & SRE Templates

Reliability targets, operating procedures, learning and recovery

DOCXOwner · SRE / Operations

#### SLI / SLO / SLA Document

Define indicators, objectives, windows and error-budget policy.

SupportsDev · SA · Security · PM

Read document→

DOCXOwner · SRE / Operations

#### Operational Runbook

Guide diagnosis, safe action, verification and escalation.

SupportsDev · SA · Security · PM

Read document→

DOCXOwner · SRE / Operations

#### Blameless Postmortem

Capture timeline, contributing conditions and verified corrective actions.

SupportsDev · SA · Security · PM

Read document→

DOCXOwner · SRE / Operations

#### Disaster Recovery Plan

Baseline recovery objectives, procedures, ownership and exercises.

SupportsDev · SA · Security · PM

Read document→

📘 Handbook · Operations & SRE Runbook v2.0 · Public Edition · Classification: PUBLIC

Aligned with Google SRE · ITIL 4 · DORA · ISO 22301 · applicable regulations · © 2025
