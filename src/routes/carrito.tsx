import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingCart, Trash2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, DemoNotice } from "@/components/site/ProductCard";
import { formatMXN, getProduct, waLink } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/carrito")({
  head: () => ({ ...seo("Tu carrito — Lenkabits Store", "Revisa los productos de tu carrito y confirma tu pedido con la tienda.", "/carrito"), meta: [...seo("Tu carrito — Lenkabits Store", "Revisa tu carrito.", "/carrito").meta, { name: "robots", content: "noindex" }] }),
  component: Page,
});

function Page() {
  const { cart, setQty, remove, subtotalCents, clear } = useStore();
  const lines = cart.map((l) => ({ ...l, p: getProduct(l.slug) })).filter((l) => l.p);
  const msg = `Hola Lenkabits, quiero confirmar este pedido:\n${lines.map((l) => `• ${l.qty} x ${l.p!.name} (${formatMXN(l.p!.priceCents)})`).join("\n")}\nSubtotal: ${formatMXN(subtotalCents)}`;
  return (
    <>
      <PageHero eyebrow="Carrito" title="Tu carrito" />
      <div className="mx-auto max-w-7xl px-4 pt-10">
        {lines.length === 0 ? (
          <div className="rounded-2xl border border-dashed p-16 text-center">
            <ShoppingCart className="mx-auto size-10 text-muted-foreground" />
            <p className="mt-4 font-display text-xl font-semibold">Tu carrito está vacío</p>
            <Button asChild className="mt-6"><Link to="/productos">Explorar componentes</Link></Button>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <ul className="divide-y rounded-2xl border">
              {lines.map(({ slug, qty, p }) => (
                <li key={slug} className="flex gap-4 p-4">
                  <img src={p!.image} alt="" className="size-20 rounded-lg bg-secondary object-cover" />
                  <div className="flex flex-1 flex-col">
                    <Link to="/producto/$slug" params={{ slug }} className="font-semibold hover:underline">{p!.name}</Link>
                    <p className="text-sm text-muted-foreground">{formatMXN(p!.priceCents)} c/u</p>
                    <div className="mt-auto flex items-center gap-3 pt-2">
                      <div className="flex items-center rounded-lg border">
                        <button aria-label="Menos" className="grid size-8 place-items-center" onClick={() => setQty(slug, qty - 1)}><Minus className="size-3" /></button>
                        <span className="w-6 text-center text-sm">{qty}</span>
                        <button aria-label="Más" className="grid size-8 place-items-center" onClick={() => setQty(slug, qty + 1)}><Plus className="size-3" /></button>
                      </div>
                      <button onClick={() => remove(slug)} className="text-muted-foreground hover:text-destructive" aria-label="Eliminar"><Trash2 className="size-4" /></button>
                    </div>
                  </div>
                  <p className="font-display font-bold">{formatMXN(p!.priceCents * qty)}</p>
                </li>
              ))}
            </ul>
            <aside className="h-fit rounded-2xl border p-6">
              <div className="flex justify-between"><span>Subtotal</span><span className="font-display text-2xl font-bold">{formatMXN(subtotalCents)}</span></div>
              <p className="mt-2 text-xs text-muted-foreground">Envío y disponibilidad se confirman con la tienda. El pago en línea estará disponible próximamente.</p>
              <Button asChild size="lg" className="mt-6 w-full"><a href={waLink(msg)} target="_blank" rel="noreferrer"><MessageCircle />Confirmar por WhatsApp</a></Button>
              <Button variant="ghost" className="mt-2 w-full" onClick={clear}>Vaciar carrito</Button>
              <DemoNotice />
            </aside>
          </div>
        )}
      </div>
    </>
  );
}
