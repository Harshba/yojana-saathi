export type FieldError = string | null;

export const isFilled = (value: string | undefined | null) => Boolean(value && value.trim().length > 0);

export const required = (value: string | undefined | null): FieldError =>
  isFilled(value) ? null : "REQUIRED";

export const requiredList = (values: string[] | undefined): FieldError =>
  values && values.length > 0 ? null : "SELECT_ONE";

export const MIN_NAME = 2;

export const isValidName = (value: string) => new RegExp(`^[\\p{L} .'-]{${MIN_NAME},80}$`, "u").test(value.trim());

export const isValidPhone = (value: string) => /^[6-9]\d{9}$/.test(value.replace(/[\s-]/g, "").replace(/^\+?91/, ""));

export const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(value.trim());

export const isValidAge = (value: string, min = 14, max = 75) => {
  const n = Number(value);
  return Number.isFinite(n) && n >= min && n <= max;
};

export const isValidWard = (value: string) => /^\d{1,3}[A-Za-z]?$/.test(value.trim());

/** Errors are stored as tokens and translated by the form, so validation stays language agnostic. */
export type ErrorToken = "REQUIRED" | "SELECT_ONE" | "INVALID_PHONE" | "INVALID_EMAIL" | "INVALID_NAME" | "INVALID_AGE" | "INVALID_WARD" | "CONSENT";

export const tokenToKey: Record<ErrorToken, string> = {
  REQUIRED: "common.requiredField",
  SELECT_ONE: "common.selectAtLeast",
  INVALID_PHONE: "common.invalidPhone",
  INVALID_EMAIL: "common.invalidEmail",
  INVALID_NAME: "common.requiredField",
  INVALID_AGE: "common.requiredField",
  INVALID_WARD: "common.requiredField",
  CONSENT: "common.consentRequired",
};

export function errorFor(token: FieldError | undefined, t: (key: string) => string): string | undefined {
  if (!token) return undefined;
  return t(tokenToKey[token as ErrorToken] ?? "common.requiredField");
}
