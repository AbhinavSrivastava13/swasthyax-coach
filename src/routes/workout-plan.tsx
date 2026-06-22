import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { AppShell } from "@/components/AppShell";
import { Dumbbell, Home } from "lucide-react";
import { useProfile } from "@/lib/profile";
import { generateWorkoutPlan } from "@/lib/generators";

export const Route = createFileRoute("/workout-plan")({
  head: () => ({ meta: [{ title: "Workout Plan — SwasthyaX" }, { name: "description", content: "Your personalised 7-day home workout plan." }] }),
  component: WorkoutPlan,
});

function WorkoutPlan() {
  const { profile } = useProfile();
  const plan = useMemo(() => (profile ? generateWorkoutPlan(profile) : []), [profile]);

  if (!profile) return <AppShell title="Workout Plan">{null}</AppShell>;

  return (
    <AppShell
      title="Your 7-Day Workout Plan"
      subtitle={`${profile.goal} · ${profile.equipment === "Dumbbells" ? "With dumbbells" : "Bodyweight only"} · home-friendly.`}
    >
      <p className="text-muted-foreground -mt-6 mb-7 inline-flex items-center gap-2 text-base">
        <Home className="h-4 w-4" /> Designed for {profile.equipment === "Dumbbells" ? "a pair of adjustable dumbbells" : "zero equipment"}.
      </p>

      <div className="grid md:grid-cols-2 gap-5">
        {plan.map((d) => (
          <div key={d.day} className="rounded-2xl border border-border bg-gradient-surface p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{d.day}</div>
                <h3 className="font-display text-lg font-bold mt-1">{d.focus}</h3>
              </div>
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand text-brand-foreground shadow-glow">
                <Dumbbell className="h-5 w-5" />
              </div>
            </div>
            <ul className="space-y-2.5 mt-3">
              {d.exercises.map((e, i) => (
                <li key={e.name} className="flex items-center justify-between text-[15px] border-t border-border pt-3 first:border-0 first:pt-0">
                  <span className="flex items-center gap-3">
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand/15 text-xs font-bold text-brand-glow">{i + 1}</span>
                    {e.name}
                  </span>
                  <span className="text-sm text-muted-foreground font-semibold">{e.sets}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
