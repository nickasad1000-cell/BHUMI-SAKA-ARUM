import Image from "next/image";
import { Bed, Bathtub, ArrowsOut, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./reveal";
import { SPEC_FLOOR_1, SPEC_FLOOR_2, formatRupiah, INSTALLMENTS } from "@/lib/data";

const TYPES = [
  {
    label: "Tipe Lantai 1",
    title: "Type 36 · Lantai 1",
    image: "/images/living-sofa.webp",
    alt: "Ruang tamu rumah tipe lantai 1",
    specs: SPEC_FLOOR_1,
    installment: INSTALLMENTS[2].monthly,
  },
  {
    label: "Tipe Lantai 2",
    title: "Type 36 · 2 Lantai",
    badge: "Unggulan",
    image: "/images/living-stairs.webp",
    alt: "Ruang tengah rumah 2 lantai dengan tangga besi",
    specs: SPEC_FLOOR_2,
    installment: INSTALLMENTS[2].monthly,
  },
];

export function HouseTypes() {
  return (
    <section id="tipe" className="scroll-mt-20 bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <Reveal>
          <h2 className="max-w-xl text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
            Dua pilihan tipe, satu standar kualitas
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-navy-800/70">
            Semua unit dibangun dengan spesifikasi yang sama baiknya — pilih
            yang paling pas untuk keluarga Anda.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {TYPES.map((t, i) => (
            <Reveal key={t.label} delay={i * 0.1}>
              <article className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-navy-100 transition-shadow hover:shadow-lg">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={t.image}
                    alt={t.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-navy-950/85 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur">
                    {t.label}
                  </span>
                  {t.badge && (
                    <span className="absolute right-4 top-4 rounded-full bg-gold-400 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-navy-950">
                      {t.badge}
                    </span>
                  )}
                </div>
                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-navy-800">
                    <span className="inline-flex items-center gap-1.5">
                      <ArrowsOut size={16} weight="bold" className="text-navy-600" />
                      Type 36
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Bed size={16} weight="bold" className="text-navy-600" />
                      2 Kamar Tidur
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Bathtub size={16} weight="bold" className="text-navy-600" />
                      1 Kamar Mandi
                    </span>
                  </div>
                  <ul className="mt-5 space-y-2.5">
                    {t.specs.map((s) => (
                      <li
                        key={s}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-navy-800/80"
                      >
                        <CheckCircle
                          size={17}
                          weight="fill"
                          className="mt-0.5 shrink-0 text-gold-500"
                        />
                        {s}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-navy-100 pt-5">
                    <span className="text-2xl font-extrabold tracking-tight text-navy-950">
                      {formatRupiah(166_000_000)}
                    </span>
                    <span className="text-sm font-medium text-navy-800/60">
                      angsuran mulai {formatRupiah(t.installment)}/bln (20 th)
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
