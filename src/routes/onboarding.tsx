import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Activity as ActivityIcon } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useProfileData } from "@/lib/data";
import { bmr as calcBmr, tdee as calcTdee, calorieTarget, proteinTarget, waterTargetMl, estimateTimelineWeeks } from "@/lib/generators";

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "Set up your plan — SwasthyaX" }, { name: "description", content: "Tell us about yourself to personalize your plan." }] }),
  component: Onboarding,
});

const steps = ["Profile", "Lifestyle", "Goal"] as const;

type Gender = "Male" | "Female" | "Other";
type Activity = "Sedentary" | "Lightly Active" | "Active";
type Food = "Vegetarian" | "Eggetarian" | "Non-Vegetarian";
type Goal = "Fat Loss" | "Muscle Gain";
type Equipment = "No equipment" | "Dumbbells";

type Draft = {
  name: string;
  age: number;
  gender: Gender;
  height: number;
  weight: number;
  workMode: "Remote" | "Hybrid" | "Office";
  activity: Activity;
  food: Food;
  equipment: Equipment;
  goal: Goal;
  goalWeight: number;
};

const initialDraft: Draft = {
  name: "",
  age: 28,
  gender: "Male",
  height: 175,
  weight: 75,
  workMode: "Hybrid",
  activity: "Lightly Active",
  food: "Vegetarian",
  equipment: "No equipment",
  goal: "Fat Loss",
  goalWeight: 70,
};

function Onboarding() {
  const navigate = useNavigate();
  const { user, profile, loading: authLoading } = useAuth();
  const { createProfile, updateProfile } = useProfileData();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>(initialDraft);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setDraft((d) => ({ ...d, [k]: v }));

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate({ to: "/signup" });
      return;
    }
    // Returning user with a profile skips onboarding entirely.
    if (profile) {
      navigate({ to: "/dashboard" });
      return;
    }
    // Prefill name from auth metadata if available.
    const metaName = (user.user_metadata as { name?: string; full_name?: string } | undefined)?.name
      ?? (user.user_metadata as { full_name?: string } | undefined)?.full_name;
    if (metaName) setDraft((d) => ({ ...d, name: metaName }));
  }, [user, profile, authLoading, navigate]);

  const canContinue =
    (step === 0 && draft.name.trim().length >= 2 && draft.age > 0 && draft.height > 0 && draft.weight > 0) ||
    (step === 1) ||
    (step === 2 && draft.goalWeight > 0);

  const finish = async () => {
    if (!user) return;
    setSaving(true);
    setError(null);

    // Auto-calculate all fitness metrics — never ask the user for these.
    const bmr = Math.round(calcBmr(draft));
    const tdee = calcTdee(draft);
    const daily_calories = calorieTarget({ ...draft, timelineWeeks: 12, budget: 0, createdAt: "" } as never);
    const daily_protein = proteinTarget({ ...draft, timelineWeeks: 12, budget: 0, createdAt: "" } as never);
    const daily_water_ml = waterTargetMl(draft);
    const timeline_weeks = estimateTimelineWeeks(draft);

    const profileData = {
      name: draft.name.trim(),
      email: user.email ?? null,
      age: draft.age,
      gender: draft.gender,
      height: draft.height,
      weight: draft.weight,
      goal: draft.goal,
      goal_weight: draft.goalWeight,
      timeline_weeks,
      work_mode: draft.workMode,
      activity: draft.activity,
      food: draft.food,
      equipment: draft.equipment,
      budget: 250,
      bmr,
      tdee,
      daily_calories,
      daily_protein,
      daily_water_ml,
    };

    const res = profile ? await updateProfile(profileData) : await createProfile(profileData);
    setSaving(false);
    if (res.error) {
      setError(res.error);
      return;
    }
    navigate({ to: "/dashboard" });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand text-brand-foreground shadow-glow">
            <ActivityIcon className="h-5 w-5" />
          </div>
          <span className="font-display font-bold text-lg">SwasthyaX</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <div className="flex items-center gap-3 mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex-1">
              <div className={`h-1.5 rounded-full ${i <= step ? "bg-gradient-brand" : "bg-muted"}`} />
              <p className={`mt-2.5 text-xs font-semibold tracking-wide ${i === step ? "text-brand-glow" : "text-muted-foreground"}`}>
                Step {i + 1} · {s}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-border bg-gradient-surface p-7 md:p-10 shadow-card">
          {step === 0 && <ProfileStep draft={draft} set={set} />}
          {step === 1 && <LifestyleStep draft={draft} set={set} />}
          {step === 2 && <GoalStep draft={draft} set={set} />}
        </div>

        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

        <div className="mt-7 flex justify-between gap-3">
          <button
            type="button"
            disabled={step === 0}
            onClick={() => setStep((s) => s - 1)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-border bg-card text-sm font-semibold disabled:opacity-40 hover:bg-accent transition"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          {step < steps.length - 1 ? (
            <button
              type="button"
              disabled={!canContinue}
              onClick={() => setStep((s) => s + 1)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-brand text-brand-foreground font-semibold shadow-glow hover:opacity-95 disabled:opacity-40 transition"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled={!canContinue || saving}
              onClick={finish}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-brand text-brand-foreground font-semibold shadow-glow hover:opacity-95 disabled:opacity-40 transition"
            >
              {saving ? "Saving..." : "Build my plan"} <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className="text-sm font-semibold text-foreground">{children}</span>;
}
function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-base outline-none focus:ring-2 focus:ring-ring transition" />;
}
function Chips<T extends string>({ options, value, onChange }: { options: readonly T[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {options.map((o) => (
        <button key={o} type="button" onClick={() => onChange(o)}
          className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
            value === o ? "bg-gradient-brand text-brand-foreground border-transparent shadow-glow" : "bg-card border-border hover:bg-accent"
          }`}>
          {o}
        </button>
      ))}
    </div>
  );
}

type StepProps = { draft: Draft; set: <K extends keyof Draft>(k: K, v: Draft[K]) => void };

function ProfileStep({ draft, set }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">Tell us about you</h2>
        <p className="text-base text-muted-foreground mt-2">We use this to calculate your calorie, protein, and water targets automatically.</p>
      </div>
      <label className="block"><Label>Full name</Label>
        <Input placeholder="e.g. Arjun Sharma" value={draft.name} onChange={(e) => set("name", e.target.value)} />
      </label>
      <div className="grid grid-cols-2 gap-4">
        <label className="block"><Label>Age</Label>
          <Input type="number" value={draft.age} onChange={(e) => set("age", Number(e.target.value) || 0)} />
        </label>
        <div><Label>Gender</Label>
          <Chips options={["Male", "Female", "Other"] as const} value={draft.gender} onChange={(v) => set("gender", v)} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <label className="block"><Label>Height (cm)</Label>
          <Input type="number" value={draft.height} onChange={(e) => set("height", Number(e.target.value) || 0)} />
        </label>
        <label className="block"><Label>Current weight (kg)</Label>
          <Input type="number" value={draft.weight} onChange={(e) => set("weight", Number(e.target.value) || 0)} />
        </label>
      </div>
    </div>
  );
}

function LifestyleStep({ draft, set }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">Your lifestyle</h2>
        <p className="text-base text-muted-foreground mt-2">Helps us pick the right workout intensity and portions.</p>
      </div>
      <div><Label>Work mode</Label>
        <Chips options={["Remote", "Hybrid", "Office"] as const} value={draft.workMode} onChange={(v) => set("workMode", v)} />
      </div>
      <div><Label>Activity level</Label>
        <Chips options={["Sedentary", "Lightly Active", "Active"] as const} value={draft.activity} onChange={(v) => set("activity", v)} />
      </div>
      <div><Label>Food preference</Label>
        <Chips options={["Vegetarian", "Eggetarian", "Non-Vegetarian"] as const} value={draft.food} onChange={(v) => set("food", v)} />
      </div>
      <div><Label>Equipment at home</Label>
        <Chips options={["No equipment", "Dumbbells"] as const} value={draft.equipment} onChange={(v) => set("equipment", v)} />
      </div>
    </div>
  );
}

function GoalStep({ draft, set }: StepProps) {
  const eta = estimateTimelineWeeks(draft);
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">Your goal</h2>
        <p className="text-base text-muted-foreground mt-2">We'll build your meal and workout plan around this.</p>
      </div>
      <div><Label>I want to</Label>
        <Chips options={["Fat Loss", "Muscle Gain"] as const} value={draft.goal} onChange={(v) => set("goal", v)} />
      </div>
      <label className="block"><Label>Target weight (kg)</Label>
        <Input type="number" value={draft.goalWeight} onChange={(e) => set("goalWeight", Number(e.target.value) || 0)} />
      </label>
      <div className="rounded-2xl border border-border bg-card/60 p-4 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">Estimated timeline:</span>{" "}
        {eta} weeks at a sustainable pace of {draft.goal === "Fat Loss" ? "~0.5 kg/week" : "~0.25 kg/week"}.
      </div>
    </div>
  );
}
