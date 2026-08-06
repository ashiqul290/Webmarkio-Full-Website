import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, TrendingUp } from "lucide-react";
import { portfolioItems } from "../../data/portfolio";
import { SectionHeading } from "../components/shared/SectionHeading";
import { PageTransition } from "../components/shared/PageTransition";
import { CTASection } from "../components/home/CTASection";

export function CaseStudiesPage() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(37,99,235,0.12)_0%,transparent_60%)]" />
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 bg-blue-500/10 text-blue-300 text-sm font-semibold rounded-full border border-blue-500/20 mb-5">Case Studies</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white [font-family:'Plus_Jakarta_Sans',sans-serif] leading-tight mb-5">
              Deep-Dive into <span className="text-[#2563EB]">Real Results</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Detailed breakdowns of how we solve complex problems and deliver extraordinary outcomes for our clients.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 bg-white dark:bg-[#0F172A]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {portfolioItems.map((study, i) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="grid lg:grid-cols-5 gap-8 p-8 bg-slate-50 dark:bg-white/3 border border-slate-100 dark:border-white/5 rounded-2xl hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 transition-all"
              >
                {/* Image */}
                <div className="lg:col-span-2 aspect-video rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800">
                  <img src={study.image} alt={study.title} className="w-full h-full object-cover" />
                </div>

                {/* Content */}
                <div className="lg:col-span-3">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-[#2563EB] bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">{study.category}</span>
                    <span className="text-xs text-slate-400">{study.client} • {study.year}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white [font-family:'Plus_Jakarta_Sans',sans-serif] mb-2">{study.title}</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-5">{study.description}</p>

                  {/* Problem → Solution → Result */}
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {[
                      { label: "Problem", text: study.challenge.slice(0, 80) + "..." },
                      { label: "Solution", text: study.solution.slice(0, 80) + "..." },
                      { label: "Result", text: study.result.slice(0, 80) + "..." },
                    ].map((item) => (
                      <div key={item.label} className="p-3 bg-white dark:bg-white/3 border border-slate-100 dark:border-white/8 rounded-xl">
                        <p className="text-xs font-bold text-[#2563EB] mb-1">{item.label}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-3 mb-5">
                    {study.stats.map((stat) => (
                      <div key={stat.label} className="flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-[#22C55E]" />
                        <span className="text-sm font-bold text-[#1E293B] dark:text-white">{stat.value}</span>
                        <span className="text-xs text-slate-400">{stat.label}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to={`/portfolio/${study.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563EB] hover:gap-2.5 transition-all"
                  >
                    Read Full Case Study <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </PageTransition>
  );
}
