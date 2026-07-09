// Re-export the Lovable-managed Supabase client so existing app code keeps working.
export { supabase } from "@/integrations/supabase/client";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type Gender = "Male" | "Female" | "Other";
type Activity = "Sedentary" | "Lightly Active" | "Active" | "Very Active";
type Food = "Vegetarian" | "Eggetarian" | "Non-Vegetarian" | "Vegan";
type Equipment = "No equipment" | "Dumbbells" | "Full Gym";
type WorkMode = "Remote" | "Hybrid" | "Office";
type Goal = "Fat Loss" | "Muscle Gain" | "Maintenance";

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
  goal_weight: number | null;
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

export type ProfileInsert = Partial<ProfileRow> & {
  user_id: string;
  name: string;
  age: number;
  gender: Gender;
  height: number;
  weight: number;
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
