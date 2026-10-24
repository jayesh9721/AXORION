"use server";

import { site } from "@/lib/site";

export type LeadResult = { ok: boolean; error?: string };

const clean = (v: FormDataEntryValue | null, max = 2000) =>
  String(v ?? "").trim().slice(0, max);

export async function submitLead(_prev: LeadResult | null, form: FormData): Promise<LeadResult> {
  // Honeypot: bots fill hidden fields.
  if (clean(form.get("website"))) return { ok: true };

  const lead = {
    name: clean(form.get("name"), 120),
    email: clean(form.get("email"), 200),
    company: clean(form.get("company"), 160),
    service: clean(form.get("service"), 160),
    budget: clean(form.get("budget"), 80),
    timeline: clean(form.get("timeline"), 80),
    message: clean(form.get("message")),
  };

  if (!lead.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email) || !lead.message) {
    return { ok: false, error: "Please provide your name, a valid email and a short message." };
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // Not configured yet: log so leads are not silently lost during setup.
    console.warn("RESEND_API_KEY missing; lead not emailed:", lead);
    return { ok: false, error: "Our form is being set up. Please email contact@axorion.com or use WhatsApp." };
  }

  const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
  const html = `<h2>New AXORION lead</h2><ul>${Object.entries(lead)
    .map(([k, v]) => `<li><b>${k}:</b> ${esc(v) || "-"}</li>`)
    .join("")}</ul>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.LEAD_FROM_EMAIL ?? "AXORION Website <onboarding@resend.dev>",
      to: [process.env.LEAD_TO_EMAIL ?? site.emails[0]],
      reply_to: lead.email,
      subject: `New lead: ${lead.name}${lead.company ? ` (${lead.company})` : ""}`,
      html,
    }),
  });

  if (!res.ok) return { ok: false, error: "Could not send your request. Please email contact@axorion.com." };
  return { ok: true };
}
