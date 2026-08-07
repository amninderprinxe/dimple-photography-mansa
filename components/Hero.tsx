"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowDown, Camera, MapPin } from "lucide-react";
import ApertureMark from "./ui/ApertureMark";
import { studio, stats } from "@/lib/data";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden"
    >
      {/* Parallax background */}
      <motion.div style={{ y, scale }} className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2400&auto=format&fit=crop"
          alt="Bride and groom sharing an emotional moment at a Punjabi wedding, photographed by Dimple Photography Mansa"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/50 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
      </motion.div>

      {/* Ambient aperture motif */}
      <div className="pointer-events-none absolute -right-24 top-1/4 opacity-20 md:opacity-30">
        <ApertureMark size={340} className="animate-spin-slower" />
      </div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass glass-gold-border mb-7 inline-flex items-center gap-2 rounded-full px-5 py-2"
        >
          <MapPin size={14} className="text-gold" />
          <span className="eyebrow">{studio.city}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="max-w-4xl font-display text-5xl leading-[1.05] text-ivory text-shadow-soft sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Capturing <span className="gold-text italic">Emotions</span>,
          <br />
          Preserving Memories Forever
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="mt-6 max-w-xl font-body text-base text-smoke sm:text-lg"
        >
          {studio.name} is a wedding &amp; portrait studio based in{" "}
          {studio.city}, telling real stories in weddings, pre-weddings,
          portraits, fashion and aerial cinema.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Link href="/booking" className="btn-gold">
            <Camera size={16} />
            Book Your Story
          </Link>
          <Link href="/portfolio" className="btn-outline">
            View Portfolio
          </Link>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.95 }}
          className="glass glass-gold-border mt-14 grid grid-cols-2 gap-x-8 gap-y-5 rounded-2xl px-8 py-6 sm:grid-cols-4 sm:gap-x-10"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-2xl text-gold-light sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-wider text-smoke">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-gold-light/80"
        aria-label="Scroll down"
      >
        <ArrowDown size={22} />
      </motion.a>
    </section>
  );
}
