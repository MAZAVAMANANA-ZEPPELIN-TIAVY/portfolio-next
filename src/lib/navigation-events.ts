/**
 * Événement émis par `src/instrumentation-client.ts` au début d'une navigation App Router,
 * écouté par <NavigationProgress />. Fichier séparé pour ne pas charger NProgress dans l'instrumentation.
 */
export const NAVIGATION_START_EVENT = "portfolio:navigation-start";

export type NavigationStartDetail = { pathname: string };
