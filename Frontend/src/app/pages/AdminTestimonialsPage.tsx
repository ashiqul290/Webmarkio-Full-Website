import { type FormEvent, useEffect, useState } from "react";
import { Pencil, Plus, Save, Trash2, X } from "lucide-react";
import { testimonials as defaultTestimonials } from "../../data/testimonials";
import { adminApi, type AdminTestimonial } from "../../lib/adminApi";

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-white/10 bg-[#101016] px-3 py-2.5 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20";
const labelClass = "block text-sm font-medium text-slate-300";
const emptyTestimonial: Omit<AdminTestimonial, "id"> = {
  name: "",
  role: "",
  company: "",
  image: "",
  video: "",
  text: "",
  serviceType: "",
  rating: 5,
};

const defaultReviews: AdminTestimonial[] = defaultTestimonials.map((testimonial) => ({
  id: testimonial.id,
  name: testimonial.name,
  role: testimonial.role,
  company: testimonial.company,
  image: testimonial.avatar,
  video: testimonial.video || "",
  text: testimonial.text,
  serviceType: testimonial.role || "Digital services",
  rating: testimonial.rating,
}));

export function AdminTestimonialsPage() {
  const [reviews, setReviews] = useState<AdminTestimonial[]>(defaultReviews);
  const [draft, setDraft] = useState<Omit<AdminTestimonial, "id">>(emptyTestimonial);
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
      .getTestimonials()
      .then((content) => {
        if (active && content.initialized) setReviews(content.testimonials);
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

  const startNewReview = () => {
    setDraft(emptyTestimonial);
    setEditingId("");
    setFormOpen(true);
    setError("");
    setNotice("");
  };

  const startEditing = (review: AdminTestimonial) => {
    const { id, ...reviewDraft } = review;
    setDraft(reviewDraft);
    setEditingId(id);
    setFormOpen(true);
    setError("");
    setNotice("");
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId("");
    setDraft(emptyTestimonial);
  };

  const saveReview = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setNotice("");
    setSaving(true);
    const updatedReviews = editingId
      ? reviews.map((review) => (review.id === editingId ? { ...draft, id: editingId } : review))
      : [...reviews, { ...draft, id: crypto.randomUUID() }];
    try {
      const saved = await adminApi.updateTestimonials(updatedReviews);
      setReviews(saved.testimonials);
      setNotice(editingId ? "Review updated successfully." : "Review added successfully.");
      closeForm();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to save review.");
    } finally {
      setSaving(false);
    }
  };

  const deleteReview = async (id: string) => {
    if (!window.confirm("Delete this testimonial? This will also remove it from the website.")) return;
    setError("");
    setNotice("");
    setDeletingId(id);
    try {
      const saved = await adminApi.updateTestimonials(reviews.filter((review) => review.id !== id));
      setReviews(saved.testimonials);
      setNotice("Review deleted successfully.");
      if (editingId === id) closeForm();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to delete review.");
    } finally {
      setDeletingId("");
    }
  };

  const updateDraft = <K extends keyof Omit<AdminTestimonial, "id">,>(
    field: K,
    value: Omit<AdminTestimonial, "id">[K],
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
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Testimonials</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Add client reviews and manage the testimonials shown on the homepage.
          </p>
        </div>
        <button
          type="button"
          onClick={startNewReview}
          disabled={loading || Boolean(error)}
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus className="h-4 w-4" />
          Add review
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
          onSubmit={saveReview}
          className="mb-6 space-y-5 rounded-2xl border border-white/[0.08] bg-[#17171F] p-5 sm:p-6"
        >
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-lg font-semibold text-white">
              {editingId ? "Edit review" : "Add a client review"}
            </h3>
            <button type="button" onClick={closeForm} aria-label="Close form" className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className={labelClass}>
              Client name <span className="text-zinc-500">(optional)</span>
              <input
                maxLength={100}
                value={draft.name}
                onChange={(event) => updateDraft("name", event.target.value)}
                className={fieldClass}
                placeholder="Client name"
              />
            </label>
            <label className={labelClass}>
              Company name <span className="text-zinc-500">(optional)</span>
              <input
                maxLength={100}
                value={draft.company}
                onChange={(event) => updateDraft("company", event.target.value)}
                className={fieldClass}
                placeholder="Company"
              />
            </label>
            <label className={labelClass}>
              Service type
              <input
                required
                maxLength={100}
                value={draft.serviceType}
                onChange={(event) => updateDraft("serviceType", event.target.value)}
                className={fieldClass}
                placeholder="e.g. Website Design"
              />
            </label>
            <label className={labelClass}>
              Client role <span className="text-zinc-500">(optional)</span>
              <input
                maxLength={100}
                value={draft.role}
                onChange={(event) => updateDraft("role", event.target.value)}
                className={fieldClass}
                placeholder="e.g. Founder"
              />
            </label>
            <label className={labelClass}>
              Client image URL <span className="text-zinc-500">(optional)</span>
              <input
                type="url"
                maxLength={2048}
                value={draft.image}
                onChange={(event) => updateDraft("image", event.target.value)}
                className={fieldClass}
                placeholder="https://example.com/client.jpg"
              />
            </label>
            <label className={labelClass}>
              Video URL <span className="text-zinc-500">(optional)</span>
              <input
                type="url"
                maxLength={2048}
                value={draft.video}
                onChange={(event) => updateDraft("video", event.target.value)}
                className={fieldClass}
                placeholder="https://..."
              />
            </label>
            <label className={labelClass}>
              Rating
              <select
                value={draft.rating}
                onChange={(event) => updateDraft("rating", Number(event.target.value))}
                className={fieldClass}
              >
                {[5, 4, 3, 2, 1].map((rating) => (
                  <option key={rating} value={rating}>{rating} star{rating === 1 ? "" : "s"}</option>
                ))}
              </select>
            </label>
          </div>

          <label className={labelClass}>
            Review message
            <textarea
              required
              maxLength={2000}
              rows={5}
              value={draft.text}
              onChange={(event) => updateDraft("text", event.target.value)}
              className={fieldClass}
              placeholder="Write the client's review..."
            />
          </label>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {editingId ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              {saving ? "Saving…" : editingId ? "Save changes" : "Add review"}
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
          Loading testimonials…
        </p>
      ) : reviews.length === 0 ? (
        <p className="rounded-xl border border-white/[0.08] bg-[#17171F] p-5 text-sm text-zinc-400">
          No testimonials yet. Add a review to show one on the homepage.
        </p>
      ) : (
        <div className="space-y-3">
          {reviews.map((review) => (
            <article key={review.id} className="flex flex-col gap-4 rounded-2xl border border-white/[0.08] bg-[#17171F] p-5 sm:flex-row sm:items-start">
              {review.image ? (
                <img src={review.image} alt="" className="h-12 w-12 rounded-full object-cover" />
              ) : (
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-lg font-semibold text-emerald-300">
                  {(review.name || review.company || "C").charAt(0).toUpperCase()}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <h3 className="font-semibold text-white">{review.name || "Anonymous client"}</h3>
                  {review.company && <span className="text-sm text-zinc-400">{review.company}</span>}
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
                    {review.serviceType}
                  </span>
                </div>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-300">{review.text}</p>
                {review.video && (
                  <a href={review.video} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs font-medium text-blue-300 hover:text-blue-200">
                    Video attached
                  </a>
                )}
              </div>
              <div className="flex shrink-0 gap-1">
                <button type="button" onClick={() => startEditing(review)} aria-label="Edit review" className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-emerald-400">
                  <Pencil className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => deleteReview(review.id)} disabled={deletingId === review.id} aria-label="Delete review" className="rounded-lg p-2 text-red-400 transition hover:bg-red-500/10 disabled:opacity-50">
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
