import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

/**
 * Standalone Vite build of the Yojana Saathi React SPA.
 *
 *   npx vite        – SPA on :5173, form submissions proxied to the API on :3000
 *   npx vite build  – production assets in dist/ (deploy behind any static host
 *                     with an /api reverse proxy)
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
