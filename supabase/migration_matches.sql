-- =============================================================
-- Migration: Add matches table for World Cup 2026 tournament
-- =============================================================

-- 8. Matches
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

-- Add match_slug to reports for direct linking
ALTER TABLE reports ADD COLUMN match_slug TEXT REFERENCES matches(slug);

-- Indexes
CREATE INDEX idx_matches_date ON matches(match_date);
CREATE INDEX idx_matches_competition ON matches(competition_slug);
CREATE INDEX idx_matches_home ON matches(home_team_slug);
CREATE INDEX idx_matches_away ON matches(away_team_slug);
CREATE INDEX idx_matches_status ON matches(status);
CREATE INDEX idx_reports_match ON reports(match_slug);

-- RLS
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read matches" ON matches FOR SELECT USING (true);

-- Updated_at trigger
CREATE TRIGGER matches_updated_at BEFORE UPDATE ON matches
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
