import { HeroSection } from "../components/home/HeroSection";
import { StatsSection } from "../components/home/StatsSection";
import { TrustedCompanies } from "../components/home/TrustedCompanies";
import { ServicesSection } from "../components/home/ServicesSection";
import { WhyChooseUs } from "../components/home/WhyChooseUs";
import { ProcessSection } from "../components/home/ProcessSection";
import { FeaturedProjects } from "../components/home/FeaturedProjects";
import { TestimonialsSection } from "../components/home/TestimonialsSection";
import { PricingPreview } from "../components/home/PricingPreview";
import { FAQSection } from "../components/home/FAQSection";
import { CTASection } from "../components/home/CTASection";
import { PageTransition } from "../components/shared/PageTransition";
import Banner from "../components/home/Banner";

export function HomePage() {
  return (
    <PageTransition>
      {/* <HeroSection /> */}
      <Banner />
      <StatsSection />
      <TrustedCompanies />
      <ServicesSection />
      <WhyChooseUs />
      <ProcessSection />
      <FeaturedProjects />
      <TestimonialsSection />
      <PricingPreview />
      <FAQSection />
      <CTASection />
    </PageTransition>
  );
}
