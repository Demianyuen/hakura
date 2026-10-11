import { Check } from "lucide-react";
import { getSiteData } from "@/lib/data";

export const metadata = { title: "服務定價 — hakura.intel" };

export default function PricingPage() {
  const { services } = getSiteData();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="text-center mb-14">
        <p className="font-mono text-signal-400 text-sm mb-2 tracking-widest">[ PRICING ]</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">情報服務定價</h1>
        <p className="text-ink-500 max-w-xl mx-auto">
          按需單次分析，或持續監控你的競品動向。所有方案均附可驗證證據。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((s) => {
          const featured = s.tier === "Teardown";
          return (
            <div
              key={s.tier}
              className={`relative rounded-xl border p-7 flex flex-col ${
                featured
                  ? "border-signal-500 bg-ink-900 glow-signal"
                  : "border-ink-700 bg-ink-900"
              }`}
            >
              {featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-signal-500 px-3 py-1 font-mono text-xs font-bold text-ink-950">
                  最受歡迎
                </span>
              )}
              <h2 className="font-mono text-lg font-bold text-white">{s.tier}</h2>
              <p className="text-sm text-ink-500 mt-1 mb-5">{s.tagline}</p>
              <p className="mb-6">
                <span className="text-4xl font-bold text-signal-400">{s.price}</span>
                <span className="text-sm text-ink-500 ml-1">{s.unit}</span>
              </p>
              <ul className="space-y-2.5 flex-1 mb-7">
                {s.includes.map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm text-[#d4d9e1]">
                    <Check className="w-4 h-4 text-signal-400 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={`mailto:intel@hakura.dev?subject=${encodeURIComponent(s.tier + " Inquiry")}`}
                className={`block rounded-lg py-3 text-center font-mono font-semibold transition-colors ${
                  featured
                    ? "bg-signal-500 text-ink-950 hover:bg-signal-400"
                    : "border border-ink-600 text-ink-500 hover:border-signal-500 hover:text-signal-400"
                }`}
              >
                {s.cta}
              </a>
            </div>
          );
        })}
      </div>

      <p className="mt-10 text-center text-sm text-ink-500 font-mono">
        不滿意全額退款 — evidence-backed or your money back.
      </p>
    </div>
  );
}
