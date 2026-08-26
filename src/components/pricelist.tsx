"use client";

import { useState } from "react";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { formatRupiah, waLink, type Unit } from "@/lib/data";

export function Pricelist({ units }: { units: Unit[] }) {
  const [floor, setFloor] = useState<1 | 2>(2);
  const rows = units.filter((u) => u.floor === floor);

  return (
    <section id="harga" className="scroll-mt-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="max-w-xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
            Pricelist unit
          </h2>
          <p className="mt-3 text-base leading-relaxed text-navy-800/70">
            Harga rumah subsidi{" "}
            <strong className="font-bold text-navy-950">
              {formatRupiah(166_000_000)}
            </strong>{" "}
            — pilih unit, lalu bayar peningkatan mutu kualitas sebagai uang
            muka.
          </p>
        </div>

        <div className="mt-8 inline-flex rounded-full bg-navy-50 p-1">
          {([2, 1] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFloor(f)}
              aria-pressed={floor === f}
              className={`rounded-full px-5 py-3 text-sm font-bold transition ${
                floor === f
                  ? "bg-navy-950 text-white shadow-sm"
                  : "text-navy-800 hover:text-navy-950"
              }`}
            >
              {f === 2 ? "Lantai 2 (Blok A & B)" : "Lantai 1 (Blok C)"}
            </button>
          ))}
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl ring-1 ring-navy-100">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="bg-navy-50 text-xs font-bold uppercase tracking-wider text-navy-800">
                  <th className="px-5 py-3.5">Unit</th>
                  <th className="px-5 py-3.5">Uk. Tanah</th>
                  <th className="px-5 py-3.5">Luas</th>
                  <th className="px-5 py-3.5">Peningkatan Mutu</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-100 bg-white">
                {rows.map((u) => (
                  <tr key={u.unit} className="transition-colors hover:bg-navy-50/60">
                    <td className="px-5 py-3.5 font-extrabold text-navy-950">
                      {u.unit}
                    </td>
                    <td className="px-5 py-3.5 text-navy-800/80">
                      {String(u.land_length).replace(".", ",")} ×{" "}
                      {String(u.land_width).replace(".", ",")} m
                    </td>
                    <td className="px-5 py-3.5 text-navy-800/80">
                      {String(u.land_area).replace(".", ",")} m²
                    </td>
                    <td className="px-5 py-3.5 font-bold text-navy-950">
                      {formatRupiah(u.dp_price)}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Tersedia
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
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
        </div>

        <div className="mt-5 space-y-1.5 text-sm leading-relaxed text-navy-800/70">
          <p>
            <strong className="font-semibold text-navy-900">
              Harga sudah termasuk:
            </strong>{" "}
            AJB, balik nama &amp; pajak, provisi KPR, angsuran pertama, IMB,
            listrik, dan sumur bor.
          </p>
          <p>
            Tanda jadi Rp 2.500.000 (pilih unit, tidak mengurangi harga) · Rumah
            hook/pojok +Rp 5.000.000 · Harga sewaktu-waktu dapat berubah
            mengikuti kebijakan pemerintah.
          </p>
        </div>
      </div>
    </section>
  );
}
