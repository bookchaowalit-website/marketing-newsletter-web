# Newsletter Archive — Product truth

> Inferred from the code and copy (no user interview). Checked against the portfolio card claims review
> (`portfolio-site-web/docs/audits/CARD-CLAIMS-REVIEW-2026-10.md`, row `newsletter`, evidence Live→Prototype) on 2026-10-23.

## What it is

A client-only archive page over three hard-coded sample issues (#12 "Shipping week", #11 "The quiet backlog",
#10 "Proof before polish"). It is a reading surface, not a newsletter service.

## Who it is for

A portfolio visitor who wants to see a calm editorial archive UI: search, a section filter and one open issue.

## What works today

1. Search issue title, dek or section (case-insensitive, surrounding spaces ignored) and filter by All, Issue, Essay
   or Note.
2. Select an issue to read its note on the reading sheet. If a search or filter hides the selected issue, the first
   visible one opens instead.
3. `/api/mcp` answers JSON-RPC (`initialize`, `tools/list`, `tools/call`) with `get_all`, `get_by_id` and `search`
   over the same three issues. It echoes the request id; an unknown tool or id is an invalid-params error (-32602), an
   unknown method is -32601 and malformed JSON is -32700. It sends nothing and stores nothing.
4. Front-end and server errors go to Sentry (errors only, personal data stripped) when `NEXT_PUBLIC_SENTRY_DSN` is set.

## What does not work (and must not be claimed)

- No signup form, double opt-in, subscriber list, email delivery (Resend or any other), scheduled sending or
  delivery metrics. The page itself says "NO SUBSCRIPTION SERVICE ATTACHED". These claims were removed from the
  portfolio card in the 2026-10 review.
- The issues, dates and read times are authored sample copy in `lib/newsletter.ts`, not a fetched archive.
- No account, storage or sync; nothing survives a reload. No product analytics beyond Vercel Analytics.

## Live URL and deploy state

- Live: https://newsletter.bookchaowalit.com (HTTP 200 on 2026-10-23).
- The Vercel project `bookchaowalit-newsletter-frontend` is deployed only by CLI. The last production deploy is the
  CVE patch (2026-10-23 04:59 UTC, CLI, commit fb32bd3). Its Git link names the old repository
  (`bookchaowalit/bookchaowalit-newsletter-frontend`), so a push to `main` does not deploy. The L2 commits (truthful
  MCP route, `lib/newsletter.ts`, tests, Sentry) stay undeployed until the owner reconnects Vercel Git to
  `bookchaowalit-website/marketing-newsletter-web` (owner action D9); until then the live `/api/mcp` is the old
  template that answers id 0 and echoes any tool name.
- `NEXT_PUBLIC_SENTRY_DSN` is set on the Vercel project (Sentry project `marketing-newsletter-web`, org
  `personal-yu0`); it takes effect with the next deploy.

## Boundaries

- Browser-only apart from the stateless `/api/mcp` route.
