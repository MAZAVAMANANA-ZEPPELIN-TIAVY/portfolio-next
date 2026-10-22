/** Capture d'écran avec ses dimensions réelles (next/image). */
export type ProjectImage = { src: string; width: number; height: number };

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  client: string;
  role: string;
  status: string;
  featured: boolean;
  /** Projet de démonstration (badge « Démonstration »), absent = projet réel (Q6). */
  isDemo?: boolean;
  shortDescription: string;
  description: string;
  image: string;
  liveLink?: string;
  /** Affiché seulement s'il est rempli (Q6). */
  githubLink?: string;
  stack: string[];
  highlights: string[];
  images: ProjectImage[];
};

export const projects: Project[] = [
  {
    slug: "obayamadatour",
    title: "ObayaMadaTour",
    category: "Site touristique",
    year: "2025",
    client: "ObayaMadaTour",
    role: "Conception et développement",
    status: "Projet réalisé",
    featured: true,
    shortDescription:
      "Un site touristique immersif pour présenter les destinations, circuits et services de voyage de manière claire et attractive.",
    description:
      "Site touristique moderne conçu pour mettre en valeur les destinations, les circuits, les offres et les services d’ObayaMadaTour. Le design a été pensé pour inspirer confiance, faciliter la découverte des offres et offrir une navigation fluide sur mobile comme sur ordinateur.",
    image: "/images/projets/obayaMada/c1.webp",
    liveLink: "https://obayamadatour.msi2025a.net/",
    stack: ["Laravel", "React", "Tailwind CSS"],
    highlights: [
      "Présentation immersive des destinations",
      "Navigation responsive et intuitive",
      "Mise en valeur des offres touristiques",
    ],
    images: [
      { src: "/images/projets/obayaMada/c1.webp", width: 1338, height: 631 },
      { src: "/images/projets/obayaMada/c2.webp", width: 1329, height: 631 },
      { src: "/images/projets/obayaMada/c3.webp", width: 1336, height: 633 },
      { src: "/images/projets/obayaMada/c4.webp", width: 1337, height: 637 },
      { src: "/images/projets/obayaMada/c5.webp", width: 1332, height: 635 },
      { src: "/images/projets/obayaMada/c6.webp", width: 1329, height: 624 },
    ],
  },
  {
    slug: "maboutique",
    title: "MaBoutique",
    category: "E-commerce",
    year: "2025",
    client: "Boutique de téléphones",
    role: "Conception et développement full-stack",
    status: "Projet réalisé",
    featured: true,
    shortDescription:
      "Une application de vente de téléphones avec catalogue, recherche, panier, réservation client et suivi du stock.",
    description:
      "MaBoutique est une application de commerce électronique conçue pour une boutique de téléphones. Elle permet aux visiteurs de consulter les appareils disponibles, rechercher un produit, afficher ses détails, constituer un panier et envoyer une réservation. L’interface met également en avant la disponibilité et le niveau de stock de chaque téléphone.",
    image: "/images/projets/maboutique/c1.webp",
    liveLink: "https://tsarak.msi2025a.net/",
    stack: ["Laravel", "React", "Tailwind CSS", "MySQL"],
    highlights: [
      "Catalogue de téléphones avec recherche",
      "Fiches produits avec prix et disponibilité",
      "Panier et réservation avec informations client",
      "Gestion et suivi du stock",
    ],
    images: [
      { src: "/images/projets/maboutique/c1.webp", width: 1344, height: 633 },
      { src: "/images/projets/maboutique/c2.webp", width: 1354, height: 621 },
      { src: "/images/projets/maboutique/c3.webp", width: 1352, height: 637 },
      { src: "/images/projets/maboutique/c4.webp", width: 1346, height: 636 },
    ],
  },
  {
    slug: "autoloc",
    title: "AutoLoc",
    category: "Location de voitures",
    year: "2025",
    client: "AutoLoc Nosy Be",
    role: "Conception et développement full-stack",
    status: "Projet réalisé",
    featured: true,
    shortDescription:
      "Une plateforme moderne de location de voitures permettant de découvrir les véhicules disponibles et de préparer une réservation.",
    description:
      "AutoLoc est une plateforme de location de voitures destinée aux clients de Nosy Be. Le site présente les véhicules disponibles, leurs catégories et leurs tarifs, tout en mettant en avant la fiabilité du service. Un parcours clair permet au visiteur de consulter l’offre, demander des informations et préparer rapidement sa réservation.",
    image: "/images/projets/autoloc/c1.webp",
    liveLink: "https://location-des-voitures.msi2025a.net/",
    stack: ["Laravel", "React", "Tailwind CSS", "MySQL"],
    highlights: [
      "Catalogue responsive des véhicules",
      "Présentation des tarifs et disponibilités",
      "Parcours de réservation clair",
      "Formulaire de contact intégré",
    ],
    images: [
      { src: "/images/projets/autoloc/c1.webp", width: 1341, height: 628 },
      { src: "/images/projets/autoloc/c2.webp", width: 1341, height: 623 },
      { src: "/images/projets/autoloc/c3.webp", width: 1298, height: 608 },
      { src: "/images/projets/autoloc/c4.webp", width: 1321, height: 641 },
    ],
  },
  {
    slug: "erp-scolaire-ape",
    title: "ERP scolaire A.P.E.",
    category: "Plateforme éducative",
    year: "2025",
    client: "Lycée privé A.P.E.",
    role: "Architecture et développement full-stack",
    status: "Projet réalisé",
    featured: true,
    shortDescription:
      "Une plateforme de gestion scolaire centralisant les élèves, le suivi pédagogique, les présences et l’administration.",
    description:
      "L’ERP scolaire A.P.E. est une plateforme conçue pour moderniser la gestion du lycée privé A.P.E. Elle centralise les principales opérations administratives et pédagogiques : dossiers des élèves, classes, notes, présences, enseignants, statistiques et accès sécurisés selon les profils utilisateurs.",
    image: "/images/projets/ape/c1.webp",
    liveLink: "https://ape.msi2025a.net/",
    stack: ["Laravel", "React", "Tailwind CSS", "MySQL"],
    highlights: [
      "Gestion centralisée des élèves et des classes",
      "Suivi pédagogique, notes et présences",
      "Rapports et statistiques de l’établissement",
      "Authentification et accès sécurisés",
    ],
    images: [
      { src: "/images/projets/ape/c1.webp", width: 1297, height: 638 },
      { src: "/images/projets/ape/c2.webp", width: 1271, height: 638 },
      { src: "/images/projets/ape/c3.webp", width: 1308, height: 635 },
      { src: "/images/projets/ape/c4.webp", width: 1295, height: 634 },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Les 3 premiers projets mis en avant (section « Quelques projets récents » de l'accueil). */
export const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);

/** Nombre de projets réels (hors démonstrations). */
export const realizedProjectsCount = projects.filter((project) => !project.isDemo).length;

/** Catégories uniques, dans l'ordre d'apparition. */
export const projectCategories = [...new Set(projects.map((project) => project.category))];

/** Projets précédent et suivant (en boucle), pour la navigation en bas de page (D12). */
export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  const count = projects.length;
  return {
    previous: projects[(index - 1 + count) % count]!,
    next: projects[(index + 1) % count]!,
  };
}

/** Textes de la page /projets/[slug]. */
export const projectDetail = {
  demoBadge: "Projet démonstration",
  allProjects: "Tous les projets",
  viewSite: "Voir le site",
  sourceCode: "Code source",
  info: {
    client: "Client / type",
    year: "Année",
    role: "Mon rôle",
    gallery: "Galerie",
    capture: "capture",
    captures: "captures",
  },
  highlightsEyebrow: "Points clés",
  highlightsTitle: "Ce que présente ce projet",
  similarTitle: "Vous avez un besoin similaire ?",
  similarText: "Je peux adapter cette logique à votre activité, vos utilisateurs et vos objectifs.",
  similarLink: "Discuter du projet",
  galleryEyebrow: "Aperçu",
  galleryTitle: "Captures du projet",
  galleryHint: "Cliquez sur une image pour l’agrandir",
  captureLabel: "Capture",
  galleryEmpty: "Les captures seront ajoutées prochainement.",
  lightbox: {
    label: "Aperçu de",
    close: "Fermer l’aperçu",
    previous: "Image précédente",
    next: "Image suivante",
    thumbnails: "Miniatures",
  },
  previousProject: "Projet précédent",
  nextProject: "Projet suivant",
  notFound: {
    eyebrow: "Erreur 404",
    title: "Projet introuvable",
    text: "Le projet demandé n’existe pas ou n’est plus disponible.",
    back: "Retour aux projets",
  },
} as const;

/** Valeur d'URL d'une catégorie (`?categorie=site-touristique`). */
export function categorySlug(category: string) {
  return category
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Textes de la page /projets. */
export const projectsPage = {
  badge: "Réalisations",
  title: "Des solutions web conçues pour des besoins concrets",
  description:
    "Applications de gestion, commerce en ligne, tourisme, location automobile et éducation : chaque projet associe une interface moderne, une expérience responsive et une logique métier adaptée.",
  stats: {
    projects: "projets réalisés",
    categories: "domaines couverts",
    featured: "projets mis en avant",
  },
  filterTitle: "Filtrer les projets",
  filterDescription: "Sélectionnez une catégorie pour afficher les réalisations correspondantes.",
  allCategories: "Tous",
  viewProject: "Voir le projet",
  liveSite: "Site en ligne",
  similarProject: "Projet similaire",
  cta: {
    eyebrow: "Un besoin particulier ?",
    title: "Transformons votre besoin en une solution web professionnelle",
    description:
      "Site vitrine, application métier, plateforme de réservation, e-commerce ou système de gestion : discutons de votre projet.",
    button: "Présenter mon projet",
  },
} as const;
