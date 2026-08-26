"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { List, X } from "@phosphor-icons/react/dist/ssr";

const LINKS = [
  { href: "#tipe", label: "Tipe Rumah" },
  { href: "#harga", label: "Harga" },
  { href: "#galeri", label: "Galeri" },
  { href: "#lokasi", label: "Lokasi" },
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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors ${
        scrolled || open
          ? "bg-white/95 shadow-sm backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="#" className="flex items-center gap-2.5">
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
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-semibold transition-colors ${
                scrolled
                  ? "text-navy-800 hover:text-navy-950"
                  : "text-white/85 hover:text-white"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#kontak"
            className="rounded-full bg-gold-400 px-4 py-2 text-sm font-bold text-navy-950 transition-transform hover:bg-gold-300 active:scale-[0.98]"
          >
            Chat WhatsApp
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          className={`rounded-lg p-2 md:hidden ${
            scrolled || open ? "text-navy-950" : "text-white"
          }`}
        >
          {open ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-navy-100 bg-white px-4 pb-4 pt-2 md:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-sm font-semibold text-navy-800"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#kontak"
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
