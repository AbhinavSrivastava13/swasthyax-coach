import { Link } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import type { ReactNode } from "react";

export function AuthShell({ title, subtitle, children, footer }: { title: string; subtitle: string; children: ReactNode; footer: ReactNode }) {
  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-background">
      <div className="hidden md:flex flex-col justify-between bg-brand text-brand-foreground p-10">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/15">
            <Activity className="h-5 w-5" />
          </div>
          SwasthyaX
        </Link>
        <div>
          <h2 className="text-3xl font-bold leading-tight">Your AI coach for Indian diets & home workouts.</h2>
          <p className="mt-3 opacity-90 max-w-sm">Affordable plans built around dal, roti and paneer — for working professionals.</p>
        </div>
        <p className="text-sm opacity-75">© {new Date().getFullYear()} SwasthyaX</p>
      </div>
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <Link to="/" className="md:hidden flex items-center gap-2 font-bold text-lg mb-8">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-brand-foreground">
              <Activity className="h-5 w-5" />
            </div>
            SwasthyaX
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-8 space-y-4">{children}</div>
          <div className="mt-6 text-sm text-muted-foreground text-center">{footer}</div>
        </div>
      </div>
    </div>
  );
}

export function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <input
        {...props}
        className="mt-1.5 w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
      />
    </label>
  );
}
