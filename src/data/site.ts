import type { IconName } from "./icons";

/** URL publique du site. Seul endroit où elle est définie (Q8) : URL Vercel provisoire. */
export const siteUrl = "https://zeppelin-tiavy.vercel.app";

export const site = {
  fullName: "MAZAVAMANANA Zeppélin Tiavy",
  name: "Zeppélin Tiavy",
  jobTitle: "Développeur web full-stack",
  location: "Antsiranana, Madagascar",
  country: "Madagascar",
  availability: "Disponible pour un projet",
  description:
    "Développeur web full-stack à Madagascar, je conçois des sites vitrines et applications modernes avec React, Laravel, Tailwind CSS et MySQL.",
} as const;

export const contact = {
  email: "zeppelintiavymazavamanana@gmail.com",
  emailHref: "mailto:zeppelintiavymazavamanana@gmail.com",
  phone: "+261 32 55 727 86",
  phoneHref: "tel:+261325572786",
  whatsappHref:
    "https://wa.me/261325572786?text=Bonjour%20Zepp%C3%A9lin%2C%20j%27aimerais%20discuter%20d%27un%20projet%20web.",
} as const;

export const cvPath = "/cv/MAZAVAMANANA_Zeppelin_Tiavy_CV.pdf";

export type SocialLink = {
  name: string;
  href: string;
  icon: IconName;
};

export const socials: SocialLink[] = [
  { name: "Facebook", icon: "facebook", href: "https://www.facebook.com/zeppelin.tiavy" },
  {
    name: "LinkedIn",
    icon: "linkedin",
    href: "https://www.linkedin.com/in/zepp%C3%A9lin-tiavy-mazavamanana-6b60302aa/",
  },
  { name: "GitHub", icon: "github", href: "https://github.com/MAZAVAMANANA-ZEPPELIN-TIAVY" },
];

export type NavItem = {
  name: string;
  path: "/" | "/cv" | "/projets" | "/contact";
};

export const navItems: NavItem[] = [
  { name: "Accueil", path: "/" },
  { name: "Curriculum vitæ", path: "/cv" },
  { name: "Projets", path: "/projets" },
  { name: "Contact", path: "/contact" },
];

/**
 * D17 — Titres courts (modèle « Titre | Zeppélin Tiavy ») et descriptions des pages.
 * Les pages projet utilisent le titre et la description courte du projet.
 */
export const seo = {
  home: { description: site.description },
  cv: {
    title: "Curriculum vitæ",
    description:
      "Parcours, expériences, compétences et langues de Zeppélin Tiavy, développeur web full-stack à Antsiranana, Madagascar.",
  },
  projects: {
    title: "Projets",
    description:
      "Applications de gestion, commerce en ligne, tourisme, location automobile et éducation : les réalisations web de Zeppélin Tiavy.",
  },
  contact: {
    title: "Contact",
    description:
      "Décrivez votre activité, le problème à résoudre ou le site que vous souhaitez créer : formulaire, email ou WhatsApp.",
  },
  notFound: { title: "Page introuvable" },
} as const;

/** Page 404 du site (D14). */
export const notFoundPage = {
  eyebrow: "Erreur 404",
  title: "Page introuvable",
  description: "La page que vous cherchez n’existe pas ou a été déplacée.",
  home: "Retour à l’accueil",
  projects: "Voir mes projets",
} as const;

/** Textes du header (bouton et menu mobile). */
export const header = {
  cvButton: "CV",
  cta: "Parlons de votre projet",
  mobileCv: "Télécharger le CV",
  mobileCta: "Demander un devis",
} as const;

/** Textes du footer. */
export const footer = {
  cta: {
    eyebrow: "Votre prochain projet",
    title: "Besoin d’un site professionnel qui inspire confiance à vos clients ?",
    description:
      "Présentez-moi votre idée, votre activité et vos objectifs. Nous définirons une solution claire, moderne et adaptée à votre budget.",
    primary: "Demander un devis",
    whatsapp: "WhatsApp",
  },
  about:
    "Je conçois des sites vitrines et applications web modernes avec React, Laravel, Tailwind CSS et MySQL, pour aider les entreprises à mieux présenter et gérer leur activité.",
  techs: ["React", "Laravel", "Tailwind CSS", "MySQL"],
  navigationTitle: "Navigation",
  servicesTitle: "Services",
  services: [
    "Site vitrine professionnel",
    "Application web métier",
    "Interface React responsive",
    "Backend Laravel et MySQL",
  ],
  cvLink: "Télécharger mon CV",
  contactTitle: "Contact",
  emailLabel: "Email",
  locationLabel: "Localisation",
  rights: "Tous droits réservés.",
  tagline: "Conçu pour être rapide, accessible et responsive.",
} as const;
