import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { FALLBACK_UNITS, type Unit } from "./data";

let client: SupabaseClient | null | undefined;

export function getSupabase(): SupabaseClient | null {
  if (client !== undefined) return client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  client = url && key ? createClient(url, key) : null;
  return client;
}

const TRACKER_URL = (
  process.env.SYAHFALAH_URL || "https://syahfalahgroup.vercel.app"
).replace(/\/+$/, "");

type TrackerUnit = {
  perumahan: string;
  kode: string;
  status: string;
  persen_real: number | string | null;
  foto_url: string | null;
};

const VALID_STATUS = new Set(["tersedia", "booking", "terjual"]);
const PERUMAHAN = "Bhumi Saka Arum";

function kodeKatalog(kode: string) {
  return kode.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function angka(value: number | string | null) {
  const n = Number(value);
  return Number.isFinite(n) ? Math.max(0, Math.min(100, n)) : null;
}

async function tarikUnit(): Promise<Unit[] | null> {
  const token = process.env.PUBLIK_UNIT_TOKEN;
  if (!token) return null;
  try {
    const res = await fetch(`${TRACKER_URL}/api/publik/unit`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      next: { revalidate: 300 },
    });
    if (!res.ok) {
      console.error("[units] tracker error:", res.status);
      return null;
    }
    const body = (await res.json()) as { data?: TrackerUnit[] };
    const rows = (body.data ?? []).filter(
      (row) => row.perumahan === PERUMAHAN && VALID_STATUS.has(row.status)
    );
    if (rows.length === 0) {
      console.error("[units] tracker returned no rows, using fallback");
      return null;
    }
    const byKode = new Map(rows.map((row) => [kodeKatalog(row.kode), row]));
    return FALLBACK_UNITS.map((unit) => {
      const row = byKode.get(kodeKatalog(unit.unit));
      if (!row) return unit;
      return {
        ...unit,
        status: row.status,
        persen: angka(row.persen_real),
        foto: row.foto_url,
      };
    });
  } catch (e) {
    console.error("[units] tracker fetch failed, using fallback:", e);
    return null;
  }
}

export async function getUnits(): Promise<Unit[]> {
  return (await tarikUnit()) ?? FALLBACK_UNITS;
}

/** Status tampilan: nilai tracker yang valid. */
export function displayStatus(u: { unit: string; status?: string | null }) {
  return u.status && VALID_STATUS.has(u.status)
    ? (u.status as "tersedia" | "booking" | "terjual")
    : undefined;
}
