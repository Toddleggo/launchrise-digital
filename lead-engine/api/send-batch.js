import { json, methodGuard } from './_lib/http.js'
import { requireAdmin, isCronRequest } from './_lib/auth.js'
import { runSendBatch } from './_lib/engine.js'

// GET  — hourly Vercel Cron trigger (Authorization: Bearer CRON_SECRET).
//        The engine itself gates on the kill switch, AEST business hours,
//        weekdays, and the warm-up daily cap.
// POST — manual trigger from the dashboard. { batchSize?, force? }
//        force=true skips only the time-window gate for testing;
//        the kill switch, caps, and DNC checks always apply.
export default async function handler(req, res) {
  if (!methodGuard(req, res, 'GET', 'POST')) return

  if (req.method === 'GET') {
    if (!isCronRequest(req)) return json(res, 401, { error: 'Unauthorized' })
    try {
      const result = await runSendBatch({ batchSize: 10 })
      return json(res, 200, result)
    } catch (e) {
      return json(res, 500, { error: e.message })
    }
  }

  const user = await requireAdmin(req)
  if (!user) return json(res, 401, { error: 'Unauthorized' })
  const { batchSize = 5, force = false } = req.body || {}
  try {
    const result = await runSendBatch({ batchSize: Math.min(batchSize, 15), force })
    return json(res, 200, result)
  } catch (e) {
    return json(res, 500, { error: e.message })
  }
}
