"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Heart,
  Camera,
  Aperture,
  PartyPopper,
  Sparkles,
  Baby,
  Plane,
  ArrowUpRight,
} from "lucide-react";
import { services } from "@/lib/data";

const iconMap = {
  Heart,
  Camera,
  Aperture,
  PartyPopper,
  Sparkles,
  Baby,
  Plane,
};

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="eyebrow justify-center">What We Shoot</p>
          <h2 className="section-heading mt-4">
            Every kind of story,
            <br />
            <span className="gold-text italic">one studio.</span>
          </h2>
          <p className="mt-5 text-smoke">
            Seven disciplines, one consistent standard of light, composition
            and honesty — chosen and combined to fit your day.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.12 }}
                className="glass-card group relative overflow-hidden"
              >
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={`${service.title} by Dimple Photography Mansa`}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.15]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/10 to-transparent" />
                  <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full glass glass-gold-border text-gold-light">
                    <Icon size={19} />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-display text-2xl text-ivory">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-smoke">
                    {service.description}
                  </p>
                  <a
                    href="#contact"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-gold-light transition-all group-hover:gap-2.5"
                  >
                    Enquire
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
