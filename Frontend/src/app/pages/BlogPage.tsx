import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, Clock, User } from "lucide-react";
import { blogPosts, blogCategories } from "../../data/blog";
import { SectionHeading } from "../components/shared/SectionHeading";
import { PageTransition } from "../components/shared/PageTransition";
import { CTASection } from "../components/home/CTASection";

export function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const filtered = activeCategory === "All" ? blogPosts : blogPosts.filter(b => b.category === activeCategory);
  const [featured, ...rest] = filtered;

  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(37,99,235,0.12)_0%,transparent_60%)]" />
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 bg-blue-500/10 text-blue-300 text-sm font-semibold rounded-full border border-blue-500/20 mb-5">Insights & Strategy</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white [font-family:'Plus_Jakarta_Sans',sans-serif] leading-tight mb-5">
              The WebMarkio <span className="text-[#2563EB]">Blog</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Actionable insights on web design, digital marketing, and growth strategy from our team of experts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-24 bg-white dark:bg-[#0F172A]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {blogCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-[#2563EB] text-white"
                    : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Post */}
          {featured && (
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
              <Link to={`/blog/${featured.slug}`} className="group grid md:grid-cols-2 gap-8 p-6 bg-slate-50 dark:bg-white/3 border border-slate-100 dark:border-white/5 rounded-2xl hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-xl transition-all">
                <div className="aspect-video rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800">
                  <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-[#2563EB] bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 rounded-full">{featured.category}</span>
                    <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" />{featured.readTime}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white [font-family:'Plus_Jakarta_Sans',sans-serif] leading-tight mb-3">{featured.title}</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-5">{featured.excerpt}</p>
                  <div className="flex items-center gap-3">
                    <img src={featured.authorImage} alt={featured.author} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="text-xs font-semibold text-[#1E293B] dark:text-white">{featured.author}</p>
                      <p className="text-xs text-slate-400">{featured.date}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Grid Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, i) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Link to={`/blog/${post.slug}`} className="group flex flex-col h-full bg-slate-50 dark:bg-white/3 border border-slate-100 dark:border-white/5 rounded-2xl overflow-hidden hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-lg transition-all">
                  <div className="aspect-video overflow-hidden bg-slate-200 dark:bg-slate-800">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-[#2563EB] bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 rounded-full">{post.category}</span>
                      <span className="text-xs text-slate-400">{post.readTime}</span>
                    </div>
                    <h3 className="font-bold text-[#1E293B] dark:text-white [font-family:'Plus_Jakarta_Sans',sans-serif] text-sm mb-2 flex-1">{post.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-4">{post.excerpt}</p>
                    <div className="flex items-center gap-2">
                      <img src={post.authorImage} alt={post.author} className="w-6 h-6 rounded-full object-cover" />
                      <span className="text-xs text-slate-500 dark:text-slate-400">{post.author} • {post.date}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-[#2563EB]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white [font-family:'Plus_Jakarta_Sans',sans-serif] mb-3">Get Expert Insights Weekly</h2>
          <p className="text-blue-100 mb-8">Join 8,000+ marketing leaders who get our best content every Friday.</p>
          {subscribed ? (
            <p className="text-white font-semibold">✓ You're in! Check your inbox for a welcome email.</p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true); }} className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder:text-blue-200 focus:outline-none focus:border-white transition-colors"
              />
              <button type="submit" className="px-6 py-3 bg-white text-[#2563EB] font-bold rounded-full hover:bg-blue-50 transition-colors">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      <CTASection />
    </PageTransition>
  );
}
