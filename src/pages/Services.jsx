import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { services } from '../data'
import ServiceCard from '../components/ServiceCard'
import CTASection from '../components/CTASection'

export default function Services() {
  return (
    <main className="pt-28">
      {/* Header */}
      <section className="py-20 text-center" style={{ background: '#0A0A0A' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="section-label mb-4">What We Offer</p>
          <h1 className="font-display font-semibold text-white mb-4" style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}>
            Our <span className="gold-text">Services</span>
          </h1>
          <div className="gold-line mx-auto mb-6" />
          <p className="font-body text-white/55 text-lg max-w-2xl mx-auto">
            Premium builds for every stage — from your first business website to a complex AI-powered web application.
          </p>
        </motion.div>
      </section>

      <div className="section-divider" />

      {/* All services */}
      <section className="py-24" style={{ background: '#0F0F0F' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Business Websites Deep Dive */}
      <section className="py-24" style={{ background: '#0A0A0A' }}>
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="section-label mb-4">Business Websites</p>
            <h2 className="font-display text-5xl font-medium text-white mb-4">Built for real businesses.<br /><span className="gold-text">Built to convert.</span></h2>
            <div className="gold-line mb-8" />
            <p className="font-body text-white/60 text-lg leading-relaxed mb-6">
              Whether you're a tradie who needs a professional online presence, a coach who wants to attract clients, or a local business ready to take things seriously — we build websites that look expensive, load fast, and turn visitors into leads.
            </p>
            <p className="font-body text-white/60 text-lg leading-relaxed mb-10">
              Every website we build is mobile responsive, SEO-ready, and designed around your specific goals. No generic templates. No cookie-cutter layouts. Every build is custom.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Tradies', 'Coaches', 'Local Businesses', 'Creators', 'Service Providers', 'Startups', 'Clinics & Practitioners', 'Consultants'].map(t => (
                <div key={t} className="card-premium p-4 text-center">
                  <span className="font-body text-sm text-white/60">{t}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* AI Chatbot */}
      <section className="py-24" style={{ background: '#0F0F0F' }}>
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="section-label mb-4">AI Chatbot Websites</p>
            <h2 className="font-display text-5xl font-medium text-white mb-4">Your website.<br /><span className="gold-text">Working while you sleep.</span></h2>
            <div className="gold-line mb-8" />
            <p className="font-body text-white/60 text-lg leading-relaxed mb-6">
              An AI chatbot website isn't just a website with a chat widget — it's a fully integrated sales and support system. The AI assistant knows your services, answers questions accurately, captures lead information, and guides every visitor toward the next step.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {[
                ['Answer FAQs automatically', 'No more answering the same questions manually'],
                ['Capture leads 24/7', 'Collect name, email, and enquiry details at any hour'],
                ['Guide customers', 'Walk visitors through your services and next steps'],
                ['Reduce enquiry handling', 'Filter and qualify leads before they reach your inbox'],
              ].map(([title, desc]) => (
                <div key={title} className="card-premium p-6">
                  <p className="font-display text-white text-lg mb-2">{title}</p>
                  <p className="font-body text-white/45 text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Web Apps */}
      <section className="py-24" style={{ background: '#0A0A0A' }}>
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="section-label mb-4">Custom Web Apps</p>
            <h2 className="font-display text-5xl font-medium text-white mb-4">Ideas turned into<br /><span className="gold-text">working software.</span></h2>
            <div className="gold-line mb-8" />
            <p className="font-body text-white/60 text-lg leading-relaxed mb-8">
              Custom web apps are what sets LaunchRise Digital apart. If you have an idea for a tool, platform, or system — we can build it. These are real working applications: users can sign up, log in, interact, pay, and use them just like any professional SaaS product.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {['AI Tools', 'Membership Sites', 'Client Dashboards', 'Booking Systems', 'Subscription Platforms', 'Private User Areas', 'Quote Calculators', 'Startup MVPs', 'Form-Based Tools'].map(app => (
                <div key={app} className="border border-white/5 p-4 text-center hover:border-gold-DEFAULT/30 transition-colors">
                  <span className="font-body text-sm text-white/55">{app}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <CTASection />
    </main>
  )
}
