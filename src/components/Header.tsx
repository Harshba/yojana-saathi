"use client";

import { useEffect, useState } from "react";
import { Link } from "@/components/ui/AppLink";
import { useLocation } from "react-router-dom";
import { Languages, Menu, PhoneCall, ShieldAlert, X, ZoomIn } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { primaryNav } from "@/lib/navigation";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/Logo";

export function Header() {
  const { t, lang, setLang, textScale, setTextScale } = useLang();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : href.startsWith("/#") ? false : pathname.startsWith(href);

  return (
    <header className="z-50 md:sticky md:top-0">
      <div aria-hidden className="flex h-[3px] w-full">
        <span className="flex-1 bg-saffron-500" />
        <span className="flex-1 bg-white" />
        <span className="flex-1 bg-leaf-500" />
      </div>

      {/* Utility bar */}
      <div className="bg-navy-800 text-white">
        <div className="ys-container flex flex-wrap items-center justify-between gap-x-6 gap-y-1.5 py-1.5 text-[0.78rem] sm:text-[0.82rem]">
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1.5 font-semibold text-saffron-200 sm:flex">
              <ShieldAlert aria-hidden className="h-3.5 w-3.5" />
              {t("top.disclaimer")}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {/* Accessibility: text size */}
            <div className="flex items-center gap-1.5" role="group" aria-label={t("top.textSize")}>
              <ZoomIn aria-hidden className="h-3.5 w-3.5 text-navy-100" />
              <span className="hidden text-navy-100 md:inline">{t("top.textSize")}:</span>
              {[0, 1, 2].map((scale) => (
                <button
                  key={scale}
                  type="button"
                  onClick={() => setTextScale(scale as 0 | 1 | 2)}
                  aria-pressed={textScale === scale}
                  className={cn(
                    "rounded border px-1.5 py-0.5 font-bold leading-none transition",
                    textScale === scale
                      ? "border-saffron-400 bg-saffron-500 text-navy-900"
                      : "border-navy-500 text-navy-100 hover:bg-navy-700",
                  )}
                  style={{ fontSize: `${0.72 + scale * 0.16}rem` }}
                  title={`${t("top.textSize")} ${scale === 0 ? "A" : scale === 1 ? "A+" : "A++"}`}
                >
                  A
                </button>
              ))}
            </div>

            {/* Language selector */}
            <div className="flex items-center gap-1.5">
              <Languages aria-hidden className="h-3.5 w-3.5 text-navy-100" />
              {(["en", "hi"] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  aria-pressed={lang === code}
                  className={cn(
                    "rounded border px-2 py-0.5 font-semibold transition",
                    lang === code
                      ? "border-white bg-white text-navy-800"
                      : "border-navy-500 text-navy-100 hover:bg-navy-700",
                  )}
                >
                  {code === "en" ? t("top.english") : t("top.hindi")}
                </button>
              ))}
            </div>

            <a href="tel:+917088686900" className="hidden items-center gap-1.5 font-semibold text-navy-100 underline-offset-4 hover:text-white lg:flex">
              <PhoneCall aria-hidden className="h-3.5 w-3.5" />
              {t("top.helpline")}
            </a>

            <Link href="/contact" className="font-semibold text-saffron-200 underline underline-offset-4 hover:text-white">
              {t("top.support")}
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="border-b border-ash-200 bg-white/98 backdrop-blur supports-[backdrop-filter]:bg-white/95">
        <div className="ys-container flex items-center justify-between gap-4 py-2.5">
          <Link href="/" className="flex shrink-0 items-center">
            <Logo className="w-[170px] sm:w-[195px] lg:w-[210px]" />
          </Link>

          <nav aria-label={t("nav.menu")} className="hidden items-center gap-0.5 xl:flex">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "rounded-t-sm border-b-2 border-transparent px-3 py-2 text-[0.92rem] font-semibold text-navy-800 transition hover:border-navy-300 hover:bg-navy-50",
                  isActive(item.href) && "border-saffron-500 bg-navy-50 text-navy-900",
                )}
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/eligibility" className="ys-btn-primary hidden text-[0.88rem] px-4 py-2.5 sm:inline-flex">
              {t("nav.cta")}
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="ys-btn-ghost !px-3 !py-2 xl:hidden"
            >
              {open ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
              <span className="sr-only">{open ? t("nav.close") : t("nav.menu")}</span>
            </button>
          </div>
        </div>

        {open ? (
          <div id="mobile-nav" className="border-t border-ash-200 bg-white xl:hidden">
            <nav aria-label={t("nav.menu")} className="ys-container grid gap-1 py-3">
              {primaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md border-b border-ash-100 px-2 py-3 text-[1rem] font-semibold text-navy-900 last:border-b-0 hover:bg-navy-50"
                >
                  {t(item.labelKey)}
                </Link>
              ))}
              <Link href="/eligibility" className="ys-btn-primary mt-2 w-full">
                {t("nav.cta")}
              </Link>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
