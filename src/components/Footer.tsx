import { OWNER, waLink } from "../lib/config";
import WhatsAppIcon from "./WhatsAppIcon";

export default function Footer() {
  return (
    <footer id="contacto" className="bg-night text-cream">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
              Contacto directo
            </p>
            <h2 className="mt-3 text-3xl text-balance sm:text-5xl">
              Conversemos sobre tu proyecto
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-cream/70">
              Contame qué hace tu negocio y qué necesitás. Te respondo con una
              propuesta clara y sin compromiso.
            </p>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 bg-terracotta px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-champagne hover:text-ink"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Escribirme por WhatsApp
            </a>
          </div>

          <div className="border border-cream/20 bg-[#1c1a18] p-6">
            <h3 className="text-lg">Información</h3>
            <dl className="mt-4 space-y-3 text-sm text-cream/70">
              <div className="flex justify-between gap-4">
                <dt className="text-cream/50">Nombre</dt>
                <dd className="text-right">{OWNER.name}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-cream/50">Rol</dt>
                <dd className="text-right text-cream">Full-Stack Engineer</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-cream/50">Zona</dt>
                <dd className="text-right">{OWNER.location}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-cream/50">Canal</dt>
                <dd className="text-right">WhatsApp</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-cream/20 pt-6 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {OWNER.name}. Todos los derechos reservados.
          </p>
          <p>Diseño editorial &middot; Sitios web a medida &middot; Sin cuotas mensuales</p>
        </div>
      </div>
    </footer>
  );
}