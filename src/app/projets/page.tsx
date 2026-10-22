import { Suspense } from "react";
import { ProjectsExplorer, ProjectsView } from "@/components/projects/ProjectsExplorer";
import { BackgroundDecor } from "@/components/ui/BackgroundDecor";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { Icon } from "@/components/ui/Icon";
import { projectCategories, projects, projectsPage } from "@/data/projects";

export default function ProjectsPage() {
  const featuredCount = projects.filter((project) => project.featured).length;
  const stats = [
    { value: projects.length, label: projectsPage.stats.projects },
    { value: projectCategories.length, label: projectsPage.stats.categories },
    { value: featuredCount, label: projectsPage.stats.featured },
  ];

  return (
    <div className="relative isolate overflow-clip">
      <BackgroundDecor thirdHalo />

      <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="overflow-hidden rounded-[2rem] bg-ink px-5 py-10 text-white shadow-2xl sm:px-8 lg:px-10 lg:py-14">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <Badge icon="folderOpen">{projectsPage.badge}</Badge>
              <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">{projectsPage.title}</h1>
              <p className="mt-5 text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
                {projectsPage.description}
              </p>
            </div>

            <dl className="grid gap-3 sm:grid-cols-3 lg:min-w-[430px] lg:grid-cols-1 xl:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col-reverse rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur"
                >
                  <dt className="mt-1 text-xs font-medium text-slate-300">{stat.label}</dt>
                  <dd className="text-2xl font-black text-white">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Rendu statique avec tous les projets, remplacé à l'hydratation par la version filtrable (?categorie=). */}
        <Suspense fallback={<ProjectsView activeCategory={null} />}>
          <ProjectsExplorer />
        </Suspense>

        <CtaBand
          tone="night"
          size="md"
          eyebrow={projectsPage.cta.eyebrow}
          title={projectsPage.cta.title}
          description={projectsPage.cta.description}
          className="mt-14 py-12"
        >
          <ButtonLink href="/contact" variant="white" size="base">
            {projectsPage.cta.button}
            <Icon name="arrowRight" />
          </ButtonLink>
        </CtaBand>
      </section>
    </div>
  );
}
