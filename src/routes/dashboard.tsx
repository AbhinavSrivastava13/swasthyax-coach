import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { AppShell } from "@/components/AppShell";
import { useProfile, useCheckIns } from "@/lib/profile";
import { calorieTarget, proteinTarget, generateMealPlan, generateWorkoutPlan, bmi } from "@/lib/generators";
import {
  Scale,
  Flame,
  Beef,
  Dumbbell,
  ArrowRight,
  TrendingDown,
  TrendingUp,
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

function Card({ children, className = "", glow = false }: { children: React.ReactNode; className?: string; glow?: boolean }) {
  return (
    <div className={`relative rounded-3xl border border-border bg-gradient-surface shadow-card overflow-hidden ${glow ? "shadow-glow" : ""} ${className}`}>
      {children}
    </div>
  );
}

function ProgressRing({ value, max, size = 130, label }: { value: number; max: number; size?: number; label?: string }) {
  const pct = Math.max(0, Math.min(100, (value / Math.max(0.0001, max)) * 100));
  const stroke = 11;
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
        <circle cx={size / 2} cy={size / 2} r={r} stroke="url(#ringGrad)" strokeWidth={stroke} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset} fill="none" />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="font-display text-3xl font-bold leading-none">{Math.round(pct)}%</div>
          {label && <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1.5 font-semibold">{label}</div>}
        </div>
      </div>
    </div>
  );
}

function Bar({ value, max }: { value: number; max: number }) {
  const pct = Math.max(0, Math.min(100, (value / Math.max(0.0001, max)) * 100));
  return (
    <div className="h-2.5 w-full rounded-full bg-secondary overflow-hidden">
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${pct}%`, backgroundImage: "linear-gradient(90deg, oklch(0.62 0.22 275), oklch(0.75 0.20 305))" }}
      />
    </div>
  );
}

function Dashboard() {
  const { profile } = useProfile();
  const checkIns = useCheckIns();

  const data = useMemo(() => {
    if (!profile) return null;
    const cals = calorieTarget(profile);
    const protein = proteinTarget(profile);
    const meals = generateMealPlan(profile);
    const workouts = generateWorkoutPlan(profile);
    const todayIdx = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;

    // last 7 check-ins (or seed with current weight)
    const recent = checkIns.slice(-7);
    const weightSeries = recent.length
      ? recent.map((c) => ({ day: new Date(c.date).toLocaleDateString("en-US", { weekday: "short" }), weight: c.weight }))
      : [{ day: "Today", weight: profile.weight }];

    const todayCI = checkIns.find((c) => c.date === new Date().toISOString().slice(0, 10));
    const currentWeight = todayCI?.weight ?? recent[recent.length - 1]?.weight ?? profile.weight;
    const waterToday = todayCI?.water ?? 0;
    const proteinToday = todayCI?.protein ?? 0;

    const startWeight = recent[0]?.weight ?? profile.weight;
    const delta = +(currentWeight - startWeight).toFixed(1);

    const goalProgressValue = profile.goal === "Fat Loss"
      ? Math.max(0, profile.weight - currentWeight)
      : Math.max(0, currentWeight - profile.weight);
    const goalProgressMax = Math.abs(profile.weight - profile.goalWeight) || 1;

    return {
      cals, protein, meals, workouts,
      today: workouts[todayIdx] ?? workouts[0],
      todayMeals: meals[todayIdx] ?? meals[0],
      weightSeries, currentWeight, waterToday, proteinToday,
      startWeight, delta, goalProgressValue, goalProgressMax,
      bmiVal: bmi({ weight: currentWeight, height: profile.height }),
      streak: checkIns.length,
    };
  }, [profile, checkIns]);

  if (!profile || !data) return <AppShell title="Loading">{null}</AppShell>;

  const firstName = profile.name.split(" ")[0];
  const waterTarget = 3.5;
  const goingRightWay = profile.goal === "Fat Loss" ? data.delta <= 0 : data.delta >= 0;

  const max = Math.max(...data.weightSeries.map((p) => p.weight));
  const min = Math.min(...data.weightSeries.map((p) => p.weight));

  return (
    <AppShell
      title={`Welcome, ${firstName}`}
      subtitle={`Your personalised ${profile.goal.toLowerCase()} plan — ${profile.timelineWeeks} weeks · ${profile.food} · ${profile.equipment}.`}
      actions={
        <Link
          to="/check-in"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-3 text-sm font-semibold text-brand-foreground shadow-glow transition hover:opacity-95"
        >
          <Sparkles className="h-4 w-4" /> Log today
        </Link>
      }
    >
      <div className="grid grid-cols-12 gap-5 md:gap-6">
        {/* Hero — goal progress */}
        <Card glow className="col-span-12 lg:col-span-5 p-7">
          <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-glow">
              <Trophy className="h-3.5 w-3.5" /> Goal progress
            </div>
            <div className="mt-6 flex items-center gap-7">
              <ProgressRing value={data.goalProgressValue} max={data.goalProgressMax} label="Complete" />
              <div className="flex-1 min-w-0">
                <div className="font-display text-5xl md:text-6xl font-bold tracking-tight">
                  {data.currentWeight}<span className="text-2xl text-muted-foreground ml-1">kg</span>
                </div>
                <p className="text-base text-muted-foreground mt-2">
                  Target {profile.goalWeight} kg · {profile.timelineWeeks} weeks
                </p>
                <div className={`mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                  goingRightWay ? "bg-success/15 text-success" : "bg-warning/15 text-warning"
                }`}>
                  {profile.goal === "Fat Loss" ? <TrendingDown className="h-3.5 w-3.5" /> : <TrendingUp className="h-3.5 w-3.5" />}
                  {data.delta > 0 ? "+" : ""}{data.delta} kg vs start
                </div>
              </div>
            </div>
            <div className="mt-7">
              <Bar value={data.goalProgressValue} max={data.goalProgressMax} />
              <div className="mt-2.5 flex justify-between text-xs text-muted-foreground font-medium">
                <span>Start · {data.startWeight} kg</span>
                <span>Goal · {profile.goalWeight} kg</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Calories */}
        <Card className="col-span-12 sm:col-span-6 lg:col-span-4 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Calorie target</p>
              <div className="mt-3 font-display text-4xl font-bold">{data.cals.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground mt-1.5">kcal / day · {profile.goal}</p>
            </div>
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand/15 text-brand-glow">
              <Flame className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-6 space-y-2.5">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Maintenance</span>
              <span className="font-semibold">{(profile.goal === "Fat Loss" ? data.cals + 500 : data.cals - 350).toLocaleString()} kcal</span>
            </div>
            <Bar value={data.cals} max={profile.goal === "Fat Loss" ? data.cals + 500 : data.cals + 100} />
          </div>
        </Card>

        {/* Water */}
        <Card className="col-span-12 sm:col-span-6 lg:col-span-3 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Hydration</p>
              <div className="mt-3 font-display text-4xl font-bold">{data.waterToday}L</div>
              <p className="text-sm text-muted-foreground mt-1.5">of {waterTarget}L goal</p>
            </div>
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand/15 text-brand-glow">
              <Droplets className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-6 flex gap-1.5">
            {Array.from({ length: 8 }).map((_, i) => {
              const filled = i < Math.round((data.waterToday / waterTarget) * 8);
              return <div key={i} className={`h-9 flex-1 rounded ${filled ? "bg-gradient-brand" : "bg-secondary"}`} />;
            })}
          </div>
        </Card>

        {/* Weight trend */}
        <Card className="col-span-12 lg:col-span-7 p-7">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-xl font-bold">Weight trend</h3>
              <p className="text-sm text-muted-foreground mt-1">From your check-ins</p>
            </div>
            <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${
              goingRightWay ? "border-success/30 bg-success/10 text-success" : "border-warning/30 bg-warning/10 text-warning"
            }`}>
              {profile.goal === "Fat Loss" ? <TrendingDown className="h-3.5 w-3.5" /> : <TrendingUp className="h-3.5 w-3.5" />}
              {data.delta > 0 ? "+" : ""}{data.delta} kg
            </div>
          </div>
          {data.weightSeries.length < 2 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-border p-8 text-center">
              <p className="text-base text-muted-foreground">No check-ins yet. <Link to="/check-in" className="text-brand-glow font-semibold hover:underline">Log your first day</Link> to see your trend here.</p>
            </div>
          ) : (
            <div className="mt-7 grid gap-2 h-48" style={{ gridTemplateColumns: `repeat(${data.weightSeries.length}, minmax(0, 1fr))` }}>
              {data.weightSeries.map((p, i) => {
                const norm = (p.weight - min) / (max - min + 0.01);
                const h = 30 + (1 - norm) * 70;
                const isLast = i === data.weightSeries.length - 1;
                return (
                  <div key={i} className="flex flex-col items-center justify-end gap-2">
                    <span className="text-[11px] font-semibold text-muted-foreground">{p.weight}</span>
                    <div
                      className={`w-full rounded-t-lg transition-all ${isLast ? "bg-gradient-brand shadow-glow" : "bg-secondary"}`}
                      style={{ height: `${h}%` }}
                    />
                    <span className="text-[11px] text-muted-foreground font-medium">{p.day}</span>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        {/* Protein */}
        <Card className="col-span-12 lg:col-span-5 p-7">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-display text-xl font-bold">Protein gap</h3>
              <p className="text-sm text-muted-foreground mt-1">Target tuned to your weight</p>
            </div>
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand/15 text-brand-glow">
              <Beef className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-6 flex items-center gap-6">
            <ProgressRing value={data.proteinToday} max={data.protein} size={120} label="Hit" />
            <div className="flex-1 space-y-2 text-[15px]">
              <div className="flex justify-between"><span className="text-muted-foreground">Consumed</span><span className="font-semibold">{data.proteinToday}g</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Target</span><span className="font-semibold">{data.protein}g</span></div>
              <div className="flex justify-between mt-2 pt-3 border-t border-border"><span className="text-muted-foreground">Remaining</span><span className="font-bold text-brand-glow">{Math.max(0, data.protein - data.proteinToday)}g</span></div>
              <Link to="/protein-calculator" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand-glow hover:underline">
                See food suggestions <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </Card>

        {/* Today's workout */}
        <Card className="col-span-12 md:col-span-6 lg:col-span-5 p-7">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-glow">
                <Calendar className="h-3 w-3" /> Today · {data.today.day}
              </div>
              <h3 className="mt-1.5 font-display text-xl font-bold">{data.today.focus}</h3>
            </div>
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand text-brand-foreground shadow-glow">
              <Dumbbell className="h-5 w-5" />
            </div>
          </div>
          <ul className="space-y-2.5">
            {data.today.exercises.slice(0, 4).map((e, i) => (
              <li key={e.name} className="flex items-center justify-between rounded-xl border border-border bg-card/60 p-3.5 text-[15px]">
                <div className="flex items-center gap-3">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-brand/15 text-xs font-bold text-brand-glow">{i + 1}</div>
                  <span className="font-medium">{e.name}</span>
                </div>
                <span className="text-sm text-muted-foreground font-semibold">{e.sets}</span>
              </li>
            ))}
          </ul>
          <Link to="/workout-plan" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-glow hover:underline">
            See full plan <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Card>

        {/* Today's meals */}
        <Card className="col-span-12 md:col-span-6 lg:col-span-7 p-7">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-glow">
                <Apple className="h-3 w-3" /> Today's meals
              </div>
              <h3 className="mt-1.5 font-display text-xl font-bold">{data.todayMeals.day}'s plan</h3>
            </div>
            <Link to="/meal-plan" className="text-sm font-semibold text-brand-glow hover:underline inline-flex items-center gap-1">
              Full week <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-3.5">
            {[data.todayMeals.breakfast, data.todayMeals.lunch, data.todayMeals.dinner, data.todayMeals.snack].map((m) => (
              <div key={m.name} className="rounded-2xl border border-border bg-card/60 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{m.name}</span>
                  <span className="text-xs font-bold text-brand-glow">{m.kcal} kcal</span>
                </div>
                <p className="mt-2.5 text-[15px] leading-snug">{m.items}</p>
                <div className="mt-3 flex items-center gap-1.5">
                  <Beef className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground font-medium">{m.protein}g protein</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Mini stats */}
        <Card className="col-span-6 lg:col-span-3 p-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground font-bold">
            <Scale className="h-3.5 w-3.5" /> Current
          </div>
          <div className="mt-3 font-display text-3xl font-bold">{data.currentWeight} kg</div>
          <p className="text-sm text-muted-foreground mt-1">BMI {data.bmiVal}</p>
        </Card>
        <Card className="col-span-6 lg:col-span-3 p-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground font-bold">
            <Flame className="h-3.5 w-3.5" /> Check-ins
          </div>
          <div className="mt-3 font-display text-3xl font-bold">{data.streak}</div>
          <p className="text-sm text-muted-foreground mt-1">days logged</p>
        </Card>
        <Card className="col-span-12 lg:col-span-6 p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground font-bold">
                <Sparkles className="h-3.5 w-3.5" /> AI insight
              </div>
              <p className="mt-2.5 text-[15px] leading-snug">
                {profile.goal === "Fat Loss"
                  ? <>Aim for {data.protein}g protein and stay within {data.cals.toLocaleString()} kcal. A 30-min brisk walk after dinner accelerates fat loss.</>
                  : <>Hit {data.protein}g protein and a slight calorie surplus ({data.cals.toLocaleString()} kcal). Sleep 7-8 hours to maximise muscle recovery.</>}
              </p>
            </div>
            <Link to="/protein-calculator" className="shrink-0 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold hover:border-brand transition">
              Plan it
            </Link>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
