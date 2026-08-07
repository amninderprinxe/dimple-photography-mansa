"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Send,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { studio } from "@/lib/data";

const serviceOptions = [
  "Wedding Photography",
  "Pre-Wedding Shoot",
  "Portrait Session",
  "Event Coverage",
  "Fashion Photography",
  "Baby & Maternity Shoot",
  "Drone & Cinematic Film",
];

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: serviceOptions[0],
    date: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({
        name: "",
        email: "",
        phone: "",
        service: serviceOptions[0],
        date: "",
        message: "",
      });
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-ivory placeholder:text-smoke/70 focus:outline-none focus:border-gold/60 focus:bg-white/[0.05] transition-colors";

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 space-y-5"
          >
            <div className="glass-card p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold-light">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-smoke">
                    Call or WhatsApp
                  </p>
                  <a
                    href={`tel:${studio.phone.replace(/\s/g, "")}`}
                    className="mt-1 block font-display text-xl text-ivory hover:text-gold-light"
                  >
                    {studio.phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold-light">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-smoke">
                    Email
                  </p>
                  <a
                    href={`mailto:${studio.email}`}
                    className="mt-1 block font-display text-xl text-ivory hover:text-gold-light break-all"
                  >
                    {studio.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold-light">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-smoke">
                    Studio Address
                  </p>
                  <p className="mt-1 font-display text-xl text-ivory">
                    {studio.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold-light">
                  <Instagram size={18} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-smoke">
                    Instagram
                  </p>
                  <a
                    href={`https://instagram.com/${studio.instagram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block font-display text-xl text-ivory hover:text-gold-light"
                  >
                    {studio.instagram}
                  </a>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl glass-gold-border border h-48">
              <iframe
                title="Dimple Photography Mansa location map"
                src="https://www.google.com/maps?q=Mansa,Punjab,India&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* Form column */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onSubmit={handleSubmit}
            className="glass-card lg:col-span-3 p-7 sm:p-9"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label className="mb-2 block text-xs uppercase tracking-wider text-smoke">
                  Full Name
                </label>
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Simran Kaur"
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-1">
                <label className="mb-2 block text-xs uppercase tracking-wider text-smoke">
                  Phone Number
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="98XXX XXXXX"
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-2 block text-xs uppercase tracking-wider text-smoke">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@email.com"
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-1">
                <label className="mb-2 block text-xs uppercase tracking-wider text-smoke">
                  Service
                </label>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className={inputClass}
                >
                  {serviceOptions.map((s) => (
                    <option key={s} value={s} className="bg-charcoal">
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-1">
                <label className="mb-2 block text-xs uppercase tracking-wider text-smoke">
                  Event Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-2 block text-xs uppercase tracking-wider text-smoke">
                  Tell Us About Your Day
                </label>
                <textarea
                  required
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Venue, guest count, timeline, anything we should know..."
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-gold mt-7 w-full justify-center disabled:opacity-60"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Send Enquiry
                </>
              )}
            </button>

            {status === "success" && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center gap-2 text-sm text-gold-light"
              >
                <CheckCircle2 size={16} />
                Thank you — we&apos;ve received your enquiry and will be in
                touch shortly.
              </motion.p>
            )}
            {status === "error" && (
              <p className="mt-4 text-sm text-red-400">
                Something went wrong. Please call or WhatsApp us directly.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
