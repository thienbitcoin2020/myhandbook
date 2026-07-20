# QC / Tester — full handbook chapter

> Extracted from the Power Home Handbook page `pages/qc.html` (EN edition; a Vietnamese edition exists in the handbook app).

🧪 Internal Handbook · ISTQB CTFL v4.0 Aligned

## Quality Control (QC)

## Testing Process & Governance

Reference for the end-to-end QC / testing process following SDLC best practice and the ISTQB Certified Tester Foundation Level (CTFL) v4.0 (2023) syllabus. Terminology is kept strictly to v4.0 — legacy v3.1 terms are flagged where relevant.

ISTQB CTFL 4.0

7-Activity Test Process

Risk-Based

INTERNAL USE ONLY

📖 Key terms & abbreviations on this page

New to software testing? Skim these first — they appear throughout this handbook.

| Term | Meaning |
|---|---|
| ISTQB / CTFL | International Software Testing Qualifications Board / Certified Tester Foundation Level — the testing standard (v4.0) this handbook follows. |
| QA vs QC | Quality Assurance = process-oriented prevention; Quality Control = product-oriented defect detection (testing serves QC). |
| Defect / Failure | Defect = a flaw in the work product; Failure = the wrong behaviour it causes at runtime. |
| EP / BVA | Equivalence Partitioning / Boundary Value Analysis — core black-box design techniques (Section 06). |
| Coverage | % of items (statements, branches, requirements) exercised by tests. |
| RTM | Requirements Traceability Matrix — proves every requirement has test coverage. |
| SIT / UAT / OAT | System Integration Testing / User Acceptance Testing / Operational Acceptance Testing — later test levels & environments. |
| Entry / Exit criteria | Conditions to start / to declare complete a test level (exit ≈ testing's Definition of Done). |
| Severity vs Priority | Technical impact of a defect vs business urgency to fix it — independent scales. |
| Regression / Confirmation | Re-testing that changes broke nothing / verifying a specific fix works. |
| DRE | Defect Removal Efficiency — % of defects caught before release. |
| KLOC | Thousand Lines Of Code — a size unit used in defect density. |
| TDD / BDD · CI | Test-/Behaviour-Driven Development; Continuous Integration — where automated tests run on every change. |

🧭

Section 01

### Overview

QA vs QC vs Testing

| Term | Focus | Nature | Scope |
|---|---|---|---|
| Quality Assurance (QA) | Adherence to proper processes — build quality in | Preventive · process-oriented | Provides confidence that quality requirements will be fulfilled |
| Quality Control (QC) | The product / work products — detect defects | Detective · product-oriented | Includes test activities that support achieving appropriate quality |
| Testing | Evaluate quality & find defects in a test object | Static + Dynamic | A major, but not the only, part of QC |

ℹ️

Per ISTQB CTFL v4.0: QA is process-oriented and preventive; QC (which testing supports) is product-oriented. Testing is not equal to QA — testing is one of the quality control activities.

Test Objectives (v4.0 §1.1)

- Evaluate work products (requirements, user stories, designs, code).

- Trigger failures and find defects.

- Ensure required coverage of a test object.

- Reduce the level of risk of inadequate software quality.

- Verify whether specified requirements have been fulfilled (verification).

- Verify compliance with contractual, legal & regulatory requirements.

- Provide information to stakeholders for informed decisions.

- Build confidence in the quality of the test object.

- Validate the test object works as users & stakeholders expect (validation).

The 7 Testing Principles (v4.0 §1.3)

- 1**Testing shows the presence, not the absence, of defects.**

- 2**Exhaustive testing is impossible** — use risk & priorities instead.

- 3**Early testing saves time and money** (shift-left).

- 4**Defects cluster together** — a small number of modules hold most defects.

- 5**Tests wear out** v4.0 term — repeating the same tests stops finding new defects (was "pesticide paradox" in v3.1).

- 6**Testing is context dependent.**

- 7**Absence-of-errors is a fallacy** — a defect-free system can still be unusable / fail to meet needs.

🔁

Section 02

### ISTQB Test Process — 7 Activities

The test process is contextual, but v4.0 defines seven main activities. They are largely sequential but may overlap or iterate.

1**TEST PLANNING**

2**TEST MONITORING & CONTROL**runs continuously across all activities

3**TEST ANALYSIS**what to test

4**TEST DESIGN**how to test

5**TEST IMPLEMENTATION**

6**TEST EXECUTION**

7**TEST COMPLETION**

| Activity | Input | Main tasks | Output / work products |
|---|---|---|---|
| 1. Test Planning | Test policy & strategy, project context, product/project risks | Define objectives, scope, approach, estimates, schedule & criteria | Test plan, entry & exit criteria |
| 2. Monitoring & Control | Test plan, actual progress & results | Compare progress vs plan, check exit criteria, take control actions | Test progress reports, control directives |
| 3. Test Analysis | Test basis (requirements, user stories, design, risk analysis) | Analyse basis, evaluate testability, identify & prioritise test conditions | (Prioritised) test conditions, defects found in the test basis |
| 4. Test Design | Test conditions, test basis | Design test cases & sets, identify coverage items & test data needs, design environment | (Prioritised) test cases, coverage items, test data & environment requirements |
| 5. Test Implementation | Test cases, environment design | Create/order test procedures & suites, build test data, set up environment, create automated tests | Test procedures, suites, test data, ready environment, execution schedule |
| 6. Test Execution | Test suites, ready environment | Run tests, compare actual vs expected, log outcomes, report defects, re-test | Test logs, defect reports, documented results |
| 7. Test Completion | Test results & logs | Confirm defects closed, finalise & archive testware, hand over, capture lessons learned | Test summary report, action items, finalised testware, lessons learned |

🔍

Section 03

### Static Testing

Static vs Dynamic Testing

| Aspect | Static Testing | Dynamic Testing |
|---|---|---|
| Code executed? | No — examine the work product | Yes — run the software |
| Techniques | Reviews (manual) & static analysis (tools) | Black-box, white-box, experience-based |
| Finds | Defects directly (e.g. in requirements) | Failures caused by defects |
| Value | Cheapest early defect detection (shift-left) | Validates actual runtime behaviour |

Review Types — increasing formality

| Type | Formality | Key characteristics |
|---|---|---|
| Informal review | None | No defined process, no documentation; main purpose = detect defects cheaply. |
| Walkthrough | Low | Led by the author; knowledge sharing, gaining consensus, finding defects. |
| Technical review | Medium | Performed by technically qualified peers; reach consensus & make decisions on a technical problem. |
| Inspection | High | Most formal; follows a defined process with metrics, rules & checklists; led by a moderator (not the author). |

Review Process (v4.0 §3.2.1) & Roles

- **PLANNING**define scope, effort, criteria

- **REVIEW INITIATION**distribute work product & materials

- **INDIVIDUAL REVIEW**each reviewer analyses, logs anomalies

- **COMMUNICATION & ANALYSIS**discuss anomalies, decide status/actions

- **FIXING & REPORTING**author fixes; results & metrics reported

| Role | Responsibility |
|---|---|
| Manager | Decides what is reviewed, allocates time/budget/resources. |
| Author | Creates & fixes the work product under review. |
| Moderator (facilitator) | Ensures effective meetings, mediates, keeps the review objective. |
| Scribe (recorder) | Collates & records anomalies and decisions. |
| Reviewer | Performs reviews; may be domain experts, peers, or stakeholders. |
| Review leader | Takes overall responsibility for the review; decides who is involved & when. |

Static Analysis & Shift-Left

Static analysis uses **tools** to examine code or models without executing them — enforcing coding standards (**linting**), detecting security weaknesses (**SAST**), and analysing complexity, data flow & control flow.

⬅️

**Shift-left:** reviews + static analysis run as early as possible (often automated in the CI pipeline), so defects are caught in requirements/design/code before dynamic testing — the cheapest place to fix them.

🪜

Section 04

### Test Levels & the V-Model

In a sequential SDLC the **V-Model** pairs each development phase with a corresponding test level; test design begins in parallel with each development phase (verification & validation).

Requirements→Acceptance Testing (UAT)

System Spec→System Testing

Architecture→Integration Testing

Detailed Design→Component (Unit) Testing

Coding

left = build / verify basisright = test level

Test Levels (v4.0 §2.2) — objective & owner

| Level | Objective | Typical owner |
|---|---|---|
| Component / Unit | Test individual components in isolation against detailed design/code. | Developers |
| Component Integration | Test interfaces & interactions between integrated components. | Developers |
| System | Test the behaviour & capabilities of the whole system/product (functional & non-functional). | Independent testers / QC |
| System Integration | Test interfaces between the system and other systems / external services. | QC / integration testers |
| Acceptance (UAT) | Establish confidence & validate fitness for use / readiness for deployment. | Business users / customer |

ℹ️

v4.0 splits integration into **component integration** and **system integration**. Acceptance forms include **User Acceptance (UAT)**, **Operational Acceptance (OAT)**, **Contractual & Regulatory Acceptance**, and **Alpha & Beta** testing.

🧬

Section 05

### Test Types

A **test type** groups test activities against specific quality characteristics. Test types can be performed at any test level. (Distinct from test design techniques in Section 06.)

| Type | What it checks | Examples |
|---|---|---|
| Functional | What the system does — behaviour vs functional requirements. | Business rules, transactions, calculations |
| Non-functional | How well the system behaves — quality characteristics (ISO/IEC 25010). | Performance efficiency, Security, Usability (interaction capability), Compatibility, Reliability |
| White-box (structural) | Coverage based on the internal structure / code. | Statement / branch coverage of a module |
| Change-related | Verify the effect of changes. | Confirmation (re-test): confirm a fixed defect is resolved. Regression: confirm changes caused no unintended side-effects. |

🎯

Section 06

### Test Design Techniques (v4.0)

Black-box Techniques (v4.0 §4.2)

| Technique | Idea & short example |
|---|---|
| Equivalence Partitioning (EP) | Divide input into partitions treated the same; one value per partition. Age: 0–17 invalid, 18–65 valid, 66+ senior → test one value from each. |
| Boundary Value Analysis (BVA) | Test at partition boundaries (2-value or 3-value BVA). Amount range 1–100 → test 0, 1, 100, 101. |
| Decision Table Testing | Model combinations of conditions → actions. Loan: credit score × income → approve / refer / reject. |
| State Transition Testing | Model states & valid/invalid transitions/events. ATM card: Idle → Card Inserted → PIN OK → Menu; wrong PIN ×3 → Blocked. |

White-box Techniques (v4.0 §4.3)

| Technique | Idea & short example |
|---|---|
| Statement testing & coverage | Exercise executable statements. Coverage = statements executed ÷ total statements × 100%. |
| Branch testing & coverage | Exercise every branch (each outcome of a decision). Coverage = branches executed ÷ total branches × 100%. v4.0 uses branch coverage — v3.1 used "decision coverage" |

Experience-based Techniques (v4.0 §4.4)

| Technique | Idea & short example |
|---|---|
| Error Guessing | Anticipate likely mistakes/defects. Empty input, division by zero, negative amount, duplicate submit. |
| Exploratory Testing | Simultaneous learning, test design & execution — often session-based (time-boxed charter). |
| Checklist-based Testing | Test against a checklist of conditions. Security checklist, accessibility checklist, UI checklist. |

⚠️

**v4.0 note:Use Case Testing** is a legacy v3.1 technique and is **not** classified under black-box techniques in v4.0 — do not list it there.

⚙️

Section 07

### SDLC Integration & Test Approach

| SDLC model | Test approach |
|---|---|
| Waterfall (sequential) | V-Model: each dev phase paired with a test level; formal gates & documented test basis; test design starts early against each phase. |
| Agile (iterative) | Continuous testing each iteration; whole-team quality ownership; automation-heavy; guided by the Testing Quadrants (below). |
| Hybrid / Water-Scrum-Fall | Waterfall governance & phase gates (planning, UAT, release/CAB) wrapped around Agile sprint delivery — the model used in this handbook. |

Testing Quadrants (Marick; popularised by Crispin & Gregory)

| Orientation | SUPPORT THE TEAM | CRITIQUE THE PRODUCT |
|---|---|---|
| BUSINESS FACING | Q2Functional tests, Story tests, Examples, Prototypes (auto+man) | Q3Exploratory, Usability, UAT (manual) |
| TECHNOLOGY FACING | Q1Unit / Component tests (automated) | Q4Performance, Load, Security, Reliability (tools) |

Testing Quadrants

Shift-Left Testing

Move test activities **earlier** in the lifecycle: review requirements & designs, run static analysis in CI, write tests before/with code (TDD/BDD), and design tests during analysis. Directly supports Principle 3 — early testing saves time and money.

⚠️

Section 08

### Risk-Based Testing

Product Risk vs Project Risk (v4.0 §5.2)

| Risk category | Definition | Examples |
|---|---|---|
| Product risk (quality risk) | Risk that the product may fail to satisfy legitimate needs — related to the test object. | Functional defects, security holes, poor performance, data corruption |
| Project risk | Risk around management & control of the project. | Schedule slip, resource/skill gaps, unstable environment, supplier delays |

Risk Analysis & Prioritisation

**Risk level = Likelihood × Impact.** Flow: identify risks → assess (likelihood × impact) → assign risk level → prioritise test effort → mitigate via testing → monitor.

| LIKELIHOOD / IMPACT → | Low | Medium | High |
|---|---|---|---|
| High | Medium | High | Very Hightest first, deep coverage |
| Med | Low | Medium | High |
| Low | Low | Low | Mediumtest later / lighter |

Risk prioritisation matrix

Higher-risk areas get **earlier, deeper and more frequent** testing; lower-risk areas get lighter coverage. Risk also drives regression scope.

Banking / Financial Context

🏦

In a regulated bank, product risk is dominated by **security**, **transaction & data integrity**, and **regulatory compliance** (SBV Circular 09/2020/TT-NHNN, ISO 27001, PCI-DSS). These areas are **security-critical & high-impact** → prioritised for the deepest test coverage, mandatory security testing, and performance testing under peak load.

📑

Section 09

### QC Deliverables by Phase

| Deliverable | Produced in | Purpose |
|---|---|---|
| Test Strategy | Planning (org-level) | Long-term, organisation-wide testing approach & standards. |
| Test Plan | Planning (project/level) | Scope, objectives, approach, schedule, entry/exit criteria for a project or level. |
| Test Cases / Scripts | Analysis & Design | Conditions, inputs, expected results (+ automated scripts & test procedures). |
| RTM — Requirement Traceability Matrix | Analysis & Design | Bi-directional traceability: requirement ↔ test case ↔ defect; proves coverage. |
| Test Data | Implementation | Prepared & masked data enabling execution (positive/negative/boundary). |
| Defect Report | Execution | Documented anomaly: steps, severity, priority, status. |
| Test Summary Report | Completion | Results vs plan, coverage, residual risks, quality assessment for release decision. |

🗄️

**Test data & environment management:** provision representative data with **masking/anonymisation** of production data (never real PII in non-prod — see Security / PDPD); keep SIT/UAT config close to PROD. **Automation:** follow the test pyramid (many unit → fewer integration → few E2E) and run automated checks in CI (see Deployment gates).

🚦

Section 10

### Entry / Exit Criteria + DoR / DoD

**Entry criteria** = preconditions to start a test activity/level. **Exit criteria** (the **Definition of Done** for testing in v4.0) = conditions to declare it complete. In Agile, **DoR** gates a story into a sprint and **DoD** gates it out.

| Test level | Entry criteria (sample) | Exit criteria (sample) |
|---|---|---|
| Component / Unit | Code compiles; unit test env ready | Target statement/branch coverage met; unit tests pass; no open blocker |
| Integration | Components unit-tested; interfaces available | Interface cases pass; no open critical integration defect |
| System | Build deployed to SIT; test data & cases ready | Planned cases executed; coverage met; no open Critical/Major defect |
| Acceptance (UAT) | System testing exit met; UAT env & business users ready | Acceptance cases pass; business sign-off; residual risk accepted |

DoR vs DoD (Agile)

| Definition of Ready (DoR) | Definition of Done (DoD) |
|---|---|
| Story is clear, estimated & INVEST-compliant; acceptance criteria defined; testable; dependencies known. | Code reviewed & merged; unit + functional tests pass; acceptance criteria met; no open critical defect; docs updated. |

🐞

Section 11

### Defect Lifecycle

NEW

→

ASSIGNED

→

OPEN / IN-PROGRESS

→

FIXED

→

READY-FOR-RETEST

→

RETEST

→CLOSED

→REOPENED→(back to Assigned)

**Alternate outcomes from triage / retest:** REJECTED(not a valid defect / not reproducible / works as designed)DEFERRED(valid but postponed to a later release)

| State | Meaning |
|---|---|
| New | Defect logged, awaiting triage. |
| Assigned | Triaged & assigned to a developer. |
| Open / In-Progress | Developer is analysing / fixing. |
| Fixed | Fix implemented, awaiting verification. |
| Ready-for-Retest | Fix delivered to the test build; queued for confirmation testing. |
| Retest | Tester runs confirmation (re-test) + relevant regression. |
| Closed | Retest passed — defect resolved. |
| Reopened | Retest failed — returned to development. |
| Rejected | Not a valid defect (duplicate, not reproducible, works as designed). |
| Deferred | Valid but postponed to a future release. |

Severity vs Priority Matrix

**Severity** = technical impact on the system. **Priority** = business urgency to fix. They are independent.

| Severity ↓ / Priority → | High priority | Low priority |
|---|---|---|
| High severity | Fix immediately — core payment flow crashes. | Crash only on a rare legacy config — fix, but scheduled. |
| Low severity | Fix soon — wrong bank name / legal text on landing page. | Backlog — minor cosmetic misalignment on an internal screen. |

ℹ️

Typical severity scale: **Critical → Major → Moderate → Minor**. Typical priority scale: **High → Medium → Low**.

👥

Section 12

### Roles & RACI

**R** = Responsible · **A** = Accountable · **C** = Consulted · **I** = Informed. (Exactly one **A** per activity.)

| Activity | PO | BA | Dev | QC / Tester | Test Lead | Scrum Master |
|---|---|---|---|---|---|---|
| Test strategy & planning | C | C | C | R | A | I |
| Requirements / story review | C | A | C | R | C | I |
| Test case / script design | I | C | C | R/A | C | I |
| Test execution | I | I | C | R | A | I |
| Defect triage & fixing | C | C | R | R | A | C |
| UAT sign-off | A | R | I | C | C | I |
| Release / quality gate decision | A | C | C | C | R | C |

ℹ️

RACI is a tailoring aid, not an ISTQB artefact — adapt ownership to your org. In some teams the **Test Lead** is accountable for the quality-gate recommendation while the **PO** owns the final go/no-go.

📊

Section 13

### QC Metrics / KPIs

Test Coverage

covered items ÷ total items × 100%

Defect Density

defects ÷ size (KLOC / module)

Defect Leakage / Escape Rate

defects in production ÷ total defects × 100%

Pass Rate

test cases passed ÷ executed × 100%

Test Execution Progress

executed ÷ planned × 100%

Defect Removal Efficiency (DRE)

found before release ÷ (before + after release) × 100%

| Metric | Formula | Reads as |
|---|---|---|
| Test Coverage | covered ÷ total × 100 | How much of the basis is exercised (higher = better). |
| Defect Density | defects ÷ size | Defects per unit of size; spot fragile modules. |
| Defect Leakage / Escape Rate | prod defects ÷ total × 100 | QC effectiveness (lower = better). |
| Pass Rate | passed ÷ executed × 100 | Build stability. |
| Test Execution Progress | executed ÷ planned × 100 | Where we are vs the plan. |
| Defect Removal Efficiency (DRE) | before ÷ (before + after) × 100 | % of defects caught before release (higher = better). |

📚

**Source:** Aligned with the **ISTQB® Certified Tester Foundation Level (CTFL) Syllabus v4.0 (2023)**. Terminology intentionally excludes superseded v3.1 terms (e.g. "pesticide paradox", "decision coverage", Use Case Testing as a black-box technique). Testing Quadrants credited to Brian Marick, popularised by Lisa Crispin & Janet Gregory.

🏦 Handbook · QC Testing Handbook v1.0 · Internal Use Only · Classification: CONFIDENTIAL

Aligned with ISTQB® CTFL v4.0 (2023) · Hybrid SDLC · SBV Circular 09/2020/TT-NHNN · © 2025
