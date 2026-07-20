# Power Home Project Handbook — Claude Plugin

v0.1.0 · generated from the handbook source by `scripts/build-plugin.py`

Installs the entire Power Home SDLC handbook as role-based Claude skills, so
anyone with the plugin can ask role questions and draft handbook-standard
documents without the original handbook.

## Skills (12)

| Skill | Role | Templates |
|---|---|---|
| `handbook-overview` | Power Home Handbook — Overview, SDLC & Governance | 0 |
| `role-po` | Product Owner | 4 |
| `role-ba` | Business Analyst | 4 |
| `role-pm` | Project Manager | 4 |
| `role-sm` | Scrum Master | 0 |
| `role-qc` | QC / Tester | 1 |
| `role-sa` | Solution Architect | 2 |
| `role-ux` | UX/UI Designer | 0 |
| `role-security` | Security & Compliance | 0 |
| `role-ops` | Operations & SRE | 1 |
| `role-deployment` | Release Manager / Deployment | 0 |
| `role-pmo` | PMO Governance & Portfolio | 0 |

**16 templates** total (14 from the handbook library, 2 auto-generated
from in-page outlines and marked as such).

## Install

- **Cowork / Claude desktop:** drag & drop `project-handbook.plugin` into the chat.
- **Claude Code:** `claude plugin install ./project-handbook.plugin`

## Example prompts

- "Draft a BRD for feature X using the handbook template"
- "Phân rã epic thanh toán QR thành user stories theo chuẩn INVEST của handbook"
- "Viết Project Charter cho dự án onboarding số theo template Power Home"
- "What does the handbook say about the release DoD before CAB?"
- "Draft a blameless postmortem for yesterday's SEV2"

## Sync rule

The handbook is the single source of truth. Whenever handbook content changes:
run `python scripts/build-plugin.py` again, bump `version` (semver) in
`scripts/build-plugin.py`, and let it repackage
`assets/downloads/project-handbook.plugin`. The site's `#plugin` page serves
that file.

Classification: CONFIDENTIAL — internal use only, same boundary as the handbook.
