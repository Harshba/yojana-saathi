"use client";

import { Link } from "@/components/ui/AppLink";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  CalendarDays,
  CheckCircle2,
  Clock,
  GraduationCap,
  HandHeart,
  Smartphone,
  Users,
  Wrench,
  XCircle,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useLang } from "@/lib/i18n";
import { pilot } from "@/data/pilot";
import { PageHeader } from "@/components/PageHeader";
import { Notice, Section, SectionHeading, StatBox } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SaathiForm } from "@/components/forms/SaathiForm";
import { ContactForm } from "@/components/forms/ContactForm";
import { ImpactDashboard } from "@/components/ImpactDashboard";

/* ================================================================== *
 * Become a Saathi
 * ================================================================== */

export function SaathiPage() {
  const { t } = useLang();
  const list = (prefix: string, count: number) =>
    Array.from({ length: count }, (_, i) => t(`${prefix}${i + 1}`));

  return (
    <>
      <PageHeader eyebrowKey="saathi.eyebrow" titleKey="saathi.title" leadKey="saathi.lead" breadcrumb={[{ href: "/become-a-saathi", labelKey: "nav.saathi" }]}>
        <div className="flex flex-wrap gap-3">
          <a href="#saathi-apply" className="ys-btn-saffron">
            <HandHeart aria-hidden className="h-4.5 w-4.5" />
            {t("saathi.submit")}
          </a>
          <Link href="/about" className="ys-btn-outline !border-navy-400 !bg-transparent !text-white hover:!bg-navy-700">
            {t("nav.about")}
          </Link>
        </div>
      </PageHeader>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <div>
            <SectionHeading id="role-title" title={t("saathi.roleTitle")} />
            <p className="ys-lead">{t("saathi.roleBody")}</p>
            <div className="mt-5 overflow-hidden rounded-md border border-ash-200">
              <img
                src="/images/training.jpg"
                alt="Rural women sitting together on a veranda during a scheme training session with papers and a smartphone"
                width={1536}
                height={1024}
                loading="lazy"
                className="h-56 w-full object-cover"
              />
              <p className="bg-ash-50 px-4 py-2.5 text-[0.82rem] text-ash-600">{t("hero.imageCaption")}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-md border-2 border-saffron-300 bg-saffron-50 p-5">
              <p className="text-[0.78rem] font-bold tracking-wide text-saffron-700 uppercase">{t("saathi.payTitle")}</p>
              <p className="mt-2 flex items-baseline gap-2 text-[2rem] leading-none font-bold text-navy-900">
                <Banknote aria-hidden className="h-6 w-6 text-saffron-600" />
                {t("saathi.payAmount")}
              </p>
              <p className="mt-2 inline-block rounded-sm bg-white px-2 py-1 text-[0.76rem] font-bold tracking-wide text-saffron-700 uppercase">
                {t("saathi.payLabel")}
              </p>
              <p className="mt-3 text-[0.9rem] leading-6 text-navy-800">{t("saathi.payBody")}</p>
            </div>

            <div className="ys-panel">
              <p className="flex items-center gap-2 text-[0.95rem] font-bold text-navy-900">
                <Smartphone aria-hidden className="h-4.5 w-4.5 text-navy-600" />
                {t("saathi.digitalTitle")}
              </p>
              <p className="mt-2 text-[0.9rem] leading-6 text-ash-700">{t("saathi.digitalBody")}</p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="ash">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-md border border-ash-200 bg-white p-5 sm:p-6">
            <h2 className="flex items-center gap-2.5 text-[1.2rem] font-bold text-navy-900">
              <Wrench aria-hidden className="h-5 w-5 text-navy-600" />
              {t("saathi.respTitle")}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {list("saathi.resp", 7).map((item, i) => (
                <li key={i} className="flex gap-2.5 rounded-md bg-ash-50 p-3 text-[0.92rem] leading-6 text-navy-800">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-sm bg-navy-700 text-[0.78rem] font-bold text-white">
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div className="rounded-md border border-ash-200 bg-white p-5 sm:p-6">
              <h2 className="flex items-center gap-2.5 text-[1.2rem] font-bold text-navy-900">
                <GraduationCap aria-hidden className="h-5 w-5 text-navy-600" />
                {t("saathi.trainTitle")}
              </h2>
              <p className="mt-2 text-[0.9rem] leading-6 text-ash-700">{t("saathi.trainBody")}</p>
              <ul className="mt-4 space-y-2">
                {list("saathi.train", 6).map((item, i) => (
                  <li key={i} className="flex gap-2.5 text-[0.92rem] leading-6 text-navy-800">
                    <CheckCircle2 aria-hidden className="mt-0.5 h-4.5 w-4.5 shrink-0 text-leaf-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-md border border-ash-200 bg-white p-5 sm:p-6">
              <h2 className="flex items-center gap-2.5 text-[1.2rem] font-bold text-navy-900">
                <Users aria-hidden className="h-5 w-5 text-navy-600" />
                {t("saathi.skillsTitle")}
              </h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {list("saathi.skill", 6).map((item, i) => (
                  <li key={i} className="rounded-md border border-navy-100 bg-navy-50 p-3 text-[0.9rem] leading-6 font-medium text-navy-900">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section id="saathi-apply">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div className="rounded-md border border-ash-200 bg-white p-5 shadow-[0_1px_2px_rgba(16,41,67,0.06)] sm:p-7">
            <h2 className="text-[1.4rem] font-bold text-navy-900">{t("saathi.applyTitle")}</h2>
            <p className="mt-1.5 mb-6 text-[0.95rem] leading-7 text-ash-700">{t("saathi.applyBody")}</p>
            <SaathiForm />
          </div>
          <aside className="space-y-4">
            <Notice tone="info" title={t("pilot.locationLabel")} icon={<CalendarDays className="h-5 w-5 text-navy-600" />}>
              <p>{t("pilot.teamValue")} · {t("pilot.durationValue")}</p>
              <p className="mt-1.5 font-semibold">Bharauli · Shahpur · Bhojpur</p>
            </Notice>
            <div className="ys-panel">
              <p className="text-[0.95rem] font-bold text-navy-900">{t("about.modelTitle")}</p>
              <p className="mt-2 text-[0.88rem] leading-6 text-ash-700">{t("about.modelBody")}</p>
              <Link href="/impact" className="ys-btn-ghost mt-4 w-full !py-2.5 text-[0.88rem]">
                {t("nav.impact")}
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </div>
            <div className="rounded-md border border-ash-200 bg-ash-50 p-4 text-[0.84rem] leading-6 text-ash-700">
              {t("common.demoNote")}
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}

/* ================================================================== *
 * Impact dashboard page
 * ================================================================== */

export function ImpactPage() {
  const { t, pick } = useLang();
  return (
    <>
      <PageHeader eyebrowKey="impactPage.eyebrow" titleKey="impactPage.title" leadKey="impactPage.lead" breadcrumb={[{ href: "/impact", labelKey: "nav.impact" }]} />

      <Section>
        <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatBox label={t("pilot.locationLabel")} value="Bharauli, Shahpur" sub={pick({ en: "Bhojpur, Bihar", hi: "भोजपुर, बिहार" })} />
          <StatBox label={t("pilot.duration")} value={t("pilot.durationValue")} sub={t("impactPage.statusValue")} />
          <StatBox label={t("pilot.budget")} value={t("pilot.budgetValue")} sub={t("common.pilotTarget")} />
          <StatBox label={t("pilot.mode")} value={t("pilot.modeValue")} sub={t("pilot.teamValue")} />
        </div>

        <Notice tone="warning" title={t("impactPage.dataNoteTitle")} icon={<BadgeCheck className="h-5 w-5 text-saffron-600" />}>
          <p>{t("impactPage.dataNote")}</p>
        </Notice>

        <div className="mt-8">
          <ImpactDashboard variant="full" />
        </div>

        <div className="mt-10 grid gap-5 rounded-md border border-navy-200 bg-navy-50 p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <h2 className="text-[1.25rem] font-bold text-navy-900">{t("funding.title")}</h2>
            <p className="mt-1.5 max-w-2xl text-[0.92rem] leading-6 text-navy-800">{t("funding.body")}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact?category=partnership" className="ys-btn-primary">
              {t("funding.partner")}
            </Link>
            <Link href="/become-a-saathi" className="ys-btn-outline">
              {t("nav.saathi")}
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}

/* ================================================================== *
 * Contact page
 * ================================================================== */

export function ContactPage({ defaultCategory }: { defaultCategory?: string }) {
  const { t } = useLang();
  const [searchParams] = useSearchParams();
  const category = defaultCategory ?? searchParams.get("category") ?? undefined;
  return (
    <>
      <PageHeader eyebrowKey="contact.eyebrow" titleKey="contact.title" leadKey="contact.lead" tone="ash" breadcrumb={[{ href: "/contact", labelKey: "nav.contact" }]} />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="rounded-md border border-ash-200 bg-white p-5 shadow-[0_1px_2px_rgba(16,41,67,0.06)] sm:p-7">
            <h2 className="text-[1.35rem] font-bold text-navy-900">{t("contact.formTitle")}</h2>
            <p className="mt-1.5 mb-6 text-[0.92rem] leading-6 text-ash-700">{t("contact.channelsNote")}</p>
            <ContactForm defaultCategory={category} />
          </div>

          <aside className="space-y-4">
            <div className="ys-panel !bg-navy-50 !border-navy-200">
              <p className="text-[0.78rem] font-bold tracking-wide text-navy-600 uppercase">{t("contact.channelsTitle")}</p>
              <dl className="mt-3 space-y-3 text-[0.92rem]">
                <div>
                  <dt className="font-semibold text-navy-800">{t("contact.emailLabel")}</dt>
                  <dd className="font-mono text-navy-900">{t("contact.emailValue")}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-navy-800">{t("contact.phoneLabel")}</dt>
                  <dd>
                    <a
                      href="tel:+917088686900"
                      className="font-mono text-navy-900 underline decoration-navy-300 underline-offset-4 hover:decoration-navy-700"
                    >
                      {t("contact.phoneValue")}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="flex items-center gap-1.5 font-semibold text-navy-800">
                    <Clock aria-hidden className="h-4 w-4" />
                    {t("contact.hoursTitle")}
                  </dt>
                  <dd className="text-navy-900">{t("contact.hoursValue")}</dd>
                  <dd className="mt-1 text-[0.84rem] text-ash-600">{t("contact.hoursNote")}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-navy-800">{t("contact.responseTime")}</dt>
                  <dd className="text-navy-900">{t("contact.responseTimeValue")}</dd>
                </div>
              </dl>
              <p className="mt-3 border-t border-navy-200 pt-3 text-[0.82rem] leading-5 text-ash-700">{t("pilot.mapNote")}</p>
            </div>

            <div className="rounded-md border border-ash-200 bg-white p-5">
              <p className="text-[0.95rem] font-bold text-navy-900">{t("contact.officeTitle")}</p>
              <p className="mt-1.5 text-[0.9rem] leading-6 text-ash-700">{t("contact.officeBody")}</p>
              <p className="mt-2 text-[0.9rem] font-semibold text-navy-800">{t("pilot.location")}</p>
              <Link href={pilot.map.googleMaps} target="_blank" rel="noopener noreferrer" className="ys-btn-ghost mt-3 w-full !py-2.5 text-[0.86rem]">
                {t("pilot.map")}
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-md border border-ash-200 bg-white p-5">
              <p className="text-[0.95rem] font-bold text-navy-900">{t("contact.grievanceTitle")}</p>
              <ol className="mt-3 space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <li key={i} className="flex gap-2.5 text-[0.88rem] leading-6 text-navy-800">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-navy-700 text-[0.72rem] font-bold text-white">{i}</span>
                    {t(`contact.grievance${i}`)}
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="ash">
        <SectionHeading id="areas-title" eyebrow={t("contact.eyebrow")} title={t("contact.areasTitle")} />
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-md border border-leaf-300 bg-white p-5">
            <p className="mb-3 flex items-center gap-2 text-[1rem] font-bold text-leaf-700">
              <CheckCircle2 aria-hidden className="h-5 w-5" />
              {t("contact.canTitle")}
            </p>
            <ul className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <li key={i} className="flex gap-2.5 text-[0.92rem] leading-6 text-navy-800">
                  <CheckCircle2 aria-hidden className="mt-0.5 h-4.5 w-4.5 shrink-0 text-leaf-600" />
                  {t(`contact.can${i}`)}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border border-ash-300 bg-white p-5">
            <p className="mb-3 flex items-center gap-2 text-[1rem] font-bold text-navy-800">
              <XCircle aria-hidden className="h-5 w-5 text-[#b3261e]" />
              {t("contact.cannotTitle")}
            </p>
            <ul className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <li key={i} className="flex gap-2.5 text-[0.92rem] leading-6 text-navy-800">
                  <XCircle aria-hidden className="mt-0.5 h-4.5 w-4.5 shrink-0 text-ash-500" />
                  {t(`contact.cannot${i}`)}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-md border border-navy-200 bg-white p-5">
          <p className="max-w-2xl text-[0.95rem] leading-6 text-navy-800">{t("funding.transparency")}</p>
          <Link href="/eligibility" className="ys-btn-primary">
            {t("hero.ctaEligibility")}
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
      </Section>
    </>
  );
}
