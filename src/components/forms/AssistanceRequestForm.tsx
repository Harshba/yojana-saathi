"use client";

import { Link } from "@/components/ui/AppLink";
import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { schemes } from "@/data/schemes";
import { useLang } from "@/lib/i18n";
import { ConsentBox, Field, OptionCards, SelectInput, TextArea, TextInput } from "@/components/ui/Form";
import { errorFor, isFilled, isValidName, isValidPhone } from "@/lib/validation";
import { errorKeyForToken, useFormSubmit } from "@/lib/useFormSubmit";

export function AssistanceRequestForm({
  schemeSlug,
  compact = false,
}: {
  schemeSlug?: string;
  compact?: boolean;
}) {
  const { t, pick, lang } = useLang();
  const [selected, setSelected] = useState(schemeSlug ?? "");
  const [applicantType, setApplicantType] = useState("self");
  const [name, setName] = useState("");
  const [village, setVillage] = useState("");
  const [phone, setPhone] = useState("");
  const [documentsReady, setDocumentsReady] = useState("partial");
  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const { status, reference, errorToken, submit, reset } = useFormSubmit("/api/assistance");

  const activeSlug = schemeSlug ?? selected;

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const next: Record<string, string | undefined> = {};
    if (!isFilled(name) || !isValidName(name)) next.name = isFilled(name) ? "INVALID_NAME" : "REQUIRED";
    if (!isFilled(village)) next.village = "REQUIRED";
    if (!activeSlug) next.scheme = "SELECT_ONE";
    if (isFilled(phone) && !isValidPhone(phone)) next.phone = "INVALID_PHONE";
    if (!consent) next.consent = "CONSENT";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    await submit({
      schemeSlug: activeSlug,
      applicantType,
      name: name.trim(),
      village: village.trim(),
      phone: phone.trim(),
      documentsReady,
      notes: notes.trim(),
      consent,
      language: lang,
    });
  }

  if (status === "success") {
    return (
      <div className="rounded-md border-2 border-leaf-300 bg-leaf-50 p-5 sm:p-6">
        <p className="flex items-center gap-2 text-[1.05rem] font-bold text-leaf-700">
          <CheckCircle2 aria-hidden className="h-5 w-5" />
          {t("help.success")}
        </p>
        <p className="mt-2 text-[0.92rem] leading-6 text-navy-800">{t("help.successBody")}</p>
        {reference ? (
          <p className="mt-3 inline-block rounded-sm border border-navy-200 bg-white px-3 py-1.5 font-mono text-[0.88rem] font-bold text-navy-900">
            {t("common.reference")}: {reference}
          </p>
        ) : null}
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={reset} className="ys-btn-outline !py-2 text-[0.86rem]">
            {t("common.submitAnother")}
          </button>
          <Link href="/eligibility" className="ys-btn-ghost !py-2 text-[0.86rem]">
            {t("nav.eligibility")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      {!schemeSlug ? (
        <Field id="as-scheme" label={t("help.fieldScheme")} required error={errorFor(errors.scheme, t)}>
          <SelectInput
            id="as-scheme"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            placeholder="—"
            invalid={Boolean(errors.scheme)}
            options={schemes.map((s) => ({ value: s.slug, label: pick(s.shortName) }))}
          />
        </Field>
      ) : null}

      <div className={compact ? "space-y-4" : "grid gap-4 sm:grid-cols-2"}>
        <Field id="as-for" label={t("help.fieldFor")}>
          <SelectInput
            id="as-for"
            value={applicantType}
            onChange={(e) => setApplicantType(e.target.value)}
            options={[
              { value: "self", label: t("help.forSelf") },
              { value: "family", label: t("help.forFamily") },
              { value: "neighbour", label: t("help.forNeighbour") },
            ]}
          />
        </Field>
        <Field id="as-name" label={t("help.fieldName")} required error={errorFor(errors.name, t)}>
          <TextInput
            id="as-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            invalid={Boolean(errors.name)}
            maxLength={80}
          />
        </Field>
        <Field id="as-village" label={t("help.fieldVillage")} required error={errorFor(errors.village, t)}>
          <TextInput id="as-village" value={village} onChange={(e) => setVillage(e.target.value)} invalid={Boolean(errors.village)} maxLength={80} />
        </Field>
        <Field id="as-phone" label={t("help.fieldPhone")} optionalLabel={t("common.optional")} error={errorFor(errors.phone, t)}>
          <TextInput
            id="as-phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/[^\d\s+]/g, "").slice(0, 14))}
            inputMode="tel"
            invalid={Boolean(errors.phone)}
          />
        </Field>
      </div>

      <OptionCards
        legend={t("help.fieldDocs")}
        name="documentsReady"
        columns={3}
        value={documentsReady}
        onChange={setDocumentsReady}
        options={[
          { value: "all", label: t("help.docsAll") },
          { value: "partial", label: t("help.docsSome") },
          { value: "none", label: t("help.docsNone") },
        ]}
      />

      <Field id="as-notes" label={t("help.fieldNotes")}>
        <TextArea id="as-notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={t("help.notesPlaceholder")} maxLength={1200} />
      </Field>

      <ConsentBox id="as-consent" checked={consent} onChange={setConsent} error={errorFor(errors.consent, t)} link={<Link href="/privacy" className="ys-link text-[0.84rem]">{t("nav.privacy")}</Link>}>
        {t("help.consent")}
      </ConsentBox>

      {errorToken ? (
        <p role="alert" className="text-[0.88rem] font-semibold text-[#8a1c13]">
          {t(errorKeyForToken[errorToken] ?? "common.serverError")}
        </p>
      ) : null}

      <button type="submit" className="ys-btn-primary w-full sm:w-auto" disabled={status === "submitting"}>
        {status === "submitting" ? t("common.submitting") : t("help.submit")}
        {status !== "submitting" ? <Send aria-hidden className="h-4 w-4" /> : null}
      </button>
    </form>
  );
}
