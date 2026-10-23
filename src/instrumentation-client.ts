import { NAVIGATION_START_EVENT, type NavigationStartDetail } from "@/lib/navigation-events";

/**
 * Début d'une navigation App Router (liens, router.push/replace, précédent/suivant) : signale l'adresse cible
 * à <NavigationProgress />, qui décide d'afficher la barre (seulement si la page change).
 */
export function onRouterTransitionStart(url: string) {
  const detail: NavigationStartDetail = { pathname: new URL(url, window.location.href).pathname };
  window.dispatchEvent(new CustomEvent(NAVIGATION_START_EVENT, { detail }));
}
