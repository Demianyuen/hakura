"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Scale } from "lucide-react";
import compareData from "../../../data/compare.json";

interface CompareData {
  title: string;
  subtitle: string;
  targets: string[];
  dimensions: { label: string; values: Record<string, string> }[];
  insights: { title: string; body: string }[];
}

const data = compareData as CompareData;

const targetColor: Record<string, string> = {
  Mureka: "text-signal-400",
  Suno: "text-cyan-data",
  ElevenLabs: "text-amber-alert",
};

export default function CompareView() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <a
          href="/reports"
          className="inline-flex items-center gap-1.5 font-mono text-sm text-ink-500 hover:text-signal-400 transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> 報告庫
        </a>
        <p className="font-mono text-signal-400 text-sm mb-2 tracking-widest">[ CROSS-TARGET COMPARISON ]</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{data.title}</h1>
        <p className="text-ink-500 mb-12 max-w-3xl leading-relaxed">{data.subtitle}</p>
      </motion.div>

      {/* Comparison table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="overflow-x-auto rounded-xl border border-ink-700 mb-16"
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink-700 bg-ink-900">
              <th className="text-left font-mono text-xs text-ink-500 px-5 py-4 w-40">維度</th>
              {data.targets.map((t) => (
                <th key={t} className={`text-left font-mono font-bold px-5 py-4 ${targetColor[t] ?? "text-white"}`}>
                  {t}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.dimensions.map((dim, i) => (
              <tr key={dim.label} className={i % 2 === 0 ? "bg-ink-900/40" : ""}>
                <td className="font-mono text-xs text-ink-500 px-5 py-4 align-top border-t border-ink-800">
                  {dim.label}
                </td>
                {data.targets.map((t) => (
                  <td key={t} className="px-5 py-4 align-top border-t border-ink-800 text-[#d4d9e1] leading-relaxed">
                    {dim.values[t] ?? "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Insights */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-6">
          <Scale className="w-5 h-5 text-signal-400" />
          <h2 className="font-mono text-sm text-signal-400 tracking-widest">[ KEY INSIGHTS ]</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.insights.map((ins, i) => (
            <motion.div
              key={ins.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-xl border border-ink-700 bg-ink-900 p-6"
            >
              <h3 className="font-bold text-white mb-2">
                <span className="font-mono text-signal-400 mr-2">0{i + 1}</span>
                {ins.title}
              </h3>
              <p className="text-sm text-ink-500 leading-relaxed">{ins.body}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-signal-500/30 bg-signal-500/5 p-8 text-center">
        <p className="font-mono text-sm text-ink-500 mb-3">想要你行業的橫切對比？</p>
        <a
          href="mailto:intel@hakura.dev?subject=Custom%20Comparison"
          className="inline-flex items-center gap-2 rounded-lg bg-signal-500 px-6 py-3 font-mono font-semibold text-ink-950 hover:bg-signal-400 transition-colors"
        >
          委託定制對比
        </a>
      </div>
    </div>
  );
}
