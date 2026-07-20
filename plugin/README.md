# Power Home Project Handbook — Claude Plugin

v0.4.0 · generated from the handbook source by `scripts/build-plugin.py`

Installs the entire Power Home SDLC handbook as role-based Claude skills, so
anyone with the plugin can ask role questions and draft handbook-standard
documents without the original handbook.

## Skills (12)

| Skill | Role | Templates |
|---|---|---|
| `handbook-overview` | Power Home Handbook — Overview, SDLC & Governance | 0 |
| `role-po` | Product Owner | 3 |
| `role-ba` | Business Analyst | 4 |
| `role-pm` | Project Manager | 4 |
| `role-sm` | Scrum Master | 0 |
| `role-qc` | QC / Tester | 5 |
| `role-sa` | Solution Architect | 4 |
| `role-ux` | UX/UI Designer | 5 |
| `role-security` | Security & Compliance | 5 |
| `role-ops` | Operations & SRE | 4 |
| `role-deployment` | Release Manager / Deployment | 4 |
| `role-pmo` | PMO Governance & Portfolio | 4 |

**42 reviewed templates** total, converted from the same handbook
previews used by the in-page reader and DOCX downloads.

## Install

- **Cowork / Claude desktop:** drag & drop `project-handbook.plugin` into the chat.
- **Claude Code (persistent):** add the GitHub marketplace, then install
  `project-handbook@power-home-handbook`.
- **Claude Code (local test):** extract the archive, then run
  `claude --plugin-dir ./project-handbook`.

## Standalone role packages

Install only the role needed when the full handbook would add unnecessary context.
Each package contains exactly one role skill, its full handbook chapter, and only
the reviewed templates owned by that role.

| Skill | Package | Templates |
|---|---|---|
| `role-po` | `project-handbook-po.plugin` | 3 |
| `role-ba` | `project-handbook-ba.plugin` | 4 |
| `role-pm` | `project-handbook-pm.plugin` | 4 |
| `role-sm` | `project-handbook-sm.plugin` | 0 |
| `role-qc` | `project-handbook-qc.plugin` | 5 |
| `role-sa` | `project-handbook-sa.plugin` | 4 |
| `role-ux` | `project-handbook-ux.plugin` | 5 |
| `role-security` | `project-handbook-security.plugin` | 5 |
| `role-ops` | `project-handbook-ops.plugin` | 4 |
| `role-deployment` | `project-handbook-deployment.plugin` | 4 |
| `role-pmo` | `project-handbook-pmo.plugin` | 4 |

The Scrum Master package intentionally has no document template; its handbook
chapter remains useful for facilitation, coaching, impediments and team health.

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
the full plugin plus all role packages under `assets/downloads/roles/`. The
site's `#plugin` page serves those reviewed files.

Classification: CONFIDENTIAL — internal use only, same boundary as the handbook.
