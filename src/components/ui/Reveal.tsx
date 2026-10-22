"use client";

import { useEffect, useRef, useState, type ElementType, type HTMLAttributes, type ReactNode } from "react";

/**
 * D15 — Renvoie une ref et `true` dès que l'élément entre dans la fenêtre (une seule fois).
 * Sans IntersectionObserver, l'élément est considéré visible tout de suite.
 */
export function useReveal<T extends Element>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || !("IntersectionObserver" in window)) {
      // Repli sans IntersectionObserver : on affiche directement.
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      // Zone étendue très loin vers le haut : un élément dépassé sans avoir été vu (saut d'ancre,
      // position de défilement restaurée, défilement rapide) compte comme vu et ne reste pas caché.
      { rootMargin: "100000px 0px -10% 0px", threshold: 0.1 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

type RevealProps = Omit<HTMLAttributes<HTMLElement>, "style"> & {
  children: ReactNode;
  /** Balise HTML rendue (`div` par défaut). */
  as?: "div" | "li" | "section" | "article";
  /** Délai en ms, pour décaler les éléments d'une grille. */
  delay?: number;
};

/**
 * Apparition au scroll en CSS pur (classe `.reveal` de globals.css).
 * Contenu visible sans JavaScript et sans animation si `prefers-reduced-motion`.
 * À utiliser comme simple enveloppe : `.reveal` remplace la propriété `transition`
 * de l'élément qui la porte (ne pas y mettre de classes `transition` / `hover:`).
 */
export function Reveal({ children, as: Tag = "div", delay = 0, className = "", ...props }: RevealProps) {
  const { ref, visible } = useReveal<HTMLElement>();
  const Component = Tag as ElementType;

  return (
    <Component
      ref={ref}
      data-visible={visible || undefined}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`reveal ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
