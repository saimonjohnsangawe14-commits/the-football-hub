import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Crown, UserPlus, Loader2, Users } from "lucide-react";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { myTeam, teamLeaderboard } from "@/lib/mock-data";
import { PageHeader, SectionTitle, Avatar, Pill, Stat } from "@/components/ui-bits";
import { createInvite, createTeam, listInvites, listTeams } from "@/lib/persistence";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/teams")({
  head: () => ({ meta: [{ title: "Teams · Strikr" }, { name: "description", content: "Create teams, invite players, climb the rankings." }] }),
  component: TeamsPage,
});

const FORMATS = ["5-a-side", "7-a-side", "11-a-side"];
const EMOJIS = ["🐺", "🦅", "⚡", "🔥", "🌪️", "👑", "🦁", "🦊"];

function TeamsPage() {
  const qc = useQueryClient();
  const totalGames = myTeam.record.won + myTeam.record.drawn + myTeam.record.lost;
  const winPct = Math.round((myTeam.record.won / totalGames) * 100);

  const { data: teams = [] } = useQuery({ queryKey: ["teams"], queryFn: listTeams });
  const { data: invites = [] } = useQuery({ queryKey: ["team_invites"], queryFn: listInvites });

  // Create team
  const [teamOpen, setTeamOpen] = useState(false);
  const [name, setName] = useState("");
  const [format, setFormat] = useState(FORMATS[0]);
  const [emoji, setEmoji] = useState(EMOJIS[0]);
  const [captain, setCaptain] = useState("");

  const teamMut = useMutation({
    mutationFn: createTeam,
    onSuccess: (row) => {
      toast.success("Team created", { description: `${row.emoji} ${row.name} · ${row.format}` });
      qc.invalidateQueries({ queryKey: ["teams"] });
      setTeamOpen(false);
      setName(""); setFormat(FORMATS[0]); setEmoji(EMOJIS[0]); setCaptain("");
    },
    onError: (err: Error) => toast.error("Couldn't create team", { description: err.message }),
  });

  const submitTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { toast.error("Please give your team a name"); return; }
    teamMut.mutate({ name: name.trim(), format, emoji, captain: captain.trim() || null });
  };

  // Invite player
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteTeamId, setInviteTeamId] = useState<string>("");
  const [playerName, setPlayerName] = useState("");
  const [playerContact, setPlayerContact] = useState("");
  const [playerPos, setPlayerPos] = useState("");

  // Default invite to first custom team or My team mock
  const inviteTeamOptions = [
    { id: "mock-mine", name: myTeam.name },
    ...teams.map((t) => ({ id: t.id, name: t.name })),
  ];
  const selectedTeamId = inviteTeamId || inviteTeamOptions[0]?.id || "";

  const inviteMut = useMutation({
    mutationFn: createInvite,
    onSuccess: (row) => {
      toast.success("Invite sent", { description: `${row.player_name} → ${row.team_name}` });
      qc.invalidateQueries({ queryKey: ["team_invites"] });
      setInviteOpen(false);
      setPlayerName(""); setPlayerContact(""); setPlayerPos("");
    },
    onError: (err: Error) => toast.error("Couldn't send invite", { description: err.message }),
  });

  const submitInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim() || !playerContact.trim()) {
      toast.error("Player name and contact required"); return;
    }
    const target = inviteTeamOptions.find((t) => t.id === selectedTeamId);
    if (!target) return;
    inviteMut.mutate({
      team_id: target.id === "mock-mine" ? null : target.id,
      team_name: target.name,
      player_name: playerName.trim(),
      contact: playerContact.trim(),
      position: playerPos.trim() || null,
    });
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Teams"
        subtitle="Your squad, your rivals, your rankings"
        action={
          <button
            onClick={() => setTeamOpen(true)}
            className="inline-flex items-center gap-1 rounded-full gradient-primary px-3 py-2 text-xs font-semibold text-primary-foreground shadow-glow"
          >
            <Plus className="h-3.5 w-3.5" /> New
          </button>
        }
      />

      {/* My team hero */}
      <section className="overflow-hidden rounded-3xl border border-border bg-surface shadow-card">
        <div className="gradient-hero p-5 text-white">
          <div className="flex items-center gap-3">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/15 text-3xl backdrop-blur">
              {myTeam.logo}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-display text-xl font-bold">{myTeam.name}</span>
                <Crown className="h-4 w-4 text-primary" />
              </div>
              <div className="text-[11px] text-white/70">Captain · {myTeam.captain} · est. {myTeam.founded}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-wider text-white/60">Rank</div>
              <div className="font-display text-2xl font-bold">#{myTeam.rank}</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 p-3">
          <Stat label="Won" value={myTeam.record.won} accent />
          <Stat label="Drawn" value={myTeam.record.drawn} />
          <Stat label="Lost" value={myTeam.record.lost} />
          <Stat label="Win %" value={`${winPct}%`} />
        </div>
      </section>

      {/* User-created teams */}
      {teams.length > 0 && (
        <section>
          <SectionTitle title="Your teams" action={<Pill tone="primary">{teams.length}</Pill>} />
          <div className="overflow-hidden rounded-2xl border border-border bg-surface">
            {teams.map((t, i) => (
              <div key={t.id} className={"flex items-center gap-3 p-3 " + (i > 0 ? "border-t border-border" : "")}>
                <span className="text-2xl">{t.emoji}</span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{t.name}</div>
                  <div className="truncate text-[11px] text-muted-foreground">{t.format}{t.captain ? ` · ${t.captain}` : ""}</div>
                </div>
                <Pill tone="success">Active</Pill>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Roster */}
      <section>
        <SectionTitle
          title="Squad"
          action={
            <button
              onClick={() => setInviteOpen(true)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary"
            >
              <UserPlus className="h-3.5 w-3.5" /> Invite
            </button>
          }
        />
        <div className="overflow-hidden rounded-2xl border border-border bg-surface">
          {myTeam.players.map((p, i) => (
            <div key={p.name} className={"flex items-center gap-3 p-3 " + (i > 0 ? "border-t border-border" : "")}>
              <Avatar initials={p.avatar} tone={i === 0 ? "primary" : "muted"} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">{p.name}</div>
                <div className="truncate text-[11px] text-muted-foreground">{p.role}</div>
              </div>
              <span className="rounded-lg bg-muted px-2 py-1 font-mono text-xs font-bold">{p.rating}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Sent invites */}
      {invites.length > 0 && (
        <section>
          <SectionTitle title="Pending invites" action={<Pill tone="primary">{invites.length}</Pill>} />
          <div className="overflow-hidden rounded-2xl border border-border bg-surface">
            {invites.map((inv, i) => (
              <div key={inv.id} className={"flex items-center gap-3 p-3 " + (i > 0 ? "border-t border-border" : "")}>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                  <Users className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{inv.player_name}{inv.position ? ` · ${inv.position}` : ""}</div>
                  <div className="truncate text-[11px] text-muted-foreground">→ {inv.team_name} · {inv.contact}</div>
                </div>
                <Pill tone="warning">{inv.status}</Pill>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Standings */}
      <section>
        <SectionTitle title="League table" />
        <div className="overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="grid grid-cols-[24px_1fr_32px_32px_32px_40px] gap-2 border-b border-border bg-muted/40 p-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            <span>#</span><span>Team</span><span className="text-center">W</span><span className="text-center">D</span><span className="text-center">L</span><span className="text-right">Pts</span>
          </div>
          {teamLeaderboard.map((t) => (
            <div key={t.rank} className={"grid grid-cols-[24px_1fr_32px_32px_32px_40px] gap-2 border-b border-border p-3 text-sm last:border-0 " + (t.name === myTeam.name ? "bg-primary/5" : "")}>
              <span className="font-display font-bold text-muted-foreground">{t.rank}</span>
              <span className="flex min-w-0 items-center gap-2">
                <span className="text-base">{t.logo}</span>
                <span className="truncate font-semibold">{t.name}</span>
              </span>
              <span className="text-center text-muted-foreground">{t.won}</span>
              <span className="text-center text-muted-foreground">{t.drawn}</span>
              <span className="text-center text-muted-foreground">{t.lost}</span>
              <span className="text-right font-display font-bold text-primary">{t.points}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Create team dialog */}
      <Dialog open={teamOpen} onOpenChange={setTeamOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create a team</DialogTitle>
            <DialogDescription>Spin up a roster and start playing.</DialogDescription>
          </DialogHeader>
          <form onSubmit={submitTeam} className="space-y-3">
            <div>
              <Label htmlFor="team-name">Team name</Label>
              <Input id="team-name" placeholder="Coastal Strikers" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>Format</Label>
                <Select value={format} onValueChange={setFormat}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {FORMATS.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Crest</Label>
                <div className="flex flex-wrap gap-1.5 rounded-md border border-input bg-background p-2">
                  {EMOJIS.map((e) => (
                    <button
                      key={e}
                      type="button"
                      onClick={() => setEmoji(e)}
                      className={"grid h-7 w-7 place-items-center rounded-md text-base " + (emoji === e ? "bg-primary/15 ring-1 ring-primary" : "")}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="captain">Captain (optional)</Label>
              <Input id="captain" placeholder="Your name" value={captain} onChange={(e) => setCaptain(e.target.value)} />
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setTeamOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={teamMut.isPending}>
                {teamMut.isPending && <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />}
                Create team
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Invite player dialog */}
      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invite a player</DialogTitle>
            <DialogDescription>We'll send them a link to join your squad.</DialogDescription>
          </DialogHeader>
          <form onSubmit={submitInvite} className="space-y-3">
            <div>
              <Label>Team</Label>
              <Select value={selectedTeamId} onValueChange={setInviteTeamId}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {inviteTeamOptions.map((t) => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="player-name">Player name</Label>
              <Input id="player-name" placeholder="Karim Benz" value={playerName} onChange={(e) => setPlayerName(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="player-contact">Phone or email</Label>
              <Input id="player-contact" placeholder="karim@example.com" value={playerContact} onChange={(e) => setPlayerContact(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="player-pos">Position (optional)</Label>
              <Input id="player-pos" placeholder="ST · LW · GK..." value={playerPos} onChange={(e) => setPlayerPos(e.target.value)} />
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setInviteOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={inviteMut.isPending}>
                {inviteMut.isPending && <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />}
                Send invite
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
