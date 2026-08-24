"use client";

import { useMemo, useState } from "react";

type Issue = { id: string; date: string; title: string; dek: string; read: string; section: string; note: string };

const ISSUES: Issue[] = [
  { id: "12", date: "16 AUG 2026", title: "Shipping week", dek: "Utilities + mini-apps.", read: "06 MIN", section: "Issue", note: "A small dispatch on making useful things visible: fewer claims, clearer boundaries, and five tools that do one job well." },
  { id: "11", date: "02 AUG 2026", title: "The quiet backlog", dek: "What deserves a second pass.", read: "08 MIN", section: "Essay", note: "An inventory is only useful when it changes what gets opened next. This issue follows the trail from list to decision." },
  { id: "10", date: "19 JUL 2026", title: "Proof before polish", dek: "A field note on product truth.", read: "05 MIN", section: "Note", note: "Before a surface gets a new coat of paint, name what it actually lets someone do. The rest is direction." },
];
const SECTIONS = ["All", "Issue", "Essay", "Note"] as const;

export default function Home() {
  const [query, setQuery] = useState("");
  const [section, setSection] = useState<(typeof SECTIONS)[number]>("All");
  const [selectedId, setSelectedId] = useState(ISSUES[0].id);
  const visible = useMemo(() => ISSUES.filter((issue) => {
    const text = `${issue.title} ${issue.dek} ${issue.section}`.toLowerCase();
    return (section === "All" || issue.section === section) && text.includes(query.toLowerCase());
  }), [query, section]);
  const selected = ISSUES.find((issue) => issue.id === selectedId) ?? visible[0] ?? ISSUES[0];

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
