import { createFileRoute, Link } from "@tanstack/react-router";
import { HardDriveUpload, MessageCircle, Sparkles, Stethoscope, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/ProductCard";
import { waLink } from "@/lib/catalog";
import { seo } from "@/lib/seo";
import pcPhoto from "@/assets/tienda-image-3.png";

export const Route = createFileRoute("/servicios")({
  head: () => seo("Servicio técnico de PC en Puebla — Lenkabits Store", "Ensamblado, mantenimiento, diagnóstico, reparación y actualización de computadoras en Puebla.", "/servicios"),
  component: Page,
});

const list = [
  { icon: Wrench, t: "Ensamblado de PC", d: "Montaje de componentes, gestión de cables, instalación de sistema operativo y pruebas de estabilidad y temperaturas.", items: ["Revisión de compatibilidad", "Cableado ordenado", "Pruebas de estrés"] },
  { icon: Sparkles, t: "Mantenimiento", d: "Limpieza interna, cambio de pasta térmica y revisión general para que tu equipo trabaje fresco y silencioso.", items: ["Limpieza de polvo", "Pasta térmica", "Revisión de ventiladores"] },
  { icon: Stethoscope, t: "Diagnóstico y reparación", d: "Detectamos la causa de fallas, reinicios o pantallas azules y te explicamos las opciones antes de reparar.", items: ["Diagnóstico de hardware", "Presupuesto antes de reparar", "Reemplazo de piezas"] },
  { icon: HardDriveUpload, t: "Actualización de hardware", d: "Dale nueva vida a tu equipo con más RAM, un SSD rápido o una nueva tarjeta gráfica.", items: ["Migración a SSD", "Ampliación de RAM", "Cambio de gráfica o fuente"] },
];

function Page() {
  return (
    <>
      <PageHero eyebrow="Servicio técnico" title="Tu equipo en manos de quienes viven el hardware.">
        Trae tu computadora a Plaza de la Tecnología o escríbenos para agendar. El costo depende del diagnóstico y te lo confirmamos antes de empezar.
      </PageHero>
      <div className="mx-auto grid max-w-7xl gap-5 px-4 pt-12 md:grid-cols-2">
        {list.map(({ icon: I, t, d, items }) => (
          <article key={t} className="rounded-2xl border p-8">
            <I className="size-9 text-primary-deep" />
            <h2 className="mt-5 text-2xl font-bold">{t}</h2>
            <p className="mt-2 text-muted-foreground">{d}</p>
            <ul className="mt-5 space-y-1.5 text-sm">{items.map((i) => <li key={i} className="flex gap-2"><span className="text-primary-deep">▸</span>{i}</li>)}</ul>
            <Button asChild variant="ink" className="mt-6"><a href={waLink(`Hola Lenkabits, me interesa el servicio de ${t.toLowerCase()}.`)} target="_blank" rel="noreferrer"><MessageCircle />Solicitar servicio</a></Button>
          </article>
        ))}
      </div>
      <section className="mx-auto max-w-7xl px-4 pt-16">
        <div className="surface-ink grid overflow-hidden rounded-3xl md:grid-cols-2">
          <img src={pcPhoto} alt="Equipo armado por Lenkabits" loading="lazy" className="h-64 w-full object-cover md:h-full" />
          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-bold">¿Quieres una PC nueva en lugar de reparar?</h2>
            <p className="mt-3 text-ink-muted">Te armamos una configuración a tu medida con piezas nuevas.</p>
            <Button asChild size="lg" className="mt-6"><Link to="/pc-personalizadas">Cotizar mi PC</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}
