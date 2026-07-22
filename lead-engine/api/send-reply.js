import { json, methodGuard } from './_lib/http.js'
import { requireAdmin } from './_lib/auth.js'
import { supabaseAdmin } from './_lib/supabase.js'
import { sendEmail, sendSms } from './_lib/sender.js'
import { senderIdentity } from './_lib/compliance.js'

// POST { reply_id, body } — one-click send of the (possibly edited) AI draft
// from the dashboard reply queue. Responds on the channel the reply came in on.
// This is a direct response to their inquiry, but the email footer still rides
// along — every message carries identity + opt-out, no exceptions.
export default async function handler(req, res) {
  if (!methodGuard(req, res, 'POST')) return
  const user = await requireAdmin(req)
  if (!user) return json(res, 401, { error: 'Unauthorized' })

  const { reply_id, body } = req.body || {}
  if (!reply_id || !body?.trim()) {
    return json(res, 400, { error: 'reply_id and body are required' })
  }

  const sb = supabaseAdmin()
  try {
    const { data: reply, error } = await sb
      .from('replies')
      .select('*, leads(*)')
      .eq('id', reply_id)
      .single()
    if (error || !reply) return json(res, 404, { error: 'Reply not found' })
    const lead = reply.leads
    if (!lead) return json(res, 400, { error: 'Reply has no matched lead' })

    const { businessName } = senderIdentity()
    if (reply.channel === 'sms' && lead.phone) {
      await sendSms({ to: lead.phone, body: body.trim() })
    } else if (lead.email) {
      await sendEmail({
        to: lead.email,
        subject: `Re: your message to ${businessName}`,
        body: body.trim(),
      })
    } else {
      return json(res, 400, { error: 'Lead has no contact details for this channel' })
    }

    await sb.from('replies').update({ handled: true }).eq('id', reply_id)
    return json(res, 200, { ok: true })
  } catch (e) {
    return json(res, 500, { error: e.message })
  }
}
