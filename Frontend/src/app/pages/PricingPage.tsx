// import { useState } from "react";
// import { motion } from "motion/react";
// import { Link } from "react-router";
// import { Check, X, HelpCircle } from "lucide-react";
// import { pricingPlans, comparisonFeatures } from "../../data/pricing";
// import { faqItems } from "../../data/faq";
// import { SectionHeading } from "../components/shared/SectionHeading";
// import { PageTransition } from "../components/shared/PageTransition";
// import { CTASection } from "../components/home/CTASection";

// export function PricingPage() {
//   const [openFaq, setOpenFaq] = useState<string | null>(null);
//   const pricingFaqs = faqItems.filter(f => f.category === "Pricing" || f.category === "Process").slice(0, 6);

//   return (
//     <PageTransition>
//       {/* Hero */}
//       <section className="pt-32 pb-20 bg-[#0F172A] relative overflow-hidden">
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(37,99,235,0.12)_0%,transparent_60%)]" />
//         <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
//             <span className="inline-block px-4 py-1.5 bg-blue-500/10 text-blue-300 text-sm font-semibold rounded-full border border-blue-500/20 mb-5">Pricing</span>
//             <h1 className="text-5xl md:text-6xl font-bold text-white [font-family:'Plus_Jakarta_Sans',sans-serif] leading-tight mb-5">
//               Simple, Transparent Pricing
//             </h1>
//             <p className="text-xl text-slate-300 max-w-2xl mx-auto">
//               No hidden fees. No surprises. Premium digital experiences at prices that make sense for your business.
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* Pricing Cards */}
//       <section className="py-24 bg-white dark:bg-[#0F172A]">
//         <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
//             {pricingPlans.map((plan, i) => (
//               <motion.div
//                 key={plan.id}
//                 initial={{ opacity: 0, y: 24 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: i * 0.1 }}
//                 className={`relative flex flex-col p-6 rounded-2xl border transition-all ${
//                   plan.popular
//                     ? "bg-[#0F172A] dark:bg-[#2563EB]/10 border-[#2563EB] shadow-2xl shadow-blue-500/20 -translate-y-2"
//                     : "bg-slate-50 dark:bg-white/3 border-slate-100 dark:border-white/5 hover:border-blue-200 dark:hover:border-blue-500/30"
//                 }`}
//               >
//                 {plan.popular && (
//                   <div className="absolute -top-3 left-1/2 -translate-x-1/2">
//                     <span className="px-4 py-1 bg-[#2563EB] text-white text-xs font-bold rounded-full">MOST POPULAR</span>
//                   </div>
//                 )}
//                 <h3 className={`text-lg font-bold [font-family:'Plus_Jakarta_Sans',sans-serif] mb-1 ${plan.popular ? "text-white" : "text-[#0F172A] dark:text-white"}`}>{plan.name}</h3>
//                 <p className={`text-xs mb-5 ${plan.popular ? "text-blue-200" : "text-slate-500 dark:text-slate-400"}`}>{plan.description}</p>
//                 <div className="mb-5">
//                   <span className={`text-4xl font-bold [font-family:'Plus_Jakarta_Sans',sans-serif] ${plan.popular ? "text-white" : "text-[#0F172A] dark:text-white"}`}>{plan.price}</span>
//                   {plan.period !== "project" && <span className={`text-sm ml-1 ${plan.popular ? "text-blue-200" : "text-slate-500"}`}>/{plan.period}</span>}
//                 </div>
//                 <ul className="space-y-2.5 flex-1 mb-6">
//                   {plan.features.map((f) => (
//                     <li key={f} className="flex items-start gap-2">
//                       <Check className={`w-4 h-4 mt-0.5 shrink-0 text-[#22C55E]`} />
//                       <span className={`text-xs ${plan.popular ? "text-blue-100" : "text-slate-600 dark:text-slate-300"}`}>{f}</span>
//                     </li>
//                   ))}
//                   {plan.notIncluded.map((f) => (
//                     <li key={f} className="flex items-start gap-2 opacity-50">
//                       <X className="w-4 h-4 mt-0.5 shrink-0 text-slate-400" />
//                       <span className={`text-xs ${plan.popular ? "text-blue-200" : "text-slate-500 dark:text-slate-400"}`}>{f}</span>
//                     </li>
//                   ))}
//                 </ul>
//                 <Link
//                   to="/contact"
//                   className={`block text-center py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
//                     plan.popular
//                       ? "bg-[#2563EB] text-white hover:bg-blue-600"
//                       : "bg-[#2563EB] text-white hover:bg-blue-700"
//                   }`}
//                 >
//                   {plan.cta}
//                 </Link>
//               </motion.div>
//             ))}
//           </div>

//           {/* Comparison Table */}
//           <div>
//             <SectionHeading badge="Compare" title="Feature Comparison" subtitle="See exactly what's included in each plan." />
//             <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-white/5">
//               <table className="w-full">
//                 <thead>
//                   <tr className="bg-slate-50 dark:bg-white/3 border-b border-slate-100 dark:border-white/5">
//                     <th className="px-6 py-4 text-left text-sm font-bold text-[#1E293B] dark:text-white w-1/3">Feature</th>
//                     {pricingPlans.map(p => (
//                       <th key={p.id} className={`px-4 py-4 text-center text-sm font-bold ${p.popular ? "text-[#2563EB]" : "text-[#1E293B] dark:text-white"}`}>{p.name}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-50 dark:divide-white/3">
//                   {comparisonFeatures.map((row, i) => (
//                     <tr key={row.feature} className={i % 2 === 0 ? "bg-white dark:bg-transparent" : "bg-slate-50/50 dark:bg-white/[0.015]"}>
//                       <td className="px-6 py-3.5 text-sm text-slate-700 dark:text-slate-200">{row.feature}</td>
//                       {["starter", "business", "premium", "enterprise"].map((plan) => {
//                         const val = row[plan as keyof typeof row];
//                         return (
//                           <td key={plan} className="px-4 py-3.5 text-center">
//                             {val === true ? <Check className="w-4 h-4 text-[#22C55E] mx-auto" /> :
//                              val === false ? <X className="w-4 h-4 text-slate-300 dark:text-slate-600 mx-auto" /> :
//                              <span className="text-xs text-slate-600 dark:text-slate-300">{val}</span>}
//                           </td>
//                         );
//                       })}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FAQ */}
//       {/* <section className="py-24 bg-slate-50 dark:bg-[#0A0F1E]">
//         <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
//           <SectionHeading badge="Questions" title="Pricing FAQ" />
//           <div className="space-y-3">
//             {pricingFaqs.map((item) => (
//               <div key={item.id} className="bg-white dark:bg-[#0F172A] border border-slate-100 dark:border-white/5 rounded-2xl overflow-hidden">
//                 <button
//                   onClick={() => setOpenFaq(openFaq === item.id ? null : item.id)}
//                   className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
//                 >
//                   <span className="text-sm font-semibold text-[#1E293B] dark:text-white">{item.question}</span>
//                   <HelpCircle className={`w-4 h-4 shrink-0 transition-colors ${openFaq === item.id ? "text-[#2563EB]" : "text-slate-400"}`} />
//                 </button>
//                 {openFaq === item.id && (
//                   <p className="px-6 pb-5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-50 dark:border-white/5 pt-3">{item.answer}</p>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section> */}

//       <CTASection />
//     </PageTransition>
//   );
// }
