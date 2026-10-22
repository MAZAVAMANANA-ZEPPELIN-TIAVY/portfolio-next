import type { ReactNode } from "react";
import type { IconName } from "@/data/icons";
import { Icon } from "./Icon";

type IconCardProps = {
  icon: IconName;
  title: string;
  description?: string;
  /**
   * - `feature` : grande carte avec numéro et survol (services de l'accueil)
   * - `plain` : carte simple (engagements)
   * - `info` : petite carte libellé / valeur (contacts du CV, infos d'un projet)
   */
  variant?: "feature" | "plain" | "info";
  /** Numéro affiché en filigrane (variante `feature`). */
  index?: number;
  /** Contenu ajouté sous la description (lien, valeur…). */
  children?: ReactNode;
  className?: string;
};

export function IconCard({ icon, title, description, variant = "plain", index, children, className = "" }: IconCardProps) {
  if (variant === "info") {
    return (
      <div
        className={`rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${className}`}
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-primary">
          <Icon name={icon} />
        </div>
        <p className="text-sm font-semibold text-slate-500">{title}</p>
        <div className="mt-2 break-words text-base font-bold text-ink">{children}</div>
      </div>
    );
  }

  if (variant === "feature") {
    return (
      <article
        className={`group relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl ${className}`}
      >
        {index !== undefined && (
          <span aria-hidden="true" className="absolute right-6 top-5 text-5xl font-black text-surface-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-primary transition group-hover:bg-primary group-hover:text-white">
          <Icon name={icon} />
        </div>
        <h3 className="relative mt-6 text-xl font-black text-ink">{title}</h3>
        {description && <p className="relative mt-3 text-sm leading-7 text-slate-600">{description}</p>}
        {children && <div className="relative mt-6">{children}</div>}
      </article>
    );
  }

  return (
    <article className={`rounded-[1.5rem] bg-white p-6 shadow-sm ${className}`}>
      <Icon name={icon} className="text-2xl text-primary" />
      <h3 className="mt-5 text-lg font-black text-ink">{title}</h3>
      {description && <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>}
      {children}
    </article>
  );
}
