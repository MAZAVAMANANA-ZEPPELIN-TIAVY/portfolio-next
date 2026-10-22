# Portfolio — Zeppélin Tiavy

Site portfolio de **MAZAVAMANANA Zeppélin Tiavy**, développeur web full-stack à Antsiranana (Madagascar) : accueil, CV, projets avec galerie, formulaire de contact.

Version Next.js du portfolio d'origine (Laravel + React, dossier `portfolio-zep/`), sans backend PHP ni base de données.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, pages statiques, `cacheComponents`), React 19, TypeScript
- Tailwind CSS 4, police Instrument Sans (`next/font`)
- Icônes : `react-icons`
- Formulaire : Server Action + [Resend](https://resend.com) + validation [zod](https://zod.dev)
- Hébergement prévu : [Vercel](https://vercel.com)

## Installation

Prérequis : Node.js 20.9 ou plus récent, npm.

```bash
npm install
cp .env.example .env.local   # puis renseigner la clé Resend (voir plus bas)
npm run dev                  # http://localhost:3000
```

| Commande | Rôle |
|---|---|
| `npm run dev` | serveur de développement |
| `npm run build` | build de production (vérifie aussi les types) |
| `npm run start` | lance le build de production en local |
| `npm run lint` | ESLint |

## Variables d'environnement

Utilisées uniquement côté serveur, par le formulaire de contact (`src/app/contact/actions.ts`). Modèle : `.env.example`.

| Variable | Valeur | Rôle |
|---|---|---|
| `RESEND_API_KEY` | `re_…` | clé API Resend (permission « Sending access ») |
| `CONTACT_TO_EMAIL` | `zeppelintiavymazavamanana@gmail.com` | adresse qui reçoit les demandes |
| `CONTACT_FROM_EMAIL` | `onboarding@resend.dev` | expéditeur |

Sans domaine vérifié chez Resend, l'expéditeur doit rester `onboarding@resend.dev`, et Resend n'accepte alors d'envoyer **qu'à l'adresse e-mail du compte Resend** : créez le compte Resend avec l'adresse de `CONTACT_TO_EMAIL`. Avec un domaine vérifié plus tard, remplacez `CONTACT_FROM_EMAIL` par une adresse de ce domaine (ex. `contact@mondomaine.com`).

Si une variable manque, le formulaire affiche le message d'erreur (« L’envoi a échoué… ») et l'erreur est écrite dans les logs du serveur.

## Modifier le contenu

Tous les textes, liens et projets sont dans `src/data/` ; les pages ne contiennent que la mise en page.

| Fichier | Contenu |
|---|---|
| `site.ts` | **`siteUrl`**, identité, email, téléphone, WhatsApp, réseaux, chemin du CV, navigation, header, footer, textes SEO, page 404 |
| `projects.ts` | les projets (slug, textes, stack, captures avec leurs dimensions, liens) et les textes des pages projets |
| `home.ts` | page d'accueil |
| `cv.ts` | page CV |
| `contact.ts` | page contact, options du formulaire, messages de validation |
| `icons.ts` | liste des noms d'icônes autorisés |

- **Icônes** : les données utilisent des noms (`icon: "whatsapp"`). Pour une nouvelle icône, ajoutez le nom dans `src/data/icons.ts` puis l'icône react-icons correspondante dans `src/components/ui/Icon.tsx` (le build échoue si l'une des deux manque).
- **Nouveau projet** : ajoutez un objet dans `projects` (`projects.ts`) et ses captures dans `public/images/projets/<dossier>/` (WebP conseillé, `width`/`height` = dimensions réelles). La page `/projets/<slug>`, le filtre, le sitemap et la navigation précédent/suivant se mettent à jour seuls. Champs facultatifs : `liveLink`, `githubLink` (bouton « Code source »), `isDemo` (badge « Démonstration »).
- **CV PDF** : remplacez `public/cv/MAZAVAMANANA_Zeppelin_Tiavy_CV.pdf` (même nom, ou changez `cvPath` dans `site.ts`).

## Structure

```
src/
  app/                 routes (page.tsx, cv/, projets/, projets/[slug]/, contact/), 404,
                       sitemap.ts, robots.ts, opengraph-image.tsx, twitter-image.tsx, icon.svg
  app/contact/         actions.ts (Server Action), schema.ts (validation partagée)
  components/          Header, Footer, composants par page (cv/, projects/, contact/)
  components/ui/       composants partagés (Button, Badge, CtaBand, Icon, Reveal…)
  data/                contenu du site
  lib/                 metadata (SEO), image de partage
public/                images, CV
```

## Déploiement sur Vercel

1. Pousser le dossier `portfolio-next/` sur un dépôt GitHub (le dossier doit être la racine du dépôt, ou indiquer `portfolio-next` comme *Root Directory* dans Vercel).
2. Sur [vercel.com/new](https://vercel.com/new), importer le dépôt. Vercel détecte Next.js : aucun réglage de build à changer (`npm run build`, Node ≥ 20.9 imposé par `package.json`).
3. Dans *Settings → Environment Variables*, ajouter `RESEND_API_KEY`, `CONTACT_TO_EMAIL` et `CONTACT_FROM_EMAIL` (environnements *Production* et *Preview*), puis redéployer.
4. Noter l'URL attribuée (ex. `https://xxx.vercel.app`) et la recopier dans **`siteUrl`** de `src/data/site.ts` (seul endroit où elle est définie : canonical, Open Graph, sitemap, robots, JSON-LD). Pousser : Vercel redéploie.
5. Vérifier en ligne : les 5 pages, une page projet, `/sitemap.xml`, `/robots.txt`, `/opengraph-image`, un envoi réel du formulaire (le message doit arriver dans la boîte de `CONTACT_TO_EMAIL`, « Répondre » doit viser le visiteur), puis [PageSpeed Insights](https://pagespeed.web.dev) sur l'accueil.

Avec un nom de domaine plus tard : l'ajouter dans *Settings → Domains*, mettre à jour `siteUrl`, et vérifier le domaine chez Resend pour changer `CONTACT_FROM_EMAIL`.

## Notes techniques

- `cacheComponents` est activé : `new Date()` ou une lecture de fichier dans un composant serveur doivent être placés dans une fonction `"use cache"` (voir l'année du footer et `src/lib/social-image.tsx`).
- Les pages sont revalidées une fois par jour (année du copyright).
- Un slug de projet inconnu affiche « Projet introuvable » avec `noindex`, mais répond en 200 (limite du rendu en streaming de `cacheComponents`) ; les autres URL inconnues répondent en 404.
- `AGENTS.md` est généré par Next.js : il rappelle de lire la documentation locale `node_modules/next/dist/docs/` (Next 16 diffère des versions précédentes).
