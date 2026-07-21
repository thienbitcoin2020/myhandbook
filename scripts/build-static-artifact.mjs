import fs from 'node:fs';
import path from 'node:path';
import { getPublishedEntries } from './artifact-files.mjs';

const root = process.cwd();
const output = path.join(root, 'public');
const entries = getPublishedEntries(root);
// Version stamping addresses files by where they live in the artifact.
const files = entries.map(entry => entry.published);

const VERSION_PATTERN = /^v[A-Za-z0-9][A-Za-z0-9._-]{2,47}$/;
const VERSION_REPLACEMENTS = Object.freeze([
  {
    label: 'document-control versions',
    pattern: /((?:Version|Phiên bản):\s*)v\d+(?:\.\d+)*/g,
    expected: 26,
  },
  {
    label: 'current-version footers',
    pattern: /(Handbook · [^<\r\n]*?)v\d+(?:\.\d+)*(?= ·)/g,
    expected: 26,
  },
  {
    label: 'deployment sidebar versions',
    pattern: /(<div class="bank-sub">)v\d+(?:\.\d+)*/g,
    expected: 2,
  },
  {
    label: 'handbook sidebar versions',
    pattern: /(<div class="sb-sub">Handbook · )v\d+(?:\.\d+)*/g,
    expected: 2,
  },
]);

function validateVersion(version) {
  if (!VERSION_PATTERN.test(version)) {
    throw new Error('Deployment version must match ' + VERSION_PATTERN);
  }
  return version;
}

function validateDeploymentId(value) {
  if (!/^[A-Za-z0-9._-]{1,64}$/.test(value)) {
    throw new Error('Deployment ID contains unsupported characters or is longer than 64 characters');
  }
  return value;
}

function utcTimestamp(date) {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

function resolveDeploymentVersion(environment = process.env, now = new Date()) {
  const explicitVersion = environment.HANDBOOK_DEPLOY_VERSION?.trim();
  if (explicitVersion) return validateVersion(explicitVersion);

  const target = (environment.VERCEL === '1' || environment.VERCEL_DEPLOYMENT_ID)
    ? 'vercel'
    : (environment.GITHUB_ACTIONS === 'true' ? 'gh' : 'build');
  const fallbackId = utcTimestamp(now);
  const rawDeploymentId = environment.HANDBOOK_DEPLOY_ID
    || environment.VERCEL_DEPLOYMENT_ID
    || (environment.GITHUB_RUN_ID
      ? `${environment.GITHUB_RUN_ID}-${environment.GITHUB_RUN_ATTEMPT || '1'}`
      : fallbackId);
  const deploymentId = validateDeploymentId(rawDeploymentId).replace(/^dpl_/, '').slice(0, 16);
  const deploymentDate = now.toISOString().slice(0, 10).replace(/-/g, '.');

  return validateVersion(`v${deploymentDate}-${target}.${deploymentId}`);
}

function stampDeploymentVersion(version) {
  const counts = new Map(VERSION_REPLACEMENTS.map(rule => [rule.label, 0]));
  const fragmentFiles = files.filter(relative => relative.startsWith('pages/') && relative.endsWith('.html'));

  for (const relative of fragmentFiles) {
    const destination = path.join(output, relative);
    let content = fs.readFileSync(destination, 'utf8');

    for (const rule of VERSION_REPLACEMENTS) {
      content = content.replace(rule.pattern, (match, prefix) => {
        counts.set(rule.label, counts.get(rule.label) + 1);
        return prefix + version;
      });
    }

    fs.writeFileSync(destination, content, 'utf8');
  }

  for (const rule of VERSION_REPLACEMENTS) {
    const actual = counts.get(rule.label);
    if (actual !== rule.expected) {
      throw new Error(`Version stamping failed for ${rule.label}: expected ${rule.expected}, found ${actual}`);
    }
  }

  const indexPath = path.join(output, 'index.html');
  let indexContent = fs.readFileSync(indexPath, 'utf8');
  let metaCount = 0;
  let assetCount = 0;

  indexContent = indexContent.replace(
    /(<meta name="handbook-deployment-version" content=")[^"]+(" \/>)/g,
    (_match, prefix, suffix) => {
      metaCount += 1;
      return prefix + version + suffix;
    },
  );
  indexContent = indexContent.replace(
    /((?:href|src)="assets\/(?:css|js)\/[^"?]+\?v=)[^"]+("\s*\/?>)/g,
    (_match, prefix, suffix) => {
      assetCount += 1;
      return prefix + version + suffix;
    },
  );

  if (metaCount !== 1) {
    throw new Error(`Version stamping failed for index metadata: expected 1, found ${metaCount}`);
  }
  if (assetCount !== 6) {
    throw new Error(`Version stamping failed for index assets: expected 6, found ${assetCount}`);
  }
  fs.writeFileSync(indexPath, indexContent, 'utf8');
}

const deploymentVersion = resolveDeploymentVersion();

fs.rmSync(output, { recursive: true, force: true });

for (const entry of entries) {
  const source = path.join(root, entry.source);
  const destination = path.join(output, entry.published);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(source, destination);
}

stampDeploymentVersion(deploymentVersion);

console.log(`Static artifact assembled: ${files.length} allowlisted files in public/`);
console.log(`Deployment version stamped: ${deploymentVersion}`);
