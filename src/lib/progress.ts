import NProgress from "nprogress";

/**
 * Barre de chargement en haut de page (NProgress, comme dans l'original) : sans le cercle de chargement,
 * et sans les `role="bar"` / `role="spinner"` du modèle par défaut (rôles ARIA invalides).
 * `barSelector` doit suivre le modèle : par défaut NProgress cherche `[role="bar"]` et plante sans lui.
 * Styles dans globals.css (vert #22c55e, 4 px).
 */
NProgress.configure({
  showSpinner: false,
  template: '<div class="bar"><div class="peg"></div></div>',
  barSelector: ".bar",
});

// La barre est décorative : une erreur ici ne doit jamais interrompre une navigation ou un envoi.

export function startProgress() {
  try {
    NProgress.start();
    // Purement visuelle : les lecteurs d'écran l'ignorent (Next annonce la nouvelle page, le bouton
    // du formulaire affiche « Envoi en cours... »). Elle ne reçoit ni le focus ni les clics (pointer-events: none).
    document.getElementById("nprogress")?.setAttribute("aria-hidden", "true");
  } catch (error) {
    console.error("Barre de chargement :", error);
  }
}

export function doneProgress() {
  try {
    NProgress.done();
  } catch (error) {
    console.error("Barre de chargement :", error);
  }
}
