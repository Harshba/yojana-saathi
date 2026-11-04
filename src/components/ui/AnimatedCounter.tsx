"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Government-portal style statistic: a large number that counts up once it
 * scrolls into view. Falls back to the static value when motion is reduced.
 */
export function AnimatedCounter({
  value,
  suffix,
  prefix,
  decimals = 0,
  className,
  label,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
  label?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useRef<boolean | null>(null);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { damping: 28, stiffness: 90 });
  const [display, setDisplay] = useState("0");

  if (reduced.current === null) {
    reduced.current =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
  }

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    if (reduced.current) {
      setDisplay(formatNumber(value, decimals));
      return;
    }
    const unsubscribe = spring.on("change", (latest) => {
      setDisplay(formatNumber(latest, decimals));
    });
    return unsubscribe;
  }, [spring, value, decimals]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)} aria-label={label ? `${label}: ${prefix ?? ""}${formatNumber(value, decimals)}${suffix ?? ""}` : undefined}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

function formatNumber(n: number, decimals: number) {
  return n.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    maximumSignificantDigits: 8,
  });
}
