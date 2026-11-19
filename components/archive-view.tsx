"use client";

import { useMemo, useState } from "react";
import { EmptyState, EntryList, ReaderHead, ResultCount, SearchForm } from "@/components/reader-shell";
import { issueEntry, LetterFrame } from "@/components/newsletter-views";
import { filterIssues, SECTIONS, sectionCounts, type Issue, type SectionFilter } from "@/lib/newsletter";

/** The archive index: live search and section chips over the issues (nothing is sent to the server). */
export function ArchiveView({ issues }: { issues: Issue[] }) {
  const [query, setQuery] = useState("");
  const [section, setSection] = useState<SectionFilter>("All");
  // Chip counts follow the search, so each number is what a click on that chip shows.
  const matching = useMemo(() => filterIssues(issues, "All", query), [issues, query]);
  const counts = sectionCounts(matching);
  const shown = useMemo(() => filterIssues(matching, section, ""), [matching, section]);
  const q = query.trim();

  function reset() {
    setQuery("");
    setSection("All");
  }

  return (
    <LetterFrame>
      <ReaderHead
        eyebrow="Newsletter archive"
        title="A few things worth sending."
        lede="Notes on building, thinking and shipping small useful work. Open an issue to read it."
      />
      {issues.length === 0 ? (
        <EmptyState title="No issues yet">New issues appear here once they are written.</EmptyState>
      ) : (
        <>
          <div className="rs-toolbar">
            <SearchForm label="Search issues" placeholder="Title, summary or section" value={query} onValueChange={setQuery} onClear={() => setQuery("")} />
            <div className="rs-chips" role="group" aria-label="Filter by section">
              <ul>
                {SECTIONS.map((item) => (
                  <li key={item}>
                    <button type="button" className="rs-chip" aria-pressed={section === item} onClick={() => setSection(item)}>
                      {item === "All" ? "All" : `${item}s`}<small>{counts[item]}</small>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <ResultCount shown={shown.length} total={issues.length} noun="issue" query={q || undefined} filter={section === "All" ? undefined : `${section}s`} />
          </div>
          {shown.length > 0 ? (
            <EntryList entries={shown.map(issueEntry)} />
          ) : (
            <EmptyState title="No issues match" action={<button type="button" className="rs-plain" onClick={reset}>Show all issues</button>}>
              Try fewer or different words, or another section.
            </EmptyState>
          )}
        </>
      )}
    </LetterFrame>
  );
}
