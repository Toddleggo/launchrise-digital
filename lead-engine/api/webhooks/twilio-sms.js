import { isValidWebhook } from '../_lib/auth.js'
import { supabaseAdmin } from '../_lib/supabase.js'
import { triageReply } from '../_lib/claude.js'
import { addToDNC, senderIdentity, normalizePhone } from '../_lib/compliance.js'
import { sendEmail } from '../_lib/sender.js'
import { optionalEnv } from '../_lib/env.js'

const STOP_WORDS = /^\s*(stop|stopall|unsubscribe|cancel|end|quit|opt\s*out)\s*$/i

function twiml(res) {
  res.status(200).setHeader('Content-Type', 'text/xml')
  res.end('<?xml version="1.0" encoding="UTF-8"?><Response></Response>')
}

// Twilio inbound SMS webhook (form-encoded; URL includes ?key=WEBHOOK_SECRET).
// Twilio enforces STOP at the carrier level; we mirror it into do_not_contact
// so no channel ever contacts them again. Other replies get AI triage.
export default async function handler(req, res) {
  if (req.method !== 'POST') return twiml(res)
  if (!isValidWebhook(req)) {
    res.status(401).end('Unauthorized')
    return
  }

  const body = req.body || {}
  const from = normalizePhone(body.From)
  const text = (body.Body || '').trim()
  if (!from || !text) return twiml(res)

  const sb = supabaseAdmin()

  try {
    const { data: lead } = await sb.from('leads').select('*').eq('phone', from).maybeSingle()

    if (STOP_WORDS.test(text)) {
      await addToDNC({ phone: from, email: lead?.email, reason: 'unsubscribed' })
      if (lead) await sb.from('leads').update({ status: 'dnc' }).eq('id', lead.id)
      return twiml(res)
    }

    const { businessName } = senderIdentity()
    const triage = await triageReply(lead, text, businessName)

    await sb.from('replies').insert({
      lead_id: lead?.id || null,
      channel: 'sms',
      raw_message: text.slice(0, 2000),
      classification: triage.classification,
      ai_draft_response: triage.draft_response,
    })

    if (triage.wants_opt_out) {
      await addToDNC({ phone: from, email: lead?.email, reason: 'unsubscribed' })
      if (lead) await sb.from('leads').update({ status: 'dnc' }).eq('id', lead.id)
    } else if (lead) {
      const status =
        triage.classification === 'interested'
          ? 'interested'
          : triage.classification === 'not_interested' || triage.classification === 'angry'
            ? 'not_interested'
            : 'replied'
      await sb.from('leads').update({ status }).eq('id', lead.id)
      await sb.from('outreach_log').update({ replied: true }).eq('lead_id', lead.id)
    }

    const forwardTo = optionalEnv('FORWARD_REPLIES_TO')
    if (forwardTo) {
      try {
        await sendEmail({
          to: forwardTo,
          subject: `[SMS reply · ${triage.classification}] ${lead?.business_name || from}`,
          body:
            `From: ${from}\nLead: ${lead?.business_name || 'unmatched'}\n` +
            `Classification: ${triage.classification}\n\n${text}\n\n` +
            (triage.draft_response ? `--- AI draft response ---\n${triage.draft_response}` : ''),
          skipFooter: true,
        })
      } catch {
        /* forwarding failure must not break webhook ack */
      }
    }
  } catch {
    /* always ack Twilio to avoid retries hammering us */
  }
  return twiml(res)
}
