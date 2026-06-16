import { createFileRoute, Link } from "@tanstack/react-router";
import { Settings2, Share2, LogOut, ChevronRight, CreditCard, Heart, Bell, Building2, HelpCircle, Wallet } from "lucide-react";
import { toast } from "sonner";
import { currentUser, myBookings } from "@/lib/mock-data";
import { PageHeader, Stat } from "@/components/ui-bits";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile · Strikr" }] }),
  component: ProfilePage,
});

const menu = [
  { label: "Saved facilities", icon: Heart, to: "/explore" as const },
  { label: "Payment methods", icon: CreditCard, action: () => toast.info("Payment methods coming soon") },
  { label: "Notification settings", icon: Bell, action: () => toast.success("Notifications enabled") },
  { label: "Become a facility owner", icon: Building2, to: "/owner/onboarding" as const },
  { label: "Help & support", icon: HelpCircle, action: () => toast.info("Email support@strikr.app") },
];

function ProfilePage() {
  const upcoming = myBookings.filter((b) => b.status === "Upcoming").length;
  const completed = myBookings.filter((b) => b.status === "Completed").length;

  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ title: "Strikr", url: window.location.origin });
      else { await navigator.clipboard.writeText(window.location.origin); toast.success("Link copied"); }
    } catch { /* cancelled */ }
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Profile"
        action={
          <div className="flex gap-1">
            <button onClick={share} className="grid h-9 w-9 place-items-center rounded-full bg-muted text-muted-foreground">
              <Share2 className="h-4 w-4" />
            </button>
            <button onClick={() => toast.success("Settings opened")} className="grid h-9 w-9 place-items-center rounded-full bg-muted text-muted-foreground">
              <Settings2 className="h-4 w-4" />
            </button>
          </div>
        }
      />

      {/* Identity */}
      <div className="rounded-3xl border border-border bg-surface p-4">
        <div className="flex items-center gap-3">
          <div className="grid h-16 w-16 place-items-center rounded-2xl gradient-primary font-display text-xl font-bold text-primary-foreground shadow-glow">
            {currentUser.avatar}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate font-display text-lg font-bold">{currentUser.name}</div>
            <div className="text-xs text-muted-foreground">{currentUser.handle} · {currentUser.city}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Stat label="Upcoming" value={upcoming} accent />
        <Stat label="Played" value={completed} />
        <Stat label="Wallet" value="AED 240" hint="Strikr credit" />
      </div>

      <Link
        to="/owner"
        className="flex items-center gap-3 rounded-3xl border border-primary/30 bg-primary/5 p-4 shadow-glow"
      >
        <span className="grid h-10 w-10 place-items-center rounded-xl gradient-primary text-primary-foreground"><Building2 className="h-4 w-4" /></span>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold">Switch to Owner view</div>
          <div className="text-[11px] text-muted-foreground">Manage your facility, bookings & revenue</div>
        </div>
        <ChevronRight className="h-4 w-4 text-primary" />
      </Link>

      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        {menu.map((m, i) => {
          const Icon = m.icon;
          const inner = (
            <div className={"flex items-center gap-3 p-3 " + (i > 0 ? "border-t border-border" : "")}>
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-muted text-muted-foreground"><Icon className="h-4 w-4" /></span>
              <span className="flex-1 text-sm font-semibold">{m.label}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          );
          return "to" in m && m.to ? (
            <Link key={m.label} to={m.to}>{inner}</Link>
          ) : (
            <button key={m.label} onClick={m.action} className="block w-full text-left">{inner}</button>
          );
        })}
      </div>

      <button
        onClick={() => toast.success("Signed out")}
        className="flex w-full items-center justify-center gap-2 rounded-full border border-border bg-surface py-3 text-sm font-semibold text-muted-foreground"
      >
        <LogOut className="h-4 w-4" /> Sign out
      </button>
      <div className="text-center text-[10px] text-muted-foreground">v2.0 · Football Hub</div>

      {/* silence unused */}
      <Wallet className="hidden" />
    </div>
  );
}
