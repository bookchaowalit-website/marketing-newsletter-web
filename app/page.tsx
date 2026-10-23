"use client";

import { useMemo, useState } from "react";
import { ISSUES, SECTIONS, filterIssues, pickSelected, type SectionFilter } from "@/lib/newsletter";

export default function Home() {
  const [query, setQuery] = useState("");
  const [section, setSection] = useState<SectionFilter>("All");
  const [selectedId, setSelectedId] = useState(ISSUES[0].id);
  const visible = useMemo(() => filterIssues(ISSUES, section, query), [query, section]);
  // Opens the first visible issue when a search or filter hides the selected one.
  const selected = pickSelected(ISSUES, visible, selectedId);

  return (
    <main className="dispatch-shell">
      <div className="dispatch-frame">
        <header className="dispatch-topbar">
          <a className="masthead" href="https://bookchaowalit.com" aria-label="Bookchaowalit home">THE / LETTER</a>
          <span>ARCHIVE OF SMALL SIGNALS</span>
          <span>VOL. 03 / {ISSUES.length} ISSUES</span>
        </header>

        <section className="dispatch-intro">
          <div>
            <h1>A few things<br /><em>worth sending.</em></h1>
            <p>A local issue archive for notes on building, thinking, and shipping small useful work.</p>
          </div>
          <div className="stamp" aria-hidden="true"><span>READ</span><b>03</b><span>LOCAL ARCHIVE</span></div>
        </section>

        <section className="archive-desk" aria-label="Newsletter archive">
          <aside className="issue-index">
            <div className="index-head"><span>ISSUE INDEX</span><span>{visible.length} FOUND</span></div>
            <label className="archive-search"><span aria-hidden="true">⌕</span><span className="sr-only">Search issues</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the archive" /></label>
            <div className="section-tabs" role="tablist" aria-label="Filter by section">
              {SECTIONS.map((item) => <button key={item} type="button" role="tab" aria-selected={section === item} className={section === item ? "active" : ""} onClick={() => setSection(item)}>{item}</button>)}
            </div>
            <div className="issue-list">
              {visible.length ? visible.map((issue) => (
                <button key={issue.id} type="button" className={`issue-row${selected.id === issue.id ? " selected" : ""}`} onClick={() => setSelectedId(issue.id)} aria-pressed={selected.id === issue.id}>
                  <span className="issue-number">{issue.id}</span>
                  <span className="issue-row-copy"><small>{issue.date} / {issue.section}</small><strong>{issue.title}</strong><em>{issue.dek}</em></span>
                  <span className="issue-arrow" aria-hidden="true">↗</span>
                </button>
              )) : <p className="empty-archive">Nothing filed under that search.</p>}
            </div>
          </aside>

          <article className="reading-sheet">
            <div className="sheet-meta"><span>SELECTED DISPATCH / {selected.date}</span><span>{selected.read}</span></div>
            <div className="sheet-rule" />
            <p className="sheet-section">{selected.section} / FIELD NOTE</p>
            <h2>{selected.title}</h2>
            <p className="sheet-dek">{selected.dek}</p>
            <div className="sheet-body"><p>{selected.note}</p><p>Read this as an authored sample issue, not as a delivered newsletter. The archive is the interface: find a dispatch, open its shape, leave when the thought is clear.</p></div>
            <div className="sheet-footer"><span>BOOKCHAOWALIT / THE LETTER</span><span>NO SUBSCRIPTION SERVICE ATTACHED</span></div>
          </article>
        </section>

        <footer className="dispatch-footer"><span>THE LETTER / LOCAL ARCHIVE</span><span>SEARCH · FILTER · READ</span></footer>
      </div>
    </main>
  );
}
