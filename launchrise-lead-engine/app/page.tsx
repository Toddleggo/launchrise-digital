import Link from "next/link";

export default function Home() {
  return (
    <main style={{ maxWidth: 600, margin: "60px auto", fontFamily: "sans-serif", textAlign: "center" }}>
      <h1>LaunchRise Lead Engine</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24 }}>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/campaigns/new">New Campaign</Link>
      </div>
    </main>
  );
}
