# Problem responses and code registry

Non-2xx public JSON responses use `application/problem+json` with required `type`, `title`, `status`, `code`, and `traceId`; optional `detail` and field-safe `errors` are documented in `Problem`. `type` uses `urn:ott:problem:<slug>`. Clients use `code`, never `title` or `detail`, for behavior. New codes require a generic client fallback.

| Code | Intended status | Android behavior | Ownership |
| --- | --- | --- | --- |
| `VALIDATION_ERROR` | 400 | Fix input; show safe field errors | B04 active |
| `AUTH_REQUIRED` | 401 | Sign in | B11 placeholder |
| `TOKEN_EXPIRED` | 401 | Refresh or sign in | B11 placeholder |
| `CONTENT_NOT_FOUND` | 404 | Not found | B07 placeholder |
| `CONTENT_NOT_AVAILABLE` | 403 | Unavailable | B14 placeholder |
| `CONTENT_NOT_AVAILABLE_IN_REGION` | 403 | Region unavailable | B14 placeholder |
| `PLAYBACK_NOT_AUTHORIZED` | 403 | Playback unavailable | B15 placeholder |
| `TOO_MANY_STREAMS` | 409 | Resolve stream limit | B15 placeholder |
| `RATE_LIMITED` | 429 | Back off; honor `Retry-After` | B28 placeholder |
| `FORBIDDEN` | 403 | Generic denied action | B04 fallback |
| `CONFLICT` | 409 | Generic state conflict | B04 fallback |
| `RESOURCE_NOT_FOUND` | 404 | Generic missing route/resource | B04 fallback |
| `SERVICE_UNAVAILABLE` | 503 | Retry later | B04 fallback |
| `INTERNAL_ERROR` | 500 | Generic retry/failure | B04 active |

Only the generic validation, fallback and internal mappings are implemented by B04. Domain codes reserve names without claiming domain behavior. Future phases may change intended status before an operation publishes it, with joint Android review.

`401` means authentication is absent/invalid/expired; `403` means the request is understood but denied; `404` means intentionally not found/visible; `409` means state conflict; `422` requires a feature-owned semantic distinction from syntactic `400`; `429` includes retry guidance; `5xx` indicates server/provider failure and must not expose internal details. Unexpected exceptions return generic `INTERNAL_ERROR` and preserve the trace ID for controlled diagnostics.
