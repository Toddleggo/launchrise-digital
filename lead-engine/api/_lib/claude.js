import Anthropic from '@anthropic-ai/sdk'
import { env, optionalEnv } from './env.js'

const MODEL = optionalEnv('CLAUDE_MODEL') || 'claude-opus-4-8'

let cached = null
function client() {
  if (!cached) cached = new Anthropic({ apiKey: env('ANTHROPIC_API_KEY') })
  return cached
}

// One specific, non-generic opening line per lead. Cached on the lead row so
// it's generated once and reused/varied across all three touches.
export async function generatePersonalizationLine(lead) {
  const websiteState =
    lead.website_quality_score === 0
      ? 'has no website at all'
      : lead.website_quality_score === 1
        ? `has an outdated / poor-quality website (${lead.website})`
        : `has an average website (${lead.website})`

  const response = await client().messages.create({
    model: MODEL,
    max_tokens: 300,
    system:
      'You write the opening line of a cold outreach message from a small Australian web design studio to a local business. ' +
      'Write ONE specific, concrete, non-generic sentence (max 30 words) that shows we actually looked at this exact business. ' +
      'Reference their website situation and, where useful, their suburb, trade, or reviews. ' +
      'Plain Australian English, no hype, no exclamation marks, no emojis, no greeting — just the line itself. ' +
      'Never fabricate facts not present in the data provided.',
    messages: [
      {
        role: 'user',
        content: JSON.stringify({
          business_name: lead.business_name,
          category: lead.category,
          suburb: lead.suburb,
          state: lead.state,
          website_state: websiteState,
          rating: lead.rating,
          review_count: lead.review_count,
          review_snippet: lead.review_snippet,
        }),
      },
    ],
  })

  const text = response.content.find((b) => b.type === 'text')?.text?.trim()
  return text || null
}

const TRIAGE_SCHEMA = {
  type: 'object',
  properties: {
    classification: {
      type: 'string',
      enum: ['interested', 'question', 'not_interested', 'angry', 'unclear'],
    },
    wants_opt_out: {
      type: 'boolean',
      description: 'True if the sender is asking to stop being contacted / unsubscribe.',
    },
    draft_response: {
      type: ['string', 'null'],
      description:
        'Suggested reply for interested/question classifications; null otherwise.',
    },
  },
  required: ['classification', 'wants_opt_out', 'draft_response'],
  additionalProperties: false,
}

// Classify an inbound reply and draft a suggested response.
export async function triageReply(lead, rawMessage, businessName) {
  const response = await client().messages.create({
    model: MODEL,
    max_tokens: 1000,
    system:
      `You triage replies to cold outreach sent by ${businessName}, a small Australian web design studio ` +
      'that builds affordable websites for local businesses. Classify the reply and, for "interested" or ' +
      '"question", draft a short, warm, low-pressure response in plain Australian English (no emojis, no hype). ' +
      'If the sender wants to stop hearing from us — in any wording — set wants_opt_out true.',
    output_config: { format: { type: 'json_schema', schema: TRIAGE_SCHEMA } },
    messages: [
      {
        role: 'user',
        content: JSON.stringify({
          lead: {
            business_name: lead?.business_name,
            category: lead?.category,
            suburb: lead?.suburb,
          },
          reply: rawMessage.slice(0, 4000),
        }),
      },
    ],
  })

  const text = response.content.find((b) => b.type === 'text')?.text
  try {
    return JSON.parse(text)
  } catch {
    return { classification: 'unclear', wants_opt_out: false, draft_response: null }
  }
}
