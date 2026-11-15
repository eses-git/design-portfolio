import { OWNER, waLink } from "../lib/config";
import WhatsAppIcon from "./WhatsAppIcon";
import SmartImage from "./SmartImage";

const NICHES = [
  { img: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=600&q=80", label: "Salones & Belleza" },
  { img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80", label: "Cosméticos" },
  { img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80", label: "Joyería" },
  { img: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=600&q=80", label: "Celulares & Accesorios" },
];

export default function Hero() {
  const [first, last] = OWNER.name.split(" ");

  return (
    <section id="inicio" className="border-b border-ink bg-cream">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-3xl animate-fade-up">
          {/* live badge */}
          <p className="inline-flex items-center gap-2.5 border border-ink bg-cream px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-ink">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping bg-terracotta opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 bg-terracotta" />
            </span>
            Disponible para nuevos proyectos en {OWNER.location}
          </p>

          <h1 className="mt-7 text-5xl leading-[1.02] tracking-tight text-balance sm:text-7xl">
            {first} <span className="italic text-terracotta">{last}</span>
          </h1>

          <p className="mt-5 font-serif text-xl italic text-ink/80 sm:text-2xl">{OWNER.role}</p>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/70 sm:text-lg">
            Sitios web a medida, ultrarrápidos y elegantes para negocios locales en
            Ecuador — <span className="font-semibold text-ink">sin cuotas mensuales</span> y
            pensados para vender por WhatsApp.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-ink px-6 py-3.5 text-sm font-semibold text-cream transition-all duration-300 hover:bg-terracotta hover:text-white"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Contactar por WhatsApp
            </a>
            <a
              href="#demos"
              className="inline-flex items-center justify-center gap-2 border-2 border-ink px-6 py-3.5 text-sm font-semibold text-ink transition-all duration-300 hover:bg-ink hover:text-cream"
            >
              Ver demos interactivas <span aria-hidden="true">&darr;</span>
            </a>
          </div>
        </div>

        {/* niche strip */}
        <div className="mt-14 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {NICHES.map((n) => (
            <a
              key={n.label}
              href="#demos"
              className="group relative block h-36 overflow-hidden border border-ink transition-all duration-500 hover:scale-[1.02]"
            >
              <SmartImage
                src={n.img}
                alt={n.label}
                className="h-full w-full transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
              <span className="absolute bottom-2.5 left-3 text-xs font-semibold uppercase tracking-widest text-cream">
                {n.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}