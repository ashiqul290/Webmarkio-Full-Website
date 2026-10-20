import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, LockKeyhole, Mail, Phone, UserRound } from "lucide-react";
import { motion } from "motion/react";
import webmarkioLogo from "../assets/logo.png";

type AuthFieldProps = {
  id: string;
  label: string;
  type?: "email" | "password" | "tel" | "text";
  placeholder: string;
  autoComplete: string;
};

function AuthField({ id, label, type = "text", placeholder, autoComplete }: AuthFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const Icon = type === "password" ? LockKeyhole : type === "email" ? Mail : type === "tel" ? Phone : UserRound;
  const isPassword = type === "password";

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs font-medium text-slate-200">
        {label}
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <input
          id={id}
          name={id}
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          className="h-11 w-full rounded-lg border border-white/10 bg-[#1C222D] py-2 pl-10 pr-11 text-sm text-white placeholder:text-slate-500 transition focus:border-[#7650ff] focus:bg-[#202734] focus:outline-none focus:ring-2 focus:ring-[#7650ff]/25"
        />
        {isPassword && (
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((value) => !value)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-white"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
    </div>
  );
}

function AuthPage({ mode }: { mode: "login" | "signup" }) {
  const isSignup = mode === "signup";
  const submitLabel = isSignup ? "Create Account" : "Log In";
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSaving(true);
    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5100/routes/api"}/auth/${isSignup ? "signup" : "login"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "Unable to continue. Please try again.");

      if (isSignup) {
        navigate("/login");
        return;
      }

      localStorage.setItem("webmarkio_auth_token", result.data.token);
      localStorage.setItem("webmarkio_user", JSON.stringify(result.data.user));
      navigate(result.data.user.role === "admin" ? "/admin" : "/");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to continue. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070B13] px-4 py-10 text-white">
      <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-[#6246ea]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 h-96 w-96 rounded-full bg-[#2563eb]/10 blur-3xl" />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0B1019]/95 p-6 shadow-2xl shadow-black/35 sm:px-8"
      >
        <Link to="#" className="mx-auto  flex w-fit items-center" aria-label="Webmarkio home">
          <img src={webmarkioLogo} alt="Webmarkio" className="h-25 w-56 object-contain" />
        </Link>

        <div className="mb-7 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {isSignup ? "Sign Up An Account" : "Welcome Back"}
          </h1>
          <p className="mt-2 text-xs text-slate-400 sm:text-sm">
            {isSignup ? "Enter your details to create your Webmarkio account" : "Enter your email and password to continue"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <AuthField id="name" label="Full Name" placeholder="Enter your full name" autoComplete="name" />
          )}
          <AuthField id="email" label="Email" type="email" placeholder="Enter your email address" autoComplete="email" />
          {isSignup && (
            <AuthField id="phone" label="Phone Number" type="tel" placeholder="Enter your phone number" autoComplete="tel" />
          )}
          <AuthField id="password" label="Password" type="password" placeholder="Enter your password" autoComplete={isSignup ? "new-password" : "current-password"} />

          {!isSignup && (
            <div className="flex justify-end">
              <Link to="/" className="text-xs font-medium text-[#9d86ff] transition hover:text-white">
                Forgot password?
              </Link>
            </div>
          )}

          {error && <p className="rounded-lg border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs text-red-300">{error}</p>}

          <button
            type="submit"
            disabled={saving}
            className="mt-2 h-11 w-full rounded-lg bg-gradient-to-r from-[#6d45f5] to-[#7957f5] text-sm font-semibold text-white shadow-lg shadow-[#6d45f5]/20 transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#9d86ff] focus:ring-offset-2 focus:ring-offset-[#0B1019] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {saving ? "Please wait…" : submitLabel}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-400">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <Link to={isSignup ? "/login" : "/signup"} className="font-semibold text-white underline underline-offset-4 transition hover:text-[#9d86ff]">
            {isSignup ? "Log In" : "Sign Up"}
          </Link>
        </p>
      </motion.section>
    </div>
  );
}

export function LoginPage() {
  return <AuthPage mode="login" />;
}

export function SignupPage() {
  return <AuthPage mode="signup" />;
}
