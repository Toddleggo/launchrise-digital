import { motion } from 'framer-motion'

const features = [
  {
    icon: '🛡️',
    title: 'AI Recovery Companion',
    desc: 'A real-time AI companion trained on recovery principles. Talk through cravings, process difficult emotions, and get grounded support whenever you need it — day or night.',
  },
  {
    icon: '📊',
    title: 'Daily Check-Ins',
    desc: 'Start each day with a guided check-in that tracks your mood, energy, cravings, and overall wellbeing. Build awareness of your patterns over time.',
  },
  {
    icon: '🔥',
    title: 'Sobriety Tracker',
    desc: 'Watch your days stack up. Your sobriety counter is front and centre — a daily reminder of how far you\'ve come and why you keep going.',
  },
  {
    icon: '🆘',
    title: 'Craving Support',
    desc: 'When the urge hits, the AI steps in with grounding exercises, distraction techniques, and real talk to get you through the moment.',
  },
  {
    icon: '📓',
    title: 'Recovery Journal',
    desc: 'Write freely about your journey. The AI reads your entries to understand your experience and provide more personalised support over time.',
  },
  {
    icon: '🏆',
    title: 'Milestone Celebrations',
    desc: 'Every milestone matters. Sober Companion recognises your progress at every stage — from day one to year one and beyond.',
  },
]

const howItHelps = [
  { time: '6:00 AM', title: 'Morning Check-In', desc: 'Rate your mood, set your intention for the day, and get a supportive message tailored to where you are in your journey.' },
  { time: 'Any Time', title: 'AI Companion', desc: 'Talk to your companion about anything — cravings, stress, relationships, progress. It listens, it understands, it helps.' },
  { time: 'Crisis', title: 'Craving Support', desc: 'When you feel the pull, open the app. Grounding exercises, breathing techniques, and honest conversation to get you through.' },
  { time: 'Evening', title: 'Reflect & Journal', desc: 'End your day with reflection. Write about what went well, what was hard, and what you\'re grateful for.' },
]

const stats = [
  { value: '24/7', label: 'Always available' },
  { value: '100%', label: 'Private & confidential' },
  { value: '0', label: 'Judgement' },
  { value: '∞', label: 'Support' },
]

export default function SoberCompanion() {
  return (
    <main className="pt-28">
      {/* Hero */}
      <section className="py-20 lg:py-32 relative overflow-hidden" style={{ background: '#0A0A0A' }}>
        <div className="absolute top-0 right-0 w-[700px] h-[700px] opacity-[0.06] rounded-full"
          style={{ background: 'radial-gradient(circle, #FF6B00 0%, transparent 55%)' }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-[0.04] rounded-full"
          style={{ background: 'radial-gradient(circle, #FF8C00 0%, transparent 55%)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-[0.02] rounded-full"
          style={{ background: 'radial-gradient(circle, #FFA500 0%, transparent 70%)' }} />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-body font-semibold tracking-wider uppercase"
                style={{ background: 'rgba(255, 107, 0, 0.12)', color: '#FF8C00', border: '1px solid rgba(255, 107, 0, 0.3)' }}>
                AI-Powered Recovery Support
              </span>
            </div>

            <h1 className="font-display font-semibold text-white leading-tight mb-6"
              style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}>
              Recovery is hard.<br />
              <span style={{
                background: 'linear-gradient(135deg, #FF6B00 0%, #FF8C00 50%, #FFA500 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>You don't have to do it alone.</span>
            </h1>

            <div className="w-16 h-px mb-8" style={{ background: '#FF6B00', opacity: 0.6 }} />

            <p className="font-body text-white/60 text-xl leading-relaxed max-w-3xl mb-6">
              Sober Companion is an AI-powered recovery app built for people who are serious about staying sober. It's not a replacement for professional help — it's the support that's there when nothing else is.
            </p>
            <p className="font-body text-white/70 text-xl leading-relaxed max-w-3xl font-medium mb-10">
              3 AM cravings. Sunday afternoons. The moments between meetings. Your companion is always there.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <a href="https://sobercompanion.chat" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 font-body font-semibold text-xs tracking-widest uppercase text-white transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, #FF6B00 0%, #FF8C00 50%, #FF6B00 100%)',
                  backgroundSize: '200% auto',
                  boxShadow: '0 0 30px rgba(255, 107, 0, 0.4)',
                }}
                onMouseOver={e => e.currentTarget.style.boxShadow = '0 0 50px rgba(255, 107, 0, 0.6), 0 0 100px rgba(255, 107, 0, 0.2)'}
                onMouseOut={e => e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 107, 0, 0.4)'}
              >
                Start Your Journey
              </a>
              <span className="font-body text-white/30 text-sm self-center">Free to try — no judgement, no commitment</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255, 107, 0, 0.3), transparent)' }} />

      {/* Stats Strip */}
      <section className="py-10" style={{ background: '#0F0F0F' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center py-4"
              >
                <span className="font-display text-3xl md:text-4xl font-medium block mb-1" style={{
                  background: 'linear-gradient(135deg, #FF6B00 0%, #FFA500 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>{stat.value}</span>
                <span className="font-body text-white/40 text-xs tracking-wider uppercase">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255, 107, 0, 0.3), transparent)' }} />

      {/* The Reality */}
      <section className="py-24 lg:py-32" style={{ background: '#0A0A0A' }}>
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: '#FF6B00', opacity: 0.85 }}>The Reality</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-white mb-4">
              Recovery doesn't clock off at 5 PM.
            </h2>
            <div className="w-16 h-px mx-auto mb-6" style={{ background: '#FF6B00', opacity: 0.6 }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 md:p-16 text-center mb-12"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.06) 0%, rgba(255, 140, 0, 0.03) 100%)',
              border: '1px solid rgba(255, 107, 0, 0.15)',
            }}
          >
            <p className="font-display text-2xl md:text-3xl font-medium text-white/90 leading-relaxed mb-6">
              Sponsors aren't always available. Meetings aren't always on. Therapists don't answer at midnight. But the hardest moments don't wait for business hours.
            </p>
            <p className="font-body text-white/50 text-lg max-w-2xl mx-auto">
              Sober Companion fills the gap. It's the steady, patient presence that's there when you need it most — without the wait, without the stigma, without the judgment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255, 107, 0, 0.3), transparent)' }} />

      {/* A Day With Sober Companion */}
      <section className="py-24 lg:py-32" style={{ background: '#0F0F0F' }}>
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: '#FF6B00', opacity: 0.85 }}>Your Day</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-white mb-4">
              How Sober Companion <span style={{
                background: 'linear-gradient(135deg, #FF6B00 0%, #FFA500 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>walks with you.</span>
            </h2>
            <div className="w-16 h-px mx-auto" style={{ background: '#FF6B00', opacity: 0.6 }} />
          </motion.div>

          <div className="space-y-6">
            {howItHelps.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col md:flex-row gap-6 p-8 transition-all duration-500 hover:-translate-y-1"
                style={{
                  background: '#111111',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                }}
                onMouseOver={e => {
                  e.currentTarget.style.borderColor = 'rgba(255, 107, 0, 0.3)'
                  e.currentTarget.style.boxShadow = '0 0 40px rgba(255, 107, 0, 0.08), 0 20px 60px rgba(0, 0, 0, 0.5)'
                }}
                onMouseOut={e => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div className="shrink-0">
                  <div className="inline-flex items-center justify-center px-4 py-2"
                    style={{ background: 'rgba(255, 107, 0, 0.1)', border: '1px solid rgba(255, 107, 0, 0.25)' }}>
                    <span className="font-mono text-xs tracking-wider" style={{ color: '#FF8C00' }}>{item.time}</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="font-body text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255, 107, 0, 0.3), transparent)' }} />

      {/* Features */}
      <section className="py-24 lg:py-32" style={{ background: '#0A0A0A' }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: '#FF6B00', opacity: 0.85 }}>Features</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-white mb-4">
              Everything you need. Nothing you don't.
            </h2>
            <div className="w-16 h-px mx-auto mb-6" style={{ background: '#FF6B00', opacity: 0.6 }} />
            <p className="font-body text-white/50 max-w-2xl mx-auto">
              Built with intention. Every feature exists because it serves recovery — no bloat, no gimmicks, no data harvesting.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  e.currentTarget.style.borderColor = 'rgba(255, 107, 0, 0.3)'
                  e.currentTarget.style.boxShadow = '0 0 40px rgba(255, 107, 0, 0.08), 0 20px 60px rgba(0, 0, 0, 0.5)'
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
      <div className="w-full h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255, 107, 0, 0.3), transparent)' }} />

      {/* Built Different */}
      <section className="py-24 lg:py-32" style={{ background: '#0F0F0F' }}>
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: '#FF6B00', opacity: 0.85 }}>Built Different</p>
                <h2 className="font-display text-3xl md:text-4xl font-medium text-white mb-6">
                  This isn't a meditation app<br />
                  <span style={{
                    background: 'linear-gradient(135deg, #FF6B00 0%, #FFA500 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>wearing a recovery skin.</span>
                </h2>
                <p className="font-body text-white/60 leading-relaxed mb-6">
                  Most "wellness" apps treat addiction like a mindset problem. They offer breathing exercises and positive affirmations and hope for the best. Sober Companion is built by people who understand what recovery actually looks like.
                </p>
                <p className="font-body text-white/60 leading-relaxed mb-6">
                  The AI is trained on real recovery frameworks. The daily check-ins track what actually matters. The craving support doesn't just say "drink water" — it walks you through the moment with real, grounded conversation.
                </p>
                <p className="font-body text-white/70 leading-relaxed font-medium">
                  It's the pocket-sized support system that never sleeps, never judges, and never gives up on you.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { q: 'Is this a replacement for professional help?', a: 'No. Sober Companion is a support tool that complements therapy, meetings, sponsors, and professional treatment. It fills the gaps between those touchpoints.' },
                  { q: 'Is my data private?', a: 'Completely. Your conversations, journal entries, and check-in data are private. We don\'t sell data, we don\'t run ads, and we don\'t share your information with anyone.' },
                  { q: 'Does it work for all types of recovery?', a: 'Yes. Whether you\'re recovering from alcohol, drugs, gambling, or any other addiction, Sober Companion adapts to your journey and your language.' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6"
                    style={{
                      background: 'rgba(255, 107, 0, 0.04)',
                      border: '1px solid rgba(255, 107, 0, 0.12)',
                    }}
                  >
                    <h4 className="font-display text-lg font-semibold text-white mb-2">{item.q}</h4>
                    <p className="font-body text-white/50 text-sm leading-relaxed">{item.a}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255, 107, 0, 0.3), transparent)' }} />

      {/* Testimonial */}
      <section className="py-24 lg:py-32" style={{ background: '#0A0A0A' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="font-mono text-xs tracking-widest uppercase mb-8" style={{ color: '#FF6B00', opacity: 0.85 }}>The Mission</p>
            <p className="font-display text-3xl md:text-4xl font-medium text-white/90 leading-relaxed mb-8 italic">
              "One day at a time. But you don't have to face any of those days alone."
            </p>
            <div className="w-16 h-px mx-auto mb-8" style={{ background: '#FF6B00', opacity: 0.6 }} />
            <p className="font-body text-white/40 text-lg">
              Sober Companion was built because someone needed it to exist. If you're reading this, maybe you do too.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255, 107, 0, 0.3), transparent)' }} />

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden" style={{ background: '#0A0A0A' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #FF6B00 0%, transparent 60%)' }} />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="font-mono text-xs tracking-widest uppercase mb-6" style={{ color: '#FF6B00', opacity: 0.85 }}>Take the First Step</p>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium text-white mb-6 leading-tight">
              Your recovery.<br />
              <span style={{
                background: 'linear-gradient(135deg, #FF6B00 0%, #FF8C00 50%, #FFA500 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Your companion.</span>
            </h2>
            <div className="w-16 h-px mx-auto mb-8" style={{ background: '#FF6B00', opacity: 0.6 }} />
            <p className="font-body text-white/60 text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
              No sign-up pressure. No credit card. No data harvesting. Just a conversation with an AI that understands what you're going through.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://sobercompanion.chat" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 font-body font-semibold text-xs tracking-widest uppercase text-white transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, #FF6B00 0%, #FF8C00 50%, #FF6B00 100%)',
                  backgroundSize: '200% auto',
                  boxShadow: '0 0 30px rgba(255, 107, 0, 0.4)',
                }}
                onMouseOver={e => e.currentTarget.style.boxShadow = '0 0 50px rgba(255, 107, 0, 0.6), 0 0 100px rgba(255, 107, 0, 0.2)'}
                onMouseOut={e => e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 107, 0, 0.4)'}
              >
                Visit sobercompanion.chat
              </a>
              <a href="https://sobercompanion.chat" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 font-body font-semibold text-xs tracking-widest uppercase transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'transparent',
                  color: '#FF8C00',
                  border: '1px solid rgba(255, 107, 0, 0.4)',
                }}
                onMouseOver={e => {
                  e.currentTarget.style.background = 'rgba(255, 107, 0, 0.1)'
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 107, 0, 0.2)'
                }}
                onMouseOut={e => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                Learn More
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
