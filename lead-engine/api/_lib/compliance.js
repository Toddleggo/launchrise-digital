import crypto from 'node:crypto'
import { env, optionalEnv } from './env.js'
import { supabaseAdmin } from './supabase.js'

// --- Phone normalisation (AU) ---------------------------------------------
export function normalizePhone(phone) {
  if (!phone) return null
  let digits = phone.replace(/[^\d+]/g, '')
  if (digits.startsWith('+')) return digits
  if (digits.startsWith('0')) return '+61' + digits.slice(1)
  if (digits.startsWith('61')) return '+' + digits
  return digits ? '+61' + digits : null
}

export function normalizeEmail(email) {
  return email ? email.trim().toLowerCase() : null
}

// --- Do-not-contact --------------------------------------------------------
export async function isDNC({ email, phone }) {
  const sb = supabaseAdmin()
  const e = normalizeEmail(email)
  const p = normalizePhone(phone)
  if (!e && !p) return false
  let query = sb.from('do_not_contact').select('id').limit(1)
  if (e && p) query = query.or(`email.eq.${e},phone.eq.${p}`)
  else if (e) query = query.eq('email', e)
  else query = query.eq('phone', p)
  const { data, error } = await query
  if (error) throw new Error(`DNC check failed: ${error.message}`)
  return (data || []).length > 0
}

export async function addToDNC({ email, phone, reason }) {
  const sb = supabaseAdmin()
  const row = {
    email: normalizeEmail(email),
    phone: normalizePhone(phone),
    reason: reason || 'unsubscribed',
  }
  if (!row.email && !row.phone) return
  await sb.from('do_not_contact').upsert(row, {
    onConflict: row.email ? 'email' : 'phone',
    ignoreDuplicates: true,
  })
}

// --- Sender identity + mandatory footers ------------------------------------
export function senderIdentity() {
  return {
    businessName: env('BUSINESS_NAME'),
    abn: env('BUSINESS_ABN'),
    address: env('BUSINESS_ADDRESS'),
    fromEmail: env('RESEND_FROM'), // e.g. "Todd at LaunchRise <todd@launchrise.com.au>"
    replyTo: optionalEnv('REPLY_TO_EMAIL'),
  }
}

export function unsubscribeUrl(email) {
  const base = env('PUBLIC_BASE_URL').replace(/\/$/, '')
  const e = Buffer.from(normalizeEmail(email)).toString('base64url')
  const t = unsubscribeToken(email)
  return `${base}/api/unsubscribe?e=${e}&t=${t}`
}

export function unsubscribeToken(email) {
  return crypto
    .createHmac('sha256', env('WEBHOOK_SECRET'))
    .update(normalizeEmail(email))
    .digest('base64url')
}

// Every email carries business name, ABN, physical address, and a working
// unsubscribe link. No exceptions, at any point in the sequence.
export function emailFooter(recipientEmail) {
  const { businessName, abn, address } = senderIdentity()
  const url = unsubscribeUrl(recipientEmail)
  return (
    `\n\n—\n${businessName} | ABN ${abn}\n${address}\n` +
    `Don't want to hear from us? Unsubscribe: ${url}`
  )
}

// Every SMS carries the business name and the STOP instruction.
export function smsFooter() {
  const { businessName } = senderIdentity()
  return `\n${businessName}. Reply STOP to opt out`
}

// Final gate before any send: refuse to dispatch a message missing the
// mandatory compliance elements.
export function assertEmailCompliant(body, recipientEmail) {
  const { abn } = senderIdentity()
  if (!body.includes(abn)) throw new Error('Email blocked: missing ABN in footer')
  if (!body.includes('/api/unsubscribe')) throw new Error('Email blocked: missing unsubscribe link')
  if (!normalizeEmail(recipientEmail)) throw new Error('Email blocked: no recipient')
}

export function assertSmsCompliant(body) {
  if (!/stop/i.test(body)) throw new Error('SMS blocked: missing STOP opt-out')
}

// --- Template rendering ------------------------------------------------------
export function renderTemplate(template, lead, campaign) {
  if (!template) return null
  return template
    .replaceAll('{{business_name}}', lead.business_name || 'there')
    .replaceAll('{{suburb}}', lead.suburb || 'your area')
    .replaceAll('{{category}}', lead.category || 'business')
    .replaceAll('{{personalization_line}}', lead.personalization_line || '')
    .replaceAll('{{demo_site_url}}', campaign?.demo_site_url || '')
    .replaceAll('{{price_point}}', campaign?.price_point || '$499')
    .trim()
}
