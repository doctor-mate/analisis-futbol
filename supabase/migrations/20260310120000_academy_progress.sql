-- SA Academy — Progress tracking table
-- Stores user learning progress for the gamified academy platform.
-- Initially uses anonymous_id (localStorage-generated UUID).
-- When auth is added, add user_id UUID REFERENCES auth.users(id).

CREATE TABLE IF NOT EXISTS academy_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  anonymous_id TEXT UNIQUE NOT NULL,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak INTEGER DEFAULT 0,
  last_active_date TIMESTAMPTZ,
  completed_lessons TEXT[] DEFAULT '{}',
  completed_quizzes TEXT[] DEFAULT '{}',
  module_scores JSONB DEFAULT '{}',
  hearts INTEGER DEFAULT 5,
  badges TEXT[] DEFAULT '{}',
  start_date TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Fast lookup by anonymous_id
CREATE INDEX IF NOT EXISTS idx_academy_progress_anonymous_id
  ON academy_progress(anonymous_id);

-- Row Level Security (permissive for anonymous access)
ALTER TABLE academy_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous read" ON academy_progress
  FOR SELECT USING (true);

CREATE POLICY "Allow anonymous insert" ON academy_progress
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous update" ON academy_progress
  FOR UPDATE USING (true);

-- Auto-update updated_at on changes
CREATE OR REPLACE FUNCTION update_academy_progress_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER academy_progress_updated_at
  BEFORE UPDATE ON academy_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_academy_progress_updated_at();
