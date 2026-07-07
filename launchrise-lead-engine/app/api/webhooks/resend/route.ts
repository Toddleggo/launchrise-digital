import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import { supabaseAdmin } from "@/lib/supabase";

// Resend sends: email.bounced, email.complained, email.delivered, and (with
// inbound parsing set up) inbound reply events. Verify with svix per Resend docs.
export async function POST(req: NextRequest) {
  const payload = await req.text();
  const headers = {
    "svix-id": req.headers.get("svix-id") ?? "",
    "svix-timestamp": req.headers.get("svix-timestamp") ?? "",
    "svix-signature": req.headers.get("svix-signature") ?? "",
  };

  let event: any;
  try {
    const wh = new Webhook(process.env.RESEND_WEBHOOK_SECRET!);
    event = wh.verify(payload, headers);
  } catch {
    return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }

  const type = event.type;
  const email = event.data?.to?.[0] ?? event.data?.from;

  if (type === "email.complained") {
    await supabaseAdmin.from("do_not_contact").insert({ email, reason: "complained" });
  }

  if (type === "email.bounced") {
    await supabaseAdmin.from("do_not_contact").insert({ email, reason: "bounced" });
  }

  // Inbound reply (requires Resend inbound parsing / forwarding rule wired to this URL)
  if (type === "email.inbound" || type === "inbound.email") {
    const fromAddress = event.data?.from;
    const { data: lead } = await supabaseAdmin
      .from("leads")
      .select("id")
      .eq("email", fromAddress)
      .maybeSingle();

    if (lead) {
      await supabaseAdmin.from("leads").update({ status: "replied" }).eq("id", lead.id);
      await supabaseAdmin
        .from("outreach_log")
        .update({ replied: true })
        .eq("lead_id", lead.id)
        .eq("channel", "email");
    }

    // Also forward straight to inbox so replies are seen in real time.
    // (Set up separately as a Resend/email forwarding rule to REPLY_TO_EMAIL,
    // or send via Resend here if you want it done in-code instead.)
  }

  return NextResponse.json({ received: true });
}
