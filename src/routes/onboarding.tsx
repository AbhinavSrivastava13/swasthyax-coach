import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Activity } from "lucide-react";

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "Set up your plan — SwasthyaX" }, { name: "description", content: "Tell us about yourself to personalize your plan." }] }),
  component: Onboarding,
});

const steps = ["Profile", "Lifestyle", "Goal"] as const;

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-brand-foreground">
            <Activity className="h-5 w-5" />
          </div>
          <span className="font-bold">SwasthyaX</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex-1">
              <div className={`h-1.5 rounded-full ${i <= step ? "bg-brand" : "bg-muted"}`} />
              <p className={`mt-2 text-xs font-medium ${i === step ? "text-brand" : "text-muted-foreground"}`}>
                Step {i + 1} · {s}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
          {step === 0 && <ProfileStep />}
          {step === 1 && <LifestyleStep />}
          {step === 2 && <GoalStep />}
        </div>

        <div className="mt-6 flex justify-between gap-3">
          <button
            type="button"
            disabled={step === 0}
            onClick={() => setStep((s) => s - 1)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-card text-sm font-medium disabled:opacity-40 hover:bg-accent"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand text-brand-foreground font-semibold hover:opacity-90"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => navigate({ to: "/dashboard" })}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand text-brand-foreground font-semibold hover:opacity-90"
            >
              Finish & see plan <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className="text-sm font-medium">{children}</span>;
}
function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" />;
}
function Chips({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="mt-1.5 flex flex-wrap gap-2">
      {options.map((o) => (
        <button key={o} type="button" onClick={() => onChange(o)}
          className={`px-3 py-2 rounded-lg text-sm border transition-colors ${
            value === o ? "bg-brand text-brand-foreground border-brand" : "bg-card border-border hover:bg-accent"
          }`}>
          {o}
        </button>
      ))}
    </div>
  );
}

function ProfileStep() {
  const [gender, setGender] = useState("Male");
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold">Tell us about you</h2>
        <p className="text-sm text-muted-foreground mt-1">We'll use this to calculate your calorie and protein targets.</p>
      </div>
      <label className="block"><Label>Full name</Label><Input placeholder="Arjun Sharma" defaultValue="Arjun Sharma" /></label>
      <div className="grid grid-cols-2 gap-4">
        <label className="block"><Label>Age</Label><Input type="number" defaultValue={28} /></label>
        <div><Label>Gender</Label><Chips options={["Male", "Female", "Other"]} value={gender} onChange={setGender} /></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <label className="block"><Label>Height (cm)</Label><Input type="number" defaultValue={175} /></label>
        <label className="block"><Label>Weight (kg)</Label><Input type="number" defaultValue={78} /></label>
      </div>
    </div>
  );
}

function LifestyleStep() {
  const [work, setWork] = useState("Hybrid");
  const [activity, setActivity] = useState("Lightly Active");
  const [food, setFood] = useState("Vegetarian");
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold">Your lifestyle</h2>
        <p className="text-sm text-muted-foreground mt-1">Helps us pick the right workout intensity and meal portions.</p>
      </div>
      <div><Label>Work mode</Label><Chips options={["Remote", "Hybrid", "Office"]} value={work} onChange={setWork} /></div>
      <div><Label>Activity level</Label><Chips options={["Sedentary", "Lightly Active", "Active"]} value={activity} onChange={setActivity} /></div>
      <div><Label>Food preference</Label><Chips options={["Vegetarian", "Eggetarian", "Non-Vegetarian"]} value={food} onChange={setFood} /></div>
      <label className="block"><Label>Daily food budget (₹)</Label><Input type="number" defaultValue={250} /></label>
    </div>
  );
}

function GoalStep() {
  const [goal, setGoal] = useState("Fat Loss");
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold">Your goal</h2>
        <p className="text-sm text-muted-foreground mt-1">We'll build your meal and workout plan around this.</p>
      </div>
      <div><Label>I want to</Label><Chips options={["Fat Loss", "Muscle Gain"]} value={goal} onChange={setGoal} /></div>
      <div className="grid grid-cols-2 gap-4">
        <label className="block"><Label>Goal weight (kg)</Label><Input type="number" defaultValue={72} /></label>
        <label className="block"><Label>Timeline (weeks)</Label><Input type="number" defaultValue={12} /></label>
      </div>
    </div>
  );
}
