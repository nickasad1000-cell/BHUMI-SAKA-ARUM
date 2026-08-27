"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const KEY = "bsa-scroll-target";

/** Dipasang di homepage: jalankan scroll tersimpan dari halaman unit detail. */
export function ScrollRestorer() {
  useEffect(() => {
    const target = sessionStorage.getItem(KEY);
    if (!target) return;
    sessionStorage.removeItem(KEY);
    requestAnimationFrame(() =>
      setTimeout(() => {
        document
          .getElementById(target)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150)
    );
  }, []);

  return null;
}

/** Link/balik ke seksi homepage dari halaman lain — tanpa #hash di URL tujuan. */
export function BackLink({
  target,
  className,
  children,
}: {
  target: string;
  className?: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => {
        sessionStorage.setItem(KEY, target);
        router.push("/");
      }}
      className={className}
    >
      {children}
    </button>
  );
}
