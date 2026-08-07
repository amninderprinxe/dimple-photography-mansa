import { MetadataRoute } from "next";

const routes = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/portfolio", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/portfolio/weddings", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/portfolio/prewedding", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/portfolio/portraits", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/portfolio/events", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/films", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/booking", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.dimplephotographymansa.com";
  return routes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
