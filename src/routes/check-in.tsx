import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { useProfile, useCheckIns, saveCheckIn } from "@/lib/profile";

export const Route = createFileRoute("/check-in")({
  head: () => ({ meta: [{ title: "Daily Check-In — SwasthyaX" }, { name: "description", content: "Log today's weight, water and workout." }] }),
  component: CheckIn,
});

function CheckIn() {
  const { profile } = useProfile();
  const checkIns = useCheckIns();
  const todayStr = new Date().toISOString().slice(0, 10);
  const todayCI = checkIns.find((c) => c.date === todayStr);

  const [weight, setWeight] = useState<string>("");
  const [water, setWater] = useState<string>("");
  const [done, setDone] = useState<"yes" | "no" | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!profile) return;
    setWeight(String(todayCI?.weight ?? profile.weight));
    setWater(String(todayCI?.water ?? ""));
    setDone(todayCI ? (todayCI.workoutDone ? "yes" : "no") : null);
  }, [profile, todayCI]);

  if (!profile) return <AppShell title="Daily Check-In">{null}</AppShell>;

  return (
    <AppShell title="Daily Check-In" subtitle="Takes 10 seconds. Builds momentum.">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveCheckIn({
            date: todayStr,
            weight: Number(weight) || profile.weight,
            water: Number(water) || 0,
            workoutDone: done === "yes",
            protein: todayCI?.protein,
          });
          setSaved(true);
          setTimeout(() => setSaved(false), 2500);
        }}
        className="rounded-3xl border border-border bg-gradient-surface p-8 max-w-xl space-y-6 shadow-card"
      >
        <label className="block">
          <span className="text-sm font-semibold">Today's weight (kg)</span>
          <input value={weight} onChange={(e) => setWeight(e.target.value)} type="number" step="0.1"
            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-base outline-none focus:ring-2 focus:ring-ring" />
        </label>

        <label className="block">
          <span className="text-sm font-semibold">Water intake (litres)</span>
          <input value={water} onChange={(e) => setWater(e.target.value)} type="number" step="0.1"
            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-base outline-none focus:ring-2 focus:ring-ring" />
        </label>

        <div>
          <span className="text-sm font-semibold">Workout completed?</span>
          <div className="mt-2 flex gap-2">
            {(["yes", "no"] as const).map((v) => (
              <button key={v} type="button" onClick={() => setDone(v)}
                className={`flex-1 py-3 rounded-xl text-sm font-semibold border capitalize transition ${
                  done === v ? "bg-gradient-brand text-brand-foreground border-transparent shadow-glow" : "bg-card border-border hover:bg-accent"
                }`}>
                {v}
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className="w-full py-3.5 rounded-xl bg-gradient-brand text-brand-foreground font-semibold shadow-glow hover:opacity-95 transition">
          Save check-in
        </button>

        {saved && (
          <div className="flex items-center gap-2 text-sm text-success font-semibold">
            <CheckCircle2 className="h-4 w-4" /> Saved! Keep it up.
          </div>
        )}
      </form>
    </AppShell>
  );
}
