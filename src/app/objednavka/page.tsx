import type { Metadata } from "next";
import { Checkout } from "@/components/Checkout";

export const metadata: Metadata = {
  title: "Dokončit objednávku",
};

export default function OrderPage() {
  return <Checkout />;
}
