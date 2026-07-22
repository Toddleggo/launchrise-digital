// Website quality scoring + published-email extraction.
//
// Compliance note: emails are only ever pulled from the business's OWN
// website (homepage + linked contact page). Never from third-party
// directories — that's what keeps inferred consent under the Spam Act valid.

const FETCH_TIMEOUT_MS = 8000
const MAX_BYTES = 400_000

async function fetchPage(url) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    const resp = await fetch(url, {
      signal: controller.signal,
      redirect: 'follow',
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; LaunchRiseBot/1.0)' },
    })
    if (!resp.ok) return { ok: false, status: resp.status, html: '', finalUrl: url }
    const text = (await resp.text()).slice(0, MAX_BYTES)
    return { ok: true, status: resp.status, html: text, finalUrl: resp.url || url }
  } catch {
    return { ok: false, status: 0, html: '', finalUrl: url }
  } finally {
    clearTimeout(timer)
  }
}

const OLD_MARKERS = [
  /<table[^>]+(width|border)=/i,
  /<font\b/i,
  /<frameset\b/i,
  /<marquee\b/i,
  /flash|\.swf/i,
  /Dreamweaver|FrontPage/i,
]

const MODERN_MARKERS = [
  /next\.js|__next|_next\/static/i,
  /wp-content\/themes\/(twentytwenty(one|two|three|four|five)|astra|kadence|blocksy|generatepress)/i,
  /react|vue|nuxt|svelte|gatsby/i,
  /tailwind/i,
  /webflow|framer\.com|squarespace|shopify/i,
]

// 0 = no site (hottest), 1 = bad/outdated, 2 = decent, 3 = clearly modern (skip)
export async function scoreWebsite(url) {
  if (!url) return { score: 0, reachable: false, html: '', finalUrl: null }

  const httpsUrl = url.replace(/^http:\/\//i, 'https://')
  let page = await fetchPage(httpsUrl)
  let hasSsl = page.ok
  if (!page.ok && httpsUrl !== url) {
    page = await fetchPage(url) // fall back to plain http
    hasSsl = false
  }
  if (!page.ok) return { score: 0, reachable: false, html: '', finalUrl: null }

  const html = page.html
  const hasViewport = /<meta[^>]+name=["']viewport["']/i.test(html)
  const looksOld = OLD_MARKERS.some((re) => re.test(html))
  const looksModern = MODERN_MARKERS.some((re) => re.test(html))

  let score
  if (!hasSsl || !hasViewport || looksOld) score = 1
  else if (looksModern) score = 3
  else score = 2

  return { score, reachable: true, html, finalUrl: page.finalUrl }
}

const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
const JUNK_DOMAINS = [
  'example.com', 'sentry.io', 'wixpress.com', 'sentry-next.wixpress.com',
  'schema.org', 'w3.org', 'googleapis.com', 'gstatic.com', 'yourdomain.com',
  'email.com', 'domain.com', 'sentry.wixpress.com', 'godaddy.com',
]
const JUNK_EXTENSIONS = /\.(png|jpe?g|gif|svg|webp|css|js|woff2?)$/i

function extractEmails(html) {
  const found = new Set()
  // mailto: links first — highest confidence
  for (const m of html.matchAll(/mailto:([^"'?\s>]+)/gi)) {
    const e = decodeURIComponent(m[1]).trim().toLowerCase()
    if (EMAIL_RE.test(e)) found.add(e.match(EMAIL_RE)[0])
  }
  for (const m of html.matchAll(EMAIL_RE)) {
    found.add(m[0].toLowerCase())
  }
  return [...found].filter((e) => {
    const domain = e.split('@')[1]
    return !JUNK_DOMAINS.includes(domain) && !JUNK_EXTENSIONS.test(e) && !e.startsWith('u003')
  })
}

function findContactLink(html, baseUrl) {
  const m = html.match(/<a[^>]+href=["']([^"']*contact[^"']*)["']/i)
  if (!m) return null
  try {
    return new URL(m[1], baseUrl).href
  } catch {
    return null
  }
}

// Pull a published contact email from the business's own site only.
export async function extractPublishedEmail(homepageHtml, siteUrl) {
  if (!homepageHtml) return null
  let emails = extractEmails(homepageHtml)
  if (emails.length === 0 && siteUrl) {
    const contactUrl = findContactLink(homepageHtml, siteUrl)
    if (contactUrl) {
      const page = await fetchPage(contactUrl)
      if (page.ok) emails = extractEmails(page.html)
    }
  }
  return emails[0] || null
}
