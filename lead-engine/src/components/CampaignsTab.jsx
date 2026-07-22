import { useState, useEffect, useCallback } from 'react'
import { getCampaigns, saveCampaign, toggleCampaign } from '../lib/engine'

const EMPTY = {
  category: '',
  demo_site_url: '',
  price_point: '$499',
  touch_1_sms: 'Hi {{business_name}} — {{personalization_line}} We build simple sites for {{category}}s from {{price_point}}. Demo: {{demo_site_url}}',
  touch_1_email_subject: 'A website for {{business_name}}?',
  touch_1_email_body:
    'Hi,\n\n{{personalization_line}}\n\nWe build clean, mobile-friendly websites for local {{category}}s from {{price_point}}, usually live within a week. Here’s a demo of what yours could look like: {{demo_site_url}}\n\nWorth a look?',
  touch_2_sms: 'Hi {{business_name}} — most {{category}}s in {{suburb}} we talk to are losing quote requests without a site. Demo still here: {{demo_site_url}}',
  touch_2_email_subject: 'Quick one for {{business_name}}',
  touch_2_email_body:
    'Hi,\n\nJust following up — businesses like yours in {{suburb}} tell us most of their new customers now find them online first.\n\nThe demo for {{business_name}} is still live here: {{demo_site_url}}\n\nHappy to answer any questions.',
  touch_3_sms: 'Last one from us {{business_name}} — want me to just build the site and show you before you pay anything? Reply YES and it’s done.',
  touch_3_email_subject: 'Want me to just build it?',
  touch_3_email_body:
    'Hi,\n\nLast note from me. Want me to just build the {{business_name}} site and show you the finished thing before you pay anything?\n\nIf it’s not for you, no worries at all — I won’t follow up again.',
}

function TouchFields({ n, form, set }) {
  return (
    <div className="card" style={{ background: 'transparent' }}>
      <h3>Touch {n} {n === 1 ? '(day 0 — personalized offer)' : n === 2 ? '(day 4 — social proof, shorter)' : '(day 9 — direct low-friction close)'}</h3>
      <label className="label">Email subject</label>
      <input className="input" value={form[`touch_${n}_email_subject`] || ''} onChange={(e) => set(`touch_${n}_email_subject`, e.target.value)} />
      <label className="label">Email body</label>
      <textarea className="textarea" rows={5} value={form[`touch_${n}_email_body`] || ''} onChange={(e) => set(`touch_${n}_email_body`, e.target.value)} />
      <label className="label">SMS</label>
      <textarea className="textarea" rows={2} value={form[`touch_${n}_sms`] || ''} onChange={(e) => set(`touch_${n}_sms`, e.target.value)} />
    </div>
  )
}

export default function CampaignsTab() {
  const [campaigns, setCampaigns] = useState([])
  const [form, setForm] = useState(null) // null = list view
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)

  const refresh = useCallback(async () => {
    try {
      setCampaigns(await getCampaigns())
    } catch (e) {
      setError(e.message)
    }
  }, [])

  useEffect(() => { refresh() }, [refresh])

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  async function save() {
    setBusy(true)
    setError(null)
    try {
      await saveCampaign(form)
      setForm(null)
      await refresh()
    } catch (e) {
      setError(e.message)
    } finally {
      setBusy(false)
    }
  }

  if (form) {
    return (
      <div className="card">
        <h2>{form.id ? 'Edit campaign' : 'New campaign'}</h2>
        <p className="muted">
          Placeholders: {'{{business_name}} {{suburb}} {{category}} {{personalization_line}} {{demo_site_url}} {{price_point}}'}.
          The ABN, address, unsubscribe link (email) and &ldquo;Reply STOP&rdquo; (SMS) footers are appended
          automatically to every message — they cannot be turned off.
        </p>
        <div className="row mt">
          <div style={{ flex: 1, minWidth: 180 }}>
            <label className="label">Category (must match sourced leads)</label>
            <input className="input" placeholder="electrician" value={form.category} onChange={(e) => set('category', e.target.value)} />
          </div>
          <div style={{ flex: 1, minWidth: 180 }}>
            <label className="label">Demo site URL</label>
            <input className="input" placeholder="https://demo.example.com" value={form.demo_site_url || ''} onChange={(e) => set('demo_site_url', e.target.value)} />
          </div>
          <div style={{ width: 120 }}>
            <label className="label">Price point</label>
            <input className="input" value={form.price_point || ''} onChange={(e) => set('price_point', e.target.value)} />
          </div>
        </div>
        <div className="mt">
          <TouchFields n={1} form={form} set={set} />
          <TouchFields n={2} form={form} set={set} />
          <TouchFields n={3} form={form} set={set} />
        </div>
        {error && <p className="error">{error}</p>}
        <div className="row mt">
          <button className="btn" disabled={busy || !form.category.trim()} onClick={save}>
            {busy ? 'Saving…' : 'Save campaign'}
          </button>
          <button className="btn secondary" onClick={() => setForm(null)}>Cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="row" style={{ marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>Campaigns</h2>
        <div className="spacer" />
        <button className="btn" onClick={() => setForm({ ...EMPTY })}>+ New campaign</button>
      </div>
      {error && <p className="error">{error}</p>}
      {campaigns.length === 0 && <p className="muted">No campaigns yet. Create one per category before sending.</p>}
      {campaigns.map((c) => (
        <div className="card" key={c.id}>
          <div className="row">
            <div>
              <h3>{c.category} {c.active ? <span className="pill interested">active</span> : <span className="pill closed">inactive</span>}</h3>
              <p className="muted">Demo: {c.demo_site_url || '—'} · Price: {c.price_point}</p>
            </div>
            <div className="spacer" />
            <button className="btn secondary small" onClick={() => setForm(c)}>Edit</button>
            <button
              className={`btn small ${c.active ? 'danger' : 'success'}`}
              onClick={async () => { await toggleCampaign(c.id, !c.active); refresh() }}
            >
              {c.active ? 'Deactivate' : 'Activate'}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
