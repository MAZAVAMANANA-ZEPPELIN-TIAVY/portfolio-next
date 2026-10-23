import type { IconName } from "./icons";

/** URL publique du site. Seul endroit où elle est définie (Q8) : URL Vercel provisoire. */
export const siteUrl = "https://zeppelin-tiavy.vercel.app";

export const site = {
  fullName: "MAZAVAMANANA Zeppélin Tiavy",
  name: "Zeppélin Tiavy",
  jobTitle: "Développeur web full-stack",
  location: "Antsiranana, Madagascar",
  country: "Madagascar",
  availability: "Ouvert aux opportunités",
  description:
    "Développeur web full-stack à Madagascar, je conçois des sites et applications web modernes avec React, Laravel, Tailwind CSS et MySQL.",
} as const;

/** Numéro de téléphone et WhatsApp (format international, sans « + » ni espaces). Seul endroit où il est défini. */
const phoneNumber = "261325572786";
const phoneDisplay = "+261 32 55 727 86";
const whatsappMessage = "Bonjour Zeppélin, je vous contacte depuis votre portfolio.";

export const contact = {
  email: "zeppelintiavymazavamanana@gmail.com",
  emailHref: "mailto:zeppelintiavymazavamanana@gmail.com",
  phone: phoneDisplay,
  phoneHref: `tel:+${phoneNumber}`,
  whatsapp: phoneDisplay,
  whatsappHref: `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`,
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
      "Contacter Zeppélin Tiavy, développeur web full-stack, pour une opportunité professionnelle, une collaboration ou une question : formulaire, email ou WhatsApp.",
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
  cta: "Me contacter",
  mobileCv: "Télécharger le CV",
  mobileCta: "Me contacter",
} as const;

/** Textes du footer. */
export const footer = {
  about:
    "Je conçois des sites et applications web modernes avec React, Laravel, Tailwind CSS et MySQL. Ce portfolio présente mon parcours et mes projets.",
  techs: ["React", "Laravel", "Tailwind CSS", "MySQL"],
  navigationTitle: "Navigation",
  cvLink: "Télécharger mon CV",
  contactTitle: "Contact",
  emailLabel: "Email",
  whatsappLabel: "WhatsApp",
  locationLabel: "Localisation",
  rights: "Tous droits réservés.",
  tagline: "Conçu pour être rapide, accessible et responsive.",
} as const;
