import { createClient } from '@supabase/supabase-js'
import { env } from './env.js'

let cached = null

// Service-role client for API routes. Bypasses RLS — never expose to the browser.
export function supabaseAdmin() {
  if (!cached) {
    cached = createClient(env('SUPABASE_URL'), env('SUPABASE_SERVICE_ROLE_KEY'), {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  }
  return cached
}
