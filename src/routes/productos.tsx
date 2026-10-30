import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Catalog } from "@/components/site/Catalog";
import { seo } from "@/lib/seo";

const schema = z.object({ q: z.string().optional() });

export const Route = createFileRoute("/productos")({
  validateSearch: schema,
  head: () => seo("Catálogo de componentes de PC — Lenkabits Store", "Procesadores, tarjetas gráficas, memoria, almacenamiento, gabinetes y más, con precios en MXN.", "/productos"),
  component: Page,
});

function Page() {
  const { q } = Route.useSearch();
  return <Catalog title={q ? `Resultados para “${q}”` : "Todos los componentes"} eyebrow="Catálogo" initialQuery={q ?? ""} />;
}
