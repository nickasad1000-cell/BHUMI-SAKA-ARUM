import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bhumi Saka Arum — Rumah Subsidi 2 Lantai di Lumajang",
    short_name: "Bhumi Saka Arum",
    description:
      "Rumah subsidi 2 lantai satu-satunya di Lumajang. Type 36, siap huni di Klampokarum, Kec. Kunir.",
    id: "/",
    start_url: "/",
    display: "standalone",
    background_color: "#06101f",
    theme_color: "#06101f",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
