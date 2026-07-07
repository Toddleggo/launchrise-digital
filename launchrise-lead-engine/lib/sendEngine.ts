import { Resend } from "resend";
import twilio from "twilio";
import { supabaseAdmin } from "./supabase";

// Lazily constructed so `next build` (which loads route modules without
// runtime env vars present) doesn't throw before the app ever serves a request.
let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
}

let _twilioClient: ReturnType<typeof twilio> | null = null;
function getTwilioClient(): ReturnType<typeof twilio> {
  if (!_twilioClient) {
    _twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  }
  return _twilioClient;
}

const RATE_LIMIT_MS = 4000; // ~1 send every 4s so 100 leads takes ~6-7 min, not instant

// SMS is optional — if Twilio isn't set up yet, run email-only rather than
// erroring out on every lead that has a phone number.
function smsConfigured(): boolean {
  return Boolean(
    process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_FROM_NUMBER
  );
}

interface RunResult {
  processed: number;
  sent: number;
  skipped_dnc: number;
  errors: { lead_id: string; error: string }[];
}

/**
 * Core sending engine. Pulls up to `batchSize` leads with status='new',
 * checks do_not_contact before every single send (no exceptions), renders
 * the matching campaign template, sends email + sms, logs to outreach_log,
 * and rate-limits so nothing blasts out instantly.
 */
export async function runSendBatch(batchSize = 100): Promise<RunResult> {
  const result: RunResult = { processed: 0, sent: 0, skipped_dnc: 0, errors: [] };

  const { data: leads, error: leadsErr } = await supabaseAdmin
    .from("leads")
    .select("*")
    .eq("status", "new")
    .limit(batchSize);

  if (leadsErr) throw leadsErr;
  if (!leads || leads.length === 0) return result;

  const { data: campaigns, error: campErr } = await supabaseAdmin
    .from("campaigns")
    .select("*")
    .eq("active", true);
  if (campErr) throw campErr;

  const campaignByCategory = new Map((campaigns ?? []).map((c) => [c.category, c]));

  for (const lead of leads) {
    result.processed++;

    // Never send without checking do_not_contact first — no exceptions.
    const isBlocked = await isOnDoNotContact(lead.email, lead.phone);
    if (isBlocked) {
      result.skipped_dnc++;
      await supabaseAdmin.from("leads").update({ status: "dnc" }).eq("id", lead.id);
      continue;
    }

    // Never message the same business twice across categories.
    const { data: alreadySent } = await supabaseAdmin
      .from("outreach_log")
      .select("id")
      .eq("lead_id", lead.id)
      .limit(1);
    if (alreadySent && alreadySent.length > 0) {
      await supabaseAdmin.from("leads").update({ status: "sent" }).eq("id", lead.id);
      continue;
    }

    const campaign = campaignByCategory.get(lead.category);
    if (!campaign) {
      result.errors.push({ lead_id: lead.id, error: `no active campaign for category "${lead.category}"` });
      continue;
    }

    try {
      const unsubscribeLink = `${process.env.UNSUBSCRIBE_BASE_URL}?email=${encodeURIComponent(
        lead.email ?? ""
      )}`;

      if (lead.email) {
        await sendEmail(lead, campaign, unsubscribeLink);
        await logOutreach(lead.id, "email", campaign.id);
      }
      if (lead.phone && smsConfigured() && campaign.sms_template) {
        await sendSms(lead, campaign);
        await logOutreach(lead.id, "sms", campaign.id);
      }

      await supabaseAdmin.from("leads").update({ status: "sent" }).eq("id", lead.id);
      result.sent++;
    } catch (err: any) {
      result.errors.push({ lead_id: lead.id, error: err.message });
    }

    // Rate limit: don't blast every lead instantly, that reads as spam to providers.
    await new Promise((r) => setTimeout(r, RATE_LIMIT_MS));
  }

  return result;
}

async function isOnDoNotContact(email: string | null, phone: string | null): Promise<boolean> {
  if (!email && !phone) return false;
  const orFilters = [
    email ? `email.eq.${email}` : null,
    phone ? `phone.eq.${phone}` : null,
  ].filter(Boolean) as string[];
  if (orFilters.length === 0) return false;

  const { data } = await supabaseAdmin.from("do_not_contact").select("id").or(orFilters.join(","));
  return !!data && data.length > 0;
}

function render(template: string, lead: any, campaign: any, unsubscribeLink: string): string {
  return template
    .replaceAll("{business_name}", lead.business_name ?? "there")
    .replaceAll("{demo_site_url}", campaign.demo_site_url ?? "")
    .replaceAll("{price_point}", campaign.price_point ?? "$499")
    .replaceAll("{unsubscribe_link}", unsubscribeLink)
    .replaceAll("{business_name_sender}", process.env.BUSINESS_NAME ?? "");
}

// Spam Act (Cth) requires every commercial email to identify the sender
// (name + ABN/physical address) and provide a working unsubscribe link.
// Appended server-side so no campaign template can accidentally omit it.
function complianceFooter(unsubscribeLink: string): string {
  const name = process.env.BUSINESS_NAME ?? "";
  const abn = process.env.BUSINESS_ABN ?? "";
  const address = process.env.BUSINESS_ADDRESS ?? "";
  return `
    <hr style="margin-top:24px;border:none;border-top:1px solid #ddd" />
    <p style="font-size:12px;color:#666;font-family:sans-serif">
      ${name}${abn ? ` (ABN ${abn})` : ""}${address ? ` &mdash; ${address}` : ""}<br/>
      <a href="${unsubscribeLink}">Unsubscribe</a>
    </p>`;
}

async function sendEmail(lead: any, campaign: any, unsubscribeLink: string) {
  const html = render(campaign.email_body, lead, campaign, unsubscribeLink) + complianceFooter(unsubscribeLink);
  const subject = render(campaign.email_subject, lead, campaign, unsubscribeLink);

  await getResend().emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: lead.email,
    subject,
    html,
    replyTo: process.env.REPLY_TO_EMAIL,
    headers: {
      "List-Unsubscribe": `<${unsubscribeLink}>`,
    },
  });
}

async function sendSms(lead: any, campaign: any) {
  const body = render(campaign.sms_template, lead, campaign, "");
  await getTwilioClient().messages.create({
    from: process.env.TWILIO_FROM_NUMBER,
    to: lead.phone,
    body,
  });
}

async function logOutreach(leadId: string, channel: "email" | "sms", templateId: string) {
  await supabaseAdmin.from("outreach_log").insert({
    lead_id: leadId,
    channel,
    template_used: templateId,
  });
}
