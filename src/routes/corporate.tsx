import { createFileRoute } from "@tanstack/react-router";
import { Building2, Check, FileText } from "lucide-react";
import { corporatePackages } from "@/lib/mock-data";
import { PageHeader, SectionTitle } from "@/components/ui-bits";

export const Route = createFileRoute("/corporate")({
  head: () => ({ meta: [{ title: "Corporate Events · Strikr" }, { name: "description", content: "Host private corporate football events at Strikr." }] }),
  component: CorporatePage,
});

const inclusions = [
  "Full venue exclusivity",
  "Professional referees",
  "Live scoreboard & MC",
  "Catering & beverages",
  "Custom branding",
  "Trophy & medals",
  "Photography & highlight reel",
  "VIP lounge access",
];

function CorporatePage() {
  return (
    <div className="space-y-5">
      <PageHeader title="Corporate events" subtitle="Team-building, leagues, and brand activations" back="/" />

      <section className="relative overflow-hidden rounded-3xl gradient-hero p-5 text-white shadow-elevated">
        <div className="absolute inset-0 gradient-mesh opacity-70" />
        <div className="relative">
          <Building2 className="h-6 w-6 text-primary" />
          <h2 className="mt-2 font-display text-xl font-bold leading-tight">Your venue, your brand</h2>
          <p className="mt-1 text-xs text-white/70">From a single afternoon to a 12-week league. We handle logistics — you focus on the game.</p>
          <button className="mt-3 rounded-full gradient-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-glow">
            Talk to events team
          </button>
        </div>
      </section>

      {/* Packages */}
      <section>
        <SectionTitle title="Packages" />
        <div className="space-y-2">
          {corporatePackages.map((p) => (
            <div key={p.id} className="rounded-2xl border border-border bg-surface p-4">
              <div className="flex items-start gap-3">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-2xl">{p.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="font-display text-base font-bold">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.desc}</div>
                </div>
                <div className="text-right">
                  <div className="font-display text-base font-bold text-primary">{p.price.split(" ")[1]}</div>
                  <div className="text-[10px] text-muted-foreground">{p.price.split(" ")[0]}</div>
                </div>
              </div>
              <button className="mt-3 w-full rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary">
                Request quote
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Inclusions */}
      <section>
        <SectionTitle title="Add-ons available" />
        <div className="grid grid-cols-2 gap-2 rounded-2xl border border-border bg-surface p-3">
          {inclusions.map((i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
              <span>{i}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Invoice mock */}
      <section className="rounded-2xl border border-border bg-surface p-4">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 text-sm font-semibold">
            <FileText className="h-4 w-4 text-accent" /> Last invoice
          </div>
          <span className="text-[10px] uppercase tracking-wider text-success">Paid</span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <div className="text-muted-foreground">Acme Holdings · Annual League</div>
          <div className="text-right font-display font-bold">AED 38,000</div>
          <div className="text-muted-foreground">Invoice #STR-2026-0142</div>
          <div className="text-right text-muted-foreground">Issued Jun 01</div>
        </div>
      </section>
    </div>
  );
}
