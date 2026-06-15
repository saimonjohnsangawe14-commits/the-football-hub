
CREATE TABLE public.shoot_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  match_name TEXT NOT NULL,
  match_date DATE NOT NULL,
  package TEXT NOT NULL,
  contact TEXT NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.shoot_requests TO anon, authenticated;
GRANT ALL ON public.shoot_requests TO service_role;
ALTER TABLE public.shoot_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view shoot requests" ON public.shoot_requests FOR SELECT USING (true);
CREATE POLICY "Anyone can create shoot requests" ON public.shoot_requests FOR INSERT WITH CHECK (true);

CREATE TABLE public.teams (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  format TEXT NOT NULL,
  emoji TEXT NOT NULL DEFAULT '⚽',
  captain TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.teams TO anon, authenticated;
GRANT ALL ON public.teams TO service_role;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view teams" ON public.teams FOR SELECT USING (true);
CREATE POLICY "Anyone can create teams" ON public.teams FOR INSERT WITH CHECK (true);

CREATE TABLE public.team_invites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
  team_name TEXT NOT NULL,
  player_name TEXT NOT NULL,
  contact TEXT NOT NULL,
  position TEXT,
  status TEXT NOT NULL DEFAULT 'sent',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.team_invites TO anon, authenticated;
GRANT ALL ON public.team_invites TO service_role;
ALTER TABLE public.team_invites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view invites" ON public.team_invites FOR SELECT USING (true);
CREATE POLICY "Anyone can create invites" ON public.team_invites FOR INSERT WITH CHECK (true);
