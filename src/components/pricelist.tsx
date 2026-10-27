"use client";

import { useState } from "react";
import Link from "next/link";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import {
  formatRupiah,
  unitStatus,
  waLink,
  type Unit,
  type UnitStatus,
} from "@/lib/data";

const STATUS_STYLE: Record<UnitStatus, string> = {
  tersedia: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  booking: "bg-amber-50 text-amber-700 ring-amber-200",
  terjual: "bg-navy-50 text-navy-700 ring-navy-200",
};

const STATUS_LABEL: Record<UnitStatus, string> = {
  tersedia: "Tersedia",
  booking: "Booking",
  terjual: "Terjual",
};

function StatusBadge({ status }: { status: UnitStatus }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ring-1 ${STATUS_STYLE[status]}`}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

function unitNumber(unit: string) {
  return Number(unit.replace(/\D/g, "")) || 0;
}

export function Pricelist({ units }: { units: Unit[] }) {
  const [floor, setFloor] = useState<1 | 2>(2);

  const rows = units
    .filter((u) => u.floor === floor)
    .sort(
      (a, b) =>
        a.blok.localeCompare(b.blok, "id") ||
        unitNumber(a.unit) - unitNumber(b.unit)
    );

  return (
    <section id="harga" className="scroll-mt-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <h2 className="text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
          Daftar unit
        </h2>

        <div className="mt-6 flex flex-wrap items-center gap-4">
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
        </div>

        {rows.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-navy-200 p-8 text-center">
            <p className="text-sm text-navy-800/70">
              Tidak ada unit lantai {floor} di blok ini.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-6 grid gap-3 md:hidden">
              {rows.map((u) => {
                const status = unitStatus(u);
                return (
                  <div
                    key={u.unit}
                    className="rounded-2xl bg-white p-4 ring-1 ring-navy-100"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          {status === "tersedia" ? (
                            <Link
                              href={`/unit/${u.unit.toLowerCase()}`}
                              className="text-lg font-extrabold text-navy-950 underline decoration-navy-200 decoration-2 underline-offset-4"
                            >
                              {u.unit}
                            </Link>
                          ) : (
                            <span className="text-lg font-extrabold text-navy-950">
                              {u.unit}
                            </span>
                          )}
                          <StatusBadge status={status} />
                        </div>
                        <p className="mt-1 text-sm text-navy-800/70">
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
                    {status === "tersedia" && (
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
                    )}
                  </div>
                );
              })}
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
                    <th scope="col" className="px-5 py-3.5">
                      Status
                    </th>
                    <th scope="col" className="px-5 py-3.5 text-right">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-100 bg-white">
                  {rows.map((u) => {
                    const status = unitStatus(u);
                    return (
                      <tr
                        key={u.unit}
                        className="transition-colors hover:bg-navy-50/60"
                      >
                        <td className="whitespace-nowrap px-5 py-3.5 font-extrabold text-navy-950">
                          {status === "tersedia" ? (
                            <Link
                              href={`/unit/${u.unit.toLowerCase()}`}
                              className="underline decoration-navy-200 decoration-2 underline-offset-4 hover:decoration-gold-400"
                            >
                              {u.unit}
                            </Link>
                          ) : (
                            u.unit
                          )}
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
                        <td className="whitespace-nowrap px-5 py-3.5">
                          <StatusBadge status={status} />
                        </td>
                        <td className="whitespace-nowrap px-5 py-3.5 text-right">
                          {status === "tersedia" ? (
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
                          ) : (
                            <span className="text-xs text-navy-800/40">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
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
            Harga sewaktu-waktu dapat berubah mengikuti kebijakan pemerintah.
          </p>
        </div>
      </div>
    </section>
  );
}
