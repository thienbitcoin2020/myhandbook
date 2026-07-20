import fs from 'node:fs';
import path from 'node:path';
import { GENERATED_ROLE_DOCUMENTS } from './role-template-manifest.mjs';

export const PUBLISHED_ROOT_FILES = Object.freeze([
  'vercel.json',
  'index.html',
  // Confidential content must never be crawled or indexed. robots.txt is a
  // crawler hint, not an access control — see SECURITY.md for the real gate.
  'robots.txt',
]);

/**
 * Legacy deep-link shims.
 *
 * These must be *published* at the artifact root because the root path is the
 * historical URL (`/pm-handbook.html`), and a static host such as GitHub Pages
 * cannot rewrite it server-side. Keeping eleven near-identical files in the
 * repository root buried the two real entry points, so they live in `legacy/`
 * and the builder puts them back at the root of `public/`.
 *
 * They are deliberately still committed files rather than build-time output:
 * the security gate runs before the build and scans every source file, so a
 * generated redirect would ship without ever passing the scanner.
 */
export const LEGACY_REDIRECT_DIR = 'legacy';

/**
 * Curated Office documents are intentionally listed one-by-one. Never replace
 * this with a recursive assets/templates allowlist: a newly dropped source
 * document must not become downloadable until its content, metadata and OOXML
 * package have passed review.
 */
export const PUBLISHED_DOCUMENTS = Object.freeze([
  'assets/templates/ba/business-requirements-document.docx',
  'assets/templates/ba/requirements-traceability-matrix.docx',
  'assets/templates/ba/software-requirements-specification.docx',
  'assets/templates/ba/use-case-specification.docx',
  'assets/templates/pm/project-charter.docx',
  'assets/templates/pm/project-management-plan.docx',
  'assets/templates/pm/raid-log.docx',
  'assets/templates/pm/status-report-one-page.docx',
  'assets/templates/po/epic-to-user-stories.docx',
  'assets/templates/po/product-requirements-document.docx',
  'assets/templates/po/product-vision-roadmap.docx',
  'assets/templates/sa/architecture-decision-record.docx',
  'assets/templates/sa/solution-architecture-document.docx',
  ...GENERATED_ROLE_DOCUMENTS,
]);

/**
 * Distributable bundles are, like the documents above, allowlisted one-by-one.
 * The plugin package is generated from reviewed handbook sources by
 * scripts/build-plugin.py and re-inspected as a ZIP by the security gate
 * (Markdown/JSON entries only) before it may publish.
 */
export const ROLE_PLUGIN_PACKAGES = Object.freeze([
  { role: 'po', skill: 'role-po', templates: 3, path: 'assets/downloads/roles/project-handbook-po.plugin' },
  { role: 'ba', skill: 'role-ba', templates: 4, path: 'assets/downloads/roles/project-handbook-ba.plugin' },
  { role: 'pm', skill: 'role-pm', templates: 4, path: 'assets/downloads/roles/project-handbook-pm.plugin' },
  { role: 'sm', skill: 'role-sm', templates: 0, path: 'assets/downloads/roles/project-handbook-sm.plugin' },
  { role: 'qc', skill: 'role-qc', templates: 5, path: 'assets/downloads/roles/project-handbook-qc.plugin' },
  { role: 'sa', skill: 'role-sa', templates: 4, path: 'assets/downloads/roles/project-handbook-sa.plugin' },
  { role: 'ux', skill: 'role-ux', templates: 5, path: 'assets/downloads/roles/project-handbook-ux.plugin' },
  { role: 'security', skill: 'role-security', templates: 5, path: 'assets/downloads/roles/project-handbook-security.plugin' },
  { role: 'ops', skill: 'role-ops', templates: 4, path: 'assets/downloads/roles/project-handbook-ops.plugin' },
  { role: 'deployment', skill: 'role-deployment', templates: 4, path: 'assets/downloads/roles/project-handbook-deployment.plugin' },
  { role: 'pmo', skill: 'role-pmo', templates: 4, path: 'assets/downloads/roles/project-handbook-pmo.plugin' },
]);

export const PUBLISHED_DOWNLOADS = Object.freeze([
  'assets/downloads/project-handbook.plugin',
  ...ROLE_PLUGIN_PACKAGES.map(({ path: packagePath }) => packagePath),
]);

/**
 * The documents are confidential, so the site opens an in-browser reader first
 * and offers the DOCX from inside it. Each published document therefore ships
 * with exactly one derived HTML preview; the path mapping is fixed so neither
 * the pages nor the checks ever hold a second hand-maintained list.
 */
export function documentPreviewPath(documentPath) {
  const fileName = documentPath.slice(documentPath.lastIndexOf('/') + 1);
  return `assets/templates/previews/${fileName.replace(/\.docx$/, '.html')}`;
}

const PUBLISHED_TREES = Object.freeze([
  { directory: 'pages', extensions: new Set(['.html']) },
  { directory: path.join('assets', 'css'), extensions: new Set(['.css']) },
  { directory: path.join('assets', 'js'), extensions: new Set(['.js']) },
  { directory: path.join('assets', 'fonts'), extensions: new Set(['.otf']) },
  { directory: path.join('assets', 'images'), extensions: new Set(['.png']) },
]);

function normalize(relative) {
  return relative.split(path.sep).join('/');
}

function assertRegularFile(root, relative) {
  const absolute = path.join(root, relative);
  const stat = fs.lstatSync(absolute);
  if (stat.isSymbolicLink() || !stat.isFile()) {
    throw new Error(`${normalize(relative)} must be a regular file (symlinks are forbidden)`);
  }
}

function collectTree(root, directory, extensions, results) {
  const absoluteDirectory = path.join(root, directory);
  const directoryStat = fs.lstatSync(absoluteDirectory);
  if (directoryStat.isSymbolicLink() || !directoryStat.isDirectory()) {
    throw new Error(`${normalize(directory)} must be a real directory (symlinks are forbidden)`);
  }

  for (const entry of fs.readdirSync(absoluteDirectory, { withFileTypes: true })) {
    const relative = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) {
      throw new Error(`${normalize(relative)} is a symlink; published symlinks are forbidden`);
    }
    if (entry.isDirectory()) {
      collectTree(root, relative, extensions, results);
      continue;
    }
    if (!entry.isFile()) {
      throw new Error(`${normalize(relative)} is not a regular file`);
    }
    if (!extensions.has(path.extname(entry.name).toLowerCase())) {
      throw new Error(`${normalize(relative)} has a file type that is not in the publish allowlist`);
    }
    results.push(normalize(relative));
  }
}

/**
 * Return every published file as an explicit { source, published } pair.
 *
 * `source` is the reviewed file in the repository (what the security scanner
 * reads); `published` is where it lands inside the artifact. They are identical
 * for everything except the legacy redirects, which are stored in `legacy/` but
 * published at the artifact root.
 */
export function getPublishedEntries(root = process.cwd()) {
  const entries = [];

  for (const relative of PUBLISHED_ROOT_FILES) {
    assertRegularFile(root, relative);
    entries.push({ source: normalize(relative), published: normalize(relative) });
  }

  const legacyFiles = [];
  collectTree(root, LEGACY_REDIRECT_DIR, new Set(['.html']), legacyFiles);
  for (const relative of legacyFiles) {
    const published = normalize(relative).slice(LEGACY_REDIRECT_DIR.length + 1);
    // The remap is the one place a source path and a URL diverge, so keep it
    // dumb and verifiable: flat files only, no nesting, no traversal.
    if (published.includes('/') || published.startsWith('.')) {
      throw new Error(`${normalize(relative)}: legacy redirects must be flat files directly in ${LEGACY_REDIRECT_DIR}/`);
    }
    entries.push({ source: normalize(relative), published });
  }

  for (const { directory, extensions } of PUBLISHED_TREES) {
    const results = [];
    collectTree(root, directory, extensions, results);
    for (const relative of results) {
      entries.push({ source: relative, published: relative });
    }
  }

  for (const relative of PUBLISHED_DOCUMENTS) {
    assertRegularFile(root, relative);
    entries.push({ source: normalize(relative), published: normalize(relative) });

    const preview = documentPreviewPath(relative);
    assertRegularFile(root, preview);
    entries.push({ source: normalize(preview), published: normalize(preview) });
  }

  for (const relative of PUBLISHED_DOWNLOADS) {
    assertRegularFile(root, relative);
    entries.push({ source: normalize(relative), published: normalize(relative) });
  }

  const claimed = new Set();
  for (const { source, published } of entries) {
    if (claimed.has(published)) {
      throw new Error(`${published} would be published twice (second source: ${source})`);
    }
    claimed.add(published);
  }

  return entries.sort((left, right) => left.published.localeCompare(right.published));
}

/**
 * Return the complete, deterministic list of source files allowed in the static
 * artifact. Both the security scanner and artifact builder consume this list,
 * so no file can be published without first passing the same gate.
 */
export function getPublishedFiles(root = process.cwd()) {
  return getPublishedEntries(root).map(entry => entry.source);
}
