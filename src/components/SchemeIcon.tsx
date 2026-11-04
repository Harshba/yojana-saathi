import {
  Briefcase,
  GraduationCap,
  HandCoins,
  HeartPulse,
  House,
  ShieldCheck,
  HardHat,
  Wheat,
  type LucideIcon,
} from "lucide-react";
import type { Scheme } from "@/data/schemes";

const icons: Record<Scheme["icon"], LucideIcon> = {
  HandCoins,
  HeartPulse,
  HardHat,
  Briefcase,
  ShieldCheck,
  GraduationCap,
  House,
  Wheat,
};

export function SchemeIcon({ name, className = "h-6 w-6" }: { name: Scheme["icon"]; className?: string }) {
  const Icon = icons[name];
  return <Icon aria-hidden className={className} strokeWidth={1.75} />;
}
