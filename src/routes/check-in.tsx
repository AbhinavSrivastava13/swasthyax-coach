import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useCheckIns } from "@/lib/data";

export const Route = createFileRoute("/check-in")({
  head: () => ({ meta: [{ title: "Daily Check-In — SwasthyaX" }, { name: "description", content: "Log today's weight, water and workout." }] }),
  component: CheckIn,
});

function CheckIn() {
  const { profile } = useAuth();
  const { todayCheckIn, saveCheckIn } = useCheckIns();
  const todayStr = new Date().toISOString().slice(0, 10);

  const [weight, setWeight] = useState<string>("");
  const [water, setWater] = useState<string>("");
  const [done, setDone] = useState<"yes" | "no" | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!profile) return;
    setWeight(String(todayCheckIn?.weight ?? profile.weight));
    setWater(String(todayCheckIn?.water ?? ""));
    setDone(todayCheckIn ? (todayCheckIn.workout_done ? "yes" : "no") : null);
  }, [profile, todayCheckIn]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setSaving(true);
    const { error } = await saveCheckIn({
      date: todayStr,
      weight: Number(weight) || profile.weight,
      water: Number(water) || 0,
      workout_done: done === "yes",
      protein: todayCheckIn?.protein || 0,
    });
    setSaving(false);

    if (!error) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  };

  if (!profile) return <AppShell title="Daily Check-In">{null}</AppShell>;

  return (
    <AppShell title="Daily Check-In" subtitle="Takes 10 seconds. Builds momentum.">
      <form
        onSubmit={handleSubmit}
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

        <button
          type="submit"
          disabled={saving}
          className="w-full py-3.5 rounded-xl bg-gradient-brand text-brand-foreground font-semibold shadow-glow hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {saving ? "Saving..." : "Save check-in"}
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
