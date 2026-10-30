import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { SlidersHorizontal, SearchX } from "lucide-react";
import { brands as allBrands, categories, products, type Product } from "@/lib/catalog";
import { ProductGrid, PageHero, DemoNotice } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Sort = "relevancia" | "precio-asc" | "precio-desc" | "nombre";

export function Catalog({ title, eyebrow, category, initialQuery = "", onlyDeals = false }: { title: string; eyebrow: string; category?: string; initialQuery?: string; onlyDeals?: boolean }) {
  const [query, setQuery] = useState(initialQuery);
  const [cats, setCats] = useState<string[]>(category ? [category] : []);
  const [brands, setBrands] = useState<string[]>([]);
  const [inStock, setInStock] = useState(false);
  const [sort, setSort] = useState<Sort>("relevancia");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => setQuery(initialQuery), [initialQuery]);
  useEffect(() => setCats(category ? [category] : []), [category]);

  const items = useMemo(() => {
    const q = query.toLowerCase().trim();
    let r: Product[] = products.filter((p) =>
      (!onlyDeals || p.compareAtCents) &&
      (!q || `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(q)) &&
      (cats.length === 0 || cats.includes(p.category)) &&
      (brands.length === 0 || brands.includes(p.brand)) &&
      (!inStock || p.availability === "disponible" || p.availability === "pocas"),
    );
    if (sort === "precio-asc") r = [...r].sort((a, b) => a.priceCents - b.priceCents);
    if (sort === "precio-desc") r = [...r].sort((a, b) => b.priceCents - a.priceCents);
    if (sort === "nombre") r = [...r].sort((a, b) => a.name.localeCompare(b.name));
    return r;
  }, [query, cats, brands, inStock, sort, onlyDeals]);

  const toggle = (list: string[], set: (v: string[]) => void, v: string) => set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  const reset = () => { setQuery(""); setCats(category ? [category] : []); setBrands([]); setInStock(false); };

  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 pt-10 lg:grid-cols-[240px_1fr]">
        <aside className={cn("space-y-8 lg:block", showFilters ? "block" : "hidden")}>
          <div>
            <label htmlFor="filter-q" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Buscar</label>
            <input id="filter-q" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Nombre o marca" className="mt-2 h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary-hover" />
          </div>
          {!category && (
            <fieldset>
              <legend className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Categoría</legend>
              <div className="mt-3 space-y-2">
                {categories.map((c) => (
                  <label key={c.slug} className="flex cursor-pointer items-center gap-2 text-sm">
                    <input type="checkbox" className="size-4 accent-[var(--primary-deep)]" checked={cats.includes(c.slug)} onChange={() => toggle(cats, setCats, c.slug)} />{c.name}
                  </label>
                ))}
              </div>
            </fieldset>
          )}
          <fieldset>
            <legend className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Marca</legend>
            <div className="mt-3 space-y-2">
              {allBrands.filter((b) => products.some((p) => p.brand === b)).map((b) => (
                <label key={b} className="flex cursor-pointer items-center gap-2 text-sm">
                  <input type="checkbox" className="size-4 accent-[var(--primary-deep)]" checked={brands.includes(b)} onChange={() => toggle(brands, setBrands, b)} />{b}
                </label>
              ))}
            </div>
          </fieldset>
          <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
            <input type="checkbox" className="size-4 accent-[var(--primary-deep)]" checked={inStock} onChange={(e) => setInStock(e.target.checked)} />Solo disponibles
          </label>
          <Button variant="outline" className="w-full" onClick={reset}>Limpiar filtros</Button>
        </aside>
        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">{items.length} {items.length === 1 ? "producto" : "productos"}</p>
            <div className="flex gap-2">
              <Button variant="outline" className="lg:hidden" onClick={() => setShowFilters((v) => !v)}><SlidersHorizontal />Filtros</Button>
              <label className="sr-only" htmlFor="sort">Ordenar</label>
              <select id="sort" value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="h-10 rounded-lg border bg-background px-3 text-sm">
                <option value="relevancia">Relevancia</option>
                <option value="precio-asc">Precio: menor a mayor</option>
                <option value="precio-desc">Precio: mayor a menor</option>
                <option value="nombre">Nombre</option>
              </select>
            </div>
          </div>
          {items.length ? (
            <ProductGrid items={items} />
          ) : (
            <div className="rounded-2xl border border-dashed p-12 text-center">
              <SearchX className="mx-auto size-10 text-muted-foreground" />
              <p className="mt-4 font-display text-xl font-semibold">No encontramos productos</p>
              <p className="mt-1 text-sm text-muted-foreground">Prueba con otros filtros o pregúntanos: quizá lo conseguimos sobre pedido.</p>
              <div className="mt-6 flex justify-center gap-3"><Button onClick={reset}>Limpiar filtros</Button><Button asChild variant="outline"><Link to="/contacto">Preguntar</Link></Button></div>
            </div>
          )}
          <DemoNotice />
        </div>
      </div>
    </>
  );
}
