---
name: role-security
description: >-
  Security & Compliance skill from the Power Home Handbook (ISO 27001, NIST CSF, OWASP, SBV
  Circular 09/2020). Use when the user asks about the governance framework, risk treatment,
  secure SDLC / DevSecOps gates (SAST, DAST, SCA, secrets), threat modeling with STRIDE, IAM
  (SSO, MFA, RBAC, SoD, PAM, JML), data protection and PDPD, OWASP Top 10, vulnerability SLAs by
  CVSS, incident response, compliance evidence, or security metrics.
---

# Security & Compliance — Power Home Handbook

Instructions for Claude:

1. This skill carries the **Security & Compliance** chapter of the Power Home Project
   Handbook (Hybrid Water-Scrum-Fall, Vietnamese commercial bank, SBV-regulated).
   Scope: ISMS & governance, DevSecOps, threat modeling, IAM, data protection, IR, audit.
2. For anything beyond the summary here, load `references/handbook-security.md`
   — it is the full chapter, extracted verbatim from the handbook page.
3. Follow the handbook's glossary policy: keep standard terms in English
   (Sprint, Backlog, DoD, RTM, SLO, CAB, RACI...); answer prose in the
   user's language (Vietnamese or English).
4. Never invent policy that contradicts the chapter. If the handbook is
   silent, say so and answer from the referenced framework instead (clearly labelled).
