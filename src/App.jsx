import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import WebApps from './pages/WebApps'
import Portfolio from './pages/Portfolio'
import Pricing from './pages/Pricing'
import About from './pages/About'
import FAQ from './pages/FAQ'
import Quote from './pages/Quote'
import Contact from './pages/Contact'
import LeadDashboard from './components/LeadDashboard'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25 } },
}

function AnimatedRoute({ children }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  )
}

function AppInner() {
  const location = useLocation()
  const isAdmin = location.pathname === '/admin'

  return (
    <>
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<AnimatedRoute><Home /></AnimatedRoute>} />
          <Route path="/services" element={<AnimatedRoute><Services /></AnimatedRoute>} />
          <Route path="/web-apps" element={<AnimatedRoute><WebApps /></AnimatedRoute>} />
          <Route path="/portfolio" element={<AnimatedRoute><Portfolio /></AnimatedRoute>} />
          <Route path="/pricing" element={<AnimatedRoute><Pricing /></AnimatedRoute>} />
          <Route path="/about" element={<AnimatedRoute><About /></AnimatedRoute>} />
          <Route path="/faq" element={<AnimatedRoute><FAQ /></AnimatedRoute>} />
          <Route path="/quote" element={<AnimatedRoute><Quote /></AnimatedRoute>} />
          <Route path="/contact" element={<AnimatedRoute><Contact /></AnimatedRoute>} />
          <Route path="/admin" element={<LeadDashboard />} />
        </Routes>
      </AnimatePresence>
      {!isAdmin && <Footer />}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}
