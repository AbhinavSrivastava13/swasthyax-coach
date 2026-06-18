import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { user, weeklyProgress, workoutPlan, mealPlan } from "@/lib/mock-data";
import {
  Scale,
  Flame,
  Beef,
  Dumbbell,
  ArrowRight,
  TrendingDown,
  Droplets,
  Apple,
  Calendar,
  Sparkles,
  Trophy,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — SwasthyaX" },
      { name: "description", content: "Your personalized fitness dashboard." },
    ],
  }),
  component: Dashboard,
});

// ───────────────────────── Primitives ─────────────────────────

function Card({
  children,
  className = "",
  glow = false,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div
      className={`relative rounded-2xl border border-border bg-gradient-surface shadow-card overflow-hidden ${
        glow ? "shadow-glow" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

function ProgressRing({ value, max, size = 120, label }: { value: number; max: number; size?: number; label?: string }) {
  const pct = Math.min(100, (value / max) * 100);
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.62 0.22 275)" />
            <stop offset="100%" stopColor="oklch(0.75 0.20 305)" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="oklch(0.28 0.04 270)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="url(#ringGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          fill="none"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="font-display text-2xl font-bold leading-none">{Math.round(pct)}%</div>
          {label && <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">{label}</div>}
        </div>
      </div>
    </div>
  );
}

function Bar({ value, max, tone = "brand" }: { value: number; max: number; tone?: "brand" | "success" | "warning" }) {
  const pct = Math.min(100, (value / max) * 100);
  const grad =
    tone === "success"
      ? "linear-gradient(90deg, oklch(0.65 0.18 155), oklch(0.78 0.18 155))"
      : tone === "warning"
      ? "linear-gradient(90deg, oklch(0.70 0.16 80), oklch(0.82 0.16 80))"
      : "linear-gradient(90deg, oklch(0.62 0.22 275), oklch(0.75 0.20 305))";
  return (
    <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundImage: grad }} />
    </div>
  );
}

// ───────────────────────── Component ─────────────────────────

function Dashboard() {
  const todayIdx = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
  const today = workoutPlan[todayIdx] ?? workoutPlan[0];
  const todayMeals = mealPlan[todayIdx] ?? mealPlan[0];

  const max = Math.max(...weeklyProgress.map((p) => p.weight));
  const min = Math.min(...weeklyProgress.map((p) => p.weight));
  const startWeight = weeklyProgress[0].weight;
  const lostKg = (startWeight - weeklyProgress[weeklyProgress.length - 1].weight).toFixed(1);

  const proteinPct = (user.currentProtein / user.proteinTarget) * 100;
  const waterTarget = 3.5;

  // Sparkline path
  const w = 100;
  const h = 32;
  const points = weeklyProgress.map((p, i) => {
    const x = (i / (weeklyProgress.length - 1)) * w;
    const y = h - ((p.weight - min) / (max - min + 0.01)) * (h - 4) - 2;
    return `${x},${y}`;
  });

  return (
    <AppShell
      title={`Welcome back, ${user.name.split(" ")[0]}`}
      subtitle="You're 23% closer to your goal this week. Keep the momentum."
      actions={
        <Link
          to="/check-in"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground shadow-glow transition hover:opacity-95"
        >
          <Sparkles className="h-4 w-4" /> Log today
        </Link>
      }
    >
      {/* Bento grid */}
      <div className="grid grid-cols-12 gap-4 md:gap-5">
        {/* Hero stat — goal progress */}
        <Card glow className="col-span-12 lg:col-span-5 p-6">
          <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-glow">
              <Trophy className="h-3.5 w-3.5" /> Goal progress
            </div>
            <div className="mt-5 flex items-center gap-6">
              <ProgressRing value={startWeight - user.weight} max={startWeight - user.goalWeight} label="Complete" />
              <div className="flex-1">
                <div className="font-display text-4xl md:text-5xl font-bold tracking-tight">{user.weight}<span className="text-xl text-muted-foreground ml-1">kg</span></div>
                <p className="text-sm text-muted-foreground mt-1">Target {user.goalWeight} kg · {user.timelineWeeks} weeks</p>
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-success/15 px-2.5 py-1 text-xs font-semibold text-success">
                  <TrendingDown className="h-3.5 w-3.5" /> −{lostKg} kg this week
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Bar value={startWeight - user.weight} max={startWeight - user.goalWeight} />
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>Start · {startWeight} kg</span>
                <span>Goal · {user.goalWeight} kg</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Calories */}
        <Card className="col-span-6 lg:col-span-4 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Calories</p>
              <div className="mt-2 font-display text-3xl font-bold">{user.calorieTarget.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">target / day</p>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand/15 text-brand-glow">
              <Flame className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-5 space-y-2">
            <div className="flex justify-between text-xs"><span className="text-muted-foreground">Logged today</span><span className="font-medium">1,420 kcal</span></div>
            <Bar value={1420} max={user.calorieTarget} />
          </div>
        </Card>

        {/* Water */}
        <Card className="col-span-6 lg:col-span-3 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Hydration</p>
              <div className="mt-2 font-display text-3xl font-bold">{user.waterToday}L</div>
              <p className="text-xs text-muted-foreground mt-1">of {waterTarget}L goal</p>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand/15 text-brand-glow">
              <Droplets className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-5 flex gap-1.5">
            {Array.from({ length: 8 }).map((_, i) => {
              const filled = i < Math.round((user.waterToday / waterTarget) * 8);
              return <div key={i} className={`h-8 flex-1 rounded ${filled ? "bg-gradient-brand" : "bg-secondary"}`} />;
            })}
          </div>
        </Card>

        {/* Weekly progress chart */}
        <Card className="col-span-12 lg:col-span-7 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-semibold">Weight trend</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Last 7 days</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1 text-xs font-semibold text-success">
              <TrendingDown className="h-3.5 w-3.5" /> Down {lostKg} kg
            </div>
          </div>
          <div className="mt-6 grid grid-cols-7 gap-2 h-44">
            {weeklyProgress.map((p, i) => {
              const norm = (p.weight - min) / (max - min + 0.01);
              const h = 30 + (1 - norm) * 70;
              const isLast = i === weeklyProgress.length - 1;
              return (
                <div key={p.day} className="flex flex-col items-center justify-end gap-2">
                  <span className="text-[10px] font-medium text-muted-foreground">{p.weight}</span>
                  <div
                    className={`w-full rounded-t-lg transition-all ${isLast ? "bg-gradient-brand shadow-glow" : "bg-secondary"}`}
                    style={{ height: `${h}%` }}
                  />
                  <span className="text-[11px] text-muted-foreground">{p.day}</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Protein gap with ring + sparkline */}
        <Card className="col-span-12 lg:col-span-5 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-display text-lg font-semibold">Protein gap</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Daily target tracker</p>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand/15 text-brand-glow">
              <Beef className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-5 flex items-center gap-6">
            <ProgressRing value={user.currentProtein} max={user.proteinTarget} size={110} label="Hit" />
            <div className="flex-1 space-y-3">
              <div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Consumed</span><span className="font-semibold">{user.currentProtein}g</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Target</span><span className="font-semibold">{user.proteinTarget}g</span></div>
                <div className="flex justify-between text-sm mt-2 pt-2 border-t border-border"><span className="text-muted-foreground">Remaining</span><span className="font-bold text-brand-glow">{user.proteinTarget - user.currentProtein}g</span></div>
              </div>
              <Link to="/protein-calculator" className="inline-flex items-center gap-1 text-xs font-semibold text-brand-glow hover:underline">
                See food suggestions <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </Card>

        {/* Today's workout */}
        <Card className="col-span-12 md:col-span-6 lg:col-span-5 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-glow">
                <Calendar className="h-3 w-3" /> Today · {today.day}
              </div>
              <h3 className="mt-1 font-display text-lg font-semibold">{today.focus}</h3>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand text-brand-foreground">
              <Dumbbell className="h-5 w-5" />
            </div>
          </div>
          <ul className="space-y-2.5">
            {today.exercises.slice(0, 4).map((e, i) => (
              <li key={e.name} className="flex items-center justify-between rounded-xl border border-border bg-card/60 p-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="grid h-7 w-7 place-items-center rounded-lg bg-brand/15 text-xs font-bold text-brand-glow">{i + 1}</div>
                  <span className="font-medium">{e.name}</span>
                </div>
                <span className="text-xs text-muted-foreground font-medium">{e.sets}</span>
              </li>
            ))}
          </ul>
          <Link to="/workout-plan" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-glow hover:underline">
            See full plan <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Card>

        {/* Today's meals */}
        <Card className="col-span-12 md:col-span-6 lg:col-span-7 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-glow">
                <Apple className="h-3 w-3" /> Today's meals
              </div>
              <h3 className="mt-1 font-display text-lg font-semibold">{todayMeals.day}'s plan</h3>
            </div>
            <Link to="/meal-plan" className="text-xs font-semibold text-brand-glow hover:underline inline-flex items-center gap-1">
              Full week <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {[todayMeals.breakfast, todayMeals.lunch, todayMeals.dinner, todayMeals.snack].map((m) => (
              <div key={m.name} className="rounded-xl border border-border bg-card/60 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{m.name}</span>
                  <span className="text-xs font-bold text-brand-glow">{m.kcal} kcal</span>
                </div>
                <p className="mt-2 text-sm leading-snug">{m.items}</p>
                <div className="mt-3 flex items-center gap-1.5">
                  <Beef className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{m.protein}g protein</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Mini stats row */}
        <Card className="col-span-6 lg:col-span-3 p-5">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
            <Scale className="h-3.5 w-3.5" /> Current
          </div>
          <div className="mt-3 font-display text-2xl font-bold">{user.weight} kg</div>
          <svg viewBox={`0 0 ${w} ${h}`} className="mt-3 w-full h-8">
            <polyline points={points.join(" ")} fill="none" stroke="url(#ringGrad)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </Card>
        <Card className="col-span-6 lg:col-span-3 p-5">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
            <Flame className="h-3.5 w-3.5" /> Streak
          </div>
          <div className="mt-3 font-display text-2xl font-bold">12 days</div>
          <p className="text-xs text-muted-foreground mt-1">Personal best: 18 days</p>
        </Card>
        <Card className="col-span-12 lg:col-span-6 p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5" /> AI insight
              </div>
              <p className="mt-2 text-sm leading-snug">
                You're hitting workouts consistently but missing protein on Tue/Thu. Try adding{" "}
                <span className="font-semibold text-brand-glow">50g soya chunks</span> at dinner to close the gap.
              </p>
            </div>
            <Link
              to="/protein-calculator"
              className="shrink-0 rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold hover:border-brand"
            >
              Fix it
            </Link>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
