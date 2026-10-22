"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** D10 : pages qui ont déjà leur propre bandeau CTA (pas de double CTA). */
const pagesWithOwnCta = ["/", "/cv", "/projets"];

export function FooterCtaGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return pagesWithOwnCta.includes(pathname) ? null : children;
}
