import { useState } from "react";
import { DEMOS, FILTERS, type DemoCategory, type DemoMeta } from "../lib/demos";
import DemoViewer from "./DemoViewer";
import SmartImage from "./SmartImage";

function PhoneIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="square"
      className={className}
      aria-hidden="true"
    >
      <rect x="6" y="2.5" width="12" height="19" />
      <line x1="10" y1="18" x2="14" y2="18" />
    </svg>
  );
}

function MonitorIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="square"
      className={className}
      aria-hidden="true"
    >
      <rect x="2.5" y="4" width="19" height="13" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

type ViewMode = "mobile" | "desktop";

interface OpenState {
  demo: DemoMeta;
  view: ViewMode;
}

export default function DemoShowcase() {
  const [filter, setFilter] = useState<"all" | DemoCategory>("all");
  const [active, setActive] = useState<OpenState | null>(null);

  const visible = filter === "all" ? DEMOS : DEMOS.filter((d) => d.category === filter);

  const openDemo = (demo: DemoMeta, view: ViewMode) => setActive({ demo, view });
  const close = () => setActive(null);

  return (
    <section id="demos" className="bg-night text-cream">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            Demostraciones interactivas
          </p>
          <h2 className="mt-3 text-3xl text-balance sm:text-5xl">
            Experiencias de venta listas para tu negocio
          </h2>
          <p className="mt-4 text-base leading-relaxed text-cream/70">
            Elegí un nicho y abrí una demo funcional a pantalla completa. Probala como
            si ya fuera la web de tu negocio.
          </p>
        </div>

        {/* filter tabs */}
        <div className="mt-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const isActive = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={isActive}
                className={
                  isActive
                    ? "border border-cream bg-cream px-3.5 py-2 text-xs font-semibold text-ink sm:text-sm"
                    : "border border-cream/25 px-3.5 py-2 text-xs font-medium text-cream/80 transition-colors hover:border-cream hover:text-cream sm:text-sm"
                }
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* demo cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((demo) => (
            <article
              key={demo.id}
              className="group flex flex-col border border-cream/15 bg-[#1c1a18] transition-all duration-500 hover:scale-[1.02] hover:border-terracotta"
            >
              {/* cover image */}
              <button
                type="button"
                onClick={() => openDemo(demo, "desktop")}
                aria-label={`Abrir ${demo.brand} en página completa`}
                className="block h-48 w-full overflow-hidden"
              >
                <SmartImage
                  src={demo.image}
                  alt={demo.brand}
                  className="h-48 w-full transition-transform duration-500 group-hover:scale-105"
                />
              </button>

              <div className="flex flex-1 flex-col p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-terracotta">
                  {demo.categoryLabel}
                </p>
                <h3 className="mt-2 font-serif text-xl leading-snug">{demo.brand}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-cream/70">
                  {demo.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {demo.features.map((feat) => (
                    <li
                      key={feat}
                      className="border border-cream/20 px-2 py-1 text-[11px] text-cream/70"
                    >
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* actions */}
                <div className="mt-5 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => openDemo(demo, "desktop")}
                    className="inline-flex items-center justify-center gap-1.5 bg-cream px-2 py-2.5 text-center text-xs font-semibold leading-tight text-ink transition-colors hover:bg-terracotta hover:text-white sm:text-sm"
                  >
                    <MonitorIcon className="h-4 w-4 shrink-0" />
                    <span>Abrir demo página</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => openDemo(demo, "mobile")}
                    className="inline-flex items-center justify-center gap-1.5 border border-cream/40 px-2 py-2.5 text-center text-xs font-semibold leading-tight text-cream transition-colors hover:border-terracotta hover:bg-terracotta hover:text-white sm:text-sm"
                  >
                    <PhoneIcon className="h-4 w-4 shrink-0" />
                    <span>Abrir demo móvil</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <DemoViewer demo={active?.demo ?? null} initialView={active?.view} onClose={close} />
    </section>
  );
}