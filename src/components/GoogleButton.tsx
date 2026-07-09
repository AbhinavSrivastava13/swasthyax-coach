import { useState } from "react";
import { useAuth } from "@/lib/auth";

export function GoogleButton({ label = "Continue with Google" }: { label?: string }) {
  const { signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onClick = async () => {
    setLoading(true);
    setError(null);
    const { error: err } = await signInWithGoogle();
    setLoading(false);
    if (err) setError(err.message);
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={onClick}
        disabled={loading}
        className="w-full inline-flex items-center justify-center gap-3 py-2.5 rounded-lg border border-border bg-card hover:bg-accent text-sm font-semibold transition disabled:opacity-60"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
          <path fill="#4285F4" d="M23.06 12.25c0-.85-.08-1.66-.22-2.44H12v4.63h6.2c-.27 1.43-1.08 2.65-2.3 3.47v2.88h3.72c2.18-2.01 3.44-4.97 3.44-8.54z"/>
          <path fill="#34A853" d="M12 24c3.11 0 5.72-1.03 7.62-2.79l-3.72-2.88c-1.03.69-2.35 1.1-3.9 1.1-3 0-5.55-2.03-6.46-4.76H1.7v2.98A11.99 11.99 0 0 0 12 24z"/>
          <path fill="#FBBC05" d="M5.54 14.67a7.19 7.19 0 0 1 0-4.6V7.09H1.7A11.99 11.99 0 0 0 0 12c0 1.94.46 3.77 1.7 5.4l3.84-2.73z"/>
          <path fill="#EA4335" d="M12 4.76c1.69 0 3.21.58 4.4 1.72l3.3-3.3C17.71 1.19 15.11 0 12 0 7.34 0 3.32 2.7 1.7 6.6l3.84 2.98C6.45 6.86 9 4.76 12 4.76z"/>
        </svg>
        {loading ? "Redirecting..." : label}
      </button>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
