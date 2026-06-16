import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Plus, Check, X } from "lucide-react";
import { ownerBookingsToday } from "@/lib/mock-data";
import { PageHeader, Pill } from "@/components/ui-bits";

export const Route = createFileRoute("/owner/bookings")({
  head: () => ({ meta: [{ title: "Bookings calendar · Owner" }] }),
  component: OwnerBookings,
});

const VIEWS = ["Day", "Week", "Month"] as const;
const PITCHES = ["Pitch 1 · 5v5", "Pitch 2 · 7v7", "Pitch 3 · 11v11"];
const HOURS = ["16", "17", "18", "19", "20", "21", "22", "23"];

function OwnerBookings() {
  const [view, setView] = useState<(typeof VIEWS)[number]>("Day");

  // grid: pitch x hour
  const cell = (pitchIdx: number, hour: string) => {
    const b = ownerBookingsToday.find((x) => x.time === `${hour}:00` && PITCHES.indexOf(x.pitch) === pitchIdx);
    return b;
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Bookings"
        subtitle="Real-time pitch calendar"
        action={
          <button onClick={() => toast.success("Manual booking created")} className="inline-flex items-center gap-1 rounded-full gradient-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-glow">
            <Plus className="h-3 w-3" /> Manual
          </button>
        }
      />

      <div className="inline-flex w-full rounded-full border border-border bg-surface p-1">
        {VIEWS.map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={"flex-1 rounded-full px-3 py-1.5 text-xs font-semibold " + (view === v ? "bg-primary text-primary-foreground shadow-glow" : "text-muted-foreground")}
          >
            {v}
          </button>
        ))}
      </div>

      {view === "Day" && (
        <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
          <div className="grid min-w-[600px]" style={{ gridTemplateColumns: `90px repeat(${HOURS.length}, 1fr)` }}>
            <div className="border-b border-border p-2 text-[10px] font-semibold uppercase text-muted-foreground">Pitch</div>
            {HOURS.map((h) => (
              <div key={h} className="border-b border-l border-border p-2 text-center text-[10px] font-semibold uppercase text-muted-foreground">{h}:00</div>
            ))}
            {PITCHES.map((p, pi) => (
              <>
                <div key={p} className="border-b border-border p-2 text-[11px] font-semibold">{p}</div>
                {HOURS.map((h) => {
                  const b = cell(pi, h);
                  return (
                    <div key={p + h} className="border-b border-l border-border p-1">
                      {b ? (
                        <div className={"h-full rounded-md px-1.5 py-1 text-[10px] font-semibold " + (
                          b.status === "confirmed" ? "bg-primary/20 text-primary" :
                          b.status === "pending" ? "bg-warning/20 text-warning" :
                          b.status === "walkin" ? "bg-accent/20 text-accent" :
                          "bg-success/20 text-success"
                        )}>
                          <div className="truncate">{b.customer}</div>
                          <div className="opacity-70">AED {b.price}</div>
                        </div>
                      ) : (
                        <div className="h-full rounded-md border border-dashed border-border/40" />
                      )}
                    </div>
                  );
                })}
              </>
            ))}
          </div>
        </div>
      )}

      {view !== "Day" && (
        <div className="rounded-2xl border border-dashed border-border bg-surface p-10 text-center text-sm text-muted-foreground">
          {view} view coming next sprint.
        </div>
      )}

      {/* Pending */}
      <section>
        <h2 className="mb-3 font-display text-base font-bold uppercase tracking-wider">Pending approvals</h2>
        <div className="overflow-hidden rounded-2xl border border-border bg-surface">
          {ownerBookingsToday.filter((b) => b.status === "pending").map((b) => (
            <div key={b.id} className="flex items-center gap-3 p-3">
              <div className="font-display text-sm font-bold">{b.time}</div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">{b.customer}</div>
                <div className="text-[11px] text-muted-foreground">{b.pitch} · AED {b.price}</div>
              </div>
              <button onClick={() => toast.success("Booking confirmed")} className="grid h-8 w-8 place-items-center rounded-full bg-success text-success-foreground">
                <Check className="h-4 w-4" />
              </button>
              <button onClick={() => toast.error("Booking declined")} className="grid h-8 w-8 place-items-center rounded-full bg-destructive text-destructive-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-display text-base font-bold uppercase tracking-wider">Recurring bookings</h2>
        <div className="space-y-2">
          {[
            { name: "Sami's group · Tue 21:00", pitch: "Pitch 1 · 5v5", until: "Until Dec 2026" },
            { name: "Corporate league · Thu 19:30", pitch: "Pitch 2 · 7v7", until: "Until Sep 2026" },
          ].map((r) => (
            <div key={r.name} className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-3">
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">{r.name}</div>
                <div className="text-[11px] text-muted-foreground">{r.pitch} · {r.until}</div>
              </div>
              <Pill tone="primary">Auto-invoice</Pill>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
