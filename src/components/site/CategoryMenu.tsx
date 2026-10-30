import { useEffect, useState, type FocusEvent, type KeyboardEvent } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  ArrowRight,
  Box,
  ChevronDown,
  Cpu,
  Fan,
  Gpu,
  HardDrive,
  MemoryStick,
  Monitor,
  PcCase,
  type LucideIcon,
} from "lucide-react";
import { categories } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const categoryMeta: Record<string, { icon: LucideIcon; description: string }> = {
  procesadores: { icon: Cpu, description: "CPU AMD Ryzen e Intel Core para gaming y trabajo." },
  "tarjetas-graficas": { icon: Gpu, description: "GPUs NVIDIA GeForce RTX y AMD Radeon." },
  "memoria-ram": { icon: MemoryStick, description: "Módulos DDR5 y DDR4 de alta velocidad." },
  almacenamiento: { icon: HardDrive, description: "SSD NVMe, SATA y discos para tu equipo." },
  gabinetes: { icon: PcCase, description: "Chasis ATX y mATX con buen flujo de aire." },
  refrigeracion: { icon: Fan, description: "Refrigeración líquida AIO y fuentes 80 Plus." },
  monitores: { icon: Monitor, description: "Paneles IPS de 144 Hz a 240 Hz." },
};

/**
 * "Componentes" nav entry with a hover/focus mega-menu that categorizes the
 * hardware catalog. Keyboard users open it by focusing the trigger or any of
 * its links; Escape closes it.
 */
export function CategoryMenu() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const active = pathname === "/productos" || pathname.startsWith("/categoria/");

  // The panel lives inside the sticky header, so it must never survive a route
  // change: the pointer is still over the menu after clicking a category and
  // the panel would otherwise stay open on top of the destination page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const closeIfFocusLeft = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") setOpen(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocusCapture={() => setOpen(true)}
      onBlurCapture={closeIfFocusLeft}
      onKeyDown={onKeyDown}
    >
      <Link
        to="/productos"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen(false)}
        className={cn(
          "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
          active
            ? "text-foreground underline decoration-primary decoration-2 underline-offset-8"
            : "text-muted-foreground hover:bg-secondary hover:text-foreground",
        )}
      >
        Componentes
        <ChevronDown
          className={cn("size-3.5 transition-transform duration-200", open && "rotate-180")}
          aria-hidden
        />
      </Link>

      <div
        className={cn(
          "absolute left-0 top-full z-50 w-[42rem] pt-3 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
        )}
      >
        <div className="rounded-2xl border bg-card p-5 shadow-card">
          <div className="flex items-center justify-between gap-4 border-b pb-3.5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Catálogo de hardware
            </p>
            <Link
              to="/productos"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary-deep transition-colors duration-200 hover:text-primary-hover"
            >
              Ver todo el catálogo <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </div>
          <ul className="mt-3 grid grid-cols-2 gap-1">
            {categories.map((category) => {
              const meta = categoryMeta[category.slug];
              const Icon = meta?.icon ?? Box;
              return (
                <li key={category.slug}>
                  <Link
                    to="/categoria/$slug"
                    params={{ slug: category.slug }}
                    onClick={() => setOpen(false)}
                    className="group/item flex items-start gap-3 rounded-xl p-2.5 transition-colors duration-200 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-lg border bg-secondary text-primary-deep transition-colors duration-200 group-hover/item:border-primary-hover group-hover/item:text-primary-hover">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span className="min-w-0 pt-0.5">
                      <span className="block truncate text-sm font-medium">{category.name}</span>
                      <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                        {meta?.description}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
