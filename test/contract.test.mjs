import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { parse } from 'yaml';
import { assertSchema, loadContract } from '../scripts/contract-lib.mjs';
import { findBreakingChanges } from '../scripts/check-breaking.mjs';
import { validateFixtures } from '../scripts/validate-fixtures.mjs';

const contract = loadContract();

test('all manifest fixtures conform to named OpenAPI components', () => {
  assert.equal(validateFixtures(), 5);
});

test('fixture validation rejects missing required and unexpected fields without coercion', () => {
  const fixture = JSON.parse(readFileSync('fixtures/errors/validation-error.json', 'utf8'));
  delete fixture.traceId;
  assert.throws(() => assertSchema(contract, 'Problem', fixture, 'missing trace'));
  fixture.traceId = 'demo';
  fixture.status = '400';
  assert.throws(() => assertSchema(contract, 'Problem', fixture, 'string status'));
  fixture.status = 400;
  fixture.accessToken = 'synthetic-disallowed';
  assert.throws(() => assertSchema(contract, 'Problem', fixture, 'extra field'));
});

test('broken references fail schema compilation', () => {
  const current = parse(readFileSync('openapi/v1.yaml', 'utf8'));
  current.components.schemas.Problem.properties.traceId.$ref = '#/components/schemas/Missing';
  assert.throws(() => assertSchema(current, 'Problem', { traceId: 'demo' }, 'bad ref'));
});

test('additive optional fields pass the structural compatibility gate', () => {
  const next = structuredClone(contract);
  next.components.schemas.Problem.properties.optionalHint = { type: 'string' };
  assert.deepEqual(findBreakingChanges(contract, next), []);
});

test('removed fields, type changes, and tighter requiredness fail', () => {
  const removed = structuredClone(contract);
  delete removed.components.schemas.Problem.properties.traceId;
  assert.match(findBreakingChanges(contract, removed).join('\n'), /field removed: traceId/);
  const changed = structuredClone(contract);
  changed.components.schemas.Problem.properties.status.type = 'string';
  assert.match(findBreakingChanges(contract, changed).join('\n'), /status: type changed/);
  const required = structuredClone(contract);
  required.components.schemas.Problem.required.push('detail');
  assert.match(findBreakingChanges(contract, required).join('\n'), /newly required field: detail/);
});

test('removed path, response and narrowed enum fail', () => {
  const baseline = structuredClone(contract);
  baseline.paths['/example'] = {
    get: { responses: { 200: { content: { 'application/json': { schema: { type: 'string' } } } } } },
  };
  const removed = structuredClone(baseline);
  delete removed.paths['/example'];
  assert.match(findBreakingChanges(baseline, removed).join('\n'), /paths.\/example: removed/);
  const noResponse = structuredClone(baseline);
  delete noResponse.paths['/example'].get.responses[200];
  assert.match(findBreakingChanges(baseline, noResponse).join('\n'), /response 200 removed/);
  const narrowed = structuredClone(contract);
  narrowed.components.schemas.CompatibilityProbe.properties.state.enum = ['KNOWN'];
  assert.match(findBreakingChanges(contract, narrowed).join('\n'), /became an enum/);
});
