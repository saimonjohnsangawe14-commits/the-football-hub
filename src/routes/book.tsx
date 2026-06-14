import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, QrCode, Clock, MapPin, CreditCard } from "lucide-react";
import { pitchSlots, bookingHistory } from "@/lib/mock-data";
import { PageHeader, SectionTitle, Pill } from "@/components/ui-bits";

export const Route = createFileRoute("/book")({
  head: () => ({ meta: [{ title: "Book a pitch · Strikr" }, { name: "description", content: "Reserve a football pitch in seconds." }] }),
  component: BookPage,
});

const days = ["Mon 10", "Tue 11", "Wed 12", "Thu 13", "Fri 14", "Sat 15", "Sun 16"];
const pitchFilters = ["All", "5-a-side", "7-a-side", "11-a-side"];

function BookPage() {
  const [day, setDay] = useState(2);
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<string | null>(null);

  const slots = pitchSlots.filter((s) => filter === "All" || s.pitch.includes(filter));
  const slot = pitchSlots.find((s) => s.id === selected);

  return (
    <div className="space-y-5">
      <PageHeader title="Book a pitch" subtitle="Real-time availability · instant confirmation" />

      {/* Day selector */}
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 scrollbar-hide">
        {days.map((d, i) => (
          <button
            key={d}
            onClick={() => setDay(i)}
            className={
              "min-w-[64px] shrink-0 rounded-2xl border px-3 py-2 text-center transition-all " +
              (i === day ? "gradient-primary border-transparent text-primary-foreground shadow-glow" : "border-border bg-surface text-foreground")
            }
          >
            <div className="text-[10px] font-semibold uppercase">{d.split(" ")[0]}</div>
            <div className="font-display text-base font-bold">{d.split(" ")[1]}</div>
          </button>
        ))}
      </div>

      {/* Pitch filter */}
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 scrollbar-hide">
        {pitchFilters.map((p) => (
          <button
            key={p}
            onClick={() => setFilter(p)}
            className={
              "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors " +
              (filter === p ? "border-primary bg-primary/10 text-primary" : "border-border bg-surface text-muted-foreground")
            }
          >
            {p}
          </button>
        ))}
      </div>

      {/* Slots grid */}
      <div className="grid grid-cols-2 gap-2">
        {slots.map((s) => {
          const sel = selected === s.id;
          return (
            <button
              key={s.id}
              disabled={!s.available}
              onClick={() => setSelected(s.id)}
              className={
                "rounded-2xl border p-3 text-left transition-all disabled:opacity-50 " +
                (sel ? "border-primary bg-primary/10 shadow-glow" : "border-border bg-surface hover:border-primary/40")
              }
            >
              <div className="flex items-center justify-between">
                <Pill tone={s.available ? "success" : "destructive"}>{s.available ? "Open" : "Taken"}</Pill>
                {sel && <Check className="h-4 w-4 text-primary" />}
              </div>
              <div className="mt-2 font-display text-xl font-bold">{s.time}</div>
              <div className="truncate text-xs text-muted-foreground">{s.pitch}</div>
              <div className="mt-2 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Clock className="h-3 w-3" /> {s.duration}m
                </span>
                <span className="font-display text-sm font-bold text-primary">AED {s.price}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Checkout */}
      {slot && (
        <div className="rounded-3xl border border-primary/30 bg-primary/5 p-4 shadow-glow">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-primary">Your booking</div>
          <div className="mt-1 font-display text-lg font-bold">{slot.pitch}</div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {slot.time} · {slot.duration}m</span>
            <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> Strikr Arena</span>
          </div>
          <div className="my-3 h-px bg-border" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total</span>
            <span className="font-display text-xl font-bold">AED {slot.price}</span>
          </div>
          <button className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full gradient-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-glow">
            <CreditCard className="h-4 w-4" />
            Pay & confirm
          </button>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">QR-code confirmation sent instantly</p>
        </div>
      )}

      {/* History */}
      <section>
        <SectionTitle title="Your bookings" />
        <div className="space-y-2">
          {bookingHistory.map((b) => (
            <div key={b.id} className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-muted text-muted-foreground">
                <QrCode className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">{b.pitch}</div>
                <div className="text-[11px] text-muted-foreground">{b.date} · {b.qr}</div>
              </div>
              <div className="text-right">
                <Pill tone={b.status === "Upcoming" ? "primary" : "default"}>{b.status}</Pill>
                <div className="mt-1 text-xs font-bold">AED {b.price}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
