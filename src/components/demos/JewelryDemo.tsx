import { useState } from "react";
import { MAPS_LINK, waLink } from "../../lib/config";
import WhatsAppIcon from "../WhatsAppIcon";
import SmartImage from "../SmartImage";

type Category = "Todos" | "Anillos" | "Collares" | "Pulseras";

interface Piece {
  id: number;
  name: string;
  category: Exclude<Category, "Todos">;
  tag: string;
  material: string;
  price: string;
  img: string;
}

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=900&q=80";

const PIECES: Piece[] = [
  {
    id: 1,
    name: "Anillo Solitario",
    category: "Anillos",
    tag: "ORO 18K",
    material: "Oro 18k · Diamante 0.5 ct",
    price: "$1.280",
    img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Collar de Perlas Cultivadas",
    category: "Collares",
    tag: "PERLAS",
    material: "Perlas naturales · Broche Oro 18k",
    price: "$420",
    img: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Anillo de Grado Clásico",
    category: "Anillos",
    tag: "ORO 18K",
    material: "Oro 18k · Personalizable",
    price: "$390",
    img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "Pulsera Eslabones Finos",
    category: "Pulseras",
    tag: "ORO 18K",
    material: "Oro 18k · Hecho a mano",
    price: "$540",
    img: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80",
  },
];

const FILTERS: { id: Category; label: string }[] = [
  { id: "Todos", label: "Todos" },
  { id: "Anillos", label: "Anillos" },
  { id: "Collares", label: "Collares" },
  { id: "Pulseras", label: "Pulseras" },
];

function BadgeIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="square" className={className} aria-hidden="true">
      <circle cx="12" cy="9" r="5" />
      <path d="M9 13l-1.6 6 4.6-2.5L16.6 19 15 13" />
    </svg>
  );
}

function GiftIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="square" className={className} aria-hidden="true">
      <rect x="3.5" y="8" width="17" height="4" />
      <rect x="5.5" y="12" width="13" height="8" />
      <line x1="12" y1="8" x2="12" y2="20" />
      <path d="M12 8s-2.6 0-3-2.1C8.7 4.3 9.9 3.2 11 4.2c.7.6 1 3.8 1 3.8s.3-3.2 1-3.8c1.1-1 2.3.1 2 1.7C14.6 8 12 8 12 8z" />
    </svg>
  );
}

function ShieldIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="square" className={className} aria-hidden="true">
      <path d="M12 3l7 3v6c0 4.5-3 8-7 9.5C8 20 5 16.5 5 12V6z" />
      <path d="M9.5 11.5v-1a2.5 2.5 0 015 0v1" />
      <rect x="9.3" y="11.3" width="5.4" height="4" />
    </svg>
  );
}

const TRUST = [
  { title: "Certificado de Autenticidad", icon: <BadgeIcon /> },
  { title: "Estuche de Regalo Incluido", icon: <GiftIcon /> },
  { title: "Envíos Asegurados en Ecuador", icon: <ShieldIcon /> },
];

export default function JewelryDemo() {
  const [filter, setFilter] = useState<Category>("Todos");
  const visible = filter === "Todos" ? PIECES : PIECES.filter((p) => p.category === filter);

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-[#FAF8F5] text-[#141414]">
      <div className="min-h-0 flex-1 overflow-y-auto">
        {/* header */}
        <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-[#141414]/10 bg-[#FAF8F5]/95 px-4 py-3 backdrop-blur sm:px-6">
          <div>
            <p className="font-serif text-lg leading-none tracking-wide">AUREA</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-[0.3em] text-brass">Fine Jewelry</p>
          </div>
          <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.16em] text-[#141414]/60 md:flex">
            <a href="#coleccion" className="transition-colors hover:text-[#141414]">Colección</a>
            <a href="#amedida" className="transition-colors hover:text-[#141414]">A Medida</a>
            <a href="#contacto" className="transition-colors hover:text-[#141414]">Contacto</a>
          </nav>
          <span className="hidden text-[10px] uppercase tracking-[0.24em] text-brass sm:block">
            Colección 2026
          </span>
        </header>

        {/* split hero */}
        <section className="grid md:grid-cols-2">
          <div className="flex flex-col justify-center gap-5 p-6 sm:p-10 lg:p-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brass">
              Piezas de autor · Oro 18k &amp; Plata 925
            </p>
            <h1 className="font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
              Piezas eternas hechas a mano
            </h1>
            <p className="max-w-md text-sm leading-relaxed text-[#141414]/65">
              Joyas exclusivas y diseños personalizados con envíos asegurados en todo Ecuador.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#coleccion"
                className="inline-flex items-center justify-center bg-[#141414] px-6 py-3.5 text-sm font-semibold text-[#FAF8F5] transition-colors hover:bg-brass hover:text-[#141414]"
              >
                Explorar Colección
              </a>
              <a
                href={waLink("Hola Aurea, quiero asesoría por WhatsApp")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-[#141414] px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-[#141414] hover:text-[#FAF8F5]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Asesoría por WhatsApp
              </a>
            </div>
          </div>
          <div className="relative min-h-64 border-l border-[#141414]/10">
            <SmartImage
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80"
              fallbackSrc={FALLBACK_IMG}
              alt="Joyas de oro fino"
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </section>
        {/* trust strip */}
        <section className="grid grid-cols-1 gap-px border-y border-[#141414]/10 bg-[#141414]/10 sm:grid-cols-3">
          {TRUST.map((t) => (
            <div key={t.title} className="flex items-center gap-3 bg-[#FAF8F5] px-5 py-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#141414]/20 text-[#141414]">
                {t.icon}
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#141414]/70">
                {t.title}
              </span>
            </div>
          ))}
        </section>

        {/* collection + filter + grid */}
        <section id="coleccion" className="px-4 py-12 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brass">
                Colección 2026
              </p>
              <h2 className="mt-2 font-serif text-2xl sm:text-3xl">Piezas destacadas</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  className={
                    filter === f.id
                      ? "border border-[#141414] bg-[#141414] px-3.5 py-2 text-xs font-semibold text-[#FAF8F5]"
                      : "border border-[#141414]/30 px-3.5 py-2 text-xs text-[#141414]/70 transition-colors hover:border-[#141414] hover:text-[#141414]"
                  }
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {visible.map((p) => (
              <article
                key={p.id}
                className="group flex flex-col border border-[#141414]/15 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-editorial"
              >
                <div className="overflow-hidden">
                  <SmartImage
                    src={p.img}
                    fallbackSrc={FALLBACK_IMG}
                    alt={p.name}
                    className="aspect-[4/5] w-full transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-3.5">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brass">
                    {p.tag}
                  </span>
                  <h3 className="mt-1 text-sm font-medium sm:text-base">{p.name}</h3>
                  <p className="mt-0.5 text-[11px] text-[#141414]/55">{p.material}</p>
                  <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                    <span className="font-serif text-base sm:text-lg">{p.price}</span>
                    <a
                      href={waLink(`Hola Aurea, me interesa: ${p.name}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 border border-[#141414] px-2.5 py-2 text-[11px] font-semibold transition-colors hover:bg-[#141414] hover:text-[#FAF8F5]"
                    >
                      <WhatsAppIcon className="h-3.5 w-3.5" />
                      Consultar
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
        {/* a medida */}
        <section id="amedida" className="px-4 pb-12 sm:px-6 lg:px-10">
          <div className="border border-[#141414] bg-[#141414] p-6 text-[#FAF8F5] sm:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brass">
                  A Medida
                </p>
                <h2 className="mt-2 font-serif text-2xl sm:text-3xl">Diseñamos tu joya soñada</h2>
                <p className="mt-2 max-w-lg text-sm text-[#FAF8F5]/70">
                  Anillos de compromiso, obsequios corporativos o piezas únicas. Boceto,
                  aprobación y entrega en todo Ecuador.
                </p>
              </div>
              <a
                href={waLink("Hola Aurea, quiero diseñar una joya a medida")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 bg-brass px-6 py-3.5 text-sm font-semibold text-[#141414] transition-colors hover:bg-[#FAF8F5]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Iniciar diseño
              </a>
            </div>
          </div>
        </section>

        {/* footer */}
        <footer id="contacto" className="border-t border-[#141414]/10 px-4 py-10 sm:px-6 lg:px-10">
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <p className="font-serif text-lg tracking-wide">AUREA</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-brass">Fine Jewelry</p>
              <p className="mt-3 max-w-xs text-sm text-[#141414]/60">
                Joyas exclusivas y diseños personalizados. Autenticidad certificada.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#141414]/70">
                Horarios
              </h4>
              <ul className="mt-3 space-y-1.5 text-sm text-[#141414]/65">
                <li className="flex justify-between gap-2"><span>Lunes a Viernes</span><span className="font-medium text-[#141414]">10:00 – 19:00</span></li>
                <li className="flex justify-between gap-2"><span>Sábado</span><span className="font-medium text-[#141414]">11:00 – 17:00</span></li>
                <li className="flex justify-between gap-2"><span>Domingo</span><span className="font-medium text-[#141414]">Cerrado</span></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#141414]/70">
                Contacto
              </h4>
              <p className="mt-3 text-sm text-[#141414]/65">Av. Portugal &amp; Eloy Alfaro<br />Quito, Ecuador</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href={waLink("Hola Aurea, quiero más información")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 border border-[#141414] px-3 py-2 text-xs font-semibold transition-colors hover:bg-[#141414] hover:text-[#FAF8F5]"
                >
                  <WhatsAppIcon className="h-3.5 w-3.5" />
                  WhatsApp
                </a>
                <a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center border border-[#141414] px-3 py-2 text-xs font-semibold transition-colors hover:bg-[#141414] hover:text-[#FAF8F5]"
                >
                  Google Maps
                </a>
              </div>
            </div>
          </div>
          <p className="mt-8 border-t border-[#141414]/10 pt-4 text-xs text-[#141414]/45">
            © {new Date().getFullYear()} Aurea Fine Jewelry · Quito, Ecuador
          </p>
        </footer>
      </div>
    </div>
  );
}