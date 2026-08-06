import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, MessageCircle } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 bg-[#0F172A] overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(37,99,235,0.15)_0%,transparent_70%)]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 bg-blue-500/10 text-blue-300 text-sm font-semibold rounded-full border border-blue-500/20 mb-6">
            Ready to grow?
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white [font-family:'Plus_Jakarta_Sans',sans-serif] leading-tight mb-6">
            Let's Build Something
            <span className="bg-gradient-to-r from-[#2563EB] to-[#22C55E] bg-clip-text text-transparent"> Extraordinary</span>
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Join 200+ companies that trusted WebMarkio to transform their digital presence. Your free consultation call is 45 minutes with our senior strategist no sales pitch, just strategy.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="group flex items-center gap-2 px-8 py-4 bg-[#2563EB] text-white font-bold rounded-full hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:gap-3"
            >
              Book Free Consultation <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/1346047100"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-8 py-4 bg-white/5 text-white font-semibold rounded-full border border-white/10 hover:bg-white/10 transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              Chat on WhatsApp
            </a>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            No commitment required. Response within 2 hours.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
