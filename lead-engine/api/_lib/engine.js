import { supabaseAdmin } from './supabase.js'
import { sendEmail, sendSms } from './sender.js'
import { renderTemplate, isDNC } from './compliance.js'
import { generatePersonalizationLine } from './claude.js'
import { sleep } from './http.js'

const TZ = 'Australia/Sydney'

function sydneyNow() {
  const parts = new Intl.DateTimeFormat('en-AU', {
    timeZone: TZ,
    hour: 'numeric',
    hour12: false,
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date())
  const get = (t) => parts.find((p) => p.type === t)?.value
  return {
    hour: parseInt(get('hour'), 10),
    weekday: get('weekday'), // "Mon".."Sun"
    dateKey: `${get('year')}-${get('month')}-${get('day')}`,
  }
}

// Start of the current Sydney calendar day, as a UTC ISO string.
function sydneyDayStartIso() {
  const { dateKey } = sydneyNow()
  // Sydney is UTC+10 or +11; using +10 over-counts by at most one extra hour
  // of yesterday's sends during DST, which only makes the cap more conservative.
  return new Date(`${dateKey}T00:00:00+10:00`).toISOString()
}

function dailyCap(settings) {
  if (!settings.warmup_started_at) return settings.week1_cap
  const days = (Date.now() - new Date(settings.warmup_started_at).getTime()) / 86400000
  if (days <= 7) return settings.week1_cap
  if (days <= 14) return settings.week2_cap
  return settings.max_daily_cap
}

// Decide which touch (if any) a lead is due for, from its outreach history.
function dueTouch(lead, logs, settings) {
  const touches = logs.map((l) => l.touch_number)
  const maxTouch = touches.length ? Math.max(...touches) : 0

  if (maxTouch === 0) {
    // Touch 1 requires the lead to have been explicitly queued in the dashboard.
    return lead.status === 'queued' ? 1 : null
  }
  // Stop the sequence once they've replied or the sequence is exhausted.
  if (lead.status !== 'sent') return null
  if (maxTouch >= 3) return null

  const firstTouch = logs
    .filter((l) => l.touch_number === 1)
    .map((l) => new Date(l.sent_at).getTime())
  const t1 = firstTouch.length ? Math.min(...firstTouch) : null
  if (!t1) return null

  const daysSinceT1 = (Date.now() - t1) / 86400000
  if (maxTouch === 1 && daysSinceT1 >= settings.touch_2_delay_days) return 2
  if (maxTouch === 2 && daysSinceT1 >= settings.touch_3_delay_days) return 3
  return null
}

// Run one sending batch. Called by the hourly cron and by the manual
// "Run send batch" dashboard button (force=true skips the time-window gate,
// never the kill switch, caps, or DNC).
export async function runSendBatch({ batchSize = 10, force = false } = {}) {
  const sb = supabaseAdmin()
  const summary = { sent: 0, skipped: 0, errors: [], messages: [] }

  const { data: settings, error: sErr } = await sb
    .from('send_settings')
    .select('*')
    .eq('id', 1)
    .single()
  if (sErr) throw new Error(`Could not load send_settings: ${sErr.message}`)

  if (settings.sending_paused) {
    return { ...summary, halted: 'Sending is paused (kill switch on)' }
  }

  if (!force) {
    const { hour, weekday } = sydneyNow()
    const isWeekend = weekday === 'Sat' || weekday === 'Sun'
    if (settings.weekdays_only && isWeekend) {
      return { ...summary, halted: 'Outside send window (weekend)' }
    }
    if (hour < settings.send_window_start || hour >= settings.send_window_end) {
      return { ...summary, halted: `Outside send window (${hour}:00 AEST)` }
    }
  }

  // Warm-up cap, counted per Sydney calendar day.
  const cap = dailyCap(settings)
  const { count: sentToday, error: cErr } = await sb
    .from('outreach_log')
    .select('id', { count: 'exact', head: true })
    .gte('sent_at', sydneyDayStartIso())
  if (cErr) throw new Error(`Could not count today's sends: ${cErr.message}`)
  const remaining = cap - (sentToday || 0)
  if (remaining <= 0) {
    return { ...summary, halted: `Daily cap reached (${sentToday}/${cap})` }
  }

  // Active campaigns keyed by category.
  const { data: campaigns } = await sb.from('campaigns').select('*').eq('active', true)
  const campaignByCategory = new Map((campaigns || []).map((c) => [c.category, c]))
  if (campaignByCategory.size === 0) {
    return { ...summary, halted: 'No active campaigns' }
  }

  // Candidate leads, hottest first.
  const { data: leads, error: lErr } = await sb
    .from('leads')
    .select('*')
    .in('status', ['queued', 'sent'])
    .lt('website_quality_score', 3)
    .order('lead_score', { ascending: false })
    .limit(300)
  if (lErr) throw new Error(`Could not load leads: ${lErr.message}`)

  const leadIds = (leads || []).map((l) => l.id)
  const { data: logs } = leadIds.length
    ? await sb.from('outreach_log').select('lead_id, touch_number, sent_at').in('lead_id', leadIds)
    : { data: [] }
  const logsByLead = new Map()
  for (const log of logs || []) {
    if (!logsByLead.has(log.lead_id)) logsByLead.set(log.lead_id, [])
    logsByLead.get(log.lead_id).push(log)
  }

  let budget = Math.min(remaining, batchSize)

  for (const lead of leads || []) {
    if (budget <= 0) break

    const campaign = campaignByCategory.get(lead.category)
    if (!campaign) continue

    const touch = dueTouch(lead, logsByLead.get(lead.id) || [], settings)
    if (!touch) continue

    // Non-negotiable: never send without checking do_not_contact first.
    if (await isDNC({ email: lead.email, phone: lead.phone })) {
      await sb.from('leads').update({ status: 'dnc' }).eq('id', lead.id)
      summary.skipped++
      continue
    }

    // Personalization is generated before the first send and cached.
    if (!lead.personalization_line) {
      try {
        const line = await generatePersonalizationLine(lead)
        if (line) {
          lead.personalization_line = line
          await sb.from('leads').update({ personalization_line: line }).eq('id', lead.id)
        }
      } catch (e) {
        summary.errors.push(`personalize ${lead.business_name}: ${e.message}`)
      }
    }

    const emailSubject = renderTemplate(campaign[`touch_${touch}_email_subject`], lead, campaign)
    const emailBody = renderTemplate(campaign[`touch_${touch}_email_body`], lead, campaign)
    const smsBody = renderTemplate(campaign[`touch_${touch}_sms`], lead, campaign)

    let sentAnything = false

    if (lead.email && emailSubject && emailBody && budget > 0) {
      try {
        const messageId = await sendEmail({ to: lead.email, subject: emailSubject, body: emailBody })
        await sb.from('outreach_log').insert({
          lead_id: lead.id,
          channel: 'email',
          touch_number: touch,
          template_used: `touch_${touch}_email`,
          provider_message_id: messageId,
        })
        budget--
        summary.sent++
        sentAnything = true
        summary.messages.push(`email → ${lead.business_name} (touch ${touch})`)
      } catch (e) {
        summary.errors.push(`email ${lead.business_name}: ${e.message}`)
      }
    }

    if (lead.phone && smsBody && budget > 0) {
      try {
        const messageId = await sendSms({ to: lead.phone, body: smsBody })
        await sb.from('outreach_log').insert({
          lead_id: lead.id,
          channel: 'sms',
          touch_number: touch,
          template_used: `touch_${touch}_sms`,
          provider_message_id: messageId,
        })
        budget--
        summary.sent++
        sentAnything = true
        summary.messages.push(`sms → ${lead.business_name} (touch ${touch})`)
      } catch (e) {
        summary.errors.push(`sms ${lead.business_name}: ${e.message}`)
      }
    }

    if (sentAnything) {
      if (lead.status !== 'sent') {
        await sb.from('leads').update({ status: 'sent' }).eq('id', lead.id)
      }
      if (!settings.warmup_started_at) {
        settings.warmup_started_at = new Date().toISOString()
        await sb
          .from('send_settings')
          .update({ warmup_started_at: settings.warmup_started_at })
          .eq('id', 1)
      }
      // Stagger sends — never a burst.
      await sleep(3000 + Math.floor(Math.random() * 3000))
    }
  }

  return summary
}
