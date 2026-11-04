import { App } from "@/App";

/**
 * Next host shell for the React SPA.
 *
 * The entire UI is a client-side React Router application. This optional catch-all
 * route hands the requested path (and the `category` query used by the contact page)
 * to the app so the first render matches the URL, then the browser router takes over.
 */
export default async function SpaRoute({
  params,
  searchParams,
}: {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const query = await searchParams;

  const path = "/" + (slug ?? []).join("/");
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (typeof value === "string") search.set(key, value);
    else if (Array.isArray(value) && value[0]) search.set(key, value[0]);
  }
  const initialPath = search.size > 0 ? `${path}?${search.toString()}` : path;

  return <App initialPath={initialPath === "//" ? "/" : initialPath} />;
}
