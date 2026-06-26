import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface Profile {
  name: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  goal: string;
  goal_weight: number;
  timeline_weeks: number;
  activity: string;
  food: string;
  equipment: string;
}

interface CheckIn {
  date: string;
  weight: number | null;
  water: number;
  workout_done: boolean;
  protein: number;
}

function generateRecommendation(profile: Profile, checkIns: CheckIn[]): string {
  const today = new Date().toISOString().slice(0, 10);
  const todayCheckIn = checkIns.find(c => c.date === today);

  // Calculate derived metrics
  const bmr = profile.gender === "Female"
    ? 10 * profile.weight + 6.25 * profile.height - 5 * profile.age - 161
    : 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5;

  const activityMultiplier = profile.activity === "Sedentary" ? 1.2 :
    profile.activity === "Lightly Active" ? 1.375 : 1.55;

  const tdee = Math.round(bmr * activityMultiplier);
  const calorieTarget = profile.goal === "Fat Loss" ? tdee - 500 : tdee + 350;
  const proteinTarget = Math.round(profile.weight * (profile.goal === "Fat Loss" ? 1.8 : 2.0));

  // Analyze progress
  const recentCheckIns = checkIns.slice(-7);
  const avgWater = recentCheckIns.length > 0
    ? recentCheckIns.reduce((sum, c) => sum + (c.water || 0), 0) / recentCheckIns.length
    : 0;

  const workoutCompliance = recentCheckIns.length > 0
    ? recentCheckIns.filter(c => c.workout_done).length / recentCheckIns.length
    : 0;

  const todayProtein = todayCheckIn?.protein || 0;
  const proteinGap = Math.max(0, proteinTarget - todayProtein);

  // Generate personalized recommendation
  const tips: string[] = [];

  // Goal-specific base message
  if (profile.goal === "Fat Loss") {
    tips.push(`Your daily calorie target is ${calorieTarget} kcal. Stay within this range while hitting ${proteinTarget}g protein to preserve muscle during fat loss.`);
  } else {
    tips.push(`To build muscle efficiently, aim for ${calorieTarget} kcal daily with ${proteinTarget}g protein. Quality sleep is crucial - aim for 7-8 hours.`);
  }

  // Activity-based recommendations
  if (profile.activity === "Sedentary") {
    tips.push("Your activity level is sedentary. Try adding a 20-minute walk after meals to boost metabolism and improve insulin sensitivity.");
  }

  // Water intake
  if (avgWater < 2.5) {
    tips.push(`You're averaging ${avgWater.toFixed(1)}L water. Aim for 3-3.5L daily. Good hydration improves workout performance and aids ${profile.goal === "Fat Loss" ? "fat metabolism" : "muscle recovery"}.`);
  }

  // Protein tracking
  if (proteinGap > 30) {
    const proteinFoods: Record<string, string> = {
      "Vegetarian": "paneer (18g/100g), soya chunks (26g/50g), or Greek yogurt (15g/150g)",
      "Eggetarian": "eggs (12g for 2 whole eggs), paneer (18g/100g), or whey protein (24g/scoop)",
      "Non-Vegetarian": "chicken breast (31g/100g), fish (22g/100g), or eggs (12g for 2)"
    };
    tips.push(`You need ${proteinGap}g more protein today. Quick options: ${proteinFoods[profile.food] || "eggs, paneer, or chicken"}.`);
  }

  // Workout compliance
  if (workoutCompliance < 0.6 && recentCheckIns.length >= 3) {
    tips.push(`You've completed ${Math.round(workoutCompliance * 100)}% of workouts this week. Consistency is key - even a quick 10-minute session counts!`);
  }

  // Check-in streak encouragement
  if (checkIns.length >= 5) {
    tips.push(`Great job logging ${checkIns.length} check-ins! Tracking consistently is one of the strongest predictors of fitness success.`);
  }

  // Timeline-based motivation
  const weeksRemaining = profile.timeline_weeks;
  if (weeksRemaining <= 2) {
    tips.push(`You're in the final stretch of your ${profile.timeline_weeks}-week plan! Stay focused - small daily choices compound into lasting results.`);
  }

  // Weight trend analysis
  if (recentCheckIns.length >= 3) {
    const weights = recentCheckIns.map(c => c.weight).filter(Boolean) as number[];
    if (weights.length >= 2) {
      const trend = weights[weights.length - 1] - weights[0];
      if (profile.goal === "Fat Loss" && trend > 0) {
        tips.push("Weight has been trending up slightly. This can be normal due to water retention or muscle gain. Focus on how your clothes fit and energy levels!");
      } else if (profile.goal === "Fat Loss" && trend < -0.5) {
        tips.push("You're making solid progress! Remember, sustainable fat loss is 0.5-1% body weight per week. You're on track!");
      } else if (profile.goal === "Muscle Gain" && trend > 0) {
        tips.push(`Gained ${trend.toFixed(1)}kg recently. Ensure you're getting enough recovery between sessions - muscles grow during rest, not during workouts.`);
      }
    }
  }

  // Food-specific advice
  if (profile.food === "Vegetarian") {
    tips.push("As a vegetarian, combine dal with rice or roti for complete protein. Adding curd to meals boosts both protein and gut health.");
  }

  // Equipment-based workout tips
  if (profile.equipment === "No equipment") {
    tips.push("Push-ups, squats, and planks are your foundation. Progressive overload comes from more reps, slower tempo, or single-leg variations.");
  }

  return tips.join(" ");
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { profile, checkIns } = await req.json() as { profile: Profile; checkIns: CheckIn[] };

    if (!profile) {
      return new Response(
        JSON.stringify({ error: "Profile is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const recommendation = generateRecommendation(profile, checkIns || []);

    return new Response(
      JSON.stringify({ recommendation }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
