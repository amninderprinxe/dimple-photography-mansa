import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Gallery from "@/components/Gallery";
import { portfolio, portfolioCategories } from "@/lib/data";

const cat = portfolioCategories.find((c) => c.slug === "events")!;

export const metadata: Metadata = {
  title: "Event Photography Portfolio",
  description:
    "Event photography portfolio by Dimple Photography Mansa — sangeet, receptions, anniversaries and corporate events across Punjab.",
};

export default function EventsPage() {
  const items = portfolio.filter((p) => p.category === cat.category);

  return (
    <main className="relative">
      <PageHeader
        eyebrow="Portfolio"
        title={cat.title}
        description={cat.description}
        image={cat.cover}
        imageAlt="Event photography portfolio by Dimple Photography Mansa"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Portfolio", href: "/portfolio" },
          { label: "Events" },
        ]}
      />

      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <Gallery items={items} showFilters={false} />

          <div className="mt-16 flex flex-col items-center gap-4 text-center">
            <p className="text-smoke">
              Sangeet, reception, or a milestone celebration — tell us the
              headcount and we&apos;ll size the coverage right.
            </p>
            <Link href="/booking" className="btn-gold">
              Book Event Coverage
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
