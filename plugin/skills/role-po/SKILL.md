---
name: role-po
description: >-
  Product Owner skill from the Power Home Handbook (Scrum Guide 2020, outcome-driven). Use when
  the user asks about PO responsibilities, product vision or roadmap, product discovery, backlog
  management or refinement, prioritization (MoSCoW, RICE, WSJF, Kano), writing epics and user
  stories with acceptance criteria, DoR/DoD, release and value metrics, or asks to draft a PRD,
  product vision board, or split an epic into stories.
---

# Product Owner — Power Home Handbook

Instructions for Claude:

1. This skill carries the **Product Owner** chapter of the Power Home Project
   Handbook (Hybrid Water-Scrum-Fall, Vietnamese commercial bank, SBV-regulated).
   Scope: vision & strategy, discovery, backlog, prioritization, Scrum events, release & value.
2. For anything beyond the summary here, load `references/handbook-po.md`
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
| Epic to User Stories | `references/templates/epic-to-user-stories.md` |
| Product Vision & Roadmap | `references/templates/product-vision-roadmap.md` |
| Product Requirements Document (PRD) | `references/templates/product-requirements-document.md` |
