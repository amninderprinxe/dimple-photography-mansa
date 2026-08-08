"use client";

import { motion } from "framer-motion";
import type { PortfolioCategory } from "@/lib/portfolio-data";

interface PortfolioFilterProps {
  categories: readonly PortfolioCategory[];
  active: PortfolioCategory | "All";
  onChange: (category: PortfolioCategory | "All") => void;
}

export default function PortfolioFilter({
  categories,
  active,
  onChange,
}: PortfolioFilterProps) {
  const tabs: (PortfolioCategory | "All")[] = ["All", ...categories];

  return (
    <div
      role="tablist"
      aria-label="Filter portfolio by category"
      className="flex flex-wrap justify-center gap-2.5"
    >
      {tabs.map((tab) => {
        const isActive = active === tab;
        return (
          <button
            key={tab}
            role="tab"
            type="button"
            aria-selected={isActive}
            onClick={() => onChange(tab)}
            className={`relative rounded-full px-5 py-2 text-xs uppercase tracking-wider transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 ${
              isActive
                ? "text-gold-light"
                : "text-smoke hover:text-ivory"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="portfolio-filter-active"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                className="absolute inset-0 rounded-full border border-gold bg-gold/15 shadow-gold-glow"
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        );
      })}
    </div>
  );
}
