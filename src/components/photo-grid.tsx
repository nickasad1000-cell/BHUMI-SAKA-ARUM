"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { X, CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";

export type LightboxPhoto = {
  src: string;
  alt: string;
};

/** Grid foto + lightbox klik-perbesar (keyboard & touch friendly). */
export function PhotoGrid({
  photos,
  columns = 4,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  photos: (LightboxPhoto & { wide?: boolean })[];
  columns?: 3 | 4;
  sizes?: string;
}) {
  const [active, setActive] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setActive((cur) =>
        cur === null ? null : (cur + dir + photos.length) % photos.length
      ),
    [photos.length]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, step]);

  const gridCols =
    columns === 4 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2 md:grid-cols-3";

  return (
    <>
      <div className={`grid gap-3 md:gap-4 ${gridCols}`}>
        {photos.map((photo, i) => (
          <button
            key={photo.src + i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Perbesar foto: ${photo.alt}`}
            className={`group relative overflow-hidden rounded-xl bg-navy-50 ${
              photo.wide ? "col-span-2 aspect-[16/11]" : "aspect-[3/4]"
            }`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes={sizes}
              className={`object-cover transition-transform duration-500 group-hover:scale-[1.04] ${
                photo.wide ? "object-[50%_65%]" : ""
              }`}
            />
            <span className="absolute inset-0 bg-navy-950/0 transition-colors group-hover:bg-navy-950/15" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/95 p-4"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Galeri foto"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Tutup galeri"
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/20"
            >
              <X size={22} weight="bold" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Foto sebelumnya"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/20 sm:left-6"
            >
              <CaretLeft size={22} weight="bold" />
            </button>
            <motion.figure
              key={active}
              initial={reduce ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="relative h-[82dvh] w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photos[active].src}
                alt={photos[active].alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
              <figcaption className="absolute inset-x-0 bottom-0 rounded-lg bg-navy-950/70 px-4 py-2.5 text-center text-xs font-medium text-white backdrop-blur">
                {photos[active].alt}
              </figcaption>
            </motion.figure>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Foto berikutnya"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/20 sm:right-6"
            >
              <CaretRight size={22} weight="bold" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/** Satu foto yang bisa diklik untuk lightbox penuh (untuk hero kartu/siteplan). */
export function ZoomImage({
  src,
  alt,
  caption,
  className,
  imgClassName,
  priority,
  width,
  height,
  sizes,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Perbesar: ${alt}`}
        className={`group relative cursor-zoom-in overflow-hidden rounded-xl bg-navy-50 ${className ?? ""}`}
      >
        <Image
          src={src}
          alt={alt}
          fill={width === undefined}
          {...(width !== undefined ? { width, height } : {})}
          priority={priority}
          sizes={sizes ?? "100vw"}
          className={imgClassName ?? ""}
        />
        <span className="absolute inset-0 bg-navy-950/0 transition-colors group-hover:bg-navy-950/15" />
        <span className="absolute bottom-3 right-3 rounded-full bg-navy-950/80 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white opacity-90 backdrop-blur">
          Klik untuk perbesar
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/95 p-4"
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`Foto ${caption ?? alt}`}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Tutup foto"
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/20"
            >
              <X size={22} weight="bold" />
            </button>
            <motion.figure
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative h-[86dvh] w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={src} alt={alt} fill sizes="100vw" className="object-contain" />
              {(caption || alt) && (
                <figcaption className="absolute inset-x-0 bottom-0 rounded-lg bg-navy-950/70 px-4 py-2.5 text-center text-xs font-medium text-white backdrop-blur">
                  {caption ?? alt}
                </figcaption>
              )}
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
