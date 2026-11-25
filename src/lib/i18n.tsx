"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { en } from "./dictionary-en";
import { hi } from "./dictionary-hi";

export type Lang = "en" | "hi";
export type Theme = "light" | "dark";

/** Bilingual value used by data files (schemes, pilot phases, stories). */
export type Loc = { en: string; hi: string };

export type LocalisedList = Loc[];

const dictionaries: Record<Lang, Record<string, string>> = { en, hi };

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  /** Look up a UI string by flat key. Falls back to English, then to the key. */
  t: (key: string) => string;
  /** Pick the right language out of a bilingual data value. */
  pick: (value: Loc | string | undefined) => string;
  textScale: 0 | 1 | 2;
  setTextScale: (scale: 0 | 1 | 2) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [textScale, setTextScaleState] = useState<0 | 1 | 2>(0);
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const storedLang = window.localStorage.getItem("ys-lang");
    if (storedLang === "en" || storedLang === "hi") setLangState(storedLang);
    const storedScale = Number(window.localStorage.getItem("ys-text-scale"));
    if (storedScale === 1 || storedScale === 2) setTextScaleState(storedScale);
    const storedTheme = window.localStorage.getItem("ys-theme");
    if (storedTheme === "light" || storedTheme === "dark") setThemeState(storedTheme);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dataset.lang = lang;
    root.dataset.textScale = String(textScale);
    root.style.setProperty("--ys-text-scale", `${100 + textScale * 8}%`);
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
  }, [lang, textScale, theme]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem("ys-lang", next);
    } catch {
      /* storage blocked — language still switches for this visit */
    }
  }, []);

  const setTextScale = useCallback((next: 0 | 1 | 2) => {
    setTextScaleState(next);
    try {
      window.localStorage.setItem("ys-text-scale", String(next));
    } catch {
      /* ignore */
    }
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    try {
      window.localStorage.setItem("ys-theme", next);
    } catch {
      /* storage blocked — theme still switches for this visit */
    }
  }, []);

  const value = useMemo<LanguageContextValue>(() => {
    const t = (key: string) => dictionaries[lang][key] ?? en[key] ?? key;
    return {
      lang,
      setLang,
      toggleLang: () => setLang(lang === "en" ? "hi" : "en"),
      t,
      pick: (v) => (typeof v === "string" ? v : v ? (lang === "hi" ? v.hi : v.en) : ""),
      textScale,
      setTextScale,
      theme,
      setTheme,
    };
  }, [lang, setLang, textScale, setTextScale, theme, setTheme]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}
