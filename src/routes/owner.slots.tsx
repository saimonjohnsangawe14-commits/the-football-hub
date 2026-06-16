import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/ui-bits";

export const Route = createFileRoute("/owner/slots")({
  head: () => ({ meta: [{ title: "Slot rules · Owner" }] }),
  component: OwnerSlots,
});

function OwnerSlots() {
  const [open, setOpen] = useState("06:00");
  const [close, setClose] = useState("02:00");
  const [duration, setDuration] = useState(60);
  const [base, setBase] = useState(180);
  const [peak, setPeak] = useState(60);
  const [weekend, setWeekend] = useState(40);

  return (
    <div className="space-y-5">
      <PageHeader title="Slot rules" subtitle="Define hours, duration & pricing — slots auto-generate" />

      <section className="rounded-3xl border border-border bg-surface p-4 space-y-3">
        <h2 className="font-display text-sm font-bold uppercase tracking-wider">Operating hours</h2>
        <div className="grid grid-cols-2 gap-2">
          <Field label="Opens"><input type="time" value={open} onChange={(e) => setOpen(e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" /></Field>
          <Field label="Closes"><input type="time" value={close} onChange={(e) => setClose(e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" /></Field>
        </div>
        <Field label={`Slot duration · ${duration} min`}>
          <input type="range" min={30} max={120} step={15} value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="w-full accent-primary" />
        </Field>
      </section>

      <section className="rounded-3xl border border-border bg-surface p-4 space-y-3">
        <h2 className="font-display text-sm font-bold uppercase tracking-wider">Pricing</h2>
        <Field label={`Base price · AED ${base}/hr`}>
          <input type="range" min={80} max={500} step={10} value={base} onChange={(e) => setBase(Number(e.target.value))} className="w-full accent-primary" />
        </Field>
        <Field label={`Peak surcharge (19–21h) · +AED ${peak}`}>
          <input type="range" min={0} max={200} step={10} value={peak} onChange={(e) => setPeak(Number(e.target.value))} className="w-full accent-primary" />
        </Field>
        <Field label={`Weekend surcharge · +AED ${weekend}`}>
          <input type="range" min={0} max={200} step={10} value={weekend} onChange={(e) => setWeekend(Number(e.target.value))} className="w-full accent-primary" />
        </Field>
      </section>

      <section className="rounded-3xl border border-primary/30 bg-primary/5 p-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-primary">Preview</div>
        <div className="mt-1 text-sm">
          Tonight 19:00 → 20:00 · <b>AED {base + peak}</b> · Saturday 20:00 · <b>AED {base + peak + weekend}</b>
        </div>
        <div className="mt-1 text-[11px] text-muted-foreground">Slots auto-generate every {duration} min between {open} and {close}.</div>
      </section>

      <button
        onClick={() => toast.success("Slot rules saved")}
        className="w-full rounded-full gradient-primary py-3 text-sm font-semibold text-primary-foreground shadow-glow"
      >
        Save rules
      </button>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      {children}
    </label>
  );
}
