import { supabase } from "@/integrations/supabase/client";

export type ShootRequest = {
  id: string;
  match_name: string;
  match_date: string;
  package: string;
  contact: string;
  notes: string | null;
  status: string;
  created_at: string;
};

export type Team = {
  id: string;
  name: string;
  format: string;
  emoji: string;
  captain: string | null;
  created_at: string;
};

export type TeamInvite = {
  id: string;
  team_id: string | null;
  team_name: string;
  player_name: string;
  contact: string;
  position: string | null;
  status: string;
  created_at: string;
};

export async function listShootRequests() {
  const { data, error } = await supabase
    .from("shoot_requests")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);
  if (error) throw error;
  return data as ShootRequest[];
}

export async function createShootRequest(input: Omit<ShootRequest, "id" | "status" | "created_at">) {
  const { data, error } = await supabase
    .from("shoot_requests")
    .insert(input)
    .select()
    .single();
  if (error) throw error;
  return data as ShootRequest;
}

export async function listTeams() {
  const { data, error } = await supabase
    .from("teams")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20);
  if (error) throw error;
  return data as Team[];
}

export async function createTeam(input: Omit<Team, "id" | "created_at">) {
  const { data, error } = await supabase.from("teams").insert(input).select().single();
  if (error) throw error;
  return data as Team;
}

export async function listInvites() {
  const { data, error } = await supabase
    .from("team_invites")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);
  if (error) throw error;
  return data as TeamInvite[];
}

export async function createInvite(input: Omit<TeamInvite, "id" | "status" | "created_at">) {
  const { data, error } = await supabase.from("team_invites").insert(input).select().single();
  if (error) throw error;
  return data as TeamInvite;
}
