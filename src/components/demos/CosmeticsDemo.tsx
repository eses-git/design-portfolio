import { useState } from "react";
import { waLink } from "../../lib/config";
import WhatsAppIcon from "../WhatsAppIcon";
import SmartImage from "../SmartImage";

type Category = "Todos" | "Piel" | "Labios" | "Ojos";
type ProductCat = Exclude<Category, "Todos">;

interface Product {
  id: number;
  name: string;
  cat: ProductCat;
  tag: string;
  benefit: string;
  price: number;
  rating: number;
  img: string;
}

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80";

const CATEGORIES: Category[] = ["Todos", "Piel", "Labios", "Ojos"];

const PRODUCTS: Product[] = [
  { id: 1, name: "Sérum Vitamina C 15%", cat: "Piel", tag: "TOP VENTAS", benefit: "Iluminador & Antioxidante", price: 24, rating: 4.9, img: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&w=800&q=80" },
  { id: 2, name: "Crema Hidratante Ácido Hialurónico", cat: "Piel", tag: "HIDRATACIÓN", benefit: "Hidratación 24h", price: 19, rating: 4.8, img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80" },
  { id: 3, name: "Labial Mate Terracota", cat: "Labios", tag: "LARGA DURACIÓN", benefit: "Acabado Aterciopelado", price: 14, rating: 4.7, img: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80" },
  { id: 4, name: "Paleta Sombras Nude & Glow", cat: "Ojos", tag: "TOP VENTAS", benefit: "12 Tonos Alta Pigmentación", price: 28, rating: 4.9, img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80" },
  { id: 5, name: "Tónico Refrescante", cat: "Piel", tag: "REFRESCANTE", benefit: "Equilibra y Tonifica", price: 16, rating: 4.6, img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80" },
];

interface CartLine {
  product: Product;
  qty: number;
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5 text-brass" aria-label={`${rating} de 5 estrellas`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.4}
          className={`h-3.5 w-3.5 ${i < Math.round(rating) ? "fill-current" : "fill-transparent"}`}
        >
          <path d="M12 2l2.9 6.3 6.9.6-5.2 4.6 1.6 6.8-6.2-3.7-6.2 3.7 1.6-6.8L2.2 8.9l6.9-.6z" />
        </svg>
      ))}
      <span className="ml-1 text-xs text-[#1A1617]/60">{rating.toFixed(1)}</span>
    </span>
  );
}

export default function CosmeticsDemo() {
  const [category, setCategory] = useState<Category>("Todos");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [added, setAdded] = useState<number | null>(null);

  const visible = category === "Todos" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === category);
  const count = cart.reduce((sum, line) => sum + line.qty, 0);
  const total = cart.reduce((sum, line) => sum + line.product.price * line.qty, 0);

  function add(p: Product) {
    setCart((prev) => {
      const found = prev.find((line) => line.product.id === p.id);
      if (found) {
        return prev.map((line) => (line.product.id === p.id ? { ...line, qty: line.qty + 1 } : line));
      }
      return [...prev, { product: p, qty: 1 }];
    });
    setAdded(p.id);
    window.setTimeout(() => setAdded((cur) => (cur === p.id ? null : cur)), 1200);
  }

  function changeQty(id: number, delta: number) {
    setCart((prev) =>
      prev
        .map((line) => (line.product.id === id ? { ...line, qty: line.qty + delta } : line))
        .filter((line) => line.qty > 0),
    );
  }

  function checkout() {
    const lines = cart.map((line) => `${line.qty}x ${line.product.name}`).join(", ");
    window.open(waLink(`Hola Blush & Bloom, quiero pedir: ${lines}. Total: $${total}`), "_blank");
  }

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-[#FDF9F8] text-[#1A1617]">
      <div className="min-h-0 flex-1 overflow-y-auto">
        {/* announcement bar */}
        <div className="bg-[#1A1617] px-4 py-2 text-center text-[10px] font-medium uppercase tracking-[0.16em] text-[#FDF9F8] sm:text-[11px]">
          Envío a todo Ecuador · Pago contra entrega o transferencia · Edición Navidad 2026
        </div>

        {/* header */}
        <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-[#1A1617]/10 bg-[#FDF9F8]/95 px-4 py-3 backdrop-blur sm:px-6">
          <div>
            <p className="font-serif text-lg leading-none">Blush &amp; Bloom</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-[0.22em] text-[#D8A499]">
              Cosméticos &amp; Skincare
            </p>
          </div>
          <nav className="hidden items-center gap-5 text-xs uppercase tracking-[0.12em] text-[#1A1617]/60 lg:flex">
            <a href="#catalogo" className="transition-colors hover:text-[#1A1617]">Skincare</a>
            <a href="#catalogo" className="transition-colors hover:text-[#1A1617]">Maquillaje</a>
            <a href="#catalogo" className="transition-colors hover:text-[#1A1617]">Kits Regalo</a>
            <a href="#catalogo" className="transition-colors hover:text-[#1A1617]">Más Vendidos</a>
          </nav>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-1.5 border border-[#1A1617] bg-[#FDF9F8] px-3 py-2 text-xs font-semibold transition-colors hover:bg-[#1A1617] hover:text-[#FDF9F8] sm:text-sm"
          >
            Carrito ({count})
          </button>
        </header>
        {/* split hero */}
        <section className="grid lg:grid-cols-2">
          <div className="flex flex-col justify-center gap-5 p-6 sm:p-10 lg:p-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D8A499]">
              Skincare &amp; Maquillaje Original
            </p>
            <h1 className="font-serif text-3xl leading-tight text-balance sm:text-4xl lg:text-5xl">
              Tu rutina favorita, lista para brillar estas fiestas
            </h1>
            <p className="max-w-md text-sm leading-relaxed text-[#1A1617]/65">
              Productos dermatológicos, maquillaje de larga duración y sets de regalo con
              entrega rápida en Quito, Guayaquil y todo el país.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#catalogo"
                className="inline-flex items-center justify-center bg-[#1A1617] px-6 py-3.5 text-sm font-semibold text-[#FDF9F8] transition-colors hover:bg-[#D8A499] hover:text-[#1A1617]"
              >
                Ver Catálogo
              </a>
              <a
                href={waLink("Hola Blush & Bloom, quiero asesoría de piel")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-[#1A1617] px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-[#1A1617] hover:text-[#FDF9F8]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Asesoría de Piel
              </a>
            </div>
          </div>
          <div className="relative min-h-64 border-l border-[#1A1617]/10">
            <SmartImage
              src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=80"
              fallbackSrc={FALLBACK_IMG}
              alt="Skincare y cosméticos"
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </section>

        {/* catalog */}
        <section id="catalogo" className="px-4 py-12 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D8A499]">Catálogo</p>
              <h2 className="mt-2 font-serif text-2xl sm:text-3xl">Nuestros favoritos</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={
                    category === c
                      ? "border border-[#1A1617] bg-[#1A1617] px-3.5 py-2 text-xs font-semibold text-[#FDF9F8]"
                      : "border border-[#1A1617]/30 px-3.5 py-2 text-xs text-[#1A1617]/70 transition-colors hover:border-[#1A1617] hover:text-[#1A1617]"
                  }
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {visible.map((p) => (
              <article
                key={p.id}
                className="group flex flex-col border border-[#1A1617]/15 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-editorial"
              >
                <div className="overflow-hidden">
                  <SmartImage
                    src={p.img}
                    fallbackSrc={FALLBACK_IMG}
                    alt={p.name}
                    className="aspect-[4/5] w-full transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <span className="inline-flex w-fit border border-[#D8A499]/50 bg-[#D8A499]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9c635b]">
                    {p.tag}
                  </span>
                  <h3 className="mt-2 text-sm font-medium leading-tight sm:text-base">{p.name}</h3>
                  <p className="mt-1 text-xs text-[#1A1617]/55">{p.benefit}</p>
                  <div className="mt-2">
                    <Stars rating={p.rating} />
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                    <span className="font-serif text-lg">${p.price}</span>
                    <button
                      type="button"
                      onClick={() => add(p)}
                      className={
                        added === p.id
                          ? "inline-flex items-center gap-1 bg-[#1A1617] px-3 py-2 text-xs font-semibold text-[#FDF9F8]"
                          : "inline-flex items-center gap-1 border border-[#1A1617] px-3 py-2 text-xs font-semibold transition-colors hover:bg-[#1A1617] hover:text-[#FDF9F8]"
                      }
                    >
                      {added === p.id ? <>Agregado ✓</> : <>+ Agregar</>}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
        {/* cart drawer */}
        {open && (
          <>
            <button
              type="button"
              aria-label="Cerrar carrito"
              onClick={() => setOpen(false)}
              className="absolute inset-0 z-20 cursor-default bg-[#1A1617]/40"
            />
            <aside className="absolute inset-y-0 right-0 z-30 flex w-80 max-w-[90%] flex-col border-l border-[#1A1617] bg-[#FDF9F8] shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#1A1617] px-4 py-3">
                <h4 className="font-serif text-lg">Tu carrito</h4>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar"
                  className="flex h-8 w-8 items-center justify-center border border-[#1A1617] transition-colors hover:bg-[#1A1617] hover:text-[#FDF9F8]"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
                {cart.length === 0 ? (
                  <p className="text-sm text-[#1A1617]/60">Tu carrito está vacío.</p>
                ) : (
                  <ul className="space-y-3">
                    {cart.map((line) => (
                      <li key={line.product.id} className="flex items-center gap-3 border border-[#1A1617]/15 p-2">
                        <SmartImage
                          src={line.product.img}
                          fallbackSrc={FALLBACK_IMG}
                          alt={line.product.name}
                          className="h-12 w-12 shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">{line.product.name}</p>
                          <p className="text-xs text-[#1A1617]/50">${line.product.price}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => changeQty(line.product.id, -1)}
                            className="flex h-6 w-6 items-center justify-center border border-[#1A1617]"
                            aria-label="Quitar uno"
                          >
                            -
                          </button>
                          <span className="w-5 text-center text-sm">{line.qty}</span>
                          <button
                            type="button"
                            onClick={() => changeQty(line.product.id, 1)}
                            className="flex h-6 w-6 items-center justify-center border border-[#1A1617]"
                            aria-label="Agregar uno"
                          >
                            +
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="border-t border-[#1A1617] px-4 py-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#1A1617]/70">Subtotal</span>
                  <span className="font-serif text-lg">${total}</span>
                </div>
                <button
                  type="button"
                  disabled={cart.length === 0}
                  onClick={checkout}
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 bg-[#1A1617] px-4 py-3.5 text-sm font-semibold text-[#FDF9F8] transition-colors hover:bg-[#D8A499] hover:text-[#1A1617] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Finalizar Pedido por WhatsApp
                </button>
              </div>
            </aside>
          </>
        )}
      </div>
    </div>
  );
}