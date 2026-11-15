import { useEffect, useState, type ReactNode } from "react";
import type { DemoMeta } from "../lib/demos";
import BeautySalonDemo from "./demos/BeautySalonDemo";
import CosmeticsDemo from "./demos/CosmeticsDemo";
import JewelryDemo from "./demos/JewelryDemo";
import TechDemo from "./demos/TechDemo";
import BarbershopDemo from "./demos/BarbershopDemo";

function renderDemo(id: string) {
  switch (id) {
    case "salon":
      return <BeautySalonDemo />;
    case "cosmetics":
      return <CosmeticsDemo />;
    case "jewelry":
      return <JewelryDemo />;
    case "tech":
      return <TechDemo />;
    case "barber":
      return <BarbershopDemo />;
    default:
      return null;
  }
}

function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex h-[min(80vh,760px)] w-[300px] flex-col border-[10px] border-[#1a1a1a] bg-[#1a1a1a] sm:w-[350px]"
    >
      {/* status bar + notch */}
      <div className="relative flex items-center justify-between bg-[#1a1a1a] px-4 pb-2 pt-1 text-[10px] font-medium text-cream/70">
        <span>9:41</span>
        <span className="absolute left-1/2 top-0.5 h-3.5 w-20 -translate-x-1/2 bg-[#121110]" />
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 border border-cream/40" />
          <span className="h-2 w-3 bg-cream/70" />
        </span>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden bg-cream">{children}</div>
    </div>
  );
}

function DesktopFrame({ children }: { children: ReactNode }) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex h-full max-h-[82vh] w-full max-w-6xl flex-col border border-cream/15 bg-[#121110]"
    >
      <div className="flex items-center gap-2 border-b border-cream/15 bg-[#1c1a18] px-4 py-2.5">
        <span className="h-3 w-3 bg-terracotta" />
        <span className="h-3 w-3 bg-champagne" />
        <span className="h-3 w-3 bg-cream/40" />
        <div className="ml-3 flex-1 border border-cream/15 bg-[#121110] px-3 py-1 text-[11px] text-cream/50">
          https://demo.estera.dev/negocio
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden bg-cream">{children}</div>
    </div>
  );
}

interface DemoViewerProps {
  demo: DemoMeta | null;
  initialView?: "mobile" | "desktop";
  onClose: () => void;
}

export default function DemoViewer({ demo, initialView = "mobile", onClose }: DemoViewerProps) {
  const [device, setDevice] = useState<"mobile" | "desktop">(initialView);

  useEffect(() => {
    if (demo) setDevice(initialView);
  }, [demo, initialView]);

  useEffect(() => {
    if (!demo) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [demo, onClose]);

  if (!demo) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${demo.brand} — ${demo.kind}`}
      onClick={onClose}
      className="fixed inset-0 z-50 flex flex-col bg-night text-cream"
    >
      {/* top toolbar (clicks here must NOT close the viewer) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b border-cream/15 px-4 py-3 sm:px-6"
      >
        <div className="min-w-0">
          <p className="truncate font-serif text-lg leading-none">{demo.brand}</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-cream/50">{demo.kind}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* device switcher */}
          <div className="flex border border-cream/25">
            <button
              type="button"
              onClick={() => setDevice("mobile")}
              className={
                device === "mobile"
                  ? "bg-cream px-3 py-2 text-xs font-semibold text-ink sm:px-4 sm:text-sm"
                  : "px-3 py-2 text-xs text-cream/70 transition-colors hover:text-cream sm:px-4 sm:text-sm"
              }
            >
              Vista Móvil
            </button>
            <button
              type="button"
              onClick={() => setDevice("desktop")}
              className={
                device === "desktop"
                  ? "bg-cream px-3 py-2 text-xs font-semibold text-ink sm:px-4 sm:text-sm"
                  : "px-3 py-2 text-xs text-cream/70 transition-colors hover:text-cream sm:px-4 sm:text-sm"
              }
            >
              Vista Escritorio
            </button>
          </div>

          {/* prominent close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar demo"
            className="inline-flex items-center gap-2.5 bg-terracotta px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:bg-champagne hover:text-ink sm:px-5 sm:text-base"
          >
            <span aria-hidden="true" className="text-lg leading-none">&times;</span>
            <span>Cerrar Demo</span>
          </button>
        </div>
      </div>

      {/* body */}
      <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden p-4 sm:p-6">
        {device === "mobile" ? (
          <PhoneFrame>{renderDemo(demo.id)}</PhoneFrame>
        ) : (
          <DesktopFrame>{renderDemo(demo.id)}</DesktopFrame>
        )}
      </div>
    </div>
  );
}