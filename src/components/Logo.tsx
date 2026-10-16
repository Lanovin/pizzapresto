/** Logo: pizza s vykrojeným kouskem + "rychlostní" čáry (presto = rychle). */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <g stroke="var(--ink)" strokeWidth="3" strokeLinecap="round">
        <line x1="2" y1="24" x2="12" y2="24" />
        <line x1="0" y1="32" x2="9" y2="32" />
        <line x1="3" y1="40" x2="12" y2="40" />
      </g>
      <path d="M38 32 L60 20 A24 24 0 1 0 60 44 Z" fill="var(--crust)" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" />
      <path d="M38 32 L56 22.5 A20 20 0 1 0 56 41.5 Z" fill="var(--tomato)" />
      <circle cx="33" cy="22" r="3.2" fill="var(--cream)" />
      <circle cx="27" cy="36" r="3.2" fill="var(--cream)" />
      <circle cx="38" cy="43" r="2.6" fill="var(--cream)" />
      <circle cx="24" cy="26" r="1.8" fill="var(--basil)" />
      <circle cx="44" cy="38" r="1.8" fill="var(--basil)" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-2">
      <LogoMark className="h-10 w-10 shrink-0" />
      <span className="leading-none">
        <span className="font-serif block text-[1.05rem] italic text-ink-soft">pizza</span>
        <span className="font-display block text-[1.6rem] font-extrabold uppercase tracking-tight -mt-1">Presto</span>
      </span>
    </span>
  );
}
