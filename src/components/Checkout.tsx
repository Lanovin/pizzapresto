"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { delivery, formatPrice, restaurant } from "@/data/menu";
import { CartLines, CartTotals } from "./CartLines";
import { ArrowIcon, CheckIcon, ScooterIcon } from "./Icons";
import { LogoMark } from "./Logo";

type Payment = "online" | "hotove" | "karta";

const input =
  "w-full rounded-2xl border-2 border-ink bg-cream px-4 py-3 font-medium outline-none transition-shadow placeholder:text-ink-soft/60 focus:shadow-[4px_4px_0_var(--tomato)]";

export function Checkout() {
  const { count, fulfilment, setFulfilment, subtotal, deliveryFee, clear, ready } = useCart();
  const [payment, setPayment] = useState<Payment>("online");
  const [when, setWhen] = useState<"asap" | "later">("asap");
  const [done, setDone] = useState<null | { no: string; total: number; mode: typeof fulfilment }>(null);

  if (done) return <Success {...done} />;
  if (!ready) return <div className="min-h-[60vh]" />;

  if (count === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <LogoMark className="mx-auto h-28 w-28 animate-wiggle" />
        <h1 className="font-display mt-6 text-5xl font-extrabold">Košík je prázdný</h1>
        <p className="mt-3 text-ink-soft">Nejdřív si vyberte, na co máte chuť.</p>
        <Link href="/menu" className="btn btn-primary mt-8 text-lg">
          Do menu <ArrowIcon />
        </Link>
      </div>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const no = String(1000 + Math.floor(Math.random() * 9000));
    setDone({ no, total: subtotal + deliveryFee, mode: fulfilment });
    clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <form onSubmit={submit} className="mx-auto grid max-w-7xl gap-10 px-4 pt-8 max-lg:pb-6 max-sm:gap-8 max-sm:pt-5 lg:grid-cols-[1fr_400px]">
      <div className="space-y-10 max-sm:space-y-8">
        <h1 className="font-display text-[clamp(3rem,8vw,6rem)] font-extrabold leading-[0.85] max-sm:text-[3.2rem]">
          Skoro <span className="font-serif font-normal italic text-tomato">hotovo.</span>
        </h1>

        <Step n={1} title="Jak to k vám dostaneme?">
          <div className="grid gap-4 max-sm:grid-cols-2 max-sm:gap-3 sm:grid-cols-2">
            <Choice
              checked={fulfilment === "rozvoz"}
              onClick={() => setFulfilment("rozvoz")}
              title="🛵 Rozvoz"
              text={`Do ${delivery.minutes} min · ${subtotal >= delivery.freeFrom ? "zdarma" : formatPrice(delivery.fee)}`}
            />
            <Choice
              checked={fulfilment === "vyzvednuti"}
              onClick={() => setFulfilment("vyzvednuti")}
              title="🏃 Vyzvednu si"
              text={`Za cca ${delivery.pickupMinutes} min · ${restaurant.street}`}
            />
          </div>
        </Step>

        <Step n={2} title="Kontakt">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Jméno">
              <input required name="name" autoComplete="name" className={input} placeholder="Jan Novák" />
            </Field>
            <Field label="Telefon">
              <input required name="phone" type="tel" inputMode="tel" autoComplete="tel" className={input} placeholder="+420 ..." />
            </Field>
            <Field label="E-mail (pošleme účtenku)" className="sm:col-span-2">
              <input name="email" type="email" inputMode="email" autoComplete="email" className={input} placeholder="jan@email.cz" />
            </Field>
          </div>
        </Step>

        {fulfilment === "rozvoz" && (
          <Step n={3} title="Kam to bude?">
            <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
              <Field label="Ulice a číslo">
                <input required name="street" autoComplete="street-address" className={input} placeholder="Pražská 22" />
              </Field>
              <Field label="Obec">
                <input required name="city" list="obce" autoComplete="address-level2" className={input} placeholder="Mníšek pod Brdy" />
                <datalist id="obce">
                  {delivery.zones.map((z) => (
                    <option key={z} value={z} />
                  ))}
                </datalist>
              </Field>
              <Field label="Poznámka pro kurýra" className="sm:col-span-2">
                <input name="note" className={input} placeholder="Zvonek, patro, pes na zahradě…" />
              </Field>
            </div>
          </Step>
        )}

        <Step n={fulfilment === "rozvoz" ? 4 : 3} title="Kdy?">
          <div className="flex flex-wrap items-center gap-3">
            <Pill checked={when === "asap"} onClick={() => setWhen("asap")}>
              ⚡ Co nejdřív
            </Pill>
            <Pill checked={when === "later"} onClick={() => setWhen("later")}>
              🕐 Na konkrétní čas
            </Pill>
            {when === "later" && (
              <select className={`${input} !w-auto animate-pop`} defaultValue="18:00" aria-label="Čas">
                {Array.from({ length: 17 }, (_, i) => {
                  const h = 11 + Math.floor(i / 2);
                  const t = `${h}:${i % 2 ? "30" : "00"}`;
                  return <option key={t}>{t}</option>;
                })}
              </select>
            )}
          </div>
        </Step>

        <Step n={fulfilment === "rozvoz" ? 5 : 4} title="Platba">
          <div className="grid gap-4 max-sm:gap-3 sm:grid-cols-3">
            <Choice checked={payment === "online"} onClick={() => setPayment("online")} title="💳 Online" text="Kartou / Apple & Google Pay" />
            <Choice
              checked={payment === "karta"}
              onClick={() => setPayment("karta")}
              title="📟 Kartou"
              text={fulfilment === "rozvoz" ? "u kurýra" : "na pokladně"}
            />
            <Choice
              checked={payment === "hotove"}
              onClick={() => setPayment("hotove")}
              title="💵 Hotově"
              text={fulfilment === "rozvoz" ? "kurýrovi" : "na pokladně"}
            />
          </div>
        </Step>
      </div>

      {/* telefon: tlačítko s cenou je pořád po ruce */}
      <div className="fixed inset-x-3 bottom-3 z-30 lg:hidden">
        <button type="submit" className="btn btn-primary w-full justify-between text-base animate-rise">
          <span>{payment === "online" ? "Zaplatit a objednat" : "Odeslat objednávku"}</span>
          <span className="flex items-center gap-2 tabular-nums">
            {formatPrice(subtotal + deliveryFee)} <ArrowIcon />
          </span>
        </button>
      </div>

      <aside className="max-lg:pb-16">
        <div className="sticky top-28">
          <div className="receipt px-6 py-9">
            <p className="eyebrow text-center text-tomato">Účtenka</p>
            <h2 className="font-display mt-1 text-center text-3xl font-extrabold">Shrnutí</h2>
            <div className="my-4 border-t-2 border-dashed border-ink/30" />
            <div className="max-h-[40vh] overflow-y-auto pr-1">
              <CartLines compact />
            </div>
            <div className="mt-4">
              <CartTotals />
            </div>
            <button type="submit" className="btn btn-primary mt-6 w-full text-lg">
              {payment === "online" ? "Zaplatit a objednat" : "Odeslat objednávku"} <ArrowIcon />
            </button>
            <p className="mt-3 text-center text-xs text-ink-soft">Náhled webu – objednávka se nikam neodešle.</p>
          </div>
        </div>
      </aside>
    </form>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="animate-rise">
      <h2 className="font-display mb-4 flex items-center gap-3 text-3xl font-extrabold max-sm:mb-3 max-sm:text-[1.65rem] max-sm:leading-tight">
        <span className="grid h-10 w-10 shrink-0 max-sm:h-9 max-sm:w-9 max-sm:text-lg place-items-center rounded-full border-2 border-ink bg-tomato text-xl text-cream">
          {n}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-bold">{label}</span>
      {children}
    </label>
  );
}

function Choice({ checked, onClick, title, text }: { checked: boolean; onClick: () => void; title: string; text: string }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      onClick={onClick}
      className={`relative rounded-2xl border-2 border-ink p-4 text-left transition-all max-sm:p-3 ${
        checked ? "bg-mustard shadow-[4px_4px_0_var(--ink)] -translate-x-0.5 -translate-y-0.5" : "bg-cream hover:bg-paper-2"
      }`}
    >
      <span className="font-display block text-xl font-extrabold max-sm:pr-6 max-sm:text-lg max-sm:leading-tight">{title}</span>
      <span className="mt-1 block text-sm text-ink-soft max-sm:text-[0.8rem] max-sm:leading-snug">{text}</span>
      {checked && (
        <span className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-ink text-cream max-sm:right-2 max-sm:top-2 max-sm:h-5 max-sm:w-5">
          <CheckIcon className="h-4 w-4" />
        </span>
      )}
    </button>
  );
}

function Pill({ checked, onClick, children }: { checked: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      onClick={onClick}
      className={`chip !px-4 !py-2.5 !text-sm ${checked ? "!bg-ink text-cream" : "hover:bg-paper-2"}`}
    >
      {children}
    </button>
  );
}

/** Potvrzení + simulované sledování objednávky. */
function Success({ no, total, mode }: { no: string; total: number; mode: "rozvoz" | "vyzvednuti" }) {
  const steps =
    mode === "rozvoz"
      ? ["Přijato", "Válíme těsto", "V peci", "Na cestě", "U vás!"]
      : ["Přijato", "Válíme těsto", "V peci", "Připraveno k vyzvednutí"];
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (stage >= steps.length - 1) return;
    const t = setTimeout(() => setStage((s) => s + 1), 2600);
    return () => clearTimeout(t);
  }, [stage, steps.length]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <span className="chip bg-basil text-cream animate-pop">
        <CheckIcon className="h-4 w-4" /> Objednávka č. {no} přijata
      </span>
      <h1 className="font-display mt-6 text-[clamp(3rem,9vw,6.5rem)] font-extrabold leading-[0.85]">
        Grazie!
        <br />
        <span className="font-serif font-normal italic text-tomato">{mode === "rozvoz" ? "Už to jede." : "Už to peče."}</span>
      </h1>
      <p className="mx-auto mt-6 max-w-md text-lg text-ink-soft">
        {mode === "rozvoz"
          ? `Kurýr dorazí přibližně za ${delivery.minutes} minut. Celkem ${formatPrice(total)}.`
          : `Pizzu si vyzvedněte za cca ${delivery.pickupMinutes} minut na adrese ${restaurant.street}. Celkem ${formatPrice(total)}.`}
      </p>

      <div className="card mt-12 p-6 sm:p-8">
        <div className="relative h-16 overflow-hidden">
          <div className="absolute inset-x-0 top-1/2 border-t-2 border-dashed border-ink/30" />
          <div
            className="absolute top-1/2 -translate-y-1/2 transition-[left] duration-[2400ms] ease-in-out"
            style={{ left: `calc(${(stage / (steps.length - 1)) * 100}% - ${(stage / (steps.length - 1)) * 56}px)` }}
          >
            <span className="grid h-14 w-14 place-items-center rounded-full border-2 border-ink bg-tomato text-cream">
              <ScooterIcon className="h-8 w-8" />
            </span>
          </div>
        </div>
        <ol className="mt-4 flex justify-between gap-2 text-left text-xs font-bold sm:text-sm">
          {steps.map((s, i) => (
            <li key={s} className={`flex-1 transition-colors ${i <= stage ? "text-ink" : "text-ink/30"} ${i === steps.length - 1 ? "text-right" : ""}`}>
              {i <= stage ? "● " : "○ "}
              {s}
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-light">
          Zpět na úvod
        </Link>
        <a href={restaurant.phoneHref} className="btn btn-dark">
          Něco není v pořádku? Zavolejte
        </a>
      </div>
    </div>
  );
}
