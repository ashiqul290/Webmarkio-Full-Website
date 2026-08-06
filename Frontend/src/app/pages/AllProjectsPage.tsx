import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, ExternalLink } from "lucide-react";
import { portfolioCategories, portfolioItems } from "../../data/portfolio";
import { PageTransition } from "../components/shared/PageTransition";

export function AllProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const filteredProjects = selectedCategory === "All"
    ? portfolioItems
    : portfolioItems.filter((project) => project.category === selectedCategory);

  return (
    <PageTransition>
      <section className="pt-32  bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(37,99,235,0.12)_0%,transparent_60%)]" />
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-blue-500/10 text-blue-300 text-sm font-semibold rounded-full border border-blue-500/20 mb-5">All Projects</span>
          <h1 className="text-5xl md:text-6xl font-bold text-white [font-family:'Plus_Jakarta_Sans',sans-serif] leading-tight mb-5">Browse Every Project We’ve Built</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">A complete showcase of our work from web development to digital marketing and design.</p>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-[#0F172A]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
            {portfolioCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                  selectedCategory === category
                    ? "bg-[#2563EB] text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex h-full flex-col overflow-hidden bg-slate-50 dark:bg-white/3 border border-slate-100 dark:border-white/5 rounded-2xl hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
              >
                <Link to={`/portfolio/${project.slug}`} className="overflow-hidden aspect-video bg-slate-200 dark:bg-slate-800">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 bg-blue-50 dark:bg-blue-900/30 text-[#2563EB] text-xs font-semibold rounded-full border border-blue-100 dark:border-blue-500/20">
                      {project.category}
                    </span>
                    <span className="text-xs text-slate-400">{project.year}</span>
                  </div>
                  <Link to={`/portfolio/${project.slug}`} className="w-fit text-xl font-bold text-[#0F172A] dark:text-white [font-family:'Plus_Jakarta_Sans',sans-serif] mb-1 hover:text-[#2563EB] transition-colors">
                    {project.title}
                  </Link>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{project.client}</p>
                  <div className="mt-auto flex items-center justify-between gap-3 text-[#2563EB] font-semibold text-sm">
                    <a href={project.url || "#"} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 group/demo hover:text-blue-700 transition-colors">
                      Live Demo <ExternalLink className="w-4 h-4 group-hover/demo:translate-x-0.5 transition-transform" />
                    </a>
                    <Link to={`/portfolio/${project.slug}`} state={{ from: "/projects" }} className="inline-flex items-center gap-1.5 group/case hover:text-blue-700 transition-colors">
                      View Case Study <ArrowRight className="w-4 h-4 group-hover/case:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
