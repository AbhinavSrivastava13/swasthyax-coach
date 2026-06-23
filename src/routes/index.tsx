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
  UtensilsCrossed,
  Timer,
  TrendingUp,
  Droplets,
  Zap,
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
const INK = "#0F172A";
const MUTED = "#475569";
const SUBTLE = "#64748B";

const fontHead = "'Plus Jakarta Sans', 'Inter', sans-serif";

function Landing() {
  return (
    <div
      className="min-h-screen w-full"
      style={{
        background:
          "radial-gradient(1200px 600px at 50% -200px, #DBEAFE 0%, rgba(219,234,254,0) 60%), #FFFFFF",
        color: INK,
        fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Nav */}
      <header
        className="sticky top-0 z-30 backdrop-blur-md"
        style={{ background: "rgba(255,255,255,0.85)", borderBottom: "1px solid #E2E8F0" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg" style={{ color: INK }}>
            <div
              className="grid h-9 w-9 place-items-center rounded-xl text-white shadow-md"
              style={{ background: `linear-gradient(135deg, ${BLUE}, ${BLUE_DARK})` }}
            >
              <Activity className="h-5 w-5" />
            </div>
            <span style={{ fontFamily: fontHead, letterSpacing: "-0.01em" }}>SwasthyaX</span>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/login"
              className="text-sm font-semibold px-3 py-2 rounded-lg transition-colors hover:bg-slate-100"
              style={{ color: "#334155" }}
            >
              Log in
            </Link>
            <Link
              to="/onboarding"
              className="text-sm font-semibold px-4 py-2 rounded-lg text-white shadow-sm transition-transform hover:scale-[1.02]"
              style={{ background: `linear-gradient(135deg, ${BLUE}, ${BLUE_DARK})` }}
            >
              Get started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 sm:px-6 pt-12 pb-10 md:pt-20 md:pb-14">
        <div className="max-w-5xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold mb-6"
            style={{ background: "#EFF6FF", color: BLUE_DARK, border: "1px solid #DBEAFE" }}
          >
            <Sparkles className="h-3.5 w-3.5" /> Built for Indian working professionals
          </div>
          <h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-extrabold tracking-tight leading-[0.98]"
            style={{ fontFamily: fontHead, letterSpacing: "-0.04em", color: INK }}
          >
            Fitness Built for{" "}
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
            className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium"
            style={{ color: MUTED }}
          >
            Personalized Indian meal plans and 20-minute home workouts : Built around your schedule,
            your kitchen, and your goals.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/onboarding"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white text-base font-bold transition-transform hover:scale-[1.02]"
              style={{
                background: `linear-gradient(135deg, ${BLUE}, ${BLUE_DARK})`,
                boxShadow: "0 12px 32px -10px rgba(37,99,235,0.55)",
              }}
            >
              Start Free Assessment <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/meal-plan"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold transition-colors hover:bg-slate-50"
              style={{
                background: "#FFFFFF",
                color: INK,
                border: "1px solid #E2E8F0",
                boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
              }}
            >
              View Sample Plan
            </Link>
          </div>
          <div
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-semibold"
            style={{ color: SUBTLE }}
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
        </div>
      </section>

      {/* What You'll Get */}
      <Section eyebrow="What you'll get" eyebrowColor={BLUE} title="Everything you need, from day one">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { icon: UtensilsCrossed, label: "Personalized Indian Meal Plan", tint: "#DBEAFE", color: BLUE },
            { icon: Dumbbell, label: "Personalized Home Workout Plan", tint: "#DCFCE7", color: GREEN },
            { icon: Flame, label: "Daily Calorie Target", tint: "#FEE2E2", color: "#EF4444" },
            { icon: Zap, label: "Daily Protein Target", tint: "#FEF3C7", color: "#D97706" },
            { icon: LineChart, label: "Progress Tracking Dashboard", tint: "#EDE9FE", color: "#7C3AED" },
          ].map(({ icon: Icon, label, tint, color }) => (
            <div
              key={label}
              className="rounded-2xl p-5 text-left transition-transform hover:-translate-y-1"
              style={{
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                boxShadow: "0 4px 20px -10px rgba(15,23,42,0.08)",
              }}
            >
              <div
                className="grid h-11 w-11 place-items-center rounded-xl mb-3"
                style={{ background: tint, color }}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="text-base font-bold leading-snug" style={{ color: INK, fontFamily: fontHead }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Why SwasthyaX */}
      <Section
        bg="#F8FAFC"
        eyebrow="Why SwasthyaX"
        eyebrowColor={BLUE}
        title="Built for how India actually lives"
      >
        <div className="grid sm:grid-cols-2 gap-5">
          {[
            {
              icon: Apple,
              title: "Built for Indian Kitchens",
              desc: "Dal, roti, paneer, sabzi, curd — meals you already love, balanced for your goals. No bland chicken-and-broccoli.",
            },
            {
              icon: Timer,
              title: "Designed for Busy Professionals",
              desc: "20-minute workouts, fast meal prep, and check-ins that take 10 seconds. Built around 9-to-9 calendars.",
            },
            {
              icon: Home,
              title: "No Expensive Gym Membership",
              desc: "Bodyweight and minimal-equipment routines you can do in a 1BHK. Save ₹2,000+ a month, skip the commute.",
            },
            {
              icon: Heart,
              title: "Sustainable Fitness Habits",
              desc: "We don't do crash diets. Small daily wins compound — habits that stick long after the first 90 days.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl p-7 transition-all hover:-translate-y-1"
              style={{
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                boxShadow: "0 6px 24px -12px rgba(15,23,42,0.10)",
              }}
            >
              <div
                className="grid h-12 w-12 place-items-center rounded-xl text-white mb-5"
                style={{ background: `linear-gradient(135deg, ${BLUE}, ${BLUE_DARK})` }}
              >
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold" style={{ color: INK, fontFamily: fontHead, letterSpacing: "-0.01em" }}>
                {title}
              </h3>
              <p className="mt-2.5 text-base leading-relaxed" style={{ color: MUTED }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Features */}
      <Section eyebrow="Features" eyebrowColor={GREEN} title="Everything you need to stay consistent">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              icon: UtensilsCrossed,
              title: "Personalized Indian Meal Plans",
              desc: "Calorie & protein-balanced meals built around what's already in your kitchen — no exotic ingredients.",
            },
            {
              icon: Dumbbell,
              title: "20-Minute Home Workouts",
              desc: "Quick routines designed for busy professionals who don't have time for the gym.",
            },
            {
              icon: Activity,
              title: "Daily Protein Tracking",
              desc: "Hit your numbers with a clear protein gap calculator that suggests Indian foods to close the gap.",
            },
            {
              icon: Heart,
              title: "10-Second Daily Check-ins",
              desc: "Log weight, water and workout in seconds. Watch your trends without obsessing over the scale.",
            },
            {
              icon: Target,
              title: "Goals That Adapt With You",
              desc: "As your weight and strength change, your plan recalibrates automatically — no manual tweaks.",
            },
            {
              icon: Flame,
              title: "Fat Loss or Muscle Gain",
              desc: "Specialized programs whether you're cutting for summer or building lean muscle for the long run.",
            },
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
                className="grid h-12 w-12 place-items-center rounded-xl mb-4"
                style={{ background: "#EFF6FF", color: BLUE }}
              >
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold" style={{ color: INK, fontFamily: fontHead, letterSpacing: "-0.01em" }}>
                {title}
              </h3>
              <p className="mt-2 text-base leading-relaxed" style={{ color: MUTED }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Sample Results Preview */}
      <Section
        bg="#F8FAFC"
        eyebrow="Preview"
        eyebrowColor={BLUE}
        title="See what your personalized plan looks like"
        subtitle="A peek at the dashboard you'll get after your free assessment."
      >
        <div
          className="rounded-3xl p-5 sm:p-8"
          style={{
            background: "#FFFFFF",
            border: "1px solid #E2E8F0",
            boxShadow: "0 20px 60px -20px rgba(15,23,42,0.15)",
          }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <PreviewStat
              icon={Flame}
              tint="#FEE2E2"
              color="#EF4444"
              label="Daily Calories"
              value="2,180"
              unit="kcal"
              foot="On track · 1,420 logged"
            />
            <PreviewStat
              icon={Zap}
              tint="#FEF3C7"
              color="#D97706"
              label="Daily Protein"
              value="142"
              unit="g"
              foot="38g remaining today"
            />
            <PreviewStat
              icon={Dumbbell}
              tint="#DCFCE7"
              color={GREEN}
              label="Today's Workout"
              value="Push Day"
              unit=""
              foot="20 min · 5 exercises"
            />
            <PreviewStat
              icon={TrendingUp}
              tint="#DBEAFE"
              color={BLUE}
              label="Weekly Progress"
              value="−0.6"
              unit="kg"
              foot="4 of 5 check-ins done"
            />
          </div>
          <div className="grid lg:grid-cols-2 gap-4 mt-4">
            <div
              className="rounded-2xl p-6"
              style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}
            >
              <div className="text-xs font-bold uppercase tracking-wider" style={{ color: SUBTLE }}>
                Today's meals
              </div>
              <ul className="mt-3 space-y-3">
                {[
                  { meal: "Breakfast", item: "Veg poha + boiled eggs", kcal: 420 },
                  { meal: "Lunch", item: "2 roti + dal + paneer bhurji", kcal: 620 },
                  { meal: "Snack", item: "Greek yogurt + almonds", kcal: 240 },
                  { meal: "Dinner", item: "Grilled chicken + sabzi", kcal: 540 },
                ].map((m) => (
                  <li key={m.meal} className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-xs font-bold" style={{ color: BLUE }}>
                        {m.meal.toUpperCase()}
                      </div>
                      <div className="text-sm font-semibold truncate" style={{ color: INK }}>
                        {m.item}
                      </div>
                    </div>
                    <div className="text-sm font-bold shrink-0" style={{ color: MUTED }}>
                      {m.kcal} kcal
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="rounded-2xl p-6"
              style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}
            >
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold uppercase tracking-wider" style={{ color: SUBTLE }}>
                  Weight trend · 8 weeks
                </div>
                <div className="text-xs font-bold" style={{ color: GREEN }}>
                  −3.2 kg
                </div>
              </div>
              <Sparkline />
              <div className="mt-4 grid grid-cols-3 gap-3">
                <MiniStat icon={Droplets} label="Water" value="2.4L" color={BLUE} />
                <MiniStat icon={CheckCircle2} label="Workouts" value="4/5" color={GREEN} />
                <MiniStat icon={Heart} label="Streak" value="12d" color="#EF4444" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* How it works */}
      <Section eyebrow="How it works" eyebrowColor={BLUE} title="Get started in 3 simple steps">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { n: "01", icon: ClipboardList, title: "Complete Assessment", desc: "Tell us your goal, schedule, food preferences and lifestyle." },
            { n: "02", icon: Sparkles, title: "Get Personalized Plan", desc: "Receive a custom Indian diet and home workout plan built for you." },
            { n: "03", icon: LineChart, title: "Track Progress Daily", desc: "Log check-ins, hit your protein, and watch your transformation." },
          ].map(({ n, icon: Icon, title, desc }) => (
            <div
              key={n}
              className="rounded-2xl p-7"
              style={{
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                boxShadow: "0 6px 24px -12px rgba(15,23,42,0.10)",
              }}
            >
              <div className="text-xs font-bold tracking-wider" style={{ color: BLUE }}>
                STEP {n}
              </div>
              <div
                className="mt-3 grid h-12 w-12 place-items-center rounded-2xl text-white"
                style={{ background: `linear-gradient(135deg, ${BLUE}, ${BLUE_DARK})` }}
              >
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-bold" style={{ color: INK, fontFamily: fontHead, letterSpacing: "-0.01em" }}>
                {title}
              </h3>
              <p className="mt-2 text-base leading-relaxed" style={{ color: MUTED }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Beta */}
      <Section bg="#F8FAFC">
        <div
          className="rounded-3xl p-8 md:p-12"
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
                className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight"
                style={{ fontFamily: fontHead, letterSpacing: "-0.025em", color: INK }}
              >
                Join the First 100 Beta Users
              </h2>
              <p className="mt-4 text-lg leading-relaxed" style={{ color: MUTED }}>
                We're building SwasthyaX with our first users. Get free access, shape the product
                with your feedback, and lock in lifetime perks.
              </p>
              <Link
                to="/onboarding"
                className="mt-6 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-bold transition-transform hover:scale-[1.02]"
                style={{
                  background: `linear-gradient(135deg, ${GREEN}, #059669)`,
                  boxShadow: "0 12px 28px -10px rgba(16,185,129,0.5)",
                }}
              >
                Claim Beta Access <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            <div className="grid gap-3">
              {[
                { icon: ShieldCheck, title: "Early access badge", desc: "Founding member status on your profile." },
                { icon: Users, title: "Feedback-driven", desc: "Direct input on what we build next." },
                { icon: IndianRupee, title: "Free during beta", desc: "Full access at no cost while we polish." },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex gap-4 rounded-2xl p-5"
                  style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}
                >
                  <div
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
                    style={{ background: "#EFF6FF", color: BLUE }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold" style={{ color: INK, fontFamily: fontHead }}>
                      {title}
                    </h3>
                    <p className="text-sm mt-0.5" style={{ color: SUBTLE }}>
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <section className="px-4 sm:px-6 py-14 md:py-20">
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
              background: "radial-gradient(600px 200px at 50% 0%, rgba(255,255,255,0.3), transparent)",
            }}
          />
          <h2
            className="relative text-4xl md:text-6xl font-extrabold tracking-tight"
            style={{ fontFamily: fontHead, letterSpacing: "-0.03em" }}
          >
            Start Your Fitness Journey Today
          </h2>
          <p className="relative mt-4 text-lg md:text-xl opacity-95 max-w-2xl mx-auto leading-relaxed">
            No gym required. No expensive coaches. Just a fitness system built for Indian professionals.
          </p>
          <Link
            to="/onboarding"
            className="relative mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-transform hover:scale-[1.03]"
            style={{
              background: "#FFFFFF",
              color: BLUE_DARK,
              boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)",
            }}
          >
            Get Started Free <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 pt-12 pb-10" style={{ borderTop: "1px solid #E2E8F0", background: "#F8FAFC" }}>
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
                <span style={{ fontFamily: fontHead, color: INK }}>SwasthyaX</span>
              </div>
              <p className="mt-4 text-base leading-relaxed max-w-sm" style={{ color: MUTED }}>
                AI-powered fitness coaching designed for Indian working professionals. Affordable,
                sustainable, and built around your life.
              </p>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider" style={{ color: INK }}>
                Product
              </div>
              <ul className="mt-4 space-y-2 text-sm font-medium" style={{ color: SUBTLE }}>
                <li><Link to="/meal-plan" className="hover:text-slate-900">Meal Plans</Link></li>
                <li><Link to="/workout-plan" className="hover:text-slate-900">Workouts</Link></li>
                <li><Link to="/protein-calculator" className="hover:text-slate-900">Protein Calculator</Link></li>
                <li><Link to="/dashboard" className="hover:text-slate-900">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider" style={{ color: INK }}>
                Company
              </div>
              <ul className="mt-4 space-y-2 text-sm font-medium" style={{ color: SUBTLE }}>
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

function Section({
  children,
  eyebrow,
  eyebrowColor,
  title,
  subtitle,
  bg,
}: {
  children: React.ReactNode;
  eyebrow?: string;
  eyebrowColor?: string;
  title?: string;
  subtitle?: string;
  bg?: string;
}) {
  return (
    <section className="px-4 sm:px-6 py-14 md:py-20" style={bg ? { background: bg } : undefined}>
      <div className="max-w-6xl mx-auto">
        {(eyebrow || title) && (
          <div className="text-center mb-10 md:mb-12">
            {eyebrow && (
              <div
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: eyebrowColor || BLUE }}
              >
                {eyebrow}
              </div>
            )}
            {title && (
              <h2
                className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight"
                style={{ fontFamily: fontHead, letterSpacing: "-0.025em", color: INK }}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-3 text-lg max-w-2xl mx-auto" style={{ color: MUTED }}>
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

function PreviewStat({
  icon: Icon,
  tint,
  color,
  label,
  value,
  unit,
  foot,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  tint: string;
  color: string;
  label: string;
  value: string;
  unit: string;
  foot: string;
}) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}
    >
      <div className="flex items-center gap-2.5">
        <div
          className="grid h-9 w-9 place-items-center rounded-lg"
          style={{ background: tint, color }}
        >
          <Icon className="h-4.5 w-4.5" />
        </div>
        <div className="text-xs font-bold uppercase tracking-wider" style={{ color: SUBTLE }}>
          {label}
        </div>
      </div>
      <div className="mt-3 flex items-baseline gap-1.5">
        <div className="text-3xl font-extrabold" style={{ color: INK, fontFamily: fontHead, letterSpacing: "-0.02em" }}>
          {value}
        </div>
        {unit && (
          <div className="text-sm font-bold" style={{ color: SUBTLE }}>
            {unit}
          </div>
        )}
      </div>
      <div className="mt-1.5 text-xs font-semibold" style={{ color: MUTED }}>
        {foot}
      </div>
    </div>
  );
}

function MiniStat({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-xl p-3" style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}>
      <Icon className="h-4 w-4" style={{ color }} />
      <div className="mt-1 text-xs font-semibold" style={{ color: SUBTLE }}>
        {label}
      </div>
      <div className="text-base font-extrabold" style={{ color: INK }}>
        {value}
      </div>
    </div>
  );
}

function Sparkline() {
  const pts = [72, 71.6, 71.2, 70.7, 70.3, 69.9, 69.4, 68.8];
  const min = Math.min(...pts);
  const max = Math.max(...pts);
  const w = 320;
  const h = 80;
  const path = pts
    .map((v, i) => {
      const x = (i / (pts.length - 1)) * w;
      const y = h - ((v - min) / (max - min || 1)) * h;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mt-3 w-full h-20">
      <defs>
        <linearGradient id="sg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={BLUE} stopOpacity="0.25" />
          <stop offset="100%" stopColor={BLUE} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${path} L ${w} ${h} L 0 ${h} Z`} fill="url(#sg)" />
      <path d={path} stroke={BLUE} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}
