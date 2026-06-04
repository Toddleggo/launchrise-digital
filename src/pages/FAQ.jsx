import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { faq } from '../data'
import FAQAccordion from '../components/FAQAccordion'
import CTASection from '../components/CTASection'

export default function FAQ() {
  return (
    <main className="pt-28">
      <section className="py-20 text-center" style={{ background: '#0A0A0A' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="section-label mb-4">Questions & Answers</p>
          <h1 className="font-display font-semibold text-white mb-4" style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}>
            Frequently Asked <span className="gold-text">Questions</span>
          </h1>
          <div className="gold-line mx-auto mb-6" />
          <p className="font-body text-white/55 text-lg max-w-xl mx-auto">
            Everything you need to know before getting started. Can't find your answer? Just ask us.
          </p>
        </motion.div>
      </section>

      <div className="section-divider" />

      <section className="py-24" style={{ background: '#0F0F0F' }}>
        <div className="max-w-3xl mx-auto px-6">
          <FAQAccordion items={faq} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="font-body text-white/40 text-sm mb-6">Still have questions?</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="btn-outline-gold">Contact Us</Link>
              <Link to="/quote" className="btn-gold">Request a Quote</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <CTASection />
    </main>
  )
}
