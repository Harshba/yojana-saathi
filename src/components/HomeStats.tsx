"use client";

import { House, ClipboardList, Send, Users } from "lucide-react";
import { pilot } from "@/data/pilot";
import { useLang } from "@/lib/i18n";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";

export function HomeStats() {
  const { t } = useLang();
  const items = [
    { key: "households", label: t("stats.households"), value: pilot.targets.households, icon: House, suffix: "" },
    { key: "applications", label: t("stats.applications"), value: pilot.targets.applications, icon: Send, suffix: "" },
    { key: "benefits", label: t("stats.benefits"), value: pilot.targets.benefits, icon: ClipboardList, suffix: "" },
    { key: "saathis", label: t("stats.saathis"), value: pilot.targets.saathis, icon: Users, suffix: "" },
  ];

  return (
    <Section id="pilot-targets" tone="navy" className="border-t-0" labelledBy="stats-title">
      <SectionHeading
        id="stats-title"
        eyebrow={t("stats.eyebrow")}
        title={t("stats.title")}
        body={t("stats.body")}
        inverted
        align="center"
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <Reveal as="li" key={item.key} delay={index * 0.08}>
              <div className="h-full rounded-md border border-navy-600 bg-navy-800/70 p-5 text-center">
                <span className="mx-auto mb-3 grid h-11 w-11 place-items-center rounded-full bg-navy-700 text-saffron-300 ring-1 ring-navy-500">
                  <Icon aria-hidden className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <p className="text-[2.4rem] leading-none font-bold tracking-tight text-white sm:text-[2.75rem]">
                  <AnimatedCounter value={item.value} label={item.label} />
                  <span aria-hidden className="text-saffron-400">+</span>
                </p>
                <p className="mt-2 text-[0.92rem] font-semibold text-navy-100">{item.label}</p>
                <p className="mt-1.5 inline-block rounded-sm bg-saffron-500/15 px-2 py-0.5 text-[0.72rem] font-bold tracking-wider text-saffron-200 uppercase">
                  {t("common.pilotTarget")}
                </p>
              </div>
            </Reveal>
          );
        })}
      </ul>
      <p className="mt-5 rounded-md border border-navy-600 bg-navy-900/60 p-3.5 text-center text-[0.84rem] leading-6 text-navy-100">
        {t("stats.footnote")}
      </p>
    </Section>
  );
}
