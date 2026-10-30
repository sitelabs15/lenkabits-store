import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, ProductGrid } from "@/components/site/ProductCard";
import { products } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/favoritos")({
  head: () => seo("Favoritos — Lenkabits Store", "Los componentes que guardaste para después.", "/favoritos"),
  component: Page,
});

function Page() {
  const { favs } = useStore();
  const items = products.filter((p) => favs.includes(p.slug));
  return (
    <>
      <PageHero eyebrow="Guardados" title="Tus favoritos" />
      <div className="mx-auto max-w-7xl px-4 pt-10">
        {items.length ? <ProductGrid items={items} /> : (
          <div className="rounded-2xl border border-dashed p-16 text-center">
            <Heart className="mx-auto size-10 text-muted-foreground" />
            <p className="mt-4 font-display text-xl font-semibold">Aún no tienes favoritos</p>
            <p className="mt-1 text-sm text-muted-foreground">Toca el corazón en cualquier producto para guardarlo aquí.</p>
            <Button asChild className="mt-6"><Link to="/productos">Ver productos</Link></Button>
          </div>
        )}
      </div>
    </>
  );
}
