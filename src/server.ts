import handler, { createServerEntry } from "@tanstack/react-start/server-entry";
import { renderErrorPage } from "./lib/error-page";

function getBackendEnvironmentStatus() {
  const hasServerUrl = Boolean(process.env.SUPABASE_URL);
  const hasServerPublishableKey = Boolean(process.env.SUPABASE_PUBLISHABLE_KEY);
  const hasBuildUrl = Boolean(process.env.VITE_SUPABASE_URL);
  const hasBuildPublishableKey = Boolean(process.env.VITE_SUPABASE_PUBLISHABLE_KEY);

  return {
    hasServerUrl,
    hasServerPublishableKey,
    hasBuildUrl,
    hasBuildPublishableKey,
    ready:
      (hasServerUrl || hasBuildUrl) &&
      (hasServerPublishableKey || hasBuildPublishableKey),
  };
}

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
    const backendEnvironment = getBackendEnvironmentStatus();
    console.info("[SwasthyaX] Backend environment check", backendEnvironment);

    if (!backendEnvironment.ready) {
      console.error(
        "[SwasthyaX] Backend initialization blocked: URL or publishable key binding is missing",
      );
      if (acceptsHtml(request)) return friendlyErrorResponse();
      return new Response("Service temporarily unavailable", { status: 503 });
    }

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
