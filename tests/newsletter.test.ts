import { describe, expect, it } from "vitest";
import { ISSUES, filterIssues, pickSelected } from "@/lib/newsletter";

describe("filterIssues", () => {
  it("returns every issue for All with an empty query", () => {
    expect(filterIssues(ISSUES, "All", "")).toHaveLength(3);
  });

  it("filters by section", () => {
    expect(filterIssues(ISSUES, "Note", "").map((i) => i.id)).toEqual(["10"]);
  });

  it("matches title and dek case-insensitively and ignores surrounding spaces", () => {
    expect(filterIssues(ISSUES, "All", "  SHIPPING ").map((i) => i.id)).toEqual(["12"]);
    expect(filterIssues(ISSUES, "All", "product truth").map((i) => i.id)).toEqual(["10"]);
  });

  it("combines section and query", () => {
    expect(filterIssues(ISSUES, "Essay", "shipping")).toEqual([]);
  });
});

describe("pickSelected", () => {
  it("keeps the selected issue while it is visible", () => {
    expect(pickSelected(ISSUES, ISSUES, "11").id).toBe("11");
  });

  it("opens the first visible issue when a filter hides the selected one", () => {
    const visible = filterIssues(ISSUES, "Note", "");
    expect(pickSelected(ISSUES, visible, "12").id).toBe("10");
  });

  it("falls back to the first issue when nothing is visible", () => {
    expect(pickSelected(ISSUES, [], "11").id).toBe("12");
  });
});
