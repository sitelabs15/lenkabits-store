# Lenkabits Store

Sitio web de Lenkabits Store: componentes de PC, computadoras a medida,
ensamblado y servicio técnico en Puebla, México.

## Stack

- [TanStack Start](https://tanstack.com/start) (React 19 + SSR)
- [Vite](https://vite.dev) + [Nitro](https://nitro.build)
- [Tailwind CSS v4](https://tailwindcss.com)
- Componentes de UI basados en [shadcn/ui](https://ui.shadcn.com) y Radix UI

## Development

Requiere Node.js 22+.

```sh
npm install
npm run dev
```

El servidor de desarrollo se levanta en `http://localhost:8080`.

## Scripts

| Script             | Descripción                                  |
| ------------------ | -------------------------------------------- |
| `npm run dev`      | Servidor de desarrollo                       |
| `npm run build`    | Build de producción                          |
| `npm run preview`  | Previsualiza el build                        |
| `npm run lint`     | Ejecuta ESLint                               |
| `npm run format`   | Formatea con Prettier                        |
| `npm run test`     | Ejecuta las pruebas con Vitest               |

## Estructura

```
src/
  components/site/   Componentes de la tienda (Header, Footer, catálogo…)
  components/ui/     Componentes base de UI
  lib/               Catálogo, estado de la tienda, SEO y utilidades
  routes/            Rutas de TanStack Router
  styles.css         Tokens de diseño y estilos globales
public/              Archivos estáticos
```
