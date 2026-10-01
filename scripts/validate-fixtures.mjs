import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { assertSchema, loadContract } from './contract-lib.mjs';

export function validateFixtures(root = process.cwd()) {
  const contract = loadContract(join(root, 'openapi/v1.yaml'));
  const manifest = JSON.parse(readFileSync(join(root, 'fixtures/manifest.json'), 'utf8'));
  const listed = new Set(Object.keys(manifest));
  const present = [];
  function visit(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) visit(path);
      else if (entry.name.endsWith('.json') && entry.name !== 'manifest.json') {
        present.push(relative(join(root, 'fixtures'), path));
      }
    }
  }
  visit(join(root, 'fixtures'));
  for (const file of present) {
    if (!listed.has(file)) throw new Error(`Fixture missing from manifest: ${file}`);
    const value = JSON.parse(readFileSync(join(root, 'fixtures', file), 'utf8'));
    assertSchema(contract, manifest[file], value, file);
  }
  for (const file of listed) {
    if (!present.includes(file)) throw new Error(`Manifest points to missing fixture: ${file}`);
  }
  return present.length;
}

if (process.argv[1]?.endsWith('validate-fixtures.mjs')) {
  const count = validateFixtures();
  process.stdout.write(`Validated ${count} fixtures against openapi/v1.yaml.\n`);
}
