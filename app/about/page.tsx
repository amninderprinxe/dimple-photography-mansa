import type { Metadata } from "next";
import { Eye, HeartHandshake, Clock3 } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import About from "@/components/About";
import Process from "@/components/Process";
import { stats } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet Dimple Photography Mansa — a 14-year-old wedding and portrait studio based in Mansa, Punjab, trusted for documentary-style photography across Malwa.",
};

const values = [
  {
    icon: Eye,
    title: "Notice, Don't Direct",
    text: "We'd rather catch a real laugh than pose a fake one. Direction is reserved for portraits and pre-wedding shoots only.",
  },
  {
    icon: HeartHandshake,
    title: "One Point of Contact",
    text: "The person who takes your call is the person who plans your shoot — no handoffs, no lost details.",
  },
  {
    icon: Clock3,
    title: "On Time, Every Time",
    text: "Fourteen years in, we've never missed a baraat. Timelines are built with buffer, not best-case guesses.",
  },
];

export default function AboutPage() {
  return (
    <main className="relative">
      <PageHeader
        eyebrow="Our Story"
        title="Fourteen Years Behind the Lens in Mansa"
        description="A small, deliberately-sized studio that has photographed weddings, portraits and everything in between across Malwa since 2011."
        image="https://images.unsplash.com/photo-1554080353-a576cf803bda?q=80&w=2400&auto=format&fit=crop"
        imageAlt="Dimple Photography Mansa team on a wedding shoot"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <About />

      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <p className="eyebrow text-center">What We Believe</p>
          <h2 className="section-heading mt-4 text-center">
            The values behind
            <span className="gold-text italic"> every shoot.</span>
          </h2>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="glass-card p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold-light">
                  <v.icon size={22} />
                </div>
                <h3 className="mt-5 font-display text-2xl text-ivory">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-smoke">
                  {v.text}
                </p>
              </div>
            ))}
          </div>

          <div className="glass-card mt-14 grid grid-cols-2 gap-6 p-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-3xl text-gold-light sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-wider text-smoke">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Process />
    </main>
  );
}
