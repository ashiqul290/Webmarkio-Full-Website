<<<<<<< HEAD
import { useEffect, useState } from "react";
=======
import { useState } from "react";
>>>>>>> origin/main
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { faqItems } from "../../../data/faq";
import { SectionHeading } from "../shared/SectionHeading";
<<<<<<< HEAD
import { adminApi } from "../../../lib/adminApi";

export function FAQSection() {
  const [open, setOpen] = useState<string | null>("1");
  const [items, setItems] = useState(faqItems);

  useEffect(() => {
    let active = true;
    adminApi
      .getFaq()
      .then((content) => {
        if (active && content.initialized) {
          setItems(content.faqItems);
          setOpen(content.faqItems[0]?.id ?? null);
        }
      })
      .catch((error) => {
        console.error("Unable to load homepage FAQs.", error);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="faq" className="py-24 bg-slate-50 dark:bg-[#0A0F1E]">
=======

export function FAQSection() {
  const [open, setOpen] = useState<string | null>("1");
  const preview = faqItems.slice(0, 6);

  return (
    <section className="py-24 bg-slate-50 dark:bg-[#0A0F1E]">
>>>>>>> origin/main
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="FAQ"
          title="Questions & Answers"
          subtitle="Everything you need to know before starting your project."
        />

        <div className="space-y-3">
<<<<<<< HEAD
          {items.map((item) => (
=======
          {preview.map((item) => (
>>>>>>> origin/main
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-[#0F172A] border border-slate-100 dark:border-white/5 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === item.id ? null : item.id)}
                className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
              >
                <span className="font-semibold text-[#1E293B] dark:text-white text-sm">{item.question}</span>
                <div className="w-7 h-7 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center shrink-0">
                  {open === item.id
                    ? <Minus className="w-3.5 h-3.5 text-[#2563EB]" />
                    : <Plus className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                  }
                </div>
              </button>
              <AnimatePresence>
                {open === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="px-6 pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-50 dark:border-white/5 pt-3">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
