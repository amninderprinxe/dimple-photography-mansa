"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Share2, MapPin, Check } from "lucide-react";
import type { PortfolioItem } from "@/lib/portfolio-data";

interface PortfolioLightboxProps {
  items: PortfolioItem[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

const SWIPE_THRESHOLD = 50;

export default function PortfolioLightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: PortfolioLightboxProps) {
  const [mounted, setMounted] = useState(false);
  const [shared, setShared] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);

  const item = items[index];

  const goNext = useCallback(() => {
    onIndexChange((index + 1) % items.length);
  }, [index, items.length, onIndexChange]);

  const goPrev = useCallback(() => {
    onIndexChange((index - 1 + items.length) % items.length);
  }, [index, items.length, onIndexChange]);

  // Mount check for createPortal (SSR safety)
  useEffect(() => setMounted(true), []);

  // Lock body scroll while open
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  // Focus the close button on open
  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  // Keyboard support: Esc, ArrowLeft, ArrowRight + focus trap on Tab
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
        return;
      }
      if (e.key === "Tab" && containerRef.current) {
        const focusable = containerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev, onClose]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      if (delta > 0) goPrev();
      else goNext();
    }
    touchStartX.current = null;
  };

  const handleShare = async () => {
    const shareData = {
      title: `${item.title} — Dimple Photography Mansa`,
      text: `${item.title} · ${item.category} · ${item.location}`,
      url: typeof window !== "undefined" ? window.location.href : "",
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareData.url);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch {
      // User cancelled share sheet — no action needed.
    }
  };

  if (!mounted || !item) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="lightbox-backdrop"
        role="dialog"
        aria-modal="true"
        aria-label={`${item.title} image lightbox`}
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 backdrop-blur-2xl px-3 sm:px-6"
        onClick={onClose}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Close */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close lightbox"
          className="absolute right-4 top-4 z-20 rounded-full glass glass-gold-border p-2.5 text-ivory transition-colors hover:text-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 sm:right-6 sm:top-6"
        >
          <X size={22} />
        </button>

        {/* Share */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleShare();
          }}
          aria-label="Share this photo"
          className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full glass glass-gold-border px-4 py-2.5 text-ivory transition-colors hover:text-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 sm:left-6 sm:top-6"
        >
          {shared ? <Check size={16} className="text-gold-light" /> : <Share2 size={16} />}
          <span className="hidden text-xs uppercase tracking-wider sm:inline">
            {shared ? "Link Copied" : "Share"}
          </span>
        </button>

        {/* Prev / Next */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full glass glass-gold-border p-2.5 text-ivory transition-colors hover:text-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 sm:left-6"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label="Next image"
          className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full glass glass-gold-border p-2.5 text-ivory transition-colors hover:text-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 sm:right-6"
        >
          <ChevronRight size={22} />
        </button>

        {/* Image + info panel */}
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-h-[85vh] w-full max-w-3xl overflow-hidden rounded-2xl border glass-gold-border"
        >
          <div className="relative aspect-[4/5] w-full sm:aspect-[3/2]">
            <Image
              src={item.image}
              alt={`${item.title} — ${item.category} photography in ${item.location} by Dimple Photography Mansa`}
              fill
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              className="object-cover select-none"
              sizes="90vw"
              priority
            />
          </div>
          <div className="glass p-5">
            <span className="glass glass-gold-border inline-block rounded-full px-3 py-1 text-[10px] uppercase tracking-wider text-gold-light">
              {item.category}
            </span>
            <h3 className="mt-2 font-display text-2xl text-ivory">
              {item.title}
            </h3>
            <div className="mt-1 flex items-center justify-between text-sm text-smoke">
              <span className="flex items-center gap-1">
                <MapPin size={13} /> {item.location}
              </span>
              <span>{item.date}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
