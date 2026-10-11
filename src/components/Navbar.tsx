import Link from "next/link";
import { Radar } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-ink-700 bg-ink-950/85 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-mono font-bold text-lg tracking-tight">
          <Radar className="w-5 h-5 text-signal-400" />
          <span className="text-ink-500">[</span>
          <span className="text-white">hakura</span>
          <span className="text-signal-400">.</span>
          <span className="text-ink-500">intel</span>
          <span className="text-ink-500">]</span>
        </Link>
        <div className="flex items-center gap-6 text-sm font-mono">
          <Link href="/reports" className="text-ink-500 hover:text-signal-400 transition-colors">
            reports
          </Link>
          <Link href="/compare" className="text-ink-500 hover:text-signal-400 transition-colors">
            compare
          </Link>
          <Link href="/methodology" className="text-ink-500 hover:text-signal-400 transition-colors">
            methodology
          </Link>
          <Link href="/pricing" className="text-ink-500 hover:text-signal-400 transition-colors">
            pricing
          </Link>
          <a
            href="#contact"
            className="rounded-md border border-signal-500 px-3 py-1.5 text-signal-400 hover:bg-signal-500 hover:text-ink-950 transition-colors"
          >
            委託分析
          </a>
        </div>
      </div>
    </nav>
  );
}
