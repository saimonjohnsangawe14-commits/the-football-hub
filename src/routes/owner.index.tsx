import { createFileRoute, Link } from "@tanstack/react-router";
import { TrendingUp, Users, Wallet, AlertCircle, CalendarDays, ChevronRight, Tag, Settings2 } from "lucide-react";
import { ownerStats, ownerBookingsToday, ownerStaff } from "@/lib/mock-data";
import { PageHeader, Stat, Pill } from "@/components/ui-bits";

export const Route = createFileRoute("/owner/")({
  head: () => ({ meta: [{ title: "Owner dashboard · Strikr" }] }),
  component: OwnerDashboard,
});

function OwnerDashboard() {
  return (
    <div className="space-y-5">
      <PageHeader title="Good evening" subtitle="Strikr Arena · Al Quoz · Live overview" />

      <div className="grid grid-cols-2 gap-2">
        <Stat label="Today" value={`AED ${ownerStats.revenueToday.toLocaleString()}`} hint="+12% vs yesterday" accent />
        <Stat label="This week" value={`AED ${ownerStats.revenueWeek.toLocaleString()}`} hint={`AED ${ownerStats.revenueMonth.toLocaleString()} MTD`} />
        <Stat label="Bookings today" value={ownerStats.bookingsToday} hint={`${ownerStats.occupancy}% occupancy`} />
        <Stat label="Repeat customers" value={`${ownerStats.repeatRate}%`} hint="last 30 days" />
      </div>

      {ownerStats.pendingPayments > 0 && (
        <div className="flex items-center gap-3 rounded-2xl border border-warning/40 bg-warning/10 p-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-warning/20 text-warning"><AlertCircle className="h-4 w-4" /></span>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold">{ownerStats.pendingPayments} pending payments</div>
            <div className="text-[11px] text-muted-foreground">Total AED 1,240 awaiting capture</div>
          </div>
          <button className="rounded-full bg-warning px-3 py-1.5 text-[11px] font-semibold text-warning-foreground">Review</button>
        </div>
      )}

      {/* Today's schedule */}
      <section>
        <div className="mb-3 flex items-end justify-between">
          <h2 className="font-display text-base font-bold uppercase tracking-wider">Today's schedule</h2>
          <Link to="/owner/bookings" className="inline-flex items-center gap-0.5 text-xs font-semibold text-primary">
            Calendar <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="overflow-hidden rounded-2xl border border-border bg-surface">
          {ownerBookingsToday.map((b, i) => (
            <div key={b.id} className={"flex items-center gap-3 p-3 " + (i > 0 ? "border-t border-border" : "")}>
              <div className="font-display text-sm font-bold tabular-nums">{b.time}</div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">{b.customer}</div>
                <div className="text-[11px] text-muted-foreground">{b.pitch}</div>
              </div>
              <Pill tone={b.status === "confirmed" ? "success" : b.status === "pending" ? "warning" : b.status === "walkin" ? "accent" : "primary"}>
                {b.status}
              </Pill>
              <div className="w-16 text-right font-display text-sm font-bold">AED {b.price}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick actions */}
      <section>
        <h2 className="mb-3 font-display text-base font-bold uppercase tracking-wider">Quick actions</h2>
        <div className="grid grid-cols-2 gap-2">
          <QuickAction to="/owner/bookings" icon={CalendarDays} label="Manage bookings" desc="Pending · recurring · walk-ins" />
          <QuickAction to="/owner/slots" icon={Settings2} label="Slot rules" desc="Hours · pricing · peak" />
          <QuickAction to="/owner/promotions" icon={Tag} label="Promotions" desc="Discounts & coupon codes" />
          <QuickAction to="/owner/staff" icon={Users} label="Staff" desc="Shifts & attendance" />
          <QuickAction to="/owner/finance" icon={TrendingUp} label="Financials" desc="Revenue · payouts · exports" />
          <QuickAction to="/owner/facility" icon={Wallet} label="Facility setup" desc="Amenities · photos · rules" />
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-display text-base font-bold uppercase tracking-wider">Staff on shift</h2>
        <div className="overflow-hidden rounded-2xl border border-border bg-surface">
          {ownerStaff.map((s, i) => (
            <div key={s.name} className={"flex items-center gap-3 p-3 " + (i > 0 ? "border-t border-border" : "")}>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-muted font-display text-[11px] font-bold">{s.name.split(" ").map((x) => x[0]).join("")}</span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">{s.name}</div>
                <div className="text-[11px] text-muted-foreground">{s.role} · {s.shift}</div>
              </div>
              <Pill tone={s.status === "On shift" ? "success" : "warning"}>{s.status}</Pill>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function QuickAction({ to, icon: Icon, label, desc }: { to: any; icon: any; label: string; desc: string }) {
  return (
    <Link to={to} className="rounded-2xl border border-border bg-surface p-3 transition-colors hover:border-primary/50">
      <span className="grid h-9 w-9 place-items-center rounded-xl gradient-primary text-primary-foreground shadow-glow"><Icon className="h-4 w-4" /></span>
      <div className="mt-2 text-sm font-semibold">{label}</div>
      <div className="text-[11px] text-muted-foreground">{desc}</div>
    </Link>
  );
}
