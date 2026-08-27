import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { WhatsappLogo, CheckCircle, ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PhotoGrid } from "@/components/photo-grid";
import { BackLink } from "@/components/back-nav";
import {
  FALLBACK_UNITS,
  GALLERY,
  BUILD_SPEC,
  formatRupiah,
  INSTALLMENTS,
  isReady,
  waLink,
} from "@/lib/data";

interface PageProps {
  params: Promise<{ kode: string }>;
}

export function generateStaticParams() {
  return FALLBACK_UNITS.map((u) => ({ kode: u.unit.toLowerCase() }));
}

function getUnit(kode: string) {
  return FALLBACK_UNITS.find((u) => u.unit.toLowerCase() === kode.toLowerCase());
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { kode } = await params;
  const u = getUnit(kode);
  if (!u) return { title: "Unit tidak ditemukan" };

  const state = isReady(u) ? "Tersedia" : "Terjual";
  const title = `Unit ${u.unit} — Rumah Subsidi ${u.floor === 2 ? "2 Lantai" : "Lantai 1"} Lumajang (${state})`;
  const description = `Rumah subsidi type 36, tanah ${String(u.land_area).replace(".", ",")} m² di Bhumi Saka Arum Klampokarum Lumajang. Harga ${formatRupiah(u.house_price)}, peningkatan mutu ${formatRupiah(u.dp_price)}. Status: ${state}.`;

  return {
    title,
    description,
    alternates: { canonical: `/unit/${u.unit.toLowerCase()}` },
    openGraph: {
      title,
      description,
      url: `/unit/${u.unit.toLowerCase()}`,
      siteName: "Bhumi Saka Arum",
      locale: "id_ID",
      type: "website",
      images: [
        { url: "/images/og-image.jpg", width: 1200, height: 630 },
        { url: GALLERY[0].src },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-image.jpg"],
    },
  };
}

export default async function UnitDetailPage({ params }: PageProps) {
  const { kode } = await params;
  const u = getUnit(kode);
  if (!u) notFound();

  const ready = isReady(u);
  const photos = GALLERY.map((g) => ({ ...g }));

  return (
    <>
      <Navbar />
      <main className="bg-paper">
        <div className="mx-auto w-full max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-navy-800/60">
            <BackLink target="harga" className="font-semibold text-navy-800 transition-colors hover:text-navy-950">
              Pricelist
            </BackLink>
            <span aria-hidden> / </span>
            <span className="font-bold text-navy-950">Unit {u.unit}</span>
          </nav>

          <div className="mt-8 grid gap-12 lg:grid-cols-[5fr_4fr]">
            {/* Info */}
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-4xl font-extrabold tracking-tight text-navy-950 sm:text-5xl">
                  Unit {u.unit}
                </h1>
                {ready ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Tersedia
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                    Terjual
                  </span>
                )}
              </div>
              <p className="mt-2 text-lg font-semibold text-navy-800/80">
                Blok {u.blok} · Lantai {u.floor} · Type 36 ·{" "}
                {u.floor === 2 ? "2 Lantai Penuh" : "1 Lantai"}
              </p>

              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 rounded-2xl bg-white p-6 ring-1 ring-navy-100 sm:p-8">
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-navy-800/60">
                    Harga Rumah
                  </dt>
                  <dd className="mt-1 text-xl font-extrabold tracking-tight text-navy-950">
                    {formatRupiah(u.house_price)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-navy-800/60">
                    Peningkatan Mutu
                  </dt>
                  <dd className="mt-1 text-xl font-extrabold tracking-tight text-navy-950">
                    {formatRupiah(u.dp_price)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-navy-800/60">
                    Luas Tanah
                  </dt>
                  <dd className="mt-1 font-extrabold text-navy-950">
                    {String(u.land_area).replace(".", ",")} m²
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-navy-800/60">
                    Angsuran Mulai
                  </dt>
                  <dd className="mt-1 font-extrabold text-navy-950">
                    {formatRupiah(INSTALLMENTS[2].monthly)}/bln
                    <span className="text-sm font-semibold text-navy-800/60"> (20 th)</span>
                  </dd>
                </div>
              </dl>

              <p className="mt-4 text-xs leading-relaxed text-navy-800/60">
                Booking Rp 100 ribu — tanda jadi Rp 2.500.000. Harga sudah termasuk AJB, balik nama &amp; pajak, provisi KPR, angsuran pertama, IMB, listrik, dan sumur bor. Rumah hook/pojok +Rp 5.000.000.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                {ready ? (
                  <a
                    href={waLink(
                      `Halo, saya tertarik dengan unit ${u.unit} (Blok ${u.blok}, lantai ${u.floor}) di Bhumi Saka Arum. Mohon info ketersediaannya.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-13 min-h-[52px] flex-1 items-center justify-center gap-2 rounded-full bg-gold-400 px-6 text-sm font-bold text-navy-950 transition hover:bg-gold-300 active:scale-[0.98]"
                  >
                    <WhatsappLogo size={18} weight="bold" />
                    Pesan Unit {u.unit}
                  </a>
                ) : (
                  <a
                    href={waLink(
                      `Halo, unit ${u.unit} sudah terjual. Mohon info unit yang masih tersedia di Bhumi Saka Arum.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-full border border-navy-200 bg-white px-6 text-sm font-bold text-navy-900 transition hover:border-navy-300 active:scale-[0.98]"
                  >
                    <WhatsappLogo size={18} weight="bold" />
                    Unit ini terjual — Tanya Unit Lain
                  </a>
                )}
                <BackLink
                  target="harga"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-navy-200 bg-white px-6 text-sm font-bold text-navy-900 transition hover:border-navy-300 active:scale-[0.98]"
                >
                  <ArrowLeft size={16} weight="bold" />
                  Lihat Pricelist
                </BackLink>
              </div>
            </div>

            {/* Foto utama */}
            <div>
              <Image
                src="/images/siteplan.webp"
                alt={`Posisi unit ${u.unit} pada siteplan Bhumi Saka Arum`}
                width={1200}
                height={848}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="w-full rounded-2xl object-cover ring-1 ring-navy-100"
              />
              <p className="mt-2 text-center text-xs font-semibold text-navy-800/60">
                Posisi Blok {u.blok} pada site plan — klik foto galeri untuk melihat seluruh unitnya
              </p>
            </div>
          </div>

          {/* Galeri semua foto */}
          <section className="mt-16">
            <h2 className="text-2xl font-extrabold tracking-tight text-navy-950 sm:text-3xl">
              Foto lengkap perumahan
            </h2>
            <p className="mt-2 max-w-xl text-base leading-relaxed text-navy-800/70">
              Fasad depan, interior ruang tamu, kamar tidur, kamar mandi, dan dapur — dokumentasi asli unit show.
            </p>
            <div className="mt-8">
              <PhotoGrid photos={photos} sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
          </section>

          {/* Spesifikasi bangunan */}
          <section className="mt-14 rounded-2xl bg-white p-6 ring-1 ring-navy-100 sm:p-8">
            <h2 className="text-base font-extrabold text-navy-950">
              Spesifikasi bangunan
            </h2>
            <ul className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {BUILD_SPEC.map((s) => (
                <li key={s} className="flex items-start gap-2.5 text-sm text-navy-800/80">
                  <CheckCircle size={17} weight="fill" className="mt-0.5 shrink-0 text-gold-500" />
                  {s}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
