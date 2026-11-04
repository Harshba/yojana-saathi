import { NextResponse } from "next/server";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import { badRequest, bool, looksAutomated, readJson, reference, serverError, str } from "@/lib/api";

const CATEGORIES = ["support", "partnership", "feedback", "grievance", "volunteer", "media"] as const;

export async function POST(request: Request) {
  const body = await readJson(request);
  if (!body) return badRequest("INVALID_BODY");
  if (looksAutomated(body)) return NextResponse.json({ ok: true, ignored: true });

  const name = str(body.name, 120);
  const message = str(body.message, 2000);
  const email = str(body.email, 140);
  const phone = str(body.phone, 20);
  const category = str(body.category, 24);

  if (name.length < 2) return badRequest("NAME_REQUIRED");
  if (message.length < 12) return badRequest("MESSAGE_TOO_SHORT");
  if (!email && !phone) return badRequest("CONTACT_REQUIRED");
  if (email && !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email)) return badRequest("EMAIL_INVALID");
  if (phone && !/^[6-9]\d{9}$/.test(phone.replace(/[\s-]/g, "").replace(/^\+?91/, ""))) return badRequest("PHONE_INVALID");
  if (!(CATEGORIES as readonly string[]).includes(category)) return badRequest("CATEGORY_REQUIRED");
  if (!bool(body.consent)) return badRequest("CONSENT_REQUIRED");

  try {
    const ref = reference(category === "grievance" ? "YS-GR" : "YS-CT");
    await db.insert(contactMessages).values({
      reference: ref,
      category,
      name,
      organisation: str(body.organisation, 140) || null,
      email: email || null,
      phone: phone || null,
      subject: str(body.subject, 200) || null,
      message,
      consent: true,
    });
    return NextResponse.json({ ok: true, reference: ref });
  } catch {
    return serverError();
  }
}
