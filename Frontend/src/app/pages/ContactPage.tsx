import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, MessageCircle, Clock, CheckCircle } from "lucide-react";
import { PageTransition } from "../components/shared/PageTransition";

const contactMethods = [
  { icon: Mail, label: "Email", value: "contact.webmarkio@gmail.com", href: "mailto:contact.webmarkio@gmail.com", description: "Response within 2 hours" },
  { icon: Phone, label: "Phone", value: "+8801346047100", href: "tel:+8801346047100", description: "Any time" },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: "https://wa.me/1346047100", description: "Quick response guaranteed" },
  // { icon: MapPin, label: "Office", value: "123 Digital Ave, San Francisco", href: "#map", description: "By appointment only" },
];

export function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", budget: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // console.log("Form submitted:", form);
  };

  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(37,99,235,0.12)_0%,transparent_60%)]" />
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 bg-blue-500/10 text-blue-300 text-sm font-semibold rounded-full border border-blue-500/20 mb-5">Get in Touch</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white [font-family:'Plus_Jakarta_Sans',sans-serif] leading-tight mb-5">
              Let's Build Something <span className="text-[#2563EB]">Great</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-xl mx-auto">
              Start with a free 45-minute strategy call. No commitment, no pitch—just strategy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-white dark:bg-[#0F172A]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center p-12 bg-slate-50 dark:bg-white/3 border border-slate-100 dark:border-white/5 rounded-2xl"
                >
                  <div className="w-16 h-16 bg-green-50 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mb-5">
                    <CheckCircle className="w-8 h-8 text-[#22C55E]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white [font-family:'Plus_Jakarta_Sans',sans-serif] mb-3">Message Received!</h2>
                  <p className="text-slate-500 dark:text-slate-400 max-w-sm">We'll review your project details and get back to you within 2 hours. Check your inbox for a confirmation email.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 p-8 bg-slate-50 dark:bg-white/3 border border-slate-100 dark:border-white/5 rounded-2xl">
                  <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white [font-family:'Plus_Jakarta_Sans',sans-serif] mb-2">Get Your Free Consultation</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Fill out the form below and we'll reach out within 2 hours.</p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#1E293B] dark:text-slate-200 mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => setForm({...form, name: e.target.value})}
                        required
                        placeholder="Name..."
                        className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm text-[#1E293B] dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1E293B] dark:text-slate-200 mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm({...form, email: e.target.value})}
                        required
                        placeholder="your@gamil.com"
                        className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm text-[#1E293B] dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB] transition-colors"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#1E293B] dark:text-slate-200 mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={e => setForm({...form, phone: e.target.value})}
                        placeholder="+880 1346 047100"
                        className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm text-[#1E293B] dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1E293B] dark:text-slate-200 mb-1.5">Service Interested In</label>
                      <select
                        value={form.service}
                        onChange={e => setForm({...form, service: e.target.value})}
                        className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm text-[#1E293B] dark:text-white focus:outline-none focus:border-[#2563EB] transition-colors"
                      >
                        <option value="" className="dark:text-black">Select a service</option>
                        <option className="dark:text-black">Website Development</option>
                        <option className="dark:text-black">Facebook Ads</option>
                        <option className="dark:text-black">Google Ads</option>
                        <option className="dark:text-black">SEO</option>
                        <option className="dark:text-black">Branding</option>
                        <option className="dark:text-black">Full Digital Package</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1E293B] dark:text-slate-200 mb-1.5">Budget Range</label>
                    <select
                      value={form.budget}
                      onChange={e => setForm({...form, budget: e.target.value})}
                      className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm text-[#1E293B] dark:text-white focus:outline-none focus:border-[#2563EB] transition-colors"
                    >
                      <option value="" className="dark:text-black">Select budget range</option>
                      <option className="dark:text-black">Under $2,500</option>
                      <option className="dark:text-black">$2,500 – $5,000</option>
                      <option className="dark:text-black">$5,000 – $10,000</option>
                      <option className="dark:text-black">$10,000 – $25,000</option>
                      <option className="dark:text-black">$25,000+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1E293B] dark:text-slate-200 mb-1.5">Tell Us About Your Project *</label>
                    <textarea
                      value={form.message}
                      onChange={e => setForm({...form, message: e.target.value})}
                      required
                      rows={5}
                      placeholder="Describe your project goals, timeline, and any specific requirements..."
                      className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm text-[#1E293B] dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB] transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#2563EB] text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
                  >
                    Send Message — We'll Reply Within 2 Hours
                  </button>
                  <p className="text-xs text-center text-slate-400">By submitting, you agree to our Privacy Policy. No spam, ever.</p>
                </form>
              )}
            </div>

            {/* Sidebar Info */}
            <div className="lg:col-span-2 space-y-6">
              {contactMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <motion.a
                    key={method.label}
                    href={method.href}
                    target={method.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-white/3 border border-slate-100 dark:border-white/5 rounded-2xl hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all group"
                  >
                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center group-hover:bg-[#2563EB] transition-colors shrink-0">
                      <Icon className="w-5 h-5 text-[#2563EB] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-0.5">{method.label}</p>
                      <p className="font-semibold text-[#1E293B] dark:text-white text-sm">{method.value}</p>
                      <p className="text-xs text-slate-400">{method.description}</p>
                    </div>
                  </motion.a>
                );
              })}

              {/* Office Hours */}
              <div className="p-5 bg-slate-50 dark:bg-white/3 border border-slate-100 dark:border-white/5 rounded-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-[#2563EB]" />
                  <span className="font-bold text-[#1E293B] dark:text-white text-sm">Office Hours</span>
                </div>
                <div className="space-y-2">
                  {[
                    ["Monday – Friday", "9:00 AM – 6:00 PM EST"],
                    ["Saturday", "10:00 AM – 2:00 PM EST"],
                    ["Sunday", "Closed"],
                  ].map(([day, hours]) => (
                    <div key={day} className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">{day}</span>
                      <span className="text-[#1E293B] dark:text-white font-medium">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>

                {/* Map */}
                    <div className="rounded-xl overflow-hidden border border-white/10 mt-20">
                        <iframe
                            title="map"
                            src="https://www.google.com/maps?q=23.7371353,90.3714652&hl=en&z=16&output=embed"
                            className="w-full h-50 border-0"
                            loading="lazy"
                            allowFullScreen
                        ></iframe>
                    </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
