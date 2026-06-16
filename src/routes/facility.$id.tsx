import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Star, MapPin, Clock, Phone, Shield, ChevronLeft, Share2, Heart } from "lucide-react";
import { facilityById, amenityLabels, pitchesFor, reviews, generateSlots } from "@/lib/mock-data";
import { Pill } from "@/components/ui-bits";
import { toast } from "sonner";

export const Route = createFileRoute("/facility/$id")({
  head: ({ params }) => {
    const f = facilityById(params.id);
    return { meta: [{ title: `${f?.name ?? "Facility"} · Strikr` }] };
  },
  loader: ({ params }) => {
    const f = facilityById(params.id);
    if (!f) throw notFound();
    return { f };
  },
  notFoundComponent: () => (
    <div className="py-20 text-center text-sm text-muted-foreground">Facility not found.</div>
  ),
  errorComponent: ({ error }) => (
    <div className="py-20 text-center text-sm text-muted-foreground">Couldn't load: {error.message}</div>
  ),
  component: FacilityPage,
});

function FacilityPage() {
  const { f } = Route.useLoaderData();
  const pitches = pitchesFor(f.id);
  const slots = generateSlots(f.priceFrom);
  const facilityReviews = reviews.filter((r) => r.facilityId === f.id);

  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ title: f.name, text: `Book a pitch at ${f.name}`, url: window.location.href });
      else { await navigator.clipboard.writeText(window.location.href); toast.success("Link copied"); }
    } catch { /* user cancelled */ }
  };

  return (
    <div className="-mx-4 -mt-4 space-y-5 pb-24">
      {/* Gallery hero */}
      <div className={`relative grid h-72 place-items-center bg-gradient-to-br ${f.gradient} text-7xl`}>
        <span>{f.cover}</span>
        <div className="absolute inset-x-3 top-3 flex items-center justify-between">
          <Link to="/explore" className="grid h-10 w-10 place-items-center rounded-full bg-background/80 text-foreground backdrop-blur">
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <div className="flex gap-2">
            <button onClick={() => toast.success("Saved to favorites")} className="grid h-10 w-10 place-items-center rounded-full bg-background/80 backdrop-blur">
              <Heart className="h-4 w-4" />
            </button>
            <button onClick={share} className="grid h-10 w-10 place-items-center rounded-full bg-background/80 backdrop-blur">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="absolute bottom-3 left-3 flex gap-1.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} className={"h-1.5 rounded-full transition-all " + (i === 1 ? "w-6 bg-white" : "w-3 bg-white/40")} />
          ))}
        </div>
      </div>

      <div className="space-y-5 px-4">
        {/* Title */}
        <div>
          <div className="flex items-center gap-2">
            <Pill tone={f.openNow ? "success" : "destructive"}>{f.openNow ? "Open now" : "Closed"}</Pill>
            {f.popular && <Pill tone="primary">Popular</Pill>}
            {f.weekendDeal && <Pill tone="warning">-{f.weekendDeal}% weekends</Pill>}
          </div>
          <h1 className="mt-2 font-display text-2xl font-bold leading-tight">{f.name}</h1>
          <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Star className="h-3 w-3 fill-warning text-warning" /> <b className="text-foreground">{f.rating}</b> ({f.reviews})</span>
            <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {f.area} · {f.distanceKm} km</span>
          </div>
        </div>

        {/* Pitches */}
        <Section title="Pitches">
          <div className="grid grid-cols-3 gap-2">
            {pitches.map((p) => (
              <div key={p.id} className="rounded-2xl border border-border bg-surface p-3 text-center">
                <div className="font-display text-sm font-bold">{p.name}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{p.type}</div>
                <div className="mt-1 text-[10px] text-muted-foreground">{p.surface} · {p.capacity} cap</div>
              </div>
            ))}
          </div>
        </Section>

        {/* Amenities */}
        <Section title="Amenities">
          <div className="flex flex-wrap gap-2">
            {f.amenities.map((a) => (
              <span key={a} className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground">
                {amenityLabels[a] ?? a}
              </span>
            ))}
          </div>
        </Section>

        {/* Availability preview */}
        <Section title="Today's availability">
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-hide">
            {slots.map((s) => (
              <div
                key={s.id}
                className={"min-w-[88px] shrink-0 rounded-2xl border p-3 text-center " + (s.available ? "border-border bg-surface" : "border-border bg-muted opacity-50")}
              >
                <div className="font-display text-sm font-bold">{s.time}</div>
                <div className="text-[10px] text-muted-foreground">{s.available ? `AED ${s.price}` : "Booked"}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* Reviews */}
        <Section title={`Reviews · ${f.rating} ★`}>
          <div className="space-y-2">
            {facilityReviews.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-surface p-4 text-center text-xs text-muted-foreground">
                No reviews yet — be the first.
              </div>
            ) : (
              facilityReviews.map((r) => (
                <div key={r.id} className="rounded-2xl border border-border bg-surface p-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold">{r.author}</div>
                    <div className="inline-flex items-center gap-0.5 text-xs font-bold">
                      <Star className="h-3 w-3 fill-warning text-warning" /> {r.rating}
                    </div>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{r.text}</div>
                  <div className="mt-1 text-[10px] text-muted-foreground">{r.date}</div>
                </div>
              ))
            )}
          </div>
        </Section>

        {/* Owner & rules */}
        <Section title="Owner & contact">
          <div className="rounded-2xl border border-border bg-surface p-3">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary"><Shield className="h-4 w-4" /></span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold">Verified operator</div>
                <div className="text-[11px] text-muted-foreground">Strikr Sports LLC · since 2022</div>
              </div>
              <button onClick={() => toast.info("+971 4 123 4567")} className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
                <Phone className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> 06:00 – 02:00 daily</span>
              <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {f.area}, {f.city}</span>
            </div>
          </div>
        </Section>
      </div>

      {/* Sticky Book CTA */}
      <div className="fixed inset-x-0 bottom-16 z-30 mx-auto max-w-2xl px-4">
        <Link
          to="/book/$facilityId"
          params={{ facilityId: f.id }}
          className="flex items-center justify-between rounded-full gradient-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow"
        >
          <span>From AED {f.priceFrom}/hr</span>
          <span className="inline-flex items-center gap-2">Book now</span>
        </Link>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 font-display text-base font-bold uppercase tracking-wider">{title}</h2>
      {children}
    </section>
  );
}
