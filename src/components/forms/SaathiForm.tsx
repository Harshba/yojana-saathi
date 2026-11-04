"use client";

import { Link } from "@/components/ui/AppLink";
import { useState } from "react";
import { CheckCircle2, UserPlus } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { educationLevels, genders, hourOptions, readingLevels } from "@/data/pilot";
import { ConsentBox, Field, OptionCards, SelectInput, TextArea, TextInput } from "@/components/ui/Form";
import { errorFor, isFilled, isValidAge, isValidEmail, isValidName, isValidPhone } from "@/lib/validation";
import { errorKeyForToken, useFormSubmit } from "@/lib/useFormSubmit";

export function SaathiForm() {
  const { t, pick } = useLang();
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "female",
    village: "",
    ward: "",
    phone: "",
    email: "",
    education: "",
    reading: "comfortable",
    hoursPerDay: "4-5",
    availableFrom: "",
    otherLang: "",
    experience: "",
  });
  const [hasSmartphone, setHasSmartphone] = useState(false);
  const [hasBankAadhaar, setHasBankAadhaar] = useState(false);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const { status, reference, errorToken, submit, reset } = useFormSubmit("/api/saathi");

  const set = (key: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const next: Record<string, string | undefined> = {};
    if (!isFilled(form.name) || !isValidName(form.name)) next.name = isFilled(form.name) ? "INVALID_NAME" : "REQUIRED";
    if (!isFilled(form.age) || !isValidAge(form.age, 18, 70)) next.age = isFilled(form.age) ? "INVALID_AGE" : "REQUIRED";
    if (!isFilled(form.village)) next.village = "REQUIRED";
    if (!isFilled(form.phone) || !isValidPhone(form.phone)) next.phone = isFilled(form.phone) ? "INVALID_PHONE" : "REQUIRED";
    if (isFilled(form.email) && !isValidEmail(form.email)) next.email = "INVALID_EMAIL";
    if (!form.education) next.education = "SELECT_ONE";
    if (!consent) next.consent = "CONSENT";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      document.getElementById("saathi-form")?.scrollIntoView({ block: "start" });
      return;
    }
    await submit({
      ...form,
      age: Number(form.age),
      hasSmartphone,
      hasBankAadhaar,
      consent,
      priorWork: hasSmartphone ? "yes" : "requested",
    });
  }

  if (status === "success") {
    return (
      <div className="rounded-md border-2 border-leaf-300 bg-leaf-50 p-6">
        <p className="flex items-center gap-2 text-[1.15rem] font-bold text-leaf-700">
          <CheckCircle2 aria-hidden className="h-5 w-5" />
          {t("saathi.successTitle")}
        </p>
        <p className="mt-2 max-w-2xl text-[0.95rem] leading-7 text-navy-800">{t("saathi.successBody")}</p>
        {reference ? (
          <p className="mt-4 inline-block rounded-sm border border-navy-200 bg-white px-3 py-1.5 font-mono text-[0.9rem] font-bold text-navy-900">
            {t("common.reference")}: {reference}
          </p>
        ) : null}
        <div className="mt-5 flex flex-wrap gap-2">
          <button type="button" onClick={reset} className="ys-btn-outline !py-2 text-[0.88rem]">
            {t("common.submitAnother")}
          </button>
          <Link href="/about" className="ys-btn-ghost !py-2 text-[0.88rem]">
            {t("nav.about")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form id="saathi-form" onSubmit={onSubmit} noValidate className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="sa-name" label={t("saathi.fName")} required error={errorFor(errors.name, t)}>
          <TextInput id="sa-name" value={form.name} onChange={(e) => set("name")(e.target.value)} invalid={Boolean(errors.name)} maxLength={80} />
        </Field>
        <Field id="sa-age" label={t("saathi.fAge")} required hint="18 – 70" error={errorFor(errors.age, t)}>
          <TextInput
            id="sa-age"
            value={form.age}
            onChange={(e) => set("age")(e.target.value.replace(/\D/g, "").slice(0, 2))}
            inputMode="numeric"
            invalid={Boolean(errors.age)}
          />
        </Field>
        <Field id="sa-gender" label={t("saathi.fGender")}>
          <SelectInput
            id="sa-gender"
            value={form.gender}
            onChange={(e) => set("gender")(e.target.value)}
            options={genders
              .filter((g) => g.key !== "male")
              .map((g) => ({ value: g.key === "unspecified" ? "other" : g.key, label: pick(g.label) }))}
          />
        </Field>
        <Field id="sa-village" label={t("saathi.fVillage")} required error={errorFor(errors.village, t)}>
          <TextInput id="sa-village" value={form.village} onChange={(e) => set("village")(e.target.value)} invalid={Boolean(errors.village)} maxLength={80} />
        </Field>
        <Field id="sa-ward" label={t("elig.ward")} optionalLabel={t("common.optional")}>
          <TextInput id="sa-ward" value={form.ward} onChange={(e) => set("ward")(e.target.value)} inputMode="numeric" maxLength={8} />
        </Field>
        <Field id="sa-phone" label={t("saathi.fPhone")} required error={errorFor(errors.phone, t)}>
          <TextInput
            id="sa-phone"
            value={form.phone}
            onChange={(e) => set("phone")(e.target.value.replace(/[^\d\s+]/g, "").slice(0, 14))}
            inputMode="tel"
            invalid={Boolean(errors.phone)}
          />
        </Field>
        <Field id="sa-email" label={t("saathi.fEmail")} optionalLabel={t("common.optional")} error={errorFor(errors.email, t)}>
          <TextInput id="sa-email" type="email" value={form.email} onChange={(e) => set("email")(e.target.value)} invalid={Boolean(errors.email)} />
        </Field>
        <Field id="sa-education" label={t("saathi.fEducation")} required error={errorFor(errors.education, t)}>
          <SelectInput
            id="sa-education"
            value={form.education}
            onChange={(e) => set("education")(e.target.value)}
            placeholder="—"
            invalid={Boolean(errors.education)}
            options={educationLevels.map((e) => ({ value: e.key, label: pick(e.label) }))}
          />
        </Field>
      </div>

      <OptionCards
        legend={t("saathi.fReading")}
        name="reading"
        columns={3}
        value={form.reading}
        onChange={set("reading")}
        options={readingLevels.map((r) => ({ value: r.key, label: pick(r.label) }))}
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <YesNoToggle
          id="sa-smartphone"
          label={t("saathi.fSmartphone")}
          checked={hasSmartphone}
          onChange={setHasSmartphone}
        />
        <YesNoToggle id="sa-bank" label={t("saathi.fBank")} checked={hasBankAadhaar} onChange={setHasBankAadhaar} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <OptionCards
          legend={t("saathi.fHours")}
          name="hoursPerDay"
          columns={2}
          value={form.hoursPerDay}
          onChange={set("hoursPerDay")}
          options={hourOptions.map((h) => ({ value: h.key, label: pick(h.label) }))}
        />
        <Field id="sa-available" label={t("saathi.fAvailable")} optionalLabel={t("common.optional")}>
          <SelectInput
            id="sa-available"
            value={form.availableFrom}
            onChange={(e) => set("availableFrom")(e.target.value)}
            placeholder="—"
            options={[
              { value: "immediately", label: t("saathi.availNow") },
              { value: "one-month", label: t("saathi.availMonth") },
              { value: "after-training", label: t("saathi.availTraining") },
            ]}
          />
        </Field>
      </div>

      <Field id="sa-experience" label={t("saathi.fExperience")} optionalLabel={t("common.optional")}>
        <TextArea
          id="sa-experience"
          value={form.experience}
          onChange={(e) => set("experience")(e.target.value)}
          placeholder={t("saathi.fExperiencePlaceholder")}
          maxLength={1200}
        />
      </Field>

      <Field id="sa-otherlang" label={t("saathi.otherLang")} optionalLabel={t("common.optional")}>
        <TextInput id="sa-otherlang" value={form.otherLang} onChange={(e) => set("otherLang")(e.target.value)} maxLength={60} />
      </Field>

      <ConsentBox id="sa-consent" checked={consent} onChange={setConsent} error={errorFor(errors.consent, t)} link={<Link href="/privacy" className="ys-link text-[0.84rem]">{t("nav.privacy")}</Link>}>
        {t("saathi.consent")}
      </ConsentBox>

      {errorToken ? (
        <p role="alert" className="text-[0.9rem] font-semibold text-[#8a1c13]">
          {t(errorKeyForToken[errorToken] ?? "common.serverError")}
        </p>
      ) : null}

      <button type="submit" className="ys-btn-saffron w-full text-[1rem] sm:w-auto sm:min-w-[19rem]" disabled={status === "submitting"}>
        {status === "submitting" ? t("common.submitting") : t("saathi.submit")}
        {status !== "submitting" ? <UserPlus aria-hidden className="h-4 w-4" /> : null}
      </button>
    </form>
  );
}

function YesNoToggle({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  const { t } = useLang();
  return (
    <fieldset className="rounded-md border border-ash-300 bg-white p-3.5">
      <legend className="px-1 text-[0.86rem] font-semibold text-navy-800">{label}</legend>
      <div className="flex gap-2">
        {[true, false].map((value) => (
          <label
            key={String(value)}
            className={`flex-1 cursor-pointer rounded-md border px-3 py-2 text-center text-[0.9rem] font-semibold transition ${
              checked === value ? "border-navy-700 bg-navy-50 text-navy-900" : "border-ash-300 text-ash-600 hover:bg-ash-50"
            }`}
          >
            <input
              id={value ? `${id}-yes` : `${id}-no`}
              type="radio"
              name={id}
              checked={checked === value}
              onChange={() => onChange(value)}
              className="sr-only"
            />
            {value ? t("common.yes") : t("common.no")}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
