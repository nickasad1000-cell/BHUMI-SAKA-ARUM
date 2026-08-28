"use client";

import { PhotoGrid } from "@/components/photo-grid";
import { GALLERY } from "@/lib/data";

export function Gallery() {
  return (
    <section id="galeri" className="scroll-mt-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <h2 className="max-w-xl text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
          Lihat langsung unitnya
        </h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-navy-800/70">
          Dokumentasi asli unit peraga (show unit) — fasad depan, interior ruang tamu, kamar
          tidur, hingga detail kamar mandi. Ketuk foto untuk memperbesar.
        </p>

        <div className="mt-10">
          <PhotoGrid photos={[...GALLERY]} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
        </div>
      </div>
    </section>
  );
}
