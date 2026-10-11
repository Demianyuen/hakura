import { NextRequest, NextResponse } from "next/server";
import { put, list } from "@vercel/blob";

interface Lead {
  email: string;
  target: string;
  tier: string;
  message: string;
  receivedAt: string;
}

// hakura.intel lead intake — persists inquiries to Vercel Blob (append-style
// JSON log per day) so no inquiry is ever lost. Falls back to console when
// Blob is not configured (local dev without token).
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, target, tier, message } = body ?? {};

    if (!email || typeof email !== "string" || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
    }
    if (!target || typeof target !== "string" || target.length > 200) {
      return NextResponse.json({ ok: false, error: "invalid_target" }, { status: 400 });
    }

    const lead: Lead = {
      email: email.slice(0, 200),
      target: target.slice(0, 200),
      tier: typeof tier === "string" ? tier.slice(0, 40) : "Teardown",
      message: typeof message === "string" ? message.slice(0, 2000) : "",
      receivedAt: new Date().toISOString(),
    };

    let persisted = false;
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        // Read existing leads for today, append, rewrite (small scale: tens/day)
        const dayKey = `leads/${lead.receivedAt.slice(0, 10)}.json`;
        const { blobs } = await list({ prefix: dayKey });
        const existing: Lead[] = blobs.length > 0
          ? await fetch(blobs[0].url).then((r) => r.json()).catch(() => [] as Lead[])
          : [];

        await put(dayKey, JSON.stringify([...existing, lead], null, 2), {
          access: "public",
          contentType: "application/json",
          addRandomSuffix: false,
          allowOverwrite: true,
        });
        persisted = true;
      } catch (e) {
        console.error("[hakura:lead:blob-error]", e);
      }
    }

    console.log("[hakura:lead]", JSON.stringify(lead), "persisted:", persisted);
    return NextResponse.json({ ok: true, lead, persisted }, { status: 202 });
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
}
