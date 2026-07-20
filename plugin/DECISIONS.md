# DECISIONS.md — auto-decision log (one-shot build)

Plugin v0.1.0, generated 2026-07-20 by `scripts/build-plugin.py`.

1. **Roles**: exactly the 11 role pages + the parent Implementation Handbook
   (overview skill). No roles invented. `home`/`handbook` routes are one page →
   one `handbook-overview` skill.
2. **Language policy**: reference chapters are extracted from the EN pages;
   templates stay Vietnamese-first (verbatim from the handbook DOCX renders).
   Rationale: the handbook's own glossary policy keeps standard terms in
   English while templates are Vietnamese; duplicating every chapter in both
   languages would double the plugin for no retrieval gain. The VI editions
   remain available in the handbook app.
3. **Template fidelity**: templates are converted 1:1 from
   `assets/templates/previews/*.html` — the same derived renders the site's
   reader and DOCX downloads are built from — so plugin, reader and download
   cannot drift. `[ĐIỀN: ...]` placeholders preserved.
4. **Gaps auto-resolved** (marked `<!-- AUTO-GENERATED -->`):
   - `role-qc/references/templates/test-plan.md` — QC page lists Test Plan as a
     deliverable (IEEE-829-lite outline) but ships no body. Generated from the
     page's own deliverables/criteria sections + ISTQB CTFL v4.0.
   - `role-ops/references/templates/blameless-postmortem.md` — Ops page
     prescribes the exact postmortem fields but ships no body. Generated from
     that field list + Google SRE practice.
5. **Ambiguous ownership**: FSD lives under the PO role (the handbook stores it
   in the PO template folder), even though BAs co-author it — noted in the PO
   skill. UAT plan/script remains BA-owned per the handbook's ownership matrix.
6. **Not included**: `Template/BA/Guideline Template.docx` (meta-guide about
   writing templates, not a project template — also unpublished on the site).
7. **Distribution**: packaged file is served from the handbook app at
   `assets/downloads/project-handbook.plugin` behind the same access boundary
   as the rest of the CONFIDENTIAL site; added to the publish allowlist
   explicitly.
8. **Sync rule**: regenerate + semver bump on any handbook change (see README).
