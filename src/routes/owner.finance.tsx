import { createFileRoute } from "@tanstack/react-router";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { ownerStats, ownerPeakHours, ownerRevenueBreakdown } from "@/lib/mock-data";
import { PageHeader, Stat } from "@/components/ui-bits";

export const Route = createFileRoute("/owner/finance")({
  head: () => ({ meta: [{ title: "Financials · Owner" }] }),
  component: OwnerFinance,
});

const COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--warning))", "hsl(var(--success))"];

function OwnerFinance() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Financials"
        subtitle="Revenue, occupancy & growth"
        action={
          <button onClick={() => toast.success("Report exported")} className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
            <Download className="h-3 w-3" /> Export
          </button>
        }
      />

      <div className="grid grid-cols-3 gap-2">
        <Stat label="Today" value={`AED ${ownerStats.revenueToday.toLocaleString()}`} accent />
        <Stat label="Week" value={`AED ${ownerStats.revenueWeek.toLocaleString()}`} hint="+8% WoW" />
        <Stat label="Month" value={`AED ${ownerStats.revenueMonth.toLocaleString()}`} hint="+22% MoM" />
      </div>

      <section className="rounded-3xl border border-border bg-surface p-4">
        <h2 className="mb-3 font-display text-sm font-bold uppercase tracking-wider">Occupancy by hour</h2>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ownerPeakHours}>
              <XAxis dataKey="hour" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                cursor={{ fill: "hsl(var(--muted))" }}
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 11 }}
              />
              <Bar dataKey="pct" radius={[6, 6, 0, 0]} fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="rounded-3xl border border-border bg-surface p-4">
        <h2 className="mb-3 font-display text-sm font-bold uppercase tracking-wider">Revenue per pitch</h2>
        <div className="flex items-center gap-4">
          <div className="h-40 w-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={ownerRevenueBreakdown} dataKey="value" cx="50%" cy="50%" innerRadius={36} outerRadius={64} paddingAngle={2}>
                  {ownerRevenueBreakdown.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 space-y-2">
            {ownerRevenueBreakdown.map((r, i) => (
              <div key={r.label} className="flex items-center gap-2 text-xs">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                <span className="flex-1 truncate text-muted-foreground">{r.label}</span>
                <span className="font-bold">AED {(r.value / 1000).toFixed(1)}k</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-display text-base font-bold uppercase tracking-wider">Outstanding payments</h2>
        <div className="overflow-hidden rounded-2xl border border-border bg-surface">
          {[
            { name: "Coastal Kings", amount: 580, due: "Due in 2 days" },
            { name: "Sami's group", amount: 240, due: "Due tomorrow" },
            { name: "Corporate · Acme", amount: 420, due: "Overdue 3 days" },
          ].map((p, i) => (
            <div key={p.name} className={"flex items-center justify-between p-3 " + (i > 0 ? "border-t border-border" : "")}>
              <div>
                <div className="text-sm font-semibold">{p.name}</div>
                <div className="text-[11px] text-muted-foreground">{p.due}</div>
              </div>
              <div className="font-display text-sm font-bold">AED {p.amount}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
