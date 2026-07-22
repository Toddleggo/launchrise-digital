import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import OverviewTab from './components/OverviewTab'
import LeadsTab from './components/LeadsTab'
import CampaignsTab from './components/CampaignsTab'
import RepliesTab from './components/RepliesTab'

const TABS = ['Overview', 'Leads', 'Campaigns', 'Replies']

export default function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState(null)
  const [tab, setTab] = useState('Overview')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  async function login(e) {
    e.preventDefault()
    setAuthError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setAuthError(error.message)
  }

  if (loading) return <div className="container muted">Loading…</div>

  if (!session) {
    return (
      <div className="login">
        <h1 style={{ marginBottom: 4 }}>Lead Engine</h1>
        <p className="muted" style={{ marginBottom: 20 }}>LaunchRise · admin only</p>
        <form onSubmit={login}>
          <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {authError && <p className="error">{authError}</p>}
          <button className="btn" style={{ width: '100%', marginTop: 10 }} type="submit">Sign In</button>
        </form>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="topbar">
        <h1>Lead Engine</h1>
        <button className="btn secondary small" onClick={() => supabase.auth.signOut()}>Sign Out</button>
      </div>
      <div className="tabs">
        {TABS.map((t) => (
          <button key={t} className={`tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>
      {tab === 'Overview' && <OverviewTab />}
      {tab === 'Leads' && <LeadsTab />}
      {tab === 'Campaigns' && <CampaignsTab />}
      {tab === 'Replies' && <RepliesTab />}
    </div>
  )
}
