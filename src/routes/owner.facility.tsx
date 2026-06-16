import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Camera, Save } from "lucide-react";
import { amenityLabels } from "@/lib/mock-data";
import { PageHeader } from "@/components/ui-bits";

export const Route = createFileRoute("/owner/facility")({
  head: () => ({ meta: [{ title: "Facility setup · Owner" }] }),
  component: OwnerFacility,
});

function OwnerFacility() {
  const [name, setName] = useState("Strikr Arena · Al Quoz");
  const [desc, setDesc] = useState("Premium 5/7/11-a-side pitches with floodlights, F&B and cameras on every pitch.");
  const [active, setActive] = useState<string[]>(["floodlights", "parking", "changing_rooms", "showers", "food", "cameras", "referee"]);

  const toggle = (a: string) => setActive((p) => p.includes(a) ? p.filter((x) => x !== a) : [...p, a]);

  return (
    <div className="space-y-5">
      <PageHeader title="Facility setup" subtitle="Photos, amenities, rules & contacts" />

      <section className="space-y-3 rounded-3xl border border-border bg-surface p-4">
        <h2 className="font-display text-sm font-bold uppercase tracking-wider">Photos</h2>
        <div className="grid grid-cols-3 gap-2">
          {["⚽", "🏟️", "🥅", "🌃"].map((e, i) => (
            <div key={i} className="aspect-square grid place-items-center rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-3xl">{e}</div>
          ))}
          <button onClick={() => toast.success("Photo uploaded")} className="aspect-square grid place-items-center rounded-xl border border-dashed border-border text-muted-foreground">
            <Camera className="h-5 w-5" />
          </button>
        </div>
      </section>

      <section className="space-y-3 rounded-3xl border border-border bg-surface p-4">
        <h2 className="font-display text-sm font-bold uppercase tracking-wider">Basics</h2>
        <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm font-semibold" />
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={3} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" />
      </section>

      <section className="space-y-3 rounded-3xl border border-border bg-surface p-4">
        <h2 className="font-display text-sm font-bold uppercase tracking-wider">Amenities</h2>
        <div className="flex flex-wrap gap-2">
          {Object.keys(amenityLabels).map((a) => {
            const on = active.includes(a);
            return (
              <button
                key={a}
                onClick={() => toggle(a)}
                className={"rounded-full border px-3 py-1.5 text-xs font-semibold " + (on ? "border-primary bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground")}
              >
                {amenityLabels[a]}
              </button>
            );
          })}
        </div>
      </section>

      <button onClick={() => toast.success("Facility updated")} className="inline-flex w-full items-center justify-center gap-2 rounded-full gradient-primary py-3 text-sm font-semibold text-primary-foreground shadow-glow">
        <Save className="h-4 w-4" /> Save changes
      </button>
    </div>
  );
}
