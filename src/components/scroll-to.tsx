"use client";

import type { ReactNode } from "react";

function smoothScroll(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  window.location.assign(`/#${id}`);
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
      onClick={() => {
        if (window.location.pathname !== "/") {
          window.location.assign("/");
          return;
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className={className}
    >
      {children}
    </button>
  );
}
