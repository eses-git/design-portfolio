import { waLink } from "../lib/config";
import WhatsAppIcon from "./WhatsAppIcon";

const ADVANTAGES = [
  { n: "01", title: "Carga ultrarrápida", body: "Optimizada para abrir al instante, incluso con datos móviles o una red lenta." },
  { n: "02", title: "Diseño 100% a medida", body: "Cada píxel pensado para tu marca. Nada de plantillas genéricas." },
  { n: "03", title: "Cero cuotas mensuales", body: "Pagás una sola vez y el sitio es tuyo. Sin costos ocultos." },
  { n: "04", title: "Mobile-first", body: "Luce perfecto en el celular de tus clientes, desde donde te visitan." },
  { n: "05", title: "WhatsApp integrado", body: "Tus clientes te escriben con un solo toque, directo a tu chat." },
  { n: "06", title: "SEO & Google Maps", body: "Te encuentran y te contactan cuando busquen tu servicio en la zona." },
];

export default function ValueProps() {
  return (
    <section id="ventajas" className="border-b border-ink bg-cream">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            Ventajas técnicas
          </p>
          <h2 className="mt-3 text-3xl text-balance sm:text-5xl">
            Una web que trabaja para tu negocio
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/70">
            Más que una simple página: una herramienta de ventas rápida, elegante y
            pensada para convertir visitas en clientes.
          </p>
        </div>

        <div className="mt-12 grid gap-px border border-ink bg-ink sm:grid-cols-2 lg:grid-cols-3">
          {ADVANTAGES.map((item) => (
            <article
              key={item.n}
              className="group flex flex-col gap-4 bg-cream p-7 transition-colors duration-300 hover:bg-blush/50"
            >
              <span className="flex h-11 w-11 items-center justify-center border border-ink bg-ink font-serif text-sm text-cream transition-colors duration-300 group-hover:border-terracotta group-hover:bg-terracotta">
                {item.n}
              </span>
              <h3 className="text-xl">{item.title}</h3>
              <p className="text-sm leading-relaxed text-ink/70">{item.body}</p>
            </article>
          ))}
        </div>

        {/* CTA band */}
        <div className="mt-12 flex flex-col items-start justify-between gap-6 border border-ink bg-ink p-8 text-cream sm:flex-row sm:items-center">
          <div>
            <h3 className="text-2xl text-balance">Tu web, sin cuotas mensuales ni sorpresas</h3>
            <p className="mt-2 text-sm text-cream/70">
              Pagás una vez. El sitio, el dominio y el mantenimiento base quedan del lado tuyo.
            </p>
          </div>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 bg-terracotta px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-champagne hover:text-ink"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Hablemos por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}