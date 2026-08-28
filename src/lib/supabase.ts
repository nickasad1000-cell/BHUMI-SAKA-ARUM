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

const VALID_STATUS = new Set(["tersedia", "terjual"]);

export async function getUnits(): Promise<Unit[]> {
  const supabase = getSupabase();
  if (!supabase) return FALLBACK_UNITS;
  try {
    const { data, error } = await supabase
      .from("units")
      .select("*")
      .order("sort");
    if (error) {
      console.error("[units] Supabase error:", error.message);
      return FALLBACK_UNITS;
    }
    if (!data || data.length === 0) {
      console.error("[units] Supabase returned no rows, using fallback");
      return FALLBACK_UNITS;
    }
    return data as Unit[];
  } catch (e) {
    console.error("[units] Supabase fetch failed, using fallback:", e);
    return FALLBACK_UNITS;
  }
}

/**
 * Status tampilan: DB `status` bila valid, fallback ke SOLD set.
 */
export function displayStatus(u: { unit: string; status?: string | null }) {
  return u.status && VALID_STATUS.has(u.status)
    ? (u.status as "tersedia" | "terjual")
    : undefined;
}
