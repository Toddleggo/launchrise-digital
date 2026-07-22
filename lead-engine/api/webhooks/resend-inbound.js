import { json, methodGuard } from '../_lib/http.js'
import { isValidWebhook } from '../_lib/auth.js'
import { supabaseAdmin } from '../_lib/supabase.js'
import { triageReply } from '../_lib/claude.js'
import { addToDNC, senderIdentity, normalizeEmail } from '../_lib/compliance.js'
import { sendEmail } from '../_lib/sender.js'
import { optionalEnv } from '../_lib/env.js'

// Resend inbound-email webhook (email.received). Matches the sender to a lead,
// stores the reply, AI-triages it, updates lead status, and forwards the raw
// reply to your inbox — AI assists, it never replaces you.
export default async function handler(req, res) {
  if (!methodGuard(req, res, 'POST')) return
  if (!isValidWebhook(req)) return json(res, 401, { error: 'Unauthorized' })

  const data = (req.body || {}).data || req.body || {}
  const fromRaw = data.from?.email || data.from || ''
  const fromEmail = normalizeEmail(
    typeof fromRaw === 'string' ? (fromRaw.match(/<([^>]+)>/)?.[1] || fromRaw) : ''
  )
  const text = data.text || data.html?.replace(/<[^>]+>/g, ' ') || ''
  const subject = data.subject || ''
  if (!fromEmail || !text.trim()) return json(res, 200, { ok: true, skipped: 'empty' })

  const sb = supabaseAdmin()

  try {
    const { data: lead } = await sb
      .from('leads')
      .select('*')
      .eq('email', fromEmail)
      .maybeSingle()

    const { businessName } = senderIdentity()
    const triage = await triageReply(lead, `${subject}\n\n${text}`, businessName)

    const { data: reply } = await sb
      .from('replies')
      .insert({
        lead_id: lead?.id || null,
        channel: 'email',
        raw_message: text.slice(0, 8000),
        classification: triage.classification,
        ai_draft_response: triage.draft_response,
      })
      .select()
      .single()

    if (triage.wants_opt_out) {
      await addToDNC({ email: fromEmail, reason: 'unsubscribed' })
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

    // Forward every raw reply to the inbox regardless of classification.
    const forwardTo = optionalEnv('FORWARD_REPLIES_TO')
    if (forwardTo) {
      try {
        await sendEmail({
          to: forwardTo,
          subject: `[Lead reply · ${triage.classification}] ${lead?.business_name || fromEmail}`,
          body:
            `From: ${fromEmail}\nLead: ${lead?.business_name || 'unmatched'}\n` +
            `Classification: ${triage.classification}\n\n${text.slice(0, 4000)}\n\n` +
            (triage.draft_response ? `--- AI draft response ---\n${triage.draft_response}` : ''),
          skipFooter: true, // internal transactional forward, not marketing
        })
      } catch {
        /* forwarding failure must not break webhook ack */
      }
    }

    return json(res, 200, { ok: true, reply_id: reply?.id })
  } catch (e) {
    return json(res, 500, { error: e.message })
  }
}
