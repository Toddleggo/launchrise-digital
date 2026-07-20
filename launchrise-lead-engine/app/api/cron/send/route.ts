import { NextRequest, NextResponse } from "next/server";
import { runSendBatch } from "@/lib/sendEngine";

// At the 4s-per-send compliance rate limit, a batch this size takes minutes,
// not seconds — needs a Vercel plan whose function timeout can be raised to
// cover it (Hobby's fixed ~10s cap cannot run this route to completion).
export const maxDuration = 300;

// 60 leads * 4s ≈ 240s, leaving headroom under the 300s cap above.
const CRON_BATCH_SIZE = 60;

// Vercel Cron hits this daily. Protected by CRON_SECRET so nobody else can
// trigger a send blast by hitting the URL directly.
export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const result = await runSendBatch(CRON_BATCH_SIZE);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
