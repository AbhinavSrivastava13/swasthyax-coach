/*
# SwasthyaX: User Profiles, Check-ins, and AI Insights

1. New Tables
   - `profiles` - Stores user fitness profile data (age, weight, goals, preferences)
     - Links to auth.users via user_id
     - Includes all fitness configuration fields
   - `check_ins` - Daily weight, water, workout, protein tracking
     - One check-in per user per date
   - `ai_insights` - AI-generated personalized recommendations
     - Stores daily AI suggestions for each user

2. Security
   - Enable RLS on all tables
   - Owner-scoped CRUD: users can only access their own data
   - user_id defaults to auth.uid() for automatic ownership on insert

3. Important Notes
   - All tables use auth.uid() for ownership
   - Policies enforce user can only see/modify their own data
   - Timestamps track creation and updates
   - Indexes on user_id and date for query performance
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  age integer NOT NULL,
  gender text NOT NULL CHECK (gender IN ('Male', 'Female', 'Other')),
  height integer NOT NULL,
  weight numeric(5,2) NOT NULL,
  goal text NOT NULL CHECK (goal IN ('Fat Loss', 'Muscle Gain')),
  goal_weight numeric(5,2) NOT NULL,
  timeline_weeks integer NOT NULL,
  work_mode text NOT NULL CHECK (work_mode IN ('Remote', 'Hybrid', 'Office')),
  activity text NOT NULL CHECK (activity IN ('Sedentary', 'Lightly Active', 'Active')),
  food text NOT NULL CHECK (food IN ('Vegetarian', 'Eggetarian', 'Non-Vegetarian')),
  equipment text NOT NULL CHECK (equipment IN ('No equipment', 'Dumbbells')),
  budget integer NOT NULL DEFAULT 250,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create check_ins table
CREATE TABLE IF NOT EXISTS check_ins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  date date NOT NULL,
  weight numeric(5,2),
  water numeric(4,2) DEFAULT 0,
  workout_done boolean DEFAULT false,
  protein integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, date)
);

-- Create ai_insights table
CREATE TABLE IF NOT EXISTS ai_insights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  date date NOT NULL,
  insight_type text NOT NULL,
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, date, insight_type)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_check_ins_user_id ON check_ins(user_id);
CREATE INDEX IF NOT EXISTS idx_check_ins_user_date ON check_ins(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_ai_insights_user_date ON ai_insights(user_id, date DESC);

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE check_ins ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_insights ENABLE ROW LEVEL SECURITY;

-- Profiles policies
DROP POLICY IF EXISTS "select_own_profile" ON profiles;
CREATE POLICY "select_own_profile" ON profiles FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_profile" ON profiles;
CREATE POLICY "insert_own_profile" ON profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_profile" ON profiles;
CREATE POLICY "update_own_profile" ON profiles FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_profile" ON profiles;
CREATE POLICY "delete_own_profile" ON profiles FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- Check-ins policies
DROP POLICY IF EXISTS "select_own_check_ins" ON check_ins;
CREATE POLICY "select_own_check_ins" ON check_ins FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_check_ins" ON check_ins;
CREATE POLICY "insert_own_check_ins" ON check_ins FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_check_ins" ON check_ins;
CREATE POLICY "update_own_check_ins" ON check_ins FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_check_ins" ON check_ins;
CREATE POLICY "delete_own_check_ins" ON check_ins FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- AI insights policies
DROP POLICY IF EXISTS "select_own_ai_insights" ON ai_insights;
CREATE POLICY "select_own_ai_insights" ON ai_insights FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_ai_insights" ON ai_insights;
CREATE POLICY "insert_own_ai_insights" ON ai_insights FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_check_ins_updated_at ON check_ins;
CREATE TRIGGER update_check_ins_updated_at
  BEFORE UPDATE ON check_ins
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
