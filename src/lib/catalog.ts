import gpu from "@/assets/p-gpu.jpg";
import cpu from "@/assets/p-cpu.jpg";
import ram from "@/assets/p-ram.jpg";
import ssd from "@/assets/p-ssd.jpg";
import pcCase from "@/assets/p-case.jpg";
import monitor from "@/assets/p-monitor.jpg";
import cooling from "@/assets/p-cooling.jpg";

/**
 * CATÁLOGO DE DEMOSTRACIÓN.
 * Precios, existencias y descuentos son ejemplos de diseño — no son datos comerciales reales.
 * Sustituir por el catálogo real (base de datos) antes de vender.
 * Precios en centavos (enteros) para evitar errores de coma flotante.
 */
export const IS_DEMO_CATALOG = true;

export type Availability = "disponible" | "pocas" | "pedido" | "agotado";

export type Category = { slug: string; name: string; short: string; image: string };

export type Product = {
  slug: string;
  name: string;
  brand: string;
  category: string;
  priceCents: number;
  compareAtCents?: number;
  availability: Availability;
  image: string;
  tags: ("destacado" | "nuevo" | "vendido")[];
  summary: string;
  specs: Record<string, string>;
};

export const categories: Category[] = [
  { slug: "procesadores", name: "Procesadores", short: "CPU", image: cpu },
  { slug: "tarjetas-graficas", name: "Tarjetas gráficas", short: "GPU", image: gpu },
  { slug: "memoria-ram", name: "Memoria RAM", short: "RAM", image: ram },
  { slug: "almacenamiento", name: "Almacenamiento", short: "SSD", image: ssd },
  { slug: "gabinetes", name: "Gabinetes", short: "Case", image: pcCase },
  { slug: "refrigeracion", name: "Refrigeración y fuentes", short: "Cooling", image: cooling },
  { slug: "monitores", name: "Monitores", short: "Display", image: monitor },
];

export const brands = ["AMD", "Intel", "NVIDIA", "ASUS", "MSI", "Gigabyte", "Corsair", "Kingston", "Western Digital", "Cooler Master"];

export const products: Product[] = [
  { slug: "amd-ryzen-7-7800x3d", name: "AMD Ryzen 7 7800X3D", brand: "AMD", category: "procesadores", priceCents: 899900, compareAtCents: 999900, availability: "disponible", image: cpu, tags: ["destacado", "vendido"], summary: "8 núcleos, 16 hilos y 3D V-Cache para gaming de alto rendimiento.", specs: { Socket: "AM5", Núcleos: "8", Hilos: "16", "Frecuencia máx.": "5.0 GHz", TDP: "120 W" } },
  { slug: "amd-ryzen-5-7600", name: "AMD Ryzen 5 7600", brand: "AMD", category: "procesadores", priceCents: 429900, availability: "disponible", image: cpu, tags: ["vendido"], summary: "Excelente relación precio-rendimiento para plataformas AM5.", specs: { Socket: "AM5", Núcleos: "6", Hilos: "12", "Frecuencia máx.": "5.1 GHz", TDP: "65 W" } },
  { slug: "intel-core-i7-14700k", name: "Intel Core i7-14700K", brand: "Intel", category: "procesadores", priceCents: 849900, availability: "pocas", image: cpu, tags: ["nuevo"], summary: "20 núcleos híbridos para gaming y creación de contenido.", specs: { Socket: "LGA1700", Núcleos: "20", Hilos: "28", "Frecuencia máx.": "5.6 GHz", TDP: "125 W" } },
  { slug: "geforce-rtx-4070-super", name: "NVIDIA GeForce RTX 4070 Super 12GB", brand: "NVIDIA", category: "tarjetas-graficas", priceCents: 1299900, compareAtCents: 1449900, availability: "disponible", image: gpu, tags: ["destacado", "vendido"], summary: "Ray tracing y DLSS 3 para jugar en 1440p con fluidez.", specs: { Memoria: "12 GB GDDR6X", Interfaz: "PCIe 4.0 x16", "Fuente recomendada": "650 W", Salidas: "3x DP, 1x HDMI" } },
  { slug: "radeon-rx-7800-xt", name: "AMD Radeon RX 7800 XT 16GB", brand: "AMD", category: "tarjetas-graficas", priceCents: 1099900, availability: "pedido", image: gpu, tags: ["nuevo"], summary: "16 GB de VRAM para 1440p con altos detalles.", specs: { Memoria: "16 GB GDDR6", Interfaz: "PCIe 4.0 x16", "Fuente recomendada": "700 W", Salidas: "2x DP, 1x HDMI" } },
  { slug: "geforce-rtx-4060", name: "NVIDIA GeForce RTX 4060 8GB", brand: "NVIDIA", category: "tarjetas-graficas", priceCents: 649900, availability: "disponible", image: gpu, tags: ["vendido"], summary: "Ideal para 1080p con bajo consumo energético.", specs: { Memoria: "8 GB GDDR6", Interfaz: "PCIe 4.0 x8", "Fuente recomendada": "550 W" } },
  { slug: "kit-ddr5-32gb-6000", name: "Kit DDR5 32GB (2x16) 6000 MHz RGB", brand: "Corsair", category: "memoria-ram", priceCents: 239900, compareAtCents: 279900, availability: "disponible", image: ram, tags: ["destacado"], summary: "Doble canal DDR5 con iluminación RGB.", specs: { Capacidad: "32 GB (2x16)", Tipo: "DDR5", Velocidad: "6000 MHz", Latencia: "CL30" } },
  { slug: "kit-ddr4-16gb-3200", name: "Kit DDR4 16GB (2x8) 3200 MHz", brand: "Kingston", category: "memoria-ram", priceCents: 89900, availability: "disponible", image: ram, tags: [], summary: "Actualización confiable para equipos DDR4.", specs: { Capacidad: "16 GB (2x8)", Tipo: "DDR4", Velocidad: "3200 MHz" } },
  { slug: "ssd-nvme-1tb-gen4", name: "SSD NVMe 1TB Gen4", brand: "Western Digital", category: "almacenamiento", priceCents: 149900, availability: "disponible", image: ssd, tags: ["destacado", "vendido"], summary: "Hasta 7,000 MB/s de lectura para cargas instantáneas.", specs: { Capacidad: "1 TB", Interfaz: "PCIe 4.0 NVMe", Formato: "M.2 2280", Lectura: "7,000 MB/s" } },
  { slug: "ssd-nvme-2tb-gen4", name: "SSD NVMe 2TB Gen4 con disipador", brand: "Kingston", category: "almacenamiento", priceCents: 279900, availability: "pocas", image: ssd, tags: ["nuevo"], summary: "Gran capacidad con disipador incluido.", specs: { Capacidad: "2 TB", Interfaz: "PCIe 4.0 NVMe", Formato: "M.2 2280" } },
  { slug: "gabinete-mid-tower-rgb", name: "Gabinete Mid Tower cristal templado ARGB", brand: "Cooler Master", category: "gabinetes", priceCents: 189900, availability: "disponible", image: pcCase, tags: ["destacado", "nuevo"], summary: "Flujo de aire frontal y 4 ventiladores ARGB incluidos.", specs: { Formato: "ATX / mATX", Ventiladores: "4x 120 mm ARGB", Panel: "Cristal templado" } },
  { slug: "aio-360-argb", name: "Enfriamiento líquido AIO 360 mm", brand: "Corsair", category: "refrigeracion", priceCents: 249900, availability: "disponible", image: cooling, tags: ["nuevo"], summary: "Radiador de 360 mm para procesadores de alto rendimiento.", specs: { Radiador: "360 mm", Compatibilidad: "AM5 / AM4 / LGA1700" } },
  { slug: "fuente-850w-gold", name: "Fuente 850W 80+ Gold modular", brand: "MSI", category: "refrigeracion", priceCents: 219900, availability: "disponible", image: cooling, tags: ["vendido"], summary: "Energía estable y cableado modular.", specs: { Potencia: "850 W", Certificación: "80 Plus Gold", Modular: "Sí" } },
  { slug: "monitor-27-165hz", name: 'Monitor gaming 27" QHD 165 Hz', brand: "ASUS", category: "monitores", priceCents: 549900, compareAtCents: 599900, availability: "disponible", image: monitor, tags: ["destacado"], summary: "Panel IPS QHD con 1 ms de respuesta.", specs: { Tamaño: '27"', Resolución: "2560x1440", Frecuencia: "165 Hz", Panel: "IPS" } },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

export const availabilityLabel: Record<Availability, string> = {
  disponible: "Disponible",
  pocas: "Últimas piezas",
  pedido: "Sobre pedido",
  agotado: "Agotado",
};

export const formatMXN = (cents: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(Math.round(cents / 100));

export const BUSINESS = {
  name: "Lenkabits Store",
  address: "Plaza de la Tecnología, Av. 10 Poniente 104, Local 508, Centro Histórico, Puebla, Pue., 72000",
  phoneDisplay: "222 355 3245",
  phoneTel: "+522223553245",
  whatsapp: "522223553245",
  facebook: "https://www.facebook.com/Lenkabitsstore/",
  instagram: "https://www.instagram.com/lenkabits/",
  maps: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Plaza de la Tecnología Av. 10 Poniente 104 Centro Histórico Puebla"),
};

export const waLink = (text: string) => `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(text)}`;
