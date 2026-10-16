"use client";

import { useState } from "react";
import { ArrowIcon, CheckIcon } from "./Icons";

const topics = ["Objednávka", "Stůl / posezení", "Oslava či firemní akce", "Pochvala 🍕", "Něco jiného"];

const input =
  "w-full rounded-2xl border-2 border-ink bg-cream px-4 py-3 font-medium outline-none transition-shadow placeholder:text-ink-soft/60 focus:shadow-[4px_4px_0_var(--tomato)]";

export function ContactForm() {
  const [topic, setTopic] = useState(topics[0]);
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="card animate-pop flex min-h-[420px] flex-col items-center justify-center p-10 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full border-2 border-ink bg-basil text-cream">
          <CheckIcon className="h-8 w-8" />
        </span>
        <p className="font-display mt-6 text-4xl font-extrabold">Díky, máme to!</p>
        <p className="mt-2 max-w-xs text-ink-soft">Ozveme se co nejdřív – většinou ještě ten den. (V náhledu se zpráva nikam neodesílá.)</p>
        <button className="btn btn-light mt-6" onClick={() => setSent(false)}>
          Napsat další zprávu
        </button>
      </div>
    );
  }

  return (
    <form
      className="card space-y-5 p-6 max-sm:p-5 sm:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div>
        <p className="mb-2 text-sm font-bold">O co jde?</p>
        <div className="flex flex-wrap gap-2">
          {topics.map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => setTopic(t)}
              className={`chip transition-colors ${topic === t ? "!bg-tomato text-cream" : "hover:bg-paper-2"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-bold">Jméno</span>
          <input required className={input} placeholder="Jak vám říkat" autoComplete="name" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-bold">E-mail nebo telefon</span>
          <input required className={input} placeholder="Kam odpovědět" />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-sm font-bold">Zpráva</span>
        <textarea
          required
          rows={5}
          className={`${input} resize-none`}
          placeholder={topic === "Oslava či firemní akce" ? "Kolik vás bude, kdy a kolik pizz zhruba…" : "Napište nám…"}
        />
      </label>
      <button type="submit" className="btn btn-primary w-full text-lg sm:w-auto">
        Odeslat dotaz <ArrowIcon />
      </button>
    </form>
  );
}
