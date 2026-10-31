import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  ArrowUpRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import webmarkioLogo from "../assets/logo.png";
import "./AuthPages.css";

type AuthFieldProps = {
  id: string;
  label: string;
  type?: "email" | "password" | "text";
  placeholder: string;
  autoComplete: string;
  error?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

function AuthField({
  id,
  label,
  type = "text",
  placeholder,
  autoComplete,
  error,
  onChange,
}: AuthFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const Icon = isPassword ? LockKeyhole : type === "email" ? Mail : UserRound;

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-[13px] font-medium text-zinc-200">
        {label}
      </label>
      <div className="relative">
        <Icon
          aria-hidden="true"
          className="pointer-events-none absolute left-3.5 top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-zinc-500"
        />
        <input
          id={id}
          name={id}
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={onChange}
          className={`auth-input h-12 w-full rounded-xl border bg-[#101016] pl-11 pr-12 text-sm text-white placeholder:text-zinc-600 ${
            error ? "border-rose-400/60" : "border-white/[0.09]"
          }`}
        />
        {isPassword && (
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((value) => !value)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-zinc-500 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            {showPassword ? (
              <EyeOff aria-hidden="true" className="h-[17px] w-[17px]" />
            ) : (
              <Eye aria-hidden="true" className="h-[17px] w-[17px]" />
            )}
          </button>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className="text-xs text-rose-300" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

type AuthResult = {
  success?: boolean;
  message?: string;
  data?: {
    token?: string;
    user?: {
      name?: string;
      email?: string;
      role?: string;
      [key: string]: unknown;
    };
  };
};

function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const isSignup = location.pathname === "/signup";
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [notice, setNotice] = useState(
    (location.state as { authNotice?: string } | null)?.authNotice ?? "",
  );
  const [saving, setSaving] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add("auth-page");
    return () => document.documentElement.classList.remove("auth-page");
  }, []);

  const clearFieldError = (event: ChangeEvent<HTMLInputElement>) => {
    const { name } = event.currentTarget;
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setNotice("");

    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData.entries());
    const name = String(values.name ?? "").trim();
    const email = String(values.email ?? "").trim();
    const password = String(values.password ?? "");
    const confirmPassword = String(values.confirmPassword ?? "");
    const nextErrors: Record<string, string> = {};

    if (isSignup && !name) nextErrors.name = "Enter your full name.";
    if (!email) nextErrors.email = "Enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!password) nextErrors.password = "Enter your password.";
    if (isSignup && !confirmPassword) {
      nextErrors.confirmPassword = "Confirm your password.";
    } else if (isSignup && password !== confirmPassword) {
      nextErrors.confirmPassword = "Your passwords do not match.";
    }
    if (isSignup && values.terms !== "on") {
      nextErrors.terms = "Please accept the Terms and Conditions to continue.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSaving(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5100/routes/api"}/auth/${isSignup ? "signup" : "login"}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            isSignup ? { name, email, password } : { email, password },
          ),
        },
      );
      const result = (await response.json()) as AuthResult;
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to continue. Please try again.");
      }

      if (isSignup) {
        navigate("/login", {
          state: { authNotice: "Your account is ready. Sign in to continue." },
        });
        return;
      }

      const token = result.data?.token;
      const user = result.data?.user;
      if (!token || !user) {
        throw new Error("The sign-in response was incomplete. Please try again.");
      }

      const { password: _password, ...safeUser } = user;
      const storage = rememberMe ? localStorage : sessionStorage;
      const otherStorage = rememberMe ? sessionStorage : localStorage;
      otherStorage.removeItem("webmarkio_auth_token");
      otherStorage.removeItem("webmarkio_user");
      storage.setItem("webmarkio_auth_token", token);
      storage.setItem("webmarkio_user", JSON.stringify(safeUser));
      navigate(user.role === "admin" ? "/admin" : "/");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to continue. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="auth-shell min-h-screen bg-[#0B0B0F] text-white">
      <div className="grid min-h-screen lg:grid-cols-[1.03fr_0.97fr]">
        <section className="auth-brand relative flex min-h-[310px] flex-col justify-between overflow-hidden px-6 py-7 sm:px-10 sm:py-9 lg:min-h-screen lg:px-[8.5%] lg:py-12">
          <div className="auth-grid-pattern pointer-events-none absolute inset-0 opacity-30" />
          <div className="auth-glow auth-glow-emerald pointer-events-none absolute -left-36 top-24 h-[25rem] w-[25rem] rounded-full" />
          <div className="auth-glow auth-glow-purple pointer-events-none absolute -bottom-48 right-[-8rem] h-[31rem] w-[31rem] rounded-full" />
          <div className="auth-orbit auth-orbit-one pointer-events-none absolute right-[10%] top-[15%] hidden h-72 w-72 rounded-full lg:block" />
          <div className="auth-orbit auth-orbit-two pointer-events-none absolute right-[16%] top-[20%] hidden h-56 w-56 rounded-full lg:block" />

          <Link
            to="/"
            className="relative z-10 inline-flex w-fit items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/75 transition hover:text-white"
          >
            <span className="h-2 w-2 rounded-full bg-[#10B981] shadow-[0_0_14px_#10B981]" />
            Webmarkio <span className="text-white/35">/</span> Growth studio
          </Link>

          <div className="relative z-10 mt-10 max-w-xl lg:mt-0 lg:pb-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-[11px] font-medium tracking-wide text-zinc-300 backdrop-blur-md">
              <Sparkles aria-hidden="true" className="h-3.5 w-3.5 text-[#10B981]" />
              Strategy meets momentum
            </div>
            <h1 className="max-w-[620px] text-[clamp(2.5rem,5.4vw,5.2rem)] font-semibold leading-[1.04] tracking-[-0.055em] text-white">
              Grow Your Business
              <span className="mt-1 block bg-gradient-to-r from-[#10B981] via-[#65D7AD] to-[#A78BFA] bg-clip-text text-transparent">
                With WebMarkio
              </span>
            </h1>
            <p className="mt-6 max-w-md text-sm leading-7 text-zinc-400 sm:text-base">
              Thoughtful digital experiences that turn ambitious ideas into
              lasting growth.
            </p>

            <div className="mt-9 flex items-center gap-4 text-xs text-zinc-400">
              <div className="flex -space-x-2">
                {["A", "M", "S", "W"].map((initial, index) => (
                  <span
                    key={initial}
                    className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#0B0B0F] text-[10px] font-semibold text-white ${
                      index % 2 === 0 ? "bg-[#267A62]" : "bg-[#65508B]"
                    }`}
                  >
                    {initial}
                  </span>
                ))}
              </div>
              <span>
                <span className="font-semibold text-white">Built for teams</span>
                <span className="mx-2 text-zinc-600">·</span>
                Ready for what&apos;s next
              </span>
            </div>
          </div>

          <div className="relative z-10 mt-9 hidden items-center justify-between border-t border-white/[0.09] pt-5 text-[11px] text-zinc-500 lg:flex">
            <span>Independent thinking. Measurable impact.</span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
              Your next chapter starts here
            </span>
          </div>
        </section>

        <section className="flex min-h-[620px] items-center justify-center border-t border-white/[0.06] bg-[#0B0B0F] px-5 py-10 sm:px-8 lg:min-h-screen lg:border-l lg:border-t-0 lg:px-10 lg:py-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="w-full max-w-[440px]"
          >
            <div className="auth-card rounded-[26px] border border-white/[0.08] bg-[#17171F] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.42)] sm:p-9">
              <Link
                to="/"
                aria-label="Webmarkio home"
                className="mx-auto mb-7 flex w-fit items-center justify-center rounded-lg"
              >
                <img
                  src={webmarkioLogo}
                  alt="Webmarkio Agency"
                  className="h-11 w-36 object-contain"
                />
              </Link>

              <AnimatePresence mode="wait">
                <motion.div
                  key={isSignup ? "signup" : "login"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-7 text-center">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#10B981]">
                      {isSignup ? "Start your journey" : "Welcome back"}
                    </p>
                    <h2 className="text-[27px] font-semibold tracking-[-0.04em] text-white">
                      {isSignup ? "Create your account" : "Sign in to WebMarkio"}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">
                      {isSignup
                        ? "A better way to grow starts right here."
                        : "Your next big move is just around the corner."}
                    </p>
                  </div>

                  {(error || notice) && (
                    <div
                      role={error ? "alert" : "status"}
                      className={`mb-5 rounded-xl border px-3.5 py-3 text-xs leading-5 ${
                        error
                          ? "border-rose-400/20 bg-rose-400/[0.08] text-rose-200"
                          : "border-[#10B981]/20 bg-[#10B981]/[0.08] text-emerald-200"
                      }`}
                    >
                      {error || notice}
                    </div>
                  )}

                  <form
                    noValidate
                    onSubmit={handleSubmit}
                    onChange={clearFieldError}
                    className="space-y-[18px]"
                  >
                    {isSignup && (
                      <AuthField
                        id="name"
                        label="Full name"
                        placeholder="Your name"
                        autoComplete="name"
                        error={errors.name}
                        onChange={clearFieldError}
                      />
                    )}
                    <AuthField
                      id="email"
                      label="Email address"
                      type="email"
                      placeholder="you@company.com"
                      autoComplete="email"
                      error={errors.email}
                      onChange={clearFieldError}
                    />
                    <AuthField
                      id="password"
                      label="Password"
                      type="password"
                      placeholder={isSignup ? "Create a password" : "Enter your password"}
                      autoComplete={isSignup ? "new-password" : "current-password"}
                      error={errors.password}
                      onChange={clearFieldError}
                    />

                    {isSignup ? (
                      <>
                        <AuthField
                          id="confirmPassword"
                          label="Confirm password"
                          type="password"
                          placeholder="Enter your password again"
                          autoComplete="new-password"
                          error={errors.confirmPassword}
                          onChange={clearFieldError}
                        />
                        <div>
                          <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-5 text-zinc-400">
                            <input
                              name="terms"
                              type="checkbox"
                              required
                              onChange={clearFieldError}
                              className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/20 bg-[#101016] accent-[#10B981] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]/70"
                            />
                            <span>
                              I agree to the{" "}
                              <Link
                                to="/terms"
                                className="font-medium text-zinc-200 underline decoration-white/25 underline-offset-4 transition hover:text-[#10B981]"
                              >
                                Terms and Conditions
                              </Link>
                            </span>
                          </label>
                          {errors.terms && (
                            <p className="mt-2 text-xs text-rose-300" role="alert">
                              {errors.terms}
                            </p>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center justify-between gap-3 pt-0.5">
                        <label className="flex cursor-pointer items-center gap-2.5 text-xs text-zinc-400">
                          <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(event) => setRememberMe(event.target.checked)}
                            className="h-4 w-4 rounded border-white/20 bg-[#101016] accent-[#10B981] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]/70"
                          />
                          Remember me
                        </label>
                        <button
                          type="button"
                          onClick={() =>
                            setNotice(
                              "Password reset is not available yet. Please contact your account administrator.",
                            )
                          }
                          className="text-xs font-medium text-[#A78BFA] transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA]"
                        >
                          Forgot password?
                        </button>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={saving}
                      className="auth-submit group mt-1 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-[#10B981] px-4 text-sm font-semibold text-[#07120E] transition duration-200 hover:bg-[#34D399] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] focus-visible:ring-offset-2 focus-visible:ring-offset-[#17171F] disabled:cursor-not-allowed disabled:opacity-65"
                    >
                      {saving
                        ? "Please wait..."
                        : isSignup
                          ? "Create Account"
                          : "Sign In"}
                      {!saving && (
                        <ArrowUpRight
                          aria-hidden="true"
                          className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      )}
                    </button>
                  </form>

                  <div className="my-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.15em] text-zinc-600">
                    <span className="h-px flex-1 bg-white/[0.08]" />
                    <span>Private by design</span>
                    <span className="h-px flex-1 bg-white/[0.08]" />
                  </div>
                  <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500">
                    <ShieldCheck aria-hidden="true" className="h-4 w-4 text-[#10B981]" />
                    Your information is protected and encrypted
                  </div>

                  <p className="mt-7 text-center text-sm text-zinc-400">
                    {isSignup ? "Already have an account?" : "New to WebMarkio?"}{" "}
                    <Link
                      to={isSignup ? "/login" : "/signup"}
                      className="font-semibold text-white underline decoration-[#10B981]/60 underline-offset-4 transition hover:text-[#10B981]"
                    >
                      {isSignup ? "Sign in" : "Create account"}
                    </Link>
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
            <p className="mt-5 text-center text-[11px] text-zinc-600">
              © {new Date().getFullYear()} WebMarkio Agency. All rights reserved.
            </p>
          </motion.div>
        </section>
      </div>
    </main>
  );
}

export function LoginPage() {
  return <AuthPage />;
}

export function SignupPage() {
  return <AuthPage />;
}
