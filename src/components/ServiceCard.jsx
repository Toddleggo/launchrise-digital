import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function ServiceCard({ service, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="card-premium p-8 flex flex-col h-full group"
    >
      <div className="flex items-start justify-between mb-6">
        <span className="text-3xl gold-text">{service.icon}</span>
        {service.tag && (
          <span className="section-label text-xs px-3 py-1 border border-gold-DEFAULT/30 text-gold-DEFAULT">
            {service.tag}
          </span>
        )}
      </div>
      <h3 className="font-display text-2xl font-semibold text-white mb-3">{service.title}</h3>
      <p className="font-body text-white/55 text-sm leading-relaxed mb-6 flex-1">{service.description}</p>
      <ul className="space-y-2 mb-6">
        {service.features.slice(0, 4).map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-white/50">
            <span className="w-1 h-1 rounded-full bg-gold-DEFAULT flex-shrink-0" />
            {f}
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
        <span className="gold-text font-body font-semibold text-sm">{service.from}</span>
        <Link to="/quote" className="font-body text-xs text-white/40 hover:text-gold-DEFAULT transition-colors tracking-widest uppercase">
          Get a Quote →
        </Link>
      </div>
    </motion.div>
  )
}
