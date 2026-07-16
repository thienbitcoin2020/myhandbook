# Security Policy

This handbook is classified for internal/confidential use. The HTML, page
fragments, source repository, build artifacts, and backups must be protected by
the same access-control boundary.

## Deployment gate

Publishing is blocked by default. Before enabling deployment, Security and the
document owner must verify all of the following:

1. The repository is private or internal and access follows least privilege.
2. The hosting layer enforces real server-side access control (corporate SSO,
   MFA, and group-based authorization). A browser-only login is prohibited.
3. If GitHub Pages is used, it must be a privately published project site owned
   by an approved GitHub Enterprise Cloud organization. Public Pages is not an
   approved host for this content.
4. The `github-pages` environment has required reviewers and deployment branch
   restrictions.
5. Branch protection requires Code Owner review for `.github/workflows/`,
   `scripts/`, `SECURITY.md`, and `start_server.bat`; secret scanning/push
   protection and private vulnerability reporting are enabled.
6. `node scripts/security-check.mjs` passes on the exact revision to publish.
7. The approved ticket/reference is supplied to the manual deploy workflow and
   repository variable `HANDBOOK_DEPLOYMENT_APPROVED` is set to `true` only for
   the approved hosting model.

The deployment workflow is manual, uses least-privilege job permissions, does
not persist checkout credentials, and pins every action to a reviewed full
commit SHA. It accepts dispatches only from the protected default branch, checks
out the exact immutable dispatched revision, and builds only files in the shared
artifact allowlist. Pull-request checks execute the scanner from the trusted base
revision under the base-owned `pull_request_target` workflow, so a candidate
change cannot weaken its own checker. That workflow must remain read-only and
must never execute scripts, build commands, or package lifecycle hooks from the
candidate checkout; candidate files are inspected strictly as data.

## Curated DOCX release boundary

Role-document source files under the local `Template/` working folder are not
publishable and are intentionally ignored by Git. Only sanitized copies named
individually in `PUBLISHED_DOCUMENTS` in `scripts/artifact-files.mjs` may be
placed under `assets/templates/` and included in a deployment. Do not replace
that list with a recursive directory allowlist.

Before adding or replacing a curated DOCX, the document owner and the relevant
role owner must review its business content and remove real employee, customer,
project, environment, credential, and production data. The Office package must
then pass `node scripts/security-check.mjs`, which rejects:

- encrypted, malformed, path-traversing, oversized, or suspiciously compressed
  ZIP/OOXML packages;
- VBA/macros, ActiveX, embedded packages or OLE objects, `altChunk` content,
  executable/script payloads, and signed-package additions;
- all external OOXML relationships, including remote hyperlinks and attached
  templates;
- secrets and high-confidence personal data found in decompressed XML; and
- non-empty `creator` or `lastModifiedBy` core metadata.

Every curated file is Code Owner protected. Its EN and VI download links must
remain symmetric and must pass `node scripts/consistency-check.mjs`. A document
that has not completed this review stays outside `assets/templates/`, even when
the handbook mentions it as a future or missing artifact.

## Local preview

Local preview servers must bind to `127.0.0.1`, not all network interfaces. The
provided Windows launcher uses only an installed Python 3 runtime and does not
download or execute an unpinned package fallback.

## Required hosting headers

The document contains a restrictive CSP meta policy for local/static defense in
depth. The approved host must additionally return these HTTP response headers:

- `Content-Security-Policy` equivalent to or stricter than the policy in
  `index.html`, including `frame-ancestors 'none'`
- `Strict-Transport-Security`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: no-referrer`
- a restrictive `Permissions-Policy`

## Secrets and authentication

Do not commit passwords, access tokens, connection strings, keys, production
identifiers, customer data, or employee data. Client-side credentials and
localStorage authentication records are not authentication and must not be
reintroduced.

## Reporting a vulnerability

Do not disclose vulnerabilities or confidential handbook content in a public
issue. Use GitHub Private Vulnerability Reporting or the organization's approved
internal security channel.
