import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Plus, Tag } from "lucide-react";
import { ownerPromotions } from "@/lib/mock-data";
import { PageHeader, Pill } from "@/components/ui-bits";

export const Route = createFileRoute("/owner/promotions")({
  head: () => ({ meta: [{ title: "Promotions · Owner" }] }),
  component: OwnerPromotions,
});

function OwnerPromotions() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [pct, setPct] = useState(10);

  const create = () => {
    if (!name || !code) { toast.error("Name and code required"); return; }
    toast.success(`Promo "${name}" live`, { description: `${pct}% off · code ${code.toUpperCase()}` });
    setName(""); setCode("");
  };

  return (
    <div className="space-y-5">
      <PageHeader title="Promotions" subtitle="Create discounts & coupons" />

      <section className="rounded-3xl border border-border bg-surface p-4 space-y-3">
        <h2 className="font-display text-sm font-bold uppercase tracking-wider">New promotion</h2>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Student weekday deal" className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" />
        <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Coupon code (STUDENT15)" className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm uppercase" />
        <div>
          <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Discount · {pct}%</div>
          <input type="range" min={5} max={50} step={5} value={pct} onChange={(e) => setPct(Number(e.target.value))} className="w-full accent-primary" />
        </div>
        <button onClick={create} className="inline-flex items-center gap-1 rounded-full gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow">
          <Plus className="h-3 w-3" /> Create promotion
        </button>
      </section>

      <section>
        <h2 className="mb-3 font-display text-base font-bold uppercase tracking-wider">Active & past</h2>
        <div className="space-y-2">
          {ownerPromotions.map((p) => (
            <div key={p.id} className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary"><Tag className="h-4 w-4" /></span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold">{p.name}</div>
                <div className="font-mono text-[11px] text-muted-foreground">{p.code} · {p.uses} uses</div>
              </div>
              <Pill tone={p.status === "active" ? "success" : "default"}>{p.status}</Pill>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
