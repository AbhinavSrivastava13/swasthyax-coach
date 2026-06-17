export const user = {
  name: "Arjun Sharma",
  age: 28,
  gender: "Male",
  height: 175,
  weight: 78,
  goalWeight: 72,
  goal: "Fat Loss" as const,
  timelineWeeks: 12,
  workMode: "Hybrid",
  activity: "Lightly Active",
  food: "Vegetarian",
  budget: 250,
  calorieTarget: 1900,
  proteinTarget: 130,
  currentProtein: 78,
  waterToday: 1.8,
};

export const weeklyProgress = [
  { day: "Mon", weight: 78.4 },
  { day: "Tue", weight: 78.2 },
  { day: "Wed", weight: 78.1 },
  { day: "Thu", weight: 77.9 },
  { day: "Fri", weight: 77.8 },
  { day: "Sat", weight: 77.6 },
  { day: "Sun", weight: 77.5 },
];

export type Meal = { name: string; items: string; kcal: number; protein: number };
export type DayMeals = { day: string; breakfast: Meal; lunch: Meal; dinner: Meal; snack: Meal };

export const mealPlan: DayMeals[] = [
  {
    day: "Monday",
    breakfast: { name: "Breakfast", items: "Moong dal chilla + mint chutney + curd", kcal: 420, protein: 24 },
    lunch: { name: "Lunch", items: "2 roti + rajma + salad + curd", kcal: 560, protein: 28 },
    dinner: { name: "Dinner", items: "Paneer bhurji + 2 phulka + sautéed veggies", kcal: 520, protein: 32 },
    snack: { name: "Snack", items: "Roasted chana + green tea", kcal: 220, protein: 12 },
  },
  {
    day: "Tuesday",
    breakfast: { name: "Breakfast", items: "Besan chilla + paneer stuffing", kcal: 430, protein: 26 },
    lunch: { name: "Lunch", items: "Chole + jeera rice + cucumber salad", kcal: 580, protein: 26 },
    dinner: { name: "Dinner", items: "Tofu bhurji + 2 roti + dal", kcal: 510, protein: 30 },
    snack: { name: "Snack", items: "Sprouts chaat", kcal: 200, protein: 14 },
  },
  {
    day: "Wednesday",
    breakfast: { name: "Breakfast", items: "Oats upma + boiled eggs / soya", kcal: 410, protein: 22 },
    lunch: { name: "Lunch", items: "2 roti + dal tadka + bhindi + curd", kcal: 550, protein: 24 },
    dinner: { name: "Dinner", items: "Soya chunk curry + brown rice", kcal: 540, protein: 34 },
    snack: { name: "Snack", items: "Greek yogurt + handful almonds", kcal: 230, protein: 15 },
  },
  {
    day: "Thursday",
    breakfast: { name: "Breakfast", items: "Vegetable poha + peanuts + curd", kcal: 400, protein: 18 },
    lunch: { name: "Lunch", items: "Rajma chawal + salad", kcal: 600, protein: 26 },
    dinner: { name: "Dinner", items: "Palak paneer + 2 phulka", kcal: 530, protein: 30 },
    snack: { name: "Snack", items: "Masala buttermilk + nuts", kcal: 180, protein: 10 },
  },
  {
    day: "Friday",
    breakfast: { name: "Breakfast", items: "Paneer paratha + curd", kcal: 460, protein: 24 },
    lunch: { name: "Lunch", items: "Dal khichdi + curd + papad", kcal: 540, protein: 22 },
    dinner: { name: "Dinner", items: "Mix veg + chana dal + 2 roti", kcal: 510, protein: 26 },
    snack: { name: "Snack", items: "Roasted makhana + tea", kcal: 190, protein: 8 },
  },
  {
    day: "Saturday",
    breakfast: { name: "Breakfast", items: "Idli + sambhar + coconut chutney", kcal: 420, protein: 18 },
    lunch: { name: "Lunch", items: "Veg biryani + raita", kcal: 620, protein: 22 },
    dinner: { name: "Dinner", items: "Paneer tikka + dal + 1 roti", kcal: 520, protein: 34 },
    snack: { name: "Snack", items: "Protein smoothie (banana + milk)", kcal: 240, protein: 18 },
  },
  {
    day: "Sunday",
    breakfast: { name: "Breakfast", items: "Masala omelette / besan chilla + toast", kcal: 440, protein: 26 },
    lunch: { name: "Lunch", items: "2 roti + kadhi + chawal + salad", kcal: 560, protein: 22 },
    dinner: { name: "Dinner", items: "Soya keema + 2 phulka", kcal: 500, protein: 32 },
    snack: { name: "Snack", items: "Fruit bowl + curd", kcal: 200, protein: 10 },
  },
];

export type Workout = { day: string; focus: string; exercises: { name: string; sets: string }[] };
export const workoutPlan: Workout[] = [
  { day: "Monday", focus: "Upper Body (Push)", exercises: [
    { name: "Push-ups", sets: "4 x 12" },
    { name: "Pike push-ups", sets: "3 x 10" },
    { name: "Dumbbell shoulder press (optional)", sets: "3 x 12" },
    { name: "Tricep dips on chair", sets: "3 x 12" },
  ]},
  { day: "Tuesday", focus: "Lower Body", exercises: [
    { name: "Bodyweight squats", sets: "4 x 15" },
    { name: "Reverse lunges", sets: "3 x 12 each" },
    { name: "Glute bridges", sets: "3 x 15" },
    { name: "Calf raises", sets: "3 x 20" },
  ]},
  { day: "Wednesday", focus: "Active Recovery", exercises: [
    { name: "Brisk walk", sets: "30 min" },
    { name: "Yoga / mobility flow", sets: "15 min" },
  ]},
  { day: "Thursday", focus: "Upper Body (Pull)", exercises: [
    { name: "Doorway rows / towel rows", sets: "4 x 12" },
    { name: "Superman holds", sets: "3 x 30s" },
    { name: "Dumbbell bicep curls (optional)", sets: "3 x 12" },
    { name: "Reverse snow angels", sets: "3 x 15" },
  ]},
  { day: "Friday", focus: "Core & HIIT", exercises: [
    { name: "Plank", sets: "3 x 45s" },
    { name: "Mountain climbers", sets: "3 x 40s" },
    { name: "Bicycle crunches", sets: "3 x 20" },
    { name: "Jumping jacks", sets: "3 x 60s" },
  ]},
  { day: "Saturday", focus: "Full Body Strength", exercises: [
    { name: "Squat to press (dumbbell)", sets: "4 x 10" },
    { name: "Push-ups", sets: "3 x 12" },
    { name: "Romanian deadlift (dumbbell)", sets: "3 x 12" },
    { name: "Plank to push-up", sets: "3 x 10" },
  ]},
  { day: "Sunday", focus: "Rest", exercises: [
    { name: "Light walk / stretch", sets: "20 min" },
  ]},
];

export const proteinFoods = [
  { name: "Paneer (100g)", protein: 18 },
  { name: "Moong dal cooked (1 bowl)", protein: 14 },
  { name: "Curd (1 bowl)", protein: 11 },
  { name: "Soya chunks (50g dry)", protein: 26 },
  { name: "Boiled eggs (2)", protein: 12 },
  { name: "Roasted chana (50g)", protein: 11 },
  { name: "Peanuts (30g)", protein: 8 },
  { name: "Tofu (100g)", protein: 10 },
];
