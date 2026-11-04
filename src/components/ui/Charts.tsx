"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

type BarTone = "navy" | "saffron" | "leaf" | "grey";

const toneBar: Record<BarTone, string> = {
  navy: "bg-navy-700",
  saffron: "bg-saffron-500",
  leaf: "bg-leaf-500",
  grey: "bg-ash-300",
};

const toneStroke: Record<BarTone, string> = {
  navy: "#163557",
  saffron: "#f2870d",
  leaf: "#138a3c",
  grey: "#cbd3de",
};

function Grow({ pct, children, delay = 0 }: { pct: number; children: React.ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: `${pct}%` }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 0.61, 0.36, 1] }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}

export function ProgressBar({
  value,
  max,
  label,
  caption,
  tone = "navy",
  targetLabel,
}: {
  value: number;
  max: number;
  label: string;
  caption?: string;
  tone?: BarTone;
  targetLabel?: string;
}) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <p className="text-[0.92rem] font-semibold text-navy-900">{label}</p>
        <p className="text-[0.92rem] font-bold text-navy-700 tabular-nums">
          {value.toLocaleString("en-IN")} {targetLabel ? <span className="font-medium text-ash-600">/ {targetLabel}</span> : null}
        </p>
      </div>
      <div
        className="h-3 w-full overflow-hidden rounded-sm bg-ash-200"
        role="img"
        aria-label={`${label}: ${value} of ${max} (${pct}%)`}
      >
        <Grow pct={pct}>
          <div className={cn("h-full rounded-sm", toneBar[tone])} />
        </Grow>
      </div>
      {caption ? <p className="mt-1.5 text-[0.82rem] text-ash-600">{caption}</p> : null}
    </div>
  );
}

export function BarList({
  items,
  unit,
}: {
  items: { label: string; value: number; tone?: BarTone; note?: string }[];
  unit?: string;
}) {
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <ul className="space-y-3.5">
      {items.map((item, index) => (
        <li key={item.label}>
          <div className="mb-1 flex items-baseline justify-between gap-3">
            <span className="text-[0.9rem] font-medium text-navy-900">{item.label}</span>
            <span className="text-[0.88rem] font-bold text-navy-700 tabular-nums">
              {item.value.toLocaleString("en-IN")}
              {unit ? ` ${unit}` : ""}
            </span>
          </div>
          <div className="h-2.5 w-full rounded-sm bg-ash-200" aria-hidden>
            <Grow pct={(item.value / max) * 100} delay={index * 0.05}>
              <div className={cn("h-full rounded-sm", toneBar[item.tone ?? "navy"])} />
            </Grow>
          </div>
          {item.note ? <p className="mt-1 text-[0.8rem] text-ash-600">{item.note}</p> : null}
        </li>
      ))}
    </ul>
  );
}

/** Grouped column chart drawn as accessible SVG (no chart dependency). */
export function GroupedColumns({
  groups,
  series,
  height = 240,
}: {
  groups: { label: string; values: number[] }[];
  series: { label: string; tone: BarTone }[];
  height?: number;
}) {
  const gradientId = useId();
  const allValues = groups.flatMap((g) => g.values);
  const max = Math.max(...allValues, 1);
  const chartHeight = height - 44;
  const groupWidth = 100 / groups.length;
  const barWidth = Math.min(16, (groupWidth * 0.7) / series.length);

  return (
    <div>
      <svg
        viewBox={`0 0 100 ${height}`}
        preserveAspectRatio="none"
        className="w-full"
        style={{ height }}
        role="img"
        aria-label={groups
          .map((g) => `${g.label}: ${g.values.map((v, i) => `${series[i]?.label} ${v}`).join(", ")}`)
          .join(" | ")}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#eff2f6" />
            <stop offset="100%" stopColor="white" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75, 1].map((line) => (
          <line
            key={line}
            x1="0"
            x2="100"
            y1={chartHeight - chartHeight * line + 8}
            y2={chartHeight - chartHeight * line + 8}
            stroke="#e2e7ee"
            strokeWidth="0.4"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <line x1="0" x2="100" y1={chartHeight + 8} y2={chartHeight + 8} stroke="#cbd3de" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
        {groups.map((group, gi) =>
          group.values.map((value, si) => {
            const barHeight = Math.max(1.5, (value / max) * chartHeight);
            const x = gi * groupWidth + groupWidth / 2 - (series.length * barWidth) / 2 + si * barWidth;
            const tone = series[si]?.tone ?? "navy";
            return (
              <rect
                key={`${gi}-${si}`}
                x={x}
                width={barWidth * 0.82}
                y={chartHeight + 8 - barHeight}
                height={barHeight}
                fill={toneStroke[tone]}
                rx="0.8"
              />
            );
          }),
        )}
      </svg>
      <div className="mt-1 flex justify-between gap-1">
        {groups.map((g) => (
          <span key={g.label} className="flex-1 text-center text-[0.78rem] font-semibold text-ash-600">
            {g.label}
          </span>
        ))}
      </div>
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        {series.map((s) => (
          <li key={s.label} className="flex items-center gap-2 text-[0.84rem] font-medium text-navy-800">
            <span aria-hidden className={cn("inline-block h-3 w-3 rounded-sm", toneBar[s.tone])} />
            {s.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Ring indicator used for a single metric against its target. */
export function RingStat({
  value,
  max,
  caption,
  tone = "navy",
  centreLabel,
}: {
  value: number;
  max: number;
  caption: string;
  tone?: BarTone;
  centreLabel?: string;
}) {
  const pct = max > 0 ? Math.min(1, value / max) : 0;
  const r = 42;
  const c = 2 * Math.PI * r;
  const reduce = useReducedMotion();
  return (
    <figure className="flex flex-col items-center text-center">
      <svg viewBox="0 0 100 100" className="h-28 w-28" role="img" aria-label={`${caption}: ${Math.round(pct * 100)}%`}>
        <circle cx="50" cy="50" r={r} fill="none" stroke="#e2e7ee" strokeWidth="10" />
        <motion.circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke={toneStroke[tone]}
          strokeWidth="10"
          strokeLinecap="butt"
          strokeDasharray={c}
          initial={{ strokeDashoffset: reduce ? c * (1 - pct) : c }}
          whileInView={{ strokeDashoffset: c * (1 - pct) }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          transform="rotate(-90 50 50)"
        />
        <text x="50" y="54" textAnchor="middle" className="fill-navy-900 text-[17px] font-bold">
          {centreLabel ?? `${Math.round(pct * 100)}%`}
        </text>
      </svg>
      <figcaption className="mt-2 max-w-[15ch] text-[0.85rem] font-semibold text-navy-800">{caption}</figcaption>
    </figure>
  );
}
