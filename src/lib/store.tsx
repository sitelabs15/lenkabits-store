import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { getProduct } from "./catalog";

type CartLine = { slug: string; qty: number };
type Ctx = {
  cart: CartLine[];
  favs: string[];
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  toggleFav: (slug: string) => void;
  isFav: (slug: string) => boolean;
  count: number;
  subtotalCents: number;
};

const StoreCtx = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [favs, setFavs] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setCart(JSON.parse(localStorage.getItem("lb-cart") || "[]"));
      setFavs(JSON.parse(localStorage.getItem("lb-favs") || "[]"));
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => { if (ready) localStorage.setItem("lb-cart", JSON.stringify(cart)); }, [cart, ready]);
  useEffect(() => { if (ready) localStorage.setItem("lb-favs", JSON.stringify(favs)); }, [favs, ready]);

  const add = (slug: string, qty = 1) => {
    setCart((c) => {
      const e = c.find((l) => l.slug === slug);
      return e ? c.map((l) => (l.slug === slug ? { ...l, qty: Math.min(10, l.qty + qty) } : l)) : [...c, { slug, qty }];
    });
    toast.success("Agregado al carrito", { description: getProduct(slug)?.name });
  };
  const setQty = (slug: string, qty: number) =>
    setCart((c) => c.map((l) => (l.slug === slug ? { ...l, qty: Math.max(1, Math.min(10, qty)) } : l)));
  const remove = (slug: string) => setCart((c) => c.filter((l) => l.slug !== slug));
  const toggleFav = (slug: string) =>
    setFavs((f) => {
      const on = f.includes(slug);
      toast(on ? "Eliminado de favoritos" : "Guardado en favoritos");
      return on ? f.filter((s) => s !== slug) : [...f, slug];
    });

  const count = cart.reduce((a, l) => a + l.qty, 0);
  const subtotalCents = cart.reduce((a, l) => a + (getProduct(l.slug)?.priceCents ?? 0) * l.qty, 0);

  return (
    <StoreCtx.Provider value={{ cart, favs, add, setQty, remove, clear: () => setCart([]), toggleFav, isFav: (s) => favs.includes(s), count, subtotalCents }}>
      {children}
    </StoreCtx.Provider>
  );
}

export function useStore() {
  const c = useContext(StoreCtx);
  if (!c) throw new Error("useStore outside provider");
  return c;
}
