import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Search, Facebook, Linkedin, Phone } from "lucide-react";
import teamImage from "../assets/752642844_1057904589921028_6811138559548038832_n.jpeg";
import { teamMembers } from "../../data/team";
import { SectionHeading } from "../components/shared/SectionHeading";
import { PageTransition } from "../components/shared/PageTransition";
import { CTASection } from "../components/home/CTASection";

export function TeamPage() {
  const [search, setSearch] = useState("");

  const filteredMembers = useMemo(
    () => teamMembers.filter((member) => {
      const query = search.toLowerCase();
      return (
        member.name.toLowerCase().includes(query) ||
        member.role.toLowerCase().includes(query) ||
        member.id.toLowerCase().includes(query)
      );
    }),
    [search]
  );

  return (
    <PageTransition>
      <section className="pt-32 pb-20 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(37,99,235,0.12)_0%,transparent_60%)]" />
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <span className="inline-block px-4 py-1.5 bg-blue-500/10 text-blue-300 text-sm font-semibold rounded-full border border-blue-500/20 mb-5">
                Meet the Team
              </span>
              <h1 className="text-5xl md:text-6xl font-bold text-white [font-family:'Plus_Jakarta_Sans',sans-serif] leading-tight mb-6">
                The people behind
                <br />
                <span className="text-[#2563EB]">every great digital experience</span>
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed max-w-3xl">
                We are a collaborative group of strategists, designers, developers, and marketers who work together to deliver real results for ambitious brands.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative overflow-hidden rounded-[2rem] bg-slate-900/80 shadow-2xl ring-1 ring-white/10"
            >
              <img
                src={teamImage}
                alt="Team collaboration"
                className="h-full w-full min-h-[360px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Teamwork</p>
                <h2 className="mt-2 text-3xl font-bold">Collaborating for better digital results</h2>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 dark:bg-[#0A0F1E]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                Our Experts
              </p>
              <h2 className="mt-3 text-4xl font-bold text-slate-900 dark:text-white [font-family:'Plus_Jakarta_Sans',sans-serif]">
                Meet the team behind every successful project.
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Browse the experts driving growth, design, development, and strategy for our clients. Filter by name, role or ID.
              </p>
            </div>
            <div className="w-full md:w-1/3">
              <label className="relative block text-slate-700 dark:text-slate-300">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by ID, Name"
                  className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-blue-400 dark:focus:ring-blue-900/40"
                />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg dark:border-slate-700 dark:bg-[#0B1224]"
              >
                <div className="mx-auto mb-5 grid h-36 w-36 place-items-center rounded-full bg-slate-100 dark:bg-slate-800">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-32 w-32 rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{member.name}</h3>
                <p className="mt-2 text-sm font-medium uppercase tracking-[0.18em] text-[#2563EB] dark:text-blue-300">
                  {member.role}
                </p>
                <div className="mt-6 flex items-center justify-center gap-3">
                  {member.social.facebook && (
                    <a
                      href={member.social.facebook}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-sm transition hover:shadow-lg"
                      aria-label="Facebook"
                    >
                      <Facebook className="h-4 w-4" />
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0A66C2] text-white shadow-sm transition hover:shadow-lg"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                  {member.social.whatsapp && (
                    <a
                      href={member.social.whatsapp}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm transition hover:shadow-lg"
                      aria-label="WhatsApp"
                    >
                      <Phone className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div className="mt-12 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500 dark:border-slate-700 dark:bg-[#08101f] dark:text-slate-400">
              No team members found. Try a different name, role, or ID.
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </PageTransition>
  );
}
