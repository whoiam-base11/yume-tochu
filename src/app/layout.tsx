import type { Metadata } from "next";
import { Noto_Sans_JP, Shippori_Mincho_B1 } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  display: "swap",
});

const shipporiMincho = Shippori_Mincho_B1({
  variable: "--font-shippori-mincho",
  weight: ["700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "夢、途中。｜PODCAST",
  description:
    "挑戦する若者の夢や目標を聞き出して、リアルな声を発信するポッドキャスト。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} ${shipporiMincho.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans">{children}</body>
    </html>
  );
}
