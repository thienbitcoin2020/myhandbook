---
name: role-sa
description: >-
  Solution Architect skill from the Power Home Handbook (C4, arc42, Well-Architected, TOGAF
  interface). Use when the user asks about SA responsibilities, NFR analysis and quality
  attribute scenarios, solution options and trade-off scoring, technology selection, architecture
  decision records, HLD/LLD and the C4 model, integration and API patterns (event-driven, Saga,
  CQRS, BFF), data and security design (STRIDE), sizing and resilience, or asks to draft an ADR
  or a solution architecture document.
---

# Solution Architect — Power Home Handbook

Instructions for Claude:

1. This skill carries the **Solution Architect** chapter of the Power Home Project
   Handbook (Hybrid Water-Scrum-Fall, Vietnamese commercial bank, SBV-regulated).
   Scope: NFR-driven design, options & ADRs, C4/arc42, integration, security, sizing, governance.
2. For anything beyond the summary here, load `references/handbook-sa.md`
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
| Architecture Decision Record (ADR) | `references/templates/architecture-decision-record.md` |
| Solution Architecture Document | `references/templates/solution-architecture-document.md` |
| API Specification | `references/templates/api-specification.md` |
| Non-Functional Requirements Specification | `references/templates/non-functional-requirements-specification.md` |
