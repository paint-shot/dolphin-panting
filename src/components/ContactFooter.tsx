"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Check,
  Copy,
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { WhatsAppIcon } from "./WhatsAppWidget";

const PROJECT_TYPES = [
  "Interior Painting",
  "Exterior Painting",
  "Kitchen Spraying",
  "Commercial / Office",
];

export default function ContactFooter() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState(PROJECT_TYPES[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [area, setArea] = useState("");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleCopy = (key: string, value: string) => {
    navigator.clipboard?.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const quoteMessage = `Hi Dolphin Painter, I'd like a free quote.\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nDublin Area: ${area}\nService: ${selectedType}\n\nProject Details:\n${details}`;

  const mailtoHref = `mailto:${SITE_CONFIG.contacts.email.display}?subject=${encodeURIComponent(
    `Free Quote Request — ${selectedType} (${area || "Dublin"})`
  )}&body=${encodeURIComponent(quoteMessage)}`;

  const whatsappQuoteHref = `https://wa.me/${
    SITE_CONFIG.contacts.primaryPhone.e164
  }?text=${encodeURIComponent(quoteMessage)}`;

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-georgian text-alabaster"
    >
      <div className="pointer-events-none absolute inset-0 bg-architectural-grid opacity-75" />
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-ochre/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-24 pt-24 sm:px-8 sm:pt-32 lg:pb-12">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-start">
          {/* Left: Direct Contact Information */}
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-ochre">
              <span className="h-px w-8 bg-ochre" />
              Get In Touch
            </span>

            <h2 className="mt-4 font-serif text-3xl font-medium leading-[1.12] tracking-tight text-white sm:text-5xl">
              Let&apos;s transform{" "}
              <span className="italic text-ochre">your space</span>.
            </h2>

            <p className="mt-5 text-base leading-relaxed text-alabaster/75">
              Request your free, no-obligation quote today. Call either line
              directly, send us an email, or fill out the form — we reply to
              every Dublin enquiry within 24 hours.
            </p>

            {/* Contact Cards */}
            <div className="mt-9 space-y-3.5">
              {/* Primary Phone */}
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/12 bg-white/[0.05] p-4 backdrop-blur-sm transition-colors hover:border-ochre/45">
                <a
                  href={SITE_CONFIG.contacts.primaryPhone.href}
                  className="flex items-center gap-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ochre/20 text-ochre">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-alabaster/60">
                      {SITE_CONFIG.contacts.primaryPhone.label}
                    </p>
                    <p className="mt-0.5 text-lg font-semibold tracking-wide text-white">
                      {SITE_CONFIG.contacts.primaryPhone.display}
                    </p>
                  </div>
                </a>
                <div className="flex items-center gap-2">
                  <a
                    href={SITE_CONFIG.contacts.primaryPhone.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp primary phone number"
                    title="Message on WhatsApp"
                    className="flex h-9 items-center gap-1.5 rounded-xl bg-[#25D366]/20 px-3 text-xs font-semibold text-[#4ade80] transition-colors hover:bg-[#25D366] hover:text-white"
                  >
                    <WhatsAppIcon className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy("phone1", SITE_CONFIG.contacts.primaryPhone.raw)
                    }
                    aria-label="Copy primary phone number"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-alabaster/75 transition-colors hover:bg-white/15 hover:text-white"
                  >
                    {copiedKey === "phone1" ? (
                      <Check className="h-4 w-4 text-ochre" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Secondary Phone */}
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/12 bg-white/[0.05] p-4 backdrop-blur-sm transition-colors hover:border-ochre/45">
                <a
                  href={SITE_CONFIG.contacts.secondaryPhone.href}
                  className="flex items-center gap-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ochre/20 text-ochre">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-alabaster/60">
                      {SITE_CONFIG.contacts.secondaryPhone.label}
                    </p>
                    <p className="mt-0.5 text-lg font-semibold tracking-wide text-white">
                      {SITE_CONFIG.contacts.secondaryPhone.display}
                    </p>
                  </div>
                </a>
                <div className="flex items-center gap-2">
                  <a
                    href={SITE_CONFIG.contacts.secondaryPhone.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp alternative phone number"
                    title="Message on WhatsApp"
                    className="flex h-9 items-center gap-1.5 rounded-xl bg-[#25D366]/20 px-3 text-xs font-semibold text-[#4ade80] transition-colors hover:bg-[#25D366] hover:text-white"
                  >
                    <WhatsAppIcon className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(
                        "phone2",
                        SITE_CONFIG.contacts.secondaryPhone.raw
                      )
                    }
                    aria-label="Copy alternative phone number"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-alabaster/75 transition-colors hover:bg-white/15 hover:text-white"
                  >
                    {copiedKey === "phone2" ? (
                      <Check className="h-4 w-4 text-ochre" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/12 bg-white/[0.05] p-4 backdrop-blur-sm transition-colors hover:border-ochre/45">
                <a
                  href={SITE_CONFIG.contacts.email.href}
                  className="flex min-w-0 items-center gap-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ochre/20 text-ochre">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-alabaster/60">
                      {SITE_CONFIG.contacts.email.label}
                    </p>
                    <p className="mt-0.5 truncate text-base font-semibold text-white">
                      {SITE_CONFIG.contacts.email.display}
                    </p>
                  </div>
                </a>
                <button
                  type="button"
                  onClick={() =>
                    handleCopy("email", SITE_CONFIG.contacts.email.display)
                  }
                  aria-label="Copy email address"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-alabaster/75 transition-colors hover:bg-white/15 hover:text-white"
                >
                  {copiedKey === "email" ? (
                    <Check className="h-4 w-4 text-ochre" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Location & Hours */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <MapPin className="h-4 w-4 text-ochre" />
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-alabaster/60">
                    Coverage
                  </p>
                  <p className="mt-1 text-sm text-white">
                    All Dublin &amp; County
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <Clock className="h-4 w-4 text-ochre" />
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-alabaster/60">
                    Availability
                  </p>
                  <p className="mt-1 text-sm text-white">Mon – Sat · 8am–7pm</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Free Quote Card */}
          <div className="lg:col-span-7">
            <div className="rounded-[2rem] border border-white/15 bg-alabaster p-7 text-ink shadow-2xl sm:p-10">
              {submitted ? (
                <div className="py-10 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest/10 text-forest">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="mt-6 font-serif text-3xl font-medium text-georgian">
                    Thank you, {name || "friend"}!
                  </h3>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-ink">
                    Your enquiry for <strong>{selectedType}</strong> is ready.
                    Click below to send it straight via your email client, or
                    give us a quick ring on{" "}
                    <a
                      href={SITE_CONFIG.contacts.primaryPhone.href}
                      className="font-semibold text-georgian underline decoration-ochre"
                    >
                      {SITE_CONFIG.contacts.primaryPhone.display}
                    </a>{" "}
                    for an immediate chat.
                  </p>
                  <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={whatsappQuoteHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1ebe5d]"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      Send via WhatsApp
                    </a>
                    <a
                      href={mailtoHref}
                      className="inline-flex items-center gap-2 rounded-full bg-georgian px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-forest"
                    >
                      <Mail className="h-4 w-4 text-ochre" />
                      Send via Email App
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setName("");
                        setPhone("");
                        setEmail("");
                        setArea("");
                        setDetails("");
                      }}
                      className="rounded-full border border-stone-border bg-white px-6 py-3 text-sm font-semibold text-georgian transition-colors hover:bg-linen"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="font-serif text-2xl font-medium text-georgian sm:text-3xl">
                        Request a free quote
                      </h3>
                      <p className="mt-1 text-sm text-muted-ink">
                        Tell us a little about your rooms or exterior — no
                        obligation.
                      </p>
                    </div>
                    <span className="rounded-full bg-linen px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-ochre-dark">
                      24hr Response
                    </span>
                  </div>

                  <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                    {/* Service Pills */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-muted-ink">
                        Type of Project
                      </label>
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {PROJECT_TYPES.map((type) => {
                          const active = selectedType === type;
                          return (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setSelectedType(type)}
                              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                                active
                                  ? "bg-georgian text-white shadow-sm"
                                  : "border border-stone-border bg-white text-muted-ink hover:border-georgian/35 hover:text-georgian"
                              }`}
                            >
                              {type}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="quote-name"
                          className="block text-xs font-semibold uppercase tracking-[0.14em] text-muted-ink"
                        >
                          Your Name *
                        </label>
                        <input
                          id="quote-name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Aoife Murphy"
                          className="mt-2 w-full rounded-xl border border-stone-border bg-white px-4 py-3 text-sm text-ink placeholder:text-muted-ink/50 focus:border-ochre focus:outline-none focus:ring-2 focus:ring-ochre/20"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="quote-phone"
                          className="block text-xs font-semibold uppercase tracking-[0.14em] text-muted-ink"
                        >
                          Phone Number *
                        </label>
                        <input
                          id="quote-phone"
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. 085 123 4567"
                          className="mt-2 w-full rounded-xl border border-stone-border bg-white px-4 py-3 text-sm text-ink placeholder:text-muted-ink/50 focus:border-ochre focus:outline-none focus:ring-2 focus:ring-ochre/20"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="quote-email"
                          className="block text-xs font-semibold uppercase tracking-[0.14em] text-muted-ink"
                        >
                          Email Address
                        </label>
                        <input
                          id="quote-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="mt-2 w-full rounded-xl border border-stone-border bg-white px-4 py-3 text-sm text-ink placeholder:text-muted-ink/50 focus:border-ochre focus:outline-none focus:ring-2 focus:ring-ochre/20"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="quote-area"
                          className="block text-xs font-semibold uppercase tracking-[0.14em] text-muted-ink"
                        >
                          Dublin Area / Eircode
                        </label>
                        <input
                          id="quote-area"
                          type="text"
                          value={area}
                          onChange={(e) => setArea(e.target.value)}
                          placeholder="e.g. Rathmines, D6"
                          className="mt-2 w-full rounded-xl border border-stone-border bg-white px-4 py-3 text-sm text-ink placeholder:text-muted-ink/50 focus:border-ochre focus:outline-none focus:ring-2 focus:ring-ochre/20"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="quote-details"
                        className="block text-xs font-semibold uppercase tracking-[0.14em] text-muted-ink"
                      >
                        Tell us about your project *
                      </label>
                      <textarea
                        id="quote-details"
                        rows={4}
                        required
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="Number of rooms, surfaces, preferred timeline or colours..."
                        className="mt-2 w-full resize-none rounded-xl border border-stone-border bg-white px-4 py-3 text-sm text-ink placeholder:text-muted-ink/50 focus:border-ochre focus:outline-none focus:ring-2 focus:ring-ochre/20"
                      />
                    </div>

                    <button
                      type="submit"
                      className="flex w-full items-center justify-center gap-2.5 rounded-full bg-ochre px-6 py-4 text-sm font-semibold text-white shadow-md transition-all hover:bg-ochre-dark hover:shadow-lg"
                    >
                      <Send className="h-4 w-4" />
                      <span>Request My Free Quote</span>
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <footer className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-10 text-xs text-alabaster/60 sm:flex-row">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-white px-3.5 py-2 shadow-md">
              <Image
                src="/images/dolphin-logo-full.png"
                alt={`${SITE_CONFIG.brandName} — ${SITE_CONFIG.brandTagline}`}
                width={110}
                height={94}
                className="h-12 w-auto object-contain"
              />
            </div>
            <div>
              <p className="font-serif text-base font-medium text-white">
                {SITE_CONFIG.brandName}
              </p>
              <p className="mt-0.5 text-[11px] text-alabaster/65">
                {SITE_CONFIG.brandTagline}
              </p>
              <p className="mt-1 text-[11px] text-alabaster/50">
                © {new Date().getFullYear()} All rights reserved.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <a
              href={SITE_CONFIG.contacts.primaryPhone.href}
              className="transition-colors hover:text-ochre"
            >
              {SITE_CONFIG.contacts.primaryPhone.display}
            </a>
            <a
              href={SITE_CONFIG.contacts.secondaryPhone.href}
              className="transition-colors hover:text-ochre"
            >
              {SITE_CONFIG.contacts.secondaryPhone.display}
            </a>
            <a
              href={SITE_CONFIG.contacts.email.href}
              className="transition-colors hover:text-ochre"
            >
              {SITE_CONFIG.contacts.email.display}
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
