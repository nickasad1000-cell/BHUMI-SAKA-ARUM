import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

/** Rate limit sederhana per-IP (best-effort; reset saat instance cold-start). */
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const prev = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (prev.length >= RATE_LIMIT) {
    hits.set(ip, prev);
    return true;
  }
  prev.push(now);
  hits.set(ip, prev);
  return false;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body tidak valid" }, { status: 400 });
  }

  const data = (body ?? {}) as Record<string, unknown>;
  const { name, phone, unit_interest, message, website } = data;

  // Honeypot anti-bot: field tersembunyi harus kosong. Balas sukses palsu.
  if (typeof website === "string" && website.trim()) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const cleanName = typeof name === "string" ? name.trim() : "";
  const cleanPhone = typeof phone === "string" ? phone.trim() : "";
  const digits = cleanPhone.replace(/\D/g, "");

  if (cleanName.length < 2 || cleanName.length > 100) {
    return NextResponse.json(
      { error: "Nama wajib diisi (2-100 karakter)" },
      { status: 400 }
    );
  }
  if (digits.length < 8 || digits.length > 20) {
    return NextResponse.json(
      { error: "Nomor WhatsApp tidak valid" },
      { status: 400 }
    );
  }

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Terlalu banyak percobaan. Coba beberapa menit lagi." },
      { status: 429 }
    );
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json(
      { error: "Konfigurasi server belum lengkap" },
      { status: 500 }
    );
  }

  const { error } = await supabase.from("leads").insert({
    name: cleanName,
    phone: cleanPhone,
    unit_interest:
      typeof unit_interest === "string" && unit_interest.trim()
        ? unit_interest.trim()
        : null,
    message:
      typeof message === "string" && message.trim() ? message.trim() : null,
  });

  if (error) {
    console.error("[api/leads] Database insert error:", error.message);
    return NextResponse.json({ error: "Gagal menyimpan data" }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
