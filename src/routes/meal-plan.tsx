import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useState, useMemo } from "react";
import { Flame, Beef } from "lucide-react";
import { useProfile } from "@/lib/profile";
import { generateMealPlan } from "@/lib/generators";

export const Route = createFileRoute("/meal-plan")({
  head: () => ({ meta: [{ title: "Meal Plan — SwasthyaX" }, { name: "description", content: "Your personalised 7-day Indian meal plan." }] }),
  component: MealPlan,
});

function MealPlan() {
  const { profile } = useProfile();
  const [active, setActive] = useState(0);

  const mealPlan = useMemo(() => (profile ? generateMealPlan(profile) : []), [profile]);

  if (!profile || mealPlan.length === 0) {
    return <AppShell title="Meal Plan">{null}</AppShell>;
  }

  const day = mealPlan[active];
  const totalKcal = day.breakfast.kcal + day.lunch.kcal + day.dinner.kcal + day.snack.kcal;
  const totalProtein = day.breakfast.protein + day.lunch.protein + day.dinner.protein + day.snack.protein;

  return (
    <AppShell
      title="Your 7-Day Meal Plan"
      subtitle={`${profile.food} · built around your ${profile.goal.toLowerCase()} goal and daily calorie target.`}
    >
      <div className="flex gap-2 overflow-x-auto pb-2 mb-7 -mx-1 px-1">
        {mealPlan.map((d, i) => (
          <button key={d.day} onClick={() => setActive(i)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap border transition-all ${
              i === active ? "bg-gradient-brand text-brand-foreground border-transparent shadow-glow" : "bg-card border-border hover:bg-accent"
            }`}>
            {d.day.slice(0, 3)}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-7">
        <div className="rounded-2xl border border-border bg-gradient-surface p-6 flex items-center gap-5 shadow-card">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand/15 text-brand-glow"><Flame className="h-6 w-6" /></div>
          <div>
            <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Total calories</div>
            <div className="text-2xl font-display font-bold mt-1">{totalKcal} kcal</div>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-gradient-surface p-6 flex items-center gap-5 shadow-card">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand/15 text-brand-glow"><Beef className="h-6 w-6" /></div>
          <div>
            <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Total protein</div>
            <div className="text-2xl font-display font-bold mt-1">{totalProtein} g</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {[day.breakfast, day.lunch, day.dinner, day.snack].map((m) => (
          <div key={m.name} className="rounded-2xl border border-border bg-gradient-surface p-6 shadow-card">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="text-xs font-bold text-brand-glow uppercase tracking-wider">{m.name}</div>
                <p className="mt-2 text-lg font-medium leading-snug">{m.items}</p>
              </div>
              <div className="shrink-0 text-right">
                <div className="font-display text-lg font-bold">{m.kcal} kcal</div>
                <div className="text-sm text-muted-foreground mt-0.5">{m.protein} g protein</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
