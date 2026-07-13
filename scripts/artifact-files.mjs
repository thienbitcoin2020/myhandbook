import fs from 'node:fs';
import path from 'node:path';

export const PUBLISHED_ROOT_FILES = Object.freeze([
  'index.html',
  'handbook.html',
  'ba-handbook.html',
  'pm-handbook.html',
  'qc-handbook.html',
  'po-handbook.html',
  'sa-handbook.html',
  'sec-handbook.html',
  'ops-handbook.html',
  'sm-handbook.html',
  'ux-handbook.html',
  'pmo-handbook.html',
]);

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
 * Return the complete, deterministic list of files allowed in the static
 * artifact. Both the security scanner and artifact builder consume this list,
 * so no file can be published without first passing the same gate.
 */
export function getPublishedFiles(root = process.cwd()) {
  const files = [];

  for (const relative of PUBLISHED_ROOT_FILES) {
    assertRegularFile(root, relative);
    files.push(normalize(relative));
  }

  for (const { directory, extensions } of PUBLISHED_TREES) {
    collectTree(root, directory, extensions, files);
  }

  return files.sort((left, right) => left.localeCompare(right));
}
