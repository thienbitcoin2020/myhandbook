# DECISIONS.md — auto-decision log (one-shot build)

Plugin v0.2.0, generated 2026-07-20 by `scripts/build-plugin.py`.

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
4. **Template coverage**: all 43 plugin templates come from reviewed handbook
   preview/DOCX pairs. The former outline-only QC Test Plan and Ops Postmortem
   gaps are superseded by the role prompt-pack templates in library v0.2.0.
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
