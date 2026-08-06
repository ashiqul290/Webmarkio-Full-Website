import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, ExternalLink } from "lucide-react";
import { portfolioItems } from "../../../data/portfolio";
import { SectionHeading } from "../shared/SectionHeading";

export function FeaturedProjects() {
  const featured = portfolioItems.slice(0, 6);

  return (
    <section className="py-24 bg-white dark:bg-[#0F172A]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Our Work"
          title="Projects We're Proud Of"
          subtitle="A selection of our finest work—each one a story of challenge, strategy, and exceptional results."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featured.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="group flex h-full flex-col overflow-hidden bg-slate-50 dark:bg-white/3 border border-slate-100 dark:border-white/5 rounded-2xl hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
                {/* Image */}
                <Link to={`/portfolio/${project.slug}`} className="overflow-hidden aspect-video bg-slate-200 dark:bg-slate-800">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 bg-blue-50 dark:bg-blue-900/30 text-[#2563EB] text-xs font-semibold rounded-full border border-blue-100 dark:border-blue-500/20">
                      {project.category}
                    </span>
                    <span className="text-xs text-slate-400">{project.year}</span>
                  </div>
                  <Link to={`/portfolio/${project.slug}`} className="w-fit text-xl font-bold text-[#0F172A] dark:text-white [font-family:'Plus_Jakarta_Sans',sans-serif] mb-1 hover:text-[#2563EB] transition-colors">{project.title}</Link>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{project.client}</p>
                  <div className="mt-auto flex items-center justify-between gap-3 text-[#2563EB] font-semibold text-sm">
                    <a href={project.url || "#"} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 group/demo hover:text-blue-700 transition-colors">
                      Live Demo <ExternalLink className="w-4 h-4 group-hover/demo:translate-x-0.5 transition-transform" />
                    </a>
                    <Link to={`/portfolio/${project.slug}`} className="inline-flex items-center gap-1.5 group/case hover:text-blue-700 transition-colors">
                      View Case Study <ArrowRight className="w-4 h-4 group-hover/case:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#2563EB] text-[#2563EB] font-semibold rounded-full hover:bg-[#2563EB] hover:text-white transition-all"
          >
            View All Projects <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
