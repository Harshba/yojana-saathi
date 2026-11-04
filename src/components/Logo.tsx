import Image from "next/image";
import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/images/Yojna%20Saathi%20Government%20Logo%20Banner%20%281%29.png"
      alt="Yojana Saathi"
      width={2172}
      height={724}
      className={cn("block h-auto max-w-full object-contain", className)}
    />
  );
}
