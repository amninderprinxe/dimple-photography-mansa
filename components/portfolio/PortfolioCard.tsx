"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Sparkles } from "lucide-react";
import type { PortfolioItem } from "@/lib/portfolio-data";

interface PortfolioCardProps {
  item: PortfolioItem;
  onOpen: () => void;
  priority?: boolean;
}

const overlayVariants = {
  rest: { y: 12, opacity: 0 },
  hover: { y: 0, opacity: 1 },
};

export default function PortfolioCard({ item, onOpen, priority }: PortfolioCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="mb-5 break-inside-avoid"
    >
      <motion.button
        type="button"
        onClick={onOpen}
        initial="rest"
        whileHover="hover"
        whileFocus="hover"
        animate="rest"
        aria-label={`Open ${item.title} in lightbox`}
        className="group relative block w-full overflow-hidden rounded-2xl border glass-gold-border text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
      >
        <div className="relative aspect-[4/5] w-full">
          <motion.div
            variants={{ rest: { scale: 1 }, hover: { scale: 1.12 } }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={item.image}
              alt={`${item.title} — ${item.category} photography in ${item.location} by Dimple Photography Mansa`}
              fill
              loading={priority ? undefined : "lazy"}
              priority={priority}
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              className="object-cover select-none"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </motion.div>

          {/* Glassmorphism gradient + overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-95" />

          {/* Category badge */}
          <span className="absolute left-3 top-3 glass glass-gold-border rounded-full px-3 py-1 text-[10px] uppercase tracking-wider text-gold-light backdrop-blur-md">
            {item.category}
          </span>

          {/* Featured badge */}
          {item.featured && (
            <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-gold-gradient px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink">
              <Sparkles size={11} />
              Featured
            </span>
          )}

          {/* Fade-up title/date */}
          <motion.div
            variants={overlayVariants}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-x-0 bottom-0 p-4"
          >
            <h3 className="font-display text-lg leading-tight text-ivory sm:text-xl">
              {item.title}
            </h3>
            <div className="mt-1 flex items-center justify-between text-[11px] text-smoke">
              <span className="flex items-center gap-1">
                <MapPin size={11} /> {item.location}
              </span>
              <span className="text-gold-light">{item.date}</span>
            </div>
          </motion.div>
        </div>
      </motion.button>
    </motion.div>
  );
}
