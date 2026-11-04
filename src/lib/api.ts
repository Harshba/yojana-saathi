import { NextResponse } from "next/server";

export function reference(prefix: string) {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const rand = Math.floor(Math.random() * 46_656)
    .toString(36)
    .toUpperCase()
    .padStart(3, "0");
  return `${prefix}-${stamp}${rand}`;
}

export async function readJson(request: Request): Promise<Record<string, unknown> | null> {
  try {
    const body = await request.json();
    if (body && typeof body === "object") return body as Record<string, unknown>;
    return null;
  } catch {
    return null;
  }
}

export function badRequest(message: string) {
  return NextResponse.json({ ok: false, error: message }, { status: 400 });
}

export function serverError() {
  return NextResponse.json(
    { ok: false, error: "SAVE_FAILED" },
    { status: 500 },
  );
}

const clean = (value: unknown, max = 200) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export const str = (value: unknown, max = 200) => clean(value, max);
export const bool = (value: unknown) => value === true;
export const int = (value: unknown) => {
  const n = Number(value);
  return Number.isFinite(n) ? Math.trunc(n) : null;
};
export const list = (value: unknown, max = 40) =>
  Array.isArray(value) ? value.filter((v): v is string => typeof v === "string").slice(0, max) : [];

/** Very small honeypot + timing check so the prototype is not trivially spammed. */
export function looksAutomated(body: Record<string, unknown>) {
  const website = str(body.website, 40);
  const tookMs = int(body.tookMs);
  return Boolean(website) || (tookMs !== null && tookMs > 0 && tookMs < 600);
}
