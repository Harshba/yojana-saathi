import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Yojana Saathi — Har Haq, Har Ghar Tak",
    template: "%s | Yojana Saathi",
  },
  description:
    "Yojana Saathi is an independent social-impact initiative helping rural families in Bharauli village, Bhojpur district, Bihar discover, apply for and receive the government welfare benefits they are entitled to.",
  keywords: [
    "Yojana Saathi",
    "government schemes Bihar",
    "Ayushman Bharat",
    "e-Shram",
    "MGNREGA job card",
    "PMSBY",
    "PMAY Gramin",
    "ration card Bihar",
    "social security pension Bihar",
    "rural welfare assistance",
  ],
  openGraph: {
    title: "Yojana Saathi — Har Haq, Har Ghar Tak",
    description:
      "Trained local women — Saathis — help rural families find eligible schemes, prepare documents, submit applications and resolve rejections.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#163557",
};

/**
 * The document shell. Header, footer, language provider and routing now live in the
 * React application (src/App.tsx), so this file only owns <html>/<body> and asset links.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="min-h-screen bg-white font-sans text-navy-900">{children}</body>
    </html>
  );
}
