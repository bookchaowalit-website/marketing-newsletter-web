import { describe, expect, it } from "vitest";
import { POST } from "@/app/api/mcp/route";

function rpc(body: unknown) {
  return POST(new Request("http://localhost/api/mcp", { method: "POST", body: JSON.stringify(body) }));
}

describe("MCP route", () => {
  it("echoes the JSON-RPC request id", async () => {
    const res = await rpc({ jsonrpc: "2.0", id: 7, method: "tools/list" });
    expect((await res.json()).id).toBe(7);
  });

  it("get_all returns the three archived issues the page shows", async () => {
    const res = await rpc({ jsonrpc: "2.0", id: 1, method: "tools/call", params: { name: "get_all" } });
    const { result } = await res.json();
    expect(result.issues.map((i: { id: string }) => i.id)).toEqual(["12", "11", "10"]);
  });

  it("get_by_id returns one issue", async () => {
    const res = await rpc({ jsonrpc: "2.0", id: 2, method: "tools/call", params: { name: "get_by_id", arguments: { id: "11" } } });
    const { result } = await res.json();
    expect(result.issue.title).toBe("The quiet backlog");
  });

  it("search matches title, dek or section", async () => {
    const res = await rpc({ jsonrpc: "2.0", id: 3, method: "tools/call", params: { name: "search", arguments: { query: "essay" } } });
    const { result } = await res.json();
    expect(result.issues.map((i: { id: string }) => i.id)).toEqual(["11"]);
  });

  it("get_by_id returns an invalid-params error for an unknown id", async () => {
    const res = await rpc({ jsonrpc: "2.0", id: 4, method: "tools/call", params: { name: "get_by_id", arguments: { id: "99" } } });
    const body = await res.json();
    expect(body.error.code).toBe(-32602);
    expect(body.id).toBe(4);
  });

  it("rejects an unknown tool instead of echoing its name", async () => {
    const res = await rpc({ jsonrpc: "2.0", id: 5, method: "tools/call", params: { name: "send_issue" } });
    const body = await res.json();
    expect(body.result).toBeUndefined();
    expect(body.error.code).toBe(-32602);
  });

  it("answers an unknown method with method-not-found", async () => {
    const res = await rpc({ jsonrpc: "2.0", id: 6, method: "resources/list" });
    expect((await res.json()).error.code).toBe(-32601);
  });

  it("answers malformed JSON with a parse error", async () => {
    const res = await POST(new Request("http://localhost/api/mcp", { method: "POST", body: "{" }));
    const body = await res.json();
    expect(body.error.code).toBe(-32700);
    expect(body.id).toBeNull();
  });
});
