import { useState, useEffect, useCallback } from 'react'
import { getReplies, sendReply, markReplyHandled } from '../lib/engine'

export default function RepliesTab() {
  const [replies, setReplies] = useState([])
  const [drafts, setDrafts] = useState({})
  const [busy, setBusy] = useState(null)
  const [error, setError] = useState(null)
  const [showHandled, setShowHandled] = useState(false)

  const refresh = useCallback(async () => {
    try {
      setReplies(await getReplies())
    } catch (e) {
      setError(e.message)
    }
  }, [])

  useEffect(() => { refresh() }, [refresh])

  async function doSend(reply) {
    const body = drafts[reply.id] ?? reply.ai_draft_response ?? ''
    if (!body.trim()) return
    setBusy(reply.id)
    setError(null)
    try {
      await sendReply(reply.id, body)
      await refresh()
    } catch (e) {
      setError(e.message)
    } finally {
      setBusy(null)
    }
  }

  async function dismiss(reply) {
    setBusy(reply.id)
    try {
      await markReplyHandled(reply.id)
      await refresh()
    } finally {
      setBusy(null)
    }
  }

  const shown = replies.filter((r) => (showHandled ? true : !r.handled))

  return (
    <div>
      <div className="row" style={{ marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>Reply queue</h2>
        <div className="spacer" />
        <label className="muted" style={{ fontSize: 13 }}>
          <input type="checkbox" checked={showHandled} onChange={(e) => setShowHandled(e.target.checked)} /> show handled
        </label>
      </div>
      {error && <p className="error">{error}</p>}
      {shown.length === 0 && <p className="muted">Nothing waiting. Every raw reply is also forwarded to your inbox.</p>}
      {shown.map((r) => (
        <div className="card" key={r.id}>
          <div className="row">
            <h3>{r.leads?.business_name || 'Unmatched sender'}</h3>
            <span className={`pill ${r.classification}`}>{r.classification}</span>
            <span className="pill sent">{r.channel}</span>
            {r.handled && <span className="pill closed">handled</span>}
            <div className="spacer" />
            <span className="muted">{new Date(r.created_at).toLocaleString()}</span>
          </div>
          <p className="muted" style={{ margin: '10px 0', whiteSpace: 'pre-wrap' }}>{r.raw_message}</p>
          {(r.classification === 'interested' || r.classification === 'question') && !r.handled && (
            <div className="draft">
              <label className="label" style={{ marginTop: 0 }}>AI-suggested response (edit before sending)</label>
              <textarea
                className="textarea"
                rows={4}
                value={drafts[r.id] ?? r.ai_draft_response ?? ''}
                onChange={(e) => setDrafts((d) => ({ ...d, [r.id]: e.target.value }))}
              />
              <div className="row mt">
                <button className="btn" disabled={busy === r.id} onClick={() => doSend(r)}>
                  {busy === r.id ? 'Sending…' : `Send via ${r.channel}`}
                </button>
                <button className="btn secondary" disabled={busy === r.id} onClick={() => dismiss(r)}>
                  Mark handled
                </button>
              </div>
            </div>
          )}
          {!(r.classification === 'interested' || r.classification === 'question') && !r.handled && (
            <button className="btn secondary small" disabled={busy === r.id} onClick={() => dismiss(r)}>
              Mark handled
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
