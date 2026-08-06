import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, Award, Users, Globe, TrendingUp, CheckCircle } from "lucide-react";
import { SectionHeading } from "../components/shared/SectionHeading";
import { PageTransition } from "../components/shared/PageTransition";
import { CTASection } from "../components/home/CTASection";
const imgside = new URL("../assets/right_side_image.png", import.meta.url).href;
const imgceo = new URL("../assets/2127feef-6ae3-4d29-8ed8-e60e9533b30c.png", import.meta.url).href;


const timeline = [
  { year: "2024", title: "Agency Founded", description: "Started the agency with a vision to help businesses build modern websites and grow their online presence." },
  { year: "2024", title: "First Clients", description: "Successfully completed our first client projects and built long-term relationships through quality work." },
  { year: "2025", title: "Team Growth", description: "Expanded our team with skilled designers, developers, and digital marketing professionals." },
  { year: "2025", title: "Service Expansion", description: "Successfully delivered over 50 projects across multiple industries with a strong focus on client satisfaction." },
  { year: "2026", title: "Marketing Services Launch", description: "Expanded our services to include web development, UI/UX design, SEO, social media marketing, and branding." },
  { year: "2026", title: "Growing Together", description: "Continuing to help businesses grow through innovative digital solutions while building lasting partnerships." },
  // { year: "2024", title: "200+ Projects Delivered", description: "Reached 200+ successful project deliveries with a team of 18 specialists across design, development, and marketing." },
];

const values = [
  { icon: Award, title: "Craft Excellence", description: "Every pixel, every line of code, every word of copy—we care deeply about the quality of our work." },
  { icon: Users, title: "Client Obsession", description: "Your success is our success. We go beyond the brief to deliver outcomes that genuinely move your business forward." },
  { icon: Globe, title: "Integrity Always", description: "Honest timelines, transparent pricing, and candid strategic advice—even when it's not what you want to hear." },
  { icon: TrendingUp, title: "Results-Driven", description: "Beauty without performance is decoration. We build things that are both beautiful and measurably effective." },
];

const expertise = [
  "React.js",
  "MongoDB",
  "Next.js",
  "UI/UX Design",
  "Node.js",
  "SEO Friendly",
];

const achievements = [
  { icon: Award, value: "#1", label: "Digital Agency Rating" },
  { icon: Users, value: "200+", label: "Projects Delivered" },
  { icon: Globe, value: "30+", label: "Industries Served" },
  { icon: TrendingUp, value: "$50M+", label: "Client Revenue Generated" },
];

export function AboutPage() {
  return (
    <PageTransition>
      {/* Hero */}
      <section id="about-us" className="pt-24 pb-20 bg-[#06122B] relative overflow-hidden scroll-mt-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_40%,rgba(37,99,235,0.18)_0%,transparent_50%)]" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#09101f] to-transparent" />
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/75 text-blue-300 text-sm font-semibold border border-white/10 mb-6">
                About WebMarkio
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white [font-family:'Plus_Jakarta_Sans',sans-serif] leading-tight tracking-[-0.03em] mb-6">
                Building Digital Experiences That
                <br />
                <span className="text-[#2563EB]">Drive Business Growth</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-xl mb-10">
                At WebMarkio, we help businesses establish a powerful online presence through modern web design, custom development, and digital solutions. Our goal is simple—create websites that not only look great but also generate real business results.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#2563EB] text-white font-semibold transition hover:bg-blue-500 shadow-lg shadow-[#2563EB]/20">
                  Get Free Consultation
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/portfolio" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/15 bg-white/5 text-white font-semibold hover:bg-white/10 transition">
                  View Our Portfolio
                </Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="relative">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-blue-900/25 bg-[#0b172d]">
                <img
                  src={imgside}
                  alt="Modern digital workspace"
                  className="w-full h-[420px] sm:h-[540px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                {/* <div className="absolute bottom-6 left-6 right-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 p-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-blue-200 mb-2">WebMarkio Digital Solutions</p>
                    <p className="text-sm text-slate-100 max-w-xs">Custom websites, branding, and performance marketing that help your business scale.</p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#2563EB]/10 px-4 py-2 text-sm text-[#DDE9FF]">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#2563EB] text-white">→</span>
                    200+ Projects Delivered
                  </div>
                </div> */}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="py-24 bg-[#08121F] text-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-start">
            <div className="space-y-8">
              {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/75 text-blue-300 text-sm font-semibold border border-white/10">
                About WebMarkio
              </div> */}
              <div className="space-y-6 max-w-2xl">
                <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.03em]">
                  Who <span className="text-[#2563EB]">We Are</span>
                </h2>
                <p className="text-lg text-slate-300 leading-relaxed">
                  Hi, I’m Ashiq, founder of WebMarkio. I’m a full stack developer passionate about creating modern, high-performing websites and digital solutions for businesses.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-1">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#2563EB]/15 text-[#60A5FA]">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-white mb-3">What We Do</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    WebMarkio helps businesses build a strong online presence through modern websites, responsive design, and custom web solutions.
                  </p>
                </div>
                {/* <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#22C55E]/15 text-[#86EFAC]">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-white mb-3">Our Mission</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Our mission is to help ambitious businesses grow online with professional websites, smarter marketing, and measurable performance.
                  </p>
                </div> */}
              </div>
                <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-blue-900/20">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-blue-300">Our Expertise</p>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {expertise.map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-6">
            

              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-blue-900/25 bg-[#0b172d]">
                <img src={imgceo} alt="WebMarkio workspace" className="w-full h-[420px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                {/* <div className="absolute bottom-6 left-6 right-6 rounded-3xl bg-[#0B172F]/90 border border-white/10 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-blue-200 mb-2">Building digital solutions</p>
                  <p className="text-sm text-slate-100 leading-relaxed">that drive real results.</p>
                </div> */}
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-blue-900/20">
                <p className="text-sm uppercase tracking-[0.3em] text-blue-300 mb-5">Why Choose Us</p>
                <ul className="grid gap-4">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-[#2563EB]/15 text-[#2563EB]">
                      ✓
                    </span>
                    <span className="text-sm text-slate-300">Modern & responsive design</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-[#2563EB]/15 text-[#2563EB]">
                      ✓
                    </span>
                    <span className="text-sm text-slate-300">Business-focused solutions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-[#2563EB]/15 text-[#2563EB]">
                      ✓
                    </span>
                    <span className="text-sm text-slate-300">Fast performance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-[#2563EB]/15 text-[#2563EB]">
                      ✓
                    </span>
                    <span className="text-sm text-slate-300">Reliable support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white dark:bg-[#0F172A]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-8 bg-[#2563EB] rounded-2xl">
              <h2 className="text-2xl font-bold text-white [font-family:'Plus_Jakarta_Sans',sans-serif] mb-4">Our Mission</h2>
              <p className="text-blue-100 leading-relaxed">
                To make world-class digital experiences accessible to every ambitious business—not just Fortune 500 companies. We believe a beautifully designed, high-performing website is a competitive right, not a luxury.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-8 bg-slate-50 dark:bg-white/3 border border-slate-100 dark:border-white/5 rounded-2xl">
              <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white [font-family:'Plus_Jakarta_Sans',sans-serif] mb-4">Our Vision</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                To be the most trusted digital partner for growth-stage businesses—the agency that CEOs call when they need to make a step-change in their digital presence and can't afford to get it wrong.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-slate-50 dark:bg-[#0A0F1E] border-y border-slate-100 dark:border-white/5">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((a, i) => {
              const Icon = a.icon;
              return (
                <motion.div key={a.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-[#2563EB]" />
                  </div>
                  <div className="text-3xl font-bold text-[#2563EB] [font-family:'Plus_Jakarta_Sans',sans-serif] mb-1">{a.value}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">{a.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-white dark:bg-[#0F172A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading badge="Our Journey" title="Built Over 3 Years of Commitment" subtitle="From a two-person team in 2024 to an 20-person agency trusted by companies worldwide." />
          <div className="relative space-y-8">
            <div className="absolute left-16 top-0 bottom-0 w-0.5 bg-slate-100 dark:bg-white/5 hidden md:block" />
            {timeline.map((item, i) => (
              <motion.div key={item.year} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex gap-6 md:gap-8">
                <div className="shrink-0 flex flex-col items-center">
                  <div className="w-14 h-14 bg-[#2563EB] text-white rounded-xl flex items-center justify-center font-bold text-sm [font-family:'JetBrains_Mono',monospace] z-10">
                    {item.year}
                  </div>
                </div>
                <div className="pb-8 flex-1">
                  <h3 className="font-bold text-[#1E293B] dark:text-white [font-family:'Plus_Jakarta_Sans',sans-serif] mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white dark:bg-[#0F172A]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading badge="Our Values" title="What We Stand For" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="p-6 bg-slate-50 dark:bg-white/3 border border-slate-100 dark:border-white/5 rounded-2xl text-center">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-[#2563EB]" />
                  </div>
                  <h3 className="font-bold text-[#1E293B] dark:text-white [font-family:'Plus_Jakarta_Sans',sans-serif] mb-2">{v.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{v.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Office Gallery */}
      {/* <section className="py-24 bg-slate-50 dark:bg-[#0A0F1E]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading badge="Our Space" title="Where the Magic Happens" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop&auto=format",
              "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=400&fit=crop&auto=format",
              "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&h=400&fit=crop&auto=format",
              "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop&auto=format",
            ].map((src, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="aspect-square rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800">
                <img src={src} alt={`Office ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      <CTASection />
    </PageTransition>
  );
}
