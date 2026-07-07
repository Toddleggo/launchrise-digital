import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("campaigns")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST body: { category, sms_template, email_subject, email_body, demo_site_url, price_point }
export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.category || !body.email_subject || !body.email_body) {
    return NextResponse.json(
      { error: "category, email_subject, email_body are required" },
      { status: 400 }
    );
  }

  // sms_template is optional — leave it blank to run this campaign email-only
  // (e.g. before Twilio is set up). If provided, it must still meet the
  // compliance requirements below, no exceptions.
  if (body.sms_template) {
    if (body.sms_template.length > 160) {
      return NextResponse.json({ error: "sms_template must be under 160 chars" }, { status: 400 });
    }
    if (!/stop/i.test(body.sms_template)) {
      return NextResponse.json(
        { error: "sms_template must include an opt-out instruction, e.g. 'Reply STOP to opt out'" },
        { status: 400 }
      );
    }
  }
  if (!/\{unsubscribe_link\}/.test(body.email_body)) {
    return NextResponse.json(
      { error: "email_body must include {unsubscribe_link} placeholder — required by the Spam Act" },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("campaigns")
    .insert({
      category: body.category,
      sms_template: body.sms_template ?? null,
      email_subject: body.email_subject,
      email_body: body.email_body,
      demo_site_url: body.demo_site_url ?? null,
      price_point: body.price_point ?? "$499",
      active: true,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
