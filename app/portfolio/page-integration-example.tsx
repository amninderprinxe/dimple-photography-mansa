import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import { portfolioCategories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Browse Dimple Photography Mansa's portfolio — weddings, pre-wedding shoots, portraits, events, fashion, baby shoots and drone cinematography across Punjab.",
};

export default function PortfolioPage() {
  return (
    <main className="relative">
      <PageHeader
        eyebrow="Selected Work"
        title="A Portfolio of Real Days"
        description="Every image here is from an actual shoot in Mansa or the surrounding villages — nothing staged for a portfolio alone."
        image="https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2400&auto=format&fit=crop"
        imageAlt="Wedding portfolio cover image by Dimple Photography Mansa"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Portfolio" }]}
      />

      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <p className="eyebrow text-center">Browse by Category</p>
          <h2 className="section-heading mt-4 text-center">
            Find the story
            <span className="gold-text italic"> you're after.</span>
          </h2>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {portfolioCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/portfolio/${cat.slug}`}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl glass-gold-border border"
              >
                <Image
                  src={cat.cover}
                  alt={`${cat.title} portfolio cover`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.15]"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-display text-2xl text-ivory">
                    {cat.title}
                  </h3>
                  <p className="mt-2 flex items-center gap-1 text-xs uppercase tracking-wider text-gold-light opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    View Gallery <ArrowUpRight size={13} />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <p className="eyebrow text-center">Full Gallery</p>
          <h2 className="section-heading mt-4 text-center">
            Everything,
            <span className="gold-text italic"> in one place.</span>
          </h2>
          <div className="mt-14">
            <PortfolioGrid />
          </div>
        </div>
      </section>
    </main>
  );
}
