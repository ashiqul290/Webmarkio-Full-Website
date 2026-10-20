import { motion } from "motion/react";
import { cn } from "../../../lib/utils";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export function SectionHeading({ badge, title, subtitle, centered = true, light = false, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-16", centered && "text-center", className)}>
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 mb-4"
        >
          <span className={cn(
            "px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase",
            light
              ? "bg-white/10 text-blue-200 border border-white/20"
              : "bg-blue-50 text-blue-600 border border-blue-100"
          )}>
            {badge}
          </span>
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={cn(
          "text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4",
          light ? " text-white" : "text-[#0F172A] dark:text-white",
          "[font-family:'Plus_Jakarta_Sans',sans-serif]"
        )}
        style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={cn(
            "text-lg max-w-2xl leading-relaxed",
            centered && "mx-auto",
            light ? "text-blue-100" : "text-slate-500"
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
