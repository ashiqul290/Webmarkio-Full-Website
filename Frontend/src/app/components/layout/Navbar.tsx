import { useState, useEffect, useRef, type WheelEvent } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu, X, ChevronDown, Globe, Briefcase, Target, Palette,
  Zap, UtensilsCrossed, GraduationCap, Heart, ShoppingCart,
  TrendingUp, Search, BarChart2, Sparkles, Layers, Building2, Moon, Sun
} from "lucide-react";
import { services } from "../../../data/services";
import logoLight from "../../assets/logo.png";


const serviceIcons: Record<string, React.ElementType> = {
  Building2, Briefcase, Target, Palette, Zap, UtensilsCrossed,
  GraduationCap, Heart, ShoppingCart, TrendingUp, Search, BarChart2, Sparkles, Layers
};

const aboutDropdownLinks = [
  { label: "About Us", href: "/about#about-us" },
  { label: "Team", href: "/team" },
  { label: "Terms & Condition", href: "/terms" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about#about-us", dropdownLinks: aboutDropdownLinks },
  { label: "Services", href: "/services", hasMega: true },
  {
    label: "Achievements",
    // parent doesn't navigate; child links perform navigation
    dropdownLinks: [
      { label: "Our Projects", href: "/projects" },
      { label: "Client Portfolio", href: "/portfolio" },
      { label: "Client Review", href: "/client-review" },
       { label: "Client Meetings", href: "/client-meetings" },
    ],
  },
  // { label: "Case Studies", href: "/case-studies" },
  { label: "Pricing", href: "/pricing" },
  // { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const serviceCategories = [
  { label: "Website Development", services: services.filter(s => s.category === "Website Development") },
  { label: "Digital Marketing", services: services.filter(s => s.category === "Digital Marketing") },
  { label: "Design", services: services.filter(s => s.category === "Design") },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem("theme") !== "light";
  });
  const location = useLocation();
  const megaRef = useRef<HTMLDivElement>(null);

  const isHeroPage = location.pathname === "/";

  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved === "light") {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  const toggleDark = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const navBg = isScrolled
    ? "bg-white/95 dark:bg-[#0A0F1E]/95 backdrop-blur-xl shadow-sm border-b border-black/5 dark:border-white/5"
    : isHeroPage
    ? "bg-transparent"
    : "bg-white/95 dark:bg-[#0A0F1E]/95 backdrop-blur-xl shadow-sm border-b border-black/5 dark:border-white/5";

  const handleScrollWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const textColor = isScrolled || !isHeroPage
    ? "text-black dark:text-slate-100"
    : "text-white ";

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-40">
              <img src={logoLight} alt="Logo" />
            </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" ref={megaRef}>
              {navLinks.map((link) => {
                if (link.dropdownLinks) {
                  return (
                    <div key={link.label} className="relative">
                      <button
                        onMouseEnter={() => setOpenDropdown(link.label)}
                        onMouseLeave={() => setOpenDropdown(null)}
                        onClick={() => setOpenDropdown(v => v === link.label ? null : link.label)}
                        className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-[#2563EB] ${
                          // mark active if current path matches any child href
                          (link.href && (location.pathname === link.href || location.pathname.startsWith(link.href))) ||
                          (link.dropdownLinks && link.dropdownLinks.some(dl => dl.href && (location.pathname === dl.href || location.pathname.startsWith(dl.href))))
                            ? "text-[#2563EB]"
                            : textColor
                        }`}
                      >
                        {link.label}
                        <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === link.label ? "rotate-180" : ""}`} />
                      </button>

                      <AnimatePresence>
                        {openDropdown === link.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.2 }}
                            onMouseEnter={() => setOpenDropdown(link.label)}
                            onMouseLeave={() => setOpenDropdown(null)}
                            onWheel={handleScrollWheel}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 rounded-2xl border border-black/8 bg-white p-3 shadow-2xl dark:border-white/8 dark:bg-[#0F172A]"
                          >
                            <div className="space-y-1">
                              {link.dropdownLinks.map((item) => (
                                <Link
                                  key={item.label}
                                  to={item.href}
                                  onClick={() => setOpenDropdown(null)}
                                  className="block rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-blue-50 hover:text-[#2563EB] dark:text-slate-200 dark:hover:bg-blue-900/20"
                                >
                                  {item.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                if (link.hasMega) {
                  return (
                    <div key={link.label} className="relative">
                    <button
                      onMouseEnter={() => setMegaOpen(true)}
                      onMouseLeave={() => setMegaOpen(false)}
                      onClick={() => setMegaOpen(v => !v)}
                      className={`flex items-center gap-1 px-3  py-2 rounded-md text-sm font-medium transition-colors hover:text-[#2563EB] ${
                        location.pathname.startsWith("/services") ? "text-[#2563EB] " : textColor
                      }`}
                    >
                      {link.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${megaOpen ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence>
                      {megaOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          onMouseEnter={() => setMegaOpen(true)}
                          onMouseLeave={() => setMegaOpen(false)}
                          onWheel={handleScrollWheel}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[720px] max-h-[60vh] overflow-y-auto bg-white dark:bg-[#0F172A] rounded-2xl shadow-2xl border border-black/8 dark:border-white/8 p-6"
                        >
                          <div className="grid grid-cols-3 gap-6">
                            {serviceCategories.map((cat) => (
                              <div key={cat.label}>
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">{cat.label}</p>
                                <div className="space-y-0.5">
                                  {cat.services.map((svc) => {
                                    const Icon = serviceIcons[svc.icon] || Globe;
                                    return (
                                      <Link
                                        key={svc.slug}
                                        to={`/services/${svc.slug}`}
                                        className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 group transition-colors"
                                      >
                                        <div className="w-7 h-7 bg-blue-50 dark:bg-blue-900/30 rounded-md flex items-center justify-center shrink-0 group-hover:bg-blue-100 dark:group-hover:bg-blue-800/40 transition-colors">
                                          <Icon className="w-3.5 h-3.5 text-[#2563EB]" />
                                        </div>
                                        <span className="text-sm text-slate-700 dark:text-slate-200 group-hover:text-[#2563EB] transition-colors">{svc.title}</span>
                                      </Link>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-5 pt-5 border-t border-slate-100 dark:border-white/8 flex items-center justify-between">
                            <p className="text-sm text-slate-500 dark:text-slate-400">Not sure where to start? Let us guide you.</p>
                            <Link
                              to="/contact"
                              className="text-sm font-semibold text-[#2563EB] hover:text-blue-700 transition-colors"
                            >
                              Get free consultation →
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  );
                }

                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-[#2563EB] ${
                      location.pathname === link.href ? "text-[#2563EB]" : textColor
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* <button
                onClick={toggleDark}
                className={`hidden sm:flex w-9 h-9 items-center justify-center rounded-full transition-colors hover:bg-white/10 dark:hover:bg-white/10 ${textColor}`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-black" />}
              </button> */}
              <Link
                to="/contact"
                className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 bg-[#2563EB] text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition-all shadow-sm hover:shadow-blue-500/30 hover:shadow-md"
              >
                Free Consultation
              </Link>
              <button
                onClick={() => setMobileOpen(v => !v)}
                className={`lg:hidden w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${textColor}`}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-16 left-0 right-0 z-40 bg-white dark:bg-[#0A0F1E] border-b border-black/8 dark:border-white/8 overflow-y-auto max-h-[calc(100vh-4rem)] shadow-xl"
          >
            <div className="max-w-[1400px] mx-auto px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.label}>
                  {link.dropdownLinks ? (
                    <div className="rounded-lg px-3 py-2">
                      <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{link.label}</p>
                      <div className="mt-2 space-y-1">
                        {link.dropdownLinks.map((item) => (
                          <Link
                            key={item.label}
                            to={item.href}
                            className="block rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-blue-50 hover:text-[#2563EB] dark:text-slate-200 dark:hover:bg-blue-900/20"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : link.hasMega ? (
                    <>
                      <p className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-widest mt-3 mb-1">Services</p>
                      {services.map((svc) => {
                        const Icon = serviceIcons[svc.icon] || Globe;
                        return (
                          <Link
                            key={svc.slug}
                            to={`/services/${svc.slug}`}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-700 dark:text-slate-200"
                          >
                            <Icon className="w-4 h-4 text-[#2563EB] shrink-0" />
                            <span className="text-sm">{svc.title}</span>
                          </Link>
                        );
                      })}
                    </>
                  ) : (
                    <Link
                      to={link.href}
                      className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                        location.pathname === link.href
                          ? "text-[#2563EB] bg-blue-50 dark:bg-blue-900/20"
                          : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 pb-2 border-t border-slate-100 dark:border-white/8">
                <Link
                  to="/contact"
                  className="block w-full text-center px-4 py-3 bg-[#2563EB] text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Get Free Consultation
                </Link>
              </div>

              {/* <button
                onClick={toggleDark}
                className="flex items-center gap-2 w-full px-3 py-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span className="text-sm font-medium">{darkMode ? "Light Mode" : "Dark Mode"}</span>
              </button> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
