# Nigeria OTT shared API contract

This repository owns the **only canonical** Android/backend contract: [openapi/v1.yaml](openapi/v1.yaml). It uses OpenAPI 3.1.0 and starts with common transport components; product paths are added by their owning backend phases. The backend and Android pin an immutable Git commit. Generated `dist/v1.json` is a local bundle and must not be edited or committed.

## Verify

Use Node 24.21.0 and pnpm 11.19.0:

```text
pnpm install --frozen-lockfile
pnpm lint
pnpm bundle
pnpm fixtures:check
pnpm verify
pnpm breaking:check -- --base-ref origin/main
pnpm android:check
```

`pnpm breaking:check` compares with the approved Git baseline. CI fetches `origin/main` and fails on structural changes such as removed paths, removed response fields, changed types, tighter requiredness and narrowed enums. It is intentionally conservative and does not detect semantic changes; reviewers must still classify status, meaning, ordering, authorization and pagination changes. An intentional breaking change needs a changelog migration window or `/v2`, plus Android/backend review. Do not disable the gate to pass a PR.

`pnpm android:check` runs the current Android production serializer and error mapper against the exact shared B04 fixtures, plus its existing `core:data` fixture/UNKNOWN tests. Set `OTT_ANDROID_DIR` if Android is not the sibling `../ott-android`. The Gradle init script adds a test source from this repository to the build without editing the Android checkout. This manual cross-workstream check is required at B04 handoff; Android's P12/P13 phases own permanent product DTO integration.

## Transport conventions

- Public paths begin with `/v1`; deployment hostnames stay outside the specification.
- IDs are opaque stable strings. Example prefixes are synthetic test data, not client logic.
- Instants are ISO-8601 UTC strings. Localized display strings stay in clients.
- Requiredness and nullability are separate: missing means unspecified; explicit `null` is allowed only when the schema declares it.
- Extensible string enums require Android `UNKNOWN` fallback. Never branch on human-readable `detail` or parse ID prefixes.
- Growing collections use opaque `cursor` and bounded `limit` components. Each endpoint owns deterministic ordering, defaults, stable tie-breaker, and invalid/expired cursor behavior. Fixed editorial rails may be finite arrays.
- `Idempotency-Key` is opt-in per write operation. A later owning phase defines dedupe scope, retention and same-key/different-request `409` behavior. The key never proves identity.
- `X-Request-ID` is optional input and returned on responses. Invalid input is replaced by the server. No app/platform/version diagnostics header is required until Android and backend agree one.
- Bearer auth is a placeholder component. No B04 endpoint is implicitly protected.

See [docs/errors.md](docs/errors.md) for codes/statuses and [docs/change-workflow.md](docs/change-workflow.md) for endpoint, fixture and consumer handoff.

## Fixtures

Every `fixtures/**/*.json` file appears in [fixtures/manifest.json](fixtures/manifest.json), which names its OpenAPI component schema. `pnpm fixtures:check` validates exact JSON types without coercion and rejects unknown fields on `Problem`. Fixtures contain synthetic data only. Feature phases add minimal, typical and failure fixtures in the same change as their schemas, with stable test IDs and a documented owning operation. Android should copy the exact pinned fixtures or fetch them from the pinned commit and decode them through its production Kotlin serializer/mock HTTP path. Android must not maintain an edited private variant.
