import { motion } from "motion/react";
import { PageTransition } from "../components/shared/PageTransition";

export function TermsPage() {
  return (
    <PageTransition>
      <section className="pt-32 pb-20 bg-[#0F172A]">
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl font-bold text-white [font-family:'Plus_Jakarta_Sans',sans-serif] mb-4">Terms of Service</h1>
            <p className="text-slate-400">Last updated: June 18, 2025</p>
          </motion.div>
        </div>
      </section>
      <section className="py-24 bg-white dark:bg-[#0F172A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            {[
              { title: "1. Acceptance of Terms", content: "By accessing and using WebMarkio's services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services." },
              { title: "2. Services", content: "WebMarkio provides digital agency services including website design and development, digital marketing, branding, and related consulting services. The specific scope of services will be defined in individual project agreements." },
              { title: "3. Payment Terms", content: "Payment terms are specified in individual project contracts. Generally, projects require a deposit before work begins, with milestone payments throughout the project. All fees are non-refundable unless otherwise specified in writing." },
              { title: "4. Intellectual Property", content: "Upon full payment, clients receive full ownership of custom work created specifically for them. WebMarkio retains rights to all proprietary tools, frameworks, and pre-existing intellectual property used in the creation of your project." },
              { title: "5. Client Responsibilities", content: "Clients are responsible for providing accurate and complete information required for project completion, timely feedback and approvals, and any content, materials, or access needed to complete the project." },
              { title: "6. Limitation of Liability", content: "WebMarkio's liability is limited to the amount paid for the specific service giving rise to the claim. We are not liable for indirect, consequential, or punitive damages." },
              { title: "7. Governing Law", content: "These terms are governed by the laws of the State of California, United States. Any disputes shall be resolved in the courts of San Francisco County, California." },
            ].map((section) => (
              <div key={section.title}>
                <h2 className="text-xl font-bold text-[#0F172A] dark:text-white [font-family:'Plus_Jakarta_Sans',sans-serif] mb-3">{section.title}</h2>
                <p>{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
