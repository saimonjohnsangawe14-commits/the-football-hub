import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, Users, DollarSign, Activity, Clock } from "lucide-react";
import { adminMetrics, teamLeaderboard } from "@/lib/mock-data";
import { PageHeader, SectionTitle, Stat, Pill } from "@/components/ui-bits";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard · Strikr" }, { name: "description", content: "Venue operator analytics, occupancy and staff." }] }),
  component: AdminPage,
});

function AdminPage() {
  const totalRev = adminMetrics.revenueBreakdown.reduce((a, b) => a + b.value, 0);

  return (
    <div className="space-y-5">
      <PageHeader title="Operator console" subtitle="Strikr Arena · live performance" back="/" />

      {/* KPI cards */}
      <section className="grid grid-cols-2 gap-2">
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
            <DollarSign className="h-3 w-3" /> Today
          </div>
          <div className="mt-1 font-display text-2xl font-bold">AED {adminMetrics.revenueToday.toLocaleString()}</div>
          <div className="mt-1 inline-flex items-center gap-1 text-[11px] text-success">
            <TrendingUp className="h-3 w-3" /> +12% vs avg
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-4">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">This week</div>
          <div className="mt-1 font-display text-2xl font-bold">AED {adminMetrics.revenueWeek.toLocaleString()}</div>
          <div className="mt-1 text-[11px] text-muted-foreground">7-day rolling</div>
        </div>
        <Stat label="Occupancy" value={`${adminMetrics.occupancy}%`} hint="All pitches" />
        <Stat label="Retention" value={`${adminMetrics.retention}%`} hint="90-day" />
      </section>

      {/* Peak hours */}
      <section className="rounded-2xl border border-border bg-surface p-4">
        <div className="flex items-center justify-between">
          <div className="font-display text-sm font-bold uppercase tracking-wider">Peak hours · today</div>
          <Pill tone="primary">Live</Pill>
        </div>
        <div className="mt-4 flex h-32 items-end gap-1.5">
          {adminMetrics.peakHours.map((h) => (
            <div key={h.hour} className="flex flex-1 flex-col items-center gap-1">
              <div
                className={"w-full rounded-t-md " + (h.pct >= 90 ? "gradient-primary" : h.pct >= 60 ? "bg-accent" : "bg-muted")}
                style={{ height: `${h.pct}%` }}
              />
              <span className="text-[9px] text-muted-foreground">{h.hour.slice(0, 2)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Revenue breakdown */}
      <section className="rounded-2xl border border-border bg-surface p-4">
        <div className="font-display text-sm font-bold uppercase tracking-wider">Revenue mix · 7d</div>
        <div className="mt-3 flex h-2.5 overflow-hidden rounded-full">
          {adminMetrics.revenueBreakdown.map((r, i) => (
            <div
              key={i}
              className={r.color === "primary" ? "gradient-primary" : "gradient-accent"}
              style={{ width: `${(r.value / totalRev) * 100}%` }}
            />
          ))}
        </div>
        <div className="mt-3 space-y-2">
          {adminMetrics.revenueBreakdown.map((r, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <span className="inline-flex items-center gap-2">
                <span className={"h-2 w-2 rounded-full " + (r.color === "primary" ? "bg-primary" : "bg-accent")} />
                <span className="text-muted-foreground">{r.label}</span>
              </span>
              <span className="font-display font-bold">AED {r.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Most active teams */}
      <section>
        <SectionTitle title="Most active teams" />
        <div className="overflow-hidden rounded-2xl border border-border bg-surface">
          {teamLeaderboard.slice(0, 4).map((t, i) => (
            <div key={t.rank} className={"flex items-center gap-3 p-3 " + (i > 0 ? "border-t border-border" : "")}>
              <span className="text-2xl">{t.logo}</span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">{t.name}</div>
                <div className="text-[11px] text-muted-foreground">{t.played} bookings · AED {(t.played * 240).toLocaleString()}</div>
              </div>
              <Activity className="h-4 w-4 text-primary" />
            </div>
          ))}
        </div>
      </section>

      {/* Staff */}
      <section>
        <SectionTitle title="Staff on shift" action={<span className="text-xs font-semibold text-primary">+ Add</span>} />
        <div className="overflow-hidden rounded-2xl border border-border bg-surface">
          {adminMetrics.staff.map((s, i) => (
            <div key={s.name} className={"flex items-center gap-3 p-3 " + (i > 0 ? "border-t border-border" : "")}>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground">
                <Users className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">{s.name}</div>
                <div className="truncate text-[11px] text-muted-foreground">{s.role} · {s.shift}</div>
              </div>
              <Pill tone={s.status === "On shift" ? "success" : "warning"}>{s.status}</Pill>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
