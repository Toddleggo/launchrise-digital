import { motion } from 'framer-motion'
import { portfolio } from '../data'
import PortfolioCard from '../components/PortfolioCard'
import CTASection from '../components/CTASection'

export default function Portfolio() {
  return (
    <main className="pt-28">
      <section className="py-20 text-center" style={{ background: '#0A0A0A' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="section-label mb-4">Real Builds</p>
          <h1 className="font-display font-semibold text-white mb-4" style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}>
            Our <span className="gold-text">Portfolio</span>
          </h1>
          <div className="gold-line mx-auto mb-6" />
          <p className="font-body text-white/55 text-lg max-w-2xl mx-auto">
            A selection of real digital products we've designed and built — from AI recovery tools to legal document generators.
          </p>
        </motion.div>
      </section>

      <div className="section-divider" />

      <section className="py-24" style={{ background: '#0F0F0F' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolio.map((p, i) => <PortfolioCard key={p.id} project={p} index={i} />)}
          </div>

          {/* Screenshot notice */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 border border-gold-DEFAULT/20 p-8 text-center"
          >
            <p className="section-label mb-3">Screenshots</p>
            <p className="font-body text-white/50 text-sm">
              Full project screenshots are being added. Place project images in{' '}
              <span className="font-mono text-gold-DEFAULT text-xs">src/assets/portfolio/</span>{' '}
              and update the portfolio data in{' '}
              <span className="font-mono text-gold-DEFAULT text-xs">src/data/index.js</span>.
            </p>
          </motion.div>
        </div>
      </section>

      <CTASection
        headline="Want a build like this?"
        sub="Every project starts with an idea. Tell us yours and we'll build it to the same standard."
        primary="Request a Quote"
        primaryTo="/quote"
        secondary="View Services"
        secondaryTo="/services"
      />
    </main>
  )
}
