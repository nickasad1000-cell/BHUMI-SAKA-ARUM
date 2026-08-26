import Image from "next/image";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { waLink } from "@/lib/data";

export function Hero() {
  return (
    <section className="relative bg-navy-950">
      <div className="grid lg:grid-cols-2">
        <div className="relative h-[46dvh] min-h-[320px] lg:h-auto lg:min-h-[calc(100dvh-0px)]">
          <Image
            src="/images/hero-a01.webp"
            alt="Fasad rumah tipe A01 Bhumi Saka Arum"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-navy-950/30 lg:from-navy-950/40 lg:to-transparent" />
        </div>

        <div className="flex items-center px-4 py-14 sm:px-8 lg:min-h-[100dvh] lg:px-14 xl:px-20">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400">
              Klampokarum · Lumajang
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Rumah Subsidi{" "}
              <span className="text-gold-400">2 Lantai</span>, Satu-satunya di
              Lumajang
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-navy-100 sm:text-lg">
              Hunian modern siap huni, ±8 menit dari Alun-Alun Kota Lumajang.
              Booking hanya Rp 100 ribu.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={waLink(
                  "Halo, saya tertarik dengan rumah subsidi 2 lantai Bhumi Saka Arum. Boleh minta info lengkapnya?"
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-400 px-6 py-3.5 text-sm font-bold text-navy-950 transition hover:bg-gold-300 active:scale-[0.98]"
              >
                <WhatsappLogo size={18} weight="bold" />
                Chat WhatsApp
              </a>
              <a
                href="#harga"
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3.5 text-sm font-bold text-white transition hover:border-white/60 active:scale-[0.98]"
              >
                Lihat Pricelist
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
