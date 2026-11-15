/**
 * Central configuration for the portfolio.
 *
 * Before going live, replace WHATSAPP_NUMBER with the real, active
 * Ecuador WhatsApp number (international format, no "+" or spaces):
 *   country code 593 + 9 + 8 digits  ->  e.g. "5939XXXXXXXX"
 */

export const OWNER = {
  name: "Estera Bulkiewicz",
  role: "Full-Stack Software Engineer & Web Developer",
  location: "Ecuador",
};

/**
 * NOTE: Placeholder number — this keeps every WhatsApp link in a valid
 * format, but replace it with the real number before prospecting.
 */
export const WHATSAPP_NUMBER = "48510374489";

export const DEFAULT_WA_MESSAGE =
  "Hola Estera, vi tu portafolio y me interesa una web para mi negocio";

/** Builds a wa.me deep link with a pre-filled message. */
export function waLink(message: string = DEFAULT_WA_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Google Maps "get directions" link used inside the demo mockups. */
export const MAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=Quito%2C%20Ecuador";