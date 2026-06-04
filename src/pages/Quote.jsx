import { motion } from 'framer-motion'
import QuoteForm from '../components/QuoteForm'

export default function Quote() {
  return (
    <main className="pt-28">
      <section className="py-20" style={{ background: '#0A0A0A' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="section-label mb-4">Let's Build Something</p>
            <h1 className="font-display font-semibold text-white mb-4" style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}>
              Request a <span className="gold-text">Quote</span>
            </h1>
            <div className="gold-line mx-auto mb-6" />
            <p className="font-body text-white/55 text-lg leading-relaxed">
              Tell us about your project. The more detail you give, the more accurate your quote will be. We'll review your request and respond within 5 business days.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      <section className="py-16" style={{ background: '#0F0F0F' }}>
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <QuoteForm />
          </motion.div>
        </div>
      </section>
    </main>
  )
}
