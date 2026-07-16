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
 *
 * Browser-level E2E (fast tab switching, 390px mobile, cache upgrade) needs a
 * real test runner and is tracked separately — see README.
 */

import fs from 'node:fs';
import path from 'node:path';

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

for (const relative of [...new Set(fragments)]) {
  if (!exists(relative)) continue;
  const html = read(relative);

  // 2. shell contract
  if (!html.includes('id="sidebar-inner"')) fail('contract', `${relative} has no #sidebar-inner`);
  if (!html.includes('id="page-content"')) fail('contract', `${relative} has no #page-content`);

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
for (const note of notes) console.log(`note  ${note}`);

if (failures.length) {
  console.error(`\n✗ consistency-check failed (${failures.length} problem(s)):\n`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log(`✓ consistency-check passed — ${routes.size} routes × EN/VI, section targets, links and cross-walk are consistent.`);
