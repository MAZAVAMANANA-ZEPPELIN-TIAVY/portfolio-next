"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { categorySlug, projectCategories, projects, projectsPage } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

/** D13 — Filtre par catégorie synchronisé avec `?categorie=…`, cartes animées à chaque changement. */
export function ProjectsExplorer() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Animation seulement après un choix de l'utilisateur (pas au remplacement du rendu statique).
  const [animate, setAnimate] = useState(false);

  const requested = searchParams.get("categorie");
  // Valeur inconnue dans l'URL → « Tous ».
  const activeCategory = projectCategories.find((category) => categorySlug(category) === requested) ?? null;

  const select = (category: string | null) => {
    setAnimate(true);
    const url = category ? `${pathname}?categorie=${categorySlug(category)}` : pathname;
    router.replace(url, { scroll: false });
  };

  return <ProjectsView activeCategory={activeCategory} onSelect={select} animate={animate} />;
}

type ProjectsViewProps = {
  activeCategory: string | null;
  /** Absent : rendu statique (fallback du Suspense), boutons inactifs jusqu'à l'hydratation. */
  onSelect?: (category: string | null) => void;
  animate?: boolean;
};

export function ProjectsView({ activeCategory, onSelect, animate = false }: ProjectsViewProps) {
  const filtered = activeCategory ? projects.filter((project) => project.category === activeCategory) : projects;
  const options: { label: string; value: string | null }[] = [
    { label: projectsPage.allCategories, value: null },
    ...projectCategories.map((category) => ({ label: category, value: category })),
  ];

  return (
    <>
      <div className="mt-8 flex flex-col gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 id="filter-title" className="text-sm font-black text-ink">
            {projectsPage.filterTitle}
          </h2>
          <p className="mt-1 text-xs text-slate-500">{projectsPage.filterDescription}</p>
        </div>

        <div role="group" aria-labelledby="filter-title" className="flex flex-wrap gap-2">
          {options.map(({ label, value }) => {
            const isActive = activeCategory === value;
            return (
              <button
                key={label}
                type="button"
                onClick={() => onSelect?.(value)}
                aria-pressed={isActive}
                className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-blue-600/20"
                    : "bg-surface-muted text-slate-600 hover:bg-slate-200 hover:text-ink"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {filtered.length} {filtered.length > 1 ? "projets affichés" : "projet affiché"}
      </p>

      {/* La clé change avec le filtre : les cartes sont recréées et rejouent l'animation d'entrée. */}
      <div key={activeCategory ?? "tous"} className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            className={animate ? "animate-card-in" : ""}
            style={animate ? { animationDelay: `${index * 70}ms` } : undefined}
          />
        ))}
      </div>
    </>
  );
}
