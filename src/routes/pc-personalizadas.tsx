import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Gamepad2, Monitor, Palette, Briefcase, GraduationCap, Radio, ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/ProductCard";
import { waLink } from "@/lib/catalog";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pc-personalizadas")({
  head: () => seo("Cotiza tu PC a la medida — Lenkabits Store", "Arma tu computadora gamer, de diseño u oficina con asesoría personalizada en Puebla.", "/pc-personalizadas"),
  component: Page,
});

const usos = [
  { v: "Gaming", i: Gamepad2 }, { v: "Streaming", i: Radio }, { v: "Diseño y edición", i: Palette },
  { v: "Oficina", i: Briefcase }, { v: "Estudio", i: GraduationCap }, { v: "Otro", i: Monitor },
];
const presupuestos = ["Hasta $15,000", "$15,000 – $25,000", "$25,000 – $40,000", "$40,000 – $60,000", "Más de $60,000"];
const plataformas = ["AMD", "Intel", "Sin preferencia"];
const graficas = ["NVIDIA", "AMD Radeon", "Sin preferencia"];
const extras = ["Monitor", "Teclado y mouse", "Wi-Fi", "Iluminación RGB", "Sistema operativo"];

const contactSchema = z.object({
  nombre: z.string().trim().min(2, "Escribe tu nombre").max(80),
  telefono: z.string().trim().regex(/^[0-9 +()-]{10,18}$/, "Teléfono de 10 dígitos"),
  notas: z.string().max(500).optional(),
});

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={on} className={cn("flex items-center gap-2 rounded-xl border px-4 py-3 text-left text-sm font-medium transition", on ? "border-ink bg-ink text-ink-foreground" : "hover:border-foreground")}>
      {children}{on && <Check className="ml-auto size-4 text-primary" />}
    </button>
  );
}

function Page() {
  const [step, setStep] = useState(0);
  const [uso, setUso] = useState("");
  const [presupuesto, setPresupuesto] = useState("");
  const [plataforma, setPlataforma] = useState("Sin preferencia");
  const [grafica, setGrafica] = useState("Sin preferencia");
  const [extra, setExtra] = useState<string[]>([]);
  const [form, setForm] = useState({ nombre: "", telefono: "", notas: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const steps = ["Uso", "Presupuesto", "Preferencias", "Contacto"];
  const canNext = (step === 0 && uso) || (step === 1 && presupuesto) || step === 2;

  const submit = () => {
    const r = contactSchema.safeParse(form);
    if (!r.success) {
      setErrors(Object.fromEntries(r.error.issues.map((i) => [i.path[0], i.message])));
      return;
    }
    setErrors({});
    const msg = `Hola Lenkabits, quiero cotizar una PC.\n• Uso: ${uso}\n• Presupuesto: ${presupuesto}\n• Procesador: ${plataforma}\n• Gráfica: ${grafica}\n• Extras: ${extra.join(", ") || "Ninguno"}\n• Nombre: ${r.data.nombre}\n• Teléfono: ${r.data.telefono}${r.data.notas ? `\n• Notas: ${r.data.notas}` : ""}`;
    window.open(waLink(msg), "_blank", "noopener");
    setSent(true);
  };

  return (
    <>
      <PageHero eyebrow="PC personalizadas" title="Arma la computadora que de verdad necesitas.">
        Responde 4 preguntas y te enviamos una propuesta por WhatsApp. Sin compromiso.
      </PageHero>
      <div className="mx-auto max-w-3xl px-4 pt-12">
        <ol className="mb-10 grid grid-cols-4 gap-2">
          {steps.map((s, i) => (
            <li key={s}>
              <div className={cn("h-1.5 rounded-full", i <= step ? "bg-primary" : "bg-border")} />
              <p className={cn("mt-2 text-xs font-semibold", i === step ? "text-foreground" : "text-muted-foreground")}>{i + 1}. {s}</p>
            </li>
          ))}
        </ol>

        {sent ? (
          <div className="rounded-2xl border p-10 text-center">
            <div className="mx-auto grid size-14 place-items-center rounded-full bg-primary"><Check className="size-7 text-primary-foreground" /></div>
            <h2 className="mt-6 text-2xl font-bold">¡Listo! Abrimos WhatsApp con tu solicitud.</h2>
            <p className="mt-2 text-muted-foreground">Envía el mensaje y te responderemos con una propuesta. Si no se abrió, usa el botón.</p>
            <div className="mt-6 flex justify-center gap-3">
              <Button onClick={submit}><MessageCircle />Abrir WhatsApp de nuevo</Button>
              <Button variant="outline" onClick={() => { setSent(false); setStep(0); }}>Nueva cotización</Button>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border p-6 md:p-10">
            {step === 0 && (<><h2 className="text-2xl font-bold">¿Para qué usarás tu PC?</h2><div className="mt-6 grid gap-3 sm:grid-cols-3">{usos.map(({ v, i: I }) => <Chip key={v} on={uso === v} onClick={() => setUso(v)}><I className="size-5" />{v}</Chip>)}</div></>)}
            {step === 1 && (<><h2 className="text-2xl font-bold">¿Cuál es tu presupuesto aproximado?</h2><div className="mt-6 grid gap-3 sm:grid-cols-2">{presupuestos.map((v) => <Chip key={v} on={presupuesto === v} onClick={() => setPresupuesto(v)}>{v} MXN</Chip>)}</div></>)}
            {step === 2 && (
              <div className="space-y-8">
                <div><h2 className="text-2xl font-bold">Preferencias</h2><p className="mt-1 text-sm text-muted-foreground">Opcional — si no sabes, te recomendamos.</p></div>
                <div><p className="mb-3 text-sm font-semibold">Procesador</p><div className="grid gap-3 sm:grid-cols-3">{plataformas.map((v) => <Chip key={v} on={plataforma === v} onClick={() => setPlataforma(v)}>{v}</Chip>)}</div></div>
                <div><p className="mb-3 text-sm font-semibold">Tarjeta gráfica</p><div className="grid gap-3 sm:grid-cols-3">{graficas.map((v) => <Chip key={v} on={grafica === v} onClick={() => setGrafica(v)}>{v}</Chip>)}</div></div>
                <div><p className="mb-3 text-sm font-semibold">Extras</p><div className="grid gap-3 sm:grid-cols-3">{extras.map((v) => <Chip key={v} on={extra.includes(v)} onClick={() => setExtra((e) => e.includes(v) ? e.filter((x) => x !== v) : [...e, v])}>{v}</Chip>)}</div></div>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">¿Cómo te contactamos?</h2>
                {(["nombre", "telefono"] as const).map((k) => (
                  <div key={k}>
                    <label htmlFor={k} className="text-sm font-medium">{k === "nombre" ? "Nombre" : "Teléfono / WhatsApp"}</label>
                    <input id={k} value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} inputMode={k === "telefono" ? "tel" : undefined} className="mt-1 h-11 w-full rounded-lg border px-3 outline-none focus:border-primary-hover" />
                    {errors[k] && <p className="mt-1 text-xs text-destructive">{errors[k]}</p>}
                  </div>
                ))}
                <div>
                  <label htmlFor="notas" className="text-sm font-medium">Comentarios (opcional)</label>
                  <textarea id="notas" rows={3} maxLength={500} value={form.notas} onChange={(e) => setForm({ ...form, notas: e.target.value })} className="mt-1 w-full rounded-lg border p-3 outline-none focus:border-primary-hover" placeholder="Juegos o programas que usarás, componentes que ya tienes..." />
                </div>
              </div>
            )}
            <div className="mt-10 flex justify-between">
              <Button variant="ghost" onClick={() => setStep((s) => s - 1)} disabled={step === 0}><ArrowLeft />Atrás</Button>
              {step < 3 ? (
                <Button onClick={() => setStep((s) => s + 1)} disabled={!canNext}>Continuar<ArrowRight /></Button>
              ) : (
                <Button onClick={submit}><MessageCircle />Enviar por WhatsApp</Button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
