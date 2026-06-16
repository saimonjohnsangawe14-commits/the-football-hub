import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { addDays, format, isSameDay, startOfDay } from "date-fns";
import { ChevronLeft, Check, QrCode, CreditCard, Clock, MapPin } from "lucide-react";
import { toast } from "sonner";
import { facilityById, pitchesFor, generateSlots, extras } from "@/lib/mock-data";
import { Pill } from "@/components/ui-bits";

export const Route = createFileRoute("/book/$facilityId")({
  head: () => ({ meta: [{ title: "Book · Strikr" }] }),
  loader: ({ params }) => {
    const f = facilityById(params.facilityId);
    if (!f) throw notFound();
    return { f };
  },
  notFoundComponent: () => <div className="py-20 text-center text-sm text-muted-foreground">Facility not found.</div>,
  errorComponent: ({ error }) => <div className="py-20 text-center text-sm text-muted-foreground">{error.message}</div>,
  component: BookFlow,
});

type Step = 1 | 2 | 3 | 4 | 5;

function BookFlow() {
  const { f } = Route.useLoaderData();
  const navigate = useNavigate();
  const today = useMemo(() => startOfDay(new Date()), []);
  const days = useMemo(() => Array.from({ length: 14 }, (_, i) => addDays(today, i)), [today]);
  const pitches = pitchesFor(f.id);

  const [step, setStep] = useState<Step>(1);
  const [pitchId, setPitchId] = useState(pitches[0].id);
  const [day, setDay] = useState(today);
  const [slotId, setSlotId] = useState<string | null>(null);
  const [chosenExtras, setChosenExtras] = useState<string[]>([]);
  const [qr, setQr] = useState<string | null>(null);

  const pitch = pitches.find((p) => p.id === pitchId)!;
  const slots = generateSlots(f.priceFrom);
  const slot = slots.find((s) => s.id === slotId);
  const extrasTotal = extras.filter((e) => chosenExtras.includes(e.id)).reduce((s, e) => s + e.price, 0);
  const total = (slot?.price ?? 0) + extrasTotal;

  const canNext =
    (step === 1 && !!pitchId) ||
    (step === 2 && !!slotId) ||
    step === 3 ||
    step === 4;

  const pay = () => {
    const code = `STRK-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    setQr(code);
    setStep(5);
    toast.success("Booking confirmed", { description: `${f.name} · ${pitch.name} · ${format(day, "EEE d MMM")} ${slot?.time}` });
  };

  return (
    <div className="space-y-5 pb-20">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => (step === 1 ? navigate({ to: "/facility/$id", params: { id: f.id } }) : setStep((s) => (s - 1) as Step))}
          className="grid h-9 w-9 place-items-center rounded-full bg-muted text-muted-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Step {Math.min(step, 4)} of 4</div>
          <h1 className="truncate font-display text-lg font-bold">{f.name}</h1>
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-1.5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={"h-1 flex-1 rounded-full " + (step >= i ? "gradient-primary" : "bg-muted")} />
        ))}
      </div>

      {step === 1 && (
        <section className="space-y-3">
          <h2 className="font-display text-base font-bold uppercase tracking-wider">Pick a pitch</h2>
          <div className="grid grid-cols-1 gap-2">
            {pitches.map((p) => (
              <button
                key={p.id}
                onClick={() => setPitchId(p.id)}
                className={"flex items-center gap-3 rounded-2xl border p-3 text-left transition-all " + (pitchId === p.id ? "border-primary bg-primary/10 shadow-glow" : "border-border bg-surface")}
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl gradient-primary text-xl">⚽</span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold">{p.name}</div>
                  <div className="text-[11px] text-muted-foreground">{p.type} · {p.surface} · {p.capacity} players</div>
                </div>
                {pitchId === p.id && <Check className="h-4 w-4 text-primary" />}
              </button>
            ))}
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="space-y-4">
          <h2 className="font-display text-base font-bold uppercase tracking-wider">Pick date & time</h2>
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 scrollbar-hide">
            {days.map((d) => {
              const active = isSameDay(d, day);
              const isToday = isSameDay(d, today);
              return (
                <button
                  key={d.toISOString()}
                  onClick={() => setDay(d)}
                  className={"min-w-[64px] shrink-0 rounded-2xl border px-3 py-2 text-center transition-all " + (active ? "gradient-primary border-transparent text-primary-foreground shadow-glow" : "border-border bg-surface")}
                >
                  <div className="text-[10px] font-semibold uppercase">{isToday ? "Today" : format(d, "EEE")}</div>
                  <div className="font-display text-base font-bold">{format(d, "d")}</div>
                </button>
              );
            })}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {slots.map((s) => {
              const sel = slotId === s.id;
              return (
                <button
                  key={s.id}
                  disabled={!s.available}
                  onClick={() => setSlotId(s.id)}
                  className={"rounded-2xl border p-3 text-left transition-all disabled:opacity-40 " + (sel ? "border-primary bg-primary/10 shadow-glow" : "border-border bg-surface")}
                >
                  <div className="flex items-center justify-between">
                    <Pill tone={s.available ? "success" : "destructive"}>{s.available ? "Open" : "Taken"}</Pill>
                    {sel && <Check className="h-4 w-4 text-primary" />}
                  </div>
                  <div className="mt-2 font-display text-xl font-bold">{s.time}</div>
                  <div className="text-[11px] text-muted-foreground">→ {s.end}</div>
                  <div className="mt-2 text-right font-display text-sm font-bold text-primary">AED {s.price}</div>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="space-y-3">
          <h2 className="font-display text-base font-bold uppercase tracking-wider">Add extras (optional)</h2>
          <div className="grid gap-2">
            {extras.map((e) => {
              const on = chosenExtras.includes(e.id);
              return (
                <button
                  key={e.id}
                  onClick={() => setChosenExtras((prev) => (on ? prev.filter((x) => x !== e.id) : [...prev, e.id]))}
                  className={"flex items-center gap-3 rounded-2xl border p-3 text-left " + (on ? "border-primary bg-primary/10" : "border-border bg-surface")}
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-muted text-xl">{e.icon}</span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold">{e.label}</div>
                    <div className="text-[11px] text-muted-foreground">AED {e.price}</div>
                  </div>
                  <div className={"grid h-6 w-6 place-items-center rounded-full border " + (on ? "border-primary bg-primary text-primary-foreground" : "border-border")}>
                    {on && <Check className="h-3 w-3" />}
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {step === 4 && slot && (
        <section className="space-y-4">
          <h2 className="font-display text-base font-bold uppercase tracking-wider">Review & pay</h2>
          <div className="rounded-3xl border border-border bg-surface p-4">
            <div className="font-display text-base font-bold">{f.name}</div>
            <div className="mt-2 grid gap-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {f.area}, {f.city}</span>
              <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {format(day, "EEE d MMM")} · {slot.time} – {slot.end}</span>
              <span>{pitch.name} · {pitch.type}</span>
            </div>
            <div className="my-3 h-px bg-border" />
            <Row label={`${pitch.name} (1 hr)`} value={`AED ${slot.price}`} />
            {chosenExtras.map((id) => {
              const e = extras.find((x) => x.id === id)!;
              return <Row key={id} label={e.label} value={`AED ${e.price}`} muted />;
            })}
            <div className="my-3 h-px bg-border" />
            <Row label="Total" value={`AED ${total}`} bold />
          </div>

          <div className="rounded-2xl border border-border bg-surface p-3">
            <div className="text-xs font-semibold">Payment method</div>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {["Card", "Apple Pay", "Cash @venue"].map((m, i) => (
                <button key={m} className={"rounded-xl border p-2 text-xs font-semibold " + (i === 0 ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground")}>
                  {m}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {step === 5 && qr && slot && (
        <section className="space-y-4 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/15 text-success">
            <Check className="h-7 w-7" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold">Booking confirmed</h2>
            <p className="mt-1 text-xs text-muted-foreground">QR code sent to your bookings</p>
          </div>
          <div className="mx-auto grid w-48 place-items-center gap-2 rounded-3xl border border-border bg-surface p-5">
            <div className="grid h-32 w-32 place-items-center rounded-2xl bg-foreground text-background">
              <QrCode className="h-16 w-16" />
            </div>
            <div className="font-mono text-xs font-bold">{qr}</div>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-3 text-left text-xs text-muted-foreground">
            <div className="font-semibold text-foreground">{f.name}</div>
            {pitch.name} · {format(day, "EEE d MMM")} · {slot.time}
          </div>
          <div className="flex gap-2">
            <Link to="/bookings" className="flex-1 rounded-full border border-border bg-surface py-3 text-sm font-semibold">My bookings</Link>
            <Link to="/" className="flex-1 rounded-full gradient-primary py-3 text-sm font-semibold text-primary-foreground shadow-glow">Done</Link>
          </div>
        </section>
      )}

      {/* Sticky next/pay */}
      {step < 5 && (
        <div className="fixed inset-x-0 bottom-16 z-30 mx-auto max-w-2xl px-4">
          {step === 4 ? (
            <button onClick={pay} className="flex w-full items-center justify-center gap-2 rounded-full gradient-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-glow">
              <CreditCard className="h-4 w-4" /> Pay AED {total} & confirm
            </button>
          ) : (
            <button
              disabled={!canNext}
              onClick={() => setStep((s) => (s + 1) as Step)}
              className="flex w-full items-center justify-between rounded-full gradient-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow disabled:opacity-40"
            >
              <span>{slot ? `AED ${total}` : "Continue"}</span>
              <span>Next →</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function Row({ label, value, muted, bold }: { label: string; value: string; muted?: boolean; bold?: boolean }) {
  return (
    <div className={"flex items-center justify-between text-sm " + (muted ? "text-muted-foreground" : "")}>
      <span>{label}</span>
      <span className={bold ? "font-display text-lg font-bold" : "font-semibold"}>{value}</span>
    </div>
  );
}
