import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { services, portfolio, pricing, process } from '../data'
import ServiceCard from '../components/ServiceCard'
import PortfolioCard from '../components/PortfolioCard'
import CTASection from '../components/CTASection'

const trustItems = [
  { label: 'Melbourne Based', icon: '◈' },
  { label: 'Websites from $650', icon: '◇' },
  { label: 'Web Apps from $1,500', icon: '◎' },
  { label: 'AI Chatbot Options', icon: '◉' },
  { label: 'Quote Within 5 Days', icon: '◈' },
]

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: '#0A0A0A' }}>
        {/* Background grid */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        {/* Gold glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 60%)' }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-32 pb-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="section-label mb-8"
          >
            Melbourne · Australia · Global
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="font-display font-semibold text-white leading-tight mb-8"
            style={{ fontSize: 'clamp(48px, 7vw, 96px)' }}
          >
            Turn Your Idea Into a{' '}
            <span className="gold-text">Live Website,</span>
            <br />
            AI Tool, or Working{' '}
            <span className="gold-text">Web App</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.6 }}
            className="gold-line mx-auto mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="font-body text-white/60 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12"
          >
            LaunchRise Digital helps founders, small businesses, tradies, coaches, and everyday people turn digital ideas into premium websites and real online applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/quote" className="btn-gold text-sm">
              Get My Idea Built
            </Link>
            <Link to="/portfolio" className="btn-outline-gold text-sm">
              See What We Build
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-px h-10 bg-gradient-to-b from-gold-DEFAULT to-transparent"
            />
          </motion.div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <div className="border-y border-white/5 bg-black-section py-5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center md:justify-between gap-6">
            {trustItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-2"
              >
                <span className="gold-text text-xs">{item.icon}</span>
                <span className="font-mono text-xs text-white/50 tracking-wider uppercase">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* EMOTIONAL HOOK */}
      <section className="py-32" style={{ background: '#0F0F0F' }}>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="section-label mb-8">For the builders who haven't built yet</p>
            <h2 className="font-display font-medium text-white leading-tight mb-8"
              style={{ fontSize: 'clamp(36px, 5vw, 68px)' }}>
              You've had the idea for years.
              <br />
              <span className="gold-text">Now it's time to build it.</span>
            </h2>
            <div className="gold-line mx-auto mb-10" />
            <p className="font-body text-white/60 text-lg leading-relaxed max-w-3xl mx-auto mb-6">
              Most people with great ideas never act on them — not because the idea isn't good enough, but because they don't know how to turn it into something real online. They don't know where to start, who to trust, or what it even costs.
            </p>
            <p className="font-body text-white/60 text-lg leading-relaxed max-w-3xl mx-auto mb-10">
              That's exactly why LaunchRise Digital exists. We take your idea — whether it's a rough concept or a detailed brief — and turn it into a live, working digital product. A website your customers can visit. An app your users can open. A tool that actually does something.
            </p>
            <p className="font-display text-2xl text-white/80 italic">
              "Your idea deserves to exist online."
            </p>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* SERVICES PREVIEW */}
      <section className="py-24" style={{ background: '#0A0A0A' }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="section-label mb-4">What We Build</p>
            <h2 className="font-display text-5xl md:text-6xl font-medium text-white mb-4">Our Services</h2>
            <div className="gold-line mx-auto mb-6" />
            <p className="font-body text-white/50 max-w-xl mx-auto">
              From a simple business website to a full-stack AI web application — we build it all, built properly.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <ServiceCard key={s.id} service={s} index={i} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/services" className="btn-outline-gold">View All Services</Link>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* PORTFOLIO PREVIEW */}
      <section className="py-24" style={{ background: '#0F0F0F' }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="section-label mb-4">Recent Builds</p>
            <h2 className="font-display text-5xl md:text-6xl font-medium text-white mb-4">Our Work</h2>
            <div className="gold-line mx-auto" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolio.map((p, i) => (
              <PortfolioCard key={p.id} project={p} index={i} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/portfolio" className="btn-outline-gold">View Full Portfolio</Link>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* PRICING PREVIEW */}
      <section className="py-24" style={{ background: '#0A0A0A' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="section-label mb-4">Transparent Pricing</p>
            <h2 className="font-display text-5xl md:text-6xl font-medium text-white mb-4">Investment</h2>
            <div className="gold-line mx-auto mb-12" />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              { label: 'Business Websites', from: 'From $650' },
              { label: 'Premium Websites', from: '$1,500–$2,500+' },
              { label: 'Web Apps / MVPs', from: 'From $1,500' },
              { label: 'AI Web Apps / SaaS', from: '$5,000–$20,000+' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-premium p-6 flex items-center justify-between"
              >
                <span className="font-body text-white/70 text-sm">{item.label}</span>
                <span className="gold-text font-display text-xl font-medium">{item.from}</span>
              </motion.div>
            ))}
          </div>
          <p className="font-body text-white/30 text-xs mb-8">Final pricing depends on scope, features, integrations, and timeline.</p>
          <Link to="/pricing" className="btn-gold">View Full Pricing</Link>
        </div>
      </section>

      <div className="section-divider" />

      {/* BUILD PROCESS */}
      <section className="py-24" style={{ background: '#0F0F0F' }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="section-label mb-4">How It Works</p>
            <h2 className="font-display text-5xl md:text-6xl font-medium text-white mb-4">The Build Process</h2>
            <div className="gold-line mx-auto" />
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {process.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 border border-gold-DEFAULT/30 flex items-center justify-center mx-auto mb-3">
                  <span className="font-mono text-xs text-gold-DEFAULT">{step.step}</span>
                </div>
                <p className="font-display text-white font-semibold text-lg mb-1">{step.label}</p>
                <p className="font-body text-white/30 text-xs leading-relaxed">{step.desc}</p>
                {i < process.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-6 w-full h-px border-t border-dashed border-gold-DEFAULT/10" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  )
}
