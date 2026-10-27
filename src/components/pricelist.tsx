"use client";

import { useState } from "react";
import Link from "next/link";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { formatRupiah, isReady, waLink, type Unit } from "@/lib/data";

export function Pricelist({ units }: { units: Unit[] }) {
  const [floor, setFloor] = useState<1 | 2>(2);
  const readyUnits = units.filter(isReady);
  const rows = readyUnits.filter((u) => u.floor === floor);

  return (
    <section id="harga" className="scroll-mt-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="max-w-xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
            Pricelist Unit
          </h2>
          <p className="mt-3 text-base leading-relaxed text-navy-800/70">
            Harga rumah subsidi{" "}
            <strong className="font-bold text-navy-950">
              {formatRupiah(166_000_000)}
            </strong>{" "}
            — pilih unit, lalu bayar peningkatan mutu kualitas sesuai unit
            pilihan. Klik unit untuk melihat detail lengkap.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <div className="inline-flex rounded-full bg-navy-50 p-1">
            {([2, 1] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFloor(f)}
                aria-pressed={floor === f}
                className={`min-h-11 rounded-full px-5 text-sm font-bold transition ${
                  floor === f
                    ? "bg-navy-950 text-white shadow-sm"
                    : "text-navy-800 hover:text-navy-950"
                }`}
              >
                {f === 2 ? "Lantai 2 (Blok A & B)" : "Lantai 1 (Blok C)"}
              </button>
            ))}
          </div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy-800 ring-1 ring-navy-100 sm:ml-auto">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {readyUnits.length} unit siap huni
          </p>
        </div>

        {rows.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-navy-200 p-8 text-center">
            <p className="text-sm text-navy-800/70">
              Belum ada unit lantai {floor} yang siap huni.
            </p>
            <a
              href={waLink(
                "Halo, saya ingin info unit Bhumi Saka Arum yang masih tersedia."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full bg-navy-950 px-5 text-sm font-bold text-white transition hover:bg-navy-800 active:scale-[0.98]"
            >
              <WhatsappLogo size={16} weight="bold" />
              Tanya unit yang tersedia
            </a>
          </div>
        ) : (
          <>
            <div className="mt-6 grid gap-3 md:hidden">
              {rows.map((u) => (
                <div
                  key={u.unit}
                  className="rounded-2xl bg-white p-4 ring-1 ring-navy-100"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link
                        href={`/unit/${u.unit.toLowerCase()}`}
                        className="text-lg font-extrabold text-navy-950 underline decoration-navy-200 decoration-2 underline-offset-4"
                      >
                        {u.unit}
                      </Link>
                      <p className="mt-0.5 text-sm text-navy-800/70">
                        Blok {u.blok} · Lantai {u.floor} ·{" "}
                        {String(u.land_area).replace(".", ",")} m²
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-navy-800/50">
                        Peningkatan mutu
                      </p>
                      <p className="mt-0.5 text-sm font-bold text-navy-950">
                        {formatRupiah(u.dp_price)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <Link
                      href={`/unit/${u.unit.toLowerCase()}`}
                      className="text-xs font-semibold text-navy-700"
                    >
                      Lihat detail →
                    </Link>
                    <a
                      href={waLink(
                        `Halo, saya tertarik dengan unit ${u.unit} (Blok ${u.blok}, lantai ${u.floor}) di Bhumi Saka Arum. Mohon info ketersediaannya.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full bg-navy-950 px-4 text-xs font-bold text-white transition hover:bg-navy-800 active:scale-[0.98]"
                    >
                      <WhatsappLogo size={14} weight="bold" />
                      Pesan
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 hidden overflow-hidden rounded-2xl ring-1 ring-navy-100 md:block">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-navy-50 text-xs font-bold uppercase tracking-wider text-navy-800">
                    <th scope="col" className="px-5 py-3.5">
                      Unit
                    </th>
                    <th scope="col" className="px-5 py-3.5">
                      Uk. Tanah
                    </th>
                    <th scope="col" className="px-5 py-3.5">
                      Luas
                    </th>
                    <th scope="col" className="px-5 py-3.5">
                      Peningkatan Mutu
                    </th>
                    <th scope="col" className="px-5 py-3.5 text-right">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-100 bg-white">
                  {rows.map((u) => (
                    <tr key={u.unit} className="transition-colors hover:bg-navy-50/60">
                      <td className="whitespace-nowrap px-5 py-3.5 font-extrabold text-navy-950">
                        <Link
                          href={`/unit/${u.unit.toLowerCase()}`}
                          className="underline decoration-navy-200 decoration-2 underline-offset-4 hover:decoration-gold-400"
                        >
                          {u.unit}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5 text-navy-800/80">
                        {String(u.land_length).replace(".", ",")} ×{" "}
                        {String(u.land_width).replace(".", ",")} m
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5 text-navy-800/80">
                        {String(u.land_area).replace(".", ",")} m²
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5 font-bold text-navy-950">
                        {formatRupiah(u.dp_price)}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5 text-right">
                        <a
                          href={waLink(
                            `Halo, saya tertarik dengan unit ${u.unit} (Blok ${u.blok}, lantai ${u.floor}) di Bhumi Saka Arum. Mohon info ketersediaannya.`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full bg-navy-950 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-navy-800 active:scale-[0.98]"
                        >
                          <WhatsappLogo size={14} weight="bold" />
                          Pesan
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        <div className="mt-5 space-y-1.5 text-sm leading-relaxed text-navy-800/70">
          <p>
            <strong className="font-semibold text-navy-900">
              Harga sudah termasuk:
            </strong>{" "}
            AJB, balik nama &amp; pajak, provisi KPR, angsuran pertama, IMB,
            listrik, dan sumur bor.
          </p>
          <p>
            Booking Rp 100 ribu · Tanda jadi Rp 2.500.000 · Rumah hook/pojok
            +Rp 5.000.000 · Harga sewaktu-waktu dapat berubah mengikuti
            kebijakan pemerintah.
          </p>
        </div>
      </div>
    </section>
  );
}
