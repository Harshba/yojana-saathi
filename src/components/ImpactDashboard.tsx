"use client";

import { useEffect, useState } from "react";
import { Link } from "@/components/ui/AppLink";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Banknote,
  CircleDashed,
  Database,
  IndianRupee,
  ShieldQuestion,
  Users,
} from "lucide-react";
import { impactKpis, financialModel, monthlyPlan, pilot, stories, targetsTable, empowermentMetrics } from "@/data/pilot";
import { schemes } from "@/data/schemes";
import { useLang } from "@/lib/i18n";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { BarList, GroupedColumns, ProgressBar, RingStat } from "@/components/ui/Charts";
import { Notice, Section, SectionHeading, StatBox } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

type LiveStats = {
  requests: { eligibility: number; assistance: number; saathi: number; contact: number; views: number };
  assistanceByScheme: { slug: string; count: number }[];
};

export function ImpactDashboard({ variant = "full" }: { variant?: "home" | "full" }) {
  const { t, pick } = useLang();
  const [live, setLive] = useState<LiveStats | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/stats")
      .then((r) => (r.ok ? (r.json() as Promise<LiveStats>) : null))
      .then((data) => {
        if (!cancelled && data) setLive(data);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  const schemeRows = schemes.map((s) => ({
    label: pick(s.shortName),
    value: s.pilotTargetApplications,
    tone: "navy" as const,
  }));

  return (
    <div className="space-y-8">
      {/* KPI cards */}
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {impactKpis.map((kpi, index) => (
          <Reveal as="li" key={kpi.key} delay={index * 0.06}>
            <div className="flex h-full flex-col rounded-md border border-ash-200 bg-white p-5 shadow-[0_1px_2px_rgba(16,41,67,0.05)]">
              <p className="text-[0.8rem] font-bold tracking-wide text-ash-600 uppercase">{pick(kpi.label)}</p>
              <p className="mt-1.5 text-[2.1rem] leading-none font-bold text-navy-900">
                <AnimatedCounter value={kpi.current} label={pick(kpi.label)} />
                <span className="text-[1.05rem] font-semibold text-ash-500"> / {kpi.target.toLocaleString("en-IN")}</span>
              </p>
              <p className="mt-1 text-[0.82rem] font-semibold text-leaf-700">{t("impactPage.notYet")}</p>
              <div className="mt-3.5 border-t border-dashed border-ash-200 pt-3">
                <p className="mb-1.5 text-[0.74rem] font-bold tracking-wide text-navy-600 uppercase">
                  {t("impactPage.monthlyTitle")}
                </p>
                <ol className="flex items-end gap-1" aria-label={`${pick(kpi.label)} ${t("common.planned")}`}>
                  {monthlyPlan.map((m, i) => {
                    const ratio = kpi.target > 0 ? (m[kpi.key as "households" | "applications" | "benefits"] ?? 0) / kpi.target : 0;
                    return (
                      <li key={i} className="flex-1" title={`${t("pilot.month")} ${m.month}: ${Math.round(ratio * 100)}%`}>
                        <span
                          className={cn("block rounded-sm", ratio > 0.74 ? "bg-navy-700" : ratio > 0.4 ? "bg-navy-400" : "bg-navy-200")}
                          style={{ height: `${Math.max(4, Math.round(ratio * 34))}px` }}
                        />
                      </li>
                    );
                  })}
                </ol>
              </div>
              <p className="mt-2.5 text-[0.8rem] leading-5 text-ash-600">{pick(kpi.note)}</p>
            </div>
          </Reveal>
        ))}
      </ul>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
        {/* Monthly plan */}
        <div className="rounded-md border border-ash-200 bg-white p-5 sm:p-6">
          <h3 className="text-[1.08rem] font-bold text-navy-900">{t("impactPage.monthlyTitle")}</h3>
          <p className="mt-1 mb-5 text-[0.88rem] leading-6 text-ash-700">{t("impactPage.monthlyBody")}</p>
          <GroupedColumns
            groups={monthlyPlan.map((m) => ({ label: `${m.month}`, values: [m.households, m.applications, m.benefits] }))}
            series={[
              { label: t("impactPage.householdsReached"), tone: "navy" },
              { label: t("impactPage.applicationsFiled"), tone: "saffron" },
              { label: t("impactPage.kpiBenefits"), tone: "leaf" },
            ]}
          />
        </div>

        {/* Outcome rings */}
        <div className="rounded-md border border-ash-200 bg-ash-50 p-5 sm:p-6">
          <h3 className="text-[1.08rem] font-bold text-navy-900">{t("impactPage.outcomesTitle")}</h3>
          <p className="mt-1 mb-4 text-[0.88rem] leading-6 text-ash-700">{t("impactPage.outcomesBody")}</p>
          <div className="flex flex-wrap items-center justify-around gap-4">
            <RingStat value={600} max={600} caption={t("impactPage.kpiApplications")} centreLabel="600" tone="navy" />
            <RingStat value={450} max={600} caption={t("impactPage.kpiBenefits")} centreLabel="75%" tone="leaf" />
          </div>
          <div className="mt-5 space-y-4 border-t border-ash-200 pt-4">
            <ProgressBar value={750} max={750} label={t("impactPage.kpiHouseholds")} tone="navy" targetLabel={t("common.planned")} />
            <ProgressBar value={2} max={2} label={t("impactPage.kpiWomen")} tone="saffron" targetLabel={t("common.planned")} />
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-md border border-ash-200 bg-white p-5 sm:p-6">
          <h3 className="text-[1.08rem] font-bold text-navy-900">{t("impactPage.coverageTitle")}</h3>
          <p className="mt-1 mb-5 text-[0.88rem] leading-6 text-ash-700">{t("impactPage.coverageBody")}</p>
          <BarList items={schemeRows} />
          <p className="mt-4 flex items-center gap-2 text-[0.8rem] font-semibold text-ash-600">
            <CircleDashed aria-hidden className="h-3.5 w-3.5" />
            {t("common.pilotTarget")} · {t("common.demoBadge")}
          </p>
        </div>

        <div className="rounded-md border border-ash-200 bg-white p-5 sm:p-6">
          <h3 className="flex items-center gap-2 text-[1.08rem] font-bold text-navy-900">
            <Banknote aria-hidden className="h-5 w-5 text-leaf-600" />
            {t("impactPage.financialTitle")}
          </h3>
          <p className="mt-1 mb-4 text-[0.88rem] leading-6 text-ash-700">{t("impactPage.financialBody")}</p>
          <ul className="divide-y divide-ash-200">
            {financialModel.map((row, i) => (
              <li key={i} className="flex flex-wrap items-center justify-between gap-2 py-3">
                <div className="min-w-0">
                  <p className="text-[0.92rem] font-semibold text-navy-900">{pick(row.label)}</p>
                  <p className="text-[0.8rem] text-ash-600">{pick(row.note)}</p>
                </div>
                <p
                  className={cn(
                    "rounded-sm px-2.5 py-1 text-[0.86rem] font-bold tabular-nums",
                    row.kind === "cash" ? "bg-leaf-50 text-leaf-700" : row.kind === "cover" ? "bg-navy-50 text-navy-700" : "bg-saffron-50 text-saffron-700",
                  )}
                >
                  {row.value}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-3 flex gap-2 text-[0.8rem] leading-5 text-ash-600">
            <ShieldQuestion aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            {t("impactPage.financialNote")}
          </p>
        </div>
      </div>

      {variant === "full" ? (
        <>
          {/* Live prototype activity */}
          <div className="rounded-md border-2 border-navy-200 bg-navy-50 p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="flex items-center gap-2 text-[1.05rem] font-bold text-navy-900">
                <Activity aria-hidden className="h-5 w-5 text-navy-600" />
                {t("impactPage.status")}
              </h3>
              <p className="ys-chip">
                <Database aria-hidden className="h-3.5 w-3.5" />
                {t("common.demoBadge")}
              </p>
            </div>
            <p className="mt-1.5 text-[0.9rem] leading-6 text-navy-800">{t("impactPage.dataNote")}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <StatBox label={t("elig.title")} value={(live?.requests.eligibility ?? 0).toLocaleString("en-IN")} sub={t("common.demoBadge")} tone="white" />
              <StatBox label={t("dir.assistCta")} value={(live?.requests.assistance ?? 0).toLocaleString("en-IN")} sub={t("common.demoBadge")} tone="white" />
              <StatBox label={t("nav.saathi")} value={(live?.requests.saathi ?? 0).toLocaleString("en-IN")} sub={t("common.demoBadge")} tone="white" />
              <StatBox label={t("contact.title")} value={(live?.requests.contact ?? 0).toLocaleString("en-IN")} sub={t("common.demoBadge")} tone="white" />
            </div>
          </div>

          {/* Empowerment */}
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
            <div className="rounded-md border border-ash-200 bg-white p-5 sm:p-6">
              <h3 className="flex items-center gap-2 text-[1.08rem] font-bold text-navy-900">
                <Users aria-hidden className="h-5 w-5 text-saffron-600" />
                {t("impactPage.empowerTitle")}
              </h3>
              <p className="mt-1 mb-4 text-[0.88rem] leading-6 text-ash-700">{t("impactPage.empowerBody")}</p>
              <ul className="space-y-3">
                {empowermentMetrics.map((metric, i) => (
                  <li key={i} className="rounded-md border border-ash-200 bg-ash-50 p-3.5">
                    <p className="text-[0.9rem] font-semibold text-navy-900">{pick(metric.label)}</p>
                    <p className="mt-1 text-[1.05rem] font-bold text-navy-700">{pick(metric.target)}</p>
                    <p className="mt-1 text-[0.8rem] text-ash-600">{pick(metric.note)}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Targets table */}
            <div className="overflow-hidden rounded-md border border-ash-200 bg-white">
              <div className="border-b border-ash-200 p-5 pb-3">
                <h3 className="text-[1.08rem] font-bold text-navy-900">{t("impactPage.targetsTitle")}</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="ys-table w-full min-w-[36rem] text-[0.88rem]">
                  <caption className="sr-only">{t("impactPage.targetsTitle")}</caption>
                  <thead>
                    <tr className="bg-navy-800 text-left text-white">
                      <th scope="col" className="px-4 py-2.5 font-semibold">{t("impactPage.colMetric")}</th>
                      <th scope="col" className="px-4 py-2.5 font-semibold">{t("impactPage.colTarget")}</th>
                      <th scope="col" className="px-4 py-2.5 font-semibold">{t("impactPage.colVerified")}</th>
                      <th scope="col" className="px-4 py-2.5 font-semibold">{t("impactPage.colSource")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {targetsTable.map((row, i) => (
                      <tr key={i} className="border-t border-ash-200 align-top odd:bg-ash-50/60">
                        <th scope="row" className="px-4 py-3 font-semibold text-navy-900">{pick(row.metric)}</th>
                        <td className="px-4 py-3 font-bold text-navy-800 tabular-nums">{pick(row.target)}</td>
                        <td className="px-4 py-3 text-ash-600 italic">{t("impactPage.notYet")}</td>
                        <td className="px-4 py-3 text-ash-700">{pick(row.source)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="border-t border-ash-200 bg-ash-50 px-4 py-3 text-[0.82rem] leading-6 text-ash-700">
                <BadgeCheck aria-hidden className="mr-1 inline h-3.5 w-3.5 text-leaf-600" />
                {t("impactPage.methodologyBody")}
              </p>
            </div>
          </div>

          {/* Stories */}
          <div>
            <h3 className="text-[1.08rem] font-bold text-navy-900">{t("impactPage.storiesTitle")}</h3>
            <p className="mt-1 mb-4 max-w-3xl text-[0.88rem] leading-6 text-ash-700">{t("impactPage.storiesBody")}</p>
            <ul className="grid gap-4 md:grid-cols-2">
              {stories.map((story, i) => (
                <li key={i} className="rounded-md border-l-4 border-saffron-500 border-y border-r border-ash-200 bg-white p-5">
                  <p className="text-[0.95rem] leading-7 text-navy-800 italic">“{pick(story.quote)}”</p>
                  <p className="mt-3 text-[0.86rem] font-bold text-navy-900">
                    {pick(story.name)} <span className="font-normal text-ash-600">· {pick(story.role)}</span>
                  </p>
                  <p className="mt-1 text-[0.76rem] font-bold tracking-wide text-saffron-700 uppercase">{t("common.demoBadge")}</p>
                </li>
              ))}
            </ul>
          </div>

          <Notice tone="info" title={t("pilot.overviewTitle")}>
            <p>
              {t("pilot.locationLabel")}: {pick(pilot.location)} · {t("pilot.duration")}: {t("pilot.durationValue")} ·{" "}
              {t("pilot.budget")}: {t("pilot.budgetValue")}
            </p>
            <p className="mt-2">
              <Link href="/contact?category=partnership" className="ys-link">
                {t("impactPage.reportCta")}
              </Link>
            </p>
          </Notice>
        </>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-md border border-navy-200 bg-navy-50 p-5">
          <div>
            <p className="text-[0.95rem] font-bold text-navy-900">{t("impactPreview.financial")}</p>
            <p className="mt-1 flex items-center gap-2 text-[1.6rem] leading-none font-bold text-navy-800">
              <IndianRupee aria-hidden className="h-6 w-6 text-leaf-600" />
              <AnimatedCounter value={22} decimals={0} />
              <span className="text-[1rem] font-semibold">lakh / {t("pilot.durationValue")}</span>
            </p>
            <p className="mt-1.5 text-[0.84rem] text-ash-700">{t("impactPage.financialNote")}</p>
          </div>
          <Link href="/impact" className="ys-btn-primary">
            {t("impactPreview.full")}
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
