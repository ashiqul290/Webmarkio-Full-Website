import { BrowserRouter, Routes, Route, Outlet, useLocation } from "react-router";
import { AnimatePresence } from "motion/react";
import { useEffect } from "react";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { BackToTop } from "./components/shared/BackToTop";
import { WhatsAppButton } from "./components/shared/WhatsAppButton";
import { CustomCursor } from "./components/shared/CustomCursor";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { TeamPage } from "./pages/TeamPage";
import { ServicesPage } from "./pages/ServicesPage";
import { ServiceDetailPage } from "./pages/ServiceDetailPage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { PortfolioDetailPage } from "./pages/PortfolioDetailPage";
import { AllProjectsPage } from "./pages/AllProjectsPage";
import { CaseStudiesPage } from "./pages/CaseStudiesPage";
import { PricingPage } from "./pages/PricingPage";
import { BlogPage } from "./pages/BlogPage";
import { BlogDetailPage } from "./pages/BlogDetailPage";
import { FAQPage } from "./pages/FAQPage";
import { ContactPage } from "./pages/ContactPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { TermsPage } from "./pages/TermsPage";
import { RefundPolicyPage } from "./pages/RefundPolicyPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ClientReviewPage } from "./pages/ClientReviewPage";
import TermsPageNew from "./pages/TermsPageUpdate";
import ClientMeetingsPage from "./pages/ClientMeetingsPage";
import { LoginPage, SignupPage } from "./pages/AuthPages";
import { AdminDashboard, AdminLayout, AdminProjectsPage, AdminTeamPage } from "./pages/AdminPages";
import AdminMain from "./Admin/AdminMain";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname, hash]);
  return null;
}

function SiteLayout() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <main>
        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppButton />
    </>
  );
}

function AppLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <ScrollToTop />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/projects" element={<AllProjectsPage />} />
          <Route path="/portfolio/:slug" element={<PortfolioDetailPage />} />
          <Route path="/client-review" element={<ClientReviewPage />} />
          <Route path="/client-meetings" element={<ClientMeetingsPage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPageNew />} />
          <Route path="/refund-policy" element={<RefundPolicyPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="projects" element={<AdminProjectsPage />} />
          <Route path="team" element={<AdminTeamPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
        {/* <Route path="/admin" element={<AdminMain />} /> */}
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
