import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, Globe, Briefcase, Target, Palette, Zap, UtensilsCrossed, GraduationCap, Heart, ShoppingCart, TrendingUp, Search, BarChart2, Sparkles, Layers, Building2 } from "lucide-react";
import { services, serviceCategories } from "../../data/services";
import { SectionHeading } from "../components/shared/SectionHeading";
import { PageTransition } from "../components/shared/PageTransition";
import { CTASection } from "../components/home/CTASection";

const iconMap: Record<string, React.ElementType> = {
  Building2, Briefcase, Target, Palette, Zap, UtensilsCrossed,
  GraduationCap, Heart, ShoppingCart, TrendingUp, Search, BarChart2, Sparkles, Layers
};

export function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? services : services.filter(s => s.category === activeCategory);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(37,99,235,0.12)_0%,transparent_60%)]" />
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1.5 bg-blue-500/10 text-blue-300 text-sm font-semibold rounded-full border border-blue-500/20 mb-5">What We Do</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white [font-family:'Plus_Jakarta_Sans',sans-serif] leading-tight mb-6">
              Services Built for <span className="text-[#2563EB]">Growth</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              From stunning websites to performance marketing—we provide the full digital stack your business needs to outperform the competition.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white dark:bg-[#0F172A]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-14">
            {serviceCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-[#2563EB] text-white shadow-lg shadow-blue-500/30"
                    : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((service, i) => {
              const Icon = iconMap[service.icon] || Globe;
              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <Link
                    to={`/services/${service.slug}`}
                    className="group flex flex-col h-full p-6 bg-slate-50 dark:bg-white/3 border border-slate-100 dark:border-white/5 rounded-2xl hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-[#2563EB]" />
                      </div>
                      <span className="text-xs font-medium text-slate-400 bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-full">
                        {service.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#1E293B] dark:text-white [font-family:'Plus_Jakarta_Sans',sans-serif] mb-2">{service.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4 flex-1">{service.shortDescription}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {service.features.slice(0, 3).map((f) => (
                        <span key={f} className="text-xs bg-blue-50 dark:bg-blue-900/20 text-[#2563EB] px-2 py-0.5 rounded-md">{f}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-[#2563EB]">{service.price}</span>
                      <div className="flex items-center gap-1 text-sm font-semibold text-[#2563EB] group-hover:gap-2 transition-all">
                        Learn more <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </PageTransition>
  );
}
