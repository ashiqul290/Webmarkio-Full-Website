import { motion } from "motion/react";
import { SectionHeading } from "../shared/SectionHeading";

const steps = [
  {
    step: "01",
    title: "Discovery Call",
    description: "We start with a deep-dive consultation to understand your business, goals, competitive landscape, and vision. This isn't a sales call—it's strategic reconnaissance.",
    duration: "Week 1",
  },
  {
    step: "02",
    title: "Strategy & Proposal",
    description: "Based on discovery, we craft a detailed project roadmap with clear deliverables, timeline, and success metrics. You'll know exactly what you're getting before anything begins.",
    duration: "Week 1–2",
  },
  {
    step: "03",
    title: "Design & Wireframes",
    description: "Our designers translate strategy into stunning visual concepts. We start with wireframes, validate UX, then apply full visual design—with your feedback at every stage.",
    duration: "Week 2–4",
  },
  {
    step: "04",
    title: "Development",
    description: "Our engineers build your project with clean, performant code. Regular builds are shared in a private staging environment so you can see progress in real time.",
    duration: "Week 4–8",
  },
  {
    step: "05",
    title: "QA & Testing",
    description: "Every browser, every device, every edge case. We run comprehensive quality assurance before anything touches production.",
    duration: "Week 8–9",
  },
  {
    step: "06",
    title: "Launch & Optimize",
    description: "We manage the launch, monitor performance, and stay on hand for 30–90 days post-launch. This is the beginning of our relationship, not the end.",
    duration: "Week 9+",
  },
];

export function ProcessSection() {
  return (
    <section className="py-24 bg-[#0F172A] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Our Process"
          title="How We Turn Vision Into Reality"
          subtitle="A proven process refined across 200+ projects. No surprises, no scope creep—just consistent, high-quality delivery."
          light
        />

        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative p-6 bg-white/3 border border-white/8 rounded-2xl hover:border-blue-500/30 hover:bg-white/5 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-[#2563EB]/10 border border-[#2563EB]/20 rounded-xl flex items-center justify-center">
                    <span className="text-[#2563EB] font-bold [font-family:'JetBrains_Mono',monospace] text-sm">{step.step}</span>
                  </div>
                  <span className="text-xs font-medium text-slate-500 bg-white/5 border border-white/8 px-2.5 py-1 rounded-full">
                    {step.duration}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white [font-family:'Plus_Jakarta_Sans',sans-serif] mb-2">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
