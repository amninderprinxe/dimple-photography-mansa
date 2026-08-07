import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import { portfolio } from "@/lib/data";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <About />
      <Services limit={6} showViewAll />

      <section id="portfolio" className="relative py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <p className="eyebrow">Selected Work</p>
            <h2 className="section-heading mt-4">
              Frames from
              <span className="gold-text italic"> real days.</span>
            </h2>
          </div>

          <div className="mt-14">
            <Gallery items={portfolio.slice(0, 6)} showFilters={false} />
          </div>

          <div className="mt-14 text-center">
            <Link href="/portfolio" className="btn-outline">
              View Full Portfolio
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Process />
      <Testimonials />
      <CTA />
    </main>
  );
}
