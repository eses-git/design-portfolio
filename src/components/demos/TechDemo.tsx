import { useState } from "react";
import { waLink } from "../../lib/config";
import WhatsAppIcon from "../WhatsAppIcon";
import SmartImage from "../SmartImage";

type Category = "Todos" | "iPhone" | "Samsung" | "Xiaomi" | "Audio";
type ProductBrand = Exclude<Category, "Todos">;

interface Product {
  id: number;
  name: string;
  brand: ProductBrand;
  tag: string;
  desc: string;
  price: number;
  img: string;
}

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=800&q=80";

const CATEGORIES: Category[] = ["Todos", "iPhone", "Samsung", "Xiaomi", "Audio"];
const NAV = ["iPhone", "Samsung", "Xiaomi", "Audio", "Cargadores"];

const PRODUCTS: Product[] = [
  { id: 1, name: "Funda Protectora MagCase", brand: "iPhone", tag: "ORIGINAL", desc: "Silicona líquida anti-golpes", price: 15, img: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80" },
  { id: 2, name: "Cable Carga Rápida USB-C 2m", brand: "Samsung", tag: "MÁS VENDIDO", desc: "Trenzado reforzado 100W", price: 9, img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" },
  { id: 3, name: "Vidrio Templado 9H Edge-to-Edge", brand: "Xiaomi", tag: "STOCK LIMITADO", desc: "Cobertura total HD", price: 7, img: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80" },
  { id: 4, name: "Auriculares TWS Pro", brand: "Audio", tag: "MÁS VENDIDO", desc: "Cancelación de ruido & 24h batería", price: 29, img: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=800&q=80" },
];

interface CartLine {
  product: Product;
  qty: number;
}

export default function TechDemo() {
  const [category, setCategory] = useState<Category>("Todos");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [added, setAdded] = useState<number | null>(null);

  const visible = category === "Todos" ? PRODUCTS : PRODUCTS.filter((p) => p.brand === category);
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
    window.open(waLink(`Hola Volt, quiero pedir: ${lines}. Total: $${total}`), "_blank");
  }

  return (
    <div className="@container relative flex h-full flex-col overflow-hidden bg-[#121212] text-white">
      <div className="min-h-0 flex-1 overflow-y-auto">
        {/* announcement bar */}
        <div className="border-b border-white/10 bg-[#0A0A0A] px-4 py-2 text-center text-[10px] font-medium uppercase tracking-[0.14em] text-[#38BDF8] @sm:text-[11px]">
          ⚡ Envío rápido a todo Ecuador · Garantía oficial · Pago contra entrega
        </div>

        {/* header */}
        <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-white/10 bg-[#121212]/95 px-4 py-3 backdrop-blur @sm:px-6">
          <div>
            <p className="font-serif text-lg leading-none tracking-wide">VOLT</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-[0.24em] text-[#38BDF8]">Tech Store</p>
          </div>
          <nav className="hidden items-center gap-5 text-xs uppercase tracking-[0.12em] text-white/50 @lg:flex">
            {NAV.map((n) => (
              <a key={n} href="#catalogo" className="transition-colors hover:text-white">
                {n}
              </a>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-1.5 border border-white/25 px-3 py-2 text-xs font-semibold transition-colors hover:border-[#38BDF8] hover:text-[#38BDF8] @sm:text-sm"
          >
            Carrito ({count})
          </button>
        </header>
        {/* split hero */}
        <section className="grid @lg:grid-cols-2">
          <div className="flex flex-col justify-center gap-5 p-6 @sm:p-10 @lg:p-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#38BDF8]">
              Lo más nuevo · Navidad 2026
            </p>
            <h1 className="font-serif text-3xl leading-tight text-balance text-white @sm:text-4xl @lg:text-5xl">
              Protege y potencia tu equipo con estilo
            </h1>
            <p className="max-w-md text-sm leading-relaxed text-white/60">
              Fundas de alta resistencia, carga rápida y audio inalámbrico con envío
              asegurado en Quito, Guayaquil y todo Ecuador.
            </p>
            <div className="flex flex-col gap-3 @sm:flex-row">
              <a
                href="#catalogo"
                className="inline-flex items-center justify-center bg-[#38BDF8] px-6 py-3.5 text-sm font-semibold text-[#121212] transition-colors hover:bg-white"
              >
                Ver Catálogo
              </a>
              <a
                href={waLink("Hola Volt, quiero comprar por WhatsApp")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/40 px-6 py-3.5 text-sm font-semibold transition-colors hover:border-[#38BDF8] hover:bg-[#38BDF8] hover:text-[#121212]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Comprar por WhatsApp
              </a>
            </div>
          </div>
          <div className="relative min-h-64 border-l border-white/10">
            <SmartImage
              src="https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=1200&q=80"
              fallbackSrc={FALLBACK_IMG}
              alt="Accesorios tech premium"
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </section>

        {/* catalog */}
        <section id="catalogo" className="px-4 py-12 @sm:px-6">
          <div className="flex flex-col gap-4 @sm:flex-row @sm:items-end @sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#38BDF8]">Catálogo</p>
              <h2 className="mt-2 font-serif text-2xl text-white @sm:text-3xl">Lo más buscado</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={
                    category === c
                      ? "border border-[#38BDF8] bg-[#38BDF8] px-3.5 py-2 text-xs font-semibold text-[#121212]"
                      : "border border-white/25 px-3.5 py-2 text-xs text-white/70 transition-colors hover:border-[#38BDF8] hover:text-[#38BDF8]"
                  }
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 @sm:grid-cols-2 @lg:grid-cols-4">
            {visible.map((p) => (
              <article
                key={p.id}
                className="group flex flex-col border border-white/10 bg-[#1A1A1A] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#38BDF8]"
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
                  <span className="inline-flex w-fit border border-[#38BDF8]/50 bg-[#38BDF8]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#38BDF8]">
                    {p.tag}
                  </span>
                  <h3 className="mt-2 text-sm font-medium leading-tight text-white @sm:text-base">{p.name}</h3>
                  <p className="mt-1 text-xs text-white/50">{p.desc}</p>
                  <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                    <span className="font-serif text-lg text-[#38BDF8]">${p.price}</span>
                    <button
                      type="button"
                      onClick={() => add(p)}
                      className={
                        added === p.id
                          ? "inline-flex items-center gap-1 bg-[#38BDF8] px-3 py-2 text-xs font-semibold text-[#121212]"
                          : "inline-flex items-center gap-1 border border-white/25 px-3 py-2 text-xs font-semibold transition-colors hover:border-[#38BDF8] hover:text-[#38BDF8]"
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
              className="absolute inset-0 z-20 cursor-default bg-black/50"
            />
            <aside className="absolute inset-y-0 right-0 z-30 flex w-80 max-w-[90%] flex-col border-l border-white/10 bg-[#1A1A1A] shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <h4 className="font-serif text-lg">Tu carrito</h4>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar"
                  className="flex h-8 w-8 items-center justify-center border border-white/25 transition-colors hover:border-[#38BDF8] hover:text-[#38BDF8]"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
                {cart.length === 0 ? (
                  <p className="text-sm text-white/60">Tu carrito está vacío.</p>
                ) : (
                  <ul className="space-y-3">
                    {cart.map((line) => (
                      <li key={line.product.id} className="flex items-center gap-3 border border-white/10 p-2">
                        <SmartImage
                          src={line.product.img}
                          fallbackSrc={FALLBACK_IMG}
                          alt={line.product.name}
                          className="h-12 w-12 shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-white">{line.product.name}</p>
                          <p className="text-xs text-white/50">${line.product.price}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => changeQty(line.product.id, -1)}
                            className="flex h-6 w-6 items-center justify-center border border-white/25"
                            aria-label="Quitar uno"
                          >
                            -
                          </button>
                          <span className="w-5 text-center text-sm">{line.qty}</span>
                          <button
                            type="button"
                            onClick={() => changeQty(line.product.id, 1)}
                            className="flex h-6 w-6 items-center justify-center border border-white/25"
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

              <div className="border-t border-white/10 px-4 py-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Subtotal</span>
                  <span className="font-serif text-lg text-[#38BDF8]">${total}</span>
                </div>
                <button
                  type="button"
                  disabled={cart.length === 0}
                  onClick={checkout}
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 bg-[#38BDF8] px-4 py-3.5 text-sm font-semibold text-[#121212] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
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