import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";


export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Admin Login — Zervine Kitchen" },
      {
        name: "description",
        content:
          "Halaman masuk admin Zervine Kitchen untuk melihat rekap pesanan pre-order mentai.",
      },
      { property: "og:title", content: "Admin Login — Zervine Kitchen" },
      {
        property: "og:description",
        content: "Masuk untuk mengelola rekap pesanan Zervine Kitchen.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

const inputClass =
  "w-full rounded-xl border border-brand-charcoal/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-salmon";

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setInfo("");
    setBusy(true);
    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin },
      });
      setBusy(false);
      if (error) return setError(error.message);
      if (!data.session) {
        setInfo("Cek email kamu untuk konfirmasi, lalu masuk kembali.");
        return;
      }
      navigate({ to: "/admin" });
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setBusy(false);
    if (error) return setError(error.message);
    navigate({ to: "/admin" });
  }

  async function handleGoogle() {
    setError("");
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setError("Gagal masuk dengan Google. Coba lagi.");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/admin" });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-cream px-6 py-16 font-sans text-brand-charcoal">
      <div className="w-full max-w-md rounded-2xl border border-brand-charcoal/10 bg-white p-8 shadow-sm">
        <h1 className="font-display text-3xl font-bold">Admin Zervine</h1>
        <p className="mt-2 text-sm text-brand-charcoal/60">
          Masuk untuk melihat rekap pesanan pre-order.
        </p>

        <button
          type="button"
          onClick={handleGoogle}
          className="mt-8 w-full rounded-full border border-brand-charcoal/20 px-6 py-3 text-sm font-semibold transition-colors hover:bg-brand-cream"
        >
          Lanjut dengan Google
        </button>

        <div className="my-6 flex items-center gap-4 text-[11px] uppercase tracking-widest text-brand-charcoal/40">
          <span className="h-px flex-1 bg-brand-charcoal/10" /> atau
          <span className="h-px flex-1 bg-brand-charcoal/10" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Email"
            className={inputClass}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder="Password"
            className={inputClass}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-sm text-brand-salmon">{error}</p>}
          {info && <p className="text-sm text-brand-charcoal/70">{info}</p>}
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-full bg-brand-charcoal px-6 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-brand-salmon disabled:opacity-60"
          >
            {busy ? "Memproses..." : mode === "signin" ? "Masuk" : "Daftar"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-6 w-full text-xs font-semibold uppercase tracking-widest text-brand-charcoal/50 hover:text-brand-salmon"
        >
          {mode === "signin"
            ? "Belum punya akun admin? Daftar"
            : "Sudah punya akun? Masuk"}
        </button>
      </div>
    </main>
  );
}
