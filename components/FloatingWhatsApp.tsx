"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { studio } from "@/lib/data";

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href={`https://wa.me/${studio.whatsapp}?text=${encodeURIComponent(
        "Hi Dimple Photography, I'd like to enquire about a shoot."
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.4, duration: 0.5 }}
      whileHover={{ scale: 1.08 }}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gold-gradient text-ink shadow-gold-glow"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={24} fill="currentColor" className="opacity-90" />
    </motion.a>
  );
}
