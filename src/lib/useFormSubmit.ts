"use client";

import { useCallback, useRef, useState } from "react";

export type SubmitStatus = "idle" | "submitting" | "success" | "error";

/**
 * Small POST helper shared by every form on the site: tracks status, surfaces the
 * server error token, keeps a honeypot + elapsed-time anti-spam pair.
 */
export function useFormSubmit(endpoint: string) {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [reference, setReference] = useState<string | null>(null);
  const [errorToken, setErrorToken] = useState<string | null>(null);
  const startedAt = useRef<number>(Date.now());

  const reset = useCallback(() => {
    setStatus("idle");
    setReference(null);
    setErrorToken(null);
    startedAt.current = Date.now();
  }, []);

  const submit = useCallback(
    async (values: Record<string, unknown>) => {
      setStatus("submitting");
      setErrorToken(null);
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            ...values,
            website: "",
            tookMs: Math.max(0, Date.now() - startedAt.current),
          }),
        });
        const data = (await response.json()) as {
          ok?: boolean;
          reference?: string | null;
          error?: string;
          [key: string]: unknown;
        };
        if (!response.ok || !data.ok) {
          setErrorToken(data.error ?? "SAVE_FAILED");
          setStatus("error");
          return { ok: false, data };
        }
        setReference(data.reference ?? null);
        setStatus("success");
        return { ok: true, data };
      } catch {
        setErrorToken("NETWORK");
        setStatus("error");
        return { ok: false, data: null };
      }
    },
    [endpoint],
  );

  return { status, reference, errorToken, submit, reset, setStatus };
}

export const errorKeyForToken: Record<string, string> = {
  NAME_REQUIRED: "common.requiredField",
  VILLAGE_REQUIRED: "common.requiredField",
  CONSENT_REQUIRED: "common.consentRequired",
  PHONE_INVALID: "common.invalidPhone",
  EMAIL_INVALID: "common.invalidEmail",
  AGE_INVALID: "common.requiredField",
  EDUCATION_REQUIRED: "common.requiredField",
  MESSAGE_TOO_SHORT: "common.requiredField",
  CONTACT_REQUIRED: "common.requiredField",
  CATEGORY_REQUIRED: "common.selectAtLeast",
  SCHEME_REQUIRED: "common.selectAtLeast",
  INVALID_BODY: "common.serverError",
  SAVE_FAILED: "common.serverError",
  NETWORK: "common.serverError",
};
