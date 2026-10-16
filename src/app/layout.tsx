import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { MobileCartBar } from "@/components/MobileCartBar";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin", "latin-ext"],
  axes: ["wdth", "opsz"],
});

const dmSans = DM_Sans({
  variable: "--font-dmsans",
  subsets: ["latin", "latin-ext"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Pizza Presto · Rozvoz pizzy Mníšek pod Brdy",
    template: "%s · Pizza Presto",
  },
  description:
    "Pizza z pece až k vašim dveřím. Objednejte si rozvoz pizzy v Mníšku pod Brdy a okolí, nebo si k nám přijďte sednout. Denně 11–20.",
};

export const viewport: Viewport = {
  themeColor: "#f6eedf",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="cs" className={`${bricolage.variable} ${dmSans.variable} ${instrument.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col overflow-x-clip">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <MobileCartBar />
        </CartProvider>
      </body>
    </html>
  );
}
