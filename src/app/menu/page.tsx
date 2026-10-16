import type { Metadata } from "next";
import { MenuBoard } from "@/components/MenuBoard";
import { delivery } from "@/data/menu";

export const metadata: Metadata = {
  title: "Menu & objednávka",
  description: "Pizza ø 32 i ø 24 cm, polévky, saláty, burgery a nápoje. Objednejte si rozvoz nebo osobní odběr.",
};

export default function MenuPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pb-4 pt-8 max-sm:pb-2 max-sm:pt-5">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h1 className="font-display text-[clamp(3.5rem,9vw,7.5rem)] font-extrabold leading-[0.82] max-sm:text-[3.2rem]">
            Co si dáte
            <span className="font-serif font-normal italic text-tomato">?</span>
          </h1>
          <ol className="flex flex-wrap gap-2 text-sm font-bold max-sm:hidden">
            <li className="chip bg-ink text-cream">1 · Vyberte</li>
            <li className="chip">2 · Zkontrolujte košík</li>
            <li className="chip">3 · Doručíme za {delivery.minutes} min</li>
          </ol>
        </div>
      </section>
      <MenuBoard />
    </>
  );
}
