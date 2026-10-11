import { NextRequest, NextResponse } from "next/server";

// hakura.intel lead intake — stores inquiries as JSON in Vercel KV if configured,
// otherwise echoes a 202 (inquiry logged) for CRM integration later.
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

    const lead = {
      email,
      target: target.slice(0, 200),
      tier: typeof tier === "string" ? tier.slice(0, 40) : "Teardown",
      message: typeof message === "string" ? message.slice(0, 2000) : "",
      receivedAt: new Date().toISOString(),
    };

    // If KV is configured (HAKURA_KV_REST_API_URL), persist; else log only.
    if (process.env.HAKURA_KV_REST_API_URL) {
      await fetch(`${process.env.HAKURA_KV_REST_API_URL}/lpush/leads`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HAKURA_KV_REST_API_TOKEN ?? ""}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lead),
      }).catch(() => undefined);
    }

    console.log("[hakura:lead]", JSON.stringify(lead));
    return NextResponse.json({ ok: true, lead }, { status: 202 });
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
}
