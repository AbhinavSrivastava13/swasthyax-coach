import { useState, useEffect, useCallback } from "react";
import { supabase } from "./supabase";
import { useAuth } from "./auth";
import type { Database } from "./supabase";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];
type CheckIn = Database["public"]["Tables"]["check_ins"]["Row"];
type CheckInInsert = Database["public"]["Tables"]["check_ins"]["Insert"];
type CheckInUpdate = Database["public"]["Tables"]["check_ins"]["Update"];
type AiInsight = Database["public"]["Tables"]["ai_insights"]["Row"];

export function useProfileData() {
  const { user, profile, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = useCallback(async (updates: ProfileUpdate) => {
    if (!user) return { error: "Not authenticated" };

    setLoading(true);
    setError(null);

    const { error: updateError } = await supabase
      .from("profiles")
      .update(updates)
      .eq("user_id", user.id);

    setLoading(false);

    if (updateError) {
      setError(updateError.message);
      return { error: updateError.message };
    }

    await refreshProfile();
    return { error: null };
  }, [user, refreshProfile]);

  const createProfile = useCallback(async (profileData: Omit<ProfileUpdate, "user_id">) => {
    if (!user) return { error: "Not authenticated" };

    setLoading(true);
    setError(null);

    const { error: insertError } = await supabase
      .from("profiles")
      .insert({ ...profileData, user_id: user.id });

    setLoading(false);

    if (insertError) {
      setError(insertError.message);
      return { error: insertError.message };
    }

    await refreshProfile();
    return { error: null };
  }, [user, refreshProfile]);

  return {
    profile,
    loading,
    error,
    updateProfile,
    createProfile,
    refreshProfile,
  };
}

export function useCheckIns() {
  const { user } = useAuth();
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCheckIns = useCallback(async () => {
    if (!user) {
      setCheckIns([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from("check_ins")
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: true });

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setCheckIns(data || []);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchCheckIns();
  }, [fetchCheckIns]);

  const saveCheckIn = useCallback(async (checkInData: Omit<CheckInInsert, "user_id">) => {
    if (!user) return { error: "Not authenticated" };

    const data: CheckInInsert = {
      ...checkInData,
      user_id: user.id,
    };

    const { error: saveError } = await supabase
      .from("check_ins")
      .upsert(data, { onConflict: "user_id,date" });

    if (saveError) {
      return { error: saveError.message };
    }

    await fetchCheckIns();
    return { error: null };
  }, [user, fetchCheckIns]);

  const todayCheckIn = checkIns.find(
    (c) => c.date === new Date().toISOString().slice(0, 10)
  );

  return {
    checkIns,
    todayCheckIn,
    loading,
    error,
    saveCheckIn,
    refresh: fetchCheckIns,
  };
}

export function useAiInsights() {
  const { user } = useAuth();
  const [insights, setInsights] = useState<AiInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInsights = useCallback(async () => {
    if (!user) {
      setInsights([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from("ai_insights")
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: false })
      .limit(7);

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setInsights(data || []);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchInsights();
  }, [fetchInsights]);

  const todayInsight = insights.find(
    (i) => i.date === new Date().toISOString().slice(0, 10)
  );

  return {
    insights,
    todayInsight,
    loading,
    error,
    refresh: fetchInsights,
  };
}

export function useAiRecommendations() {
  const { user } = useAuth();
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendation = useCallback(async (profile: Profile, checkIns: CheckIn[]) => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-recommendations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ profile, checkIns }),
        }
      );

      if (!response.ok) {
        throw new Error(`Request failed (${response.status})`);
      }

      const data = await response.json();
      setRecommendation(data.recommendation);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch recommendation");
    } finally {
      setLoading(false);
    }
  }, [user]);

  return {
    recommendation,
    loading,
    error,
    fetchRecommendation,
  };
}
