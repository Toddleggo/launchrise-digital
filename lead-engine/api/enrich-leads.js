import { json, methodGuard } from './_lib/http.js'
import { requireAdmin } from './_lib/auth.js'
import { supabaseAdmin } from './_lib/supabase.js'
import { scoreWebsite, extractPublishedEmail } from './_lib/website.js'
import { computeLeadScore } from './_lib/scoring.js'

// POST { limit? } — process the next batch of unenriched leads:
// score their website (0-3) and pull a published email from their own site.
// The dashboard calls this repeatedly until `remaining` is 0.
export default async function handler(req, res) {
  if (!methodGuard(req, res, 'POST')) return
  const user = await requireAdmin(req)
  if (!user) return json(res, 401, { error: 'Unauthorized' })

  const limit = Math.min((req.body || {}).limit || 8, 15)
  const sb = supabaseAdmin()

  try {
    const { data: leads, error } = await sb
      .from('leads')
      .select('*')
      .is('enriched_at', null)
      .order('created_at', { ascending: true })
      .limit(limit)
    if (error) throw new Error(error.message)

    let processed = 0
    for (const lead of leads || []) {
      const site = await scoreWebsite(lead.website)
      const update = {
        website_quality_score: site.score,
        has_website: site.reachable,
        enriched_at: new Date().toISOString(),
      }
      if (!lead.email && site.reachable) {
        update.email = await extractPublishedEmail(site.html, site.finalUrl || lead.website)
      }
      update.lead_score = computeLeadScore({ ...lead, ...update })
      // Score-3 sites are clearly modern — not our buyer, close them out.
      if (site.score === 3) update.status = 'closed'

      await sb.from('leads').update(update).eq('id', lead.id)
      processed++
    }

    const { count: remaining } = await sb
      .from('leads')
      .select('id', { count: 'exact', head: true })
      .is('enriched_at', null)

    return json(res, 200, { processed, remaining: remaining || 0 })
  } catch (e) {
    return json(res, 500, { error: e.message })
  }
}
