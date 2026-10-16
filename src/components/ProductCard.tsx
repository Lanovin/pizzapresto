"use client";

import Image from "next/image";
import { useState } from "react";
import { formatPrice, type Product } from "@/data/menu";
import { useCart, type Size } from "@/lib/cart";
import { CheckIcon, ChiliIcon, LeafIcon, PlusIcon } from "./Icons";

export function Tags({ product }: { product: Product }) {
  const t = product.tags ?? [];
  return (
    <span className="flex flex-wrap gap-1">
      {t.includes("novinka") && <span className="chip !py-0.5 !text-[0.7rem] bg-mustard">Novinka</span>}
      {t.includes("oblibene") && <span className="chip !py-0.5 !text-[0.7rem]">♥ Oblíbená</span>}
      {t.includes("palive") && (
        <span className="chip !py-0.5 !text-[0.7rem]">
          <ChiliIcon className="h-3.5 w-3.5" /> Pálivá
        </span>
      )}
      {t.includes("bez-masa") && (
        <span className="chip !py-0.5 !text-[0.7rem]">
          <LeafIcon className="h-3.5 w-3.5" /> Bez masa
        </span>
      )}
    </span>
  );
}

/**
 * layout="auto": na telefonu kompaktní řádek (jako v rozvozových aplikacích), od 640 px karta.
 * layout="card": vždy karta (např. vodorovný karusel na úvodu).
 */
export function ProductCard({ product, size, layout = "auto" }: { product: Product; size?: Size; layout?: "auto" | "card" }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const isPizza = product.category === "pizza";
  const isDrink = product.category === "napoje";
  const price = isPizza && size === "24" ? product.priceSmall! : product.price;

  const onAdd = (el: HTMLElement) => {
    add(product.id, isPizza ? (size ?? "32") : undefined, el);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <>
      {layout === "auto" && <ProductRow product={product} size={size} price={price} added={added} onAdd={onAdd} />}
      <article
        id={product.id}
        className={`card group flex scroll-mt-40 flex-col overflow-hidden ${layout === "auto" ? "max-sm:hidden" : ""}`}
      >
      <div className={`relative overflow-hidden border-b-2 border-ink ${isDrink ? "aspect-square bg-white" : "aspect-[16/10]"}`}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className={`${isDrink ? "object-contain p-4" : "object-cover"} transition-transform duration-500 group-hover:scale-[1.06]`}
        />
        {isPizza && (
          <span className="absolute left-3 top-3 rounded-full border-2 border-ink bg-cream px-2 py-0.5 text-xs font-bold">
            ø {size ?? "32"} cm
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl font-extrabold leading-none">{product.name}</h3>
          <span className="font-display shrink-0 text-xl font-extrabold tabular-nums">{formatPrice(price)}</span>
        </div>
        {product.desc && <p className="mt-2 text-sm leading-snug text-ink-soft">{product.desc}</p>}
        <div className="mt-auto flex items-end justify-between gap-2 pt-4">
          <Tags product={product} />
          <button
            onClick={(e) => onAdd(e.currentTarget)}
            className={`btn btn-sm shrink-0 ${added ? "btn-dark" : "btn-primary"}`}
            aria-label={`Přidat ${product.name} do košíku`}
          >
            {added ? "✓ Přidáno" : (
              <>
                <PlusIcon className="h-4 w-4" /> Do košíku
              </>
            )}
          </button>
        </div>
      </div>
      </article>
    </>
  );
}

function ProductRow({
  product,
  size,
  price,
  added,
  onAdd,
}: {
  product: Product;
  size?: Size;
  price: number;
  added: boolean;
  onAdd: (el: HTMLElement) => void;
}) {
  const isPizza = product.category === "pizza";
  const isDrink = product.category === "napoje";
  return (
    <div id={`${product.id}-m`} className="card flex scroll-mt-40 items-stretch gap-3 overflow-hidden !rounded-2xl p-2.5 !shadow-[3px_3px_0_var(--ink)] sm:hidden">
      <div className={`relative w-24 shrink-0 overflow-hidden rounded-xl border-2 border-ink ${isDrink ? "bg-white" : ""}`}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="96px"
          className={isDrink ? "object-contain p-1.5" : "object-cover"}
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col py-0.5">
        <h3 className="font-display text-[1.3rem] font-extrabold leading-[1.05]">{product.name}</h3>
        {product.desc && <p className="mt-1 line-clamp-2 text-[0.8rem] leading-snug text-ink-soft">{product.desc}</p>}
        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div className="leading-none">
            <span className="font-display text-lg font-extrabold tabular-nums">{formatPrice(price)}</span>
            {isPizza && <span className="ml-1.5 text-xs font-semibold text-ink-soft">ø {size ?? "32"} cm</span>}
            {product.tags?.some((t) => t === "palive" || t === "bez-masa" || t === "novinka") && (
              <span className="ml-1.5 inline-flex translate-y-0.5 gap-0.5">
                {product.tags.includes("novinka") && <span className="rounded-full bg-mustard px-1.5 text-[0.65rem] font-bold">NOVÉ</span>}
                {product.tags.includes("palive") && <ChiliIcon className="h-3.5 w-3.5" />}
                {product.tags.includes("bez-masa") && <LeafIcon className="h-3.5 w-3.5" />}
              </span>
            )}
          </div>
          <button
            onClick={(e) => onAdd(e.currentTarget)}
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-ink shadow-[2px_2px_0_var(--ink)] transition-colors active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${
              added ? "bg-basil text-cream" : "bg-tomato text-cream"
            }`}
            aria-label={`Přidat ${product.name} do košíku`}
          >
            {added ? <CheckIcon className="h-5 w-5" /> : <PlusIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
