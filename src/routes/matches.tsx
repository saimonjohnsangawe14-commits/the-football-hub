import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Video, Download, Share2, Play, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { recordings } from "@/lib/mock-data";
import { PageHeader, SectionTitle, Pill } from "@/components/ui-bits";
import { createShootRequest, listShootRequests } from "@/lib/persistence";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/matches")({
  head: () => ({ meta: [{ title: "Match Recording · Strikr" }, { name: "description", content: "Request videographers and download highlight packages." }] }),
  component: MatchesPage,
});

const PACKAGES = [
  { id: "clips", name: "Clips", price: 199 },
  { id: "highlight", name: "Highlight reel", price: 449 },
  { id: "full", name: "Full match", price: 899 },
];

function MatchesPage() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [matchName, setMatchName] = useState("");
  const [matchDate, setMatchDate] = useState("");
  const [pkg, setPkg] = useState("highlight");
  const [contact, setContact] = useState("");
  const [notes, setNotes] = useState("");

  const { data: requests = [] } = useQuery({ queryKey: ["shoot_requests"], queryFn: listShootRequests });

  const mutation = useMutation({
    mutationFn: createShootRequest,
    onSuccess: (row) => {
      toast.success("Shoot requested", { description: `${row.match_name} · ${row.package} · we'll confirm within 1h.` });
      qc.invalidateQueries({ queryKey: ["shoot_requests"] });
      setOpen(false);
      setMatchName(""); setMatchDate(""); setPkg("highlight"); setContact(""); setNotes("");
    },
    onError: (err: Error) => toast.error("Couldn't submit", { description: err.message }),
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matchName.trim() || !matchDate || !contact.trim()) {
      toast.error("Please fill match name, date and contact"); return;
    }
    mutation.mutate({ match_name: matchName.trim(), match_date: matchDate, package: pkg, contact: contact.trim(), notes: notes.trim() || null });
  };

  return (
    <div className="space-y-5">
      <PageHeader title="Match recording" subtitle="Cinematic highlights from every match" back="/" />

      {/* Request CTA */}
      <section className="relative overflow-hidden rounded-3xl gradient-hero p-5 text-white shadow-elevated">
        <div className="absolute inset-0 gradient-mesh opacity-70" />
        <div className="relative">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur">
            <Sparkles className="h-3 w-3" /> New
          </div>
          <h2 className="mt-2 font-display text-xl font-bold leading-tight">Book a videographer for your next match</h2>
          <p className="mt-1 text-xs text-white/70">Multi-cam, drone & AI-generated highlight reels — delivered within 24 hrs.</p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => setOpen(true)}
              className="rounded-full gradient-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-glow"
            >
              Request shoot
            </button>
            <button
              onClick={() => toast.info("Packages opened below", { description: "Clips, Highlight reel, and Full-match edits." })}
              className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold backdrop-blur"
            >
              See packages
            </button>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="grid grid-cols-3 gap-2">
        {PACKAGES.map((p) => (
          <div
            key={p.id}
            className={
              "rounded-2xl border p-3 text-center " +
              (p.id === "highlight" ? "border-primary bg-primary/10 shadow-glow" : "border-border bg-surface")
            }
          >
            <div className="font-display text-sm font-bold">{p.name}</div>
            <div className="mt-2 font-display text-lg font-bold text-primary">{p.price}</div>
            <div className="text-[10px] text-muted-foreground">AED</div>
          </div>
        ))}
      </section>

      {/* Persisted requests */}
      {requests.length > 0 && (
        <section>
          <SectionTitle title="Your shoot requests" action={<Pill tone="primary">{requests.length}</Pill>} />
          <div className="overflow-hidden rounded-2xl border border-border bg-surface">
            {requests.map((r, i) => (
              <div key={r.id} className={"flex items-center gap-3 p-3 " + (i > 0 ? "border-t border-border" : "")}>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                  <Video className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{r.match_name}</div>
                  <div className="truncate text-[11px] text-muted-foreground">{r.match_date} · {r.package} · {r.contact}</div>
                </div>
                <Pill tone="warning">{r.status}</Pill>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recordings */}
      <section>
        <SectionTitle title="Past recordings" />
        <div className="space-y-2">
          {recordings.map((r) => (
            <div key={r.id} className="overflow-hidden rounded-2xl border border-border bg-surface">
              <div className="relative grid h-32 place-items-center gradient-hero text-5xl">
                {r.thumb}
                {r.status === "ready" && (
                  <button className="absolute grid h-12 w-12 place-items-center rounded-full gradient-primary text-primary-foreground shadow-glow">
                    <Play className="h-5 w-5 fill-current" />
                  </button>
                )}
                <span className="absolute right-2 top-2">
                  <Pill tone={r.status === "ready" ? "primary" : "warning"}>{r.status === "ready" ? r.duration : "Processing"}</Pill>
                </span>
              </div>
              <div className="flex items-center gap-2 p-3">
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{r.match}</div>
                  <div className="text-[11px] text-muted-foreground">{r.date} · {r.views} views</div>
                </div>
                <button className="grid h-9 w-9 place-items-center rounded-full bg-muted text-muted-foreground"><Download className="h-4 w-4" /></button>
                <button className="grid h-9 w-9 place-items-center rounded-full bg-muted text-muted-foreground"><Share2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Request a shoot</DialogTitle>
            <DialogDescription>Tell us about the match — we'll send a videographer.</DialogDescription>
          </DialogHeader>
          <form onSubmit={submit} className="space-y-3">
            <div>
              <Label htmlFor="match">Match</Label>
              <Input id="match" placeholder="Desert Wolves vs Falcon FC" value={matchName} onChange={(e) => setMatchName(e.target.value)} required />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" value={matchDate} onChange={(e) => setMatchDate(e.target.value)} required />
              </div>
              <div>
                <Label>Package</Label>
                <Select value={pkg} onValueChange={setPkg}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {PACKAGES.map((p) => (
                      <SelectItem key={p.id} value={p.id}>{p.name} · AED {p.price}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="contact">Contact (phone or email)</Label>
              <Input id="contact" placeholder="+971 50 123 4567" value={contact} onChange={(e) => setContact(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea id="notes" placeholder="Drone shots, sideline angle, etc." value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} />
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending && <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />}
                Submit request
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
