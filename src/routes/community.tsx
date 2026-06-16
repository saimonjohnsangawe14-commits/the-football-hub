import { createFileRoute } from "@tanstack/react-router";
import { Trophy, Users, Video } from "lucide-react";
import { upcomingTournaments, teamsLeaderboard } from "@/lib/mock-data";
import { PageHeader, Pill } from "@/components/ui-bits";

export const Route = createFileRoute("/community")({
  head: () => ({ meta: [{ title: "Community · Strikr" }] }),
  component: CommunityPage,
});

function CommunityPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Community" subtitle="Tournaments, teams & match highlights" />

      <section>
        <h2 className="mb-3 inline-flex items-center gap-1.5 font-display text-base font-bold uppercase tracking-wider">
          <Trophy className="h-3.5 w-3.5 text-warning" /> Tournaments
        </h2>
        <div className="grid gap-2">
          {upcomingTournaments.map((t) => (
            <div key={t.id} className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-3">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-muted text-2xl">{t.logo}</span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">{t.name}</div>
                <div className="text-[11px] text-muted-foreground">{t.format} · {t.teams} teams · {t.starts}</div>
              </div>
              <Pill tone="primary">{t.prize}</Pill>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 inline-flex items-center gap-1.5 font-display text-base font-bold uppercase tracking-wider">
          <Users className="h-3.5 w-3.5 text-primary" /> Team leaderboard
        </h2>
        <div className="overflow-hidden rounded-2xl border border-border bg-surface">
          {teamsLeaderboard.map((t, i) => (
            <div key={t.rank} className={"flex items-center gap-3 p-3 " + (i > 0 ? "border-t border-border" : "")}>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-muted font-display text-xs font-bold">{t.rank}</span>
              <span className="text-xl">{t.logo}</span>
              <div className="min-w-0 flex-1 truncate text-sm font-semibold">{t.name}</div>
              <div className="font-display text-sm font-bold text-primary">{t.points} pts</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 inline-flex items-center gap-1.5 font-display text-base font-bold uppercase tracking-wider">
          <Video className="h-3.5 w-3.5 text-accent" /> Recent highlights
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {["⚽", "🥅", "🏃", "🎯"].map((e, i) => (
            <div key={i} className="aspect-video grid place-items-center rounded-2xl border border-border bg-gradient-to-br from-emerald-900/40 to-slate-900 text-3xl">
              {e}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
