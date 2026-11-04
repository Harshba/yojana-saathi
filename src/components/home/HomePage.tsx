"use client";

import { Link } from "@/components/ui/AppLink";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Building2,
  Compass,
  HandHeart,
  MapPin,
  PhoneCall,
  Quote,
  ShieldAlert,
  Target,
  Users,
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import { schemes, reviewedOn } from "@/data/schemes";
import { budgetRows, pilot, stories } from "@/data/pilot";
import { SchemeCard } from "@/components/SchemeCard";
import { HomeStats } from "@/components/HomeStats";
import { HowItWorks } from "@/components/HowItWorks";
import { PilotTimeline } from "@/components/PilotTimeline";
import { ImpactDashboard } from "@/components/ImpactDashboard";
import { Notice, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { BarList } from "@/components/ui/Charts";
import { publicAsset } from "@/lib/publicAsset";

const whyItems = [
  { icon: Compass, title: "why.f1Title", body: "why.f1Body" },
  { icon: BadgeCheck, title: "why.f2Title", body: "why.f2Body" },
  { icon: ShieldAlert, title: "why.f3Title", body: "why.f3Body" },
  { icon: Banknote, title: "why.f4Title", body: "why.f4Body" },
  { icon: Target, title: "why.f5Title", body: "why.f5Body" },
  { icon: HandHeart, title: "why.f6Title", body: "why.f6Body" },
  { icon: Users, title: "why.f7Title", body: "why.f7Body" },
] as const;

const missionPoints = [
  { title: "mission.point1Title", body: "mission.point1Body" },
  { title: "mission.point2Title", body: "mission.point2Body" },
  { title: "mission.point3Title", body: "mission.point3Body" },
  { title: "mission.point4Title", body: "mission.point4Body" },
] as const;

export function HomePage() {
  const { t, pick } = useLang();
  const budgetTotal = budgetRows.reduce((sum, row) => sum + row.amount, 0);

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="border-b border-ash-200 bg-ash-50">
        <div className="ys-container grid items-center gap-10 py-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:py-16">
          <div>
            <p className="ys-chip !border-navy-200 !bg-white !text-navy-700">
              <MapPin aria-hidden className="h-3.5 w-3.5 text-saffron-600" />
              {t("hero.eyebrow")}
            </p>
            <h1 className="mt-4 text-[2.15rem] leading-[1.06] font-bold tracking-tight text-navy-900 sm:text-[2.9rem] lg:text-[3.35rem]">
              {t("hero.title")}
            </h1>
            <p className="mt-4 max-w-xl text-[1.08rem] leading-8 font-medium text-navy-800 sm:text-[1.2rem]">
              {t("hero.subtitle")}
            </p>
            <p className="mt-4 max-w-2xl text-[0.98rem] leading-7 text-ash-700 sm:text-[1.03rem]">{t("hero.body")}</p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/eligibility" className="ys-btn-primary !px-7 !py-4 text-[1rem]">
                {t("hero.ctaEligibility")}
                <ArrowRight aria-hidden className="h-4.5 w-4.5" />
              </Link>
              <Link href="/become-a-saathi" className="ys-btn-outline !px-7 !py-4 text-[1rem]">
                {t("hero.ctaSaathi")}
              </Link>
            </div>

            <ul className="mt-7 grid gap-2 border-t border-ash-300 pt-5 sm:grid-cols-3">
              {[t("hero.trust1"), t("hero.trust2"), t("hero.trust3")].map((item) => (
                <li key={item} className="flex items-start gap-2 text-[0.86rem] leading-6 font-semibold text-navy-800">
                  <BadgeCheck aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-leaf-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-md border border-navy-100 bg-white p-2 shadow-[0_10px_40px_-18px_rgba(16,41,67,0.45)]">
              <img
                src={publicAsset("images/hero-saathi.jpg")}
                alt="A trained community worker from the village sitting with an elderly couple, going through a government scheme application form"
                width={1536}
                height={1024}
                loading="eager"
                fetchPriority="high"
                className="h-auto w-full rounded-sm object-cover"
              />
              <p className="px-2 py-2.5 text-[0.8rem] leading-5 text-ash-600">{t("hero.imageCaption")}</p>
            </div>
            <div className="absolute -bottom-5 left-4 hidden rounded-md border border-ash-200 bg-white px-4 py-3 shadow-md sm:block">
              <p className="text-[0.72rem] font-bold tracking-wide text-ash-600 uppercase">{t("pilot.locationLabel")}</p>
              <p className="text-[0.9rem] font-bold text-navy-900">Bharauli · Shahpur · Bhojpur</p>
            </div>
          </div>
        </div>

        {/* Official-website disclaimer, above the fold */}
        <div className="border-t border-ash-200 bg-white">
          <div className="ys-container flex flex-wrap items-center gap-x-6 gap-y-1 py-2.5 text-[0.8rem] font-semibold text-navy-800">
            <span className="flex items-center gap-2">
              <ShieldAlert aria-hidden className="h-4 w-4 text-saffron-600" />
              {t("brand.notGov")} — {t("top.disclaimer")}
            </span>
            <span className="text-ash-600">{t("top.officialNote")}</span>
          </div>
        </div>
      </section>

      <HomeStats />

      {/* ---------------- Mission ---------------- */}
      <Section id="mission" labelledBy="mission-title">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div>
            <SectionHeading id="mission-title" eyebrow={t("mission.eyebrow")} title={t("mission.title")} />
            <p className="ys-lead">{t("mission.p1")}</p>
            <p className="ys-lead mt-4">{t("mission.p2")}</p>
            <Link href="/about" className="ys-btn-outline mt-6">
              {t("nav.about")}
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {missionPoints.map((point, index) => (
              <Reveal as="li" key={point.title} delay={index * 0.06}>
                <div className="ys-panel h-full !bg-white !shadow-none">
                  <span className="mb-2 block text-[1.4rem] leading-none font-bold text-saffron-500">0{index + 1}</span>
                  <h3 className="text-[0.98rem] font-bold text-navy-900">{t(point.title)}</h3>
                  <p className="mt-1.5 text-[0.86rem] leading-6 text-ash-700">{t(point.body)}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <HowItWorks />

      {/* ---------------- Schemes ---------------- */}
      <Section id="schemes" labelledBy="schemes-title">
        <SectionHeading
          id="schemes-title"
          eyebrow={t("schemes.eyebrow")}
          title={t("schemes.title")}
          body={t("schemes.body")}
          action={
            <Link href="/schemes" className="ys-btn-outline">
              {t("schemes.allSchemes")}
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          }
        />
        <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {schemes.map((scheme, index) => (
            <li key={scheme.slug}>
              <SchemeCard scheme={scheme} index={index} />
            </li>
          ))}
        </ul>
        <div className="mt-6 grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <Notice tone="warning" icon={<ShieldAlert className="h-5 w-5 text-saffron-600" />}>
            <p>{t("schemes.disclaimer")}</p>
          </Notice>
          <p className="text-[0.82rem] font-semibold text-ash-600 lg:text-right">
            {t("common.lastVerified")}: {reviewedOn}
          </p>
        </div>
      </Section>

      {/* ---------------- Why ---------------- */}
      <Section id="why" tone="ash" labelledBy="why-title">
        <SectionHeading id="why-title" eyebrow={t("why.eyebrow")} title={t("why.title")} body={t("why.subtitle")} />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal as="li" key={item.title} delay={index * 0.05}>
                <div className="ys-card !shadow-none">
                  <span className="mb-3 grid h-10 w-10 place-items-center rounded-md bg-navy-700 text-white">
                    <Icon aria-hidden className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="text-[1rem] font-bold text-navy-900">{t(item.title)}</h3>
                  <p className="mt-1.5 text-[0.88rem] leading-6 text-ash-700">{t(item.body)}</p>
                </div>
              </Reveal>
            );
          })}
          <li>
            <div className="flex h-full flex-col justify-center rounded-md border-2 border-dashed border-navy-300 bg-white p-5">
              <p className="text-[0.78rem] font-bold tracking-wide text-navy-600 uppercase">{t("common.updatedOn")}</p>
              <p className="mt-1 text-[1.05rem] font-bold text-navy-900">{reviewedOn}</p>
              <p className="mt-2 text-[0.86rem] leading-6 text-ash-700">{t("top.officialNote")}</p>
              <Link href="/schemes" className="ys-btn-ghost mt-4 !py-2 text-[0.86rem]">
                {t("dir.assistCta")}
              </Link>
            </div>
          </li>
        </ul>
      </Section>

      {/* ---------------- Pilot ---------------- */}
      <Section id="pilot" labelledBy="pilot-title">
        <SectionHeading id="pilot-title" eyebrow={t("pilot.eyebrow")} title={t("pilot.title")} body={t("pilot.body")} />
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-md border border-ash-200">
              <img
                src={publicAsset("images/village.jpg")}
                alt="A rural village in Bihar with brick houses, fields and a footpath at golden hour"
                width={1536}
                height={1024}
                loading="lazy"
                className="h-52 w-full object-cover"
              />
              <div className="bg-navy-800 p-4 text-white">
                <p className="flex items-center gap-2 text-[0.76rem] font-bold tracking-wide text-saffron-300 uppercase">
                  <MapPin aria-hidden className="h-4 w-4" />
                  {t("pilot.locationLabel")}
                </p>
                <p className="mt-1 text-[1rem] leading-snug font-semibold">{pick(pilot.location)}</p>
                <a
                  href={pilot.map.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-[0.84rem] font-semibold text-saffron-200 underline underline-offset-4 hover:text-white"
                >
                  {t("pilot.map")}
                  <ArrowRight aria-hidden className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            <div className="rounded-md border border-ash-200 bg-ash-50 p-5">
              <h3 className="mb-3 text-[1rem] font-bold text-navy-900">{t("pilot.overviewTitle")}</h3>
              <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {[
                  [t("pilot.duration"), t("pilot.durationValue")],
                  [t("pilot.coverage"), t("pilot.coverageValue")],
                  [t("pilot.team"), t("pilot.teamValue")],
                  [t("pilot.schemes"), t("pilot.schemesValue")],
                  [t("pilot.budget"), t("pilot.budgetValue")],
                  [t("pilot.mode"), t("pilot.modeValue")],
                ].map(([label, value]) => (
                  <div key={label} className="border-l-2 border-saffron-500 pl-3">
                    <dt className="text-[0.78rem] font-bold tracking-wide text-ash-600 uppercase">{label}</dt>
                    <dd className="text-[0.95rem] font-semibold text-navy-900">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="space-y-4">
            <PilotTimeline />
            <div className="overflow-hidden rounded-md border border-ash-200 bg-white">
              <iframe
                title="Indicative map of the pilot area in Shahpur block, Bhojpur district, Bihar"
                src={pilot.map.osmEmbed}
                loading="lazy"
                className="h-64 w-full border-0 grayscale-[35%]"
              />
              <p className="border-t border-ash-200 bg-ash-50 px-4 py-2.5 text-[0.8rem] leading-5 text-ash-600">
                {t("pilot.mapNote")}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ---------------- Impact preview ---------------- */}
      <Section id="impact-preview" tone="ash" labelledBy="impact-title">
        <SectionHeading
          id="impact-title"
          eyebrow={t("impactPreview.eyebrow")}
          title={t("impactPreview.title")}
          body={t("impactPreview.body")}
        />
        <ImpactDashboard variant="home" />
      </Section>

      {/* ---------------- Funding ---------------- */}
      <Section id="funding" tone="navy" labelledBy="funding-title">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div>
            <SectionHeading id="funding-title" eyebrow={t("funding.eyebrow")} title={t("funding.title")} body={t("funding.body")} inverted />
            <div className="flex flex-wrap gap-3">
              <Link href="/contact?category=partnership" className="ys-btn-saffron">
                <HandHeart aria-hidden className="h-4.5 w-4.5" />
                {t("funding.support")}
              </Link>
              <Link href="/contact?category=partnership" className="ys-btn-outline !border-navy-400 !bg-transparent !text-white hover:!bg-navy-700">
                <Building2 aria-hidden className="h-4.5 w-4.5" />
                {t("funding.partner")}
              </Link>
              <Link href="/contact" className="ys-btn-outline !border-navy-400 !bg-transparent !text-white hover:!bg-navy-700">
                <PhoneCall aria-hidden className="h-4.5 w-4.5" />
                {t("funding.contact")}
              </Link>
            </div>
            <p className="mt-5 rounded-md border border-navy-600 bg-navy-800/60 p-4 text-[0.86rem] leading-6 text-navy-100">
              {t("funding.transparency")}
            </p>
          </div>

          <div className="rounded-md border border-navy-600 bg-navy-800/70 p-5 sm:p-6">
            <h3 className="mb-1 text-[1.05rem] font-bold text-white">{t("funding.allocTitle")}</h3>
            <p className="mb-5 text-[0.86rem] text-navy-100">
              {t("pilot.budgetValue")} · {t("pilot.durationValue")}
            </p>
            <div className="[&_p]:text-navy-50 [&_.text-navy-900]:text-white [&_.text-navy-700]:text-saffron-300 [&_.text-ash-600]:text-navy-200 [&_.bg-ash-200]:bg-navy-600">
              <BarList
                items={budgetRows.map((row) => ({
                  label: pick(row.label),
                  value: row.amount,
                  tone: "saffron" as const,
                  note: `${Math.round((row.amount / budgetTotal) * 100)}% ${t("funding.ofTotal")} · ${pick(row.note)}`,
                }))}
                unit="₹"
              />
            </div>
            <div className="mt-5 border-t border-navy-600 pt-4">
              <p className="mb-2 text-[0.8rem] font-bold tracking-wide text-saffron-300 uppercase">{t("funding.supportersTitle")}</p>
              <ul className="space-y-1.5">
                {[t("funding.supporter1"), t("funding.supporter2"), t("funding.supporter3"), t("funding.supporter4")].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[0.88rem] leading-6 text-navy-50">
                    <BadgeCheck aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-leaf-300" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* ---------------- Stories ---------------- */}
      <Section id="stories" labelledBy="stories-title">
        <SectionHeading id="stories-title" eyebrow={t("stories.eyebrow")} title={t("stories.title")} body={t("stories.note")} />
        <ul className="grid gap-4 md:grid-cols-3">
          {stories.slice(0, 3).map((story, index) => (
            <Reveal as="li" key={index} delay={index * 0.07}>
              <figure className="ys-card">
                <Quote aria-hidden className="h-6 w-6 text-saffron-500" />
                <blockquote className="mt-3 text-[0.94rem] leading-7 text-navy-800">{pick(story.quote)}</blockquote>
                <figcaption className="mt-4 border-t border-ash-200 pt-3">
                  <p className="text-[0.9rem] font-bold text-navy-900">{pick(story.name)}</p>
                  <p className="text-[0.82rem] text-ash-600">{pick(story.role)}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ---------------- CTA band ---------------- */}
      <section className="border-t-4 border-saffron-500 bg-leaf-50">
        <div className="ys-container flex flex-col items-start justify-between gap-6 py-10 lg:flex-row lg:items-center lg:py-12">
          <div className="max-w-2xl">
            <h2 className="text-[1.5rem] leading-tight font-bold text-navy-900 sm:text-[1.8rem]">{t("ctaBand.title")}</h2>
            <p className="mt-2 text-[0.98rem] leading-7 text-navy-800">{t("ctaBand.body")}</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link href="/eligibility" className="ys-btn-primary !px-6 !py-3.5">
              {t("ctaBand.cta1")}
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="ys-btn-outline !px-6 !py-3.5">
              {t("ctaBand.cta2")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
