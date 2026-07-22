import { supabaseAdmin } from './supabase.js'
import { optionalEnv } from './env.js'

// Admin endpoints require a Supabase session token from the dashboard
// (Authorization: Bearer <access_token>). Returns the user or null.
export async function requireAdmin(req) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return null
  const { data, error } = await supabaseAdmin().auth.getUser(token)
  if (error || !data?.user) return null
  return data.user
}

// Vercel Cron sends Authorization: Bearer <CRON_SECRET> when CRON_SECRET is set.
export function isCronRequest(req) {
  const secret = optionalEnv('CRON_SECRET')
  if (!secret) return false
  return (req.headers.authorization || '') === `Bearer ${secret}`
}

// Webhooks are protected by a shared secret in the URL: ?key=<WEBHOOK_SECRET>
export function isValidWebhook(req) {
  const secret = optionalEnv('WEBHOOK_SECRET')
  if (!secret) return false
  const url = new URL(req.url, 'http://localhost')
  return url.searchParams.get('key') === secret
}
