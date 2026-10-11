"use client";

import { useState, use } from "react";
import { motion } from "framer-motion";
import { Compass } from "lucide-react";
import { GENRES, SONGS } from "@/lib/music-data";
import SongCard from "@/components/SongCard";

export default function ExploreContent() {
  const [active, setActive] = useState<string>("all");

  const filtered = active === "all" ? SONGS : SONGS.filter((s) => s.genre === active);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2 mb-1">
          <Compass className="w-6 h-6 text-pink-400" /> 探索
        </h1>
        <p className="text-ink-500 text-sm mb-8">發現社群創作的歌曲，一鍵混音成你的版本。</p>
      </motion.div>

      {/* Genre filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActive("all")}
          className={`rounded-full px-4 py-2 text-sm transition-colors ${
            active === "all" ? "bg-white text-ink-950" : "border border-ink-700 text-ink-500 hover:border-pink-500/50"
          }`}
        >
          全部
        </button>
        {GENRES.map((g) => (
          <button
            key={g.id}
            onClick={() => setActive(g.id)}
            className={`rounded-full px-4 py-2 text-sm transition-colors ${
              active === g.id
                ? "bg-pink-500 text-white"
                : "border border-ink-700 text-ink-500 hover:border-pink-500/50"
            }`}
          >
            {g.emoji} {g.name}
          </button>
        ))}
      </div>

      {/* Song grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {filtered.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.4) }}
            >
              <SongCard song={s} queue={filtered} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="py-24 text-center">
          <p className="text-ink-500">呢個風格暫時未有作品 — 不如你嚟創作第一首？</p>
        </div>
      )}
    </div>
  );
}
