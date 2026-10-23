"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { NAVIGATION_START_EVENT, type NavigationStartDetail } from "@/lib/navigation-events";
import { doneProgress, startProgress } from "@/lib/progress";

/** Sécurité : si une navigation n'aboutit jamais (annulée…), la barre se termine quand même. */
const FALLBACK_MS = 10_000;

/** Barre de chargement des changements de page : démarre au signal de instrumentation-client.ts, finit quand la page change. */
export function NavigationProgress() {
  const pathname = usePathname();
  // Page affichée par l'application. Pour précédent/suivant, `location` est déjà à jour au début de la
  // navigation : la comparaison se fait donc avec cette valeur, pas avec `window.location`.
  const currentPathname = useRef(pathname);
  const fallback = useRef<number | undefined>(undefined);

  useEffect(() => {
    currentPathname.current = pathname;
    window.clearTimeout(fallback.current);
    doneProgress();
  }, [pathname]);

  useEffect(() => {
    const onStart = (event: Event) => {
      const { pathname: target } = (event as CustomEvent<NavigationStartDetail>).detail;
      // Même page (filtre ?categorie=, lien vers la page actuelle) : pas de barre.
      if (target === currentPathname.current) return;
      startProgress();
      window.clearTimeout(fallback.current);
      fallback.current = window.setTimeout(doneProgress, FALLBACK_MS);
    };
    window.addEventListener(NAVIGATION_START_EVENT, onStart);
    return () => {
      window.removeEventListener(NAVIGATION_START_EVENT, onStart);
      window.clearTimeout(fallback.current);
    };
  }, []);

  return null;
}
