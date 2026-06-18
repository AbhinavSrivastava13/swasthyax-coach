import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  Apple,
  Dumbbell,
  IndianRupee,
  Sparkles,
  Target,
  Heart,
  CheckCircle2,
  ArrowRight,
  ClipboardList,
  LineChart,
  ShieldCheck,
  Home,
  Users,
  Flame,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SwasthyaX — Fitness Built for Indian Professionals" },
      {
        name: "description",
        content:
          "Personalized Indian diet plans, home workouts, and daily fitness guidance designed around your schedule, food preferences, and goals.",
      },
      { property: "og:title", content: "SwasthyaX — Fitness Built for Indian Professionals" },
      {
        property: "og:description",
        content:
          "Personalized Indian diet plans, home workouts, and daily fitness guidance for working professionals.",
      },
    ],
  }),
  component: Landing,
});

const BLUE = "#2563EB";
const BLUE_DARK = "#1D4ED8";
const GREEN = "#10B981";

function Landing() {
  return (
    <div
      className="min-h-screen w-full"
      style={{
        background:
          "radial-gradient(1200px 600px at 50% -200px, #DBEAFE 0%, rgba(219,234,254,0) 60%), #FFFFFF",
        color: "#0F172A",
        fontFamily:
          "'DM Sans', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Nav */}
      <header
        className="sticky top-0 z-30 backdrop-blur-md"
        style={{
          background: "rgba(255,255,255,0.8)",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg" style={{ color: "#0F172A" }}>
            <div
              className="grid h-9 w-9 place-items-center rounded-xl text-white shadow-md"
              style={{ background: `linear-gradient(135deg, ${BLUE}, ${BLUE_DARK})` }}
            >
              <Activity className="h-5 w-5" />
            </div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.01em" }}>
              SwasthyaX
            </span>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-4">
            <Link
              to="/login"
              className="text-sm font-medium px-3 py-2 rounded-lg transition-colors hover:bg-slate-100"
              style={{ color: "#334155" }}
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="text-sm font-semibold px-4 py-2 rounded-lg text-white shadow-sm transition-transform hover:scale-[1.02]"
              style={{ background: `linear-gradient(135deg, ${BLUE}, ${BLUE_DARK})` }}
            >
              Get started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 sm:px-6 pt-14 pb-16 md:pt-24 md:pb-24">
        <div className="max-w-5xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{ background: "#EFF6FF", color: BLUE_DARK, border: "1px solid #DBEAFE" }}
          >
            <Sparkles className="h-3.5 w-3.5" /> Built for Indian working professionals
          </div>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: "-0.025em",
              color: "#0F172A",
            }}
          >
            Fitness Built for <br className="hidden sm:block" />
            <span
              style={{
                background: `linear-gradient(135deg, ${BLUE}, #6366F1)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Indian Professionals
            </span>
          </h1>
          <p
            className="mt-6 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "#475569" }}
          >
            Get personalized Indian diet plans, home workouts, and daily fitness guidance designed
            around your schedule, food preferences, and goals.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-white font-semibold transition-transform hover:scale-[1.02]"
              style={{
                background: `linear-gradient(135deg, ${BLUE}, ${BLUE_DARK})`,
                boxShadow: "0 10px 30px -10px rgba(37,99,235,0.5)",
              }}
            >
              Start Free Assessment <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/meal-plan"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold transition-colors"
              style={{
                background: "#FFFFFF",
                color: "#0F172A",
                border: "1px solid #E2E8F0",
                boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
              }}
            >
              View Sample Plan
            </Link>
          </div>
          <div
            className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium"
            style={{ color: "#64748B" }}
          >
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" style={{ color: GREEN }} /> No gym required
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" style={{ color: GREEN }} /> Veg & non-veg
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" style={{ color: GREEN }} /> Free during beta
            </span>
          </div>

          {/* Visual cards */}
          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Apple, label: "Indian meal plans", tint: "#DBEAFE", color: BLUE },
              { icon: Dumbbell, label: "Home workouts", tint: "#DCFCE7", color: GREEN },
              { icon: Flame, label: "Protein tracking", tint: "#FFE4E6", color: "#F43F5E" },
              { icon: LineChart, label: "Progress monitoring", tint: "#EDE9FE", color: "#7C3AED" },
            ].map(({ icon: Icon, label, tint, color }) => (
              <div
                key={label}
                className="rounded-2xl p-5 text-left transition-transform hover:-translate-y-1"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  boxShadow: "0 4px 20px -8px rgba(15,23,42,0.08)",
                }}
              >
                <div
                  className="grid h-10 w-10 place-items-center rounded-xl mb-3"
                  style={{ background: tint, color }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-sm font-semibold" style={{ color: "#0F172A" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why SwasthyaX */}
      <section className="px-4 sm:px-6 py-20" style={{ background: "#F8FAFC" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs font-bold tracking-widest uppercase" style={{ color: BLUE }}>
              Why SwasthyaX
            </div>
            <h2
              className="mt-2 text-3xl md:text-4xl font-bold tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}
            >
              Built for how India actually lives
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Apple, title: "Indian Diet Focus", desc: "Dal, roti, paneer, sabzi — meals you already love." },
              { icon: Home, title: "Home Workouts", desc: "Bodyweight routines for tiny apartments. No commute." },
              { icon: IndianRupee, title: "Affordable Fitness", desc: "Plans from ₹200/day. No expensive coaches." },
              { icon: Target, title: "Personalized Guidance", desc: "Adapts to your goal, schedule and preferences." },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl p-6 transition-all hover:-translate-y-1"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  boxShadow: "0 4px 16px -8px rgba(15,23,42,0.08)",
                }}
              >
                <div
                  className="grid h-11 w-11 place-items-center rounded-xl text-white mb-4"
                  style={{ background: `linear-gradient(135deg, ${BLUE}, ${BLUE_DARK})` }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-base" style={{ color: "#0F172A" }}>
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "#64748B" }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 sm:px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs font-bold tracking-widest uppercase" style={{ color: GREEN }}>
              Features
            </div>
            <h2
              className="mt-2 text-3xl md:text-4xl font-bold tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}
            >
              Everything you need to stay consistent
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Apple, title: "Personalized Indian Meal Plans", desc: "Calorie & protein-balanced plans built around your kitchen." },
              { icon: Dumbbell, title: "Home Workouts", desc: "Routines for beginners and professionals — 20 minutes a day." },
              { icon: Activity, title: "Protein & Calorie Tracking", desc: "Hit your numbers daily with a clear protein gap calculator." },
              { icon: Heart, title: "Daily Progress Check-ins", desc: "Weight, water and workout — logged in 10 seconds." },
              { icon: Target, title: "Goal-Based Recommendations", desc: "Plans adapt as you progress and your goals shift." },
              { icon: Flame, title: "Fat Loss & Muscle Gain", desc: "Specialized programs for cutting or lean muscle building." },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group rounded-2xl p-6 transition-all hover:-translate-y-1"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  boxShadow: "0 2px 12px -6px rgba(15,23,42,0.06)",
                }}
              >
                <div
                  className="grid h-11 w-11 place-items-center rounded-xl mb-4"
                  style={{ background: "#EFF6FF", color: BLUE }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold" style={{ color: "#0F172A" }}>
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "#64748B" }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 sm:px-6 py-20" style={{ background: "#F8FAFC" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-xs font-bold tracking-widest uppercase" style={{ color: BLUE }}>
              How it works
            </div>
            <h2
              className="mt-2 text-3xl md:text-4xl font-bold tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}
            >
              Get started in 3 simple steps
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5 relative">
            {[
              { n: "01", icon: ClipboardList, title: "Complete Assessment", desc: "Tell us about your goal, schedule, food preferences and lifestyle." },
              { n: "02", icon: Sparkles, title: "Get Personalized Plan", desc: "Receive a custom Indian diet and home workout plan built for you." },
              { n: "03", icon: LineChart, title: "Track Progress Daily", desc: "Log check-ins, hit your protein, and watch your transformation." },
            ].map(({ n, icon: Icon, title, desc }) => (
              <div
                key={n}
                className="relative rounded-2xl p-7"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  boxShadow: "0 4px 20px -10px rgba(15,23,42,0.08)",
                }}
              >
                <div
                  className="text-xs font-bold tracking-wider"
                  style={{ color: BLUE }}
                >
                  STEP {n}
                </div>
                <div
                  className="mt-4 grid h-12 w-12 place-items-center rounded-2xl text-white"
                  style={{ background: `linear-gradient(135deg, ${BLUE}, ${BLUE_DARK})` }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-semibold text-lg" style={{ color: "#0F172A" }}>
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "#64748B" }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beta / Transformation */}
      <section className="px-4 sm:px-6 py-20">
        <div
          className="max-w-5xl mx-auto rounded-3xl p-8 md:p-12 overflow-hidden relative"
          style={{
            background: "linear-gradient(135deg, #ECFDF5 0%, #EFF6FF 100%)",
            border: "1px solid #E2E8F0",
          }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
                style={{ background: "#FFFFFF", color: GREEN, border: `1px solid ${GREEN}33` }}
              >
                <Sparkles className="h-3.5 w-3.5" /> Early Access
              </div>
              <h2
                className="mt-4 text-3xl md:text-4xl font-bold tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em", color: "#0F172A" }}
              >
                Join the First 100 Beta Users
              </h2>
              <p className="mt-4 text-base leading-relaxed" style={{ color: "#475569" }}>
                We're building SwasthyaX with our first users. Get free access, shape the product
                with your feedback, and lock in lifetime perks.
              </p>
              <Link
                to="/signup"
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-transform hover:scale-[1.02]"
                style={{
                  background: `linear-gradient(135deg, ${GREEN}, #059669)`,
                  boxShadow: "0 10px 25px -10px rgba(16,185,129,0.45)",
                }}
              >
                Claim Beta Access <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-4">
              {[
                { icon: ShieldCheck, title: "Early access badge", desc: "Founding member status on your profile." },
                { icon: Users, title: "Feedback-driven development", desc: "Direct input on what we build next." },
                { icon: Heart, title: "Free during beta", desc: "Full access at no cost while we polish." },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex gap-4 rounded-2xl p-5"
                  style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}
                >
                  <div
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
                    style={{ background: "#EFF6FF", color: BLUE }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold" style={{ color: "#0F172A" }}>
                      {title}
                    </h3>
                    <p className="text-sm mt-1" style={{ color: "#64748B" }}>
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 sm:px-6 py-20">
        <div
          className="max-w-4xl mx-auto rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${BLUE} 0%, #4F46E5 100%)`,
            boxShadow: "0 30px 60px -20px rgba(37,99,235,0.45)",
          }}
        >
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background:
                "radial-gradient(600px 200px at 50% 0%, rgba(255,255,255,0.3), transparent)",
            }}
          />
          <h2
            className="relative text-3xl md:text-5xl font-bold tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.025em" }}
          >
            Start Your Fitness Journey Today
          </h2>
          <p className="relative mt-4 text-base md:text-lg opacity-90 max-w-2xl mx-auto">
            No gym required. No expensive coaches. Just a fitness system built for Indians.
          </p>
          <Link
            to="/signup"
            className="relative mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-transform hover:scale-[1.03]"
            style={{
              background: "#FFFFFF",
              color: BLUE_DARK,
              boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)",
            }}
          >
            Get Started Free <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-4 sm:px-6 pt-14 pb-10"
        style={{ borderTop: "1px solid #E2E8F0", background: "#F8FAFC" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 font-bold text-lg">
                <div
                  className="grid h-9 w-9 place-items-center rounded-xl text-white"
                  style={{ background: `linear-gradient(135deg, ${BLUE}, ${BLUE_DARK})` }}
                >
                  <Activity className="h-5 w-5" />
                </div>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#0F172A" }}>
                  SwasthyaX
                </span>
              </div>
              <p className="mt-4 text-sm max-w-sm" style={{ color: "#64748B" }}>
                AI-powered fitness coaching designed for Indian working professionals. Affordable,
                sustainable, and built around your life.
              </p>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider" style={{ color: "#0F172A" }}>
                Product
              </div>
              <ul className="mt-4 space-y-2 text-sm" style={{ color: "#64748B" }}>
                <li><Link to="/meal-plan" className="hover:text-slate-900">Meal Plans</Link></li>
                <li><Link to="/workout-plan" className="hover:text-slate-900">Workouts</Link></li>
                <li><Link to="/protein-calculator" className="hover:text-slate-900">Protein Calculator</Link></li>
                <li><Link to="/dashboard" className="hover:text-slate-900">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider" style={{ color: "#0F172A" }}>
                Company
              </div>
              <ul className="mt-4 space-y-2 text-sm" style={{ color: "#64748B" }}>
                <li>support@swasthyax.app</li>
                <li>Made in India 🇮🇳</li>
              </ul>
            </div>
          </div>
          <div
            className="mt-10 pt-6 text-center text-xs"
            style={{ borderTop: "1px solid #E2E8F0", color: "#94A3B8" }}
          >
            © {new Date().getFullYear()} SwasthyaX. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
