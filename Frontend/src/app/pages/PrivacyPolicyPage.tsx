import { motion } from "motion/react";
import { PageTransition } from "../components/shared/PageTransition";

export function PrivacyPolicyPage() {
  return (
    <PageTransition>
      <section className="pt-32 pb-20 bg-[#0F172A] relative overflow-hidden">
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl font-bold text-white [font-family:'Plus_Jakarta_Sans',sans-serif] mb-4">Privacy Policy</h1>
            <p className="text-slate-400">Last updated: June 18, 2025</p>
          </motion.div>
        </div>
      </section>
      <section className="py-24 bg-white dark:bg-[#0F172A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate dark:prose-invert max-w-none">
          <div className="space-y-8 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            {[
              { title: "1. Information We Collect", content: "We collect information you provide directly to us, such as when you fill out a contact form, subscribe to our newsletter, or engage with our services. This includes your name, email address, phone number, and project details. We also collect information automatically when you visit our website, including IP address, browser type, and pages visited." },
              { title: "2. How We Use Your Information", content: "We use the information we collect to respond to your inquiries, provide our services, send you updates and marketing communications (with your consent), improve our website and services, and comply with legal obligations." },
              { title: "3. Information Sharing", content: "We do not sell, trade, or otherwise transfer your personal information to outside parties without your consent, except to trusted third parties who assist us in operating our website and conducting our business, as long as those parties agree to keep this information confidential." },
              { title: "4. Data Security", content: "We implement industry-standard security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security." },
              { title: "5. Cookies", content: "We use cookies to enhance your experience on our website. You can choose to disable cookies through your browser settings, though this may limit some functionality." },
              { title: "6. Your Rights", content: "You have the right to access, correct, or delete your personal information. You may also opt out of marketing communications at any time by clicking the unsubscribe link in any email we send." },
              { title: "7. Contact Us", content: "If you have questions about this Privacy Policy, please contact us at privacy@webmarkio.com or write to us at 123 Digital Ave, San Francisco, CA 94105." },
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
