import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./app/globals.css";

/**
 * Vite entry point. Runs the same React Router application as the hosted shell:
 *
 *   npx vite            → http://localhost:5173 (proxies /api to :3000)
 *   npx vite build      → static SPA in dist/
 */
const container = document.getElementById("root");
if (!container) throw new Error("Root container #root was not found");

createRoot(container).render(
  <StrictMode>
    <App basename="/yojana-saathi" />
  </StrictMode>,
);
