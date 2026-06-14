import { createFileRoute, Link } from "@tanstack/react-router";
import { Zap, Flame, ArrowRight, Trophy, Calendar, MapPin, Play } from "lucide-react";
import { currentUser, pitchSlots, featuredMatches, tournaments, playerLeaderboard, teamLeaderboard } from "@/lib/mock-data";
import { SectionTitle, Pill, Avatar, Stat } from "@/components/ui-bits";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Strikr — Football, Reimagined" },
      { name: "description", content: "Your football hub: book pitches, track stats, join tournaments." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const open = pitchSlots.filter((s) => s.available).slice(0, 4);
  const xpPct = (currentUser.xp / currentUser.nextLevelXp) * 100;

  return (
    <div className="space-y-5">
      {/* Hero greeting */}
      <section className="relative overflow-hidden rounded-3xl gradient-hero p-5 text-white shadow-elevated">
        <div className="absolute inset-0 gradient-mesh opacity-80" />
        <div className="relative">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.18em] text-white/60">Good evening</p>
              <h1 className="mt-1 font-display text-2xl font-bold leading-tight">{currentUser.name.split(" ")[0]}, ready to play?</h1>
            </div>
            <Avatar initials={currentUser.avatar} size={48} tone="primary" />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="rounded-2xl bg-white/10 p-3 backdrop-blur">
              <div className="text-[10px] uppercase tracking-wider text-white/60">Rating</div>
              <div className="mt-0.5 font-display text-xl font-bold">{currentUser.rating}</div>
            </div>
            <div className="rounded-2xl bg-white/10 p-3 backdrop-blur">
              <div className="text-[10px] uppercase tracking-wider text-white/60">Level</div>
              <div className="mt-0.5 font-display text-xl font-bold">{currentUser.level}</div>
            </div>
            <div className="rounded-2xl bg-white/10 p-3 backdrop-blur">
              <div className="text-[10px] uppercase tracking-wider text-white/60">Team</div>
              <div className="mt-0.5 truncate font-display text-sm font-bold">{currentUser.team}</div>
            </div>
          </div>

          <div className="mt-4">
            <div className="mb-1 flex items-center justify-between text-[11px] text-white/70">
              <span>XP {currentUser.xp.toLocaleString()} / {currentUser.nextLevelXp.toLocaleString()}</span>
              <span>Lvl {currentUser.level + 1}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/15">
              <div className="h-full gradient-primary" style={{ width: `${xpPct}%` }} />
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <Link to="/book" className="flex-1 rounded-full gradient-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground shadow-glow">
              Book a pitch
            </Link>
            <Link to="/tournaments" className="rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur">
              Join cup
            </Link>
          </div>
        </div>
      </section>

      {/* Quick shortcuts */}
      <section className="grid grid-cols-4 gap-2">
        {[
          { label: "Re-book", icon: Zap, to: "/book" },
          { label: "My team", icon: Trophy, to: "/teams" },
          { label: "Highlights", icon: Play, to: "/matches" },
          { label: "Order food", icon: Flame, to: "/food" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <Link key={s.label} to={s.to} className="flex flex-col items-center gap-1.5 rounded-2xl border border-border bg-surface p-3 transition-colors hover:border-primary/60">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-4 w-4" />
              </span>
              <span className="text-[11px] font-semibold">{s.label}</span>
            </Link>
          );
        })}
      </section>

      {/* Available now */}
      <section>
        <SectionTitle title="Open slots tonight" action={<Link to="/book" className="text-xs font-semibold text-primary">See all →</Link>} />
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 scrollbar-hide">
          {open.map((s) => (
            <Link
              key={s.id}
              to="/book"
              className="w-44 shrink-0 rounded-2xl border border-border bg-surface p-3 transition-colors hover:border-primary/60"
            >
              <div className="flex items-center justify-between">
                <Pill tone="success">Open</Pill>
                <span className="text-[11px] text-muted-foreground">{s.surface}</span>
              </div>
              <div className="mt-2 font-display text-lg font-bold">{s.time}</div>
              <div className="truncate text-xs text-muted-foreground">{s.pitch}</div>
              <div className="mt-3 flex items-end justify-between">
                <span className="text-xs text-muted-foreground">{s.duration} min</span>
                <span className="font-display text-base font-bold text-primary">AED {s.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured matches */}
      <section>
        <SectionTitle title="Featured matches" />
        <div className="space-y-2">
          {featuredMatches.map((m) => (
            <div key={m.id} className="rounded-2xl border border-border bg-surface p-3">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {m.time}</span>
                <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {m.pitch}</span>
              </div>
              <div className="mt-2 flex items-center justify-between gap-3">
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <Avatar initials={m.home.slice(0, 2).toUpperCase()} />
                  <span className="truncate text-sm font-semibold">{m.home}</span>
                </div>
                {m.status === "live" ? (
                  <div className="flex flex-col items-center">
                    <Pill tone="destructive">● Live</Pill>
                    <div className="mt-1 font-display text-lg font-bold">{m.homeScore} - {m.awayScore}</div>
                  </div>
                ) : (
                  <span className="font-display text-xs font-bold text-muted-foreground">VS</span>
                )}
                <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
                  <span className="truncate text-sm font-semibold">{m.away}</span>
                  <Avatar initials={m.away.slice(0, 2).toUpperCase()} tone="accent" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tournaments */}
      <section>
        <SectionTitle title="Upcoming cups" action={<Link to="/tournaments" className="text-xs font-semibold text-primary">All →</Link>} />
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 scrollbar-hide">
          {tournaments.slice(0, 3).map((t) => (
            <Link key={t.id} to="/tournaments" className="w-64 shrink-0 overflow-hidden rounded-2xl border border-border bg-surface">
              <div className="gradient-hero p-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{t.logo}</span>
                  <Pill tone={t.status === "Live" ? "destructive" : "primary"}>{t.status}</Pill>
                </div>
                <div className="mt-2 font-display text-base font-bold text-white">{t.name}</div>
                <div className="text-[11px] text-white/70">{t.format} · {t.teams} teams</div>
              </div>
              <div className="flex items-center justify-between p-3">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Prize</div>
                  <div className="text-sm font-bold">{t.prize}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-primary" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Leaderboards */}
      <section className="grid gap-3">
        <SectionTitle title="Top scorers · this month" action={<Link to="/profile" className="text-xs font-semibold text-primary">Rankings →</Link>} />
        <div className="overflow-hidden rounded-2xl border border-border bg-surface">
          {playerLeaderboard.slice(0, 5).map((p, i) => (
            <div key={p.rank} className={"flex items-center gap-3 p-3 " + (i > 0 ? "border-t border-border" : "")}>
              <span className={"grid h-7 w-7 place-items-center rounded-full font-display text-xs font-bold " + (p.rank === 1 ? "gradient-primary text-primary-foreground" : "bg-muted text-foreground")}>
                {p.rank}
              </span>
              <Avatar initials={p.avatar} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">{p.name}</div>
                <div className="truncate text-[11px] text-muted-foreground">{p.team}</div>
              </div>
              <div className="text-right">
                <div className="font-display text-sm font-bold">{p.goals}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">goals</div>
              </div>
            </div>
          ))}
        </div>

        <SectionTitle title="Team standings" />
        <div className="grid grid-cols-3 gap-2">
          {teamLeaderboard.slice(0, 3).map((t) => (
            <div key={t.rank} className="rounded-2xl border border-border bg-surface p-3 text-center">
              <div className="text-3xl">{t.logo}</div>
              <div className="mt-1 truncate text-xs font-bold">{t.name}</div>
              <div className="mt-1 font-display text-lg font-bold text-primary">{t.points}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">pts</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
