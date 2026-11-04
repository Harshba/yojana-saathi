import { NextResponse } from "next/server";
import { db } from "@/db";
import { saathiApplications } from "@/db/schema";
import { badRequest, bool, int, looksAutomated, readJson, reference, serverError, str } from "@/lib/api";

export async function POST(request: Request) {
  const body = await readJson(request);
  if (!body) return badRequest("INVALID_BODY");
  if (looksAutomated(body)) return NextResponse.json({ ok: true, ignored: true });

  const name = str(body.name, 120);
  const village = str(body.village, 120);
  const phone = str(body.phone, 20);
  const email = str(body.email, 140);
  const age = int(body.age);

  if (name.length < 2) return badRequest("NAME_REQUIRED");
  if (age === null || age < 18 || age > 75) return badRequest("AGE_INVALID");
  if (village.length < 2) return badRequest("VILLAGE_REQUIRED");
  if (!/^[6-9]\d{9}$/.test(phone.replace(/[\s-]/g, "").replace(/^\+?91/, ""))) return badRequest("PHONE_INVALID");
  if (email && !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email)) return badRequest("EMAIL_INVALID");
  if (!str(body.education, 40)) return badRequest("EDUCATION_REQUIRED");
  if (!bool(body.consent)) return badRequest("CONSENT_REQUIRED");

  try {
    const ref = reference("YS-SA");
    await db.insert(saathiApplications).values({
      reference: ref,
      name,
      age,
      gender: ["female", "transgender", "other"].includes(str(body.gender, 16)) ? str(body.gender, 16) : "female",
      village,
      ward: str(body.ward, 20) || null,
      phone,
      education: str(body.education, 40),
      reading: str(body.reading, 32) || "basic",
      hasSmartphone: bool(body.hasSmartphone),
      hasBankAadhaar: bool(body.hasBankAadhaar),
      priorWork: str(body.priorWork, 40) || null,
      experience: str(body.experience, 1200) || null,
      hoursPerDay: str(body.hoursPerDay, 32) || "4-5",
      availableFrom: str(body.availableFrom, 12) || null,
      consent: true,
    });
    return NextResponse.json({ ok: true, reference: ref });
  } catch {
    return serverError();
  }
}
