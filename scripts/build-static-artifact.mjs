import fs from 'node:fs';
import path from 'node:path';
import { getPublishedFiles } from './artifact-files.mjs';

const root = process.cwd();
const output = path.join(root, 'public');
const files = getPublishedFiles(root);

fs.rmSync(output, { recursive: true, force: true });

for (const relative of files) {
  const source = path.join(root, relative);
  const destination = path.join(output, relative);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(source, destination);
}

console.log(`Static artifact assembled: ${files.length} allowlisted files in public/`);
