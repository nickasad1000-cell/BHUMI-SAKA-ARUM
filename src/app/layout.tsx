import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = "https://bhumisakaarum.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bhumi Saka Arum — Rumah Subsidi 2 Lantai di Lumajang",
    template: "%s | Bhumi Saka Arum",
  },
  description:
    "Rumah subsidi 2 lantai satu-satunya di Lumajang. Type 36, 2 kamar tidur, siap huni di Klampokarum — ±8 menit dari Alun-Alun Kota Lumajang.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Bhumi Saka Arum — Rumah Subsidi 2 Lantai di Lumajang",
    description:
      "Hunian modern 2 lantai dengan ruang lebih luas untuk keluarga Anda. Booking hanya Rp 100 ribu, gratis DP hingga pajak.",
    url: "/",
    siteName: "Bhumi Saka Arum",
    locale: "id_ID",
    type: "website",
    images: [
      { url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Bhumi Saka Arum — Rumah Subsidi 2 Lantai di Lumajang" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhumi Saka Arum — Rumah Subsidi 2 Lantai di Lumajang",
    description:
      "Hunian modern 2 lantai siap huni di Klampokarum, Lumajang. Booking hanya Rp 100 ribu.",
    images: ["/images/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Residence",
  name: "Bhumi Saka Arum",
  description:
    "Perumahan rumah subsidi 2 lantai satu-satunya di Lumajang oleh PT. Lembayung Wanantara Padha.",
  url: siteUrl,
  telephone: "+6281333372016",
  image: `${siteUrl}/images/og-image.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Raya Klampokarum, Kec. Kunir",
    addressLocality: "Lumajang",
    addressRegion: "Jawa Timur",
    addressCountry: "ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${jakarta.variable} font-sans antialiased`}>
        <a
          href="#konten"
          className="sr-only z-50 rounded-full bg-navy-950 px-5 py-3 text-sm font-bold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Langsung ke konten
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div id="konten">{children}</div>
      </body>
    </html>
  );
}
