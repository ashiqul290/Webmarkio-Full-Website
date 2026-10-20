import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, Globe, Briefcase, Target, Palette, Zap, ShoppingCart, TrendingUp, Search, BarChart2, Sparkles } from "lucide-react";
import { SectionHeading } from "../shared/SectionHeading";

const featuredServices = [
  { slug: "business-website", title: "Business Website", description: "Professional sites that build credibility and drive conversions.", icon: Globe, color: "#2563EB" },
  { slug: "ecommerce-website", title: "Ecommerce Website", description: "Revenue-generating stores with seamless shopping experiences.", icon: ShoppingCart, color: "#7C3AED" },
  { slug: "landing-page", title: "Landing Page", description: "High-converting pages engineered for maximum lead generation.", icon: Target, color: "#0891B2" },
  { slug: "seo", title: "SEO", description: "Organic strategies that build sustainable, long-term traffic growth.", icon: BarChart2, color: "#D97706" },
  { slug: "facebook-ads", title: "Facebook Ads", description: "Targeted campaigns that reach your ideal customers at scale.", icon: TrendingUp, color: "#DC2626" },
  { slug: "branding", title: "Branding", description: "Strategic brand identity design that creates lasting impressions.", icon: Sparkles, color: "#059669" },
];

export function ServicesSection() {
  return (
    <section className="py-24 bg-white dark:bg-[#0F172A]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Our Services"
          title="Everything You Need to Grow Online"
          subtitle="From beautiful websites to performance marketing campaigns, we provide comprehensive digital solutions that deliver measurable results."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredServices.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  to={`/services/${service.slug}`}
                  className="group flex flex-col h-full p-6 bg-slate-50 dark:bg-white/3 border border-slate-100 dark:border-white/5 rounded-2xl hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${service.color}15` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: service.color }} />
                  </div>
                  <h3 className="text-base font-bold text-[#1E293B] dark:text-white mb-2 [font-family:'Plus_Jakarta_Sans',sans-serif]">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-1 mb-4">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-1 text-sm font-semibold text-[#2563EB] group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#2563EB] text-[#2563EB] font-semibold rounded-full hover:bg-[#2563EB] hover:text-white transition-all"
          >
            View All Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
