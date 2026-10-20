import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, Play, Star } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0F1E]">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(37,99,235,0.15)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(34,197,94,0.08)_0%,transparent_50%)]" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8"
        >
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="text-blue-200 text-sm font-medium">Rated #1 Digital Agency • 200+ Projects</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.05] tracking-tight [font-family:'Plus_Jakarta_Sans',sans-serif] mb-6"
        >
          We Build Digital
          <br />
          <span className="relative">
            <span className="bg-gradient-to-r from-[#2563EB] via-blue-400 to-[#22C55E] bg-clip-text text-transparent">
              Experiences
            </span>
          </span>{" "}
          That
          <br />
          Drive Growth
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          WebMarkio crafts premium websites, performance marketing campaigns, and brand identities that turn visitors into customers and ambitions into results.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            to="/contact"
            className="group flex items-center gap-2 px-7 py-3.5 bg-[#2563EB] text-white font-semibold rounded-full hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:gap-3"
          >
            Start Your Project
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/portfolio"
            className="flex items-center gap-2.5 px-7 py-3.5 bg-white/5 text-white font-semibold rounded-full border border-white/10 hover:bg-white/10 transition-all"
          >
            <div className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center">
              <Play className="w-3 h-3 fill-white ml-0.5" />
            </div>
            View Our Work
          </Link>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-900/30">
            <div className="bg-[#0F172A] px-4 py-3 flex items-center gap-2 border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-white/5 border border-white/10 rounded-md px-3 py-1 text-xs text-slate-400">
                  webmarkio.com/portfolio
                </div>
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop&auto=format"
              alt="WebMarkio Agency Dashboard"
              className="w-full object-cover"
              style={{ height: "clamp(240px, 40vw, 500px)" }}
            />
            {/* Floating cards */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-8 left-6 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-3 flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-[#22C55E] rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">↑</span>
              </div>
              <div>
                <p className="text-white text-xs font-semibold">Revenue Growth</p>
                <p className="text-green-400 text-sm font-bold">+340% this quarter</p>
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-8 right-6 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-3"
            >
              <p className="text-white text-xs font-semibold mb-1">Projects Delivered</p>
              <p className="text-[#2563EB] text-2xl font-bold">200+</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
