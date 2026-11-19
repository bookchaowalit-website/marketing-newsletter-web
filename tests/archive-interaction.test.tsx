// @vitest-environment happy-dom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ArchiveView } from "@/components/archive-view";
import { ISSUES } from "@/lib/newsletter";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let root: Root;
let host: HTMLDivElement;
const $ = <T extends Element = HTMLElement>(selector: string) => host.querySelector(selector) as T | null;
const titles = () => [...host.querySelectorAll(".rs-entry-link")].map((a) => a.textContent);
const chip = (label: string) => [...host.querySelectorAll<HTMLButtonElement>(".rs-chip")].find((b) => b.textContent?.startsWith(label))!;
const click = (el: Element) => act(() => { el.dispatchEvent(new MouseEvent("click", { bubbles: true })); });
function type(value: string) {
  const input = $<HTMLInputElement>(".rs-search input")!;
  act(() => {
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!.call(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
}
function mount(issues = ISSUES) {
  host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
  act(() => root.render(<ArchiveView issues={issues} />));
}

beforeEach(() => mount());
afterEach(() => { act(() => root.unmount()); host.remove(); });

describe("archive search and sections", () => {
  it("filters live, counts follow the search, and Clear puts focus back in the field", () => {
    type("backlog");
    expect(titles()).toEqual(["The quiet backlog"]);
    expect(chip("Essays").textContent).toBe("Essays1");
    expect(chip("Notes").textContent).toBe("Notes0");
    expect($(".rs-count")!.textContent).toBe("Showing 1 of 3 issues for “backlog”");
    click([...host.querySelectorAll("button")].find((b) => b.textContent === "Clear")!);
    expect(titles()).toHaveLength(3);
    expect(document.activeElement).toBe($(".rs-search input"));
  });

  it("section chips are pressed buttons; no match shows a way back", () => {
    click(chip("Notes"));
    expect(chip("Notes").getAttribute("aria-pressed")).toBe("true");
    expect(titles()).toEqual(["Proof before polish"]);
    type("shipping");
    expect($(".rs-empty")!.textContent).toContain("No issues match");
    click([...host.querySelectorAll("button")].find((b) => b.textContent === "Show all issues")!);
    expect(titles()).toHaveLength(3);
    expect(chip("All").getAttribute("aria-pressed")).toBe("true");
  });

  it("an empty archive says so", () => {
    act(() => root.unmount());
    host.remove();
    mount([]);
    expect($(".rs-empty")!.textContent).toContain("No issues yet");
  });
});
