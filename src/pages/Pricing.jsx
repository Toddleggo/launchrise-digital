import { motion } from 'framer-motion'
import { pricing } from '../data'
import PricingCard from '../components/PricingCard'
import CTASection from '../components/CTASection'

export default function Pricing() {
  return (
    <main className="pt-28">
      <section className="py-20 text-center" style={{ background: '#0A0A0A' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="section-label mb-4">Transparent Pricing</p>
          <h1 className="font-display font-semibold text-white mb-4" style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}>
            Investment & <span className="gold-text">Pricing</span>
          </h1>
          <div className="gold-line mx-auto mb-6" />
          <p className="font-body text-white/55 text-lg max-w-2xl mx-auto">
            Straightforward pricing with no hidden fees. Every project is quoted individually based on your exact requirements.
          </p>
        </motion.div>
      </section>

      <div className="section-divider" />

      {/* Pricing Cards */}
      <section className="py-24" style={{ background: '#0F0F0F' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pricing.map((plan, i) => <PricingCard key={plan.id} plan={plan} index={i} />)}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 border border-white/5 p-8 text-center"
          >
            <p className="font-body text-white/40 text-sm leading-relaxed max-w-3xl mx-auto">
              <strong className="text-white/60">Quotes are estimates only.</strong> Final pricing depends on scope, features, integrations, timeline, revisions, and technical complexity. All projects require written confirmation of scope before work begins.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Payment structure */}
      <section className="py-24" style={{ background: '#0A0A0A' }}>
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="section-label mb-4">Payment Structure</p>
            <h2 className="font-display text-4xl font-medium text-white mb-4">How payments work</h2>
            <div className="gold-line mx-auto" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="card-premium p-8">
              <p className="section-label mb-4">Websites</p>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="font-body text-white/65 text-sm">Before work starts</span>
                  <span className="gold-text font-display text-2xl">50%</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="font-body text-white/65 text-sm">Before launch / handover</span>
                  <span className="gold-text font-display text-2xl">50%</span>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="card-premium p-8">
              <p className="section-label mb-4">Web Apps</p>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="font-body text-white/65 text-sm">Before work starts</span>
                  <span className="gold-text font-display text-2xl">40%</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="font-body text-white/65 text-sm">After working demo</span>
                  <span className="gold-text font-display text-2xl">30%</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="font-body text-white/65 text-sm">Before final handover</span>
                  <span className="gold-text font-display text-2xl">30%</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Revisions */}
      <section className="py-16" style={{ background: '#0F0F0F' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <p className="section-label mb-4">Revisions</p>
            <p className="font-body text-white/55 leading-relaxed">
              Every project includes a clearly defined scope and a reasonable number of revision rounds. We work collaboratively throughout the build to make sure you're happy before launch. Major changes outside the original scope may require a revised quote — but we always communicate this before proceeding.
            </p>
          </motion.div>
        </div>
      </section>

      <CTASection />
    </main>
  )
}
