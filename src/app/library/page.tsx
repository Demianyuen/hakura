"use client";

import { motion } from "framer-motion";
import { Library, Music2, Heart, Clock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface LibItem {
  id: string;
  title: string;
  genre: string;
  duration: number;
  createdAt: string;
  cover: string;
}

export default function LibraryPage() {
  // Demo: empty state with sample items (localStorage would hold real ones)
  const [items] = useState<LibItem[]>([]);
  const [liked] = useState<LibItem[]>([]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-2xl font-bold text-white flex items-center gap-2 mb-8">
        <Library className="w-6 h-6 text-pink-400" /> 音樂庫
      </h1>

      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-dashed border-ink-700 py-24 text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-5">
            <Music2 className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">音樂庫還是空的</h2>
          <p className="text-ink-500 mb-6 max-w-md mx-auto">
            你創作的歌曲會自動收藏喺呢度。開始你嘅第一首作品啦！
          </p>
          <Link
            href="/create"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-ink-950 hover:bg-pink-100 transition-colors"
          >
            開始創作
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {items.map((it) => (
            <div key={it.id} className="rounded-xl border border-ink-800 bg-ink-900 p-3">
              <div className="aspect-square rounded-lg bg-ink-800 flex items-center justify-center text-3xl mb-2">
                {it.cover}
              </div>
              <p className="text-sm font-semibold text-white truncate">{it.title}</p>
              <p className="text-xs text-ink-500">{it.genre}</p>
            </div>
          ))}
        </div>
      )}

      {/* Feature teasers */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Heart, title: "收藏", desc: "喜歡嘅社群作品會出現喺呢度" },
          { icon: Clock, title: "生成歷史", desc: "每一次創作都有記錄，隨時重聽" },
          { icon: Music2, title: "下載管理", desc: "已下載嘅 MP3 / WAV 集中管理" },
        ].map((f) => (
          <div key={f.title} className="rounded-xl border border-ink-800 bg-ink-900/50 p-5 flex items-start gap-3">
            <f.icon className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white text-sm">{f.title}</p>
              <p className="text-xs text-ink-500 mt-0.5">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
