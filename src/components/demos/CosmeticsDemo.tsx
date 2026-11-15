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
  price: number;
  img: string;
}

const CATEGORIES: Category[] = ["Todos", "Piel", "Labios", "Ojos"];

const PRODUCTS: Product[] = [
  { id: 1, name: "Sérum Vitamina C", cat: "Piel", price: 24, img: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&w=700&q=80" },
  { id: 2, name: "Crema Hidratante", cat: "Piel", price: 19, img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=700&q=80" },
  { id: 3, name: "Tónico Refrescante", cat: "Piel", price: 16, img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=700&q=80" },
  { id: 4, name: "Labial Mate Terracota", cat: "Labios", price: 14, img: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=700&q=80" },
  { id: 5, name: "Gloss Brillo Rosa", cat: "Labios", price: 12, img: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=700&q=80" },
  { id: 6, name: "Paleta de Sombras", cat: "Ojos", price: 28, img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=700&q=80" },
  { id: 7, name: "Máscara de Pestañas", cat: "Ojos", price: 16, img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=700&q=80" },
  { id: 8, name: "Delineador Líquido", cat: "Ojos", price: 13, img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=700&q=80" },
];

interface CartLine {
  product: Product;
  qty: number;
}

export default function CosmeticsDemo() {
  const [category, setCategory] = useState<Category>("Todos");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);

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
    <div className="relative flex h-full flex-col overflow-hidden bg-cream text-ink">
      <div className="min-h-0 flex-1 overflow-y-auto">
        {/* nav */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-ink/10 bg-cream px-4 py-3">
          <div>
            <p className="font-serif text-base leading-none">Blush &amp; Bloom</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-terracotta">
              Cosméticos &amp; Skincare
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="relative inline-flex items-center gap-1.5 border border-ink bg-cream px-3 py-2 text-[11px] font-medium hover:bg-blush"
          >
            Carrito
            {count > 0 && (
              <span className="flex h-4 min-w-[1rem] items-center justify-center bg-ink px-1 text-[10px] text-cream">
                {count}
              </span>
            )}
          </button>
        </div>

        {/* zero monthly fees badge */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-ink/10 bg-blush/60 px-4 py-2 text-center">
          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink">Precio único</span>
          <span className="border border-ink bg-cream px-1.5 py-0.5 text-[10px] font-medium">
            Sin cuotas mensuales
          </span>
        </div>

        {/* hero */}
        <div className="px-4 py-6 text-center">
          <h3 className="text-2xl">Belleza que podés comprar hoy</h3>
          <p className="mt-1 text-sm text-ink/60">Envío a todo el país · Pago por WhatsApp</p>
        </div>

        {/* category filters */}
        <div className="flex flex-wrap gap-2 px-4 pb-4">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={
                category === c
                  ? "border border-ink bg-ink px-3 py-1.5 text-xs text-cream"
                  : "border border-ink bg-cream px-3 py-1.5 text-xs hover:bg-blush"
              }
            >
              {c}
            </button>
          ))}
        </div>

        {/* product grid */}
        <div className="grid grid-cols-2 gap-3 px-4 pb-8">
          {visible.map((p) => (
            <article
              key={p.id}
              className="group flex flex-col border border-ink/15 bg-cream transition-all duration-300 hover:-translate-y-0.5 hover:shadow-editorial"
            >
              <div className="overflow-hidden">
                <SmartImage
                  src={p.img}
                  alt={p.name}
                  className="h-32 w-full transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-3">
                <p className="text-[11px] uppercase tracking-wide text-ink/50">{p.cat}</p>
                <h4 className="mt-0.5 text-sm font-medium leading-tight">{p.name}</h4>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <span className="font-serif text-base">${p.price}</span>
                  <button
                    type="button"
                    onClick={() => add(p)}
                    className="border border-ink bg-cream px-2 py-1 text-[11px] font-medium hover:bg-ink hover:text-cream"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Cart drawer */}
      {open && (
        <>
          <button
            type="button"
            aria-label="Cerrar carrito"
            onClick={() => setOpen(false)}
            className="absolute inset-0 z-20 cursor-default bg-ink/40"
          />
          <aside className="absolute inset-y-0 right-0 z-30 flex w-72 max-w-[88%] flex-col border-l border-ink bg-cream shadow-2xl">
            <div className="flex items-center justify-between border-b border-ink px-4 py-3">
              <h4 className="text-base">Tu carrito</h4>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                className="flex h-7 w-7 items-center justify-center border border-ink hover:bg-blush"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
              {cart.length === 0 ? (
                <p className="text-sm text-ink/60">Tu carrito está vacío.</p>
              ) : (
                <ul className="space-y-3">
                  {cart.map((line) => (
                    <li key={line.product.id} className="flex items-center gap-3 border border-ink/15 p-2">
                      <SmartImage
                        src={line.product.img}
                        alt={line.product.name}
                        className="h-10 w-10 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{line.product.name}</p>
                        <p className="text-xs text-ink/50">${line.product.price}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => changeQty(line.product.id, -1)}
                          className="flex h-6 w-6 items-center justify-center border border-ink"
                          aria-label="Quitar uno"
                        >
                          -
                        </button>
                        <span className="w-5 text-center text-sm">{line.qty}</span>
                        <button
                          type="button"
                          onClick={() => changeQty(line.product.id, 1)}
                          className="flex h-6 w-6 items-center justify-center border border-ink"
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

            <div className="border-t border-ink px-4 py-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink/70">Total</span>
                <span className="font-serif text-lg">${total}</span>
              </div>
              <button
                type="button"
                disabled={cart.length === 0}
                onClick={checkout}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 bg-ink px-4 py-3 text-sm font-medium text-cream hover:bg-terracotta disabled:cursor-not-allowed disabled:opacity-40"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Finalizar por WhatsApp
              </button>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}