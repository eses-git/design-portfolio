import { waLink } from "../lib/config";
import WhatsAppIcon from "./WhatsAppIcon";

/** Floating, always-visible, high-visibility WhatsApp CTA. */
export default function WhatsAppFab() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="group fixed bottom-4 right-4 z-50 flex items-center gap-2.5 bg-terracotta px-4 py-3 font-semibold text-white shadow-editorial transition-all duration-300 hover:scale-105 hover:bg-champagne hover:text-ink sm:bottom-6 sm:right-6"
    >
      <WhatsAppIcon className="h-5 w-5" />
      <span className="text-sm">WhatsApp</span>
    </a>
  );
}