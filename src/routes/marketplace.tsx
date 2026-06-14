import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShoppingBag, Star, Heart, Package } from "lucide-react";
import { marketplaceItems } from "@/lib/mock-data";
import { PageHeader, SectionTitle, Pill } from "@/components/ui-bits";

export const Route = createFileRoute("/marketplace")({
  head: () => ({ meta: [{ title: "Marketplace · Strikr" }, { name: "description", content: "Boots, jerseys, training gear and partner shops." }] }),
  component: MarketplacePage,
});

const cats = ["All", "Boots", "Jerseys", "Gear"];

function MarketplacePage() {
  const [cat, setCat] = useState("All");
  const items = marketplaceItems.filter((i) => cat === "All" || i.category === cat);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Marketplace"
        subtitle="Gear up like the pros"
        back="/"
        action={
          <button className="grid h-9 w-9 place-items-center rounded-full bg-muted text-muted-foreground">
            <ShoppingBag className="h-4 w-4" />
          </button>
        }
      />

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 scrollbar-hide">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={
              "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold " +
              (cat === c ? "border-primary bg-primary/10 text-primary" : "border-border bg-surface text-muted-foreground")
            }
          >
            {c}
          </button>
        ))}
      </div>

      {/* Featured */}
      <div className="overflow-hidden rounded-3xl gradient-hero p-5 text-white shadow-elevated">
        <div className="text-[10px] uppercase tracking-wider text-white/60">Drop of the week</div>
        <h2 className="mt-1 font-display text-xl font-bold leading-tight">Strikr 2026 Home Jersey</h2>
        <p className="mt-1 text-xs text-white/70">Limited 300 pieces · numbered & signed</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-display text-2xl font-bold">AED 249</span>
          <button className="rounded-full gradient-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-glow">
            Shop drop
          </button>
        </div>
      </div>

      {/* Grid */}
      <section className="grid grid-cols-2 gap-2">
        {items.map((p) => (
          <div key={p.id} className="overflow-hidden rounded-2xl border border-border bg-surface">
            <div className="relative grid h-32 place-items-center bg-muted/40">
              <span className="text-5xl">{p.category === "Boots" ? "👟" : p.category === "Jerseys" ? "👕" : "⚽"}</span>
              {p.badge && (
                <span className="absolute left-2 top-2">
                  <Pill tone="primary">{p.badge}</Pill>
                </span>
              )}
              <button className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-background/80 text-muted-foreground backdrop-blur">
                <Heart className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="p-3">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{p.brand}</div>
              <div className="mt-0.5 truncate text-sm font-semibold">{p.name}</div>
              <div className="mt-1 flex items-center gap-1 text-[11px]">
                <Star className="h-3 w-3 fill-current text-primary" />
                <span className="font-mono">{p.rating}</span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-display text-base font-bold text-primary">AED {p.price}</span>
                {p.oldPrice && <span className="text-[11px] text-muted-foreground line-through">{p.oldPrice}</span>}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Orders */}
      <section>
        <SectionTitle title="Recent orders" />
        <div className="space-y-2">
          {[
            { id: "o1", item: "Adidas Predator Edge", date: "Jun 6", status: "Delivered" },
            { id: "o2", item: "Strikr Training Shorts", date: "Jun 2", status: "In transit" },
          ].map((o) => (
            <div key={o.id} className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-muted text-muted-foreground">
                <Package className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">{o.item}</div>
                <div className="text-[11px] text-muted-foreground">{o.date}</div>
              </div>
              <Pill tone={o.status === "Delivered" ? "success" : "primary"}>{o.status}</Pill>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
