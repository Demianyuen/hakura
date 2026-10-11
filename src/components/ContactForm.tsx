"use client";

import { useState } from "react";
import { Send, Check, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [email, setEmail] = useState("");
  const [target, setTarget] = useState("");
  const [tier, setTier] = useState("Teardown");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, target, tier, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "submit_failed");
      setStatus("sent");
      setEmail("");
      setTarget("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "submit_failed");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-signal-500/40 bg-signal-500/5 p-8 text-center">
        <Check className="w-10 h-10 text-signal-400 mx-auto mb-4" />
        <p className="text-white font-bold text-lg mb-2">已收到，48 小時內回覆</p>
        <p className="text-ink-500 text-sm font-mono">
          inquiry logged with evidence trail — 我們會電郵聯繫你。
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 font-mono text-sm text-signal-400 hover:underline"
        >
          再提交一個 →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-xl border border-ink-700 bg-ink-900 p-7 text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block font-mono text-xs text-ink-500 mb-1.5">你的電郵 *</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="w-full rounded-lg border border-ink-600 bg-ink-950 px-3 py-2.5 text-sm text-white placeholder-ink-500 focus:border-signal-500 focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block font-mono text-xs text-ink-500 mb-1.5">目標競品域名 *</label>
          <input
            type="text"
            required
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="competitor.com"
            className="w-full rounded-lg border border-ink-600 bg-ink-950 px-3 py-2.5 text-sm text-white placeholder-ink-500 focus:border-signal-500 focus:outline-none transition-colors"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block font-mono text-xs text-ink-500 mb-1.5">服務方案</label>
        <select
          value={tier}
          onChange={(e) => setTier(e.target.value)}
          className="w-full rounded-lg border border-ink-600 bg-ink-950 px-3 py-2.5 text-sm text-white focus:border-signal-500 focus:outline-none transition-colors"
        >
          <option>Recon — $99 快速指紋</option>
          <option>Teardown — $399 完整拆解</option>
          <option>Watchtower — $149/月 持續監控</option>
        </select>
      </div>
      <div className="mb-5">
        <label className="block font-mono text-xs text-ink-500 mb-1.5">想了解的重點（選填）</label>
        <textarea
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="例：特別想知道他們點樣買量、定價策略"
          className="w-full rounded-lg border border-ink-600 bg-ink-950 px-3 py-2.5 text-sm text-white placeholder-ink-500 focus:border-signal-500 focus:outline-none transition-colors resize-none"
        />
      </div>
      {status === "error" && (
        <p className="mb-4 font-mono text-xs text-red-400">
          提交失敗（{errorMsg}）— 也可直接電郵 intel@hakura.dev
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-signal-500 px-6 py-3 font-mono font-semibold text-ink-950 hover:bg-signal-400 transition-colors disabled:opacity-60 glow-signal"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> 提交中…
          </>
        ) : (
          <>
            <Send className="w-4 h-4" /> 提交委託
          </>
        )}
      </button>
      <p className="mt-3 text-center font-mono text-xs text-ink-500">
        僅公開頁面分析 · 不滿意全額退款
      </p>
    </form>
  );
}
