"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Instagram, Phone, ChevronDown } from "lucide-react";
import ApertureMark from "./ui/ApertureMark";
import { studio } from "@/lib/data";

const links: { label: string; href: string; children?: { label: string; href: string }[] }[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  {
    label: "Portfolio",
    href: "/portfolio",
    children: [
      { label: "All Work", href: "/portfolio" },
      { label: "Weddings", href: "/portfolio/weddings" },
      { label: "Pre-Wedding", href: "/portfolio/prewedding" },
      { label: "Portraits", href: "/portfolio/portraits" },
      { label: "Events", href: "/portfolio/events" },
    ],
  },
  { label: "Films", href: "/films" },
  { label: "Booking", href: "/booking" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobilePortfolioOpen, setMobilePortfolioOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

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
                ? "bg-ink/70 backdrop-blur-xl border border-white/10 shadow-glass"
                : "bg-white/[0.02] backdrop-blur-md border border-white/5"
            }`}
          >
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <ApertureMark size={34} className="group-hover:animate-spin-slow" />
              <div className="leading-tight">
                <p className="font-display text-base md:text-xl tracking-wide text-ivory whitespace-nowrap">
                  DIMPLE PHOTOGRAPHY
                </p>
                <p className="eyebrow text-[10px] md:text-[11px] -mt-0.5">
                  {studio.location}
                </p>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {links.map((link) =>
                link.children ? (
                  <div key={link.href} className="group relative">
                    <Link
                      href={link.href}
                      className={`flex items-center gap-1 px-3 py-2 text-sm tracking-wide transition-colors duration-300 ${
                        isActive(link.href)
                          ? "text-gold-light"
                          : "text-smoke hover:text-gold-light"
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        size={13}
                        className="transition-transform duration-300 group-hover:rotate-180"
                      />
                    </Link>
                    <div className="invisible absolute left-1/2 top-full w-56 -translate-x-1/2 pt-3 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
                      <div className="glass glass-gold-border rounded-2xl p-2 shadow-glass">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block rounded-xl px-4 py-2.5 text-sm transition-colors duration-200 ${
                              pathname === child.href
                                ? "bg-gold/10 text-gold-light"
                                : "text-smoke hover:bg-white/5 hover:text-ivory"
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 text-sm tracking-wide transition-colors duration-300 ${
                      isActive(link.href)
                        ? "text-gold-light"
                        : "text-smoke hover:text-gold-light"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            <div className="hidden lg:flex items-center gap-4 shrink-0">
              <a
                href={`tel:${studio.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-sm text-ivory/90 hover:text-gold-light transition-colors"
              >
                <Phone size={15} className="text-gold" />
                {studio.phone}
              </a>
              <Link href="/booking" className="btn-gold !py-2.5 !px-6 text-xs">
                Book a Shoot
              </Link>
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
            className="fixed inset-0 z-[60] bg-ink/90 backdrop-blur-2xl lg:hidden overflow-y-auto"
          >
            <div className="flex justify-between items-center px-6 py-6">
              <div className="flex items-center gap-2.5">
                <ApertureMark size={32} />
                <p className="font-display text-lg text-ivory">
                  DIMPLE PHOTOGRAPHY
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

            <nav className="flex flex-col items-start gap-1 px-8 mt-4 pb-10">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="w-full border-b border-white/5"
                >
                  {link.children ? (
                    <>
                      <button
                        onClick={() => setMobilePortfolioOpen((v) => !v)}
                        className="flex w-full items-center justify-between py-3 font-display text-3xl text-ivory hover:text-gold-light transition-colors"
                      >
                        {link.label}
                        <ChevronDown
                          size={22}
                          className={`transition-transform duration-300 ${
                            mobilePortfolioOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {mobilePortfolioOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pl-4 pb-3"
                          >
                            {link.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setOpen(false)}
                                className="block py-2 text-lg text-smoke hover:text-gold-light transition-colors"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block py-3 font-display text-3xl text-ivory hover:text-gold-light transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>

            <div className="px-8 flex flex-col gap-4">
              <Link href="/booking" onClick={() => setOpen(false)} className="btn-gold justify-center">
                Book a Shoot
              </Link>
              <a href={`tel:${studio.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-smoke hover:text-gold-light">
                <Phone size={16} /> {studio.phone}
              </a>
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
