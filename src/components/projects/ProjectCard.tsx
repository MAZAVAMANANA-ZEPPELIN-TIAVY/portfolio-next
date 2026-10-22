import Link from "next/link";
import type { CSSProperties } from "react";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { SafeImage } from "@/components/ui/SafeImage";
import { projectsPage, type Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  className?: string;
  style?: CSSProperties;
};

/** Carte complète d'un projet (page /projets). */
export function ProjectCard({ project, className = "", style }: ProjectCardProps) {
  return (
    <article
      style={style}
      className={`group flex flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl ${className}`}
    >
      <div className="relative aspect-4/3 overflow-hidden bg-linear-to-br from-ink via-ink-deep to-primary">
        <SafeImage
          src={project.image}
          alt={`Aperçu du projet ${project.title}`}
          fill
          sizes="(min-width: 80rem) 400px, (min-width: 48rem) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/10 to-transparent" />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <Badge variant="category">{project.category}</Badge>
          <Badge variant="status">{project.status}</Badge>
        </div>

        <div className="absolute bottom-5 left-5 right-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-soft">
            {project.client} • {project.year}
          </p>
          <h2 className="mt-2 text-2xl font-black text-white">{project.title}</h2>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm leading-7 text-slate-600">{project.shortDescription}</p>

        <ul className="mt-5 space-y-2">
          {project.highlights.slice(0, 3).map((highlight) => (
            <li key={highlight} className="flex items-start gap-2 text-sm text-slate-700">
              <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[9px] text-emerald-700">
                <Icon name="check" />
              </span>
              {highlight}
            </li>
          ))}
        </ul>

        <ul aria-label="Technologies" className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li key={tech}>
              <Badge variant="tech">
                <Icon name="code" className="text-primary" />
                {tech}
              </Badge>
            </li>
          ))}
        </ul>

        <div className="mt-auto grid gap-3 pt-6 sm:grid-cols-2">
          <Link
            href={`/projets/${project.slug}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-primary"
          >
            <Icon name="images" />
            {projectsPage.viewProject}
            <span className="sr-only"> {project.title}</span>
          </Link>

          {project.liveLink ? (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:-translate-y-0.5 hover:border-primary-soft hover:bg-blue-50 hover:text-primary-strong"
            >
              {projectsPage.liveSite}
              <span className="sr-only"> de {project.title} (nouvel onglet)</span>
              <Icon name="externalLink" />
            </a>
          ) : (
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-surface px-5 py-3 text-sm font-bold text-slate-600 transition hover:border-primary-soft hover:bg-blue-50 hover:text-primary-strong"
            >
              {projectsPage.similarProject}
              <Icon name="arrowRight" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
