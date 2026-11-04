"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";
import { cn } from "@/lib/cn";

type AppLinkProps = {
  /** Router path ("/schemes"), hash ("#saathi-apply") or absolute URL. */
  href: string;
  children: ReactNode;
  className?: string;
  title?: string;
  "aria-label"?: string;
  "aria-current"?: "page" | undefined;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  rel?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  prefetch?: never;
};

/**
 * Single link component for the whole React app.
 *
 * - Internal paths go through React Router (client-side navigation).
 * - Hash links and absolute URLs fall back to plain anchors, so in-page jump
 *   links and official government portals keep their normal browser behaviour.
 */
export function Link({ href, children, className, ...rest }: AppLinkProps) {
  const isHash = href.startsWith("#");
  const isExternal = /^(https?:|mailto:|tel:)/.test(href);

  if (isHash || isExternal) {
    return (
      <a
        href={href}
        className={cn(className)}
        target={rest.target ?? (isExternal ? "_blank" : undefined)}
        rel={rest.rel ?? (isExternal ? "noopener noreferrer" : undefined)}
        title={rest.title}
        aria-label={rest["aria-label"]}
        aria-current={rest["aria-current"]}
        onClick={rest.onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <RouterLink
      to={href}
      className={cn(className)}
      title={rest.title}
      aria-label={rest["aria-label"]}
      aria-current={rest["aria-current"]}
      onClick={rest.onClick}
    >
      {children}
    </RouterLink>
  );
}
