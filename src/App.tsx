"use client";

import { useEffect } from "react";
import {
  BrowserRouter,
  MemoryRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { LanguageProvider, useLang } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { HomePage } from "@/components/home/HomePage";
import { AboutPage, AccessibilityPage, NotFoundPage, PrivacyPage } from "@/components/pages/InfoPages";
import {
  EligibilityPage,
  SchemeDetailPage,
  SchemesIndexPage,
} from "@/components/pages/ServicePages";
import { ContactPage, ImpactPage, SaathiPage } from "@/components/pages/EngagePages";

/* ------------------------------------------------------------------ *
 * Route table — plain React Router. Same tree is used by the Vite SPA
 * (src/main.tsx) and by the Next host shell, so there is one source of truth.
 * ------------------------------------------------------------------ */

const titles: { path: string; title: { en: string; hi: string } }[] = [
  { path: "/", title: { en: "Yojana Saathi — Har Haq, Har Ghar Tak", hi: "योजना साथी — हर हक़, हर घर तक" } },
  { path: "/about", title: { en: "About Us | Yojana Saathi", hi: "हमारे बारे में | योजना साथी" } },
  { path: "/schemes", title: { en: "Government Schemes | Yojana Saathi", hi: "सरकारी योजनाएँ | योजना साथी" } },
  { path: "/eligibility", title: { en: "Check Scheme Eligibility | Yojana Saathi", hi: "पात्रता जाँचें | योजना साथी" } },
  { path: "/become-a-saathi", title: { en: "Become a Saathi | Yojana Saathi", hi: "साथी बनें | योजना साथी" } },
  { path: "/impact", title: { en: "Our Impact | Yojana Saathi", hi: "हमारा प्रभाव | योजना साथी" } },
  { path: "/contact", title: { en: "Contact Us | Yojana Saathi", hi: "संपर्क करें | योजना साथी" } },
  { path: "/privacy", title: { en: "Privacy & Consent | Yojana Saathi", hi: "गोपनीयता एवं सहमति | योजना साथी" } },
  { path: "/accessibility", title: { en: "Accessibility Statement | Yojana Saathi", hi: "सुगम्यता विवरण | योजना साथी" } },
];

/** Scrolls to the top on navigation, and honours in-page hash targets. */
function RouteEffects() {
  const { pathname, hash } = useLocation();
  const { lang } = useLang();

  useEffect(() => {
    const matched = titles.find((entry) => (entry.path === "/" ? pathname === "/" : pathname.startsWith(entry.path)));
    document.title = matched ? matched.title[lang] : lang === "hi" ? "योजना साथी" : "Yojana Saathi";
  }, [pathname, lang]);

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        window.setTimeout(() => target.scrollIntoView({ block: "start", behavior: "smooth" }), 60);
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}

function AppRoutes() {
  return (
    <div className="flex min-h-screen flex-col">
      <RouteEffects />
      <Header />
      <main id="main-content" className="min-h-[60vh] flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/schemes" element={<SchemesIndexPage />} />
          <Route path="/schemes/:slug" element={<SchemeDetailPageRoute />} />
          <Route path="/eligibility" element={<EligibilityPage />} />
          <Route path="/become-a-saathi" element={<SaathiPage />} />
          <Route path="/impact" element={<ImpactPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/accessibility" element={<AccessibilityPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function SchemeDetailPageRoute() {
  return <SchemeDetailPage />;
}

/**
 * The app root.
 *
 * On the client it uses the History API (BrowserRouter) so the URLs stay clean
 * (/schemes/ayushman-bharat-pmjay). When the same tree is rendered on a server
 * (the Next.js host shell), a MemoryRouter is used at the requested path so the
 * first HTML already contains the right page and hydration matches.
 */
export function App({ initialPath = "/", basename = "" }: { initialPath?: string; basename?: string }) {
  const isBrowser = typeof window !== "undefined";

  const tree = (
    <LanguageProvider>
      <a
        href="#main-content"
        className="sr-only rounded-md bg-navy-800 px-4 py-2 font-semibold text-white focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100]"
      >
        Skip to main content
      </a>
      <AppRoutes />
    </LanguageProvider>
  );

  if (isBrowser) {
    return <BrowserRouter basename={basename}>{tree}</BrowserRouter>;
  }

  return (
    <MemoryRouter initialEntries={[initialPath]} basename="">
      {tree}
    </MemoryRouter>
  );
}

export default App;
