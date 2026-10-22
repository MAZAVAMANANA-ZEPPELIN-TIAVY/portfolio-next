import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { projectDetail } from "@/data/projects";

/** Projet inconnu : bloc « Erreur 404 — Projet introuvable » repris de l'original. */
export default function ProjectNotFound() {
  return (
    <div className="min-h-[65vh] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-red-200 bg-white p-8 text-center shadow-xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-600">{projectDetail.notFound.eyebrow}</p>
        <h1 className="mt-3 text-3xl font-black text-ink">{projectDetail.notFound.title}</h1>
        <p className="mt-4 text-slate-600">{projectDetail.notFound.text}</p>
        <ButtonLink href="/projets" variant="primary" size="base" className="mt-7 bg-ink hover:bg-primary">
          <Icon name="arrowLeft" />
          {projectDetail.notFound.back}
        </ButtonLink>
      </div>
    </div>
  );
}
