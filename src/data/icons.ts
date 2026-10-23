/**
 * Noms d'icônes autorisés dans tout le site (cf. MIGRATION.md, Décisions 2026-10-23).
 * Les données ne stockent que ces noms ; le composant <Icon name="…" /> fait la
 * correspondance avec react-icons. Une faute de frappe fait échouer le build.
 */
export type IconName =
  // Interface
  | "arrowRight"
  | "arrowRightOutline"
  | "download"
  | "downloadSolid"
  | "menu"
  | "close"
  | "checkCircle"
  | "paperPlane"
  // Projets
  | "folderOpen"
  | "check"
  | "externalLink"
  | "images"
  | "arrowLeft"
  | "chevronLeft"
  | "chevronRight"
  | "expand"
  | "times"
  // Contact et réseaux
  | "email"
  | "emailOutline"
  | "phone"
  | "location"
  | "locationOutline"
  | "whatsapp"
  | "facebook"
  | "linkedin"
  | "github"
  // Compétences
  | "laptopCode"
  | "code"
  | "database"
  // CV
  | "userGraduate"
  | "graduationCap"
  | "briefcase"
  | "globe"
  | "language"
  | "basketball"
  | "music"
  | "plane"
  | "html5"
  | "css3"
  | "react"
  | "php"
  | "laravel"
  | "git"
  | "java"
  | "wordpress";
