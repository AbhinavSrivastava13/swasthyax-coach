import { useEffect, useState } from "react";

export type Goal = "Fat Loss" | "Muscle Gain";
export type Gender = "Male" | "Female" | "Other";
export type Activity = "Sedentary" | "Lightly Active" | "Active";
export type Food = "Vegetarian" | "Eggetarian" | "Non-Vegetarian";
export type Equipment = "No equipment" | "Dumbbells";

export type Profile = {
  name: string;
  age: number;
  gender: Gender;
  height: number; // cm
  weight: number; // kg
  goalWeight: number;
  goal: Goal;
  timelineWeeks: number;
  workMode: "Remote" | "Hybrid" | "Office";
  activity: Activity;
  food: Food;
  equipment: Equipment;
  budget: number;
  createdAt: string;
};

export type CheckIn = {
  date: string; // YYYY-MM-DD
  weight: number;
  water: number;
  workoutDone: boolean;
  protein?: number;
};

const PROFILE_KEY = "swasthyax.profile";
const CHECKIN_KEY = "swasthyax.checkins";

export function loadProfile(): Profile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(PROFILE_KEY);
    return raw ? (JSON.parse(raw) as Profile) : null;
  } catch {
    return null;
  }
}

export function saveProfile(p: Profile) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
  window.dispatchEvent(new Event("swasthyax:profile"));
}

export function clearProfile() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(PROFILE_KEY);
  window.dispatchEvent(new Event("swasthyax:profile"));
}

export function loadCheckIns(): CheckIn[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CHECKIN_KEY);
    return raw ? (JSON.parse(raw) as CheckIn[]) : [];
  } catch {
    return [];
  }
}

export function saveCheckIn(c: CheckIn) {
  const all = loadCheckIns().filter((x) => x.date !== c.date);
  all.push(c);
  all.sort((a, b) => a.date.localeCompare(b.date));
  window.localStorage.setItem(CHECKIN_KEY, JSON.stringify(all));
  window.dispatchEvent(new Event("swasthyax:checkins"));
}

/** Client-only hook. Returns { profile, ready }. ready=true once we've read localStorage. */
export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProfile(loadProfile());
    setReady(true);
    const handler = () => setProfile(loadProfile());
    window.addEventListener("swasthyax:profile", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("swasthyax:profile", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return { profile, ready, setProfile: (p: Profile) => { saveProfile(p); setProfile(p); } };
}

export function useCheckIns() {
  const [items, setItems] = useState<CheckIn[]>([]);
  useEffect(() => {
    setItems(loadCheckIns());
    const handler = () => setItems(loadCheckIns());
    window.addEventListener("swasthyax:checkins", handler);
    return () => window.removeEventListener("swasthyax:checkins", handler);
  }, []);
  return items;
}
