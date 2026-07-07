import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// GET /api/unsubscribe?email=foo@bar.com — the link every email footer must include.
export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  if (!email) return NextResponse.json({ error: "email required" }, { status: 400 });

  await supabaseAdmin.from("do_not_contact").insert({ email, reason: "unsubscribed" });

  const { data: lead } = await supabaseAdmin.from("leads").select("id").eq("email", email).maybeSingle();
  if (lead) {
    await supabaseAdmin.from("leads").update({ status: "dnc" }).eq("id", lead.id);
  }

  return new NextResponse(
    `<html><body style="font-family:sans-serif;text-align:center;padding:60px;">
      <h2>You've been unsubscribed.</h2>
      <p>${email} will not receive further messages from us.</p>
    </body></html>`,
    { headers: { "Content-Type": "text/html" } }
  );
}
