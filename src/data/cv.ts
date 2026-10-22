import type { IconName } from "./icons";
import { contact, site } from "./site";

const heroPills: { icon: IconName; label: string }[] = [
  { icon: "laptopCode", label: "React / Laravel" },
  { icon: "database", label: "Base de données" },
  { icon: "code", label: "UI moderne" },
];

export const cvHero = {
  badge: "Profil professionnel",
  title: "Curriculum Vitae",
  description:
    "Développeur web orienté création d’applications modernes, responsives et bien structurées, avec une attention particulière portée à l’interface utilisateur, à la logique métier et à la conception de bases de données.",
  pills: heroPills,
  download: "Télécharger le CV",
  summaryTitle: "Résumé",
  summary:
    "Profil motivé, rigoureux et orienté résultat, avec expérience en développement web, travail en équipe agile et conception de solutions modernes.",
} as const;

export const cvContactCards: { icon: IconName; label: string; value: string }[] = [
  { icon: "email", label: "Email", value: contact.email },
  { icon: "phone", label: "Téléphone", value: contact.phone },
  { icon: "location", label: "Adresse", value: site.location },
];

export type CvSection = {
  /** Ancre utilisée par la navigation collante (D11). */
  id: string;
  icon: IconName;
  title: string;
  subtitle: string;
};

export type TimelineEntry = {
  title: string;
  period: string;
  place: string;
  description?: string;
};

export const education: CvSection & { entries: TimelineEntry[] } = {
  id: "education",
  icon: "graduationCap",
  title: "Éducation",
  subtitle: "Parcours académique",
  entries: [
    {
      title: "Master d’Aptitude au Professorat – Ingénierie en Mathématiques et Informatique",
      period: "2023 – 2024",
      place: "École Normale",
    },
    {
      title: "Licence d’Aptitude au Professorat – Génie Mathématiques et Informatique",
      period: "2021 – 2022",
      place: "École Normale",
    },
    {
      title: "Baccalauréat Série C",
      period: "2017 – 2018",
      place: "Lycée Mixte Antsiranana 1",
    },
  ],
};

export const experience: CvSection & { entries: TimelineEntry[] } = {
  id: "experience",
  icon: "briefcase",
  title: "Expérience",
  subtitle: "Expérience professionnelle",
  entries: [
    {
      title: "Développeur web stagiaire – MADA-Digital",
      period: "Août 2024 – Décembre 2024",
      place: "MADA-Digital",
      description:
        "Travail en équipe agile et participation au développement d’une application de gestion des salariés avec Laravel, Bootstrap et JavaScript.",
    },
    {
      title: "Développeur web – ObayaMadaTour",
      period: "Février 2025",
      place: "Projet web touristique",
      description:
        "Conception et développement d’un site touristique moderne pour mettre en valeur les destinations, circuits, services et expériences proposés par ObayaMadaTour, avec une interface attractive, responsive et une intégration de technologies comme Laravel, React et Tailwind CSS.",
    },
  ],
};

/** Badge de compétence : avec icône de marque (badge blanc) ou texte seul (badge gris). */
export type SkillBadge = { name: string; icon?: IconName };

export type SkillBlock = {
  title: string;
  icon: IconName;
  badges: SkillBadge[];
};

export const skills: CvSection & { blocks: SkillBlock[] } = {
  id: "competences",
  icon: "code",
  title: "Compétences",
  subtitle: "Technologies, méthodes et outils maîtrisés",
  blocks: [
    {
      title: "Développement web",
      icon: "laptopCode",
      badges: [
        { name: "HTML", icon: "html5" },
        { name: "CSS", icon: "css3" },
        { name: "Tailwind CSS" },
        { name: "React", icon: "react" },
        { name: "PHP", icon: "php" },
        { name: "Laravel", icon: "laravel" },
        { name: "Git / GitHub", icon: "git" },
        { name: "Méthode Agile Scrum" },
      ],
    },
    {
      title: "Backend & base de données",
      icon: "database",
      badges: [{ name: "SQL" }, { name: "MySQL" }, { name: "Merise" }, { name: "Modélisation MCD / MLD" }],
    },
    {
      title: "JDBC / Développement Java",
      icon: "code",
      badges: [{ name: "Java", icon: "java" }, { name: "JDBC" }, { name: "NetBeans" }],
    },
    {
      title: "CMS",
      icon: "globe",
      badges: [{ name: "WordPress", icon: "wordpress" }],
    },
    {
      title: "Algorithmique et programmation",
      icon: "code",
      badges: [
        { name: "Conception d’algorithmes" },
        { name: "Structures de données" },
        { name: "Logique de programmation" },
      ],
    },
    {
      title: "Bureautique",
      icon: "briefcase",
      badges: [{ name: "Microsoft Word" }, { name: "Microsoft Excel" }, { name: "Microsoft PowerPoint" }],
    },
  ],
};

export const languages: CvSection & { items: { label: string; level: string; progress: number }[] } = {
  id: "langues",
  icon: "language",
  title: "Langues",
  subtitle: "Niveaux linguistiques",
  items: [
    { label: "Malagasy", level: "Courant", progress: 100 },
    { label: "Français", level: "Courant", progress: 85 },
    { label: "Anglais", level: "Débutant", progress: 35 },
  ],
};

export const hobbies: CvSection & { items: { name: string; icon: IconName }[] } = {
  id: "loisirs",
  icon: "globe",
  title: "Loisirs",
  subtitle: "Centres d’intérêt",
  items: [
    { name: "Basketball", icon: "basketball" },
    { name: "Musique", icon: "music" },
    { name: "Voyage", icon: "plane" },
  ],
};

export const qualities: CvSection & { items: string[] } = {
  id: "qualites",
  icon: "checkCircle",
  title: "Qualités",
  subtitle: "Points forts professionnels",
  items: ["Motivé et rigoureux", "Capacité d’apprentissage", "Travail en équipe", "Sens du détail"],
};

/** Ordre de la navigation par ancres (D11). */
export const cvSections: CvSection[] = [education, experience, skills, languages, hobbies, qualities];

export const cvCta = {
  eyebrow: "Collaboration",
  title: "Mon profil correspond à votre besoin ?",
  description:
    "Je suis disponible pour échanger sur un site vitrine, une application web ou une mission de développement full-stack.",
  button: "Me contacter",
} as const;
