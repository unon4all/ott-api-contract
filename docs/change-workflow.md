# Contract change and Android handoff

For each new endpoint: identify the owning phase and business rule; draft the OpenAPI operation, auth, request/response DTOs, statuses, pagination/idempotency, and errors; approve it; add schema-valid fixtures; implement explicit backend DTOs and boundary validation; map internal models through allow-list response mappers; add HTTP contract tests; validate the breaking diff; run Android serializer/error tests against the exact pinned fixtures; update the changelog; then pin the approved commit in both consumers. Business semantics belong to the owning feature; transport compatibility is reviewed jointly.

Within `/v1`, adding an endpoint or optional response field is normally additive. Removing/renaming a field, changing its type/meaning, tightening requiredness, removing enum behavior, or changing status/error/pagination meaning is breaking. Coordinate a staged migration window or introduce `/v2`. The structural diff is a guard, not permission to make undetected semantic changes.

For Android mock-to-staging cutover, the same DTO and Kotlin Serialization configuration must parse the pinned fixture and staging response. Test an unknown optional field, unknown extensible enum, unknown error code, opaque ID, UTC timestamp and cursor. Keep deterministic local fixtures after cutover. Record the contract commit SHA in each release; do not pin `main`.

The current B04 fixtures are transport-only. Android's existing domain fixtures and provisional code names are not made authoritative by this foundation. B07/B09/B11/B14/B15 and P12/P13 reconcile those feature contracts when owned.
