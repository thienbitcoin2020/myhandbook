---
name: role-ops
description: >-
  Operations & SRE skill from the Power Home Handbook (Google SRE, ITIL 4, DORA). Use when the
  user asks about SLI/SLO/SLA and error budgets, observability and golden signals, incident
  management and severity levels, blameless postmortems and RCA, change and release operations,
  capacity and toil, disaster recovery (RTO/RPO) and business continuity, runbooks and
  automation, DORA metrics, on-call and escalation, or asks to draft a postmortem.
---

# Operations & SRE — Power Home Handbook

Instructions for Claude:

1. This skill carries the **Operations & SRE** chapter of the Power Home Project
   Handbook (Hybrid Water-Scrum-Fall, Vietnamese commercial bank, SBV-regulated).
   Scope: SLO & error budget, observability, incident & problem, DR/BCP, DORA, on-call.
2. For anything beyond the summary here, load `references/handbook-ops.md`
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
| Blameless Postmortem (AUTO-GENERATED) | `references/templates/blameless-postmortem.md` |
