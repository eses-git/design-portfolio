import { waLink } from "../lib/config";
import WhatsAppIcon from "./WhatsAppIcon";

const NAV = [
  { href: "#demos", label: "Demos" },
  { href: "#ventajas", label: "Ventajas" },
  { href: "#contacto", label: "Contacto" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-cream/10 bg-night text-cream">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#inicio" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-terracotta font-serif text-sm font-semibold text-white">
            EB
          </span>
          <span className="font-serif text-lg leading-none">Estera Bulkiewicz</span>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-cream/70 underline-offset-4 transition-colors hover:text-cream hover:underline"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-terracotta px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-champagne hover:text-ink sm:px-4"
        >
          <WhatsAppIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Contactar</span>
        </a>
      </div>
    </header>
  );
}