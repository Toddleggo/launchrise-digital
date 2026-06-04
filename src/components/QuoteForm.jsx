import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { submitQuote } from '../lib/supabase'

const budgetOptions = [
  'Under $1,000',
  '$1,000–$2,500',
  '$2,500–$5,000',
  '$5,000–$10,000',
  '$10,000–$20,000',
  '$20,000+',
  'Not sure yet',
]

const timelineOptions = [
  'As soon as possible',
  'Within 1 month',
  '1–3 months',
  '3–6 months',
  'Flexible / No rush',
]

const projectTypes = [
  'Business Website',
  'AI Chatbot Website',
  'Custom Web App',
  'MVP / Startup Build',
  'Landing Page',
  'Client Portal / Dashboard',
  'Not sure yet',
]

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setSubmitting(true)
    setError(null)
    try {
      await submitQuote(data)
      setSubmitted(true)
    } catch (err) {
      setError('Something went wrong. Please email us directly at launchrisedigital@gmail.com')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-20"
      >
        <div className="w-16 h-16 border border-gold-DEFAULT flex items-center justify-center mx-auto mb-8">
          <span className="gold-text text-2xl">✓</span>
        </div>
        <h3 className="font-display text-4xl font-medium text-white mb-4">Request Received</h3>
        <div className="gold-line mx-auto mb-6" />
        <p className="font-body text-white/60 text-lg max-w-md mx-auto">
          Thanks — your build request has been received. We'll review your idea and send a proper quote within 5 business days.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Basic info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Full Name *" error={errors.fullName}>
          <input
            {...register('fullName', { required: 'Required' })}
            placeholder="Your full name"
            className="form-input"
          />
        </Field>
        <Field label="Email Address *" error={errors.email}>
          <input
            {...register('email', { required: 'Required', pattern: { value: /^\S+@\S+$/, message: 'Invalid email' } })}
            placeholder="your@email.com"
            type="email"
            className="form-input"
          />
        </Field>
        <Field label="Phone (Optional)">
          <input
            {...register('phone')}
            placeholder="+61 4XX XXX XXX"
            className="form-input"
          />
        </Field>
        <Field label="Business Name (Optional)">
          <input
            {...register('businessName')}
            placeholder="Your business or project name"
            className="form-input"
          />
        </Field>
      </div>

      <div className="section-divider" />

      {/* Project details */}
      <div className="space-y-6">
        <Field label="What type of project is this? *" error={errors.projectType}>
          <select {...register('projectType', { required: 'Required' })} className="form-input">
            <option value="">Select project type...</option>
            {projectTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>

        <Field label="Describe your idea in detail *" error={errors.ideaDescription}>
          <textarea
            {...register('ideaDescription', { required: 'Required', minLength: { value: 30, message: 'Please give us a bit more detail' } })}
            placeholder="Tell us what you want to build. The more detail the better — who it's for, what problem it solves, what it does..."
            rows={5}
            className="form-input resize-none"
          />
        </Field>

        <Field label="What features do you want? *" error={errors.featuresWanted}>
          <textarea
            {...register('featuresWanted', { required: 'Required' })}
            placeholder="e.g. User login, contact form, AI chatbot, payment processing, admin dashboard, booking calendar..."
            rows={3}
            className="form-input resize-none"
          />
        </Field>
      </div>

      <div className="section-divider" />

      {/* Yes/No questions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Field label="Do users need accounts / logins?" error={errors.needsLogins}>
          <select {...register('needsLogins')} className="form-input">
            <option value="unsure">Not sure</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </Field>
        <Field label="Do you need payments / subscriptions?" error={errors.needsPayments}>
          <select {...register('needsPayments')} className="form-input">
            <option value="unsure">Not sure</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </Field>
        <Field label="Do you need AI chatbot or AI features?" error={errors.needsAI}>
          <select {...register('needsAI')} className="form-input">
            <option value="unsure">Not sure</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </Field>
      </div>

      <div className="section-divider" />

      {/* Budget & timeline */}
      <div className="space-y-6">
        <Field label="Do you have examples of similar sites or apps?">
          <input
            {...register('similarExamples')}
            placeholder="URLs or descriptions of sites/apps you like"
            className="form-input"
          />
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Budget Range *" error={errors.budgetRange}>
            <select {...register('budgetRange', { required: 'Required' })} className="form-input">
              <option value="">Select budget range...</option>
              {budgetOptions.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </Field>
          <Field label="Ideal Timeline *" error={errors.idealTimeline}>
            <select {...register('idealTimeline', { required: 'Required' })} className="form-input">
              <option value="">Select timeline...</option>
              {timelineOptions.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
        </div>

        <Field label="Anything else we should know?">
          <textarea
            {...register('anythingElse')}
            placeholder="Any other details, constraints, existing assets, branding, integrations..."
            rows={3}
            className="form-input resize-none"
          />
        </Field>
      </div>

      {error && (
        <p className="font-body text-red-400 text-sm border border-red-400/20 p-4">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="btn-gold w-full py-5 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? 'Sending Request...' : 'Submit My Build Request'}
      </button>

      <p className="font-body text-xs text-white/30 text-center">
        We'll respond within 5 business days with a proper scoped quote.
      </p>
    </form>
  )
}

function Field({ label, children, error }) {
  return (
    <div>
      <label className="block font-body text-sm text-white/70 mb-2 tracking-wide">{label}</label>
      {children}
      {error && <p className="font-body text-xs text-red-400 mt-1">{error.message}</p>}
    </div>
  )
}
