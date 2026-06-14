import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, Calendar, MessageCircle, CheckCircle2 } from "lucide-react";
import { academyPrograms, childProfile } from "@/lib/mock-data";
import { PageHeader, SectionTitle, Pill, Avatar, Stat } from "@/components/ui-bits";

export const Route = createFileRoute("/academy")({
  head: () => ({ meta: [{ title: "Football Academy · Strikr" }, { name: "description", content: "Youth football programs and training." }] }),
  component: AcademyPage,
});

function AcademyPage() {
  return (
    <div className="space-y-5">
      <PageHeader title="Football Academy" subtitle="Develop the next generation" back="/" />

      {/* Child profile */}
      <section className="overflow-hidden rounded-3xl border border-border bg-surface shadow-card">
        <div className="gradient-hero p-4 text-white">
          <div className="text-[10px] uppercase tracking-wider text-white/60">Your child</div>
          <div className="mt-1 flex items-center gap-3">
            <Avatar initials="AH" size={48} tone="primary" />
            <div className="min-w-0 flex-1">
              <div className="font-display text-lg font-bold">{childProfile.name}</div>
              <div className="text-[11px] text-white/70">Age {childProfile.age} · {childProfile.program}</div>
            </div>
            <button className="rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-semibold backdrop-blur">Add child</button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 p-3">
          <Stat label="Attendance" value={`${childProfile.attendance}%`} accent />
          <Stat label="Next session" value={childProfile.nextSession.split(" · ")[0]} hint={childProfile.nextSession.split(" · ")[1]} />
          <Stat label="Term" value="3/4" hint="Spring season" />
        </div>
      </section>

      {/* Coach note */}
      <section className="rounded-2xl border border-accent/30 bg-accent/5 p-4">
        <div className="flex items-start gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent/20 text-accent">
            <MessageCircle className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-accent">Note from Coach Marcus</div>
            <p className="mt-1 text-sm text-foreground">{childProfile.recentNote}</p>
            <button className="mt-2 text-xs font-semibold text-accent">Reply →</button>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section>
        <SectionTitle title="Programs" action={<span className="text-xs font-semibold text-primary">Spring 2026</span>} />
        <div className="space-y-2">
          {academyPrograms.map((p) => (
            <div key={p.id} className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-3">
              <span className={"grid h-12 w-12 shrink-0 place-items-center rounded-xl " + (p.color === "primary" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent")}>
                <GraduationCap className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">{p.name}</div>
                <div className="truncate text-[11px] text-muted-foreground">{p.schedule} · {p.coach}</div>
                <div className="mt-1">
                  <Pill tone={p.spots === 0 ? "destructive" : p.spots <= 2 ? "warning" : "success"}>
                    {p.spots === 0 ? "Waitlist" : `${p.spots} spots`}
                  </Pill>
                </div>
              </div>
              <div className="text-right">
                <div className="font-display text-base font-bold">{p.price}</div>
                <div className="text-[10px] text-muted-foreground">AED / mo</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Schedule */}
      <section>
        <SectionTitle title="This week" />
        <div className="overflow-hidden rounded-2xl border border-border bg-surface">
          {[
            { day: "Mon", date: "Jun 10", session: "U12 Eagles · Tactics", time: "17:00", attended: true },
            { day: "Tue", date: "Jun 11", session: "—", time: "Rest day", attended: false, rest: true },
            { day: "Wed", date: "Jun 12", session: "U12 Eagles · Conditioning", time: "17:00", attended: true },
            { day: "Thu", date: "Jun 13", session: "U12 Eagles · Match prep", time: "17:00", attended: false, upcoming: true },
            { day: "Fri", date: "Jun 14", session: "Match day vs Falcon", time: "18:30", attended: false, upcoming: true },
          ].map((s, i) => (
            <div key={i} className={"flex items-center gap-3 p-3 " + (i > 0 ? "border-t border-border" : "")}>
              <div className="w-10 text-center">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{s.day}</div>
                <div className="font-display text-sm font-bold">{s.date.split(" ")[1]}</div>
              </div>
              <div className="min-w-0 flex-1">
                <div className={"truncate text-sm font-semibold " + (s.rest ? "text-muted-foreground" : "")}>{s.session}</div>
                <div className="text-[11px] text-muted-foreground">{s.time}</div>
              </div>
              {s.attended && <CheckCircle2 className="h-4 w-4 text-success" />}
              {s.upcoming && <Pill tone="primary">Upcoming</Pill>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
