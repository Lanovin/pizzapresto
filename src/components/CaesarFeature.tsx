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
          <h2 className="font-display mt-3 text-6xl font-extrabold leading-[0.85] max-sm:text-[3.4rem] sm:text-8xl">
            Caesar,
            <br />
            <span className="font-serif font-normal italic text-mustard">ale na pizze.</span>
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-cream/85 max-sm:mt-5 max-sm:text-base">
            Smetanový základ, mozzarella, kuřecí maso, slanina a parmezán. Po upečení jde navrch křupavý římský salát a náš
            Caesar dresink. Salát a pizza v jednom – a obojí ještě teplé.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 max-sm:mt-6 max-sm:grid max-sm:grid-cols-1">
            <button className="btn btn-light text-lg" onClick={(e) => add(p.id, "32", e.currentTarget)}>
              <PlusIcon /> ø 32 cm · {formatPrice(p.price)}
            </button>
            <button className="btn btn-dark text-lg" onClick={(e) => add(p.id, "24", e.currentTarget)}>
              <PlusIcon /> ø 24 cm · {formatPrice(p.priceSmall!)}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
