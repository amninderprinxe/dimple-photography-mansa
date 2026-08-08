/**
 * Portfolio data for the DIMPLE PHOTOGRAPHY - MANSA portfolio system.
 *
 * `image` paths point at /public/portfolio/<category-slug>/<file>.jpg —
 * these are production paths, not placeholder URLs. Drop your real,
 * optimized (WebP/JPEG, ~1600px wide) photos into the matching folder
 * under /public/portfolio/ before deploying. Next.js `<Image>` will
 * handle resizing, lazy loading and format negotiation automatically
 * from there.
 */

export const PORTFOLIO_CATEGORIES = [
  "Weddings",
  "Pre-Wedding",
  "Portraits",
  "Events",
  "Fashion",
  "Baby Shoot",
  "Drone Shots",
] as const;

export type PortfolioCategory = (typeof PORTFOLIO_CATEGORIES)[number];

export interface PortfolioItem {
  id: string;
  title: string;
  category: PortfolioCategory;
  date: string; // human-readable, e.g. "March 2026"
  location: string;
  image: string; // path under /public
  featured: boolean;
}

const categorySlug: Record<PortfolioCategory, string> = {
  Weddings: "weddings",
  "Pre-Wedding": "pre-wedding",
  Portraits: "portraits",
  Events: "events",
  Fashion: "fashion",
  "Baby Shoot": "baby-shoot",
  "Drone Shots": "drone-shots",
};

const img = (category: PortfolioCategory, file: string) =>
  `/portfolio/${categorySlug[category]}/${file}`;

export const portfolioItems: PortfolioItem[] = [
  // Weddings
  {
    id: "wed-01",
    title: "Aman & Simran Wedding",
    category: "Weddings",
    date: "February 2026",
    location: "Mansa Golden Palace",
    image: img("Weddings", "aman-simran-01.jpg"),
    featured: true,
  },
  {
    id: "wed-02",
    title: "Royal Palace Reception",
    category: "Weddings",
    date: "December 2025",
    location: "Mansa Golden Palace",
    image: img("Weddings", "royal-palace-reception.jpg"),
    featured: true,
  },
  {
    id: "wed-03",
    title: "Harpreet & Navjot Baraat",
    category: "Weddings",
    date: "November 2025",
    location: "Sardulgarh",
    image: img("Weddings", "harpreet-navjot-baraat.jpg"),
    featured: false,
  },
  {
    id: "wed-04",
    title: "Jaspreet & Amanpreet Phere",
    category: "Weddings",
    date: "October 2025",
    location: "Budhlada",
    image: img("Weddings", "jaspreet-amanpreet-phere.jpg"),
    featured: false,
  },
  // Pre-Wedding
  {
    id: "pre-01",
    title: "Golden Hour Pre-Wedding",
    category: "Pre-Wedding",
    date: "January 2026",
    location: "Bathinda Mustard Fields",
    image: img("Pre-Wedding", "golden-hour-prewedding.jpg"),
    featured: true,
  },
  {
    id: "pre-02",
    title: "Karan & Simran Countryside Shoot",
    category: "Pre-Wedding",
    date: "September 2025",
    location: "Mansa Countryside",
    image: img("Pre-Wedding", "karan-simran-countryside.jpg"),
    featured: false,
  },
  {
    id: "pre-03",
    title: "Old City Lanes Pre-Wedding",
    category: "Pre-Wedding",
    date: "August 2025",
    location: "Old City, Mansa",
    image: img("Pre-Wedding", "old-city-lanes.jpg"),
    featured: false,
  },
  // Portraits
  {
    id: "por-01",
    title: "Mansa Fashion Portraits",
    category: "Portraits",
    date: "March 2026",
    location: "Dimple Studio, Mansa",
    image: img("Portraits", "mansa-fashion-portraits.jpg"),
    featured: true,
  },
  {
    id: "por-02",
    title: "Corporate Headshot Series",
    category: "Portraits",
    date: "January 2026",
    location: "Dimple Studio, Mansa",
    image: img("Portraits", "corporate-headshots.jpg"),
    featured: false,
  },
  {
    id: "por-03",
    title: "Natural Light Family Portraits",
    category: "Portraits",
    date: "November 2025",
    location: "Dimple Studio, Mansa",
    image: img("Portraits", "family-portraits.jpg"),
    featured: false,
  },
  // Events
  {
    id: "evt-01",
    title: "Royal Palace Reception",
    category: "Events",
    date: "December 2025",
    location: "Mansa Golden Palace",
    image: img("Events", "royal-palace-reception.jpg"),
    featured: true,
  },
  {
    id: "evt-02",
    title: "50th Anniversary Celebration",
    category: "Events",
    date: "October 2025",
    location: "Sardulgarh Community Hall",
    image: img("Events", "50th-anniversary.jpg"),
    featured: false,
  },
  {
    id: "evt-03",
    title: "Corporate Product Launch",
    category: "Events",
    date: "September 2025",
    location: "Mansa",
    image: img("Events", "corporate-launch.jpg"),
    featured: false,
  },
  // Fashion
  {
    id: "fas-01",
    title: "Malwa Threads Lookbook",
    category: "Fashion",
    date: "February 2026",
    location: "Dimple Studio, Mansa",
    image: img("Fashion", "malwa-threads-lookbook.jpg"),
    featured: true,
  },
  {
    id: "fas-02",
    title: "Editorial Streetwear Set",
    category: "Fashion",
    date: "December 2025",
    location: "Old City, Mansa",
    image: img("Fashion", "editorial-streetwear.jpg"),
    featured: false,
  },
  {
    id: "fas-03",
    title: "Bridal Couture Campaign",
    category: "Fashion",
    date: "October 2025",
    location: "Dimple Studio, Mansa",
    image: img("Fashion", "bridal-couture-campaign.jpg"),
    featured: false,
  },
  // Baby Shoot
  {
    id: "bab-01",
    title: "Newborn Studio Session",
    category: "Baby Shoot",
    date: "March 2026",
    location: "Dimple Studio, Mansa",
    image: img("Baby Shoot", "newborn-studio-session.jpg"),
    featured: true,
  },
  {
    id: "bab-02",
    title: "The Kaur Family at Home",
    category: "Baby Shoot",
    date: "January 2026",
    location: "Home Session, Mansa",
    image: img("Baby Shoot", "kaur-family-home.jpg"),
    featured: false,
  },
  {
    id: "bab-03",
    title: "Maternity Glow Session",
    category: "Baby Shoot",
    date: "November 2025",
    location: "Dimple Studio, Mansa",
    image: img("Baby Shoot", "maternity-glow.jpg"),
    featured: false,
  },
  // Drone Shots
  {
    id: "dro-01",
    title: "Punjab Fields Drone Shot",
    category: "Drone Shots",
    date: "February 2026",
    location: "Mansa Countryside",
    image: img("Drone Shots", "punjab-fields-drone.jpg"),
    featured: true,
  },
  {
    id: "dro-02",
    title: "Baraat, From Above",
    category: "Drone Shots",
    date: "November 2025",
    location: "Budhlada",
    image: img("Drone Shots", "baraat-from-above.jpg"),
    featured: false,
  },
  {
    id: "dro-03",
    title: "Aerial Venue Establishing Shot",
    category: "Drone Shots",
    date: "December 2025",
    location: "Mansa Golden Palace",
    image: img("Drone Shots", "aerial-venue-establishing.jpg"),
    featured: false,
  },
];
