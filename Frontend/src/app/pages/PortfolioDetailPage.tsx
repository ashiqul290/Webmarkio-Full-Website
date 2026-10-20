import { useLocation, useParams, Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getPortfolioBySlug } from "../../data/portfolio";
import { PageTransition } from "../components/shared/PageTransition";
import { CTASection } from "../components/home/CTASection";
import { NotFoundPage } from "./NotFoundPage";

export function PortfolioDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const from = ((location.state as { from?: string } | null)?.from) || "/portfolio";
  const backLabel = from === "/projects" ? "Back to All Projects" : "Back to Portfolio";
  const project = getPortfolioBySlug(slug || "");

  if (!project) return <NotFoundPage />;

  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(37,99,235,0.12)_0%,transparent_60%)]" />
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <Link to={from} className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> {backLabel}
          </Link>
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-semibold text-blue-300 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">{project.category}</span>
                <span className="text-xs text-slate-400">{project.year}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white [font-family:'Plus_Jakarta_Sans',sans-serif] leading-tight mb-3">{project.title}</h1>
              <p className="text-slate-400 mb-6">Client: <span className="text-white">{project.client}</span></p>
              <div className="grid grid-cols-2 gap-3">
                {project.stackHighlights.map((stat) => (
                  <div key={stat.label} className="p-3 bg-white/5 border border-white/8 rounded-xl">
                    <div className="text-xl font-bold text-[#22C55E] [font-family:'Plus_Jakarta_Sans',sans-serif]">{stat.value}</div>
                    <div className="text-xs text-slate-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <img src={project.image} alt={project.title} className="w-full rounded-2xl border border-white/10 object-cover" style={{ height: "clamp(200px, 30vw, 360px)" }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-white dark:bg-[#0F172A]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              {/* Project overview */}
              <div>
                <h2 className="text-xl font-bold text-[#0F172A] dark:text-white [font-family:'Plus_Jakarta_Sans',sans-serif] mb-4">Project Overview</h2>
                <div className="p-5 bg-slate-50 dark:bg-white/3 border border-slate-100 dark:border-white/5 rounded-2xl">
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{project.description}</p>
                </div>
              </div>

              {/* Challenge / Solution / Result */}
              {[
                { label: "Project Requirements", content: project.challenge, color: "bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-500/20 text-red-900 dark:text-red-200" },
                { label: "Work Delivered", content: project.solution, color: "bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-500/20 text-blue-900 dark:text-blue-200" },
                { label: "Key Features", content: project.result, color: "bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-500/20 text-green-900 dark:text-green-200" },
              ].map((section) => (
                <div key={section.label}>
                  <h2 className="text-xl font-bold text-[#0F172A] dark:text-white [font-family:'Plus_Jakarta_Sans',sans-serif] mb-4">{section.label}</h2>
                  <div className={`p-5 border rounded-2xl ${section.color}`}>
                    <p className="text-sm leading-relaxed opacity-90">{section.content}</p>
                  </div>
                </div>
              ))}

              {/* Gallery */}
              <div>
                <h2 className="text-xl font-bold text-[#0F172A] dark:text-white [font-family:'Plus_Jakarta_Sans',sans-serif] mb-4">Project Gallery</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.gallery.map((img, i) => (
                    <div key={i} className="aspect-video rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800">
                      <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="p-5 bg-slate-50 dark:bg-white/3 border border-slate-100 dark:border-white/5 rounded-2xl">
                <h4 className="font-bold text-[#1E293B] dark:text-white [font-family:'Plus_Jakarta_Sans',sans-serif] mb-1">Technologies Used</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">MERN Stack technologies used for this project</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/8 text-xs text-slate-600 dark:text-slate-300 rounded-md [font-family:'JetBrains_Mono',monospace]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-5 bg-[#0F172A] dark:bg-[#2563EB]/10 border border-white/10 rounded-2xl text-white">
                <p className="text-sm text-slate-300 mb-4">Need a similar website for your business?</p>
                <Link to="/contact" className="block w-full text-center px-4 py-3 bg-[#2563EB] text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors">
                  Build a Similar Project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </PageTransition>
  );
}
