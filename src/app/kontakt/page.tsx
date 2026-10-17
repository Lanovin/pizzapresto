import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/Icons";
import { restaurant } from "@/data/menu";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Pizza Presto, Pražská 22, Mníšek pod Brdy. Telefon +420 608 364 560, info@pizzapresto.cz.",
};

const days = ["Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota", "Neděle"];

export default function KontaktPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pt-8 max-sm:pt-5">
        <h1 className="font-display text-[clamp(3.5rem,10vw,8rem)] font-extrabold leading-[0.82] max-sm:text-[3.4rem]">
          Ozvěte <span className="font-serif font-normal italic text-tomato">se.</span>
        </h1>
        <p className="mt-4 max-w-lg text-lg text-ink-soft max-sm:hidden">
          Objednávku nejrychleji vyřídíte online nebo telefonem. Na všechno ostatní je tu formulář a e-mail.
        </p>
      </section>

      {/* velké kontaktní "dlaždice" */}
      <section className="mx-auto mt-10 grid max-w-7xl gap-5 px-4 max-sm:mt-7 max-sm:gap-3 md:grid-cols-3">
        <a href={restaurant.phoneHref} className="card group bg-tomato p-7 text-cream transition-transform hover:-translate-y-1 max-sm:flex max-sm:items-center max-sm:gap-4 max-sm:p-5">
          <PhoneIcon className="h-10 w-10 transition-transform group-hover:rotate-12 max-sm:h-8 max-sm:w-8 max-sm:shrink-0" />
          <div className="min-w-0">
            <p className="eyebrow mt-6 text-cream/80 max-sm:mt-0">Zavolejte</p>
            <p className="font-display mt-1 text-[2.1rem] font-extrabold leading-none max-sm:text-[1.7rem]">608 364 560</p>
            <p className="mt-2 text-sm text-cream/80 max-sm:hidden">Objednávky i dotazy, denně 11–20</p>
          </div>
        </a>
        <a href={`mailto:${restaurant.email}`} className="card group p-7 transition-transform hover:-translate-y-1 max-sm:flex max-sm:items-center max-sm:gap-4 max-sm:p-5">
          <MailIcon className="h-10 w-10 text-tomato max-sm:h-8 max-sm:w-8 max-sm:shrink-0" />
          <div className="min-w-0">
            <p className="eyebrow mt-6 text-ink-soft max-sm:mt-0">Napište</p>
            <p className="font-display mt-1 break-all text-[1.9rem] font-extrabold leading-none max-sm:text-[1.45rem]">{restaurant.email}</p>
            <p className="mt-2 text-sm text-ink-soft max-sm:hidden">Odpovídáme obvykle do 24 hodin</p>
          </div>
        </a>
        <a href={restaurant.mapsUrl} target="_blank" rel="noreferrer" className="card group p-7 transition-transform hover:-translate-y-1 max-sm:flex max-sm:items-center max-sm:gap-4 max-sm:p-5">
          <PinIcon className="h-10 w-10 text-basil max-sm:h-8 max-sm:w-8 max-sm:shrink-0" />
          <div className="min-w-0">
            <p className="eyebrow mt-6 text-ink-soft max-sm:mt-0">Přijďte</p>
            <p className="font-display mt-1 text-[2.1rem] font-extrabold leading-none max-sm:text-[1.7rem]">{restaurant.street}</p>
            <p className="mt-2 text-sm text-ink-soft max-sm:hidden">{restaurant.city}</p>
          </div>
        </a>
      </section>

      <section className="mx-auto mt-16 grid max-w-7xl gap-10 px-4 max-sm:mt-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 className="font-display mb-5 text-4xl font-extrabold max-sm:mb-4 max-sm:text-[2rem]">Dotaz, přání, akce?</h2>
          <ContactForm />
        </div>
        <div className="space-y-6">
          <div className="receipt px-6 py-8 max-sm:px-5">
            <h2 className="font-display flex items-center gap-2 text-3xl font-extrabold">
              <ClockIcon className="h-7 w-7 text-tomato" /> Otevírací doba
            </h2>
            <p className="mt-3 flex justify-between text-lg font-bold sm:hidden">
              <span>Po–Ne</span>
              <span className="tabular-nums">11:00 – 20:00</span>
            </p>
            <dl className="mt-4 divide-y-2 divide-dashed divide-ink/20 max-sm:hidden">
              {days.map((d) => (
                <div key={d} className="flex justify-between py-2 font-semibold">
                  <dt>{d}</dt>
                  <dd className="tabular-nums">11:00 – 20:00</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="card overflow-hidden">
            <iframe
              title="Mapa – Pizza Presto"
              src="https://maps.google.com/maps?q=Pra%C5%BEsk%C3%A1%2022%2C%20Mn%C3%AD%C5%A1ek%20pod%20Brdy&z=16&output=embed"
              className="h-72 w-full grayscale-[40%] max-sm:h-56"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4 max-sm:mt-8">
        <p className="text-sm text-ink-soft max-sm:text-xs">
          Provozovatel: Michal Slaboch, Hankova 599/13, 163 00 Praha 6 – Řepy · IČO 70552967 · DIČ CZ7906270020
        </p>
      </section>
    </>
  );
}
