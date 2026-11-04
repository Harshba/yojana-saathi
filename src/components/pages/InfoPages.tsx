"use client";

import { Link } from "@/components/ui/AppLink";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Eye,
  FileText,
  HandHeart,
  Lock,
  MapPin,
  Route,
  Scale,
  ShieldAlert,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Notice, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/PageHeader";
import { cn } from "@/lib/cn";

/* ================================================================== *
 * About
 * ================================================================== */

const aboutProblems = ["about.problem1", "about.problem2", "about.problem3", "about.problem4"] as const;
const aboutApproach = [
  ["about.approach1Title", "about.approach1Body"],
  ["about.approach2Title", "about.approach2Body"],
  ["about.approach3Title", "about.approach3Body"],
  ["about.approach4Title", "about.approach4Body"],
] as const;
const aboutModel = [
  ["about.modelRecruit", "about.modelRecruitBody"],
  ["about.modelTrain", "about.modelTrainBody"],
  ["about.modelWork", "about.modelWorkBody"],
  ["about.modelReview", "about.modelReviewBody"],
] as const;
const aboutTransparency = [
  "about.transparency1",
  "about.transparency2",
  "about.transparency3",
  "about.transparency4",
  "about.transparency5",
] as const;
const roadmap = [
  ["about.roadmap1", "about.roadmap1Body", "about.eyebrow"],
  ["about.roadmap2", "about.roadmap2Body", "nav.how"],
  ["about.roadmap3", "about.roadmap3Body", "nav.impact"],
] as const;

export function AboutPage() {
  const { t } = useLang();
  return (
    <>
      <PageHeader eyebrowKey="about.eyebrow" titleKey="about.title" leadKey="about.lead" breadcrumb={[{ href: "/about", labelKey: "nav.about" }]} />

      <Section labelledBy="story-title">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <div>
            <SectionHeading id="story-title" title={t("about.storyTitle")} />
            <p className="ys-lead">{t("about.story1")}</p>
            <p className="ys-lead mt-4">{t("about.story2")}</p>
          </div>
          <div className="grid gap-4">
            <div className="ys-panel !bg-navy-50 !border-navy-200">
              <p className="mb-1.5 flex items-center gap-2 text-[0.8rem] font-bold tracking-wide text-navy-600 uppercase">
                <Eye aria-hidden className="h-4 w-4" />
                {t("about.visionTitle")}
              </p>
              <p className="text-[1.05rem] leading-7 font-semibold text-navy-900">{t("about.visionBody")}</p>
            </div>
            <div className="ys-panel !bg-leaf-50 !border-leaf-200">
              <p className="mb-1.5 flex items-center gap-2 text-[0.8rem] font-bold tracking-wide text-leaf-700 uppercase">
                <Target aria-hidden className="h-4 w-4" />
                {t("about.missionTitle")}
              </p>
              <p className="text-[1.02rem] leading-7 font-semibold text-navy-900">{t("about.missionBody")}</p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="ash" labelledBy="problem-title">
        <SectionHeading id="problem-title" eyebrow={t("brand.subline")} title={t("about.problemTitle")} body={t("about.problemBody")} />
        <ul className="grid gap-4 md:grid-cols-2">
          {aboutProblems.map((key, index) => (
            <Reveal as="li" key={key} delay={index * 0.06}>
              <div className="flex h-full gap-4 rounded-md border border-ash-200 bg-white p-5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-navy-800 text-[0.95rem] font-bold text-white">
                  {index + 1}
                </span>
                <p className="text-[0.94rem] leading-7 text-navy-800">{t(key)}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section labelledBy="approach-title">
        <SectionHeading id="approach-title" eyebrow={t("how.eyebrow")} title={t("about.approachTitle")} />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {aboutApproach.map(([titleKey, bodyKey], index) => (
            <Reveal as="li" key={titleKey} delay={index * 0.06}>
              <div className="ys-card border-t-4 !border-t-navy-700">
                <h3 className="text-[1rem] font-bold text-navy-900">{t(titleKey)}</h3>
                <p className="mt-2 text-[0.9rem] leading-6 text-ash-700">{t(bodyKey)}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="navy" labelledBy="model-title">
        <SectionHeading id="model-title" eyebrow={t("mission.eyebrow")} title={t("about.modelTitle")} body={t("about.modelBody")} inverted />
        <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {aboutModel.map(([titleKey, bodyKey], index) => (
            <Reveal as="li" key={titleKey} delay={index * 0.07}>
              <div className="h-full rounded-md border border-navy-600 bg-navy-800/70 p-5">
                <p className="mb-2 flex items-center gap-2 text-[0.76rem] font-bold tracking-wider text-saffron-300 uppercase">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-saffron-500 text-[0.78rem] font-bold text-navy-900">
                    {index + 1}
                  </span>
                  {t(titleKey)}
                </p>
                <p className="mt-2 text-[0.9rem] leading-6 text-navy-100">{t(bodyKey)}</p>
              </div>
            </Reveal>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/become-a-saathi" className="ys-btn-saffron">
            <HandHeart aria-hidden className="h-4.5 w-4.5" />
            {t("nav.saathi")}
          </Link>
          <Link href="/impact" className="ys-btn-outline !border-navy-500 !bg-transparent !text-white hover:!bg-navy-700">
            {t("nav.impact")}
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <Section labelledBy="transparency-title">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <div>
            <SectionHeading id="transparency-title" eyebrow={t("footer.disclaimer")} title={t("about.transparencyTitle")} />
            <ul className="space-y-3">
              {aboutTransparency.map((key) => (
                <li key={key} className="flex gap-3 rounded-md border border-ash-200 bg-ash-50 p-4 text-[0.94rem] leading-6 text-navy-800">
                  <BadgeCheck aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-leaf-600" />
                  {t(key)}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="flex items-center gap-2 text-[1.15rem] font-bold text-navy-900">
              <Route aria-hidden className="h-5 w-5 text-saffron-600" />
              {t("about.roadmapTitle")}
            </h3>
            <p className="mt-2 mb-5 text-[0.92rem] leading-6 text-ash-700">{t("about.expansionBody")}</p>
            <ol className="relative space-y-4 border-l-2 border-dashed border-navy-200 pl-6">
              {roadmap.map(([titleKey, bodyKey, stageKey], index) => (
                <li key={titleKey} className="relative">
                  <span
                    aria-hidden
                    className={cn(
                      "absolute top-1.5 -left-[1.95rem] grid h-5 w-5 place-items-center rounded-full border-2",
                      index === 0 ? "border-saffron-500 bg-white" : index === 1 ? "border-navy-400 bg-white" : "border-ash-300 bg-white",
                    )}
                  >
                    <span className={cn("h-2 w-2 rounded-full", index === 0 ? "bg-saffron-500" : "bg-navy-300")} />
                  </span>
                  <p className="text-[0.74rem] font-bold tracking-wider text-ash-500 uppercase">
                    {index === 0 ? t("common.pilotTarget") : t(stageKey)}
                  </p>
                  <h4 className="text-[1.05rem] font-bold text-navy-900">
                    {index + 1}. {t(titleKey)}
                  </h4>
                  <p className="mt-1 text-[0.9rem] leading-6 text-ash-700">{t(bodyKey)}</p>
                </li>
              ))}
            </ol>
            <Notice tone="warning" title={t("about.disclaimerTitle")} icon={<ShieldAlert className="h-5 w-5 text-saffron-600" />}>
              <p>{t("about.disclaimerBody")}</p>
            </Notice>
          </div>
        </div>
      </Section>

      <div id="disclaimer" className="border-t border-ash-200 bg-ash-50">
        <div className="ys-container grid gap-4 py-8 sm:grid-cols-3">
          {[
            { icon: Lock, title: t("privacy.title"), body: t("privacy.lead"), href: "/privacy" },
            { icon: Scale, title: t("a11y.title"), body: t("a11y.items"), href: "/accessibility" },
            { icon: Users, title: t("dir.assistTitle"), body: t("dir.assistBody"), href: "/contact?category=support" },
          ].map((card) => (
            <Link key={card.href} href={card.href} className="ys-card !p-5">
              <card.icon aria-hidden className="h-6 w-6 text-navy-600" />
              <p className="mt-3 text-[1rem] font-bold text-navy-900">{card.title}</p>
              <p className="mt-1.5 text-[0.86rem] leading-6 text-ash-700">{card.body}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-[0.86rem] font-bold text-navy-700">
                {t("common.learnMore")}
                <ArrowRight aria-hidden className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

/* ================================================================== *
 * Privacy
 * ================================================================== */

const privacySections = [
  ["privacy.s1", "privacy.s1b", Lock],
  ["privacy.s2", "privacy.s2b", FileText],
  ["privacy.s3", "privacy.s3b", BadgeCheck],
  ["privacy.s4", "privacy.s4b", Users],
  ["privacy.s5", "privacy.s5b", Target],
  ["privacy.s6", "privacy.s6b", ShieldAlert],
  ["privacy.s7", "privacy.s7b", Scale],
  ["privacy.s8", "privacy.s8b", ArrowRight],
  ["privacy.s9", "privacy.s9b", Sparkles],
] as const;

export function PrivacyPage() {
  const { t } = useLang();
  return (
    <>
      <PageHeader eyebrowKey="nav.privacy" titleKey="privacy.title" leadKey="privacy.lead" tone="ash" breadcrumb={[{ href: "/privacy", labelKey: "nav.privacy" }]} />
      <Section>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
          <div className="space-y-5">
            {privacySections.map(([titleKey, bodyKey, Icon], index) => (
              <article key={titleKey} className="rounded-md border border-ash-200 bg-white p-5 sm:p-6">
                <h2 className="flex items-center gap-2.5 text-[1.08rem] font-bold text-navy-900">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-navy-50 text-navy-700">
                    <Icon aria-hidden className="h-4.5 w-4.5" />
                  </span>
                  {index + 1}. {t(titleKey)}
                </h2>
                <p className="mt-2.5 text-[0.95rem] leading-7 text-ash-700">{t(bodyKey)}</p>
              </article>
            ))}
          </div>
          <aside className="space-y-4 lg:sticky lg:top-32 lg:self-start">
            <div className="ys-panel">
              <p className="text-[0.95rem] font-bold text-navy-900">{t("footer.disclaimer")}</p>
              <p className="mt-2 text-[0.88rem] leading-6 text-ash-700">{t("top.disclaimer")}</p>
              <Link href="/contact" className="ys-btn-outline mt-4 w-full !py-2.5 text-[0.88rem]">
                {t("contact.formTitle")}
              </Link>
            </div>
            <div className="rounded-md border border-saffron-300 bg-saffron-50 p-4">
              <p className="flex items-center gap-2 text-[0.9rem] font-bold text-navy-900">
                <Building2 aria-hidden className="h-4.5 w-4.5" />
                {t("common.demoBadge")}
              </p>
              <p className="mt-1.5 text-[0.85rem] leading-6 text-navy-800">{t("common.demoNote")}</p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}

/* ================================================================== *
 * Accessibility statement
 * ================================================================== */

export function AccessibilityPage() {
  const { t } = useLang();
  return (
    <>
      <PageHeader eyebrowKey="top.a11y" titleKey="a11y.title" leadKey="a11y.lead" tone="ash" breadcrumb={[{ href: "/accessibility", labelKey: "footer.accessibility" }]} />
      <Section>
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            { title: t("top.textSize"), body: "A · A+ · A++ — " + t("a11y.items"), icon: Sparkles },
            { title: t("top.language"), body: `${t("top.english")} / ${t("top.hindi")}`, icon: MapPin },
            { title: t("top.support"), body: t("common.printNote"), icon: FileText },
          ].map((card) => (
            <div key={card.title} className="ys-card">
              <card.icon aria-hidden className="h-6 w-6 text-navy-600" />
              <p className="mt-3 text-[1rem] font-bold text-navy-900">{card.title}</p>
              <p className="mt-1.5 text-[0.88rem] leading-6 text-ash-700">{card.body}</p>
            </div>
          ))}
        </div>
        <Notice tone="info" title={t("dir.assistTitle")} icon={<Users className="h-5 w-5 text-navy-600" />}>
          <p>{t("dir.assistBody")}</p>
          <Link href="/eligibility" className="ys-btn-primary mt-3 !py-2.5 text-[0.9rem]">
            {t("hero.ctaEligibility")}
          </Link>
        </Notice>
      </Section>
    </>
  );
}

/* ================================================================== *
 * 404
 * ================================================================== */

export function NotFoundPage() {
  const { t } = useLang();
  return (
    <Section>
      <div className="mx-auto max-w-xl py-16 text-center">
        <p className="ys-eyebrow justify-center">404</p>
        <h1 className="mt-3 text-[1.8rem] font-bold text-navy-900">{t("common.noResults")}</h1>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/" className="ys-btn-primary">
            {t("common.home")}
          </Link>
          <Link href="/schemes" className="ys-btn-outline">
            {t("nav.schemes")}
          </Link>
        </div>
      </div>
    </Section>
  );
}
