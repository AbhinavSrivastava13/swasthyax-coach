import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, UtensilsCrossed, Dumbbell, ClipboardCheck, Beef, LogOut, Menu, X, Activity } from "lucide-react";
import { useState, type ReactNode } from "react";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/meal-plan", label: "Meal Plan", icon: UtensilsCrossed },
  { to: "/workout-plan", label: "Workout Plan", icon: Dumbbell },
  { to: "/check-in", label: "Daily Check-In", icon: ClipboardCheck },
  { to: "/protein-calculator", label: "Protein Gap", icon: Beef },
] as const;

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-bold text-lg">
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-brand-foreground shadow-sm">
        <Activity className="h-5 w-5" />
      </div>
      <span>SwasthyaX</span>
    </Link>
  );
}

function NavLinks({ onClick }: { onClick?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="flex flex-col gap-1">
      {nav.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link
            key={to}
            to={to}
            onClick={onClick}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              active
                ? "bg-brand text-brand-foreground shadow-sm"
                : "text-sidebar-foreground hover:bg-sidebar-accent"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AppShell({ children, title }: { children: ReactNode; title?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar p-4">
        <div className="mb-8 px-2"><Logo /></div>
        <NavLinks />
        <div className="mt-auto pt-4">
          <Link to="/login" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-sidebar-accent">
            <LogOut className="h-4 w-4" /> Log out
          </Link>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-30 flex items-center justify-between border-b border-border bg-background/90 backdrop-blur px-4 h-14">
        <Logo />
        <button onClick={() => setOpen(true)} className="p-2 rounded-lg hover:bg-accent" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-sidebar p-4 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <Logo />
              <button onClick={() => setOpen(false)} className="p-2 rounded-lg hover:bg-accent" aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <NavLinks onClick={() => setOpen(false)} />
          </div>
        </div>
      )}

      <main className="flex-1 min-w-0 pt-14 md:pt-0">
        <div className="px-4 sm:px-6 md:px-10 py-6 md:py-10 max-w-6xl mx-auto">
          {title && <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">{title}</h1>}
          {children}
        </div>
      </main>
    </div>
  );
}
