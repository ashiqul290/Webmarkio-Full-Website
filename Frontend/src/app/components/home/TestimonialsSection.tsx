<<<<<<< HEAD
import { useEffect, useState } from "react";
=======
import { useState } from "react";
>>>>>>> origin/main
import { motion, AnimatePresence } from "motion/react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "../../../data/testimonials";
import { SectionHeading } from "../shared/SectionHeading";
<<<<<<< HEAD
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

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [reviews, setReviews] = useState(defaultReviews);

  useEffect(() => {
    let active = true;
    adminApi
      .getTestimonials()
      .then((content) => {
        if (active && content.initialized) {
          setReviews(content.testimonials);
          setCurrent(0);
        }
      })
      .catch((error) => {
        console.error("Unable to load homepage testimonials.", error);
      });

    return () => {
      active = false;
    };
  }, []);

  const prev = () => setCurrent((index) => (index === 0 ? reviews.length - 1 : index - 1));
  const next = () => setCurrent((index) => (index === reviews.length - 1 ? 0 : index + 1));

  return (
    <section id="testimonials" className="py-24 bg-slate-50 dark:bg-[#0A0F1E] overflow-hidden">
=======

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(c => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent(c => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section className="py-24 bg-slate-50 dark:bg-[#0A0F1E] overflow-hidden">
>>>>>>> origin/main
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Testimonials"
          title="What Our Clients Say"
          subtitle="Don't take our word for it. Here's what the people we've worked with have to say about working with WebMarkio."
        />

<<<<<<< HEAD
        {reviews.length === 0 ? (
          <p className="mx-auto max-w-3xl text-center text-slate-500 dark:text-slate-400">
            Client reviews will appear here soon.
          </p>
        ) : <>
=======
>>>>>>> origin/main
        {/* Featured Testimonial */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative p-8 md:p-12 bg-white dark:bg-[#0F172A] border border-slate-100 dark:border-white/5 rounded-3xl shadow-xl">
            <Quote className="absolute top-8 right-8 w-16 h-16 text-[#2563EB]/10" />
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex gap-1 mb-6">
<<<<<<< HEAD
                  {Array.from({ length: reviews[current].rating }, (_, i) => (
=======
                  {[1, 2, 3, 4, 5].map(i => (
>>>>>>> origin/main
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-xl md:text-2xl text-[#1E293B] dark:text-white leading-relaxed mb-8 [font-family:'Plus_Jakarta_Sans',sans-serif]">
<<<<<<< HEAD
                  "{reviews[current].text}"
                </p>
                <div className="flex items-center gap-4">
                  {reviews[current].image ? (
                    <img
                      src={reviews[current].image}
                      alt={reviews[current].name || "Client"}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#2563EB]/20"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2563EB]/10 font-semibold text-[#2563EB]">
                      {(reviews[current].name || reviews[current].company || "C").charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-[#1E293B] dark:text-white">{reviews[current].name || "Anonymous client"}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {[reviews[current].role, reviews[current].company, reviews[current].serviceType].filter(Boolean).join(" · ")}
                    </div>
                  </div>
                </div>
                {reviews[current].video && (
                  <a
                    href={reviews[current].video}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex text-sm font-semibold text-[#2563EB] hover:underline"
                  >
                    Watch client video
                  </a>
                )}
=======
                  "{testimonials[current].text}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonials[current].avatar}
                    alt={testimonials[current].name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#2563EB]/20"
                  />
                  <div>
                    <div className="font-semibold text-[#1E293B] dark:text-white">{testimonials[current].name}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">{testimonials[current].role} at {testimonials[current].company}</div>
                  </div>
                </div>
>>>>>>> origin/main
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <div className="flex gap-2">
<<<<<<< HEAD
                {reviews.map((_, i) => (
=======
                {testimonials.map((_, i) => (
>>>>>>> origin/main
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`rounded-full transition-all ${i === current ? "w-6 h-2 bg-[#2563EB]" : "w-2 h-2 bg-slate-200 dark:bg-white/20 hover:bg-slate-300"}`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={prev} className="w-10 h-10 border border-slate-200 dark:border-white/10 rounded-full flex items-center justify-center text-slate-500 hover:border-[#2563EB] hover:text-[#2563EB] transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={next} className="w-10 h-10 border border-slate-200 dark:border-white/10 rounded-full flex items-center justify-center text-slate-500 hover:border-[#2563EB] hover:text-[#2563EB] transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Centered previous/current/next testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
<<<<<<< HEAD
            (current - 1 + reviews.length) % reviews.length,
            current,
            (current + 1) % reviews.length,
          ].map((index, i) => {
            const t = reviews[index];
=======
            (current - 1 + testimonials.length) % testimonials.length,
            current,
            (current + 1) % testimonials.length,
          ].map((index, i) => {
            const t = testimonials[index];
>>>>>>> origin/main
            const isActive = index === current;

            return (
              <motion.button
                key={t.id}
                type="button"
                onClick={() => setCurrent(index)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`text-left rounded-3xl transition-all duration-200 focus:outline-none ${
                  isActive
                    ? "bg-[#0F172A] dark:bg-[#0F172A] border-2 border-[#2563EB] shadow-xl scale-[1.03] p-6"
                    : "bg-white dark:bg-[#0F172A] border border-slate-100 dark:border-white/5 hover:border-[#2563EB] hover:shadow-lg p-4"
                }`}
              >
                <div className="flex gap-0.5 mb-3">
<<<<<<< HEAD
                  {Array.from({ length: t.rating }, (_, s) => (
=======
                  {[1, 2, 3, 4, 5].map(s => (
>>>>>>> origin/main
                    <Star key={s} className={`w-3.5 h-3.5 fill-yellow-400 text-yellow-400 ${isActive ? "" : "opacity-80"}`} />
                  ))}
                </div>
                <p className={`${isActive ? "text-white" : "text-slate-600 dark:text-slate-300"} text-sm leading-relaxed ${isActive ? "mb-6" : "mb-4 line-clamp-3"}`}>
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
<<<<<<< HEAD
                  {t.image ? (
                    <img src={t.image} alt={t.name || "Client"} className={`rounded-full object-cover ${isActive ? "w-10 h-10" : "w-9 h-9"}`} />
                  ) : (
                    <span className={`flex shrink-0 items-center justify-center rounded-full bg-[#2563EB]/15 font-semibold text-[#2563EB] ${isActive ? "w-10 h-10" : "w-9 h-9"}`}>
                      {(t.name || t.company || "C").charAt(0).toUpperCase()}
                    </span>
                  )}
                  <div>
                    <div className={`text-sm font-semibold ${isActive ? "text-white" : "text-[#1E293B] dark:text-white"}`}>
                      {t.name || "Anonymous client"}
                    </div>
                    <div className="text-xs text-slate-400">{t.company || t.serviceType}</div>
=======
                  <img src={t.avatar} alt={t.name} className={`rounded-full object-cover ${isActive ? "w-10 h-10" : "w-9 h-9"}`} />
                  <div>
                    <div className={`text-sm font-semibold ${isActive ? "text-white" : "text-[#1E293B] dark:text-white"}`}>
                      {t.name}
                    </div>
                    <div className="text-xs text-slate-400">{t.company}</div>
>>>>>>> origin/main
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
<<<<<<< HEAD
        </>}
=======
>>>>>>> origin/main
      </div>
    </section>
  );
}
