"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Wand2, Music4, Radio, Headphones, Share2, ArrowRight, Shuffle } from "lucide-react";
import { GENRES, SONGS, LYRIC_IDEAS } from "@/lib/music-data";
import SongCard from "@/components/SongCard";
import { useState } from "react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const hot = [...SONGS].sort((a, b) => b.plays - a.plays).slice(0, 8);
  const fresh = [...SONGS].reverse().slice(0, 4);

  return (
    <>
      {/* ── Hero: 生成入口 ── */}
      <section className="relative overflow-hidden border-b border-ink-800">
        {/* Aurora background */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[120px]" />
          <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-pink-500/20 blur-[120px]" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-orange-400/10 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 py-24 md:py-32 text-center">
          <motion.div {...fadeUp}>
            <p className="font-mono text-sm text-pink-400 mb-4 tracking-widest inline-flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> AI-NATIVE MUSIC STUDIO
            </p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white">
              把想像
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-300 bg-clip-text text-transparent">
                變成音樂
              </span>
            </h1>
            <p className="mt-5 text-lg text-ink-500 max-w-xl mx-auto">
              一句描述、一段歌詞，Hakura 為你生成完整歌曲。
              探索社群作品，混音、擴展、重新演繹。
            </p>

            {/* Prompt input */}
            <form
              action="/create"
              onSubmit={(e) => {
                e.preventDefault();
                const q = prompt.trim();
                window.location.href = q ? `/create?prompt=${encodeURIComponent(q)}` : "/create";
              }}
              className="mt-8 max-w-2xl mx-auto"
            >
              <div className="flex items-center gap-2 rounded-2xl border border-ink-700 bg-ink-900/80 backdrop-blur p-2 focus-within:border-pink-500/60 transition-colors">
                <Wand2 className="w-5 h-5 text-ink-500 ml-2 shrink-0" />
                <input
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="描述你想聽的歌…例：深夜城市開車的 synthwave"
                  className="flex-1 bg-transparent text-white placeholder-ink-500 text-sm focus:outline-none min-w-0"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-2.5 font-semibold text-white text-sm hover:opacity-90 transition-opacity shrink-0"
                >
                  生成
                </button>
              </div>
            </form>

            {/* Lyric idea chips */}
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {LYRIC_IDEAS.slice(0, 3).map((idea) => (
                <Link
                  key={idea}
                  href={`/create?prompt=${encodeURIComponent(idea)}`}
                  className="rounded-full border border-ink-700 bg-ink-900/60 px-3 py-1.5 text-xs text-ink-500 hover:border-pink-500/50 hover:text-pink-300 transition-colors truncate max-w-[240px]"
                >
                  {idea}
                </Link>
              ))}
              <button
                onClick={() => {
                  const r = LYRIC_IDEAS[Math.floor(Math.random() * LYRIC_IDEAS.length)];
                  window.location.href = `/create?prompt=${encodeURIComponent(r)}`;
                }}
                className="rounded-full border border-ink-700 px-3 py-1.5 text-xs text-ink-500 hover:text-pink-300 transition-colors inline-flex items-center gap-1"
              >
                <Shuffle className="w-3 h-3" /> 隨機靈感
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 風格探索 ── */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <motion.div {...fadeUp}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">探索風格</h2>
            <Link href="/explore" className="text-sm text-pink-400 hover:underline inline-flex items-center gap-1">
              全部 <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {GENRES.map((g) => (
              <Link
                key={g.id}
                href={`/explore?genre=${g.id}`}
                className="shrink-0 rounded-xl border border-ink-800 bg-ink-900 px-5 py-4 text-center hover:border-pink-500/50 transition-colors group"
              >
                <span className="text-2xl block mb-1">{g.emoji}</span>
                <span className="text-sm text-ink-500 group-hover:text-white transition-colors">{g.name}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── 熱門曲目 ── */}
      <section className="mx-auto max-w-7xl px-6 pb-14">
        <motion.div {...fadeUp}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">🔥 熱門作品</h2>
            <Link href="/explore" className="text-sm text-pink-400 hover:underline inline-flex items-center gap-1">
              探索更多 <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {hot.map((s) => (
              <SongCard key={s.id} song={s} queue={hot} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── 新上架 ── */}
      <section className="mx-auto max-w-7xl px-6 pb-14">
        <motion.div {...fadeUp}>
          <h2 className="text-xl font-bold text-white mb-6">✨ 最新創作</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {fresh.map((s) => (
              <SongCard key={s.id} song={s} queue={fresh} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── 功能介紹 ── */}
      <section className="border-t border-ink-800 bg-ink-900/40">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-bold text-white mb-10 text-center">一個平台，無限可能</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  icon: Music4,
                  title: "完整歌曲生成",
                  desc: "從一句描述到完整歌曲：旋律、編曲、人聲一氣呵成。支援純音樂與帶歌詞版本。",
                },
                {
                  icon: Radio,
                  title: "探索與發現",
                  desc: "瀏覽社群作品，按風格、情緒、標籤篩選。喜歡就一鍵混音成你的版本。",
                },
                {
                  icon: Headphones,
                  title: "編輯與擴展",
                  desc: "延長段落、替換人聲、調整風格。你的創作，你話事。",
                },
              ].map((f) => (
                <div key={f.title} className="rounded-2xl border border-ink-800 bg-ink-900 p-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                    <f.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-ink-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 rounded-2xl bg-gradient-to-r from-purple-600/20 via-pink-500/20 to-orange-400/20 border border-pink-500/20 p-10 text-center">
              <h3 className="text-2xl font-bold text-white mb-3">準備好創作你的第一首歌了嗎？</h3>
              <p className="text-ink-500 mb-6">免費開始，無需信用卡。</p>
              <Link
                href="/create"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-ink-950 hover:bg-pink-100 transition-colors"
              >
                開始創作 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
