import type { IconName } from "./icons";
import { contact, site } from "./site";

export const contactHero = {
  badge: "Contact",
  title: "Échangeons sur une opportunité ou une collaboration",
  description:
    "Une opportunité professionnelle, une proposition de collaboration ou une question sur mon parcours et mes projets : écrivez-moi via le formulaire, par email ou sur WhatsApp.",
} as const;

export const contactAside = {
  eyebrow: "Coordonnées",
  title: "Échangeons simplement",
  description:
    "Vous pouvez utiliser le formulaire, m’écrire directement ou démarrer une conversation sur WhatsApp.",
  whatsapp: "Écrire sur WhatsApp",
} as const;

/** Moyens de contact ; `external` ouvre le lien dans un nouvel onglet. */
export const contactInfos: { icon: IconName; label: string; value: string; href?: string; external?: boolean }[] = [
  { icon: "email", label: "Email", value: contact.email, href: contact.emailHref },
  { icon: "phone", label: "Téléphone", value: contact.phone, href: contact.phoneHref },
  { icon: "whatsapp", label: "WhatsApp", value: contact.whatsapp, href: contact.whatsappHref, external: true },
  { icon: "location", label: "Localisation", value: site.location },
];

export const subjects = ["Opportunité professionnelle", "Collaboration", "Question", "Autre"] as const;

export const contactForm = {
  eyebrow: "Formulaire de contact",
  title: "Envoyez-moi un message",
  description: "Précisez l’objet de votre message pour que je puisse vous répondre au mieux.",
  fields: {
    name: { label: "Nom complet", placeholder: "Votre nom" },
    email: { label: "Adresse email", placeholder: "vous@exemple.com" },
    phone: { label: "Téléphone / WhatsApp", placeholder: "Optionnel" },
    subject: { label: "Objet" },
    message: {
      label: "Votre message",
      placeholder: "Présentez-vous en quelques mots et précisez votre demande...",
    },
  },
  selectPlaceholder: "Sélectionner",
  privacy: "Vos informations sont utilisées uniquement pour répondre à votre message.",
  submit: "Envoyer le message",
  sending: "Envoi en cours...",
  success: "Votre message a bien été envoyé. Merci !",
  error: "L’envoi a échoué. Vous pouvez aussi me contacter par email ou WhatsApp.",
  invalid: "Certains champs sont à corriger avant l’envoi.",
  honeypotLabel: "Ne pas remplir ce champ",
  validation: {
    name: "Indiquez votre nom (2 caractères minimum).",
    email: "Indiquez une adresse email valide.",
    phone: "Ce numéro ne semble pas valide.",
    subject: "Choisissez l’objet de votre message.",
    message: "Écrivez votre message en quelques mots (10 caractères minimum).",
    tooLong: "Ce texte est trop long.",
  },
} as const;
