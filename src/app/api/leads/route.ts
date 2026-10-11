import { NextRequest, NextResponse } from "next/server";
import { list } from "@vercel/blob";

// Admin view of collected leads. Protected by CRON_SECRET (shared secret) —
// returns JSON list of all lead blobs. Use with curl:
//   curl -H "Authorization: Bearer $CRON_SECRET" https://hakura-intel.vercel.app/api/leads
export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ ok: false, error: "blob_not_configured" }, { status: 500 });
  }

  try {
    const { blobs } = await list({ prefix: "leads/" });
    const days = await Promise.all(
      blobs.map(async (b) => {
        const leads = await fetch(b.url).then((r) => r.json()).catch(() => []);
        return { date: b.pathname.replace("leads/", "").replace(".json", ""), count: Array.isArray(leads) ? leads.length : 0, leads };
      })
    );
    days.sort((a, b) => b.date.localeCompare(a.date));
    const total = days.reduce((s, d) => s + d.count, 0);
    return NextResponse.json({ ok: true, totalLeads: total, days });
  } catch (e) {
    console.error("[hakura:leads:error]", e);
    return NextResponse.json({ ok: false, error: "read_failed" }, { status: 500 });
  }
}
