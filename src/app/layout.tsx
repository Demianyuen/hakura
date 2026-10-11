import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
    default: "hakura.intel — Growth Intelligence Teardown",
    template: "%s — hakura.intel",
  },
  description:
    "Evidence-backed competitive intelligence. 我們逆向拆解競品的增長棧、技術架構與商業模式，每個結論附可驗證證據（sha256）。",
  keywords: ["competitive intelligence", "reverse engineering", "teardown", "growth hacking", "競品分析", "逆向工程"],
  authors: [{ name: "hakura.intel" }],
  metadataBase: new URL("https://hakura-intel.vercel.app"),
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/feed.xml" },
  },
  openGraph: {
    type: "website",
    locale: "zh_HK",
    siteName: "hakura.intel",
    title: "hakura.intel — Growth Intelligence Teardown",
    description: "看見競品不想讓你看見的東西：增長棧、技術架構、商業模式 —— 每個結論附可驗證證據。",
    url: "https://hakura-intel.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "hakura.intel — Growth Intelligence Teardown",
    description: "看見競品不想讓你看見的東西。證據驅動的競品情報逆向服務。",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink-950 text-[#d4d9e1]">
        <Navbar />
        <main className="flex-1 pt-14">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
