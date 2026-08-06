"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % testimonials.length),
    []
  );
  const prev = () =>
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next]);

  const current = testimonials[index];

  return (
    <section id="testimonials" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="eyebrow justify-center">Client Words</p>
          <h2 className="section-heading mt-4">
            Stories,
            <span className="gold-text italic"> told back to us.</span>
          </h2>
        </motion.div>

        <div className="relative mt-14">
          <div className="glass-card relative overflow-hidden px-8 py-12 sm:px-14 sm:py-16">
            <Quote className="absolute left-6 top-6 text-gold/20" size={56} />
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 text-center"
              >
                <p className="font-display text-2xl italic leading-relaxed text-ivory sm:text-3xl">
                  &ldquo;{current.quote}&rdquo;
                </p>
                <div className="mt-8">
                  <p className="font-body text-sm font-semibold uppercase tracking-wider text-gold-light">
                    {current.name}
                  </p>
                  <p className="mt-1 text-xs text-smoke">{current.event}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="rounded-full glass glass-gold-border p-2.5 text-ivory hover:text-gold-light"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-6 bg-gold" : "w-1.5 bg-white/20"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="rounded-full glass glass-gold-border p-2.5 text-ivory hover:text-gold-light"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
