-- =============================================================
-- Soy Analista — Supabase Schema
-- =============================================================

-- 1. Competitions (ligas y torneos)
CREATE TABLE competitions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name_es TEXT NOT NULL,
  name_en TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('league', 'tournament', 'world-cup')),
  season TEXT,
  country TEXT,
  confederation TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Teams (selecciones + clubes)
CREATE TABLE teams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name_es TEXT NOT NULL,
  name_en TEXT NOT NULL,
  flag TEXT NOT NULL,
  mode TEXT NOT NULL CHECK (mode IN ('national', 'club')),
  confederation TEXT NOT NULL,
  fifa_ranking INT DEFAULT 0,
  tier INT DEFAULT 3 CHECK (tier IN (1, 2, 3)),
  status TEXT DEFAULT 'coming_soon' CHECK (status IN ('available', 'coming_soon', 'playoff_pending')),
  competition_slug TEXT REFERENCES competitions(slug),
  wc_group TEXT,
  quick_stats JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Players
CREATE TABLE players (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  nationality TEXT NOT NULL,
  nationality_flag TEXT,
  date_of_birth DATE,
  position TEXT NOT NULL,
  current_team_slug TEXT REFERENCES teams(slug),
  national_team_slug TEXT REFERENCES teams(slug),
  market_value TEXT,
  contract_until TEXT,
  fbref_id TEXT,
  transfermarkt_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Reports
CREATE TABLE reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  team_slug TEXT NOT NULL REFERENCES teams(slug),
  competition_slug TEXT REFERENCES competitions(slug),
  type TEXT NOT NULL CHECK (type IN (
    'informe', 'newsletter', 'player-profile', 'head2head',
    'set-pieces', 'post-match', 'playing-model'
  )),
  label_es TEXT NOT NULL,
  label_en TEXT NOT NULL,
  description_es TEXT,
  description_en TEXT,
  sections INT,
  pages TEXT,
  published_date DATE NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  player_slug TEXT REFERENCES players(slug),
  comparison_slugs TEXT[],
  match_date DATE,
  match_opponent TEXT,
  file_html TEXT,
  file_pdf TEXT,
  file_docx TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Scraped Data (raw JSON from FBref/Understat/Transfermarkt)
CREATE TABLE scraped_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  team_slug TEXT NOT NULL REFERENCES teams(slug),
  source TEXT NOT NULL CHECK (source IN ('fbref', 'understat', 'transfermarkt')),
  mode TEXT NOT NULL CHECK (mode IN ('national', 'club')),
  season TEXT,
  data JSONB NOT NULL,
  scraped_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ,
  UNIQUE(team_slug, source, season)
);

-- 6. Processed Data (ICI, percentiles, tactical indices)
CREATE TABLE processed_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  team_slug TEXT NOT NULL REFERENCES teams(slug),
  season TEXT,
  ici_data JSONB,
  percentiles JSONB,
  role_profiles JSONB,
  tactical_indices JSONB,
  processed_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(team_slug, season)
);

-- 7. Player Stats (individual processed metrics)
CREATE TABLE player_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  player_slug TEXT NOT NULL REFERENCES players(slug),
  team_slug TEXT NOT NULL REFERENCES teams(slug),
  season TEXT NOT NULL,
  source TEXT DEFAULT 'fbref',
  stats JSONB NOT NULL,
  radar_data JSONB,
  percentiles JSONB,
  ici_score FLOAT,
  ici_breakdown JSONB,
  role_profile JSONB,
  minutes_played INT,
  matches_played INT,
  processed_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(player_slug, team_slug, season)
);

-- 8. Matches (World Cup 2026 + tournament matches)
CREATE TABLE matches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  competition_slug TEXT REFERENCES competitions(slug),
  stage TEXT NOT NULL CHECK (stage IN (
    'group', 'round-of-32', 'round-of-16',
    'quarter-final', 'semi-final', 'third-place', 'final'
  )),
  group_letter TEXT,
  match_number INT,
  match_date DATE NOT NULL,
  match_time TEXT,
  venue TEXT,
  city TEXT,
  home_team_slug TEXT REFERENCES teams(slug),
  away_team_slug TEXT REFERENCES teams(slug),
  home_score INT,
  away_score INT,
  status TEXT DEFAULT 'scheduled' CHECK (status IN (
    'scheduled', 'prematch_ready', 'live', 'completed', 'postmatch_ready'
  )),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================================
-- Indexes
-- =============================================================
CREATE INDEX idx_teams_mode ON teams(mode);
CREATE INDEX idx_teams_competition ON teams(competition_slug);
CREATE INDEX idx_teams_group ON teams(wc_group);
CREATE INDEX idx_reports_team ON reports(team_slug);
CREATE INDEX idx_reports_type ON reports(type);
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_player ON reports(player_slug);
CREATE INDEX idx_players_team ON players(current_team_slug);
CREATE INDEX idx_players_national ON players(national_team_slug);
CREATE INDEX idx_scraped_data_team ON scraped_data(team_slug);
CREATE INDEX idx_player_stats_player ON player_stats(player_slug);
CREATE INDEX idx_matches_date ON matches(match_date);
CREATE INDEX idx_matches_competition ON matches(competition_slug);
CREATE INDEX idx_matches_home ON matches(home_team_slug);
CREATE INDEX idx_matches_away ON matches(away_team_slug);
CREATE INDEX idx_matches_status ON matches(status);

-- =============================================================
-- Row Level Security
-- =============================================================

-- Public read for content tables
ALTER TABLE competitions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read competitions" ON competitions FOR SELECT USING (true);

ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read teams" ON teams FOR SELECT USING (true);

ALTER TABLE players ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read players" ON players FOR SELECT USING (true);

ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published reports" ON reports FOR SELECT USING (status = 'published');

ALTER TABLE player_stats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read player_stats" ON player_stats FOR SELECT USING (true);

ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read matches" ON matches FOR SELECT USING (true);

-- Internal tables: no public read (only service_role)
ALTER TABLE scraped_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE processed_data ENABLE ROW LEVEL SECURITY;

-- =============================================================
-- Updated_at trigger
-- =============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER teams_updated_at BEFORE UPDATE ON teams
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER players_updated_at BEFORE UPDATE ON players
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER reports_updated_at BEFORE UPDATE ON reports
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER matches_updated_at BEFORE UPDATE ON matches
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
