import { createFileRoute, Link } from "@tanstack/react-router";
import { Share2, Settings, Trophy, Target, Zap, Activity } from "lucide-react";
import { toast } from "sonner";
import { currentUser, playerStats, badges, playerLeaderboard } from "@/lib/mock-data";
import { PageHeader, SectionTitle, Avatar, Pill, Stat } from "@/components/ui-bits";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile · Strikr" }, { name: "description", content: "Track goals, assists, MVPs and badges." }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const shareData = { title: `${currentUser.name} on Strikr`, text: `Check out my Strikr profile — Lvl ${currentUser.level} · Rating ${currentUser.rating}`, url };
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share(shareData);
      } else if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        toast.success("Profile link copied");
      }
    } catch {
      /* user dismissed */
    }
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Player profile"
        action={
          <div className="flex gap-1">
            <button onClick={handleShare} aria-label="Share profile" className="grid h-9 w-9 place-items-center rounded-full bg-muted text-muted-foreground hover:text-foreground"><Share2 className="h-4 w-4" /></button>
            <button onClick={() => toast.info("Settings coming soon", { description: "Account, preferences, and privacy controls." })} aria-label="Settings" className="grid h-9 w-9 place-items-center rounded-full bg-muted text-muted-foreground hover:text-foreground"><Settings className="h-4 w-4" /></button>
          </div>
        }
      />

      {/* Hero card */}
      <section className="relative overflow-hidden rounded-3xl gradient-hero p-5 text-white shadow-elevated">
        <div className="absolute inset-0 gradient-mesh opacity-70" />
        <div className="relative flex items-center gap-4">
          <div className="relative">
            <Avatar initials={currentUser.avatar} size={72} tone="primary" />
            <span className="absolute -bottom-1 -right-1 rounded-full bg-background px-2 py-0.5 font-display text-[10px] font-bold text-foreground shadow">
              LVL {currentUser.level}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-display text-2xl font-bold leading-tight">{currentUser.name}</div>
            <div className="text-xs text-white/70">{currentUser.handle} · {currentUser.team}</div>
            <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-2.5 py-1 backdrop-blur">
              <span className="font-display text-xs font-bold text-primary">{currentUser.position}</span>
              <span className="h-3 w-px bg-white/20" />
              <span className="font-mono text-xs font-bold">{currentUser.rating}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Career stats */}
      <section className="grid grid-cols-2 gap-2">
        <Stat label="Matches" value={playerStats.matches} accent />
        <Stat label="Goals" value={playerStats.goals} accent />
        <Stat label="Assists" value={playerStats.assists} />
        <Stat label="MVPs" value={playerStats.mvp} />
      </section>

      {/* Skill bars */}
      <section className="rounded-2xl border border-border bg-surface p-4">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Performance</div>
        <div className="mt-3 space-y-3">
          {[
            { label: "Pass accuracy", value: playerStats.passAccuracy, icon: Target },
            { label: "Shot accuracy", value: playerStats.shotAccuracy, icon: Zap },
            { label: "Stamina", value: 78, icon: Activity },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label}>
                <div className="flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1.5 font-semibold"><Icon className="h-3 w-3 text-primary" /> {s.label}</span>
                  <span className="font-mono font-bold">{s.value}%</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full gradient-primary" style={{ width: `${s.value}%` }} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Last 5</div>
          <div className="mt-2 flex gap-1.5">
            {playerStats.formLast5.map((r, i) => (
              <span
                key={i}
                className={
                  "grid h-8 w-8 place-items-center rounded-lg font-display text-xs font-bold " +
                  (r === "W" ? "bg-success/20 text-success" : r === "D" ? "bg-warning/20 text-warning" : "bg-destructive/20 text-destructive")
                }
              >
                {r}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Badges */}
      <section>
        <SectionTitle title="Achievements" />
        <div className="grid grid-cols-3 gap-2">
          {badges.map((b) => (
            <div
              key={b.id}
              className={
                "rounded-2xl border p-3 text-center transition-all " +
                (b.unlocked ? "border-primary/30 bg-primary/5" : "border-border bg-surface opacity-50")
              }
            >
              <div className="text-3xl">{b.icon}</div>
              <div className="mt-1 truncate font-display text-xs font-bold">{b.name}</div>
              <div className="mt-0.5 truncate text-[10px] text-muted-foreground">{b.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Rankings */}
      <section>
        <SectionTitle title="Global rankings" action={<span className="text-xs font-semibold text-primary">Top 0.5%</span>} />
        <div className="overflow-hidden rounded-2xl border border-border bg-surface">
          {playerLeaderboard.map((p, i) => (
            <div key={p.rank} className={"flex items-center gap-3 p-3 " + (i > 0 ? "border-t border-border" : "") + (p.name === currentUser.name ? " bg-primary/5" : "")}>
              <span className="grid h-7 w-7 place-items-center rounded-full bg-muted font-display text-xs font-bold">{p.rank}</span>
              <Avatar initials={p.avatar} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">{p.name}</div>
                <div className="truncate text-[11px] text-muted-foreground">{p.team}</div>
              </div>
              <span className="font-mono text-xs font-bold">{p.rating}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
