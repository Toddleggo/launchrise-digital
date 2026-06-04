import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Contact() {
  return (
    <main className="pt-28">
      <section className="py-20 text-center" style={{ background: '#0A0A0A' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="section-label mb-4">Get In Touch</p>
          <h1 className="font-display font-semibold text-white mb-4" style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}>
            Let's <span className="gold-text">Talk</span>
          </h1>
          <div className="gold-line mx-auto mb-6" />
          <p className="font-body text-white/55 text-lg max-w-xl mx-auto">
            Have a question, a project idea, or just want to understand what's possible? We're happy to talk through it.
          </p>
        </motion.div>
      </section>

      <div className="section-divider" />

      <section className="py-24" style={{ background: '#0F0F0F' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact details */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="card-premium p-10">
              <p className="section-label mb-8">Contact Details</p>
              <div className="space-y-6">
                <div>
                  <p className="section-label text-xs mb-1">Business</p>
                  <p className="font-display text-2xl text-white">LaunchRise Digital</p>
                </div>
                <div>
                  <p className="section-label text-xs mb-1">Location</p>
                  <p className="font-body text-white/65">Melbourne, Australia</p>
                </div>
                <div>
                  <p className="section-label text-xs mb-1">Email</p>
                  <a href="mailto:launchrisedigital@gmail.com" className="font-body text-gold-DEFAULT hover:opacity-80 transition-opacity">
                    launchrisedigital@gmail.com
                  </a>
                </div>
                <div>
                  <p className="section-label text-xs mb-1">Response Time</p>
                  <p className="font-body text-white/65 text-sm">Quote requests: within 5 business days<br />General enquiries: within 2 business days</p>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="card-premium p-10 flex flex-col justify-between">
              <div>
                <p className="section-label mb-4">Ready to start?</p>
                <h2 className="font-display text-3xl font-medium text-white mb-4">
                  The fastest way to get started is to submit a build request.
                </h2>
                <div className="gold-line mb-6" />
                <p className="font-body text-white/50 text-sm leading-relaxed mb-8">
                  Fill in the quote form with your project details and we'll review it and come back with a proper scoped quote. No commitment needed — just tell us what you're thinking.
                </p>
              </div>
              <div className="space-y-3">
                <Link to="/quote" className="btn-gold w-full text-center block">
                  Request a Quote
                </Link>
                <a href="mailto:launchrisedigital@gmail.com" className="btn-outline-gold w-full text-center block">
                  Send an Email
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
