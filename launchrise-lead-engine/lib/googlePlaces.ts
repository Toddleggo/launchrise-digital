import { findEmailOnWebsite } from "./emailScrape";

const PLACES_TEXT_SEARCH = "https://maps.googleapis.com/maps/api/place/textsearch/json";
const PLACE_DETAILS = "https://maps.googleapis.com/maps/api/place/details/json";

export interface SourcedLead {
  business_name: string;
  category: string;
  phone: string | null;
  email: string | null;
  website: string | null;
  address: string | null;
  suburb: string | null;
  state: string | null;
  google_place_id: string;
}

interface PlacesTextSearchResult {
  place_id: string;
  name: string;
  formatted_address?: string;
}

/**
 * Pulls up to `maxResults` businesses for a category + location from Google
 * Places Text Search (paginated 20/page), then enriches each with phone/website
 * via Place Details, and finally tries to find a contact email on the business's
 * own website. This is API-based sourcing, not directory scraping.
 */
export async function sourceLeads(
  category: string,
  location: string,
  maxResults = 200
): Promise<SourcedLead[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) throw new Error("GOOGLE_PLACES_API_KEY is not set");

  const results: PlacesTextSearchResult[] = [];
  let pageToken: string | undefined;
  let pageCount = 0;

  do {
    const params = new URLSearchParams({
      query: `${category} in ${location}`,
      key: apiKey,
    });
    if (pageToken) params.set("pagetoken", pageToken);

    const res = await fetch(`${PLACES_TEXT_SEARCH}?${params.toString()}`);
    const data = await res.json();

    if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
      throw new Error(`Places Text Search failed: ${data.status} ${data.error_message ?? ""}`);
    }

    results.push(...(data.results ?? []));
    pageToken = data.next_page_token;
    pageCount++;

    // Google requires a short delay before a next_page_token becomes valid
    if (pageToken && results.length < maxResults) {
      await new Promise((r) => setTimeout(r, 2000));
    }
  } while (pageToken && results.length < maxResults && pageCount < 10);

  const trimmed = results.slice(0, maxResults);
  const leads: SourcedLead[] = [];

  for (const place of trimmed) {
    const details = await getPlaceDetails(place.place_id, apiKey);
    const email = details.website ? await findEmailOnWebsite(details.website) : null;

    const { suburb, state } = parseAddress(details.formatted_address ?? place.formatted_address ?? "");

    leads.push({
      business_name: details.name ?? place.name,
      category,
      phone: details.formatted_phone_number ?? null,
      email,
      website: details.website ?? null,
      address: details.formatted_address ?? place.formatted_address ?? null,
      suburb,
      state,
      google_place_id: place.place_id,
    });
  }

  return leads;
}

async function getPlaceDetails(placeId: string, apiKey: string) {
  const params = new URLSearchParams({
    place_id: placeId,
    fields: "name,formatted_phone_number,website,formatted_address",
    key: apiKey,
  });
  const res = await fetch(`${PLACE_DETAILS}?${params.toString()}`);
  const data = await res.json();
  return data.result ?? {};
}

// Very rough AU address parse: last two comma-separated chunks are usually
// "Suburb STATE POSTCODE" — good enough for filtering/reporting, not billing.
function parseAddress(formatted: string): { suburb: string | null; state: string | null } {
  const parts = formatted.split(",").map((p) => p.trim());
  if (parts.length < 2) return { suburb: null, state: null };
  const localityPart = parts[parts.length - 2]; // e.g. "Melbourne VIC 3000"
  const match = localityPart?.match(/^(.+?)\s+([A-Z]{2,3})\s+\d{4}$/);
  if (match) {
    return { suburb: match[1], state: match[2] };
  }
  return { suburb: localityPart ?? null, state: null };
}
