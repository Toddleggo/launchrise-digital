import { json, methodGuard } from './_lib/http.js'
import { requireAdmin } from './_lib/auth.js'
import { supabaseAdmin } from './_lib/supabase.js'
import { textSearchAll, placeToLead } from './_lib/places.js'
import { normalizePhone, normalizeEmail } from './_lib/compliance.js'

// POST { category, location, maxResults? }
// Google Places Text Search → dedupe on google_place_id → insert as status=new.
// Website scoring + email extraction happen afterwards via /api/enrich-leads.
export default async function handler(req, res) {
  if (!methodGuard(req, res, 'POST')) return
  const user = await requireAdmin(req)
  if (!user) return json(res, 401, { error: 'Unauthorized' })

  const { category, location, maxResults = 60 } = req.body || {}
  if (!category || !location) {
    return json(res, 400, { error: 'category and location are required' })
  }

  try {
    const sb = supabaseAdmin()
    const places = await textSearchAll(`${category} in ${location}`, Math.min(maxResults, 60))

    const rows = places
      .filter((p) => p.id)
      .map((p) => {
        const lead = placeToLead(p, category)
        lead.phone = normalizePhone(lead.phone)
        return lead
      })

    // Skip anything already on the do-not-contact list before it even enters the funnel.
    const { data: dnc } = await sb.from('do_not_contact').select('phone, email')
    const dncPhones = new Set((dnc || []).map((d) => d.phone).filter(Boolean))
    const dncEmails = new Set((dnc || []).map((d) => normalizeEmail(d.email)).filter(Boolean))
    const clean = rows.filter(
      (r) => !dncPhones.has(r.phone) && !(r.email && dncEmails.has(normalizeEmail(r.email)))
    )

    // Dedupe on google_place_id — existing leads are left untouched.
    const { data: inserted, error } = await sb
      .from('leads')
      .upsert(clean, { onConflict: 'google_place_id', ignoreDuplicates: true })
      .select('id')
    if (error) throw new Error(error.message)

    return json(res, 200, {
      found: places.length,
      inserted: (inserted || []).length,
      skipped_dnc: rows.length - clean.length,
      note: 'Run enrichment next to score websites and extract published emails.',
    })
  } catch (e) {
    return json(res, 500, { error: e.message })
  }
}
