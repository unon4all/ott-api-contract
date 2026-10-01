import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';

function compareSchema(before, after, location, issues) {
  if (JSON.stringify(before?.type) !== JSON.stringify(after?.type)) {
    issues.push(`${location}: type changed`);
  }
  if (before?.$ref !== after?.$ref) issues.push(`${location}: reference changed`);
  if (before?.format !== after?.format) issues.push(`${location}: format changed`);
  if (before?.pattern !== after?.pattern) issues.push(`${location}: pattern changed`);
  if (before?.minLength != null && (after?.minLength ?? 0) > before.minLength)
    issues.push(`${location}: minimum length tightened`);
  if (before?.maxLength != null && (after?.maxLength ?? Infinity) < before.maxLength)
    issues.push(`${location}: maximum length tightened`);
  if (before?.minimum != null && (after?.minimum ?? -Infinity) > before.minimum)
    issues.push(`${location}: minimum tightened`);
  if (before?.maximum != null && (after?.maximum ?? Infinity) < before.maximum)
    issues.push(`${location}: maximum tightened`);
  if (before?.additionalProperties !== false && after?.additionalProperties === false)
    issues.push(`${location}: additional properties forbidden`);
  for (const value of before?.enum ?? []) {
    if (!(after?.enum ?? []).includes(value)) issues.push(`${location}: enum value removed: ${value}`);
  }
  if (!before?.enum && after?.enum) issues.push(`${location}: unrestricted values became an enum`);
  if (!before?.enum && after?.enum) issues.push(`${location}: unrestricted values became an enum`);
  for (const required of after?.required ?? []) {
    if (!(before?.required ?? []).includes(required))
      issues.push(`${location}: newly required field: ${required}`);
  }
  for (const [name, previous] of Object.entries(before?.properties ?? {})) {
    const next = after?.properties?.[name];
    if (!next) issues.push(`${location}: field removed: ${name}`);
    else compareSchema(previous, next, `${location}.${name}`, issues);
  }
  if (before?.items && after?.items) compareSchema(before.items, after.items, `${location}[]`, issues);
  if (before?.items && !after?.items) issues.push(`${location}: array items removed`);
  for (const keyword of ['oneOf', 'anyOf', 'allOf']) {
    const oldBranches = before?.[keyword] ?? [];
    const newBranches = after?.[keyword] ?? [];
    if (oldBranches.length !== newBranches.length) issues.push(`${location}: ${keyword} changed`);
    else oldBranches.forEach((branch, index) =>
      compareSchema(branch, newBranches[index], `${location}.${keyword}[${index}]`, issues),
    );
  }
}

export function findBreakingChanges(before, after) {
  const issues = [];
  for (const [name, schema] of Object.entries(before.components?.schemas ?? {})) {
    const current = after.components?.schemas?.[name];
    if (!current) issues.push(`components.schemas.${name}: removed`);
    else compareSchema(schema, current, `components.schemas.${name}`, issues);
  }
  for (const [path, pathItem] of Object.entries(before.paths ?? {})) {
    const nextPath = after.paths?.[path];
    if (!nextPath) {
      issues.push(`paths.${path}: removed`);
      continue;
    }
    for (const [method, operation] of Object.entries(pathItem)) {
      if (!nextPath[method]) {
        issues.push(`paths.${path}.${method}: removed`);
        continue;
      }
      for (const [status, response] of Object.entries(operation.responses ?? {})) {
        const nextResponse = nextPath[method].responses?.[status];
        if (!nextResponse) issues.push(`paths.${path}.${method}: response ${status} removed`);
        else for (const [media, content] of Object.entries(response.content ?? {})) {
          const nextContent = nextResponse.content?.[media];
          if (!nextContent) issues.push(`paths.${path}.${method}: media type ${media} removed`);
          else compareSchema(content.schema, nextContent.schema, `paths.${path}.${method}.${status}`, issues);
        }
      }
    }
  }
  return issues;
}

if (process.argv[1]?.endsWith('check-breaking.mjs')) {
  const index = process.argv.indexOf('--base-ref');
  if (index < 0 || !process.argv[index + 1]) {
    throw new Error('Usage: pnpm breaking:check -- --base-ref <approved git ref>');
  }
  const baseline = execFileSync('git', ['show', `${process.argv[index + 1]}:openapi/v1.yaml`], {
    encoding: 'utf8',
  });
  const before = parse(baseline, { uniqueKeys: true });
  const after = parse(readFileSync('openapi/v1.yaml', 'utf8'), { uniqueKeys: true });
  const issues = findBreakingChanges(before, after);
  if (issues.length) {
    process.stderr.write(`Breaking contract changes:\n${issues.join('\n')}\n`);
    process.exitCode = 1;
  } else process.stdout.write('No structural breaking contract changes detected.\n');
}
