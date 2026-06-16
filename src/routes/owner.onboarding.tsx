import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/ui-bits";

export const Route = createFileRoute("/owner/onboarding")({
  head: () => ({ meta: [{ title: "List your facility · Strikr" }] }),
  component: Onboarding,
});

const STEPS = ["Business", "Facility", "Pricing", "Payouts"];

function Onboarding() {
  const [step, setStep] = useState(0);

  return (
    <div className="space-y-5 pb-20">
      <PageHeader title="List your facility" subtitle="Earn recurring revenue with Strikr" back="/profile" />

      <div className="flex gap-1.5">
        {STEPS.map((_, i) => (
          <div key={i} className={"h-1 flex-1 rounded-full " + (step >= i ? "gradient-primary" : "bg-muted")} />
        ))}
      </div>
      <div className="text-xs text-muted-foreground">Step {step + 1} of {STEPS.length} · {STEPS[step]}</div>

      <section className="rounded-3xl border border-border bg-surface p-4 space-y-3">
        {step === 0 && (<>
          <Field label="Business name" placeholder="Strikr Sports LLC" />
          <Field label="Owner name" placeholder="Your name" />
          <Field label="Phone" placeholder="+971…" />
          <Field label="Email" placeholder="you@business.com" type="email" />
          <Field label="Business registration #" placeholder="DED-12345" />
        </>)}
        {step === 1 && (<>
          <Field label="Facility name" placeholder="The Cage · JLT" />
          <Field label="Address" placeholder="Cluster A, JLT, Dubai" />
          <Field label="GPS coordinates" placeholder="25.0696, 55.1408" />
          <Field label="Description" placeholder="What makes your facility great?" textarea />
        </>)}
        {step === 2 && (<>
          <Field label="Default price per hour (AED)" placeholder="180" type="number" />
          <Field label="Peak surcharge (AED)" placeholder="60" type="number" />
          <Field label="Weekend surcharge (AED)" placeholder="40" type="number" />
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-3 text-[11px] text-primary">Strikr commission: 8% per booking · payout every Mon.</div>
        </>)}
        {step === 3 && (<>
          <Field label="Bank name" placeholder="Emirates NBD" />
          <Field label="Account holder" placeholder="Strikr Sports LLC" />
          <Field label="IBAN" placeholder="AE07…" />
          <Field label="Mobile money (optional)" placeholder="+971…" />
        </>)}
      </section>

      {step < STEPS.length - 1 ? (
        <button onClick={() => setStep(step + 1)} className="w-full rounded-full gradient-primary py-3 text-sm font-semibold text-primary-foreground shadow-glow">
          Continue
        </button>
      ) : (
        <Link
          to="/owner"
          onClick={() => toast.success("Facility submitted for verification")}
          className="flex w-full items-center justify-center gap-2 rounded-full gradient-primary py-3 text-sm font-semibold text-primary-foreground shadow-glow"
        >
          <Check className="h-4 w-4" /> Submit & go to dashboard
        </Link>
      )}
    </div>
  );
}

function Field({ label, placeholder, type = "text", textarea }: { label: string; placeholder: string; type?: string; textarea?: boolean }) {
  return (
    <label className="block">
      <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      {textarea ? (
        <textarea rows={3} placeholder={placeholder} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" />
      ) : (
        <input type={type} placeholder={placeholder} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" />
      )}
    </label>
  );
}
