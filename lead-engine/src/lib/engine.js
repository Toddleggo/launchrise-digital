import { supabase } from './supabase'

// --- Server API (Vercel functions), authenticated with the Supabase session ---
async function callApi(path, body) {
  const { data } = await supabase.auth.getSession()
  const token = data?.session?.access_token
  const resp = await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body || {}),
  })
  const json = await resp.json().catch(() => ({}))
  if (!resp.ok) throw new Error(json.error || `Request failed (${resp.status})`)
  return json
}

export const sourceLeads = (category, location, maxResults) =>
  callApi('/api/source-leads', { category, location, maxResults })
export const enrichLeads = (limit) => callApi('/api/enrich-leads', { limit })
export const personalizeLeads = (limit) => callApi('/api/personalize-leads', { limit })
export const runSendBatch = (batchSize, force) =>
  callApi('/api/send-batch', { batchSize, force })
export const sendReply = (replyId, body) =>
  callApi('/api/send-reply', { reply_id: replyId, body })

// --- Direct Supabase reads/writes (RLS: authenticated users only) ---
export async function getSettings() {
  const { data, error } = await supabase.from('send_settings').select('*').eq('id', 1).single()
  if (error) throw error
  return data
}

export async function setPaused(paused) {
  const { error } = await supabase
    .from('send_settings')
    .update({ sending_paused: paused, updated_at: new Date().toISOString() })
    .eq('id', 1)
  if (error) throw error
}

export async function getLeads() {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('lead_score', { ascending: false })
    .limit(500)
  if (error) throw error
  return data
}

export async function queueLeads(ids) {
  const { error } = await supabase.from('leads').update({ status: 'queued' }).in('id', ids)
  if (error) throw error
}

export async function getCampaigns() {
  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function saveCampaign(campaign) {
  const { error } = campaign.id
    ? await supabase.from('campaigns').update(campaign).eq('id', campaign.id)
    : await supabase.from('campaigns').insert(campaign)
  if (error) throw error
}

export async function toggleCampaign(id, active) {
  const { error } = await supabase.from('campaigns').update({ active }).eq('id', id)
  if (error) throw error
}

export async function getReplies() {
  const { data, error } = await supabase
    .from('replies')
    .select('*, leads(business_name, category, suburb, email, phone, status)')
    .order('created_at', { ascending: false })
    .limit(100)
  if (error) throw error
  return data
}

export async function markReplyHandled(id) {
  const { error } = await supabase.from('replies').update({ handled: true }).eq('id', id)
  if (error) throw error
}

export async function getOutreachLog() {
  const { data, error } = await supabase
    .from('outreach_log')
    .select('lead_id, channel, touch_number, sent_at, opened, bounced, replied')
    .order('sent_at', { ascending: false })
    .limit(2000)
  if (error) throw error
  return data
}
