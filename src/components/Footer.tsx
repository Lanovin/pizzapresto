import Link from "next/link";
import { restaurant, delivery } from "@/data/menu";
import { LogoMark } from "./Logo";

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-ink text-cream max-sm:mt-16 max-lg:pb-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-10 pt-16 max-md:grid-cols-2 max-md:gap-x-6 max-md:gap-y-8 max-sm:pt-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-md:col-span-2">
          <p className="font-display text-5xl font-extrabold leading-[0.9] sm:text-6xl">
            Hlad?
            <br />
            <span className="font-serif font-normal italic text-mustard">presto!</span>
          </p>
          <a href={restaurant.phoneHref} className="btn btn-primary mt-6">
            Zavolat {restaurant.phone}
          </a>
        </div>
        <div>
          <p className="eyebrow text-mustard">Najdete nás</p>
          <p className="mt-3 leading-relaxed">
            {restaurant.name}
            <br />
            {restaurant.street}
            <br />
            {restaurant.city}
          </p>
          <a href={restaurant.mapsUrl} target="_blank" rel="noreferrer" className="mt-2 inline-block underline underline-offset-4 hover:text-mustard">
            Otevřít mapu
          </a>
        </div>
        <div>
          <p className="eyebrow text-mustard">Otevřeno</p>
          <p className="mt-3 leading-relaxed">
            Pondělí – Neděle
            <br />
            11:00 – 20:00
          </p>
          <p className="mt-3 text-sm text-cream/70">Rozvoz {delivery.minutes} min · odběr cca {delivery.pickupMinutes} min</p>
        </div>
        <div className="max-md:col-span-2">
          <p className="eyebrow text-mustard">Stránky</p>
          <ul className="mt-3 space-y-1.5 max-md:grid max-md:grid-cols-2 max-md:gap-x-6 max-md:gap-y-2 max-md:space-y-0">
            <li>
              <Link href="/menu" className="hover:text-mustard">
                Menu & objednávka
              </Link>
            </li>
            <li>
              <Link href="/o-nas" className="hover:text-mustard">
                O nás
              </Link>
            </li>
            <li>
              <Link href="/kontakt" className="hover:text-mustard">
                Kontakt & dotazy
              </Link>
            </li>
            <li>
              <a href={`mailto:${restaurant.email}`} className="hover:text-mustard">
                {restaurant.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 border-t border-cream/15 px-4 py-6 text-sm text-cream/60">
        <span>© {restaurant.name}, Mníšek pod Brdy</span>
        <span>Náhled nového webu · design koncept</span>
      </div>
      <LogoMark className="pointer-events-none absolute -bottom-24 -right-16 h-96 w-96 opacity-[0.07]" />
    </footer>
  );
}
