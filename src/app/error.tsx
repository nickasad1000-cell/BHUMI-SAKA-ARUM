"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[70dvh] items-center justify-center bg-paper px-4 py-32 text-center">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
          Terjadi kesalahan
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-navy-800/70">
          Maaf, ada kendala saat memuat halaman. Silakan coba lagi, atau
          hubungi kami via WhatsApp di 0813 3337 2016.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 inline-flex min-h-[52px] items-center justify-center rounded-full bg-navy-950 px-6 text-sm font-bold text-white transition hover:bg-navy-800 active:scale-[0.98]"
        >
          Coba Lagi
        </button>
      </div>
    </main>
  );
}
