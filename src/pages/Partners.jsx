import { motion } from 'framer-motion'
import CTASection from '../components/CTASection'

const partners = [
  {
    id: 'mindvault',
    name: 'MindVault',
    domain: 'mindvault.blog',
    url: 'https://mindvault.blog',
    tag: 'AI Memory Companion',
    description: 'An intelligent digital companion designed to help users capture, organise, and recall important personal information. Built for people who want an AI that remembers what matters.',
    color: '#1a2a3a',
    accent: '#38bdf8',
    placeholder: 'MV',
    tech: ['AI/Claude', 'React', 'Replit'],
  },
  {
    id: 'calma-companion',
    name: 'Calma Companion',
    domain: 'calmacompanion.com.au',
    url: 'https://calmacompanion.com.au',
    tag: 'Trusted AI Wellbeing',
    description: 'A trusted AI companion built to support users through calm, structured conversations around wellbeing, mindfulness, and personal growth. Designed with care and safety at its core.',
    color: '#1a3a2a',
    accent: '#4ade80',
    placeholder: 'CC',
    tech: ['AI/Claude', 'React', 'Replit'],
  },
  {
    id: 'alter-mind',
    name: 'Alter Mind',
    domain: 'altermind.com.au',
    url: 'https://altermind.com.au',
    tag: 'AI Mental Health Support',
    description: 'An AI-powered mental health and personal development platform offering guided support, self-reflection tools, and structured wellbeing pathways for everyday users.',
    color: '#2a1a3a',
    accent: '#a78bfa',
    placeholder: 'AM',
    tech: ['AI/Claude', 'React', 'Replit'],
  },
]

export default function Partners() {
  return (
    <main className="pt-28">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden" style={{ background: '#0A0A0A' }}>
        <div className="absolute top-0 right-0 w-96 h-96 opacity-5 rounded-full"
          style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 opacity-5 rounded-full"
          style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)' }} />
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="section-label mb-4">MODC+ Partners</p>
            <h1 className="font-display font-semibold text-white leading-tight mb-6"
              style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}>
              Our Partner<br />
              <span className="gold-text">Applications</span>
            </h1>
            <div className="gold-line mb-8" />
            <p className="font-body text-white/60 text-xl leading-relaxed max-w-3xl mb-6">
              MODC+ Partners is our growing ecosystem of AI-powered applications — each built to serve real users, solve real problems, and demonstrate what's possible when ideas are built properly.
            </p>
            <p className="font-body text-white/60 text-xl leading-relaxed max-w-3xl">
              Every app in the MODC+ network is designed, developed, and maintained by LaunchRise Digital.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Partner Apps */}
      <section className="py-24" style={{ background: '#0F0F0F' }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="section-label mb-4">Live Applications</p>
            <h2 className="font-display text-5xl font-medium text-white mb-4">The MODC+ Network</h2>
            <div className="gold-line mx-auto mb-6" />
            <p className="font-body text-white/50 max-w-xl mx-auto">
              AI-powered tools and platforms built under the MODC+ Partners umbrella — live, working, and ready to use.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {partners.map((partner, i) => (
              <motion.a
                key={partner.id}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="group block"
              >
                <div className="card-premium p-0 overflow-hidden h-full flex flex-col transition-all duration-500 hover:border-gold-DEFAULT/40">
                  {/* Card header with placeholder */}
                  <div className="relative h-48 flex items-center justify-center" style={{ background: partner.color }}>
                    <div className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: `linear-gradient(${partner.accent}33 1px, transparent 1px), linear-gradient(90deg, ${partner.accent}33 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                      }}
                    />
                    <div className="relative w-20 h-20 border-2 flex items-center justify-center" style={{ borderColor: partner.accent }}>
                      <span className="font-display font-bold text-2xl" style={{ color: partner.accent }}>{partner.placeholder}</span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="font-mono text-xs px-3 py-1 rounded-full" style={{ background: `${partner.accent}20`, color: partner.accent }}>
                        {partner.tag}
                      </span>
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="font-display text-2xl font-semibold text-white mb-2 group-hover:text-gold-DEFAULT transition-colors">
                      {partner.name}
                    </h3>
                    <p className="font-mono text-xs text-gold-DEFAULT/70 mb-4">{partner.domain}</p>
                    <p className="font-body text-white/50 text-sm leading-relaxed mb-6 flex-1">
                      {partner.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {partner.tech.map(t => (
                        <span key={t} className="font-mono text-xs text-white/30 border border-white/10 px-2 py-1">{t}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-gold-DEFAULT font-body text-sm group-hover:gap-3 transition-all">
                      <span>Visit App</span>
                      <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* What is MODC+ */}
      <section className="py-24" style={{ background: '#0A0A0A' }}>
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="section-label mb-4">About the Platform</p>
            <h2 className="font-display text-5xl font-medium text-white mb-4">
              What is <span className="gold-text">MODC+</span>?
            </h2>
            <div className="gold-line mx-auto mb-10" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '◈',
                title: 'Built to Last',
                desc: 'Every MODC+ partner app is designed with real architecture, real users, and long-term scalability in mind.',
              },
              {
                icon: '◉',
                title: 'AI-First',
                desc: 'Each application leverages intelligent AI to deliver experiences that adapt, learn, and genuinely help users.',
              },
              {
                icon: '◎',
                title: 'One Network',
                desc: 'All MODC+ apps are connected under one ecosystem — built, maintained, and continuously improved by LaunchRise Digital.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="card-premium p-8 text-center"
              >
                <span className="gold-text text-3xl mb-6 block">{item.icon}</span>
                <h3 className="font-display text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="font-body text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        headline="Want your app in the MODC+ network?"
        sub="We build partner applications from concept to launch. If you have an idea that fits, let's talk."
        primary="Get a Quote"
        primaryTo="/quote"
        secondary="View Our Work"
        secondaryTo="/portfolio"
      />
    </main>
  )
}
