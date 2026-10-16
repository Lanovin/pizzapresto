// Menu převzaté z pizzapresto.cz (Gastro Profit API, říjen 2026).
// Fotky v /public/menu jsou originální fotky restaurace.

export type CategoryId = "pizza" | "polevky" | "salaty" | "burgery" | "napoje";

export type Base = "tomato" | "smetana";

export type Product = {
  id: string;
  category: CategoryId;
  name: string;
  desc: string;
  price: number;
  /** cena malé pizzy ø 24 cm */
  priceSmall?: number;
  image: string;
  base?: Base;
  tags?: ("novinka" | "palive" | "bez-masa" | "oblibene")[];
};

export const categories: { id: CategoryId; label: string; emoji: string }[] = [
  { id: "pizza", label: "Pizza", emoji: "🍕" },
  { id: "polevky", label: "Polévky", emoji: "🥣" },
  { id: "salaty", label: "Saláty", emoji: "🥗" },
  { id: "burgery", label: "Burgery", emoji: "🍔" },
  { id: "napoje", label: "Nápoje", emoji: "🥤" },
];

const pizza = (
  id: number,
  name: string,
  desc: string,
  price: number,
  priceSmall: number,
  base: Base,
  tags: Product["tags"] = [],
  image = `/menu/mnisek-pizzapresto-cz-${id}.jpg`,
): Product => ({
  id: `p${id}`,
  category: "pizza",
  name,
  desc,
  price,
  priceSmall,
  image,
  base,
  tags,
});

export const products: Product[] = [
  pizza(
    93,
    "Caesar",
    "Mozzarella, smetana, kuřecí maso, slanina, parmezán a po upečení římský salát a Caesar dresink",
    235,
    190,
    "smetana",
    ["novinka"],
    "/menu/pizzapresto-cz-93.jpg",
  ),
  pizza(60, "Margherita", "Tomato, mozzarella, bazalka", 170, 130, "tomato", ["bez-masa", "oblibene"]),
  pizza(61, "Vesuvio", "Tomato, mozzarella, dušená šunka z kýty", 180, 140, "tomato"),
  pizza(62, "Capricciosa", "Tomato, mozzarella, dušená šunka z kýty, žampiony", 200, 150, "tomato", ["oblibene"]),
  pizza(63, "Hawai", "Tomato, mozzarella, dušená šunka z kýty, ananas", 190, 150, "tomato"),
  pizza(64, "Salami", "Tomato, mozzarella, salám Palivec", 180, 140, "tomato", ["oblibene"]),
  pizza(65, "Tonno", "Tomato, mozzarella, tuňák v oleji, ančovičky, cibulka, olivy Kalamata", 180, 140, "tomato"),
  pizza(66, "Mexicana", "Tomato s chilli omáčkou, mozzarella, černé fazole, slanina, cibulka", 200, 150, "tomato", ["palive"]),
  pizza(
    67,
    "Picante",
    "Tomato, mozzarella, dušená šunka z kýty, žampiony, Niva, slanina, sušené chilli",
    220,
    180,
    "tomato",
    ["palive", "oblibene"],
  ),
  pizza(
    68,
    "Prosciutto Crudo",
    "Tomato, mozzarella, Grana Padano, sušená rajčata, Prosciutto Crudo, bazalka",
    220,
    180,
    "tomato",
    ["oblibene"],
  ),
  pizza(69, "Italiana", "Tomato, mozzarella, Niva, uzený sýr, Hermelín, dušená šunka, slanina, cibulka", 220, 180, "tomato"),
  pizza(70, "Quattro Formaggi", "Tomato, mozzarella, Niva, uzený sýr, Hermelín, bazalka", 200, 150, "tomato", ["bez-masa"]),
  pizza(71, "Tiroli", "Smetana, mozzarella, Niva, tyrolský špek, Grana Padano, bazalka", 230, 190, "smetana"),
  pizza(
    72,
    "Panna Quattro Formaggi",
    "Smetana, mozzarella, Niva, uzený sýr, Hermelín, bazalka",
    210,
    160,
    "smetana",
    ["bez-masa"],
  ),
  pizza(73, "Pollo Formaggi", "Smetana ochucená, mozzarella, Niva, uzený sýr, kuřecí maso, cibule", 220, 180, "smetana"),
  pizza(74, "Napoli", "Smetana, mozzarella, Niva, dušená šunka z kýty, kukuřice, feferonky", 190, 150, "smetana", ["palive"]),
  pizza(75, "Albori", "Smetana, mozzarella, Niva, slanina, cibule", 190, 150, "smetana"),
  pizza(76, "Regala", "Smetana, mozzarella, šunka, žampiony, brokolice", 190, 150, "smetana"),
  pizza(77, "Spinaci", "Sekaný listový špenát se smetanou, slanina, vejce", 200, 150, "smetana"),

  {
    id: "s47",
    category: "polevky",
    name: "Zuppa di Pomodoro",
    desc: "400 ml · krém z rajčat San Marzano, ricotta, parmezán, čerstvá bazalka, Balsamico di Modena, olivový olej Extra Virgin",
    price: 65,
    image: "/menu/dobris-pizzapresto-cz-47.jpg",
    tags: ["bez-masa"],
  },

  {
    id: "s48",
    category: "salaty",
    name: "Insalata Caesar",
    desc: "Římský salát, cherry, kuřecí prso sous-vide, slanina, Grana Padano, krutony, domácí Caesar dresink",
    price: 170,
    image: "/menu/dobris-pizzapresto-cz-48.jpg",
  },
  {
    id: "s49",
    category: "salaty",
    name: "Insalata Tonno",
    desc: "Mix salátů, cherry, tuňák v oleji, olivy Kalamata, balkánský sýr, červená cibulka, sicilské oregano",
    price: 170,
    image: "/menu/dobris-pizzapresto-cz-49.jpg",
  },
  {
    id: "s51",
    category: "salaty",
    name: "Insalata Pollo",
    desc: "Mix salátů, steakové kuřecí maso, cherry, domácí francouzský dresink",
    price: 170,
    image: "/menu/dobris-pizzapresto-cz-51.jpg",
  },
  {
    id: "s50",
    category: "salaty",
    name: "Coleslaw",
    desc: "Šťavnatý zelný salát s mrkví a majonézou",
    price: 50,
    image: "/menu/dobris-pizzapresto-cz-50.jpg",
    tags: ["bez-masa"],
  },

  {
    id: "b55",
    category: "burgery",
    name: "Pulled Pork Original",
    desc: "Domácí sezamová brioška, 150 g trhaného vepřového ramínka s BBQ omáčkou, coleslaw",
    price: 150,
    image: "/menu/dobris-pizzapresto-cz-55.jpg",
  },
  {
    id: "b56",
    category: "burgery",
    name: "Pulled Pork Florida",
    desc: "Domácí sezamová brioška, 150 g trhaného vepřového ramínka s BBQ omáčkou, čedar, majo, coleslaw",
    price: 160,
    image: "/menu/dobris-pizzapresto-cz-56.jpg",
  },

  ...(
    [
      [78, "Coca-Cola", 40],
      [79, "Coca-Cola Zero", 40],
      [80, "Orangina", 40],
      [81, "Nestea Broskev", 45],
      [82, "Nestea Citron", 45],
      [83, "Bonaqua neperlivá", 25],
      [84, "Bonaqua perlivá", 25],
      [85, "Pilsner Urquell", 50],
      [87, "Birell", 35],
    ] as const
  ).map(
    ([id, name, price]): Product => ({
      id: `d${id}`,
      category: "napoje",
      name,
      desc: "",
      price,
      image: `/menu/mnisek-pizzapresto-cz-${id}.jpg`,
    }),
  ),
  {
    id: "d91",
    category: "napoje",
    name: "San Pellegrino",
    desc: "Aranciata Rossa / Pesca / Limonata",
    price: 45,
    image: "/menu/pizzapresto-cz-91.jpg",
  },
];

export const pizzas = products.filter((p) => p.category === "pizza");

export const productById = (id: string) => products.find((p) => p.id === id);

/** Čtvercový výřez pro kolo na úvodní stránce. */
export const wheelImage = (p: Product) => `/wheel/pizzapresto-cz-${p.id.slice(1)}.webp`;

export const formatPrice = (n: number) => `${n.toLocaleString("cs-CZ")}\u00a0Kč`;

// ---- Údaje o restauraci (z pizzapresto.cz/kontakty) ----
export const restaurant = {
  name: "Pizza Presto",
  street: "Pražská 22",
  city: "252 10 Mníšek pod Brdy",
  phone: "+420 608 364 560",
  phoneHref: "tel:+420608364560",
  email: "info@pizzapresto.cz",
  hours: "Po–Ne 11:00–20:00",
  mapsUrl: "https://www.google.com/maps?q=Pra%C5%BEsk%C3%A1%2022%2C%20252%2010%20Mn%C3%AD%C5%A1ek%20pod%20Brdy",
};

// ---- Rozvoz: ZÁSTUPNÉ HODNOTY pro náhled, doplnit dle skutečnosti ----
export const delivery = {
  fee: 49,
  freeFrom: 500,
  minutes: "35–50",
  pickupMinutes: 15,
  zones: ["Mníšek pod Brdy", "Čisovice", "Kytín", "Řitka", "Líšnice", "Klínec", "Trnová", "Jíloviště", "Zahořany", "Bojov"],
};
