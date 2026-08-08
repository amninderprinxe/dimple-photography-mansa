"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import PortfolioFilter from "./PortfolioFilter";
import PortfolioCard from "./PortfolioCard";
import PortfolioLightbox from "./PortfolioLightbox";
import {
  portfolioItems,
  PORTFOLIO_CATEGORIES,
  type PortfolioCategory,
  type PortfolioItem,
} from "@/lib/portfolio-data";

const BATCH_SIZE = 8;
const MAX_RENDERED = 200; // safety cap for the simulated infinite loop

interface PortfolioGridProps {
  /** Pre-select a category and hide the "All" tab + filter row (used by /portfolio/[category] pages). */
  initialCategory?: PortfolioCategory;
  /** Show the category filter tabs. Defaults to true. */
  showFilters?: boolean;
}

export default function PortfolioGrid({
  initialCategory,
  showFilters = true,
}: PortfolioGridProps) {
  const [active, setActive] = useState<PortfolioCategory | "All">(
    initialCategory ?? "All"
  );
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo<PortfolioItem[]>(
    () =>
      active === "All"
        ? portfolioItems
        : portfolioItems.filter((p) => p.category === active),
    [active]
  );

  // Reset pagination whenever the active category changes.
  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [active]);

  // Infinite smooth scroll: grow the visible window as the sentinel enters
  // the viewport. Once the filtered set is exhausted it loops seamlessly —
  // swap this for a real paginated API fetch when one is available.
  useEffect(() => {
    if (filtered.length === 0) return;
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((c) => Math.min(c + BATCH_SIZE, MAX_RENDERED));
        }
      },
      { rootMargin: "600px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [filtered.length]);

  const displayed = useMemo(() => {
    if (filtered.length === 0) return [];
    const list: { item: PortfolioItem; key: string }[] = [];
    for (let i = 0; i < visibleCount; i++) {
      const item = filtered[i % filtered.length];
      const loop = Math.floor(i / filtered.length);
      list.push({ item, key: loop === 0 ? item.id : `${item.id}-loop${loop}` });
    }
    return list;
  }, [filtered, visibleCount]);

  const openLightbox = (item: PortfolioItem) => {
    const idx = filtered.findIndex((f) => f.id === item.id);
    if (idx >= 0) setLightboxIndex(idx);
  };

  return (
    <div>
      {showFilters && (
        <div className="mb-12">
          <PortfolioFilter
            categories={PORTFOLIO_CATEGORIES}
            active={active}
            onChange={setActive}
          />
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-smoke">
          No shoots in this category yet — check back soon.
        </p>
      ) : (
        <>
          <div className="columns-2 gap-5 md:columns-3 lg:columns-4">
            <AnimatePresence mode="popLayout">
              {displayed.map(({ item, key }, i) => (
                <PortfolioCard
                  key={key}
                  item={item}
                  priority={i < 4}
                  onOpen={() => openLightbox(item)}
                />
              ))}
            </AnimatePresence>
          </div>
          {/* Infinite-scroll trigger */}
          <div ref={sentinelRef} aria-hidden="true" className="h-10 w-full" />
        </>
      )}

      {lightboxIndex !== null && (
        <PortfolioLightbox
          items={filtered}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onIndexChange={setLightboxIndex}
        />
      )}
    </div>
  );
}
