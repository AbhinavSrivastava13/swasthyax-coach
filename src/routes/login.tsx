import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthShell, Field } from "@/components/AuthShell";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Log in — SwasthyaX" }, { name: "description", content: "Log in to your SwasthyaX account." }] }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to continue your fitness journey."
      footer={<>New here? <Link to="/signup" className="text-brand font-medium">Create an account</Link></>}
    >
      <form
        onSubmit={(e) => { e.preventDefault(); navigate({ to: "/dashboard" }); }}
        className="space-y-4"
      >
        <Field label="Email" type="email" placeholder="you@example.com" required defaultValue="arjun@example.com" />
        <Field label="Password" type="password" placeholder="••••••••" required defaultValue="demo1234" />
        <button type="submit" className="w-full py-2.5 rounded-lg bg-brand text-brand-foreground font-semibold hover:opacity-90">
          Log in
        </button>
      </form>
    </AuthShell>
  );
}
