import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingCart, Truck, Wrench, MessageCircle, X } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { Logo } from "./Logo";
import { CategoryMenu } from "./CategoryMenu";
import { useStore } from "@/lib/store";
import { BUSINESS, categories, waLink } from "@/lib/catalog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/productos", label: "Componentes" },
  { to: "/pc-personalizadas", label: "PC personalizadas" },
  { to: "/servicios", label: "Servicios" },
  { to: "/ofertas", label: "Ofertas" },
  { to: "/contacto", label: "Contacto" },
] as const;

function SearchBar({ onDone }: { onDone?: () => void }) {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const submit = (e: FormEvent) => {
    e.preventDefault();
    navigate({ to: "/productos", search: { q: q.trim() || undefined } });
    onDone?.();
  };
  return (
    <form onSubmit={submit} role="search" className="relative w-full">
      <label htmlFor="site-search" className="sr-only">Buscar productos</label>
      <input
        id="site-search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Busca procesadores, gráficas, SSD..."
        className="h-11 w-full rounded-full border border-input bg-secondary pl-11 pr-4 text-sm outline-none transition focus:border-primary-hover focus:bg-background focus:ring-2 focus:ring-ring/40"
      />
      <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
    </form>
  );
}

export function Header() {
  const { count, favs } = useStore();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 animate-header-in">
      <div className="bg-ink text-ink-foreground">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-center gap-8 px-4 text-xs md:justify-between">
          <span className="flex items-center gap-2"><Wrench className="size-3.5 text-primary" />Ensamblado y servicio técnico en Puebla</span>
          <span className="hidden items-center gap-2 md:flex"><Truck className="size-3.5 text-primary" />Asesoría personalizada antes de comprar</span>
          <a href={waLink("Hola Lenkabits, quiero información.")} target="_blank" rel="noreferrer" className="hidden items-center gap-2 hover:text-primary md:flex">
            <MessageCircle className="size-3.5 text-primary" />WhatsApp {BUSINESS.phoneDisplay}
          </a>
        </div>
      </div>
      <div
        className={cn(
          "border-b bg-background/95 backdrop-blur transition-shadow duration-300",
          scrolled && "shadow-[0_10px_30px_-18px_rgba(0,0,0,0.45)]",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 md:h-20">
          <button className="lg:hidden" aria-label="Abrir menú" onClick={() => setOpen(true)}><Menu className="size-6" /></button>
          <Logo />
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
            <CategoryMenu />
            {nav.filter((n) => n.to !== "/productos").map((n) => (
              <Link key={n.to} to={n.to} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50" activeProps={{ className: "!text-foreground underline decoration-primary decoration-2 underline-offset-8" }}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto hidden max-w-sm flex-1 md:block"><SearchBar /></div>
          <div className="ml-auto flex items-center gap-1 md:ml-0">
            <Link to="/favoritos" aria-label="Favoritos" className="relative grid size-10 place-items-center rounded-full transition duration-200 hover:bg-secondary active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50">
              <Heart className="size-5" />
              {favs.length > 0 && <span className="absolute right-1 top-1 grid size-4 place-items-center rounded-full bg-ink text-[10px] font-bold text-ink-foreground">{favs.length}</span>}
            </Link>
            <Link to="/carrito" aria-label="Carrito" className="relative grid size-10 place-items-center rounded-full transition duration-200 hover:bg-secondary active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50">
              <ShoppingCart className="size-5" />
              {count > 0 && <span className="absolute right-0.5 top-0.5 grid size-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">{count}</span>}
            </Link>
          </div>
        </div>
        <div className="px-4 pb-3 md:hidden"><SearchBar /></div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/60" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-80 max-w-[85%] flex-col gap-6 overflow-y-auto bg-background p-6 animate-in slide-in-from-left">
            <div className="flex items-center justify-between"><Logo /><button aria-label="Cerrar menú" onClick={() => setOpen(false)}><X className="size-6" /></button></div>
            <nav className="flex flex-col">
              {nav.map((n) => (
                <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="border-b py-3 font-display text-lg font-semibold transition-colors hover:text-primary-deep">{n.label}</Link>
              ))}
            </nav>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Categorías</p>
              <div className="flex flex-col gap-1">
                {categories.map((c) => (
                  <Link key={c.slug} to="/categoria/$slug" params={{ slug: c.slug }} onClick={() => setOpen(false)} className="py-1.5 text-sm">{c.name}</Link>
                ))}
              </div>
            </div>
            <Button asChild><a href={waLink("Hola Lenkabits, quiero información.")} target="_blank" rel="noreferrer"><MessageCircle />Escríbenos por WhatsApp</a></Button>
          </div>
        </div>
      )}
    </header>
  );
}
