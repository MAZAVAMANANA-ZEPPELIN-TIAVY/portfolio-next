import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { BackgroundDecor } from "@/components/ui/BackgroundDecor";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { getAdjacentProjects, getProjectBySlug, projectDetail, projects } from "@/data/projects";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projets/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: projectDetail.notFound.title };
  return pageMetadata({ title: project.title, description: project.shortDescription, path: `/projets/${project.slug}` });
}

export default async function ProjectPage({ params }: PageProps<"/projets/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { previous, next } = getAdjacentProjects(project.slug);
  const imageCount = project.images.length;
  const info = [
    { label: projectDetail.info.client, value: project.client },
    { label: projectDetail.info.year, value: project.year },
    { label: projectDetail.info.role, value: project.role },
    {
      label: projectDetail.info.gallery,
      value: `${imageCount} ${imageCount > 1 ? projectDetail.info.captures : projectDetail.info.capture}`,
    },
  ];

  return (
    <div className="relative isolate overflow-clip">
      <BackgroundDecor />

      <section className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="overflow-hidden rounded-[2rem] bg-ink text-white shadow-2xl">
          <div className="grid gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-end lg:px-10 lg:py-14">
            <div className="max-w-4xl">
              <div className="flex flex-wrap gap-2">
                <Badge icon="images" className="tracking-[0.18em]">
                  {project.category}
                </Badge>
                {project.isDemo && (
                  <span className="rounded-full bg-demo px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-amber-950">
                    {projectDetail.demoBadge}
                  </span>
                )}
              </div>

              <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">{project.title}</h1>
              <p className="mt-5 text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">{project.description}</p>

              <ul aria-label="Technologies" className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-200"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <ButtonLink href="/projets" variant="outlineLight" size="base" className="border-white/15">
                <Icon name="arrowLeft" />
                {projectDetail.allProjects}
              </ButtonLink>

              {project.liveLink && (
                <ButtonLink href={project.liveLink} external variant="white" size="base">
                  {projectDetail.viewSite}
                  <span className="sr-only"> (nouvel onglet)</span>
                  <Icon name="externalLink" />
                </ButtonLink>
              )}

              {/* Q6 : affiché seulement si le lien est rempli. */}
              {project.githubLink && (
                <ButtonLink href={project.githubLink} external variant="glass" size="base">
                  <Icon name="github" />
                  {projectDetail.sourceCode}
                  <span className="sr-only"> (nouvel onglet)</span>
                </ButtonLink>
              )}
            </div>
          </div>
        </div>

        <dl className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {info.map((item) => (
            <div key={item.label} className="flex flex-col-reverse rounded-[1.4rem] border border-slate-200 bg-white p-5 shadow-sm">
              <dd className="mt-2 text-base font-black text-ink">{item.value}</dd>
              <dt className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{item.label}</dt>
            </div>
          ))}
        </dl>

        <div className="mt-8 grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <aside className="h-fit rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-28">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              {projectDetail.highlightsEyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-black text-ink">{projectDetail.highlightsTitle}</h2>

            <ul className="mt-6 space-y-4">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3 text-sm leading-6 text-slate-700">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs text-emerald-700">
                    <Icon name="check" />
                  </span>
                  {highlight}
                </li>
              ))}
            </ul>
          </aside>

          <section aria-labelledby="gallery-title">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">{projectDetail.galleryEyebrow}</p>
                <h2 id="gallery-title" className="mt-2 text-2xl font-black text-ink sm:text-3xl">
                  {projectDetail.galleryTitle}
                </h2>
              </div>
              <p className="hidden text-sm text-slate-500 sm:block">{projectDetail.galleryHint}</p>
            </div>

            <ProjectGallery title={project.title} images={project.images} />
          </section>
        </div>

        {/* D12 : projet précédent / suivant (en boucle). */}
        <Reveal>
          <nav aria-label="Autres projets" className="mt-12 grid gap-4 sm:grid-cols-2">
            <AdjacentLink direction="previous" slug={previous.slug} title={previous.title} />
            <AdjacentLink direction="next" slug={next.slug} title={next.title} />
          </nav>
        </Reveal>
      </section>
    </div>
  );
}

function AdjacentLink({ direction, slug, title }: { direction: "previous" | "next"; slug: string; title: string }) {
  const isNext = direction === "next";
  return (
    <Link
      href={`/projets/${slug}`}
      rel={isNext ? "next" : "prev"}
      className={`group flex items-center gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
        isNext ? "flex-row-reverse text-right" : ""
      }`}
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-primary transition group-hover:bg-primary group-hover:text-white">
        <Icon name={isNext ? "arrowRight" : "arrowLeft"} />
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
          {isNext ? projectDetail.nextProject : projectDetail.previousProject}
        </span>
        <span className="mt-1 block truncate text-lg font-black text-ink">{title}</span>
      </span>
    </Link>
  );
}
