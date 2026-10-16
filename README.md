# Pizza Presto – náhled nového webu

Next.js 16 (App Router) + Tailwind 4. Čistě vizuální náhled: košík funguje (ukládá se v prohlížeči),
objednávka a kontaktní formulář se nikam neodesílají.

```bash
npm install
npm run dev     # http://localhost:3000
```

- `src/data/menu.ts` – menu, ceny, kontakty a **zástupné** údaje o rozvozu (cena, zóny, časy)
- `src/components/PizzaWheel.tsx` – interaktivní „pizza dne“ na úvodní stránce
- `public/menu` – fotky jídel z pizzapresto.cz, `public/photos` – ilustrační fotky z Unsplash
