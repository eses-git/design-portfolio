import { waLink } from "../../lib/config";
import WhatsAppIcon from "../WhatsAppIcon";
import SmartImage from "../SmartImage";

interface Piece {
  id: number;
  name: string;
  material: string;
  price: string;
  img: string;
}

const PIECES: Piece[] = [
  { id: 1, name: "Anillo Solitario", material: "Oro 18k · Diamante", price: "$1.280", img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80" },
  { id: 2, name: "Collar Esmeralda", material: "Oro 18k · Esmeralda", price: "$2.400", img: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=900&q=80" },
  { id: 3, name: "Pendientes Perla", material: "Plata 925 · Perla", price: "$460", img: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=900&q=80" },
  { id: 4, name: "Brazalete Champagne", material: "Oro 18k", price: "$890", img: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=900&q=80" },
];

export default function JewelryDemo() {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-cream text-ink">
      <div className="min-h-0 flex-1 overflow-y-auto">
        {/* nav */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-ink/10 bg-cream px-4 py-3">
          <div>
            <p className="font-serif text-base leading-none">AUREA</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-[0.24em] text-champagne">Fine Jewelry</p>
          </div>
          <span className="text-xs text-ink/50">Lookbook 2025</span>
        </div>

        {/* hero */}
        <div className="border-b border-ink/10 bg-blush/50 px-4 py-8 text-center">
          <p className="text-[11px] uppercase tracking-[0.24em] text-ink/60">Piezas de autor</p>
          <h3 className="mt-2 text-2xl">Una joya cuenta tu historia</h3>
          <p className="mt-2 text-sm text-ink/60">Hecho a mano · Consulta privada por WhatsApp</p>
        </div>

        {/* featured */}
        <div className="px-4 py-6">
          <article className="group border border-ink transition-all duration-300 hover:shadow-editorial">
            <div className="h-56 overflow-hidden">
              <SmartImage
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80"
                alt="Anillo Solitario"
                className="h-full w-full transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <p className="text-[11px] uppercase tracking-wide text-ink/50">Pieza destacada</p>
              <h4 className="mt-1 text-xl">Anillo Solitario</h4>
              <p className="text-sm text-ink/60">Oro 18k · Diamante de 0.5 ct</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="font-serif text-lg">$1.280</span>
                <a
                  href={waLink("Hola Aurea, me interesa el Anillo Solitario")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-ink px-3 py-2 text-xs font-medium text-cream hover:bg-terracotta"
                >
                  <WhatsAppIcon className="h-3.5 w-3.5" />
                  Consultar
                </a>
              </div>
            </div>
          </article>
        </div>

        {/* lookbook grid */}
        <div className="grid grid-cols-2 gap-3 px-4 pb-6">
          {PIECES.filter((p) => p.id !== 1).map((p) => (
            <article
              key={p.id}
              className="group flex flex-col border border-ink/15 bg-cream transition-all duration-300 hover:shadow-editorial"
            >
              <div className="overflow-hidden">
                <SmartImage
                  src={p.img}
                  alt={p.name}
                  className="h-44 w-full transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-3">
                <h4 className="text-sm font-medium leading-tight">{p.name}</h4>
                <p className="mt-0.5 text-[11px] text-ink/50">{p.material}</p>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <span className="font-serif text-base">{p.price}</span>
                  <a
                    href={waLink(`Hola Aurea, me interesa: ${p.name}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Consultar ${p.name} por WhatsApp`}
                    className="flex h-8 w-8 items-center justify-center border border-ink hover:bg-ink hover:text-cream"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* cita privada */}
        <div className="px-4 pb-8">
          <div className="border border-ink bg-ink p-5 text-center text-cream">
            <h4 className="text-lg">Cita privada en boutique</h4>
            <p className="mt-1 text-sm text-cream/70">Mostrario personal · Ajustes sin costo</p>
            <a
              href={waLink("Hola Aurea, quiero agendar una cita en la boutique")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 bg-champagne px-5 py-2.5 text-sm font-medium text-ink hover:bg-cream"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Agendar cita
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}