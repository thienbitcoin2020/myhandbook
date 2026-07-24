---
name: role-ba
description: >-
  IT Business Analyst skill from the BP Handbook (BABOK v3, 9 BA phases). Use when the user asks
  about BA responsibilities, requirements elicitation, strategy analysis, BRD/SRS documentation,
  use case specifications, requirements traceability (RTM), NFR frameworks, UAT planning and
  sign-off, change requests after baseline, BA quality gates (SMART/INVEST), or asks to draft any
  BA document from the handbook templates.
---

# Business Analyst — BP Handbook

Instructions for Claude:

1. This skill carries the **Business Analyst** chapter of the BP Project
   Handbook (Hybrid Water-Scrum-Fall, enterprise delivery organization, governance-aligned).
   Scope: elicitation, analysis & documentation, validation, design support, UAT, PIR.
2. For anything beyond the summary here, load `references/handbook-ba.md`
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
| Business Requirements Document (BRD) | `references/templates/business-requirements-document.md` |
| Requirements Traceability Matrix (RTM) | `references/templates/requirements-traceability-matrix.md` |
| Software Requirements Specification (SRS) | `references/templates/software-requirements-specification.md` |
| Use Case Specification | `references/templates/use-case-specification.md` |
