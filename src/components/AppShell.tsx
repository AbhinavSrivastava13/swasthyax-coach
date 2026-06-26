import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
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
} from "lucide-react";
import { useState, useEffect, type ReactNode } from "react";
import { useAuth } from "@/lib/auth";

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
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand text-brand-foreground shadow-glow">
        <Activity className="h-5 w-5" strokeWidth={2.5} />
      </div>
      <span className="font-display text-xl">
        Swasthya<span className="text-brand-glow">X</span>
      </span>
    </Link>
  );
}

function NavLinks({ onClick }: { onClick?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="flex flex-col gap-1">
      <p className="px-3 pb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
        Workspace
      </p>
      {nav.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link
            key={to}
            to={to}
            onClick={onClick}
            className={`group relative flex items-center gap-3 rounded-xl px-3.5 py-3 text-[15px] font-medium transition-all ${
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
            }`}
          >
            {active && (
              <span className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-r bg-brand shadow-glow" />
            )}
            <Icon className={`h-[18px] w-[18px] ${active ? "text-brand-glow" : "text-muted-foreground group-hover:text-foreground"}`} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

function UserCard() {
  const { profile, signOut, user } = useAuth();

  if (!user) return null;

  const name = profile?.name || user.email?.split("@")[0] || "User";
  const goal = profile?.goal || "Fat Loss";
  const weeks = profile?.timeline_weeks || 12;

  return (
    <div className="rounded-2xl border border-sidebar-border bg-sidebar-accent/40 p-3.5">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-brand text-base font-bold text-brand-foreground shadow-glow">
          {name[0]?.toUpperCase() ?? "U"}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{name}</p>
          <p className="truncate text-[12px] text-muted-foreground">{goal} · {weeks}w plan</p>
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
  requireProfile = true,
}: {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  requireProfile?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const { user, profile, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && requireProfile) {
      if (!user) {
        navigate({ to: "/login" });
      } else if (!profile) {
        navigate({ to: "/onboarding" });
      }
    }
  }, [requireProfile, loading, user, profile, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/" });
  };

  const isLoading = loading || (requireProfile && !profile);

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar p-5">
        <div className="mb-10 px-1"><Logo /></div>
        <NavLinks />
        <div className="mt-auto space-y-3 pt-4">
          <UserCard />
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground transition"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-30 flex items-center justify-between border-b border-border bg-background/85 backdrop-blur-xl px-4 h-16">
        <Logo />
        <button onClick={() => setOpen(true)} className="p-2.5 rounded-xl hover:bg-accent" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-sidebar border-r border-sidebar-border p-5 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <Logo />
              <button onClick={() => setOpen(false)} className="p-2 rounded-lg hover:bg-accent" aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <NavLinks onClick={() => setOpen(false)} />
            <div className="mt-auto pt-4">
              <UserCard />
              <button
                onClick={handleSignOut}
                className="mt-3 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground transition"
              >
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 min-w-0 pt-16 md:pt-0">
        {/* Desktop top bar */}
        <div className="hidden md:flex h-16 items-center justify-end gap-3 border-b border-border bg-background/80 backdrop-blur-xl px-10 sticky top-0 z-20">
          <button className="grid h-10 w-10 place-items-center rounded-xl border border-border hover:bg-accent transition" aria-label="Notifications">
            <Bell className="h-[18px] w-[18px]" />
          </button>
          {user && (
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand text-base font-bold text-brand-foreground shadow-glow">
              {(profile?.name || user.email?.split("@")[0] || "U")[0]?.toUpperCase()}
            </div>
          )}
        </div>

        <div className="px-5 sm:px-7 md:px-10 lg:px-12 py-8 md:py-12 max-w-7xl mx-auto">
          {(title || actions) && (
            <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
              <div className="min-w-0">
                {title && (
                  <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-[1.05]">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-2xl">{subtitle}</p>
                )}
              </div>
              {actions && <div className="flex gap-2">{actions}</div>}
            </div>
          )}
          {isLoading ? (
            <div className="text-muted-foreground text-base">Loading your plan…</div>
          ) : (
            children
          )}
        </div>
      </main>
    </div>
  );
}
