"use client";

import { Link } from "@/components/ui/AppLink";
import { ArrowUp, Mail, MapPin, ShieldAlert } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { helpLinks, legalLinks, primaryNav } from "@/lib/navigation";
import { schemes } from "@/data/schemes";
import { pilot } from "@/data/pilot";
import { Logo } from "@/components/Logo";

export function Footer() {
  const { t, pick } = useLang();
  const year = 2026;

  return (
    <footer className="border-t-4 border-saffron-500 bg-navy-900 text-navy-100">
      <div className="ys-container grid gap-10 py-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="w-fit rounded-sm bg-white p-2">
            <Logo className="w-[190px] sm:w-[220px]" />
          </div>
          <p className="mt-4 max-w-md text-[0.9rem] leading-6">{t("footer.aboutText")}</p>
          <p className="mt-4 flex items-start gap-2 text-[0.86rem] font-semibold text-saffron-200">
            <ShieldAlert aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
            {t("brand.notGov")} — {t("footer.initiative")}
          </p>
          <p className="mt-3 flex items-start gap-2 text-[0.86rem]">
            <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-navy-300" />
            {pick(pilot.location)}
          </p>
          <p className="mt-1.5 flex items-start gap-2 text-[0.86rem]">
            <Mail aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-navy-300" />
            {t("contact.emailValue")} <span className="text-navy-400">({t("contact.emailLabel").replace(/:.*/, "")})</span>
          </p>
        </div>

        <FooterColumn title={t("footer.quick")}>
          {primaryNav.map((item) => (
            <FooterLink key={item.href} href={item.href}>
              {t(item.labelKey)}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title={t("footer.schemesCol")}>
          {schemes.slice(0, 6).map((scheme) => (
            <FooterLink key={scheme.slug} href={`/schemes/${scheme.slug}`}>
              {pick(scheme.shortName)}
            </FooterLink>
          ))}
          <FooterLink href="/schemes">{t("schemes.allSchemes")}</FooterLink>
        </FooterColumn>

        <FooterColumn title={t("nav.section.help")}>
          {helpLinks.map((item) => (
            <FooterLink key={item.href} href={item.href}>
              {t(item.labelKey)}
            </FooterLink>
          ))}
          <FooterLink href="/about">{t("nav.about")}</FooterLink>
          <FooterLink href="/become-a-saathi">{t("nav.saathi")}</FooterLink>
          <FooterLink href="/impact">{t("nav.impact")}</FooterLink>
        </FooterColumn>
      </div>

      <div className="border-t border-navy-700 bg-navy-900">
        <div className="ys-container py-6">
          <p className="rounded-md border border-navy-600 bg-navy-800/60 p-4 text-[0.85rem] leading-6 text-navy-100">
            <span className="font-bold text-saffron-300">{t("footer.disclaimer")}: </span>
            {t("footer.disclaimerText")}
          </p>
          <div className="mt-5 flex flex-col gap-3 text-[0.82rem] text-navy-300 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {t("brand.name")} · {t("footer.rights")}
            </p>
            <nav aria-label={t("nav.section.legal")} className="flex flex-wrap items-center gap-x-4 gap-y-2">
              {legalLinks.map((item) => (
                <Link key={item.href} href={item.href} className="underline-offset-4 hover:text-white hover:underline">
                  {t(item.labelKey)}
                </Link>
              ))}
              <a href="#main-content" className="inline-flex items-center gap-1 font-semibold text-saffron-300 hover:text-saffron-200">
                {t("footer.backTop")}
                <ArrowUp aria-hidden className="h-3.5 w-3.5" />
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-[0.78rem] font-bold tracking-[0.12em] text-white uppercase">{title}</p>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-[0.9rem] text-navy-100 underline-offset-4 transition hover:text-white hover:underline">
        {children}
      </Link>
    </li>
  );
}
