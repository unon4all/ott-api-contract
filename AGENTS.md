# AGENTS.md — `ott-api-contract`

> Read `PROJECT_CONTEXT.md` first. This repository is the shared Android/backend contract authority.

## Repository mission

Maintain the versioned OpenAPI contract, shared schemas, deterministic fixtures, error examples, compatibility policy and changelog that allow Android and backend to develop independently without semantic drift.

## Required layout

```text
openapi/v1.yaml
fixtures/
  home.json
  content-movie.json
  content-series.json
  playback.json
  errors/
schemas/
CHANGELOG.md
README.md
PROJECT_CONTEXT.md
AGENTS.md
```

## Contract rules

- `/v1/...` resource-oriented REST contract.
- Opaque stable string identifiers.
- ISO-8601 UTC timestamps.
- Typed machine-readable error code + trace ID.
- Cursor pagination.
- Explicit nullability.
- Documented string enums; Android has `UNKNOWN` fallback.
- Idempotency semantics are documented for selected writes.
- `X-Request-ID`/trace behavior is documented.

## Compatibility

Safe within v1:

- Add optional response field.
- Add endpoint.
- Add enum value when UNKNOWN fallback exists.

Breaking:

- Remove/rename field.
- Change type/requiredness/semantic meaning.
- Change identifier or pagination semantics.

Breaking changes must never be silently shipped. Create an approved migration window or new API version.

## Fixture rules

- Fixtures validate against the same schemas as real responses.
- Stable deterministic IDs.
- No secrets/PII/private partner content.
- Keep failure/error examples for client tests.
- Fixtures are shared contract artifacts, not Compose previews or backend seed implementation details.

## Change workflow

Before modifying contract:

1. Identify Android and backend consumers.
2. Classify change as backward-compatible or breaking.
3. Update OpenAPI/schema + fixtures + changelog in one reviewable change.
4. Run schema/fixture validation.
5. Notify/update both implementation repositories.
6. For breaking changes, document migration and deployment ordering.

Never allow Android and backend to maintain conflicting private copies of the same contract.
