# The Letter — design direction

## Product surface

An archive of three authored sample newsletter issues. Search and filter the index, then open an
issue on its own page. No subscription service or email delivery is attached.

## System (2026-11-19)

The site uses the shared **Reader shell** (`app/reader-shell.css`, `components/reader-shell.tsx`,
`tests/reader-shell.test.tsx`, `READER.md`), copied byte-identical from content-techblog-web. Colours
are the shell's `--rs-*` tokens in light and dark (the paper/blue/red theme with its 3.7–4.2:1 reds
and greys is gone). Typography is Geist via `next/font`.

- `/`: one h1, live search (nothing sent to the server), section chips as pressed buttons whose counts
  follow the search, a result count, and entries (date, issue number, reading time, summary, section).
- `/issues/[id]`: back link, section tag, title, lede, meta with a machine-readable date, the note,
  and previous/next. On phones the issue is its own page, so opening one always shows it.
- Empty states for no issues and no match (Show all issues resets search and section).
- Top bar and footer link back to bookchaowalit.com; `/more-projects` redirects there.
- Floor: text >= 12px, controls >= 44px, 3px focus ring, 4.5:1 text, 3:1 control edges, no horizontal scroll at 320px.
