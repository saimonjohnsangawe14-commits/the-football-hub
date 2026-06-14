import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Trophy, Users, Calendar } from "lucide-react";
import { tournaments, fixtures, teamLeaderboard } from "@/lib/mock-data";
import { PageHeader, SectionTitle, Pill } from "@/components/ui-bits";

export const Route = createFileRoute("/tournaments")({
  head: () => ({ meta: [{ title: "Tournaments · Strikr" }, { name: "description", content: "Compete in cups, leagues and youth championships." }] }),
  component: TournamentsPage,
});

const tabs = ["All", "Live", "Registering", "Completed"];

function TournamentsPage() {
  const [tab, setTab] = useState("All");
  const list = tournaments.filter((t) => tab === "All" || t.status === tab || (tab === "Registering" && t.status === "Open"));

  return (
    <div className="space-y-5">
      <PageHeader title="Tournaments" subtitle="Cups, leagues and championships" />

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 scrollbar-hide">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={
              "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold " +
              (tab === t ? "border-primary bg-primary/10 text-primary" : "border-border bg-surface text-muted-foreground")
            }
          >
            {t}
          </button>
        ))}
      </div>

      <section className="space-y-2">
        {list.map((t) => (
          <div key={t.id} className="overflow-hidden rounded-2xl border border-border bg-surface">
            <div className="gradient-hero p-4 text-white">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 text-2xl backdrop-blur">{t.logo}</span>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-display text-base font-bold">{t.name}</div>
                  <div className="text-[11px] text-white/70">{t.format} · {t.teams} teams · {t.starts}</div>
                </div>
                <Pill tone={t.status === "Live" ? "destructive" : t.status === "Completed" ? "default" : "primary"}>{t.status}</Pill>
              </div>
            </div>
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-1.5 text-xs">
                <Trophy className="h-3.5 w-3.5 text-primary" />
                <span className="font-semibold">{t.prize}</span>
              </div>
              <button className="rounded-full gradient-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-glow">
                {t.status === "Completed" ? "Recap" : "Register"}
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Bracket */}
      <section>
        <SectionTitle title="Bracket · Strikr Summer Cup" />
        <div className="overflow-x-auto rounded-2xl border border-border bg-surface p-4">
          <div className="flex gap-6 text-xs">
            {[
              ["Falcon FC", "Eagles 11", "Desert Wolves", "Velocity 11", "Sandstorm Utd", "Atlas FC", "Coastal Kings", "Tigers FC"],
              ["Falcon FC", "Desert Wolves", "Sandstorm Utd", "Coastal Kings"],
              ["Falcon FC", "Sandstorm Utd"],
              ["Falcon FC"],
            ].map((round, ri) => (
              <div key={ri} className="flex shrink-0 flex-col justify-around gap-2" style={{ minWidth: 110 }}>
                <div className="text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {["R16", "QF", "SF", "Final"][ri]}
                </div>
                {round.map((team, ti) => (
                  <div
                    key={ti}
                    className={
                      "rounded-lg border px-2 py-1.5 font-semibold " +
                      (ri === 3 ? "border-primary bg-primary/10 text-primary" : "border-border bg-background")
                    }
                  >
                    {team}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fixtures */}
      <section>
        <SectionTitle title="Fixtures" />
        <div className="space-y-2">
          {fixtures.map((f, i) => (
            <div key={i} className="rounded-2xl border border-border bg-surface p-3">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span>{f.round}</span>
                <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {f.time}</span>
              </div>
              <div className="mt-2 flex items-center justify-between gap-2 text-sm font-semibold">
                <span className="truncate flex-1">{f.home}</span>
                <span className="font-mono text-muted-foreground">vs</span>
                <span className="truncate flex-1 text-right">{f.away}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Standings */}
      <section>
        <SectionTitle title="Group A standings" />
        <div className="overflow-hidden rounded-2xl border border-border bg-surface">
          {teamLeaderboard.slice(0, 4).map((t, i) => (
            <div key={t.rank} className={"flex items-center gap-3 p-3 " + (i > 0 ? "border-t border-border" : "")}>
              <span className="font-display text-sm font-bold text-muted-foreground">{i + 1}</span>
              <span className="text-base">{t.logo}</span>
              <span className="min-w-0 flex-1 truncate text-sm font-semibold">{t.name}</span>
              <span className="font-mono text-xs text-muted-foreground">{t.played}P</span>
              <span className="font-display text-sm font-bold text-primary">{t.points}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
