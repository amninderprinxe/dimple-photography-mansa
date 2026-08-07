import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Dimple Photography Mansa — call, WhatsApp, email or visit our studio in Mansa, Punjab.",
};

export default function ContactPage() {
  return (
    <main className="relative">
      <PageHeader
        eyebrow="Get In Touch"
        title="Let's Talk"
        description="Questions about availability, pricing or a shoot you're planning? Reach us directly or send an enquiry below."
        image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2400&auto=format&fit=crop"
        imageAlt="Contact Dimple Photography Mansa"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />
      <Contact />
    </main>
  );
}
