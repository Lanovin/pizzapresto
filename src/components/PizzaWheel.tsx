"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { pizzas, wheelImage, formatPrice, type Product } from "@/data/menu";
import { useCart } from "@/lib/cart";
import { ArrowIcon, ChiliIcon, LeafIcon, ScooterIcon } from "./Icons";

const N = 8;
const VB = 680;
const C = VB / 2;
const R_PLATE = 304;
const R_CRUST = 282;
const R_TOP = 252;
const STEP = 360 / N;
const DEG_PER_SEC = 4;

const rad = (d: number) => (d * Math.PI) / 180;
const pt = (r: number, deg: number) => [C + r * Math.cos(rad(deg)), C + r * Math.sin(rad(deg))] as const;

function sectorPath(r: number, a0: number, a1: number) {
  const [x0, y0] = pt(r, a0);
  const [x1, y1] = pt(r, a1);
  return `M${C},${C} L${x0},${y0} A${r},${r} 0 0 1 ${x1},${y1} Z`;
}

function ringPath(r0: number, r1: number, a0: number, a1: number) {
  const [ax, ay] = pt(r0, a0);
  const [bx, by] = pt(r1, a0);
  const [cx, cy] = pt(r1, a1);
  const [dx, dy] = pt(r0, a1);
  return `M${ax},${ay} L${bx},${by} A${r1},${r1} 0 0 1 ${cx},${cy} L${dx},${dy} A${r0},${r0} 0 0 0 ${ax},${ay} Z`;
}

/** Deterministické zamíchání podle "semínka" – stejný den = stejné kolo. */
function pickForSeed(seed: number): Product[] {
  let s = seed % 2147483647 || 1;
  const rand = () => (s = (s * 16807) % 2147483647) / 2147483647;
  const arr = [...pizzas];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, N);
}

const todaySeed = () => {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
};

export function PizzaWheel() {
  const { add } = useCart();
  const [seed, setSeed] = useState(20261016);
  const [dayLabel, setDayLabel] = useState("Dnešní kolo");
  const [active, setActive] = useState<number | null>(null);
  const [cardPos, setCardPos] = useState<{ left: number; y: number; angle: number } | null>(null);
  const [shuffling, setShuffling] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const spinRef = useRef<SVGGElement>(null);
  const textRef = useRef<SVGGElement>(null);
  const angle = useRef(0);
  const paused = useRef(false);
  // typ ukazatele posledního stisku – dotyk nesmí spustit focus+click (otevřít a hned zavřít)
  const lastPointer = useRef<string | null>(null);

  const slices = useMemo(() => pickForSeed(seed), [seed]);

  // datum až v prohlížeči – server i první render mají stejné kolo (bez hydration mismatch)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSeed(todaySeed());
    setDayLabel(
      `Dnešní kolo · ${new Date().toLocaleDateString("cs-CZ", { weekday: "long", day: "numeric", month: "long" })}`,
    );
  }, []);

  // pomalé otáčení pizzy (bez Reactu, rovnou atribut)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!paused.current) {
        angle.current = (angle.current + dt * DEG_PER_SEC) % 360;
        spinRef.current?.setAttribute("transform", `rotate(${angle.current} ${C} ${C})`);
        textRef.current?.setAttribute("transform", `rotate(${-angle.current * 0.6} ${C} ${C})`);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const activate = useCallback((i: number | null) => {
    setActive(i);
    paused.current = i !== null;
    if (i === null || !boxRef.current) {
      setCardPos(null);
      return;
    }
    const mid = -90 + i * STEP + STEP / 2 + angle.current;
    const box = boxRef.current.getBoundingClientRect();
    const k = box.width / VB;
    const [ax, ay] = pt(R_PLATE + 22, mid);
    const cardW = 270;
    const wanted = Math.cos(rad(mid)) >= 0 ? ax * k + 8 : ax * k - cardW - 8;
    // kartička zůstane u kousku, jen ji přichytíme k okraji okna
    const left = Math.min(Math.max(wanted, 12 - box.left), window.innerWidth - 12 - cardW - box.left);
    setCardPos({ left, y: Math.min(Math.max(ay * k, 90), box.height - 90), angle: mid });
  }, []);

  const shuffle = () => {
    activate(null);
    setShuffling(true);
    setTimeout(() => {
      setSeed((s) => s + 7919);
      setShuffling(false);
    }, 320);
  };

  const onMove = (e: React.PointerEvent) => {
    const b = boxRef.current?.getBoundingClientRect();
    if (!b) return;
    boxRef.current!.style.setProperty("--mx", String((e.clientX - b.left) / b.width - 0.5));
    boxRef.current!.style.setProperty("--my", String((e.clientY - b.top) / b.height - 0.5));
  };

  const activeProduct = active !== null ? slices[active] : null;

  return (
    <div className="relative">
      <div className="mb-3 flex flex-wrap items-center justify-center gap-2 lg:justify-end">
        <span className="chip bg-mustard">{dayLabel}</span>
        <button onClick={shuffle} className="chip hover:bg-paper-2" title="Zamíchat jiné kousky">
          🎲 Zamíchat
        </button>
      </div>

      <div
        ref={boxRef}
        className="relative mx-auto aspect-square w-full max-w-[560px] [--mx:0] [--my:0]"
        onPointerMove={onMove}
        // na dotykovém displeji přijde "leave" hned po zvednutí prstu – kartička musí zůstat
        onPointerLeave={(e) => e.pointerType === "mouse" && activate(null)}
      >
        {/* plovoucí ingredience – lehká paralaxa za myší */}
        <Floating className="left-[-4%] top-[8%] h-12 w-12" depth={-30} rotate={-25}>
          <LeafIcon className="h-full w-full" />
        </Floating>
        <Floating className="right-[2%] top-[-2%] h-10 w-10" depth={40} rotate={20}>
          <ChiliIcon className="h-full w-full" />
        </Floating>
        <Floating className="bottom-[4%] left-[2%] h-14 w-14" depth={50} rotate={0}>
          <TomatoSlice />
        </Floating>
        <Floating className="bottom-[-3%] right-[10%] h-11 w-11" depth={-40} rotate={60}>
          <LeafIcon className="h-full w-full" />
        </Floating>

        <svg
          viewBox={`0 0 ${VB} ${VB}`}
          className={`relative h-full w-full overflow-visible transition-transform duration-300 ${shuffling ? "scale-90 rotate-12 opacity-60" : ""}`}
          role="img"
          aria-label="Dnešní pizza složená z osmi různých kousků"
        >
          <defs>
            <radialGradient id="crust" gradientUnits="userSpaceOnUse" cx={C} cy={C} r={R_CRUST}>
              <stop offset="0.86" stopColor="#f3c27a" />
              <stop offset="0.92" stopColor="#e09a48" />
              <stop offset="0.975" stopColor="#b56a2c" />
              <stop offset="1" stopColor="#7c421b" />
            </radialGradient>
            <pattern id="char" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="4" cy="6" r="2.4" fill="#3a1d0c" opacity=".45" />
              <circle cx="15" cy="15" r="1.6" fill="#3a1d0c" opacity=".35" />
              <circle cx="18" cy="4" r="1" fill="#3a1d0c" opacity=".4" />
            </pattern>
            {slices.map((p, i) => (
              <pattern
                key={p.id + i}
                id={`img-${i}`}
                patternUnits="userSpaceOnUse"
                x={C - R_TOP}
                y={C - R_TOP}
                width={R_TOP * 2}
                height={R_TOP * 2}
                // ostrý vodorovný pruh fotky natočíme podél osy kousku
                patternTransform={`rotate(${-90 + i * STEP + STEP / 2} ${C} ${C})`}
              >
                <image
                  href={wheelImage(p)}
                  width={R_TOP * 2}
                  height={R_TOP * 2}
                  preserveAspectRatio="xMidYMid slice"
                  style={{ filter: "saturate(1.2) contrast(1.06)" }}
                />
              </pattern>
            ))}
            <path id="textCircle" d={`M ${C} ${C} m -322 0 a 322 322 0 1 1 644 0 a 322 322 0 1 1 -644 0`} />
          </defs>

          {/* talíř se "samolepkovým" stínem */}
          <circle cx={C + 10} cy={C + 12} r={R_PLATE} fill="var(--ink)" />
          <circle cx={C} cy={C} r={R_PLATE} fill="var(--cream)" stroke="var(--ink)" strokeWidth="4" />
          <circle cx={C} cy={C} r={R_PLATE - 12} fill="none" stroke="var(--ink)" strokeOpacity=".12" strokeWidth="2" strokeDasharray="2 10" />

          <g ref={textRef}>
            <text className="font-display" fontSize="16" fontWeight="800" fill="var(--ink)">
              <textPath href="#textCircle" textLength={Math.round(2 * Math.PI * 322) - 12} lengthAdjust="spacing">
                {"DNEŠNÍ KOLO · 8 KOUSKŮ · 8 CHUTÍ · KAŽDÝ DEN JINAK · ROZVOZ AŽ KE DVEŘÍM · ".repeat(2)}
              </textPath>
            </text>
          </g>

          <g ref={spinRef}>
            {slices.map((p, i) => {
              const a0 = -90 + i * STEP;
              const a1 = a0 + STEP;
              const mid = a0 + STEP / 2;
              const isActive = active === i;
              const dx = isActive ? Math.cos(rad(mid)) * 28 : 0;
              const dy = isActive ? Math.sin(rad(mid)) * 28 : 0;
              return (
                <g
                  key={p.id + i}
                  className="cursor-pointer outline-none"
                  style={{
                    transform: `translate(${dx}px, ${dy}px)`,
                    transition: "transform .45s cubic-bezier(.3,1.6,.5,1), opacity .3s, filter .3s",
                    opacity: active !== null && !isActive ? 0.55 : 1,
                    filter: isActive ? "drop-shadow(0 18px 14px rgba(31,23,18,.45))" : "none",
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`${p.name}, ${formatPrice(p.price)}`}
                  onPointerEnter={(e) => e.pointerType === "mouse" && activate(i)}
                  onPointerDown={(e) => (lastPointer.current = e.pointerType)}
                  onClick={() => {
                    const touch = lastPointer.current !== null && lastPointer.current !== "mouse";
                    lastPointer.current = null;
                    activate(touch ? i : active === i ? null : i);
                  }}
                  onFocus={() => {
                    if (lastPointer.current === null || lastPointer.current === "mouse") activate(i);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") add(p.id, "32", e.currentTarget as unknown as HTMLElement);
                  }}
                >
                  <path d={sectorPath(R_TOP + 2, a0, a1)} fill={`url(#img-${i})`} />
                  <path d={ringPath(R_TOP - 6, R_CRUST, a0, a1)} fill="url(#crust)" />
                  <path d={ringPath(R_TOP - 2, R_CRUST - 3, a0, a1)} fill="url(#char)" />
                  <path d={sectorPath(R_CRUST, a0, a1)} fill="none" stroke="#4a2810" strokeOpacity=".55" strokeWidth="2" strokeLinejoin="round" />
                </g>
              );
            })}
          </g>

          {/* vodicí linka ke kartičce */}
          {cardPos && activeProduct && (
            <g className="hidden lg:block" pointerEvents="none">
              {(() => {
                const [x0, y0] = pt(170, cardPos.angle);
                const [x1, y1] = pt(R_PLATE + 22, cardPos.angle);
                return (
                  <>
                    <circle cx={x0} cy={y0} r="7" fill="var(--cream)" stroke="var(--ink)" strokeWidth="3" />
                    <line x1={x0} y1={y0} x2={x1} y2={y1} stroke="var(--ink)" strokeWidth="3" strokeDasharray="1 7" strokeLinecap="round" />
                  </>
                );
              })()}
            </g>
          )}
        </svg>

        {/* plovoucí kartička vedle kousku (desktop) */}
        {cardPos && activeProduct && (
          <div
            className="pointer-events-auto absolute z-10 hidden w-[270px] lg:block"
            style={{
              left: cardPos.left,
              top: cardPos.y,
              transform: "translateY(-50%)",
            }}
            onPointerEnter={() => (paused.current = true)}
          >
            <SliceCard key={activeProduct.id} product={activeProduct} onOrder={(el) => add(activeProduct.id, "32", el)} />
          </div>
        )}
      </div>

      {/* mobil / tablet: kartička pod pizzou */}
      <div className="mx-auto mt-6 max-w-sm lg:hidden">
        {activeProduct ? (
          <SliceCard key={activeProduct.id} product={activeProduct} onOrder={(el) => add(activeProduct.id, "32", el)} />
        ) : (
          <p className="text-center text-sm font-semibold text-ink-soft">👆 Klepněte na kousek a uvidíte, co je zač</p>
        )}
      </div>
      <p className="mt-4 hidden text-center text-sm font-semibold text-ink-soft lg:block">
        Najeďte myší na kousek – každý je z jiné pizzy
      </p>
    </div>
  );
}

function SliceCard({ product, onOrder }: { product: Product; onOrder: (el: HTMLElement) => void }) {
  return (
    <div className="card animate-pop p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow text-tomato">Kousek z pizzy</p>
          <p className="font-display text-[1.7rem] font-extrabold leading-none">{product.name}</p>
        </div>
        <span className="font-display shrink-0 rounded-full bg-mustard px-2.5 py-1 text-lg font-extrabold border-2 border-ink">
          {product.price},-
        </span>
      </div>
      <p className="mt-2 text-sm leading-snug text-ink-soft">{product.desc}</p>
      <p className="mt-1 text-xs font-semibold text-ink-soft">
        ø 32 cm · malá ø 24 cm za {product.priceSmall} Kč
      </p>
      <div className="mt-3 flex gap-2">
        <button className="btn btn-primary btn-sm flex-1" onClick={(e) => onOrder(e.currentTarget)}>
          <ScooterIcon className="h-4 w-4" /> Objednat domů
        </button>
        <Link href={`/menu#${product.id}`} className="btn btn-light btn-sm" aria-label="Detail v menu">
          <ArrowIcon className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function Floating({
  children,
  className,
  depth,
  rotate,
}: {
  children: React.ReactNode;
  className: string;
  depth: number;
  rotate: number;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute z-0 transition-transform duration-500 ease-out ${className}`}
      style={{ transform: `translate(calc(var(--mx) * ${depth}px), calc(var(--my) * ${depth}px)) rotate(${rotate}deg)` }}
    >
      {children}
    </div>
  );
}

function TomatoSlice() {
  return (
    <svg viewBox="0 0 40 40" className="h-full w-full">
      <circle cx="20" cy="20" r="17" fill="var(--tomato)" stroke="var(--ink)" strokeWidth="2" />
      <circle cx="20" cy="20" r="11" fill="#f26b4f" />
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse
          key={a}
          cx={20 + 6 * Math.cos(rad(a))}
          cy={20 + 6 * Math.sin(rad(a))}
          rx="1.6"
          ry="2.6"
          fill="#ffe3a8"
          transform={`rotate(${a + 90} ${20 + 6 * Math.cos(rad(a))} ${20 + 6 * Math.sin(rad(a))})`}
        />
      ))}
    </svg>
  );
}
