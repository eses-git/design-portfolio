import { useState } from "react";
import { waLink } from "../../lib/config";
import WhatsAppIcon from "../WhatsAppIcon";
import SmartImage from "../SmartImage";

type Brand = "Todos" | "iPhone" | "Samsung" | "Xiaomi";
type ProductBrand = Exclude<Brand, "Todos">;

interface Product {
  id: number;
  name: string;
  brand: ProductBrand;
  price: number;
  img: string;
}

const BRANDS: Brand[] = ["Todos", "iPhone", "Samsung", "Xiaomi"];

const PRODUCTS: Product[] = [
  { id: 1, name: "Funda Protectora", brand: "iPhone", price: 15, img: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=700&q=80" },
  { id: 2, name: "Cable USB-C 2m", brand: "Samsung", price: 9, img: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=700&q=80" },
  { id: 3, name: "Protector Pantalla", brand: "Xiaomi", price: 7, img: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=700&q=80" },
  { id: 4, name: "Auriculares TWS", brand: "iPhone", price: 29, img: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=700&q=80" },
  { id: 5, name: "Cargador 25W", brand: "Samsung", price: 18, img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=700&q=80" },
  { id: 6, name: "Power Bank 10k", brand: "Xiaomi", price: 22, img: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=700&q=80" },
  { id: 7, name: "Smartwatch Strap", brand: "iPhone", price: 11, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80" },
  { id: 8, name: "Soporte Magnético", brand: "Samsung", price: 6, img: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=700&q=80" },
];

export default function TechDemo() {
  const [brand, setBrand] = useState<Brand>("Todos");
  const [fast, setFast] = useState<Product | null>(null);

  const visible = brand === "Todos" ? PRODUCTS : PRODUCTS.filter((p) => p.brand === brand);

  function quickBuy(p: Product) {
    setFast(p);
  }

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-slate text-cream">
      <div className="min-h-0 flex-1 overflow-y-auto">
        {/* nav */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-cream/15 bg-slate px-4 py-3">
          <div>
            <p className="font-serif text-base leading-none text-cream">VOLT</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-[0.24em] text-champagne">Tech Store</p>
          </div>
          <span className="border border-cream/20 px-2 py-1 text-[10px] uppercase tracking-wide text-champagne">
            Envío hoy
          </span>
        </div>

        {/* hero */}
        <div className="border-b border-cream/10 px-4 py-8 text-center">
          <h3 className="text-2xl">Accesorios para tu equipo</h3>
          <p className="mt-2 text-sm text-cream/60">Originales · Garantía · Pago fácil</p>
        </div>

        {/* brand filter */}
        <div className="flex flex-wrap gap-2 px-4 py-4">
          {BRANDS.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setBrand(b)}
              className={
                brand === b
                  ? "border border-champagne bg-champagne px-3 py-1.5 text-xs font-medium text-slate"
                  : "border border-cream/25 px-3 py-1.5 text-xs text-cream hover:border-champagne"
              }
            >
              {b}
            </button>
          ))}
        </div>

        {/* grid */}
        <div className="grid grid-cols-2 gap-3 px-4 pb-4">
          {visible.map((p) => (
            <article
              key={p.id}
              className="group flex flex-col border border-cream/15 transition-all duration-300 hover:border-champagne"
            >
              <div className="overflow-hidden">
                <SmartImage
                  src={p.img}
                  alt={p.name}
                  className="h-32 w-full transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-3">
                <p className="text-[11px] uppercase tracking-wide text-champagne">{p.brand}</p>
                <h4 className="mt-0.5 text-sm font-medium leading-tight text-cream">{p.name}</h4>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <span className="font-serif text-base text-champagne">${p.price}</span>
                  <button
                    type="button"
                    onClick={() => quickBuy(p)}
                    className="border border-cream/25 px-2 py-1 text-[11px] font-medium text-cream hover:bg-champagne hover:text-slate"
                  >
                    Comprar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* fast checkout */}
        <div className="mx-4 mb-8 border border-cream/20 p-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base">Checkout express</h4>
            <span className="text-[10px] uppercase tracking-wide text-champagne">1 clic</span>
          </div>

          {fast ? (
            <div className="mt-3 flex items-center gap-3 border border-cream/15 p-3">
              <SmartImage src={fast.img} alt={fast.name} className="h-12 w-12 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-cream">{fast.name}</p>
                <p className="text-xs text-cream/50">{fast.brand} · Unidad</p>
              </div>
              <div className="text-right">
                <p className="font-serif text-base text-champagne">${fast.price}</p>
                <p className="text-[10px] text-cream/50">Envío $3</p>
              </div>
            </div>
          ) : (
            <p className="mt-3 text-sm text-cream/50">
              Elegí un producto y completá la compra en segundos.
            </p>
          )}

          <div className="mt-3 grid grid-cols-3 gap-2 text-[11px] text-cream/70">
            <span className="border border-cream/15 px-2 py-2 text-center">1 · Producto</span>
            <span className="border border-cream/15 px-2 py-2 text-center">2 · Envío</span>
            <span className="border border-cream/15 px-2 py-2 text-center">3 · Pago</span>
          </div>

          <a
            href={waLink(
              fast
                ? `Hola Volt, quiero comprar: ${fast.name} (${fast.brand}) por $${fast.price}`
                : "Hola Volt, quiero hacer una compra",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex w-full items-center justify-center gap-2 bg-champagne px-4 py-3 text-sm font-medium text-slate hover:bg-terracotta hover:text-cream"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Pagar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}