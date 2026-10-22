import type { IconName } from "./icons";

export type IconCardItem = {
  icon: IconName;
  title: string;
  description: string;
};

export const hero = {
  badge: "Disponible pour de nouveaux projets",
  title: "Je crée des expériences web qui",
  titleHighlight: "inspirent confiance.",
  description:
    "Développeur web full-stack à Madagascar, je conçois des sites vitrines et applications modernes avec React, Laravel, Tailwind CSS et MySQL pour aider les entreprises à présenter, vendre et gérer leur activité plus efficacement.",
  primaryCta: "Discuter de votre projet",
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
    { value: "Madagascar", label: "collaboration locale ou à distance" },
  ],
} as const;

export const servicesSection = {
  eyebrow: "Services",
  title: "Des solutions conçues pour servir votre activité",
  description:
    "Au-delà d’un beau design, chaque projet doit aider vos visiteurs à comprendre votre offre et vous contacter facilement.",
  linkLabel: "Parler de ce besoin",
} as const;

export const services: IconCardItem[] = [
  {
    icon: "laptopCode",
    title: "Sites vitrines professionnels",
    description:
      "Une présence en ligne claire et crédible pour présenter votre activité, vos services et générer des demandes de contact.",
  },
  {
    icon: "code",
    title: "Applications web métier",
    description:
      "Des outils sur mesure pour organiser vos données, automatiser vos tâches et améliorer votre fonctionnement quotidien.",
  },
  {
    icon: "database",
    title: "Backend et base de données",
    description:
      "Une architecture Laravel et MySQL structurée, sécurisée et facile à faire évoluer selon les besoins du projet.",
  },
];

export const processSection = {
  eyebrow: "Ma méthode",
  title: "Un processus simple, transparent et professionnel",
  description:
    "Vous savez ce qui est en cours, ce qui vient ensuite et comment chaque étape contribue à atteindre votre objectif.",
} as const;

export const processSteps = [
  {
    number: "01",
    title: "Comprendre",
    description: "Nous clarifions votre activité, vos utilisateurs et vos objectifs.",
  },
  {
    number: "02",
    title: "Concevoir",
    description: "Je prépare une structure simple, moderne et orientée conversion.",
  },
  {
    number: "03",
    title: "Développer",
    description: "Le projet est réalisé avec un code propre, responsive et maintenable.",
  },
  {
    number: "04",
    title: "Livrer",
    description: "Je vérifie l’affichage, les interactions et vous accompagne à la mise en ligne.",
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

export const commitmentsSection = {
  eyebrow: "Mes engagements",
  title: "Une réalisation propre, claire et adaptée à votre public",
  description:
    "Je privilégie les choix qui améliorent la compréhension, la confiance et la facilité d’utilisation.",
} as const;

export const commitments: IconCardItem[] = [
  {
    icon: "mobile",
    title: "Responsive par défaut",
    description: "Une expérience cohérente sur téléphone, tablette et ordinateur.",
  },
  {
    icon: "search",
    title: "Contenu bien structuré",
    description: "Des pages lisibles qui aident vos visiteurs à comprendre rapidement votre offre.",
  },
  {
    icon: "shield",
    title: "Base technique sérieuse",
    description: "Une structure claire, évolutive et pensée pour une utilisation professionnelle.",
  },
];

export const finalCta = {
  title: "Transformons votre idée en une solution web professionnelle",
  description:
    "Décrivez votre besoin, même brièvement. Je vous aiderai à clarifier la structure, les fonctionnalités utiles et la meilleure façon de présenter votre activité.",
  primary: "Demander un devis",
  secondary: "Envoyer un email",
} as const;
