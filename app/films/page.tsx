import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Play, ShieldCheck, Plane, Film as FilmIcon } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Gallery from "@/components/Gallery";
import { portfolio, studio } from "@/lib/data";

export const metadata: Metadata = {
  title: "Cinematic Films & Drone Photography",
  description:
    "Cinematic wedding films and licensed drone aerial photography by Dimple Photography Mansa, Punjab — same-day highlight films and aerial coverage.",
};

const featuredFilms = [
  {
    title: "Simran & Gurpreet — Wedding Film",
    location: "Mansa Golden Palace",
    duration: "4:12",
    thumbnail:
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Manpreet & Jaspreet — Pre-Wedding Reel",
    location: "Bathinda Mustard Fields",
    duration: "1:48",
    thumbnail:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Baraat, From Above",
    location: "Budhlada",
    duration: "2:30",
    thumbnail:
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=1600&auto=format&fit=crop",
  },
];

const highlights = [
  {
    icon: Plane,
    title: "DGCA-Registered Drone Pilots",
    text: "Our aerial team flies under current Indian drone regulations, with venue permissions handled ahead of the shoot day.",
  },
  {
    icon: FilmIcon,
    title: "Cinema-Grade Edit Suite",
    text: "Films are colour-graded and scored in-house — no outsourced editing, so the same team that shoots also cuts the final film.",
  },
  {
    icon: ShieldCheck,
    title: "Same-Day Highlight Reels",
    text: "For weddings, we can deliver a 90-second same-day edit in time for the reception, with the full film following in 3–4 weeks.",
  },
];

export default function FilmsPage() {
  const stills = portfolio.filter((p) => p.category === "Drone & Cinematic");

  return (
    <main className="relative">
      <PageHeader
        eyebrow="Motion"
        title="Cinematic Films & Drone Photography"
        description="Aerial establishing shots, documentary-style wedding films, and same-day edits — captured and cut by one in-house team."
        image="https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=2400&auto=format&fit=crop"
        imageAlt="Drone aerial photography over a Punjabi wedding venue"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Films" }]}
      />

      {/* Featured films */}
      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <p className="eyebrow text-center">Featured Films</p>
          <h2 className="section-heading mt-4 text-center">
            Watch the day
            <span className="gold-text italic"> unfold.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-center text-smoke">
            Full films are shared privately with each couple and posted on
            our Instagram — tap any card to watch on{" "}
            <span className="text-gold-light">{studio.instagram}</span>.
          </p>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {featuredFilms.map((film) => (
              <a
                key={film.title}
                href={`https://instagram.com/${studio.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl glass-gold-border border"
              >
                <Image
                  src={film.thumbnail}
                  alt={film.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.1]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full glass glass-gold-border text-gold-light transition-transform duration-300 group-hover:scale-110">
                    <Play size={24} className="ml-1" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-display text-xl text-ivory">
                    {film.title}
                  </h3>
                  <p className="mt-1 flex items-center justify-between text-xs text-smoke">
                    <span>{film.location}</span>
                    <span className="text-gold-light">{film.duration}</span>
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {highlights.map((h) => (
              <div key={h.title} className="glass-card p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold-light">
                  <h.icon size={22} />
                </div>
                <h3 className="mt-5 font-display text-2xl text-ivory">
                  {h.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-smoke">
                  {h.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aerial stills */}
      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <p className="eyebrow text-center">Aerial Stills</p>
          <h2 className="section-heading mt-4 text-center">
            Frames from
            <span className="gold-text italic"> above.</span>
          </h2>
          <div className="mt-14">
            <Gallery items={stills} showFilters={false} />
          </div>

          <div className="mt-16 flex flex-col items-center gap-4 text-center">
            <p className="text-smoke">
              Want a cinematic film or aerial coverage for your event?
            </p>
            <Link href="/booking" className="btn-gold">
              Book Drone &amp; Film Coverage
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
