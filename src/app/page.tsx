"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, FileSearch, Terminal, Radar } from "lucide-react";
import { getAllReports, getSiteData } from "@/lib/data";
import ContactForm from "@/components/ContactForm";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function HomePage() {
  const reports = getAllReports();
  // 最新報告優先（按日期倒序）
  const featured = [...reports].sort((a, b) => b.date.localeCompare(a.date))[0];
  const { methodology } = getSiteData();

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative grid-bg border-b border-ink-700">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-950/60 to-ink-950" />
        <div className="relative mx-auto max-w-6xl px-6 py-28 md:py-36">
          <motion.div {...fadeUp}>
            <p className="font-mono text-signal-400 text-sm mb-4 tracking-widest">
              [ GROWTH INTELLIGENCE TEARDOWN ]
            </p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white max-w-3xl">
              看見競品
              <span className="text-signal-400">不想讓你看見</span>
              的東西。
            </h1>
            <p className="mt-6 text-lg text-ink-500 max-w-2xl leading-relaxed">
              我們用逆向工程拆解競品的增長棧、技術架構與商業模式 ——
              廣告帳號、轉化漏斗、北極星指標、API 端點、產品版圖。
              每一個結論都附可驗證的證據（sha256），不是猜的。
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg bg-signal-500 px-6 py-3 font-mono font-semibold text-ink-950 hover:bg-signal-400 transition-colors glow-signal"
              >
                委託分析 <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/reports"
                className="inline-flex items-center gap-2 rounded-lg border border-ink-600 px-6 py-3 font-mono text-ink-500 hover:border-signal-500 hover:text-signal-400 transition-colors"
              >
                <FileSearch className="w-4 h-4" /> 瀏覽樣本報告
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 數字帶 ── */}
      <section className="border-b border-ink-700 bg-ink-900/50">
        <div className="mx-auto max-w-6xl px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 font-mono text-center">
          {[
            { n: methodology.phases.length, label: "分析階段" },
            { n: "4", label: "Mureka 廣告帳號" },
            { n: "29", label: "API 端點逆向" },
            { n: "130+", label: "組件版圖還原" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl md:text-3xl font-bold text-signal-400">{s.n}</p>
              <p className="text-xs text-ink-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 精選樣本 ── */}
      {featured && (
        <section className="mx-auto max-w-6xl px-6 py-20">
          <motion.div {...fadeUp}>
            <p className="font-mono text-signal-400 text-sm mb-2 tracking-widest">[ FEATURED SAMPLE ]</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">最新樣本報告</h2>
            <Link
              href={featured.fullReportUrl ?? "/reports"}
              className="block rounded-xl border border-ink-700 bg-ink-900 p-8 hover:border-signal-500 transition-colors group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs px-2 py-1 rounded bg-signal-500/10 text-signal-400 border border-signal-500/30">
                  {featured.category}
                </span>
                <span className="font-mono text-xs text-ink-500">{featured.date}</span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-signal-400 transition-colors">
                {featured.title}
              </h3>
              <p className="mt-3 text-ink-500 leading-relaxed">{featured.tldr}</p>
              <ul className="mt-6 space-y-2">
                {featured.keyFindings.slice(0, 3).map((f, i) => (
                  <li key={i} className="flex gap-3 text-sm text-ink-500">
                    <span className="text-signal-400 font-mono shrink-0">0{i + 1}</span>
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-mono text-sm text-signal-400 inline-flex items-center gap-1.5">
                閱讀完整報告 <ArrowRight className="w-3.5 h-3.5" />
              </p>
            </Link>
          </motion.div>
        </section>
      )}

      {/* ── 方法論預覽 ── */}
      <section className="border-y border-ink-700 bg-ink-900/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <motion.div {...fadeUp}>
            <p className="font-mono text-signal-400 text-sm mb-2 tracking-widest">[ METHODOLOGY ]</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">四階段拆解</h2>
            <p className="text-ink-500 mb-10 max-w-2xl">
              從基礎設施到商業模式，每階段產出具體證據，最終交付可驗證的情報報告。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {methodology.phases.map((p) => (
                <div key={p.phase} className="rounded-lg border border-ink-700 bg-ink-900 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Terminal className="w-4 h-4 text-signal-400" />
                    <span className="font-mono text-xs text-ink-500">PHASE 0{p.phase}</span>
                  </div>
                  <h3 className="font-bold text-white mb-2">{p.name}</h3>
                  <p className="text-xs text-ink-500 mb-3">{p.tools}</p>
                  <p className="text-xs text-cyan-data font-mono">→ {p.output}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex items-start gap-3 rounded-lg border border-ink-700 bg-ink-950 p-5">
              <ShieldCheck className="w-5 h-5 text-signal-400 shrink-0 mt-0.5" />
              <p className="text-sm text-ink-500 leading-relaxed">
                <span className="text-white font-semibold">證據標準：</span>
                {methodology.evidenceStandard}。
                <span className="text-white font-semibold ml-1">法律邊界：</span>
                {methodology.legalBoundary}。
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 能力標籤 ── */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-wrap gap-3 justify-center font-mono text-xs">
          {["REA 逆向引擎", "GTM/GA4 增長棧分析", "SPA Bundle 靜態分析", "廣告帳號枚舉", "團隊歸屬指紋", "API 端點逆向", "產品版圖還原", "Evidence sha256"].map(
            (tag) => (
              <span key={tag} className="rounded-full border border-ink-700 bg-ink-900 px-4 py-2 text-ink-500">
                {tag}
              </span>
            )
          )}
        </div>
      </section>

      {/* ── 賽道對比入口 ── */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <motion.div {...fadeUp}>
          <Link
            href="/compare"
            className="block rounded-xl border border-ink-700 bg-ink-900 p-8 hover:border-signal-500 transition-colors group"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <p className="font-mono text-signal-400 text-sm mb-2 tracking-widest">[ CROSS-TARGET COMPARISON ]</p>
                <h2 className="text-2xl font-bold text-white group-hover:text-signal-400 transition-colors mb-3">
                  AI 內容生成三賽道對比
                </h2>
                <p className="text-ink-500 leading-relaxed max-w-2xl">
                  Mureka × Suno × ElevenLabs —— 9 個維度橫切（商業模式、變現鉸鏈、技術棧、增長打法、團隊背景…）+
                  4 條戰略洞察。音樂與語音賽道的邊界正在消失，這是原因。
                </p>
              </div>
              <div className="flex gap-3 font-mono text-sm shrink-0">
                {["Mureka", "Suno", "ElevenLabs"].map((t) => (
                  <span key={t} className="rounded-lg border border-ink-600 px-3 py-2 text-ink-500">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <p className="mt-5 font-mono text-sm text-signal-400 inline-flex items-center gap-1.5">
              查看橫切對比 <ArrowRight className="w-3.5 h-3.5" />
            </p>
          </Link>
        </motion.div>
      </section>

      {/* ── CTA ── */}
      <section id="contact" className="border-t border-ink-700 bg-gradient-to-b from-ink-900 to-ink-950">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp}>
              <Radar className="w-10 h-10 text-signal-400 mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                想知道你的競品<span className="text-signal-400">點樣增長</span>？
              </h2>
              <p className="text-ink-500 mb-6 leading-relaxed">
                告訴我們目標域名，48 小時內交付附證據的完整拆解報告。
                不滿意全額退款。
              </p>
              <div className="space-y-3 font-mono text-sm">
                {[
                  ["01", "提交目標域名與方案"],
                  ["02", "48h 內交付 PDF + Evidence JSON"],
                  ["03", "不滿意全額退款"],
                ].map(([n, t]) => (
                  <div key={n} className="flex items-center gap-3">
                    <span className="text-signal-400 font-bold">{n}</span>
                    <span className="text-ink-500">{t}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 font-mono text-sm text-ink-500">
                或直接電郵{" "}
                <a href="mailto:intel@hakura.dev" className="text-signal-400 hover:underline">
                  intel@hakura.dev
                </a>
              </p>
            </motion.div>
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.15 }}>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
