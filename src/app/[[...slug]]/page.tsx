import { App } from "@/App";

/**
 * Next host shell for the React SPA.
 *
 * The entire UI is a client-side React Router application. This optional catch-all
 * route hands the requested path to the app for the first render; the browser
 * router takes over and reads query parameters on the client.
 */
export default async function SpaRoute({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const path = "/" + (slug ?? []).join("/");

  return <App initialPath={path} />;
}
