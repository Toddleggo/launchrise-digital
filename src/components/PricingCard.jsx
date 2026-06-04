import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function PricingCard({ plan, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className={`relative flex flex-col p-8 transition-all duration-500 ${
        plan.highlight
          ? 'border border-gold-DEFAULT bg-black-card'
          : 'card-premium'
      }`}
      style={plan.highlight ? { boxShadow: '0 0 60px rgba(201,168,76,0.12)' } : {}}
    >
      {plan.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="btn-gold text-xs px-4 py-1.5 text-black font-semibold tracking-widest">
            {plan.badge}
          </span>
        </div>
      )}

      <p className="section-label mb-3">{plan.name}</p>
      <div className="mb-4">
        <span className="font-display text-4xl font-semibold text-white">{plan.price}</span>
      </div>
      <p className="font-body text-white/50 text-sm leading-relaxed mb-8 min-h-[48px]">{plan.description}</p>

      <div className="gold-line mb-8" />

      <ul className="space-y-3 flex-1 mb-8">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-white/65">
            <span className="gold-text mt-0.5 flex-shrink-0">✓</span>
            {f}
          </li>
        ))}
      </ul>

      <Link
        to="/quote"
        className={plan.highlight ? 'btn-gold text-center' : 'btn-outline-gold text-center'}
      >
        {plan.cta}
      </Link>
    </motion.div>
  )
}
