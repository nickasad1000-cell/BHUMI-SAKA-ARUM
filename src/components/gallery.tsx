"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { X, CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";
import { GALLERY } from "@/lib/data";

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setActive((cur) =>
        cur === null ? null : (cur + dir + GALLERY.length) % GALLERY.length
      ),
    []
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

  return (
    <section id="galeri" className="scroll-mt-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <h2 className="max-w-xl text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
          Lihat langsung unitnya
        </h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-navy-800/70">
          Dokumentasi asli unit show — eksterior, interior, hingga detail
          kamar mandi. Ketuk foto untuk memperbesar.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {GALLERY.map((photo, i) => (
            <button
              key={photo.src}
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
                sizes="(max-width: 768px) 100vw, 50vw"
                className={`object-cover transition-transform duration-500 group-hover:scale-[1.04] ${
                  photo.wide ? "object-[50%_65%]" : ""
                }`}
              />
              <span className="absolute inset-0 bg-navy-950/0 transition-colors group-hover:bg-navy-950/15" />
            </button>
          ))}
        </div>
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
                src={GALLERY[active].src}
                alt={GALLERY[active].alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
              <figcaption className="absolute inset-x-0 bottom-0 rounded-lg bg-navy-950/70 px-4 py-2.5 text-center text-xs font-medium text-white backdrop-blur">
                {GALLERY[active].alt}
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
    </section>
  );
}
