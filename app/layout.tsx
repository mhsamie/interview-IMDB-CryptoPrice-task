import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <QueryProvider>
        <body
          className={inter.className + " text-white max-w-[1440px] mx-auto"}
        >
          <Header />
          <main className=" bg-[#212121] min-h-[85vh]  px-2 md:px-5 xl:px-10">
            {children}
          </main>
          <Footer />
        </body>
      </QueryProvider>
    </html>
  );
}
