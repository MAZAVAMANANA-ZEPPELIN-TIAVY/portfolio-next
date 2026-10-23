import { ContactForm } from "@/components/contact/ContactForm";
import { BackgroundDecor } from "@/components/ui/BackgroundDecor";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { contactAside, contactForm, contactHero, contactInfos } from "@/data/contact";
import { contact, seo } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ ...seo.contact, path: "/contact" });

export default function ContactPage() {
  return (
    <div className="relative isolate overflow-clip">
      <BackgroundDecor />

      <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-10 overflow-hidden rounded-[2rem] bg-ink px-5 py-10 text-center text-white shadow-2xl sm:px-8 lg:px-10 lg:py-14">
          <Badge icon="email">{contactHero.badge}</Badge>
          <h1 className="mx-auto mt-5 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            {contactHero.title}
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
            {contactHero.description}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
          <aside className="h-fit rounded-[2rem] bg-ink p-6 text-white shadow-2xl sm:p-8 lg:sticky lg:top-28">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">{contactAside.eyebrow}</p>
            <h2 className="mt-3 text-2xl font-black sm:text-3xl">{contactAside.title}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">{contactAside.description}</p>

            <ButtonLink
              href={contact.whatsappHref}
              external
              variant="success"
              size="lg"
              className="mt-7 flex w-full gap-3 rounded-2xl text-base"
            >
              <Icon name="whatsapp" size={21} />
              {contactAside.whatsapp}
            </ButtonLink>

            <ul className="mt-7 space-y-3">
              {contactInfos.map(({ icon, label, value, href, external }) => {
                const content = (
                  <>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/15 text-cyan-300">
                      <Icon name={icon} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm text-slate-400">{label}</span>
                      <span className="mt-1 block break-all font-semibold text-white">{value}</span>
                      {external && <span className="sr-only"> (nouvel onglet)</span>}
                    </span>
                  </>
                );
                return (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                        className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                        {content}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            <SocialLinks className="mt-6" itemClassName="border border-white/10 bg-white/10 text-white hover:bg-primary" />
          </aside>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl sm:p-8 lg:p-10">
            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">{contactForm.eyebrow}</p>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-ink sm:text-3xl">{contactForm.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">{contactForm.description}</p>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
