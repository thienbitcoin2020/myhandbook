---
name: role-qc
description: >-
  QC / Testing skill from the BP Handbook (ISTQB CTFL v4.0). Use when the user asks about the
  seven-step test process, test levels (unit/integration/system/UAT) and the V-model, test types,
  test design techniques (equivalence partitioning, boundary values, decision tables, state
  transitions), risk-based testing, entry/exit criteria, the defect lifecycle and severity vs
  priority, QC deliverables and metrics, or asks to draft a test plan for a feature or release.
---

# QC / Tester — BP Handbook

Instructions for Claude:

1. This skill carries the **QC / Tester** chapter of the BP Project
   Handbook (Hybrid Water-Scrum-Fall, enterprise delivery organization, governance-aligned).
   Scope: test process, levels & types, design techniques, risk-based testing, defect lifecycle.
2. For anything beyond the summary here, load `references/handbook-qc.md`
   — it is the full chapter, extracted verbatim from the handbook page.
3. Follow the handbook's glossary policy: keep standard terms in English
   (Sprint, Backlog, DoD, RTM, SLO, CAB, RACI...); answer prose in the
   user's language (Vietnamese or English).
4. Never invent policy that contradicts the chapter. If the handbook is
   silent, say so and answer from the referenced framework instead (clearly labelled).
5. When the user asks to draft a document this role owns, load the matching
   template below, keep its structure and numbering, fill what the user
   provided, and leave every `[ĐIỀN: ...]` placeholder you cannot fill.
   Templates are Vietnamese-first by design — keep them so unless asked.

## Templates

| Template | File |
|---|---|
| Test Strategy & Test Plan | `references/templates/test-strategy-test-plan.md` |
| Test Case Specification | `references/templates/test-case-specification.md` |
| Defect Report | `references/templates/defect-report.md` |
| Test Summary Report | `references/templates/test-summary-report.md` |
| UAT Plan | `references/templates/uat-plan.md` |
