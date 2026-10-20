import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowLeft, Home } from "lucide-react";

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="text-8xl font-bold text-[#2563EB] [font-family:'Plus_Jakarta_Sans',sans-serif] mb-4">404</div>
        <div className="w-24 h-1 bg-[#2563EB] rounded-full mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-white [font-family:'Plus_Jakarta_Sans',sans-serif] mb-3">Page Not Found</h1>
        <p className="text-slate-400 mb-8">The page you're looking for doesn't exist or has been moved. Let's get you back on track.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white font-semibold rounded-full hover:bg-blue-600 transition-colors"
          >
            <Home className="w-4 h-4" /> Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}
