import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FAQAccordion({ items }) {
  const [open, setOpen] = useState(null)

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="border border-white/5 bg-black-card hover:border-gold-DEFAULT/20 transition-colors duration-300">
          <button
            className="w-full flex items-center justify-between p-6 text-left"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="font-display text-lg font-medium text-white pr-4">{item.q}</span>
            <motion.span
              animate={{ rotate: open === i ? 45 : 0 }}
              transition={{ duration: 0.3 }}
              className="gold-text text-2xl flex-shrink-0 leading-none"
            >
              +
            </motion.span>
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <p className="font-body text-white/60 text-sm leading-relaxed px-6 pb-6">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
