import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

async function getStats() {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - 7);

  const [{ count: sentToday }, { count: sentWeek }, { data: allOutreach }, { data: repliedLeads }] =
    await Promise.all([
      supabaseAdmin
        .from("outreach_log")
        .select("*", { count: "exact", head: true })
        .gte("sent_at", startOfToday.toISOString()),
      supabaseAdmin
        .from("outreach_log")
        .select("*", { count: "exact", head: true })
        .gte("sent_at", startOfWeek.toISOString()),
      supabaseAdmin.from("outreach_log").select("lead_id, replied, leads(category)"),
      supabaseAdmin
        .from("leads")
        .select("*")
        .eq("status", "replied")
        .order("created_at", { ascending: false }),
    ]);

  // reply rate by category
  const byCategory: Record<string, { sent: number; replied: number }> = {};
  for (const row of allOutreach ?? []) {
    const category = (row as any).leads?.category ?? "unknown";
    byCategory[category] ??= { sent: 0, replied: 0 };
    byCategory[category].sent++;
    if (row.replied) byCategory[category].replied++;
  }

  return {
    sentToday: sentToday ?? 0,
    sentWeek: sentWeek ?? 0,
    byCategory,
    repliedLeads: repliedLeads ?? [],
  };
}

export default async function DashboardPage() {
  const { sentToday, sentWeek, byCategory, repliedLeads } = await getStats();

  return (
    <main style={{ maxWidth: 960, margin: "40px auto", fontFamily: "sans-serif", padding: "0 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Dashboard</h1>
        <a href="/campaigns/new" style={{ padding: "10px 16px", background: "#111", color: "#fff", borderRadius: 6, textDecoration: "none" }}>
          + New Campaign
        </a>
      </div>

      <div style={{ display: "flex", gap: 24, margin: "24px 0" }}>
        <Stat label="Sent today" value={sentToday} />
        <Stat label="Sent this week" value={sentWeek} />
      </div>

      <h2>Reply rate by category</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 32 }}>
        <thead>
          <tr>
            <Th>Category</Th>
            <Th>Sent</Th>
            <Th>Replied</Th>
            <Th>Reply rate</Th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(byCategory).map(([category, stats]) => (
            <tr key={category}>
              <Td>{category}</Td>
              <Td>{stats.sent}</Td>
              <Td>{stats.replied}</Td>
              <Td>{stats.sent > 0 ? `${((stats.replied / stats.sent) * 100).toFixed(1)}%` : "-"}</Td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Replied leads needing action</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <Th>Business</Th>
            <Th>Category</Th>
            <Th>Phone</Th>
            <Th>Email</Th>
          </tr>
        </thead>
        <tbody>
          {repliedLeads.map((lead: any) => (
            <tr key={lead.id}>
              <Td>{lead.business_name}</Td>
              <Td>{lead.category}</Td>
              <Td>{lead.phone}</Td>
              <Td>{lead.email}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 16, minWidth: 140 }}>
      <div style={{ fontSize: 28, fontWeight: 700 }}>{value}</div>
      <div style={{ color: "#666" }}>{label}</div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th style={{ textAlign: "left", borderBottom: "2px solid #333", padding: 8 }}>{children}</th>;
}
function Td({ children }: { children: React.ReactNode }) {
  return <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>{children}</td>;
}
