"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Instagram, Phone } from "lucide-react";
import ApertureMark from "./ui/ApertureMark";
import { studio } from "@/lib/data";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Process", href: "#process" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div
            className={`flex items-center justify-between rounded-full px-4 md:px-6 py-2.5 transition-all duration-500 ${
              scrolled
                ? "glass shadow-glass"
                : "bg-transparent border border-transparent"
            }`}
          >
            <a href="#home" className="flex items-center gap-2.5 group">
              <ApertureMark size={34} className="group-hover:animate-spin-slow" />
              <div className="leading-tight">
                <p className="font-display text-lg md:text-xl tracking-wide text-ivory">
                  {studio.name}
                </p>
                <p className="eyebrow text-[10px] md:text-[11px] -mt-0.5">
                  {studio.location}
                </p>
              </div>
            </a>

            <nav className="hidden lg:flex items-center gap-8">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-smoke hover:text-gold-light transition-colors duration-300 tracking-wide"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <a
                href={`tel:${studio.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-sm text-ivory/90 hover:text-gold-light transition-colors"
              >
                <Phone size={15} className="text-gold" />
                {studio.phone}
              </a>
              <a href="#contact" className="btn-gold !py-2.5 !px-6 text-xs">
                Book a Shoot
              </a>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="lg:hidden text-ivory p-2"
              aria-label="Open menu"
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex justify-between items-center px-6 py-6">
              <div className="flex items-center gap-2.5">
                <ApertureMark size={32} />
                <p className="font-display text-lg text-ivory">
                  {studio.name}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-ivory p-2"
                aria-label="Close menu"
              >
                <X size={28} />
              </button>
            </div>

            <nav className="flex flex-col items-start gap-1 px-8 mt-8">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="font-display text-4xl text-ivory py-3 border-b border-white/5 w-full hover:text-gold-light transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <div className="px-8 mt-10 flex flex-col gap-4">
              <a href="#contact" onClick={() => setOpen(false)} className="btn-gold justify-center">
                Book a Shoot
              </a>
              <div className="flex items-center gap-5 text-smoke">
                <a href={`tel:${studio.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-gold-light">
                  <Phone size={16} /> {studio.phone}
                </a>
              </div>
              <a
                href={`https://instagram.com/${studio.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-smoke hover:text-gold-light"
              >
                <Instagram size={16} /> {studio.instagram}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
