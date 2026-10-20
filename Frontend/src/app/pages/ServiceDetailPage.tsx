import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, CheckCircle, ExternalLink, Globe, Briefcase, Target, Palette, Zap, UtensilsCrossed, GraduationCap, Heart, ShoppingCart, TrendingUp, Search, BarChart2, Sparkles, Layers, Building2 } from "lucide-react";
import { getServiceBySlug } from "../../data/services";
import { portfolioItems } from "../../data/portfolio";
import { pricingPlans } from "../../data/pricing";
import { PageTransition } from "../components/shared/PageTransition";
import { CTASection } from "../components/home/CTASection";
import { NotFoundPage } from "./NotFoundPage";

const iconMap: Record<string, React.ElementType> = {
  Building2, Briefcase, Target, Palette, Zap, UtensilsCrossed,
  GraduationCap, Heart, ShoppingCart, TrendingUp, Search, BarChart2, Sparkles, Layers
};

const websitePricing: Record<string, { type: string; prices: [string, string, string] }> = {
  "business-website": { type: "Business & Company", prices: ["$499", "$899", "$1,499"] },
  "corporate-website": { type: "Business & Company", prices: ["$499", "$899", "$1,499"] },
  "agency-website": { type: "Business & Company", prices: ["$499", "$899", "$1,499"] },
  "landing-page": { type: "Professional Services", prices: ["$499", "$899", "$1,499"] },
  "portfolio-website": { type: "Personal Portfolio", prices: ["$299", "$599", "$999"] },
  "ecommerce-website": { type: "E-commerce", prices: ["$799", "$1,499", "$2,999"] },
  "school-website": { type: "Education", prices: ["$699", "$1,299", "$2,499"] },
  "hospital-website": { type: "Healthcare", prices: ["$799", "$1,499", "$2,999"] },
  "dental-clinic-website": { type: "Healthcare", prices: ["$799", "$1,499", "$2,999"] },
  "restaurant-website": { type: "Food & Hospitality", prices: ["$599", "$1,099", "$1,999"] },
  "roofing-company-website": { type: "Home Services", prices: ["$499", "$899", "$1,499"] },
  "cleaning-service-website": { type: "Home Services", prices: ["$499", "$899", "$1,499"] },
  "construction-company-website": { type: "Home Services", prices: ["$499", "$899", "$1,499"] },
  "plumbing-hvac-website": { type: "Home Services", prices: ["$499", "$899", "$1,499"] },
  "landscaping-company-website": { type: "Home Services", prices: ["$499", "$899", "$1,499"] },
  "auto-repair-website": { type: "Automotive", prices: ["$699", "$1,299", "$2,499"] },
  "law-firm-website": { type: "Professional Services", prices: ["$499", "$899", "$1,499"] },
  "hotel-airbnb-website": { type: "Travel", prices: ["$799", "$1,599", "$3,499"] },
  "gym-fitness-website": { type: "Beauty & Fitness", prices: ["$499", "$999", "$1,799"] },
  "beauty-salon-website": { type: "Beauty & Fitness", prices: ["$499", "$999", "$1,799"] },
  "photography-wedding-website": { type: "Events", prices: ["$499", "$999", "$1,799"] },
  "real-estate-agency-website": { type: "Business & Company", prices: ["$499", "$899", "$1,499"] },
};

const businessWebsitePlans = [
  {
    id: "basic",
    name: "Starter",
    price: "$499",
    description: "Perfect for small businesses and solopreneurs establishing their online presence.",
    features: ["5-page responsive website", "Custom design (3 revisions)", "Mobile optimization", "Basic SEO setup", "Contact form"],
  },
  {
    id: "standard",
    name: "Business",
    price: "$899",
    popular: true,
    description: "Ideal for growing businesses that need a powerful, full-featured online presence.",
    features: ["10-page responsive website", "Custom design (5 revisions)", "CMS integration", "Blog setup", "Advanced SEO optimization"],
  },
  {
    id: "premium",
    name: "Premium",
    price: "$1,499",
    description: "For established businesses that demand the best in design, performance, and features.",
    features: ["Unlimited pages", "Premium custom design", "E-commerce ready", "Advanced animations", "Full CMS setup"],
  },
];

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceBySlug(slug || "");

  if (!service) return <NotFoundPage />;

  const Icon = iconMap[service.icon] || Globe;
  const relatedProjects = service.category === "Website Development"
    ? portfolioItems.filter((project) => project.category === service.title)
    : [];
  const selectedPricing = websitePricing[service.slug] ?? websitePricing["business-website"];
  const servicePlans = pricingPlans.slice(0, 3).map((plan, index) => ({
    ...plan,
    price: selectedPricing.prices[index],
  }));

  const ecommercePackages = [
    {
      name: "Basic Package",
      price: "৳12,999",
      tag: "FEATURES",
      features: [
        ".com .net .shop .xyz domain",
        "Hostinger reliable hosting",
        "Premium theme installation",
        "WordPress CMS setup",
        "SSL certificate for full security",
        "Contact form integration",
        "3-5 page responsive design",
      ],
    },
    {
      name: "Premium Package",
      price: "৳19,999",
      tag: "FEATURES",
      features: [
        ".com .net .shop .xyz domain",
        "Hostinger reliable hosting",
        "Premium theme installation",
        "WordPress CMS setup",
        "SSL certificate for full security",
        "5-8 page responsive design",
        "All device optimized layout",
        "Automatic payment gateway setup",
      ],
      popular: true,
    },
    {
      name: "Gold Package",
      price: "৳29,999",
      tag: "FEATURED",
      features: [
        "Custom Laravel CMS",
        "Full Laravel admin dashboard",
        "Multi-user roles (Admin, Staff, Manager)",
        "Automated courier tracking",
        ".com .net .shop .xyz domain",
        "1 year Hostinger premium hosting",
        "Premium theme and custom design",
        "SSL certificate and secure checkout",
      ],
    },
  ];

  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(37,99,235,0.12)_0%,transparent_60%)]" />
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/services" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-[#2563EB]/20 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[#2563EB]" />
                </div>
                <span className="text-blue-300 text-sm font-medium">{service.category}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white [font-family:'Plus_Jakarta_Sans',sans-serif] leading-tight mb-4">{service.title}</h1>
              <p className="text-lg text-slate-300 leading-relaxed mb-6">{service.description}</p>
              <div className="flex items-center gap-4">
                {/* <span className="text-2xl font-bold text-[#22C55E] [font-family:'Plus_Jakarta_Sans',sans-serif]">{service.price}</span> */}
                <Link to="/contact" className="px-6 py-3 bg-[#2563EB] text-white font-semibold rounded-full hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/30">
                  Get Started
                </Link>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <img src={service.image} alt={service.title} className="w-full rounded-2xl border border-white/10 object-cover" style={{ height: "clamp(200px, 30vw, 360px)" }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-white dark:bg-[#0F172A]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main */}
            <div className="lg:col-span-2 space-y-12">
              {/* Features */}
              <div>
                <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white [font-family:'Plus_Jakarta_Sans',sans-serif] mb-6">What's Included</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {service.features.map((f) => (
                    <div key={f} className="flex items-center gap-2.5 p-3 bg-slate-50 dark:bg-white/3 border border-slate-100 dark:border-white/5 rounded-xl">
                      <CheckCircle className="w-4 h-4 text-[#22C55E] shrink-0" />
                      <span className="text-sm text-slate-700 dark:text-slate-200">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white [font-family:'Plus_Jakarta_Sans',sans-serif] mb-6">Key Benefits</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.benefits.map((b, i) => (
                    <div key={b} className="p-5 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-500/20 rounded-2xl">
                      <div className="text-2xl font-bold text-[#2563EB] [font-family:'Plus_Jakarta_Sans',sans-serif] mb-1">0{i + 1}</div>
                      <p className="text-slate-700 dark:text-slate-200 font-medium">{b}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process */}
              <div>
                <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white [font-family:'Plus_Jakarta_Sans',sans-serif] mb-6">Our Process</h2>
                <div className="space-y-4">
                  {service.process.map((step) => (
                    <div key={step.step} className="flex gap-4 p-5 bg-slate-50 dark:bg-white/3 border border-slate-100 dark:border-white/5 rounded-2xl">
                      <div className="w-10 h-10 bg-[#2563EB] text-white rounded-xl flex items-center justify-center font-bold shrink-0 [font-family:'JetBrains_Mono',monospace] text-sm">
                        {step.step}
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1E293B] dark:text-white [font-family:'Plus_Jakarta_Sans',sans-serif] mb-1">{step.title}</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="sticky top-24">
                <div className="p-6 bg-[#0F172A] dark:bg-[#2563EB]/10 border border-white/10 rounded-2xl text-white">
                  <h3 className="text-lg font-bold [font-family:'Plus_Jakarta_Sans',sans-serif] mb-2">Ready to get started?</h3>
                  <p className="text-slate-300 text-sm mb-5">Book a free 45-minute strategy call with our team.</p>
                  <Link to="/contact" className="block w-full text-center px-5 py-3 bg-[#2563EB] text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors mb-3">
                    Book Free Consultation
                  </Link>
                  {/* <Link to="/pricing" className="block w-full text-center px-5 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 transition-colors">
                    View Pricing
                  </Link> */}
                </div>
                {/* <div className="mt-6 p-6 bg-slate-50 dark:bg-white/3 border border-slate-100 dark:border-white/5 rounded-2xl">
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">Starting at</p>
                  <p className="text-3xl font-bold text-[#2563EB] [font-family:'Plus_Jakarta_Sans',sans-serif]">{service.price}</p>
                  <p className="text-xs text-slate-400 mt-1">Custom quotes based on scope</p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {service.category === "Website Development" && (
        <section className="py-24 bg-[#0A1020]">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-300 text-xs font-semibold rounded-full border border-blue-500/20 mb-4">Pricing Plans</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white [font-family:'Plus_Jakarta_Sans',sans-serif] mb-3">{selectedPricing.type} Website Pricing</h2>
              <p className="text-slate-400">Clear packages for every stage of your business. Need something different? We can tailor a plan for you.</p>
            </div>

            {service.slug === "ecommerce-website" ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
                {ecommercePackages.map((pkg, index) => (
                  <motion.div
                    key={pkg.name}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative flex flex-col p-6 rounded-3xl border shadow-sm transition-all ${
                      pkg.popular
                        ? "bg-[#0F172A] border-[#2563EB] shadow-blue-500/10"
                        : "bg-slate-950 border-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-base font-semibold text-white">{pkg.name}</h3>
                      <span className={`px-3 py-1 text-[11px] font-semibold rounded-full ${pkg.popular ? "bg-emerald-500/15 text-emerald-300" : "bg-slate-800 text-slate-300"}`}>
                        {pkg.tag}
                      </span>
                    </div>
                    <div className="mb-6">
                      <p className="text-4xl font-bold text-white [font-family:'Plus_Jakarta_Sans',sans-serif]">{pkg.price}</p>
                      <p className="text-sm text-slate-400 mt-1">One-time payment</p>
                    </div>

                    <ul className="space-y-3 flex-1 mb-6">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm text-slate-300">
                          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#22C55E]" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to="/contact"
                      className={`mt-auto inline-flex justify-center py-3 rounded-full text-sm font-semibold transition-colors ${
                        pkg.popular ? "bg-[#2563EB] text-white hover:bg-blue-600" : "bg-white/10 text-white border border-white/10 hover:bg-white/15"
                      }`}
                    >
                      Order Now
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : service.slug === "business-website" ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
                {businessWebsitePlans.map((plan, index) => (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative flex flex-col p-6 rounded-xl border ${
                      plan.popular ? "bg-[#151C38] border-[#4C3BFF] shadow-xl shadow-indigo-950/40 md:-translate-y-2" : "bg-[#11182B] border-white/5"
                    }`}
                  >
                    {plan.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full bg-[#5B45FF] text-white text-[10px] font-bold">Most Popular</span>}
                    <h3 className="text-base font-semibold text-white mb-1">{plan.name}</h3>
                    <div className="mb-3"><span className="text-3xl font-bold text-white [font-family:'Plus_Jakarta_Sans',sans-serif]">{plan.price}</span><span className="text-xs text-slate-400 ml-1">/one-time</span></div>
                    <p className="text-sm leading-relaxed text-slate-400 mb-6 min-h-10">{plan.description}</p>
                    <ul className="space-y-2.5 flex-1 mb-6">
                      {plan.features.map((feature) => <li key={feature} className="flex items-center gap-2 text-sm text-slate-300"><Check className="w-3.5 h-3.5 text-[#6D5CFF] shrink-0" />{feature}</li>)}
                    </ul>
                    <Link to="/contact" className={`block text-center py-2.5 rounded-full text-xs font-semibold transition-colors ${plan.popular ? "bg-[#5B45FF] text-white hover:bg-[#4C3BFF]" : "bg-white/5 text-white border border-white/10 hover:bg-white/10"}`}>Get Started</Link>
                  </motion.div>
                ))}
              </div>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
              {servicePlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex flex-col p-6 rounded-xl border ${
                    plan.popular
                      ? "bg-[#151C38] border-[#4C3BFF] shadow-xl shadow-indigo-950/40 md:-translate-y-2"
                      : "bg-[#11182B] border-white/5"
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full bg-[#5B45FF] text-white text-[10px] font-bold">Most Popular</span>
                  )}
                  <h3 className="text-sm font-semibold text-white mb-1">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-white [font-family:'Plus_Jakarta_Sans',sans-serif]">{plan.price}</span>
                    {plan.period !== "project" && <span className="text-xs text-slate-400 ml-1">/{plan.period}</span>}
                  </div>
                  <p className="text-xs leading-relaxed text-slate-400 mb-5 min-h-9">{plan.description}</p>
                  <ul className="space-y-2.5 flex-1 mb-6">
                    {plan.features.slice(0, 5).map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-[#6D5CFF] shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className={`block text-center py-2.5 rounded-full text-xs font-semibold transition-colors ${
                      plan.popular ? "bg-[#5B45FF] text-white hover:bg-[#4C3BFF]" : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    Get Started
                  </Link>
                </motion.div>
              ))}
            </div>
            )}
          </div>
        </section>
      )}

      {relatedProjects.length > 0 && (
        <section className="py-24 bg-slate-50 dark:bg-[#111C32]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-10">
              <span className="inline-block px-3 py-1 bg-blue-500/10 text-[#2563EB] text-xs font-semibold rounded-full border border-blue-500/20 mb-4">Selected Work</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] dark:text-white [font-family:'Plus_Jakarta_Sans',sans-serif] mb-3">
                {service.title} Projects
              </h2>
              <p className="text-slate-600 dark:text-slate-300">Explore recent {service.title.toLowerCase()} solutions we have delivered for our clients.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.08 }}
                  className="overflow-hidden rounded-2xl bg-white dark:bg-[#162036] border border-slate-200 dark:border-white/10 shadow-sm hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
                >
                  <div className="aspect-video overflow-hidden bg-slate-200 dark:bg-slate-800">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="px-2.5 py-1 bg-blue-50 dark:bg-blue-500/15 text-[#2563EB] text-xs font-semibold rounded-full">{project.category}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{project.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#0F172A] dark:text-white [font-family:'Plus_Jakarta_Sans',sans-serif] mb-1">{project.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{project.client}</p>
                    <div className="flex items-center justify-between gap-3 text-sm font-semibold text-[#2563EB]">
                      <a href={project.url || "#"} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-blue-700 transition-colors">
                        Live Demo <ExternalLink className="w-4 h-4" />
                      </a>
                      <Link to={`/portfolio/${project.slug}`} className="inline-flex items-center gap-1.5 hover:text-blue-700 transition-colors">
                        View Case Study <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </PageTransition>
  );
}
