"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type TouchEvent } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import { projectDetail, type ProjectImage } from "@/data/projects";

type ProjectGalleryProps = {
  title: string;
  images: ProjectImage[];
};

/** Galerie du projet : 1re capture pleine largeur, les autres en 2 colonnes ; clic → lightbox. */
export function ProjectGallery({ title, images }: ProjectGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);

  const close = () => {
    const index = selectedIndex;
    setSelectedIndex(null);
    // Retour du focus sur la miniature de l'image affichée en dernier (D6).
    if (index !== null) requestAnimationFrame(() => triggers.current[index]?.focus());
  };

  if (images.length === 0) {
    return (
      <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
        {projectDetail.galleryEmpty}
      </div>
    );
  }

  return (
    <>
      <ul className="grid gap-5 sm:grid-cols-2">
        {images.map((image, index) => (
          <Reveal as="li" key={image.src} delay={index === 0 ? 0 : ((index - 1) % 2) * 100} className={index === 0 ? "sm:col-span-2" : ""}>
            <button
              ref={(element) => {
                triggers.current[index] = element;
              }}
              type="button"
              onClick={() => setSelectedIndex(index)}
              aria-label={`${projectDetail.captureLabel} ${index + 1} : agrandir`}
              className="group relative block w-full overflow-hidden rounded-[1.5rem] border border-slate-200 bg-linear-to-br from-slate-900 via-blue-900 to-primary text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <span className={`relative block ${index === 0 ? "h-72 sm:h-112" : "h-64"}`}>
                <SafeImage
                  src={image.src}
                  alt={`${title} — capture ${index + 1}`}
                  fill
                  sizes={index === 0 ? "(min-width: 80rem) 760px, (min-width: 64rem) 60vw, 100vw" : "(min-width: 80rem) 380px, (min-width: 64rem) 30vw, (min-width: 40rem) 50vw, 100vw"}
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </span>
              <span className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-black text-slate-800 shadow">
                {projectDetail.captureLabel} {index + 1}
              </span>
              <span className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-ink opacity-0 shadow transition group-hover:opacity-100 group-focus-visible:opacity-100">
                <Icon name="expand" />
              </span>
            </button>
          </Reveal>
        ))}
      </ul>

      {/* Portail dans <body> : au-dessus du header, hors du contexte d'empilement de la page. */}
      {selectedIndex !== null &&
        images[selectedIndex] &&
        createPortal(
          <Lightbox title={title} images={images} index={selectedIndex} onChange={setSelectedIndex} onClose={close} />,
          document.body,
        )}
    </>
  );
}

type LightboxProps = {
  title: string;
  images: ProjectImage[];
  index: number;
  onChange: (index: number) => void;
  onClose: () => void;
};

const LIGHTBOX_SIZES = "(min-width: 72rem) 1152px, 100vw";

function Lightbox({ title, images, index, onChange, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<number | null>(null);
  const count = images.length;
  const image = images[index]!;

  const previous = () => onChange(index === 0 ? count - 1 : index - 1);
  const next = () => onChange(index === count - 1 ? 0 : index + 1);

  // Toujours appeler la dernière version des gestionnaires depuis l'écouteur clavier.
  const handlers = useRef({ previous, next, onClose });
  useEffect(() => {
    handlers.current = { previous, next, onClose };
  });

  // Ouverture : scroll bloqué, focus sur « Fermer », clavier (Échap, ←, →) et piège du focus (D6).
  useEffect(() => {
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handlers.current.onClose();
      else if (event.key === "ArrowLeft" && count > 1) handlers.current.previous();
      else if (event.key === "ArrowRight" && count > 1) handlers.current.next();
      else if (event.key === "Tab") {
        const focusables = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>("button") ?? []);
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [count]);

  // Swipe horizontal sur écran tactile (D12).
  const onTouchStart = (event: TouchEvent) => {
    touchStart.current = event.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (event: TouchEvent) => {
    const start = touchStart.current;
    const end = event.changedTouches[0]?.clientX;
    touchStart.current = null;
    if (start === null || end === undefined || count < 2) return;
    const delta = end - start;
    if (Math.abs(delta) > 50) {
      if (delta > 0) previous();
      else next();
    }
  };

  // Préchargement des images voisines (D12) : mêmes props que l'image affichée → même URL optimisée.
  const neighbours = count > 1 ? [...new Set([(index + 1) % count, (index - 1 + count) % count])] : [];

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${projectDetail.lightbox.label} ${title}`}
      // touch-action / overscroll : le swipe horizontal change d'image au lieu de déclencher le « retour » du navigateur.
      className="fixed inset-0 z-999 flex touch-pan-y touch-pinch-zoom items-center justify-center overscroll-contain bg-slate-950/95 p-3 backdrop-blur-md sm:p-6"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="relative flex max-h-full w-full max-w-6xl flex-col items-center"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative max-w-full">
          <Image
            key={image.src}
            src={image.src}
            alt={`${title} — aperçu ${index + 1}`}
            width={image.width}
            height={image.height}
            sizes={LIGHTBOX_SIZES}
            quality={90}
            loading="eager"
            className="h-auto max-h-[68vh] w-auto max-w-full rounded-[1.5rem] object-contain shadow-2xl"
          />

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="absolute right-2 top-2 flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-white hover:text-ink sm:right-4 sm:top-4"
            aria-label={projectDetail.lightbox.close}
          >
            <Icon name="times" />
          </button>

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={previous}
                className="absolute left-1 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-white hover:text-ink sm:left-4"
                aria-label={projectDetail.lightbox.previous}
              >
                <Icon name="chevronLeft" />
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-1 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-white hover:text-ink sm:right-4"
                aria-label={projectDetail.lightbox.next}
              >
                <Icon name="chevronRight" />
              </button>
            </>
          )}
        </div>
        {neighbours.map((i) => (
          <Image
            key={images[i]!.src}
            src={images[i]!.src}
            alt=""
            aria-hidden="true"
            width={images[i]!.width}
            height={images[i]!.height}
            sizes={LIGHTBOX_SIZES}
            quality={90}
            loading="eager"
            className="hidden"
          />
        ))}

        <p aria-live="polite" className="mt-4 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur">
          {index + 1} / {count}
        </p>

        {count > 1 && (
          <div
            role="group"
            aria-label={projectDetail.lightbox.thumbnails}
            className="mt-3 flex max-w-full gap-2 overflow-x-auto px-1 py-1 [scrollbar-width:none]"
          >
            {images.map((thumb, i) => (
              <button
                key={thumb.src}
                type="button"
                onClick={() => onChange(i)}
                aria-label={`${projectDetail.captureLabel} ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                className={`relative h-12 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition sm:h-14 sm:w-24 ${
                  i === index ? "border-cyan-300 opacity-100" : "border-transparent opacity-50 hover:opacity-90"
                }`}
              >
                <Image src={thumb.src} alt="" fill sizes="96px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
