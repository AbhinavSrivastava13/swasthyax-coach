import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { user, weeklyProgress, workoutPlan } from "@/lib/mock-data";
import { Scale, Target, Flame, Beef, Dumbbell, ArrowRight, TrendingDown } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — SwasthyaX" }, { name: "description", content: "Your personalized fitness dashboard." }] }),
  component: Dashboard,
});

function Stat({ icon: Icon, label, value, sub, accent }: { icon: any; label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div className={`rounded-2xl border p-5 ${accent ? "bg-brand text-brand-foreground border-brand" : "bg-card border-border"}`}>
      <div className="flex items-center justify-between">
        <span className={`text-sm ${accent ? "opacity-90" : "text-muted-foreground"}`}>{label}</span>
        <Icon className={`h-4 w-4 ${accent ? "opacity-80" : "text-brand"}`} />
      </div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
      {sub && <div className={`text-xs mt-1 ${accent ? "opacity-80" : "text-muted-foreground"}`}>{sub}</div>}
    </div>
  );
}

function Dashboard() {
  const today = workoutPlan[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1] ?? workoutPlan[0];
  const max = Math.max(...weeklyProgress.map((p) => p.weight));
  const min = Math.min(...weeklyProgress.map((p) => p.weight));
  return (
    <AppShell title={`Hi ${user.name.split(" ")[0]} 👋`}>
      <p className="text-muted-foreground -mt-4 mb-6">Here's your snapshot for today.</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat icon={Scale} label="Current weight" value={`${user.weight} kg`} sub={`Started 80 kg`} />
        <Stat icon={Target} label="Goal weight" value={`${user.goalWeight} kg`} sub={`${user.timelineWeeks} weeks`} accent />
        <Stat icon={Flame} label="Calorie target" value={`${user.calorieTarget}`} sub="kcal / day" />
        <Stat icon={Beef} label="Protein target" value={`${user.proteinTarget} g`} sub={`${user.currentProtein} g logged today`} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mt-6">
        {/* Today's workout */}
        <div className="lg:col-span-1 rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Today's workout</h3>
            <Dumbbell className="h-4 w-4 text-brand" />
          </div>
          <p className="text-sm font-medium">{today.focus}</p>
          <ul className="mt-3 space-y-2">
            {today.exercises.slice(0, 4).map((e) => (
              <li key={e.name} className="flex items-center justify-between text-sm">
                <span>{e.name}</span>
                <span className="text-muted-foreground">{e.sets}</span>
              </li>
            ))}
          </ul>
          <Link to="/workout-plan" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand">
            See full plan <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Weekly progress chart */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Weekly progress</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Weight trend over the last 7 days</p>
            </div>
            <div className="inline-flex items-center gap-1 text-sm text-success font-medium">
              <TrendingDown className="h-4 w-4" /> -0.9 kg
            </div>
          </div>
          <div className="flex items-end gap-2 h-40 mt-4">
            {weeklyProgress.map((p) => {
              const h = ((p.weight - min + 0.2) / (max - min + 0.4)) * 100;
              return (
                <div key={p.day} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full rounded-t-md bg-brand/80 hover:bg-brand transition-colors" style={{ height: `${h}%` }} />
                  <span className="text-xs text-muted-foreground">{p.day}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mt-6">
        <Link to="/meal-plan" className="rounded-2xl border border-border bg-card p-5 hover:border-brand transition-colors">
          <h3 className="font-semibold">Meal plan</h3>
          <p className="text-sm text-muted-foreground mt-1">View this week's Indian meal plan.</p>
        </Link>
        <Link to="/check-in" className="rounded-2xl border border-border bg-card p-5 hover:border-brand transition-colors">
          <h3 className="font-semibold">Daily check-in</h3>
          <p className="text-sm text-muted-foreground mt-1">Log weight, water and workout.</p>
        </Link>
        <Link to="/protein-calculator" className="rounded-2xl border border-border bg-card p-5 hover:border-brand transition-colors">
          <h3 className="font-semibold">Protein gap</h3>
          <p className="text-sm text-muted-foreground mt-1">{user.proteinTarget - user.currentProtein} g remaining today.</p>
        </Link>
      </div>
    </AppShell>
  );
}
