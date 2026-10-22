import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const variants = {
  /** Bleu, survol sombre (header, formulaire). */
  primary: "bg-primary text-white shadow-lg shadow-blue-600/20 hover:-translate-y-0.5 hover:bg-ink",
  /** Bleu, survol plus clair (hero sombre). */
  primaryBright: "bg-primary text-white shadow-xl shadow-blue-600/25 hover:-translate-y-0.5 hover:bg-blue-500",
  /** Sombre, survol bleu (fond clair). */
  dark: "bg-ink text-white shadow-md transition hover:-translate-y-0.5 hover:bg-primary",
  /** Blanc sur fond coloré ou sombre. */
  white: "bg-white text-ink hover:-translate-y-0.5 hover:bg-cyan-100",
  /** Verre dépoli sur fond sombre. */
  glass: "border border-white/15 bg-white/10 text-white backdrop-blur hover:bg-white/15",
  /** Contour clair sur fond coloré. */
  outlineLight: "border border-white/25 bg-white/10 text-white hover:bg-white/20",
  /** Texte seul sur fond sombre. */
  ghost: "text-accent-soft hover:bg-white/10",
  /** Contour sur fond clair. */
  outline:
    "border border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-primary-soft hover:bg-blue-50 hover:text-primary-strong",
  /** WhatsApp. */
  success: "bg-success text-white shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5 hover:bg-emerald-400",
} as const;

const sizes = {
  sm: "px-4 py-2.5 text-sm",
  md: "px-6 py-3 text-sm",
  base: "px-6 py-3",
  lg: "px-6 py-3.5 text-sm",
  xl: "px-7 py-3.5",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md", className = "") {
  return `inline-flex items-center justify-center gap-2 rounded-full font-bold transition disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`;
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Ouvre dans un nouvel onglet (sites externes, CV). */
  external?: boolean;
};

/** Lien en forme de bouton : `next/link` pour les pages internes, `<a>` sinon. */
export function ButtonLink({ href, children, variant, size, className, external = false }: ButtonLinkProps) {
  const classes = buttonClasses(variant, size, className);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={classes}>
      {children}
    </a>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...props} />;
}
