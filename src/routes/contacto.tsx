import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Facebook, Instagram, MapPin, MessageCircle, Phone, Check } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/ProductCard";
import { BUSINESS, waLink } from "@/lib/catalog";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contacto")({
  head: () => seo("Contacto y ubicación — Lenkabits Store Puebla", "Visítanos en Plaza de la Tecnología, Centro Histórico de Puebla, o escríbenos por WhatsApp.", "/contacto"),
  component: Page,
});

const schema = z.object({
  nombre: z.string().trim().min(2, "Escribe tu nombre").max(80),
  contacto: z.string().trim().min(6, "Escribe un teléfono o correo").max(120),
  motivo: z.string().min(1),
  mensaje: z.string().trim().min(5, "Cuéntanos un poco más").max(1000),
});

function Page() {
  const [f, setF] = useState({ nombre: "", contacto: "", motivo: "Cotización", mensaje: "" });
  const [err, setErr] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(f);
    if (!r.success) return setErr(Object.fromEntries(r.error.issues.map((i) => [i.path[0], i.message])));
    setErr({});
    window.open(waLink(`Hola Lenkabits.\n• Nombre: ${r.data.nombre}\n• Contacto: ${r.data.contacto}\n• Motivo: ${r.data.motivo}\n• Mensaje: ${r.data.mensaje}`), "_blank", "noopener");
    setSent(true);
  };
  const field = "mt-1 h-11 w-full rounded-lg border px-3 outline-none focus:border-primary-hover";
  return (
    <>
      <PageHero eyebrow="Contacto" title="Estamos para ayudarte con tu próximo proyecto." />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pt-12 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-2xl border p-6">
            <p className="flex gap-3"><MapPin className="mt-0.5 size-5 shrink-0 text-primary-deep" /><span><strong className="block">Lenkabits Store</strong>{BUSINESS.address}</span></p>
            <p className="mt-2 pl-8 text-sm text-muted-foreground">Dentro de Plaza de la Tecnología, local 508.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild><a href={waLink("Hola Lenkabits")} target="_blank" rel="noreferrer"><MessageCircle />WhatsApp</a></Button>
              <Button asChild variant="ink"><a href={`tel:${BUSINESS.phoneTel}`}><Phone />{BUSINESS.phoneDisplay}</a></Button>
              <Button asChild variant="outline"><a href={BUSINESS.facebook} target="_blank" rel="noreferrer"><Facebook />Facebook</a></Button>
              <Button asChild variant="outline"><a href={BUSINESS.instagram} target="_blank" rel="noreferrer"><Instagram />Instagram</a></Button>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border">
            <iframe title="Mapa de Plaza de la Tecnología, Puebla" className="h-80 w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${encodeURIComponent("Plaza de la Tecnología, Av. 10 Poniente 104, Centro Histórico, Puebla")}&output=embed`} />
            <a href={BUSINESS.maps} target="_blank" rel="noreferrer" className="block border-t p-3 text-center text-sm font-semibold hover:bg-secondary">Abrir en Google Maps →</a>
          </div>
        </div>
        <div className="rounded-2xl border p-6 md:p-8">
          {sent ? (
            <div className="py-10 text-center">
              <div className="mx-auto grid size-14 place-items-center rounded-full bg-primary"><Check className="size-7 text-primary-foreground" /></div>
              <h2 className="mt-6 text-2xl font-bold">Abrimos WhatsApp con tu mensaje</h2>
              <p className="mt-2 text-muted-foreground">Envíalo desde WhatsApp y te responderemos lo antes posible.</p>
              <Button variant="outline" className="mt-6" onClick={() => setSent(false)}>Escribir otro mensaje</Button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-4">
              <h2 className="text-2xl font-bold">Envíanos un mensaje</h2>
              <div><label htmlFor="nombre" className="text-sm font-medium">Nombre</label><input id="nombre" className={field} value={f.nombre} onChange={(e) => setF({ ...f, nombre: e.target.value })} />{err.nombre && <p className="mt-1 text-xs text-destructive">{err.nombre}</p>}</div>
              <div><label htmlFor="contacto" className="text-sm font-medium">Teléfono o correo</label><input id="contacto" className={field} value={f.contacto} onChange={(e) => setF({ ...f, contacto: e.target.value })} />{err.contacto && <p className="mt-1 text-xs text-destructive">{err.contacto}</p>}</div>
              <div><label htmlFor="motivo" className="text-sm font-medium">Motivo</label>
                <select id="motivo" className={field + " bg-background"} value={f.motivo} onChange={(e) => setF({ ...f, motivo: e.target.value })}>
                  {["Cotización", "Disponibilidad de producto", "Servicio técnico", "Garantía", "Otro"].map((m) => <option key={m}>{m}</option>)}
                </select></div>
              <div><label htmlFor="mensaje" className="text-sm font-medium">Mensaje</label><textarea id="mensaje" rows={5} className="mt-1 w-full rounded-lg border p-3 outline-none focus:border-primary-hover" value={f.mensaje} onChange={(e) => setF({ ...f, mensaje: e.target.value })} />{err.mensaje && <p className="mt-1 text-xs text-destructive">{err.mensaje}</p>}</div>
              <Button type="submit" size="lg" className="w-full"><MessageCircle />Enviar por WhatsApp</Button>
              <p className="text-xs text-muted-foreground">Tu mensaje se envía directamente al WhatsApp de la tienda.</p>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
