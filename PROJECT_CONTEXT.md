# Nigeria-First OTT Platform — Persistent Project Context for Codex

> **Context version:** 2026-09-22.1  
> **Status:** Planning/roadmap documentation complete; implementation not yet started unless a repository-local phase ledger says otherwise.  
> **Intended location:** Place this file at the root of `ott-android`, `ott-platform`, and `ott-api-contract`.  
> **Purpose:** Persistent cross-repository project memory and engineering guardrails for humans and AI coding agents.  
> **Primary project stage:** Foundation → Pitchable MVP → Launchable Core → Incremental Expansion.

---

## 0. How to Use This File

This document is the shared project context for the Nigeria-First OTT / Digital Entertainment Platform. It is intentionally concise enough for an AI coding agent to scan before every task, while still recording the architectural decisions that must remain consistent across repositories.

### Source-of-truth hierarchy

When implementing a task, use the following precedence:

1. **Explicit user/developer instruction for the current task.**
2. **Approved ADR or documented decision made after this context version.**
3. **The active roadmap phase execution document** (`Pxx` or `Bxx`) for phase-specific requirements and acceptance criteria.
4. **This `PROJECT_CONTEXT.md`** for persistent cross-project rules and architecture.
5. **Android and Backend master plans** for detailed background and rationale.
6. **Older strategy/architecture research** for context only where it does not conflict with later implementation roadmaps.

If two authoritative sources conflict, **do not silently choose one**. Report the conflict, state the affected files/phase, and wait for a decision if the correct interpretation is not already obvious from a newer approved source.

### Context-sync rule

The canonical project context should use the same `Context version` in all repositories. If an approved architectural/API/schema/security/deployment decision changes this file, update all repository copies or clearly record the temporary mismatch in each repository's `DEVELOPMENT_LEDGER.md`.

---

# 1. Instructions for Codex

## 1.1 Mandatory operating rules

Codex must follow these rules before generating or modifying code:

1. **Read this file before starting any development task.** Treat it as persistent project-level context.
2. Read the **active roadmap phase document in full** before coding.
3. Inspect the **existing repository, current branch, recent changes, tests, configuration, and documentation** before proposing edits.
4. Work on **only the requested phase/task**. Do not pull later-phase functionality forward merely because it is convenient.
5. Reuse existing architecture, components, patterns, utilities, DTOs, models, repositories, services, tests, and conventions wherever possible.
6. Do not duplicate functionality that already exists.
7. Preserve compatibility with previously completed development phases.
8. Do not make architectural changes that contradict documented decisions without explicitly identifying the conflict and impact first.
9. Do not introduce unnecessary dependencies, frameworks, services, abstractions, or infrastructure.
10. Follow the documented API, database, authentication, security, privacy, media, testing, logging, CI/CD, and coding conventions.
11. Clearly identify assumptions when information is missing. **Do not silently invent permanent project decisions.**
12. Preserve backward compatibility unless the current task explicitly requires a breaking change and the migration path is approved.
13. Run or recommend all relevant tests/build/lint/contract checks after implementation.
14. Update documentation whenever an architectural, API, schema, environment, configuration, operational, or workflow change is introduced.
15. Never silently change requirements or previously approved architectural decisions.
16. Keep implementations production-oriented, modular, maintainable, secure, observable, and scalable without premature complexity.
17. Never report a phase/task `COMPLETE` merely because code was generated or compiled.
18. If mandatory validation fails, report the failure and keep the phase `INCOMPLETE`, `TESTING`, or `BLOCKED`.
19. Never weaken tests, security controls, validation, or acceptance criteria merely to make a build pass.
20. Never expose secrets, tokens, credentials, signed media URLs, sensitive PII, or payment data in source, fixtures, logs, analytics, crash reports, examples, or screenshots.

## 1.2 Required pre-change workflow

Before editing code, Codex should produce a short analysis containing:

- Active phase/task and repository.
- Relevant source documents read.
- Current repository state and existing implementation that will be reused.
- Required predecessors and whether they are satisfied.
- Files/modules expected to change.
- Contract/schema/migration/security implications.
- Risks or unresolved decisions.
- Validation commands that will be run.

For high-risk phases involving authentication, authorization, rights, playback authorization, media signing, database migrations, queues/concurrency, privacy, IAM, production infrastructure, payments, DRM, or release signing, use a deeper **plan → implement → verify → audit** workflow.

## 1.3 Stop conditions

Codex must stop and ask/report rather than silently proceed when:

- A task requires a permanent decision explicitly marked `Decision Required` in the roadmap.
- A requested change contradicts an approved architecture decision.
- A breaking API/schema change has no migration/compatibility plan.
- A destructive production migration is required without explicit approval.
- A security control would need to be weakened.
- Production secrets/signing keys would need to be generated, copied, or committed.
- The task requires infrastructure or features reserved for a later roadmap phase.
- Required predecessor work is absent and cannot be safely mocked behind an approved interface.

---

# 2. Project Overview

## 2.1 Product

The project is a **Nigeria-first digital entertainment / OTT streaming platform** intended to make professionally produced Nigerian films, series, episodic content, selected creator content, and future premium offerings easier to discover, distribute, stream, measure, and monetize.

The platform has two sides:

- **Consumer side:** mobile-first content discovery, search, details, watchlist, continue watching, and reliable low-data playback.
- **Rights-holder/operations side:** structured content metadata, rights and availability, secure ingestion, media processing, publishing, analytics, takedown, and later partner self-service/monetization.

The engineering strategy deliberately avoids building a capital-intensive “Netflix clone” before demand, retention, rights access, and unit economics are validated.

## 2.2 Primary market assumptions that affect engineering

- Nigeria first; West Africa and wider expansion only after proof.
- Android is the first consumer client and primary initial engineering focus.
- Mobile data affordability and unstable/variable connectivity are first-class product constraints.
- Low/mid-range Android devices must remain viable targets.
- Content rights, territory, availability windows, creator trust, auditability, and takedown are launch-critical business rules.
- Streaming bandwidth, DRM, storage, authentication, and CDN usage are economic variables, not merely technical details.
- Free/AVOD streaming must not be assumed to be unlimited or economically harmless.
- The platform should validate with a curated catalogue and a small number of content partners before large-scale infrastructure or catalogue expansion.

## 2.3 Product stages

| Stage | Purpose | Engineering posture |
|---|---|---|
| **Stage 1 — Pitchable MVP** | Credible viewer journey for creators, production houses, partners and early investors | Real Android experience, realistic fixtures/staging, real demo playback; backend real where it materially strengthens the pitch |
| **Stage 2 — Launchable Core** | First real content partners and real users | Production identity, catalogue, rights, secure ingestion, publishing, playback authorization, synced viewer state, monitoring, backups, privacy/security foundations |
| **Stage 3 — Incremental Expansion** | Monetization and advanced capabilities after validation | Payments/PPV/AVOD, DRM, downloads, partner self-service, TV/casting, richer personalization, ads, live/sports only when justified |

---

# 3. Non-Negotiable Architectural Principles

| Principle | Project rule |
|---|---|
| Small-team operability | One Android developer and one backend/platform developer must be able to understand, build, deploy and troubleshoot the system with AI assistance. |
| Contract-driven independence | Android and backend must be able to develop independently from Day 1 using OpenAPI, fixtures and explicit interfaces. |
| Mock-first Android | Android UI/domain logic must not depend on live backend availability. Fake/local/mock/staging/production sources must be swappable without feature rewrites. |
| API-first backend | OpenAPI is a first-class design artifact, not documentation generated after implementation. |
| Modular monolith | Backend starts as one deployable NestJS application with explicit domain modules. No premature microservices. |
| Managed media first | Buy/integrate commodity encoding/CDN/media infrastructure initially; build differentiated rights, catalogue, publishing and playback-policy logic. |
| Control plane vs media plane | Backend authorizes playback; CDN/media provider delivers media directly to Media3. Backend must never proxy video bytes. |
| Provider replaceability | Identity, media, analytics, payment, search and cloud-provider specifics live behind small explicit adapter boundaries where change is plausible. |
| Stage discipline | Stage-3 capabilities may have interface seams, but must not become Stage-1 infrastructure without a current requirement or measured bottleneck. |
| Evidence-driven scaling | Scale vertically/horizontally and optimize first; split services or add heavy infrastructure only at measured pressure points. |
| Security by design | Security is part of normal implementation, not a final penetration-test phase. |
| Completion discipline | Code generation/compilation is not completion. Tests, validation, acceptance criteria and clean project state are required. |

---

# 4. Repository Strategy and Ownership

The project uses **three repositories** initially.

| Repository | Owns | Must not own |
|---|---|---|
| `ott-android` | Android consumer application, UI, navigation, local persistence/cache, Media3 player, client networking, client analytics hooks, Android release pipeline | Backend business rules, partner master-video upload pipeline, server rights enforcement, production secrets |
| `ott-platform` | NestJS API/control plane, PostgreSQL/Prisma, rights, playback authorization, content/media operations, Next.js internal admin, workers/queues, infrastructure/IaC, backend CI/CD, monitoring/runbooks | Android UI implementation; consumer web/iOS/TV unless future roadmap explicitly adds them |
| `ott-api-contract` | `openapi/v1.yaml`, shared fixtures, schemas, compatibility policy, changelog | Server implementation or Android business/UI logic |

**Infrastructure stays inside `ott-platform` initially.** Do not create a separate infrastructure repository until team/operational scale creates a measured ownership need.

## 4.1 Recommended persistent context layout in each implementation repository

```text
PROJECT_CONTEXT.md
AGENTS.md
README.md
DEVELOPMENT_LEDGER.md
/docs
  /architecture
  /roadmaps
  /adr
  /development
  /phase-reports
  /testing
```

Backend additionally:

```text
/docs/runbooks
/infra
/prisma
/scripts
/test
```

Shared contract repository:

```text
/openapi/v1.yaml
/fixtures
  home.json
  content-movie.json
  content-series.json
  playback.json
  /errors
/schemas
CHANGELOG.md
README.md
PROJECT_CONTEXT.md
AGENTS.md
```

---

# 5. Approved Technology Stack

## 5.1 Android

| Layer | Selected technology / policy |
|---|---|
| Language | Kotlin |
| UI | Jetpack Compose |
| Design base | Material 3 primitives + project-specific design tokens |
| Architecture | MVVM with unidirectional UI state |
| State | `ViewModel` + `StateFlow` |
| Async | Coroutines + Flow |
| Navigation | Navigation Compose |
| HTTP | Retrofit + centrally configured OkHttp |
| Serialization | Kotlin Serialization |
| DI | Hilt |
| Local DB | Room |
| Preferences/config state | DataStore |
| Images | Coil |
| Player | Media3 / ExoPlayer with custom product controls/UX; do not build a decoder/player engine |
| Work scheduling | WorkManager for reliable deferred sync such as progress flushing |
| Paging | Paging 3 selectively for genuinely long collections/search results |
| Analytics | Internal provider-agnostic analytics interface; vendor injected later |
| Crash reporting | Firebase Crashlytics or equivalent approved provider |

### Explicit Android non-defaults

Do not introduce Flutter/React Native for the initial Android app, a third-party MVI framework, full ceremonial Clean Architecture, dozens of Gradle feature modules, or a custom media engine.

## 5.2 Backend / content platform

| Layer | Selected technology / policy |
|---|---|
| Language | TypeScript |
| Framework | NestJS |
| Architecture | Modular monolith; one deployable API initially |
| API | REST + OpenAPI v1 |
| ORM/migrations | Prisma |
| System of record | PostgreSQL |
| Cache | Redis only when a measured/policy need exists; not mandatory for Stage 1 |
| Search | PostgreSQL FTS + `pg_trgm` first |
| Admin CMS | Internal Next.js admin |
| Jobs | Managed queue such as SQS is a strong AWS default; Redis/BullMQ acceptable when Redis is already justified |
| Video | Managed video provider or managed cloud transcoder initially |
| Compute | Managed container service / ECS Fargate style deployment; no Kubernetes initially |
| Object storage | S3/provider storage with private access and lifecycle policies |
| Observability | Cloud metrics/logging + Sentry/error tracking |
| CI/CD | GitHub Actions |
| Production cloud posture | AWS-oriented; Cape Town region is a candidate; exact production design is governed by later infrastructure phases |
| IaC | One chosen tool (Terraform, AWS CDK, or explicitly approved equivalent); no abstraction framework around the IaC tool |

### Explicit backend technologies to avoid initially

- Microservices.
- Kubernetes.
- Kafka.
- MongoDB as primary system of record.
- OpenSearch from Day 1.
- Custom ffmpeg/transcoding farm.
- Multi-cloud.
- Data warehouse/feature store/ML platform before meaningful behavior data exists.

---

# 6. Application and Module Architecture

## 6.1 Android architecture

Canonical feature flow:

```text
User action
  → Compose screen emits event
  → ViewModel coordinates/validates
  → Repository interface
  → fake/local/remote implementation
  → ViewModel updates immutable UiState
  → Compose re-renders
```

### Initial Gradle layout

Use approximately five to seven modules initially:

```text
:app
:core:model
:core:network
:core:data
:core:ui
:core:player
:features
```

Split further only when build time, accidental coupling, parallel developer ownership, or cross-client reuse becomes a measured problem.

### Android repository/data-source rules

- Repository interfaces are the central replaceability seam.
- Fixture JSON must conform to the same DTO schemas as live HTTP responses.
- Stable realistic IDs; never use array indexes as persistent identifiers.
- Seed deterministic failure cases: empty search, unavailable title, expired token, slow response, offline mode.
- DTOs stay in network/data layers; domain/UI models must not carry transport annotations.
- Network/provider errors must become typed app errors before reaching ViewModels.
- Screens must not coordinate Room + Retrofit manually; cache/remote policy belongs in repositories.
- Remote backend is authoritative for rights, publication status, entitlements, and account state.
- Base URL/environment/source switching must not require feature-code changes.

## 6.2 Backend modular-monolith structure

```text
platform-backend/
├── src/
│   ├── modules/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── profiles/
│   │   ├── catalog/
│   │   ├── taxonomy/
│   │   ├── home/
│   │   ├── search/
│   │   ├── watchlist/
│   │   ├── progress/
│   │   ├── playback/
│   │   ├── media/
│   │   ├── rights/
│   │   ├── analytics/
│   │   └── admin/
│   ├── common/
│   │   ├── auth/
│   │   ├── errors/
│   │   ├── logging/
│   │   ├── pagination/
│   │   └── validation/
│   └── config/
├── prisma/
├── test/
├── scripts/
└── docs/
```

Dependency direction:

```text
HTTP Controller
  ↓
Application Service
  ↓
Domain Policy / Rules
  ↓
Repository Interface
  ↓
Prisma / Provider Adapter
```

Module boundary rule: a controller must not directly query another domain module's repository. Cross-domain behavior goes through a documented service interface or application orchestration. Example: playback asks `RightsService`; it does not read rights tables directly.

Do not create abstract interfaces for every trivial class. Add boundaries where provider, persistence, or policy is likely to change independently.

---

# 7. Naming and Coding Conventions

## 7.1 Project-wide conventions already approved

| Concern | Convention |
|---|---|
| API resources | Nouns; base path `/v1/...` |
| IDs | Opaque stable strings such as `cnt_...`, `usr_...`, `pbs_...`; never expose DB sequence assumptions |
| Timestamps | ISO-8601 UTC instants unless the business concept is explicitly a local date |
| Enums | Documented strings; Android must support `UNKNOWN` fallback |
| Nullability | Explicit in schema; do not create accidental semantic differences between absent and `null` |
| Errors | Typed domain/application errors mapped centrally to a machine-readable HTTP error/problem envelope with `traceId` |
| Pagination | Cursor based for collections likely to grow |
| Request traceability | Accept/generate `X-Request-ID`; include `traceId` in errors/logs |
| DTO boundary | Explicit request/response DTOs; never leak Prisma models directly to HTTP |
| DB tables | Use one consistent Prisma mapping approach; `snake_case` is acceptable when selected and must remain consistent |
| Validation | Validate at API/provider boundaries; domain services still enforce business invariants |
| Transactions | Use DB transactions for multi-write invariants such as publication state + audit evidence when required |
| Migrations | Immutable once applied; destructive changes use staged expand/migrate/contract sequence |
| Money (when introduced) | Integer minor units + explicit currency code; never floating-point currency |
| Provider integration | Media, identity, analytics and payment providers behind small explicit interfaces |
| Logs | Structured; include trace IDs; no secrets or broad PII dumps |

## 7.2 Repository-local naming

Exact Android namespace/application ID, toolchain versions and any naming rules not fixed by the roadmaps must be taken from the repository/P00 decisions. Codex must inspect existing code and follow established repository conventions rather than invent a new permanent naming scheme.

---

# 8. Shared API Contract

`ott-api-contract/openapi/v1.yaml` is the shared Android/backend API truth.

## 8.1 Compatibility rules

### Backward-compatible within v1

- Add optional response fields.
- Add new endpoints.
- Add enum values only when clients implement an `UNKNOWN` fallback.
- Relax optional request behavior where explicitly documented.

### Breaking

- Remove or rename fields.
- Change field data type.
- Make optional fields mandatory.
- Change identifier meaning.
- Change enum semantics.
- Change pagination semantics.
- Change behavior while keeping a superficially identical schema.

Breaking changes require a migration window or new API version and must not be silently shipped to staging.

## 8.2 Core endpoint reference

| Method / path | Auth | Purpose |
|---|---|---|
| `POST /v1/auth/register` | No | Create consumer identity |
| `POST /v1/auth/login` | No | Sign in |
| `POST /v1/auth/refresh` | Refresh credential | Renew credentials |
| `POST /v1/auth/logout` | Yes | End/revoke session |
| `GET /v1/me` | Yes | Current user/account |
| `GET /v1/profiles` | Yes | Viewing profiles when enabled |
| `GET /v1/home` | Optional | Home/discovery composition |
| `GET /v1/content/{id}` | Optional | Unified content details |
| `GET /v1/categories/{id}` | Optional | Browse category/collection |
| `GET /v1/search` | Optional | Search catalogue |
| `GET /v1/watchlist` | Yes | Saved titles |
| `POST /v1/watchlist/{id}` | Yes | Idempotently save title |
| `DELETE /v1/watchlist/{id}` | Yes | Remove title |
| `GET /v1/progress` | Yes | Continue-watching/library progress |
| `PUT /v1/progress/{contentId}` | Yes | Upsert progress |
| `POST /v1/playback/sessions` | Yes / approved guest policy | Authorize playback and return source |
| `POST /v1/playback/sessions/{id}/events` | Yes | Playback QoE/product events |
| `GET /v1/config` | No | Client-safe feature/config values |

## 8.3 Android contract requirements

- Ignore unknown JSON fields.
- Map unknown enum values to `UNKNOWN`.
- Never branch on human-readable error text.
- Pin contract version/commit for releases.
- Mock HTTP and staging must use the same serialization path.
- Playback source must come from playback-session response, never hard-coded in production feature logic.
- Contract CI must detect drift between fixtures, OpenAPI and implementations.

---

# 9. Data Model and Database Conventions

PostgreSQL is the system of record. Prefer explicit relationships and correctness over premature denormalization.

## 9.1 Core relationships

```text
User 1 ── * Profile 1 ── * WatchProgress
             └────────── * WatchlistEntry
User / Profile / Device ─ * PlaybackSession
RightsHolder 1 ── * RightsGrant * ── 1 Content
Content 1 ── * Artwork
Content 1 ── * VideoAsset
Content * ── * Genre
Series 1 ── * Season 1 ── * Episode
```

## 9.2 Representative model ownership

| Domain | Representative models/tables |
|---|---|
| Identity | users, profiles, devices, admin_users |
| Catalogue | content, movies, series, seasons, episodes, genres, content_genres |
| Credits | people, content_credits, production_companies |
| Assets | artwork, video_assets, subtitle_tracks |
| Rights | rights_holders, rights_grants, availability/territory rules |
| Viewer state | watchlist_entries, watch_progress, playback_sessions |
| Operations | audit_events, provider_webhook_events, jobs/outbox |
| Commercial later | subscriptions, entitlements, transactions, creator statements |

## 9.3 Persistence rules

- `WatchlistEntry`: unique `(profileId, contentId)`; add/remove must be idempotent.
- `WatchProgress`: unique `(profileId, contentId)` with `positionMs`, `durationMs`, completion state, `updatedAt`, and event time.
- Continue Watching is derived from progress rules; it is not a separate canonical truth table.
- History may initially be derived from progress/playback sessions.
- Profile ID should remain the viewer-state ownership boundary even while only one profile is exposed to users.
- Rights and publication state must remain authoritative server-side.
- Deleting a title is rare; takedown/unpublish/rights expiry should preserve audit/history/accounting references.

## 9.4 Migration rules

- Every schema change is a committed migration.
- Never manually edit production schema through GUI except a documented emergency followed by proper migration reconciliation.
- Production migrations should remain compatible with the currently deployed application during rollout where practical.
- Destructive changes use multi-release expand → migrate/backfill → contract.
- Seed scripts are deterministic and separate from production migrations.
- Privacy/audit migrations must not copy broad user payloads into new evidence tables; store minimal references/evidence.

---

# 10. Authentication, Sessions and Authorization

The roadmaps intentionally keep identity provider choice replaceable. Do not hard-wire application logic to a provider without the active phase approving it.

## 10.1 Required behavior

- Real launch authentication must support registration/login, refresh/session handling, logout/revocation, recovery, and admin MFA.
- Android uses one centrally configured HTTP stack with auth/request ID/app headers and synchronized refresh behavior.
- Token refresh must have concurrency protection so multiple failing requests do not trigger uncontrolled refresh storms.
- Android access/refresh credentials must use Keystore-backed secure storage; never ordinary preferences.
- Backend authorization must enforce role/ownership checks at service boundaries and deny privileged/admin operations by default.
- Admin credentials must never be shared; production admin actions must be auditable and MFA protected.
- Device/profile identifiers participate in playback/session policy where required.
- Do not duplicate rights/entitlement business logic into Android; Android renders server outcomes.

## 10.2 Unresolved/phase-owned details

Exact identity provider, credential format/token lifetimes, OTP/social-login choices, device-limit policy, and paid-entitlement details are governed by B11/B12 and later monetization phases. Codex must not invent these permanently before those decisions exist.

---

# 11. Catalogue, Rights and Publishing

## 11.1 Catalogue

The catalogue supports movies, series, seasons, episodes, genres/categories, credits, production companies, artwork, subtitles and video assets. Android consumes unified content/domain models through stable contracts rather than knowing backend table layout.

## 11.2 Rights

Rights are structured title-level business rules, including as applicable:

- Rights holder / contract reference.
- Territory.
- Availability start/end window.
- Exclusivity.
- Monetization/access type.
- Operational publication state.
- Takedown/emergency-hold state.

A title must not be playable merely because media exists.

## 11.3 Publishing/takedown invariants

- `UNPUBLISH`: remove from discovery and block new playback sessions.
- `RIGHTS EXPIRE`: availability evaluation blocks playback even if editorial publication is still marked published; operations should receive expiry signals.
- `EMERGENCY HOLD`: hide and block immediately, recording reason and actor.
- Do not rely on deleting CDN objects as the primary rights-enforcement mechanism.
- Cache invalidation must make publication/takedown changes effective promptly.
- Signed media authorization must be short-lived enough that stale access expires naturally.

---

# 12. Content, Media and Streaming Architecture

## 12.1 Control plane vs media plane

```text
Android
  │
  ├── HTTPS API → NestJS control plane
  │                 ├─ identity
  │                 ├─ catalogue/discovery/search
  │                 ├─ rights/availability/entitlement
  │                 ├─ watchlist/progress
  │                 └─ playback authorization
  │
  └── Media3 → managed media/CDN plane
                  ├─ manifest
                  ├─ segments
                  └─ later DRM license path
```

The NestJS API must **never stream video bytes**.

## 12.2 Content ingestion

Create an auditable `VideoAsset`/ingestion record **before bytes are accepted**.

Preferred initial paths:

1. Managed video provider direct/presigned upload.
2. S3 presigned multipart upload when controlling masters/cloud transcode path.
3. Operations-assisted transfer as temporary early-partner fallback, still landing into secure provider/object storage.

Large master files must not route through the NestJS process.

Ingestion records should capture stable content/asset references, asset type, expected file/type/size/checksum where practical, provider/storage identifiers, processing status, uploader/partner, technical media metadata, processing failures and retry history.

## 12.3 Processing and delivery

- Do not run a custom transcoding cluster at MVP/initial launch.
- Use managed provider/cloud transcoder.
- Platform owns desired ABR/playback policy; provider owns heavy processing machinery.
- Use adaptive HLS compatible with Media3 and low/mid-range Android devices.
- Low-data modes are a product/economic requirement.
- Managed origin/CDN delivers signed/tokenized manifests/media.
- DRM is not mandatory for pitch assets; Widevine is added later for premium/studio content or earlier only when a partner/contract requires it.
- Security follows content value/risk; do not pretend piracy can be eliminated.

## 12.4 Playback authorization sequence

1. Authenticate or resolve approved guest context.
2. Resolve profile/device context.
3. Confirm content exists and is operationally published.
4. Evaluate rights window and territory.
5. Evaluate entitlement/monetization access when active.
6. Apply device/concurrency policy if configured.
7. Select video asset/protection policy.
8. Generate short-lived provider token/signed manifest URL.
9. Record playback session.
10. Return source + expiry + resume position to Android.

## 12.5 Android player rules

- Use Media3 / ExoPlayer.
- Build custom product controls/UX, not a decoding/ABR engine.
- Support intentional loading, retry and fatal/nonfatal playback failure states.
- Player state must report QoE signals through the analytics abstraction.
- Real playback source comes from backend authorization in Launchable Core.
- Data Saver, automatic quality, cellular preferences and poor-network recovery are first-class UX.

## 12.6 Progress rules

Android should queue/send progress approximately every 30 seconds during active playback and on pause, backgrounding, exit, and completion where appropriate.

Conflict rule: use the most recent valid event time with sanity checks; stale offline sync must not move a viewer backward after a newer event/completion.

Completion threshold must be centrally defined and compatible between Android and backend (e.g., percentage/near-end rule); do not let devices disagree on completion semantics.

---

# 13. Search and Discovery

- PostgreSQL FTS + `pg_trgm` is the initial search architecture.
- Search surface includes canonical/alternate titles, actors/directors, production company, genres/categories, language and curated keywords.
- Approximate ranking: exact/prefix title > alternate title > people/metadata > fuzzy match.
- Prefer filtering unavailable titles unless product explicitly wants unavailable/coming-soon results.
- Track query/result count/open/zero-result rate with privacy-safe analytics.
- Do not introduce OpenSearch until catalogue size, latency, typo/autocomplete quality, multilingual behavior, or operational search needs create a measured limitation.
- Keep the migration behind `SearchService` so Android contracts do not change.

---

# 14. Internal Admin and Partner Operations

Initial operations use an **internal Next.js admin**. A creator/production-house self-service portal is later-phase work.

Core internal capabilities eventually include:

- Metadata/artwork management.
- Media upload request/status/retry/replace.
- Rights and territory/window management.
- Preview/QC.
- Publish/schedule/unpublish/takedown.
- Auditable material changes.

Initial roles:

| Role | Intended permissions |
|---|---|
| `CONTENT_EDITOR` | Draft metadata/artwork; cannot publish or change security |
| `CONTENT_MANAGER` | Rights, media, publish/unpublish |
| `ADMIN` | Users/roles, provider configuration, high-risk operations |

Even at two-person scale, production admin actions remain auditable and MFA protected.

Partner onboarding should automate the technical pipeline while allowing contract negotiation, chain-of-title/legal review, spreadsheet metadata collection and release coordination to remain manual until repeated operational patterns justify a portal.

---

# 15. Environment Configuration

Use three isolated logical environments everywhere:

| Environment | Android | Backend/platform |
|---|---|---|
| `LOCAL` | Fake repositories or mock HTTP; local fixtures; debug logging; developer source switching allowed | Local DB/provider stubs/sandbox as phase permits; no production credentials |
| `STAGING` | Real HTTPS staging backend; staging assets; separate analytics/crash identity; sandbox payments/identity if active | Separate DB/storage/identity/media credentials; deterministic seed data; contract/E2E integration |
| `PRODUCTION` | Production API/media/CDN; strict logging; no developer source switching/fallback | Production network/DB/storage/secrets/IAM; explicit release approval; no staging fallback |

Rules:

- Configuration, DBs, storage, identity pools and media-provider credentials are isolated.
- No production secret is committed to Git or bundled in Android.
- Production must never silently fall back to development/staging services.
- `.env.example`/local config templates contain placeholders only.
- Exact version pins, package ID/namespace, CI provider/tooling choices marked Decision Required in P00 must not be invented silently.

---

# 16. Security Requirements

## 16.1 Android

- HTTPS/TLS only; no cleartext production traffic.
- Keystore-backed credential storage.
- No backend signing secrets/private credentials in APK.
- Redact Authorization headers, refresh tokens, signed playback URLs, user PII and payment data.
- R8/obfuscation as appropriate for release; remove debug tools/logging.
- Avoid WebView for core auth/playback unless required; restrict origins and JS interfaces if used.
- Android is not the initial partner master-video upload client.
- Use short-lived authorized media URLs/tokens.
- Do not over-invest in root/tamper blocking initially; add Play Integrity/provider controls only when concrete risk requires them.

## 16.2 Backend/platform

- HTTPS/TLS everywhere.
- Boundary DTO/schema validation, size limits and allowlists where appropriate.
- Role/ownership authorization at service boundaries; deny privileged access by default.
- Rate-limit auth, search abuse and playback-session creation when required.
- Managed secrets; no production secrets in Git/Android.
- Private database/network where practical; least-privilege DB/app roles; encrypted managed storage.
- Uploads use direct presigned/provider flow with type/size validation and private buckets.
- Admin MFA, restricted roles, audited actions, no shared credentials.
- Webhooks require signature/secret verification plus replay/idempotency handling.
- Lockfiles, dependency updates and CI scanning.
- Do not claim DRM or anti-piracy can prevent all copying.

## 16.3 Security intentionally deferred unless evidence requires it

- Full SIEM/SOC stack.
- Service mesh/enterprise zero-trust platform.
- Enterprise DLP.
- Complex bot management.
- Forensic watermarking for every title.
- Multi-region active-active database.
- Aggressive root/jailbreak blocking.
- Credential-sharing ML.

---

# 17. Privacy and Audit Requirements

Privacy-by-design is a launch foundation, but engineering must not claim legal compliance beyond implemented controls and confirmed counsel decisions.

Required technical direction:

- Maintain a personal-data inventory, purpose/category/sensitivity/retention classification, and processor/data-location registry.
- Collect only fields required by defined product/business purposes; do not add date-of-birth or child data “just in case.”
- Version user preferences/consent evidence where the product legally/operationally requires it.
- Implement authorized account export and deletion/anonymization workflows when roadmap phase B32 is active.
- Retention enforcement must be auditable and support dry-run/holds where appropriate.
- Material admin actions and designated sensitive reads require minimal append-only audit evidence.
- Analytics/logging must use field allowlists/redaction; do not send tokens, signed media URLs, OTPs, raw sensitive payloads, or export contents to telemetry vendors.
- Creator/partner reporting is aggregate and scoped to authorized catalogue; default reporting must not expose individual viewer identity, user IDs, device IDs, raw IPs or individual watch histories.
- Cross-partner access/IDOR tests are mandatory for partner reporting.
- Kids mode/child data requires a dedicated future privacy/design review rather than reusing adult assumptions.

---

# 18. Logging, Monitoring, Analytics and Error Handling

## 18.1 Backend logging

- Structured JSON in production.
- Include request/trace ID, environment, service version and safe entity IDs where relevant.
- Never log passwords, access/refresh tokens, raw payment details or full sensitive user payloads.
- Sample noisy successful logs where appropriate.
- Alert on actionable symptoms, not every transient warning.

## 18.2 Minimum operational metrics

| Area | Examples |
|---|---|
| API | request count, p50/p95 latency, 4xx/5xx, top error codes |
| DB | CPU, connections, slow queries, storage, backup/replication health |
| Playback auth | requests, denial reasons, token/manifest errors |
| Media pipeline | upload count, processing time, failed/stuck assets, webhook failures |
| Content ops | publish/unpublish failures, expiry jobs, admin errors |
| Application errors | Sentry/errors with trace/request ID and release version |
| Business/QoE | active content, play starts, qualified watch time, completion, startup/rebuffer/error signals |

## 18.3 Analytics event taxonomy

Keep a small stable taxonomy across mock, staging and production:

- Acquisition/app: app open, registration/login where permitted.
- Discovery: home view, rail/content impression, content open, search, zero-result.
- Library: watchlist add/remove, progress update, resume.
- Playback: play request/start, first frame, rebuffer start/end, playback error, complete.
- Content operations: content created, media uploaded, processing complete, published/unpublished.
- Partner reporting: qualified view, watch time, completion, discovery source as authorized aggregate.

Critical transactional facts such as playback sessions, content-state changes, and later payments must remain in the platform DB/durable system of record; never rely only on an external analytics dashboard.

## 18.4 Error-handling contract

- Typed machine-readable error code + trace ID.
- Android maps server/network/player errors to typed app errors.
- UI has intentional loading/empty/offline/retry/unavailable/session-expired states.
- Human-readable server messages are not branching logic.
- Rights/territory/entitlement/unpublished outcomes map to clear client UX.

---

# 19. Background Jobs, Queues and Caching

## 19.1 Background work

Move long/retryable operations out of synchronous API requests as they appear:

- Provider webhook processing.
- Scheduled publishing.
- Rights-expiry alerts/transitions.
- Analytics aggregation.
- Notifications later.
- Partner report generation later.

Use durable retry and dead-letter/manual review where applicable.

**Duplicate delivery is expected.** Use provider event IDs/deterministic idempotency keys; do not design around “exactly once”.

## 19.2 Cache policy

- Cache is derived acceleration, never the only business truth.
- Rights/publication changes must invalidate affected cache keys promptly.
- Redis is optional until a measured need exists.
- Typical later uses: hot home/category cache, distributed rate limits, playback/session limits, selected search cache, queue backend where appropriate.
- Avoid caching availability/search in ways that allow stale rights to bypass server policy.

---

# 20. CI/CD and Deployment Expectations

## 20.1 Git workflow

- Trunk-based development.
- `main` remains buildable/releasable.
- Short-lived phase/task branches.
- Small coherent commits and frequent checkpoints.
- Human review is mandatory for API contract changes, auth/authorization, migrations, rights/playback, security, signing and production infrastructure.

Recommended branch examples:

```text
phase/P08-media3-playback
phase/B15-playback-authorization
fix/B15-token-expiry
```

## 20.2 Backend release pipeline

Expected Launchable-Core direction:

1. Merge reviewed change to `main`.
2. Build one versioned container image.
3. Run controlled migration against staging.
4. Deploy staging.
5. Run smoke/contract/E2E checks.
6. Promote the **same image digest** to production after approval.
7. Run production migration via controlled job when required.
8. Verify health/error/key endpoints.
9. Roll back application when necessary; do not improvise untracked production edits.

## 20.3 Infrastructure as code

Infrastructure definitions must cover the reproducible network, DB, compute, storage, secrets references, IAM and alarms necessary for each environment. Use one selected IaC tool and keep it understandable; do not build an abstraction layer around it.

## 20.4 Android CI expectations

At phase-appropriate points, PR CI should run:

- Formatting/static analysis.
- Unit/ViewModel tests.
- Relevant contract validation.
- Debug/staging assembly.
- Selected high-value instrumentation/Compose checks.
- Later release/signing checks when P20 is active.

---

# 21. Testing Strategy and Quality Gates

## 21.1 Android

Unit coverage should protect:

- DTO/domain mapping.
- Formatting/metadata rules.
- Progress/completion calculations.
- Repository cache/remote decisions.
- Error conversion.
- Player pure-state rules.
- Analytics event construction.

ViewModel/state tests should cover loading → success, loading → empty, offline cached behavior, retry, optimistic watchlist, playback-session request state, auth/session expiry, and progress synchronization.

High-value Compose smoke journeys:

- Home renders deterministic content.
- Card opens correct details.
- Search returns/opens a result.
- Watchlist updates visible state.
- Play CTA reaches player/playback-session path.
- Critical errors expose recovery actions.

Media-device matrix must eventually include low-end, mid-range, modern reference device, throttled network, Wi-Fi↔cellular handoff, background/foreground, audio interruption and memory pressure.

## 21.2 Backend

Depending on phase, validate:

- Unit tests for domain rules.
- Integration tests against PostgreSQL/Prisma.
- Migration apply from clean DB and upgrade path where relevant.
- Contract/schema/fixture validation.
- Auth/authorization negative tests.
- Rights/takedown/playback-policy tests.
- Provider webhook signature/idempotency tests.
- Queue retry/duplicate/dead-letter behavior.
- Cache invalidation tests.
- Privacy redaction/leakage tests.
- Backup/restore rehearsal before production readiness.
- Android↔backend staging E2E journeys.

## 21.3 Phase acceptance vs production readiness

A phase can be complete when its own implementation/tests/acceptance criteria are green. The platform is not production-ready until launch-readiness phases also validate backups, restore, monitoring/alerts, security/privacy, runbooks, real content workflow, staging E2E, migration/rollback, secrets and production release controls.

---

# 22. Performance and Scalability Requirements

## 22.1 Android performance posture

- Cold start must remain local-first; do not block first useful screen on multiple remote calls.
- Cached/fixture Home should render immediately; remote refresh follows.
- Use stable keys and avoid unnecessary Compose recomposition.
- Optimize image size/cache behavior for mobile data and memory.
- Heavy autoplay video on Home is intentionally avoided initially.
- Application architecture should not require rewrite as usage grows; scale should change caching, telemetry, module splitting, experimentation and playback policy rather than UI→ViewModel→Repository fundamentals.

Scale guidance:

| Scale | Android evolution |
|---|---|
| Demo → 100 | Fix UX/crash/playback defects; no architecture change |
| 100 → 1K | Improve telemetry/cache invalidation/release automation/feature flags |
| 1K → 10K | Tune image/cache, progress sync, token/session edges |
| 10K → 100K | Profile startup/memory/ANR by device class; broader device lab; API/paging optimization |
| 100K+ | Split more modules only if justified; deeper QoE tuning; dual-codec/TV reuse if validated |

## 22.2 Backend scalability posture

- Correctly indexed PostgreSQL first.
- Add Redis only for measured/policy needs.
- Scale application containers vertically/horizontally before decomposing services.
- Keep media traffic out of application compute.
- Search remains PostgreSQL until measured limitations justify OpenSearch.
- Queues/outbox are introduced when asynchronous workload exists; no Kafka by default.
- Multi-CDN/multi-cloud only after real scale/economics/reliability evidence.

---

# 23. Backup, Restore and Operational Reliability

- A backup that has never been restored is not trusted.
- PostgreSQL should use managed automated backups/PITR where available at launch.
- Object/master storage should use appropriate versioning/lifecycle/private-access protections.
- Infrastructure must be reproducible via IaC.
- Secrets recovery means rotation/re-provisioning procedure, not copying secrets into generic backups.
- At least one staging restore rehearsal from a production-like backup is required for launch readiness.
- Early RTO/RPO must be realistic, documented and tested; do not invent enterprise guarantees.
- Incident runbooks later own operational response; privacy/security evidence gathering must not become unrestricted PII export tooling.

---

# 24. Development Roadmaps

## 24.1 Android implementation roadmap

> **Current implementation state:** No Android implementation phase should be assumed complete from documentation alone. P00 is the bootstrap predecessor and is `READY`/`NOT STARTED` unless repository evidence proves completion.

| Phase | Title | Broad dependency / role |
|---|---|---|
| P00 | Development Environment & Repository Bootstrap | Blocking bootstrap before P01 |
| P01 | Android Architecture & Project Foundations | Core architecture |
| P02 | Design System & Reusable UI Components | P01 |
| P03 | Navigation, App Shell & Bootstrap Flow | P01 |
| P04 | Mock Data, Repository & Local Data Infrastructure | P01; enables mock-first feature work |
| P05 | Home, Discovery & Browse | P02–P04 |
| P06 | Movie / Series / Episode Details | P02–P04 |
| P07 | Search | P04; contract alignment with B10 |
| P08 | Media3 Player & Playback Experience | Can begin with demo HLS; real path later needs B15–B19 |
| P09 | Watch Progress & Continue Watching | Local-first; later B13 sync |
| P10 | Watchlist / Library | Local-first; later B13 sync |
| P11 | Authentication, Session & Account Foundation | Integrates with B11/B12 |
| P12 | OpenAPI, Networking & Production API Infrastructure | Requires shared contract B04 direction |
| P13 | Staging Backend Integration | Formal completion depends on B29 |
| P14 | Offline, Error & Resilience Behaviour | Builds on real/mock repositories and integration |
| P15 | Analytics & Playback QoE | Aligns with B26 |
| P16 | Security & Privacy Hardening | Aligns with B31/B32 |
| P17 | Testing & Device/Network Validation | Aligns with B30/E2E |
| P18 | Pitchable MVP Hardening | Stage-gate hardening |
| P19 | Production / Launchable Core Integration | Aligns with B38/B39 |
| P20 | CI/CD, Signing & Play Store Release | Aligns with B40/B41 production readiness |
| P21 | Incremental Expansion / Post-Launch Features | Monetization/DRM/downloads/TV/casting/etc. as validated |

## 24.2 Backend/content/infrastructure roadmap

> **Current implementation state:** Detailed B01–B47 planning documents exist, but code phases should be treated as `NOT STARTED` unless repository evidence/ledger says otherwise.

| Phase | Title |
|---|---|
| B01 | Repository, NestJS Architecture & Engineering Foundations |
| B02 | Configuration, Local Environment & Developer Infrastructure |
| B03 | PostgreSQL, Prisma & Database Foundations |
| B04 | OpenAPI Contract, DTOs, Validation & Error Architecture |
| B05 | Logging, Request IDs, Health Checks & Observability Foundation |
| B06 | Seed Data, Fixtures & Mock Integration Infrastructure |
| B07 | Catalogue Domain & Content Metadata |
| B08 | Taxonomy, Categories, Collections & Editorial Structure |
| B09 | Home, Discovery & Content Presentation APIs |
| B10 | Search |
| B11 | Authentication & Identity Foundation |
| B12 | Users, Profiles, Devices & Sessions |
| B13 | Watchlist, Viewing History & Progress |
| B14 | Rights, Territory, Availability & Entitlement Foundation |
| B15 | Playback Authorization & Playback Sessions |
| B16 | Managed Video Provider Integration |
| B17 | Content Ingestion & Upload Pipeline |
| B18 | Video Processing, ABR, HLS & Media Asset Lifecycle |
| B19 | Storage, Origin, CDN & Signed Media Delivery |
| B20 | Artwork, Subtitles & Supporting Asset Management |
| B21 | Publishing Workflow & Content State Machine |
| B22 | Rights Expiry, Takedown & Availability Enforcement |
| B23 | Admin CMS Backend APIs & Administration Foundation |
| B24 | Admin CMS Interface & Content Operations |
| B25 | Creator / Production-House Onboarding Workflow |
| B26 | Analytics Event Architecture & Playback QoE |
| B27 | Background Jobs, Scheduling & Queue Infrastructure |
| B28 | Redis, Caching & Rate Limiting |
| B29 | Staging Environment & Android Integration |
| B30 | Contract Testing & End-to-End Integration Testing |
| B31 | Security Hardening |
| B32 | Privacy, Audit & Compliance Foundations |
| B33 | CI/CD & Infrastructure as Code |
| B34 | Production Infrastructure & Environment Provisioning |
| B35 | Monitoring, Alerting & Operational Dashboards |
| B36 | Backup, Restore & Disaster-Recovery Procedures |
| B37 | Pitchable MVP Backend Hardening |
| B38 | Production-House-Ready Content Pipeline |
| B39 | Launchable Core Integration |
| B40 | Production Readiness & Launch Validation |
| B41 | Operational Runbooks & Incident Response |
| B42 | Cost Monitoring & Infrastructure Optimization |
| B43 | Scalability Foundations |
| B44 | Post-Launch Monetization Infrastructure |
| B45 | DRM & Advanced Content Protection |
| B46 | Creator Self-Service / Partner Platform |
| B47 | Incremental Expansion & Future Platform Capabilities |

---

# 25. Cross-Repository Dependency Map

| Capability | Backend phases | Android phases | Integration rule |
|---|---|---|---|
| Contract/error conventions | B04/B06 | P04/P12 | Contract/fixtures approved before integrated feature complete |
| Catalogue/home/details | B07–B09 | P05/P06 | Android can build against fixtures first |
| Search | B10 | P07 | Same response/error/pagination semantics |
| Authentication | B11/B12 | P11/P12 | Independent implementation, staging E2E before launch |
| Watchlist/progress | B13 | P09/P10 | Android local-first; backend authoritative at launch |
| Rights/availability | B14/B22 | P06/P08/P19 | Never duplicate authorization rules into client |
| Playback authorization | B15 | P08/P12/P13 | Client requests short-lived source; server policy authoritative |
| Media delivery | B16–B20 | P08 | Direct CDN/provider → Media3 |
| Publishing/admin | B21–B25 | Android consumes visible result | No manual production DB editing |
| Analytics/QoE | B26 | P15 | Stable event taxonomy; critical facts durable |
| Staging | B29 | P13 | Hard formal integration checkpoint |
| Contract/E2E | B30 | P17 | Shared acceptance gate |
| Security/privacy | B31/B32 | P16 | Cross-system launch gate |
| Production infra | B33–B36 | P19/P20 | Not a prerequisite for early mock UI work |
| Launch core | B38–B40 | P19/P20 | Real content → real auth → playback → progress → monitoring |
| Monetization/DRM | B44/B45 | P21 | Post-launch/partner-triggered unless business decision advances it |

Recommended methodology: **parallelize implementation, serialize shared contracts and integration gates.**

---

# 26. Current Development Status

As of this context version:

| Area | Status |
|---|---|
| Strategy/commercial feasibility | Completed planning documentation |
| Technical architecture research | Completed planning documentation |
| Android master plan | Completed |
| Android execution documents P00–P21 | Planned/documented; implementation must be verified per repo |
| Backend master plan | Completed |
| Backend execution documents B01–B47 | Planned/documented; implementation must be verified per repo |
| Android code | Do not assume started without repository evidence |
| Backend code | Do not assume started without repository evidence |
| Shared API contract | B04/P12 work; do not invent a final contract if repository does not yet contain the approved artifact |
| Production infrastructure | Future phases B33–B36 |
| Production launch | Future phases B38–B41 + P19–P20 |

### First implementation wave

1. Complete/verify P00 bootstrap.
2. Start P01 and B01 in parallel.
3. Establish repositories/context/quality gates before feature work.
4. Build shared contract intentionally in B04/P12 rather than ad-hoc in feature code.

---

# 27. Common Mistakes Codex Must Avoid

- Treating the project as a generic Netflix clone.
- Completing all backend first or all Android first despite mock/API-first architecture.
- Inventing API schemas independently in Android and backend.
- Duplicating rights/entitlement/business policy in Android.
- Returning raw Prisma models through HTTP.
- Letting feature screens directly coordinate Retrofit + Room.
- Hard-coding production playback URLs.
- Streaming media bytes through NestJS.
- Uploading large partner master files through NestJS request bodies.
- Adding Redis/OpenSearch/Kafka/Kubernetes/microservices because they are “industry standard”.
- Adding a data warehouse/ML recommendations before meaningful data exists.
- Using database IDs/sequence numbers as public API identifiers.
- Branching Android behavior on human-readable server error text.
- Ignoring unknown enum values on the client.
- Letting stale progress move users backward.
- Treating Continue Watching as an independent truth rather than derived viewer state.
- Deleting historical/audit data to implement a title takedown.
- Relying on CDN object deletion as the rights engine.
- Assuming web/iOS/TV/live/sports are MVP scope.
- Implementing payments/DRM/creator portal early without roadmap/business trigger.
- Logging signed URLs, tokens, OTPs, credentials, raw PII or payment details.
- Assuming a backup is valid without restore rehearsal.
- Modifying production manually without an IaC/migration/audit trail.
- Silently choosing unresolved toolchain/package/provider decisions.
- Performing large opportunistic refactors while implementing a bounded phase.
- Marking work complete when mandatory tests/builds/acceptance criteria fail.

---

# 28. Definition of Done

## 28.1 Task/phase Definition of Done

A development task or roadmap phase is `COMPLETE` only when all applicable items are true:

- [ ] Required predecessor phases are complete or approved mocks/interfaces explicitly allow independence.
- [ ] Implementation satisfies the active phase scope and does not pull later work forward.
- [ ] Existing architecture and naming conventions are preserved.
- [ ] Required unit/integration/UI/contract/security tests are added or updated.
- [ ] Formatting/lint/static checks pass.
- [ ] Build/typecheck/compile passes.
- [ ] Database migration applies cleanly and upgrade/backward-compatibility behavior is reviewed when relevant.
- [ ] OpenAPI/fixtures remain compatible and validated when relevant.
- [ ] Error/failure paths required by the phase are verified.
- [ ] Security/privacy/logging requirements are met.
- [ ] Acceptance criteria from the phase document are explicitly checked.
- [ ] No unrelated generated files, secrets, debug shortcuts or accidental refactors remain.
- [ ] Documentation/ADR/phase report is updated when behavior or architecture changed.
- [ ] Human review is completed for high-risk changes.
- [ ] Working tree/branch is clean enough for a controlled commit/PR.
- [ ] Known limitations and technical debt are recorded rather than hidden.

## 28.2 Pitchable MVP Definition of Done — product level

A clean install can, without developer intervention:

```text
Launch
→ Browse polished Home
→ Open title
→ Play real streaming video
→ Pause/seek
→ Exit
→ See Continue Watching
→ Resume
→ Search
→ Add to Watchlist
→ Browse another title
```

Critical screens have intentional loading/empty/offline/error behavior; demo data/media is legally permitted; no hidden developer workaround is needed; playback works on at least a target low/mid-range device and reference device; mocked billing/analytics/partner behavior is not misrepresented as live.

## 28.3 Launchable backend Definition of Done — product/platform level

A new partner title can move without manual production SQL/unsafe shell operations through:

```text
Create partner + rights
→ create content
→ upload metadata/artwork/master
→ process media
→ preview/QC
→ publish
→ Android discovery
→ playback authorization
→ stream via CDN
→ progress + analytics
→ unpublish/takedown
→ preserve audit/history
```

Critical tests pass, API compatibility and production migration are reviewed, secrets are absent from repo/logs, monitoring/alerts are active, backup/restore procedure is known and tested as required, partner rights/publication are auditable, and rollback path is documented.

---

# 29. Development Status Vocabulary

Use only these statuses in ledgers/phase reports:

| Status | Meaning |
|---|---|
| `NOT STARTED` | Work not begun |
| `READY` | Prerequisites satisfied; work may start |
| `IN DEVELOPMENT` | Code/config actively changing |
| `CODE COMPLETE` | Intended implementation exists; verification not finished |
| `TESTING` | Automated/manual validation in progress |
| `BLOCKED` | Essential dependency/decision prevents progression |
| `REVIEW` | Validation green; human/phase audit pending |
| `COMPLETE` | Implementation + tests + acceptance + docs + required review all complete |

Recommended ledger entry:

```text
Phase:
Status:
Branch:
Started:
Completed:
Dependencies:
Contract version/commit:
Tests:
Validation commands:
Known issues:
Technical debt:
ADRs:
Next phase:
```

---

# 30. Reusable Codex Phase Prompt

```text
IMPLEMENT ROADMAP PHASE

Repository:
[ott-android / ott-platform / ott-api-contract]

Roadmap:
[ANDROID / BACKEND]

Phase ID:
[Pxx / Bxx]

Phase title:
[EXACT TITLE]

Authoritative phase document:
[path]

Current branch:
[branch]

Required predecessors:
[list]

Expected contract version/commit:
[value / N/A]

OBJECTIVE
Implement this phase completely and only this phase.

BEFORE CODING
1. Read PROJECT_CONTEXT.md and AGENTS.md.
2. Read the complete phase document.
3. Inspect repository structure, relevant existing implementation and tests.
4. Inspect OpenAPI/fixtures if the phase touches shared contracts.
5. Confirm predecessor status.
6. Extract acceptance criteria.
7. Identify security/migration/concurrency/media/privacy implications.
8. Produce a concise implementation plan and expected file list.

Do not modify files until the analysis is complete.

CONSTRAINTS
- Follow approved architecture.
- Do not implement future phases.
- No unrelated refactors.
- No new dependency without clear necessity.
- Preserve backward compatibility unless explicitly approved otherwise.
- Never silently change a shared API/schema/business invariant.

IMPLEMENTATION
Implement in small reviewable steps and reuse existing patterns/components.

VALIDATION
Run all phase-required tests plus relevant build/lint/typecheck/contract checks.
Do not suppress failures.

COMPLETION REPORT
Return:
- Phase/status
- Dependencies verified
- Implemented
- Files changed
- Tests and commands run
- Acceptance-criteria matrix
- Contract/schema/migration changes
- Security/privacy considerations
- Docs/ADR updates
- Known issues/technical debt
- Recommended commit message
- Next-phase readiness

Never report COMPLETE with a failing mandatory check.
Stop after this phase.
```

---

# 31. Reusable Debugging Prompt

```text
DEBUG CURRENT PHASE ONLY

Phase:
[PHASE]

Exact failing command:
[COMMAND]

Exact error/logs:
[OUTPUT]

Expected:
[EXPECTED]

Actual:
[ACTUAL]

Rules:
1. Reproduce before broad changes.
2. Inspect the smallest relevant path first.
3. Correlate failure with recent phase changes.
4. No unrelated refactor.
5. Do not weaken tests/security/validation.
6. Check OpenAPI first for contract failures.
7. Check migration/schema/data assumptions for DB failures.
8. For async failures, reason about ordering, retries, idempotency and duplicates.
9. For playback failures, separate authorization, token, provider/CDN, Media3 and network/device causes.
10. Stop if resolution requires architecture outside the active phase.

Return reproduced/root-cause/evidence/fix/regression-tests/commands/final-result/remaining-uncertainty.
```

---

# 32. Reusable Phase Audit Prompt

```text
AUDIT PHASE AGAINST ROADMAP — DO NOT IMPLEMENT NEW FEATURES

Phase:
[PHASE]
Phase document:
[FILE]
Commit/branch:
[REF]

Audit:
- roadmap/acceptance compliance
- architecture conformity
- dependency violations
- premature future-phase work
- API compatibility
- database/migration safety
- error handling
- auth/security/privacy
- concurrency/idempotency
- tests and meaningful coverage
- observability/operability
- performance where relevant
- unnecessary dependencies
- unrelated refactors
- documentation accuracy

Run relevant validation commands.

Return findings as CRITICAL/HIGH/MEDIUM/LOW with file/location, violated requirement, impact and smallest corrective action.
Then return PASS/FAIL for each acceptance criterion and final result READY TO COMPLETE or NOT READY.
```

---

# 33. Human-Approval Boundaries

Codex may implement and test, but a human must explicitly review/approve decisions or production actions involving:

- Authentication/session policy.
- Authorization/roles/admin access.
- Rights/territory/entitlement semantics.
- Destructive database migrations.
- Production IAM/network/secrets.
- Signing keys and Play Store release.
- Payments, refunds, reconciliation and financial entitlements.
- DRM/content-protection commitments.
- Privacy deletion/retention/legal-hold behavior.
- Production deployment/rollback.
- Backup/restore/RPO/RTO acceptance.
- Major architecture changes or new infrastructure categories.

---

# 34. Final Engineering Position

Build the **simplest disciplined platform that can safely ingest real content, enforce rights, authorize playback, deliver reliable mobile video, survive an initial launch, and evolve without rewriting the product**.

The intended early system is not Netflix-scale infrastructure. It is:

- Native Android consumer app.
- Mock-first client boundaries.
- NestJS modular monolith.
- PostgreSQL/Prisma system of record.
- REST/OpenAPI shared contract.
- Managed media ingestion/transcoding/HLS/CDN.
- Short-lived playback authorization.
- Internal Next.js operations UI.
- AWS-oriented managed production infrastructure.
- Strong observability/security/privacy fundamentals.
- Stage-gated adoption of Redis, queues, DRM, monetization, partner self-service, OpenSearch, multi-CDN, TV/live and advanced personalization only when justified.

**When in doubt: preserve the documented boundary, keep the change small, prove it with tests, and escalate the decision rather than silently redesigning the project.**
