"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { WhatsappLogo, CheckCircle, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { waLink, WA_DISPLAY } from "@/lib/data";

type Status = "idle" | "loading" | "success" | "error";

export function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const reduce = useReducedMotion();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      unit_interest: String(fd.get("unit_interest") || "") || null,
      message: String(fd.get("message") || "").trim() || null,
    };

    if (payload.name.length < 2 || payload.phone.replace(/\D/g, "").length < 8) {
      setStatus("error");
      setErrorMsg("Mohon isi nama dan nomor WhatsApp yang valid.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg(
        "Gagal mengirim. Silakan coba lagi atau hubungi kami via WhatsApp."
      );
    }
  }

  const inputCls =
    "w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm font-medium text-navy-950 outline-none transition placeholder:text-navy-800/40 focus:border-navy-700 focus:ring-2 focus:ring-navy-700/20";

  return (
    <section id="kontak" className="scroll-mt-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="max-w-md text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
              Tertarik? Kirim minat Anda
            </h2>
            <p className="mt-3 max-w-md text-base leading-relaxed text-navy-800/70">
              Tinggalkan data Anda — tim pemasaran kami akan menghubungi Anda
              untuk konsultasi KPR dan jadwal survey.
            </p>
            <p className="mt-6 text-sm font-semibold text-navy-800">
              Butuh cepat?{" "}
              <a
                href={waLink("Halo, saya tertarik dengan Bhumi Saka Arum.")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy-950 underline decoration-gold-400 decoration-2 underline-offset-2"
              >
                WhatsApp {WA_DISPLAY}
              </a>
            </p>
          </div>

          <div className="rounded-2xl bg-paper p-6 ring-1 ring-navy-100 sm:p-8">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center py-10 text-center"
                >
                  <CheckCircle size={48} weight="duotone" className="text-emerald-500" />
                  <h3 className="mt-4 text-lg font-extrabold text-navy-950">
                    Terima kasih!
                  </h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-navy-800/70">
                    Minat Anda sudah kami terima. Tim kami akan menghubungi
                    Anda segera.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-sm font-bold text-navy-700 underline underline-offset-2"
                  >
                    Kirim minat lain
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  initial={false}
                  className="space-y-4"
                  noValidate
                >
                  <div>
                    <label
                      htmlFor="lead-name"
                      className="mb-1.5 block text-sm font-bold text-navy-950"
                    >
                      Nama Lengkap
                    </label>
                    <input
                      id="lead-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      placeholder="Nama Anda"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lead-phone"
                      className="mb-1.5 block text-sm font-bold text-navy-950"
                    >
                      No. WhatsApp
                    </label>
                    <input
                      id="lead-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      placeholder="08xx xxxx xxxx"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lead-unit"
                      className="mb-1.5 block text-sm font-bold text-navy-950"
                    >
                      Unit yang Diminati{" "}
                      <span className="font-medium text-navy-800/50">
                        (opsional)
                      </span>
                    </label>
                    <select id="lead-unit" name="unit_interest" className={inputCls} defaultValue="">
                      <option value="">Belum menentukan</option>
                      <option value="Lantai 1 (Blok C)">Lantai 1 — Blok C</option>
                      <option value="Lantai 2 (Blok A & B)">Lantai 2 — Blok A &amp; B</option>
                      <option value="Rumah Hook/Pojok">Rumah Hook / Pojok</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="lead-message"
                      className="mb-1.5 block text-sm font-bold text-navy-950"
                    >
                      Pesan{" "}
                      <span className="font-medium text-navy-800/50">
                        (opsional)
                      </span>
                    </label>
                    <textarea
                      id="lead-message"
                      name="message"
                      rows={3}
                      placeholder="Contoh: Saya ingin tanya syarat KPR pegawai…"
                      className={`${inputCls} resize-none`}
                    />
                  </div>

                  {status === "error" && (
                    <p
                      role="alert"
                      className="flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                    >
                      <WarningCircle size={18} weight="fill" className="mt-0.5 shrink-0" />
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy-950 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-navy-800 active:scale-[0.98] disabled:opacity-60"
                  >
                    {status === "loading" ? (
                      "Mengirim…"
                    ) : (
                      <>
                        <WhatsappLogo size={18} weight="bold" />
                        Kirim Minat Saya
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
