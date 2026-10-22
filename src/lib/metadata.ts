import type { Metadata } from "next";
import { site } from "@/data/site";

type PageMetadataOptions = {
  /** Titre court : le modèle du layout ajoute « | Zeppélin Tiavy ». Absent = titre par défaut du site. */
  title?: string;
  description: string;
  /** Chemin de la page, pour l'URL canonique et og:url (résolus avec metadataBase = siteUrl). */
  path: string;
};

/**
 * Image de partage générée par src/app/opengraph-image.tsx et twitter-image.tsx.
 * À répéter explicitement : un `openGraph` défini par une page ne reprend pas l'image du dossier racine.
 */
const socialImage = {
  width: 1200,
  height: 630,
  alt: `${site.name}, ${site.jobTitle} à ${site.location}`,
};

/** D17 — Metadata d'une page : titre, description, canonical, Open Graph et Twitter Card. */
export function pageMetadata({ title, description, path }: PageMetadataOptions): Metadata {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | ${site.jobTitle}`;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: site.name,
      url: path,
      title: fullTitle,
      description,
      images: [{ url: "/opengraph-image", ...socialImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [{ url: "/twitter-image", ...socialImage }],
    },
  };
}
