import { MapPin, WhatsappLogo, Clock } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./reveal";
import { waLink, WA_DISPLAY } from "@/lib/data";

export function LocationSection() {
  return (
    <section id="lokasi" className="scroll-mt-20 bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <h2 className="text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
              Lokasi strategis di jantung Lumajang
            </h2>
            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={20} weight="duotone" className="mt-0.5 shrink-0 text-navy-600" />
                <p className="text-sm leading-relaxed text-navy-800/80">
                  Jl. Raya Klampokarum, Kec. Senduro, Kabupaten Lumajang,
                  Jawa Timur — akses jalan kabupaten langsung di depan site.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={20} weight="duotone" className="mt-0.5 shrink-0 text-navy-600" />
                <p className="text-sm leading-relaxed text-navy-800/80">
                  Hanya ±8 menit berkendara dari Alun-Alun Kota Lumajang.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <WhatsappLogo size={20} weight="duotone" className="mt-0.5 shrink-0 text-navy-600" />
                <p className="text-sm leading-relaxed text-navy-800/80">
                  Jadwalkan survey ke lokasi:{" "}
                  <a
                    href={waLink("Halo, saya ingin menjadwalkan survey ke lokasi Bhumi Saka Arum.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-navy-950 underline decoration-gold-400 decoration-2 underline-offset-2"
                  >
                    {WA_DISPLAY}
                  </a>
                </p>
              </div>
            </div>
            <a
              href={waLink("Halo, saya ingin menjadwalkan survey ke lokasi Bhumi Saka Arum.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-gold-400 px-6 py-3.5 text-sm font-bold text-navy-950 transition hover:bg-gold-300 active:scale-[0.98]"
            >
              <WhatsappLogo size={18} weight="bold" />
              Jadwalkan Survey
            </a>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="overflow-hidden rounded-2xl ring-1 ring-navy-100">
              <iframe
                title="Peta lokasi Bhumi Saka Arum, Klampokarum, Lumajang"
                src="https://www.google.com/maps?q=Bhumi%20Saka%20Arum%20Klampokarum%20Lumajang&output=embed"
                width="100%"
                height="420"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="block h-[420px] w-full border-0"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
