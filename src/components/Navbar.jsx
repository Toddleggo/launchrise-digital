import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/web-apps', label: 'Web Apps' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

const products = [
  { to: '/mind-vault', label: 'Mind Vault', tag: 'ADHD Platform' },
  { to: '/sober-companion', label: 'Sober Companion', tag: 'Recovery App' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const location = useLocation()
  const dropdownRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setProductsOpen(false)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProductsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isProductPage = products.some(p => location.pathname === p.to)

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-nav py-3' : 'py-5 bg-transparent'}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 border border-gold-DEFAULT flex items-center justify-center">
              <span className="gold-text font-display font-bold text-sm">LR</span>
            </div>
            <div>
              <span className="font-display font-semibold text-white text-lg tracking-wide">LaunchRise</span>
              <span className="gold-text font-display font-semibold text-lg tracking-wide"> Digital</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`font-body text-sm tracking-wide transition-all duration-300 hover:text-gold-DEFAULT ${
                  location.pathname === to ? 'text-gold-DEFAULT' : 'text-white/70'
                }`}
              >
                {label}
              </Link>
            ))}

            {/* Products dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProductsOpen(!productsOpen)}
                className={`font-body text-sm tracking-wide transition-all duration-300 hover:text-gold-DEFAULT flex items-center gap-1.5 ${
                  isProductPage ? 'text-gold-DEFAULT' : 'text-white/70'
                }`}
              >
                Products
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className={`transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`}>
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <AnimatePresence>
                {productsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 py-2"
                    style={{
                      background: 'rgba(17, 17, 17, 0.98)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
                    }}
                  >
                    {products.map(({ to, label, tag }) => (
                      <Link
                        key={to}
                        to={to}
                        className={`block px-5 py-3 transition-all duration-200 hover:bg-white/5 ${
                          location.pathname === to ? 'bg-white/5' : ''
                        }`}
                      >
                        <span className={`font-body text-sm block ${
                          location.pathname === to ? 'text-gold-DEFAULT' : 'text-white/80'
                        }`}>{label}</span>
                        <span className="font-mono text-xs text-white/30 tracking-wider uppercase">{tag}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <Link to="/quote" className="hidden lg:flex btn-gold text-xs px-6 py-3">
              Get a Quote
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-2"
              aria-label="Menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="block w-6 h-px bg-gold-DEFAULT transition-all"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-6 h-px bg-gold-DEFAULT"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="block w-6 h-px bg-gold-DEFAULT"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black-DEFAULT flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8">
              {links.map(({ to, label }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <Link
                    to={to}
                    className={`font-display text-4xl font-medium transition-all hover:text-gold-DEFAULT ${
                      location.pathname === to ? 'gold-text' : 'text-white'
                    }`}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}

              {/* Products in mobile menu */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.06, duration: 0.4 }}
                className="flex flex-col items-center gap-2 pt-2"
              >
                <span className="font-mono text-xs text-white/30 tracking-wider uppercase mb-2">Products</span>
                {products.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    className={`font-display text-2xl font-medium transition-all hover:text-gold-DEFAULT ${
                      location.pathname === to ? 'gold-text' : 'text-white/70'
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (links.length + 1) * 0.06 + 0.1 }}
              >
                <Link to="/quote" className="btn-gold mt-4">
                  Get a Quote
                </Link>
              </motion.div>
            </div>
            <p className="absolute bottom-8 section-label">Melbourne, Australia</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
