import { motion } from "motion/react";
import { Link } from "react-router";
import { Check, ArrowRight } from "lucide-react";
import { pricingPlans } from "../../../data/pricing";
import { SectionHeading } from "../shared/SectionHeading";

export function PricingPreview() {
  const preview = pricingPlans.slice(0, 3);

  return (
    <section className="py-24 bg-white dark:bg-[#0F172A]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Pricing"
          title="Transparent, Value-Driven Pricing"
          subtitle="No hidden fees, no surprises. Choose the plan that fits your goals and budget."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {preview.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`relative flex flex-col p-6 rounded-2xl border transition-all ${
                plan.popular
                  ? "bg-[#0F172A] dark:bg-[#2563EB]/10 border-[#2563EB] shadow-xl shadow-blue-500/20 scale-105"
                  : "bg-slate-50 dark:bg-white/3 border-slate-100 dark:border-white/5 hover:border-blue-200 dark:hover:border-blue-500/30"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-[#2563EB] text-white text-xs font-bold rounded-full shadow-sm">
                    MOST POPULAR
                  </span>
                </div>
              )}
              <div className="mb-5">
                <h3 className={`text-xl font-bold [font-family:'Plus_Jakarta_Sans',sans-serif] mb-1 ${plan.popular ? "text-white" : "text-[#0F172A] dark:text-white"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${plan.popular ? "text-blue-200" : "text-slate-500 dark:text-slate-400"}`}>
                  {plan.description}
                </p>
              </div>
              <div className="mb-6">
                <span className={`text-4xl font-bold [font-family:'Plus_Jakarta_Sans',sans-serif] ${plan.popular ? "text-white" : "text-[#0F172A] dark:text-white"}`}>
                  {plan.price}
                </span>
                {plan.period !== "project" && (
                  <span className={`text-sm ml-1 ${plan.popular ? "text-blue-200" : "text-slate-500 dark:text-slate-400"}`}>
                    /{plan.period}
                  </span>
                )}
              </div>
              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.slice(0, 6).map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check className={`w-4 h-4 mt-0.5 shrink-0 ${plan.popular ? "text-[#22C55E]" : "text-[#22C55E]"}`} />
                    <span className={`text-sm ${plan.popular ? "text-blue-100" : "text-slate-600 dark:text-slate-300"}`}>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className={`block text-center py-3 px-5 rounded-xl font-semibold text-sm transition-all ${
                  plan.popular
                    ? "bg-[#2563EB] text-white hover:bg-blue-600"
                    : "bg-[#2563EB] text-white hover:bg-blue-700"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 text-[#2563EB] font-semibold hover:gap-3 transition-all"
          >
            View full pricing & comparison table <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
