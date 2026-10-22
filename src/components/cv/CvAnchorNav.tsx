"use client";

import { useEffect, useRef, useState } from "react";

type CvAnchorNavProps = {
  sections: { id: string; title: string }[];
};

/** Hauteur du header (80 px) + barre d'ancres + marge : ligne sous laquelle une section devient « active ». */
const ACTIVE_LINE = 180;

/** D11 — Navigation par ancres collante sous le header, section visible mise en évidence. */
export function CvAnchorNav({ sections }: CvAnchorNavProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  // Après un clic, on garde la section cliquée le temps du défilement (sections côte à côte sur desktop).
  const lockedUntil = useRef(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      if (Date.now() < lockedUntil.current) return;

      // Section passée sous la ligne la plus récemment ; à égalité (deux colonnes), la première du DOM.
      let current: string | null = null;
      let bestTop = -Infinity;
      for (const { id } of sections) {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= ACTIVE_LINE && top > bestTop + 1) {
          bestTop = top;
          current = id;
        }
      }
      setActiveId(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [sections]);

  return (
    <nav
      aria-label="Sections du CV"
      className="sticky top-20 z-40 -mx-4 mb-8 border-y border-slate-200/80 bg-white/90 px-4 py-3 backdrop-blur-xl sm:mx-0 sm:rounded-full sm:border sm:px-2 sm:py-2 sm:shadow-sm"
    >
      <ul className="flex gap-2 overflow-x-auto [scrollbar-width:none] sm:justify-center">
        {sections.map(({ id, title }) => {
          const active = id === activeId;
          return (
            <li key={id} className="shrink-0">
              <a
                href={`#${id}`}
                aria-current={active ? "true" : undefined}
                onClick={() => {
                  lockedUntil.current = Date.now() + 1000;
                  setActiveId(id);
                }}
                className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-ink text-white shadow-lg shadow-slate-950/15"
                    : "text-slate-600 hover:bg-surface-muted hover:text-ink"
                }`}
              >
                {title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
