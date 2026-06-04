import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase, getQuotes } from '../lib/supabase'

export default function LeadDashboard() {
  const [session, setSession] = useState(null)
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })
    supabase.auth.onAuthStateChange((_e, s) => setSession(s))
  }, [])

  useEffect(() => {
    if (session) fetchLeads()
  }, [session])

  async function fetchLeads() {
    setLoading(true)
    try {
      const data = await getQuotes()
      setLeads(data || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  async function login(e) {
    e.preventDefault()
    setAuthError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setAuthError(error.message)
  }

  async function logout() {
    await supabase.auth.signOut()
    setSession(null)
    setLeads([])
  }

  if (loading && !session) {
    return (
      <div className="min-h-screen bg-black-DEFAULT flex items-center justify-center">
        <div className="w-6 h-6 border border-gold-DEFAULT border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-black-DEFAULT flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="text-center mb-10">
            <p className="section-label mb-4">Admin Access</p>
            <h1 className="font-display text-4xl font-medium text-white">Leads Dashboard</h1>
          </div>
          <form onSubmit={login} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              className="form-input w-full"
            />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="form-input w-full"
            />
            {authError && <p className="text-red-400 text-sm">{authError}</p>}
            <button type="submit" className="btn-gold w-full">Sign In</button>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black-DEFAULT pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="section-label mb-2">Admin Panel</p>
            <h1 className="font-display text-4xl font-medium text-white">Quote Requests</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-white/30">{leads.length} leads</span>
            <button onClick={logout} className="btn-outline-gold text-xs px-4 py-2">Sign Out</button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-6 h-6 border border-gold-DEFAULT border-t-transparent rounded-full animate-spin" />
          </div>
        ) : leads.length === 0 ? (
          <p className="text-white/40 text-center py-20 font-body">No quote requests yet.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* List */}
            <div className="lg:col-span-1 space-y-3">
              {leads.map((lead) => (
                <button
                  key={lead.id}
                  onClick={() => setSelected(lead)}
                  className={`w-full text-left p-4 border transition-all ${
                    selected?.id === lead.id
                      ? 'border-gold-DEFAULT bg-black-card'
                      : 'border-white/5 bg-black-card hover:border-gold-DEFAULT/30'
                  }`}
                >
                  <p className="font-body font-semibold text-white text-sm">{lead.full_name}</p>
                  <p className="font-body text-white/40 text-xs mt-1">{lead.email}</p>
                  <p className="section-label text-xs mt-2">{lead.project_type}</p>
                  <p className="font-mono text-xs text-white/20 mt-1">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </p>
                </button>
              ))}
            </div>

            {/* Detail */}
            <div className="lg:col-span-2">
              {selected ? (
                <div className="card-premium p-8 space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="font-display text-3xl font-medium text-white">{selected.full_name}</h2>
                      <p className="font-body text-white/50 text-sm mt-1">{selected.email}</p>
                    </div>
                    <span className="section-label">{selected.budget_range}</span>
                  </div>
                  <div className="section-divider" />
                  {[
                    ['Project Type', selected.project_type],
                    ['Idea', selected.idea_description],
                    ['Features', selected.features_wanted],
                    ['Needs Logins', selected.needs_logins],
                    ['Needs Payments', selected.needs_payments],
                    ['Needs AI', selected.needs_ai],
                    ['Examples', selected.similar_examples],
                    ['Budget', selected.budget_range],
                    ['Timeline', selected.ideal_timeline],
                    ['Notes', selected.anything_else],
                    ['Phone', selected.phone],
                    ['Business', selected.business_name],
                  ].filter(([, v]) => v).map(([k, v]) => (
                    <div key={k}>
                      <p className="section-label mb-1">{k}</p>
                      <p className="font-body text-white/70 text-sm">{v}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="card-premium p-16 flex items-center justify-center h-full">
                  <p className="font-body text-white/20 text-sm">Select a lead to view details</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
