"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { restaurant, delivery } from "@/data/menu";
import { Logo } from "./Logo";
import { BagIcon, CloseIcon, MenuIcon, PhoneIcon, ScooterIcon } from "./Icons";

const nav = [
  { href: "/menu", label: "Menu & objednávka" },
  { href: "/o-nas", label: "O nás" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export function Header() {
  const pathname = usePathname();
  const { count, setOpen, bump } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="bg-ink text-cream text-[0.8rem] font-semibold">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-x-6 gap-y-1 px-4 py-2 sm:justify-between">
          <span className="flex items-center gap-2">
            <ScooterIcon className="h-4 w-4 text-mustard" />
            Rozvoz po Mníšku a okolí · nad {delivery.freeFrom} Kč zdarma
          </span>
          <span className="hidden items-center gap-5 sm:flex">
            <span>{restaurant.hours}</span>
            <a href={restaurant.phoneHref} className="hover:text-mustard">
              {restaurant.phone}
            </a>
          </span>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 transition-[background-color,box-shadow,border-color] duration-300 ${
          scrolled ? "bg-paper/90 backdrop-blur-md border-b-2 border-ink" : "border-b-2 border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 max-sm:gap-2 max-sm:py-2.5">
          <Link href="/" aria-label="Pizza Presto – úvod">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Hlavní navigace">
            {nav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-2 font-semibold transition-colors ${
                    active ? "bg-ink text-cream" : "hover:bg-paper-2"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={restaurant.phoneHref}
              className="grid h-10 w-10 place-items-center rounded-full border-2 border-ink bg-cream md:hidden"
              aria-label={`Zavolat ${restaurant.phone}`}
            >
              <PhoneIcon className="h-[18px] w-[18px] text-tomato" />
            </a>
            <a
              href={restaurant.phoneHref}
              className="hidden items-center gap-2 rounded-full px-3 py-2 font-bold hover:bg-paper-2 lg:flex"
            >
              <PhoneIcon className="h-4 w-4 text-tomato" />
              608 364 560
            </a>
            <button
              id="cart-button"
              onClick={() => setOpen(true)}
              className="btn btn-light btn-sm relative"
              aria-label={`Košík, ${count} položek`}
            >
              <BagIcon />
              <span className="hidden sm:inline">Košík</span>
              <span
                key={bump}
                className={`grid h-6 min-w-6 place-items-center rounded-full px-1 text-xs ${
                  count ? "bg-tomato text-cream animate-bump" : "bg-paper-2"
                }`}
              >
                {count}
              </span>
            </button>
            <Link href="/menu" className="btn btn-primary btn-sm hidden sm:inline-flex">
              Objednat
            </Link>
            <button
              className="grid h-10 w-10 place-items-center rounded-full border-2 border-ink bg-cream md:hidden"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="animate-pop max-h-[calc(100dvh-64px)] overflow-y-auto border-t-2 border-ink bg-paper px-4 pb-6 pt-2 md:hidden">
            {[{ href: "/", label: "Úvod" }, ...nav].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="font-display block border-b border-ink/15 py-4 text-3xl font-extrabold"
              >
                {item.label}
              </Link>
            ))}
            <a href={restaurant.phoneHref} className="btn btn-primary mt-6 w-full">
              <PhoneIcon /> Zavolat {restaurant.phone}
            </a>
          </nav>
        )}
      </header>
    </>
  );
}
