import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dimplephotographymansa.com"),
  title: {
    default: "Dimple Photography Mansa | Wedding & Portrait Photographer in Punjab",
    template: "%s | Dimple Photography Mansa",
  },
  description:
    "Dimple Photography Mansa is a premium wedding, pre-wedding, portrait, event, fashion, baby shoot and drone cinematography studio based in Mansa, Punjab. Capturing emotions, preserving memories forever.",
  keywords: [
    "wedding photographer Mansa",
    "best photographer in Mansa Punjab",
    "pre-wedding shoot Punjab",
    "drone photography Mansa",
    "candid wedding photography Punjab",
    "baby shoot photographer Mansa",
    "Dimple Photography",
  ],
  authors: [{ name: "Dimple Photography Mansa" }],
  openGraph: {
    title: "Dimple Photography Mansa | Wedding & Portrait Photographer in Punjab",
    description:
      "Capturing emotions, preserving memories forever. Premium wedding, pre-wedding, portrait, event, fashion, baby shoot and drone photography in Mansa, Punjab.",
    url: "https://www.dimplephotographymansa.com",
    siteName: "Dimple Photography Mansa",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dimple Photography Mansa",
    description: "Capturing emotions, preserving memories forever.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-body bg-ink text-ivory antialiased">
        {children}
      </body>
    </html>
  );
}
