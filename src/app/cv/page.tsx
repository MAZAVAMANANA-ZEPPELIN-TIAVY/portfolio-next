import type { ReactNode } from "react";
import { CvAnchorNav } from "@/components/cv/CvAnchorNav";
import { BackgroundDecor } from "@/components/ui/BackgroundDecor";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { Icon } from "@/components/ui/Icon";
import { IconCard } from "@/components/ui/IconCard";
import {
  cvContactCards,
  cvCta,
  cvHero,
  cvSections,
  education,
  experience,
  hobbies,
  languages,
  qualities,
  skills,
  type CvSection,
  type SkillBadge,
  type TimelineEntry,
} from "@/data/cv";
import type { IconName } from "@/data/icons";
import { cvPath } from "@/data/site";

export default function CurriculumVitaePage() {
  return (
    <div className="relative isolate overflow-clip px-4 py-10 sm:px-6 lg:px-8">
      <BackgroundDecor gradient thirdHalo />

      <div className="relative mx-auto max-w-7xl">
        <section className="mb-8 overflow-hidden rounded-[2rem] bg-ink text-white shadow-2xl">
          <div className="grid gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:px-10 lg:py-12">
            <div>
              <Badge icon="userGraduate" className="mb-5">
                {cvHero.badge}
              </Badge>

              <h1 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">{cvHero.title}</h1>

              <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
                {cvHero.description}
              </p>

              <ul className="mt-6 flex flex-wrap gap-3">
                {cvHero.pills.map((pill) => (
                  <li
                    key={pill.label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-200"
                  >
                    <Icon name={pill.icon} className="text-cyan-300" />
                    {pill.label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4 lg:items-end">
              <ButtonLink
                href={cvPath}
                external
                variant="white"
                className="w-full shadow-lg sm:w-auto"
              >
                <Icon name="downloadSolid" />
                {cvHero.download}
              </ButtonLink>

              <div className="w-full rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur sm:max-w-sm">
                <h2 className="text-sm font-bold text-white">{cvHero.summaryTitle}</h2>
                <p className="mt-2 text-sm leading-7 text-slate-300">{cvHero.summary}</p>
              </div>
            </div>
          </div>
        </section>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {cvContactCards.map((card) => (
            <IconCard key={card.label} variant="info" icon={card.icon} title={card.label}>
              <span className="break-all">{card.value}</span>
            </IconCard>
          ))}
        </div>

        <CvAnchorNav sections={cvSections.map(({ id, title }) => ({ id, title }))} />

        <div className="mb-8 grid gap-6 xl:grid-cols-2">
          <Card section={education}>
            <Timeline icon={education.icon} entries={education.entries} />
          </Card>
          <Card section={experience}>
            <Timeline icon={experience.icon} entries={experience.entries} />
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <Card section={skills}>
            <div className="mt-8 space-y-8">
              {skills.blocks.map((block) => (
                <div key={block.title}>
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-ink">
                    <Icon name={block.icon} className="text-primary" />
                    {block.title}
                  </h3>
                  <ul className="flex flex-wrap gap-3">
                    {block.badges.map((badge) => (
                      <SkillPill key={badge.name} badge={badge} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>

          <div className="space-y-6">
            <Card section={languages}>
              <ul className="mt-6 space-y-4">
                {languages.items.map((language) => (
                  <li key={language.label} className="rounded-2xl border border-slate-100 bg-surface p-4 shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-bold text-ink">{language.label}</span>
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-primary">
                        {language.level}
                      </span>
                    </div>
                    <div
                      role="img"
                      aria-label={`Niveau : ${language.progress} %`}
                      className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200"
                    >
                      <div className="h-full rounded-full bg-primary" style={{ width: `${language.progress}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </Card>

            <Card section={hobbies}>
              <ul className="mt-6 flex flex-wrap gap-3">
                {hobbies.items.map((hobby) => (
                  <SkillPill key={hobby.name} badge={hobby} muted />
                ))}
              </ul>
            </Card>

            <Card section={qualities}>
              <ul className="mt-6 space-y-3">
                {qualities.items.map((quality) => (
                  <li
                    key={quality}
                    className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-surface p-3 text-sm font-semibold text-slate-700"
                  >
                    <Icon name="checkCircle" className="text-primary" />
                    {quality}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>

        <CtaBand tone="night" size="md" eyebrow={cvCta.eyebrow} title={cvCta.title} description={cvCta.description} className="mt-8">
          <ButtonLink href="/contact" variant="white" size="base">
            {cvCta.button}
            <Icon name="arrowRight" />
          </ButtonLink>
        </CtaBand>
      </div>
    </div>
  );
}

/** Carte d'une section du CV, cible d'ancre (D11). */
function Card({ section, children }: { section: CvSection; children: ReactNode }) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="scroll-mt-40 rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl sm:p-8"
    >
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-primary shadow-sm">
        <Icon name={section.icon} />
      </div>
      <h2 id={`${section.id}-title`} className="text-2xl font-black tracking-tight text-ink sm:text-3xl">
        {section.title}
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-500">{section.subtitle}</p>
      {children}
    </section>
  );
}

function Timeline({ icon, entries }: { icon: IconName; entries: TimelineEntry[] }) {
  return (
    <ol className="mt-8 space-y-6">
      {entries.map((entry) => (
        <li key={entry.title} className="relative pl-8 sm:pl-10">
          <div aria-hidden="true" className="absolute left-[9px] top-0 h-full w-px bg-slate-200" />
          <div
            aria-hidden="true"
            className="absolute left-0 top-1 flex h-5 w-5 items-center justify-center rounded-full border border-primary-soft bg-blue-50 text-[10px] text-primary shadow-sm"
          >
            <Icon name={icon} />
          </div>

          <div className="rounded-2xl border border-slate-100 bg-surface p-4 transition hover:bg-white hover:shadow-sm sm:p-5">
            <h3 className="text-base font-bold leading-7 text-ink sm:text-lg">{entry.title}</h3>
            <p className="mt-1 text-sm font-bold text-primary">{entry.period}</p>
            <p className="mt-1 text-sm italic text-slate-500">{entry.place}</p>
            {entry.description && <p className="mt-3 text-sm leading-7 text-slate-600">{entry.description}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}

/**
 * Badge du CV : avec icône sur fond blanc (TechBadge d'origine), texte seul sur fond gris (TextBadge)
 * ou, avec `muted`, icône sur fond gris (HobbyBadge).
 */
function SkillPill({ badge, muted = false }: { badge: SkillBadge; muted?: boolean }) {
  const tone = badge.icon && !muted ? "bg-white" : "bg-surface";
  return (
    <li
      className={`inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${tone}`}
    >
      {badge.icon && <Icon name={badge.icon} className="text-primary" />}
      {badge.name}
    </li>
  );
}
