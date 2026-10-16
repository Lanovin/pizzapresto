"use client";

import Image from "next/image";
import { productById, formatPrice, delivery } from "@/data/menu";
import { linePrice, useCart } from "@/lib/cart";
import { MinusIcon, PlusIcon } from "./Icons";

export function CartLines({ compact = false }: { compact?: boolean }) {
  const { lines, setQty } = useCart();

  return (
    <ul className="divide-y-2 divide-dashed divide-ink/20">
      {lines.map((line) => {
        const p = productById(line.productId);
        if (!p) return null;
        return (
          <li key={line.key} className="flex items-center gap-3 py-3 animate-pop">
            <Image
              src={p.image}
              alt=""
              width={56}
              height={56}
              className={`${compact ? "h-11 w-11" : "h-14 w-14"} shrink-0 rounded-full border-2 border-ink object-cover`}
            />
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold leading-tight">{p.name}</p>
              <p className="text-sm text-ink-soft">
                {line.size ? `ø ${line.size} cm · ` : ""}
                {formatPrice(linePrice(p, line.size))}
              </p>
            </div>
            <div className="flex items-center rounded-full border-2 border-ink bg-cream">
              <button
                className="grid h-8 w-8 place-items-center rounded-full hover:bg-paper-2 max-lg:h-10 max-lg:w-10"
                onClick={() => setQty(line.key, line.qty - 1)}
                aria-label={`Odebrat ${p.name}`}
              >
                <MinusIcon className="h-4 w-4" />
              </button>
              <span className="w-6 text-center font-bold tabular-nums">{line.qty}</span>
              <button
                className="grid h-8 w-8 place-items-center rounded-full hover:bg-paper-2 max-lg:h-10 max-lg:w-10"
                onClick={() => setQty(line.key, line.qty + 1)}
                aria-label={`Přidat ${p.name}`}
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function CartTotals() {
  const { subtotal, deliveryFee, fulfilment } = useCart();
  const missing = delivery.freeFrom - subtotal;
  return (
    <div className="space-y-1.5 text-sm">
      <div className="flex justify-between">
        <span>Mezisoučet</span>
        <span className="font-semibold tabular-nums">{formatPrice(subtotal)}</span>
      </div>
      <div className="flex justify-between">
        <span>{fulfilment === "rozvoz" ? "Rozvoz" : "Osobní odběr"}</span>
        <span className="font-semibold tabular-nums">{deliveryFee ? formatPrice(deliveryFee) : "zdarma"}</span>
      </div>
      {fulfilment === "rozvoz" && missing > 0 && subtotal > 0 && (
        <div className="pt-1">
          <div className="h-2 overflow-hidden rounded-full border border-ink/40 bg-paper-2">
            <div
              className="h-full rounded-full bg-basil transition-[width] duration-500"
              style={{ width: `${Math.min(100, (subtotal / delivery.freeFrom) * 100)}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-ink-soft">
            Ještě {formatPrice(missing)} a rozvoz máte <strong>zdarma</strong>.
          </p>
        </div>
      )}
      <div className="font-display flex justify-between border-t-2 border-ink pt-2 text-2xl font-extrabold">
        <span>Celkem</span>
        <span className="tabular-nums">{formatPrice(subtotal + deliveryFee)}</span>
      </div>
    </div>
  );
}

export function FulfilmentToggle() {
  const { fulfilment, setFulfilment } = useCart();
  return (
    <div className="grid grid-cols-2 rounded-full border-2 border-ink bg-cream p-1 text-sm font-bold" role="radiogroup">
      {(
        [
          ["rozvoz", "🛵 Rozvoz"],
          ["vyzvednuti", "🏃 Vyzvednu si"],
        ] as const
      ).map(([value, label]) => (
        <button
          key={value}
          role="radio"
          aria-checked={fulfilment === value}
          onClick={() => setFulfilment(value)}
          className={`rounded-full px-3 py-2 transition-colors ${fulfilment === value ? "bg-ink text-cream" : "hover:bg-paper-2"}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
