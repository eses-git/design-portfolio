import { useState } from "react";
import { MAPS_LINK, waLink } from "../../lib/config";
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

const CATEGORIES = ["Todos", "Cabello", "Uñas", "Maquillaje", "Spa"];

const SERVICES: Service[] = [
  { id: "corte", name: "Corte & Peinado", cat: "Cabello", desc: "Corte a medida con lavado y styling.", price: "$18", duration: "45 min", img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=700&q=80" },
  { id: "color", name: "Coloración", cat: "Cabello", desc: "Color completo con productos premium.", price: "$45", duration: "2 h", img: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=700&q=80" },
  { id: "evento", name: "Peinado de Evento", cat: "Cabello", desc: "Peinado elegante para ocasiones especiales.", price: "$30", duration: "1 h", img: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=700&q=80" },
  { id: "manicure", name: "Manicure Spa", cat: "Uñas", desc: "Manicure clásica con exfoliación e hidratación.", price: "$22", duration: "50 min", img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=700&q=80" },
  { id: "esmaltado", name: "Esmaltado Semi", cat: "Uñas", desc: "Color semipermanente de larga duración.", price: "$18", duration: "40 min", img: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=700&q=80" },
  { id: "maquillaje", name: "Maquillaje Social", cat: "Maquillaje", desc: "Look natural o glam para tu evento.", price: "$40", duration: "1 h", img: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=700&q=80" },
  { id: "facial", name: "Limpieza Facial", cat: "Spa", desc: "Limpieza profunda y revitalización.", price: "$35", duration: "1 h", img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=700&q=80" },
  { id: "masaje", name: "Masaje Relajante", cat: "Spa", desc: "Masaje descontracturante de cuerpo completo.", price: "$50", duration: "1 h", img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=700&q=80" },
];

const GALLERY = [
  { img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80", label: "Cabello" },
  { img: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=600&q=80", label: "Color" },
  { img: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=600&q=80", label: "Maquillaje" },
  { img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80", label: "Uñas" },
  { img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80", label: "Spa" },
  { img: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=600&q=80", label: "Styling" },
];

const SLOTS = ["10:00", "11:30", "13:00", "15:00", "16:30", "18:00"];

const HOURS = [
  { day: "Lunes a Viernes", hours: "9:00 – 19:00" },
  { day: "Sábado", hours: "10:00 – 17:00" },
  { day: "Domingo", hours: "Cerrado" },
];

const HERO_IMG =
  "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1600&q=80";

export default function BeautySalonDemo() {
  const [cat, setCat] = useState("Todos");
  const [selected, setSelected] = useState<Service | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const filtered = cat === "Todos" ? SERVICES : SERVICES.filter((s) => s.cat === cat);

  function choose(s: Service) {
    setSelected(s);
    setSlot(null);
    setConfirmed(false);
  }

  function book() {
    if (selected && slot) setConfirmed(true);
  }

  return (
    <div className="@container relative flex h-full flex-col overflow-hidden bg-cream text-ink">
      <div className="min-h-0 flex-1 overflow-y-auto">
        {/* nav */}
        <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-ink/10 bg-cream/95 px-4 py-3 backdrop-blur @sm:px-6">
          <div>
            <p className="font-serif text-lg leading-none">Lunaria</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-[0.24em] text-terracotta">Beauty &amp; Spa</p>
          </div>
          <nav className="hidden items-center gap-5 text-sm text-ink/70 @sm:flex">
            <a href="#servicios" className="hover:text-ink">Servicios</a>
            <a href="#galeria" className="hover:text-ink">Galería</a>
            <a href="#contacto" className="hover:text-ink">Contacto</a>
          </nav>
          <a
            href={waLink("Hola Lunaria, quiero reservar una cita")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-ink px-3 py-2 text-xs font-semibold text-cream transition-colors hover:bg-terracotta @sm:px-4"
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            Reservar
          </a>
        </header>

        {/* hero */}
        <section className="relative h-72 overflow-hidden @sm:h-[26rem]">
          <SmartImage src={HERO_IMG} alt="Salón de belleza premium" className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 @sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cream/80">
              Salón &amp; Spa · Quito
            </p>
            <h1 className="mt-3 max-w-xl text-3xl leading-tight text-balance text-cream @sm:text-5xl">
              Belleza que realza tu mejor versión
            </h1>
            <p className="mt-3 max-w-md text-sm text-cream/80 @sm:text-base">
              Cortes, color, uñas y rituales de spa. Reservá en segundos por WhatsApp.
            </p>
            <a
              href={waLink("Hola Lunaria, quiero reservar una cita")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-fit items-center gap-2 bg-terracotta px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Reservar por WhatsApp
            </a>
          </div>
        </section>
        {/* gallery */}
        <section id="galeria" className="px-4 py-10 @sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">Galería</p>
          <h2 className="mt-2 text-2xl @sm:text-3xl">Nuestro trabajo</h2>
          <div className="mt-6 grid grid-cols-2 gap-2 @sm:grid-cols-3">
            {GALLERY.map((g) => (
              <div key={g.label} className="group relative overflow-hidden border border-ink/10">
                <SmartImage
                  src={g.img}
                  alt={g.label}
                  className="h-32 w-full transition-transform duration-500 group-hover:scale-105 @sm:h-44"
                />
                <span className="absolute bottom-2 left-2 bg-ink/70 px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-cream">
                  {g.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* services */}
        <section id="servicios" className="px-4 pb-10 @sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">Menú</p>
          <h2 className="mt-2 text-2xl @sm:text-3xl">Servicios &amp; precios</h2>

          <div className="mt-5 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                className={
                  cat === c
                    ? "border border-ink bg-ink px-3 py-1.5 text-xs font-semibold text-cream"
                    : "border border-ink/30 px-3 py-1.5 text-xs text-ink/70 transition-colors hover:border-ink hover:text-ink"
                }
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-4 @sm:grid-cols-2">
            {filtered.map((s) => (
              <article
                key={s.id}
                className="flex flex-col border border-ink/15 bg-cream transition-all duration-300 hover:-translate-y-0.5 hover:shadow-editorial"
              >
                <div className="overflow-hidden">
                  <SmartImage src={s.img} alt={s.name} className="h-36 w-full @sm:h-44" />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-terracotta">{s.cat}</p>
                  <h3 className="mt-1 text-lg">{s.name}</h3>
                  <p className="mt-1 flex-1 text-sm text-ink/60">{s.desc}</p>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <div>
                      <p className="font-serif text-lg">{s.price}</p>
                      <p className="text-[11px] text-ink/50">{s.duration}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => choose(s)}
                      className="border border-ink bg-cream px-3 py-2 text-xs font-semibold transition-colors hover:bg-ink hover:text-cream"
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
          <div className="border border-ink bg-blush/40 p-5 @sm:p-6">
            <h3 className="text-xl">Reservá tu turno</h3>

            {confirmed && selected && slot ? (
              <div className="mt-4 text-center">
                <p className="font-serif text-2xl">¡Turno confirmado!</p>
                <p className="mt-2 text-sm text-ink/70">
                  {selected.name} · hoy a las {slot} · {selected.price}
                </p>
                <a
                  href={waLink(`Hola Lunaria, confirmé mi reserva: ${selected.name} a las ${slot}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 bg-ink px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-terracotta"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Recibir por WhatsApp
                </a>
              </div>
            ) : (
              <>
                <p className="mt-2 text-sm text-ink/70">
                  {selected ? (
                    <>Servicio elegido: <span className="font-semibold text-ink">{selected.name}</span> · {selected.duration} · {selected.price}</>
                  ) : (
                    "Elegí un servicio en el menú para continuar."
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
                          ? "border border-ink bg-ink py-2 text-sm text-cream"
                          : "border border-ink py-2 text-sm transition-colors hover:bg-blush"
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
                  className="mt-5 w-full bg-terracotta px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Confirmar reserva
                </button>
              </>
            )}
          </div>
        </section>

        {/* footer */}
        <footer id="contacto" className="border-t border-ink/10 bg-blush/40 px-4 py-8 @sm:px-6">
          <div className="grid gap-6 @sm:grid-cols-3">
            <div>
              <p className="font-serif text-lg">Lunaria</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-terracotta">Beauty &amp; Spa</p>
              <p className="mt-3 text-sm text-ink/60">Cuidamos tu belleza con productos premium y atención personalizada.</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide">Horarios</h4>
              <ul className="mt-3 space-y-1.5 text-sm text-ink/70">
                {HOURS.map((h) => (
                  <li key={h.day} className="flex justify-between gap-2">
                    <span>{h.day}</span>
                    <span className="font-medium text-ink">{h.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide">Ubicación</h4>
              <p className="mt-3 text-sm text-ink/70">Av. de los Shyris &amp; Naciones Unidas<br />Quito, Ecuador</p>
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center border border-ink px-3 py-2 text-xs font-semibold transition-colors hover:bg-ink hover:text-cream"
              >
                Abrir en Google Maps
              </a>
            </div>
          </div>
          <p className="mt-8 border-t border-ink/10 pt-4 text-xs text-ink/50">
            © {new Date().getFullYear()} Lunaria Beauty &amp; Spa · Quito, Ecuador
          </p>
        </footer>
      </div>
    </div>
  );
}