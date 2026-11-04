import { NextResponse } from "next/server";
import { count } from "drizzle-orm";
import { db } from "@/db";
import {
  assistanceRequests,
  contactMessages,
  eligibilityRequests,
  saathiApplications,
  schemeViews,
} from "@/db/schema";
import { pilot } from "@/data/pilot";

export const dynamic = "force-dynamic";

/**
 * Live request counters from the prototype database, published next to the
 * static pilot targets. Nothing here is a measure of government service delivery.
 */
export async function GET() {
  const empty = { eligibility: 0, assistance: 0, saathi: 0, contact: 0, views: 0 };
  try {
    const [e, a, s, c, v] = await Promise.all([
      db.select({ n: count() }).from(eligibilityRequests),
      db.select({ n: count() }).from(assistanceRequests),
      db.select({ n: count() }).from(saathiApplications),
      db.select({ n: count() }).from(contactMessages),
      db.select({ n: count() }).from(schemeViews),
    ]);
    const byScheme = await db
      .select({
        slug: assistanceRequests.schemeSlug,
        n: count(),
      })
      .from(assistanceRequests)
      .groupBy(assistanceRequests.schemeSlug);

    return NextResponse.json({
      ok: true,
      demo: true,
      requests: {
        eligibility: e[0]?.n ?? 0,
        assistance: a[0]?.n ?? 0,
        saathi: s[0]?.n ?? 0,
        contact: c[0]?.n ?? 0,
        views: v[0]?.n ?? 0,
      },
      assistanceByScheme: byScheme.map((row) => ({ slug: row.slug, count: row.n })),
      targets: pilot.targets,
      generatedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ ok: true, demo: true, requests: empty, assistanceByScheme: [], targets: pilot.targets });
  }
}
