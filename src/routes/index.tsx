import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, MapPin, Star, Clock, Sparkles, Flame, ChevronRight, Tag } from "lucide-react";
import { facilities, pitchOptions, upcomingTournaments, myBookings, currentUser } from "@/lib/mock-data";
import { Pill } from "@/components/ui-bits";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Find a pitch · Strikr" }, { name: "description", content: "Discover and book sports facilities near you." }] }),
  component: HomePage,
});

const QUICK = ["All", ...pitchOptions.map((p) => p.label)];

function HomePage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const continueBooking = myBookings.find((b) => b.status === "Upcoming");

  const filtered = facilities.filter((f) => {
    if (filter !== "All" && !f.pitchTypes.includes(filter)) return false;
    if (query && !f.name.toLowerCase().includes(query.toLowerCase()) && !f.area.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const popular = facilities.filter((f) => f.popular);
  const availableNow = facilities.filter((f) => f.openNow).slice(0, 4);
  const deals = facilities.filter((f) => f.weekendDeal);

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div>
        <div className="text-xs text-muted-foreground">Hey {currentUser.name.split(" ")[0]} 👋</div>
        <h1 className="mt-0.5 font-display text-2xl font-bold leading-tight">Find a pitch near you</h1>
      </div>

      {/* Hero search */}
      <Link
        to="/explore"
        className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-3 shadow-sm transition-colors hover:border-primary/50"
      >
        <span className="grid h-9 w-9 place-items-center rounded-xl gradient-primary text-primary-foreground shadow-glow">
          <Search className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <input
            placeholder="Search facilities, areas, sports…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onClick={(e) => e.preventDefault()}
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
          <MapPin className="h-3 w-3" /> Dubai
        </span>
      </Link>

      {/* Quick sport filters */}
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 scrollbar-hide">
        {QUICK.map((q) => (
          <button
            key={q}
            onClick={() => setFilter(q)}
            className={
              "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors " +
              (filter === q ? "border-primary bg-primary/10 text-primary" : "border-border bg-surface text-muted-foreground")
            }
          >
            {q}
          </button>
        ))}
      </div>

      {/* Continue booking */}
      {continueBooking && (
        <Link
          to="/facility/$id"
          params={{ id: continueBooking.facilityId }}
          className="block rounded-3xl border border-primary/30 bg-primary/5 p-4 shadow-glow"
        >
          <div className="flex items-center justify-between">
            <Pill tone="primary">Continue booking</Pill>
            <ChevronRight className="h-4 w-4 text-primary" />
          </div>
          <div className="mt-2 font-display text-base font-bold">{continueBooking.facility}</div>
          <div className="text-xs text-muted-foreground">{continueBooking.pitch} · {continueBooking.date}</div>
        </Link>
      )}

      {/* Nearby facilities */}
      <Section title="Nearby facilities" to="/explore">
        <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 scrollbar-hide">
          {filtered.slice(0, 6).map((f) => (
            <FacilityCard key={f.id} f={f} />
          ))}
        </div>
      </Section>

      {/* Available now */}
      <Section
        title="Available now"
        icon={<Flame className="h-3.5 w-3.5 text-warning" />}
        to="/explore"
      >
        <div className="grid gap-2">
          {availableNow.map((f) => (
            <FacilityRow key={f.id} f={f} />
          ))}
        </div>
      </Section>

      {/* Weekend deals */}
      {deals.length > 0 && (
        <Section title="Weekend deals" icon={<Tag className="h-3.5 w-3.5 text-success" />}>
          <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 scrollbar-hide">
            {deals.map((f) => (
              <FacilityCard key={f.id} f={f} showDeal />
            ))}
          </div>
        </Section>
      )}

      {/* Popular */}
      <Section title="Popular facilities" icon={<Sparkles className="h-3.5 w-3.5 text-primary" />}>
        <div className="grid gap-2">
          {popular.map((f) => (
            <FacilityRow key={f.id} f={f} />
          ))}
        </div>
      </Section>

      {/* Tournaments */}
      <Section title="Upcoming tournaments" to="/community">
        <div className="grid gap-2">
          {upcomingTournaments.slice(0, 2).map((t) => (
            <div key={t.id} className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-muted text-xl">{t.logo}</span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">{t.name}</div>
                <div className="text-[11px] text-muted-foreground">{t.format} · {t.teams} teams · starts {t.starts}</div>
              </div>
              <Pill tone="primary">{t.prize}</Pill>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Section({ title, icon, to, children }: { title: string; icon?: React.ReactNode; to?: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="mb-3 flex items-end justify-between gap-3">
        <h2 className="inline-flex items-center gap-1.5 font-display text-base font-bold uppercase tracking-wider">
          {icon} {title}
        </h2>
        {to && (
          <Link to={to} className="inline-flex items-center gap-0.5 text-xs font-semibold text-primary">
            See all <ChevronRight className="h-3 w-3" />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

export function FacilityCard({ f, showDeal }: { f: typeof facilities[number]; showDeal?: boolean }) {
  return (
    <Link
      to="/facility/$id"
      params={{ id: f.id }}
      className="group block w-[260px] shrink-0 overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all hover:border-primary/50"
    >
      <div className={`relative grid h-32 place-items-center bg-gradient-to-br ${f.gradient} text-5xl`}>
        <span>{f.cover}</span>
        <span className="absolute left-2 top-2">
          <Pill tone={f.openNow ? "success" : "default"}>{f.openNow ? "Open now" : "Closed"}</Pill>
        </span>
        {showDeal && f.weekendDeal && (
          <span className="absolute right-2 top-2 rounded-full bg-success px-2 py-0.5 text-[10px] font-bold text-success-foreground">
            -{f.weekendDeal}%
          </span>
        )}
      </div>
      <div className="space-y-1 p-3">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0 truncate text-sm font-semibold">{f.name}</div>
          <span className="inline-flex shrink-0 items-center gap-0.5 text-xs font-bold">
            <Star className="h-3 w-3 fill-warning text-warning" /> {f.rating}
          </span>
        </div>
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-0.5"><MapPin className="h-3 w-3" /> {f.distanceKm} km</span>
          <span className="font-display text-sm font-bold text-primary">AED {f.priceFrom}<span className="text-[10px] text-muted-foreground">/hr</span></span>
        </div>
      </div>
    </Link>
  );
}

export function FacilityRow({ f }: { f: typeof facilities[number] }) {
  return (
    <Link
      to="/facility/$id"
      params={{ id: f.id }}
      className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-3 transition-colors hover:border-primary/50"
    >
      <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${f.gradient} text-2xl`}>{f.cover}</span>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold">{f.name}</div>
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-0.5"><Star className="h-3 w-3 fill-warning text-warning" /> {f.rating}</span>
          <span>·</span>
          <span>{f.distanceKm} km</span>
          <span>·</span>
          <span className="inline-flex items-center gap-0.5"><Clock className="h-3 w-3" /> {f.openNow ? "Open" : "Closed"}</span>
        </div>
      </div>
      <div className="text-right">
        <div className="font-display text-sm font-bold text-primary">AED {f.priceFrom}</div>
        <div className="text-[10px] text-muted-foreground">/hour</div>
      </div>
    </Link>
  );
}
