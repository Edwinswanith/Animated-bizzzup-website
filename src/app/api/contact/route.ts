import { NextResponse } from "next/server";
import { deliver, isConfigured, NotConfigured, type Submission } from "@/lib/contact";
import { CONTACT_FORM } from "@/content/company";

export const dynamic = "force-dynamic";

// Per-instance, in-memory limiter: 5 submissions per IP per 10 minutes. Not global across instances.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now(), win = 10 * 60_000;
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < win);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const oneOf = (v: string, list: readonly string[]) => (list.includes(v) ? v : undefined);

export function GET() {
  return NextResponse.json({ configured: isConfigured() });
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "bad_request" }, { status: 400 }); }
  if (str(body.website, 200)) return NextResponse.json({ ok: true }); // honeypot: quietly accept bots

  const sub: Submission = {
    name: str(body.name, 120),
    email: str(body.email, 200),
    company: str(body.company, 160) || undefined,
    need: oneOf(str(body.need, 60), CONTACT_FORM.needs),
    stage: oneOf(str(body.stage, 60), CONTACT_FORM.stages),
    budget: oneOf(str(body.budget, 60), CONTACT_FORM.budgets),
    message: str(body.message, 5000),
  };
  const fields: Record<string, string> = {};
  if (!sub.name) fields.name = "Please add your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sub.email)) fields.email = "Please add an email we can reply to.";
  if (sub.message.length < 10) fields.message = "Tell us a little more about the friction (at least a sentence).";
  if (Object.keys(fields).length) return NextResponse.json({ error: "invalid", fields }, { status: 422 });

  try {
    await deliver(sub);
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof NotConfigured) return NextResponse.json({ error: "not_configured" }, { status: 503 });
    console.error("contact delivery failed:", (e as Error).message);
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }
}
