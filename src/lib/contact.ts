import "server-only";

/** Contact delivery behind one interface. The provider is configuration, not code:
 *  CONTACT_PROVIDER=resend  → RESEND_API_KEY, CONTACT_TO, CONTACT_FROM
 *  CONTACT_PROVIDER=webhook → CONTACT_WEBHOOK_URL (receives the submission as JSON)
 *  unset                    → not configured; the form says so instead of pretending. */

export type Submission = {
  name: string;
  email: string;
  company?: string;
  need?: string;
  stage?: string;
  budget?: string;
  message: string;
};

export class NotConfigured extends Error {}
export class DeliveryFailed extends Error {}

export function isConfigured() {
  const p = process.env.CONTACT_PROVIDER;
  if (p === "resend") return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO && process.env.CONTACT_FROM);
  if (p === "webhook") return Boolean(process.env.CONTACT_WEBHOOK_URL);
  return false;
}

const esc = (s = "") => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function deliver(sub: Submission) {
  if (!isConfigured()) throw new NotConfigured();
  const provider = process.env.CONTACT_PROVIDER;
  const rows: [string, string | undefined][] = [
    ["Name", sub.name], ["Email", sub.email], ["Company", sub.company], ["Needs help with", sub.need],
    ["Project stage", sub.stage], ["Budget range", sub.budget],
  ];
  let res: Response;
  if (provider === "resend") {
    const html = `<h2 style="font-family:Georgia,serif">New friction from the website</h2><table cellpadding="6">${rows
      .filter(([, v]) => v).map(([k, v]) => `<tr><td style="color:#65666b">${esc(k)}</td><td>${esc(v)}</td></tr>`).join("")}</table><p style="white-space:pre-wrap;font-family:Georgia,serif;font-size:16px">${esc(sub.message)}</p>`;
    res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: process.env.CONTACT_FROM, to: process.env.CONTACT_TO, reply_to: sub.email, subject: `Website: ${sub.name}${sub.company ? ` (${sub.company})` : ""}`, html }),
      signal: AbortSignal.timeout(10_000),
    });
  } else {
    res = await fetch(process.env.CONTACT_WEBHOOK_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source: "website", submittedAt: new Date().toISOString(), ...sub }),
      signal: AbortSignal.timeout(10_000),
    });
  }
  if (!res.ok) throw new DeliveryFailed(`provider responded ${res.status}`);
}
