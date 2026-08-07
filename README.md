# Dimple Photography — Mansa

A premium, glassmorphism-styled, multi-page website for **DIMPLE PHOTOGRAPHY - MANSA**, a wedding, pre-wedding, portrait, event, fashion, baby-shoot and drone/cinematic photography studio in Mansa, Punjab.

Built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Lucide Icons**.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Page | Path |
|---|---|
| Home | `/` |
| Portfolio (overview + full gallery) | `/portfolio` |
| Weddings | `/portfolio/weddings` |
| Pre-Wedding | `/portfolio/prewedding` |
| Portraits | `/portfolio/portraits` |
| Events | `/portfolio/events` |
| Cinematic Films & Drone | `/films` |
| About | `/about` |
| Services & Packages | `/services` |
| Booking | `/booking` |
| Contact | `/contact` |

The navbar's **Portfolio** menu links directly to each category page, both on desktop (hover dropdown) and mobile (accordion in the glass drawer).

## Layout & global elements

`app/layout.tsx` renders the **Navbar**, **ScrollProgress** bar, and **FloatingWhatsApp** button around every page, and the **Footer** below every page — so these only need to be maintained in one place. Individual `page.tsx` files only contain page-specific content.

The navbar is a transparent glass bar over the hero on load, and becomes a darker, blurred glass pill once you scroll (`components/Navbar.tsx`). It highlights the current section based on the route.

## Project structure

```
app/
  layout.tsx              Root layout — global Navbar, Footer, WhatsApp button, SEO metadata
  page.tsx                 Home — hero + condensed teasers linking to dedicated pages
  about/page.tsx            About page
  services/page.tsx         Services + pricing packages
  portfolio/page.tsx        Portfolio overview (category cards + full filterable gallery)
  portfolio/weddings/page.tsx
  portfolio/prewedding/page.tsx
  portfolio/portraits/page.tsx
  portfolio/events/page.tsx
  films/page.tsx             Cinematic films & drone photography
  booking/page.tsx           Booking form (date, venue, guest count, package)
  contact/page.tsx           Contact form + studio info
  api/contact/route.ts       Contact form submission handler (stub)
  api/booking/route.ts       Booking form submission handler (stub)
  sitemap.ts, robots.ts       SEO
components/
  Navbar.tsx                Transparent → glass sticky navbar, desktop dropdown + mobile drawer
  Hero.tsx                   Full-screen cinematic hero (home only)
  PageHeader.tsx             Reusable cinematic banner + breadcrumb for inner pages
  Gallery.tsx                 Reusable filterable gallery + lightbox (used on home, /portfolio, and each category page)
  About.tsx, Services.tsx, Process.tsx, Testimonials.tsx, CTA.tsx, Contact.tsx, BookingForm.tsx, Footer.tsx
  FloatingWhatsApp.tsx, ScrollProgress.tsx
  ui/ApertureMark.tsx        Signature aperture-blade brand mark (logo + ambient motif)
lib/
  data.ts                     All business content: services, portfolio items, categories, testimonials, stats, process
```

## Customizing content

Almost all business copy — studio info, services, portfolio items, testimonials,
process steps and stats — lives in **`lib/data.ts`**. Edit that one file to update:

- Phone, email, address, Instagram handle, WhatsApp number (`studio`)
- Services offered and their descriptions (`services`)
- Portfolio images, titles, categories and locations (`portfolio`)
- Category page metadata used by `/portfolio/[category]` pages (`portfolioCategories`)
- Client testimonials (`testimonials`)
- Studio stats shown in the hero and About page (`stats`)
- Booking process steps (`process`)

Package pricing on `/services` and package options on `/booking` are defined locally in `app/services/page.tsx` and `components/BookingForm.tsx`.

## Replacing images

All imagery currently uses royalty-free Unsplash photos as placeholders so the
site is fully populated with realistic content out of the box. Swap them for
your own photography by:

1. Adding real images to `/public/` (e.g. `/public/portfolio/wedding-01.jpg`)
2. Updating the `image`/`cover` fields in `lib/data.ts`, or the `image`/`src`
   props directly in `components/Hero.tsx`, `components/CTA.tsx`, `components/PageHeader.tsx` usages, and `app/films/page.tsx`
3. If loading images from your own domain, add that domain under
   `images.remotePatterns` in `next.config.mjs`

## Forms

- The contact form (`components/Contact.tsx`) posts to `app/api/contact/route.ts`
- The booking form (`components/BookingForm.tsx`) posts to `app/api/booking/route.ts`

Both currently log submissions to the server console. To receive real
enquiries/bookings, wire these routes up to an email provider (Resend,
SendGrid, etc.) or a webhook/CRM — commented examples are included in both
route files.

## WhatsApp button

`components/FloatingWhatsApp.tsx` links to `https://wa.me/<number>` using
`studio.whatsapp` from `lib/data.ts`. Update that number to your real
WhatsApp Business number.

## SEO

- Metadata, Open Graph and Twitter cards are set in `app/layout.tsx`, with
  page-specific titles/descriptions set via `export const metadata` in each
  `page.tsx`
- `app/sitemap.ts` lists all routes and `app/robots.ts` is wired up — update
  the domain once the site is deployed
- All images ship with descriptive, keyword-rich `alt` text
- Update `metadataBase` in `app/layout.tsx` to your real production domain

## Deployment

The project deploys cleanly to Vercel:

```bash
npm run build
```

Then push to a Git repository and import it at vercel.com, or run
`vercel` from the project root if you have the Vercel CLI installed.
