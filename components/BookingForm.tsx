"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

const serviceOptions = [
  "Wedding Photography",
  "Pre-Wedding Shoot",
  "Portrait Session",
  "Event Coverage",
  "Fashion Photography",
  "Baby & Maternity Shoot",
  "Drone & Cinematic Film",
];

const packageOptions = ["Essential", "Signature", "Grand", "Not Sure Yet"];

type Status = "idle" | "loading" | "success" | "error";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  service: serviceOptions[0],
  package: packageOptions[3],
  eventDate: "",
  venue: "",
  guests: "",
  message: "",
};

export default function BookingForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState(initialForm);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm(initialForm);
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-ivory placeholder:text-smoke/70 focus:outline-none focus:border-gold/60 focus:bg-white/[0.05] transition-colors";

  return (
    <motion.form
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      onSubmit={handleSubmit}
      className="glass-card p-7 sm:p-10"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
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
        <div>
          <label className="mb-2 block text-xs uppercase tracking-wider text-smoke">
            Phone Number
          </label>
          <input
            required
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

        <div>
          <label className="mb-2 block text-xs uppercase tracking-wider text-smoke">
            Service Needed
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
        <div>
          <label className="mb-2 block text-xs uppercase tracking-wider text-smoke">
            Preferred Package
          </label>
          <select
            name="package"
            value={form.package}
            onChange={handleChange}
            className={inputClass}
          >
            {packageOptions.map((p) => (
              <option key={p} value={p} className="bg-charcoal">
                {p}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs uppercase tracking-wider text-smoke">
            Event Date
          </label>
          <input
            required
            type="date"
            name="eventDate"
            value={form.eventDate}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-2 block text-xs uppercase tracking-wider text-smoke">
            Approx. Guest Count
          </label>
          <input
            name="guests"
            value={form.guests}
            onChange={handleChange}
            placeholder="e.g. 250"
            className={inputClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-2 block text-xs uppercase tracking-wider text-smoke">
            Venue / City
          </label>
          <input
            name="venue"
            value={form.venue}
            onChange={handleChange}
            placeholder="e.g. Mansa Golden Palace"
            className={inputClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-2 block text-xs uppercase tracking-wider text-smoke">
            Anything Else We Should Know
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={4}
            placeholder="Timeline, rituals, second-shooter needs, special requests..."
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-gold mt-8 w-full justify-center disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending Request...
          </>
        ) : (
          <>
            <Send size={16} />
            Request This Date
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
          Thank you — your date request has been received. We&apos;ll confirm
          availability within 24 hours.
        </motion.p>
      )}
      {status === "error" && (
        <p className="mt-4 text-sm text-red-400">
          Something went wrong. Please call or WhatsApp us directly to book.
        </p>
      )}
    </motion.form>
  );
}
