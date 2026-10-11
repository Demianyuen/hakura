"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getAllReports } from "@/lib/data";

export default function ReportsList() {
  const reports = getAllReports();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="font-mono text-signal-400 text-sm mb-2 tracking-widest">[ REPORTS ]</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">樣本報告庫</h1>
        <p className="text-ink-500 mb-12 max-w-2xl">
          每份報告都是真實逆向工作的成果，附可驗證的 Evidence。
          正在持續新增 —— 新目標透過委託或公開案例加入。
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Link
              href={r.fullReportUrl ?? "#"}
              className="block h-full rounded-xl border border-ink-700 bg-ink-900 p-6 hover:border-signal-500 transition-colors group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs px-2 py-1 rounded bg-signal-500/10 text-signal-400 border border-signal-500/30">
                  {r.category}
                </span>
                <span className="font-mono text-xs text-ink-500">{r.date}</span>
              </div>
              <h2 className="text-lg font-bold text-white group-hover:text-signal-400 transition-colors">
                {r.title}
              </h2>
              <p className="mt-3 text-sm text-ink-500 leading-relaxed line-clamp-4">{r.tldr}</p>
              <p className="mt-5 font-mono text-xs text-signal-400 inline-flex items-center gap-1.5">
                {r.target} — 閱讀 <ArrowRight className="w-3 h-3" />
              </p>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-dashed border-ink-600 p-8 text-center">
        <p className="font-mono text-ink-500 text-sm">
          [ 更多報告持續生成中 — 委託分析你的目標競品 ]
        </p>
        <a
          href="mailto:intel@hakura.dev"
          className="mt-4 inline-block font-mono text-sm text-signal-400 hover:underline"
        >
          intel@hakura.dev
        </a>
      </div>
    </div>
  );
}
