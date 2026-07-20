import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

async function addToDnc(email: string) {
  await supabaseAdmin.from("do_not_contact").insert({ email, reason: "unsubscribed" });

  const { data: lead } = await supabaseAdmin.from("leads").select("id").eq("email", email).maybeSingle();
  if (lead) {
    await supabaseAdmin.from("leads").update({ status: "dnc" }).eq("id", lead.id);
  }
}

// GET /api/unsubscribe?email=foo@bar.com — the link every email footer must include.
export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  if (!email) return NextResponse.json({ error: "email required" }, { status: 400 });

  await addToDnc(email);

  return new NextResponse(
    `<html><body style="font-family:sans-serif;text-align:center;padding:60px;">
      <h2>You've been unsubscribed.</h2>
      <p>${email} will not receive further messages from us.</p>
    </body></html>`,
    { headers: { "Content-Type": "text/html" } }
  );
}

// POST /api/unsubscribe?email=foo@bar.com — same URL, hit by Gmail/Yahoo's
// native one-click "Unsubscribe" button per RFC 8058 (see List-Unsubscribe-Post
// header in lib/sendEngine.ts). No confirmation page, just a 200.
export async function POST(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  if (!email) return NextResponse.json({ error: "email required" }, { status: 400 });

  await addToDnc(email);

  return NextResponse.json({ ok: true });
}
