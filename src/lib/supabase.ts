// Re-export the Lovable-managed Supabase client so existing app code keeps working.
import { supabase as _rawSupabase } from "@/integrations/supabase/client";
import type { SupabaseClient } from "@supabase/supabase-js";
// Cast to our app-local Database type so table typings match what the app actually uses.
export const supabase = _rawSupabase as unknown as SupabaseClient<Database>;

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type Gender = "Male" | "Female" | "Other";
type Activity = "Sedentary" | "Lightly Active" | "Active";
type Food = "Vegetarian" | "Eggetarian" | "Non-Vegetarian";
type Equipment = "No equipment" | "Dumbbells";
type WorkMode = "Remote" | "Hybrid" | "Office";
type Goal = "Fat Loss" | "Muscle Gain";

export interface ProfileRow {
  id: string;
  user_id: string;
  email: string | null;
  name: string;
  age: number;
  gender: Gender;
  height: number;
  weight: number;
  goal: Goal;
  goal_weight: number;
  activity: Activity;
  food: Food;
  equipment: Equipment;
  work_mode: WorkMode;
  budget: number;
  bmr: number;
  tdee: number;
  daily_calories: number;
  daily_protein: number;
  daily_water_ml: number;
  timeline_weeks: number;
  created_at: string;
  updated_at: string;
}

export type ProfileInsert = {
  user_id: string;
  name: string;
  age: number;
  gender: Gender;
  height: number;
  weight: number;
  goal?: Goal;
  goal_weight?: number | null;
  activity?: Activity;
  food?: Food;
  equipment?: Equipment;
  work_mode?: WorkMode;
  budget?: number;
  email?: string | null;
  bmr?: number;
  tdee?: number;
  daily_calories?: number;
  daily_protein?: number;
  daily_water_ml?: number;
  timeline_weeks?: number;
};

export type ProfileUpdate = Partial<ProfileRow>;

export interface CheckInRow {
  id: string;
  user_id: string;
  date: string;
  weight: number | null;
  water: number | null;
  protein: number | null;
  calories: number | null;
  workout_done: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export type CheckInInsert = Partial<CheckInRow> & {
  user_id: string;
  date: string;
};

export type CheckInUpdate = Partial<CheckInRow>;

export interface AiInsightRow {
  id: string;
  user_id: string;
  date: string;
  content: string;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: { Row: ProfileRow; Insert: ProfileInsert; Update: ProfileUpdate };
      check_ins: { Row: CheckInRow; Insert: CheckInInsert; Update: CheckInUpdate };
      ai_insights: { Row: AiInsightRow; Insert: Partial<AiInsightRow> & { user_id: string; content: string }; Update: Partial<AiInsightRow> };
    };
  };
}
