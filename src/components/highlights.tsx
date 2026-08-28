import { House, MapPin, ShieldCheck, Tag } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./reveal";

const ITEMS = [
  {
    icon: Tag,
    title: "Booking Rp 100 ribu",
    desc: "Promo terbatas untuk mengunci unit pilihan Anda.",
  },
  {
    icon: ShieldCheck,
    title: "Gratis DP & Pajak",
    desc: "Bebas biaya realisasi, administrasi, balik nama, dan pajak.",
  },
  {
    icon: MapPin,
    title: "±8 Menit dari Alun-Alun",
    desc: "Lokasi strategis di Klampokarum, dekat pusat Kota Lumajang.",
  },
  {
    icon: House,
    title: "Siap Huni Tanpa Renovasi",
    desc: "Bisa dikembangkan sesuai kebutuhan keluarga Anda.",
  },
];

export function Highlights() {
  return (
    <section className="border-b border-navy-100 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-6 gap-y-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {ITEMS.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.06}>
            <div className="flex items-start gap-3.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                <item.icon size={22} weight="duotone" />
              </span>
              <div>
                <p className="text-sm font-bold text-navy-950">
                  {item.title}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-navy-800/70">
                  {item.desc}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
