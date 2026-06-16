import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { QrCode, Download, Repeat, Star } from "lucide-react";
import { toast } from "sonner";
import { myBookings } from "@/lib/mock-data";
import { PageHeader, Pill } from "@/components/ui-bits";

export const Route = createFileRoute("/bookings")({
  head: () => ({ meta: [{ title: "My bookings · Strikr" }] }),
  component: BookingsPage,
});

const TABS = ["Upcoming", "Completed", "Cancelled"] as const;

function BookingsPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Upcoming");
  const filtered = myBookings.filter((b) => b.status === tab);

  return (
    <div className="space-y-5">
      <PageHeader title="My bookings" subtitle="All your reservations in one place" />

      <div className="inline-flex w-full rounded-full border border-border bg-surface p-1">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={"flex-1 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors " + (tab === t ? "bg-primary text-primary-foreground shadow-glow" : "text-muted-foreground")}
          >
            {t}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-surface p-10 text-center">
          <div className="font-display text-base font-bold">No {tab.toLowerCase()} bookings</div>
          <div className="mt-1 text-xs text-muted-foreground">Find a pitch and lock it in.</div>
          <Link to="/explore" className="mt-4 inline-flex rounded-full gradient-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-glow">
            Explore facilities
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((b) => (
            <div key={b.id} className="rounded-3xl border border-border bg-surface p-4">
              <div className="flex items-start gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-muted text-muted-foreground">
                  <QrCode className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-display text-sm font-bold">{b.facility}</div>
                  <div className="text-[11px] text-muted-foreground">{b.pitch} · {b.date}</div>
                  <div className="mt-1 font-mono text-[10px] text-muted-foreground">{b.qr}</div>
                </div>
                <div className="text-right">
                  <Pill tone={b.status === "Upcoming" ? "primary" : b.status === "Cancelled" ? "destructive" : "default"}>{b.status}</Pill>
                  <div className="mt-1 font-display text-sm font-bold">AED {b.price}</div>
                </div>
              </div>

              <div className="mt-3 flex gap-2">
                {b.status === "Upcoming" && (
                  <button onClick={() => toast.success("Check-in QR shown")} className="flex-1 rounded-full gradient-primary py-2 text-xs font-semibold text-primary-foreground shadow-glow">
                    Show QR
                  </button>
                )}
                {b.status === "Completed" && (
                  <button onClick={() => toast.success("Thanks for the review")} className="flex-1 inline-flex items-center justify-center gap-1 rounded-full border border-border bg-background py-2 text-xs font-semibold">
                    <Star className="h-3 w-3" /> Review
                  </button>
                )}
                <Link
                  to="/facility/$id"
                  params={{ id: b.facilityId }}
                  className="flex-1 inline-flex items-center justify-center gap-1 rounded-full border border-border bg-background py-2 text-xs font-semibold"
                >
                  <Repeat className="h-3 w-3" /> Rebook
                </Link>
                <button onClick={() => toast.success("Receipt downloaded")} className="grid h-8 w-8 place-items-center rounded-full border border-border bg-background">
                  <Download className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
