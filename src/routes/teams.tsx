import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Crown, Trophy, TrendingUp, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { myTeam, teamLeaderboard } from "@/lib/mock-data";
import { PageHeader, SectionTitle, Avatar, Pill, Stat } from "@/components/ui-bits";

export const Route = createFileRoute("/teams")({
  head: () => ({ meta: [{ title: "Teams · Strikr" }, { name: "description", content: "Create teams, invite players, climb the rankings." }] }),
  component: TeamsPage,
});

function TeamsPage() {
  const totalGames = myTeam.record.won + myTeam.record.drawn + myTeam.record.lost;
  const winPct = Math.round((myTeam.record.won / totalGames) * 100);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Teams"
        subtitle="Your squad, your rivals, your rankings"
        action={
          <button
            onClick={() => toast.success("Team created", { description: "Set up your roster in the new team." })}
            className="inline-flex items-center gap-1 rounded-full gradient-primary px-3 py-2 text-xs font-semibold text-primary-foreground shadow-glow"
          >
            <Plus className="h-3.5 w-3.5" /> New
          </button>
        }
      />

      {/* My team hero */}
      <section className="overflow-hidden rounded-3xl border border-border bg-surface shadow-card">
        <div className="gradient-hero p-5 text-white">
          <div className="flex items-center gap-3">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/15 text-3xl backdrop-blur">
              {myTeam.logo}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-display text-xl font-bold">{myTeam.name}</span>
                <Crown className="h-4 w-4 text-primary" />
              </div>
              <div className="text-[11px] text-white/70">Captain · {myTeam.captain} · est. {myTeam.founded}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-wider text-white/60">Rank</div>
              <div className="font-display text-2xl font-bold">#{myTeam.rank}</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 p-3">
          <Stat label="Won" value={myTeam.record.won} accent />
          <Stat label="Drawn" value={myTeam.record.drawn} />
          <Stat label="Lost" value={myTeam.record.lost} />
          <Stat label="Win %" value={`${winPct}%`} />
        </div>
      </section>

      {/* Roster */}
      <section>
        <SectionTitle
          title="Squad"
          action={
            <button
              onClick={() => toast.success("Invite link copied", { description: "Share it with your player to join the squad." })}
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary"
            >
              <UserPlus className="h-3.5 w-3.5" /> Invite
            </button>
          }
        />
        <div className="overflow-hidden rounded-2xl border border-border bg-surface">
          {myTeam.players.map((p, i) => (
            <div key={p.name} className={"flex items-center gap-3 p-3 " + (i > 0 ? "border-t border-border" : "")}>
              <Avatar initials={p.avatar} tone={i === 0 ? "primary" : "muted"} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">{p.name}</div>
                <div className="truncate text-[11px] text-muted-foreground">{p.role}</div>
              </div>
              <span className="rounded-lg bg-muted px-2 py-1 font-mono text-xs font-bold">{p.rating}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Standings */}
      <section>
        <SectionTitle title="League table" />
        <div className="overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="grid grid-cols-[24px_1fr_32px_32px_32px_40px] gap-2 border-b border-border bg-muted/40 p-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            <span>#</span><span>Team</span><span className="text-center">W</span><span className="text-center">D</span><span className="text-center">L</span><span className="text-right">Pts</span>
          </div>
          {teamLeaderboard.map((t) => (
            <div key={t.rank} className={"grid grid-cols-[24px_1fr_32px_32px_32px_40px] gap-2 border-b border-border p-3 text-sm last:border-0 " + (t.name === myTeam.name ? "bg-primary/5" : "")}>
              <span className="font-display font-bold text-muted-foreground">{t.rank}</span>
              <span className="flex min-w-0 items-center gap-2">
                <span className="text-base">{t.logo}</span>
                <span className="truncate font-semibold">{t.name}</span>
              </span>
              <span className="text-center text-muted-foreground">{t.won}</span>
              <span className="text-center text-muted-foreground">{t.drawn}</span>
              <span className="text-center text-muted-foreground">{t.lost}</span>
              <span className="text-right font-display font-bold text-primary">{t.points}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
