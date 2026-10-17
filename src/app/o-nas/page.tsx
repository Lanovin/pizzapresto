import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Marquee } from "@/components/Marquee";
import { ArrowIcon } from "@/components/Icons";
import { restaurant } from "@/data/menu";

export const metadata: Metadata = {
  title: "O nás",
  description: "Malá pizzerie v Mníšku pod Brdy. Pizza z pece, rozvoz i posezení.",
};

const pillars = [
  {
    no: "01",
    title: "Těsto",
    text: "Nadýchaný okraj, tenký střed. Těsto necháváme pořádně odpočinout, aby bylo lehké a dobře stravitelné.",
    short: "Nadýchaný okraj, tenký střed",
  },
  {
    no: "02",
    title: "Suroviny",
    text: "Šunka z kýty, Prosciutto Crudo, Grana Padano, rajčata San Marzano. Klasika, kterou nemá smysl ošidit.",
    short: "Prosciutto, Grana Padano, San Marzano",
  },
  {
    no: "03",
    title: "Presto",
    text: "Italsky „rychle“. Pizza je hotová za pár minut a kurýr vyráží hned, jak vyjede z pece.",
    short: "Z pece rovnou do krabice",
  },
];

export default function ONasPage() {
  return (
    <>
      <section className="relative mx-auto max-w-7xl px-4 pt-8 max-sm:pt-5">
        <div className="relative h-[62vh] min-h-[420px] overflow-hidden rounded-[2rem] border-2 border-ink shadow-[8px_8px_0_var(--ink)] max-sm:h-[440px] max-sm:min-h-0 max-sm:rounded-3xl max-sm:shadow-[5px_5px_0_var(--ink)]">
          <Image src="/photos/oven.jpg" alt="Pizza před rozpálenou pecí" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-cream max-sm:p-5 sm:p-12">
            <p className="eyebrow text-mustard">O nás</p>
            <h1 className="font-display mt-2 text-[clamp(3rem,9vw,7.5rem)] font-extrabold leading-[0.82] max-sm:text-[2.9rem]">
              Malá pizzerie,
              <br />
              <span className="font-serif font-normal italic text-mustard">velká pec.</span>
            </h1>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 pt-20 max-sm:gap-5 max-sm:pt-12 lg:grid-cols-[1fr_1.3fr]">
        <h2 className="font-display text-5xl font-extrabold leading-[0.9] max-sm:text-[2.6rem] sm:text-6xl">
          Pečeme pro Mníšek <span className="font-serif font-normal italic text-tomato">a okolí.</span>
        </h2>
        <div className="space-y-5 text-lg leading-relaxed text-ink-soft max-sm:space-y-4 max-sm:text-[0.95rem] max-sm:leading-snug">
          <p>
            Pizza Presto je sousedská pizzerie na Pražské ulici v Mníšku pod Brdy. Děláme to, co umíme nejlíp: poctivou pizzu
            ve dvou velikostech, k tomu pár salátů, polévku a burgery s trhaným masem.
          </p>
          <p className="max-sm:hidden">
            Většina našich pizz odjíždí v krabici – proto je rozvoz u nás na prvním místě a objednávka má být hotová během
            minuty. Ale kdo má čas, ten si může sednout přímo k nám a dát si pizzu, dokud ještě syčí.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-20 max-sm:pt-12">
        <div className="grid gap-5 max-md:gap-3 md:grid-cols-3">
          {pillars.map((p, i) => (
            <div key={p.no} className={`card p-8 max-md:grid max-md:grid-cols-[auto_1fr] max-md:gap-x-4 max-md:p-5 ${i === 1 ? "md:translate-y-8 bg-mustard" : ""}`}>
              <span className="font-display text-6xl font-extrabold text-tomato [-webkit-text-stroke:2px_var(--ink)] max-md:row-span-2 max-md:text-5xl max-md:leading-none">
                {p.no}
              </span>
              <h3 className="font-display mt-4 text-4xl font-extrabold max-md:mt-0 max-md:text-3xl">{p.title}</h3>
              <p className="mt-3 text-ink-soft max-md:hidden">{p.text}</p>
              <p className="mt-0.5 font-semibold text-ink-soft md:hidden">{p.short}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="pt-28 max-sm:pt-14">
        <Marquee
          className="rotate-1 border-y-2 border-ink bg-ink text-cream"
          items={["Margherita", "Capricciosa", "Prosciutto Crudo", "Quattro Formaggi", "Picante", "Tiroli", "Caesar", "Spinaci"]}
        />
      </div>

      <section className="mx-auto max-w-7xl px-4 pt-20 max-sm:pt-14">
        <div className="flex flex-wrap items-end justify-between gap-4 max-sm:gap-2">
          <h2 className="font-display text-5xl font-extrabold leading-[0.9] sm:text-6xl">
            Posezení <span className="font-serif font-normal italic text-tomato">u nás</span>
          </h2>
          <p className="max-w-sm text-ink-soft max-sm:text-sm max-sm:font-semibold">
            {restaurant.street}, {restaurant.city} · {restaurant.hours}
          </p>
        </div>
        <div className="mt-10 grid auto-rows-[220px] gap-5 max-sm:mt-6 max-sm:auto-rows-[150px] max-sm:grid-cols-2 max-sm:gap-3 sm:grid-cols-3">
          <Photo src="/photos/interior.jpg" alt="Stůl v pizzerii" className="max-sm:col-span-2 sm:col-span-2 sm:row-span-2" />
          <Photo src="/photos/slice.jpg" alt="Kousek pizzy" />
          <Photo src="/photos/margherita.jpg" alt="Pizza Margherita" />
          <Photo src="/photos/dining.jpg" alt="Večeře s přáteli" className="sm:col-span-2" />
          <Photo src="/photos/dark-pizza.jpg" alt="Pizza na prkénku" />
        </div>
        <p className="mt-3 text-xs text-ink-soft max-sm:hidden">Ilustrační fotografie (Unsplash) – v ostré verzi nahradit fotkami provozovny.</p>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-20 text-center max-sm:pt-14">
        <p className="font-display text-4xl font-extrabold sm:text-5xl">Dostali jste chuť?</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 max-sm:grid max-sm:grid-cols-2 max-sm:gap-2">
          <Link href="/menu" className="btn btn-primary text-lg max-sm:px-3 max-sm:text-base">
            Objednat rozvoz <ArrowIcon />
          </Link>
          <Link href="/kontakt" className="btn btn-light text-lg max-sm:px-3 max-sm:text-base">
            Kontakt
          </Link>
        </div>
      </section>
    </>
  );
}

function Photo({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`group relative overflow-hidden rounded-3xl border-2 border-ink shadow-[5px_5px_0_var(--ink)] ${className}`}>
      <Image src={src} alt={alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
    </div>
  );
}
