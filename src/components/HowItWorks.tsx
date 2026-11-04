"use client";

import { Link } from "@/components/ui/AppLink";
import { ArrowRight, ClipboardCheck, FileSearch, MessagesSquare, Send, ShieldX } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";

const steps = [
  {
    icon: FileSearch,
    titleKey: "how.step1",
    bodyKey: "how.step1Body",
    tag: "₹0",
  },
  { icon: ClipboardCheck, titleKey: "how.step2", bodyKey: "how.step2Body", tag: "1 file" },
  { icon: Send, titleKey: "how.step3", bodyKey: "how.step3Body", tag: "ack. no." },
  { icon: MessagesSquare, titleKey: "how.step4", bodyKey: "how.step4Body", tag: "15 days" },
  { icon: ShieldX, titleKey: "how.step5", bodyKey: "how.step5Body", tag: "appeal" },
];

export function HowItWorks() {
  const { t } = useLang();
  return (
    <Section id="how-it-works" tone="ash" labelledBy="how-title">
      <SectionHeading
        id="how-title"
        eyebrow={t("how.eyebrow")}
        title={t("how.title")}
        body={t("how.body")}
        action={
          <Link href="/eligibility" className="ys-btn-primary">
            {t("how.ctaEligibility")}
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        }
      />

      <ol className="relative grid gap-5 lg:grid-cols-5 lg:gap-4">
        <span
          aria-hidden
          className="absolute top-[2.55rem] right-6 left-6 hidden h-0.5 bg-ash-300 lg:block"
          style={{ backgroundImage: "linear-gradient(90deg,#163557 0%,#163557 20%,#cbd3de 20%,#cbd3de 100%)" }}
        />
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <Reveal as="li" key={step.titleKey} delay={index * 0.08} className="relative">
              <div className="flex h-full flex-col rounded-md border border-ash-200 bg-white p-5 shadow-[0_1px_2px_rgba(16,41,67,0.06)]">
                <div className="mb-3.5 flex items-center justify-between gap-2">
                  <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-navy-700 bg-navy-700 text-white">
                    <Icon aria-hidden className="h-5 w-5" strokeWidth={1.9} />
                  </span>
                  <span className="text-[1.65rem] leading-none font-bold text-ash-200">{index + 1}</span>
                </div>
                <h3 className="text-[1rem] leading-snug font-bold text-navy-900">{t(step.titleKey)}</h3>
                <p className="mt-2 text-[0.88rem] leading-6 text-ash-700">{t(step.bodyKey)}</p>
                <p className="mt-3.5 inline-flex w-fit rounded-sm bg-ash-100 px-2 py-1 font-mono text-[0.74rem] font-bold tracking-wide text-navy-700 uppercase">
                  {step.tag}
                </p>
              </div>
            </Reveal>
          );
        })}
      </ol>

      <p className="mt-6 flex flex-wrap items-center gap-2 rounded-md border border-navy-200 bg-white p-4 text-[0.9rem] leading-6 text-navy-800">
        <ShieldX aria-hidden className="h-4.5 w-4.5 shrink-0 text-saffron-600" />
        {t("schemes.disclaimer")}
      </p>
    </Section>
  );
}
