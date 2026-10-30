import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Cpu, Headset, MessageCircle, ShieldCheck, Sparkles, Wrench, Gauge, HardDriveUpload, Stethoscope, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductGrid, SectionHeading, DemoNotice } from "@/components/site/ProductCard";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollParallax } from "@/components/motion/Parallax";
import { usePointerParallax } from "@/hooks/use-pointer-parallax";
import { brands, categories, products, BUSINESS, waLink, getProduct, formatMXN } from "@/lib/catalog";
import { seo } from "@/lib/seo";
import pcPhoto from "@/assets/tienda-image-3.png";
import shelfPhoto from "@/assets/tienda-image.png";
import ryzenPhoto from "@/assets/tienda-image-2.png";

export const Route = createFileRoute("/")({
  head: () => seo("Lenkabits Store — Componentes de PC y ensamblado en Puebla", "Encuentra componentes, arma tu PC a la medida y recibe asesoría y servicio técnico en Plaza de la Tecnología, Puebla.", "/"),
  component: Home,
});

const trust = [
  { icon: Headset, t: "Asesoría personalizada", d: "Te ayudamos a elegir según tu uso y presupuesto." },
  { icon: Cpu, t: "Compatibilidad revisada", d: "Verificamos que tus componentes funcionen juntos." },
  { icon: Wrench, t: "Ensamblado profesional", d: "Armado limpio, ordenado y probado." },
  { icon: ShieldCheck, t: "Garantía según fabricante", d: "Te orientamos en cada proceso de garantía." },
];

const services = [
  { icon: Wrench, t: "Ensamblado de PC", d: "Montaje, gestión de cables, instalación de sistema y pruebas de estabilidad." },
  { icon: Sparkles, t: "Mantenimiento", d: "Limpieza interna, cambio de pasta térmica y revisión de temperaturas." },
  { icon: Stethoscope, t: "Diagnóstico y reparación", d: "Detectamos fallas de hardware y te explicamos las opciones." },
  { icon: HardDriveUpload, t: "Actualización de hardware", d: "Más RAM, SSD o una nueva gráfica para darle nueva vida a tu equipo." },
];

function Home() {
  const featured = products.filter((p) => p.tags.includes("destacado")).slice(0, 8);
  const nuevos = products.filter((p) => p.tags.includes("nuevo")).slice(0, 4);
  const vendidos = products.filter((p) => p.tags.includes("vendido")).slice(0, 4);
  const heroMediaRef = usePointerParallax<HTMLDivElement>(10);
  return (
    <>
      {/* HERO */}
      <section className="surface-ink relative overflow-hidden">
        <div className="grid-lines absolute inset-0 opacity-30" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 md:py-20 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="mb-5 inline-flex animate-fade-up items-center gap-2 rounded-full border border-ink-border px-3 py-1 text-xs font-bold tracking-[0.2em] text-primary [animation-delay:60ms]">
              HARDWARE · GAMING · ENSAMBLADO
            </p>
            <h1 className="text-4xl font-bold leading-[1.02] sm:text-5xl lg:text-6xl xl:text-7xl">
              <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
                <span className="block animate-line-up [animation-delay:140ms]">Tu próxima PC empieza con los</span>
              </span>
              <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
                <span className="block animate-line-up text-primary [animation-delay:260ms]">componentes correctos.</span>
              </span>
            </h1>
            <p className="mt-6 max-w-xl animate-fade-up text-lg text-ink-muted [animation-delay:380ms]">
              Encuentra componentes para tu setup, arma una computadora a tu medida o recibe asesoría especializada para elegir el equipo ideal para ti.
            </p>
            <div className="mt-8 flex animate-fade-up flex-wrap gap-3 [animation-delay:470ms]">
              <Button asChild size="lg"><Link to="/pc-personalizadas">Cotizar mi PC <ArrowRight /></Link></Button>
              <Button asChild size="lg" variant="outline-ink"><Link to="/productos">Explorar componentes</Link></Button>
            </div>
            <p className="mt-6 animate-fade-up text-sm text-ink-muted [animation-delay:560ms]">Asesoría personalizada · Ensamblado · Servicio técnico</p>
          </div>
          <div className="relative animate-media-in [animation-delay:250ms]">
            <div className="absolute -inset-6 rounded-[2rem] bg-primary/20 blur-3xl" />
            <div ref={heroMediaRef} className="relative grid grid-cols-5 gap-3 transition-transform duration-300 ease-out">
              <img src={pcPhoto} alt="Interior de PC gamer con iluminación verde armada en Lenkabits" width={405} height={599} className="col-span-3 row-span-2 h-full w-full rounded-2xl border border-ink-border object-cover" />
              <img src={shelfPhoto} alt="Tarjetas gráficas GeForce en el aparador de Lenkabits" width={808} height={542} className="col-span-2 aspect-square w-full rounded-2xl border border-ink-border object-cover" />
              <img src={ryzenPhoto} alt="Procesadores AMD Ryzen en la tienda" width={805} height={530} className="col-span-2 aspect-square w-full rounded-2xl border border-ink-border object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* CONFIANZA */}
      <section className="border-b">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 lg:grid-cols-4">
          {trust.map(({ icon: I, t, d }, i) => (
            <Reveal key={t} delay={i * 90} y={12} className="flex gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground"><I className="size-5" /></span>
              <div><p className="text-sm font-semibold">{t}</p><p className="text-xs text-muted-foreground">{d}</p></div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="mx-auto max-w-7xl px-4 pt-16">
        <Reveal>
          <SectionHeading eyebrow="Explora" title="Categorías" action={<Link to="/productos" className="text-sm font-semibold hover:underline">Ver todo →</Link>} />
        </Reveal>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={i * 60} y={14}>
              <Link to="/categoria/$slug" params={{ slug: c.slug }} className="group flex h-full flex-col rounded-xl border bg-secondary p-3 text-center transition duration-300 hover:-translate-y-1 hover:border-primary-hover hover:bg-background hover:shadow-card">
                <img src={c.image} alt="" loading="lazy" width={816} height={816} className="mx-auto aspect-square w-full rounded-lg object-cover mix-blend-multiply transition duration-500 group-hover:scale-105" />
                <p className="mt-2 text-sm font-semibold">{c.name}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* DESTACADOS */}
      <section className="mx-auto max-w-7xl px-4 pt-20">
        <Reveal>
          <SectionHeading eyebrow="Selección Lenkabits" title="Productos destacados" action={<Link to="/productos" className="text-sm font-semibold hover:underline">Ver catálogo →</Link>} />
        </Reveal>
        <ProductGrid items={featured} />
        <DemoNotice />
      </section>

      {/* BANNER PC PERSONALIZADAS */}
      <section className="mx-auto max-w-7xl px-4 pt-20">
        <Reveal y={26}>
          <div className="surface-ink relative grid overflow-hidden rounded-3xl md:grid-cols-2">
            <Reveal x={-18} y={0} delay={80} className="relative z-10 p-8 md:p-14">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">PC a tu medida</p>
              <h2 className="text-3xl font-bold md:text-5xl">Dinos para qué la quieres. Nosotros la armamos.</h2>
              <p className="mt-4 text-ink-muted">Gaming, streaming, diseño, oficina o estudio: te proponemos una configuración equilibrada según tu presupuesto.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg"><Link to="/pc-personalizadas">Cotizar mi PC <ArrowRight /></Link></Button>
                <Button asChild size="lg" variant="outline-ink"><a href={waLink("Hola Lenkabits, quiero cotizar una PC.")} target="_blank" rel="noreferrer"><MessageCircle />WhatsApp</a></Button>
              </div>
            </Reveal>
            <div className="relative overflow-hidden">
              <ScrollParallax speed={0.045} className="h-full">
                <img src={pcPhoto} alt="" loading="lazy" className="h-full w-full scale-110 object-cover" />
              </ScrollParallax>
            </div>
          </div>
        </Reveal>
      </section>

      {/* SERVICIOS */}
      <section className="mx-auto max-w-7xl px-4 pt-20">
        <Reveal>
          <SectionHeading eyebrow="Servicio técnico" title="Cuidamos tu equipo" action={<Link to="/servicios" className="text-sm font-semibold hover:underline">Ver servicios →</Link>} />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: I, t, d }, i) => (
            <Reveal key={t} delay={i * 80} y={16}>
              <Link to="/servicios" className="group flex h-full flex-col rounded-2xl border p-6 transition duration-300 hover:-translate-y-1 hover:border-ink hover:bg-ink hover:text-ink-foreground hover:shadow-card">
                <I className="size-8 text-primary-deep transition-colors duration-300 group-hover:text-primary" />
                <h3 className="mt-6 text-lg font-semibold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground transition-colors duration-300 group-hover:text-ink-muted">{d}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* NOVEDADES / MÁS VENDIDOS */}
      <section className="mx-auto grid max-w-7xl gap-12 px-4 pt-20 lg:grid-cols-2">
        <div>
          <Reveal><SectionHeading eyebrow="Recién llegados" title="Novedades" /></Reveal>
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            {nuevos.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80} y={14} className="h-full">
                <MiniCard slug={p.slug} />
              </Reveal>
            ))}
          </div>
        </div>
        <div>
          <Reveal><SectionHeading eyebrow="Favoritos de la comunidad" title="Más vendidos" /></Reveal>
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            {vendidos.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80} y={14} className="h-full">
                <MiniCard slug={p.slug} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MARCAS */}
      <section className="mx-auto max-w-7xl px-4 pt-20">
        <Reveal>
          <p className="mb-6 text-center text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">Trabajamos con marcas como</p>
        </Reveal>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-y py-8">
          {brands.map((b, i) => (
            <Reveal key={b} delay={i * 40} y={10}>
              <Link to="/productos" search={{ q: b }} className="font-display text-xl font-bold text-muted-foreground transition-colors duration-200 hover:text-foreground">{b}</Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* RESEÑAS */}
      <section className="mx-auto max-w-7xl px-4 pt-20">
        <Reveal y={20}>
          <div className="grid items-center gap-8 rounded-3xl border bg-secondary p-8 md:grid-cols-[1.5fr_1fr] md:p-12">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-primary-deep">Opiniones reales</p>
              <h2 className="text-3xl font-bold">Lee lo que dicen nuestros clientes</h2>
              <p className="mt-3 text-muted-foreground">Las reseñas de quienes ya armaron su equipo con nosotros están en nuestras redes oficiales.</p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Button asChild variant="ink" size="lg"><a href={BUSINESS.facebook} target="_blank" rel="noreferrer"><Facebook />Ver en Facebook</a></Button>
              <Button asChild variant="outline" size="lg"><Link to="/resenas">Más info</Link></Button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pt-20">
        <Reveal y={22}>
          <div className="relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground md:flex-row md:items-center md:p-12">
            <div aria-hidden className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-white/15 blur-3xl" />
            <div className="relative">
              <Gauge className="mb-3 size-8" />
              <h2 className="text-3xl font-bold">¿No sabes por dónde empezar?</h2>
              <p className="mt-2 max-w-lg">Visítanos en Plaza de la Tecnología o escríbenos. Te ayudamos a encontrar la mejor opción.</p>
            </div>
            <div className="relative flex flex-wrap gap-3">
              <Button asChild variant="ink" size="lg"><Link to="/contacto">Cómo llegar</Link></Button>
              <Button asChild variant="ink" size="lg"><a href={waLink("Hola Lenkabits, necesito asesoría.")} target="_blank" rel="noreferrer"><MessageCircle />WhatsApp</a></Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function MiniCard({ slug }: { slug: string }) {
  const p = getProduct(slug)!;
  return (
    <Link to="/producto/$slug" params={{ slug }} className="group flex h-full flex-col rounded-xl border p-3 transition duration-300 hover:-translate-y-1 hover:border-primary-hover hover:shadow-card">
      <div className="overflow-hidden rounded-lg bg-secondary">
        <img src={p.image} alt={p.name} loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <p className="mt-3 line-clamp-1 text-sm font-semibold group-hover:underline">{p.name}</p>
      <p className="font-display font-bold">{formatMXN(p.priceCents)}</p>
    </Link>
  );
}
