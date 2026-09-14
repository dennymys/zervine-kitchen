// @lovable.dev/vite-tanstack-config sudah otomatis menyertakan:
// tanstackStart, viteReact, tailwindcss, tsConfigPaths, componentTagger (dev-only),
// injeksi env VITE_*, alias path "@", dedupe React/TanStack, error logger plugins, dll.
// JANGAN tambahkan plugin-plugin itu lagi secara manual di sini, nanti duplikat & error.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  // This project deploys to Netlify, not Cloudflare (the wrapper's default
  // target), so the server bundle preset must be pinned explicitly.
  nitro: {
    preset: "netlify",
  },
});
