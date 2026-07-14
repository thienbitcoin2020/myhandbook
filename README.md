# 🏦 Project Handbook — Interactive Governance Runbook

> **Classification:** INTERNAL USE ONLY — CONFIDENTIAL
> **Compliance:** SBV Circular 09/2020/TT-NHNN · ISO 27001 Aligned

A governed, interactive **single-page application (SPA)** that bundles twelve internal
handbooks for software delivery under the **Hybrid Water-Scrum-Fall** model at a
Vietnamese commercial bank:

| Route | Page | Focus |
|-------|------|-------|
| `#home` | Implementation Handbook (default) | Canonical lifecycle, governance and handbook entry point |
| `#deployment` | Deployment Runbook | Release pipeline, CAB, rollback, DoD checklist |
| `#ba` | BA Project Handbook | BA process, BRD/FRD, ceremonies |
| `#pm` | PM Project Handbook | PMBOK-aligned PM role & workflow |
| `#qc` | QC Testing Handbook | ISTQB CTFL v4.0 test process, levels, techniques, metrics |
| `#po` | Product Owner Handbook | Scrum Guide 2020 role, discovery, backlog, prioritization, product metrics |
| `#sa` | Solution Architect Handbook | C4 · arc42 · Well-Architected — HLD/LLD, ADR, integration, NFR, security, sizing |
| `#sec` | Security & Compliance | ISO 27001 · NIST CSF · OWASP · SBV 09/2020 — risk, DevSecOps, IAM, data, audit |
| `#ops` | Operations & SRE | Google SRE · ITIL 4 · DORA — SLO/error budget, observability, incident, DR/BCP |
| `#sm` | Scrum Master Handbook | Scrum Guide 2020 — servant leadership, facilitation, coaching, team health |
| `#ux` | UX/UI Designer Handbook | Double Diamond · NN/g · WCAG 2.2 — research, IA, design system, usability |
| `#pmo` | PMO Governance & Portfolio | PMI · P3O — portfolio & intake, RAID, EVM/benefits, assurance, reporting |

---

## 📁 Project Structure

```
project-handbook/
├── vercel.json             # Canonical /index.html -> / redirect only
├── index.html              # CSP-protected SPA shell + empty #sidebar / #app
├── handbook.html           # Legacy redirect stubs → ./#<route>
├── ba-handbook.html        # (kept for old deep links)
├── pm-handbook.html
├── assets/
│   ├── css/
│   │   └── styles.css      # Power Home / HDBank design system
│   └── js/
│       ├── theme-init.js   # Early local theme initialization (no inline script)
│       ├── main.js         # Theme, sidebar, accordion, role tabs, DoD checklist
│       ├── router.js       # Hash-based router — fetches page fragments into the shell
│       └── search.js       # Local EN/VI full-text index and exact-result navigation
├── pages/                  # Page fragments fetched at runtime by the router
│   ├── handbook.html       #   canonical home + implementation lifecycle
│   ├── deployment.html     #   each contains #sidebar-inner + #page-content
│   ├── ba.html
│   ├── pm.html
│   ├── qc.html
│   ├── po.html
│   ├── sa.html
│   ├── sec.html
│   ├── ops.html
│   ├── sm.html
│   ├── ux.html
│   └── pmo.html
├── start_server.bat        # Windows helper: loopback-only Python preview
├── scripts/                # Shared artifact allowlist, builder, security gate
├── .github/workflows/
│   ├── security-check.yml  # Trusted-base checks for pushes and pull requests
│   └── deploy-pages.yml    # Manual, fail-closed deployment only
└── README.md
```

### How it works
`index.html` is a thin shell. `router.js` listens on `hashchange`, `fetch()`es the
matching fragment from `pages/*.html`, and injects its `#sidebar-inner` and
`#page-content` into the shell, plus any allowlisted per-page `#page-style`.
Shared behaviour (theme toggle, scroll-spy, delegated interactions, DoD checklist, global search) is re-bound
after each navigation.

The former `#handbook` hash remains a compatibility alias and is normalized to
the canonical `#home` route, so existing bookmarks continue to work.

The Implementation Handbook overview is intentionally consolidated into two
working views: **Overview & Roles** (pipeline, handbook map, role entry points)
and **Delivery Lifecycle** (hybrid delivery model plus the lifecycle cross-walk).
Legacy section hashes such as `#sec-secmap`, `#sec-secmodel`, and
`#sec-secxwalk` are still resolved to the correct consolidated view.

> ⚠️ Because the router uses `fetch()`, the site **must be served over HTTP** —
> opening `index.html` via `file://` will fail to load the page fragments.

---

## 🚀 Running Locally

### Option 1 — `start_server.bat` (Windows)
Double-click `start_server.bat`. It uses an installed Python 3 runtime and binds
the preview to `127.0.0.1` only. It never downloads or executes an on-demand
package. Open <http://127.0.0.1:8080>.

### Option 2 — Any static server
```bash
python -m http.server 8080 --bind 127.0.0.1
```

All runtime fonts are self-hosted or use the operating system's monospace stack;
the handbook does not depend on a third-party font CDN.

---

## 🔐 Access control

The former browser-only login has been removed because credentials in JavaScript
do not protect static files. Confidential deployments must sit behind real
server-side corporate SSO/MFA and group authorization, or an approved privately
published GitHub Enterprise Cloud Pages site. See [SECURITY.md](SECURITY.md).

---

## 🎨 Design System

Uses the **Power Home / HDBank** visual system with a dark/light theme toggle.
The selected theme is persisted in `localStorage`
(`nt_theme`) and applied before first paint to avoid a flash of unstyled content.

Typography uses self-hosted **Myriad Pro** plus the operating system's local
monospace stack for diagrams and code.

---

## ⚡ Interactive Features

- **Hash-based SPA routing** across the implementation and specialist handbooks
- **Full-text search** across every current-language page, with case/diacritic-insensitive matching, keyboard navigation, snippets, exact-page jumps and result highlighting
- **Bilingual EN/VI experience** including localized shared controls, search UI, accessible labels and document language metadata
- **Strict script CSP** with no inline scripts or inline event handlers
- **Dark / light theme toggle** injected into every page's sidebar
- **Sticky sidebar** with scroll-aware active-link highlighting (Intersection Observer)
- **Collapsible accordions** for compliance pillars and artifacts
- **Role perspective tabs** — Release Manager / Performance Tester / Security Tester
- **Release DoD checklist** — clickable items with live progress bar and completion banner
- **Responsive layout** — collapses to a hamburger sidebar on mobile
- **Graceful error state** when a page fragment fails to load, with a Retry action

---

## 🚢 Deployment

On Vercel, `vercel.json` permanently canonicalizes `/index.html` to `/`. URL
fragments remain browser-side, so a link such as `/index.html#home` lands on
`/#home` without changing the hash router. The configuration is included in the
reviewed artifact allowlist and the security gate rejects any additional Vercel
routing or runtime behavior. This redirect is URL normalization only: it does
not make the handbook public or replace the required Vercel Deployment
Protection / corporate SSO access policy.

`.github/workflows/deploy-pages.yml` is intentionally **manual and fail-closed**.
It will not deploy unless the hosting model has Security approval, the required
repository variable is enabled, and an approved ticket reference is supplied.
The build runs `scripts/security-check.mjs`, uses least-privilege permissions,
pins all GitHub Actions to full commit SHAs, and assembles the site from a shared
file allowlist so every published file is scanned. Pull requests are checked by
the scanner and workflow definition from their trusted base revision rather
than a PR-modified copy. The PR checkout is treated only as data; CI never
executes candidate scripts or package lifecycle hooks.

Public GitHub Pages is not an approved target for content classified as
confidential. Follow the release gate in [SECURITY.md](SECURITY.md).

---

## ⚖️ Compliance

Documents processes aligned with:
- **SBV Circular 09/2020/TT-NHNN** — IT Safety Regulations for credit institutions
- **Internal Change Advisory Board (CAB)** governance policy
- **ISO 27001** information security management alignment
