---
name: role-deployment
description: >-
  Release Manager / Deployment skill from the BP Handbook (Hybrid Water-Scrum-Fall release
  governance and regulatory compliance). Use when the user asks about the 12-step release
  pipeline, CAB and ECAB procedure, segregation of duties, performance and security test gates,
  the release Definition of Done checklist, the executable deploy and rollback runbook
  (blue-green, canary), the policy-defined hypercare watch, or operations handover.
---

# Release Manager / Deployment — BP Handbook

Instructions for Claude:

1. This skill carries the **Release Manager / Deployment** chapter of the BP Project
   Handbook (Hybrid Water-Scrum-Fall, enterprise delivery organization, governance-aligned).
   Scope: governance & SoD, release pipeline, CAB, release DoD, deploy & rollback, hypercare.
2. For anything beyond the summary here, load `references/handbook-deployment.md`
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
| Deployment Runbook & Rollback Plan | `references/templates/deployment-runbook-rollback-plan.md` |
| Release Go / No-Go Checklist | `references/templates/release-go-no-go-checklist.md` |
| CI/CD Pipeline Documentation | `references/templates/ci-cd-pipeline-documentation.md` |
| Environment Configuration Document | `references/templates/environment-configuration-document.md` |
