import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Services from "@/components/Services";
import Process from "@/components/Process";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Wedding, pre-wedding, portrait, event, fashion, baby shoot and drone/cinematic photography services offered by Dimple Photography Mansa, Punjab.",
};

const packages = [
  {
    name: "Essential",
    tagline: "For intimate ceremonies",
    price: "₹35,000",
    features: [
      "1 photographer, up to 6 hours",
      "300+ edited digital photos",
      "Private online gallery",
      "Delivery in 3–4 weeks",
    ],
  },
  {
    name: "Signature",
    tagline: "Our most-booked wedding package",
    price: "₹85,000",
    featured: true,
    features: [
      "2 photographers, full-day coverage",
      "800+ edited digital photos",
      "Same-day highlight reel",
      "1 drone operator, 2 hours",
      "Delivery in 3–4 weeks",
    ],
  },
  {
    name: "Grand",
    tagline: "For multi-day, multi-venue weddings",
    price: "₹1,60,000+",
    features: [
      "2 photographers + cinematic team",
      "Full drone & film coverage",
      "1,500+ edited digital photos",
      "Full wedding film, 8–12 minutes",
      "Premium printed album included",
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="relative">
      <PageHeader
        eyebrow="What We Offer"
        title="Services & Packages"
        description="Seven photography disciplines and three flexible wedding packages — every package can be customised to your day."
        image="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=2400&auto=format&fit=crop"
        imageAlt="Photography services offered by Dimple Photography Mansa"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      <Services showViewAll={false} />

      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <p className="eyebrow text-center">Wedding Packages</p>
          <h2 className="section-heading mt-4 text-center">
            Pricing built
            <span className="gold-text italic"> around your day.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-center text-smoke">
            Every wedding is different — these packages are starting points.
            Tell us your guest count and venues and we&apos;ll tailor a quote.
          </p>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`glass-card relative flex flex-col p-8 ${
                  pkg.featured ? "border-gold/60 shadow-gold-glow" : ""
                }`}
              >
                {pkg.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold-gradient px-4 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink">
                    Most Popular
                  </span>
                )}
                <h3 className="font-display text-2xl text-ivory">
                  {pkg.name}
                </h3>
                <p className="mt-1 text-sm text-smoke">{pkg.tagline}</p>
                <p className="mt-6 font-display text-4xl text-gold-light">
                  {pkg.price}
                </p>
                <ul className="mt-6 flex-1 space-y-3">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-smoke">
                      <Check size={16} className="mt-0.5 shrink-0 text-gold" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/booking"
                  className={pkg.featured ? "btn-gold mt-8 justify-center" : "btn-outline mt-8 justify-center"}
                >
                  Choose {pkg.name}
                </Link>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-smoke">
            Prices are indicative for Mansa-based weddings and exclude travel
            outside Punjab. Ask us for an exact quote on the booking page.
          </p>
        </div>
      </section>

      <Process />
    </main>
  );
}
