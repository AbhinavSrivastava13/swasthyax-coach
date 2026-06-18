import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Dumbbell,
  ClipboardCheck,
  Beef,
  LogOut,
  Menu,
  X,
  Activity,
  Bell,
  Search,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { user } from "@/lib/mock-data";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/meal-plan", label: "Meal Plan", icon: UtensilsCrossed },
  { to: "/workout-plan", label: "Workout Plan", icon: Dumbbell },
  { to: "/check-in", label: "Daily Check-In", icon: ClipboardCheck },
  { to: "/protein-calculator", label: "Protein Gap", icon: Beef },
] as const;

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 font-bold text-lg tracking-tight">
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand text-brand-foreground shadow-glow">
        <Activity className="h-5 w-5" strokeWidth={2.5} />
      </div>
      <span className="font-display">
        Swasthya<span className="text-brand-glow">X</span>
      </span>
    </Link>
  );
}

function NavLinks({ onClick }: { onClick?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="flex flex-col gap-1">
      <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        Workspace
      </p>
      {nav.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link
            key={to}
            to={to}
            onClick={onClick}
            className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
            }`}
          >
            {active && (
              <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r bg-brand shadow-glow" />
            )}
            <Icon className={`h-4 w-4 ${active ? "text-brand-glow" : "text-muted-foreground group-hover:text-foreground"}`} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

function UserCard() {
  return (
    <div className="rounded-xl border border-sidebar-border bg-sidebar-accent/40 p-3">
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-brand text-sm font-bold text-brand-foreground">
          {user.name[0]}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{user.name}</p>
          <p className="truncate text-[11px] text-muted-foreground">{user.goal} · {user.timelineWeeks}w plan</p>
        </div>
      </div>
    </div>
  );
}

export function AppShell({
  children,
  title,
  subtitle,
  actions,
}: {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar p-4">
        <div className="mb-8 px-1"><Logo /></div>
        <NavLinks />
        <div className="mt-auto space-y-3 pt-4">
          <UserCard />
          <Link
            to="/login"
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground"
          >
            <LogOut className="h-4 w-4" /> Log out
          </Link>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-30 flex items-center justify-between border-b border-border bg-background/85 backdrop-blur-xl px-4 h-14">
        <Logo />
        <button onClick={() => setOpen(true)} className="p-2 rounded-lg hover:bg-accent" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-sidebar border-r border-sidebar-border p-4 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <Logo />
              <button onClick={() => setOpen(false)} className="p-2 rounded-lg hover:bg-accent" aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <NavLinks onClick={() => setOpen(false)} />
            <div className="mt-auto pt-4"><UserCard /></div>
          </div>
        </div>
      )}

      <main className="flex-1 min-w-0 pt-14 md:pt-0">
        {/* Top bar */}
        <div className="hidden md:flex h-16 items-center justify-between gap-4 border-b border-border bg-background/80 backdrop-blur-xl px-8 sticky top-0 z-20">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Search className="h-4 w-4" />
            <span>Search plans, exercises, foods…</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="grid h-9 w-9 place-items-center rounded-xl border border-border hover:bg-accent" aria-label="Notifications">
              <Bell className="h-4 w-4" />
            </button>
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand text-sm font-bold text-brand-foreground">
              {user.name[0]}
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-6 md:py-8 max-w-7xl mx-auto">
          {(title || actions) && (
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <div>
                {title && (
                  <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p className="mt-1.5 text-sm md:text-base text-muted-foreground">{subtitle}</p>
                )}
              </div>
              {actions && <div className="flex gap-2">{actions}</div>}
            </div>
          )}
          {children}
        </div>
      </main>
    </div>
  );
}
