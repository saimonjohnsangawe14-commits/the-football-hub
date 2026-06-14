import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  Home, CalendarDays, Users, Trophy, User2, Menu, Bell, Sun, Moon, X,
  Video, GraduationCap, Building2, ShoppingBag, UtensilsCrossed, LayoutDashboard,
} from "lucide-react";

const primaryNav = [
  { to: "/", label: "Home", icon: Home },
  { to: "/book", label: "Book", icon: CalendarDays },
  { to: "/teams", label: "Teams", icon: Users },
  { to: "/tournaments", label: "Cups", icon: Trophy },
  { to: "/profile", label: "Profile", icon: User2 },
];

const moreNav = [
  { to: "/matches", label: "Match Recording", icon: Video, desc: "Highlights & videographers" },
  { to: "/academy", label: "Academy", icon: GraduationCap, desc: "Youth training programs" },
  { to: "/corporate", label: "Corporate Events", icon: Building2, desc: "Book private events" },
  { to: "/marketplace", label: "Marketplace", icon: ShoppingBag, desc: "Boots, jerseys, gear" },
  { to: "/food", label: "Food Ordering", icon: UtensilsCrossed, desc: "Pre-order before kick-off" },
  { to: "/admin", label: "Admin Dashboard", icon: LayoutDashboard, desc: "Venue operator console" },
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
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl gradient-primary shadow-glow">
              <span className="font-display text-lg font-bold text-primary-foreground">S</span>
            </div>
            <div className="min-w-0">
              <div className="font-display text-base font-bold leading-none">Strikr</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Football ecosystem</div>
            </div>
          </Link>

          <div className="flex items-center gap-1">
            <button
              onClick={onToggleTheme}
              className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button className="relative grid h-9 w-9 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Notifications">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="More"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 pb-28 pt-4">{children}</main>

      {/* Bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto grid max-w-2xl grid-cols-5 px-2 pb-[env(safe-area-inset-bottom)]">
          {primaryNav.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className="flex flex-col items-center gap-1 py-2.5"
              >
                <span
                  className={
                    "grid h-9 w-9 place-items-center rounded-full transition-all " +
                    (active ? "gradient-primary text-primary-foreground shadow-glow" : "text-muted-foreground")
                  }
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span
                  className={
                    "text-[10px] font-semibold " + (active ? "text-foreground" : "text-muted-foreground")
                  }
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* More menu sheet */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="absolute inset-x-0 bottom-0 mx-auto max-w-2xl rounded-t-3xl border-t border-border bg-card p-5 shadow-elevated"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="font-display text-lg font-bold">More tools</div>
                <div className="text-xs text-muted-foreground">Everything else in your ecosystem</div>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full bg-muted text-muted-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid gap-2">
              {moreNav.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-3 transition-colors hover:border-primary/60"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-muted text-foreground">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold">{item.label}</span>
                      <span className="block truncate text-xs text-muted-foreground">{item.desc}</span>
                    </span>
                  </Link>
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
