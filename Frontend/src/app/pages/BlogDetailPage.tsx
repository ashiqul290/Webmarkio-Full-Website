import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";
import { getBlogBySlug, blogPosts } from "../../data/blog";
import { PageTransition } from "../components/shared/PageTransition";
import { CTASection } from "../components/home/CTASection";
import { NotFoundPage } from "./NotFoundPage";

export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogBySlug(slug || "");

  if (!post) return <NotFoundPage />;

  const related = blogPosts.filter(b => b.id !== post.id && b.category === post.category).slice(0, 3);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(37,99,235,0.12)_0%,transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="text-xs font-semibold text-blue-300 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">{post.category}</span>
              <span className="text-slate-400 text-sm flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
              <span className="text-slate-400 text-sm flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white [font-family:'Plus_Jakarta_Sans',sans-serif] leading-tight mb-6">{post.title}</h1>
            <div className="flex items-center gap-3">
              <img src={post.authorImage} alt={post.author} className="w-10 h-10 rounded-full object-cover border-2 border-white/20" />
              <div>
                <p className="font-semibold text-white text-sm">{post.author}</p>
                <p className="text-slate-400 text-xs">{post.authorRole}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white dark:bg-[#0F172A]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-12">
            <article className="lg:col-span-3">
              <img src={post.image} alt={post.title} className="w-full rounded-2xl mb-10 object-cover" style={{ height: "clamp(200px, 35vw, 400px)" }} />
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <div className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line text-[15px]">
                  {post.excerpt}
                  <br /><br />
                  {post.content.split('\n').filter(Boolean).map((line, i) => {
                    if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-bold text-[#0F172A] dark:text-white [font-family:'Plus_Jakarta_Sans',sans-serif] mt-10 mb-4">{line.replace('# ', '')}</h1>;
                    if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold text-[#0F172A] dark:text-white [font-family:'Plus_Jakarta_Sans',sans-serif] mt-8 mb-3">{line.replace('## ', '')}</h2>;
                    if (line.startsWith('**')) return <p key={i} className="font-semibold text-[#1E293B] dark:text-slate-200 my-2">{line.replace(/\*\*/g, '')}</p>;
                    if (line.startsWith('- ')) return <li key={i} className="ml-4 my-1 text-slate-600 dark:text-slate-300">{line.replace('- ', '')}</li>;
                    return <p key={i} className="my-3">{line}</p>;
                  })}
                </div>
              </div>
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-slate-100 dark:border-white/5">
                {post.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 text-xs rounded-lg">
                    <Tag className="w-3 h-3" />{tag}
                  </span>
                ))}
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="sticky top-24">
                <div className="p-5 bg-[#0F172A] dark:bg-[#2563EB]/10 border border-white/10 rounded-2xl text-white mb-5">
                  <h4 className="font-bold [font-family:'Plus_Jakarta_Sans',sans-serif] mb-2">Need help growing?</h4>
                  <p className="text-xs text-slate-300 mb-4">Book a free strategy call with our team.</p>
                  <Link to="/contact" className="block text-center px-4 py-2.5 bg-[#2563EB] text-white text-sm font-semibold rounded-xl hover:bg-blue-600 transition-colors">
                    Free Consultation
                  </Link>
                </div>
                {related.length > 0 && (
                  <div>
                    <h4 className="font-bold text-[#1E293B] dark:text-white [font-family:'Plus_Jakarta_Sans',sans-serif] mb-4">Related Articles</h4>
                    <div className="space-y-4">
                      {related.map(r => (
                        <Link key={r.id} to={`/blog/${r.slug}`} className="group block">
                          <div className="aspect-video rounded-xl overflow-hidden mb-2 bg-slate-200 dark:bg-slate-800">
                            <img src={r.image} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          </div>
                          <p className="text-xs font-semibold text-[#1E293B] dark:text-white group-hover:text-[#2563EB] transition-colors leading-snug">{r.title}</p>
                          <p className="text-xs text-slate-400 mt-1">{r.readTime}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTASection />
    </PageTransition>
  );
}
