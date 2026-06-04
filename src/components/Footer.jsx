import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="bg-black-DEFAULT border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 border border-gold-DEFAULT flex items-center justify-center">
                <span className="gold-text font-display font-bold text-sm">LR</span>
              </div>
              <span className="font-display text-xl text-white">LaunchRise <span className="gold-text">Digital</span></span>
            </Link>
            <p className="font-body text-white/50 text-sm leading-relaxed max-w-sm mb-6">
              We turn ideas into premium websites, AI-powered tools, and real working web applications. Based in Melbourne, building for Australia and beyond.
            </p>
            <a href="mailto:launchrisedigital@gmail.com" className="gold-text font-body text-sm hover:opacity-80 transition-opacity">
              launchrisedigital@gmail.com
            </a>
          </div>

          {/* Services */}
          <div>
            <p className="section-label mb-6">Services</p>
            <ul className="space-y-3">
              {['Business Websites', 'AI Chatbot Websites', 'Custom Web Apps', 'MVP Builds', 'Landing Pages', 'Client Portals'].map(s => (
                <li key={s}>
                  <Link to="/services" className="font-body text-sm text-white/50 hover:text-gold-DEFAULT transition-colors">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <p className="section-label mb-6">Company</p>
            <ul className="space-y-3">
              {[
                { to: '/about', label: 'About' },
                { to: '/portfolio', label: 'Portfolio' },
                { to: '/pricing', label: 'Pricing' },
                { to: '/faq', label: 'FAQ' },
                { to: '/quote', label: 'Request a Quote' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="font-body text-sm text-white/50 hover:text-gold-DEFAULT transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="section-divider mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/30">
            © {new Date().getFullYear()} LaunchRise Digital. Melbourne, Australia. All rights reserved.
          </p>
          <p className="section-label text-xs opacity-40">
            Websites · Web Apps · AI Tools
          </p>
        </div>
      </div>
    </footer>
  )
}
