// Lovable Cloud managed backend client.
// No hardcoded URLs/keys and no manual env lookups — the managed client
// in src/integrations/supabase/client.ts owns all configuration.
import { supabase } from "@/integrations/supabase/client";
import type { Database, Json } from "@/integrations/supabase/types";

export { supabase };
export type { Database, Json };

export type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];
export type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"];
export type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];

export type CheckInRow = Database["public"]["Tables"]["check_ins"]["Row"];
export type CheckInInsert = Database["public"]["Tables"]["check_ins"]["Insert"];
export type CheckInUpdate = Database["public"]["Tables"]["check_ins"]["Update"];

export type AiInsightRow = Database["public"]["Tables"]["ai_insights"]["Row"];
export type AiConversationRow = Database["public"]["Tables"]["ai_conversations"]["Row"];
export type MealPlanRow = Database["public"]["Tables"]["meal_plans"]["Row"];
export type WorkoutPlanRow = Database["public"]["Tables"]["workout_plans"]["Row"];
