import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer, FloatingWa } from "@/components/footer";

export const metadata = {
  title: "Halaman tidak ditemukan",
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[70dvh] items-center justify-center bg-navy-950 px-4 py-32 text-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold-400">
            Error 404
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Halaman tidak ditemukan
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-navy-100">
            Halaman yang Anda cari mungkin sudah dipindahkan atau tidak pernah
            ada. Silakan kembali ke pricelist untuk melihat unit yang tersedia.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-gold-400 px-6 text-sm font-bold text-navy-950 transition hover:bg-gold-300 active:scale-[0.98]"
            >
              Kembali ke Pricelist
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingWa />
    </>
  );
}
