import type { Metadata } from "next";
import { BackgroundDecor } from "@/components/ui/BackgroundDecor";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { notFoundPage, seo } from "@/data/site";

export const metadata: Metadata = { title: seo.notFound.title };

/** D14 — Page 404 du site, dans le style des heros sombres. */
export default function NotFound() {
  return (
    <div className="relative isolate overflow-clip px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <BackgroundDecor />
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] bg-ink px-6 py-14 text-center text-white shadow-2xl sm:px-10">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute -bottom-16 right-0 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
        </div>
        <div className="relative">
          <Badge>{notFoundPage.eyebrow}</Badge>
          <p
            aria-hidden="true"
            className="mt-6 bg-linear-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-7xl font-black tracking-tight text-transparent sm:text-8xl"
          >
            404
          </p>
          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">{notFoundPage.title}</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">{notFoundPage.description}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/" variant="white" size="base">
              <Icon name="arrowLeft" />
              {notFoundPage.home}
            </ButtonLink>
            <ButtonLink href="/projets" variant="glass" size="base">
              {notFoundPage.projects}
              <Icon name="arrowRight" />
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
