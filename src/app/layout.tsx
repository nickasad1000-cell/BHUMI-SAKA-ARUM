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
    "Perumahan rumah subsidi 2 lantai satu-satunya di Lumajang. Type 36, 2 kamar tidur, siap huni di Klampokarum — ±8 menit dari Alun-Alun Kota Lumajang. Booking hanya Rp 100 ribu.",
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
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
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
  address: {
    "@type": "PostalAddress",
    streetAddress: "Klampokarum",
    addressLocality: "Lumajang",
    addressRegion: "Jawa Timur",
    addressCountry: "ID",
  },
  offers: {
    "@type": "Offer",
    price: "166000000",
    priceCurrency: "IDR",
    availability: "https://schema.org/InStock",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
