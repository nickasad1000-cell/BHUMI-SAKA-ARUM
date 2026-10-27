import {
  ArrowSquareOut,
  Clock,
  MapPin,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./reveal";
import { waLink, WA_DISPLAY } from "@/lib/data";

const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Bhumi%20Saka%20Arum%20Klampokarum%20Lumajang";

export function LocationSection() {
  return (
    <section id="lokasi" className="scroll-mt-20 bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-5 lg:gap-12">
          <Reveal className="lg:col-span-2">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">
              Alamat &amp; akses
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
              Lokasi
            </h2>
            <p className="mt-3 max-w-md text-base leading-relaxed text-navy-800/70">
              Akses langsung dari Jl. Raya Klampokarum, sekitar 8 menit dari
              pusat Kota Lumajang.
            </p>

            <div className="mt-6 rounded-2xl bg-white p-5 ring-1 ring-navy-100 sm:p-6">
              <ul className="space-y-5">
                <li className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                    <MapPin size={20} weight="duotone" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-navy-800/60">
                      Alamat
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-navy-800/80">
                      Jl. Raya Klampokarum, Kec. Kunir, Kabupaten Lumajang,
                      Jawa Timur.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                    <Clock size={20} weight="duotone" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-navy-800/60">
                      Waktu tempuh
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-navy-800/80">
                      ±8 menit dari Alun-Alun Kota Lumajang.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                    <WhatsappLogo size={20} weight="duotone" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-navy-800/60">
                      Survey &amp; informasi
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-navy-800/80">
                      <a
                        href={waLink(
                          "Halo, saya ingin menjadwalkan survey ke lokasi Bhumi Saka Arum."
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-navy-950 underline decoration-gold-400 decoration-2 underline-offset-2"
                      >
                        {WA_DISPLAY}
                      </a>
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <a
              href={waLink(
                "Halo, saya ingin menjadwalkan survey ke lokasi Bhumi Saka Arum."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-400 px-6 py-3.5 text-sm font-bold text-navy-950 transition hover:bg-gold-300 active:scale-[0.98] sm:w-auto"
            >
              <WhatsappLogo size={18} weight="bold" />
              Jadwalkan Survey
            </a>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="overflow-hidden rounded-2xl bg-white p-2 ring-1 ring-navy-100">
              <iframe
                title="Peta lokasi Bhumi Saka Arum, Klampokarum, Lumajang"
                src="https://www.google.com/maps?q=Bhumi%20Saka%20Arum%20Klampokarum%20Lumajang&output=embed"
                width="100%"
                height="420"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="pointer-events-none block h-[360px] w-full rounded-xl border-0 sm:h-[420px] md:pointer-events-auto lg:h-[460px]"
              />
            </div>
            <a
              href={MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800 transition hover:text-navy-950"
            >
              <ArrowSquareOut size={16} weight="bold" />
              Buka peta di Google Maps
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
