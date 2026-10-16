export function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  const track = (hidden?: boolean) => (
    <div className="marquee__track" aria-hidden={hidden}>
      {items.map((t, i) => (
        <span key={i} className="flex items-center gap-10">
          <span>{t}</span>
          <span className="text-mustard">✺</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={`marquee font-display py-4 text-2xl font-extrabold uppercase sm:text-3xl ${className}`}>
      {track()}
      {track(true)}
    </div>
  );
}
