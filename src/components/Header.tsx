"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cvPath, header, navItems, site } from "@/data/site";
import { Icon } from "./ui/Icon";

function isActivePath(pathname: string, path: string) {
  return path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(`${path}/`);
}

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const closeAndRestoreFocus = () => {
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  // Menu ouvert : scroll bloqué, focus dans le menu, piège du focus (Tab), Échap pour fermer (D6).
  useEffect(() => {
    if (!isOpen) return;

    const menu = menuRef.current;
    const button = buttonRef.current;
    const focusables = () => [
      ...(button ? [button] : []),
      ...Array.from(menu?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []),
    ];

    document.body.style.overflow = "hidden";
    focusables()[1]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        button?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    // Le menu n'existe qu'en dessous de md : on le ferme si la fenêtre s'élargit.
    const desktop = window.matchMedia("(min-width: 48rem)");
    const handleDesktop = () => desktop.matches && setIsOpen(false);

    window.addEventListener("keydown", handleKeyDown);
    desktop.addEventListener("change", handleDesktop);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      desktop.removeEventListener("change", handleDesktop);
    };
  }, [isOpen]);

  const desktopLink = (active: boolean) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition duration-300 ${
      active
        ? "bg-ink text-white shadow-lg shadow-slate-950/15"
        : "text-slate-600 hover:bg-surface-muted hover:text-ink"
    }`;

  const mobileLink = (active: boolean) =>
    `flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-bold transition ${
      active ? "bg-ink text-white shadow-lg" : "bg-white text-slate-700 hover:bg-blue-50 hover:text-primary-strong"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-current={pathname === "/" ? "page" : undefined}
          onClick={() => setIsOpen(false)}
          className="group flex shrink-0 items-center gap-3 rounded-2xl"
        >
          <span
            aria-hidden="true"
            className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br from-primary-strong via-primary to-accent text-lg font-black text-white shadow-lg shadow-blue-600/20"
          >
            Z
            <span className="absolute inset-0 translate-y-full bg-white/20 transition duration-300 group-hover:translate-y-0" />
          </span>

          <span className="leading-tight">
            <span className="block text-base font-black tracking-tight text-ink sm:text-lg">{site.name}</span>
            <span className="mt-0.5 flex items-center gap-2 text-xs font-medium text-slate-500">
              <span className="h-2 w-2 rounded-full bg-success shadow-[0_0_0_4px_rgba(16,185,129,0.12)]" />
              {site.availability}
            </span>
          </span>
        </Link>

        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-1 rounded-full border border-slate-200 bg-white p-1.5 shadow-sm md:flex"
        >
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.path);
            return (
              <Link
                key={item.path}
                href={item.path}
                aria-current={active ? "page" : undefined}
                className={desktopLink(active)}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href={cvPath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:-translate-y-0.5 hover:border-primary-soft hover:bg-blue-50 hover:text-primary-strong"
          >
            <Icon name="download" size={18} />
            {header.cvButton}
          </a>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-ink"
          >
            {header.cta}
            <Icon name="arrowRightOutline" size={18} />
          </Link>
        </div>

        <button
          ref={buttonRef}
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm transition hover:bg-surface-muted md:hidden"
        >
          <Icon name={isOpen ? "close" : "menu"} size={25} />
        </button>
      </div>

      <div
        className={`fixed inset-x-0 bottom-0 top-20 bg-slate-950/30 p-4 backdrop-blur-sm transition md:hidden ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        onClick={closeAndRestoreFocus}
        inert={!isOpen}
      >
        <div
          ref={menuRef}
          id="mobile-menu"
          className={`mx-auto max-w-lg rounded-[1.75rem] border border-slate-200 bg-surface p-3 shadow-2xl transition duration-300 ${
            isOpen ? "translate-y-0 scale-100" : "-translate-y-3 scale-95"
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          <nav aria-label="Navigation mobile" className="space-y-2">
            {navItems.map((item) => {
              const active = isActivePath(pathname, item.path);
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setIsOpen(false)}
                  className={mobileLink(active)}
                >
                  {item.name}
                  <Icon name="arrowRightOutline" size={18} />
                </Link>
              );
            })}
          </nav>

          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <a
              href={cvPath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700"
            >
              <Icon name="download" size={18} />
              {header.mobileCv}
            </a>

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-bold text-white"
            >
              {header.mobileCta}
              <Icon name="arrowRightOutline" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
