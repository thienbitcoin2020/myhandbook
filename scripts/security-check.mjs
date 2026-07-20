import fs from 'node:fs';
import path from 'node:path';
import { inflateRawSync } from 'node:zlib';
import { getPublishedEntries, LEGACY_REDIRECT_DIR } from './artifact-files.mjs';

const root = process.cwd();
const failures = [];

function fail(message) {
  failures.push(message);
}

function read(relative) {
  return fs.readFileSync(path.join(root, relative), 'utf8');
}

function collect(directory, extension) {
  const results = [];
  const absoluteDirectory = path.join(root, directory);
  for (const entry of fs.readdirSync(absoluteDirectory, { withFileTypes: true })) {
    const relative = path.join(directory, entry.name);
    if (entry.isDirectory()) results.push(...collect(relative, extension));
    else if (entry.isFile() && entry.name.endsWith(extension)) results.push(relative);
  }
  return results;
}

let publishedEntries = [];
try {
  publishedEntries = getPublishedEntries(root);
} catch (error) {
  fail(`artifact allowlist: ${error.message}`);
}
// Scanning is always done against the reviewed source file.
const publishedFiles = publishedEntries.map(entry => entry.source);

const htmlFiles = publishedFiles.filter(relative => relative.endsWith('.html'));
const jsFiles = publishedFiles.filter(relative => relative.endsWith('.js'));
const cssFiles = publishedFiles.filter(relative => relative.endsWith('.css'));
const docxFiles = publishedFiles.filter(relative => relative.endsWith('.docx'));
const textRuntimeFiles = [...htmlFiles, ...jsFiles, ...cssFiles];

const secretPatterns = [
  ['hard-coded handbook credential', /AUTH_(?:USER|PASS)|handbook_auth/],
  ['private key', /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],
  ['GitHub token', /gh[pousr]_[A-Za-z0-9_]{20,}/],
  ['AWS access key', /AKIA[0-9A-Z]{16}/],
  ['Slack token', /xox[baprs]-[A-Za-z0-9-]{20,}/],
  ['JWT', /eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/],
  ['Google API key', /AIza[0-9A-Za-z_-]{35}/],
  ['Azure storage connection string', /DefaultEndpointsProtocol=https?;[^\r\n]*AccountKey=/i],
  ['generic assigned secret', /\b(?:password|passwd|secret|api[_-]?key|access[_-]?token)\s*[:=]\s*['"][^'"\r\n]{8,}['"]/i],
];

// High-confidence personal-data patterns are limited to curated document XML.
// Placeholders such as "[enter email]" remain valid; real-looking values do not.
const documentPiiPatterns = [
  ['email address', /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i],
  ['Vietnamese phone number', /(?:^|[^0-9])(?:\+84|0)(?:3|5|7|8|9)[0-9]{8}(?:[^0-9]|$)/],
  // Hex boundaries are excluded on purpose: sanitized media parts are renamed
  // to their SHA-1 (word/media/<40-hex>.png), and any 12 consecutive decimal
  // digits inside such a hash tripped this as a false positive. A real citizen
  // ID in document text is never embedded inside a longer hex string.
  ['12-digit citizen identifier', /(?:^|[^0-9a-fA-F])[0-9]{12}(?:[^0-9a-fA-F]|$)/],
];

const DOCX_MAX_ENTRIES = 2048;
const DOCX_MAX_ENTRY_BYTES = 20 * 1024 * 1024;
const DOCX_MAX_TOTAL_BYTES = 50 * 1024 * 1024;
const DOCX_MAX_COMPRESSION_RATIO = 200;

function findEndOfCentralDirectory(buffer) {
  const signature = 0x06054b50;
  const earliest = Math.max(0, buffer.length - 65_557);
  for (let offset = buffer.length - 22; offset >= earliest; offset -= 1) {
    if (buffer.readUInt32LE(offset) !== signature) continue;
    const commentLength = buffer.readUInt16LE(offset + 20);
    if (offset + 22 + commentLength === buffer.length) return offset;
  }
  throw new Error('not a valid ZIP package (end-of-central-directory record is missing)');
}

function decodeZipName(bytes) {
  const name = bytes.toString('utf8');
  if (!name || name.includes('\u0000') || name.includes('\ufffd')) {
    throw new Error('ZIP entry has an invalid UTF-8 filename');
  }
  return name;
}

function validateZipPath(name) {
  if (name.includes('\\')
      || name.startsWith('/')
      || /^[A-Za-z]:/.test(name)
      || name.includes('//')
      || /(^|\/)\.\.?(\/|$)/.test(name)) {
    throw new Error(`unsafe ZIP entry path: ${name}`);
  }
}

function parseZipEntries(buffer) {
  const eocd = findEndOfCentralDirectory(buffer);
  const disk = buffer.readUInt16LE(eocd + 4);
  const centralDisk = buffer.readUInt16LE(eocd + 6);
  const diskEntries = buffer.readUInt16LE(eocd + 8);
  const totalEntries = buffer.readUInt16LE(eocd + 10);
  const centralSize = buffer.readUInt32LE(eocd + 12);
  const centralOffset = buffer.readUInt32LE(eocd + 16);

  if (disk !== 0 || centralDisk !== 0 || diskEntries !== totalEntries) {
    throw new Error('multi-disk ZIP packages are forbidden');
  }
  if (totalEntries === 0 || totalEntries > DOCX_MAX_ENTRIES) {
    throw new Error(`ZIP entry count must be between 1 and ${DOCX_MAX_ENTRIES}`);
  }
  if (totalEntries === 0xffff || centralSize === 0xffffffff || centralOffset === 0xffffffff) {
    throw new Error('ZIP64 packages are forbidden');
  }
  if (centralOffset + centralSize !== eocd || centralOffset > buffer.length) {
    throw new Error('ZIP central directory boundaries are invalid');
  }

  const entries = [];
  const names = new Set();
  let cursor = centralOffset;
  let totalUncompressed = 0;
  let totalCompressed = 0;

  for (let index = 0; index < totalEntries; index += 1) {
    if (cursor + 46 > eocd || buffer.readUInt32LE(cursor) !== 0x02014b50) {
      throw new Error(`ZIP central-directory entry ${index + 1} is malformed`);
    }

    const flags = buffer.readUInt16LE(cursor + 8);
    const method = buffer.readUInt16LE(cursor + 10);
    const compressedSize = buffer.readUInt32LE(cursor + 20);
    const uncompressedSize = buffer.readUInt32LE(cursor + 24);
    const nameLength = buffer.readUInt16LE(cursor + 28);
    const extraLength = buffer.readUInt16LE(cursor + 30);
    const commentLength = buffer.readUInt16LE(cursor + 32);
    const localOffset = buffer.readUInt32LE(cursor + 42);
    const next = cursor + 46 + nameLength + extraLength + commentLength;
    if (next > eocd) throw new Error(`ZIP central-directory entry ${index + 1} exceeds its boundary`);

    const name = decodeZipName(buffer.subarray(cursor + 46, cursor + 46 + nameLength));
    validateZipPath(name);
    const canonicalName = name.toLowerCase();
    if (names.has(canonicalName)) throw new Error(`duplicate ZIP entry name: ${name}`);
    names.add(canonicalName);

    if ((flags & 0x0001) !== 0) throw new Error(`${name}: encrypted ZIP entries are forbidden`);
    if (method !== 0 && method !== 8) throw new Error(`${name}: unsupported ZIP compression method ${method}`);
    if (uncompressedSize > DOCX_MAX_ENTRY_BYTES) {
      throw new Error(`${name}: uncompressed entry exceeds ${DOCX_MAX_ENTRY_BYTES / 1024 / 1024} MiB`);
    }
    if (uncompressedSize > 0 && compressedSize === 0) throw new Error(`${name}: invalid zero compressed size`);
    if (compressedSize > 0 && uncompressedSize / compressedSize > DOCX_MAX_COMPRESSION_RATIO) {
      throw new Error(`${name}: suspicious compression ratio`);
    }

    totalUncompressed += uncompressedSize;
    totalCompressed += compressedSize;
    if (totalUncompressed > DOCX_MAX_TOTAL_BYTES) {
      throw new Error(`DOCX expands beyond ${DOCX_MAX_TOTAL_BYTES / 1024 / 1024} MiB`);
    }

    entries.push({ name, canonicalName, flags, method, compressedSize, uncompressedSize, localOffset });
    cursor = next;
  }

  if (cursor !== eocd) throw new Error('ZIP central directory contains unparsed data');
  if (totalCompressed > 0 && totalUncompressed / totalCompressed > DOCX_MAX_COMPRESSION_RATIO) {
    throw new Error('DOCX has a suspicious aggregate compression ratio');
  }

  return entries;
}

function inflateZipEntry(packageBuffer, entry, centralDirectoryOffset) {
  const { name, flags, method, compressedSize, uncompressedSize, localOffset } = entry;
  if (localOffset + 30 > centralDirectoryOffset || packageBuffer.readUInt32LE(localOffset) !== 0x04034b50) {
    throw new Error(`${name}: local ZIP header is invalid`);
  }

  const localFlags = packageBuffer.readUInt16LE(localOffset + 6);
  const localMethod = packageBuffer.readUInt16LE(localOffset + 8);
  const localNameLength = packageBuffer.readUInt16LE(localOffset + 26);
  const localExtraLength = packageBuffer.readUInt16LE(localOffset + 28);
  const dataOffset = localOffset + 30 + localNameLength + localExtraLength;
  const dataEnd = dataOffset + compressedSize;
  if (dataEnd > centralDirectoryOffset) throw new Error(`${name}: compressed data exceeds the file-data region`);
  if ((localFlags & 0x0001) !== 0 || localFlags !== flags || localMethod !== method) {
    throw new Error(`${name}: local and central ZIP headers disagree`);
  }

  const localName = decodeZipName(packageBuffer.subarray(localOffset + 30, localOffset + 30 + localNameLength));
  if (localName !== name) throw new Error(`${name}: local and central ZIP filenames disagree`);

  const compressed = packageBuffer.subarray(dataOffset, dataEnd);
  const output = method === 0
    ? Buffer.from(compressed)
    : inflateRawSync(compressed, { maxOutputLength: DOCX_MAX_ENTRY_BYTES + 1 });
  if (output.length !== uncompressedSize) throw new Error(`${name}: declared and actual sizes disagree`);
  return output;
}

function xmlElementValue(xml, localName) {
  const prefix = '(?:[A-Za-z_][\\w.-]*:)?';
  const paired = new RegExp(`<${prefix}${localName}\\b[^>]*>([\\s\\S]*?)<\\/${prefix}${localName}\\s*>`, 'i').exec(xml);
  if (paired) {
    return paired[1]
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<[^>]+>/g, '')
      .replace(/&#x([0-9a-f]+);/gi, (_, value) => String.fromCodePoint(parseInt(value, 16)))
      .replace(/&#([0-9]+);/g, (_, value) => String.fromCodePoint(parseInt(value, 10)))
      .replace(/&(amp|lt|gt|quot|apos);/g, (_, entity) => ({ amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" })[entity])
      .trim();
  }
  const selfClosing = new RegExp(`<${prefix}${localName}\\b[^>]*/\\s*>`, 'i');
  return selfClosing.test(xml) ? '' : null;
}

function scanSensitiveDocumentXml(relative, entryName, xml) {
  for (const [label, pattern] of [...secretPatterns, ...documentPiiPatterns]) {
    pattern.lastIndex = 0;
    if (pattern.test(xml)) fail(`${relative} (${entryName}): ${label} detected`);
  }
}

function inspectDocx(relative) {
  const packageBuffer = fs.readFileSync(path.join(root, relative));
  const eocd = findEndOfCentralDirectory(packageBuffer);
  const centralDirectoryOffset = packageBuffer.readUInt32LE(eocd + 16);
  const entries = parseZipEntries(packageBuffer);
  const content = new Map();

  for (const entry of entries) {
    const name = entry.canonicalName;
    if (/^word\/(?:activex|embeddings)\//i.test(name)
        || /(?:^|\/)(?:vbaproject\.bin|oleobject[^/]*|afchunk[^/]*|altchunk[^/]*)$/i.test(name)
        || /^_xmlsignatures\//i.test(name)
        || /\.(?:exe|dll|com|scr|bat|cmd|ps1|vbs|js|jar|msi|hta|sh|py|pl|php)$/i.test(name)) {
      throw new Error(`${entry.name}: active or embedded content is forbidden`);
    }

    if (entry.name.endsWith('/')) continue;
    const bytes = inflateZipEntry(packageBuffer, entry, centralDirectoryOffset);
    content.set(name, bytes);

    if (/\.(?:xml|rels)$/i.test(name) || name === '[content_types].xml') {
      const xml = bytes.toString('utf8');
      if (xml.includes('\ufffd') || xml.includes('\u0000')) throw new Error(`${entry.name}: XML is not valid UTF-8 text`);
      scanSensitiveDocumentXml(relative, entry.name, xml);
      if (/\b(?:macroEnabled|vbaProject)\b/i.test(xml)
          || /<(?:[A-Za-z_][\w.-]*:)?altChunk\b/i.test(xml)) {
        throw new Error(`${entry.name}: macro or altChunk content is forbidden`);
      }
      if (/\.rels$/i.test(name)
          && (/<(?:[A-Za-z_][\w.-]*:)?Relationship\b[^>]*\bTargetMode\s*=\s*["']External["']/i.test(xml)
            || /<(?:[A-Za-z_][\w.-]*:)?Relationship\b[^>]*\bTarget\s*=\s*["'](?:https?:|mailto:|file:|\\\\)/i.test(xml))) {
        throw new Error(`${entry.name}: external relationships are forbidden`);
      }
    }
  }

  for (const required of ['[content_types].xml', '_rels/.rels', 'word/document.xml', 'docprops/core.xml']) {
    if (!content.has(required)) throw new Error(`required OOXML part is missing: ${required}`);
  }

  const contentTypes = content.get('[content_types].xml').toString('utf8');
  if (!/application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document\.main\+xml/i.test(contentTypes)) {
    throw new Error('package is not a standard macro-free Word document');
  }

  const core = content.get('docprops/core.xml').toString('utf8');
  for (const field of ['creator', 'lastModifiedBy']) {
    const value = xmlElementValue(core, field);
    if (value === null) throw new Error(`core metadata field is missing: ${field}`);
    if (value !== '') throw new Error(`core metadata must be empty: ${field}`);
  }
}

for (const relative of publishedFiles) {
  const absolute = path.join(root, relative);
  const stat = fs.statSync(absolute);
  if (stat.size > 5 * 1024 * 1024) {
    fail(`${relative}: published file exceeds the 5 MiB safety limit`);
  }
  const content = fs.readFileSync(absolute).toString('utf8');
  for (const [label, pattern] of secretPatterns) {
    if (pattern.test(content)) fail(`${relative}: ${label} detected`);
  }
}

for (const relative of docxFiles) {
  try {
    inspectDocx(relative);
  } catch (error) {
    fail(`${relative}: DOCX package rejected (${error.message})`);
  }
}

// The Claude plugin bundle reuses the hardened ZIP parser: safe entry paths,
// no encryption, sane compression ratios. On top of that it may only carry
// Markdown and JSON text, must declare the reviewed manifest, and every entry
// is scanned with the same secret patterns as any published text file.
function inspectPluginPackage(relative) {
  const packageBuffer = fs.readFileSync(path.join(root, relative));
  const eocd = findEndOfCentralDirectory(packageBuffer);
  const centralDirectoryOffset = packageBuffer.readUInt32LE(eocd + 16);
  const entries = parseZipEntries(packageBuffer);
  let manifestSeen = false;

  for (const entry of entries) {
    if (entry.name.endsWith('/')) continue;
    if (!/\.(?:md|json)$/i.test(entry.canonicalName)) {
      throw new Error(`${entry.name}: only Markdown and JSON entries may ship in the plugin package`);
    }
    const text = inflateZipEntry(packageBuffer, entry, centralDirectoryOffset).toString('utf8');
    if (text.includes('\u0000') || text.includes('\ufffd')) {
      throw new Error(`${entry.name}: entry is not valid UTF-8 text`);
    }
    for (const [label, pattern] of secretPatterns) {
      pattern.lastIndex = 0;
      if (pattern.test(text)) fail(`${relative} (${entry.name}): ${label} detected`);
    }
    if (entry.canonicalName === '.claude-plugin/plugin.json') {
      manifestSeen = true;
      const manifest = JSON.parse(text);
      if (manifest.name !== 'project-handbook' || !/^\d+\.\d+\.\d+$/.test(String(manifest.version))) {
        throw new Error('plugin manifest must declare the project-handbook name and a semver version');
      }
    }
  }

  if (!manifestSeen) throw new Error('required manifest is missing: .claude-plugin/plugin.json');
}

for (const relative of publishedFiles.filter(file => file.endsWith('.plugin'))) {
  try {
    inspectPluginPackage(relative);
  } catch (error) {
    fail(`${relative}: plugin package rejected (${error.message})`);
  }
}

for (const relative of textRuntimeFiles) {
  const content = read(relative);
  if (/https?:\/\//i.test(content)) fail(`${relative}: external runtime URL detected`);
}

for (const relative of htmlFiles) {
  const content = read(relative);
  if (/\son[a-z][a-z0-9_-]*\s*=/i.test(content)) {
    fail(`${relative}: inline event handler detected`);
  }
  if (/<script(?![^>]*\bsrc=)[^>]*>/i.test(content)) {
    fail(`${relative}: inline script detected`);
  }
  if (relative !== 'index.html' && /<script\b/i.test(content)) {
    fail(`${relative}: script elements are forbidden outside the reviewed SPA shell`);
  }
}

const handbookFragments = collect('pages', '.html');
if (handbookFragments.length !== 26) {
  fail(`document control: expected 26 EN/VI handbook fragments, found ${handbookFragments.length}`);
}

const indexDocument = read('index.html');
if (!/<meta name="handbook-deployment-version" content="v[^"]+" \/>/.test(indexDocument)) {
  fail('index.html: deployment-version metadata is missing');
}

for (const relative of handbookFragments) {
  const content = read(relative);
  const isVietnamese = relative.split(path.sep).includes('vi');
  const heading = isVietnamese ? 'Kiểm soát tài liệu' : 'Document Control';
  const owner = isVietnamese
    ? 'Chủ quản: Thiện Phạm (Power Home PO)<br/>'
    : 'Owner: Thiện Phạm (Power Home PO)<br/>';
  const versionPattern = isVietnamese
    ? /Phiên bản: v\d+(?:\.\d+)* · Hiệu lực /
    : /Version: v\d+(?:\.\d+)* · Effective /;
  const headingIndex = content.indexOf(`<strong>${heading}</strong>`);
  const controlBlock = headingIndex >= 0 ? content.slice(headingIndex, headingIndex + 600) : '';

  if (headingIndex < 0) fail(`${relative}: ${heading} block is missing`);
  if (!controlBlock.includes(owner)) fail(`${relative}: document-control owner must be Thiện Phạm (Power Home PO)`);
  if (!versionPattern.test(controlBlock)) fail(`${relative}: deploy-stampable document version is missing`);
}

for (const [relative, owner] of [
  ['pages/handbook.html', 'Owner: Thiện Phạm (Power Home PO)'],
  ['pages/vi/handbook.html', 'Chủ quản: Thiện Phạm (Power Home PO)'],
]) {
  if (!read(relative).includes(owner)) fail(`${relative}: handbook footer owner is not synchronized`);
}

const sharedStyles = read(path.join('assets', 'css', 'styles.css'));
for (const [label, pattern] of [
  ['handbook sections', /\.section\s*\{[^}]*display\s*:\s*none/i],
  ['generic tab panels', /\.tab-panel\s*\{[^}]*display\s*:\s*none/i],
  ['role panels', /\.role-panel\s*\{[^}]*display\s*:\s*none/i],
]) {
  if (pattern.test(sharedStyles)) fail(`styles.css: ${label} must be visible by default`);
}
if (!/\.section\s*\{[^}]*display\s*:\s*block/i.test(sharedStyles)) {
  fail('styles.css: handbook sections must explicitly render as blocks');
}
if (!/\.tab-panel,\s*\.role-panel\s*\{[^}]*display\s*:\s*block/i.test(sharedStyles)) {
  fail('styles.css: tab and role panels must explicitly render as blocks');
}

for (const relative of ['pages/deployment.html', 'pages/vi/deployment.html']) {
  const content = read(relative);
  if (content.includes('role="tablist"') || content.includes('aria-selected=')) {
    fail(`${relative}: always-visible role navigation must not expose hidden-tab semantics`);
  }
  for (const role of ['rm', 'pt', 'st']) {
    if (!content.includes(`aria-controls="panel-${role}"`)) {
      fail(`${relative}: role navigation is missing aria-controls for ${role}`);
    }
    if (!content.includes(`id="panel-${role}" class="role-panel`) || !content.includes(`aria-labelledby="tab-${role}"`)) {
      fail(`${relative}: visible role panel ${role} is missing region labelling`);
    }
  }
}

for (const relative of jsFiles) {
  const content = read(relative);
  if (/\b(?:innerHTML|outerHTML|insertAdjacentHTML|document\.write|eval)\b|new\s+Function\b/.test(content)) {
    fail(`${relative}: dangerous HTML or code-execution sink detected`);
  }
}

const index = read('index.html');
const cspMatch = index.match(/http-equiv="Content-Security-Policy"\s+content="([^"]+)"/i);
if (!cspMatch) {
  fail('index.html: Content Security Policy is missing');
} else {
  const csp = cspMatch[1];
  if (!/script-src\s+'self'(?:;|$)/.test(csp)) fail('index.html: script-src must allow only self');
  if (/script-src[^;]*'unsafe-inline'/.test(csp)) fail('index.html: unsafe-inline scripts are forbidden');
  for (const directive of ["default-src 'self'", "base-uri 'none'", "object-src 'none'", "form-action 'none'"]) {
    if (!csp.includes(directive)) fail(`index.html: CSP directive missing: ${directive}`);
  }
}

if (!index.includes('name="referrer" content="no-referrer"')) {
  fail('index.html: no-referrer policy is missing');
}

const router = read(path.join('assets', 'js', 'router.js'));
for (const invariant of [
  'function _canonicalizeShellUrl()',
  "url.pathname.replace(/\\/index\\.html$/i, '/')",
  'history.replaceState(',
]) {
  if (!router.includes(invariant)) {
    fail(`router.js: clean-shell URL invariant missing: ${invariant}`);
  }
}

// Legacy shims live in legacy/ but publish at the artifact root, so the URL a
// user hits is the *published* name. Verify against that name, not the source
// path, and confirm the builder still lands each one at the root.
const legacyRedirects = new Map([
  ['handbook.html', 'home'],
  ['ba-handbook.html', 'ba'],
  ['pm-handbook.html', 'pm'],
  ['qc-handbook.html', 'qc'],
  ['po-handbook.html', 'po'],
  ['sa-handbook.html', 'sa'],
  ['sec-handbook.html', 'sec'],
  ['ops-handbook.html', 'ops'],
  ['sm-handbook.html', 'sm'],
  ['ux-handbook.html', 'ux'],
  ['pmo-handbook.html', 'pmo'],
]);

const legacyEntries = new Map(
  publishedEntries
    .filter(entry => entry.source.startsWith(`${LEGACY_REDIRECT_DIR}/`))
    .map(entry => [entry.published, entry.source]),
);

for (const [published, route] of legacyRedirects) {
  const source = legacyEntries.get(published);
  if (!source) {
    fail(`${published}: legacy redirect is no longer published at the artifact root`);
    continue;
  }
  const content = read(source);
  if (!content.includes(`content="0;url=./#${route}"`)) {
    fail(`${source}: legacy redirect must target the clean ./#${route} route`);
  }
  if (/index\.html/i.test(content)) {
    fail(`${source}: legacy redirect must not expose index.html`);
  }
}

// A stray file in legacy/ would silently publish to the site root.
for (const published of legacyEntries.keys()) {
  if (!legacyRedirects.has(published)) {
    fail(`${LEGACY_REDIRECT_DIR}/${published}: unreviewed file would publish to the artifact root`);
  }
}

const vercelConfigPath = 'vercel.json';
let vercelConfig;
try {
  vercelConfig = JSON.parse(read(vercelConfigPath));
} catch (error) {
  fail(`${vercelConfigPath}: invalid JSON (${error.message})`);
}

if (vercelConfig) {
  const configKeys = Object.keys(vercelConfig).sort();
  if (configKeys.join(',') !== 'buildCommand,outputDirectory,redirects') {
    fail('vercel.json: only the reviewed static build, output directory, and canonical redirect are allowed');
  }
  if (vercelConfig.buildCommand !== 'node scripts/security-check.mjs && node scripts/build-static-artifact.mjs') {
    fail('vercel.json: build command must run the security gate before assembling the artifact');
  }
  if (vercelConfig.outputDirectory !== 'public') {
    fail('vercel.json: only the reviewed public/ artifact may be deployed');
  }

  const redirects = vercelConfig.redirects;
  const canonicalRedirect = Array.isArray(redirects) && redirects.length === 1
    ? redirects[0]
    : null;
  const redirectKeys = canonicalRedirect && typeof canonicalRedirect === 'object'
    ? Object.keys(canonicalRedirect).sort()
    : [];
  if (!canonicalRedirect
      || redirectKeys.join(',') !== 'destination,permanent,source'
      || canonicalRedirect.source !== '/index.html'
      || canonicalRedirect.destination !== '/'
      || canonicalRedirect.permanent !== true) {
    fail('vercel.json: /index.html must permanently redirect to / with no additional routing behavior');
  }
}

if (fs.existsSync(path.join(root, 'pages', 'home.html')) || fs.existsSync(path.join(root, 'pages', 'vi', 'home.html'))) {
  fail('Duplicate Home fragments must not be restored');
}

if (!router.includes("'home':       'pages/handbook.html'")) {
  fail('router.js: #home must resolve to the canonical Implementation Handbook');
}

for (const relative of ['pages/handbook.html', 'pages/vi/handbook.html']) {
  const content = read(relative);
  for (const legacySwitcher of ['data-sec="secmap"', 'data-sec="secmodel"']) {
    if (content.includes(legacySwitcher)) {
      fail(`${relative}: consolidated overview must not restore the ${legacySwitcher} sidebar view`);
    }
  }
  for (const childId of ['sec-secmap', 'sec-secmodel']) {
    const occurrences = content.match(new RegExp(`id="${childId}"`, 'g')) || [];
    if (occurrences.length !== 1
        || !new RegExp(`<section class="overview-subsection[^"]*" id="${childId}"`).test(content)) {
      fail(`${relative}: consolidated child section ${childId} must exist exactly once`);
    }
  }
  for (const parentId of ['sec-landing', 'sec-secxwalk']) {
    if (!new RegExp(`<div class="section(?: active)?" id="${parentId}"`).test(content)) {
      fail(`${relative}: consolidated parent view ${parentId} is missing`);
    }
  }
}

for (const sectionHash of ['sec-secmap', 'sec-secmodel']) {
  if (!router.includes(`'${sectionHash}':`)) {
    fail(`router.js: legacy overview hash ${sectionHash} must remain supported`);
  }
}

if (!router.includes("'secxwalk'") || !router.includes('hashes[`sec-${parent}`] = request;')) {
  fail('router.js: generated legacy overview hash sec-secxwalk must remain supported');
}

const deployWorkflow = read(path.join('.github', 'workflows', 'deploy-pages.yml'));
if (/^\s*(?:push|pull_request|schedule)\s*:/m.test(deployWorkflow)
    || /^\s*on\s*:\s*\[[^\]]*(?:push|pull_request|schedule)/m.test(deployWorkflow)) {
  fail('deploy-pages.yml: automatic deployment trigger is forbidden');
}
if (!deployWorkflow.includes('HANDBOOK_DEPLOYMENT_APPROVED')) {
  fail('deploy-pages.yml: fail-closed deployment approval is missing');
}
if (!deployWorkflow.includes('node scripts/build-static-artifact.mjs')) {
  fail('deploy-pages.yml: artifact must be assembled from the shared publish allowlist');
}
if (!deployWorkflow.includes('HANDBOOK_DEPLOY_ID: ${{ github.run_id }}-${{ github.run_attempt }}')) {
  fail('deploy-pages.yml: every deployment must receive a unique run ID for document versioning');
}
if (!deployWorkflow.includes('DISPATCH_REF: ${{ github.ref }}')
    || !deployWorkflow.includes('EXPECTED_REF: refs/heads/${{ github.event.repository.default_branch }}')) {
  fail('deploy-pages.yml: dispatch must be restricted to the protected default branch');
}
if (!deployWorkflow.includes('ref: ${{ github.sha }}')) {
  fail('deploy-pages.yml: deployment must build the exact immutable dispatched revision');
}

const artifactBuilder = read(path.join('scripts', 'build-static-artifact.mjs'));
for (const invariant of [
  'const VERSION_REPLACEMENTS',
  'function resolveDeploymentVersion',
  'function stampDeploymentVersion',
  'Deployment version stamped:',
]) {
  if (!artifactBuilder.includes(invariant)) {
    fail(`build-static-artifact.mjs: deployment-version invariant missing: ${invariant}`);
  }
}

const securityWorkflowPath = path.join('.github', 'workflows', 'security-check.yml');
if (!fs.existsSync(path.join(root, securityWorkflowPath))) {
  fail('security-check.yml: required security workflow is missing');
} else {
  const securityWorkflow = read(securityWorkflowPath);
  if (!/^\s{2}pull_request_target\s*:\s*$/m.test(securityWorkflow)) {
    fail('security-check.yml: pull requests must use the trusted-base pull_request_target gate');
  }
  if (/^\s{2}pull_request\s*:\s*$/m.test(securityWorkflow)) {
    fail('security-check.yml: candidate-controlled pull_request workflow is forbidden');
  }
  for (const invariant of [
    'path: candidate',
    'path: trusted',
    "github.event_name == 'pull_request_target'",
    'github.event.pull_request.head.repo.full_name',
    'github.event.pull_request.head.sha',
    "github.event.pull_request.base.sha",
    'working-directory: candidate',
    'node ../trusted/scripts/security-check.mjs',
  ]) {
    if (!securityWorkflow.includes(invariant)) {
      fail(`security-check.yml: trusted-scanner invariant missing: ${invariant}`);
    }
  }
}

const codeownersPath = path.join('.github', 'CODEOWNERS');
if (!fs.existsSync(path.join(root, codeownersPath))) {
  fail('CODEOWNERS: security-critical ownership rules are missing');
} else {
  const codeowners = read(codeownersPath);
  for (const protectedPath of ['/.github/workflows/', '/scripts/', '/assets/templates/', '/SECURITY.md', '/start_server.bat']) {
    if (!codeowners.includes(protectedPath)) {
      fail(`CODEOWNERS: security-critical path is not owned: ${protectedPath}`);
    }
  }
}

const workflowFiles = [
  ...collect(path.join('.github', 'workflows'), '.yml'),
  ...collect(path.join('.github', 'workflows'), '.yaml'),
];
for (const relative of workflowFiles) {
  for (const line of read(relative).split(/\r?\n/)) {
    if (!line.includes('uses:')) continue;
    const match = line.match(/uses:\s*[^@\s]+@([0-9a-f]{40})(?:\s|$)/i);
    if (!match) fail(`${relative}: action is not pinned to a full commit SHA: ${line.trim()}`);
  }
}

if (failures.length) {
  console.error(`Security check failed with ${failures.length} finding(s):`);
  failures.forEach(item => console.error(`- ${item}`));
  process.exit(1);
}

console.log(`Security check passed: ${publishedFiles.length} published files and deployment controls verified.`);
