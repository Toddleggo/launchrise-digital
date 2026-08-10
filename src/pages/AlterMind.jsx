import { motion } from 'framer-motion'

const coreFeatures = [
  { icon: '🧠', title: 'ADHD-First Design', desc: 'Every screen, every interaction, every flow is built for the way ADHD minds actually work — not how neurotypical designers think they should.' },
  { icon: '📋', title: 'Daily Structure & Routines', desc: 'Gentle, flexible daily routines that help you build consistency without the rigidity that makes ADHD brains shut down.' },
  { icon: '⚡', title: 'Task Breakdown Engine', desc: 'Big overwhelming tasks get broken into small, dopamine-friendly steps. Start anywhere. Move forward. That\'s all that matters.' },
  { icon: '🎯', title: 'Focus Sessions', desc: 'Structured focus blocks with built-in breaks, body doubling, and accountability — designed around how ADHD attention actually works.' },
  { icon: '💬', title: 'AI Support Companion', desc: 'An AI that understands ADHD. Talk through overwhelm, get grounded advice, process the chaos — without judgement, without the wait.' },
  { icon: '📊', title: 'Mood & Energy Tracking', desc: 'Track your patterns across days and weeks. Understand your cycles, spot your high-performance windows, and plan around your biology.' },
]

const mindVaultIntegration = [
  { stat: '60K', label: 'Thoughts per day your brain generates' },
  { stat: '<3s', label: 'To capture one with voice' },
  { stat: '0', label: 'Organising required' },
  { stat: '2x', label: 'Daily AI briefings delivered' },
]

const struggles = [
  { title: 'The Forgetting', desc: "You had the idea. It was brilliant. It's gone. Your brain moves so fast that thoughts evaporate before you can act on them. You're not forgetful — you're processing at a speed that paper can't keep up with." },
  { title: 'The Overwhelm', desc: "You know what you need to do. You can see all 47 things on the list. You can't start any of them. It's not laziness — it's a nervous system that can't prioritise when everything feels equally urgent." },
  { title: 'The Shame Cycle', desc: "You missed the deadline. Again. You forgot the appointment. Again. And now you're spending more energy beating yourself up than it would have taken to do the thing. That cycle ends here." },
]

const platformPillars = [
  { step: '01', title: 'Understand', desc: 'Learn how your ADHD brain actually works — not from textbooks, but from lived experience and real neuroscience translated into language that makes sense.' },
  { step: '02', title: 'Structure', desc: 'Build personalised routines, systems, and habits that work WITH your brain instead of against it. Flexible enough to survive the bad days.' },
  { step: '03', title: 'Capture', desc: 'Never lose another thought. Mind Vault integration captures your voice notes and ideas throughout the day and sends you a structured summary of everything you\'d otherwise forget.' },
  { step: '04', title: 'Support', desc: 'Daily check-ins, AI companion, community support, and a platform that meets you where you are — whether that\'s flying or barely holding on.' },
]

export default function AlterMind() {
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
                ADHD Support Platform
              </span>
            </div>

            <h1 className="font-display font-semibold text-white leading-tight mb-6"
              style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}>
              Alter Mind<br />
              <span style={{
                background: 'linear-gradient(135deg, #7C3AED 0%, #6366F1 50%, #8B5CF6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Built for the way you think.</span>
            </h1>

            <div className="w-16 h-px mb-8" style={{ background: '#7C3AED', opacity: 0.6 }} />

            <p className="font-body text-white/60 text-xl leading-relaxed max-w-3xl mb-6">
              ADHD isn't a disorder you manage — it's a brain you learn to work with. Alter Mind is the platform built from the ground up for people who think differently, move differently, and need tools that actually understand that.
            </p>
            <p className="font-body text-white/70 text-xl leading-relaxed max-w-3xl font-medium mb-10">
              Not another productivity app. A support system that gets it.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <a href="#features"
                className="inline-flex items-center justify-center px-8 py-4 font-body font-semibold text-xs tracking-widest uppercase text-white transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, #7C3AED 0%, #6366F1 50%, #7C3AED 100%)',
                  backgroundSize: '200% auto',
                  boxShadow: '0 0 30px rgba(124, 58, 237, 0.4)',
                }}
              >
                Explore the Platform
              </a>
              <span className="font-body text-white/30 text-sm self-center">Coming soon — join the waitlist</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(124, 58, 237, 0.3), transparent)' }} />

      {/* The Struggles */}
      <section className="py-24 lg:py-32" style={{ background: '#0F0F0F' }}>
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: '#7C3AED', opacity: 0.85 }}>We Get It</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-white mb-4">This isn't a motivation problem.</h2>
            <div className="w-16 h-px mx-auto mb-6" style={{ background: '#7C3AED', opacity: 0.6 }} />
            <p className="font-body text-white/50 max-w-2xl mx-auto">
              You're not lazy. You're not broken. You're running a different operating system — and every tool you've tried was built for someone else's brain.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {struggles.map((item, i) => (
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
                <h3 className="font-display text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="font-body text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(124, 58, 237, 0.3), transparent)' }} />

      {/* The Platform */}
      <section className="py-24 lg:py-32" style={{ background: '#0A0A0A' }}>
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: '#7C3AED', opacity: 0.85 }}>The Platform</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-white mb-4">
              Four pillars. <span style={{
                background: 'linear-gradient(135deg, #7C3AED 0%, #6366F1 50%, #8B5CF6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>One system.</span>
            </h2>
            <div className="w-16 h-px mx-auto" style={{ background: '#7C3AED', opacity: 0.6 }} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {platformPillars.map((item, i) => (
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
      <section id="features" className="py-24 lg:py-32" style={{ background: '#0F0F0F' }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: '#7C3AED', opacity: 0.85 }}>Features</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-white mb-4">Built for your brain.</h2>
            <div className="w-16 h-px mx-auto mb-6" style={{ background: '#7C3AED', opacity: 0.6 }} />
            <p className="font-body text-white/50 max-w-2xl mx-auto">
              Every feature exists because ADHD minds need it — not because a product manager thought it looked good on a feature list.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreFeatures.map((feature, i) => (
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

      {/* Mind Vault Integration */}
      <section className="py-24 lg:py-32" style={{ background: '#0A0A0A' }}>
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: '#7C3AED', opacity: 0.85 }}>Powered By Mind Vault</p>
                <h2 className="font-display text-3xl md:text-4xl font-medium text-white mb-6">
                  Never lose a thought again.<br />
                  <span style={{
                    background: 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>Mind Vault captures it all.</span>
                </h2>
                <p className="font-body text-white/60 leading-relaxed mb-6">
                  You're in the shower and the perfect idea hits. You're driving and remember something important. You're in a meeting and a solution clicks. By the time you can write it down — it's gone.
                </p>
                <p className="font-body text-white/60 leading-relaxed mb-6">
                  Mind Vault is a voice-first AI capture tool integrated into Alter Mind. Tap, speak, done — under three seconds. The AI classifies your thought, pulls out deadlines, and structures your rambling voice note into something useful.
                </p>
                <p className="font-body text-white/70 leading-relaxed font-medium mb-8">
                  Every morning and evening, you get an AI-written briefing of everything you captured — so the ideas that used to vanish now show up ready to act on.
                </p>
                <a href="https://mindvault.blog" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-body text-sm transition-all duration-300 hover:-translate-y-0.5"
                  style={{ color: '#A78BFA' }}
                >
                  Try Mind Vault free at mindvault.blog
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5.5 3L9.5 7L5.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {mindVaultIntegration.map((item, i) => (
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

      {/* Built Different */}
      <section className="py-24 lg:py-32" style={{ background: '#0F0F0F' }}>
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: '#7C3AED', opacity: 0.85 }}>Built Different</p>
                <h2 className="font-display text-3xl md:text-4xl font-medium text-white mb-6">
                  This isn't Notion<br />
                  <span style={{
                    background: 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>with an ADHD label.</span>
                </h2>
                <p className="font-body text-white/60 leading-relaxed mb-6">
                  We've tried every productivity system going — Notion, Todoist, Obsidian, Apple Reminders, sticky notes on the monitor. They all assume you have the executive function to sit down, open the app, decide what to write, categorise it, and follow up.
                </p>
                <p className="font-body text-white/60 leading-relaxed mb-6">
                  ADHD brains don't work that way. The moment of clarity happens while you're cooking, running, half-asleep. The motivation window is 30 seconds long. The overwhelm hits before you even open the app.
                </p>
                <p className="font-body text-white/70 leading-relaxed font-medium">
                  Alter Mind is designed for that reality. Low friction. No setup required. Meets you exactly where you are — whether that's on fire or barely holding on.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { q: 'Do I need a diagnosis to use this?', a: 'No. Alter Mind is built for anyone who struggles with focus, executive function, overwhelm, or thought chaos — whether you have a formal ADHD diagnosis or not.' },
                  { q: 'Is this a replacement for medication or therapy?', a: 'No. Alter Mind is a support tool that sits alongside your existing treatment. Think of it as the practical, daily layer that medication and therapy don\'t cover.' },
                  { q: 'What makes this different from other ADHD apps?', a: 'Most ADHD apps are productivity tools with an ADHD badge slapped on. Alter Mind is built from scratch by people who live with ADHD, for the specific way ADHD brains process, forget, and function.' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6"
                    style={{
                      background: 'rgba(124, 58, 237, 0.04)',
                      border: '1px solid rgba(124, 58, 237, 0.12)',
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
      <div className="w-full h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(124, 58, 237, 0.3), transparent)' }} />

      {/* Testimonial / Hook */}
      <section className="py-24 lg:py-32" style={{ background: '#0A0A0A' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="font-mono text-xs tracking-widest uppercase mb-8" style={{ color: '#7C3AED', opacity: 0.85 }}>The Truth</p>
            <p className="font-display text-3xl md:text-4xl font-medium text-white/90 leading-relaxed mb-8 italic">
              "ADHD isn't about not being able to focus. It's about not being able to control what you focus on — and losing everything else in the process."
            </p>
            <div className="w-16 h-px mx-auto mb-8" style={{ background: '#7C3AED', opacity: 0.6 }} />
            <p className="font-body text-white/40 text-lg">
              Alter Mind doesn't try to fix you. It gives you a system that works with the brain you actually have.
            </p>
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
            <p className="font-mono text-xs tracking-widest uppercase mb-6" style={{ color: '#7C3AED', opacity: 0.85 }}>Your Brain. Your Rules.</p>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium text-white mb-6 leading-tight">
              Stop fighting your brain.<br />
              <span style={{
                background: 'linear-gradient(135deg, #7C3AED 0%, #6366F1 50%, #8B5CF6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Start working with it.</span>
            </h2>
            <div className="w-16 h-px mx-auto mb-8" style={{ background: '#7C3AED', opacity: 0.6 }} />
            <p className="font-body text-white/60 text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
              Alter Mind is the ADHD support platform built by people who get it — for people who need it. Structure, capture, focus, and support, all in one place.
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
                Try Mind Vault Free
              </a>
              <a href="https://mindvault.blog" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 font-body font-semibold text-xs tracking-widest uppercase transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'transparent',
                  color: '#A78BFA',
                  border: '1px solid rgba(124, 58, 237, 0.4)',
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
