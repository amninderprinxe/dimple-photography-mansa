"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import ApertureMark from "./ui/ApertureMark";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
  breadcrumb: { label: string; href?: string }[];
}

export default function PageHeader({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  breadcrumb,
}: PageHeaderProps) {
  return (
    <section className="relative flex min-h-[56vh] w-full items-center justify-center overflow-hidden pt-32 pb-20">
      <div className="absolute inset-0 -z-10">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/70 to-ink" />
      </div>

      <div className="pointer-events-none absolute -left-16 -top-10 opacity-10">
        <ApertureMark size={260} className="animate-spin-slower" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto max-w-3xl px-6 text-center"
      >
        <div className="mb-5 flex items-center justify-center gap-1.5 text-xs text-smoke">
          {breadcrumb.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-gold-light transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-gold-light">{crumb.label}</span>
              )}
              {i < breadcrumb.length - 1 && <ChevronRight size={12} />}
            </span>
          ))}
        </div>

        <p className="eyebrow justify-center">{eyebrow}</p>
        <h1 className="section-heading mt-4">{title}</h1>
        {description && (
          <p className="mx-auto mt-5 max-w-xl text-smoke">{description}</p>
        )}
      </motion.div>
    </section>
  );
}
