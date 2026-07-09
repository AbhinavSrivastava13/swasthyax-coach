
-- ENUMS
CREATE TYPE public.fitness_goal AS ENUM ('Fat Loss', 'Muscle Gain', 'Maintenance');
CREATE TYPE public.gender_type AS ENUM ('Male', 'Female', 'Other');
CREATE TYPE public.activity_level AS ENUM ('Sedentary', 'Lightly Active', 'Active', 'Very Active');
CREATE TYPE public.food_pref AS ENUM ('Vegetarian', 'Eggetarian', 'Non-Vegetarian', 'Vegan');
CREATE TYPE public.equipment_type AS ENUM ('No equipment', 'Dumbbells', 'Full Gym');
CREATE TYPE public.work_mode AS ENUM ('Remote', 'Hybrid', 'Office');

-- PROFILES
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  name TEXT NOT NULL,
  age INTEGER NOT NULL CHECK (age > 0 AND age < 120),
  gender public.gender_type NOT NULL,
  height NUMERIC NOT NULL CHECK (height > 0),
  weight NUMERIC NOT NULL CHECK (weight > 0),
  goal public.fitness_goal NOT NULL DEFAULT 'Fat Loss',
  goal_weight NUMERIC,
  activity public.activity_level NOT NULL DEFAULT 'Lightly Active',
  food public.food_pref NOT NULL DEFAULT 'Vegetarian',
  equipment public.equipment_type NOT NULL DEFAULT 'No equipment',
  work_mode public.work_mode NOT NULL DEFAULT 'Hybrid',
  budget INTEGER NOT NULL DEFAULT 250,
  -- calculated
  bmr INTEGER NOT NULL DEFAULT 0,
  tdee INTEGER NOT NULL DEFAULT 0,
  daily_calories INTEGER NOT NULL DEFAULT 0,
  daily_protein INTEGER NOT NULL DEFAULT 0,
  daily_water_ml INTEGER NOT NULL DEFAULT 0,
  timeline_weeks INTEGER NOT NULL DEFAULT 12,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles: own read" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Profiles: own insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Profiles: own update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Profiles: own delete" ON public.profiles FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- shared updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER trg_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- CHECK-INS
CREATE TABLE public.check_ins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  weight NUMERIC,
  water NUMERIC,
  protein NUMERIC,
  calories NUMERIC,
  workout_done BOOLEAN NOT NULL DEFAULT false,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, date)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.check_ins TO authenticated;
GRANT ALL ON public.check_ins TO service_role;
ALTER TABLE public.check_ins ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Check-ins: own all" ON public.check_ins FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER trg_checkins_updated_at BEFORE UPDATE ON public.check_ins
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- MEAL PLANS
CREATE TABLE public.meal_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan JSONB NOT NULL,
  daily_calories INTEGER,
  daily_protein INTEGER,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.meal_plans TO authenticated;
GRANT ALL ON public.meal_plans TO service_role;
ALTER TABLE public.meal_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Meal plans: own all" ON public.meal_plans FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE INDEX idx_meal_plans_user_active ON public.meal_plans(user_id, is_active, created_at DESC);

-- WORKOUT PLANS
CREATE TABLE public.workout_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan JSONB NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.workout_plans TO authenticated;
GRANT ALL ON public.workout_plans TO service_role;
ALTER TABLE public.workout_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Workout plans: own all" ON public.workout_plans FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE INDEX idx_workout_plans_user_active ON public.workout_plans(user_id, is_active, created_at DESC);

-- AI INSIGHTS / CONVERSATIONS
CREATE TABLE public.ai_insights (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.ai_insights TO authenticated;
GRANT ALL ON public.ai_insights TO service_role;
ALTER TABLE public.ai_insights ENABLE ROW LEVEL SECURITY;
CREATE POLICY "AI insights: own all" ON public.ai_insights FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.ai_conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user','assistant','system')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.ai_conversations TO authenticated;
GRANT ALL ON public.ai_conversations TO service_role;
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "AI conversations: own all" ON public.ai_conversations FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE INDEX idx_ai_conversations_user ON public.ai_conversations(user_id, created_at);
