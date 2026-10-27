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

const IS_BUILD = process.env.NEXT_PHASE === "phase-production-build";

function gagalTracker(pesan: string): never {
  console.error(`[units] ${pesan}`);
  throw new Error(`[units] ${pesan}`);
}

async function tarikUnit(): Promise<Unit[]> {
  const token = process.env.PUBLIK_UNIT_TOKEN;
  if (!token) return gagalTracker("PUBLIK_UNIT_TOKEN belum diisi");
  try {
    const res = await fetch(`${TRACKER_URL}/api/publik/unit`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      next: { revalidate: 300 },
    });
    if (!res.ok) {
      return gagalTracker(`tracker error: HTTP ${res.status}`);
    }
    const body = (await res.json()) as { data?: TrackerUnit[] };
    const rows = (body.data ?? []).filter(
      (row) => row.perumahan === PERUMAHAN && VALID_STATUS.has(row.status)
    );
    if (rows.length === 0) {
      return gagalTracker("tracker tidak mengembalikan unit");
    }

    const byKode = new Map(
      FALLBACK_UNITS.map((unit) => [kodeKatalog(unit.unit), unit])
    );
    const siapTanpaMeta = rows.filter(
      (row) => row.status === "tersedia" && !byKode.has(kodeKatalog(row.kode))
    );
    if (siapTanpaMeta.length > 0) {
      const daftar = siapTanpaMeta.map((row) => row.kode).join(", ");
      if (IS_BUILD) {
        gagalTracker(`unit siap huni belum ada di FALLBACK_UNITS: ${daftar}`);
      }
      console.error(
        `[units] unit siap huni dilewati karena belum ada metadata: ${daftar}`
      );
    }

    return rows.flatMap((row) => {
      const unit = byKode.get(kodeKatalog(row.kode));
      if (!unit) return [];
      return [
        {
          ...unit,
          status: row.status,
          persen: angka(row.persen_real),
          foto: row.foto_url,
        },
      ];
    });
  } catch (e) {
    if (e instanceof Error && e.message.startsWith("[units] ")) throw e;
    return gagalTracker(
      `tracker fetch gagal: ${e instanceof Error ? e.message : String(e)}`
    );
  }
}

export async function getUnits(): Promise<Unit[]> {
  try {
    return await tarikUnit();
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.error("[units] memakai FALLBACK_UNITS saat development:", e);
      return FALLBACK_UNITS;
    }
    throw e;
  }
}

/** Status tampilan: nilai tracker yang valid. */
export function displayStatus(u: { unit: string; status?: string | null }) {
  return u.status && VALID_STATUS.has(u.status)
    ? (u.status as "tersedia" | "booking" | "terjual")
    : undefined;
}
