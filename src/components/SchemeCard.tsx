"use client";

import { Link } from "@/components/ui/AppLink";
import { ArrowRight, FileCheck2, Users } from "lucide-react";
import { categoryLabels, documentLabels, type Scheme } from "@/data/schemes";
import { useLang } from "@/lib/i18n";
import { SchemeIcon } from "@/components/SchemeIcon";
import { Reveal } from "@/components/ui/Reveal";

export function SchemeCard({ scheme, index = 0 }: { scheme: Scheme; index?: number }) {
  const { t, pick } = useLang();
  const docs = scheme.requiredDocs.slice(0, 4);

  return (
    <Reveal delay={index * 0.05} className="h-full">
      <article className="ys-card">
        <div className="mb-3 flex items-start justify-between gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-navy-50 text-navy-700 ring-1 ring-navy-100">
            <SchemeIcon name={scheme.icon} />
          </span>
          <span className="flex flex-wrap justify-end gap-1">
            {scheme.categories.map((c) => (
              <span key={c} className="ys-chip">
                {pick(categoryLabels[c])}
              </span>
            ))}
          </span>
        </div>

        <h3 className="text-[1.08rem] leading-snug font-bold text-navy-900">{pick(scheme.name)}</h3>
        <p className="mt-0.5 text-[0.88rem] font-semibold text-saffron-600">{pick(scheme.tagline)}</p>
        <p className="mt-2.5 text-[0.92rem] leading-6 text-ash-700">{pick(scheme.cardSummary)}</p>

        <dl className="mt-4 space-y-3 border-t border-dashed border-ash-200 pt-3 text-[0.86rem]">
          <div>
            <dt className="flex items-center gap-1.5 font-bold text-navy-800">
              <Users aria-hidden className="h-4 w-4 text-navy-500" />
              {t("schemes.beneficiaries")}
            </dt>
            <dd className="mt-0.5 leading-6 text-ash-700">{pick(scheme.potentialBeneficiaries)}</dd>
          </div>
          <div>
            <dt className="flex items-center gap-1.5 font-bold text-navy-800">
              <FileCheck2 aria-hidden className="h-4 w-4 text-navy-500" />
              {t("schemes.documents")}
            </dt>
            <dd className="mt-1.5 flex flex-wrap gap-1.5">
              {docs.map((d) => (
                <span key={d} className="rounded-sm bg-ash-100 px-2 py-0.5 text-[0.78rem] font-medium text-navy-800">
                  {pick(documentLabels[d])}
                </span>
              ))}
              {scheme.requiredDocs.length > 4 ? (
                <span className="rounded-sm bg-ash-100 px-2 py-0.5 text-[0.78rem] font-medium text-navy-800">
                  +{scheme.requiredDocs.length - 4}
                </span>
              ) : null}
            </dd>
          </div>
        </dl>

        <div className="mt-auto pt-4">
          <Link
            href={`/schemes/${scheme.slug}`}
            className="ys-btn-outline w-full !py-2.5 text-[0.9rem]"
            aria-label={`${t("schemes.viewDetails")}: ${pick(scheme.name)}`}
          >
            {t("schemes.viewDetails")}
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
      </article>
    </Reveal>
  );
}
