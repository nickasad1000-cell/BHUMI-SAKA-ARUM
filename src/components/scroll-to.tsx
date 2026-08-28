"use client";

import type { ReactNode } from "react";

function smoothScroll(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Tombol scroll-ke-seksi anti-hash — URL tidak pernah berubah. */
export function ScrollTo({
  target,
  className,
  onNavigate,
  children,
}: {
  target: string;
  className?: string;
  onNavigate?: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        smoothScroll(target);
        onNavigate?.();
      }}
      className={className}
    >
      {children}
    </button>
  );
}

/** Kembali ke halaman atas dengan scroll halus. */
export function ScrollTop({
  className,
  ariaLabel,
  children,
}: {
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={className}
    >
      {children}
    </button>
  );
}
