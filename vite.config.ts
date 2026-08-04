// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Temporary debugging override. Restore deployment environment bindings before production.
const supabaseUrl = "https://pvkrqgxhqvwfpwszswvq.supabase.co";
const supabasePublishableKey =
  "sb_publishable__s_UJYnTdhP5KaZtXIgLPg_qg1d0VYK";

export default defineConfig({
  vite: {
    define: {
      "import.meta.env.VITE_SUPABASE_URL": JSON.stringify(supabaseUrl),
      "import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY": JSON.stringify(
        supabasePublishableKey,
      ),
      "import.meta.env.VITE_SUPABASE_ANON_KEY": JSON.stringify(
        supabasePublishableKey,
      ),
    },
  },
  tanstackStart: {
    // Force Nitro to run for Bolt hosting (Cloudflare)
    nitro: true,
  },
});
