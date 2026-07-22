import { useState, useEffect, useCallback } from 'react'
import {
  getSettings, setPaused, getOutreachLog, getLeads, getReplies, runSendBatch,
} from '../lib/engine'

const BUCKETS = { 0: 'No website', 1: 'Outdated site', 2: 'Decent site', 3: 'Modern (skipped)' }

function rate(n, d) {
  return d > 0 ? `${((n / d) * 100).toFixed(1)}%` : '—'
}

export default function OverviewTab() {
  const [settings, setSettings] = useState(null)
  const [log, setLog] = useState([])
  const [leads, setLeads] = useState([])
  const [replies, setReplies] = useState([])
  const [busy, setBusy] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const refresh = useCallback(async () => {
    try {
      const [s, l, ld, r] = await Promise.all([getSettings(), getOutreachLog(), getLeads(), getReplies()])
      setSettings(s)
      setLog(l)
      setLeads(ld)
      setReplies(r)
    } catch (e) {
      setError(e.message)
    }
  }, [])

  useEffect(() => { refresh() }, [refresh])

  async function toggleKillSwitch() {
    setBusy(true)
    setError(null)
    try {
      await setPaused(!settings.sending_paused)
      await refresh()
    } catch (e) {
      setError(e.message)
    } finally {
      setBusy(false)
    }
  }

  async function manualSend(force) {
    setBusy(true)
    setError(null)
    setResult(null)
    try {
      const r = await runSendBatch(5, force)
      setResult(r)
      await refresh()
    } catch (e) {
      setError(e.message)
    } finally {
      setBusy(false)
    }
  }

  if (!settings) return <p className="muted">Loading… {error && <span className="error">{error}</span>}</p>

  const now = Date.now()
  const dayAgo = now - 86400000
  const weekAgo = now - 7 * 86400000
  const sentToday = log.filter((l) => new Date(l.sent_at).getTime() > dayAgo)
  const sentWeek = log.filter((l) => new Date(l.sent_at).getTime() > weekAgo)
  const byTouch = (rows) => [1, 2, 3].map((t) => rows.filter((r) => r.touch_number === t).length)
  const todayT = byTouch(sentToday)
  const weekT = byTouch(sentWeek)

  // Per-lead outcomes for rate breakdowns
  const contacted = new Map() // lead_id -> {replied}
  for (const l of log) {
    const cur = contacted.get(l.lead_id) || { replied: false }
    cur.replied = cur.replied || l.replied
    contacted.set(l.lead_id, cur)
  }
  const interestedIds = new Set(
    replies.filter((r) => r.classification === 'interested').map((r) => r.lead_id)
  )

  const segment = (keyFn) => {
    const map = new Map()
    for (const lead of leads) {
      if (!contacted.has(lead.id)) continue
      const key = keyFn(lead)
      const cur = map.get(key) || { contacted: 0, replied: 0, interested: 0 }
      cur.contacted++
      if (contacted.get(lead.id).replied) cur.replied++
      if (interestedIds.has(lead.id)) cur.interested++
      map.set(key, cur)
    }
    return [...map.entries()].sort((a, b) => b[1].contacted - a[1].contacted)
  }

  const byCategory = segment((l) => l.category || 'unknown')
  const byBucket = segment((l) => BUCKETS[l.website_quality_score] ?? 'unknown')
  const pendingReplies = replies.filter((r) => !r.handled).length

  return (
    <div>
      <div className={`kill-switch ${settings.sending_paused ? 'paused' : 'live'}`}>
        <div>
          <h3>{settings.sending_paused ? '⏸ Sending is PAUSED' : '● Sending is LIVE'}</h3>
          <p className="muted">
            Kill switch stops all outgoing messages immediately. Warm-up:{' '}
            {settings.warmup_started_at
              ? `started ${new Date(settings.warmup_started_at).toLocaleDateString()}`
              : 'not started'}{' '}
            · caps {settings.week1_cap}/{settings.week2_cap}/{settings.max_daily_cap} per day ·
            window {settings.send_window_start}:00–{settings.send_window_end}:00 AEST weekdays
          </p>
        </div>
        <div className="spacer" />
        <button className={`btn ${settings.sending_paused ? 'success' : 'danger'}`} disabled={busy} onClick={toggleKillSwitch}>
          {settings.sending_paused ? 'Resume Sending' : 'PAUSE ALL SENDING'}
        </button>
      </div>

      <div className="grid grid-4">
        <div className="card stat"><div className="num">{sentToday.length}</div><div className="label">Sent today (T1/T2/T3: {todayT.join('/')})</div></div>
        <div className="card stat"><div className="num">{sentWeek.length}</div><div className="label">Sent this week (T1/T2/T3: {weekT.join('/')})</div></div>
        <div className="card stat"><div className="num">{rate([...contacted.values()].filter((c) => c.replied).length, contacted.size)}</div><div className="label">Reply rate</div></div>
        <div className="card stat"><div className="num">{pendingReplies}</div><div className="label">Replies needing action</div></div>
      </div>

      <div className="card mt">
        <div className="row">
          <h2 style={{ margin: 0 }}>Manual send</h2>
          <div className="spacer" />
          <button className="btn secondary" disabled={busy || settings.sending_paused} onClick={() => manualSend(false)}>
            Run send batch
          </button>
          <button className="btn secondary" disabled={busy || settings.sending_paused} onClick={() => manualSend(true)}>
            Run now (ignore time window)
          </button>
        </div>
        <p className="muted mt">
          Sends the next due batch (max 5) respecting the kill switch, warm-up caps, and do-not-contact list.
          The hourly cron does this automatically once sending is live.
        </p>
        {result && (
          <p className="ok">
            Sent {result.sent} · skipped {result.skipped}
            {result.halted ? ` · halted: ${result.halted}` : ''}
            {result.messages?.length ? ` · ${result.messages.join(', ')}` : ''}
            {result.errors?.length ? <span className="error"> · errors: {result.errors.join(' | ')}</span> : ''}
          </p>
        )}
        {error && <p className="error">{error}</p>}
      </div>

      <div className="grid grid-2 mt">
        <div className="card">
          <h2>Performance by category</h2>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Category</th><th>Contacted</th><th>Reply rate</th><th>Interest rate</th></tr></thead>
              <tbody>
                {byCategory.length === 0 && <tr><td colSpan={4} className="muted">No sends yet</td></tr>}
                {byCategory.map(([k, v]) => (
                  <tr key={k}><td>{k}</td><td>{v.contacted}</td><td>{rate(v.replied, v.contacted)}</td><td>{rate(v.interested, v.contacted)}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card">
          <h2>Performance by website bucket</h2>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Segment</th><th>Contacted</th><th>Reply rate</th><th>Interest rate</th></tr></thead>
              <tbody>
                {byBucket.length === 0 && <tr><td colSpan={4} className="muted">No sends yet</td></tr>}
                {byBucket.map(([k, v]) => (
                  <tr key={k}><td>{k}</td><td>{v.contacted}</td><td>{rate(v.replied, v.contacted)}</td><td>{rate(v.interested, v.contacted)}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
