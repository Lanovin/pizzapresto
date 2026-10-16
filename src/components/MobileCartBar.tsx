"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice, restaurant } from "@/data/menu";
import { ArrowIcon, BagIcon, PhoneIcon, ScooterIcon } from "./Icons";

/**
 * Spodní lišta na telefonu (pod 1024 px, na desktopu se nezobrazuje):
 * - v košíku něco je → otevře košík s cenou,
 * - košík prázdný → po odscrollování úvodu nabídne „Zavolat“ a „Objednat rozvoz“.
 */
export function MobileCartBar() {
  const { count, subtotal, deliveryFee, setOpen, bump } = useCart();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/objednavka") return null;

  if (count) {
    return (
      <div className="fixed inset-x-3 bottom-3 z-30 lg:hidden">
        <button onClick={() => setOpen(true)} className="btn btn-primary w-full justify-between text-base animate-rise">
          <span className="flex items-center gap-2">
            <BagIcon />
            <span key={bump} className="animate-bump inline-block">
              {count} ks
            </span>
          </span>
          <span className="flex items-center gap-2">
            {formatPrice(subtotal + deliveryFee)} <ArrowIcon />
          </span>
        </button>
      </div>
    );
  }

  if (pathname === "/menu" || !scrolled) return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-30 flex gap-2 lg:hidden animate-rise">
      <a href={restaurant.phoneHref} className="btn btn-light px-4 text-base" aria-label={`Zavolat ${restaurant.phone}`}>
        <PhoneIcon /> Zavolat
      </a>
      <Link href="/menu" className="btn btn-primary flex-1 text-base">
        <ScooterIcon /> Objednat rozvoz
      </Link>
    </div>
  );
}
