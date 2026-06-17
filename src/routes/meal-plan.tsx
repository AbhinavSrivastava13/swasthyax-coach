import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { mealPlan } from "@/lib/mock-data";
import { useState } from "react";
import { Flame, Beef } from "lucide-react";

export const Route = createFileRoute("/meal-plan")({
  head: () => ({ meta: [{ title: "Meal Plan — SwasthyaX" }, { name: "description", content: "Your 7-day Indian meal plan." }] }),
  component: MealPlan,
});

function MealPlan() {
  const [active, setActive] = useState(0);
  const day = mealPlan[active];
  const totalKcal = day.breakfast.kcal + day.lunch.kcal + day.dinner.kcal + day.snack.kcal;
  const totalProtein = day.breakfast.protein + day.lunch.protein + day.dinner.protein + day.snack.protein;

  return (
    <AppShell title="7-Day Meal Plan">
      <p className="text-muted-foreground -mt-4 mb-6">Indian meals planned around your budget and protein target.</p>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-1 px-1">
        {mealPlan.map((d, i) => (
          <button key={d.day} onClick={() => setActive(i)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap border transition-colors ${
              i === active ? "bg-brand text-brand-foreground border-brand" : "bg-card border-border hover:bg-accent"
            }`}>
            {d.day.slice(0, 3)}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div className="rounded-2xl border border-border bg-card p-5 flex items-center gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-soft text-brand"><Flame className="h-5 w-5" /></div>
          <div><div className="text-xs text-muted-foreground">Total calories</div><div className="text-xl font-bold">{totalKcal} kcal</div></div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 flex items-center gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-soft text-brand"><Beef className="h-5 w-5" /></div>
          <div><div className="text-xs text-muted-foreground">Total protein</div><div className="text-xl font-bold">{totalProtein} g</div></div>
        </div>
      </div>

      <div className="space-y-4">
        {([day.breakfast, day.lunch, day.dinner, day.snack]).map((m) => (
          <div key={m.name} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="text-xs font-semibold text-brand uppercase tracking-wide">{m.name}</div>
                <p className="mt-1 font-medium">{m.items}</p>
              </div>
              <div className="shrink-0 text-right text-sm">
                <div className="font-semibold">{m.kcal} kcal</div>
                <div className="text-muted-foreground">{m.protein} g protein</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
