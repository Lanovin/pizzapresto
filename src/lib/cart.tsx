"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { productById, delivery, type Product } from "@/data/menu";

export type Size = "32" | "24";

export type CartLine = { key: string; productId: string; size?: Size; qty: number };

export type Fulfilment = "rozvoz" | "vyzvednuti";

type CartCtx = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  deliveryFee: number;
  fulfilment: Fulfilment;
  setFulfilment: (f: Fulfilment) => void;
  add: (productId: string, size?: Size, from?: HTMLElement | null) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  open: boolean;
  setOpen: (o: boolean) => void;
  bump: number;
  ready: boolean;
};

const Ctx = createContext<CartCtx | null>(null);

const STORAGE_KEY = "pizzapresto-cart-v1";

export const linePrice = (p: Product, size?: Size) => (size === "24" && p.priceSmall ? p.priceSmall : p.price);

/** Malá "pizza" přeletí od tlačítka ke košíku v hlavičce. */
function flyToCart(from: HTMLElement, image: string) {
  const target = document.getElementById("cart-button");
  if (!target || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const a = from.getBoundingClientRect();
  const b = target.getBoundingClientRect();
  const dot = document.createElement("div");
  dot.className = "fly-dot";
  dot.style.backgroundImage = `url(${image})`;
  dot.style.left = `${a.left + a.width / 2 - 28}px`;
  dot.style.top = `${a.top + a.height / 2 - 28}px`;
  document.body.appendChild(dot);
  const dx = b.left + b.width / 2 - (a.left + a.width / 2);
  const dy = b.top + b.height / 2 - (a.top + a.height / 2);
  dot
    .animate(
      [
        { transform: "translate(0,0) scale(1) rotate(0deg)", opacity: 1 },
        { transform: `translate(${dx * 0.5}px, ${dy * 0.5 - 120}px) scale(1.15) rotate(180deg)`, opacity: 1, offset: 0.5 },
        { transform: `translate(${dx}px, ${dy}px) scale(0.25) rotate(360deg)`, opacity: 0.6 },
      ],
      { duration: 750, easing: "cubic-bezier(.5,0,.3,1)" },
    )
    .finished.finally(() => dot.remove());
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [fulfilment, setFulfilment] = useState<Fulfilment>("rozvoz");
  const [open, setOpen] = useState(false);
  const [bump, setBump] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // localStorage až po hydrataci, aby se serverové HTML shodovalo s prvním renderem
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (Array.isArray(data.lines)) setLines(data.lines.filter((l: CartLine) => productById(l.productId)));
        if (data.fulfilment === "rozvoz" || data.fulfilment === "vyzvednuti") setFulfilment(data.fulfilment);
      }
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ lines, fulfilment }));
    } catch {}
  }, [lines, fulfilment, loaded]);

  const add = useCallback((productId: string, size?: Size, from?: HTMLElement | null) => {
    const product = productById(productId);
    if (!product) return;
    const key = product.category === "pizza" ? `${productId}-${size ?? "32"}` : productId;
    setLines((prev) => {
      const existing = prev.find((l) => l.key === key);
      if (existing) return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l));
      return [...prev, { key, productId, size: product.category === "pizza" ? (size ?? "32") : undefined, qty: 1 }];
    });
    if (from) flyToCart(from, product.image);
    setTimeout(() => setBump((b) => b + 1), from ? 700 : 0);
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) => (qty <= 0 ? prev.filter((l) => l.key !== key) : prev.map((l) => (l.key === key ? { ...l, qty } : l))));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartCtx>(() => {
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const subtotal = lines.reduce((s, l) => {
      const p = productById(l.productId);
      return p ? s + linePrice(p, l.size) * l.qty : s;
    }, 0);
    const deliveryFee = fulfilment === "rozvoz" && subtotal > 0 && subtotal < delivery.freeFrom ? delivery.fee : 0;
    return { lines, count, subtotal, deliveryFee, fulfilment, setFulfilment, add, setQty, clear, open, setOpen, bump, ready: loaded };
  }, [lines, fulfilment, add, setQty, clear, open, bump, loaded]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
