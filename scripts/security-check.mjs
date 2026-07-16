import fs from 'node:fs';
import path from 'node:path';
import { getPublishedFiles } from './artifact-files.mjs';

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

let publishedFiles = [];
try {
  publishedFiles = getPublishedFiles(root);
} catch (error) {
  fail(`artifact allowlist: ${error.message}`);
}

const htmlFiles = publishedFiles.filter(relative => relative.endsWith('.html'));
const jsFiles = publishedFiles.filter(relative => relative.endsWith('.js'));
const cssFiles = publishedFiles.filter(relative => relative.endsWith('.css'));
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
if (handbookFragments.length !== 24) {
  fail(`document control: expected 24 EN/VI handbook fragments, found ${handbookFragments.length}`);
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

for (const [relative, route] of legacyRedirects) {
  const content = read(relative);
  if (!content.includes(`content="0;url=./#${route}"`)) {
    fail(`${relative}: legacy redirect must target the clean ./#${route} route`);
  }
  if (/index\.html/i.test(content)) {
    fail(`${relative}: legacy redirect must not expose index.html`);
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
  for (const protectedPath of ['/.github/workflows/', '/scripts/', '/SECURITY.md', '/start_server.bat']) {
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
