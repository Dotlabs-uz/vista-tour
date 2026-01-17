import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "OkeyTour.uz - Туры из Узбекистана | Горящие туры в Турцию, ОАЭ, Египет",
  description:
    "Туристическое агентство OkeyTour.uz - поиск туров по лучшим ценам из Узбекистана. Горящие путевки в Турцию, ОАЭ, Египет, Мальдивы от ведущих туроператоров.",
  keywords: [
    "туры из Узбекистана",
    "горящие туры",
    "путевки в Турцию",
    "туры в ОАЭ",
    "отдых в Египте",
    "туристическое агентство Самарканд",
  ],
  alternates: { canonical: "https://okeytour.uz" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Script src="https://tourvisor.ru/module/init.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}


