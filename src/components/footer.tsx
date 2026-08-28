import Image from "next/image";
import { WhatsappLogo, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import { COMPANY, WA_DISPLAY, waLink } from "@/lib/data";
import { ScrollTo } from "@/components/scroll-to";

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                <Image
                  src="/images/logo.png"
                  alt="Logo Bhumi Saka Arum"
                  width={24}
                  height={22}
                  className="h-6 w-auto"
                />
              </span>
              <div>
                <p className="text-sm font-extrabold">Bhumi Saka Arum</p>
                <p className="text-xs text-white/60">{COMPANY}</p>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Perumahan rumah subsidi 2 lantai satu-satunya di Lumajang —
              hunian modern siap huni untuk keluarga Anda.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/80">
              Kontak
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2.5">
                <MapPin size={17} weight="duotone" className="mt-0.5 shrink-0 text-gold-400" />
                Klampokarum, Kec. Senduro, Kabupaten Lumajang, Jawa Timur
              </li>
              <li>
                <a
                  href={waLink("Halo, saya tertarik dengan Bhumi Saka Arum.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 transition hover:text-white"
                >
                  <Phone size={17} weight="duotone" className="shrink-0 text-gold-400" />
                  {WA_DISPLAY}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/80">
              Navigasi
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              <li><ScrollTo target="tipe" className="text-left transition hover:text-white">Tipe Rumah</ScrollTo></li>
              <li><ScrollTo target="harga" className="text-left transition hover:text-white">Pricelist</ScrollTo></li>
              <li><ScrollTo target="galeri" className="text-left transition hover:text-white">Galeri</ScrollTo></li>
              <li><ScrollTo target="lokasi" className="text-left transition hover:text-white">Lokasi</ScrollTo></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row">
          <p>© {new Date().getFullYear()} {COMPANY}. Seluruh hak cipta dilindungi.</p>
          <p>Harga dan ketersediaan unit dapat berubah sewaktu-waktu.</p>
        </div>
      </div>
    </footer>
  );
}

export function FloatingWa() {
  return (
    <a
      href={waLink("Halo, saya tertarik dengan rumah subsidi Bhumi Saka Arum. Mohon infonya.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp Bhumi Saka Arum"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-900/30 transition-transform hover:scale-105 active:scale-95"
    >
      <WhatsappLogo size={28} weight="fill" />
    </a>
  );
}
