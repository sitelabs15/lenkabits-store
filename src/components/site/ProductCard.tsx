import { Link } from "@tanstack/react-router";
import { Heart, ShoppingCart } from "lucide-react";
import { availabilityLabel, formatMXN, type Product } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";

export function ProductCard({ p }: { p: Product }) {
  const { add, toggleFav, isFav } = useStore();
  const fav = isFav(p.slug);
  const off = p.compareAtCents ? Math.round((1 - p.priceCents / p.compareAtCents) * 100) : 0;
  const soldOut = p.availability === "agotado";
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border bg-card transition duration-300 hover:-translate-y-1 hover:border-primary-hover hover:shadow-glow">
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <Link to="/producto/$slug" params={{ slug: p.slug }} aria-label={p.name}>
          <img src={p.image} alt={p.name} loading="lazy" width={816} height={816} className="size-full object-cover transition duration-700 ease-out group-hover:scale-[1.06]" />
        </Link>
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {off > 0 && <span className="skew-tag rounded-sm bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground"><span>-{off}%</span></span>}
          {p.tags.includes("nuevo") && <span className="skew-tag rounded-sm bg-ink px-2 py-0.5 text-xs font-bold text-ink-foreground"><span>Nuevo</span></span>}
        </div>
        <button
          onClick={() => toggleFav(p.slug)}
          aria-label={fav ? "Quitar de favoritos" : "Guardar en favoritos"}
          aria-pressed={fav}
          className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-background/90 shadow-card transition duration-200 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Heart className={cn("size-4", fav && "fill-primary-deep text-primary-deep")} />
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{p.brand}</p>
        <Link to="/producto/$slug" params={{ slug: p.slug }} className="line-clamp-2 font-display font-semibold leading-snug hover:underline">{p.name}</Link>
        <p className={cn("text-xs", p.availability === "disponible" ? "text-primary-deep" : "text-muted-foreground")}>● {availabilityLabel[p.availability]}</p>
        <div className="mt-auto flex items-end justify-between pt-3">
          <div>
            <p className="font-display text-xl font-bold">{formatMXN(p.priceCents)}</p>
            {p.compareAtCents && <p className="text-xs text-muted-foreground line-through">{formatMXN(p.compareAtCents)}</p>}
          </div>
          <button
            onClick={() => add(p.slug)}
            disabled={soldOut}
            aria-label={`Agregar ${p.name} al carrito`}
            className="grid size-10 place-items-center rounded-lg bg-ink text-ink-foreground transition duration-200 hover:bg-primary hover:text-primary-foreground active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40"
          >
            <ShoppingCart className="size-4" />
          </button>
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ items }: { items: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
      {items.map((p, i) => (
        <Reveal key={p.slug} delay={Math.min(i, 5) * 70} y={16} className="h-full">
          <ProductCard p={p} />
        </Reveal>
      ))}
    </div>
  );
}

export function SectionHeading({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: React.ReactNode }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-primary-deep">{eyebrow}</p>}
        <h2 className="text-3xl font-bold md:text-4xl">{title}</h2>
      </div>
      {action}
    </div>
  );
}

export function DemoNotice() {
  return <p className="mt-4 text-xs text-muted-foreground">* Catálogo de demostración: precios y disponibilidad son ejemplos y no constituyen ofertas vigentes. Confirma con la tienda.</p>;
}

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <section className="surface-ink relative overflow-hidden">
      <div className="grid-lines absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-20">
        <p className="mb-3 animate-fade-up text-xs font-bold uppercase tracking-[0.25em] text-primary">{eyebrow}</p>
        <h1 className="max-w-3xl animate-fade-up text-4xl font-bold [animation-delay:80ms] md:text-5xl">{title}</h1>
        {children && <div className="mt-4 max-w-2xl animate-fade-up text-ink-muted [animation-delay:160ms]">{children}</div>}
      </div>
    </section>
  );
}
