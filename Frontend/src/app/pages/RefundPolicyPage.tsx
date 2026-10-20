import { motion } from "motion/react";
import { PageTransition } from "../components/shared/PageTransition";

export function RefundPolicyPage() {
  return (
    <PageTransition>
      <section className="pt-32 pb-20 bg-[#0F172A]">
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl font-bold text-white [font-family:'Plus_Jakarta_Sans',sans-serif] mb-4">Refund Policy</h1>
            <p className="text-slate-400">Last updated: June 18, 2025</p>
          </motion.div>
        </div>
      </section>
      <section className="py-24 bg-white dark:bg-[#0F172A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            {[
              { title: "Our Commitment", content: "We are committed to delivering exceptional results and your satisfaction is our priority. We work closely with each client throughout the project to ensure the final delivery meets or exceeds expectations." },
              { title: "Project Deposits", content: "Project deposits (typically 40% of the total project value) are non-refundable once work has commenced. This covers initial planning, strategy development, and resource allocation for your project." },
              { title: "Milestone Payments", content: "Milestone payments are non-refundable once that phase of work has been approved by the client. We provide detailed previews and require written approval before proceeding to the next milestone." },
              { title: "Disputes and Revisions", content: "If you are not satisfied with any deliverable, please raise the concern within 7 days of delivery. We will work with you to address the issue through our included revision process at no additional cost." },
              { title: "Cancellation Policy", content: "If you need to cancel a project mid-way, you are responsible for all work completed to the cancellation date. Any unused balance beyond completed work will be refunded within 30 days." },
              { title: "Ongoing Services", content: "For monthly retainer services (SEO, paid media management), you may cancel with 30 days written notice. No refunds are issued for the current billing period." },
              { title: "Contact for Refund Requests", content: "To request a refund or discuss your situation, please contact billing@webmarkio.com. We handle each case individually and are committed to fair resolution." },
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
