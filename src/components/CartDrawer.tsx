"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import { CartLines, CartTotals, FulfilmentToggle } from "./CartLines";
import { ArrowIcon, CloseIcon } from "./Icons";
import { LogoMark } from "./Logo";

export function CartDrawer() {
  const { open, setOpen, count } = useCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, setOpen]);

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div
        className={`absolute inset-0 bg-ink/50 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={() => setOpen(false)}
      />
      <aside
        role="dialog"
        aria-label="Košík"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l-2 border-ink bg-paper transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b-2 border-ink px-5 py-4">
          <h2 className="font-display text-3xl font-extrabold">Vaše objednávka</h2>
          <button
            onClick={() => setOpen(false)}
            className="grid h-10 w-10 place-items-center rounded-full border-2 border-ink bg-cream hover:bg-paper-2"
            aria-label="Zavřít košík"
          >
            <CloseIcon />
          </button>
        </div>

        {count === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <LogoMark className="h-24 w-24 animate-wiggle" />
            <p className="font-display mt-6 text-3xl font-extrabold">Krabice je zatím prázdná</p>
            <p className="mt-2 text-ink-soft">Pec je rozpálená, stačí si vybrat.</p>
            <Link href="/menu" onClick={() => setOpen(false)} className="btn btn-primary mt-6">
              Vybrat pizzu <ArrowIcon />
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5">
              <CartLines />
            </div>
            <div className="space-y-4 border-t-2 border-ink bg-cream px-5 py-5">
              <FulfilmentToggle />
              <CartTotals />
              <Link href="/objednavka" onClick={() => setOpen(false)} className="btn btn-primary w-full text-lg">
                K objednávce <ArrowIcon />
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
