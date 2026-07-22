import { env } from './env.js'
import {
  senderIdentity,
  emailFooter,
  smsFooter,
  unsubscribeUrl,
  assertEmailCompliant,
  assertSmsCompliant,
  normalizePhone,
  normalizeEmail,
  isDNC,
} from './compliance.js'

// Send a plain-text outreach email via Resend, with compliance footer and
// List-Unsubscribe headers. Returns the provider message id.
export async function sendEmail({ to, subject, body, skipFooter = false }) {
  const recipient = normalizeEmail(to)
  if (await isDNC({ email: recipient })) {
    throw new Error(`Send blocked: ${recipient} is on the do-not-contact list`)
  }

  const { fromEmail, replyTo } = senderIdentity()
  const fullBody = skipFooter ? body : body + emailFooter(recipient)
  if (!skipFooter) assertEmailCompliant(fullBody, recipient)

  const payload = {
    from: fromEmail,
    to: [recipient],
    subject,
    text: fullBody,
    headers: {
      'List-Unsubscribe': `<${unsubscribeUrl(recipient)}>`,
      'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
    },
  }
  if (replyTo) payload.reply_to = replyTo

  const resp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env('RESEND_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  if (!resp.ok) {
    const text = await resp.text()
    throw new Error(`Resend error ${resp.status}: ${text.slice(0, 500)}`)
  }
  const data = await resp.json()
  return data.id
}

// Send an SMS via Twilio with the mandatory STOP footer.
export async function sendSms({ to, body, skipFooter = false }) {
  const recipient = normalizePhone(to)
  if (await isDNC({ phone: recipient })) {
    throw new Error(`Send blocked: ${recipient} is on the do-not-contact list`)
  }

  const fullBody = skipFooter ? body : body + smsFooter()
  if (!skipFooter) assertSmsCompliant(fullBody)

  const sid = env('TWILIO_ACCOUNT_SID')
  const auth = Buffer.from(`${sid}:${env('TWILIO_AUTH_TOKEN')}`).toString('base64')
  const params = new URLSearchParams({
    To: recipient,
    From: env('TWILIO_FROM'),
    Body: fullBody,
  })

  const resp = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    }
  )
  if (!resp.ok) {
    const text = await resp.text()
    throw new Error(`Twilio error ${resp.status}: ${text.slice(0, 500)}`)
  }
  const data = await resp.json()
  return data.sid
}
