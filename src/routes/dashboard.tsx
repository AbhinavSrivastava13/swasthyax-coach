import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { user, weeklyProgress, workoutPlan } from "@/lib/mock-data";
import { Scale, Flame, Dumbbell, ArrowRight, TrendingDown, UtensilsCrossed, ClipboardCheck, Beef, ChevronRight, Zap } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — SwasthyaX" }, { name: "description", content: "Your personalized fitness dashboard." }] }),
  component: Dashboard,
});

function ProgressRing({ value, size = 64, stroke = 6 }: { value: number; size?: number; stroke?: number }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(value, 100) / 100) * c;
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.18)" strokeWidth={stroke} fill="transparent" />
        <circle cx={size / 2} cy={size / 2} r={r} stroke="white" strokeWidth={stroke} fill="transparent" strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <span className="absolute text-[10px] font-bold text-white">{Math.round(value)}%</span>
    </div>
  );
}

function Dashboard() {
  const today = workoutPlan[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1] ?? workoutPlan[0];
  const max = Math.max(...weeklyProgress.map((p) => p.weight));
  const min = Math.min(...weeklyProgress.map((p) => p.weight));
  const proteinPct = (user.currentProtein / user.proteinTarget) * 100;
  const weightProgress = Math.min(100, Math.max(0, ((80 - user.weight) / (80 - user.goalWeight)) * 100));
  const totalMins = today.exercises.length * 10;

  return (
    <AppShell title={`Hi ${user.name.split(" ")[0]} 👋`}>
      <p className="text-muted-foreground mb-8 text-sm md:text-base">Here's your performance snapshot today.</p>

      {/* KPI grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Weight */}
        <div className="bg-card/60 border border-border p-5 rounded-3xl backdrop-blur">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Weight</span>
            <span className="text-[10px] font-bold bg-success/15 text-success px-1.5 py-0.5 rounded">-2 kg</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold">{user.weight}</span>
            <span className="text-sm text-muted-foreground font-medium">kg</span>
          </div>
          <div className="mt-3 h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-brand rounded-full" style={{ width: `${weightProgress}%` }} />
          </div>
        </div>

        {/* Calories */}
        <div className="bg-card/60 border border-border p-5 rounded-3xl flex flex-col justify-between backdrop-blur">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Calories</span>
            <Flame className="h-4 w-4 text-orange-500" />
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold">{user.calorieTarget.toLocaleString()}</div>
            <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight mt-1">daily target</div>
          </div>
        </div>

        {/* Goal weight */}
        <div className="bg-card/60 border border-border p-5 rounded-3xl backdrop-blur">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Goal</span>
            <Scale className="h-4 w-4 text-brand" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold">{user.goalWeight}</span>
            <span className="text-sm text-muted-foreground font-medium">kg</span>
          </div>
          <div className="text-[10px] text-muted-foreground mt-2 font-medium">{user.timelineWeeks} week timeline</div>
        </div>

        {/* Protein hero */}
        <div className="col-span-2 lg:col-span-1 bg-gradient-to-br from-brand to-indigo-700 p-5 rounded-3xl shadow-xl shadow-brand/20 relative overflow-hidden text-brand-foreground">
          <div className="relative z-10 flex justify-between items-center gap-3">
            <div>
              <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Protein</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-bold">{user.currentProtein}</span>
                <span className="text-sm text-white/80 font-medium">/ {user.proteinTarget}g</span>
              </div>
            </div>
            <ProgressRing value={proteinPct} />
          </div>
          <Zap className="absolute -right-3 -bottom-3 h-24 w-24 opacity-10" />
        </div>
      </section>

      {/* Today's workout + trend */}
      <section className="grid lg:grid-cols-3 gap-4 mt-6">
        <div className="lg:col-span-1 bg-card border border-border rounded-3xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Today's Plan</h2>
            <Link to="/workout-plan" className="text-brand text-sm font-bold inline-flex items-center gap-1">See full <ArrowRight className="h-3.5 w-3.5" /></Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-success/10 rounded-2xl grid place-items-center shrink-0">
              <Dumbbell className="h-5 w-5 text-success" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold truncate">{today.focus}</h3>
              <p className="text-xs text-muted-foreground font-medium">Day {today.day} focus</p>
            </div>
            <span className="text-xs font-bold text-muted-foreground shrink-0">{totalMins}m</span>
          </div>
          <ul className="mt-4 space-y-3 pt-4 border-t border-border">
            {today.exercises.slice(0, 4).map((e) => (
              <li key={e.name} className="flex justify-between items-center text-sm">
                <span className="text-foreground/90">{e.name}</span>
                <span className="text-muted-foreground font-medium">{e.sets}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weekly chart */}
        <div className="lg:col-span-2 bg-card border border-border rounded-3xl p-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold">Weight Trend</h2>
              <p className="text-xs text-muted-foreground font-medium mt-0.5">Last 7 days</p>
            </div>
            <span className="inline-flex items-center gap-1 text-success text-xs font-bold bg-success/10 px-2.5 py-1 rounded-full">
              <TrendingDown className="h-3.5 w-3.5" /> -0.9 kg
            </span>
          </div>
          <div className="h-40 w-full flex items-end justify-between gap-2">
            {weeklyProgress.map((p, i) => {
              const h = ((p.weight - min + 0.2) / (max - min + 0.4)) * 100;
              const isLast = i === weeklyProgress.length - 1;
              return (
                <div key={p.day} className="flex-1 flex flex-col items-center gap-2 h-full">
                  <div className="w-full flex-1 flex items-end">
                    <div
                      className={`w-full rounded-t-lg transition-all ${isLast ? "bg-brand shadow-[0_0_20px_rgba(59,130,246,0.35)]" : "bg-muted hover:bg-brand/40"}`}
                      style={{ height: `${Math.max(15, h)}%` }}
                    />
                  </div>
                  <span className={`text-[10px] font-bold ${isLast ? "text-brand" : "text-muted-foreground"}`}>{p.day}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="grid sm:grid-cols-3 gap-3 mt-6">
        {[
          { to: "/meal-plan", icon: UtensilsCrossed, label: "Meal plan", desc: "This week's Indian meals", tone: "text-orange-400 bg-orange-500/10" },
          { to: "/check-in", icon: ClipboardCheck, label: "Daily check-in", desc: "Log weight, water, workouts", tone: "text-brand bg-brand/10" },
          { to: "/protein-calculator", icon: Beef, label: "Protein gap", desc: `${user.proteinTarget - user.currentProtein} g remaining today`, tone: "text-purple-400 bg-purple-500/10" },
        ].map(({ to, icon: Icon, label, desc, tone }) => (
          <Link key={to} to={to} className="group flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:border-brand/50 transition-colors">
            <div className="flex items-center gap-4 min-w-0">
              <div className={`p-2.5 rounded-xl shrink-0 ${tone}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-sm truncate">{label}</p>
                <p className="text-[11px] text-muted-foreground truncate">{desc}</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-brand group-hover:translate-x-0.5 transition-all shrink-0" />
          </Link>
        ))}
      </section>
    </AppShell>
  );
}
