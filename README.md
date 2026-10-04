This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Supabase

Project produksi: **Bhumisakaarum**, ref `lqcldkujflnancoszbfd`, region `ap-southeast-1`.

Isi database berasal dari `supabase/migrations/` (`0001_init.sql` membuat tabel `units` + bucket `gallery`, `0002_status_penjualan.sql` mengunci status penjualan). Repo sudah ter-link ke project ini — `supabase migration list` harus menunjukkan `0001`/`0002` di Local dan Remote tanpa selisih. Jangan apply migration manual lewat SQL Editor: versiRemote dicatat di `supabase_migrations`, jadi SQL Editor membuat drift yang diam-diam.

Env yang dibaca `src/lib/supabase.ts`:

```
NEXT_PUBLIC_SUPABASE_URL=https://lqcldkujflnancoszbfd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<publishable / anon key>
```

Kode memakai client anon untuk membaca `units` dan menulis `leads`, jadi **service role tidak diperlukan** dan tidak boleh masuk ke env Vercel. Tabel `leads` sengaja tidak punya policy SELECT — hanya ada policy insert, jadi PostgREST dengan `Prefer: return=representation` akan gagal; itu perilaku yang benar, bukan bug.
