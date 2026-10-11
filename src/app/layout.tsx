import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import GlobalPlayer from "@/components/GlobalPlayer";
import { PlayerProvider } from "@/lib/player";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Hakura — AI 音樂生成平台",
    template: "%s — Hakura",
  },
  description:
    "Hakura：AI 原生音樂創作平台。一句描述、一段歌詞，生成完整歌曲。探索社群作品，混音、擴展、重新演繹。",
  keywords: ["AI music", "音樂生成", "song generator", "AI 作曲", "Hakura"],
  metadataBase: new URL("https://hakura-intel.vercel.app"),
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/feed.xml" },
  },
  openGraph: {
    type: "website",
    siteName: "Hakura",
    title: "Hakura — AI 音樂生成平台",
    description: "一句描述、一段歌詞，生成完整歌曲。",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink-950 text-[#d4d9e1] pb-20">
        <PlayerProvider>
          <Navbar />
          <main className="flex-1 pt-14">{children}</main>
          <GlobalPlayer />
        </PlayerProvider>
      </body>
    </html>
  );
}
