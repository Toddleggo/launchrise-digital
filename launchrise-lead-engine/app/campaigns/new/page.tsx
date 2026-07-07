"use client";

import { useState } from "react";

export default function NewCampaignPage() {
  const [form, setForm] = useState({
    category: "",
    sms_template: "",
    email_subject: "",
    email_body: "",
    demo_site_url: "",
    price_point: "$499",
  });
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Saving...");
    const res = await fetch("/api/campaigns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setStatus(res.ok ? `Saved campaign for ${data.category}` : `Error: ${data.error}`);
  }

  const set = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });

  return (
    <main style={{ maxWidth: 720, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>New Campaign</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <label>
          Category (e.g. electrician)
          <input value={form.category} onChange={set("category")} required style={inputStyle} />
        </label>

        <label>
          SMS template (optional — leave blank to send email only. Under 160 chars, must include "STOP" opt-out)
          <textarea
            value={form.sms_template}
            onChange={set("sms_template")}
            maxLength={160}
            style={inputStyle}
          />
          <small>{form.sms_template.length}/160</small>
        </label>

        <label>
          Email subject
          <input value={form.email_subject} onChange={set("email_subject")} required style={inputStyle} />
        </label>

        <label>
          Email body (HTML ok — use {"{business_name}"}, {"{demo_site_url}"}, {"{unsubscribe_link}"})
          <textarea
            value={form.email_body}
            onChange={set("email_body")}
            required
            rows={10}
            style={inputStyle}
          />
        </label>

        <label>
          Demo site URL
          <input value={form.demo_site_url} onChange={set("demo_site_url")} style={inputStyle} />
        </label>

        <label>
          Price point
          <input value={form.price_point} onChange={set("price_point")} style={inputStyle} />
        </label>

        <button type="submit" style={{ padding: 10, fontWeight: "bold" }}>
          Save Campaign
        </button>
        {status && <p>{status}</p>}
      </form>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: 8,
  marginTop: 4,
  boxSizing: "border-box",
};
