"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { getSiteData } from "@/lib/data";

export default function MethodologyView() {
  const { methodology, roadmap } = getSiteData();

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="font-mono text-signal-400 text-sm mb-2 tracking-widest">[ METHODOLOGY ]</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">四階段拆解方法論</h1>
        <p className="text-ink-500 mb-12 max-w-2xl leading-relaxed">
          hakura.intel 使用 REA（Reverse Engineer Anything）逆向引擎與自研提取管線，
          對目標站點進行四個階段的系統性拆解。每個階段的產出都是可驗證的結構化證據，
          而非主觀猜測。
        </p>
      </motion.div>

      <div className="space-y-6">
        {methodology.phases.map((p, i) => (
          <motion.div
            key={p.phase}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="rounded-xl border border-ink-700 bg-ink-900 p-7"
          >
            <div className="flex items-baseline gap-4 mb-4">
              <span className="font-mono text-3xl font-bold text-signal-400/40">0{p.phase}</span>
              <div>
                <h2 className="text-xl font-bold text-white">{p.name}</h2>
                <p className="font-mono text-xs text-ink-500 mt-1">{p.tools}</p>
              </div>
            </div>
            <p className="text-sm text-cyan-data font-mono">→ 產出：{p.output}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-signal-500/30 bg-signal-500/5 p-7">
        <div className="flex items-center gap-3 mb-3">
          <ShieldCheck className="w-5 h-5 text-signal-400" />
          <h2 className="font-bold text-white">證據標準與法律邊界</h2>
        </div>
        <ul className="space-y-2 text-sm text-ink-500">
          <li>• {methodology.evidenceStandard}</li>
          <li>• {methodology.legalBoundary}</li>
          <li>• 追蹤碼（GTM/GA4/Pixel）為對方公開分發的數據，逆向分析不涉侵權</li>
          <li>• 靜態分析結論附 REA limitations，不聲稱運行時證明</li>
        </ul>
      </div>

      <div className="mt-12">
        <h2 className="font-mono text-sm text-signal-400 tracking-widest mb-5">[ ROADMAP ]</h2>
        <div className="space-y-3">
          {roadmap.map((r) => (
            <div key={r.quarter} className="flex gap-4 rounded-lg border border-ink-700 bg-ink-900 p-5">
              <span className="font-mono text-sm text-amber-alert shrink-0 w-24">{r.quarter}</span>
              <p className="text-sm text-[#d4d9e1]">{r.milestone}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
