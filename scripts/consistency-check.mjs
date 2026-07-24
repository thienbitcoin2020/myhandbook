#!/usr/bin/env node
/**
 * consistency-check.mjs — dependency-free structural regression gate.
 *
 * Covers the failure modes behind the "tab has no content" reports without
 * needing a browser or any npm dependency (this repository intentionally has
 * no package.json and publishes from a reviewed file allowlist):
 *
 *   1. every router route resolves to a real EN *and* VI fragment
 *   2. every fragment exposes the #sidebar-inner + #page-content contract
 *   3. no inline event handlers survive (strict script-src 'self' CSP)
 *   4. no duplicate element ids inside a fragment (a11y + automation)
 *   5. every data-sec / data-section-target resolves to a real section id
 *   6. every in-page #route link points at a declared route
 *   7. the lifecycle cross-walk is rectangular (colspan sums == column count)
 *   8. curated documents open in the in-page reader first: every template card
 *      links the derived HTML preview of an allowlisted DOCX (read-then-
 *      download, no direct download from cards), EN/VI-symmetric, and every
 *      published document is reachable from both languages
 *
 * Browser-level E2E (fast tab switching, 390px mobile, cache upgrade) needs a
 * real test runner and is tracked separately — see README.
 */

import fs from 'node:fs';
import path from 'node:path';
import {
  PUBLISHED_DOCUMENTS,
  ROLE_PLUGIN_PACKAGES,
  documentPreviewPath,
} from './artifact-files.mjs';

const root = process.cwd();
const failures = [];
const notes = [];

function fail(check, message) {
  failures.push(`${check}: ${message}`);
}

function read(relative) {
  return fs.readFileSync(path.join(root, relative), 'utf8');
}

function exists(relative) {
  return fs.existsSync(path.join(root, relative));
}

// ── 1. Routes resolve in both languages ────────────────────────────────
const routerSource = read('assets/js/router.js');
const routesBlock = routerSource.match(/const ROUTES = \{([\s\S]*?)\};/);
if (!routesBlock) {
  fail('routes', 'could not parse the ROUTES table out of router.js');
}

const routes = new Map();
if (routesBlock) {
  const entry = /'([\w-]+)':\s*'([^']+)'/g;
  let match;
  while ((match = entry.exec(routesBlock[1])) !== null) {
    routes.set(match[1], match[2]);
  }
}

if (routes.size === 0) fail('routes', 'ROUTES table parsed but is empty');

// ── 1b. Search derives its page list from the router registry ──────────
// search.js once carried its own copy of the route table and silently
// drifted (a route was missing from the index). The router table is the
// single source of truth; search must consume it, never redeclare it.
const searchSource = read('assets/js/search.js');
if (/const\s+ROUTES\s*=\s*\[/.test(searchSource) || /\{\s*id:\s*'home'/.test(searchSource)) {
  fail('routes', 'search.js maintains its own route table — derive it from the router ROUTES instead');
}
if (!searchSource.includes('Object.entries(ROUTES)')) {
  fail('routes', 'search.js no longer derives its page list from the router ROUTES table');
}

for (const [route, enPath] of routes) {
  const viPath = enPath.replace('pages/', 'pages/vi/');
  if (!exists(enPath)) fail('routes', `#${route} -> missing EN fragment ${enPath}`);
  if (!exists(viPath)) fail('routes', `#${route} -> missing VI fragment ${viPath}`);
}

// ── 2..6. Per-fragment contract checks ─────────────────────────────────
const fragments = [];
for (const [, enPath] of routes) {
  fragments.push(enPath, enPath.replace('pages/', 'pages/vi/'));
}

const publishedDocumentSet = new Set(PUBLISHED_DOCUMENTS);
const templateLinksByFragment = new Map();
const linkedDocumentsByLanguage = {
  en: new Set(),
  vi: new Set(),
};

function _unsafePath(value) {
  return value.includes('\\')
    || value.startsWith('/')
    || value.startsWith('.')
    || /[?#]/.test(value)
    || /^[A-Za-z][A-Za-z0-9+.-]*:/.test(value);
}

// The public templates use an in-page reader (the
// derived HTML preview), never trigger a direct download. The download anchor
// exists only inside the reader chrome, which main.js builds from the same
// data-template-preview attribute validated here.
function templatePreviewLinks(relative, html) {
  const links = [];

  const directDownload = html.match(/\bdata-template-download\b/);
  if (directDownload) {
    fail('template-reader', `${relative} still has a legacy direct-download template link`);
  }

  for (const anchor of html.matchAll(/<a\b([^>]*\bdata-template-preview\b[^>]*)>/gi)) {
    const attributes = anchor[1];
    const href = /\bhref\s*=\s*(["'])(.*?)\1/i.exec(attributes);
    const documentAttr = /\bdata-template-preview\s*=\s*(["'])(.*?)\1/i.exec(attributes);

    if (!href || !documentAttr || !documentAttr[2]) {
      fail('template-reader', `${relative} has a template card link without href or a document path`);
      continue;
    }
    if (/\sdownload(?:\s|=|>|$)/i.test(` ${attributes}`)) {
      fail('template-reader', `${relative} card for ${documentAttr[2]} downloads directly instead of opening the reader`);
    }

    const documentPath = documentAttr[2];
    const previewPath = href[2];
    if (_unsafePath(documentPath) || _unsafePath(previewPath)) {
      fail('template-reader', `${relative} has an unsafe or non-portable template path: ${previewPath} / ${documentPath}`);
      continue;
    }
    if (!publishedDocumentSet.has(documentPath)) {
      fail('template-reader', `${relative} references a document outside the publish allowlist: ${documentPath}`);
      continue;
    }
    if (previewPath !== documentPreviewPath(documentPath)) {
      fail('template-reader', `${relative} card href ${previewPath} is not the derived preview of ${documentPath}`);
      continue;
    }
    if (!exists(documentPath)) {
      fail('template-reader', `${relative} references a missing document: ${documentPath}`);
      continue;
    }
    if (!exists(previewPath)) {
      fail('template-reader', `${relative} references a missing preview: ${previewPath}`);
      continue;
    }
    const previewHtml = read(previewPath);
    if (!previewHtml.includes('id="doc-preview-content"')) {
      fail('template-reader', `${previewPath} has no #doc-preview-content for the in-page reader`);
    }
    links.push(documentPath);
  }
  return links;
}

for (const relative of [...new Set(fragments)]) {
  if (!exists(relative)) continue;
  const html = read(relative);

  // 2. shell contract
  if (!html.includes('id="sidebar-inner"')) fail('contract', `${relative} has no #sidebar-inner`);
  if (!html.includes('id="page-content"')) fail('contract', `${relative} has no #page-content`);

  // 2b. governance metadata: every fragment states a precise source-update
  // date next to its stampable version line (regression guard for the stale
  // "Effective 2025-Q2" metadata found in QA cycle 2026-07-20).
  const isVi = relative.startsWith('pages/vi/');
  const updatedPattern = isVi
    ? /Cập nhật: \d{4}-\d{2}-\d{2}<br\/>/
    : /Updated: \d{4}-\d{2}-\d{2}<br\/>/;
  if (!updatedPattern.test(html)) {
    fail('doc-control', `${relative} is missing the "${isVi ? 'Cập nhật' : 'Updated'}: YYYY-MM-DD" line in Document Control`);
  }

  // 3. CSP: no inline handlers
  const inlineHandler = html.match(/\son[a-z]+\s*=\s*"/i);
  if (inlineHandler) fail('csp', `${relative} still has an inline handler (${inlineHandler[0].trim()})`);

  // 4. duplicate ids
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
  const seen = new Set();
  const dupes = new Set();
  for (const id of ids) {
    if (seen.has(id)) dupes.add(id);
    seen.add(id);
  }
  if (dupes.size) fail('duplicate-id', `${relative} repeats id(s): ${[...dupes].join(', ')}`);

  // 5. section switcher targets resolve
  const sectionIds = new Set([...html.matchAll(/\sid="(sec-[^"]+)"/g)].map(m => m[1]));
  if (sectionIds.size) {
    const targets = [
      ...[...html.matchAll(/data-sec="([^"]+)"/g)].map(m => m[1]),
      ...[...html.matchAll(/data-section-target="([^"]+)"/g)].map(m => m[1]),
    ];
    const aliases = new Set(['secmap', 'secmodel']); // resolved by main.js to a parent view
    for (const target of new Set(targets)) {
      if (aliases.has(target)) continue;
      if (!sectionIds.has(`sec-${target}`)) {
        fail('section-target', `${relative} points at "${target}" but #sec-${target} does not exist`);
      }
    }
  }

  // 6. in-page route links are real routes
  const anchors = [...html.matchAll(/href="#([\w-]+)"/g)].map(m => m[1]);
  for (const anchor of new Set(anchors)) {
    const isRoute = routes.has(anchor);
    const isLocal = html.includes(`id="${anchor}"`);
    const isAlias = anchor === 'handbook' || anchor.startsWith('sec-');
    if (!isRoute && !isLocal && !isAlias) {
      fail('dead-link', `${relative} links to #${anchor} which is neither a route nor an id on the page`);
    }
  }

  const templateLinks = templatePreviewLinks(relative, html);
  templateLinksByFragment.set(relative, templateLinks);
  const language = relative.startsWith('pages/vi/') ? 'vi' : 'en';
  for (const documentPath of templateLinks) linkedDocumentsByLanguage[language].add(documentPath);
}

// The same route must expose the same curated files in the same order in both
// languages. Labels/descriptions may be localized; the release boundary may not.
for (const [, enPath] of routes) {
  const viPath = enPath.replace('pages/', 'pages/vi/');
  const enLinks = templateLinksByFragment.get(enPath) || [];
  const viLinks = templateLinksByFragment.get(viPath) || [];
  if (enLinks.join('\n') !== viLinks.join('\n')) {
    fail('template-symmetry', `${enPath} and ${viPath} expose different template files or ordering`);
  }
}

// Publishing an unreferenced document is both confusing and an unnecessary
// data exposure. Every reviewed file must be discoverable in both languages.
for (const documentPath of PUBLISHED_DOCUMENTS) {
  if (!exists(documentPath)) fail('template-manifest', `allowlisted document is missing: ${documentPath}`);
  if (!exists(documentPreviewPath(documentPath))) {
    fail('template-manifest', `derived reader preview is missing: ${documentPreviewPath(documentPath)}`);
  }
  for (const language of ['en', 'vi']) {
    if (!linkedDocumentsByLanguage[language].has(documentPath)) {
      fail('template-coverage', `${documentPath} is not linked from any ${language.toUpperCase()} fragment`);
    }
  }
}

// The canonical library is the primary discovery surface. Role pages may
// provide contextual shortcuts, but every published document must also be
// listed exactly once on the EN and VI Handbook template-library section.
for (const relative of ['pages/handbook.html', 'pages/vi/handbook.html']) {
  if (!exists(relative)) continue;
  const html = read(relative);
  const section = html.match(/<!-- SECTION 9: TEMPLATES LIBRARY -->([\s\S]*?)<!-- SECTION 10:/);
  if (!section) {
    fail('central-template-library', `${relative} has no bounded template-library section`);
    continue;
  }
  const links = templatePreviewLinks(relative, section[1]);
  for (const documentPath of PUBLISHED_DOCUMENTS) {
    const occurrences = links.filter(link => link === documentPath).length;
    if (occurrences !== 1) {
      fail('central-template-library', `${relative} lists ${documentPath} ${occurrences} time(s); expected exactly once`);
    }
  }
}

// ── 7. Cross-walk must be rectangular ──────────────────────────────────
for (const relative of ['pages/handbook.html', 'pages/vi/handbook.html']) {
  if (!exists(relative)) continue;
  const html = read(relative);
  const table = html.match(/<table class="xwalk">([\s\S]*?)<\/table>/);
  if (!table) {
    notes.push(`${relative}: no .xwalk table found (skipped)`);
    continue;
  }

  const head = table[1].match(/<thead>([\s\S]*?)<\/thead>/);
  if (!head) {
    fail('cross-walk', `${relative} .xwalk has no <thead>`);
    continue;
  }
  // phase columns = every <th> except the sticky role-label corner cell
  const phaseColumns = ([...head[1].matchAll(/<th\b/g)].length) - 1;

  const body = table[1].match(/<tbody>([\s\S]*?)<\/tbody>/);
  if (!body) {
    fail('cross-walk', `${relative} .xwalk has no <tbody>`);
    continue;
  }

  const rows = [...body[1].matchAll(/<tr>([\s\S]*?)<\/tr>/g)];
  if (!rows.length) fail('cross-walk', `${relative} .xwalk tbody has no rows`);

  for (const row of rows) {
    const label = (row[1].match(/xw-rolelabel">([^<]*)/) || [, '(unlabelled)'])[1].trim();
    let span = 0;
    for (const cell of row[1].matchAll(/<td\b([^>]*)>/g)) {
      if (/xw-rolelabel/.test(cell[1])) continue; // the role name column
      const colspan = cell[1].match(/colspan="(\d+)"/);
      span += colspan ? Number(colspan[1]) : 1;
    }
    if (span !== phaseColumns) {
      fail('cross-walk', `${relative} row "${label}" spans ${span} of ${phaseColumns} phase columns`);
    }
  }
}

// ── Report ─────────────────────────────────────────────────────────────
// The Claude plugin page must offer both distribution scopes: one full bundle
// and exactly one isolated package per role. EN/VI links and template counts
// are release metadata, so they must remain identical.
for (const relative of ['pages/plugin.html', 'pages/vi/plugin.html']) {
  if (!exists(relative)) continue;
  const html = read(relative);
  const marketplaceAdd = 'claude plugin marketplace add thienbitcoin2020/myhandbook';
  const fullInstall = `${marketplaceAdd}; claude plugin install project-handbook@power-home-handbook`;
  const anchors = [...html.matchAll(/<a\b([^>]*)>/g)].map(match => match[1]);
  const copyCommands = [...html.matchAll(/<button\b([^>]*\bdata-copy="([^"]+)"[^>]*)>/g)]
    .map(match => match[2]);
  const full = anchors.filter(attributes => (
    /href="assets\/downloads\/project-handbook\.plugin"/.test(attributes)
    && /(?:^|\s)download(?:\s|=|$)/.test(attributes)
  ));
  if (full.length !== 1) {
    fail('plugin-distribution', `${relative} must expose the full plugin exactly once`);
  }
  if (!copyCommands.includes(fullInstall)) {
    fail('plugin-distribution', `${relative} must expose a one-paste full-plugin install command`);
  }

  const discovered = new Set();
  for (const attributes of anchors) {
    const role = attributes.match(/data-role-plugin="([^"]+)"/)?.[1];
    if (!role) continue;
    const spec = ROLE_PLUGIN_PACKAGES.find(item => item.role === role);
    if (!spec) {
      fail('plugin-distribution', `${relative} exposes unknown role package: ${role}`);
      continue;
    }
    if (discovered.has(role)) {
      fail('plugin-distribution', `${relative} exposes role package twice: ${role}`);
    }
    discovered.add(role);
    const href = attributes.match(/href="([^"]+)"/)?.[1];
    const count = Number(attributes.match(/data-template-count="(\d+)"/)?.[1]);
    if (href !== spec.path || count !== spec.templates || !/(?:^|\s)download(?:\s|=|$)/.test(attributes)) {
      fail('plugin-distribution', `${relative} has stale metadata for ${role}`);
    }
  }
  for (const spec of ROLE_PLUGIN_PACKAGES) {
    if (!discovered.has(spec.role)) {
      fail('plugin-distribution', `${relative} does not expose ${spec.path}`);
    }
    const roleInstall = `${marketplaceAdd}; claude plugin install project-handbook-${spec.role}@power-home-handbook`;
    if (copyCommands.filter(command => command === roleInstall).length !== 1) {
      fail('plugin-distribution', `${relative} must expose one one-paste install command for ${spec.role}`);
    }
  }
}

for (const note of notes) console.log(`note  ${note}`);

if (failures.length) {
  console.error(`\n✗ consistency-check failed (${failures.length} problem(s)):\n`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log(`✓ consistency-check passed — ${routes.size} routes × EN/VI, section targets, links and cross-walk are consistent.`);
