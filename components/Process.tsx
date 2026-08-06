"use client";

import { motion } from "framer-motion";
import { process } from "@/lib/data";

export default function Process() {
  return (
    <section id="process" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="eyebrow justify-center">How We Work</p>
          <h2 className="section-heading mt-4">
            From first call to
            <span className="gold-text italic"> final gallery.</span>
          </h2>
        </motion.div>

        <div className="relative mt-16">
          <div className="divider-gold absolute left-[27px] top-2 bottom-2 hidden w-px sm:block" />
          <div className="space-y-8">
            {process.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative flex gap-6"
              >
                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full glass glass-gold-border">
                  <span className="font-display text-xl text-gold-light">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="glass-card flex-1 p-6">
                  <h3 className="font-display text-2xl text-ivory">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-smoke">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
