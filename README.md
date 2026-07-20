# 🏦 Project Handbook — Interactive Governance Runbook

> **Classification:** INTERNAL USE ONLY — CONFIDENTIAL
> **Compliance:** SBV Circular 09/2020/TT-NHNN · ISO 27001 Aligned

A governed, interactive **single-page application (SPA)** that bundles twelve internal
handbooks for software delivery under the **Hybrid Water-Scrum-Fall** model at a
Vietnamese commercial bank:

| Route | Page | Focus |
|-------|------|-------|
| `/` | Implementation Handbook (default) | Canonical lifecycle, governance and handbook entry point |
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
├── legacy/                 # Legacy deep-link shims → ./#<route>
│   ├── handbook.html       #   kept for old bookmarks; the builder republishes
│   ├── pm-handbook.html    #   each one at the ARTIFACT ROOT (/pm-handbook.html),
│   └── …                   #   because that root path *is* the historical URL
├── assets/
│   ├── css/
│   │   └── styles.css      # Power Home / HDBank design system
│   ├── js/
│   │   ├── theme-init.js   # Early local theme initialization (no inline script)
│   │   ├── main.js         # Theme, sidebar, accordion, role tabs, DoD checklist
│   │   ├── router.js       # Hash-based router — fetches page fragments into the shell
│   │   └── search.js       # Local EN/VI full-text index and exact-result navigation
│   └── templates/          # Sanitized, explicitly allowlisted DOCX downloads
│       ├── ba/
│       ├── pm/
│       ├── po/
│       └── sa/
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
├── scripts/                # Shared artifact allowlist, builder, security gate,
│                           #   consistency-check.mjs (structural regression gate)
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

The former `#home` and `#handbook` hashes remain compatibility aliases and are
normalized to the canonical root URL `/`, so existing bookmarks continue to
work without leaving a redundant home suffix in the address bar.

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

### Structural regression check

```bash
node scripts/consistency-check.mjs
```

Dependency-free gate that fails on the defects behind "this tab has no content":
every route resolving to a real **EN and VI** fragment, the
`#sidebar-inner` / `#page-content` contract, no inline event handlers (CSP), no
duplicate ids, every `data-sec` / `data-section-target` resolving to a real
section, no dead `#route` links, and a rectangular lifecycle cross-walk
(colspan sums must equal the column count). It also verifies that every
`data-template-download` link resolves to an explicitly published DOCX, and
that EN/VI pages expose the same curated downloads in the same order.

### Curated role templates

The downloadable BA, PM, PO, and SA templates in `assets/templates/` are
sanitized release copies. The local `Template/` folder is an ignored staging
area for unreviewed originals and legacy formats; files placed there are never
published automatically. A new document becomes downloadable only after it is:

1. reviewed for role relevance and unnecessary content;
2. scrubbed of personal/core metadata and real project or customer data;
3. added by exact path to `PUBLISHED_DOCUMENTS` in
   `scripts/artifact-files.mjs`;
4. linked symmetrically from the EN and VI handbook; and
5. accepted by both the security and consistency checks.

The DOCX gate inspects decompressed OOXML without third-party dependencies. It
blocks macros, ActiveX, embedded/OLE content, `altChunk`, executable payloads,
external relationships, unsafe ZIP paths, suspicious compression, secrets,
high-confidence personal data, and non-empty author metadata. See
[SECURITY.md](SECURITY.md) for the release policy.

> Not yet wired into the deploy gate on purpose: `scripts/security-check.mjs`
> pins the exact `vercel.json` build command, so adding a step there also means
> editing the security gate itself. That needs Code Owner / Security approval —
> see [SECURITY.md](SECURITY.md).

### Decision: no test-runner dependency

Browser-level E2E (fast tab switching, 390px mobile, refresh, deep links) is
**deliberately not automated**, and this repository stays dependency-free — no
`package.json`, no `node_modules`.

The reason is that a runner such as Playwright would contradict the security
posture stated above: `npm install` executes package lifecycle hooks (Playwright's
postinstall downloads browser binaries) and pulls in hundreds of transitive
packages, while this repo's CI is explicitly built so that it *never executes
candidate scripts or package lifecycle hooks*. Automating those tests would cost
more than the bugs they would catch, which are already fixed.

Instead:

- **Structure** is covered by `consistency-check.mjs` above (zero dependencies).
- **Behaviour** is verified manually against production when it changes.

The P0/P1 navigation fixes were verified this way on
`project-handbook.vercel.app` — 12 routes × EN/VI all rendering, rapid tab
switching and a mid-flight language change never leaving a stale or blank page,
the 390px sidebar closing on navigation with its backdrop, deep links cold-loading
onto the requested sub-view, and `/pm-handbook.html` still resolving to `#pm`.

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
- **Always-visible handbook sections** — sidebar controls scroll to content instead of hiding sibling sections
- **Role perspective jump navigation** — Release Manager / Performance Tester / Security Tester remain visible together
- **Release DoD checklist** — clickable items with live progress bar and completion banner
- **Responsive layout** — collapses to a hamburger sidebar on mobile
- **Graceful error state** when a page fragment fails to load, with a Retry action

---

## 🚢 Deployment

On Vercel, `vercel.json` permanently canonicalizes `/index.html` to `/`. The
client router then removes the legacy `#home`/`#handbook` aliases, while keeping
all role and section deep links unchanged. The configuration is included in the
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

Both Vercel and GitHub Pages deploy the reviewed `public/` artifact. During each
build, `scripts/build-static-artifact.mjs` stamps one deployment version across
all current Document Control blocks, sidebar badges, and footers. GitHub Pages
uses the workflow run ID and retry attempt; Vercel uses its deployment ID when
available and otherwise falls back to the UTC build timestamp. Historical
entries in the Version History remain unchanged.

Public GitHub Pages is not an approved target for content classified as
confidential. Follow the release gate in [SECURITY.md](SECURITY.md).

---

## ⚖️ Compliance

Documents processes aligned with:
- **SBV Circular 09/2020/TT-NHNN** — IT Safety Regulations for credit institutions
- **Internal Change Advisory Board (CAB)** governance policy
- **ISO 27001** information security management alignment
