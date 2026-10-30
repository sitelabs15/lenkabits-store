import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, MessageCircle, Minus, Plus, ShieldCheck, ShoppingCart, Wrench } from "lucide-react";
import { useState } from "react";
import { availabilityLabel, formatMXN, getCategory, getProduct, products, waLink } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ProductGrid, SectionHeading, DemoNotice } from "@/components/site/ProductCard";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/producto/$slug")({
  loader: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p) throw notFound();
    return { slug: p.slug, name: p.name, summary: p.summary };
  },
  head: ({ loaderData, params }) =>
    loaderData
      ? seo(`${loaderData.name} — Lenkabits Store`, loaderData.summary, `/producto/${params.slug}`)
      : { meta: [{ title: "Producto no disponible" }, { name: "robots", content: "noindex" }] },
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Producto no encontrado</h1>
      <Button asChild className="mt-6"><Link to="/productos">Ver catálogo</Link></Button>
    </div>
  ),
  component: Page,
});

function Page() {
  const { slug } = Route.useLoaderData();
  const p = getProduct(slug)!;
  const cat = getCategory(p.category);
  const [qty, setQty] = useState(1);
  const { add, toggleFav, isFav } = useStore();
  const related = products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 4);
  return (
    <div className="mx-auto max-w-7xl px-4 pt-8">
      <nav aria-label="Ruta" className="mb-6 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Inicio</Link> / <Link to="/productos" className="hover:text-foreground">Productos</Link>
        {cat && <> / <Link to="/categoria/$slug" params={{ slug: cat.slug }} className="hover:text-foreground">{cat.name}</Link></>}
      </nav>
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border bg-secondary">
          <img src={p.image} alt={p.name} width={816} height={816} className="aspect-square w-full object-cover" />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{p.brand}</p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">{p.name}</h1>
          <p className="mt-4 text-muted-foreground">{p.summary}</p>
          <div className="mt-6 flex items-end gap-3">
            <p className="font-display text-4xl font-bold">{formatMXN(p.priceCents)}</p>
            {p.compareAtCents && <p className="pb-1 text-muted-foreground line-through">{formatMXN(p.compareAtCents)}</p>}
          </div>
          <p className={cn("mt-2 text-sm font-medium", p.availability === "disponible" ? "text-primary-deep" : "text-muted-foreground")}>● {availabilityLabel[p.availability]}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex h-12 items-center rounded-lg border">
              <button aria-label="Menos" className="grid size-12 place-items-center" onClick={() => setQty((q) => Math.max(1, q - 1))}><Minus className="size-4" /></button>
              <span className="w-8 text-center font-semibold" aria-live="polite">{qty}</span>
              <button aria-label="Más" className="grid size-12 place-items-center" onClick={() => setQty((q) => Math.min(10, q + 1))}><Plus className="size-4" /></button>
            </div>
            <Button size="lg" onClick={() => add(p.slug, qty)} disabled={p.availability === "agotado"}><ShoppingCart />Agregar al carrito</Button>
            <Button size="lg" variant="outline" onClick={() => toggleFav(p.slug)} aria-pressed={isFav(p.slug)}>
              <Heart className={cn(isFav(p.slug) && "fill-primary-deep text-primary-deep")} />{isFav(p.slug) ? "Guardado" : "Favorito"}
            </Button>
          </div>
          <Button asChild variant="ink" size="lg" className="mt-3 w-full sm:w-auto">
            <a href={waLink(`Hola Lenkabits, me interesa: ${p.name}. ¿Está disponible?`)} target="_blank" rel="noreferrer"><MessageCircle />Consultar por WhatsApp</a>
          </Button>
          <div className="mt-8 grid gap-3 rounded-xl bg-secondary p-4 text-sm sm:grid-cols-2">
            <p className="flex gap-2"><ShieldCheck className="size-5 text-primary-deep" />Garantía según fabricante</p>
            <p className="flex gap-2"><Wrench className="size-5 text-primary-deep" />Te ayudamos con la compatibilidad</p>
          </div>
          <h2 className="mt-10 text-xl font-bold">Especificaciones</h2>
          <dl className="mt-3 divide-y rounded-xl border">
            {Object.entries(p.specs).map(([k, v]) => (
              <div key={k} className="grid grid-cols-2 px-4 py-3 text-sm"><dt className="text-muted-foreground">{k}</dt><dd className="font-medium">{v}</dd></div>
            ))}
          </dl>
          <DemoNotice />
        </div>
      </div>
      {related.length > 0 && (
        <section className="pt-20">
          <SectionHeading eyebrow="También te puede interesar" title="Productos relacionados" />
          <ProductGrid items={related} />
        </section>
      )}
    </div>
  );
}
