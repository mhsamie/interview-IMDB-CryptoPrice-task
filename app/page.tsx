import CoinsPrices from "@/components/coin-prices/CoinsPrices";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fatemeh samie | crypto viewr",
  description: "This is a enterview task",
};

export default function Home() {
  return <CoinsPrices />;
}
