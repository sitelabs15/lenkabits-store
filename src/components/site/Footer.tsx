import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import logo from "@/assets/lenkabits-logo.png";
import { BUSINESS, waLink } from "@/lib/catalog";
import { Reveal } from "@/components/motion/Reveal";

type L = { to: string; label: string; params?: Record<string, string> };
const cols: { title: string; links: L[] }[] = [
  { title: "Tienda", links: [
    { to: "/productos", label: "Componentes" },
    { to: "/categoria/$slug", params: { slug: "gabinetes" }, label: "Computadoras" },
    { to: "/pc-personalizadas", label: "PC personalizadas" },
    { to: "/ofertas", label: "Ofertas" },
    { to: "/resenas", label: "Reseñas" },
  ]},
  { title: "Servicios", links: [
    { to: "/servicios", label: "Ensamblado" },
    { to: "/servicios", label: "Mantenimiento" },
    { to: "/servicios", label: "Reparación" },
    { to: "/servicios", label: "Actualización de componentes" },
    { to: "/pc-personalizadas", label: "Solicitar cotización" },
  ]},
  { title: "Información", links: [
    { to: "/nosotros", label: "Nosotros" },
    { to: "/contacto", label: "Contacto" },
    { to: "/faq", label: "Preguntas frecuentes" },
    { to: "/privacidad", label: "Aviso de privacidad" },
    { to: "/terminos", label: "Términos y condiciones" },
  ]},
];

export function Footer() {
  return (
    <footer className="surface-ink mt-24">
      <Reveal y={16}>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.4fr]">
        <div>
          <img src={logo} alt="Lenkabits" className="h-10 w-auto" width={1850} height={543} loading="lazy" />
          <p className="mt-4 max-w-xs text-sm text-ink-muted">Hardware, ensamblado y servicio técnico para ayudarte a sacar más partido a tu equipo.</p>
          <div className="mt-6 flex gap-2">
            <a href={BUSINESS.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="grid size-10 place-items-center rounded-full border border-ink-border transition duration-200 hover:border-primary hover:text-primary active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><Facebook className="size-4" /></a>
            <a href={BUSINESS.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid size-10 place-items-center rounded-full border border-ink-border transition duration-200 hover:border-primary hover:text-primary active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><Instagram className="size-4" /></a>
            <a href={waLink("Hola Lenkabits")} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="grid size-10 place-items-center rounded-full border border-ink-border transition duration-200 hover:border-primary hover:text-primary active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><MessageCircle className="size-4" /></a>
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">{c.title}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-muted">
              {c.links.map((l) => (
                <li key={l.label}><Link to={l.to as never} params={l.params as never} className="transition-colors duration-200 hover:text-ink-foreground focus-visible:text-ink-foreground">{l.label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">Contacto</h3>
          <ul className="mt-4 space-y-3 text-sm text-ink-muted">
            <li className="flex gap-2"><MapPin className="mt-0.5 size-4 shrink-0 text-primary" /><a href={BUSINESS.maps} target="_blank" rel="noreferrer" className="hover:text-ink-foreground">{BUSINESS.address}</a></li>
            <li className="flex gap-2"><Phone className="size-4 text-primary" /><a href={`tel:${BUSINESS.phoneTel}`} className="hover:text-ink-foreground">{BUSINESS.phoneDisplay}</a></li>
          </ul>
        </div>
      </div>
      </Reveal>
      <div className="border-t border-ink-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-ink-muted sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Lenkabits Store · Puebla, México</p>
          <p>Precios en pesos mexicanos (MXN).</p>
        </div>
      </div>
    </footer>
  );
}
