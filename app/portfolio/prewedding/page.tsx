import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Gallery from "@/components/Gallery";
import { portfolio, portfolioCategories } from "@/lib/data";

const cat = portfolioCategories.find((c) => c.slug === "prewedding")!;

export const metadata: Metadata = {
  title: "Pre-Wedding Photography Portfolio",
  description:
    "Pre-wedding shoot portfolio by Dimple Photography Mansa — mustard fields, countryside and old-city locations across Punjab.",
};

export default function PreWeddingPage() {
  const items = portfolio.filter((p) => p.category === cat.category);

  return (
    <main className="relative">
      <PageHeader
        eyebrow="Portfolio"
        title={cat.title}
        description={cat.description}
        image={cat.cover}
        imageAlt="Pre-wedding photography portfolio by Dimple Photography Mansa"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Portfolio", href: "/portfolio" },
          { label: "Pre-Wedding" },
        ]}
      />

      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <Gallery items={items} showFilters={false} />

          <div className="mt-16 flex flex-col items-center gap-4 text-center">
            <p className="text-smoke">
              Want a pre-wedding shoot that actually looks like you two?
            </p>
            <Link href="/booking" className="btn-gold">
              Plan Your Pre-Wedding Shoot
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
