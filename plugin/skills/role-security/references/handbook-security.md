# Security & Compliance — full handbook chapter

> Extracted from the Power Home Handbook page `pages/sec.html` (EN edition; a Vietnamese edition exists in the handbook app).

🛡️ Internal Runbook · ISO 27001 · NIST CSF · SBV 09/2020

## Security & Compliance

## Governance & Controls Runbook

Reference for information security & regulatory compliance across the SDLC — grounded in ISO/IEC 27001, the NIST Cybersecurity Framework, OWASP, and mapped to SBV Circular 09/2020/TT-NHNN and PCI-DSS for a Vietnamese commercial bank. Security is built in, not bolted on.

ISO 27001 ISMS

NIST CSF

DevSecOps

PUBLIC

📖 Key terms & abbreviations on this page

New to security & compliance? Skim these first — they appear throughout this runbook.

| Term | Meaning |
|---|---|
| CISO | Chief Information Security Officer — owns security policy & the ISMS. |
| ISMS / SoA | Information Security Management System (ISO 27001) / Statement of Applicability — which Annex A controls apply and why. |
| IAM · RBAC · PAM · JML | Identity & Access Management; Role-Based Access Control; Privileged Access Management; Joiner-Mover-Leaver provisioning. |
| MFA · SSO · OIDC | Multi-Factor Authentication; Single Sign-On; OpenID Connect — authentication building blocks. |
| SoD | Segregation of Duties — no one person controls dev + test + production release (SBV mandate). |
| SAST / DAST / SCA | Static / Dynamic security scanning of code; Software Composition Analysis (dependency CVEs). |
| SBOM | Software Bill of Materials — inventory of every component in a build. |
| CVSS | Common Vulnerability Scoring System (0–10) — drives remediation SLAs. |
| SIEM / SOC · EDR | Security event correlation platform / Security Operations Center; Endpoint Detection & Response. |
| DLP · HSM/KMS | Data Loss Prevention; Hardware Security Module / Key Management Service (encryption keys). |
| PII | Personally Identifiable Information — personal data protected by PDPD (Decree 13/2023). |
| TPRM | Third-Party Risk Management — security due-diligence on vendors & outsourcing. |
| IR | Incident Response — the prepare→detect→contain→eradicate→recover→learn cycle (NIST 800-61). |

🧭

Section 01

### Overview

Security vs Compliance

| Aspect | Security | Compliance |
|---|---|---|
| Question | Are we actually protected? | Can we prove we meet the rules? |
| Driven by | Threats & risk | Regulation & standards (SBV, ISO, PCI) |
| Output | Controls that reduce risk | Evidence, audit trail, attestation |

ℹ️

Compliant ≠ secure. Aim for security first; compliance is a byproduct done right. Both are needed in a regulated bank.

CIA Triad & Defense in Depth

**CIA:Confidentiality** (only authorized access), **Integrity** (data unaltered & trustworthy), **Availability** (accessible when needed). Extended: Authenticity, Non-repudiation.

**Defense in depth** — layered controls (perimeter → network → host → app → data → identity) so no single failure is catastrophic. Assume breach; apply **least privilege** and **Zero-Trust**.

🏛️

Section 02

### Governance Frameworks

NIST CSF — 5 core functions NIST

- **IDENTIFY**assets, risk

- **PROTECT**controls, IAM, encryption

- **DETECT**monitor, SIEM

- **RESPOND**incident response

- **RECOVER**restore, lessons

Standards mapping

| Framework | Role in this bank |
|---|---|
| ISO/IEC 27001 (ISMS) | Management system: risk-based, Statement of Applicability (Annex A controls), continual improvement (PDCA). |
| NIST CSF | Operational framework for cyber functions & maturity. |
| SBV Circular 09/2020/TT-NHNN | Mandatory IT-safety regulation for credit institutions — segregation of duties, access control, logging, BCP. |
| PCI-DSS | Cardholder data protection (if in scope). |
| OWASP (Top 10, ASVS, SAMM) | Application security verification & maturity. |
| Third-Party Risk (TPRM) | Supplier/vendor & outsourcing security due diligence, contract controls & ongoing monitoring — ISO 27001 A.15 (SBV outsourcing rules). |

⬅️

**Shift-left:** security requirements & abuse cases are captured from **Discovery** (with the BA), before design threat modeling — per OWASP SAMM / NIST SSDF.

⚠️

Section 03

### Risk Management

**ISO 27001 risk process:** asset inventory & classification → identify threats/vulnerabilities → assess risk = likelihood × impact → treat (mitigate / transfer / avoid / accept) → document in the **Statement of Applicability** & risk register → monitor.

| Treatment | When |
|---|---|
| Mitigate | Apply controls to reduce likelihood/impact (default). |
| Transfer | Insurance, outsourcing with SLAs. |
| Avoid | Stop the risky activity. |
| Accept | Residual risk within appetite — formally signed off. |

🏦

Banking = high impact: prioritize fraud, transaction integrity, customer data, and availability. Risk acceptance for these needs CISO + business owner sign-off.

🔄

Section 04

### Secure SDLC / DevSecOps

**Shift-left:** security controls embedded in the pipeline, failing the build on Critical/High findings.

- **CODE**IDE lint

- **COMMIT**secrets scan

- **BUILD**SAST · SCA (deps)

- **TEST**DAST · pen test

- **DEPLOY**IaC scan · signing policy

- **OPERATE**runtime · SIEM/EDR monitoring

| Gate | Tooling / control |
|---|---|
| SAST | Static code analysis (SonarQube, GitHub Advanced Security/CodeQL). |
| SCA | Dependency / supply-chain scan (Snyk); SBOM generation. |
| Secrets scanning | Block committed credentials/keys. |
| DAST | Dynamic scan of running app (OWASP ZAP). |
| IaC / container scan | Misconfig & image CVE scan; signed images. |

🔗

Aligns with Deployment Runbook gates and QC security testing; architecture-level controls in the SA Handbook (STRIDE).

🎯

Section 05

### Threat Modeling STRIDE

Model threats early (design phase) using data-flow diagrams & trust boundaries. **STRIDE** classifies threats; each maps to a control.

| Threat | Violates | Control |
|---|---|---|
| Spoofing | Authenticity | Strong AuthN, MFA, OIDC |
| Tampering | Integrity | Signing, hashing, TLS |
| Repudiation | Non-repudiation | Audit logging |
| Information disclosure | Confidentiality | Encryption, least privilege |
| Denial of service | Availability | Rate limit, WAF, autoscale |
| Elevation of privilege | Authorization | RBAC/ABAC, Zero-Trust |

🔑

Section 06

### Identity & Access Management

| Control | What it means here |
|---|---|
| AuthN | Centralized SSO (OAuth2/OIDC/SAML) + MFA for all privileged & remote access. |
| AuthZ | RBAC / ABAC, enforce least privilege & need-to-know. |
| Segregation of Duties (SoD) | No one person controls dev + release + prod (SBV requirement) — see Deployment Runbook. |
| PAM | Privileged access via vault, just-in-time, session recording. |
| Joiner-Mover-Leaver (JML) | Provisioning & timely de-provisioning; periodic access recertification. |

🔐

Section 07

### Data Protection & Privacy

| Control | Detail |
|---|---|
| Classification | Public · Internal · Confidential · Restricted — controls scale with class. |
| Encryption | At-rest (AES-256), in-transit (TLS 1.2+); centralized key management & rotation (HSM/KMS). |
| Masking / tokenization | Non-prod data masked; PAN tokenized (PCI). |
| DLP | Detect/prevent exfiltration of sensitive data. |
| Retention & disposal | Retention schedule per regulation; secure deletion. |
| Data residency | In-country storage per SBV. |
| Personal data (PDPD) | Consent, data-subject rights, cross-border transfer & impact assessment per Decree 13/2023/NĐ-CP (PDPD). |

🔗

Data-classification & privacy obligations are elicited by the BA (regulatory scope) and verified by the QC team.

🧱

Section 08

### Application & Infrastructure Security

OWASP Top 10 (2021) — focus areas OWASP

A01 Broken Access ControlA02 Cryptographic FailuresA03 InjectionA04 Insecure DesignA05 Security MisconfigA06 Vulnerable ComponentsA07 Auth FailuresA08 Integrity FailuresA09 Logging FailuresA10 SSRF

Infrastructure hardening

- CIS Benchmarks for OS/DB/container/cloud baselines.

- Network **segmentation** & micro-segmentation; DMZ; deny-by-default firewalls.

- **WAF** + DDoS protection at the edge; API gateway policies.

- Secrets in a vault (never in code/config); short-lived credentials.

🔍

Section 09

### Vulnerability & Patch Management

Continuous scanning + risk-based remediation SLAs by **CVSS** severity.

| Severity (CVSS) | Remediation SLA |
|---|---|
| Critical (9.0–10) | ≤ 24–48h (emergency patch) |
| High (7.0–8.9) | ≤ 7 days |
| Medium (4.0–6.9) | ≤ 30 days |
| Low (0.1–3.9) | ≤ 90 days / next cycle |

Annual (or on major change) **penetration testing** + red-team for critical banking systems; track findings to closure.

🚨

Section 10

### SecOps & Incident Response

**SOC** with **SIEM** (correlation, alerting) + **EDR/XDR**. Incident response lifecycle NIST SP 800-61:

- **PREPARE**playbooks

- **DETECT & ANALYZE**SIEM alerts

- **CONTAIN**isolate

- **ERADICATE**remove

- **RECOVER**restore

- **LESSONS LEARNED**post-incident

🏦

Regulatory breach notification timelines apply (SBV / data-protection). Coordinate operational restoration with the Operations & SRE Runbook (major incident & DR).

📋

Section 11

### Compliance & Audit

Maintain a **control mapping**: regulation clause → control → owner → evidence. Keep audit-ready at all times.

| SBV 09/2020 theme | Control | Evidence |
|---|---|---|
| Access control & SoD | RBAC, PAM, JML, recertification | Access reviews, PAM logs |
| Logging & monitoring | SIEM, audit trails (immutable) | Log retention, SOC reports |
| Change management | CAB approval, segregation | Change records (see Deployment) |
| BCP / DR | DR plan, tested failover | DR test reports (see Ops) |

✅

Assurance = internal audit + external audit + continuous control monitoring. Findings tracked to remediation with owners & deadlines.

📊

Section 12

### Security Metrics / KPIs

MTTD

mean time to detect an incident

MTTR

mean time to respond / remediate

Patch compliance

patched assets ÷ total × 100%

Vuln remediation SLA

closed within SLA ÷ total × 100%

Phishing failure rate

clicked ÷ tested × 100% (lower better)

Control coverage

implemented ÷ applicable Annex A × 100%

👥

Section 13

### Roles & RACI

**R**esponsible · **A**ccountable · **C**onsulted · **I**nformed.

| Activity | CISO | SecEng | SA | Dev | Ops/SRE | Compliance |
|---|---|---|---|---|---|---|
| Security policy & ISMS | A | R | C | I | C | C |
| Threat modeling | C | R | A | C | I | I |
| DevSecOps gates | A | R | C | R | C | I |
| Incident response | A | R | C | C | R | I |
| Compliance evidence & audit | C | C | I | I | C | A/R |

📚

**Sources.** ISO/IEC 27001 & 27002 (ISMS, Annex A controls); NIST Cybersecurity Framework & SP 800-61 (Incident Handling); OWASP Top 10 (2021), ASVS, SAMM; PCI-DSS; CIS Benchmarks; CVSS (FIRST); STRIDE (Microsoft). Mapped to SBV Circular 09/2020/TT-NHNN.

📥

Library

### Security & Compliance Templates

Threats, controls, risk, response and compliance evidence

DOCXOwner · Security / Compliance

#### Threat Model (STRIDE)

Model data flows, trust boundaries, threats and mitigations.

SupportsSA · Dev · SRE · PM

Read document→

DOCXOwner · Security / Compliance

#### Security Requirements Checklist

Create verifiable security requirements for delivery and assurance.

SupportsSA · Dev · SRE · PM

Read document→

DOCXOwner · Security / Compliance

#### Security Risk Assessment

Assess scenarios, likelihood, impact, treatment and residual risk.

SupportsSA · Dev · SRE · PM

Read document→

DOCXOwner · Security / Compliance

#### Incident Response Plan

Define roles, triggers, communications, evidence and response playbooks.

SupportsSA · Dev · SRE · PM

Read document→

DOCXOwner · Security / Compliance

#### Compliance Gap Checklist

Map clauses to evidence, gaps, remediation and accountable owners.

SupportsSA · Dev · SRE · PM

Read document→

🏦 Handbook · Security & Compliance Runbook v2.0 · Public Edition · Classification: PUBLIC

Aligned with ISO 27001 · NIST CSF · OWASP · PCI-DSS · SBV Circular 09/2020/TT-NHNN · © 2025
