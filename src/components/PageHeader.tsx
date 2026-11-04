"use client";

import { Link } from "@/components/ui/AppLink";
import { ChevronRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/cn";

export function PageHeader({
  eyebrowKey,
  titleKey,
  title,
  leadKey,
  breadcrumb,
  tone = "navy",
  children,
}: {
  eyebrowKey?: string;
  titleKey?: string;
  /** Use when the title comes from data instead of the dictionary. */
  title?: string;
  leadKey?: string;
  breadcrumb?: { href: string; labelKey: string }[];
  tone?: "navy" | "ash";
  children?: React.ReactNode;
}) {
  const { t } = useLang();
  const dark = tone === "navy";

  return (
    <div className={cn(dark ? "bg-navy-800 text-white" : "border-b border-ash-200 bg-ash-50 text-navy-900")}>
      <div className="ys-container py-8 sm:py-10 lg:py-12">
        {breadcrumb && breadcrumb.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className={cn("flex flex-wrap items-center gap-1 text-[0.82rem]", dark ? "text-navy-200" : "text-ash-600")}>
              <li>
                <Link href="/" className="hover:underline">
                  {t("common.home")}
                </Link>
              </li>
              {breadcrumb.map((crumb) => (
                <li key={crumb.href} className="flex items-center gap-1">
                  <ChevronRight aria-hidden className="h-3.5 w-3.5" />
                  <Link href={crumb.href} className="hover:underline">
                    {t(crumb.labelKey)}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        {eyebrowKey ? (
          <p className={cn("ys-eyebrow mb-2.5", dark && "text-saffron-300")}>
            <span aria-hidden className="inline-block h-3 w-1 rounded-sm bg-saffron-500" />
            {t(eyebrowKey)}
          </p>
        ) : null}

        <h1 className={cn("max-w-4xl text-[1.85rem] leading-[1.1] font-bold tracking-tight sm:text-[2.3rem] lg:text-[2.6rem]", dark && "text-white")}>
          {title ?? (titleKey ? t(titleKey) : "")}
        </h1>
        {leadKey ? (
          <p className={cn("mt-4 max-w-3xl text-[1rem] leading-7 sm:text-[1.06rem]", dark ? "text-navy-100" : "text-ash-700")}>
            {t(leadKey)}
          </p>
        ) : null}
        {children ? <div className="mt-6">{children}</div> : null}
      </div>
    </div>
  );
}
