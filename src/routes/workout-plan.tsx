import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { workoutPlan } from "@/lib/mock-data";
import { Dumbbell, Home } from "lucide-react";

export const Route = createFileRoute("/workout-plan")({
  head: () => ({ meta: [{ title: "Workout Plan — SwasthyaX" }, { name: "description", content: "Your 7-day home workout plan." }] }),
  component: WorkoutPlan,
});

function WorkoutPlan() {
  return (
    <AppShell title="7-Day Workout Plan">
      <p className="text-muted-foreground -mt-4 mb-6 inline-flex items-center gap-2">
        <Home className="h-4 w-4" /> Home workouts · optional dumbbells
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {workoutPlan.map((d) => (
          <div key={d.day} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-xs text-muted-foreground">{d.day}</div>
                <h3 className="font-semibold">{d.focus}</h3>
              </div>
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-brand-soft text-brand">
                <Dumbbell className="h-4 w-4" />
              </div>
            </div>
            <ul className="space-y-2 mt-2">
              {d.exercises.map((e) => (
                <li key={e.name} className="flex items-center justify-between text-sm border-t border-border pt-2 first:border-0 first:pt-0">
                  <span>{e.name}</span>
                  <span className="text-muted-foreground font-medium">{e.sets}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
