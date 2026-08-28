"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { List, X } from "@phosphor-icons/react/dist/ssr";
import { ScrollTo, ScrollTop } from "@/components/scroll-to";
import { waLink } from "@/lib/data";

const LINKS = [
  { href: "tipe", label: "Tipe Rumah" },
  { href: "harga", label: "Pricelist" },
  { href: "siteplan", label: "Siteplan" },
  { href: "galeri", label: "Galeri" },
  { href: "lokasi", label: "Lokasi" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors ${
        scrolled || open ? "bg-white/95 shadow-sm backdrop-blur" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <ScrollTop
          ariaLabel="Kembali ke atas"
          className="flex h-16 items-center gap-2.5"
        >
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-lg ${
              scrolled || open ? "bg-navy-950" : "bg-white/15 backdrop-blur"
            }`}
          >
            <Image
              src="/images/logo.png"
              alt="Logo Bhumi Saka Arum"
              width={22}
              height={20}
              className="h-5 w-auto"
              priority
            />
          </span>
          <span
            className={`text-sm font-extrabold tracking-tight ${
              scrolled || open ? "text-navy-950" : "text-white"
            }`}
          >
            Bhumi Saka Arum
          </span>
        </ScrollTop>

        <div className="hidden items-center gap-6 md:flex">
          {LINKS.map((l) => (
            <ScrollTo
              key={l.href}
              target={l.href}
              className={`inline-flex h-16 items-center px-1 text-sm font-semibold transition-colors ${
                scrolled ? "text-navy-800 hover:text-navy-950" : "text-white/85 hover:text-white"
              }`}
            >
              {l.label}
            </ScrollTo>
          ))}
          <a
            href={waLink("Halo, saya tertarik dengan rumah subsidi Bhumi Saka Arum. Boleh minta info lengkapnya?")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center rounded-full bg-gold-400 px-4 text-sm font-bold text-navy-950 transition-transform hover:bg-gold-300 active:scale-[0.98]"
          >
            Chat WhatsApp
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className={`rounded-lg p-3 md:hidden ${
            scrolled || open ? "text-navy-950" : "text-white"
          }`}
        >
          {open ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-navy-100 bg-white px-4 pb-4 pt-2 md:hidden">
          {LINKS.map((l) => (
            <ScrollTo
              key={l.href}
              target={l.href}
              onNavigate={() => setOpen(false)}
              className="block w-full py-2.5 text-left text-sm font-semibold text-navy-800"
            >
              {l.label}
            </ScrollTo>
          ))}
          <a
            href={waLink("Halo, saya tertarik dengan rumah subsidi Bhumi Saka Arum. Boleh minta info lengkapnya?")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-full bg-gold-400 px-4 py-2.5 text-center text-sm font-bold text-navy-950"
          >
            Chat WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
