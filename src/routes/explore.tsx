import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, Map as MapIcon, List, X, Check } from "lucide-react";
import { facilities, amenityLabels, pitchOptions } from "@/lib/mock-data";
import { FacilityRow } from "./index";
import { PageHeader, Pill } from "@/components/ui-bits";

export const Route = createFileRoute("/explore")({
  head: () => ({ meta: [{ title: "Explore facilities · Strikr" }] }),
  component: ExplorePage,
});

const SORTS = ["Nearest", "Most popular", "Highest rated", "Lowest price", "Open now"] as const;
const AMENITIES = Object.keys(amenityLabels).filter((a) => a !== "wifi");

function ExplorePage() {
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"list" | "map">("list");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sort, setSort] = useState<(typeof SORTS)[number]>("Nearest");
  const [pitchType, setPitchType] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState(600);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);

  const results = useMemo(() => {
    let r = facilities.filter((f) => {
      if (query && !`${f.name} ${f.area}`.toLowerCase().includes(query.toLowerCase())) return false;
      if (pitchType && !f.pitchTypes.includes(pitchType)) return false;
      if (f.priceFrom > maxPrice) return false;
      if (f.rating < minRating) return false;
      if (amenities.length && !amenities.every((a) => f.amenities.includes(a))) return false;
      if (sort === "Open now" && !f.openNow) return false;
      return true;
    });
    if (sort === "Nearest") r = [...r].sort((a, b) => a.distanceKm - b.distanceKm);
    if (sort === "Highest rated") r = [...r].sort((a, b) => b.rating - a.rating);
    if (sort === "Lowest price") r = [...r].sort((a, b) => a.priceFrom - b.priceFrom);
    if (sort === "Most popular") r = [...r].sort((a, b) => b.reviews - a.reviews);
    return r;
  }, [query, pitchType, maxPrice, amenities, minRating, sort]);

  const activeCount = (pitchType ? 1 : 0) + amenities.length + (minRating ? 1 : 0) + (maxPrice < 600 ? 1 : 0);

  return (
    <div className="space-y-4">
      <PageHeader title="Explore" subtitle={`${results.length} facilities in Dubai`} />

      {/* Search */}
      <div className="flex items-center gap-2 rounded-2xl border border-border bg-surface p-3">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          placeholder="Search facility or area…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        <button
          onClick={() => setFiltersOpen(true)}
          className="relative inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary"
        >
          <SlidersHorizontal className="h-3 w-3" /> Filters
          {activeCount > 0 && (
            <span className="ml-1 grid h-4 w-4 place-items-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">{activeCount}</span>
          )}
        </button>
      </div>

      {/* Sport chips */}
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 scrollbar-hide">
        {pitchOptions.map((p) => (
          <button
            key={p.id}
            onClick={() => setPitchType(pitchType === p.id ? null : p.id)}
            className={
              "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors " +
              (pitchType === p.id ? "border-primary bg-primary/10 text-primary" : "border-border bg-surface text-muted-foreground")
            }
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Sort + view */}
      <div className="flex items-center justify-between gap-2">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof SORTS[number])}
          className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold"
        >
          {SORTS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <div className="inline-flex rounded-full border border-border bg-surface p-0.5">
          <button
            onClick={() => setView("list")}
            className={"inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold " + (view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground")}
          >
            <List className="h-3 w-3" /> List
          </button>
          <button
            onClick={() => setView("map")}
            className={"inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold " + (view === "map" ? "bg-primary text-primary-foreground" : "text-muted-foreground")}
          >
            <MapIcon className="h-3 w-3" /> Map
          </button>
        </div>
      </div>

      {view === "map" ? (
        <div className="relative h-[360px] overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-emerald-900/40 via-slate-900 to-indigo-900/40">
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: "radial-gradient(circle at 20% 30%, #10b981 0, transparent 40%), radial-gradient(circle at 70% 60%, #6366f1 0, transparent 40%), radial-gradient(circle at 40% 80%, #f59e0b 0, transparent 35%)",
          }} />
          <svg className="absolute inset-0 h-full w-full opacity-20">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          {results.slice(0, 6).map((f, i) => (
            <div
              key={f.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${15 + (i * 14) % 80}%`, top: `${20 + (i * 23) % 60}%` }}
            >
              <div className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold text-primary-foreground shadow-glow">
                AED {f.priceFrom}
              </div>
            </div>
          ))}
          <div className="absolute inset-x-3 bottom-3">
            <div className="rounded-2xl border border-border bg-card/95 p-3 backdrop-blur">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Showing {results.length} on map</div>
              <div className="mt-1 text-xs text-muted-foreground">Tap List to see details · interactive map coming soon</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-2">
          {results.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-surface p-8 text-center text-sm text-muted-foreground">
              No facilities match your filters. Try widening the search.
            </div>
          ) : (
            results.map((f) => <FacilityRow key={f.id} f={f} />)
          )}
        </div>
      )}

      {/* Filters sheet */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm" onClick={() => setFiltersOpen(false)}>
          <div className="absolute inset-x-0 bottom-0 mx-auto max-h-[85vh] max-w-2xl overflow-y-auto rounded-t-3xl border-t border-border bg-card p-5 shadow-elevated" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <div className="font-display text-lg font-bold">Filters</div>
              <button onClick={() => setFiltersOpen(false)} className="grid h-9 w-9 place-items-center rounded-full bg-muted">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Max price per hour</div>
                <input type="range" min={80} max={600} step={20} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-primary" />
                <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
                  <span>AED 80</span><span className="font-bold text-foreground">AED {maxPrice}</span><span>AED 600</span>
                </div>
              </div>

              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Minimum rating</div>
                <div className="flex gap-2">
                  {[0, 4, 4.5, 4.8].map((r) => (
                    <button
                      key={r}
                      onClick={() => setMinRating(r)}
                      className={"rounded-full border px-3 py-1.5 text-xs font-semibold " + (minRating === r ? "border-primary bg-primary/10 text-primary" : "border-border bg-surface text-muted-foreground")}
                    >
                      {r === 0 ? "Any" : `${r}+ ★`}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Amenities</div>
                <div className="grid grid-cols-2 gap-2">
                  {AMENITIES.map((a) => {
                    const on = amenities.includes(a);
                    return (
                      <button
                        key={a}
                        onClick={() => setAmenities((prev) => (on ? prev.filter((x) => x !== a) : [...prev, a]))}
                        className={"flex items-center justify-between rounded-xl border px-3 py-2 text-xs font-semibold " + (on ? "border-primary bg-primary/10 text-primary" : "border-border bg-surface text-muted-foreground")}
                      >
                        {amenityLabels[a]}
                        {on && <Check className="h-3 w-3" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button
                onClick={() => { setPitchType(null); setMaxPrice(600); setAmenities([]); setMinRating(0); }}
                className="flex-1 rounded-full border border-border bg-surface py-3 text-sm font-semibold"
              >
                Reset
              </button>
              <button
                onClick={() => setFiltersOpen(false)}
                className="flex-1 rounded-full gradient-primary py-3 text-sm font-semibold text-primary-foreground shadow-glow"
              >
                Show {results.length} results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// silence unused
void Pill;
