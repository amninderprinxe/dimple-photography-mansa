"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { portfolio, portfolioFilters } from "@/lib/data";

export default function Portfolio() {
  const [active, setActive] = useState("All");
  const [lightboxId, setLightboxId] = useState<number | null>(null);

  const filtered =
    active === "All"
      ? portfolio
      : portfolio.filter((item) => item.category === active);

  const lightboxIndex = filtered.findIndex((p) => p.id === lightboxId);
  const lightboxItem = lightboxIndex >= 0 ? filtered[lightboxIndex] : null;

  const goTo = (dir: 1 | -1) => {
    if (lightboxIndex < 0) return;
    const next =
      (lightboxIndex + dir + filtered.length) % filtered.length;
    setLightboxId(filtered[next].id);
  };

  return (
    <section id="portfolio" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="eyebrow justify-center">Selected Work</p>
          <h2 className="section-heading mt-4">
            Frames from
            <span className="gold-text italic"> real days.</span>
          </h2>
        </motion.div>

        {/* Filters */}
        <div className="mt-10 flex flex-wrap justify-center gap-2.5">
          {portfolioFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActive(filter)}
              className={`rounded-full border px-5 py-2 text-xs uppercase tracking-wider transition-all duration-300 ${
                active === filter
                  ? "border-gold bg-gold/15 text-gold-light shadow-gold-glow"
                  : "border-white/10 text-smoke hover:border-gold/40 hover:text-ivory"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.button
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
                onClick={() => setLightboxId(item.id)}
                className={`group relative overflow-hidden rounded-2xl glass-gold-border border text-left ${
                  i % 5 === 0 ? "sm:row-span-2 sm:aspect-[4/5]" : "aspect-[4/5]"
                }`}
              >
                <Image
                  src={item.image}
                  alt={`${item.title} — ${item.category} photography in ${item.location} by Dimple Photography Mansa`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.15]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95" />
                <div className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="eyebrow !text-[10px]">{item.category}</p>
                  <h3 className="mt-1 font-display text-xl text-ivory">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-smoke">
                    <MapPin size={11} /> {item.location}
                  </p>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/95 backdrop-blur-2xl px-4"
            onClick={() => setLightboxId(null)}
          >
            <button
              onClick={() => setLightboxId(null)}
              className="absolute right-5 top-5 z-10 rounded-full glass glass-gold-border p-2.5 text-ivory hover:text-gold-light"
              aria-label="Close"
            >
              <X size={22} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goTo(-1);
              }}
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full glass glass-gold-border p-2.5 text-ivory hover:text-gold-light sm:left-6"
              aria-label="Previous"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goTo(1);
              }}
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full glass glass-gold-border p-2.5 text-ivory hover:text-gold-light sm:right-6"
              aria-label="Next"
            >
              <ChevronRight size={22} />
            </button>

            <motion.div
              key={lightboxItem.id}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[80vh] w-full max-w-3xl overflow-hidden rounded-2xl glass-gold-border border"
            >
              <div className="relative aspect-[4/5] w-full sm:aspect-[3/2]">
                <Image
                  src={lightboxItem.image}
                  alt={`${lightboxItem.title} — ${lightboxItem.category}`}
                  fill
                  className="object-cover"
                  sizes="90vw"
                />
              </div>
              <div className="glass p-5">
                <p className="eyebrow !text-[10px]">{lightboxItem.category}</p>
                <h3 className="mt-1 font-display text-2xl text-ivory">
                  {lightboxItem.title}
                </h3>
                <p className="mt-0.5 flex items-center gap-1 text-sm text-smoke">
                  <MapPin size={13} /> {lightboxItem.location}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
