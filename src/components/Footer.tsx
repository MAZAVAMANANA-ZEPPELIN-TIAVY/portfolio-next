import { cacheLife } from "next/cache";
import Link from "next/link";
import type { ReactNode } from "react";
import { contact, cvPath, footer, navItems, site } from "@/data/site";
import { FooterCtaGate } from "./FooterCtaGate";
import { Icon } from "./ui/Icon";
import { SocialLinks } from "./ui/SocialLinks";

/** Année du copyright, figée dans la page statique et recalculée chaque jour. */
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden bg-ink text-slate-300">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-6 lg:px-8">
        <FooterCtaGate>
          <div className="mb-14 grid gap-8 overflow-hidden rounded-[2rem] border border-white/10 bg-linear-to-r from-primary-strong via-primary to-accent-end px-6 py-9 shadow-2xl sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center lg:px-10">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-100">{footer.cta.eyebrow}</p>
              <h2 className="mt-3 max-w-2xl text-2xl font-black tracking-tight text-white sm:text-3xl">
                {footer.cta.title}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-50 sm:text-base">{footer.cta.description}</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-ink transition hover:-translate-y-0.5 hover:bg-cyan-100"
              >
                {footer.cta.primary}
                <Icon name="arrowRightOutline" size={19} />
              </Link>

              <a
                href={contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 font-bold text-white transition hover:bg-white/20"
              >
                <Icon name="whatsapp" size={19} />
                {footer.cta.whatsapp}
              </a>
            </div>
          </div>
        </FooterCtaGate>

        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.7fr_0.85fr_1.1fr]">
          <div>
            <Link href="/" className="group inline-flex items-center gap-3 rounded-2xl">
              <span
                aria-hidden="true"
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-primary via-sky-500 to-accent text-lg font-black text-white shadow-lg shadow-blue-500/20"
              >
                Z
              </span>
              <span>
                <span className="block text-lg font-black tracking-tight text-white">{site.name}</span>
                <span className="block text-sm text-slate-400 transition group-hover:text-cyan-300">
                  {site.jobTitle}
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">{footer.about}</p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {footer.techs.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-cyan-100"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <nav aria-labelledby="footer-navigation">
            <FooterTitle id="footer-navigation">{footer.navigationTitle}</FooterTitle>
            <ul className="space-y-3 text-sm">
              {navItems.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="group inline-flex items-center gap-2 text-slate-400 transition hover:text-white"
                  >
                    <Icon
                      name="arrowRightOutline"
                      className="text-blue-400 transition group-hover:translate-x-1"
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <FooterTitle>{footer.servicesTitle}</FooterTitle>
            <ul className="space-y-3 text-sm text-slate-400">
              {footer.services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>

            <a
              href={cvPath}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
            >
              <Icon name="download" size={18} />
              {footer.cvLink}
            </a>
          </div>

          <div>
            <FooterTitle>{footer.contactTitle}</FooterTitle>
            <div className="space-y-3 text-sm">
              <a
                href={contact.emailHref}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
              >
                <Icon name="emailOutline" className="mt-0.5 shrink-0 text-blue-400" size={20} />
                <span className="min-w-0">
                  <span className="block font-semibold text-white">{footer.emailLabel}</span>
                  <span className="block break-all text-slate-400">{contact.email}</span>
                </span>
              </a>

              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <Icon name="locationOutline" className="mt-0.5 shrink-0 text-blue-400" size={20} />
                <span>
                  <span className="block font-semibold text-white">{footer.locationLabel}</span>
                  <span className="text-slate-400">{site.location}</span>
                </span>
              </div>
            </div>

            <SocialLinks
              className="mt-5"
              itemClassName="border border-white/10 bg-white/5 text-slate-200 hover:bg-primary hover:text-white"
            />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>
            © <CurrentYear /> {site.fullName}. {footer.rights}
          </p>
          <p>{footer.tagline}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterTitle({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h2 id={id} className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-white">
      {children}
    </h2>
  );
}
