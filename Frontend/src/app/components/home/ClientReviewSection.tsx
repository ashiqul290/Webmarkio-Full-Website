import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { testimonials } from "../../../data/testimonials";
import { Dialog, DialogContent } from "../ui/dialog";
import { adminApi, type AdminTestimonial } from "../../../lib/adminApi";

const defaultReviews: AdminTestimonial[] = testimonials.map((testimonial) => ({
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

function normalizeVideoUrl(url: string) {
  if (!url) return url;
  const ytShort = url.match(/youtu\.be\/([\w-]+)/);
  if (ytShort) return `https://www.youtube.com/embed/${ytShort[1]}`;
  const ytWatch = url.match(/[?&]v=([\w-]+)/);
  if (ytWatch) return `https://www.youtube.com/embed/${ytWatch[1]}`;
  const embed = url.match(/youtube\.com\/embed\/([\w-]+)/);
  if (embed) return url;
  return url;
}

function isVideoUrl(url: string) {
  if (!url) return false;
  return /youtu\.be\//.test(url) || /youtube\.com\/(watch\?|embed\/)/.test(url) || /\.mp4$/.test(url);
}

function getVideoThumbnail(url: string) {
  if (!url) return "";
  const shortMatch = url.match(/youtu\.be\/([\w-]+)/);
  if (shortMatch) return `https://img.youtube.com/vi/${shortMatch[1]}/hqdefault.jpg`;
  const watchMatch = url.match(/[?&]v=([\w-]+)/);
  if (watchMatch) return `https://img.youtube.com/vi/${watchMatch[1]}/hqdefault.jpg`;
  const embedMatch = url.match(/youtube\.com\/embed\/([\w-]+)/);
  if (embedMatch) return `https://img.youtube.com/vi/${embedMatch[1]}/hqdefault.jpg`;
  return "";
}

export function ClientReviewSection() {
  const [mediaSrc, setMediaSrc] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"video" | "image" | "none" | null>(null);
  const [reviews, setReviews] = useState(defaultReviews);

  useEffect(() => {
    let active = true;
    adminApi
      .getTestimonials()
      .then((content) => {
        if (active && content.initialized) setReviews(content.testimonials);
      })
      .catch((error) => {
        console.error("Unable to load client reviews.", error);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="pb-24 text-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-violet-400 uppercase tracking-widest">Testimonials</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-extrabold">What Our <span className="text-indigo-400">Clients Say</span></h2>
          <p className="mt-3 text-slate-300">Real people. Real stories. Real results with WebMarkio.</p>
        </div>

        {reviews.length === 0 ? (
          <p className="py-12 text-center text-slate-400">Client reviews will appear here soon.</p>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {reviews.map((t) => (
            <div key={t.id} className="p-6 bg-[#071025]/50 border border-white/5 rounded-2xl">
              <div className="relative rounded-xl overflow-hidden mb-4 bg-slate-900">
                {t.video && isVideoUrl(t.video) ? (
                  <img
                    src={getVideoThumbnail(t.video)}
                    alt={t.name || "Client video"}
                    className="w-full h-44 object-cover opacity-60"
                  />
                ) : (
                  <div className="flex h-44 w-full items-center justify-center bg-slate-900 text-slate-400">
                    <span className="text-sm uppercase tracking-[0.24em]">No Video</span>
                  </div>
                )}
                <button
                  onClick={() => {
                    if (t.video && isVideoUrl(t.video)) {
                      setMediaType('video');
                      setMediaSrc(normalizeVideoUrl(t.video));
                    } else {
                      setMediaType('none');
                      setMediaSrc(null);
                    }
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur flex items-center justify-center px-3 text-center">
                    {t.video && isVideoUrl(t.video) ? (
                      <Play className="w-6 h-6 text-white" />
                    ) : (
                      <span className="text-xs font-semibold uppercase text-white tracking-[0.24em]">No Video</span>
                    )}
                  </div>
                </button>
              </div>

              <div className="flex items-center gap-3 mb-3">
                {t.image ? (
                  <img src={t.image} alt={t.name || "Client"} className="w-12 h-12 rounded-full object-cover border border-white/10" />
                ) : (
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-violet-500/15 font-semibold text-violet-300">
                    {(t.name || t.company || "C").charAt(0).toUpperCase()}
                  </span>
                )}
                <div>
                <div className="font-semibold">{t.name || "Anonymous client"}</div>
                <div className="text-sm text-slate-400">
                  {[t.role, t.company].filter(Boolean).join(" — ") || t.serviceType}
                </div>
                </div>
              </div>

              <p className="text-slate-300 mb-4 line-clamp-4">{t.text}</p>

              <div className="mt-4">
                <span className="inline-block px-3 py-1 text-sm bg-violet-900/40 text-violet-300 rounded-full">{t.serviceType}</span>
              </div>
            </div>
          ))}
        </div>
        )}

        {/* No navigation controls — showing fixed set of cards */}
      </div>

      <Dialog open={mediaType !== null} onOpenChange={(v) => { if (!v) { setMediaSrc(null); setMediaType(null); } }}>
        <DialogContent className="!w-[70vw] !max-w-[700px] !max-h-[65vh] !p-0 overflow-hidden">
          {mediaType === "video" && mediaSrc ? (
            <div className="w-full h-[45vh] sm:h-[50vh] md:h-[55vh]">
              <iframe
                src={mediaSrc}
                title="Client video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          ) : mediaType === "none" ? (
            <div className="flex h-[45vh] items-center justify-center bg-slate-950 text-slate-100 text-center px-6">
              <div>
                <p className="text-2xl font-semibold">No Video</p>
                <p className="mt-2 text-sm text-slate-400">This testimonial does not include a video.</p>
              </div>
            </div>
          ) : mediaSrc ? (
            <div className="w-full">
              <img src={mediaSrc} alt="Media" className="w-full h-auto rounded-md" />
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default ClientReviewSection;
