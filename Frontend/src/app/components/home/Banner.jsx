import { ArrowRight, CheckCircle, Play, TrendingUp, Users } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router';

const Banner = () => {
    const clients = ["TechFlow", "Nexora", "BuildStack", "CloudBase", "DataSync", "InnovaX", "PulseAI", "Zenvoy"];
    return (
        <>

            {/* ── Hero ── */}
            <section id="home" className="relative flex items-center py-16 mt-15 overflow-hidden bg-slate-50/80 dark:bg-[#020817] transition-colors">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[100px]" />
                    <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[100px]" />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
                </div>

                <div className="max-w-[1400px] mx-auto w-full">
                    <div className="px-4 sm:px-6 xl:px-0 grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left */}
                        <div className="space-y-8 relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                                Full-Service Digital Agency
                            </div>

                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-slate-900 dark:text-white">
                                We Build{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                                    Powerful
                                </span>{" "}
                                Digital Experiences
                            </h1>

                            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-lg">
                                WebMarkio Agency helps businesses grow with modern websites, UI/UX design, SEO and digital marketing solutions that convert visitors into loyal clients.
                            </p>

                            <div className="flex flex-wrap gap-4">


                                <Link
                                    to="/contact"
                                    className="group flex items-center gap-2 px-7 py-3.5 bg-[#2563EB] text-white font-semibold rounded-full hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:gap-3"
                                >
                                    Start Your Project
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                                </Link>
                                <Link
                                    to="/portfolio"
                                    className="flex items-center gap-2.5 px-7 py-3.5 bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-white font-semibold rounded-full border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                                >
                                    <div className="w-7 h-7 bg-slate-200/80 dark:bg-white/10 rounded-full flex items-center justify-center">
                                        <Play className="w-3 h-3 fill-slate-700 dark:fill-white ml-0.5" />
                                    </div>
                                    View Our Work
                                </Link>
                            </div>

                            <div className="flex gap-10 pt-2">
                                {[{ val: "100+", label: "Projects" }, { val: "50+", label: "Clients" }, { val: "5★", label: "Rating" }].map(({ val, label }) => (
                                    <div key={label}>
                                        <div className="text-3xl font-black text-slate-900 dark:text-white">{val}</div>
                                        <div className="text-slate-600 dark:text-slate-500 text-sm mt-0.5">{label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Dashboard Mockup */}
                        <div className="relative flex justify-center">
                            <div className="relative w-full max-w-[480px]">
                                {/* Main card */}
                                <div className="rounded-2xl bg-white/95 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/80 dark:border-white/10 p-5 shadow-[0_30px_80px_rgba(15,23,42,0.08)] dark:shadow-2xl">
                                    {/* Browser chrome */}
                                    <div className="flex items-center gap-1.5 mb-4">
                                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                        <div className="ml-3 flex-1 h-6 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center px-3 gap-1.5">
                                            <div className="w-2 h-2 rounded-full bg-green-400/60" />
                                            <span className="text-slate-500 dark:text-slate-500 text-[10px] font-mono">app.webmarkio.agency/dashboard</span>
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 dark:bg-[#0B1222] rounded-xl p-4 space-y-4 border border-slate-200/70 dark:border-white/5">
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-900 dark:text-white text-sm font-bold">Analytics Overview</span>
                                            <span className="text-slate-500 dark:text-slate-500 text-xs">May 2026</span>
                                        </div>

                                        {/* Stats */}
                                        <div className="grid grid-cols-3 gap-2">
                                            {[
                                                { label: "Revenue", val: "$48.2k", up: "+24%" },
                                                { label: "Users", val: "1,284", up: "+18%" },
                                                { label: "Projects", val: "32", up: "+8%" },
                                            ].map(({ label, val, up }) => (
                                                <div key={label} className="bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/5 rounded-lg p-2.5">
                                                    <div className="text-slate-500 dark:text-slate-500 text-[10px]">{label}</div>
                                                    <div className="text-slate-900 dark:text-white text-sm font-bold mt-0.5">{val}</div>
                                                    <div className="text-green-600 dark:text-green-400 text-[10px] mt-0.5 font-medium">{up}</div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Chart */}
                                        <div className="h-24">
                                            <svg width="100%" height="100%" viewBox="0 0 320 80" preserveAspectRatio="none">
                                                <defs>
                                                    <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="0%" stopColor="#2563EB" stopOpacity="0.35" />
                                                        <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                                                    </linearGradient>
                                                    <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.25" />
                                                        <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
                                                    </linearGradient>
                                                </defs>
                                                <path
                                                    d="M0,68 C40,58 70,42 110,28 C140,16 170,24 200,18 C230,12 270,6 320,4 L320,80 L0,80 Z"
                                                    fill="url(#blueGrad)"
                                                />
                                                <path
                                                    d="M0,68 C40,58 70,42 110,28 C140,16 170,24 200,18 C230,12 270,6 320,4"
                                                    fill="none"
                                                    stroke="#3B82F6"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                />
                                                <path
                                                    d="M0,76 C50,70 90,65 130,55 C170,46 210,42 260,36 L320,32 L320,80 L0,80 Z"
                                                    fill="url(#purpleGrad)"
                                                />
                                                <path
                                                    d="M0,76 C50,70 90,65 130,55 C170,46 210,42 260,36 L320,32"
                                                    fill="none"
                                                    stroke="#8B5CF6"
                                                    strokeWidth="1.5"
                                                    strokeDasharray="5,3"
                                                    strokeLinecap="round"
                                                />
                                                {[80, 140, 200, 260, 320].map((x, i) => {
                                                    const ys = [28, 18, 18, 6, 4];
                                                    return <circle key={i} cx={x} cy={ys[i]} r="2.5" fill="#3B82F6" />;
                                                })}
                                            </svg>
                                        </div>

                                        {/* Progress */}
                                        <div className="space-y-2.5">
                                            {[
                                                { label: "TechCorp Rebrand", pct: 90, color: "from-blue-500 to-blue-400" },
                                                { label: "ShopWave Launch", pct: 68, color: "from-purple-500 to-violet-400" },
                                                { label: "Finora App UI", pct: 45, color: "from-cyan-500 to-blue-400" },
                                            ].map(({ label, pct, color }) => (
                                                <div key={label}>
                                                    <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 mb-1">
                                                        <span>{label}</span>
                                                        <span className="font-semibold">{pct}%</span>
                                                    </div>
                                                    <div className="h-1.5 bg-slate-200/70 dark:bg-white/[0.06] rounded-full overflow-hidden">
                                                        <div className={`h-full rounded-full bg-gradient-to-r ${color}`} style={{ width: `${pct}%` }} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Floating: revenue */}
                                <div className="absolute -left-14 top-[35%] bg-white/95 dark:bg-[#1E293B]/95 backdrop-blur-md border border-slate-200/80 dark:border-white/10 rounded-xl p-3 shadow-[0_24px_60px_rgba(15,23,42,0.12)] dark:shadow-2xl">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg">
                                            <TrendingUp className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-slate-500 dark:text-slate-400">Revenue Growth</div>
                                            <div className="text-slate-900 dark:text-white text-sm font-bold">+24.8%</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating: users */}
                                <div className="absolute -right-12 bottom-[28%] bg-white/95 dark:bg-[#1E293B]/95 backdrop-blur-md border border-slate-200/80 dark:border-white/10 rounded-xl p-3 shadow-[0_24px_60px_rgba(15,23,42,0.12)] dark:shadow-2xl">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                                            <Users className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-slate-500 dark:text-slate-400">Active Users</div>
                                            <div className="text-slate-900 dark:text-white text-sm font-bold">1,284</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating: badge */}
                                <div className="absolute -top-3 right-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full px-3.5 py-1.5 shadow-xl flex items-center gap-1.5">
                                    <CheckCircle className="w-3.5 h-3.5 text-white" />
                                    <span className="text-white text-[11px] font-semibold">Project Delivered</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>




        </>
    )
}

export default Banner
