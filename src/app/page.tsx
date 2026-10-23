import Image from "next/image";
import Link from "next/link";
import { FeaturedProjectCard } from "@/components/projects/FeaturedProjectCard";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contactBand, hero, processSection, processSteps, projectsSection, stats } from "@/data/home";
import { featuredProjects, projects, realizedProjectsCount } from "@/data/projects";
import { contact, cvPath, seo, site, siteUrl, socials } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ description: seo.home.description, path: "/" });

/** D17 — Données structurées schema.org/Person. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.fullName,
  alternateName: site.name,
  jobTitle: site.jobTitle,
  description: site.description,
  url: siteUrl,
  image: `${siteUrl}${hero.photo.src}`,
  email: `mailto:${contact.email}`,
  telephone: contact.phoneHref.replace("tel:", ""),
  address: { "@type": "PostalAddress", addressLocality: "Antsiranana", addressCountry: "MG" },
  sameAs: socials.map((social) => social.href),
  knowsAbout: ["React", "Laravel", "Tailwind CSS", "MySQL", "PHP", "JavaScript"],
};

export default function Home() {
  return (
    <div className="overflow-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-28 -top-28 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute right-0 top-1/4 h-112 w-md rounded-full bg-accent/15 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-halo/20 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        </div>

        {/* D8 : sur mobile, photo compacte au-dessus du titre et hauteur libre ; mise en page d'origine dès lg. */}
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-10 sm:gap-14 sm:px-6 sm:py-16 lg:min-h-[calc(100vh-5rem)] lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-20">
          <div className="max-w-3xl text-center lg:text-left">
            <Badge dot className="tracking-[0.18em]">
              {hero.badge}
            </Badge>

            <h1 className="mt-7 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              {hero.title}
              <span className="block bg-linear-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                {hero.titleHighlight}
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg lg:mx-0">
              {hero.description}
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <ButtonLink href="/contact" variant="primaryBright" size="lg" className="w-full sm:w-auto">
                {hero.primaryCta}
                <Icon name="arrowRight" />
              </ButtonLink>
              <ButtonLink href="/projets" variant="glass" size="lg" className="w-full sm:w-auto">
                {hero.secondaryCta}
              </ButtonLink>
              <ButtonLink href={cvPath} external variant="ghost" size="lg" className="w-full px-5 sm:w-auto">
                <Icon name="download" size={19} />
                {hero.cvCta}
              </ButtonLink>
            </div>

            <div className="mt-9 flex flex-col items-center gap-5 sm:flex-row sm:justify-center lg:justify-start">
              <div aria-hidden="true" className="flex -space-x-2">
                {hero.stackLetters.map((letter) => (
                  <span
                    key={letter}
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-white text-xs font-black text-ink"
                  >
                    {letter}
                  </span>
                ))}
              </div>
              <p className="max-w-sm text-sm leading-6 text-slate-400">{hero.stackText}</p>
            </div>
          </div>

          <div className="relative order-first mx-auto w-full max-w-68 sm:max-w-lg lg:order-none lg:max-w-none">
            <div aria-hidden="true" className="absolute inset-10 rounded-[3rem] bg-blue-500/25 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-3 shadow-2xl backdrop-blur-xl sm:p-4">
              <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-900">
                <Image
                  src={hero.photo.src}
                  alt={hero.photo.alt}
                  width={hero.photo.width}
                  height={hero.photo.height}
                  sizes="(min-width: 80rem) 560px, (min-width: 64rem) 45vw, (min-width: 40rem) 512px, 272px"
                  loading="eager"
                  fetchPriority="high"
                  className="aspect-square w-full object-cover object-top lg:aspect-4/5"
                />
                <div className="absolute inset-0 bg-linear-to-t from-ink via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-accent-soft sm:text-xs">
                    {hero.photoCaptionName}
                  </p>
                  <p className="mt-1 text-base font-black text-white sm:mt-2 sm:text-2xl">{hero.photoCaptionTitle}</p>
                </div>
              </div>
            </div>

            <div className="absolute -left-4 top-6 rounded-2xl border border-white/10 bg-slate-900/90 p-3 shadow-xl backdrop-blur sm:-left-10 sm:top-8 sm:p-4">
              <p className="text-xl font-black text-white sm:text-2xl">{projects.length}</p>
              <p className="mt-1 text-xs font-semibold text-slate-400">{hero.projectsBadgeLabel}</p>
            </div>

            <div className="absolute -bottom-5 -right-4 rounded-2xl border border-white/10 bg-white p-3 text-ink shadow-2xl sm:-right-6 sm:p-4">
              <p className="flex items-center gap-2 whitespace-nowrap text-xs font-bold sm:text-sm">
                <Icon name="checkCircle" className="text-success" />
                {hero.devicesBadge}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Chiffres clés" className="border-b border-slate-200 bg-white">
        <dl className="mx-auto grid max-w-7xl gap-px bg-slate-200 sm:grid-cols-3">
          <Stat value={`${realizedProjectsCount}+`} label={stats.realizedLabel} />
          {stats.others.map((stat) => (
            <Stat key={stat.value} value={stat.value} label={stat.label} />
          ))}
        </dl>
      </section>

      <section aria-labelledby="process-title" className="bg-ink py-20 text-white lg:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <SectionHeading
              id="process-title"
              tone="dark"
              align="left"
              eyebrow={processSection.eyebrow}
              title={processSection.title}
              description={processSection.description}
              className="lg:sticky lg:top-28"
            />

            <ol className="grid gap-4 sm:grid-cols-2">
              {processSteps.map((step, index) => (
                <Reveal as="li" key={step.number} delay={(index % 2) * 100}>
                  <div className="h-full rounded-[1.5rem] border border-white/10 bg-white/5 p-6 transition hover:bg-white/10">
                    <span className="text-sm font-black text-cyan-300">{step.number}</span>
                    <h3 className="mt-4 text-xl font-black">{step.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{step.description}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section aria-labelledby="projects-title">
        <Container className="py-20 lg:py-28">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              id="projects-title"
              align="left"
              eyebrow={projectsSection.eyebrow}
              title={projectsSection.title}
              description={projectsSection.description}
            />
            <Link
              href="/projets"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-primary transition hover:gap-3"
            >
              {projectsSection.allLink}
              <Icon name="arrowRight" />
            </Link>
          </div>

          <div className="mt-12 grid gap-7 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 100}>
                <FeaturedProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="contact-band-title">
        <Container className="pb-20 lg:pb-28">
          <Reveal>
            <div className="rounded-[2rem] bg-linear-to-br from-primary-strong via-primary to-accent-end px-4 py-12 text-center text-white shadow-2xl sm:px-10 lg:px-16 lg:py-16">
              <h2 id="contact-band-title" className="mx-auto max-w-3xl text-3xl font-black tracking-tight sm:text-4xl">
                {contactBand.title}
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-blue-50">{contactBand.description}</p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <ButtonLink href="/contact" variant="white" size="xl">
                  {contactBand.contact}
                  <Icon name="arrowRight" />
                </ButtonLink>
                <ButtonLink href={cvPath} external variant="outlineLight" size="xl">
                  <Icon name="download" size={19} />
                  {contactBand.cv}
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col-reverse bg-white px-6 py-7 text-center">
      <dt className="mt-2 text-sm font-medium text-slate-500">{label}</dt>
      <dd className="text-2xl font-black text-ink">{value}</dd>
    </div>
  );
}
