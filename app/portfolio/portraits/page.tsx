import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Gallery from "@/components/Gallery";
import { portfolio, portfolioCategories } from "@/lib/data";

const cat = portfolioCategories.find((c) => c.slug === "portraits")!;

export const metadata: Metadata = {
  title: "Portrait Photography Portfolio",
  description:
    "Portrait photography portfolio by Dimple Photography Mansa — studio and natural-light personal, family and corporate portraits.",
};

export default function PortraitsPage() {
  const items = portfolio.filter((p) => p.category === cat.category);

  return (
    <main className="relative">
      <PageHeader
        eyebrow="Portfolio"
        title={cat.title}
        description={cat.description}
        image={cat.cover}
        imageAlt="Portrait photography portfolio by Dimple Photography Mansa"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Portfolio", href: "/portfolio" },
          { label: "Portraits" },
        ]}
      />

      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <Gallery items={items} showFilters={false} />

          <div className="mt-16 flex flex-col items-center gap-4 text-center">
            <p className="text-smoke">
              Personal portrait, family session, or corporate headshots —
              we&apos;ll book a slot at the studio or your location.
            </p>
            <Link href="/booking" className="btn-gold">
              Book a Portrait Session
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
