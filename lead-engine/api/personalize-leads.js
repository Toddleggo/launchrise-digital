import { json, methodGuard } from './_lib/http.js'
import { requireAdmin } from './_lib/auth.js'
import { supabaseAdmin } from './_lib/supabase.js'
import { generatePersonalizationLine } from './_lib/claude.js'

// POST { limit? } — generate the cached AI personalization line for leads
// that don't have one yet (enriched, not closed/dnc). Dashboard calls this
// repeatedly until `remaining` is 0.
export default async function handler(req, res) {
  if (!methodGuard(req, res, 'POST')) return
  const user = await requireAdmin(req)
  if (!user) return json(res, 401, { error: 'Unauthorized' })

  const limit = Math.min((req.body || {}).limit || 5, 10)
  const sb = supabaseAdmin()

  try {
    const base = () =>
      sb
        .from('leads')
        .select('*', { count: 'exact' })
        .is('personalization_line', null)
        .not('enriched_at', 'is', null)
        .lt('website_quality_score', 3)
        .in('status', ['new', 'queued'])

    const { data: leads, error } = await base()
      .order('lead_score', { ascending: false })
      .limit(limit)
    if (error) throw new Error(error.message)

    let processed = 0
    const errors = []
    for (const lead of leads || []) {
      try {
        const line = await generatePersonalizationLine(lead)
        if (line) {
          await sb.from('leads').update({ personalization_line: line }).eq('id', lead.id)
          processed++
        }
      } catch (e) {
        errors.push(`${lead.business_name}: ${e.message}`)
      }
    }

    const { count: remaining } = await base().limit(0)
    return json(res, 200, { processed, remaining: Math.max((remaining || 0) - processed, 0), errors })
  } catch (e) {
    return json(res, 500, { error: e.message })
  }
}
