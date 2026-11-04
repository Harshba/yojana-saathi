"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarCheck2, CheckCircle2, ChevronRight } from "lucide-react";
import { pilotPhases } from "@/data/pilot";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/cn";

export function PilotTimeline() {
  const { t, pick } = useLang();
  const [active, setActive] = useState(1);
  const reduce = useReducedMotion();
  const phase = pilotPhases.find((p) => p.month === active) ?? pilotPhases[0];

  return (
    <div className="rounded-md border border-ash-200 bg-white p-4 shadow-[0_1px_2px_rgba(16,41,67,0.05)] sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="ys-eyebrow">
          <CalendarCheck2 aria-hidden className="h-4 w-4 text-saffron-600" />
          {t("pilot.timelineTitle")}
        </p>
        <p className="text-[0.84rem] text-ash-600">{t("pilot.timelineBody")}</p>
      </div>

      {/* Month selector */}
      <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6" role="tablist" aria-label={t("pilot.timelineTitle")}>
        {pilotPhases.map((p) => {
          const selected = p.month === active;
          return (
            <button
              key={p.month}
              role="tab"
              type="button"
              aria-selected={selected}
              onClick={() => setActive(p.month)}
              className={cn(
                "group relative rounded-md border px-2 py-2.5 text-center transition",
                selected
                  ? "border-navy-700 bg-navy-700 text-white"
                  : "border-ash-200 bg-ash-50 text-navy-800 hover:border-navy-300 hover:bg-navy-50",
              )}
            >
              <span className={cn("block text-[0.68rem] font-bold tracking-wider uppercase", selected ? "text-saffron-200" : "text-ash-500")}>
                {t("pilot.month")} {p.month}
              </span>
              <span className="mt-0.5 block text-[0.78rem] leading-tight font-semibold">{pick(p.title)}</span>
            </button>
          );
        })}
      </div>

      {/* Progress rail */}
      <div className="mt-4 flex items-center gap-1" aria-hidden>
        {pilotPhases.map((p) => (
          <span
            key={p.month}
            className={cn("h-1.5 flex-1 rounded-full", p.month <= active ? "bg-saffron-500" : "bg-ash-200")}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={phase.month}
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="mt-5 grid gap-5 rounded-md border border-navy-100 bg-navy-50/60 p-4 sm:p-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]"
        >
          <div>
            <h4 className="flex items-center gap-2 text-[1.1rem] font-bold text-navy-900">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-navy-700 text-[0.82rem] font-bold text-white">
                {phase.month}
              </span>
              {pick(phase.title)}
            </h4>
            <ul className="mt-3 space-y-2">
              {phase.activities.map((activity, index) => (
                <li key={index} className="flex gap-2.5 text-[0.92rem] leading-6 text-navy-800">
                  <ChevronRight aria-hidden className="mt-1 h-4 w-4 shrink-0 text-saffron-600" />
                  <span>{pick(activity)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border border-leaf-300 bg-white p-4">
            <p className="flex items-center gap-2 text-[0.8rem] font-bold tracking-wide text-leaf-700 uppercase">
              <CheckCircle2 aria-hidden className="h-4 w-4" />
              {t("pilot.outputLabel")}
            </p>
            <p className="mt-2 text-[0.95rem] leading-6 font-semibold text-navy-900">{pick(phase.output)}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
