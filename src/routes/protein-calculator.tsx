import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useState, useMemo, useEffect } from "react";
import { Beef } from "lucide-react";
import { useProfile, useCheckIns, saveCheckIn } from "@/lib/profile";
import { proteinTarget, PROTEIN_FOODS } from "@/lib/generators";

export const Route = createFileRoute("/protein-calculator")({
  head: () => ({ meta: [{ title: "Protein Gap Calculator — SwasthyaX" }, { name: "description", content: "See how much protein you still need today." }] }),
  component: ProteinGap,
});

function ProteinGap() {
  const { profile } = useProfile();
  const checkIns = useCheckIns();
  const todayStr = new Date().toISOString().slice(0, 10);
  const todayCI = checkIns.find((c) => c.date === todayStr);

  const target = useMemo(() => (profile ? proteinTarget(profile) : 0), [profile]);
  const [current, setCurrent] = useState<number>(todayCI?.protein ?? 0);

  useEffect(() => { setCurrent(todayCI?.protein ?? 0); }, [todayCI?.protein]);

  if (!profile) return <AppShell title="Protein Gap">{null}</AppShell>;

  const gap = Math.max(target - current, 0);
  const pct = Math.min((current / Math.max(1, target)) * 100, 100);
  const foods = PROTEIN_FOODS[profile.food];

  const save = (val: number) => {
    setCurrent(val);
    saveCheckIn({
      date: todayStr,
      weight: todayCI?.weight ?? profile.weight,
      water: todayCI?.water ?? 0,
      workoutDone: todayCI?.workoutDone ?? false,
      protein: val,
    });
  };

  return (
    <AppShell
      title="Protein Gap Calculator"
      subtitle={`Your target is calculated from your weight (${profile.weight} kg) and ${profile.goal.toLowerCase()} goal.`}
    >
      <div className="grid sm:grid-cols-3 gap-4 mb-7">
        <Stat label="Recommended" value={`${target} g`} />
        <Stat label="Current intake" value={`${current} g`} />
        <Stat label="Remaining gap" value={`${gap} g`} accent />
      </div>

      <div className="rounded-2xl border border-border bg-gradient-surface p-7 mb-7 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-base">Today's progress</span>
          <span className="text-muted-foreground font-semibold">{Math.round(pct)}%</span>
        </div>
        <div className="h-3 rounded-full bg-muted overflow-hidden">
          <div className="h-full transition-all" style={{ width: `${pct}%`, backgroundImage: "linear-gradient(90deg, oklch(0.62 0.22 275), oklch(0.75 0.20 305))" }} />
        </div>
        <label className="block mt-6">
          <span className="text-sm font-semibold">Update current intake (g)</span>
          <input type="number" value={current} onChange={(e) => save(Number(e.target.value) || 0)}
            className="mt-2 w-full sm:w-56 rounded-xl border border-input bg-background px-4 py-3 text-base outline-none focus:ring-2 focus:ring-ring" />
        </label>
      </div>

      <div className="rounded-2xl border border-border bg-gradient-surface p-7 shadow-card">
        <div className="flex items-center gap-2 mb-5">
          <Beef className="h-5 w-5 text-brand-glow" />
          <h3 className="font-display text-lg font-bold">Suggested {profile.food} foods to close your gap</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {foods.map((f) => (
            <div key={f.name} className="flex items-center justify-between rounded-xl border border-border bg-card/60 px-5 py-4 text-[15px]">
              <span className="font-medium">{f.name}</span>
              <span className="font-bold text-brand-glow">{f.protein} g</span>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`rounded-2xl border p-6 shadow-card ${accent ? "bg-gradient-brand text-brand-foreground border-transparent shadow-glow" : "bg-gradient-surface border-border"}`}>
      <div className={`text-xs font-bold uppercase tracking-wider ${accent ? "opacity-90" : "text-muted-foreground"}`}>{label}</div>
      <div className="mt-2 font-display text-3xl font-bold">{value}</div>
    </div>
  );
}
