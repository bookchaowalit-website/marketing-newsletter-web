import type { ReactNode } from "react";
import { ArticleHeader, Pager, Prose, Reader, ReaderFoot, ReaderTop, type Entry, type PagerLink } from "@/components/reader-shell";
import { readMinutes, type Issue } from "@/lib/newsletter";

// The newsletter archive on the Reader shell. Route files stay thin; these views take plain data.

export const SITE = "https://newsletter.bookchaowalit.com";
const SOURCE = "https://github.com/bookchaowalit-website/marketing-newsletter-web";

export const issueHref = (issue: Issue) => `/issues/${issue.id}`;

export const issueEntry = (issue: Issue): Entry => ({
  href: issueHref(issue),
  title: issue.title,
  summary: issue.dek,
  date: issue.published,
  meta: [`Issue ${issue.id}`, `${readMinutes(issue)} min read`],
  tags: [issue.section],
});

export function LetterFrame({ children }: { children: ReactNode }) {
  return (
    <Reader>
      <ReaderTop name="The Letter" tagline="Newsletter archive" links={[{ href: "/", label: "All issues" }]} />
      <main id="main" className="rs-main">{children}</main>
      <ReaderFoot source={SOURCE} note="Three authored sample issues. No subscription service or email delivery is attached." />
    </Reader>
  );
}

export function IssueView({ issue, previous, next }: { issue: Issue; previous?: Issue; next?: Issue }) {
  const link = (other?: Issue): PagerLink | undefined => (other ? { href: issueHref(other), title: other.title } : undefined);
  return (
    <LetterFrame>
      <article className="rs-article">
        <ArticleHeader
          back={{ href: "/", label: "All issues" }}
          tags={[issue.section]}
          title={issue.title}
          lede={issue.dek}
          date={issue.published}
          meta={[`Issue ${issue.id}`, `${readMinutes(issue)} min read`]}
        />
        <Prose>
          <p>{issue.note}</p>
          <p>This is an authored sample issue, not a delivered newsletter. The archive is the interface: find an issue, read its note, and leave when the thought is clear.</p>
        </Prose>
        <Pager previous={link(previous)} next={link(next)} label="More issues" />
      </article>
    </LetterFrame>
  );
}
