import ApertureMark from "@/components/ui/ApertureMark";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center">
      <ApertureMark size={64} className="opacity-70" />
      <h1 className="mt-8 font-display text-5xl text-ivory">
        This frame doesn&apos;t exist.
      </h1>
      <p className="mt-4 max-w-md text-smoke">
        The page you&apos;re looking for may have been moved or never
        developed. Let&apos;s get you back to the gallery.
      </p>
      <a href="/" className="btn-gold mt-8">
        Back to Home
      </a>
    </main>
  );
}
