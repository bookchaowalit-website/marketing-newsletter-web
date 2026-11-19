import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";
import IssuePage, { generateMetadata, generateStaticParams } from "@/app/issues/[id]/page";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";

describe("archive index on the Reader shell", () => {
  const html = renderToString(<Home />);

  it("lists the three issues as links to their own pages, with dates and sections", () => {
    expect(html).toContain('class="rs"');
    expect(html).toContain("A few things worth sending.");
    for (const id of ["12", "11", "10"]) expect(html).toContain(`href="/issues/${id}"`);
    expect(html).toContain('dateTime="2026-08-16"');
    expect(html).toContain("16 Aug 2026");
    expect(html).toContain("3 issues");
    expect(html).toContain("No subscription service or email delivery is attached.");
    expect(html).not.toMatch(/THE \/ LETTER|VOL\. 03/);
  });

  it("has one h1 and a footer link back to the hub", () => {
    expect(html.match(/<h1/g)).toHaveLength(1);
    expect(html).toContain('href="https://bookchaowalit.com/"');
  });
});

describe("issue pages", () => {
  it("are generated for every issue, with metadata, and 404 for an unknown id", async () => {
    expect(generateStaticParams()).toEqual([{ id: "12" }, { id: "11" }, { id: "10" }]);
    expect((await generateMetadata({ params: Promise.resolve({ id: "11" }) })).title).toBe("The quiet backlog | The Letter");
    expect(await generateMetadata({ params: Promise.resolve({ id: "99" }) })).toEqual({});
    await expect(IssuePage({ params: Promise.resolve({ id: "99" }) })).rejects.toThrow();
  });

  it("render the issue with its header, the sample note and previous/next links", async () => {
    const html = renderToString(await IssuePage({ params: Promise.resolve({ id: "11" }) }));
    expect(html.match(/<h1/g)).toHaveLength(1);
    expect(html).toContain("The quiet backlog");
    expect(html).toContain("8 min read");
    expect(html).toContain("authored sample issue");
    expect(html).toContain('href="/issues/12" rel="prev"');
    expect(html).toContain('href="/issues/10" rel="next"');
    expect(html).toContain("← <!-- -->All issues");
  });
});

describe("robots and sitemap", () => {
  it("use the site's own domain and list every issue", () => {
    expect(robots().sitemap).toBe("https://newsletter.bookchaowalit.com/sitemap.xml");
    expect(sitemap().map((entry) => entry.url)).toEqual([
      "https://newsletter.bookchaowalit.com/",
      "https://newsletter.bookchaowalit.com/issues/12",
      "https://newsletter.bookchaowalit.com/issues/11",
      "https://newsletter.bookchaowalit.com/issues/10",
    ]);
  });
});
