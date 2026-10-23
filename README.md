# Newsletter Archive

A small newsletter archive page: three authored sample issues you can search (title, dek, section) and filter by
Issue, Essay or Note, with one issue open on a reading sheet. Sample data only, kept in the code.

Live: https://newsletter.bookchaowalit.com (deployed by Vercel CLI; it lags `main`, see `PRODUCT.md`).

## What it does not do

- No signup, subscriber list, email sending, scheduling or delivery metrics. No account. Nothing is saved.

## Run

```bash
npm ci
npm run dev
```

## Checks

```bash
npm test           # Vitest: archive logic, MCP route, home page render, Sentry scrubbing
npm run lint
npm run typecheck
npm run build
```

CI (`.github/workflows/ci.yml`) runs the shared Node workflow (lint, typecheck, tests with a line-coverage gate,
build) and the shared security scan on every push and PR to `main`.

## Code map

- `lib/newsletter.ts`: the three authored issues plus `filterIssues` and `pickSelected` (used by the page and the MCP
  route).
- `app/page.tsx`: the archive page (search, section tabs, issue index, reading sheet).
- `app/api/mcp/route.ts`: stateless JSON-RPC endpoint with `get_all`, `get_by_id` and `search` over those issues.
- `lib/sentry.ts` + `instrumentation*.ts`: error reporting to Sentry, errors only, personal data stripped; off when
  `NEXT_PUBLIC_SENTRY_DSN` is unset.
- `app/more-projects/page.tsx`: shared portfolio link page (copied per repository, not a package).
