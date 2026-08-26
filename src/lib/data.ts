export const WA_NUMBER = "6281333372016";
export const WA_DISPLAY = "0813 3337 2016";
export const COMPANY = "PT. Lembayung Wanantara Padha";
export const HOUSE_PRICE = 166_000_000;
export const LOCATION_LABEL = "Klampokarum, Lumajang — Jawa Timur";

export function waLink(text: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export type Unit = {
  unit: string;
  blok: string;
  floor: number;
  land_length: number;
  land_width: number;
  land_area: number;
  dp_price: number;
  house_price: number;
  status: string;
};

export const FALLBACK_UNITS: Unit[] = [
  { unit: "C1", blok: "C", floor: 1, land_length: 12.7, land_width: 6, land_area: 76.2, dp_price: 13000000, house_price: HOUSE_PRICE, status: "tersedia" },
  { unit: "C2", blok: "C", floor: 1, land_length: 12.7, land_width: 6, land_area: 76.2, dp_price: 12800000, house_price: HOUSE_PRICE, status: "tersedia" },
  { unit: "C3", blok: "C", floor: 1, land_length: 12.5, land_width: 6, land_area: 75, dp_price: 10400000, house_price: HOUSE_PRICE, status: "tersedia" },
  { unit: "C4", blok: "C", floor: 1, land_length: 12.5, land_width: 6, land_area: 75, dp_price: 10500000, house_price: HOUSE_PRICE, status: "tersedia" },
  { unit: "C5", blok: "C", floor: 1, land_length: 12.4, land_width: 6, land_area: 74.4, dp_price: 10600000, house_price: HOUSE_PRICE, status: "tersedia" },
  { unit: "C6", blok: "C", floor: 1, land_length: 10.7, land_width: 6, land_area: 64.2, dp_price: 14500000, house_price: HOUSE_PRICE, status: "tersedia" },
  { unit: "C7", blok: "C", floor: 1, land_length: 10.6, land_width: 6, land_area: 63.6, dp_price: 13000000, house_price: HOUSE_PRICE, status: "tersedia" },
  { unit: "C8", blok: "C", floor: 1, land_length: 10.4, land_width: 6, land_area: 62.4, dp_price: 10000000, house_price: HOUSE_PRICE, status: "tersedia" },
  { unit: "C9", blok: "C", floor: 1, land_length: 10.2, land_width: 6, land_area: 61.2, dp_price: 7000000, house_price: HOUSE_PRICE, status: "tersedia" },
  { unit: "C10", blok: "C", floor: 1, land_length: 10, land_width: 6.5, land_area: 65, dp_price: 16500000, house_price: HOUSE_PRICE, status: "tersedia" },
  { unit: "A1", blok: "A", floor: 2, land_length: 12.5, land_width: 6.1, land_area: 76.3, dp_price: 60625000, house_price: HOUSE_PRICE, status: "tersedia" },
  { unit: "A2", blok: "A", floor: 2, land_length: 12.5, land_width: 6, land_area: 75, dp_price: 57500000, house_price: HOUSE_PRICE, status: "tersedia" },
  { unit: "A3", blok: "A", floor: 2, land_length: 11.8, land_width: 6, land_area: 70.8, dp_price: 47000000, house_price: HOUSE_PRICE, status: "tersedia" },
  { unit: "A4", blok: "A", floor: 2, land_length: 11.8, land_width: 6, land_area: 70.8, dp_price: 47000000, house_price: HOUSE_PRICE, status: "tersedia" },
  { unit: "A5", blok: "A", floor: 2, land_length: 11.8, land_width: 6, land_area: 70.8, dp_price: 47000000, house_price: HOUSE_PRICE, status: "tersedia" },
  { unit: "A6", blok: "A", floor: 2, land_length: 11.8, land_width: 6.7, land_area: 79.1, dp_price: 67650000, house_price: HOUSE_PRICE, status: "tersedia" },
  { unit: "B1", blok: "B", floor: 2, land_length: 10.3, land_width: 6, land_area: 61.8, dp_price: 24500000, house_price: HOUSE_PRICE, status: "tersedia" },
  { unit: "B2", blok: "B", floor: 2, land_length: 10, land_width: 6, land_area: 60, dp_price: 20000000, house_price: HOUSE_PRICE, status: "tersedia" },
  { unit: "B3", blok: "B", floor: 2, land_length: 10.7, land_width: 6, land_area: 64.2, dp_price: 30500000, house_price: HOUSE_PRICE, status: "tersedia" },
  { unit: "B4", blok: "B", floor: 2, land_length: 10.6, land_width: 6, land_area: 63.6, dp_price: 29000000, house_price: HOUSE_PRICE, status: "tersedia" },
  { unit: "B5", blok: "B", floor: 2, land_length: 10.5, land_width: 6, land_area: 63, dp_price: 27500000, house_price: HOUSE_PRICE, status: "tersedia" },
];

export const INSTALLMENTS = [
  { tenor: 10, monthly: 1_730_400 },
  { tenor: 15, monthly: 1_287_300 },
  { tenor: 20, monthly: 1_072_180 },
];

export const SPEC_FLOOR_1 = [
  "Bangunan type 36",
  "2 Kamar Tidur · 1 Kamar Mandi",
  "Lantai keramik 40×40",
  "Rabat carport",
];

export const SPEC_FLOOR_2 = [
  "Bangunan type 36 — 2 lantai penuh",
  "Atap full cor · Lantai full granit",
  "Pagar couple & roster setinggi 2,5 m",
  "Tangga besi · Lampu gantung ruang tamu",
  "Meja dapur + wastafel + kompor tanam",
  "Pompa air · Kanopi · Nomor blok akrilik",
];

export const BUILD_SPEC = [
  "Pondasi batu kali",
  "Struktur kolom & balok beton bertulang",
  "Dinding bata ringan, diplaster, daci, finishing cat",
  "Kusen aluminium · Daun pintu HPL",
  "Atap spandek · Lantai granit",
  "Kloset jongkok + dinding kamar mandi granit",
  "Listrik 900 Watt",
];

export const KPR_EMPLOYEE = [
  "Fc KTP (suami & istri)",
  "Fc Kartu Keluarga",
  "Fc Surat Nikah / Cerai / Suket belum menikah",
  "Fc NPWP & SPT Tahunan Terakhir",
  "Fc Kartu Askes / BPJS",
  "Surat keterangan Aktif Bekerja",
  "Slip gaji 3 bulan terakhir",
  "Rekening koran 3 bulan terakhir",
];

export const KPR_ENTREPRENEUR = [
  "Fc KTP (suami & istri)",
  "Fc Kartu Keluarga",
  "Fc Surat Nikah / Cerai / Suket belum menikah",
  "Fc NPWP & SPT Tahunan Terakhir",
  "Fc Kartu Askes / BPJS",
  "Surat keterangan Usaha / SIUP",
  "Laporan keuangan 6 bulan terakhir",
  "Rekening koran 6 bulan terakhir",
];

export type GalleryPhoto = {
  src: string;
  alt: string;
  wide?: boolean;
};

export const GALLERY: GalleryPhoto[] = [
  { src: "/images/gate-sign.webp", alt: "Gerbang masuk Bhumi Saka Arum, Klampokarum Lumajang" },
  { src: "/images/living-stairs.webp", alt: "Ruang tengah dua lantai dengan tangga besi dan skylight" },
  { src: "/images/carport-roster.webp", alt: "Carport dengan dinding roster khas Bhumi Saka Arum" },
  { src: "/images/bedroom.webp", alt: "Kamar tidur utama siap huni" },
  { src: "/images/kitchen.webp", alt: "Dapur dengan kompor tanam di bawah tangga" },
  { src: "/images/bathroom.webp", alt: "Kamar mandi dengan shower dan dinding granit" },
  { src: "/images/hero-a01.webp", alt: "Fasad depan rumah tipe A01 dengan carport dan pagar hitam", wide: true },
];
