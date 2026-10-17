"use client";

import Image from "next/image";
import { productById, formatPrice } from "@/data/menu";
import { useCart } from "@/lib/cart";
import { PlusIcon } from "./Icons";

export function CaesarFeature() {
  const { add } = useCart();
  const p = productById("p93")!;

  return (
    <section className="relative overflow-hidden bg-basil text-cream">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 max-sm:gap-10 max-sm:py-14 lg:grid-cols-2">
        <div className="relative order-2 mx-auto w-full max-w-md max-sm:max-w-[300px] lg:order-1">
          <div className="relative aspect-square">
            <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-full bg-ink" />
            <div className="absolute inset-0 overflow-hidden rounded-full border-4 border-ink animate-[spin_80s_linear_infinite]">
              <Image src="/wheel/pizzapresto-cz-93.webp" alt="Pizza Caesar" fill sizes="28rem" className="object-cover scale-110" />
            </div>
            <div className="absolute -right-2 -top-2 max-sm:-right-3 max-sm:h-24 max-sm:w-24 grid h-28 w-28 rotate-12 place-items-center rounded-full border-2 border-ink bg-mustard text-center text-ink shadow-[4px_4px_0_var(--ink)] sm:h-32 sm:w-32">
              <span className="font-display text-lg font-extrabold leading-none">
                NOVINKA
                <span className="font-serif block text-2xl font-normal italic">na podzim</span>
              </span>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="eyebrow text-mustard">Pizza měsíce</p>
          <h2 className="font-display mt-3 text-6xl font-extrabold leading-[0.85] max-sm:text-[3.1rem] sm:text-8xl">
            Caesar,
            <br />
            <span className="font-serif font-normal italic text-mustard">ale na pizze.</span>
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2 sm:hidden">
            {["smetana", "mozzarella", "kuře", "slanina", "parmezán", "křupavý salát"].map((t) => (
              <li key={t} className="rounded-full border-2 border-cream/40 px-3 py-1 text-sm font-semibold">
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-cream/85 max-sm:hidden">
            Smetanový základ, mozzarella, kuřecí maso, slanina a parmezán. Po upečení jde navrch křupavý římský salát a náš
            Caesar dresink. Salát a pizza v jednom – a obojí ještě teplé.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 max-sm:mt-6 max-sm:grid max-sm:grid-cols-2 max-sm:gap-2">
            <button className="btn btn-light text-lg max-sm:flex-col max-sm:gap-1 max-sm:px-3 max-sm:py-3 max-sm:text-base" onClick={(e) => add(p.id, "32", e.currentTarget)}>
              <span className="flex items-center gap-1.5">
                <PlusIcon className="h-4 w-4" /> ø 32 cm
              </span>
              <span className="sm:hidden">{formatPrice(p.price)}</span>
              <span className="max-sm:hidden">· {formatPrice(p.price)}</span>
            </button>
            <button className="btn btn-dark text-lg max-sm:flex-col max-sm:gap-1 max-sm:px-3 max-sm:py-3 max-sm:text-base" onClick={(e) => add(p.id, "24", e.currentTarget)}>
              <span className="flex items-center gap-1.5">
                <PlusIcon className="h-4 w-4" /> ø 24 cm
              </span>
              <span className="sm:hidden">{formatPrice(p.priceSmall!)}</span>
              <span className="max-sm:hidden">· {formatPrice(p.priceSmall!)}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
