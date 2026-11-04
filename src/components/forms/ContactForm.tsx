"use client";

import { useState } from "react";
import { Link } from "@/components/ui/AppLink";
import { CheckCircle2, Send } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { ConsentBox, Field, SelectInput, TextArea, TextInput } from "@/components/ui/Form";
import { errorFor, isFilled, isValidEmail, isValidName, isValidPhone } from "@/lib/validation";
import { errorKeyForToken, useFormSubmit } from "@/lib/useFormSubmit";

const categories = [
  { value: "support", labelKey: "contact.catSupport" },
  { value: "partnership", labelKey: "contact.catPartnership" },
  { value: "feedback", labelKey: "contact.catFeedback" },
  { value: "grievance", labelKey: "contact.catGrievance" },
  { value: "volunteer", labelKey: "contact.catVolunteer" },
  { value: "media", labelKey: "contact.catMedia" },
] as const;

export function ContactForm({ defaultCategory }: { defaultCategory?: string }) {
  const { t } = useLang();
  const initial = categories.some((c) => c.value === defaultCategory) ? (defaultCategory as string) : "support";
  const [category, setCategory] = useState(initial);
  const [form, setForm] = useState({ name: "", organisation: "", email: "", phone: "", subject: "", message: "" });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const { status, reference, errorToken, submit, reset } = useFormSubmit("/api/contact");

  const set = (key: keyof typeof form) => (value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const next: Record<string, string | undefined> = {};
    if (!isFilled(form.name) || !isValidName(form.name)) next.name = isFilled(form.name) ? "INVALID_NAME" : "REQUIRED";
    if (form.message.trim().length < 12) next.message = isFilled(form.message) ? "REQUIRED" : "REQUIRED";
    if (!isFilled(form.email) && !isFilled(form.phone)) {
      next.email = "REQUIRED";
      next.phone = "REQUIRED";
    }
    if (isFilled(form.email) && !isValidEmail(form.email)) next.email = "INVALID_EMAIL";
    if (isFilled(form.phone) && !isValidPhone(form.phone)) next.phone = "INVALID_PHONE";
    if (!consent) next.consent = "CONSENT";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      document.getElementById("contact-form")?.scrollIntoView({ block: "start" });
      return;
    }
    await submit({ category, ...form, consent });
  }

  if (status === "success") {
    return (
      <div className="rounded-md border-2 border-leaf-300 bg-leaf-50 p-6">
        <p className="flex items-center gap-2 text-[1.15rem] font-bold text-leaf-700">
          <CheckCircle2 aria-hidden className="h-5 w-5" />
          {t("contact.successTitle")}
        </p>
        <p className="mt-2 max-w-2xl text-[0.95rem] leading-7 text-navy-800">{t("contact.successBody")}</p>
        {reference ? (
          <p className="mt-4 inline-block rounded-sm border border-navy-200 bg-white px-3 py-1.5 font-mono text-[0.9rem] font-bold text-navy-900">
            {t("common.reference")}: {reference}
          </p>
        ) : null}
        <div className="mt-5 flex flex-wrap gap-2">
          <button type="button" onClick={reset} className="ys-btn-outline !py-2 text-[0.88rem]">
            {t("common.submitAnother")}
          </button>
          <Link href="/eligibility" className="ys-btn-ghost !py-2 text-[0.88rem]">
            {t("nav.eligibility")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form id="contact-form" onSubmit={onSubmit} noValidate className="space-y-4">
      <Field id="ct-category" label={t("contact.category")} required>
        <div className="grid gap-2 sm:grid-cols-3">
          {categories.map((c) => (
            <label
              key={c.value}
              className={`flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2.5 text-[0.88rem] font-semibold transition ${
                category === c.value
                  ? "border-navy-700 bg-navy-50 text-navy-900 ring-1 ring-navy-300"
                  : "border-ash-300 bg-white text-navy-800 hover:border-navy-300 hover:bg-ash-50"
              }`}
            >
              <input
                type="radio"
                name="category"
                value={c.value}
                checked={category === c.value}
                onChange={() => setCategory(c.value)}
                className="sr-only"
              />
              <span aria-hidden className={`h-2.5 w-2.5 rounded-full border-2 ${category === c.value ? "border-navy-700 bg-saffron-500" : "border-ash-400"}`} />
              {t(c.labelKey)}
            </label>
          ))}
        </div>
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="ct-name" label={t("contact.fName")} required error={errorFor(errors.name, t)}>
          <TextInput id="ct-name" value={form.name} onChange={(e) => set("name")(e.target.value)} invalid={Boolean(errors.name)} maxLength={80} />
        </Field>
        <Field id="ct-org" label={t("contact.fOrg")} optionalLabel={t("common.optional")}>
          <TextInput id="ct-org" value={form.organisation} onChange={(e) => set("organisation")(e.target.value)} maxLength={120} />
        </Field>
        <Field
          id="ct-email"
          label={t("contact.fEmail")}
          required
          hint={t("elig.contactHint")}
          error={errorFor(errors.email, t)}
        >
          <TextInput id="ct-email" type="email" value={form.email} onChange={(e) => set("email")(e.target.value)} invalid={Boolean(errors.email)} />
        </Field>
        <Field id="ct-phone" label={t("contact.fPhone")} optionalLabel={t("common.optional")} error={errorFor(errors.phone, t)}>
          <TextInput
            id="ct-phone"
            value={form.phone}
            onChange={(e) => set("phone")(e.target.value.replace(/[^\d\s+]/g, "").slice(0, 14))}
            inputMode="tel"
            invalid={Boolean(errors.phone)}
          />
        </Field>
      </div>

      <Field id="ct-subject" label={t("contact.fSubject")} optionalLabel={t("common.optional")}>
        <TextInput id="ct-subject" value={form.subject} onChange={(e) => set("subject")(e.target.value)} maxLength={160} />
      </Field>

      <Field id="ct-message" label={t("contact.fMessage")} required error={errorFor(errors.message, t)}>
        <TextArea
          id="ct-message"
          value={form.message}
          onChange={(e) => set("message")(e.target.value)}
          placeholder={t("contact.fMessagePlaceholder")}
          invalid={Boolean(errors.message)}
          maxLength={2000}
          className="min-h-[150px]"
        />
      </Field>

      <ConsentBox id="ct-consent" checked={consent} onChange={setConsent} error={errorFor(errors.consent, t)} link={<Link href="/privacy" className="ys-link text-[0.84rem]">{t("nav.privacy")}</Link>}>
        {t("contact.fConsent")}
      </ConsentBox>

      {errorToken ? (
        <p role="alert" className="text-[0.9rem] font-semibold text-[#8a1c13]">
          {t(errorKeyForToken[errorToken] ?? "common.serverError")}
        </p>
      ) : null}

      <button type="submit" className="ys-btn-primary w-full sm:w-auto sm:min-w-[16rem]" disabled={status === "submitting"}>
        {status === "submitting" ? t("common.submitting") : t("contact.submit")}
        {status !== "submitting" ? <Send aria-hidden className="h-4 w-4" /> : null}
      </button>
    </form>
  );
}
