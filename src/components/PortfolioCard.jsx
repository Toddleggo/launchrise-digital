import { motion } from 'framer-motion'

export default function PortfolioCard({ project, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="card-premium group overflow-hidden relative"
    >
      {/* Image / Placeholder */}
      <div
        className="relative h-56 flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${project.color} 0%, #0A0A0A 100%)` }}
      >
        {project.image ? (
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        ) : (
          <div className="text-center">
            <span
              className="font-display text-6xl font-bold opacity-30"
              style={{ color: project.accent }}
            >
              {project.placeholder}
            </span>
            <p className="font-mono text-xs text-white/20 mt-2 tracking-widest uppercase">Screenshot coming soon</p>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
          <span className="btn-outline-gold text-xs px-6 py-3">View Project</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span
            className="section-label text-xs"
            style={{ color: project.accent }}
          >
            {project.tag}
          </span>
          <div className="flex gap-1">
            {project.tech.map(t => (
              <span key={t} className="font-mono text-xs text-white/20 px-2 py-0.5 border border-white/5">
                {t}
              </span>
            ))}
          </div>
        </div>
        <h3 className="font-display text-2xl font-semibold text-white mb-2">{project.title}</h3>
        <p className="font-body text-white/50 text-sm leading-relaxed">{project.description}</p>
      </div>
    </motion.div>
  )
}
