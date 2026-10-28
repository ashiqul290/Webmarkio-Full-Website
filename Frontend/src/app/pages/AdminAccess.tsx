import { type ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { adminApi, ApiError } from "../../lib/adminApi";

export function AdminAccess({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [state, setState] = useState<"checking" | "allowed" | "error">("checking");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const hasToken =
      localStorage.getItem("webmarkio_auth_token") ||
      sessionStorage.getItem("webmarkio_auth_token");

    if (!hasToken) {
      navigate("/login", { replace: true, state: { from: location.pathname } });
      return () => {
        active = false;
      };
    }

    adminApi
      .getCurrentUser()
      .then((user) => {
        if (!active) return;
        if (user.role !== "admin") {
          navigate("/", { replace: true });
          return;
        }
        const storage = localStorage.getItem("webmarkio_auth_token")
          ? localStorage
          : sessionStorage;
        storage.setItem("webmarkio_user", JSON.stringify(user));
        setState("allowed");
      })
      .catch((requestError: unknown) => {
        if (!active) return;
        if (requestError instanceof ApiError && requestError.status === 401) {
          localStorage.removeItem("webmarkio_auth_token");
          localStorage.removeItem("webmarkio_user");
          sessionStorage.removeItem("webmarkio_auth_token");
          sessionStorage.removeItem("webmarkio_user");
          navigate("/login", { replace: true, state: { from: location.pathname } });
          return;
        }
        if (requestError instanceof ApiError && requestError.status === 403) {
          navigate("/", { replace: true });
          return;
        }
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Unable to verify administrator access.",
        );
        setState("error");
      });

    return () => {
      active = false;
    };
  }, [location.pathname, navigate]);

  if (state === "allowed") return children;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0B0B0F] px-5 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#17171F] p-7 text-center">
        {state === "checking" ? (
          <>
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#10B981]" />
            <p className="mt-4 text-sm text-zinc-300">Verifying administrator access…</p>
          </>
        ) : (
          <>
            <h1 className="text-lg font-semibold">Unable to verify access</h1>
            <p className="mt-2 text-sm text-zinc-400">{error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 rounded-lg bg-[#10B981] px-4 py-2 text-sm font-semibold text-[#07120E]"
            >
              Try again
            </button>
          </>
        )}
      </div>
    </main>
  );
}
