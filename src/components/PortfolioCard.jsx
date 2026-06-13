import { useState } from 'react'
import { motion } from 'framer-motion'

export default function PortfolioCard({ project, index = 0 }) {
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [iframeError, setIframeError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="card-premium group overflow-hidden flex flex-col"
    >
      {/* Live preview window */}
      <div className="relative overflow-hidden" style={{ height: '420px', background: '#0A0A0A' }}>

        {/* Browser chrome bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5" style={{ background: '#1a1a1a' }}>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
          </div>
          <div className="flex-1 mx-3 px-3 py-1 rounded text-xs font-mono text-white/30 truncate" style={{ background: '#111', fontSize: '11px' }}>
            {project.url !== '#' ? project.url.replace('https://', '') : 'live preview'}
          </div>
          {project.url !== '#' && (
            <a href={project.url} target="_blank" rel="noopener noreferrer"
              className="text-xs font-mono text-gold/50 hover:text-gold transition-colors"
              style={{ fontSize: '10px', letterSpacing: '0.1em' }}>
              OPEN ↗
            </a>
          )}
        </div>

        {/* iframe or placeholder */}
        {project.url !== '#' && !iframeError ? (
          <>
            {!iframeLoaded && (
              <div className="absolute inset-0 flex items-center justify-center" style={{ top: '40px', background: '#0A0A0A' }}>
                <div className="text-center">
                  <div className="w-6 h-6 border border-gold border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="font-mono text-xs text-white/20">Loading preview...</p>
                </div>
              </div>
            )}
            <iframe
              src={project.url}
              title={project.title}
              className="w-full border-0 transition-opacity duration-500"
              style={{
                height: '380px',
                transform: 'scale(0.75)',
                transformOrigin: 'top left',
                width: '133.33%',
                opacity: iframeLoaded ? 1 : 0,
                pointerEvents: 'none',
              }}
              onLoad={() => setIframeLoaded(true)}
              onError={() => setIframeError(true)}
              sandbox="allow-scripts allow-same-origin"
            />
          </>
        ) : (
          /* Fallback placeholder */
          <div className="flex items-center justify-center h-full"
            style={{ background: `linear-gradient(135deg, ${project.color} 0%, #0A0A0A 100%)` }}>
            <div className="text-center">
              <span className="font-display text-7xl font-bold opacity-25" style={{ color: project.accent }}>
                {project.placeholder}
              </span>
              <p className="font-mono text-xs text-white/20 mt-3 tracking-widest uppercase">Preview unavailable</p>
            </div>
          </div>
        )}

        {/* Hover overlay with Visit button */}
        {project.url !== '#' && (
          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center justify-center" style={{ top: '40px' }}>
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn-gold text-xs px-8 py-3">
              Visit Live Site ↗
            </a>
          </div>
        )}
      </div>

      {/* Card content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className="section-label text-xs" style={{ color: project.accent }}>
            {project.tag}
          </span>
          <div className="flex gap-1 flex-wrap justify-end">
            {project.tech.map(t => (
              <span key={t} className="font-mono text-white/20 px-2 py-0.5 border border-white/5"
                style={{ fontSize: '10px' }}>
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
