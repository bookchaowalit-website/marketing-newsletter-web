// The three authored sample issues and the search/filter rules used by the page and the MCP route.

export type Section = "Issue" | "Essay" | "Note";
export type Issue = { id: string; date: string; published: string; title: string; dek: string; read: string; section: Section; note: string };
export const SECTIONS = ["All", "Issue", "Essay", "Note"] as const;
export type SectionFilter = (typeof SECTIONS)[number];

export const ISSUES: Issue[] = [
  { id: "12", date: "16 AUG 2026", published: "2026-08-16", title: "Shipping week", dek: "Utilities + mini-apps.", read: "06 MIN", section: "Issue", note: "A small dispatch on making useful things visible: fewer claims, clearer boundaries, and five tools that do one job well." },
  { id: "11", date: "02 AUG 2026", published: "2026-08-02", title: "The quiet backlog", dek: "What deserves a second pass.", read: "08 MIN", section: "Essay", note: "An inventory is only useful when it changes what gets opened next. This issue follows the trail from list to decision." },
  { id: "10", date: "19 JUL 2026", published: "2026-07-19", title: "Proof before polish", dek: "A field note on product truth.", read: "05 MIN", section: "Note", note: "Before a surface gets a new coat of paint, name what it actually lets someone do. The rest is direction." },
];

/** Issues in `section` ("All" for every issue) whose title, dek or section contains `query`, ignoring case. */
export function filterIssues(issues: Issue[], section: SectionFilter, query: string): Issue[] {
  const needle = query.trim().toLowerCase();
  return issues.filter(
    (issue) =>
      (section === "All" || issue.section === section) &&
      `${issue.title} ${issue.dek} ${issue.section}`.toLowerCase().includes(needle),
  );
}

/** The selected issue if it is still visible, else the first visible issue, else the first issue overall. */
export function pickSelected(issues: Issue[], visible: Issue[], selectedId: string): Issue {
  return visible.find((issue) => issue.id === selectedId) ?? visible[0] ?? issues[0];
}

/** "06 MIN" → 6. */
export function readMinutes(issue: Issue): number {
  return Number.parseInt(issue.read, 10) || 1;
}

/** Issues in each section among `issues` (for filter chips whose count follows the search). */
export function sectionCounts(issues: Issue[]): Record<SectionFilter, number> {
  return {
    All: issues.length,
    Issue: issues.filter((issue) => issue.section === "Issue").length,
    Essay: issues.filter((issue) => issue.section === "Essay").length,
    Note: issues.filter((issue) => issue.section === "Note").length,
  };
}
