"use client";

import { useActionState, useRef, useState } from "react";
import { submitLead } from "@/app/contact/actions";
import { services } from "@/lib/site";

const budgets = ["Under $2k", "$2k – $5k", "$5k – $15k", "$15k+", "Not sure yet"];
const timelines = ["ASAP", "1 – 3 months", "3 – 6 months", "Just exploring"];
const field = "w-full rounded-lg border border-line bg-surface2 px-4 py-3 text-sm outline-none focus:border-accent";

export default function ContactWizard() {
  const [state, action, pending] = useActionState(submitLead, null);
  const [step, setStep] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  // Only move on when this step's required fields are valid; otherwise show the browser's message.
  // (Hidden steps stay mounted, so an unchecked skipped field would silently block the final submit.)
  function next() {
    const panel = formRef.current?.querySelectorAll<HTMLElement>("[data-step]")[step];
    const fields = panel?.querySelectorAll<HTMLInputElement>("input, textarea, select") ?? [];
    for (const f of fields) {
      if (!f.checkValidity()) {
        f.reportValidity();
        return;
      }
    }
    setStep(step + 1);
  }

  if (state?.ok) {
    return (
      <div className="card p-8 text-center">
        <h2 className="text-2xl font-bold">Thank you!</h2>
        <p className="mt-2 text-muted">We&apos;ve received your request and will get back to you soon.</p>
      </div>
    );
  }

  const titles = ["What do you need?", "Scope & timing", "About you"];

  return (
    <form ref={formRef} action={action} className="card p-6 sm:p-8">
      <p className="eyebrow">Step {step + 1} of 3</p>
      <h2 className="mt-1 text-xl font-semibold">{titles[step]}</h2>
      <div className="mt-2 h-1 rounded bg-surface2" aria-hidden>
        <div className="h-1 rounded bg-accent transition-all" style={{ width: `${((step + 1) / 3) * 100}%` }} />
      </div>

      {/* All steps stay mounted so FormData includes every field. */}
      <div data-step className={`mt-6 space-y-4 ${step === 0 ? "" : "hidden"}`}>
        <label className="block text-sm">Service
          <select name="service" className={`${field} mt-1`} defaultValue={services[0].title}>
            {services.map((s) => <option key={s.slug}>{s.title}</option>)}
            <option>White-label development partnership</option>
            <option>Something else</option>
          </select>
        </label>
        <label className="block text-sm">Project summary
          <textarea name="message" rows={5} required className={`${field} mt-1`} placeholder="Tell us about your goals..." />
        </label>
      </div>

      <div data-step className={`mt-6 space-y-4 ${step === 1 ? "" : "hidden"}`}>
        <label className="block text-sm">Budget
          <select name="budget" className={`${field} mt-1`}>{budgets.map((b) => <option key={b}>{b}</option>)}</select>
        </label>
        <label className="block text-sm">Timeline
          <select name="timeline" className={`${field} mt-1`}>{timelines.map((t) => <option key={t}>{t}</option>)}</select>
        </label>
      </div>

      <div data-step className={`mt-6 space-y-4 ${step === 2 ? "" : "hidden"}`}>
        <label className="block text-sm">Name
          <input name="name" required autoComplete="name" className={`${field} mt-1`} />
        </label>
        <label className="block text-sm">Email
          <input name="email" type="email" required autoComplete="email" className={`${field} mt-1`} />
        </label>
        <label className="block text-sm">Company (optional)
          <input name="company" autoComplete="organization" className={`${field} mt-1`} />
        </label>
        <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      </div>

      {state?.error && <p role="alert" className="mt-4 text-sm text-red-400">{state.error}</p>}

      <div className="mt-8 flex justify-between gap-3">
        <button type="button" onClick={() => setStep(step - 1)} disabled={step === 0} className="btn btn-ghost disabled:invisible">
          Back
        </button>
        {step < 2 ? (
          <button type="button" onClick={next} className="btn btn-primary">Next</button>
        ) : (
          <button type="submit" disabled={pending} className="btn btn-primary disabled:opacity-60">
            {pending ? "Sending..." : "Send request"}
          </button>
        )}
      </div>
    </form>
  );
}
