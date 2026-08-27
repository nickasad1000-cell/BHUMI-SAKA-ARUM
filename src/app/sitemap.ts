import type { MetadataRoute } from "next";
import { FALLBACK_UNITS } from "@/lib/data";

const BASE = "https://bhumisakaarum.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...FALLBACK_UNITS.map((u) => ({
      url: `${BASE}/unit/${u.unit.toLowerCase()}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
