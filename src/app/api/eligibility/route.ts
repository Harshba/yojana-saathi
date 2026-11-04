import { NextResponse } from "next/server";
import { db } from "@/db";
import { eligibilityRequests } from "@/db/schema";
import { evaluateEligibility } from "@/lib/eligibility";
import { schemes, type DocKey } from "@/data/schemes";
import { badRequest, bool, int, list, looksAutomated, readJson, reference, serverError, str } from "@/lib/api";

const VALID_AGE = ["under14", "14-17", "18-25", "26-44", "45-59", "60plus"] as const;
const VALID_OCC = [
  "cultivator",
  "agriLabour",
  "dailyWage",
  "selfEmployed",
  "shopkeeper",
  "artisan",
  "transport",
  "migrant",
  "homemaker",
  "student",
  "unemployed",
  "salaried",
  "other",
] as const;
const VALID_INCOME = ["below60k", "60k-1.2L", "1.2L-2.5L", "2.5L-5L", "above5L", "preferNot"] as const;
const VALID_GENDER = ["female", "male", "transgender", "unspecified"] as const;
const VALID_DISABILITY = ["yes", "no", "unspecified"] as const;
const VALID_DOCS = [
  "aadhaar","aadhaarMobile","voterId","pan","bank","ration","income","caste","domicile","disability",
  "land","ageProof","widow","photo","jobcard","ayushman","pensionBook","marks","occupationProof","lifeCertificate",
] as const;

const validEnum = <T extends readonly string[]>(value: string, allowed: T): T[number] | "" =>
  allowed.includes(value) ? (value as T[number]) : "";

export async function POST(request: Request) {
  const body = await readJson(request);
  if (!body) return badRequest("INVALID_BODY");
  if (looksAutomated(body)) {
    return NextResponse.json({ ok: true, ignored: true, matches: [], notMatched: [] });
  }

  const name = str(body.name, 80);
  const village = str(body.village, 120);
  if (name.length < 2) return badRequest("NAME_REQUIRED");
  if (village.length < 2) return badRequest("VILLAGE_REQUIRED");
  if (!bool(body.consent)) return badRequest("CONSENT_REQUIRED");

  const answers = {
    ageGroup: validEnum(str(body.ageGroup, 20), VALID_AGE),
    gender: validEnum(str(body.gender, 20), VALID_GENDER),
    occupation: validEnum(str(body.occupation, 24), VALID_OCC),
    income: validEnum(str(body.income, 20), VALID_INCOME),
    disability: validEnum(str(body.disability, 16), VALID_DISABILITY) || "unspecified",
    documents: list(body.documents, 20).filter((d): d is DocKey =>
      (VALID_DOCS as readonly string[]).includes(d),
    ),
    interests: list(body.interests, 8).filter((slug) => schemes.some((s) => s.slug === slug)),
  };

  const { matches, notMatched } = evaluateEligibility(answers);
  const ref = reference("YS-EL");

  let saved = false;
  try {
    await db.insert(eligibilityRequests).values({
      reference: ref,
      name,
      village,
      ward: str(body.ward, 20) || null,
      ageGroup: answers.ageGroup || "unspecified",
      gender: answers.gender || null,
      occupation: answers.occupation || "other",
      incomeBand: answers.income || "preferNot",
      householdSize: int(body.householdSize),
      disability: answers.disability || "unspecified",
      documents: answers.documents,
      interests: answers.interests,
      matches: matches.map((m) => m.slug),
      phone: str(body.phone, 20) || null,
      preferredLanguage: str(body.language, 4) === "hi" ? "hi" : "en",
      consent: true,
    });
    saved = true;
  } catch {
    /* Prototype resilience: results are still shown if the store is unavailable. */
  }

  return NextResponse.json({
    ok: true,
    saved,
    reference: saved ? ref : null,
    matches: matches.map((m) => ({
      slug: m.slug,
      reasons: m.reasons,
      missingDocs: m.missingDocs,
    })),
    notMatched: notMatched.map((s) => s.slug),
    answers,
  });
}
