import Image from "next/image";
import Link from "next/link";
import { PizzaWheel } from "@/components/PizzaWheel";
import { Marquee } from "@/components/Marquee";
import { CaesarFeature } from "@/components/CaesarFeature";
import { ProductCard } from "@/components/ProductCard";
import { ArrowIcon, ChairIcon, ClockIcon, PhoneIcon, PinIcon, ScooterIcon } from "@/components/Icons";
import { pizzas, delivery, restaurant } from "@/data/menu";

const favourites = pizzas.filter((p) => p.tags?.includes("oblibene"));

export default function Home() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-8 max-sm:gap-8 max-sm:pb-10 max-sm:pt-5 lg:grid-cols-[1fr_1.05fr] lg:pt-12">
          <div className="animate-rise relative z-10">
            <h1 className="font-display text-[clamp(4rem,11vw,9.5rem)] font-extrabold leading-[0.8] max-sm:text-[clamp(3.6rem,19vw,5rem)]">
              Pizza,
              <br />
              <span className="font-serif font-normal italic text-tomato">presto!</span>
            </h1>
            <p className="mt-9 max-w-md text-xl font-semibold leading-snug max-sm:mt-5 max-sm:text-lg">
              Horká z pece, rychle až ke dveřím.
              <span className="max-sm:hidden"> Rozvážíme po Mníšku pod Brdy a okolí.</span>
            </p>
            <p className="mt-3 max-w-md text-ink-soft max-sm:hidden">
              A když se vám nechce čekat doma, sedněte si k nám na Pražskou 22 – pizza je na stole dřív, než dopijete první
              pivo.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 max-sm:mt-6 max-sm:flex-nowrap">
              <Link href="/menu" className="btn btn-primary text-lg max-sm:flex-1">
                <ScooterIcon /> Objednat rozvoz
              </Link>
              <a href={restaurant.phoneHref} className="btn btn-light text-lg max-sm:px-4" aria-label={`Zavolat ${restaurant.phone}`}>
                <PhoneIcon /> <span className="max-sm:hidden">608 364 560</span>
              </a>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-3 max-sm:mt-6 max-sm:gap-2">
              {[
                [`${delivery.minutes}`, "min rozvoz"],
                ["ø 32/24", "cm pizzy"],
                ["od 130", "Kč za pizzu"],
              ].map(([big, small]) => (
                <div key={small} className="border-l-4 border-tomato pl-3 max-sm:rounded-xl max-sm:border-2 max-sm:border-ink max-sm:bg-cream max-sm:px-2 max-sm:py-2 max-sm:text-center max-sm:shadow-[2px_2px_0_var(--ink)]">
                  <dt className="font-display text-2xl font-extrabold leading-none max-sm:text-xl">{big}</dt>
                  <dd className="mt-1 text-xs font-semibold uppercase tracking-wider text-ink-soft max-sm:text-[0.62rem] max-sm:tracking-wide">{small}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <PizzaWheel />
          </div>
        </div>
      </section>

      <Marquee
        className="-rotate-1 border-y-2 border-ink bg-tomato text-cream"
        items={["Rozvoz až ke dveřím", "Pizza z pece", "ø 32 i ø 24 cm", "Novinka: Pizza Caesar", "Denně 11–20", "Mníšek pod Brdy"]}
      />

      {/* ================= TŘI ZPŮSOBY ================= */}
      <section className="mx-auto max-w-7xl px-4 pt-24 max-sm:pt-16">
        <div className="flex flex-wrap items-end justify-between gap-6 max-sm:gap-3">
          <h2 className="font-display max-w-2xl text-5xl font-extrabold leading-[0.9] sm:text-7xl">
            Jak chcete <span className="font-serif font-normal italic text-tomato">jíst?</span>
          </h2>
          <p className="max-w-sm text-ink-soft max-sm:hidden">Hlavně rozvážíme. Ale vyzvednout si můžete i sami, nebo si u nás rovnou sedněte.</p>
        </div>

        <div className="reveal mt-10 grid gap-5 max-sm:mt-6 max-sm:grid-cols-2 max-sm:gap-3 md:grid-cols-[1.4fr_1fr_1fr]">
          <Link href="/menu" className="card group relative overflow-hidden bg-tomato p-7 text-cream transition-transform hover:-translate-y-1 max-sm:col-span-2 max-sm:p-5">
            <span className="chip bg-mustard text-ink">Nejčastější volba</span>
            <ScooterIcon className="mt-8 h-14 w-14 transition-transform duration-500 group-hover:translate-x-4 max-sm:absolute max-sm:right-5 max-sm:top-4 max-sm:mt-0 max-sm:h-12 max-sm:w-12" />
            <h3 className="font-display mt-4 text-5xl font-extrabold max-sm:text-4xl">Rozvoz</h3>
            <p className="mt-2 max-w-xs text-cream/90 max-sm:hidden">
              Objednáte online, zaplatíte kartou nebo při převzetí. Doveze kurýr za {delivery.minutes} minut. Nad {delivery.freeFrom}{" "}
              Kč zdarma.
            </p>
            <p className="mt-1 font-semibold text-cream/90 sm:hidden">
              {delivery.minutes} min · od {delivery.freeFrom} Kč zdarma
            </p>
            <span className="mt-6 inline-flex items-center gap-2 font-bold underline underline-offset-4 max-sm:mt-4 max-sm:rounded-full max-sm:border-2 max-sm:border-ink max-sm:bg-cream max-sm:px-4 max-sm:py-2.5 max-sm:text-ink max-sm:no-underline max-sm:shadow-[3px_3px_0_var(--ink)]">
              Objednat rozvoz <ArrowIcon className="h-4 w-4" />
            </span>
          </Link>
          <Link href="/menu" className="card group p-7 transition-transform hover:-translate-y-1 max-sm:p-4 max-sm:active:translate-x-0.5 max-sm:active:translate-y-0.5">
            <ClockIcon className="h-12 w-12 text-tomato max-sm:h-9 max-sm:w-9" />
            <div>
              <h3 className="font-display mt-4 text-4xl font-extrabold max-sm:mt-2 max-sm:text-[1.7rem]">S sebou</h3>
              <p className="mt-2 text-ink-soft max-sm:hidden">
                Objednejte online a za cca {delivery.pickupMinutes} minut si pizzu vyzvedněte na Pražské 22. Pošleme vám zprávu,
                až bude hotovo.
              </p>
              <p className="mt-0.5 text-sm font-semibold text-ink-soft sm:hidden">hotovo za ~{delivery.pickupMinutes} min</p>
            </div>
          </Link>
          <Link href="/o-nas" className="card group p-7 transition-transform hover:-translate-y-1 max-sm:p-4 max-sm:active:translate-x-0.5 max-sm:active:translate-y-0.5">
            <ChairIcon className="h-12 w-12 text-basil max-sm:h-9 max-sm:w-9" />
            <div>
              <h3 className="font-display mt-4 text-4xl font-extrabold max-sm:mt-2 max-sm:text-[1.7rem]">Posezení</h3>
              <p className="mt-2 text-ink-soft max-sm:hidden">
                Stůl, vychlazené pivo a pizza rovnou z pece. Otevřeno denně, stačí přijít.
              </p>
              <p className="mt-0.5 text-sm font-semibold text-ink-soft sm:hidden">denně 11–20</p>
            </div>
          </Link>
        </div>
      </section>

      {/* ================= JAK OBJEDNAT ================= */}
      <section className="mx-auto max-w-7xl px-4 pt-24 max-sm:pt-16">
        <div className="receipt reveal px-6 py-14 max-sm:px-4 max-sm:py-9 sm:px-12">
          <p className="eyebrow text-center text-tomato">Objednávka za minutu</p>
          <h2 className="font-display mt-2 text-center text-5xl font-extrabold max-sm:text-[2rem] sm:text-6xl">Tři kroky k pizze</h2>
          <ol className="mt-12 grid gap-10 max-md:mt-6 max-md:gap-2 md:grid-cols-3 max-md:grid-cols-3">
            {[
              ["Vyberte", "Pizza ø 32 nebo ø 24 cm, k tomu polévka, salát, burger nebo pivo. Vše na jedné stránce.", "pizzu a pití"],
              ["Zaplaťte", "Kartou online, nebo hotově či kartou při převzetí. Bez registrace.", "bez registrace"],
              ["Dobrou chuť!", `Kurýr přiveze horkou krabici až ke dveřím. Rozvoz nad ${delivery.freeFrom} Kč máte zdarma.`, "až ke dveřím"],
            ].map(([title, text, short], i) => (
              <li key={title} className="relative text-center">
                <span className="font-display block text-[7rem] font-extrabold leading-none text-tomato [-webkit-text-stroke:2px_var(--ink)] max-md:text-[3.6rem] max-md:[-webkit-text-stroke:1.5px_var(--ink)]">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display mt-2 text-3xl font-extrabold max-md:mt-0 max-md:text-[1.15rem] max-md:leading-tight">{title}</h3>
                  <p className="mx-auto mt-2 max-w-xs text-ink-soft max-md:hidden">{text}</p>
                  <p className="mt-0.5 text-xs font-semibold text-ink-soft md:hidden">{short}</p>
                </div>
                {i < 2 && (
                  <ArrowIcon className="absolute -right-8 top-14 hidden h-8 w-8 text-ink/30 md:block" />
                )}
              </li>
            ))}
          </ol>
          <div className="mt-12 text-center max-md:mt-8">
            <Link href="/menu" className="btn btn-primary text-lg max-sm:w-full">
              Začít vybírat <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= OBLÍBENÉ ================= */}
      <section className="pt-24 max-sm:pt-14">
        <div className="mx-auto flex max-w-7xl items-end justify-between gap-4 px-4 sm:flex-wrap">
          <h2 className="font-display text-5xl font-extrabold leading-[0.9] max-sm:text-[2.4rem] sm:text-7xl">
            Nejčastěji <span className="font-serif font-normal italic text-tomato">v krabici</span>
          </h2>
          <Link href="/menu" className="btn btn-light max-sm:px-3 max-sm:py-2 max-sm:text-sm">
            Celé menu ({pizzas.length}) <ArrowIcon />
          </Link>
        </div>
        <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 max-sm:mt-7 max-sm:scroll-px-4 max-sm:gap-4 sm:px-[max(1rem,calc((100vw-80rem)/2+1rem))]">
          {favourites.map((p) => (
            <div key={p.id} className="w-[300px] shrink-0 snap-start max-sm:w-[78vw] sm:w-[340px]">
              <ProductCard product={p} layout="card" />
            </div>
          ))}
        </div>
      </section>

      <div className="pt-24 max-sm:pt-16">
        <CaesarFeature />
      </div>

      {/* ================= POSEZENÍ ================= */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 pt-24 max-sm:gap-8 max-sm:pt-16 lg:grid-cols-2">
        <div className="reveal relative h-[420px] max-sm:h-[300px] sm:h-[520px]">
          <div className="absolute left-0 top-0 h-[75%] w-[72%] -rotate-2 overflow-hidden rounded-3xl border-2 border-ink shadow-[6px_6px_0_var(--ink)]">
            <Image src="/photos/interior.jpg" alt="Posezení v pizzerii" fill sizes="(min-width:1024px) 30vw, 70vw" className="object-cover" />
          </div>
          <div className="absolute bottom-0 right-0 h-[58%] w-[56%] rotate-3 overflow-hidden rounded-3xl border-2 border-ink shadow-[6px_6px_0_var(--ink)]">
            <Image src="/photos/oven.jpg" alt="Pizza před pecí" fill sizes="(min-width:1024px) 25vw, 55vw" className="object-cover" />
          </div>
          <span className="chip absolute bottom-[38%] left-[6%] rotate-[-6deg] bg-mustard px-4 py-2 text-base shadow-[3px_3px_0_var(--ink)]">
            Přijďte si sednout ☺
          </span>
        </div>
        <div>
          <p className="eyebrow text-tomato">Nejen rozvoz</p>
          <h2 className="font-display mt-3 text-5xl font-extrabold leading-[0.9] max-sm:text-[2.6rem] sm:text-7xl">
            Sednout si
            <br />
            <span className="font-serif font-normal italic text-tomato">se dá taky.</span>
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft max-sm:hidden">
            Malá pizzerie přímo v Mníšku. Pizzu nejlíp ochutnáte tam, kde vzniká – pár vteřin z pece, ještě než stihne vychladnout
            v krabici. Přijďte na oběd, s rodinou nebo jen na jedno.
          </p>
          <ul className="mt-8 space-y-3 font-semibold max-sm:mt-5 max-sm:grid max-sm:grid-cols-2 max-sm:gap-2 max-sm:space-y-0">
            <li className="flex items-center gap-3 max-sm:flex-col max-sm:items-start max-sm:gap-1 max-sm:rounded-2xl max-sm:border-2 max-sm:border-ink max-sm:bg-cream max-sm:p-3 max-sm:text-sm max-sm:leading-tight">
              <PinIcon className="h-5 w-5 shrink-0 text-tomato" />
              <span>{restaurant.street}<span className="max-sm:hidden">, {restaurant.city}</span></span>
            </li>
            <li className="flex items-center gap-3 max-sm:flex-col max-sm:items-start max-sm:gap-1 max-sm:rounded-2xl max-sm:border-2 max-sm:border-ink max-sm:bg-cream max-sm:p-3 max-sm:text-sm max-sm:leading-tight">
              <ClockIcon className="h-5 w-5 shrink-0 text-tomato" /> {restaurant.hours}
            </li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3 max-sm:mt-5 max-sm:grid max-sm:grid-cols-2">
            <Link href="/o-nas" className="btn btn-dark">
              Poznejte nás
            </Link>
            <a href={restaurant.mapsUrl} target="_blank" rel="noreferrer" className="btn btn-light">
              Navigovat <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      {/* ================= KAM VOZÍME ================= */}
      <section className="mx-auto max-w-7xl px-4 pt-24 max-sm:pt-16">
        <div className="card reveal relative overflow-hidden p-8 max-sm:p-4 sm:p-12">
          <div className="grid items-center gap-10 max-sm:gap-5 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="eyebrow text-tomato">Kam vozíme</p>
              <h2 className="font-display mt-3 text-5xl font-extrabold leading-[0.9] max-lg:text-balance max-sm:text-[2rem]">Mníšek a okolí do ~10 km</h2>
              <p className="mt-3 flex gap-2 sm:hidden">
                <span className="chip">Rozvoz {delivery.fee} Kč</span>
                <span className="chip bg-mustard">od {delivery.freeFrom} Kč zdarma</span>
              </p>
              <p className="mt-4 text-ink-soft max-sm:hidden">
                Rozvoz {delivery.fee} Kč, při objednávce nad {delivery.freeFrom} Kč zdarma. Nevidíte svou obec? Zavolejte, domluvíme
                se.
              </p>
              <a href={restaurant.phoneHref} className="btn btn-primary mt-6 max-sm:mt-4 max-sm:w-full">
                <PhoneIcon /> <span className="sm:hidden">Nevidíte obec? </span>{restaurant.phone}
              </a>
            </div>
            <DeliveryRadar />
          </div>
        </div>
      </section>
    </>
  );
}

function DeliveryRadar() {
  const spots = delivery.zones.slice(1);
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]">
      {[1, 0.72, 0.44].map((s) => (
        <div
          key={s}
          className="absolute rounded-full border-2 border-dashed border-ink/25"
          style={{ inset: `${(1 - s) * 50}%` }}
        />
      ))}
      <div className="absolute inset-0 animate-[spin_9s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,rgba(226,59,31,.25)_360deg)]" />
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <span className="chip bg-tomato px-4 py-2 text-cream shadow-[3px_3px_0_var(--ink)]">🍕 Mníšek</span>
      </div>
      {spots.map((name, i) => {
        const a = (i / spots.length) * Math.PI * 2 - Math.PI / 2;
        const r = i % 2 ? 30 : 42;
        return (
          <span
            key={name}
            className="chip absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap !text-[0.72rem]"
            style={{ left: `${50 + r * Math.cos(a)}%`, top: `${50 + r * Math.sin(a)}%` }}
          >
            {name}
          </span>
        );
      })}
    </div>
  );
}
