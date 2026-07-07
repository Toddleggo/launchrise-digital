import { NextRequest, NextResponse } from "next/server";
import { sourceLeads } from "@/lib/googlePlaces";
import { supabaseAdmin } from "@/lib/supabase";

// POST { category: "electrician", location: "Melbourne VIC", maxResults?: 200 }
export async function POST(req: NextRequest) {
  try {
    const { category, location, maxResults } = await req.json();
    if (!category || !location) {
      return NextResponse.json({ error: "category and location are required" }, { status: 400 });
    }

    const sourced = await sourceLeads(category, location, maxResults ?? 200);

    // Dedupe against existing leads by google_place_id, insert only new ones.
    const placeIds = sourced.map((l) => l.google_place_id);
    const { data: existing } = await supabaseAdmin
      .from("leads")
      .select("google_place_id")
      .in("google_place_id", placeIds);

    const existingIds = new Set((existing ?? []).map((r) => r.google_place_id));
    const newLeads = sourced.filter((l) => !existingIds.has(l.google_place_id));

    if (newLeads.length > 0) {
      const { error } = await supabaseAdmin
        .from("leads")
        .insert(newLeads.map((l) => ({ ...l, status: "new" })));
      if (error) throw error;
    }

    return NextResponse.json({
      found: sourced.length,
      inserted: newLeads.length,
      skipped_duplicates: sourced.length - newLeads.length,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
