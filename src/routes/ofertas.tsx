import { createFileRoute } from "@tanstack/react-router";
import { Catalog } from "@/components/site/Catalog";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/ofertas")({
  head: () => seo("Ofertas en hardware — Lenkabits Store", "Componentes de PC con precio especial en Lenkabits Store, Puebla.", "/ofertas"),
  component: () => <Catalog title="Ofertas" eyebrow="Precios especiales" onlyDeals />,
});
