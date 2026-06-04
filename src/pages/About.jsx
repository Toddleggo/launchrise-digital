import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import CTASection from '../components/CTASection'

export default function About() {
  return (
    <main className="pt-28">
      <section className="py-20" style={{ background: '#0A0A0A' }}>
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="section-label mb-4">About LaunchRise Digital</p>
            <h1 className="font-display font-semibold text-white leading-tight mb-6"
              style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}>
              Built by someone who<br />
              <span className="gold-text">actually builds things.</span>
            </h1>
            <div className="gold-line mb-10" />
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Founder story */}
      <section className="py-24" style={{ background: '#0F0F0F' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="card-premium p-8 sticky top-28">
                <div className="w-16 h-16 border border-gold-DEFAULT flex items-center justify-center mb-6">
                  <span className="gold-text font-display font-bold text-xl">TL</span>
                </div>
                <h3 className="font-display text-2xl font-semibold text-white mb-1">Todd Leggo</h3>
                <p className="font-body text-gold-DEFAULT text-sm mb-6">Founder, LaunchRise Digital</p>
                <div className="space-y-3">
                  {[
                    ['Location', 'Melbourne, Australia'],
                    ['Focus', 'Websites, AI Tools, Web Apps'],
                    ['Approach', 'Practical. Direct. Results-driven.'],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <p className="section-label text-xs mb-0.5">{k}</p>
                      <p className="font-body text-white/60 text-sm">{v}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Link to="/quote" className="btn-gold w-full text-center block">Work With Us</Link>
                </div>
              </div>
            </motion.div>

            {/* Story */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3 space-y-6"
            >
              <p className="font-body text-white/65 text-lg leading-relaxed">
                LaunchRise Digital was built on a simple premise: most people with good ideas don't know how to turn them into something real online. They don't know who to call, what it costs, or whether their idea is even technically possible. The gap between having an idea and having a live product is where most digital businesses never get started.
              </p>
              <p className="font-body text-white/65 text-lg leading-relaxed">
                Todd Leggo started LaunchRise Digital in Melbourne after spending years building his own real-world websites, AI tools, and web applications — learning the hard way what works, what doesn't, and what it actually takes to go from a concept to a live product that people use.
              </p>
              <p className="font-body text-white/65 text-lg leading-relaxed">
                The builds were real. The problems were real. The solutions that came out of them became the foundation of how LaunchRise Digital approaches every project.
              </p>
              <p className="font-body text-white/65 text-lg leading-relaxed">
                We're not a large agency with account managers and bloated retainers. We're a focused digital studio that takes on projects we know we can execute properly — websites, AI-powered tools, and web applications built with intention and delivered without the runaround.
              </p>

              <div className="border-l-2 border-gold-DEFAULT pl-6 py-2 my-8">
                <p className="font-display text-2xl text-white/90 italic leading-relaxed">
                  "If you have an idea and the drive to build it — that's enough. We'll handle the rest."
                </p>
                <p className="font-body text-gold-DEFAULT text-sm mt-3">— Todd Leggo</p>
              </div>

              <p className="font-body text-white/65 text-lg leading-relaxed">
                We work with small businesses, founders, tradies, coaches, and people who've had an idea sitting in their head for too long. We ask the right questions, scope things honestly, and build things properly — without the noise.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Values */}
      <section className="py-24" style={{ background: '#0A0A0A' }}>
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="section-label mb-4">How We Work</p>
            <h2 className="font-display text-4xl font-medium text-white">What you can expect from us</h2>
            <div className="gold-line mx-auto mt-4" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              ['Honest scoping', 'We tell you what something costs and what\'s involved before a single line of code is written.'],
              ['No surprises', 'Scope is agreed upfront. Anything outside that is communicated and quoted before it\'s done.'],
              ['Direct communication', 'You deal with the person building your project — not an account manager in the middle.'],
              ['Proper handover', 'When the build is done, you get everything — the code, the access, the instructions. It\'s yours.'],
            ].map(([title, desc], i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-premium p-8"
              >
                <span className="gold-text font-mono text-xs mb-3 block">0{i + 1}</span>
                <h3 className="font-display text-xl font-medium text-white mb-2">{title}</h3>
                <p className="font-body text-white/50 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  )
}
