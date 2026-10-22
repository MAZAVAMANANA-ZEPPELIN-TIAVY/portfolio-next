import type { ReactNode } from "react";
import type { IconName } from "@/data/icons";
import { Icon } from "./Icon";

const variants = {
  /** Eyebrow en pilule des heros sombres. */
  hero: "border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-accent-soft backdrop-blur",
  /** Catégorie posée sur une image. */
  category: "bg-white/95 px-3 py-1 text-xs font-bold text-slate-800 shadow",
  /** Projet de démonstration. */
  demo: "bg-demo px-3 py-1 text-xs font-bold text-amber-950 shadow",
  /** Technologie sur fond clair. */
  tech: "border border-slate-200 bg-surface px-3 py-1.5 text-xs font-semibold text-slate-700",
  /** Technologie sur fond sombre. */
  techDark: "border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-cyan-100",
} as const;

type BadgeProps = {
  children: ReactNode;
  variant?: keyof typeof variants;
  icon?: IconName;
  /** Pastille verte « disponible » avant le texte. */
  dot?: boolean;
  className?: string;
};

export function Badge({ children, variant = "hero", icon, dot = false, className = "" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full ${variants[variant]} ${className}`}>
      {dot && <span className="h-2 w-2 rounded-full bg-emerald-400" />}
      {icon && <Icon name={icon} />}
      {children}
    </span>
  );
}
