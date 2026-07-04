# 🏦 Project Handbook — Interactive Governance Runbook

> **Classification:** INTERNAL USE ONLY — CONFIDENTIAL
> **Compliance:** SBV Circular 09/2020/TT-NHNN · ISO 27001 Aligned

A governed, interactive **single-page application (SPA)** that bundles four internal
handbooks for software delivery under the **Hybrid Water-Scrum-Fall** model at a
Vietnamese commercial bank:

| Route | Page | Focus |
|-------|------|-------|
| `#home` | Handbook Home (default) | Hub: handbook map, master lifecycle cross-walk, start-by-role |
| `#deployment` | Deployment Runbook | Release pipeline, CAB, rollback, DoD checklist |
| `#handbook` | Implementation Handbook | Parent umbrella linking the other pages |
| `#ba` | BA Project Handbook | BA process, BRD/FRD, ceremonies |
| `#pm` | PM Project Handbook | PMBOK-aligned PM role & workflow |
| `#qc` | QC Testing Handbook | ISTQB CTFL v4.0 test process, levels, techniques, metrics |
| `#po` | Product Owner Handbook | Scrum Guide 2020 role, discovery, backlog, prioritization, product metrics |

---

## 📁 Project Structure

```
project-handbook/
├── index.html              # SPA shell: login overlay + empty #sidebar / #app
├── handbook.html           # Legacy redirect stubs → index.html#<route>
├── ba-handbook.html        # (kept for old deep links)
├── pm-handbook.html
├── assets/
│   ├── css/
│   │   └── styles.css      # "Nothing" design system (dark/light theme)
│   └── js/
│       ├── main.js         # Auth, theme, sidebar, accordion, role tabs, DoD checklist
│       └── router.js       # Hash-based router — fetches page fragments into the shell
├── pages/                  # Page fragments fetched at runtime by the router
│   ├── home.html           #   hub landing (default route): map + lifecycle cross-walk
│   ├── deployment.html     #   each contains #sidebar-inner + #page-content
│   ├── handbook.html       #   (+ optional #page-style / #page-script)
│   ├── ba.html
│   ├── pm.html
│   ├── qc.html
│   └── po.html
├── start_server.bat        # Windows helper: python http.server, npx http-server fallback
├── .github/workflows/
│   └── deploy-pages.yml    # GitHub Pages auto-deploy on push to main
└── README.md
```

### How it works
`index.html` is a thin shell. `router.js` listens on `hashchange`, `fetch()`es the
matching fragment from `pages/*.html`, and injects its `#sidebar-inner` and
`#page-content` into the shell — plus any per-page `#page-style` / `#page-script`.
Shared behaviour (theme toggle, auth gate, scroll-spy, DoD checklist) is re-bound
after each navigation.

> ⚠️ Because the router uses `fetch()`, the site **must be served over HTTP** —
> opening `index.html` via `file://` will fail to load the page fragments.

---

## 🚀 Running Locally

### Option 1 — `start_server.bat` (Windows)
Double-click `start_server.bat`. It tries `python -m http.server 8080`, then falls
back to `npx http-server -p 8080`. Open <http://localhost:8080>.

### Option 2 — Any static server
```bash
python -m http.server 8080        # or:  npx http-server -p 8080
```

> Google Fonts (Space Grotesk / Space Mono) require an internet connection; the
> page falls back to system fonts offline.

---

## 🔐 Authentication

The login gate (`main.js`) is **client-side only** — credentials live in the JS
and the page fragments are publicly fetchable. It deters casual access but is **not**
real security. For genuinely confidential content, place the site behind
server-side auth (reverse-proxy Basic Auth / SSO) or a private Pages deployment.
See the note at the top of `main.js`.

---

## 🎨 Design System

Uses the **"Nothing"** design system (see `Sample design/nothing-design-skill-main/`)
with a dark/light theme toggle. The selected theme is persisted in `localStorage`
(`nt_theme`) and applied before first paint to avoid a flash of unstyled content.

Typography: **Space Grotesk** (sans) + **Space Mono** (mono) via Google Fonts.

---

## ⚡ Interactive Features

- **Hash-based SPA routing** across the four handbooks (no full page reloads)
- **Client-side login gate** with 24h persisted session
- **Dark / light theme toggle** injected into every page's sidebar
- **Sticky sidebar** with scroll-aware active-link highlighting (Intersection Observer)
- **Collapsible accordions** for compliance pillars and artifacts
- **Role perspective tabs** — Release Manager / Performance Tester / Security Tester
- **Release DoD checklist** — clickable items with live progress bar and completion banner
- **Responsive layout** — collapses to a hamburger sidebar on mobile
- **Graceful error state** when a page fragment fails to load, with a Retry action

---

## 🚢 Deployment

`.github/workflows/deploy-pages.yml` publishes to **GitHub Pages** on push to
`main`. The job copies `index.html`, the redirect stubs, `assets/`, **and
`pages/`** into `public/` — the `pages/` directory is required because the router
fetches those fragments at runtime — then deploys via `actions/deploy-pages`.

> One-time setup: **Settings → Pages → Source: GitHub Actions**.

Live URL: <https://thienpv99.github.io/project-handbook/>

---

## ⚖️ Compliance

Documents processes aligned with:
- **SBV Circular 09/2020/TT-NHNN** — IT Safety Regulations for credit institutions
- **Internal Change Advisory Board (CAB)** governance policy
- **ISO 27001** information security management alignment
