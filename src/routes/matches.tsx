import { createFileRoute } from "@tanstack/react-router";
import { Video, Download, Share2, Play, Sparkles } from "lucide-react";
import { recordings } from "@/lib/mock-data";
import { PageHeader, SectionTitle, Pill } from "@/components/ui-bits";

export const Route = createFileRoute("/matches")({
  head: () => ({ meta: [{ title: "Match Recording · Strikr" }, { name: "description", content: "Request videographers and download highlight packages." }] }),
  component: MatchesPage,
});

function MatchesPage() {
  return (
    <div className="space-y-5">
      <PageHeader title="Match recording" subtitle="Cinematic highlights from every match" back="/" />

      {/* Request CTA */}
      <section className="relative overflow-hidden rounded-3xl gradient-hero p-5 text-white shadow-elevated">
        <div className="absolute inset-0 gradient-mesh opacity-70" />
        <div className="relative">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur">
            <Sparkles className="h-3 w-3" /> New
          </div>
          <h2 className="mt-2 font-display text-xl font-bold leading-tight">Book a videographer for your next match</h2>
          <p className="mt-1 text-xs text-white/70">Multi-cam, drone & AI-generated highlight reels — delivered within 24 hrs.</p>
          <div className="mt-3 flex gap-2">
            <button className="rounded-full gradient-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-glow">
              Request shoot
            </button>
            <button className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold backdrop-blur">
              See packages
            </button>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="grid grid-cols-3 gap-2">
        {[
          { name: "Clips", price: 199, desc: "5 short clips" },
          { name: "Highlight", price: 449, desc: "3-min reel", featured: true },
          { name: "Full match", price: 899, desc: "Multi-cam edit" },
        ].map((p) => (
          <div
            key={p.name}
            className={
              "rounded-2xl border p-3 text-center " +
              (p.featured ? "border-primary bg-primary/10 shadow-glow" : "border-border bg-surface")
            }
          >
            <div className="font-display text-sm font-bold">{p.name}</div>
            <div className="mt-1 text-[10px] text-muted-foreground">{p.desc}</div>
            <div className="mt-2 font-display text-lg font-bold text-primary">{p.price}</div>
            <div className="text-[10px] text-muted-foreground">AED</div>
          </div>
        ))}
      </section>

      {/* Recordings */}
      <section>
        <SectionTitle title="Your recordings" />
        <div className="space-y-2">
          {recordings.map((r) => (
            <div key={r.id} className="overflow-hidden rounded-2xl border border-border bg-surface">
              <div className="relative grid h-32 place-items-center gradient-hero text-5xl">
                {r.thumb}
                {r.status === "ready" && (
                  <button className="absolute grid h-12 w-12 place-items-center rounded-full gradient-primary text-primary-foreground shadow-glow">
                    <Play className="h-5 w-5 fill-current" />
                  </button>
                )}
                <span className="absolute right-2 top-2">
                  <Pill tone={r.status === "ready" ? "primary" : "warning"}>{r.status === "ready" ? r.duration : "Processing"}</Pill>
                </span>
              </div>
              <div className="flex items-center gap-2 p-3">
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{r.match}</div>
                  <div className="text-[11px] text-muted-foreground">{r.date} · {r.views} views</div>
                </div>
                <button className="grid h-9 w-9 place-items-center rounded-full bg-muted text-muted-foreground"><Download className="h-4 w-4" /></button>
                <button className="grid h-9 w-9 place-items-center rounded-full bg-muted text-muted-foreground"><Share2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
