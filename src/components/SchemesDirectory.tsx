"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { categoryLabels, documentLabels, schemes, type SchemeCategory } from "@/data/schemes";
import { useLang } from "@/lib/i18n";
import { SchemeCard } from "@/components/SchemeCard";
import { cn } from "@/lib/cn";

const allCategories = Object.keys(categoryLabels) as SchemeCategory[];

export function SchemesDirectory() {
  const { t, pick } = useLang();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<SchemeCategory | "all">("all");

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return schemes.filter((scheme) => {
      if (category !== "all" && !scheme.categories.includes(category)) return false;
      if (!needle) return true;
      const haystack = [
        pick(scheme.name),
        pick(scheme.shortName),
        pick(scheme.tagline),
        pick(scheme.cardSummary),
        pick(scheme.benefit),
        pick(scheme.potentialBeneficiaries),
        ...[...scheme.requiredDocs, ...scheme.optionalDocs].map((d) => pick(documentLabels[d])),
        ...scheme.categories.map((c) => pick(categoryLabels[c])),
        scheme.slug,
      ]
        .join(" ")
        .toLowerCase();
      return needle.split(/\s+/).every((word) => haystack.includes(word));
    });
  }, [query, category, pick]);

  return (
    <div className="space-y-6">
      <div className="rounded-md border border-ash-200 bg-ash-50 p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <label htmlFor="scheme-search" className="ys-label">
              {t("dir.searchLabel")}
            </label>
            <div className="relative">
              <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3.5 h-4.5 w-4.5 -translate-y-1/2 text-ash-500" />
              <input
                id="scheme-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("dir.searchPlaceholder")}
                className="ys-input pl-10"
              />
            </div>
          </div>
          <p className="text-[0.88rem] font-semibold text-navy-800 lg:pb-2.5">
            {t("dir.showing")} {results.length} {t("dir.of")} {schemes.length} {t("common.results")}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 text-[0.8rem] font-bold tracking-wide text-navy-700 uppercase">
            <SlidersHorizontal aria-hidden className="h-3.5 w-3.5" />
            {t("dir.filters")}
          </span>
          <FilterChip active={category === "all"} onClick={() => setCategory("all")}>
            {t("common.all")}
          </FilterChip>
          {allCategories.map((c) => (
            <FilterChip key={c} active={category === c} onClick={() => setCategory(category === c ? "all" : c)}>
              {pick(categoryLabels[c])}
            </FilterChip>
          ))}
          {category !== "all" || query ? (
            <button
              type="button"
              onClick={() => {
                setCategory("all");
                setQuery("");
              }}
              className="ml-auto inline-flex items-center gap-1.5 rounded-md border border-ash-300 bg-white px-2.5 py-1.5 text-[0.82rem] font-semibold text-navy-800 hover:border-navy-300"
            >
              <X aria-hidden className="h-3.5 w-3.5" />
              {t("common.clear")}
            </button>
          ) : null}
        </div>
      </div>

      {results.length === 0 ? (
        <div className="ys-panel text-center">
          <p className="text-[1rem] font-bold text-navy-900">{t("common.noResults")}</p>
          <button type="button" onClick={() => { setQuery(""); setCategory("all"); }} className="ys-btn-outline mt-4 !py-2 text-[0.88rem]">
            {t("common.clear")}
          </button>
        </div>
      ) : (
        <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {results.map((scheme, index) => (
            <li key={scheme.slug}>
              <SchemeCard scheme={scheme} index={index} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-md border px-3 py-1.5 text-[0.86rem] font-semibold transition",
        active
          ? "border-navy-700 bg-navy-700 text-white"
          : "border-ash-300 bg-white text-navy-800 hover:border-navy-400 hover:bg-navy-50",
      )}
    >
      {children}
    </button>
  );
}
