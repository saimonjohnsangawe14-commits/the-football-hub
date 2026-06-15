import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, Users, DollarSign, Activity } from "lucide-react";
import {
  Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { adminMetrics, teamLeaderboard } from "@/lib/mock-data";
import { PageHeader, SectionTitle, Stat, Pill } from "@/components/ui-bits";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard · Strikr" }, { name: "description", content: "Venue operator analytics, occupancy and staff." }] }),
  component: AdminPage,
});

const PRIMARY = "hsl(var(--primary))";
const ACCENT = "hsl(var(--accent))";
const MUTED = "hsl(var(--muted-foreground))";

function AdminPage() {
  const totalRev = adminMetrics.revenueBreakdown.reduce((a, b) => a + b.value, 0);
  const peakData = adminMetrics.peakHours.map((h) => ({ ...h, label: h.hour.slice(0, 2) }));
  const pieData = adminMetrics.revenueBreakdown.map((r) => ({ name: r.label, value: r.value, fill: r.color === "primary" ? PRIMARY : ACCENT }));

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

      {/* Peak hours bar chart */}
      <section className="rounded-2xl border border-border bg-surface p-4">
        <div className="flex items-center justify-between">
          <div className="font-display text-sm font-bold uppercase tracking-wider">Peak hours · today</div>
          <Pill tone="primary">Live</Pill>
        </div>
        <div className="mt-3 h-44">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={peakData} margin={{ top: 8, right: 4, left: -24, bottom: 0 }}>
              <XAxis dataKey="label" stroke={MUTED} fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke={MUTED} fontSize={10} tickLine={false} axisLine={false} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
              <Tooltip
                cursor={{ fill: "hsl(var(--muted))", opacity: 0.4 }}
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }}
                formatter={(v: number) => [`${v}% full`, "Occupancy"]}
                labelFormatter={(l) => `${l}:00`}
              />
              <Bar dataKey="pct" radius={[6, 6, 0, 0]}>
                {peakData.map((h, i) => (
                  <Cell key={i} fill={h.pct >= 90 ? PRIMARY : h.pct >= 60 ? ACCENT : "hsl(var(--muted))"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Revenue mix pie chart */}
      <section className="rounded-2xl border border-border bg-surface p-4">
        <div className="flex items-center justify-between">
          <div className="font-display text-sm font-bold uppercase tracking-wider">Revenue mix · 7d</div>
          <span className="font-display text-sm font-bold">AED {totalRev.toLocaleString()}</span>
        </div>
        <div className="mt-2 grid grid-cols-[120px_1fr] items-center gap-3">
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" innerRadius={32} outerRadius={56} paddingAngle={2} stroke="hsl(var(--card))" strokeWidth={2}>
                  {pieData.map((d, i) => <Cell key={i} fill={d.fill} />)}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }}
                  formatter={(v: number, n) => [`AED ${v.toLocaleString()}`, n]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {adminMetrics.revenueBreakdown.map((r, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-2">
                  <span className={"h-2 w-2 rounded-full " + (r.color === "primary" ? "bg-primary" : "bg-accent")} />
                  <span className="text-muted-foreground">{r.label}</span>
                </span>
                <span className="font-display font-bold">{Math.round((r.value / totalRev) * 100)}%</span>
              </div>
            ))}
          </div>
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
        <SectionTitle title="Staff on shift" />
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
