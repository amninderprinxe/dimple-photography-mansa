"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
// Lightweight shim for toast functions to avoid depending on 'sonner' in this
// environment. Keeps the same API used below (toast.success / toast.error).
const toast = {
  success: (msg: string) => {
    if (typeof window !== "undefined") {
      // Fallback: log to console and show a native alert briefly for visibility
      console.log("Success:", msg);
    }
  },
  error: (msg: string) => {
    if (typeof window !== "undefined") {
      console.warn("Error:", msg);
    }
  },
};
import { Send, Loader2 } from "lucide-react";
import { studio } from "@/lib/data";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

interface BookingFormState {
  fullName: string;
  phone: string;
  email: string;
  shootType: string;
  date: string;
  timeSlot: string;
  location: string;
  message: string;
}

type FieldName = keyof BookingFormState;
type FormErrors = Partial<Record<FieldName, string>>;
type TouchedState = Partial<Record<FieldName, boolean>>;
type FocusedState = Partial<Record<FieldName, boolean>>;

/* ------------------------------------------------------------------ */
/* Static options                                                      */
/* ------------------------------------------------------------------ */

const SHOOT_TYPES = [
  "Wedding Photography",
  "Pre-Wedding Shoot",
  "Portrait Session",
  "Event Coverage",
  "Fashion Shoot",
  "Baby & Family Shoot",
  "Drone Coverage",
  "Cinematic Film",
];

const TIME_SLOTS = [
  "09:00 AM - 11:00 AM",
  "01:00 PM - 03:00 PM",
  "05:00 PM - 07:00 PM",
];

const MESSAGE_MAX_LENGTH = 500;

const initialForm: BookingFormState = {
  fullName: "",
  phone: "",
  email: "",
  shootType: "",
  date: "",
  timeSlot: "",
  location: "",
  message: "",
};

/** Today's date in YYYY-MM-DD, used as the `min` on the date input so past
 *  dates can't be picked in the native calendar UI. */
const todayISO = () => {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  const local = new Date(d.getTime() - offset * 60 * 1000);
  return local.toISOString().split("T")[0];
};

/* ------------------------------------------------------------------ */
/* Validation                                                           */
/* ------------------------------------------------------------------ */

function validateField(name: FieldName, rawValue: string): string {
  const value = rawValue.trim();

  switch (name) {
    case "fullName":
      if (!value) return "Full name is required.";
      if (value.length < 2) return "Enter your full name.";
      return "";

    case "phone": {
      if (!value) return "Phone number is required.";
      const digits = value.replace(/\D/g, "");
      if (digits.length < 10 || digits.length > 15) {
        return "Enter a valid phone number (10–15 digits).";
      }
      return "";
    }

    case "email": {
      if (!value) return "Email address is required.";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "Enter a valid email address.";
      return "";
    }

    case "shootType":
      if (!value) return "Please select a shoot type.";
      return "";

    case "date": {
      if (!value) return "Preferred date is required.";
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selected = new Date(value);
      selected.setHours(0, 0, 0, 0);
      if (Number.isNaN(selected.getTime())) return "Enter a valid date.";
      if (selected < today) return "Past dates can't be selected.";
      return "";
    }

    case "timeSlot":
      if (!value) return "Please select a preferred time slot.";
      return "";

    case "location":
      if (!value) return "Shoot location is required.";
      if (value.length < 2) return "Enter a valid location.";
      return "";

    case "message":
      if (value.length > MESSAGE_MAX_LENGTH) {
        return `Message must be ${MESSAGE_MAX_LENGTH} characters or fewer.`;
      }
      return "";

    default:
      return "";
  }
}

function buildWhatsAppMessage(form: BookingFormState): string {
  const formattedDate = new Date(form.date).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return [
    "Hello DIMPLE PHOTOGRAPHY - MANSA, I would like to book a photography session.",
    "",
    `Name: ${form.fullName.trim()}`,
    `Phone: ${form.phone.trim()}`,
    `Email: ${form.email.trim()}`,
    `Shoot Type: ${form.shootType}`,
    `Preferred Date: ${formattedDate}`,
    `Preferred Time: ${form.timeSlot}`,
    `Location: ${form.location.trim()}`,
    `Message: ${form.message.trim() || "N/A"}`,
    "",
    "Please confirm the availability.",
    "Thank you!",
  ].join("\n");
}

/* ------------------------------------------------------------------ */
/* Floating label field shell                                          */
/* ------------------------------------------------------------------ */

interface FieldShellProps {
  htmlFor: string;
  label: string;
  required?: boolean;
  active: boolean;
  error?: string;
  touched?: boolean;
  hint?: string;
  children: React.ReactNode;
}

function FieldShell({
  htmlFor,
  label,
  required,
  active,
  error,
  touched,
  hint,
  children,
}: FieldShellProps) {
  const showError = Boolean(touched && error);

  return (
    <div className="relative">
      <div className="relative">
        {children}
        <label
          htmlFor={htmlFor}
          className={`pointer-events-none absolute left-4 transition-all duration-200 ${active
              ? "top-2 text-[11px] tracking-wide"
              : "top-1/2 -translate-y-1/2 text-sm"
            } ${showError
              ? "text-red-400"
              : active
                ? "text-gold-light"
                : "text-smoke"
            }`}
        >
          {label}
          {required && <span className="text-gold"> *</span>}
        </label>
      </div>

      <div className="min-h-[1.25rem] px-1">
        {showError && (
          <p
            id={`${htmlFor}-error`}
            role="alert"
            className="mt-1.5 text-xs text-red-400"
          >
            {error}
          </p>
        )}
        {!showError && hint && (
          <p className="mt-1.5 text-xs text-smoke/70">{hint}</p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Booking form                                                        */
/* ------------------------------------------------------------------ */

export default function BookingForm() {
  const [form, setForm] = useState<BookingFormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedState>({});
  const [focused, setFocused] = useState<FocusedState>({});
  const [submitting, setSubmitting] = useState(false);

  const isActive = (name: FieldName) =>
    Boolean(focused[name]) || form[name].trim().length > 0;

  const handleChange = useCallback(
    (name: FieldName, value: string) => {
      setForm((f) => ({ ...f, [name]: value }));
      // Real-time validation once a field has already been touched once.
      if (touched[name]) {
        setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
      }
    },
    [touched]
  );

  const handleFocus = (name: FieldName) => {
    setFocused((f) => ({ ...f, [name]: true }));
  };

  const handleBlur = (name: FieldName) => {
    setFocused((f) => ({ ...f, [name]: false }));
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, form[name]) }));
  };

  const inputClass = (name: FieldName) =>
    `peer w-full rounded-xl border bg-white/[0.03] px-4 pb-2.5 pt-6 text-sm text-ivory outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-gold/50 ${touched[name] && errors[name]
      ? "border-red-400/60 focus:border-red-400"
      : "border-white/10 focus:border-gold/60 focus:bg-white/[0.05]"
    }`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fieldNames = Object.keys(form) as FieldName[];
    const newErrors: FormErrors = {};
    fieldNames.forEach((name) => {
      newErrors[name] = validateField(name, form[name]);
    });

    setErrors(newErrors);
    setTouched(
      fieldNames.reduce((acc, name) => ({ ...acc, [name]: true }), {} as TouchedState)
    );

    const firstInvalid = fieldNames.find((name) => newErrors[name]);
    if (firstInvalid) {
      toast.error("Please fix the highlighted fields.");
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    setSubmitting(true);

    const message = buildWhatsAppMessage(form);
    const url = `https://wa.me/${studio.whatsapp}?text=${encodeURIComponent(message)}`;

    toast.success("Redirecting to WhatsApp…");

    window.setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer");
      setSubmitting(false);
      setForm(initialForm);
      setTouched({});
      setErrors({});
    }, 1000);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      onSubmit={handleSubmit}
      noValidate
      aria-label="Book a photography shoot"
      className="glass-card p-7 sm:p-10"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Full Name */}
        <FieldShell
          htmlFor="fullName"
          label="Full Name"
          required
          active={isActive("fullName")}
          error={errors.fullName}
          touched={touched.fullName}
        >
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={Boolean(touched.fullName && errors.fullName)}
            aria-describedby={
              touched.fullName && errors.fullName ? "fullName-error" : undefined
            }
            value={form.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            onFocus={() => handleFocus("fullName")}
            onBlur={() => handleBlur("fullName")}
            className={inputClass("fullName")}
          />
        </FieldShell>

        {/* Phone */}
        <FieldShell
          htmlFor="phone"
          label="Phone Number"
          required
          active={isActive("phone")}
          error={errors.phone}
          touched={touched.phone}
        >
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            aria-required="true"
            aria-invalid={Boolean(touched.phone && errors.phone)}
            aria-describedby={touched.phone && errors.phone ? "phone-error" : undefined}
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            onFocus={() => handleFocus("phone")}
            onBlur={() => handleBlur("phone")}
            className={inputClass("phone")}
          />
        </FieldShell>

        {/* Email */}
        <FieldShell
          htmlFor="email"
          label="Email Address"
          required
          active={isActive("email")}
          error={errors.email}
          touched={touched.email}
        >
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-required="true"
            aria-invalid={Boolean(touched.email && errors.email)}
            aria-describedby={touched.email && errors.email ? "email-error" : undefined}
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onFocus={() => handleFocus("email")}
            onBlur={() => handleBlur("email")}
            className={inputClass("email")}
          />
        </FieldShell>

        {/* Shoot Type */}
        <FieldShell
          htmlFor="shootType"
          label="Shoot Type"
          required
          active={isActive("shootType")}
          error={errors.shootType}
          touched={touched.shootType}
        >
          <select
            id="shootType"
            name="shootType"
            required
            aria-required="true"
            aria-invalid={Boolean(touched.shootType && errors.shootType)}
            aria-describedby={
              touched.shootType && errors.shootType ? "shootType-error" : undefined
            }
            value={form.shootType}
            onChange={(e) => handleChange("shootType", e.target.value)}
            onFocus={() => handleFocus("shootType")}
            onBlur={() => handleBlur("shootType")}
            className={`${inputClass("shootType")} appearance-none`}
          >
            <option value="" disabled hidden />
            {SHOOT_TYPES.map((type) => (
              <option key={type} value={type} className="bg-charcoal">
                {type}
              </option>
            ))}
          </select>
        </FieldShell>

        {/* Preferred Date */}
        <FieldShell
          htmlFor="date"
          label="Preferred Date"
          required
          active
          error={errors.date}
          touched={touched.date}
        >
          <input
            id="date"
            name="date"
            type="date"
            required
            aria-required="true"
            min={todayISO()}
            aria-invalid={Boolean(touched.date && errors.date)}
            aria-describedby={touched.date && errors.date ? "date-error" : undefined}
            value={form.date}
            onChange={(e) => handleChange("date", e.target.value)}
            onFocus={() => handleFocus("date")}
            onBlur={() => handleBlur("date")}
            className={inputClass("date")}
          />
        </FieldShell>

        {/* Preferred Time Slot */}
        <FieldShell
          htmlFor="timeSlot"
          label="Preferred Time Slot"
          required
          active={isActive("timeSlot")}
          error={errors.timeSlot}
          touched={touched.timeSlot}
        >
          <select
            id="timeSlot"
            name="timeSlot"
            required
            aria-required="true"
            aria-invalid={Boolean(touched.timeSlot && errors.timeSlot)}
            aria-describedby={
              touched.timeSlot && errors.timeSlot ? "timeSlot-error" : undefined
            }
            value={form.timeSlot}
            onChange={(e) => handleChange("timeSlot", e.target.value)}
            onFocus={() => handleFocus("timeSlot")}
            onBlur={() => handleBlur("timeSlot")}
            className={`${inputClass("timeSlot")} appearance-none`}
          >
            <option value="" disabled hidden />
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot} className="bg-charcoal">
                {slot}
              </option>
            ))}
          </select>
        </FieldShell>

        {/* Location */}
        <div className="sm:col-span-2">
          <FieldShell
            htmlFor="location"
            label="Shoot Location"
            required
            active={isActive("location")}
            error={errors.location}
            touched={touched.location}
          >
            <input
              id="location"
              name="location"
              type="text"
              autoComplete="address-level2"
              required
              aria-required="true"
              aria-invalid={Boolean(touched.location && errors.location)}
              aria-describedby={
                touched.location && errors.location ? "location-error" : undefined
              }
              value={form.location}
              onChange={(e) => handleChange("location", e.target.value)}
              onFocus={() => handleFocus("location")}
              onBlur={() => handleBlur("location")}
              placeholder=""
              className={inputClass("location")}
            />
          </FieldShell>
        </div>

        {/* Additional Message */}
        <div className="sm:col-span-2">
          <FieldShell
            htmlFor="message"
            label="Additional Message (optional)"
            active={isActive("message")}
            error={errors.message}
            touched={touched.message}
            hint={`${form.message.length}/${MESSAGE_MAX_LENGTH} characters`}
          >
            <textarea
              id="message"
              name="message"
              rows={4}
              maxLength={MESSAGE_MAX_LENGTH}
              aria-invalid={Boolean(touched.message && errors.message)}
              aria-describedby={
                touched.message && errors.message ? "message-error" : undefined
              }
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
              onFocus={() => handleFocus("message")}
              onBlur={() => handleBlur("message")}
              className={`${inputClass("message")} resize-none`}
            />
          </FieldShell>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        aria-busy={submitting}
        className="btn-gold mt-4 w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? (
          <>
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
            Processing...
          </>
        ) : (
          <>
            <Send size={16} aria-hidden="true" />
            Send via WhatsApp
          </>
        )}
      </button>

      <p className="mt-3 text-center text-xs text-smoke">
        You&apos;ll be redirected to WhatsApp to send this booking request to{" "}
        {studio.name} {studio.location}.
      </p>
    </motion.form>
  );
}
