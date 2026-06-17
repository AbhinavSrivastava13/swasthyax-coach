import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/check-in")({
  head: () => ({ meta: [{ title: "Daily Check-In — SwasthyaX" }, { name: "description", content: "Log today's weight, water and workout." }] }),
  component: CheckIn,
});

function CheckIn() {
  const [weight, setWeight] = useState("77.5");
  const [water, setWater] = useState("2.0");
  const [done, setDone] = useState<"yes" | "no" | null>("yes");
  const [saved, setSaved] = useState(false);

  return (
    <AppShell title="Daily Check-In">
      <p className="text-muted-foreground -mt-4 mb-6">Takes 10 seconds. Builds momentum.</p>

      <form
        onSubmit={(e) => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 2500); }}
        className="rounded-2xl border border-border bg-card p-6 max-w-xl space-y-5"
      >
        <label className="block">
          <span className="text-sm font-medium">Today's weight (kg)</span>
          <input value={weight} onChange={(e) => setWeight(e.target.value)} type="number" step="0.1"
            className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" />
        </label>

        <label className="block">
          <span className="text-sm font-medium">Water intake (litres)</span>
          <input value={water} onChange={(e) => setWater(e.target.value)} type="number" step="0.1"
            className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" />
        </label>

        <div>
          <span className="text-sm font-medium">Workout completed?</span>
          <div className="mt-1.5 flex gap-2">
            {(["yes", "no"] as const).map((v) => (
              <button key={v} type="button" onClick={() => setDone(v)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium border capitalize ${
                  done === v ? "bg-brand text-brand-foreground border-brand" : "bg-card border-border hover:bg-accent"
                }`}>
                {v}
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className="w-full py-2.5 rounded-lg bg-brand text-brand-foreground font-semibold hover:opacity-90">
          Save check-in
        </button>

        {saved && (
          <div className="flex items-center gap-2 text-sm text-success font-medium">
            <CheckCircle2 className="h-4 w-4" /> Saved! Keep it up.
          </div>
        )}
      </form>
    </AppShell>
  );
}
