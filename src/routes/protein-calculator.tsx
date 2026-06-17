import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { user, proteinFoods } from "@/lib/mock-data";
import { useState } from "react";
import { Beef } from "lucide-react";

export const Route = createFileRoute("/protein-calculator")({
  head: () => ({ meta: [{ title: "Protein Gap Calculator — SwasthyaX" }, { name: "description", content: "See how much protein you still need today." }] }),
  component: ProteinGap,
});

function ProteinGap() {
  const [target] = useState(user.proteinTarget);
  const [current, setCurrent] = useState(user.currentProtein);
  const gap = Math.max(target - current, 0);
  const pct = Math.min((current / target) * 100, 100);

  return (
    <AppShell title="Protein Gap Calculator">
      <p className="text-muted-foreground -mt-4 mb-6">Hit your target with affordable Indian foods.</p>

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <Card label="Recommended" value={`${target} g`} />
        <Card label="Current intake" value={`${current} g`} />
        <Card label="Remaining gap" value={`${gap} g`} accent />
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-medium">Today's progress</span>
          <span className="text-muted-foreground">{Math.round(pct)}%</span>
        </div>
        <div className="h-3 rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-brand transition-all" style={{ width: `${pct}%` }} />
        </div>
        <label className="block mt-5">
          <span className="text-sm font-medium">Update current intake (g)</span>
          <input type="number" value={current} onChange={(e) => setCurrent(Number(e.target.value) || 0)}
            className="mt-1.5 w-full sm:w-48 rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" />
        </label>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Beef className="h-4 w-4 text-brand" />
          <h3 className="font-semibold">Suggested Indian foods to close your gap</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-2">
          {proteinFoods.map((f) => (
            <div key={f.name} className="flex items-center justify-between rounded-lg border border-border px-4 py-3 text-sm">
              <span>{f.name}</span>
              <span className="font-semibold text-brand">{f.protein} g</span>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

function Card({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`rounded-2xl border p-5 ${accent ? "bg-brand text-brand-foreground border-brand" : "bg-card border-border"}`}>
      <div className={`text-xs ${accent ? "opacity-90" : "text-muted-foreground"}`}>{label}</div>
      <div className="mt-1 text-2xl font-bold">{value}</div>
    </div>
  );
}
