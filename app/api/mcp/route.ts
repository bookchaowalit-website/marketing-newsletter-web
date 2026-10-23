import { NextResponse } from "next/server";
import { ISSUES, filterIssues } from "@/lib/newsletter";

// Stateless JSON-RPC MCP endpoint over the same three authored issues the page shows. It sends nothing.

type RpcRequest = { id?: number | string | null; method?: string; params?: { name?: string; arguments?: Record<string, unknown> } };

const TOOLS = [
  { name: "get_all", description: "List every archived sample issue", inputSchema: { type: "object", properties: {} } },
  { name: "get_by_id", description: "Get one archived issue by its number", inputSchema: { type: "object", properties: { id: { type: "string" } }, required: ["id"] } },
  { name: "search", description: "Search issue titles, deks and sections", inputSchema: { type: "object", properties: { query: { type: "string" } }, required: ["query"] } },
];

class RpcError extends Error {
  constructor(readonly code: number, message: string) {
    super(message);
  }
}

function callTool(name: string | undefined, args: Record<string, unknown> = {}) {
  switch (name) {
    case "get_all":
      return { issues: ISSUES };
    case "get_by_id": {
      const issue = ISSUES.find((entry) => entry.id === String(args.id));
      if (!issue) throw new RpcError(-32602, `No issue with id ${String(args.id)}`);
      return { issue };
    }
    case "search":
      return { issues: filterIssues(ISSUES, "All", typeof args.query === "string" ? args.query : "") };
    default:
      throw new RpcError(-32602, `Unknown tool: ${String(name)}`);
  }
}

export async function POST(request: Request) {
  let id: RpcRequest["id"] = null;
  try {
    const body = (await request.json()) as RpcRequest;
    id = body.id ?? null;
    let result: unknown;
    switch (body.method) {
      case "initialize":
        result = {
          protocolVersion: "2024-11-05",
          capabilities: { tools: {} },
          serverInfo: { name: "Newsletter Archive", version: "1.0.0" },
        };
        break;
      case "tools/list":
        result = { tools: TOOLS };
        break;
      case "tools/call":
        result = callTool(body.params?.name, body.params?.arguments);
        break;
      default:
        throw new RpcError(-32601, `Unknown method: ${String(body.method)}`);
    }
    return NextResponse.json({ jsonrpc: "2.0", id, result });
  } catch (error) {
    const code = error instanceof RpcError ? error.code : -32700;
    const message = error instanceof RpcError ? error.message : "Parse error";
    return NextResponse.json({ jsonrpc: "2.0", id, error: { code, message } }, { status: 400 });
  }
}
