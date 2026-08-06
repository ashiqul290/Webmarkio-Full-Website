import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, ExternalLink, Eye, X } from "lucide-react";
import { portfolioItems } from "../../data/portfolio";
import { PageTransition } from "../components/shared/PageTransition";
import { CTASection } from "../components/home/CTASection";
import nishatCampaign from "../assets/digital-marketing-nishat.jpeg";
import elisCampaign from "../assets/digital-marketing-elis.jpeg";
import tanhaCampaign from "../assets/digital-marketing-tanha.jpeg";
import graphicDesignOne from "../assets/1 (2).png";
import graphicDesignTwo from "../assets/2 (2).png";

const marketingProjects = [
  nishatCampaign,
  elisCampaign,
  tanhaCampaign,
];

const graphicDesignProjects = [
  graphicDesignOne,
  graphicDesignTwo,
];

export function PortfolioPage() {
  const [activeTab, setActiveTab] = useState<"web" | "marketing" | "graphic">("web");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <PageTransition>
      <section className="pt-32  bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(37,99,235,0.12)_0%,transparent_60%)]" />
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 bg-blue-500/10 text-blue-300 text-sm font-semibold rounded-full border border-blue-500/20 mb-5">Client Portfolio</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white [font-family:'Plus_Jakarta_Sans',sans-serif] leading-tight mb-5">Client Work That Speaks for Itself</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">Explore web development projects and digital marketing creative work.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-[#0F172A]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-3 mb-12">
            <button type="button" onClick={() => setActiveTab("web")} className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${activeTab === "web" ? "bg-[#2563EB] text-white" : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10"}`}>Web Development</button>
            <button type="button" onClick={() => setActiveTab("marketing")} className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${activeTab === "marketing" ? "bg-[#2563EB] text-white" : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10"}`}>Digital Marketing</button>
            <button type="button" onClick={() => setActiveTab("graphic")} className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${activeTab === "graphic" ? "bg-[#2563EB] text-white" : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10"}`}>Graphic Design</button>
          </div>

          {activeTab === "web" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioItems.map((project, index) => (
                <motion.article key={project.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }} className="overflow-hidden rounded-2xl bg-slate-50 dark:bg-white/3 border border-slate-100 dark:border-white/5 hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
                  <div className="aspect-video overflow-hidden bg-slate-200 dark:bg-slate-800"><img src={project.image} alt={project.client} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" /></div>
                  <div className="p-5">
                    <p className="text-xs text-[#2563EB] font-semibold mb-1">Client</p>
                    <h2 className="font-bold text-[#1E293B] dark:text-white [font-family:'Plus_Jakarta_Sans',sans-serif] mb-5">{project.client}</h2>
                    <div className="flex items-center justify-between gap-3 text-sm font-semibold text-[#2563EB]">
                      <a href={project.url || "#"} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-blue-700 transition-colors">Live Demo <ExternalLink className="h-4 w-4" /></a>
                      <Link to={`/portfolio/${project.slug}`} state={{ from: "/portfolio" }} className="inline-flex items-center gap-1.5 hover:text-blue-700 transition-colors">View Case Study <ArrowRight className="h-4 w-4" /></Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : activeTab === "marketing" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {marketingProjects.map((image, index) => (
                <motion.button key={image} type="button" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }} onClick={() => setSelectedImage(image)} className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-200 dark:bg-slate-800 text-left" aria-label="View digital marketing project image">
                  <img src={image} alt="Digital marketing project" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute inset-0 flex items-center justify-center bg-[#0F172A]/0 group-hover:bg-[#0F172A]/60 transition-colors"><span className="opacity-0 group-hover:opacity-100 p-3 rounded-full bg-white text-[#0F172A] transition-all"><Eye className="w-5 h-5" /></span></span>
                </motion.button>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:grid-cols-2">
              {graphicDesignProjects.map((image, index) => (
                <motion.button key={image} type="button" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }} onClick={() => setSelectedImage(image)} className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-200 dark:bg-slate-800 text-left" aria-label="View graphic design project image">
                  <img src={image} alt="Graphic design project" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute inset-0 flex items-center justify-center bg-[#0F172A]/0 group-hover:bg-[#0F172A]/60 transition-colors"><span className="opacity-0 group-hover:opacity-100 p-3 rounded-full bg-white text-[#0F172A] transition-all"><Eye className="w-5 h-5" /></span></span>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/85" role="dialog" aria-modal="true" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-5xl max-h-[90vh]" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={() => setSelectedImage(null)} className="absolute -top-11 right-0 p-2 text-white hover:text-blue-300" aria-label="Close image preview"><X className="w-6 h-6" /></button>
            <img src={selectedImage} alt="Digital marketing project preview" className="max-w-full max-h-[85vh] rounded-2xl object-contain" />
          </div>
        </div>
      )}

      <CTASection />
    </PageTransition>
  );
}
