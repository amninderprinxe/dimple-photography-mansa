"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Aperture, Award, Users } from "lucide-react";
import { studio } from "@/lib/data";

const pillars = [
  {
    icon: Aperture,
    title: "An Unobtrusive Eye",
    text: "We shoot documentary-first — quiet on the day, invisible in the frame, present in every emotion.",
  },
  {
    icon: Award,
    title: "14 Years in Mansa",
    text: "Started in a single rented studio on Bus Stand Road, now trusted across Malwa for milestone days.",
  },
  {
    icon: Users,
    title: "A Two-Person Crew",
    text: "Every wedding gets a lead photographer and a second shooter, so no side of the mandap goes unseen.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 md:px-8 lg:grid-cols-2 lg:gap-20">
        {/* Image side */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl glass-gold-border border">
            <Image
              src="https://images.unsplash.com/photo-1554080353-a576cf803bda?q=80&w=1400&auto=format&fit=crop"
              alt="Dimple Photography Mansa team photographing a wedding ceremony"
              fill
              className="object-cover transition-transform duration-[1200ms] hover:scale-110"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="glass glass-gold-border absolute -bottom-8 -right-4 w-56 rounded-2xl p-5 shadow-gold-glow sm:-right-8 sm:w-64"
          >
            <p className="font-display text-3xl text-gold-light">{studio.founded}</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-smoke">
              Est. in Mansa, Punjab
            </p>
          </motion.div>
        </motion.div>

        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="flex flex-col justify-center"
        >
          <p className="eyebrow">Our Story</p>
          <h2 className="section-heading mt-4">
            A Mansa studio,
            <br />
            <span className="gold-text italic">built on trust.</span>
          </h2>
          <p className="mt-6 text-smoke leading-relaxed">
            {studio.name} began in {studio.founded} as a one-room portrait
            studio near the Mansa bus stand. Fourteen years on, we&apos;ve
            photographed weddings in villages across Sardulgarh and
            Budhlada, shot fashion lookbooks for local boutiques, and flown
            drones over baraats that started at 6 a.m. and didn&apos;t stop
            till midnight. What hasn&apos;t changed is the brief we give
            ourselves on every shoot: notice what&apos;s real, and don&apos;t
            get in its way.
          </p>
          <p className="mt-4 text-smoke leading-relaxed">
            We&apos;re a small, deliberately-sized team — which means the
            person who plans your shoot is the same person behind the
            camera, and often the same person editing your gallery.
          </p>

          <div className="mt-10 space-y-5">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="glass-card flex items-start gap-4 p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold-light">
                  <pillar.icon size={20} />
                </div>
                <div>
                  <h3 className="font-display text-xl text-ivory">
                    {pillar.title}
                  </h3>
                  <p className="mt-1 text-sm text-smoke">{pillar.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
