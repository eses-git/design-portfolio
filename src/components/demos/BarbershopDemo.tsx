import { useState } from "react";
import { waLink } from "../../lib/config";
import WhatsAppIcon from "../WhatsAppIcon";
import SmartImage from "../SmartImage";

interface Service {
  id: string;
  name: string;
  cat: string;
  desc: string;
  price: string;
  duration: string;
  img: string;
}

const SERVICES: Service[] = [
  { id: "corte", name: "Corte Clásico", cat: "Corte", desc: "Tijera y máquina con acabado al detalle.", price: "$12", duration: "40 min", img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=700&q=80" },
  { id: "combo", name: "Corte + Barba", cat: "Combo", desc: "Corte moderno + perfilado de barba con navaja.", price: "$18", duration: "1 h", img: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=700&q=80" },
  { id: "barba", name: "Barba & Perfilado", cat: "Barba", desc: "Diseño y perfilado de barba con navaja.", price: "$10", duration: "30 min", img: "https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=700&q=80" },
  { id: "toalla", name: "Toalla Caliente", cat: "Afeitado", desc: "Afeitado tradicional con toalla caliente.", price: "$12", duration: "30 min", img: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=700&q=80" },
  { id: "fade", name: "Corte Fade Moderno", cat: "Corte", desc: "Degradado fade de alto impacto.", price: "$15", duration: "45 min", img: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=700&q=80" },
  { id: "premium", name: "Combo Premium", cat: "Combo", desc: "Corte + barba + toalla caliente + bebida.", price: "$25", duration: "1 h 30 min", img: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=700&q=80" },
];

const SLOTS = ["10:00", "11:00", "12:00", "15:00", "16:00", "17:30"];

const HOURS = [
  { day: "Lunes a Sábado", hours: "10:00 – 20:00" },
  { day: "Domingo", hours: "11:00 – 16:00" },
];

const HERO_IMG =
  "https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?auto=format&fit=crop&w=1600&q=80";

export default function BarbershopDemo() {
  const [selected, setSelected] = useState<Service | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  function choose(s: Service) {
    setSelected(s);
    setSlot(null);
    setConfirmed(false);
  }

  function book() {
    if (selected && slot) setConfirmed(true);
  }

  return (
    <div className="@container relative flex h-full flex-col overflow-hidden bg-coal text-cream">
      <div className="min-h-0 flex-1 overflow-y-auto">
        {/* nav */}
        <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-brass/30 bg-coal/95 px-4 py-3 backdrop-blur @sm:px-6">
          <div>
            <p className="font-serif text-lg leading-none tracking-wide">LEGACY</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-[0.28em] text-brass">Barbershop</p>
          </div>
          <a
            href={waLink("Hola Legacy, quiero reservar un turno")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-brass px-3 py-2 text-xs font-semibold text-coal transition-colors hover:bg-cream @sm:px-4 @sm:text-sm"
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            Reservar
          </a>
        </header>

        {/* hero */}
        <section className="relative h-80 overflow-hidden @sm:h-[26rem]">
          <SmartImage src={HERO_IMG} alt="Barbería premium" className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/55 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 @sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">
              Estética masculina · Quito
            </p>
            <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-[1.05] text-balance text-cream @sm:text-6xl">
              Cortes modernos. Barba afilada. Toalla caliente.
            </h1>
            <a
              href={waLink("Hola Legacy, quiero reservar un turno")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-fit items-center gap-2 bg-brass px-6 py-3.5 text-sm font-semibold text-coal transition-colors hover:bg-cream"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Reservar por WhatsApp
            </a>
          </div>
        </section>
        {/* services */}
        <section className="px-4 py-10 @sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brass">Servicios</p>
          <h2 className="mt-2 text-2xl @sm:text-3xl">Combos &amp; precios</h2>
          <p className="mt-2 text-sm text-cream/60">Precios transparentes. Sin costos ocultos.</p>

          <div className="mt-6 grid gap-4 @sm:grid-cols-2 @lg:grid-cols-3">
            {SERVICES.map((s) => (
              <article
                key={s.id}
                className="flex flex-col border border-cream/15 bg-[#141414] transition-all duration-300 hover:border-brass"
              >
                <div className="overflow-hidden">
                  <SmartImage
                    src={s.img}
                    alt={s.name}
                    className="h-36 w-full transition-transform duration-500 hover:scale-105 @sm:h-40"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-brass">{s.cat}</p>
                  <h3 className="mt-1 text-lg">{s.name}</h3>
                  <p className="mt-1 flex-1 text-sm text-cream/60">{s.desc}</p>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <div>
                      <p className="font-serif text-lg text-brass">{s.price}</p>
                      <p className="text-[11px] text-cream/45">{s.duration}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => choose(s)}
                      className="border border-brass/60 px-3 py-2 text-xs font-semibold text-brass transition-colors hover:bg-brass hover:text-coal"
                    >
                      Reservar
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* booking */}
        <section className="px-4 pb-8 @sm:px-6">
          <div className="border border-brass/40 bg-[#141414] p-5 @sm:p-6">
            <h3 className="text-xl">Bloqueá tu turno al instante</h3>

            {confirmed && selected && slot ? (
              <div className="mt-4 text-center">
                <p className="font-serif text-2xl text-brass">¡Turno reservado!</p>
                <p className="mt-2 text-sm text-cream/70">
                  {selected.name} · hoy a las {slot} · {selected.price}
                </p>
                <a
                  href={waLink(`Hola Legacy, reservé: ${selected.name} a las ${slot}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 bg-brass px-5 py-2.5 text-sm font-semibold text-coal transition-colors hover:bg-cream"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Confirmar por WhatsApp
                </a>
              </div>
            ) : (
              <>
                <p className="mt-2 text-sm text-cream/60">
                  {selected ? (
                    <>Servicio: <span className="font-semibold text-brass">{selected.name}</span> · {selected.duration} · {selected.price}</>
                  ) : (
                    "Elegí un servicio para reservar tu turno."
                  )}
                </p>
                <div className="mt-4 grid grid-cols-3 gap-2 @sm:grid-cols-6">
                  {SLOTS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSlot(s)}
                      className={
                        slot === s
                          ? "border border-brass bg-brass py-2 text-sm font-semibold text-coal"
                          : "border border-cream/25 py-2 text-sm transition-colors hover:border-brass"
                      }
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={book}
                  disabled={!selected || !slot}
                  className="mt-5 w-full bg-brass px-4 py-3 text-sm font-semibold text-coal transition-colors hover:bg-cream disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Confirmar reserva
                </button>
              </>
            )}
          </div>
        </section>

        {/* footer */}
        <footer className="border-t border-cream/10 bg-coal px-4 py-8 @sm:px-6">
          <div className="grid gap-6 @sm:grid-cols-3">
            <div>
              <p className="font-serif text-lg tracking-wide">LEGACY</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.28em] text-brass">Barbershop</p>
              <p className="mt-3 text-sm text-cream/60">Barbería premium con atención al detalle y agenda por WhatsApp.</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-brass">Horarios</h4>
              <ul className="mt-3 space-y-1.5 text-sm text-cream/70">
                {HOURS.map((h) => (
                  <li key={h.day} className="flex justify-between gap-2">
                    <span>{h.day}</span>
                    <span className="font-medium text-cream">{h.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-brass">Ubicación</h4>
              <p className="mt-3 text-sm text-cream/70">Av. Amazonas &amp; República<br />Quito, Ecuador</p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Quito%2C%20Ecuador"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center border border-brass/60 px-3 py-2 text-xs font-semibold text-brass transition-colors hover:bg-brass hover:text-coal"
              >
                Abrir en Google Maps
              </a>
            </div>
          </div>
          <p className="mt-8 border-t border-cream/10 pt-4 text-xs text-cream/40">
            © {new Date().getFullYear()} Legacy Barbershop · Quito, Ecuador
          </p>
        </footer>
      </div>
    </div>
  );
}