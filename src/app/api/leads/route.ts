import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body tidak valid" }, { status: 400 });
  }

  const { name, phone, unit_interest, message } = (body ?? {}) as Record<
    string,
    unknown
  >;

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
    return NextResponse.json(
      { error: "Gagal menyimpan data" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
