"use client";

import { useEffect, useState } from "react";

/** "Právě otevřeno / zavřeno" – počítá se až v prohlížeči (podle místního času). */
export function OpenBadge() {
  const [state, setState] = useState<"open" | "closed" | null>(null);

  useEffect(() => {
    const check = () => {
      const h = new Date().getHours();
      setState(h >= 11 && h < 20 ? "open" : "closed");
    };
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="chip">
      <span className="relative flex h-2.5 w-2.5">
        {state === "open" && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-basil opacity-60" />}
        <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${state === "closed" ? "bg-tomato" : "bg-basil"}`} />
      </span>
      {state === "closed" ? "Teď zavřeno · objednávky od 11:00" : "Denně 11:00–20:00"}
    </span>
  );
}
