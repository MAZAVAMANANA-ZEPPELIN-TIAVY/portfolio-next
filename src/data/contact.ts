import type { IconName } from "./icons";
import { contact, site } from "./site";

export const contactHero = {
  badge: "Contact",
  title: "Parlons de votre projet et de vos objectifs",
  description:
    "Décrivez votre activité, le problème à résoudre ou le site que vous souhaitez créer. Même avec une idée encore simple, nous pouvons définir une première direction claire.",
} as const;

export const contactAside = {
  eyebrow: "Coordonnées",
  title: "Échangeons simplement",
  description:
    "Vous pouvez utiliser le formulaire, m’écrire directement ou démarrer une conversation sur WhatsApp.",
  whatsapp: "Écrire sur WhatsApp",
  benefitsTitle: "Ce que vous obtenez",
  benefits: [
    "Un échange clair sur votre besoin",
    "Une proposition adaptée à votre activité",
    "Un suivi régulier pendant le projet",
  ],
} as const;

export const contactInfos: { icon: IconName; label: string; value: string; href?: string }[] = [
  { icon: "email", label: "Email", value: contact.email, href: contact.emailHref },
  { icon: "phone", label: "Téléphone", value: contact.phone, href: contact.phoneHref },
  { icon: "location", label: "Localisation", value: site.location },
];

export const projectTypes = [
  "Site vitrine",
  "Application web",
  "E-commerce",
  "Refonte d’un site",
  "Autre besoin",
] as const;

export const budgets = [
  "À définir ensemble",
  "Moins de 500 €",
  "500 € – 1 000 €",
  "1 000 € – 2 500 €",
  "Plus de 2 500 €",
] as const;

export const contactForm = {
  eyebrow: "Demande de projet",
  title: "Donnez-moi les informations essentielles",
  description:
    "Les champs concernant le type de projet et le budget permettent de préparer une réponse plus utile.",
  fields: {
    name: { label: "Nom complet", placeholder: "Votre nom" },
    email: { label: "Adresse email", placeholder: "vous@entreprise.com" },
    phone: { label: "Téléphone / WhatsApp", placeholder: "Optionnel" },
    projectType: { label: "Type de projet" },
    budget: { label: "Budget indicatif" },
    message: {
      label: "Votre besoin",
      placeholder:
        "Présentez votre activité, le résultat recherché, les fonctionnalités importantes et votre délai idéal...",
    },
  },
  selectPlaceholder: "Sélectionner",
  privacy: "Vos informations sont utilisées uniquement pour répondre à votre demande.",
  submit: "Envoyer la demande",
  sending: "Envoi en cours...",
  success: "Votre message a bien été envoyé. Merci !",
  error: "L’envoi a échoué. Vous pouvez aussi me contacter par email ou WhatsApp.",
} as const;
