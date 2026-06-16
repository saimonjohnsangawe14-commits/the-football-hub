import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import {
  Home, Search, CalendarDays, Users, User2, Bell, Sun, Moon, Check,
  CalendarClock, MessageSquare, Trophy, LayoutDashboard, Building2,
  Settings2, BarChart3, Wallet, Tag, ArrowLeftRight,
} from "lucide-react";

const notifications = [
  { icon: Trophy, title: "Booking confirmed", desc: "Strikr Arena · Pitch 2 · 7v7 tomorrow 20:00", tone: "primary" as const },
  { icon: CalendarClock, title: "Reminder", desc: "Match in 12h · Pitch 1 · Bring boots", tone: "accent" as const },
  { icon: MessageSquare, title: "New review", desc: "Rashid left a 5★ review on Strikr Arena", tone: "primary" as const },
];

const playerNav = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/explore", label: "Explore", icon: Search },
  { to: "/bookings", label: "Bookings", icon: CalendarDays },
  { to: "/community", label: "Community", icon: Users },
  { to: "/profile", label: "Profile", icon: User2 },
];

const ownerNav = [
  { to: "/owner", label: "Dash", icon: LayoutDashboard, exact: true },
  { to: "/owner/bookings", label: "Bookings", icon: CalendarDays },
  { to: "/owner/finance", label: "Finance", icon: BarChart3 },
  { to: "/owner/promotions", label: "Promos", icon: Tag },
  { to: "/owner/facility", label: "Facility", icon: Building2 },
];

export function AppShell({
  children,
  theme,
  onToggleTheme,
}: {
  children: ReactNode;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}) {
  const [notifOpen, setNotifOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isOwner = pathname.startsWith("/owner");
  const nav = isOwner ? ownerNav : playerNav;
  const switchHref = isOwner ? "/" : "/owner";
  const switchLabel = isOwner ? "Player view" : "Owner view";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <div className={"grid h-9 w-9 place-items-center rounded-xl shadow-glow " + (isOwner ? "bg-foreground text-background" : "gradient-primary")}>
              <span className="font-display text-lg font-bold text-primary-foreground">S</span>
            </div>
            <div className="min-w-0">
              <div className="font-display text-base font-bold leading-none">Strikr</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {isOwner ? "Owner console" : "Book any pitch"}
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-1">
            <Link
              to={switchHref}
              className="mr-1 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1.5 text-[10px] font-semibold text-muted-foreground hover:text-foreground"
            >
              <ArrowLeftRight className="h-3 w-3" />
              {switchLabel}
            </Link>
            <button
              onClick={onToggleTheme}
              className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setNotifOpen(true)}
              className="relative grid h-9 w-9 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 pb-28 pt-4">{children}</main>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto grid max-w-2xl grid-cols-5 px-2 pb-[env(safe-area-inset-bottom)]">
          {nav.map((item) => {
            const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link key={item.to} to={item.to} className="flex flex-col items-center gap-1 py-2.5">
                <span
                  className={
                    "grid h-9 w-9 place-items-center rounded-full transition-all " +
                    (active ? "gradient-primary text-primary-foreground shadow-glow" : "text-muted-foreground")
                  }
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className={"text-[10px] font-semibold " + (active ? "text-foreground" : "text-muted-foreground")}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {notifOpen && (
        <div className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm" onClick={() => setNotifOpen(false)}>
          <div
            className="absolute inset-x-0 bottom-0 mx-auto max-w-2xl rounded-t-3xl border-t border-border bg-card p-5 shadow-elevated"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="font-display text-lg font-bold">Notifications</div>
                <div className="text-xs text-muted-foreground">3 new this week</div>
              </div>
              <button
                onClick={() => {
                  toast.success("All caught up");
                  setNotifOpen(false);
                }}
                className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary"
              >
                <Check className="h-3 w-3" /> Mark read
              </button>
            </div>
            <div className="grid gap-2">
              {notifications.map((n, i) => {
                const Icon = n.icon;
                return (
                  <div key={i} className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-3">
                    <span className={"grid h-9 w-9 shrink-0 place-items-center rounded-xl " + (n.tone === "primary" ? "bg-primary/15 text-primary" : "bg-accent/15 text-accent")}>
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold">{n.title}</div>
                      <div className="truncate text-xs text-muted-foreground">{n.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 h-1.5 w-12 mx-auto rounded-full bg-muted" />
          </div>
        </div>
      )}
    </div>
  );
}

// helper so other pages can reuse the bottom-CTA spacing
export const STICKY_FOOTER_OFFSET = "pb-24";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _icons = { Wallet, Settings2 }; // keep tree-shake quiet for future use
