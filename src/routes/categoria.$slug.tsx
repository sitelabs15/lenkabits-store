import { createFileRoute, notFound } from "@tanstack/react-router";
import { Catalog } from "@/components/site/Catalog";
import { getCategory } from "@/lib/catalog";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/categoria/$slug")({
  loader: ({ params }) => {
    const c = getCategory(params.slug);
    if (!c) throw notFound();
    return { name: c.name, slug: c.slug };
  },
  head: ({ loaderData, params }) =>
    loaderData
      ? seo(`${loaderData.name} — Lenkabits Store`, `Compra ${loaderData.name.toLowerCase()} en Puebla con asesoría y precios en MXN.`, `/categoria/${params.slug}`)
      : { meta: [{ title: "Categoría no encontrada" }, { name: "robots", content: "noindex" }] },
  component: Page,
});

function Page() {
  const c = Route.useLoaderData();
  return <Catalog title={c.name} eyebrow="Categoría" category={c.slug} />;
}
