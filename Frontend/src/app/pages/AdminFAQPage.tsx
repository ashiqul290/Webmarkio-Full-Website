import { type FormEvent, useEffect, useState } from "react";
import { Pencil, Plus, Save, Trash2, X } from "lucide-react";
import { faqItems as defaultFaqItems } from "../../data/faq";
import { adminApi, type AdminFaqItem } from "../../lib/adminApi";

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-white/10 bg-[#101016] px-3 py-2.5 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20";
const labelClass = "block text-sm font-medium text-slate-300";
const emptyFaq: Omit<AdminFaqItem, "id"> = {
  question: "",
  answer: "",
  category: "General",
};
const defaultItems: AdminFaqItem[] = defaultFaqItems.map((item) => ({ ...item }));

export function AdminFAQPage() {
  const [items, setItems] = useState<AdminFaqItem[]>(defaultItems);
  const [draft, setDraft] = useState<Omit<AdminFaqItem, "id">>(emptyFaq);
  const [editingId, setEditingId] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let active = true;
    adminApi
      .getFaq()
      .then((content) => {
        if (active && content.initialized) setItems(content.faqItems);
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

  const startNewFaq = () => {
    setDraft(emptyFaq);
    setEditingId("");
    setFormOpen(true);
    setError("");
    setNotice("");
  };

  const startEditing = (item: AdminFaqItem) => {
    const { id, ...faqDraft } = item;
    setDraft(faqDraft);
    setEditingId(id);
    setFormOpen(true);
    setError("");
    setNotice("");
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId("");
    setDraft(emptyFaq);
  };

  const saveFaq = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setNotice("");
    setSaving(true);
    try {
      const saved = editingId
        ? await adminApi.updateFaqItem({ ...draft, id: editingId })
        : await adminApi.updateFaq([
            ...items,
            { ...draft, id: crypto.randomUUID() },
          ]);
      setItems(saved.faqItems);
      setNotice(editingId ? "FAQ updated successfully." : "FAQ added successfully.");
      closeForm();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to save FAQ.");
    } finally {
      setSaving(false);
    }
  };

  const deleteFaq = async (id: string) => {
    if (!window.confirm("Delete this question and answer from the website?")) return;
    setError("");
    setNotice("");
    setDeletingId(id);
    try {
      const saved = await adminApi.updateFaq(items.filter((item) => item.id !== id));
      setItems(saved.faqItems);
      setNotice("FAQ deleted successfully.");
      if (editingId === id) closeForm();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to delete FAQ.");
    } finally {
      setDeletingId("");
    }
  };

  const updateDraft = <K extends keyof Omit<AdminFaqItem, "id">,>(
    field: K,
    value: Omit<AdminFaqItem, "id">[K],
  ) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  return (
    <section className="max-w-5xl">
      <header className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#10B981]">
            Website content
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">FAQ</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Add, edit, or remove the questions and answers shown across your website.
          </p>
        </div>
        <button
          type="button"
          onClick={startNewFaq}
          disabled={loading || Boolean(error)}
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus className="h-4 w-4" />
          Add FAQ
        </button>
      </header>

      {error && (
        <p role="alert" className="mb-5 rounded-xl border border-rose-400/20 bg-rose-400/[0.08] p-3 text-sm text-rose-200">
          {error}
        </p>
      )}
      {notice && (
        <p role="status" className="mb-5 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.08] p-3 text-sm text-emerald-200">
          {notice}
        </p>
      )}

      {formOpen && (
        <form
          onSubmit={saveFaq}
          className="mb-6 space-y-5 rounded-2xl border border-white/[0.08] bg-[#17171F] p-5 sm:p-6"
        >
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-lg font-semibold text-white">
              {editingId ? "Edit FAQ" : "Add a question"}
            </h3>
            <button type="button" onClick={closeForm} aria-label="Close form" className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>

          <label className={labelClass}>
            Question
            <input
              required
              maxLength={300}
              value={draft.question}
              onChange={(event) => updateDraft("question", event.target.value)}
              className={fieldClass}
              placeholder="Enter a frequently asked question"
            />
          </label>

          <label className={labelClass}>
            Answer
            <textarea
              required
              maxLength={3000}
              rows={5}
              value={draft.answer}
              onChange={(event) => updateDraft("answer", event.target.value)}
              className={fieldClass}
              placeholder="Write the answer"
            />
          </label>

          <label className={labelClass}>
            Category <span className="text-zinc-500">(optional)</span>
            <input
              maxLength={100}
              value={draft.category}
              onChange={(event) => updateDraft("category", event.target.value)}
              className={fieldClass}
              placeholder="General"
            />
          </label>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {editingId ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              {saving ? "Saving…" : editingId ? "Save changes" : "Add FAQ"}
            </button>
            <button
              type="button"
              onClick={closeForm}
              className="rounded-lg border border-white/10 px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/5"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="rounded-xl border border-white/[0.08] bg-[#17171F] p-5 text-sm text-zinc-400">
          Loading FAQs…
        </p>
      ) : items.length === 0 ? (
        <p className="rounded-xl border border-white/[0.08] bg-[#17171F] p-5 text-sm text-zinc-400">
          No FAQs yet. Add a question and answer to show it on the website.
        </p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <article key={item.id} className="flex flex-col gap-4 rounded-2xl border border-white/[0.08] bg-[#17171F] p-5 sm:flex-row sm:items-start">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-white">{item.question}</h3>
                  {item.category && (
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
                      {item.category}
                    </span>
                  )}
                </div>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-zinc-300">{item.answer}</p>
              </div>
              <div className="flex shrink-0 gap-1">
                <button type="button" onClick={() => startEditing(item)} aria-label="Edit FAQ" className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-emerald-400">
                  <Pencil className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => deleteFaq(item.id)} disabled={deletingId === item.id} aria-label="Delete FAQ" className="rounded-lg p-2 text-red-400 transition hover:bg-red-500/10 disabled:opacity-50">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
