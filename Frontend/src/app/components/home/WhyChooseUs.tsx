import { motion } from "motion/react";
import { CheckCircle, Zap, Shield, BarChart2, Users, Clock } from "lucide-react";
import { SectionHeading } from "../shared/SectionHeading";

const reasons = [
  {
    icon: BarChart2,
    title: "Results-First Mindset",
    description: "We measure success by your business outcomes—revenue, leads, and growth—not just deliverables. Every decision is filtered through 'will this move the needle?'",
  },
  {
    icon: Zap,
    title: "Speed & Precision",
    description: "We move fast without cutting corners. Our proven process delivers on time, on budget, and at the highest quality—consistently, across every project.",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Quality",
    description: "We apply Fortune 500-level standards to every project regardless of size. Security, performance, accessibility, and scalability are non-negotiable.",
  },
  {
    icon: Users,
    title: "Dedicated Senior Team",
    description: "You'll work directly with senior designers, developers, and strategists—not junior staff or outsourced labor. The people you meet are the people who build your project.",
  },
  {
    icon: Clock,
    title: "On-Time, Always",
    description: "98.6% of our projects launch on their committed date. We know your business can't wait. Our project management is built to protect your timeline.",
  },
  {
    icon: CheckCircle,
    title: "Transparent Partnership",
    description: "Weekly status updates, open Slack channels, and complete access to project progress. You'll never wonder what's happening with your project.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-[#0A0F1E]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-[#2563EB] text-sm font-semibold rounded-full border border-blue-100 dark:border-blue-500/20 mb-4">
              Why WebMarkio
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] dark:text-white [font-family:'Plus_Jakarta_Sans',sans-serif] leading-tight mb-6">
              We Don't Just Build Websites.
              <span className="text-[#2563EB]"> We Build Growth Engines.</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed mb-8">
              Other agencies hand you a pretty website and disappear. We stay obsessed with your results. Our clients average 4x increase in online leads within 90 days of launch.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "NPS Score", value: "78" },
                { label: "Avg. Conversion Lift", value: "340%" },
                { label: "Client Retention Rate", value: "94%" },
                { label: "On-time Delivery", value: "98.6%" },
              ].map((kpi) => (
                <div key={kpi.label} className="p-4 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl">
                  <div className="text-2xl font-bold text-[#2563EB] [font-family:'Plus_Jakarta_Sans',sans-serif]">{kpi.value}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">{kpi.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((reason, i) => {
              const Icon = reason.icon;
              return (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="p-5 bg-white dark:bg-white/3 border border-slate-100 dark:border-white/5 rounded-xl hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all"
                >
                  <div className="w-9 h-9 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-3">
                    <Icon className="w-4.5 h-4.5 text-[#2563EB]" />
                  </div>
                  <h4 className="text-sm font-bold text-[#1E293B] dark:text-white mb-1.5 [font-family:'Plus_Jakarta_Sans',sans-serif]">{reason.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{reason.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
