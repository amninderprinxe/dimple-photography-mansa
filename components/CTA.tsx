"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl glass-gold-border border"
        >
          <div className="absolute inset-0 -z-10">
            <Image
              src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=2000&auto=format&fit=crop"
              alt="Couple walking through mustard fields during a pre-wedding shoot in Punjab"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-ink/75" />
          </div>

          <div className="flex flex-col items-center gap-6 px-8 py-16 text-center sm:py-20">
            <p className="eyebrow">Dates Fill Quickly in Wedding Season</p>
            <h2 className="max-w-2xl font-display text-4xl leading-tight text-ivory sm:text-5xl">
              Let&apos;s put your story
              <span className="gold-text italic"> in frame.</span>
            </h2>
            <p className="max-w-lg text-smoke">
              Tell us your date and venue in Mansa or anywhere across Punjab —
              we&apos;ll check availability and send a package built around
              your day.
            </p>
            <Link href="/booking" className="btn-gold mt-2">
              <Camera size={16} />
              Check Availability
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
