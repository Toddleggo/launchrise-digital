import { addToDNC, unsubscribeToken } from './_lib/compliance.js'
import { supabaseAdmin } from './_lib/supabase.js'

// Public one-click unsubscribe. Link format: /api/unsubscribe?e=<b64url email>&t=<hmac>
// Also accepts POST for RFC 8058 List-Unsubscribe-Post one-click.
export default async function handler(req, res) {
  const url = new URL(req.url, 'http://localhost')
  const e = url.searchParams.get('e')
  const t = url.searchParams.get('t')

  let email = null
  try {
    email = Buffer.from(e || '', 'base64url').toString('utf8')
  } catch {
    /* fall through */
  }

  if (!email || !t || t !== unsubscribeToken(email)) {
    res.status(400).setHeader('Content-Type', 'text/html')
    return res.end('<p>Invalid unsubscribe link.</p>')
  }

  await addToDNC({ email, reason: 'unsubscribed' })
  await supabaseAdmin().from('leads').update({ status: 'dnc' }).eq('email', email)

  res.status(200).setHeader('Content-Type', 'text/html')
  res.end(
    '<!doctype html><body style="font-family:sans-serif;max-width:480px;margin:80px auto;text-align:center">' +
      '<h2>You&rsquo;re unsubscribed</h2>' +
      '<p>You won&rsquo;t hear from us again. Sorry to have bothered you.</p></body>'
  )
}
