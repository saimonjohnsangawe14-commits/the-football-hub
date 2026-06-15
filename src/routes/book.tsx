import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { addDays, format, isSameDay, startOfDay } from "date-fns";
import { Check, QrCode, Clock, MapPin, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { pitchSlots, bookingHistory } from "@/lib/mock-data";
import { PageHeader, SectionTitle, Pill } from "@/components/ui-bits";

export const Route = createFileRoute("/book")({
  head: () => ({ meta: [{ title: "Book a pitch · Strikr" }, { name: "description", content: "Reserve a football pitch in seconds." }] }),
  component: BookPage,
});

const pitchFilters = ["All", "5-a-side", "7-a-side", "11-a-side"];

function BookPage() {
  const today = useMemo(() => startOfDay(new Date()), []);
  const days = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(today, i)), [today]);
  const [selectedDay, setSelectedDay] = useState<Date>(today);
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<Set<string>>(new Set());

  const slots = pitchSlots.filter((s) => filter === "All" || s.pitch.includes(filter));
  const slot = pitchSlots.find((s) => s.id === selected);

  const handlePay = () => {
    if (!slot) return;
    const qr = `STRK-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    setConfirmed((prev) => new Set(prev).add(slot.id));
    toast.success("Booking confirmed", {
      description: `${slot.pitch} · ${format(selectedDay, "EEE d MMM")} at ${slot.time} · QR ${qr}`,
    });
    setSelected(null);
  };

  return (
    <div className="space-y-5">
      <PageHeader title="Book a pitch" subtitle="Real-time availability · instant confirmation" />

      {/* Day selector */}
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 scrollbar-hide">
        {days.map((d) => {
          const active = isSameDay(d, selectedDay);
          const isToday = isSameDay(d, today);
          return (
            <button
              key={d.toISOString()}
              onClick={() => setSelectedDay(d)}
              className={
                "min-w-[64px] shrink-0 rounded-2xl border px-3 py-2 text-center transition-all " +
                (active ? "gradient-primary border-transparent text-primary-foreground shadow-glow" : "border-border bg-surface text-foreground")
              }
            >
              <div className="text-[10px] font-semibold uppercase">{isToday ? "Today" : format(d, "EEE")}</div>
              <div className="font-display text-base font-bold">{format(d, "d")}</div>
            </button>
          );
        })}
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
          const isBooked = confirmed.has(s.id);
          const open = s.available && !isBooked;
          return (
            <button
              key={s.id}
              disabled={!open}
              onClick={() => setSelected(s.id)}
              className={
                "rounded-2xl border p-3 text-left transition-all disabled:opacity-50 " +
                (sel ? "border-primary bg-primary/10 shadow-glow" : "border-border bg-surface hover:border-primary/40")
              }
            >
              <div className="flex items-center justify-between">
                <Pill tone={isBooked ? "primary" : open ? "success" : "destructive"}>{isBooked ? "Booked" : open ? "Open" : "Taken"}</Pill>
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
            <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {format(selectedDay, "EEE d MMM")} · {slot.time}</span>
            <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> Strikr Arena</span>
          </div>
          <div className="my-3 h-px bg-border" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total</span>
            <span className="font-display text-xl font-bold">AED {slot.price}</span>
          </div>
          <button
            onClick={handlePay}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full gradient-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
          >
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
