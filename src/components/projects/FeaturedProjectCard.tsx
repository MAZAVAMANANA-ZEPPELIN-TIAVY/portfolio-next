import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { SafeImage } from "@/components/ui/SafeImage";
import { projectsSection } from "@/data/home";
import type { Project } from "@/data/projects";

/** Carte d'un projet mis en avant (accueil). */
export function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <article className="group h-full overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className="relative aspect-4/3 overflow-hidden bg-linear-to-br from-slate-900 via-blue-900 to-primary">
        <SafeImage
          src={project.image}
          alt={`Capture du projet ${project.title}`}
          fill
          sizes="(min-width: 80rem) 400px, (min-width: 64rem) 33vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/5 to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <Badge variant="category">{project.category}</Badge>
          {project.isDemo && <Badge variant="demo">{projectsSection.demoBadge}</Badge>}
        </div>
        <div className="absolute bottom-5 left-5 right-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-soft">
            {project.stack.slice(0, 3).join(" • ")}
          </p>
          <h3 className="mt-2 text-2xl font-black text-white">{project.title}</h3>
        </div>
      </div>
      <div className="p-6">
        <p className="text-sm leading-7 text-slate-600">{project.shortDescription}</p>
        <Link
          href={`/projets/${project.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary transition group-hover:gap-3"
        >
          {projectsSection.cardLink}
          <span className="sr-only"> : {project.title}</span>
          <Icon name="arrowRight" />
        </Link>
      </div>
    </article>
  );
}
