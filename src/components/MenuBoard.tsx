"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { categories, products, delivery, type CategoryId, type Product } from "@/data/menu";
import { useCart, type Size } from "@/lib/cart";
import { ProductCard } from "./ProductCard";
import { CartLines, CartTotals, FulfilmentToggle } from "./CartLines";
import { ArrowIcon, ChiliIcon, LeafIcon } from "./Icons";

type Filter = "vse" | "tomato" | "smetana" | "palive" | "bez-masa";

const filters: { id: Filter; label: React.ReactNode }[] = [
  { id: "vse", label: "Všechny" },
  { id: "tomato", label: "🍅 Tomatový základ" },
  { id: "smetana", label: "🥛 Smetanový základ" },
  {
    id: "palive",
    label: (
      <>
        <ChiliIcon className="h-4 w-4" /> Pálivé
      </>
    ),
  },
  {
    id: "bez-masa",
    label: (
      <>
        <LeafIcon className="h-4 w-4" /> Bez masa
      </>
    ),
  },
];

const matches = (p: Product, f: Filter) =>
  f === "vse" || (f === "tomato" || f === "smetana" ? p.base === f : p.tags?.includes(f));

export function MenuBoard() {
  const [size, setSize] = useState<Size>("32");
  const [filter, setFilter] = useState<Filter>("vse");
  const [current, setCurrent] = useState<CategoryId>("pizza");
  const { count } = useCart();

  const byCat = useMemo(
    () =>
      categories.map((c) => ({
        ...c,
        items: products.filter((p) => p.category === c.id && (c.id !== "pizza" || matches(p, filter))),
      })),
    [filter],
  );

  // zvýraznění aktuální kategorie podle scrollu
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setCurrent(visible[0].target.id.replace("cat-", "") as CategoryId);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    categories.forEach((c) => {
      const el = document.getElementById(`cat-${c.id}`);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // odkaz /menu#p62 – na telefonu je viditelná řádková verze s id "p62-m"
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id || window.innerWidth >= 640) return;
    document.getElementById(`${id}-m`)?.scrollIntoView({ block: "center" });
  }, []);

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[1fr_360px]">
      <div className="min-w-0">
        {/* lepivá navigace kategorií */}
        <nav className="no-scrollbar sticky top-[74px] z-20 -mx-4 flex gap-2 overflow-x-auto border-b-2 border-ink bg-paper/95 px-4 py-3 backdrop-blur">
          {categories.map((c) => (
            <a
              key={c.id}
              href={`#cat-${c.id}`}
              className={`chip shrink-0 !px-4 !py-2 !text-sm transition-colors ${current === c.id ? "!bg-ink text-cream" : "hover:bg-paper-2"}`}
            >
              <span aria-hidden>{c.emoji}</span> {c.label}
            </a>
          ))}
        </nav>

        {byCat.map((cat) => (
          <section key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-36 pt-10 max-sm:scroll-mt-32 max-sm:pt-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-5xl font-extrabold max-sm:text-[2.6rem] sm:text-6xl">
                {cat.label}
                {cat.id === "pizza" && <span className="font-serif ml-3 align-middle text-3xl font-normal italic text-tomato">z pece</span>}
              </h2>
              {cat.id === "pizza" && <SizeToggle size={size} setSize={setSize} />}
            </div>

            {cat.id === "pizza" && (
              <div className="no-scrollbar -mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-1">
                {filters.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFilter(f.id)}
                    className={`chip shrink-0 transition-colors ${filter === f.id ? "!bg-tomato text-cream" : "hover:bg-paper-2"}`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            )}

            <div
              className={`mt-6 grid gap-5 max-sm:mt-5 max-sm:gap-3 ${cat.id === "napoje" ? "grid-cols-2 max-sm:grid-cols-1 sm:grid-cols-3 xl:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3"}`}
            >
              {cat.items.map((p) => (
                <ProductCard key={p.id} product={p} size={cat.id === "pizza" ? size : undefined} />
              ))}
            </div>
            {cat.items.length === 0 && <p className="mt-6 text-ink-soft">Pro tento filtr nic nemáme – zkuste jiný.</p>}
          </section>
        ))}
      </div>

      {/* boční účtenka (desktop) */}
      <aside className="hidden lg:block">
        <div className="sticky top-28 pt-10">
          <div className="receipt px-5 py-8">
            <p className="eyebrow text-center text-tomato">Pizza Presto · Mníšek</p>
            <h2 className="font-display mt-1 text-center text-3xl font-extrabold">Vaše objednávka</h2>
            <div className="my-4 border-t-2 border-dashed border-ink/30" />
            {count === 0 ? (
              <p className="py-8 text-center text-ink-soft">
                Zatím prázdno.
                <br />
                Klikněte na <strong>Do košíku</strong> u pizzy.
              </p>
            ) : (
              <div className="max-h-[38vh] overflow-y-auto pr-1">
                <CartLines compact />
              </div>
            )}
            <div className="mt-4 space-y-4">
              <FulfilmentToggle />
              <CartTotals />
              {count > 0 ? (
                <Link href="/objednavka" className="btn btn-primary w-full text-lg">
                  K objednávce <ArrowIcon />
                </Link>
              ) : (
                <p className="text-center text-xs text-ink-soft">Rozvoz zdarma od {delivery.freeFrom} Kč</p>
              )}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function SizeToggle({ size, setSize }: { size: Size; setSize: (s: Size) => void }) {
  return (
    <div className="flex items-center gap-3" role="radiogroup" aria-label="Velikost pizzy">
      {(["32", "24"] as const).map((s) => (
        <button
          key={s}
          role="radio"
          aria-checked={size === s}
          onClick={() => setSize(s)}
          className="group flex items-center gap-2 font-bold"
        >
          <span
            className={`grid place-items-center rounded-full border-2 border-ink transition-all ${
              size === s ? "bg-crust shadow-[3px_3px_0_var(--ink)]" : "bg-cream opacity-60 group-hover:opacity-100"
            } ${s === "32" ? "h-12 w-12" : "h-9 w-9"}`}
          >
            <span className={`rounded-full ${size === s ? "bg-tomato" : "bg-paper-2"} ${s === "32" ? "h-8 w-8" : "h-5 w-5"}`} />
          </span>
          <span className={size === s ? "" : "text-ink-soft"}>ø {s} cm</span>
        </button>
      ))}
    </div>
  );
}
