import { PageTransition } from "../components/shared/PageTransition";
import ClientReviewSection from "../components/home/ClientReviewSection";
import { TrustedCompanies } from "../components/home/TrustedCompanies";

export function ClientReviewPage() {
  return (
    <PageTransition>
      <div className="pt-24">
        <ClientReviewSection />
        <TrustedCompanies />
      </div>
    </PageTransition>
  );
}

export default ClientReviewPage;
