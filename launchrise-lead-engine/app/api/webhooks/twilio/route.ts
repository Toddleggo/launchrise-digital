import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// Twilio auto-handles STOP compliance, but we still mirror it into our own
// do_not_contact table so the sending engine's DNC check catches it too.
// Configure this URL as the "A message comes in" webhook on your Twilio number.
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const from = formData.get("From")?.toString();
  const body = (formData.get("Body")?.toString() ?? "").trim().toUpperCase();

  if (!from) return NextResponse.json({ ok: true });

  if (["STOP", "STOPALL", "UNSUBSCRIBE", "CANCEL", "END", "QUIT"].includes(body)) {
    await supabaseAdmin.from("do_not_contact").insert({ phone: from, reason: "stop_sms" });

    const { data: lead } = await supabaseAdmin
      .from("leads")
      .select("id")
      .eq("phone", from)
      .maybeSingle();

    if (lead) {
      await supabaseAdmin.from("leads").update({ status: "dnc" }).eq("id", lead.id);
    }
  } else {
    // Any other inbound SMS reply = a hot lead reply.
    const { data: lead } = await supabaseAdmin
      .from("leads")
      .select("id")
      .eq("phone", from)
      .maybeSingle();

    if (lead) {
      await supabaseAdmin.from("leads").update({ status: "replied" }).eq("id", lead.id);
      await supabaseAdmin
        .from("outreach_log")
        .update({ replied: true })
        .eq("lead_id", lead.id)
        .eq("channel", "sms");
    }
  }

  // Twilio expects TwiML (or empty 200) back
  return new NextResponse("<Response></Response>", {
    headers: { "Content-Type": "text/xml" },
  });
}
