"use client";

import Link from "next/link";
import { Music2 } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-ink-800 bg-ink-950/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center">
            <Music2 className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight text-white">
            Hakura<span className="text-pink-400">.</span>
          </span>
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/explore" className="text-ink-500 hover:text-white transition-colors">
            探索
          </Link>
          <Link href="/library" className="text-ink-500 hover:text-white transition-colors hidden sm:block">
            音樂庫
          </Link>
          <Link
            href="/create"
            className="rounded-full bg-white px-4 py-1.5 font-semibold text-ink-950 hover:bg-pink-100 transition-colors"
          >
            創作
          </Link>
        </div>
      </div>
    </nav>
  );
}
