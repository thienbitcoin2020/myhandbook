# Product Owner — full handbook chapter

> Extracted from the Power Home Handbook page `pages/po.html` (EN edition; a Vietnamese edition exists in the handbook app).

🎯 Internal Handbook · Scrum Guide 2020 Aligned

## Product Owner (PO)

## Role, Discovery & Value Delivery

Reference for the end-to-end Product Owner role across the SDLC — grounded in the Scrum Guide 2020, extended with modern product management (discovery, outcome-driven) and hybrid PMBOK 7 practice. Scrum-standard terms are tagged Scrum 2020; everything else is flagged with its source Extended.

Scrum Guide 2020

Outcome-driven

Dual-track Discovery

INTERNAL USE ONLY

📖 Key terms & abbreviations on this page

New to product ownership? Skim these first — they appear throughout this handbook.

| Term | Meaning |
|---|---|
| PBI | Product Backlog Item — any unit of work in the Product Backlog (story, fix, spike…). |
| AC | Acceptance Criteria — the testable conditions that make a story correct. |
| DoR / DoD | Definition of Ready (fit to enter a Sprint) / Definition of Done (fit to release). |
| MVP / MMP | Minimum Viable Product (smallest thing to learn from) / Minimum Marketable Product (smallest thing worth releasing). |
| PRD | Product Requirements Document — a lightweight spec for larger/regulated initiatives. |
| MoSCoW · RICE · WSJF · Kano | Prioritization frameworks — see Section 07 for formulas & when to use which. |
| CoD | Cost of Delay — the economic loss per unit of time an item is delayed. |
| Velocity | Average story points a team completes per Sprint — a forecasting aid, never a target. |
| WIP | Work In Progress — items started but not finished; lower WIP = faster flow. |
| NPS / CSAT | Net Promoter Score / Customer Satisfaction — customer-sentiment metrics. |
| BDD / GWT | Behaviour-Driven Development / Given-When-Then — scenario style for acceptance criteria. |
| SAFe · Nexus · LeSS | Frameworks for scaling Scrum across multiple teams (extensions, not core Scrum). |

🧭

Section 01

### Overview

Who the Product Owner is Scrum 2020

Per the Scrum Guide 2020, the **Product Owner is accountable for maximizing the value of the product** resulting from the work of the Scrum Team. The PO is one of the Scrum Team's **three accountabilities** (Product Owner, Scrum Master, Developers) — the 2020 guide replaced the old "three roles" wording, and there are **no sub-teams or hierarchies**.

The PO is also accountable for effective **Product Backlog management**:

- Developing and explicitly communicating the **Product Goal**.

- Creating and clearly communicating Product Backlog items.

- Ordering Product Backlog items.

- Ensuring the Product Backlog is transparent, visible and understood.

ℹ️

The Product Owner is **one person, not a committee**. They may delegate the work (e.g. to a BA) but remain accountable. For the PO to succeed, the whole organization must respect their decisions.

PO vs BA vs Product Manager vs Project Manager

| Aspect | Product Owner | Business Analyst | Product Manager | Project Manager |
|---|---|---|---|---|
| Primary focus | Maximize product value; own the backlog | Elicit & analyse requirements | Product strategy, market, business outcomes | Deliver a project: scope, time, cost, risk |
| Horizon | Product (continuous) | Requirements / change | Product lifecycle & market | Project (temporary, time-boxed) |
| Decides | What & when (backlog order) | Recommends; does not own priority | Direction, roadmap, pricing, go/no-go | Schedule, resources, dependencies |
| Standard | Scrum Guide 2020 | BABOK v3 | Product management | PMBOK 7 |

💡

In smaller orgs the **Product Manager ≈ Product Owner**. In Scrum, only the **PO** is defined — BA, Product Manager, and Project Manager are organizational roles, not Scrum accountabilities. See the BA and PM handbooks for their boundaries.

PO in Team Topology Scrum 2020

**One Product Owner · one Product Backlog · one Product Goal.** A single PO may serve multiple Developers or several teams working on the same product, but there remains exactly one ordered Product Backlog and one Product Goal at a time.

**1 Product Owner** 1 Product Backlog 1 Product Goal

- Team A

- Team B

- Team C

(share one backlog)

⚠️

Scaling note Extended · SAFe / Nexus: multi-team scaling frameworks may add area/feature POs, but the single-accountable-PO principle per product still holds.

🔭

Section 02

### Product Vision & Strategy

Vision → Product Goal → Backlog

- **PRODUCT VISION**aspirational — why the product exists

- **PRODUCT GOAL**concrete future state — the long-term targetScrum 2020

- **PRODUCT BACKLOG**the "what" that fulfils the Product GoalScrum 2020

- **SPRINT GOAL**single objective for this SprintScrum 2020

- **INCREMENT**a valuable step toward the Product GoalScrum 2020

**Product Goal Scrum 2020:** describes a future state of the product; lives in the Product Backlog; is the Scrum Team's long-term objective. The team focuses on **one Product Goal at a time** — fulfil (or abandon) it before taking the next. It is the **commitment for the Product Backlog**.

Product Vision tools Extended

**Elevator pitch Geoffrey Moore:**

For [target customer] who [need/opportunity], the [product name] is a [product category] that [key benefit / reason to buy]. Unlike [primary competitor/alternative], our product [key differentiation].

**Vision Board Roman Pichler:** Vision · Target Group · Needs · Product · Business Goals — a one-page canvas to align the team on the "why".

Strategy tools Extended

| Tool | Source | Use |
|---|---|---|
| Business Model Canvas | A. Osterwalder | 9 blocks (value prop, segments, channels, revenue, cost…) — map how the product creates & captures value. |
| Value Proposition Canvas | Strategyzer | Fit between customer jobs/pains/gains and product pain-relievers/gain-creators. |
| North Star Metric | Amplitude / Sean Ellis | The single metric that best captures the core value delivered to customers; aligns the team. |

Product Roadmap Roman Pichler · Cagan

The roadmap is the bridge between the **Product Goal** and the **Backlog** — an **outcome-based**, not feature-committed, plan. Prefer a **Now / Next / Later** (or theme-based) view over date-locked Gantt roadmaps.

| Horizon | Commitment | Content |
|---|---|---|
| Now | High confidence | In-progress outcomes tied to the current Product Goal & sprints. |
| Next | Medium | Validated opportunities queued after Now. |
| Later | Low / directional | Themes & bets still in discovery — no date promises. |

🎯

Each roadmap item states a target **outcome/metric**, not a feature list. Communicate it as intent, not a contract — protects against the feature-factory anti-pattern (§13).

🔬

Section 03

### Product Discovery Extended

Dual-Track Agile Jeff Patton / Marty Cagan

Discovery and Delivery run **continuously in parallel**, not as sequential phases. Discovery decides what is worth building (valuable, usable, feasible, viable); Delivery builds validated items well.

**DISCOVERY**

- interviews

- prototypes

- experiments

- validated ideas

**DELIVERY**

- build

- test

- ship validated backlog items

Opportunity Solution Tree Teresa Torres

**DESIRED OUTCOME** (a measurable business/user outcome)

- Opportunity

- Solution

- Experiment

(test to validate the solution)

- Solution

(ideas that address the opportunity)

- Opportunity

- Opportunity

(unmet needs / pains / desires)

Keeps every solution traceable to a desired **outcome** — prevents jumping to features without a problem.

Validate before building

**Assumption mapping:** surface the riskiest assumptions across desirability, viability, feasibility, usability; test the riskiest first.

**Hypothesis format:** We believe [capability] for [user] will achieve [outcome]. We'll know we're right when [measurable signal].

| Artifact | Purpose |
|---|---|
| MVP (Minimum Viable Product) | Smallest thing that lets you learn validated info about customers with least effort. |
| MMP (Minimum Marketable Product) | Smallest feature set worth releasing to market to deliver real value. |
| Prototype | Throwaway artifact (paper → clickable) to test a solution cheaply before build. |

🔍

**Continuous discovery Teresa Torres:** regular (ideally weekly) touchpoints with users. Stay in the **problem space** (understand the need) before rushing to the **solution space** (design the answer).

🤝

Section 04

### Stakeholder & Market

Stakeholder Mapping — Power / Interest Grid Mendelow

|  | Low interest | High interest |
|---|---|---|
| High power | Keep satisfied | Manage closely (key players) |
| Low power | Monitor (minimal effort) | Keep informed |

Map each stakeholder, then tailor engagement cadence & message. The PO is the single point of accountability for backlog decisions but must actively manage stakeholder expectations.

Market & Competitive Analysis

**SWOT:** Strengths · Weaknesses (internal) × Opportunities · Threats (external). Feed competitive teardown, market signals (win/loss, churn reasons, support trends, analytics) into backlog and Product Goal.

Negotiating & Aligning on Conflicting Priorities

- Make trade-offs **explicit**: "if we do X now, Y moves — which outcome matters more?"

- Anchor on the **Product Goal & outcomes**, not on who shouts loudest.

- Use an **objective prioritization framework** (Section 07) so the decision is defensible, not political.

- Make **Cost of Delay** visible to reframe "everything is urgent".

- Say **"not now"**, not "no" — order the backlog rather than reject outright.

🗂️

Section 05

### Product Backlog Management

The Product Backlog Scrum 2020

An **emergent, ordered list** of what is needed to improve the product — the **single source of work** for the Scrum Team. The PO orders it. Its commitment is the **Product Goal**.

**DEEP Roman Pichler / Mike Cohn** — a healthy backlog is:

| Letter | Property | Meaning |
|---|---|---|
| D | Detailed appropriately | Near-term items fine-grained; far-term items coarse. |
| E | Estimated | Items have a relative size to support ordering & forecasting. |
| E | Emergent | Continuously evolves as learning happens. |
| P | Prioritized | Ordered by value/risk so the top is ready to pull. |

Product Backlog Refinement Scrum 2020

| Aspect | Detail |
|---|---|
| What | The act of breaking down & further defining backlog items into smaller, more precise items; adding detail (description, order, size). |
| Goal | Keep the top of the backlog "ready" so Sprint Planning is fast and low-risk. |
| Cadence | Ongoing activity — not a formal Scrum event. Often time-boxed to ~10% of Developers' capacity common guideline. |
| Who | PO + Developers collaborate; Developers who do the work do the sizing. |

Story Mapping Jeff Patton

| BACKBONE → | [User activity 1] | [User activity 2] | [User activity 3] | (left→right = journey) |
|---|---|---|---|---|
| WALKING | [must] | [must] | [must] | Release 1 (walking skeleton: thin end-to-end) |
| SKELETON | [should] | [should] |  | Release 2 |
| (slices) | [could] |  |  | Later |

(top→bottom = priority)

**Backbone** = the sequence of user activities; **walking skeleton** = the thinnest slice that works end-to-end; **slices** = horizontal cuts that become releases. Great for visualising an MVP against the whole journey.

📝

Section 06

### Requirement Artifacts

Backlog Item Hierarchy

- **EPIC**large body of work

- **FEATURE**deliverable slice of an epic

- **USER STORY**small, valuable increment

- **TASK**technical step to build a story

⚠️

Only **"Product Backlog item"** is a Scrum Guide term. **Epic / Feature / Story / Task** are tooling & scaling constructs Jira / SAFe — useful, but not part of the Scrum Guide 2020.

User Story + INVEST Bill Wake

**Format:** As a [role], I want [goal], so that [benefit].

| INVEST | A good story is… |
|---|---|
| Independent | Minimal overlap/dependency with other stories. |
| Negotiable | A conversation starter, not a rigid contract. |
| Valuable | Delivers value to a user or customer. |
| Estimable | Clear enough for Developers to size. |
| Small | Fits comfortably within a Sprint. |
| Testable | Has verifiable acceptance criteria. |

Acceptance Criteria — two styles

| Given-When-Then (Gherkin) | Rule-based (checklist) |
|---|---|
| Given a logged-in customer with a verified account,When they transfer ≤ their balance,Then the transfer succeeds and both balances update. | • Transfer amount must be > 0 and ≤ balance.• Blocked/frozen accounts cannot transfer.• Both balances update atomically.• Audit log entry is written. |

Use **Given-When-Then** for behaviour/scenarios (pairs well with BDD); **rule-based** for lists of business rules/constraints.

NFRs, Constraints & PRD

**Non-functional requirements & constraints** must be **measurable**: performance (P95 latency), security, availability (SLA%), usability, compliance (SBV / ISO 27001). Capture as backlog items, story AC, or global Definition of Done.

**PRD / product spec hybrid / PMBOK 7:** for larger or regulated initiatives, a lightweight PRD (problem, goals, non-goals, success metrics, scope, risks) complements — but does not replace — an emergent backlog.

Story Splitting Lawrence · Wake

When a story is too big for one Sprint (fails INVEST "Small"), split it **vertically** (a thin end-to-end slice of value), never horizontally by layer (UI/DB).

| Pattern | Split by… |
|---|---|
| Workflow steps | Each step of a process as its own story. |
| Business rules | Happy path first; edge-case rules later. |
| Data variations | One data type/channel first, add others. |
| Operations (CRUD) | Create first; read/update/delete separately. |
| SPIDR | Spikes · Paths · Interfaces · Data · Rules. |

🔪

Each split slice must still be independently **valuable & testable** — a slice that only "does the backend" is not a valid story. The Scrum Master facilitates splitting in refinement.

📥

Reference

### Product Document Templates

Curated working files for product direction and backlog readiness

DOCXOwner · PO

#### Epic to User Stories

Use to split an approved epic into thin, valuable, testable stories with clear acceptance criteria.

Use whenAn epic is entering refinement and delivery preparation.

SupportsBA · Dev · QC · UX

Read document→

DOCXOwner · PO

#### Product Vision & Roadmap

Use to align the product problem, target outcomes, success measures, priorities, and roadmap horizons.

Use whenA product or major initiative needs a shared direction.

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

📊

Section 07

### Prioritization Extended

| Framework | Formula / mechanism | Best when |
|---|---|---|
| MoSCoW DSDM | Must · Should · Could · Won't (this time) | Scope negotiation for a time-boxed release. |
| RICE Intercom | (Reach × Impact × Confidence) ÷ Effort | Comparing many features with rough data. |
| WSJF SAFe | Cost of Delay ÷ Job SizeCoD = User-Business Value + Time Criticality + Risk Reduction / Opportunity Enablement | Sequencing for maximum economic value. |
| Kano Noriaki Kano | Basic (must-be) · Performance · Excitement (delighters) | Deciding satisfaction impact of features. |
| Value vs Effort | 2×2: Quick wins · Big bets · Fill-ins · Time sinks | Fast visual triage of a small set. |

Worked example — RICE

Feature: One-tap bill payment Reach = 8,000 users/quarter Impact = 2 (massive=3, high=2, medium=1, low=.5) Confidence = 80% = 0.8 Effort = 4 person-months RICE = (8000 × 2 × 0.8) ÷ 4 = 3,200 → compare against other features

Cost of Delay & context

**Cost of Delay Don Reinertsen:** the economic loss per unit time an item is delayed — the core of WSJF. **Opportunity cost:** the value of the best alternative not chosen when you commit capacity.

🎯

**Context-driven — no one-size-fits-all:** MoSCoW for release scoping, RICE for data-rich comparison, WSJF for economic sequencing (SAFe), Kano for satisfaction analysis, Value/Effort for a quick triage. The framework informs the decision; the PO still owns the order.

🎲

Section 08

### Estimation & Sizing Extended

ℹ️

The Scrum Guide 2020 does **not** prescribe story points or any sizing method. It states the **Developers who will do the work** are responsible for sizing. Everything below is common practice, not Scrum canon.

| Approach | What it is | Trade-off |
|---|---|---|
| Story points | Relative size (complexity + effort + uncertainty), often Fibonacci. | Fast, team-relative; meaningless across teams. |
| Ideal days | Absolute effort in uninterrupted days. | Intuitive; falsely precise, invites over-commitment. |
| #NoEstimates Zuill / Duarte | Slice to similar-small items; forecast by count & throughput instead of points. | Less estimation waste; needs disciplined slicing. |

Techniques

- **Planning Poker** Grenning / Cohn — simultaneous reveal of card estimates; discuss outliers, re-vote.

- **T-shirt sizing** — XS/S/M/L/XL for coarse, early, or epic-level sizing.

- **Affinity estimation** — silently group many items by relative size on a wall; fast for large batches.

Velocity — use & abuse not in Scrum Guide

| ✔ Use it for | ✘ Do NOT use it for |
|---|---|
| Forecasting one team's likely capacity next Sprint / release. | Comparing or ranking different teams. |
| Spotting the team's own trend over time. | A target or performance KPI (Goodhart's law → gaming). |
| Sizing a release forecast with a range. | Individual performance measurement. |

Velocity = avg. story points completed (meeting DoD) per Sprint — a planning aid, never a goal.

🔁

Section 09

### Scrum Events — PO's Part Scrum 2020

The **Sprint** is the container for all events. The four formal events are Sprint Planning, Daily Scrum, Sprint Review, and Sprint Retrospective. **Refinement is an ongoing activity, not an event.**

| Event | PO does | PO does NOT |
|---|---|---|
| Sprint Planning | Propose how the product could increase value; ensure top items are understood; help craft the Sprint Goal; answer scope questions. | Assign tasks, dictate "how", or decide how much the Developers take — Developers select the work. |
| Daily Scrum | Be reachable for questions; may attend only if working on the Sprint Backlog. | Run it, take status, or turn it into a report-to-PO meeting — it's for the Developers. |
| Sprint Review | Invite stakeholders; discuss progress toward the Product Goal; gather feedback; adapt the backlog together. | Treat it as a one-way demo or a formal sign-off gate — 2020 makes it a working session, not an approval stage. |
| Sprint Retrospective | Participate as a team member to improve how the team works. | Skip it, or use it to assign blame. |
| Backlog Refinementongoing, not an event | Bring & order items, clarify intent, split with the team. | Write every story alone or push estimates onto Developers. |

🚦

Section 10

### Definition of Ready / Definition of Done

Definition of Ready (DoR) practice, NOT in Scrum Guide

A shared checklist that a backlog item should meet **before** it is pulled into a Sprint. Typical criteria:

- Clear, INVEST-compliant, small enough for one Sprint.

- Acceptance criteria defined & testable.

- Dependencies known; sized by Developers; no open blocking question.

⚠️

DoR is a **helpful practice, not Scrum**. If enforced rigidly it becomes a mini-waterfall stage-gate — keep it lightweight.

Definition of Done (DoD) Scrum 2020

A **formal description of the state of the Increment** when it meets the quality measures required for the product. It is the **commitment for the Increment**. If a backlog item does not meet the DoD, it **cannot be released or presented** at Sprint Review and returns to the backlog.

**Owned by:** the **Scrum Team** (if the organization has a standard, that is the minimum the team must follow).

DoD vs Acceptance Criteria

|  | Acceptance Criteria | Definition of Done |
|---|---|---|
| Scope | Per one backlog item | Applies to every Increment / item |
| Answers | "Is this story functionally correct?" | "Is the increment releasable quality?" |
| Examples | Specific behaviours & business rules | Code reviewed, tests pass, security scan clean, docs updated, no Critical defect |
| Owner | PO defines, team refines | Scrum Team (or org standard) |

✅

An item is truly "done" only when it satisfies **its Acceptance Criteria AND the Definition of Done**. See the QC Testing Handbook for how testing evidences DoD.

🚀

Section 11

### Release & Value Delivery

Release Planning & the Increment Scrum 2020

An **Increment** is a concrete stepping stone toward the Product Goal; each Increment is additive and must meet the **Definition of Done** to be usable. Releasing is **decoupled from the Sprint**: an Increment may be delivered at any point — multiple Increments can be released within a single Sprint.

Release strategies Extended

| Strategy | What / when |
|---|---|
| MVP release | Ship the smallest valuable slice to learn from real usage before scaling scope. |
| Phased / staged rollout | Release to a growing % of users (canary → ramp) to limit blast radius. |
| Feature flags / toggles | Deploy code dark; enable per cohort; decouple deploy from release; instant rollback. |

Coordinate the mechanics with the Deployment Runbook (CAB, rollback) and quality gates with the QC Testing Handbook.

Dependencies & Risk — PO view

- Sequence high-risk / high-uncertainty items **early** to buy learning.

- Make cross-team dependencies visible on the story map / roadmap; order to unblock.

- Frame delivery risk in terms of **Cost of Delay** and value at risk, for governance decisions (with PM).

📈

Section 12

### Product Metrics / KPIs

🎯

**Outcome > Output.Output** = what we ship (features, story points). **Outcome** = the change in user/business behaviour that value creates. A PO optimizes for **outcomes**; shipping more is not the goal.

Product frameworks Extended

| Framework | Components |
|---|---|
| AARRR — Pirate Metrics Dave McClure | Acquisition · Activation · Retention · Referral · Revenue (funnel). |
| HEART Google / Kerry Rodden | Happiness · Engagement · Adoption · Retention · Task success — each with Goals-Signals-Metrics. |
| North Star Metric Amplitude | The single metric capturing core delivered value (e.g. "weekly active payers"). |

Value metrics — formulas

Adoption

users who used feature ÷ eligible users × 100%

Retention rate

((users at end − new) ÷ users at start) × 100%

NPS

% promoters (9–10) − % detractors (0–6)

CSAT

satisfied responses ÷ total responses × 100%

Flow / delivery metrics — formulas

| Metric | Definition / formula |
|---|---|
| Velocity | avg story points done per Sprint — forecasting aid (one team). |
| Cycle time | Time from work started → work finished. |
| Lead time | Time from request created → delivered (customer-perceived). |
| Throughput | Items completed per unit time (e.g. stories/week). |
| Little's Law | Avg Cycle Time = WIP ÷ Throughput — lower WIP → faster flow. |

🚫

Section 13

### Anti-Patterns & Pitfalls

| Anti-pattern | Why it hurts | Do instead |
|---|---|---|
| PO-proxy | A "PO" without real authority relays decisions → slow, distorted. | Empower one accountable PO who can decide. |
| Backlog = to-do list | Unordered dumping ground; everything "high"; stale items. | Ordered by value/risk, emergent, tied to the Product Goal. |
| PO as "scribe" (ghi chép viên) | Merely transcribes stakeholder requests; no judgement on value. | Own outcomes; say "not now"; validate with discovery. |
| Output obsession (feature factory) | Success measured by #features / velocity, not impact. | Optimize for outcomes; measure value delivered. |
| No empowerment | PO must escalate every decision → bottleneck, no ownership. | Org respects PO decisions (Scrum Guide requirement). |
| Absentee PO | Unavailable → Developers guess, rework grows. | Be reachable; collaborate continuously. |
| Backlog detailed too far ahead | Big up-front spec = waterfall in disguise; waste on churn. | Detail near-term; keep far-term coarse & emergent. |

📚

**Sources.Scrum Guide 2020** (Schwaber & Sutherland) — accountabilities, Product Goal, commitments, events, DoD. **PMBOK Guide 7th Ed.** (PMI) — hybrid/PRD context. Extended practices, cited in-line: Teresa Torres (Opportunity Solution Tree, continuous discovery), Jeff Patton (Story Mapping, dual-track), Marty Cagan (product discovery), Bill Wake (INVEST), Roman Pichler / Mike Cohn (DEEP, Vision Board), Geoffrey Moore (elevator pitch), A. Osterwalder / Strategyzer (Business Model & Value Proposition Canvas), DSDM (MoSCoW), Intercom (RICE), SAFe (WSJF), Don Reinertsen (Cost of Delay), Noriaki Kano (Kano model), Woody Zuill / Vasco Duarte (#NoEstimates), James Grenning / Mike Cohn (Planning Poker), Dave McClure (AARRR), Google / Kerry Rodden (HEART), Amplitude / Sean Ellis (North Star Metric), Mendelow (Power/Interest grid).

🏦 Handbook · Product Owner Handbook v2.0 · Internal Use Only · Classification: CONFIDENTIAL

Aligned with Scrum Guide 2020 · Hybrid PMBOK 7 · SBV Circular 09/2020/TT-NHNN · © 2025
