import { json, methodGuard } from '../_lib/http.js'
import { isValidWebhook } from '../_lib/auth.js'
import { supabaseAdmin } from '../_lib/supabase.js'
import { addToDNC } from '../_lib/compliance.js'

// Resend event webhook (configure in Resend → Webhooks, URL includes ?key=WEBHOOK_SECRET):
//   email.bounced    → mark outreach_log bounced, hard-bounce → do_not_contact
//   email.complained → do_not_contact immediately
//   email.opened     → mark outreach_log opened
export default async function handler(req, res) {
  if (!methodGuard(req, res, 'POST')) return
  if (!isValidWebhook(req)) return json(res, 401, { error: 'Unauthorized' })

  const event = req.body || {}
  const type = event.type
  const data = event.data || {}
  const to = Array.isArray(data.to) ? data.to[0] : data.to
  const messageId = data.email_id || data.id
  const sb = supabaseAdmin()

  try {
    if (type === 'email.bounced') {
      if (messageId) {
        await sb.from('outreach_log').update({ bounced: true }).eq('provider_message_id', messageId)
      }
      const bounceType = data.bounce?.type || data.bounce_type || ''
      // Suppress hard bounces permanently; soft bounces get one more chance.
      if (to && !/soft|transient/i.test(bounceType)) {
        await addToDNC({ email: to, reason: 'bounced_hard' })
        await sb.from('leads').update({ status: 'dnc' }).eq('email', to.toLowerCase())
      }
    } else if (type === 'email.complained') {
      if (to) {
        await addToDNC({ email: to, reason: 'complained' })
        await sb.from('leads').update({ status: 'dnc' }).eq('email', to.toLowerCase())
      }
    } else if (type === 'email.opened' && messageId) {
      await sb.from('outreach_log').update({ opened: true }).eq('provider_message_id', messageId)
    }
    return json(res, 200, { ok: true })
  } catch (e) {
    return json(res, 500, { error: e.message })
  }
}
