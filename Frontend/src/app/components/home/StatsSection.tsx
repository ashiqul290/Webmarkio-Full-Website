import { motion } from "motion/react";
import { AnimatedCounter } from "../shared/AnimatedCounter";

const stats = [
  { value: 200, suffix: "+", label: "Projects Delivered", description: "Across 30+ industries" },
  { value: 98, suffix: "%", label: "Client Satisfaction", description: "Based on post-project surveys" },
  { value: 30, suffix: "M+", label: "Revenue Generated", description: "For our clients combined", prefix: "$" },
  { value: 2, suffix: "+", label: "Years of Excellence", description: "In digital craftsmanship" },
];

export function StatsSection() {
  return (
    <section className="py-20 bg-white dark:bg-[#0F172A] border-y border-slate-100 dark:border-white/5">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-[#2563EB] [font-family:'Plus_Jakarta_Sans',sans-serif] mb-2">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} prefix={stat.prefix || ""} />
              </div>
              <div className="text-base font-semibold text-[#1E293B] dark:text-slate-100 mb-1">{stat.label}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
