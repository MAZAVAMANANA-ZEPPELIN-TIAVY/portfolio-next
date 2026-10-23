export const hero = {
  badge: "Ouvert aux opportunités professionnelles",
  title: "Je crée des expériences web qui",
  titleHighlight: "inspirent confiance.",
  description:
    "Développeur web full-stack à Madagascar, je conçois des sites et applications web modernes avec React, Laravel, Tailwind CSS et MySQL. Ce portfolio présente mon parcours et les projets que j’ai réalisés.",
  primaryCta: "Me contacter",
  secondaryCta: "Voir mes réalisations",
  cvCta: "Télécharger mon CV",
  stackLetters: ["R", "L", "T", "M"],
  stackText:
    "React, Laravel, Tailwind CSS et MySQL pour construire des solutions rapides, lisibles et évolutives.",
  photo: {
    src: "/images/couverture/zepdev.jpg",
    alt: "Zeppélin Tiavy, développeur web",
    width: 1496,
    height: 1645,
  },
  photoCaptionName: "MAZAVAMANANA Zeppélin Tiavy",
  photoCaptionTitle: "Développeur web full-stack",
  projectsBadgeLabel: "projets présentés",
  devicesBadge: "Mobile • Tablette • Desktop",
} as const;

/** Bande de stats sous le hero ; la 1re valeur est calculée (nb de projets réels + « + »). */
export const stats = {
  realizedLabel: "projets réels réalisés",
  others: [
    { value: "Full-stack", label: "frontend, backend et base de données" },
    { value: "Madagascar", label: "Basé à Antsiranana" },
  ],
} as const;

export const processSection = {
  eyebrow: "Ma méthode",
  title: "Une démarche simple et structurée",
  description: "Chaque projet suit les mêmes étapes, de la compréhension du besoin à la mise en ligne.",
} as const;

export const processSteps = [
  {
    number: "01",
    title: "Comprendre",
    description: "Je clarifie le contexte, les utilisateurs et les objectifs du projet.",
  },
  {
    number: "02",
    title: "Concevoir",
    description: "Je prépare une structure simple, moderne et lisible.",
  },
  {
    number: "03",
    title: "Développer",
    description: "Le projet est réalisé avec un code propre, responsive et maintenable.",
  },
  {
    number: "04",
    title: "Mettre en ligne",
    description: "Je vérifie l’affichage et les interactions, puis je prépare la mise en ligne.",
  },
];

export const projectsSection = {
  eyebrow: "Sélection",
  title: "Quelques projets récents",
  description:
    "Des réalisations et démonstrations qui présentent ma façon de concevoir des interfaces et applications utiles.",
  allLink: "Voir tous les projets",
  cardLink: "Découvrir le projet",
  demoBadge: "Démonstration",
} as const;

/** Bandeau de contact en fin d'accueil (uniquement sur cette page). */
export const contactBand = {
  // Espace insécable avant « ? » : le point d'interrogation ne passe jamais seul à la ligne.
  title: "Envie d’échanger ?",
  description:
    "Une opportunité professionnelle, une collaboration ou une question sur mes projets : écrivez-moi ou téléchargez mon CV pour découvrir mon parcours.",
  contact: "Me contacter",
  cv: "Télécharger mon CV",
} as const;
