import type { Profile, Food, Goal, Equipment } from "./profile";

// ───────────────── Calorie & Protein math (Mifflin-St Jeor) ─────────────────

export function bmr(p: Pick<Profile, "weight" | "height" | "age" | "gender">) {
  const base = 10 * p.weight + 6.25 * p.height - 5 * p.age;
  return p.gender === "Female" ? base - 161 : base + 5;
}

const ACTIVITY_FACTOR = {
  Sedentary: 1.2,
  "Lightly Active": 1.375,
  Active: 1.55,
} as const;

export function tdee(p: Pick<Profile, "weight" | "height" | "age" | "gender" | "activity">) {
  return Math.round(bmr(p) * ACTIVITY_FACTOR[p.activity]);
}

export function calorieTarget(p: Profile) {
  const maintenance = tdee(p);
  return p.goal === "Fat Loss" ? maintenance - 500 : maintenance + 350;
}

export function proteinTarget(p: Profile) {
  // g/kg: fat loss higher to preserve muscle; muscle gain to build
  const factor = p.goal === "Fat Loss" ? 1.8 : 2.0;
  return Math.round(p.weight * factor);
}

export function bmi(p: Pick<Profile, "weight" | "height">) {
  const m = p.height / 100;
  return +(p.weight / (m * m)).toFixed(1);
}

// ───────────────── Meal plan ─────────────────

export type Meal = { name: string; items: string; kcal: number; protein: number };
export type DayMeals = { day: string; breakfast: Meal; lunch: Meal; dinner: Meal; snack: Meal };

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

type MealTemplate = { items: string; protein: number; baseKcal: number };

const POOL: Record<Food, { breakfast: MealTemplate[]; lunch: MealTemplate[]; dinner: MealTemplate[]; snack: MealTemplate[] }> = {
  Vegetarian: {
    breakfast: [
      { items: "Moong dal chilla + mint chutney + curd", protein: 24, baseKcal: 420 },
      { items: "Besan chilla stuffed with paneer", protein: 26, baseKcal: 430 },
      { items: "Oats upma with peanuts + low-fat milk", protein: 20, baseKcal: 410 },
      { items: "Paneer paratha + curd", protein: 24, baseKcal: 460 },
      { items: "Idli + sambhar + coconut chutney", protein: 18, baseKcal: 420 },
      { items: "Vegetable poha + roasted peanuts + curd", protein: 18, baseKcal: 400 },
      { items: "Sprouts salad + 2 multigrain toast", protein: 22, baseKcal: 380 },
    ],
    lunch: [
      { items: "2 roti + rajma + cucumber salad + curd", protein: 28, baseKcal: 560 },
      { items: "Chole + jeera rice + raita", protein: 26, baseKcal: 580 },
      { items: "Dal tadka + 2 roti + bhindi sabzi + curd", protein: 24, baseKcal: 550 },
      { items: "Rajma chawal + green salad", protein: 26, baseKcal: 600 },
      { items: "Dal khichdi + curd + papad", protein: 22, baseKcal: 540 },
      { items: "Veg biryani + raita", protein: 22, baseKcal: 620 },
      { items: "Kadhi + chawal + 1 roti + salad", protein: 22, baseKcal: 560 },
    ],
    dinner: [
      { items: "Paneer bhurji + 2 phulka + sautéed veggies", protein: 32, baseKcal: 520 },
      { items: "Tofu bhurji + 2 roti + dal", protein: 30, baseKcal: 510 },
      { items: "Soya chunk curry + brown rice", protein: 34, baseKcal: 540 },
      { items: "Palak paneer + 2 phulka", protein: 30, baseKcal: 530 },
      { items: "Mix veg + chana dal + 2 roti", protein: 26, baseKcal: 510 },
      { items: "Paneer tikka + dal + 1 roti", protein: 34, baseKcal: 520 },
      { items: "Soya keema + 2 phulka", protein: 32, baseKcal: 500 },
    ],
    snack: [
      { items: "Roasted chana + green tea", protein: 12, baseKcal: 220 },
      { items: "Sprouts chaat", protein: 14, baseKcal: 200 },
      { items: "Greek yogurt + handful almonds", protein: 15, baseKcal: 230 },
      { items: "Masala buttermilk + nuts", protein: 10, baseKcal: 180 },
      { items: "Roasted makhana + tea", protein: 8, baseKcal: 190 },
      { items: "Protein smoothie (banana + milk + whey)", protein: 22, baseKcal: 250 },
      { items: "Fruit bowl + curd", protein: 10, baseKcal: 200 },
    ],
  },
  Eggetarian: {
    breakfast: [
      { items: "3-egg masala omelette + 2 multigrain toast", protein: 28, baseKcal: 450 },
      { items: "Boiled eggs (2) + besan chilla + curd", protein: 30, baseKcal: 460 },
      { items: "Egg bhurji + paratha", protein: 28, baseKcal: 480 },
      { items: "Oats with milk + 2 boiled eggs", protein: 26, baseKcal: 430 },
      { items: "Paneer paratha + boiled egg", protein: 28, baseKcal: 480 },
      { items: "Veg upma + 2 boiled eggs", protein: 24, baseKcal: 430 },
      { items: "Egg & veg sandwich (multigrain)", protein: 26, baseKcal: 440 },
    ],
    lunch: [
      { items: "2 roti + egg curry + salad", protein: 30, baseKcal: 580 },
      { items: "Rajma + jeera rice + boiled egg", protein: 30, baseKcal: 600 },
      { items: "Dal + 2 roti + egg bhurji + curd", protein: 32, baseKcal: 580 },
      { items: "Chole + rice + boiled egg + salad", protein: 30, baseKcal: 610 },
      { items: "Veg pulao + raita + 2 boiled eggs", protein: 28, baseKcal: 600 },
      { items: "Khichdi + curd + boiled eggs", protein: 28, baseKcal: 560 },
      { items: "Egg curry + brown rice + salad", protein: 32, baseKcal: 590 },
    ],
    dinner: [
      { items: "Paneer bhurji + 2 phulka + egg whites (3)", protein: 36, baseKcal: 540 },
      { items: "Egg curry + 2 roti + dal", protein: 34, baseKcal: 530 },
      { items: "Soya chunk curry + brown rice", protein: 34, baseKcal: 540 },
      { items: "Palak paneer + 2 phulka + boiled egg", protein: 34, baseKcal: 560 },
      { items: "Mix veg + dal + 2 roti + boiled egg", protein: 30, baseKcal: 540 },
      { items: "Egg bhurji + 2 phulka + salad", protein: 30, baseKcal: 500 },
      { items: "Soya keema + 2 phulka + boiled egg", protein: 36, baseKcal: 520 },
    ],
    snack: [
      { items: "Boiled eggs (2) + green tea", protein: 12, baseKcal: 160 },
      { items: "Sprouts chaat + 1 boiled egg", protein: 18, baseKcal: 230 },
      { items: "Greek yogurt + almonds", protein: 15, baseKcal: 230 },
      { items: "Egg white omelette + toast", protein: 18, baseKcal: 220 },
      { items: "Roasted makhana + boiled egg", protein: 12, baseKcal: 220 },
      { items: "Protein smoothie (banana + milk)", protein: 22, baseKcal: 250 },
      { items: "Fruit bowl + curd + boiled egg", protein: 18, baseKcal: 240 },
    ],
  },
  "Non-Vegetarian": {
    breakfast: [
      { items: "3-egg omelette + grilled chicken (50g) + toast", protein: 36, baseKcal: 470 },
      { items: "Chicken keema paratha + curd", protein: 32, baseKcal: 490 },
      { items: "Boiled eggs (3) + oats with milk", protein: 32, baseKcal: 460 },
      { items: "Egg bhurji + multigrain toast + curd", protein: 30, baseKcal: 450 },
      { items: "Chicken sandwich + boiled egg", protein: 34, baseKcal: 480 },
      { items: "Egg masala + 2 phulka", protein: 28, baseKcal: 440 },
      { items: "Greek yogurt + nuts + 2 boiled eggs", protein: 30, baseKcal: 420 },
    ],
    lunch: [
      { items: "Grilled chicken (120g) + 2 roti + salad", protein: 42, baseKcal: 600 },
      { items: "Fish curry + rice + cucumber salad", protein: 38, baseKcal: 610 },
      { items: "Chicken curry + jeera rice + raita", protein: 40, baseKcal: 620 },
      { items: "Egg curry + 2 roti + dal", protein: 32, baseKcal: 580 },
      { items: "Chicken biryani (portion) + raita", protein: 36, baseKcal: 640 },
      { items: "Tandoori chicken + 2 phulka + salad", protein: 44, baseKcal: 590 },
      { items: "Fish tikka + brown rice + dal", protein: 40, baseKcal: 600 },
    ],
    dinner: [
      { items: "Grilled fish (150g) + sautéed veg + 1 roti", protein: 42, baseKcal: 540 },
      { items: "Chicken stew + 2 phulka", protein: 40, baseKcal: 520 },
      { items: "Egg curry + 2 roti + dal", protein: 32, baseKcal: 530 },
      { items: "Chicken tikka + dal + 1 roti", protein: 42, baseKcal: 540 },
      { items: "Fish curry + 1 roti + salad", protein: 38, baseKcal: 510 },
      { items: "Chicken bhuna + 2 phulka", protein: 40, baseKcal: 530 },
      { items: "Egg bhurji + 2 phulka + soya", protein: 34, baseKcal: 520 },
    ],
    snack: [
      { items: "Boiled eggs (2) + green tea", protein: 12, baseKcal: 160 },
      { items: "Chicken salad cup", protein: 24, baseKcal: 240 },
      { items: "Greek yogurt + almonds", protein: 15, baseKcal: 230 },
      { items: "Tuna on multigrain crackers", protein: 22, baseKcal: 240 },
      { items: "Protein shake (whey + milk)", protein: 26, baseKcal: 220 },
      { items: "Roasted chana + boiled egg", protein: 18, baseKcal: 230 },
      { items: "Cottage cheese + fruit", protein: 18, baseKcal: 220 },
    ],
  },
};

function scaleMeal(t: MealTemplate, kcalTarget: number, name: string): Meal {
  const ratio = kcalTarget / t.baseKcal;
  return {
    name,
    items: t.items,
    kcal: Math.round(t.baseKcal * ratio),
    protein: Math.round(t.protein * Math.max(0.85, Math.min(1.25, ratio))),
  };
}

export function generateMealPlan(p: Profile): DayMeals[] {
  const total = calorieTarget(p);
  // Distribute: 25% breakfast, 35% lunch, 30% dinner, 10% snack
  const bK = Math.round(total * 0.25);
  const lK = Math.round(total * 0.35);
  const dK = Math.round(total * 0.30);
  const sK = total - bK - lK - dK;

  const pool = POOL[p.food];
  return DAYS.map((day, i) => ({
    day,
    breakfast: scaleMeal(pool.breakfast[i % pool.breakfast.length], bK, "Breakfast"),
    lunch: scaleMeal(pool.lunch[i % pool.lunch.length], lK, "Lunch"),
    dinner: scaleMeal(pool.dinner[i % pool.dinner.length], dK, "Dinner"),
    snack: scaleMeal(pool.snack[i % pool.snack.length], sK, "Snack"),
  }));
}

// ───────────────── Workout plan ─────────────────

export type Exercise = { name: string; sets: string };
export type Workout = { day: string; focus: string; exercises: Exercise[] };

const WORKOUTS: Record<Goal, Record<Equipment, Workout[]>> = {
  "Fat Loss": {
    "No equipment": [
      { day: "Monday", focus: "HIIT + Upper Body", exercises: [
        { name: "Jumping jacks", sets: "3 x 60s" },
        { name: "Push-ups", sets: "4 x 12" },
        { name: "Pike push-ups", sets: "3 x 10" },
        { name: "Tricep dips on chair", sets: "3 x 12" },
        { name: "Mountain climbers", sets: "3 x 40s" },
      ]},
      { day: "Tuesday", focus: "Lower Body Burn", exercises: [
        { name: "Bodyweight squats", sets: "4 x 20" },
        { name: "Reverse lunges", sets: "3 x 12 each" },
        { name: "Glute bridges", sets: "3 x 20" },
        { name: "Calf raises", sets: "3 x 25" },
        { name: "Jump squats", sets: "3 x 12" },
      ]},
      { day: "Wednesday", focus: "Active Recovery", exercises: [
        { name: "Brisk walk", sets: "40 min" },
        { name: "Yoga / mobility flow", sets: "15 min" },
      ]},
      { day: "Thursday", focus: "Core + Cardio", exercises: [
        { name: "Plank", sets: "3 x 45s" },
        { name: "Bicycle crunches", sets: "3 x 20" },
        { name: "Russian twists", sets: "3 x 30" },
        { name: "High knees", sets: "4 x 45s" },
        { name: "Burpees", sets: "3 x 10" },
      ]},
      { day: "Friday", focus: "Full Body HIIT", exercises: [
        { name: "Burpees", sets: "4 x 10" },
        { name: "Push-ups", sets: "3 x 12" },
        { name: "Squat jumps", sets: "3 x 15" },
        { name: "Mountain climbers", sets: "3 x 45s" },
        { name: "Plank to push-up", sets: "3 x 10" },
      ]},
      { day: "Saturday", focus: "Long Cardio + Core", exercises: [
        { name: "Brisk walk / jog", sets: "45 min" },
        { name: "Plank", sets: "3 x 60s" },
        { name: "Leg raises", sets: "3 x 15" },
      ]},
      { day: "Sunday", focus: "Rest", exercises: [
        { name: "Light walk / stretch", sets: "20 min" },
      ]},
    ],
    Dumbbells: [
      { day: "Monday", focus: "Push + Conditioning", exercises: [
        { name: "Dumbbell bench press (floor)", sets: "4 x 10" },
        { name: "Dumbbell shoulder press", sets: "3 x 12" },
        { name: "Tricep extensions", sets: "3 x 12" },
        { name: "Push-ups", sets: "3 x 15" },
        { name: "Mountain climbers", sets: "3 x 40s" },
      ]},
      { day: "Tuesday", focus: "Lower Body Strength", exercises: [
        { name: "Goblet squats", sets: "4 x 12" },
        { name: "Dumbbell Romanian deadlift", sets: "4 x 10" },
        { name: "Reverse lunges (DB)", sets: "3 x 12 each" },
        { name: "Calf raises (DB)", sets: "3 x 20" },
      ]},
      { day: "Wednesday", focus: "Active Recovery", exercises: [
        { name: "Brisk walk", sets: "40 min" },
        { name: "Mobility flow", sets: "15 min" },
      ]},
      { day: "Thursday", focus: "Pull + Core", exercises: [
        { name: "Dumbbell bent-over rows", sets: "4 x 12" },
        { name: "Dumbbell curls", sets: "3 x 12" },
        { name: "Renegade rows", sets: "3 x 10" },
        { name: "Plank", sets: "3 x 45s" },
        { name: "Russian twists (DB)", sets: "3 x 20" },
      ]},
      { day: "Friday", focus: "Full Body HIIT", exercises: [
        { name: "DB thrusters", sets: "4 x 10" },
        { name: "DB swings", sets: "3 x 15" },
        { name: "Burpees", sets: "3 x 10" },
        { name: "Squat jumps", sets: "3 x 15" },
      ]},
      { day: "Saturday", focus: "Long Cardio + Core", exercises: [
        { name: "Brisk walk / jog", sets: "45 min" },
        { name: "Plank", sets: "3 x 60s" },
        { name: "Leg raises", sets: "3 x 15" },
      ]},
      { day: "Sunday", focus: "Rest", exercises: [{ name: "Stretch / walk", sets: "20 min" }]},
    ],
  },
  "Muscle Gain": {
    "No equipment": [
      { day: "Monday", focus: "Push (Chest, Shoulders, Triceps)", exercises: [
        { name: "Push-ups (slow tempo)", sets: "5 x 12" },
        { name: "Decline push-ups", sets: "4 x 10" },
        { name: "Pike push-ups", sets: "4 x 10" },
        { name: "Tricep dips on chair", sets: "4 x 12" },
      ]},
      { day: "Tuesday", focus: "Legs", exercises: [
        { name: "Bulgarian split squats", sets: "4 x 10 each" },
        { name: "Single-leg glute bridge", sets: "4 x 12 each" },
        { name: "Wall sit", sets: "3 x 60s" },
        { name: "Calf raises (single leg)", sets: "4 x 15 each" },
      ]},
      { day: "Wednesday", focus: "Rest / Mobility", exercises: [
        { name: "Yoga + foam roll", sets: "25 min" },
      ]},
      { day: "Thursday", focus: "Pull (Back, Biceps)", exercises: [
        { name: "Doorway rows / towel rows", sets: "5 x 12" },
        { name: "Superman holds", sets: "4 x 30s" },
        { name: "Reverse snow angels", sets: "3 x 15" },
        { name: "Isometric bicep holds", sets: "3 x 30s" },
      ]},
      { day: "Friday", focus: "Lower Body + Core", exercises: [
        { name: "Pistol squat progressions", sets: "4 x 8 each" },
        { name: "Glute bridge march", sets: "3 x 12 each" },
        { name: "Hollow body hold", sets: "3 x 30s" },
        { name: "Leg raises", sets: "3 x 15" },
      ]},
      { day: "Saturday", focus: "Full Body", exercises: [
        { name: "Push-ups", sets: "4 x 15" },
        { name: "Squats (slow)", sets: "4 x 20" },
        { name: "Plank to push-up", sets: "3 x 10" },
        { name: "Glute bridges", sets: "3 x 20" },
      ]},
      { day: "Sunday", focus: "Rest", exercises: [{ name: "Walk / stretch", sets: "20 min" }]},
    ],
    Dumbbells: [
      { day: "Monday", focus: "Push (Chest, Shoulders, Triceps)", exercises: [
        { name: "Dumbbell bench press", sets: "5 x 8" },
        { name: "Dumbbell shoulder press", sets: "4 x 10" },
        { name: "DB lateral raises", sets: "4 x 12" },
        { name: "Overhead tricep extension", sets: "3 x 12" },
      ]},
      { day: "Tuesday", focus: "Legs", exercises: [
        { name: "Goblet squats", sets: "5 x 8" },
        { name: "DB Romanian deadlift", sets: "5 x 8" },
        { name: "Walking lunges (DB)", sets: "4 x 12 each" },
        { name: "Calf raises (DB)", sets: "4 x 15" },
      ]},
      { day: "Wednesday", focus: "Rest / Mobility", exercises: [
        { name: "Yoga + foam roll", sets: "25 min" },
      ]},
      { day: "Thursday", focus: "Pull (Back, Biceps)", exercises: [
        { name: "DB bent-over rows", sets: "5 x 8" },
        { name: "DB single-arm row", sets: "4 x 10 each" },
        { name: "DB curls", sets: "4 x 10" },
        { name: "Hammer curls", sets: "3 x 12" },
      ]},
      { day: "Friday", focus: "Legs + Core", exercises: [
        { name: "DB front squats", sets: "4 x 10" },
        { name: "DB step-ups", sets: "3 x 12 each" },
        { name: "DB Russian twists", sets: "3 x 20" },
        { name: "Plank", sets: "3 x 60s" },
      ]},
      { day: "Saturday", focus: "Full Body", exercises: [
        { name: "DB thrusters", sets: "4 x 10" },
        { name: "Renegade rows", sets: "3 x 10" },
        { name: "DB swings", sets: "3 x 15" },
        { name: "Push-ups", sets: "3 x 15" },
      ]},
      { day: "Sunday", focus: "Rest", exercises: [{ name: "Walk / stretch", sets: "20 min" }]},
    ],
  },
};

export function generateWorkoutPlan(p: Profile): Workout[] {
  return WORKOUTS[p.goal][p.equipment];
}

// ───────────────── Protein food suggestions ─────────────────

export const PROTEIN_FOODS: Record<Food, { name: string; protein: number }[]> = {
  Vegetarian: [
    { name: "Paneer (100g)", protein: 18 },
    { name: "Moong dal cooked (1 bowl)", protein: 14 },
    { name: "Curd (1 bowl)", protein: 11 },
    { name: "Soya chunks (50g dry)", protein: 26 },
    { name: "Roasted chana (50g)", protein: 11 },
    { name: "Peanuts (30g)", protein: 8 },
    { name: "Tofu (100g)", protein: 10 },
    { name: "Whey protein (1 scoop)", protein: 24 },
  ],
  Eggetarian: [
    { name: "Boiled eggs (2)", protein: 12 },
    { name: "Egg whites (4)", protein: 14 },
    { name: "Paneer (100g)", protein: 18 },
    { name: "Curd (1 bowl)", protein: 11 },
    { name: "Soya chunks (50g dry)", protein: 26 },
    { name: "Greek yogurt (150g)", protein: 15 },
    { name: "Tofu (100g)", protein: 10 },
    { name: "Whey protein (1 scoop)", protein: 24 },
  ],
  "Non-Vegetarian": [
    { name: "Chicken breast (100g)", protein: 31 },
    { name: "Fish (100g)", protein: 22 },
    { name: "Boiled eggs (2)", protein: 12 },
    { name: "Egg whites (4)", protein: 14 },
    { name: "Paneer (100g)", protein: 18 },
    { name: "Greek yogurt (150g)", protein: 15 },
    { name: "Tuna (canned, 100g)", protein: 26 },
    { name: "Whey protein (1 scoop)", protein: 24 },
  ],
};
