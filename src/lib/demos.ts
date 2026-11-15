export type DemoCategory = "beauty" | "cosmetics" | "jewelry" | "tech" | "barber";

export interface DemoMeta {
  id: string;
  kind: string; // short, readable type shown on the card
  brand: string; // mock business name
  image: string; // stock photography shown on the showcase card
  category: DemoCategory;
  categoryLabel: string; // label used by the filter tabs
  description: string;
  features: string[];
}

export const DEMOS: DemoMeta[] = [
  {
    id: "salon",
    kind: "Salón & Spa",
    brand: "Lunaria Beauty & Spa",
    image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80",
    category: "beauty",
    categoryLabel: "Salones & Belleza",
    description:
      "Menú de servicios, reserva en línea por pasos y horarios con Google Maps.",
    features: ["Reserva por pasos", "Menú de servicios", "Google Maps"],
  },
  {
    id: "cosmetics",
    kind: "E-Commerce de Cosméticos",
    brand: "Blush & Bloom",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
    category: "cosmetics",
    categoryLabel: "Cosméticos",
    description:
      "Tienda en línea con catálogo, filtros por categoría y carrito de compra funcional.",
    features: ["Catálogo filtrable", "Carrito funcional", "Sin cuotas mensuales"],
  },
  {
    id: "jewelry",
    kind: "Boutique de Joyería",
    brand: "Aurea Fine Jewelry",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
    category: "jewelry",
    categoryLabel: "Joyería",
    description:
      "Lookbook editorial con fichas premium y consulta directa por WhatsApp.",
    features: ["Lookbook editorial", "Fichas premium", "Pedido por WhatsApp"],
  },
  {
    id: "tech",
    kind: "Celulares & Accesorios",
    brand: "Volt Tech Store",
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80",
    category: "tech",
    categoryLabel: "Celulares & Accesorios",
    description:
      "Tienda tech de alto contraste con filtro por modelo y checkout express.",
    features: ["Filtro por modelo", "Checkout express", "Estética dark"],
  },
  {
    id: "barber",
    kind: "Barbería Premium",
    brand: "Legacy Barbershop",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
    category: "barber",
    categoryLabel: "Barberías & Estética Masculina",
    description:
      "Barbería de alto contraste con cortes modernos, barba y toalla caliente. Reserva directa por WhatsApp.",
    features: ["Cortes & barba", "Reserva instantánea", "Estética dark"],
  },
];

export const FILTERS: { id: "all" | DemoCategory; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "beauty", label: "Salones & Belleza" },
  { id: "cosmetics", label: "Cosméticos" },
  { id: "jewelry", label: "Joyería" },
  { id: "tech", label: "Celulares & Accesorios" },
  { id: "barber", label: "Barberías & Estética Masculina" },
];