// lead_score: higher = message first. Website state dominates; category
// demand and reachability nudge ordering within a bucket.

const HIGH_DEMAND_CATEGORIES = [
  'electrician', 'plumber', 'builder', 'landscaper', 'roofer', 'painter',
  'concreter', 'carpenter', 'tiler', 'fencing', 'mechanic', 'removalist',
  'cleaner', 'pest control', 'air conditioning', 'locksmith',
]

export function computeLeadScore(lead) {
  let score = 0

  // Website state: no site = hottest, modern site = not a buyer
  if (lead.website_quality_score === 0) score += 50
  else if (lead.website_quality_score === 1) score += 35
  else if (lead.website_quality_score === 2) score += 10
  else return 0 // score 3 → skip entirely

  const cat = (lead.category || '').toLowerCase()
  if (HIGH_DEMAND_CATEGORIES.some((c) => cat.includes(c))) score += 15

  // Established businesses with reviews are real and reachable
  if ((lead.review_count || 0) >= 20) score += 10
  else if ((lead.review_count || 0) >= 5) score += 5
  if ((lead.rating || 0) >= 4.5) score += 5

  // Contactability
  if (lead.email) score += 10
  if (lead.phone) score += 5

  return score
}
