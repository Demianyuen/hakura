import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getAllReports, getReportById } from "@/lib/data";

export function generateStaticParams() {
  return getAllReports()
    .filter((r) => r.fullReportUrl)
    .map((r) => ({ id: r.id }));
}

export default async function ReportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const report = getReportById(id);
  if (!report) notFound();

  return (
    <article className="mx-auto max-w-4xl px-6 py-16">
      <Link
        href="/reports"
        className="inline-flex items-center gap-1.5 font-mono text-sm text-ink-500 hover:text-signal-400 transition-colors mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> 返回報告庫
      </Link>

      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs px-2 py-1 rounded bg-signal-500/10 text-signal-400 border border-signal-500/30">
            {report.category}
          </span>
          <span className="font-mono text-xs text-ink-500">{report.date}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">{report.title}</h1>
        <p className="text-lg text-ink-500 leading-relaxed">{report.tldr}</p>
      </header>

      <section className="mb-12">
        <h2 className="font-mono text-sm text-signal-400 tracking-widest mb-5">[ KEY FINDINGS ]</h2>
        <ol className="space-y-4">
          {report.keyFindings.map((f, i) => (
            <li key={i} className="flex gap-4 rounded-lg border border-ink-700 bg-ink-900 p-5">
              <span className="font-mono text-signal-400 font-bold shrink-0">0{i + 1}</span>
              <p className="text-[#d4d9e1] leading-relaxed">{f}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-12">
        <h2 className="font-mono text-sm text-signal-400 tracking-widest mb-5">[ EVIDENCE & TECHNICAL DETAILS ]</h2>
        <div className="rounded-lg border border-ink-700 bg-ink-900 divide-y divide-ink-700 font-mono text-sm">
          {report.sections.techStack && (
            <div className="p-5">
              <p className="text-ink-500 text-xs mb-1">TECH STACK</p>
              <p className="text-[#d4d9e1]">{report.sections.techStack}</p>
            </div>
          )}
          <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              ["API 端點", report.sections.apiEndpoints],
              ["組件數", report.sections.components],
              ["廣告帳號", report.sections.adAccounts],
              ["Pixel 數", report.sections.pixels?.length],
              ["模型版本", report.sections.models],
              ["方案數", report.sections.plans?.length],
              ["分析工具", report.sections.analytics?.length],
            ]
              .filter(([, v]) => v !== undefined)
              .map(([label, v]) => (
                <div key={String(label)}>
                  <p className="text-2xl font-bold text-signal-400">{v}</p>
                  <p className="text-xs text-ink-500 mt-1">{label}</p>
                </div>
              ))}
          </div>
          {report.sections.plans && report.sections.plans.length > 0 && (
            <div className="p-5">
              <p className="text-ink-500 text-xs mb-2">SUBSCRIPTION TIERS</p>
              <div className="flex flex-wrap gap-2">
                {report.sections.plans.map((p) => (
                  <span key={p} className="rounded bg-ink-700 px-2 py-1 text-xs text-amber-alert font-mono">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )}
          {report.sections.analytics && report.sections.analytics.length > 0 && (
            <div className="p-5">
              <p className="text-ink-500 text-xs mb-2">ANALYTICS STACK</p>
              <div className="flex flex-wrap gap-2">
                {report.sections.analytics.map((p) => (
                  <span key={p} className="rounded bg-ink-700 px-2 py-1 text-xs text-cyan-data">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )}
          {report.sections.pixels && report.sections.pixels.length > 0 && (
            <div className="p-5">
              <p className="text-ink-500 text-xs mb-2">PIXELS / ANALYTICS</p>
              <div className="flex flex-wrap gap-2">
                {report.sections.pixels.map((p) => (
                  <span key={p} className="rounded bg-ink-700 px-2 py-1 text-xs text-cyan-data">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )}
          {report.sections.payments && report.sections.payments.length > 0 && (
            <div className="p-5">
              <p className="text-ink-500 text-xs mb-2">PAYMENT PROVIDERS</p>
              <div className="flex flex-wrap gap-2">
                {report.sections.payments.map((p) => (
                  <span key={p} className="rounded bg-ink-700 px-2 py-1 text-xs text-amber-alert">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )}
          {report.sections.evidenceIds && report.sections.evidenceIds.length > 0 && (
            <div className="p-5">
              <p className="text-ink-500 text-xs mb-2">EVIDENCE IDs (sha256 可驗證)</p>
              <div className="space-y-1">
                {report.sections.evidenceIds.map((e) => (
                  <p key={e} className="text-xs text-ink-500 break-all">
                    {e}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="rounded-xl border border-signal-500/30 bg-signal-500/5 p-8 text-center">
        <p className="font-mono text-sm text-ink-500 mb-3">想要同類型報告？</p>
        <a
          href="mailto:intel@hakura.dev?subject=Teardown%20Inquiry"
          className="inline-flex items-center gap-2 rounded-lg bg-signal-500 px-6 py-3 font-mono font-semibold text-ink-950 hover:bg-signal-400 transition-colors"
        >
          委託分析 <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </section>
    </article>
  );
}
