import { NextResponse } from "next/server";
import { db } from "@/db";
import { assistanceRequests } from "@/db/schema";
import { schemes } from "@/data/schemes";
import { badRequest, bool, looksAutomated, readJson, reference, serverError, str } from "@/lib/api";

export async function POST(request: Request) {
  const body = await readJson(request);
  if (!body) return badRequest("INVALID_BODY");
  if (looksAutomated(body)) return NextResponse.json({ ok: true, ignored: true });

  const name = str(body.name, 120);
  const village = str(body.village, 120);
  const schemeSlug = str(body.schemeSlug, 80);
  const phone = str(body.phone, 20);

  if (name.length < 2) return badRequest("NAME_REQUIRED");
  if (village.length < 2) return badRequest("VILLAGE_REQUIRED");
  if (!schemes.some((s) => s.slug === schemeSlug)) return badRequest("SCHEME_REQUIRED");
  if (phone && !/^[6-9]\d{9}$/.test(phone.replace(/[\s-]/g, "").replace(/^\+?91/, ""))) return badRequest("PHONE_INVALID");
  if (!bool(body.consent)) return badRequest("CONSENT_REQUIRED");

  try {
    const ref = reference("YS-AH");
    await db.insert(assistanceRequests).values({
      reference: ref,
      schemeSlug,
      applicantType: ["self", "family", "neighbour"].includes(str(body.applicantType, 16))
        ? str(body.applicantType, 16)
        : "self",
      name,
      village,
      phone: phone || null,
      documentsReady: ["all", "partial", "none"].includes(str(body.documentsReady, 16))
        ? str(body.documentsReady, 16)
        : "partial",
      notes: str(body.notes, 1200) || null,
      consent: true,
    });
    return NextResponse.json({ ok: true, reference: ref });
  } catch {
    return serverError();
  }
}
