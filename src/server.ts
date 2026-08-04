import handler, { createServerEntry } from "@tanstack/react-start/server-entry";
import { renderErrorPage } from "./lib/error-page";

function acceptsHtml(request: Request): boolean {
  return request.headers.get("accept")?.includes("text/html") ?? false;
}

function friendlyErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

export default createServerEntry({
  async fetch(request) {
    try {
      const response = await handler.fetch(request);
      if (response.status >= 500 && acceptsHtml(request)) {
        return friendlyErrorResponse();
      }
      return response;
    } catch (error) {
      console.error("[SwasthyaX] Request failed during startup or rendering", error);
      if (acceptsHtml(request)) return friendlyErrorResponse();
      return new Response("Service temporarily unavailable", { status: 503 });
    }
  },
});
