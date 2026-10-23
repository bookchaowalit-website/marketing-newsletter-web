import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("home page", () => {
  it("renders the archive with all three issues and the no-subscription notice", () => {
    const html = renderToString(<Home />);
    expect(html).toContain("worth sending.");
    expect(html).toContain("Shipping week");
    expect(html).toContain("The quiet backlog");
    expect(html).toContain("Proof before polish");
    expect(html).toMatch(/3(<!-- -->)? ISSUES/);
    expect(html).toContain("NO SUBSCRIPTION SERVICE ATTACHED");
  });
});
