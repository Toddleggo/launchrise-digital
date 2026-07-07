import { NextRequest, NextResponse } from "next/server";
import { runSendBatch } from "@/lib/sendEngine";

// Vercel Cron hits this daily. Protected by CRON_SECRET so nobody else can
// trigger a send blast by hitting the URL directly.
export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const result = await runSendBatch(100);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
