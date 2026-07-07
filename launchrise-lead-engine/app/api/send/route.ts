import { NextRequest, NextResponse } from "next/server";
import { runSendBatch } from "@/lib/sendEngine";

// Manual trigger — use this button first, before ever switching to cron.
// POST { batchSize?: 100 }
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const result = await runSendBatch(body.batchSize ?? 100);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
