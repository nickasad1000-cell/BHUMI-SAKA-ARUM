import type { MetadataRoute } from "next";
import { getUnits } from "@/lib/supabase";

const BASE = "https://bhumisakaarum.vercel.app";
const LAST_UPDATED = new Date("2026-08-28T05:00:00Z");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const units = await getUnits();
  return [
    {
      url: BASE,
      lastModified: LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...units.map((u) => ({
      url: `${BASE}/unit/${u.unit.toLowerCase()}`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
