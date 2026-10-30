import { type FormEvent, useEffect, useState } from "react";
import { Save } from "lucide-react";
import { adminApi, type BannerContent } from "../../lib/adminApi";
import { DEFAULT_BANNER_CONTENT } from "../../data/banner";

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-white/10 bg-[#101016] px-3 py-2.5 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20";
const labelClass = "block text-sm font-medium text-slate-300";

export function AdminBannerPage() {
  const [content, setContent] = useState<BannerContent>(DEFAULT_BANNER_CONTENT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let active = true;
    adminApi
      .getBannerContent()
      .then((data) => {
        if (active) setContent(data);
      })
      .catch((requestError: Error) => {
        if (active) setError(requestError.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const updateField = (field: keyof Omit<BannerContent, "stats">, value: string) => {
    setContent((current) => ({ ...current, [field]: value }));
    setSaved(false);
  };

  const updateStat = (index: number, field: "value" | "label", value: string) => {
    setContent((current) => ({
      ...current,
      stats: current.stats.map((stat, statIndex) =>
        statIndex === index ? { ...stat, [field]: value } : stat,
      ),
    }));
    setSaved(false);
  };

  const saveContent = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSaved(false);
    setSaving(true);
    try {
      const updated = await adminApi.updateBannerContent(content);
      setContent(updated);
      setSaved(true);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to save banner content.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="max-w-4xl">
      <header className="mb-7">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#10B981]">
          Website content
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Home banner</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Edit the homepage heading, description, and project/client stats.
        </p>
      </header>

      {error && (
        <p role="alert" className="mb-5 rounded-xl border border-rose-400/20 bg-rose-400/[0.08] p-3 text-sm text-rose-200">
          {error}
        </p>
      )}
      {saved && (
        <p role="status" className="mb-5 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.08] p-3 text-sm text-emerald-200">
          Banner content saved successfully.
        </p>
      )}

      <form onSubmit={saveContent} className="space-y-6">
        <fieldset disabled={loading || saving || Boolean(error)} className="space-y-6 disabled:opacity-60">
          <div className="rounded-2xl border border-white/[0.08] bg-[#17171F] p-5 sm:p-6">
            <h3 className="text-base font-semibold text-white">Headline</h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <label className={labelClass}>
                First part
                <input
                  required
                  maxLength={100}
                  value={content.headlineBefore}
                  onChange={(event) => updateField("headlineBefore", event.target.value)}
                  className={fieldClass}
                />
              </label>
              <label className={labelClass}>
                Highlighted part
                <input
                  required
                  maxLength={100}
                  value={content.headlineHighlight}
                  onChange={(event) => updateField("headlineHighlight", event.target.value)}
                  className={fieldClass}
                />
              </label>
              <label className={labelClass}>
                Last part
                <input
                  required
                  maxLength={100}
                  value={content.headlineAfter}
                  onChange={(event) => updateField("headlineAfter", event.target.value)}
                  className={fieldClass}
                />
              </label>
            </div>
            <label className={`${labelClass} mt-5`}>
              Description
              <textarea
                required
                maxLength={500}
                rows={4}
                value={content.description}
                onChange={(event) => updateField("description", event.target.value)}
                className={fieldClass}
              />
            </label>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-[#17171F] p-5 sm:p-6">
            <h3 className="text-base font-semibold text-white">Homepage stats</h3>
            <p className="mt-1 text-sm text-zinc-400">These appear below the banner buttons.</p>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {content.stats.map((stat, index) => (
                <div key={index} className="rounded-xl border border-white/[0.06] bg-[#101016] p-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-emerald-400">
                    Stat {index + 1}
                  </p>
                  <label className={labelClass}>
                    Value
                    <input
                      required
                      maxLength={20}
                      value={stat.value}
                      onChange={(event) => updateStat(index, "value", event.target.value)}
                      className={fieldClass}
                    />
                  </label>
                  <label className={`${labelClass} mt-4`}>
                    Label
                    <input
                      required
                      maxLength={40}
                      value={stat.label}
                      onChange={(event) => updateStat(index, "label", event.target.value)}
                      className={fieldClass}
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>
        </fieldset>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading || saving || Boolean(error)}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {loading ? "Loading…" : saving ? "Saving…" : "Save banner"}
          </button>
          {loading && <span className="text-sm text-zinc-400">Loading banner content…</span>}
        </div>
      </form>
    </section>
  );
}
