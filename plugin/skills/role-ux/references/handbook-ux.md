# UX/UI Designer — full handbook chapter

> Extracted from the Power Home Handbook page `pages/ux.html` (EN edition; a Vietnamese edition exists in the handbook app).

🎨 Internal Handbook · Double Diamond · NN/g · WCAG 2.2

## UX/UI Designer

## Research to Pixel-Perfect Handoff

Reference for the end-to-end product design role — from user research to accessible, buildable UI. Grounded in the Double Diamond, Nielsen Norman heuristics, WCAG 2.2, Atomic Design, and platform guidelines (Material Design / Apple HIG). For internal banking tools, efficiency & accessibility come first.

Double Diamond

Design System

Usability-tested

WCAG 2.2 AA

📖 Key terms & abbreviations on this page

New to product design? Skim these first — they appear throughout this handbook.

| Term | Meaning |
|---|---|
| UX / UI | User Experience (is it usable & useful?) / User Interface (how it looks & behaves). |
| IA | Information Architecture — organising & labelling content so users can find it. |
| Persona · Journey map | Data-driven user archetype; the end-to-end map of their experience & pain points. |
| JTBD · HMW | Jobs-To-Be-Done ("when…, I want…, so I can…") / How-Might-We reframing questions. |
| Lo-fi / Hi-fi | Low/high fidelity — sketchy wireframes vs pixel-accurate mockups. |
| Design tokens | Named design values (color.primary, spacing.md) shared between design & code. |
| NN/g | Nielsen Norman Group — source of the 10 usability heuristics. |
| SUS | System Usability Scale — 10-question score 0–100 (≥68 is above average). |
| WCAG · POUR · a11y | Web Content Accessibility Guidelines; its 4 principles (Perceivable, Operable, Understandable, Robust); "accessibility". |
| Contrast ratio | Text-vs-background legibility measure — ≥ 4.5:1 for normal text (AA). |
| CTA | Call To Action — the primary button/link you want the user to click. |
| DesignOps | The operations of design at scale — versioning, governance, token pipeline. |

🧭

Section 01

### Overview

UX vs UI

|  | UX (Experience) | UI (Interface) |
|---|---|---|
| Answers | Is it usable & useful? | How does it look & feel? |
| Output | Research, personas, journeys, flows, wireframes | Visual design, components, design system |
| Measured by | Task success, error rate, SUS | Brand adherence, accessibility score |

Double Diamond — the process spine Design Council

- Diverge**DISCOVER**research & empathy

- Converge**DEFINE**problem statement

- Diverge**DEVELOP**ideate & wireframe

- Converge**DELIVER**prototype, test & handoff

🏦

Internal bank tools: optimize for **efficiency** (task speed, fewer clicks, low cognitive load) over delight. Accessibility (WCAG AA) is not optional.

🔎

Section 02

### Discover / Research

| Type | Method |
|---|---|
| Generative (explore) | User interviews, contextual inquiry, diary study. |
| Evaluative (assess) | Usability test, A/B test, heuristic evaluation. |
| Quantitative | Surveys, analytics (GA4/Clarity/Hotjar), funnels. |
| Competitive | Feature matrix, UX teardown of analogues. |

👥

**~5 users** uncover ~85% of usability issues (Nielsen). Research is done with the BA & PO — align on the problem, not just the UI.

🎯

Section 03

### Define / Synthesis

- **Affinity mapping** — cluster raw research into themes.

- **Personas** — data-driven archetypes (goals, frustrations, behaviours) — not assumptions.

- **Journey map** — stages · actions · thoughts · emotions · pain points · opportunities.

- **Problem statement:** [Persona] needs [goal] because [insight]; reframe as **How Might We…**

- **JTBD:** When [situation], I want [motivation], so I can [outcome].

🗂️

Section 04

### Information Architecture & User Flows

- **IA:** organise & label content so users find it — validate with **card sorting** & **tree testing**; output a sitemap.

- **User flows:** step-by-step path to complete a task — rectangles (screens), diamonds (decisions), arrows.

- Always design **happy path + error paths + edge cases**.

Login

Auth ok?

yes

Dashboard

Transfer

Valid?

yes

Confirm

Success

no

Error + retry

no

Inline error

📐

Section 05

### Wireframing

| Fidelity | Use for |
|---|---|
| Lo-fi (sketch/grayscale blocks) | Validate layout & flow fast — don't polish. |
| Mid-fi (grayscale, real content) | Test navigation & IA. |
| Hi-fi (color, real components) | Visual review & handoff. |

**Start lo-fi**; raise fidelity only as much as the validation needs. Cheap to change early.

🖌️

Section 06

### UI Design Principles

| Principle | Apply |
|---|---|
| Hierarchy | Size/weight/color guide the eye to what matters first. |
| Proximity & consistency | Group related items; same component = same behaviour everywhere. |
| Feedback & affordance | Every action has a visible response; controls look interactive. |
| Typography | 2–3 typefaces; type scale; body line-height ~1.5; contrast ≥ 4.5:1. |
| Spacing | 4/8px grid — 4,8,12,16,24,32,48… consistently. |
| Touch targets | ≥ 44×44px (HIG) / 48dp (Material); ≥ 8px gap. |

🧩

Section 07

### Design System Atomic Design · Brad Frost

- **ATOMS**Button

- **MOLECULES**Form field

- **ORGANISMS**Header

- **TEMPLATES**Layout

- **PAGES**Full screen

- **Foundations:** color tokens, typography, spacing, icons, grid, motion.

- **Design tokens:** color.primary.500, spacing.md=16px, radius.card=8px — single source of truth shared with dev.

- **Components + patterns + guidelines:** usage dos/don'ts, accessibility notes per component.

🧠

A design system reduces cognitive load & rework — reuse before inventing. Keep it versioned & governed.

**DesignOps:** version the system (semver), a contribution/governance model, and a single-source token pipeline synced to code. **Content design / UX writing:** a voice-&-tone guide + microcopy patterns (labels, errors, empty states) are part of the system — words are UI.

✨

Section 08

### Interaction & States

**Design every state**, not just the happy default:

DefaultHoverActive/PressedFocusedDisabledLoadingEmptyError

- **Motion:** purposeful, natural easing (ease-out enter, ease-in exit), 100–300ms; respects reduced-motion.

- **Empty states** = illustration + explanation + CTA. **Loading** = skeleton for content, spinner for short waits.

- **Forms:** labels above inputs, inline validation on blur, errors say the fix, one clear primary CTA.

🧪

Section 09

### Usability Testing

Test a prototype with **5–8 participants** matching the persona; give tasks (non-leading); observe, don't rescue.

**Cadence:** continuous discovery — small tests **every sprint/2 weeks** on the riskiest flow, plus a benchmark round before major releases. Don't batch all testing to the end.

| Metric | Definition |
|---|---|
| Task completion rate | % who finish the task successfully. |
| Error rate | Errors per task. |
| Time on task | How long to complete. |
| SUS | 10-item usability score 0–100 (≥68 above average). |

🔟

Section 10

### Heuristic Evaluation Nielsen 10

1 Visibility of system status2 Match real world3 User control & freedom4 Consistency & standards5 Error prevention6 Recognition not recall7 Flexibility & efficiency8 Aesthetic & minimalist9 Recover from errors10 Help & documentation

Rate each finding's severity 0 (none) → 4 (catastrophe). A fast, cheap expert review to catch issues before user testing.

♿

Section 11

### Accessibility (WCAG 2.2) W3C

**POUR** principles — target **Level AA**:

| Principle | Means |
|---|---|
| Perceivable | Alt text, captions; colour not the only cue; contrast ≥ 4.5:1 (normal) / 3:1 (large). |
| Operable | Full keyboard access, no keyboard trap, visible focus, skip links, adequate targets. |
| Understandable | Clear language, predictable behaviour, error identification + suggestion. |
| Robust | Works with assistive tech (screen readers, semantic HTML/ARIA). |

**New in WCAG 2.2 (2023)** — check these explicitly: 2.4.11 Focus Not Obscured 2.5.8 Target Size ≥ 24×24px 3.3.7 Redundant Entry 3.3.8 Accessible Authentication.

Tools: axe DevTools, Lighthouse, WAVE, VoiceOver/NVDA. Accessibility is verified by QC too.

🤝

Section 12

### Design-to-Dev Handoff

- All screens + **all states** designed; responsive breakpoints specified (mobile/tablet/desktop).

- Spacing/sizing annotated; color tokens (hex + token name); type specs; icons as SVG.

- Animation specs (duration, easing, trigger); component behaviour & edge cases documented.

- Handoff via Figma Dev Mode / Storybook; walk the team through it — the file is **communication with dev**, not artwork.

🔗

Design tokens map to the front-end system; align with the SA on component architecture & the QC team on visual/interaction acceptance.

👥

Section 13

### Roles & RACI

| Activity | UX/UI | PO | BA | Dev | QC |
|---|---|---|---|---|---|
| User research | R | A | C | I | I |
| IA / flows / wireframes | A/R | C | C | C | I |
| UI design & design system | A/R | C | I | C | I |
| Usability & a11y testing | R | C | I | C | C |
| Design acceptance at build | A | C | I | R | R |

📚

**Sources.** Design Council (Double Diamond); Nielsen Norman Group (10 usability heuristics, ~5-user testing); WCAG 2.2 / W3C (POUR, AA); Brad Frost (Atomic Design); Google Material Design 3 & Apple HIG (platform guidelines); SUS (John Brooke); JTBD (Clayton Christensen / Tony Ulwick).

📥

Library

### UX/UI Working Templates

Research, structure, design governance, validation and handoff

DOCXOwner · UX/UI Designer

#### User Persona & Customer Journey Map

Connect evidence-backed personas to stages, touchpoints and opportunities.

SupportsPO · BA · Dev · QC

Read document→

DOCXOwner · UX/UI Designer

#### Information Architecture & Wireframe Brief

Baseline sitemap, user flow, content inventory and wireframe scope.

SupportsPO · BA · Dev · QC

Read document→

DOCXOwner · UX/UI Designer

#### Design System / UI Style Guide

Govern tokens, components, states, accessibility and versioning.

SupportsPO · BA · Dev · QC

Read document→

DOCXOwner · UX/UI Designer

#### Usability Test Plan & Report

Plan tasks and participants, then record evidence and prioritized findings.

SupportsPO · BA · Dev · QC

Read document→

DOCXOwner · UX/UI Designer

#### Design Handoff Specification

Give delivery teams one traceable source for screens, states and design QA.

SupportsPO · BA · Dev · QC

Read document→

🏦 Handbook · UX/UI Designer Handbook v2.0 · Internal Use Only · Classification: CONFIDENTIAL

Aligned with Double Diamond · NN/g · WCAG 2.2 AA · Atomic Design · © 2025
