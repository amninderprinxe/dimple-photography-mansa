# Dimple Photography — Mansa

A premium, glassmorphism-styled portfolio website for **DIMPLE PHOTOGRAPHY - MANSA**, a wedding, pre-wedding, portrait, event, fashion, baby-shoot and drone/cinematic photography studio in Mansa, Punjab.

Built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Lucide Icons**.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/
  layout.tsx        Root layout, fonts, SEO metadata
  page.tsx           Homepage — assembles all sections
  globals.css         Design tokens & glassmorphism utility classes
  api/contact/route.ts  Contact form API stub
  sitemap.ts, robots.ts SEO
components/
  Navbar.tsx, Hero.tsx, About.tsx, Services.tsx,
  Portfolio.tsx, Process.tsx, Testimonials.tsx,
  CTA.tsx, Contact.tsx, Footer.tsx,
  FloatingWhatsApp.tsx, ScrollProgress.tsx
  ui/ApertureMark.tsx   Signature aperture-blade brand mark
lib/
  data.ts             All business content: services, portfolio, testimonials, stats
```

## Customizing content

Almost all business copy — studio info, services, portfolio items, testimonials,
process steps and stats — lives in **`lib/data.ts`**. Edit that one file to update:

- Phone, email, address, Instagram handle (`studio`)
- Services offered and their descriptions (`services`)
- Portfolio images, titles, categories and locations (`portfolio`)
- Client testimonials (`testimonials`)
- Studio stats shown in the hero (`stats`)
- Booking process steps (`process`)

## Replacing images

All imagery currently uses royalty-free Unsplash photos as placeholders so the
site is fully populated with realistic content out of the box. Swap them for
your own photography by:

1. Adding real images to `/public/` (e.g. `/public/portfolio/wedding-01.jpg`)
2. Updating the `image` field for each entry in `lib/data.ts`, or the `src`
   props directly in `components/Hero.tsx` and `components/CTA.tsx`
3. If loading images from your own domain, add that domain under
   `images.remotePatterns` in `next.config.mjs`

## Contact form

The form in `components/Contact.tsx` posts to `app/api/contact/route.ts`,
which currently logs submissions to the server console. To receive real
enquiries, wire that route up to an email provider (Resend, SendGrid, etc.)
or a webhook — a commented example is included in the route file.

## SEO

- Metadata, Open Graph and Twitter cards are set in `app/layout.tsx`
- `app/sitemap.ts` and `app/robots.ts` are wired up — update the domain once
  the site is deployed
- All images ship with descriptive, keyword-rich `alt` text
- Update `metadataBase` in `app/layout.tsx` to your real production domain

## Deployment

The project deploys cleanly to Vercel:

```bash
npm run build
```

Then push to a Git repository and import it at vercel.com, or run
`vercel` from the project root if you have the Vercel CLI installed.
