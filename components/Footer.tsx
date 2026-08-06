import { Instagram, Facebook, Youtube, Phone, Mail } from "lucide-react";
import ApertureMark from "./ui/ApertureMark";
import { studio } from "@/lib/data";

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const serviceLinks = [
  "Wedding Photography",
  "Pre-Wedding Shoots",
  "Portrait Sessions",
  "Event Coverage",
  "Fashion Photography",
  "Drone & Cinematic Films",
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 pt-20">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <ApertureMark size={36} />
              <div>
                <p className="font-display text-xl text-ivory">
                  {studio.name}
                </p>
                <p className="eyebrow !text-[10px]">{studio.location}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-smoke">
              {studio.tagline} A premium photography studio based in{" "}
              {studio.city}.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href={
                    i === 0
                      ? `https://instagram.com/${studio.instagram.replace("@", "")}`
                      : "#"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full glass glass-gold-border text-smoke transition-colors hover:text-gold-light"
                  aria-label="Social link"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg text-ivory">Quick Links</h4>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-smoke transition-colors hover:text-gold-light"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg text-ivory">Services</h4>
            <ul className="mt-4 space-y-2.5">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-sm text-smoke transition-colors hover:text-gold-light"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg text-ivory">Reach Us</h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`tel:${studio.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-sm text-smoke transition-colors hover:text-gold-light"
                >
                  <Phone size={14} className="text-gold" /> {studio.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${studio.email}`}
                  className="flex items-center gap-2 text-sm text-smoke transition-colors hover:text-gold-light break-all"
                >
                  <Mail size={14} className="text-gold" /> {studio.email}
                </a>
              </li>
            </ul>
            <p className="mt-4 text-sm text-smoke">{studio.address}</p>
          </div>
        </div>

        <div className="divider-gold mt-14" />

        <div className="flex flex-col items-center justify-between gap-3 py-7 text-xs text-smoke sm:flex-row">
          <p>
            © {new Date().getFullYear()} {studio.name} {studio.location}. All
            rights reserved.
          </p>
          <p>Designed for a studio that shoots real Punjabi weddings.</p>
        </div>
      </div>
    </footer>
  );
}
