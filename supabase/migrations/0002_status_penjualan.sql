-- Status penjualan eksplisit untuk seluruh 21 unit.
--
-- Seed di 0001_init.sql tidak menyentuh kolom `status`, jadi nilainya selalu
-- default 'tersedia' dancaping harus diubah manual lewat dashboard Supabase.
-- Akibatnya status di DB tidak pernah tercatat di repo dan tidak bisa diaudit.
--
-- Migration ini menjadikan status bagian dari repo. Jalankan sekali di SQL
-- Editor Supabase. Semua baris ditulis eksplisit supaya hasil akhirnya sama
-- dengan yang tercatat di src/lib/data.ts (SOLD).
--
-- Microscopy: 'terjual' hanya untuk unit yang benar-benar sudah terjual.
-- Unit yang belum ada kepastian harus dibiarkan 'tersedia' SAMBIL dikonfirmasi
-- ke pemilik proyek - jangan ditebak.

update public.units set status = 'terjual' where unit in (
  'A2', 'A3', 'A5',
  'B1', 'B2', 'B3', 'B4', 'B5',
  'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10'
);

update public.units set status = 'tersedia' where unit in (
  'A1', 'A4', 'A6'
);

-- Penjaga: status di luar dua nilai ini akan lolos diam-diam ke tampilan
-- "Tersedia" karena unitStatus() jatuh ke SOLD lalu ke default. Tolak di sini
-- supaya salah ketik ketahuan sekarang, bukan nanti di halaman pembeli.
alter table public.units
  drop constraint if exists units_status_valid;

alter table public.units
  add constraint units_status_valid
  check (status in ('tersedia', 'terjual'));

-- Verifikasi manual setelah menjalankan:
--   select status, count(*) from public.units group by status;
--  Hasil yang diharapkan: terjual = 18, tersedia = 3.