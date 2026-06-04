import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import CTASection from '../components/CTASection'

const appTypes = [
  { icon: '◉', title: 'AI Assistant Apps', desc: 'Custom AI tools trained on your content, built into your product.' },
  { icon: '◎', title: 'Quote & Pricing Tools', desc: 'Smart calculators that turn visitor questions into qualified leads.' },
  { icon: '◈', title: 'Legal & Document Tools', desc: 'Guided document builders, template generators, and form-based tools.' },
  { icon: '◇', title: 'Recovery & Support Apps', desc: 'Accountability tools, check-in apps, and user-driven support platforms.' },
  { icon: '◉', title: 'Trust & Rating Tools', desc: 'Verification systems, scoring engines, and social proof platforms.' },
  { icon: '◎', title: 'Business Portals', desc: 'Client portals, admin dashboards, and private team management tools.' },
  { icon: '◈', title: 'Subscription Platforms', desc: 'Gated content, paid memberships, and SaaS product foundations.' },
  { icon: '◇', title: 'Internal Tools', desc: 'Custom software for your team — built exactly how you need it.' },
  { icon: '◉', title: 'Digital Product Platforms', desc: 'Sell digital products, templates, files, and resources with a premium experience.' },
]

export default function WebApps() {
  return (
    <main className="pt-28">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden" style={{ background: '#0A0A0A' }}>
        <div className="absolute top-0 right-0 w-96 h-96 opacity-5 rounded-full"
          style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)' }} />
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="section-label mb-4">Custom Web Applications</p>
            <h1 className="font-display font-semibold text-white leading-tight mb-6"
              style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}>
              Your idea is closer to real<br />
              <span className="gold-text">than you think.</span>
            </h1>
            <div className="gold-line mb-8" />
            <p className="font-body text-white/60 text-xl leading-relaxed max-w-3xl mb-10">
              You've had the concept. You've thought about the users, the features, what it would look like. You just didn't know who could build it — or whether it was even possible without a team of developers and a six-figure budget.
            </p>
            <p className="font-body text-white/60 text-xl leading-relaxed max-w-3xl mb-12">
              We build working web applications from rough ideas every day. Real software. Real users. Real results.
            </p>
            <Link to="/quote" className="btn-gold">Turn My Idea Into An App</Link>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* What we can build */}
      <section className="py-24" style={{ background: '#0F0F0F' }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="section-label mb-4">App Types</p>
            <h2 className="font-display text-5xl font-medium text-white mb-4">What can we build?</h2>
            <div className="gold-line mx-auto mb-6" />
            <p className="font-body text-white/50 max-w-xl mx-auto">
              Anything that runs in a browser and does something useful. Here's what we've built and what we can build for you.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appTypes.map((app, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="card-premium p-8"
              >
                <span className="gold-text text-2xl mb-4 block">{app.icon}</span>
                <h3 className="font-display text-xl font-semibold text-white mb-2">{app.title}</h3>
                <p className="font-body text-white/50 text-sm leading-relaxed">{app.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* How it works for apps */}
      <section className="py-24" style={{ background: '#0A0A0A' }}>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="section-label mb-4">The Reality</p>
            <h2 className="font-display text-5xl font-medium text-white mb-4">
              You don't need to know<br /><span className="gold-text">anything about tech.</span>
            </h2>
            <div className="gold-line mx-auto mb-10" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'You bring the idea', desc: 'A rough concept is all you need. We ask the right questions to turn it into a proper build plan.' },
              { step: '02', title: 'We scope it properly', desc: 'We define exactly what gets built, what it costs, and what it\'ll look like — before any work starts.' },
              { step: '03', title: 'We build, you approve', desc: 'We build in stages, show you progress, and don\'t launch until you\'re happy with every detail.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="w-14 h-14 border border-gold-DEFAULT/40 flex items-center justify-center mx-auto mb-6">
                  <span className="font-mono text-sm text-gold-DEFAULT">{item.step}</span>
                </div>
                <h3 className="font-display text-2xl font-medium text-white mb-3">{item.title}</h3>
                <p className="font-body text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Pricing teaser */}
      <section className="py-24" style={{ background: '#0F0F0F' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="section-label mb-4">Investment</p>
            <h2 className="font-display text-4xl font-medium text-white mb-8">What do web apps cost?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                { label: 'Simple Tools, Portals & MVPs', price: 'From $1,500' },
                { label: 'Advanced AI / SaaS Applications', price: '$5,000–$20,000+' },
              ].map((item, i) => (
                <div key={i} className="card-premium p-8 flex flex-col items-center justify-center text-center">
                  <span className="font-body text-white/50 text-sm mb-3">{item.label}</span>
                  <span className="gold-text font-display text-3xl font-medium">{item.price}</span>
                </div>
              ))}
            </div>
            <p className="font-body text-white/30 text-sm mb-8">Pricing depends on scope, features, integrations, and complexity. Every project is quoted individually.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/quote" className="btn-gold">Get My App Quoted</Link>
              <Link to="/pricing" className="btn-outline-gold">View All Pricing</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <CTASection
        headline="Ready to build your app?"
        sub="Tell us your idea. We'll scope it, quote it, and build it — from concept to live product."
        primary="Start My Build"
        primaryTo="/quote"
        secondary="See Portfolio"
        secondaryTo="/portfolio"
      />
    </main>
  )
}
