import { NextRequest, NextResponse } from "next/server";
import { runSendBatch } from "@/lib/sendEngine";

// See app/api/cron/send/route.ts for why this needs to be raised — same
// rate-limited send loop, same risk of the function being killed mid-batch.
export const maxDuration = 300;

// Manual trigger — use this button first, before ever switching to cron.
// POST { batchSize?: 10 } — keep this small for the first manual test.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const result = await runSendBatch(body.batchSize ?? 10);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
