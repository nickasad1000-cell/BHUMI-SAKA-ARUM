import {
  ArrowsOut,
  Bathtub,
  Bed,
  CheckCircle,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./reveal";
import { ZoomImage } from "./photo-grid";
import {
  HOUSE_PRICE,
  INSTALLMENTS,
  SPEC_FLOOR_1,
  SPEC_FLOOR_2,
  formatRupiah,
  waLink,
} from "@/lib/data";

const TYPES = [
  {
    label: "Tipe Lantai 1",
    image: "/images/living-lantai1.webp",
    alt: "Interior rumah tipe lantai 1 Bhumi Saka Arum",
    specs: SPEC_FLOOR_1,
  },
  {
    label: "Tipe Lantai 2",
    badge: "Unggulan",
    image: "/images/living-stairs.webp",
    alt: "Ruang tengah rumah 2 lantai dengan tangga besi",
    specs: SPEC_FLOOR_2,
  },
];

export function HouseTypes() {
  return (
    <section id="tipe" className="scroll-mt-20 bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <Reveal>
          <h2 className="max-w-xl text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
            Tipe rumah
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-navy-800/70">
            Tipe 36 dengan pilihan lantai 1 atau 2 lantai.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {TYPES.map((t, i) => (
            <Reveal key={t.label} delay={i * 0.1} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-navy-100 transition-shadow hover:shadow-lg">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ZoomImage
                    src={t.image}
                    alt={t.alt}
                    className="h-full w-full rounded-none"
                    imgClassName="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
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
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-navy-800">
                    <span className="inline-flex items-center gap-1.5">
                      <ArrowsOut size={16} weight="bold" className="text-navy-600" />
                      Tipe 36
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
                  <ul className="mt-5 flex-1 space-y-2.5">
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
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-6 rounded-2xl bg-navy-950 p-6 text-white sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-x-10 gap-y-5">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-400">
                    Harga rumah
                  </p>
                  <p className="mt-1.5 text-2xl font-extrabold tracking-tight sm:text-3xl">
                    {formatRupiah(HOUSE_PRICE)}
                  </p>
                </div>
                <div className="hidden h-12 w-px bg-white/15 sm:block" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-navy-200">
                    Angsuran mulai
                  </p>
                  <p className="mt-1.5 text-xl font-extrabold tracking-tight sm:text-2xl">
                    {formatRupiah(INSTALLMENTS[2].monthly)}
                    <span className="ml-1 text-sm font-semibold text-white/60">
                      /bulan · 20 tahun
                    </span>
                  </p>
                </div>
              </div>
              <a
                href={waLink(
                  "Halo, saya ingin bertanya harga dan ketersediaan unit Bhumi Saka Arum."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-400 px-6 py-3.5 text-sm font-bold text-navy-950 transition hover:bg-gold-300 active:scale-[0.98]"
              >
                <WhatsappLogo size={18} weight="bold" />
                Tanya harga
              </a>
            </div>
            <p className="mt-5 border-t border-white/10 pt-4 text-xs leading-relaxed text-white/55">
              Angsuran merupakan simulasi tenor 20 tahun. Nilai final ditentukan
              oleh bank.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
