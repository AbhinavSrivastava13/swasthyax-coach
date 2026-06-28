import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Allow build to proceed without env vars (they'll be injected at runtime)
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Missing Supabase environment variables - using placeholder for build");
}

export const supabase = createClient(supabaseUrl || "https://placeholder.supabase.co", supabaseAnonKey || "placeholder");

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          age: number;
          gender: "Male" | "Female" | "Other";
          height: number;
          weight: number;
          goal: "Fat Loss" | "Muscle Gain";
          goal_weight: number;
          timeline_weeks: number;
          work_mode: "Remote" | "Hybrid" | "Office";
          activity: "Sedentary" | "Lightly Active" | "Active";
          food: "Vegetarian" | "Eggetarian" | "Non-Vegetarian";
          equipment: "No equipment" | "Dumbbells";
          budget: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          name: string;
          age: number;
          gender: "Male" | "Female" | "Other";
          height: number;
          weight: number;
          goal: "Fat Loss" | "Muscle Gain";
          goal_weight: number;
          timeline_weeks: number;
          work_mode: "Remote" | "Hybrid" | "Office";
          activity: "Sedentary" | "Lightly Active" | "Active";
          food: "Vegetarian" | "Eggetarian" | "Non-Vegetarian";
          equipment: "No equipment" | "Dumbbells";
          budget?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          age?: number;
          gender?: "Male" | "Female" | "Other";
          height?: number;
          weight?: number;
          goal?: "Fat Loss" | "Muscle Gain";
          goal_weight?: number;
          timeline_weeks?: number;
          work_mode?: "Remote" | "Hybrid" | "Office";
          activity?: "Sedentary" | "Lightly Active" | "Active";
          food?: "Vegetarian" | "Eggetarian" | "Non-Vegetarian";
          equipment?: "No equipment" | "Dumbbells";
          budget?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      check_ins: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          weight: number | null;
          water: number;
          workout_done: boolean;
          protein: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          date: string;
          weight?: number | null;
          water?: number;
          workout_done?: boolean;
          protein?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          date?: string;
          weight?: number | null;
          water?: number;
          workout_done?: boolean;
          protein?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      ai_insights: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          insight_type: string;
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          date: string;
          insight_type: string;
          content: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          date?: string;
          insight_type?: string;
          content?: string;
          created_at?: string;
        };
      };
    };
  };
}
