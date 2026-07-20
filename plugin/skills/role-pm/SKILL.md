---
name: role-pm
description: >-
  Project Manager skill from the Power Home Handbook (PMBOK 7, hybrid SDLC). Use when the user
  asks about PM responsibilities, the five process groups, the eight performance domains, project
  charters, management plans and baselines, RAID or risk management, stakeholder and
  communication cadence, RAG status reporting, EVM (CPI/SPI/EAC), change control and CCB,
  escalation, closing a project, or asks to draft a charter, PM plan, RAID log, or one-page
  status report.
---

# Project Manager — Power Home Handbook

Instructions for Claude:

1. This skill carries the **Project Manager** chapter of the Power Home Project
   Handbook (Hybrid Water-Scrum-Fall, Vietnamese commercial bank, SBV-regulated).
   Scope: initiating, planning, executing, monitoring & controlling, closing, governance.
2. For anything beyond the summary here, load `references/handbook-pm.md`
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
| Project Charter | `references/templates/project-charter.md` |
| Project Management Plan | `references/templates/project-management-plan.md` |
| RAID Log | `references/templates/raid-log.md` |
| One-page Status Report | `references/templates/status-report-one-page.md` |
