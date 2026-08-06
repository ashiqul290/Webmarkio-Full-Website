import { motion } from "motion/react";

const companies = [
  "Nexus Capital", "Luminary Jewels", "Verdant Earth", "Apex Analytics",
  "MediPlus Health", "Stellar Dining", "TechVenture Inc", "CloudSoft",
  "PeakHR", "NovaBrand", "Elevate Media", "SwiftPay",
];

export function TrustedCompanies() {
  return (
    <section className="py-16 bg-slate-50 dark:bg-[#0A0F1E] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          Trusted by 200+ forward-thinking companies
        </p>
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-50 dark:from-[#0A0F1E] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-50 dark:from-[#0A0F1E] to-transparent z-10" />
        <motion.div
          animate={{ x: [0, -(companies.length * 160)] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 whitespace-nowrap"
        >
          {[...companies, ...companies].map((company, i) => (
            <div
              key={`${company}-${i}`}
              className="flex items-center gap-2.5 shrink-0 px-6 py-3 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl"
            >
              <div className="w-6 h-6 bg-[#2563EB]/10 rounded-md flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-[#2563EB] rounded-sm" />
              </div>
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">{company}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
