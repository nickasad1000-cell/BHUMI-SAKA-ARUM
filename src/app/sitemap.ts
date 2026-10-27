import type { MetadataRoute } from "next";
import { getUnits } from "@/lib/supabase";
import { isReady } from "@/lib/data";

const BASE = "https://bhumisakaarum.vercel.app";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const units = await getUnits();
  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...units.filter(isReady).map((u) => ({
      url: `${BASE}/unit/${u.unit.toLowerCase()}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
