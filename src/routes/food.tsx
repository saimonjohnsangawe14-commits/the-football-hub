import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { UtensilsCrossed, Clock, Plus, Minus } from "lucide-react";
import { menuItems } from "@/lib/mock-data";
import { PageHeader, SectionTitle, Pill } from "@/components/ui-bits";

export const Route = createFileRoute("/food")({
  head: () => ({ meta: [{ title: "Food Ordering · Strikr" }, { name: "description", content: "Pre-order food so it's ready right after the final whistle." }] }),
  component: FoodPage,
});

function FoodPage() {
  const [cart, setCart] = useState<Record<string, number>>({ f1: 2, f4: 1 });
  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = menuItems.find((m) => m.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const update = (id: string, delta: number) => {
    setCart((c) => {
      const next = { ...c, [id]: Math.max(0, (c[id] || 0) + delta) };
      if (next[id] === 0) delete next[id];
      return next;
    });
  };

  const cats = ["Mains", "Sides", "Drinks"];

  return (
    <div className="space-y-5 pb-24">
      <PageHeader title="Food ordering" subtitle="Hot & ready after the final whistle" back="/" />

      <section className="rounded-3xl border border-primary/30 bg-primary/5 p-4">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl gradient-primary text-primary-foreground shadow-glow">
            <Clock className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold">Pickup at full time</div>
            <div className="text-xs text-muted-foreground">Your booking · Tonight 20:00 · Pitch 3</div>
            <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-background px-3 py-1">
              <span className="text-[11px] text-muted-foreground">Ready at</span>
              <span className="font-display text-sm font-bold text-primary">21:35</span>
            </div>
          </div>
        </div>
      </section>

      {cats.map((cat) => (
        <section key={cat}>
          <SectionTitle title={cat} />
          <div className="space-y-2">
            {menuItems.filter((i) => i.category === cat).map((m) => (
              <div key={m.id} className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-3">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-muted text-3xl">{m.emoji}</span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{m.name}</div>
                  <div className="truncate text-[11px] text-muted-foreground">{m.desc}</div>
                  <div className="mt-1 font-display text-sm font-bold text-primary">AED {m.price}</div>
                </div>
                {cart[m.id] ? (
                  <div className="flex items-center gap-1 rounded-full bg-muted p-1">
                    <button onClick={() => update(m.id, -1)} className="grid h-7 w-7 place-items-center rounded-full bg-background"><Minus className="h-3 w-3" /></button>
                    <span className="w-5 text-center font-display text-sm font-bold">{cart[m.id]}</span>
                    <button onClick={() => update(m.id, 1)} className="grid h-7 w-7 place-items-center rounded-full gradient-primary text-primary-foreground"><Plus className="h-3 w-3" /></button>
                  </div>
                ) : (
                  <button onClick={() => update(m.id, 1)} className="grid h-9 w-9 place-items-center rounded-full gradient-primary text-primary-foreground shadow-glow">
                    <Plus className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      {cartCount > 0 && (
        <div className="fixed inset-x-0 bottom-16 z-30 mx-auto max-w-2xl px-4">
          <button className="flex w-full items-center justify-between rounded-full gradient-primary px-5 py-3 text-primary-foreground shadow-glow">
            <span className="inline-flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-primary-foreground/20 font-display text-xs font-bold">{cartCount}</span>
              <span className="font-semibold">View cart</span>
            </span>
            <span className="font-display text-base font-bold">AED {cartTotal}</span>
          </button>
        </div>
      )}
    </div>
  );
}
