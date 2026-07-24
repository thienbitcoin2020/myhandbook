---
name: role-security
description: >-
  Security & Compliance skill from the BP Handbook (ISO 27001, NIST CSF, OWASP, applicable
  regulations). Use when the user asks about the governance framework, risk treatment, secure
  SDLC / DevSecOps gates (SAST, DAST, SCA, secrets), threat modeling with STRIDE, IAM (SSO, MFA,
  RBAC, SoD, PAM, JML), data protection and PDPD, OWASP Top 10, vulnerability SLAs by CVSS,
  incident response, compliance evidence, or security metrics.
---

# Security & Compliance — BP Handbook

Instructions for Claude:

1. This skill carries the **Security & Compliance** chapter of the BP Project
   Handbook (Hybrid Water-Scrum-Fall, enterprise delivery organization, governance-aligned).
   Scope: ISMS & governance, DevSecOps, threat modeling, IAM, data protection, IR, audit.
2. For anything beyond the summary here, load `references/handbook-security.md`
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
| Threat Model (STRIDE) | `references/templates/threat-model-stride.md` |
| Security Requirements Checklist | `references/templates/security-requirements-checklist.md` |
| Security Risk Assessment | `references/templates/security-risk-assessment.md` |
| Incident Response Plan | `references/templates/incident-response-plan.md` |
| Compliance Gap Checklist | `references/templates/compliance-gap-checklist.md` |
