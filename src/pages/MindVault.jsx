import { motion } from 'framer-motion'

const features = [
  { title: 'Voice Capture', desc: 'Tap, speak, done — under 3 seconds', icon: '🎙️' },
  { title: 'AI Classification', desc: 'Auto-sorts: task / idea / reminder / person note', icon: '🧠' },
  { title: 'Smart Inbox', desc: 'Every capture, organised automatically', icon: '📥' },
  { title: 'Morning & Evening Rundowns', desc: 'AI-written daily briefings — nothing slips', icon: '☀️' },
  { title: 'Ideas Vault', desc: 'Develop half-formed sparks into structured plans', icon: '💡' },
  { title: 'People Memory', desc: 'Remember birthdays, gift ideas, important details about everyone', icon: '👥' },
  { title: 'AI Assistant', desc: 'Chat with your entire vault — ask questions, get summaries', icon: '🤖' },
]

const howItWorks = [
  { step: '01', title: 'Capture', desc: 'One tap opens the mic. Speak freely — the app records and transcribes your voice in real time. You can also type if you prefer.' },
  { step: '02', title: 'AI Classification', desc: "OpenAI's most capable model reads your capture and decides what it is: a task with a due date, a floating idea, a reminder, or a note about a person in your life." },
  { step: '03', title: 'Smart Delivery', desc: 'Everything lands in your Inbox. Time-sensitive items bubble up. Every morning and evening, an AI-written Rundown tells you exactly what needs your attention.' },
  { step: '04', title: 'Your Second Brain', desc: "Over time, Mind Vault becomes a living record of every thought you've had. The AI Assistant can answer questions about your notes — because it has read everything." },
]

const pricingPlans = [
  { name: 'Free', price: '$0', period: '', desc: 'Try it — no card needed', features: ['10 captures/month', 'Voice capture', 'AI classification', 'Smart Inbox'], cta: 'Start Free', highlight: false },
  { name: 'Plus', price: 'AU$7.99', period: '/mo', desc: 'Daily habit users', features: ['Unlimited captures', 'Morning & Evening Rundowns', 'Ideas Vault', 'Full voice transcription', 'Priority processing'], cta: 'Go Plus', highlight: true },
  { name: 'Pro', price: 'AU$14.99', period: '/mo', desc: 'Power users — everything', features: ['Everything in Plus', 'People Memory', 'AI Assistant', 'Advanced search', 'Data export', 'Priority support'], cta: 'Go Pro', highlight: false },
]

const painPoints = [
  { scenario: "You're in the shower", thought: "and the perfect business idea hits you.", result: "By the time you dry off, it's gone." },
  { scenario: "You're driving", thought: "and remember you need to call someone back, buy a birthday gift, follow up on that email.", result: "You tell yourself you'll remember. You won't." },
  { scenario: "You're in a meeting", thought: "and a solution to a problem you've been stuck on for weeks suddenly clicks.", result: "No phone. Can't write it down. It evaporates." },
]

export default function MindVault() {
  return (
    <main className="pt-28">
      {/* Hero */}
      <section className="py-20 lg:py-32 relative overflow-hidden" style={{ background: '#0A0A0A' }}>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.06] rounded-full"
          style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 60%)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-[0.04] rounded-full"
          style={{ background: 'radial-gradient(circle, #6366F1 0%, transparent 60%)' }} />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-body font-semibold tracking-wider uppercase"
                style={{ background: 'rgba(124, 58, 237, 0.15)', color: '#A78BFA', border: '1px solid rgba(124, 58, 237, 0.3)' }}>
                Built for ADHD Minds
              </span>
            </div>

            <h1 className="font-display font-semibold text-white leading-tight mb-6"
              style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}>
              The Second Brain<br />
              <span style={{
                background: 'linear-gradient(135deg, #7C3AED 0%, #6366F1 50%, #8B5CF6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>You Actually Use.</span>
            </h1>

            <div className="w-16 h-px mb-8" style={{ background: '#7C3AED', opacity: 0.6 }} />

            <p className="font-body text-white/60 text-xl leading-relaxed max-w-3xl mb-6">
              Your brain generates 60,000 thoughts a day. It was never designed to store them — only to have them. Every note app you've tried has failed for the same reason: they ask you to do the work first.
            </p>
            <p className="font-body text-white/70 text-xl leading-relaxed max-w-3xl font-medium mb-10">
              Mind Vault flips that entirely.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <a href="https://mindvault.blog" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 font-body font-semibold text-xs tracking-widest uppercase text-white transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, #7C3AED 0%, #6366F1 50%, #7C3AED 100%)',
                  backgroundSize: '200% auto',
                  boxShadow: '0 0 30px rgba(124, 58, 237, 0.4)',
                }}
                onMouseOver={e => e.currentTarget.style.boxShadow = '0 0 50px rgba(124, 58, 237, 0.6), 0 0 100px rgba(124, 58, 237, 0.2)'}
                onMouseOut={e => e.currentTarget.style.boxShadow = '0 0 30px rgba(124, 58, 237, 0.4)'}
              >
                Try Mind Vault Free
              </a>
              <span className="font-body text-white/30 text-sm self-center">Free plan — no card needed</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(124, 58, 237, 0.3), transparent)' }} />

      {/* Pain Points */}
      <section className="py-24 lg:py-32" style={{ background: '#0F0F0F' }}>
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: '#7C3AED', opacity: 0.85 }}>The Problem</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-white mb-4">This is mental overload.</h2>
            <div className="w-16 h-px mx-auto mb-6" style={{ background: '#7C3AED', opacity: 0.6 }} />
            <p className="font-body text-white/50 max-w-2xl mx-auto">
              It's not a productivity problem. It's a biological one. And every note app ever built has tried to solve it with keyboards, folders, tags, and templates.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {painPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="p-8 transition-all duration-500 hover:-translate-y-1"
                style={{
                  background: '#111111',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                }}
                onMouseOver={e => {
                  e.currentTarget.style.borderColor = 'rgba(124, 58, 237, 0.3)'
                  e.currentTarget.style.boxShadow = '0 0 40px rgba(124, 58, 237, 0.08), 0 20px 60px rgba(0, 0, 0, 0.5)'
                }}
                onMouseOut={e => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <p className="font-display text-xl font-semibold text-white mb-3">
                  {point.scenario}
                </p>
                <p className="font-body text-white/50 text-sm leading-relaxed mb-4">
                  {point.thought}
                </p>
                <p className="font-body text-sm leading-relaxed italic" style={{ color: '#A78BFA' }}>
                  {point.result}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(124, 58, 237, 0.3), transparent)' }} />

      {/* The Solution */}
      <section className="py-24 lg:py-32" style={{ background: '#0A0A0A' }}>
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: '#7C3AED', opacity: 0.85 }}>The Solution</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-white mb-4">
              Tap. Speak. <span style={{
                background: 'linear-gradient(135deg, #7C3AED 0%, #6366F1 50%, #8B5CF6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Done.</span>
            </h2>
            <div className="w-16 h-px mx-auto mb-6" style={{ background: '#7C3AED', opacity: 0.6 }} />
            <p className="font-body text-white/60 text-lg max-w-3xl mx-auto leading-relaxed">
              Mind Vault is a voice-first AI capture tool that works in under three seconds. No typing. No formatting. No deciding where it goes. Just your thought, out of your head and into your vault.
            </p>
          </motion.div>

          {/* Big feature callout */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 md:p-16 text-center mb-12"
            style={{
              background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.08) 0%, rgba(99, 102, 241, 0.04) 100%)',
              border: '1px solid rgba(124, 58, 237, 0.2)',
            }}
          >
            <p className="font-display text-3xl md:text-4xl font-medium text-white leading-relaxed mb-6">
              The AI handles everything — it classifies your capture, pulls out dates and deadlines, and structures your rambling voice note into something useful.
            </p>
            <p className="font-body text-white/50 text-lg max-w-2xl mx-auto">
              Then it serves it back to you exactly when you need it: in a smart Inbox, in an AI-written Morning Rundown before your day starts, and an Evening Rundown before you switch off.
            </p>
          </motion.div>

          <div className="text-center">
            <p className="font-display text-2xl text-white/80 italic">
              "Your mind is finally free to think — not to remember."
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(124, 58, 237, 0.3), transparent)' }} />

      {/* How It Works */}
      <section className="py-24 lg:py-32" style={{ background: '#0F0F0F' }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: '#7C3AED', opacity: 0.85 }}>How It Works</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-white mb-4">Four layers. Working invisibly.</h2>
            <div className="w-16 h-px mx-auto" style={{ background: '#7C3AED', opacity: 0.6 }} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {howItWorks.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 transition-all duration-500 hover:-translate-y-1"
                style={{
                  background: '#111111',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                }}
                onMouseOver={e => {
                  e.currentTarget.style.borderColor = 'rgba(124, 58, 237, 0.3)'
                  e.currentTarget.style.boxShadow = '0 0 40px rgba(124, 58, 237, 0.08), 0 20px 60px rgba(0, 0, 0, 0.5)'
                }}
                onMouseOut={e => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 flex items-center justify-center shrink-0"
                    style={{ border: '1px solid rgba(124, 58, 237, 0.4)' }}>
                    <span className="font-mono text-sm" style={{ color: '#7C3AED' }}>{item.step}</span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-white">{item.title}</h3>
                </div>
                <p className="font-body text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(124, 58, 237, 0.3), transparent)' }} />

      {/* Features */}
      <section className="py-24 lg:py-32" style={{ background: '#0A0A0A' }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: '#7C3AED', opacity: 0.85 }}>Features</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-white mb-4">Everything your brain needs.</h2>
            <div className="w-16 h-px mx-auto" style={{ background: '#7C3AED', opacity: 0.6 }} />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-8 transition-all duration-500 hover:-translate-y-1"
                style={{
                  background: '#111111',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                }}
                onMouseOver={e => {
                  e.currentTarget.style.borderColor = 'rgba(124, 58, 237, 0.3)'
                  e.currentTarget.style.boxShadow = '0 0 40px rgba(124, 58, 237, 0.08), 0 20px 60px rgba(0, 0, 0, 0.5)'
                }}
                onMouseOut={e => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <span className="text-3xl mb-4 block">{feature.icon}</span>
                <h3 className="font-display text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="font-body text-white/50 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(124, 58, 237, 0.3), transparent)' }} />

      {/* Pricing */}
      <section className="py-24 lg:py-32" style={{ background: '#0F0F0F' }}>
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: '#7C3AED', opacity: 0.85 }}>Pricing</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-white mb-4">Free to start. Powerful when you upgrade.</h2>
            <div className="w-16 h-px mx-auto" style={{ background: '#7C3AED', opacity: 0.6 }} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="p-8 flex flex-col relative transition-all duration-500 hover:-translate-y-1"
                style={{
                  background: plan.highlight ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.12) 0%, rgba(99, 102, 241, 0.06) 100%)' : '#111111',
                  border: plan.highlight ? '1px solid rgba(124, 58, 237, 0.4)' : '1px solid rgba(255, 255, 255, 0.05)',
                  boxShadow: plan.highlight ? '0 0 40px rgba(124, 58, 237, 0.15)' : 'none',
                }}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-body font-semibold tracking-wider uppercase"
                    style={{ background: '#7C3AED', color: '#fff' }}>
                    Most Popular
                  </span>
                )}
                <p className="font-body text-white/40 text-xs tracking-wider uppercase mb-2">{plan.desc}</p>
                <h3 className="font-display text-2xl font-semibold text-white mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="font-display text-4xl font-medium" style={{
                    background: 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>{plan.price}</span>
                  {plan.period && <span className="font-body text-white/30 text-sm">{plan.period}</span>}
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="shrink-0 mt-0.5" style={{ color: '#7C3AED' }}>&#10003;</span>
                      <span className="font-body text-white/60 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="https://mindvault.blog" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center py-3.5 font-body font-semibold text-xs tracking-widest uppercase transition-all duration-300 hover:-translate-y-0.5 w-full"
                  style={plan.highlight ? {
                    background: 'linear-gradient(135deg, #7C3AED 0%, #6366F1 100%)',
                    color: '#fff',
                    boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)',
                  } : {
                    background: 'transparent',
                    color: '#A78BFA',
                    border: '1px solid rgba(124, 58, 237, 0.4)',
                  }}
                >
                  {plan.cta}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(124, 58, 237, 0.3), transparent)' }} />

      {/* Testimonial / Hook */}
      <section className="py-24 lg:py-32" style={{ background: '#0A0A0A' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="font-mono text-xs tracking-widest uppercase mb-8" style={{ color: '#7C3AED', opacity: 0.85 }}>What Users Say</p>
            <p className="font-display text-3xl md:text-4xl font-medium text-white/90 leading-relaxed mb-8 italic">
              "I stopped losing ideas the day I found this app. Tap. Speak. Done. My thoughts actually go somewhere now."
            </p>
            <div className="w-16 h-px mx-auto mb-8" style={{ background: '#7C3AED', opacity: 0.6 }} />
            <p className="font-body text-white/40 text-lg mb-2">
              I captured 47 ideas last month that I would've forgotten within minutes.
            </p>
            <p className="font-body text-white/30 text-sm">
              — Mind Vault User
            </p>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(124, 58, 237, 0.3), transparent)' }} />

      {/* ADHD Context Section */}
      <section className="py-24 lg:py-32" style={{ background: '#0F0F0F' }}>
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: '#7C3AED', opacity: 0.85 }}>Built for ADHD</p>
                <h2 className="font-display text-3xl md:text-4xl font-medium text-white mb-6">
                  Not another note app.<br />
                  <span style={{
                    background: 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>A thinking tool.</span>
                </h2>
                <p className="font-body text-white/60 leading-relaxed mb-6">
                  We've tried Notion. Obsidian. Apple Notes. Evernote. Bear. They all have one thing in common — they assume you have time to sit down and write.
                </p>
                <p className="font-body text-white/60 leading-relaxed mb-6">
                  ADHD minds don't work that way. Ideas come while you're running, cooking, half-asleep. Mind Vault is the first tool built for that reality.
                </p>
                <p className="font-body text-white/70 leading-relaxed font-medium">
                  You speak, AI does the rest, and the things that used to vanish now show up in your morning briefing ready to act on.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { stat: '60K', label: 'Thoughts per day' },
                  { stat: '<3s', label: 'To capture one' },
                  { stat: '0', label: 'Tags to create' },
                  { stat: '2x', label: 'Daily AI briefings' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 text-center"
                    style={{
                      background: 'rgba(124, 58, 237, 0.06)',
                      border: '1px solid rgba(124, 58, 237, 0.15)',
                    }}
                  >
                    <span className="font-display text-3xl font-medium block mb-1" style={{
                      background: 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>{item.stat}</span>
                    <span className="font-body text-white/40 text-xs tracking-wider uppercase">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(124, 58, 237, 0.3), transparent)' }} />

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden" style={{ background: '#0A0A0A' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }} />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="font-mono text-xs tracking-widest uppercase mb-6" style={{ color: '#7C3AED', opacity: 0.85 }}>Say it once. Never lose it.</p>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium text-white mb-6 leading-tight">
              Your second brain.<br />
              <span style={{
                background: 'linear-gradient(135deg, #7C3AED 0%, #6366F1 50%, #8B5CF6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Already listening.</span>
            </h2>
            <div className="w-16 h-px mx-auto mb-8" style={{ background: '#7C3AED', opacity: 0.6 }} />
            <p className="font-body text-white/60 text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
              60,000 thoughts today. How many will you remember? Start capturing for free — no card, no commitment, no friction.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://mindvault.blog" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 font-body font-semibold text-xs tracking-widest uppercase text-white transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, #7C3AED 0%, #6366F1 50%, #7C3AED 100%)',
                  backgroundSize: '200% auto',
                  boxShadow: '0 0 30px rgba(124, 58, 237, 0.4)',
                }}
              >
                Start Free at mindvault.blog
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
