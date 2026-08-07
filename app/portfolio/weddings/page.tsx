import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Gallery from "@/components/Gallery";
import { portfolio, portfolioCategories } from "@/lib/data";

const cat = portfolioCategories.find((c) => c.slug === "weddings")!;

export const metadata: Metadata = {
  title: "Wedding Photography Portfolio",
  description:
    "Wedding photography portfolio by Dimple Photography Mansa — full-day documentary coverage of Punjabi weddings across Mansa, Punjab.",
};

export default function WeddingsPage() {
  const items = portfolio.filter((p) => p.category === cat.category);

  return (
    <main className="relative">
      <PageHeader
        eyebrow="Portfolio"
        title={cat.title}
        description={cat.description}
        image={cat.cover}
        imageAlt="Wedding photography portfolio by Dimple Photography Mansa"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Portfolio", href: "/portfolio" },
          { label: "Weddings" },
        ]}
      />

      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <Gallery items={items} showFilters={false} />

          <div className="mt-16 flex flex-col items-center gap-4 text-center">
            <p className="text-smoke">
              Planning a wedding of your own? Let&apos;s talk dates.
            </p>
            <Link href="/booking" className="btn-gold">
              Book Your Wedding Date
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
