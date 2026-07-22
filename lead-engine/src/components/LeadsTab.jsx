import { useState, useEffect, useCallback } from 'react'
import { getLeads, sourceLeads, enrichLeads, personalizeLeads, queueLeads } from '../lib/engine'

const SCORE_LABEL = { 0: 'No site', 1: 'Outdated', 2: 'Decent', 3: 'Modern' }

export default function LeadsTab() {
  const [leads, setLeads] = useState([])
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')
  const [busy, setBusy] = useState(null) // 'source' | 'enrich' | 'personalize' | 'queue'
  const [status, setStatus] = useState(null)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all')

  const refresh = useCallback(async () => {
    try {
      setLeads(await getLeads())
    } catch (e) {
      setError(e.message)
    }
  }, [])

  useEffect(() => { refresh() }, [refresh])

  async function run(name, fn) {
    setBusy(name)
    setError(null)
    setStatus(null)
    try {
      await fn()
      await refresh()
    } catch (e) {
      setError(e.message)
    } finally {
      setBusy(null)
    }
  }

  const doSource = () =>
    run('source', async () => {
      const r = await sourceLeads(category.trim(), location.trim())
      setStatus(`Found ${r.found}, inserted ${r.inserted} new leads (${r.skipped_dnc} skipped as DNC). Now run enrichment.`)
    })

  const doEnrich = () =>
    run('enrich', async () => {
      let total = 0
      let remaining = 1
      while (remaining > 0) {
        const r = await enrichLeads(8)
        total += r.processed
        remaining = r.remaining
        setStatus(`Enriching… ${total} done, ${remaining} remaining`)
        if (r.processed === 0) break
      }
      setStatus(`Enrichment complete — ${total} leads scored.`)
    })

  const doPersonalize = () =>
    run('personalize', async () => {
      let total = 0
      let remaining = 1
      while (remaining > 0) {
        const r = await personalizeLeads(5)
        total += r.processed
        remaining = r.remaining
        setStatus(`Personalizing… ${total} done, ${remaining} remaining`)
        if (r.processed === 0) break
      }
      setStatus(`Personalization complete — ${total} opening lines generated.`)
    })

  const doQueue = () =>
    run('queue', async () => {
      const ready = leads.filter(
        (l) => l.status === 'new' && l.enriched_at && l.website_quality_score < 3 && (l.email || l.phone)
      )
      if (ready.length === 0) throw new Error('No enriched, contactable leads with status "new" to queue')
      await queueLeads(ready.map((l) => l.id))
      setStatus(`Queued ${ready.length} leads for touch 1.`)
    })

  const shown = leads.filter((l) => (filter === 'all' ? true : l.status === filter))
  const statuses = ['all', ...new Set(leads.map((l) => l.status))]

  return (
    <div>
      <div className="card">
        <h2>Source new leads</h2>
        <div className="row">
          <input className="input" style={{ maxWidth: 220 }} placeholder="Category, e.g. electrician" value={category} onChange={(e) => setCategory(e.target.value)} />
          <input className="input" style={{ maxWidth: 220 }} placeholder="Location, e.g. Melbourne VIC" value={location} onChange={(e) => setLocation(e.target.value)} />
          <button className="btn" disabled={!!busy || !category.trim() || !location.trim()} onClick={doSource}>
            {busy === 'source' ? 'Sourcing…' : 'Source from Google Places'}
          </button>
        </div>
        <div className="row mt">
          <button className="btn secondary" disabled={!!busy} onClick={doEnrich}>
            {busy === 'enrich' ? 'Enriching…' : '2. Enrich (score sites + find emails)'}
          </button>
          <button className="btn secondary" disabled={!!busy} onClick={doPersonalize}>
            {busy === 'personalize' ? 'Generating…' : '3. Generate AI personalization'}
          </button>
          <button className="btn secondary" disabled={!!busy} onClick={doQueue}>
            {busy === 'queue' ? 'Queuing…' : '4. Queue ready leads for outreach'}
          </button>
        </div>
        <p className="muted mt">
          One text search returns up to 60 results — run multiple suburbs to cover a city.
          Emails are only ever pulled from each business&rsquo;s own website (inferred consent).
          Leads with clearly modern sites are auto-closed. Queued leads enter the send sequence,
          hottest score first, once a campaign for their category is active.
        </p>
        {status && <p className="ok">{status}</p>}
        {error && <p className="error">{error}</p>}
      </div>

      <div className="card">
        <div className="row" style={{ marginBottom: 10 }}>
          <h2 style={{ margin: 0 }}>Leads ({shown.length})</h2>
          <div className="spacer" />
          <select className="input" style={{ maxWidth: 180 }} value={filter} onChange={(e) => setFilter(e.target.value)}>
            {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Business</th><th>Category</th><th>Suburb</th><th>Site</th><th>Score</th>
                <th>Email</th><th>Phone</th><th>Status</th><th>Personalization</th>
              </tr>
            </thead>
            <tbody>
              {shown.length === 0 && <tr><td colSpan={9} className="muted">No leads yet — source a category above.</td></tr>}
              {shown.map((l) => (
                <tr key={l.id}>
                  <td>{l.business_name}</td>
                  <td>{l.category}</td>
                  <td>{l.suburb || '—'}</td>
                  <td>{l.enriched_at ? SCORE_LABEL[l.website_quality_score] : 'pending'}</td>
                  <td>{l.lead_score}</td>
                  <td className="muted">{l.email || '—'}</td>
                  <td className="muted">{l.phone || '—'}</td>
                  <td><span className={`pill ${l.status}`}>{l.status}</span></td>
                  <td className="muted" style={{ maxWidth: 280 }}>{l.personalization_line || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
