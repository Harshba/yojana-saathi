"use client";

import { Link } from "@/components/ui/AppLink";
import { useParams, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ClipboardList,
  ExternalLink,
  FileCheck2,
  HelpCircle,
  ListChecks,
  MapPin,
  ShieldAlert,
} from "lucide-react";
import { categoryLabels, documentLabels, reviewedOn, schemeBySlug, schemes } from "@/data/schemes";
import { useLang } from "@/lib/i18n";
import { PageHeader } from "@/components/PageHeader";
import { NotFoundPage } from "@/components/pages/InfoPages";
import { SchemesDirectory } from "@/components/SchemesDirectory";
import { Notice, Section, SectionHeading } from "@/components/ui/Section";
import { EligibilityChecker } from "@/components/forms/EligibilityChecker";
import { AssistanceRequestForm } from "@/components/forms/AssistanceRequestForm";
import { SchemeIcon } from "@/components/SchemeIcon";
import { Reveal } from "@/components/ui/Reveal";

/* ================================================================== *
 * Scheme directory
 * ================================================================== */

export function SchemesIndexPage() {
  const { t } = useLang();
  return (
    <>
      <PageHeader eyebrowKey="dir.eyebrow" titleKey="dir.title" leadKey="dir.lead" breadcrumb={[{ href: "/schemes", labelKey: "nav.schemes" }]}>
        <div className="flex flex-wrap gap-3">
          <Link href="/eligibility" className="ys-btn-saffron">
            {t("hero.ctaEligibility")}
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
          <a href={schemes[1].officialUrl} target="_blank" rel="noopener noreferrer" className="ys-btn-outline !border-navy-400 !bg-transparent !text-white hover:!bg-navy-700">
            MyScheme.gov.in
            <ExternalLink aria-hidden className="h-4 w-4" />
          </a>
        </div>
      </PageHeader>

      <Section>
        <SchemesDirectory />
        <Notice tone="warning" title={t("footer.disclaimer")} icon={<ShieldAlert className="h-5 w-5 text-saffron-600" />}>
          <p>{t("schemes.disclaimer")}</p>
          <p className="mt-1.5 text-[0.84rem] font-semibold">
            {t("common.lastVerified")}: {reviewedOn}
          </p>
        </Notice>
      </Section>
    </>
  );
}

/* ================================================================== *
 * Scheme detail
 * ================================================================== */

export function SchemeDetailPage({ slug: slugProp }: { slug?: string }) {
  const { t, pick } = useLang();
  const params = useParams<{ slug: string }>();
  const slug = slugProp ?? params.slug ?? "";
  const scheme = schemeBySlug(slug);
  if (!scheme) return <NotFoundPage />;

  const related = schemes.filter((s) => s.slug !== scheme.slug && s.categories.some((c) => scheme.categories.includes(c))).slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrowKey="dir.eyebrow"
        title={pick(scheme.name)}
        breadcrumb={[{ href: "/schemes", labelKey: "nav.schemes" }]}
      >
        <div className="-mt-3">
          <div className="flex items-start gap-4">
            <span className="hidden h-14 w-14 shrink-0 place-items-center rounded-md bg-white/10 text-white ring-1 ring-navy-500 sm:grid">
              <SchemeIcon name={scheme.icon} className="h-7 w-7" />
            </span>
            <div>
              <p className="text-[1rem] font-semibold text-saffron-300">{pick(scheme.tagline)}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {scheme.categories.map((c) => (
                  <li key={c} className="rounded-sm border border-navy-500 bg-navy-800/60 px-2.5 py-1 text-[0.78rem] font-bold tracking-wide text-navy-100 uppercase">
                    {pick(categoryLabels[c])}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </PageHeader>

      {/* Benefit strip */}
      <div className="border-b border-ash-200 bg-ash-50">
        <div className="ys-container grid gap-4 py-5 sm:grid-cols-3">
          {[
            { label: t("dir.monthly"), value: pick(scheme.benefit), icon: BadgeCheck },
            { label: t("schemes.beneficiaries"), value: pick(scheme.potentialBeneficiaries), icon: MapPin },
            { label: t("dir.applyHint"), value: pick(scheme.officialLabel), icon: ClipboardList },
          ].map((item) => (
            <div key={item.label} className="flex gap-3">
              <item.icon aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-navy-600" />
              <div>
                <p className="text-[0.76rem] font-bold tracking-wide text-ash-600 uppercase">{item.label}</p>
                <p className="text-[0.94rem] leading-6 font-semibold text-navy-900">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div className="min-w-0 space-y-8">
            <Block title={t("detail.overview")} icon={ListChecks}>
              <div className="space-y-3.5">
                {scheme.overview.map((para, i) => (
                  <p key={i} className="text-[0.98rem] leading-7 text-navy-800">
                    {pick(para)}
                  </p>
                ))}
              </div>
            </Block>

            <Block title={t("detail.eligibility")} icon={HelpCircle} note={t("detail.eligibilityHint")}>
              <CheckList items={scheme.eligibility.map(pick)} />
            </Block>

            <Block title={t("detail.benefits")} icon={BadgeCheck}>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {scheme.benefits.map((b, i) => (
                  <li key={i} className="rounded-md border border-leaf-200 bg-leaf-50 p-3.5 text-[0.92rem] leading-6 font-medium text-navy-900">
                    {pick(b)}
                  </li>
                ))}
              </ul>
            </Block>

            <Block title={t("detail.documents")} icon={FileCheck2} note={t("detail.docsHint")}>
              <ul className="flex flex-wrap gap-2">
                {scheme.requiredDocs.map((d) => (
                  <li key={d} className="flex items-center gap-1.5 rounded-md border border-navy-200 bg-navy-50 px-3 py-1.5 text-[0.88rem] font-semibold text-navy-900">
                    <FileCheck2 aria-hidden className="h-3.5 w-3.5 text-navy-600" />
                    {pick(documentLabels[d])}
                  </li>
                ))}
              </ul>
              {scheme.optionalDocs.length > 0 ? (
                <>
                  <p className="mt-4 text-[0.84rem] font-bold tracking-wide text-ash-600 uppercase">{t("common.optional")}</p>
                  <ul className="mt-1.5 flex flex-wrap gap-2">
                    {scheme.optionalDocs.map((d) => (
                      <li key={d} className="rounded-md border border-ash-300 bg-white px-3 py-1.5 text-[0.86rem] font-medium text-navy-800">
                        {pick(documentLabels[d])}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </Block>

            <Block title={t("detail.process")} icon={ArrowRight}>
              <ol className="space-y-3">
                {scheme.process.map((step, i) => (
                  <li key={i} className="flex gap-3.5">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-navy-700 text-[0.82rem] font-bold text-white">
                      {i + 1}
                    </span>
                    <p className="pt-0.5 text-[0.94rem] leading-6 text-navy-800">{pick(step)}</p>
                  </li>
                ))}
              </ol>
            </Block>

            <div className="rounded-md border border-navy-200 bg-navy-50 p-5">
              <p className="text-[0.8rem] font-bold tracking-wide text-navy-600 uppercase">{t("detail.official")}</p>
              <a
                href={scheme.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-[1.05rem] font-bold text-navy-800 underline decoration-navy-300 underline-offset-4 hover:decoration-navy-700"
              >
                {scheme.officialUrl.replace(/^https?:\/\//, "")}
                <ExternalLink aria-hidden className="h-4 w-4" />
              </a>
              <p className="mt-2 text-[0.86rem] text-navy-800">
                {pick(scheme.officialLabel)} · {t("detail.officialHint")}
              </p>
              <p className="mt-3 border-t border-navy-200 pt-3 text-[0.86rem] leading-6 text-ash-700">{pick(scheme.myschemeHint)}</p>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-32 lg:self-start">
            <div className="overflow-hidden rounded-md border border-ash-200 bg-white">
              <div className="p-5">
                <h2 className="text-[1.05rem] font-bold text-navy-900">{t("detail.request")}</h2>
                <p className="mt-1.5 mb-4 text-[0.88rem] leading-6 text-ash-700">{t("dir.assistBody")}</p>
                <AssistanceRequestForm schemeSlug={scheme.slug} compact />
              </div>
            </div>

            <Notice tone="warning" icon={<ShieldAlert className="h-5 w-5 text-saffron-600" />}>
              <p>{t("schemes.disclaimer")}</p>
            </Notice>

            <div className="ys-panel">
              <p className="flex items-center gap-2 text-[0.9rem] font-bold text-navy-900">
                <BadgeCheck aria-hidden className="h-4 w-4 text-leaf-600" />
                {t("common.lastVerified")}: {reviewedOn}
              </p>
              <p className="mt-2 text-[0.85rem] leading-6 text-ash-700">{t("common.demoNote")}</p>
              <Link href="/eligibility" className="ys-btn-ghost mt-3 w-full !py-2.5 text-[0.88rem]">
                {t("hero.ctaEligibility")}
              </Link>
            </div>
          </aside>
        </div>

        {related.length > 0 ? (
          <div className="mt-12 border-t border-ash-200 pt-8">
            <h2 className="mb-4 text-[1.2rem] font-bold text-navy-900">{t("detail.related")}</h2>
            <ul className="grid gap-4 md:grid-cols-3">
              {related.map((s, index) => (
                <Reveal as="li" key={s.slug} delay={index * 0.06}>
                  <Link href={`/schemes/${s.slug}`} className="ys-card block h-full">
                    <span className="grid h-10 w-10 place-items-center rounded-md bg-navy-50 text-navy-700">
                      <SchemeIcon name={s.icon} className="h-5 w-5" />
                    </span>
                    <p className="mt-3 text-[1rem] font-bold text-navy-900">{pick(s.shortName)}</p>
                    <p className="mt-1 text-[0.88rem] leading-6 text-ash-700">{pick(s.tagline)}</p>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-10">
          <Link href="/schemes" className="ys-btn-ghost !py-2.5 text-[0.9rem]">
            <ArrowLeft aria-hidden className="h-4 w-4" />
            {t("common.backToSchemes")}
          </Link>
        </div>
      </Section>
    </>
  );
}

function Block({
  title,
  icon: Icon,
  note,
  children,
}: {
  title: string;
  icon: React.ElementType;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-md border border-ash-200 bg-white p-5 shadow-[0_1px_2px_rgba(16,41,67,0.05)] sm:p-6">
      <h2 className="flex items-center gap-2.5 text-[1.18rem] font-bold text-navy-900">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-navy-700 text-white">
          <Icon aria-hidden className="h-4.5 w-4.5" />
        </span>
        {title}
      </h2>
      {note ? <p className="mt-2 text-[0.86rem] leading-6 text-ash-600 italic">{note}</p> : null}
      <div className="mt-4">{children}</div>
    </section>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5 text-[0.94rem] leading-6 text-navy-800">
          <CheckCircle2 aria-hidden className="mt-0.5 h-4.5 w-4.5 shrink-0 text-leaf-600" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* ================================================================== *
 * Eligibility checker page
 * ================================================================== */

export function EligibilityPage() {
  const { t } = useLang();
  return (
    <>
      <PageHeader eyebrowKey="elig.eyebrow" titleKey="elig.title" leadKey="elig.lead" tone="ash" breadcrumb={[{ href: "/eligibility", labelKey: "nav.eligibility" }]} />
      <Section>
        <EligibilityChecker />
      </Section>
      <section className="border-t border-ash-200 bg-navy-800">
        <div className="ys-container grid gap-6 py-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <h2 className="text-[1.35rem] font-bold text-white sm:text-[1.55rem]">{t("ctaBand.title")}</h2>
            <p className="mt-2 max-w-2xl text-[0.95rem] leading-7 text-navy-100">{t("funding.transparency")}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/schemes" className="ys-btn-outline !border-navy-500 !bg-transparent !text-white hover:!bg-navy-700">
              {t("nav.schemes")}
            </Link>
            <Link href="/become-a-saathi" className="ys-btn-saffron">
              {t("nav.saathi")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
