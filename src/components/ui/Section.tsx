import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "white" | "ash" | "navy" | "saffron" | "leaf";

const toneClasses: Record<Tone, string> = {
  white: "bg-white text-navy-900",
  ash: "bg-ash-50 text-navy-900",
  navy: "bg-navy-800 text-white",
  saffron: "bg-saffron-50 text-navy-900",
  leaf: "bg-leaf-50 text-navy-900",
};

export function Section({
  id,
  tone = "white",
  className,
  children,
  labelledBy,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("scroll-mt-24 border-t border-ash-200 py-12 sm:py-16 lg:py-20 md:scroll-mt-28", toneClasses[tone], className)}
    >
      <div className="ys-container">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  inverted = false,
  id,
  action,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  inverted?: boolean;
  id?: string;
  action?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-4 sm:mb-10 lg:flex-row lg:items-end lg:justify-between",
        align === "center" && "lg:flex-col lg:items-center text-center",
      )}
    >
      <div className={cn("max-w-3xl", align === "center" && "mx-auto")}>
        {eyebrow ? (
          <p className={cn("ys-eyebrow mb-2", inverted && "text-saffron-300")}>
            <span aria-hidden className="inline-block h-3 w-1 rounded-sm bg-saffron-500" />
            {eyebrow}
          </p>
        ) : null}
        <h2 id={id} className={cn("ys-h2", inverted && "text-white")}>
          {title}
        </h2>
        {body ? (
          <p className={cn("mt-3 text-[0.98rem] leading-7 sm:text-[1.04rem]", inverted ? "text-navy-100" : "text-ash-700")}>
            {body}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function Notice({
  tone = "info",
  title,
  children,
  icon,
}: {
  tone?: "info" | "warning" | "success";
  title?: string;
  children: ReactNode;
  icon?: ReactNode;
}) {
  const map = {
    info: "border-navy-200 bg-navy-50 text-navy-900",
    warning: "border-saffron-300 bg-saffron-50 text-navy-900",
    success: "border-leaf-300 bg-leaf-50 text-navy-900",
  } as const;
  return (
    <div
      role={tone === "warning" ? "note" : "status"}
      className={cn("rounded-md border-l-4 border border-y-0 px-4 py-3.5 text-[0.92rem] leading-6 sm:text-[0.96rem]", map[tone])}
    >
      <div className="flex gap-3">
        {icon ? <span aria-hidden className="mt-0.5 shrink-0">{icon}</span> : null}
        <div>
          {title ? <p className="mb-1 font-bold">{title}</p> : null}
          <div className="[&>p+p]:mt-2">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function StatBox({
  label,
  value,
  sub,
  tone = "ash",
}: {
  label: string;
  value: ReactNode;
  sub?: string;
  tone?: "ash" | "white";
}) {
  return (
    <div className={cn("rounded-md border border-ash-200 p-4", tone === "ash" ? "bg-ash-50" : "bg-white")}>
      <p className="text-[0.8rem] font-semibold tracking-wide text-ash-600 uppercase">{label}</p>
      <p className="mt-1.5 text-[1.5rem] leading-tight font-bold text-navy-800">{value}</p>
      {sub ? <p className="mt-1 text-[0.85rem] text-ash-600">{sub}</p> : null}
    </div>
  );
}
