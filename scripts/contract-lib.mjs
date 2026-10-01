import { readFileSync } from 'node:fs';
import { parse } from 'yaml';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

export function loadContract(path = 'openapi/v1.yaml') {
  const contract = parse(readFileSync(path, 'utf8'), { uniqueKeys: true });
  if (contract?.openapi !== '3.1.0' || typeof contract.components?.schemas !== 'object') {
    throw new Error(`${path}: expected OpenAPI 3.1.0 with components.schemas`);
  }
  return contract;
}

export function createSchemaValidator(contract, name) {
  if (!Object.hasOwn(contract.components.schemas, name)) {
    throw new Error(`Unknown OpenAPI component schema: ${name}`);
  }
  const schemas = JSON.parse(
    JSON.stringify(contract.components.schemas).replaceAll('#/components/schemas/', '#/$defs/'),
  );
  const ajv = new Ajv2020({ allErrors: true, strict: false, coerceTypes: false });
  addFormats(ajv);
  return ajv.compile({ $defs: schemas, $ref: `#/$defs/${name}` });
}

export function assertSchema(contract, name, value, label) {
  const validate = createSchemaValidator(contract, name);
  if (!validate(value)) {
    const detail = (validate.errors ?? [])
      .map((issue) => `${issue.instancePath || '/'} ${issue.message}`)
      .join('; ');
    throw new Error(`${label} does not match ${name}: ${detail}`);
  }
}
