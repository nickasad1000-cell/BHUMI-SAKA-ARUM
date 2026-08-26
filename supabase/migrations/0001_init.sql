create table if not exists public.units (
  id serial primary key,
  unit text not null unique,
  blok text not null,
  floor int not null,
  land_length numeric not null,
  land_width numeric not null,
  land_area numeric not null,
  dp_price numeric not null,
  house_price numeric not null default 166000000,
  status text not null default 'tersedia',
  sort int not null default 0
);

alter table public.units enable row level security;
drop policy if exists "public read units" on public.units;
create policy "public read units" on public.units for select using (true);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  unit_interest text,
  message text,
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;
drop policy if exists "anon insert leads" on public.leads;
create policy "anon insert leads" on public.leads for insert with check (
  char_length(name) between 2 and 100
  and char_length(phone) between 8 and 20
);

insert into public.units (unit, blok, floor, land_length, land_width, land_area, dp_price, sort) values
  ('C1', 'C', 1, 12.7, 6, 76.2, 13000000, 1),
  ('C2', 'C', 1, 12.7, 6, 76.2, 12800000, 2),
  ('C3', 'C', 1, 12.5, 6, 75.0, 10400000, 3),
  ('C4', 'C', 1, 12.5, 6, 75.0, 10500000, 4),
  ('C5', 'C', 1, 12.4, 6, 74.4, 10600000, 5),
  ('C6', 'C', 1, 10.7, 6, 64.2, 14500000, 6),
  ('C7', 'C', 1, 10.6, 6, 63.6, 13000000, 7),
  ('C8', 'C', 1, 10.4, 6, 62.4, 10000000, 8),
  ('C9', 'C', 1, 10.2, 6, 61.2, 7000000, 9),
  ('C10', 'C', 1, 10.0, 6.5, 65.0, 16500000, 10),
  ('A1', 'A', 2, 12.5, 6.1, 76.3, 60625000, 11),
  ('A2', 'A', 2, 12.5, 6, 75.0, 57500000, 12),
  ('A3', 'A', 2, 11.8, 6, 70.8, 47000000, 13),
  ('A4', 'A', 2, 11.8, 6, 70.8, 47000000, 14),
  ('A5', 'A', 2, 11.8, 6, 70.8, 47000000, 15),
  ('A6', 'A', 2, 11.8, 6.7, 79.1, 67650000, 16),
  ('B1', 'B', 2, 10.3, 6, 61.8, 24500000, 17),
  ('B2', 'B', 2, 10.0, 6, 60.0, 20000000, 18),
  ('B3', 'B', 2, 10.7, 6, 64.2, 30500000, 19),
  ('B4', 'B', 2, 10.6, 6, 63.6, 29000000, 20),
  ('B5', 'B', 2, 10.5, 6, 63.0, 27500000, 21)
on conflict (unit) do nothing;

insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;
