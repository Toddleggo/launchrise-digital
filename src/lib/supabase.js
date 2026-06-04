import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables missing. Lead storage will not work.')
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
)

export async function submitQuote(data) {
  const { error } = await supabase.from('quote_requests').insert([{
    full_name: data.fullName,
    email: data.email,
    phone: data.phone || null,
    business_name: data.businessName || null,
    project_type: data.projectType,
    idea_description: data.ideaDescription,
    features_wanted: data.featuresWanted,
    needs_logins: data.needsLogins,
    needs_payments: data.needsPayments,
    needs_ai: data.needsAI,
    similar_examples: data.similarExamples || null,
    budget_range: data.budgetRange,
    ideal_timeline: data.idealTimeline,
    anything_else: data.anythingElse || null,
    created_at: new Date().toISOString(),
  }])
  if (error) throw error
  return true
}

export async function getQuotes() {
  const { data, error } = await supabase
    .from('quote_requests')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}
