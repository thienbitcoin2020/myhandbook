# Security Policy

The website, curated templates, and plugin packages are the public edition of
the BP Project Handbook.

## Confidential boundary

Only `docs/internal/` is classified as confidential. It contains engineering,
architecture, QA, and generation notes that are not part of the website.

The boundary is enforced in three places:

1. `.gitignore` keeps `docs/internal/` out of new commits.
2. `.vercelignore` keeps it out of Vercel source uploads.
3. `scripts/artifact-files.mjs` uses an explicit allowlist and never publishes
   anything from `docs/internal/`.

Do not weaken or remove these exclusions. If an internal document is already
present in public Git history, remove it from the current branch immediately
and use an approved history-remediation process when required.

## Public deployment gate

Before deploying:

1. Confirm `docs/internal/` is absent from the candidate upload and built
   artifact.
2. Run `node scripts/security-check.mjs`.
3. Run `node scripts/consistency-check.mjs`.
4. Build with `node scripts/build-static-artifact.mjs` and deploy only the
   resulting reviewed public artifact.
5. Confirm no password, token, private key, connection string, customer data,
   employee data, or production identifier is present.

## Curated DOCX release boundary

Unreviewed role-document sources under the local `Template/` working folder are
not publishable and are ignored by Git. Only sanitized copies named individually
in `PUBLISHED_DOCUMENTS` may be included.

The Office-package gate rejects dangerous OOXML features, external
relationships, embedded executable content, secrets, high-confidence personal
data, and author metadata. EN and VI links must remain symmetric.

## Local preview

Local preview servers should bind to `127.0.0.1`. The provided Windows launcher
uses an installed Python runtime and does not download an on-demand package.

## Required hosting headers

The host should return:

- a Content Security Policy equivalent to or stricter than `index.html`;
- `Strict-Transport-Security`;
- `X-Content-Type-Options: nosniff`;
- `Referrer-Policy: no-referrer`; and
- a restrictive `Permissions-Policy`.

## Reporting a vulnerability

Do not publish secrets or vulnerability details in a public issue. Use GitHub
Private Vulnerability Reporting or another private channel.
