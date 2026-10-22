"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

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
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  /** Délai en ms, pour décaler les éléments d'une grille. */
  delay?: number;
  className?: string;
};

/**
 * Apparition au scroll en CSS pur (classe `.reveal` de globals.css).
 * Contenu visible sans JavaScript et sans animation si `prefers-reduced-motion`.
 */
export function Reveal({ children, as: Tag = "div", delay = 0, className = "" }: RevealProps) {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <Tag
      ref={ref}
      data-visible={visible || undefined}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`reveal ${className}`}
    >
      {children}
    </Tag>
  );
}
