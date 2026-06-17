import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthShell, Field } from "@/components/AuthShell";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign up — SwasthyaX" }, { name: "description", content: "Create your free SwasthyaX account." }] }),
  component: Signup,
});

function Signup() {
  const navigate = useNavigate();
  return (
    <AuthShell
      title="Create your account"
      subtitle="Start your personalized Indian fitness plan in under 2 minutes."
      footer={<>Already have an account? <Link to="/login" className="text-brand font-medium">Log in</Link></>}
    >
      <form
        onSubmit={(e) => { e.preventDefault(); navigate({ to: "/onboarding" }); }}
        className="space-y-4"
      >
        <Field label="Full name" placeholder="Arjun Sharma" required />
        <Field label="Email" type="email" placeholder="you@example.com" required />
        <Field label="Password" type="password" placeholder="At least 8 characters" required minLength={8} />
        <button type="submit" className="w-full py-2.5 rounded-lg bg-brand text-brand-foreground font-semibold hover:opacity-90">
          Create account
        </button>
      </form>
    </AuthShell>
  );
}
