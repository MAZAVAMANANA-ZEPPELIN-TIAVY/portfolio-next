import type { ReactNode } from "react";
import type { IconName } from "@/data/icons";
import { Icon } from "./Icon";

const tones = {
  /** Bleu → cyan (accueil, projets). */
  blue: "bg-linear-to-br from-primary-strong via-primary to-accent-end shadow-2xl",
  /** Nuit → bleu (CV). */
  night: "bg-linear-to-r from-ink via-ink-deep to-primary-strong shadow-xl",
} as const;

const sizes = {
  lg: {
    box: "px-6 py-12 sm:px-10 lg:px-16 lg:py-16",
    title: "max-w-3xl text-3xl tracking-tight sm:text-4xl",
    titleGap: "mt-5",
    text: "mt-5 text-base leading-8 text-blue-50",
    actions: "mt-8",
  },
  md: {
    box: "px-6 py-10 sm:px-10",
    title: "max-w-2xl text-2xl sm:text-3xl",
    titleGap: "mt-3",
    text: "mt-4 text-sm leading-7 text-slate-200 sm:text-base",
    actions: "mt-6",
  },
} as const;

type CtaBandProps = {
  title: string;
  description: string;
  eyebrow?: string;
  icon?: IconName;
  tone?: keyof typeof tones;
  size?: keyof typeof sizes;
  /** Boutons et liens d'action. */
  children: ReactNode;
  className?: string;
};

/** Bandeau d'appel à l'action centré, en fin de page. */
export function CtaBand({
  title,
  description,
  eyebrow,
  icon,
  tone = "blue",
  size = "lg",
  children,
  className = "",
}: CtaBandProps) {
  const s = sizes[size];

  return (
    <div className={`relative overflow-hidden rounded-[2rem] text-center text-white ${tones[tone]} ${s.box} ${className}`}>
      {icon && <Icon name={icon} className="mx-auto text-3xl text-cyan-100" />}
      {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-soft">{eyebrow}</p>}
      <h2 className={`mx-auto font-black ${s.title} ${icon || eyebrow ? s.titleGap : ""}`}>{title}</h2>
      <p className={`mx-auto max-w-2xl ${s.text}`}>{description}</p>
      <div className={s.actions}>{children}</div>
    </div>
  );
}
