import { env } from './env.js'

const FIELD_MASK = [
  'places.id',
  'places.displayName',
  'places.formattedAddress',
  'places.addressComponents',
  'places.nationalPhoneNumber',
  'places.internationalPhoneNumber',
  'places.websiteUri',
  'places.rating',
  'places.userRatingCount',
  'places.reviews',
  'nextPageToken',
].join(',')

// Places API (New) Text Search. Paginates up to `maxResults`
// (the API caps a single text query at 60 results across 3 pages —
// cover more ground by sourcing multiple suburbs).
export async function textSearchAll(query, maxResults = 60) {
  const key = env('GOOGLE_PLACES_API_KEY')
  const results = []
  let pageToken = null

  do {
    const body = { textQuery: query, pageSize: 20 }
    if (pageToken) body.pageToken = pageToken

    const resp = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': FIELD_MASK,
      },
      body: JSON.stringify(body),
    })
    if (!resp.ok) {
      const text = await resp.text()
      throw new Error(`Places API error ${resp.status}: ${text.slice(0, 500)}`)
    }
    const data = await resp.json()
    results.push(...(data.places || []))
    pageToken = data.nextPageToken || null
  } while (pageToken && results.length < maxResults)

  return results.slice(0, maxResults)
}

function componentText(components, type) {
  const c = (components || []).find((x) => (x.types || []).includes(type))
  return c ? c.longText || c.shortText || null : null
}

// Normalise a Places result into a lead row shape.
export function placeToLead(place, category) {
  const components = place.addressComponents || []
  const review = (place.reviews || []).find((r) => r.text?.text)
  return {
    business_name: place.displayName?.text || null,
    category,
    phone: place.internationalPhoneNumber || place.nationalPhoneNumber || null,
    email: null, // filled in during enrichment from the business's own site
    website: place.websiteUri || null,
    address: place.formattedAddress || null,
    suburb: componentText(components, 'locality') || componentText(components, 'sublocality'),
    state: componentText(components, 'administrative_area_level_1'),
    google_place_id: place.id,
    has_website: Boolean(place.websiteUri),
    rating: place.rating ?? null,
    review_count: place.userRatingCount ?? null,
    review_snippet: review ? review.text.text.slice(0, 400) : null,
    status: 'new',
  }
}
