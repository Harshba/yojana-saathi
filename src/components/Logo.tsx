import { cn } from "@/lib/cn";
import { publicAsset } from "@/lib/publicAsset";

export function Logo({ className }: { className?: string }) {
  return (
    <img
      src={publicAsset("images/Yojna%20Saathi%20Government%20Logo%20Banner%20%281%29.png")}
      alt="Yojana Saathi"
      width={2172}
      height={724}
      className={cn("block h-auto max-w-full object-contain", className)}
    />
  );
}
