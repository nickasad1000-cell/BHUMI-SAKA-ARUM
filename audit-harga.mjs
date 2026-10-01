import { readFileSync } from "node:fs";

const src = readFileSync("src/lib/data.ts", "utf8");
const rows = [];
for (const line of src.split("\n")) {
  const m = line.match(
    /unit: "(\w+)", blok: "(\w)", floor: (\d), land_length: ([\d.]+), land_width: ([\d.]+), land_area: ([\d.]+), dp_price: (\d+)/
  );
  if (!m) continue;
  rows.push({
    unit: m[1],
    blok: m[2],
    floor: Number(m[3]),
    L: Number(m[4]),
    W: Number(m[5]),
    area: Number(m[6]),
    dp: Number(m[7]),
  });
}

// Baca SOLD dari data.ts supaya skrip ini tidak jadi sumber kedua yang
// bisa basi. Kalau tidak, perubahan status di data.ts tidak terlihat di sini.
const soldBlock = src.match(/const SOLD = new Set\(\[([\s\S]*?)\]\)/);
if (!soldBlock) {
  console.error("tidak bisa menemukan SOLD di src/lib/data.ts");
  process.exit(1);
}
const SOLD = new Set(
  [...soldBlock[1].matchAll(/"(\w+)"/g)].map((m) => m[1])
);
for (const r of rows) r.status = SOLD.has(r.unit) ? "terjual" : "tersedia";

const rp = (n) => "Rp" + n.toLocaleString("id-ID");
console.log("unit terbaca dari data.ts:", rows.length);
console.log("SOLD terbaca dari data.ts:", SOLD.size, "unit\n");

console.log("=== UJI-1: L x W harus sama dengan land_area ===");
const bad = rows.filter((r) => Math.abs(r.L * r.W - r.area) > 0.05);
console.log("  tidak konsisten:", bad.length ? bad.map((b) => b.unit) : "TIDAK ADA");

console.log("\n=== UJI-2: monotonicitas per blok (tanah lebih besar -> mutu lebih tinggi) ===");
for (const b of ["A", "B", "C"]) {
  const grup = rows.filter((r) => r.blok === b).sort((x, y) => y.area - x.area);
  console.log(`  Blok ${b}:`);
  let prev = null;
  for (const r of grup) {
    let flag = "";
    if (prev && r.dp > prev.dp)
      flag = `   <-- ANOMALI: tanah ${r.area} m2 lebih kecil dari ${prev.unit} (${prev.area} m2) tapi mutu lebih mahal`;
    console.log(`    ${r.unit.padEnd(4)} ${String(r.area).padStart(6)} m2   ${rp(r.dp).padStart(16)}${flag}`);
    prev = r;
  }
}

console.log("\n=== UJI-3: dp_price sama dipakai unit dengan luas berbeda ===");
const byPrice = new Map();
for (const r of rows) {
  if (!byPrice.has(r.dp)) byPrice.set(r.dp, []);
  byPrice.get(r.dp).push(r);
}
let n = 0;
for (const [dp, list] of [...byPrice].sort((a, b) => a[0] - b[0])) {
  const areas = new Set(list.map((x) => x.area));
  if (list.length > 1 && areas.size > 1) {
    n++;
    console.log(`  ${rp(dp)} -> ${list.map((x) => `${x.unit} (${x.area} m2)`).join(", ")}`);
  }
}
if (!n) console.log("  tidak ada");

console.log("\n=== UJI-4: rasio mutu per m2 (sorotan harga tidak wajar) ===");
for (const b of ["A", "B", "C"]) {
  const grup = rows.filter((r) => r.blok === b);
  const ratios = grup.map((r) => ({ unit: r.unit, ratio: Math.round(r.dp / r.area) }));
  const min = Math.min(...ratios.map((x) => x.ratio));
  const max = Math.max(...ratios.map((x) => x.ratio));
  console.log(`  Blok ${b}: ${rp(min)} - ${rp(max)} per m2 (rentang ${(max / min).toFixed(1)}x)`);
  for (const x of ratios.filter((x) => x.ratio === max || x.ratio === min))
    console.log(`      ${x.unit}: ${rp(x.ratio)}/m2`);
}

console.log("\n=== RINGKASAN HARGA ===");
const total = rows.reduce((a, r) => a + r.dp, 0);
console.log("  total peningkatan mutu 21 unit:", rp(total));
console.log("  tersedia:", rows.filter((r) => r.status === "tersedia").map((r) => r.unit).join(", "));
console.log("  terjual :", rows.filter((r) => r.status === "terjual").length, "unit");