"use client";

import { useEffect, useId, useState } from "react";
import { CONTACT_FORM, COMPANY } from "@/content/company";
import styles from "./ContactForm.module.css";

type State =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "invalid"; fields: Record<string, string> }
  | { kind: "unavailable" }
  | { kind: "failed" };

export function ContactForm() {
  const [state, setState] = useState<State>({ kind: "idle" });
  const [configured, setConfigured] = useState<boolean | null>(null);
  const uid = useId();

  useEffect(() => {
    fetch("/api/contact").then((r) => r.json()).then((d) => setConfigured(Boolean(d.configured))).catch(() => setConfigured(null));
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const out = await res.json().catch(() => ({}));
      if (res.ok && out.ok) { setState({ kind: "sent" }); return; }
      if (res.status === 422) { setState({ kind: "invalid", fields: out.fields ?? {} }); return; }
      if (res.status === 503) { setState({ kind: "unavailable" }); return; }
      setState({ kind: "failed" });
    } catch {
      setState({ kind: "failed" });
    }
  }

  const err = (f: string) => (state.kind === "invalid" ? state.fields[f] : undefined);
  const field = (name: string) => ({ id: `${uid}-${name}`, name, "aria-invalid": err(name) ? true : undefined, "aria-describedby": err(name) ? `${uid}-${name}-err` : undefined });
  const errText = (f: string) => (err(f) ? <p id={`${uid}-${f}-err`} className={styles.err}>{err(f)}</p> : null);
  const direct = (
    <span>
      Email <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
      {COMPANY.calendly ? <>, call <a href={`tel:${COMPANY.phone.tel}`}>{COMPANY.phone.display}</a>, or <a href={COMPANY.calendly} target="_blank" rel="noopener">book a 20-minute call</a>.</> : <> or call <a href={`tel:${COMPANY.phone.tel}`}>{COMPANY.phone.display}</a>.</>}
    </span>
  );

  if (state.kind === "sent") {
    return (
      <div className={styles.sent} role="status" data-sent>
        <span className={styles.line} aria-hidden="true" />
        <p className="mono">Received</p>
        <p className={styles.sentTitle}>Your friction is in the system.</p>
        <p>{COMPANY.responseTime}. The next step is a 20-minute scoping call, then a 2-page proposal with a fixed price.</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate aria-describedby={configured === false ? `${uid}-offline` : undefined}>
      {configured === false && (
        <p id={`${uid}-offline`} className={styles.notice} role="note">
          This form isn’t connected to our inbox yet, so it can’t deliver messages. {direct}
        </p>
      )}
      <div className={styles.full}>
        <label htmlFor={`${uid}-message`} className={styles.big}>Describe your friction</label>
        <textarea {...field("message")} rows={5} required placeholder="What slows your business down today? What have you tried?" />
        {errText("message")}
      </div>
      <div>
        <label htmlFor={`${uid}-name`}>Name</label>
        <input {...field("name")} autoComplete="name" required />
        {errText("name")}
      </div>
      <div>
        <label htmlFor={`${uid}-email`}>Email</label>
        <input {...field("email")} type="email" autoComplete="email" required />
        {errText("email")}
      </div>
      <div>
        <label htmlFor={`${uid}-company`}>Company <span className={styles.opt}>(optional)</span></label>
        <input {...field("company")} autoComplete="organization" />
      </div>
      <div>
        <label htmlFor={`${uid}-need`}>What do you need help with?</label>
        <select {...field("need")} defaultValue="">
          <option value="">Choose one</option>
          {CONTACT_FORM.needs.map((o) => <option key={o}>{o}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor={`${uid}-stage`}>Project stage</label>
        <select {...field("stage")} defaultValue="">
          <option value="">Choose one</option>
          {CONTACT_FORM.stages.map((o) => <option key={o}>{o}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor={`${uid}-budget`}>Budget range</label>
        <select {...field("budget")} defaultValue="">
          <option value="">Choose one</option>
          {CONTACT_FORM.budgets.map((o) => <option key={o}>{o}</option>)}
        </select>
      </div>
      <div className={styles.hp} aria-hidden="true">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input id={`${uid}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className={`${styles.full} ${styles.actions}`}>
        <button type="submit" className="btn btn--primary" disabled={state.kind === "sending"}>
          {state.kind === "sending" ? "Sending…" : "Send it into the system"}
        </button>
        {COMPANY.calendly && <a href={COMPANY.calendly} target="_blank" rel="noopener" className="link-arrow">Or book a 20-minute call</a>}
      </div>
      <div className={styles.full} aria-live="polite">
        {state.kind === "unavailable" && <p className={styles.notice}>We couldn’t deliver this: the form isn’t connected yet. Nothing was sent. {direct}</p>}
        {state.kind === "failed" && <p className={styles.notice}>Something went wrong on our side and your message was not sent. Please try again, or {direct}</p>}
        {state.kind === "invalid" && <p className={styles.notice}>A few fields need attention before this can be sent.</p>}
      </div>
    </form>
  );
}
