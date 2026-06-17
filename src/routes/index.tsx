import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, Apple, Dumbbell, IndianRupee, Sparkles, Target, Heart, CheckCircle2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SwasthyaX — AI Fitness Coach for Indian Professionals" },
      { name: "description", content: "Affordable Indian diet plans and home workouts built for working professionals. Lose fat or gain muscle without leaving home." },
      { property: "og:title", content: "SwasthyaX — AI Fitness Coach for Indian Professionals" },
      { property: "og:description", content: "Affordable Indian diet plans and home workouts for working professionals." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-brand-foreground">
              <Activity className="h-5 w-5" />
            </div>
            SwasthyaX
          </Link>
          <nav className="flex items-center gap-2 sm:gap-4">
            <Link to="/login" className="text-sm font-medium px-3 py-2 rounded-lg hover:bg-accent">Log in</Link>
            <Link to="/signup" className="text-sm font-medium px-4 py-2 rounded-lg bg-brand text-brand-foreground hover:opacity-90 shadow-sm">
              Get started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 sm:px-6 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-soft text-brand text-xs font-medium mb-6">
            <Sparkles className="h-3.5 w-3.5" /> Built for Indian working professionals
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
            Your AI fitness coach <br className="hidden sm:block" />
            for <span className="text-brand">Indian diets</span> & home workouts
          </h1>
          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Affordable meal plans built around dal, roti and paneer. Home workouts that fit a 9-to-9
            schedule. Lose fat or gain muscle — sustainably, on your budget.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/signup" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand text-brand-foreground font-semibold shadow-sm hover:opacity-90">
              Start free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/dashboard" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border bg-card font-semibold hover:bg-accent">
              See demo dashboard
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> No gym required</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> Veg & non-veg</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> Budget-friendly</span>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="px-4 sm:px-6 py-16 bg-brand-soft/40 border-y border-border">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-6">
          {[
            { icon: Apple, title: "Indian meal plans", desc: "Roti, dal, paneer, sabzi — meals you already love, portioned for your goal." },
            { icon: Dumbbell, title: "Home workouts", desc: "Bodyweight routines for tiny apartments. Optional dumbbells, no commute." },
            { icon: IndianRupee, title: "Fits your budget", desc: "Plans built around a daily food budget — starting at ₹200/day." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl bg-card border border-border p-6 shadow-sm">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand text-brand-foreground mb-4">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="px-4 sm:px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Built for the way you actually live</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Designed for engineers, consultants and analysts juggling deadlines, dabbas and standups.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "Realistic for desk jobs", desc: "Plans account for sedentary days and zoom-heavy weeks." },
              { title: "Protein-first Indian diet", desc: "Hit your protein target with dal, paneer, soya and curd — no expensive imports." },
              { title: "20-minute home workouts", desc: "Squeeze in strength training between meetings, no gym needed." },
              { title: "Tracks weekly progress", desc: "Weigh-ins, water intake and workouts in one clean dashboard." },
            ].map((b) => (
              <div key={b.title} className="flex gap-4 rounded-xl border border-border bg-card p-5">
                <CheckCircle2 className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold">{b.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 sm:px-6 py-20 bg-brand-soft/40 border-y border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-12">Everything you need to stay consistent</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Target, title: "Goal-based plans", desc: "Fat loss or muscle gain with a target timeline." },
              { icon: Apple, title: "7-day meal plan", desc: "Breakfast, lunch, dinner and snacks — calories & protein included." },
              { icon: Dumbbell, title: "7-day workout plan", desc: "Home routines with optional dumbbell progressions." },
              { icon: Heart, title: "Daily check-in", desc: "Log weight, water and workouts in 10 seconds." },
              { icon: Activity, title: "Protein gap calculator", desc: "See exactly what to eat to hit your protein number." },
              { icon: Sparkles, title: "AI personalization", desc: "Plans adapt to your lifestyle, food preference and budget." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl bg-card border border-border p-5">
                <Icon className="h-5 w-5 text-brand mb-3" />
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 sm:px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-12">Loved by working professionals</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: "Priya, SDE-II", text: "Finally a plan that respects 11pm deploys and home-cooked dal." },
              { name: "Rohit, Consultant", text: "Lost 6 kg in 3 months — without touching a treadmill." },
              { name: "Anjali, Analyst", text: "The protein gap tool changed how I eat lunch at office." },
            ].map((t) => (
              <div key={t.name} className="rounded-2xl border border-border bg-card p-6">
                <p className="text-sm">"{t.text}"</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-brand-soft grid place-items-center text-brand font-semibold text-sm">
                    {t.name[0]}
                  </div>
                  <span className="text-sm font-medium">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 py-20">
        <div className="max-w-3xl mx-auto rounded-3xl bg-brand text-brand-foreground p-10 md:p-14 text-center shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Start your transformation today</h2>
          <p className="mt-3 opacity-90">Get your personalized Indian diet and home workout plan in under 2 minutes.</p>
          <Link to="/signup" className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-background text-foreground font-semibold hover:opacity-90">
            Create free account <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer className="px-4 sm:px-6 py-10 border-t border-border text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} SwasthyaX. Built for India.
      </footer>
    </div>
  );
}
