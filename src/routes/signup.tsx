import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthShell, Field } from "@/components/AuthShell";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign up — SwasthyaX" }, { name: "description", content: "Create your free SwasthyaX account." }] }),
  component: Signup,
});

function Signup() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: signUpError } = await signUp(email, password, name);

    setLoading(false);

    if (signUpError) {
      setError(
        signUpError.message.includes("already registered")
          ? "An account with this email already exists. Please log in instead."
          : signUpError.message
      );
      return;
    }

    navigate({ to: "/onboarding" });
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Start your personalized Indian fitness plan in under 2 minutes."
      footer={<>Already have an account? <Link to="/login" className="text-brand font-medium">Log in</Link></>}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field
          label="Full name"
          placeholder="Arjun Sharma"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Field
          label="Email"
          type="email"
          placeholder="you@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Field
          label="Password"
          type="password"
          placeholder="At least 8 characters"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-lg bg-brand text-brand-foreground font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>
    </AuthShell>
  );
}
