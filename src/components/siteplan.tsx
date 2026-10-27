import {
  Blueprint,
  Door,
  HouseLine,
  Lightning,
  PaintRoller,
  Toilet,
  Wall,
} from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./reveal";
import { ZoomImage } from "./photo-grid";
import {
  BUILD_SPEC,
  KPR_EMPLOYEE,
  KPR_ENTREPRENEUR,
} from "@/lib/data";

const SPEC_ICONS = [
  Wall,
  Blueprint,
  PaintRoller,
  Door,
  HouseLine,
  Toilet,
  Lightning,
];

function DocList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl bg-white p-6 ring-1 ring-navy-100 sm:p-8">
      <h3 className="text-base font-extrabold text-navy-950">{title}</h3>
      <ol className="mt-4 space-y-2.5">
        {items.map((item, i) => (
          <li key={item} className="flex items-start gap-3 text-sm text-navy-800/80">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy-50 text-[11px] font-extrabold text-navy-700">
              {i + 1}
            </span>
            {item}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function SitePlan() {
  return (
    <section id="siteplan" className="scroll-mt-20 bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <Reveal>
          <h2 className="text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
            Siteplan &amp; KPR
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <figure className="mt-8 overflow-hidden rounded-2xl bg-white p-3 ring-1 ring-navy-100 sm:p-5">
            <ZoomImage
              src="/images/siteplan.webp"
              alt="Site plan Bhumi Saka Arum — Blok A, B, dan C, Klampokarum Lumajang"
              caption="Siteplan Bhumi Saka Arum — Blok A, B, dan C"
              className="w-full"
              imgClassName="h-auto w-full rounded-lg object-cover"
              width={1920}
              height={1358}
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </figure>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6">
          <Reveal delay={0.05}>
            <DocList title="Penghasilan Tetap / Pegawai" items={KPR_EMPLOYEE} />
          </Reveal>
          <Reveal delay={0.12}>
            <DocList title="Wiraswasta" items={KPR_ENTREPRENEUR} />
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-6 rounded-2xl bg-navy-50 p-6 sm:p-8">
            <h4 className="text-base font-extrabold text-navy-950">
              Spesifikasi bangunan
            </h4>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {BUILD_SPEC.map((s, i) => {
                const Icon = SPEC_ICONS[i] ?? Blueprint;
                return (
                  <div
                    key={s}
                    className="flex items-start gap-3 rounded-xl bg-white p-4 ring-1 ring-navy-100"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-700">
                      <Icon size={18} weight="duotone" />
                    </span>
                    <p className="text-sm leading-relaxed text-navy-800/80">
                      {s}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
