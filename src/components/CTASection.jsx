import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function CTASection({
  headline = "Got an idea you've been sitting on?",
  sub = "Stop waiting. We turn ideas into real working online products — websites, AI tools, and web apps built to perform.",
  primary = "Request a Quote",
  primaryTo = "/quote",
  secondary = "See What We Build",
  secondaryTo = "/portfolio"
}) {
  return (
    <section className="py-32 relative overflow-hidden" style={{ background: '#0A0A0A' }}>
      {/* Gold glow blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-5"
        style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)' }} />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label mb-6">Ready to Build?</p>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium text-white mb-6 leading-tight">
            {headline}
          </h2>
          <div className="gold-line mx-auto mb-8" />
          <p className="font-body text-white/60 text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
            {sub}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={primaryTo} className="btn-gold">
              {primary}
            </Link>
            <Link to={secondaryTo} className="btn-outline-gold">
              {secondary}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
