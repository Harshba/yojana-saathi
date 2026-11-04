"use client";

import { useRef, useState } from "react";
import { Link } from "@/components/ui/AppLink";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Info,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import {
  categoryLabels,
  documentLabels,
  schemes,
  type AgeKey,
  type DocKey,
} from "@/data/schemes";
import { ageGroups, disabilityOptions, genders, incomeBands, occupations } from "@/data/pilot";
import { useLang, type Loc } from "@/lib/i18n";
import {
  CheckboxGroup,
  ConsentBox,
  Field,
  OptionCards,
  SelectInput,
  TextInput,
} from "@/components/ui/Form";
import { Notice } from "@/components/ui/Section";
import { errorFor, isFilled, isValidEmail, isValidName, isValidPhone } from "@/lib/validation";
import { errorKeyForToken, useFormSubmit } from "@/lib/useFormSubmit";
import { SchemeIcon } from "@/components/SchemeIcon";
import { Reveal } from "@/components/ui/Reveal";

type Match = { slug: string; reasons: Loc[]; missingDocs: DocKey[] };

const docOptions = (Object.keys(documentLabels) as DocKey[]).map((key) => ({
  value: key,
  label: documentLabels[key].en,
  labelHi: documentLabels[key].hi,
}));

export function EligibilityChecker() {
  const { t, pick, lang } = useLang();
  const resultsRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState("");
  const [village, setVillage] = useState("");
  const [ward, setWard] = useState("");
  const [ageGroup, setAgeGroup] = useState<AgeKey | "">("");
  const [gender, setGender] = useState("");
  const [occupation, setOccupation] = useState("");
  const [income, setIncome] = useState("");
  const [householdSize, setHouseholdSize] = useState("");
  const [disability, setDisability] = useState<string>("no");
  const [documents, setDocuments] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const { status, reference, errorToken, submit } = useFormSubmit("/api/eligibility");
  const [matches, setMatches] = useState<Match[] | null>(null);
  const [notMatched, setNotMatched] = useState<string[]>([]);
  const [savedNote, setSavedNote] = useState(false);

  const submitting = status === "submitting";

  const validate = () => {
    const next: Record<string, string | undefined> = {};
    if (!isFilled(name) || !isValidName(name)) next.name = isFilled(name) ? "INVALID_NAME" : "REQUIRED";
    if (!isFilled(village)) next.village = "REQUIRED";
    if (!ageGroup) next.ageGroup = "SELECT_ONE";
    if (!occupation) next.occupation = "SELECT_ONE";
    if (!income) next.income = "SELECT_ONE";
    if (isFilled(phone) && !isValidPhone(phone)) next.phone = "INVALID_PHONE";
    if (isFilled(email) && !isValidEmail(email)) next.email = "INVALID_EMAIL";
    if (!consent) next.consent = "CONSENT";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!validate()) {
      document.getElementById("elig-form")?.scrollIntoView({ block: "start" });
      return;
    }
    const result = await submit({
      name: name.trim(),
      village: village.trim(),
      ward: ward.trim(),
      ageGroup,
      gender,
      occupation,
      income,
      householdSize: householdSize || null,
      disability,
      documents,
      interests,
      phone: phone.trim(),
      email: email.trim(),
      language: lang,
      consent,
    });
    if (result.ok && result.data) {
      setMatches((result.data.matches as Match[]) ?? []);
      setNotMatched((result.data.notMatched as string[]) ?? []);
      setSavedNote(Boolean(result.data.saved));
      window.setTimeout(() => resultsRef.current?.scrollIntoView({ block: "start" }), 80);
    }
  }

  const toggle = (setter: React.Dispatch<React.SetStateAction<string[]>>) => (value: string) =>
    setter((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
      <form onSubmit={onSubmit} id="elig-form" noValidate className="min-w-0">
        <div className="rounded-md border border-ash-200 bg-white shadow-[0_1px_2px_rgba(16,41,67,0.06)]">
          {/* Section 1 */}
          <FormSection title={t("elig.sectionApplicant")}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="el-name" label={t("elig.name")} required error={errorFor(errors.name, t)}>
                <TextInput
                  id="el-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("elig.namePlaceholder")}
                  invalid={Boolean(errors.name)}
                  autoComplete="name"
                  maxLength={80}
                />
              </Field>
              <Field id="el-village" label={t("elig.village")} required error={errorFor(errors.village, t)}>
                <TextInput
                  id="el-village"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  placeholder={t("elig.villagePlaceholder")}
                  invalid={Boolean(errors.village)}
                  maxLength={80}
                />
              </Field>
              <Field id="el-ward" label={t("elig.ward")} optionalLabel={t("common.optional")}>
                <TextInput id="el-ward" value={ward} onChange={(e) => setWard(e.target.value)} inputMode="numeric" maxLength={8} />
              </Field>
              <Field id="el-size" label={t("elig.householdSize")} optionalLabel={t("common.optional")}>
                <TextInput
                  id="el-size"
                  value={householdSize}
                  onChange={(e) => setHouseholdSize(e.target.value.replace(/\D/g, "").slice(0, 2))}
                  inputMode="numeric"
                />
              </Field>
            </div>

            <div className="mt-5">
              <OptionCards
                legend={t("elig.ageGroup")}
                name="ageGroup"
                required
                columns={3}
                value={ageGroup}
                onChange={(v) => setAgeGroup(v as AgeKey)}
                error={errorFor(errors.ageGroup, t)}
                options={ageGroups.map((g) => ({ value: g.key, label: pick(g.label) }))}
              />
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field id="el-gender" label={t("elig.gender")} optionalLabel={t("common.optional")}>
                <SelectInput
                  id="el-gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  placeholder="—"
                  options={genders.map((g) => ({ value: g.key, label: pick(g.label) }))}
                />
              </Field>
              <Field id="el-occupation" label={t("elig.occupation")} required error={errorFor(errors.occupation, t)}>
                <SelectInput
                  id="el-occupation"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  placeholder="—"
                  invalid={Boolean(errors.occupation)}
                  options={occupations.map((o) => ({ value: o.key, label: pick(o.label) }))}
                />
              </Field>
            </div>
          </FormSection>

          {/* Section 2 */}
          <FormSection title={t("elig.sectionHousehold")} divided>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="el-income" label={t("elig.income")} required error={errorFor(errors.income, t)}>
                <SelectInput
                  id="el-income"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  placeholder="—"
                  invalid={Boolean(errors.income)}
                  options={incomeBands.map((b) => ({ value: b.key, label: pick(b.label) }))}
                />
              </Field>
              <OptionCards
                legend={t("elig.disability")}
                name="disability"
                columns={3}
                value={disability}
                onChange={setDisability}
                options={disabilityOptions.map((d) => ({ value: d.key, label: pick(d.label) }))}
              />
            </div>

            <div className="mt-5">
              <CheckboxGroup
                legend={t("elig.documents")}
                hint={t("elig.documentsHint")}
                columns={2}
                values={documents}
                onToggle={toggle(setDocuments)}
                options={docOptions.map((d) => ({ value: d.value, label: lang === "hi" ? d.labelHi : d.label }))}
              />
            </div>
          </FormSection>

          {/* Section 3 */}
          <FormSection title={t("elig.sectionInterest")} divided>
            <CheckboxGroup
              legend={t("elig.interests")}
              hint={t("elig.interestsHint")}
              columns={2}
              values={interests}
              onToggle={toggle(setInterests)}
              options={schemes.map((s) => ({ value: s.slug, label: pick(s.shortName) }))}
            />
          </FormSection>

          {/* Section 4 */}
          <FormSection title={t("elig.contactSection")} divided>
            <p className="mb-4 text-[0.88rem] leading-6 text-ash-600">{t("elig.contactHint")}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="el-phone" label={t("elig.phone")} optionalLabel={t("common.optional")} error={errorFor(errors.phone, t)}>
                <TextInput
                  id="el-phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^\d\s+]/g, "").slice(0, 14))}
                  inputMode="tel"
                  placeholder="7088686900"
                  invalid={Boolean(errors.phone)}
                />
              </Field>
              <Field id="el-email" label={t("contact.fEmail")} optionalLabel={t("common.optional")} error={errorFor(errors.email, t)}>
                <TextInput
                  id="el-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  invalid={Boolean(errors.email)}
                />
              </Field>
            </div>

            <div className="mt-5">
              <ConsentBox id="el-consent" checked={consent} onChange={setConsent} error={errorFor(errors.consent, t)} link={<Link href="/privacy" className="ys-link text-[0.84rem]">{t("nav.privacy")}</Link>}>
                {t("elig.consent")}
              </ConsentBox>
            </div>

            {errorToken ? (
              <p role="alert" className="mt-3 text-[0.88rem] font-semibold text-[#8a1c13]">
                {t(errorKeyForToken[errorToken] ?? "common.serverError")}
              </p>
            ) : null}

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button type="submit" className="ys-btn-primary min-w-[15rem] flex-1 sm:flex-none" disabled={submitting}>
                {submitting ? t("common.submitting") : t("elig.submit")}
                {!submitting ? <ArrowRight aria-hidden className="h-4 w-4" /> : null}
              </button>
              <p className="text-[0.82rem] text-ash-600">{t("hero.trust1")}</p>
            </div>
          </FormSection>
        </div>
      </form>

      {/* Sidebar */}
      <aside className="space-y-4 lg:sticky lg:top-32 lg:self-start">
        <Notice tone="warning" title={t("elig.disclaimerTitle")} icon={<AlertTriangle className="h-5 w-5 text-saffron-600" />}>
          <p>{t("elig.disclaimerBody")}</p>
        </Notice>
        <div className="ys-panel">
          <p className="flex items-center gap-2 text-[0.9rem] font-bold text-navy-900">
            <Info aria-hidden className="h-4 w-4 text-navy-500" />
            {t("elig.needHelp")}
          </p>
          <p className="mt-2 text-[0.88rem] leading-6 text-ash-700">{t("elig.needHelpBody")}</p>
          <Link href="/contact?category=support" className="ys-btn-outline mt-3 w-full !py-2.5 text-[0.9rem]">
            {t("elig.needHelpCta")}
          </Link>
        </div>
        <div className="rounded-md border border-ash-200 bg-ash-50 p-4 text-[0.82rem] leading-6 text-ash-700">
          {t("common.demoNote")}
        </div>
      </aside>

      {/* Results */}
      <div ref={resultsRef} className="lg:col-span-2 min-w-0 scroll-mt-32">
        {matches ? <EligibilityResults matches={matches} notMatched={notMatched} reference={reference} savedNote={savedNote} onReset={() => { setMatches(null); setNotMatched([]); document.getElementById("elig-form")?.scrollIntoView({ block: "start" }); }} /> : null}
      </div>
    </div>
  );
}

function FormSection({ title, children, divided }: { title: string; children: React.ReactNode; divided?: boolean }) {
  return (
    <section className={divided ? "border-t border-ash-200 p-5 sm:p-6" : "p-5 sm:p-6"} aria-label={title}>
      <h3 className="mb-4 flex items-center gap-2 text-[1.02rem] font-bold tracking-tight text-navy-900">
        <span aria-hidden className="h-4 w-1 rounded-sm bg-saffron-500" />
        {title}
      </h3>
      {children}
    </section>
  );
}

function EligibilityResults({
  matches,
  notMatched,
  reference,
  savedNote,
  onReset,
}: {
  matches: Match[];
  notMatched: string[];
  reference: string | null;
  savedNote: boolean;
  onReset: () => void;
}) {
  const { t, pick } = useLang();

  return (
    <Reveal className="space-y-5">
      <div className="rounded-md border-2 border-navy-200 bg-navy-50 p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="ys-eyebrow mb-1.5">
              <CheckCircle2 aria-hidden className="h-4 w-4 text-leaf-600" />
              {reference ? `${t("common.reference")}: ${reference}` : t("common.demoBadge")}
            </p>
            <h3 className="text-[1.35rem] font-bold text-navy-900">
              {matches.length > 0
                ? `${t("elig.resultTitle")} — ${matches.length}`
                : t("elig.noneTitle")}
            </h3>
            <p className="mt-1.5 max-w-2xl text-[0.92rem] leading-6 text-navy-800">
              {matches.length > 0 ? t("elig.resultLead") : t("elig.noneBody")}
            </p>
          </div>
          <button type="button" onClick={onReset} className="ys-btn-ghost !py-2 text-[0.86rem]">
            <RotateCcw aria-hidden className="h-4 w-4" />
            {t("elig.again")}
          </button>
        </div>
        {savedNote ? <p className="mt-3 text-[0.84rem] font-semibold text-leaf-700">{t("elig.saved")}</p> : null}
        <p className="mt-4 rounded-sm border-l-4 border-saffron-500 bg-white px-3.5 py-2.5 text-[0.82rem] leading-6 font-semibold text-navy-800">
          {t("elig.assessmentNote")}
        </p>
      </div>

      {matches.length === 0 ? (
        <div className="ys-panel text-[0.92rem] leading-6 text-ash-700">
          <p className="font-bold text-navy-900">{t("elig.noResultsTitle")}</p>
          <p className="mt-1.5">{t("elig.noResultsBody")}</p>
        </div>
      ) : null}

      <ul className="grid gap-4 md:grid-cols-2">
        {matches.map((match, index) => {
          const scheme = schemes.find((s) => s.slug === match.slug);
          if (!scheme) return null;
          return (
            <li key={match.slug}>
              <article className="ys-card !p-0 overflow-hidden">
                <div className="flex items-start gap-3 border-b border-ash-200 bg-ash-50 p-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-white text-navy-700 ring-1 ring-navy-100">
                    <SchemeIcon name={scheme.icon} className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-[1.02rem] leading-snug font-bold text-navy-900">{pick(scheme.name)}</h4>
                    <p className="mt-0.5 flex flex-wrap gap-1.5 text-[0.76rem] font-semibold uppercase tracking-wide text-navy-600">
                      {scheme.categories.map((c) => (
                        <span key={c}>{pick(categoryLabels[c])}</span>
                      ))}
                    </p>
                  </div>
                </div>
                <div className="space-y-3.5 p-4">
                  <p className="text-[0.9rem] leading-6 text-ash-700">{pick(scheme.benefit)}</p>

                  <div>
                    <p className="mb-1 text-[0.8rem] font-bold uppercase tracking-wide text-navy-700">{t("elig.matched")}</p>
                    <ul className="space-y-1.5">
                      {match.reasons.map((reason, i) => (
                        <li key={i} className="flex gap-2 text-[0.88rem] leading-6 text-navy-800">
                          <Sparkles aria-hidden className="mt-1 h-3.5 w-3.5 shrink-0 text-saffron-600" />
                          <span>{pick(reason)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="mb-1.5 text-[0.8rem] font-bold uppercase tracking-wide text-navy-700">{t("elig.missing")}</p>
                    {match.missingDocs.length > 0 ? (
                      <ul className="flex flex-wrap gap-1.5">
                        {match.missingDocs.map((d) => (
                          <li key={d} className="rounded-sm border border-saffron-300 bg-saffron-50 px-2 py-1 text-[0.8rem] font-semibold text-navy-800">
                            {pick(documentLabels[d])}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="flex items-center gap-1.5 text-[0.86rem] font-semibold text-leaf-700">
                        <CheckCircle2 aria-hidden className="h-4 w-4" />
                        {t("help.docsAll")}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-auto flex flex-wrap gap-2 border-t border-ash-200 p-4">
                  <Link href={`/schemes/${scheme.slug}`} className="ys-btn-primary flex-1 !py-2.5 text-[0.86rem]">
                    {t("common.details")}
                  </Link>
                  <a
                    href={scheme.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ys-btn-ghost flex items-center gap-1.5 !py-2.5 text-[0.86rem]"
                  >
                    {t("elig.officialCheck")}
                    <ExternalLink aria-hidden className="h-3.5 w-3.5" />
                  </a>
                </div>
              </article>
            </li>
          );
        })}
      </ul>

      {notMatched.length > 0 ? (
        <details className="rounded-md border border-ash-200 bg-ash-50 p-4">
          <summary className="cursor-pointer text-[0.92rem] font-bold text-navy-800">
            {t("elig.notMatched")} ({notMatched.length})
          </summary>
          <p className="mt-2 text-[0.86rem] leading-6 text-ash-700">{t("elig.notMatchedBody")}</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {notMatched.map((slug) => {
              const scheme = schemes.find((s) => s.slug === slug);
              if (!scheme) return null;
              return (
                <li key={slug}>
                  <Link href={`/schemes/${slug}`} className="ys-link text-[0.86rem]">
                    {pick(scheme.shortName)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </details>
      ) : null}
    </Reveal>
  );
}
