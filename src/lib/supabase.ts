import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { FALLBACK_UNITS, type Unit } from "./data";

export function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function getUnits(): Promise<Unit[]> {
  const supabase = getSupabase();
  if (!supabase) return FALLBACK_UNITS;
  try {
    const { data, error } = await supabase
      .from("units")
      .select("*")
      .order("sort");
    if (error || !data || data.length === 0) return FALLBACK_UNITS;
    return data as Unit[];
  } catch {
    return FALLBACK_UNITS;
  }
}
