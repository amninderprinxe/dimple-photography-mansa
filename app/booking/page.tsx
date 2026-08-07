import type { Metadata } from "next";
import { CalendarCheck, Clock, ShieldCheck } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import BookingForm from "@/components/BookingForm";
import { studio } from "@/lib/data";

export const metadata: Metadata = {
  title: "Book a Shoot",
  description:
    "Check availability and request your wedding, pre-wedding, portrait or event date with Dimple Photography Mansa, Punjab.",
};

const notes = [
  {
    icon: CalendarCheck,
    title: "Dates Fill Fast",
    text: "Wedding-season Saturdays (Nov–Feb) are often booked 6–9 months ahead — request early to secure yours.",
  },
  {
    icon: Clock,
    title: "24-Hour Response",
    text: "We confirm availability and send a tailored quote within one business day of your request.",
  },
  {
    icon: ShieldCheck,
    title: "Booking Confirmed with Advance",
    text: "A date is locked in once a 25% advance is paid — we'll walk you through this after the first call.",
  },
];

export default function BookingPage() {
  return (
    <main className="relative">
      <PageHeader
        eyebrow="Reserve Your Date"
        title="Book Your Shoot"
        description="Tell us your date, venue and the kind of coverage you need. We'll confirm availability and send a package built around your day."
        image="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=2400&auto=format&fit=crop"
        imageAlt="Booking a photography date with Dimple Photography Mansa"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Booking" }]}
      />

      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
            <div className="lg:col-span-2 space-y-5">
              {notes.map((n) => (
                <div key={n.title} className="glass-card p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold-light">
                      <n.icon size={19} />
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-ivory">
                        {n.title}
                      </h3>
                      <p className="mt-1 text-sm text-smoke">{n.text}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="glass-card p-6 text-center">
                <p className="text-sm text-smoke">
                  Prefer to talk it through first?
                </p>
                <a
                  href={`tel:${studio.phone.replace(/\s/g, "")}`}
                  className="mt-2 block font-display text-2xl text-gold-light hover:text-gold"
                >
                  {studio.phone}
                </a>
              </div>
            </div>

            <div className="lg:col-span-3">
              <BookingForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
