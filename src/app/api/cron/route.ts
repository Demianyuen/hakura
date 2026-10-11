import { NextRequest, NextResponse } from "next/server";
import { getAllReports } from "@/lib/data";

// Cron endpoint (vercel.json schedule): weekly self-check of Hakura's
// knowledge base health — report count, evidence coverage, staleness.
export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const reports = getAllReports();
  const now = Date.now();
  const staleDays = 30;

  const status = reports.map((r) => {
    const ageDays = Math.floor((now - new Date(r.date).getTime()) / 86400000);
    const hasEvidence = Array.isArray(r.sections?.evidenceIds) && r.sections.evidenceIds.length > 0;
    return {
      id: r.id,
      target: r.target,
      ageDays,
      hasEvidence,
      stale: ageDays > staleDays,
    };
  });

  const stale = status.filter((s) => s.stale);
  const payload = {
    ok: true,
    checkedAt: new Date().toISOString(),
    reportCount: reports.length,
    staleCount: stale.length,
    reports: status,
  };

  console.log("[hakura:cron:health]", JSON.stringify(payload));
  return NextResponse.json(payload);
}
